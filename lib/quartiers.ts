/**
 * Prix au m² par quartier de Villeurbanne — SOURCE DE VÉRITÉ UNIQUE.
 *
 * Ces chiffres sont le résultat du calcul DVF documenté dans SEO-JOURNAL.md
 * (entrée 2026-09-07). Ils sont déjà publiés dans
 * /blog/prix-immobilier-villeurbanne-2026 ; ce module existe pour que les pages
 * quartiers servent EXACTEMENT les mêmes valeurs, sans recopie à la main.
 *
 * ⚠️ Ne jamais recalculer « à la louche » ni arrondir autrement. Pour
 * remettre à jour (quand DVF 2026 sortira), suivre la méthode consignée dans
 * SEO-JOURNAL.md § « Méthode réutilisable — recalculer un prix au m² local » :
 *   - fichier commune 69266, nature_mutation = Vente
 *   - une seule ligne bâtie (Appartement|Maison) par mutation
 *   - surface >= 10 m², 800 <= €/m² <= 12 000, MÉDIANE (jamais la moyenne)
 * et mettre à jour DVF_ANNEE + MAJ + les articles de blog en même temps.
 */

export const DVF_ANNEE = 2025;
export const DVF_SOURCE =
  "Base DVF (demandes de valeurs foncières), Etalab / data.gouv.fr — ventes d'appartements enregistrées en 2025 sur la commune de Villeurbanne (69266), découpées selon les contours de quartiers officiels de la Métropole de Lyon.";
/** Date de dernière mise à jour réelle du contenu chiffré (ISO). */
export const MAJ = "2026-09-15";

export type QuartierPrix = {
  /** Nom du contour officiel (Métropole de Lyon) */
  contour: string;
  /** Médiane €/m² appartements, année DVF_ANNEE */
  median: number;
  /** Variation vs année précédente, en % */
  vs1an: number;
  /** Variation vs 2022, en % */
  vs2022: number;
  /** Nombre de ventes exploitables sur DVF_ANNEE */
  n: number;
};

/** Médiane communale appartements, DVF_ANNEE. */
export const COMMUNE = {
  median: 3567,
  vs1an: 1.5,
  vs2022: -10.4,
  n: 1875,
  prixMedian: 195000,
  surfaceMediane: 62,
} as const;

/** Médianes par typologie, commune entière, DVF_ANNEE. */
export const TYPOLOGIES = [
  { type: "T1", median: 4000, prixMedian: 115000 },
  { type: "T2", median: 3830, prixMedian: 170000 },
  { type: "T3", median: 3494, prixMedian: 226250 },
  { type: "T4", median: 3211, prixMedian: 255000 },
  { type: "T5 et +", median: 2967, prixMedian: 290670 },
] as const;

/**
 * Les 7 quartiers publiables. Saint-Jean est volontairement absent :
 * 153 ventes sur 4 ans, échantillon trop mince pour une médiane annuelle
 * honnête (décision du 2026-09-07, à ne pas revenir dessus sans recalcul).
 */
export const QUARTIERS: Record<string, QuartierPrix> = {
  ferrandiere: {
    contour: "Ferrandière – Maisons-Neuves",
    median: 3923,
    vs1an: 7.3,
    vs2022: -2.0,
    n: 187,
  },
  "gratte-ciel": {
    contour: "Gratte-Ciel – Dedieu – Charmettes",
    median: 3846,
    vs1an: 1.2,
    vs2022: -10.6,
    n: 655,
  },
  charpennes: {
    contour: "Charpennes – Tonkin",
    median: 3524,
    vs1an: -1.3,
    vs2022: -13.2,
    n: 200,
  },
  perraliere: {
    contour: "Perralière – Grandclément",
    median: 3375,
    vs1an: 1.3,
    vs2022: -11.4,
    n: 330,
  },
  buers: {
    contour: "Buers – Croix-Luizet",
    median: 3271,
    vs1an: 2.1,
    vs2022: -11.5,
    n: 223,
  },
  cusset: {
    contour: "Cusset – Bonnevay",
    median: 3171,
    vs1an: 3.1,
    vs2022: -5.8,
    n: 213,
  },
  cyprian: {
    contour: "Cyprian – Les Brosses",
    median: 2738,
    vs1an: 3.4,
    vs2022: -10.0,
    n: 53,
  },
};

/** Loyer médian communal hors charges (€/m²). Pas de donnée par quartier. */
export const LOYER_MEDIAN_HC = 14.6;

/* ------------------------------------------------------------------ */
/* Helpers de formatage — pour que les pages n'écrivent aucun chiffre  */
/* en dur et ne puissent donc pas diverger de ce fichier.              */
/* ------------------------------------------------------------------ */

export const fmtEur = (n: number) =>
  `${n.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €`;

export const fmtM2 = (n: number) => `${fmtEur(n)}/m²`;

/** « +1,2 % » / « −1,3 % » (vrai signe moins typographique). */
export const fmtPct = (n: number) => {
  const s = Math.abs(n).toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return `${n > 0 ? "+" : n < 0 ? "−" : ""}${s} %`;
};

/** Écart du quartier à la médiane communale, en % (arrondi au dixième). */
export const ecartCommune = (median: number) =>
  Math.round(((median / COMMUNE.median - 1) * 100) * 10) / 10;

/** Surface achetable au prix médian du quartier, pour un budget donné. */
export const surfacePourBudget = (median: number, budget: number) =>
  Math.round(budget / median);

/**
 * Honoraires de vente Markus pour un prix donné, d'après le barème public
 * de /honoraires (part vendeur). Ne couvre que les tranches utiles ici.
 */
export const honorairesVente = (prix: number) => {
  if (prix <= 50000) return null;
  if (prix <= 170000) return { label: "9 000 € forfaitaires", montant: 9000 };
  if (prix <= 300000)
    return { label: "6 %", montant: Math.round(prix * 0.06) };
  if (prix <= 500000)
    return { label: "5 %", montant: Math.round(prix * 0.05) };
  return null;
};
