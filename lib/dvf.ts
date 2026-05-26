/**
 * Client DVF — ventes immobilières open data (Etalab).
 *
 * Source : data.gouv.fr — fichiers CSV par commune par année :
 *   https://files.data.gouv.fr/geo-dvf/latest/csv/{year}/communes/{dep}/{insee}.csv
 *
 * On charge les 3 dernières années pour la commune INSEE fournie, on les met
 * en cache mémoire pour la durée du runtime, puis on filtre par type, distance,
 * surface et récence.
 */

export type DvfMutation = {
  id_mutation: string;
  date_mutation: string; // YYYY-MM-DD
  valeur_fonciere: number;
  surface_reelle_bati?: number;
  nombre_pieces_principales?: number;
  type_local: string; // "Appartement" | "Maison" | "Local industriel. commercial ou assimilé" | "Dépendance"
  longitude: number;
  latitude: number;
  code_postal?: string;
  nom_commune?: string;
  adresse_nom_voie?: string;
  adresse_numero?: string;
};

export type Comparable = {
  date: string;
  monthsAgo: number;
  prix: number;
  surface: number;
  pieces?: number;
  pricePerSqm: number;
  distanceMeters: number;
  voie?: string;
  numero?: string;
  commune?: string;
};

const DVF_TYPE: Record<string, string> = {
  appartement: "Appartement",
  maison: "Maison",
  immeuble: "Maison",
  local: "Local industriel. commercial ou assimilé",
  terrain: "Dépendance",
};

// Cache : insee-year → mutations (Promise pour dédupliquer requêtes concurrentes)
const CSV_CACHE = new Map<string, Promise<DvfMutation[]>>();

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6_371_000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function monthsBetween(date: string): number {
  const d = new Date(date);
  const now = new Date();
  return (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
}

// Index colonnes CSV (cf. header data.gouv geo-dvf)
const IDX = {
  id_mutation: 0,
  date_mutation: 1,
  nature_mutation: 3,
  valeur_fonciere: 4,
  adresse_numero: 5,
  adresse_nom_voie: 7,
  code_postal: 9,
  nom_commune: 11,
  type_local: 30,
  surface_reelle_bati: 31,
  nombre_pieces_principales: 32,
  longitude: 38,
  latitude: 39,
};

function parseCsv(text: string): DvfMutation[] {
  const lines = text.split("\n");
  const out: DvfMutation[] = [];
  // Dédoublonnage : on garde une ligne par (id_mutation, type_local)
  const seen = new Set<string>();
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    const cols = line.split(",");
    if (cols.length < 40) continue;
    if (cols[IDX.nature_mutation] !== "Vente") continue;
    const type_local = cols[IDX.type_local];
    if (!type_local) continue;
    const id = cols[IDX.id_mutation];
    const key = `${id}|${type_local}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const valeur = Number(cols[IDX.valeur_fonciere]);
    const lat = Number(cols[IDX.latitude]);
    const lon = Number(cols[IDX.longitude]);
    if (!valeur || !Number.isFinite(lat) || !Number.isFinite(lon)) continue;

    const surface = Number(cols[IDX.surface_reelle_bati]) || undefined;
    out.push({
      id_mutation: id,
      date_mutation: cols[IDX.date_mutation],
      valeur_fonciere: valeur,
      surface_reelle_bati: surface,
      nombre_pieces_principales: Number(cols[IDX.nombre_pieces_principales]) || undefined,
      type_local,
      longitude: lon,
      latitude: lat,
      code_postal: cols[IDX.code_postal] || undefined,
      nom_commune: cols[IDX.nom_commune] || undefined,
      adresse_nom_voie: cols[IDX.adresse_nom_voie] || undefined,
      adresse_numero: cols[IDX.adresse_numero] || undefined,
    });
  }
  return out;
}

async function loadCommuneYear(insee: string, year: number): Promise<DvfMutation[]> {
  const key = `${insee}-${year}`;
  const cached = CSV_CACHE.get(key);
  if (cached) return cached;

  const dep = insee.slice(0, 2); // 69266 → 69 (métropole) ; outremer = 3 digits, mais file path utilise 2
  const url = `https://files.data.gouv.fr/geo-dvf/latest/csv/${year}/communes/${dep}/${insee}.csv`;

  const promise = (async () => {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: "follow" });
      if (!res.ok) return [];
      const text = await res.text();
      return parseCsv(text);
    } catch {
      return [];
    }
  })();

  CSV_CACHE.set(key, promise);
  return promise;
}

/**
 * Récupère les comparables.
 * Stratégie : 3 dernières années pour la commune INSEE → filtrage type/distance/surface.
 * Élargit le rayon (400 → 800 → 1500 → 3000 m) jusqu'à atteindre `minResults`.
 */
export async function fetchComparables(opts: {
  lat: number;
  lon: number;
  insee?: string;
  typeBien: string;
  surface?: number;
  minResults?: number;
  monthsBack?: number;
}): Promise<{
  comparables: Comparable[];
  radiusUsed: number;
  rawCount: number;
  /** Toutes les ventes du même type dans la commune (toutes années chargées),
   *  pour analyses macro : tendance, voisinage, marché. Pas de filtre surface. */
  allTypeInCommune: Comparable[];
}> {
  const { lat, lon, insee, typeBien, surface, minResults = 8, monthsBack = 36 } = opts;
  const dvfType = DVF_TYPE[typeBien] ?? "Appartement";

  if (!insee) return { comparables: [], radiusUsed: 0, rawCount: 0, allTypeInCommune: [] };

  // Charge les 5 dernières années (en parallèle) — utile pour la tendance + comparables
  const now = new Date();
  const years = [
    now.getFullYear() - 1,
    now.getFullYear() - 2,
    now.getFullYear() - 3,
    now.getFullYear() - 4,
    now.getFullYear() - 5,
  ];
  const allMutations = (await Promise.all(years.map((y) => loadCommuneYear(insee, y)))).flat();

  const filteredByType = allMutations.filter((m) => m.type_local === dvfType);
  const withSurface = filteredByType.filter((m) => (m.surface_reelle_bati ?? 0) > 0);
  const recent = withSurface.filter((m) => monthsBetween(m.date_mutation) <= monthsBack);

  const radii = [400, 800, 1500, 3000];
  let best: Comparable[] = [];
  let radiusUsed = 0;

  for (const dist of radii) {
    radiusUsed = dist;
    const filtered: Comparable[] = recent
      .map((m) => ({
        m,
        d: haversine(lat, lon, m.latitude, m.longitude),
      }))
      .filter((x) => x.d <= dist)
      .filter((x) => {
        if (!surface) return true;
        const s = x.m.surface_reelle_bati!;
        return s >= surface * 0.55 && s <= surface * 1.6;
      })
      .map(({ m, d }) => {
        const s = m.surface_reelle_bati!;
        return {
          date: m.date_mutation,
          monthsAgo: monthsBetween(m.date_mutation),
          prix: m.valeur_fonciere,
          surface: s,
          pieces: m.nombre_pieces_principales,
          pricePerSqm: Math.round(m.valeur_fonciere / s),
          distanceMeters: Math.round(d),
          voie: m.adresse_nom_voie,
          numero: m.adresse_numero,
          commune: m.nom_commune,
        };
      })
      .filter((c) => c.pricePerSqm >= 500 && c.pricePerSqm <= 25_000);

    if (filtered.length >= minResults) {
      best = filtered;
      break;
    }
    if (filtered.length > best.length) best = filtered;
  }

  best.sort((a, b) => a.distanceMeters - b.distanceMeters || a.monthsAgo - b.monthsAgo);

  // Pour analyses macro (tendance, voisinage) : toutes les ventes du même type
  // sur les 5 années chargées, sans filtre surface, avec distance calculée.
  const allTypeInCommune: Comparable[] = filteredByType
    .filter((m) => (m.surface_reelle_bati ?? 0) > 0)
    .map((m) => {
      const s = m.surface_reelle_bati!;
      const d = haversine(lat, lon, m.latitude, m.longitude);
      return {
        date: m.date_mutation,
        monthsAgo: monthsBetween(m.date_mutation),
        prix: m.valeur_fonciere,
        surface: s,
        pieces: m.nombre_pieces_principales,
        pricePerSqm: Math.round(m.valeur_fonciere / s),
        distanceMeters: Math.round(d),
        voie: m.adresse_nom_voie,
        numero: m.adresse_numero,
        commune: m.nom_commune,
      };
    })
    .filter((c) => c.pricePerSqm >= 500 && c.pricePerSqm <= 25_000);

  return { comparables: best, radiusUsed, rawCount: recent.length, allTypeInCommune };
}
