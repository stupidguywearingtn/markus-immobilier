/**
 * Moteur d'estimation — réf : /reference/specs-estimation.md §3.
 *
 * 1. Médiane pondérée €/m² des comparables (pondération distance + récence).
 * 2. Ajustements liés au bien (état, étage/ascenseur, extérieur, exposition, DPE, atouts, piscine, terrain).
 * 3. Fourchette basée sur la dispersion des comparables (écart-type clampé).
 * 4. Score de fiabilité fonction du nombre de comparables retenus.
 */

import type { Comparable } from "./dvf";
import { getRentBenchmark } from "./loyers";

export type EstimationInput = {
  typeBien: string;
  surface?: number; // m² habitable (ou totale pour terrain)
  surfaceTerrain?: number; // m² terrain (maison)
  etage?: number;
  ascenseur?: boolean;
  exterieur?: string; // aucun/balcon/terrasse/loggia
  surfaceExterieur?: number;
  exposition?: string; // nord/sud/est/ouest/traversant
  piscine?: boolean;
  combles?: boolean;
  etat?: string; // a_renover/travaux/bon/refait/neuf
  anneeConstruction?: string;
  dpe?: string;
  atouts?: string[];
  annexes?: string[];
};

export type EstimationResult = {
  pricePerSqmMedian: number; // €/m² médian pondéré (comparables bruts)
  pricePerSqmAdjusted: number; // €/m² après coefficients du bien
  basePrice: number; // prix central
  low: number;
  high: number;
  margin: number; // marge appliquée (±)
  confidence: { score: number; label: string; reason: string };
  comparablesUsed: number;
  radiusUsedMeters: number;
  adjustmentsApplied: { name: string; pct: number }[];
};

function weightedMedian(pairs: { value: number; weight: number }[]): number {
  if (pairs.length === 0) return 0;
  const sorted = [...pairs].sort((a, b) => a.value - b.value);
  const total = sorted.reduce((s, p) => s + p.weight, 0);
  let cum = 0;
  for (const p of sorted) {
    cum += p.weight;
    if (cum >= total / 2) return p.value;
  }
  return sorted[sorted.length - 1].value;
}

function stdDev(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  const variance =
    values.reduce((s, v) => s + (v - mean) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

/** Calcule les coefficients % à appliquer au prix central. */
function buildAdjustments(input: EstimationInput): { name: string; pct: number }[] {
  const adj: { name: string; pct: number }[] = [];

  // État
  if (input.etat) {
    const map: Record<string, [string, number]> = {
      a_renover: ["À rénover", -15],
      travaux: ["Travaux à prévoir", -7],
      bon: ["Bon état", 0],
      refait: ["Refait à neuf", 6],
      neuf: ["Neuf", 12],
    };
    if (map[input.etat]) adj.push({ name: map[input.etat][0], pct: map[input.etat][1] });
  }

  // Étage / ascenseur (appartement)
  if (typeof input.etage === "number") {
    if (input.etage === 0) adj.push({ name: "RDC", pct: -3 });
    else if (input.etage >= 4 && input.ascenseur) adj.push({ name: "Étage élevé avec ascenseur", pct: 3 });
    else if (input.etage >= 4 && !input.ascenseur) adj.push({ name: "Étage élevé sans ascenseur", pct: -4 });
    else if (input.etage >= 2 && input.etage <= 3) adj.push({ name: "Bon étage", pct: 2 });
  }

  // Extérieur
  if (input.exterieur && input.exterieur !== "aucun") {
    const map: Record<string, [string, number]> = {
      balcon: ["Balcon", 2],
      terrasse: ["Terrasse", 5],
      loggia: ["Loggia", 3],
    };
    if (map[input.exterieur]) adj.push({ name: map[input.exterieur][0], pct: map[input.exterieur][1] });
  }
  // Bonus surface extérieur (terrasse > 10 m² ou balcon > 5 m²)
  if (input.surfaceExterieur && input.surfaceExterieur >= 10 && input.exterieur === "terrasse") {
    adj.push({ name: "Grande terrasse", pct: 2 });
  }

  // Exposition
  if (input.exposition === "sud" || input.exposition === "traversant")
    adj.push({ name: input.exposition === "sud" ? "Plein sud" : "Traversant", pct: 3 });
  if (input.exposition === "nord") adj.push({ name: "Exposition nord", pct: -3 });

  // Piscine (maison)
  if (input.piscine) adj.push({ name: "Piscine", pct: 6 });
  if (input.combles) adj.push({ name: "Combles aménageables", pct: 2 });

  // DPE
  if (input.dpe && input.dpe !== "unknown") {
    const map: Record<string, [string, number]> = {
      A: ["DPE A", 7],
      B: ["DPE B", 4],
      C: ["DPE C", 1],
      D: ["DPE D", 0],
      E: ["DPE E", -3],
      F: ["DPE F", -8],
      G: ["DPE G", -12],
    };
    if (map[input.dpe]) adj.push({ name: map[input.dpe][0], pct: map[input.dpe][1] });
  }

  // Atouts (chacun +1%, plafonné à +6%)
  const atoutsCount = input.atouts?.length ?? 0;
  if (atoutsCount > 0) {
    adj.push({ name: `${atoutsCount} atout${atoutsCount > 1 ? "s" : ""}`, pct: Math.min(6, atoutsCount) });
  }

  // Annexes
  if (input.annexes?.includes("garage")) adj.push({ name: "Garage", pct: 3 });
  else if (input.annexes?.includes("parking")) adj.push({ name: "Parking", pct: 2 });
  if (input.annexes?.includes("cave")) adj.push({ name: "Cave", pct: 1 });

  return adj;
}

export function computeEstimation(
  input: EstimationInput,
  comparables: Comparable[],
  radiusUsed: number,
): EstimationResult {
  const adjustments = buildAdjustments(input);
  const totalPct = adjustments.reduce((s, a) => s + a.pct, 0);

  // Pondération : 1 / (1 + km) * 1 / (1 + mois/12)
  const weighted = comparables.map((c) => ({
    value: c.pricePerSqm,
    weight:
      (1 / (1 + c.distanceMeters / 1000)) *
      (1 / (1 + c.monthsAgo / 12)),
  }));

  const pricePerSqmMedian = Math.round(weightedMedian(weighted));
  const pricePerSqmAdjusted = Math.round(pricePerSqmMedian * (1 + totalPct / 100));

  // Surface de référence
  const surface = input.surface ?? 0;
  const basePrice = Math.round(pricePerSqmAdjusted * surface);

  // Marge basée sur la dispersion (clampée 6%–14%)
  const sd = stdDev(comparables.map((c) => c.pricePerSqm));
  const cv = pricePerSqmMedian > 0 ? sd / pricePerSqmMedian : 0;
  const marginPct = Math.max(0.06, Math.min(0.14, cv));
  const margin = Math.round(basePrice * marginPct);

  // Confiance
  const n = comparables.length;
  let score = 0;
  let label = "Faible";
  let reason = "";
  if (n >= 20) {
    score = 92;
    label = "Très haute";
    reason = `${n} comparables récents dans un rayon de ${radiusUsed} m.`;
  } else if (n >= 12) {
    score = 80;
    label = "Bonne";
    reason = `${n} comparables récents dans un rayon de ${radiusUsed} m.`;
  } else if (n >= 6) {
    score = 65;
    label = "Moyenne";
    reason = `${n} comparables récents dans un rayon de ${radiusUsed} m.`;
  } else if (n >= 3) {
    score = 45;
    label = "Limitée";
    reason = `Seulement ${n} comparables proches — résultat à affiner avec un conseiller.`;
  } else {
    score = 25;
    label = "Faible";
    reason = `Très peu de ventes voisines (${n}) — secteur peu liquide ou adresse imprécise.`;
  }

  return {
    pricePerSqmMedian,
    pricePerSqmAdjusted,
    basePrice,
    low: basePrice - margin,
    high: basePrice + margin,
    margin,
    confidence: { score, label, reason },
    comparablesUsed: n,
    radiusUsedMeters: radiusUsed,
    adjustmentsApplied: adjustments,
  };
}

// ───────────────────────────────────────────────────────────────────────────
// ANALYSES MACRO : tendance, positionnement, voisinage, rendement, score
// ───────────────────────────────────────────────────────────────────────────

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export type HistoricalPoint = { year: number; medianEurM2: number; count: number };
export type TrendResult = {
  byYear: HistoricalPoint[];
  pct12m: number; // évolution 12 derniers mois vs 12-24 mois précédents
};

/** Tendance globale sur 5 ans de ventes (toutes surfaces du même type, dans la commune). */
export function computeTrend(comparables: Comparable[]): TrendResult {
  const byYear = new Map<number, number[]>();
  for (const c of comparables) {
    const y = Number(c.date.slice(0, 4));
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(c.pricePerSqm);
  }
  const points: HistoricalPoint[] = [...byYear.entries()]
    .map(([year, vals]) => ({ year, medianEurM2: Math.round(median(vals)), count: vals.length }))
    .sort((a, b) => a.year - b.year);

  // Évolution 12 derniers mois vs 12-24 mois
  const last12 = comparables.filter((c) => c.monthsAgo < 12).map((c) => c.pricePerSqm);
  const prev12 = comparables.filter((c) => c.monthsAgo >= 12 && c.monthsAgo < 24).map((c) => c.pricePerSqm);
  const m1 = last12.length ? median(last12) : 0;
  const m2 = prev12.length ? median(prev12) : 0;
  const pct12m = m2 > 0 ? Math.round(((m1 - m2) / m2) * 1000) / 10 : 0;

  return { byYear: points, pct12m };
}

export type PositioningResult = {
  min: number;
  p25: number;
  median: number;
  p75: number;
  max: number;
  /** 0–100 : position du subject parmi les comparables proches. */
  subjectPercentile: number;
};

/** Position du subject sur la barre prix bas → prix haut du secteur. */
export function computePositioning(
  adjustedEurM2: number,
  comparables: Comparable[],
): PositioningResult {
  if (comparables.length === 0) {
    return { min: 0, p25: 0, median: 0, p75: 0, max: 0, subjectPercentile: 50 };
  }
  const sorted = [...comparables].map((c) => c.pricePerSqm).sort((a, b) => a - b);
  const n = sorted.length;
  const p = (q: number) => sorted[Math.min(n - 1, Math.floor(q * n))];
  const lessOrEqual = sorted.filter((v) => v <= adjustedEurM2).length;
  const percentile = Math.round((lessOrEqual / n) * 100);
  return {
    min: sorted[0],
    p25: p(0.25),
    median: p(0.5),
    p75: p(0.75),
    max: sorted[n - 1],
    subjectPercentile: percentile,
  };
}

export type NeighborhoodResult = {
  quartier: number; // €/m² < 500 m
  proche: number; // 500 – 1500 m
  commune: number; // toute la commune
};

/** Compare €/m² médian : quartier (<500m) / proche (500-1500m) / commune. */
export function computeNeighborhood(allComparables: Comparable[]): NeighborhoodResult {
  const last24 = allComparables.filter((c) => c.monthsAgo <= 24);
  const quartier = last24.filter((c) => c.distanceMeters < 500).map((c) => c.pricePerSqm);
  const proche = last24.filter((c) => c.distanceMeters >= 500 && c.distanceMeters < 1500).map((c) => c.pricePerSqm);
  const commune = last24.map((c) => c.pricePerSqm);
  return {
    quartier: quartier.length ? Math.round(median(quartier)) : 0,
    proche: proche.length ? Math.round(median(proche)) : 0,
    commune: commune.length ? Math.round(median(commune)) : 0,
  };
}

export type RentResult = {
  rentPerSqm: number;
  monthlyRent: number;
  yieldGross: number; // %
  yieldNet: number; // %
  source: string;
  commune: string;
};

/** Potentiel locatif : loyer mensuel + rendement brut/net. */
export function computeRent(
  insee: string | undefined,
  typeBien: string,
  surface: number,
  basePrice: number,
): RentResult {
  const benchmark = getRentBenchmark(insee, typeBien);
  const monthlyRent = Math.round(benchmark.rentPerSqm * surface);
  const yieldGross = basePrice > 0 ? Math.round(((monthlyRent * 12) / basePrice) * 1000) / 10 : 0;
  // Net = brut × (1 - charges/taxes ≈ 25%)
  const yieldNet = Math.round(yieldGross * 0.75 * 10) / 10;
  return {
    rentPerSqm: benchmark.rentPerSqm,
    monthlyRent,
    yieldGross,
    yieldNet,
    source: benchmark.exact ? "Carte des loyers — commune exacte" : "Estimation Lyon Métropole",
    commune: benchmark.commune,
  };
}

export type ScoreResult = {
  overall: number;
  emplacement: number;
  etat: number;
  rarete: number;
  potentiel: number;
};

/** Score du bien sur 100 : pondération emplacement 35% / état 25% / rareté 20% / potentiel 20%. */
export function computeScore(
  input: EstimationInput,
  estimation: EstimationResult,
  trend: TrendResult,
  positioning: PositioningResult,
): ScoreResult {
  // Emplacement : score de confiance DVF (proxy liquidité du secteur)
  // + bonus si €/m² médian secteur élevé (proxy attractivité, normalisé)
  let emplacement = Math.min(100, Math.round(40 + estimation.confidence.score * 0.5));
  if (estimation.pricePerSqmMedian > 5000) emplacement = Math.min(100, emplacement + 10);

  // État
  const etatMap: Record<string, number> = {
    a_renover: 35,
    travaux: 55,
    bon: 75,
    refait: 90,
    neuf: 100,
  };
  const etat = input.etat ? etatMap[input.etat] ?? 60 : 60;

  // Rareté : atouts + DPE haut + extérieur premium
  let rarete = 50;
  const atoutsCount = input.atouts?.length ?? 0;
  rarete += Math.min(20, atoutsCount * 3);
  if (input.dpe && ["A", "B"].includes(input.dpe)) rarete += 12;
  if (input.exterieur === "terrasse" || input.piscine) rarete += 10;
  if (input.exposition === "sud" || input.exposition === "traversant") rarete += 5;
  rarete = Math.min(100, rarete);

  // Potentiel : DPE améliorable, tendance positive, marge basse (sous-évalué)
  let potentiel = 55;
  if (input.dpe && ["F", "G"].includes(input.dpe)) potentiel += 18; // marge gros gains
  else if (input.dpe && ["D", "E"].includes(input.dpe)) potentiel += 8;
  if (trend.pct12m > 1) potentiel += 12;
  else if (trend.pct12m < -1) potentiel -= 8;
  if (positioning.subjectPercentile < 40) potentiel += 8; // sous-positionné = upside
  potentiel = Math.max(20, Math.min(100, potentiel));

  const overall = Math.round(
    emplacement * 0.35 + etat * 0.25 + rarete * 0.2 + potentiel * 0.2,
  );

  return { overall, emplacement, etat, rarete, potentiel };
}

/**
 * Géocode une adresse via l'API BAN — fallback serveur quand le formulaire
 * n'a pas pré-sélectionné une suggestion (lat/lng absents).
 */
export async function geocodeAddress(query: string): Promise<{
  lat: number;
  lon: number;
  label: string;
  commune?: string;
  postcode?: string;
  insee?: string;
} | null> {
  try {
    const res = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=1`,
      { signal: AbortSignal.timeout(5000) },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      features: {
        geometry: { coordinates: [number, number] };
        properties: { label: string; city: string; postcode: string; citycode: string };
      }[];
    };
    const f = data.features[0];
    if (!f) return null;
    return {
      lat: f.geometry.coordinates[1],
      lon: f.geometry.coordinates[0],
      label: f.properties.label,
      commune: f.properties.city,
      postcode: f.properties.postcode,
      insee: f.properties.citycode,
    };
  } catch {
    return null;
  }
}
