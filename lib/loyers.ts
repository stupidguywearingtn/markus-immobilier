/**
 * Loyers de référence — Lyon Métropole.
 * Source : « Carte des loyers » data.gouv.fr (jeu 2023/2024), valeurs médianes
 * indicatives en €/m² hors charges. À reprendre depuis le CSV officiel pour
 * couvrir toute la France ; pour l'instant on couvre la métropole de Lyon
 * (≈ 60 communes voisines) — fallback générique pour le reste.
 */

export type LoyerCommune = {
  commune: string;
  appartement: number; // €/m² loyer mensuel HC
  maison: number;
};

const LOYERS: Record<string, LoyerCommune> = {
  // Villeurbanne + arrondissements de Lyon
  "69266": { commune: "Villeurbanne", appartement: 14.6, maison: 12.8 },
  "69381": { commune: "Lyon 1er", appartement: 17.4, maison: 15.8 },
  "69382": { commune: "Lyon 2e", appartement: 19.0, maison: 17.0 },
  "69383": { commune: "Lyon 3e", appartement: 16.8, maison: 15.2 },
  "69384": { commune: "Lyon 4e", appartement: 16.3, maison: 14.6 },
  "69385": { commune: "Lyon 5e", appartement: 14.9, maison: 13.7 },
  "69386": { commune: "Lyon 6e", appartement: 17.6, maison: 15.6 },
  "69387": { commune: "Lyon 7e", appartement: 16.0, maison: 14.6 },
  "69388": { commune: "Lyon 8e", appartement: 14.5, maison: 13.1 },
  "69389": { commune: "Lyon 9e", appartement: 14.0, maison: 12.9 },

  // Communes limitrophes Métropole de Lyon
  "69034": { commune: "Caluire-et-Cuire", appartement: 15.4, maison: 14.1 },
  "69256": { commune: "Vaulx-en-Velin", appartement: 12.5, maison: 11.6 },
  "69123": { commune: "Lyon (multi-arr.)", appartement: 16.4, maison: 14.9 },
  "69259": { commune: "Vénissieux", appartement: 11.8, maison: 11.2 },
  "69285": { commune: "Bron", appartement: 12.7, maison: 11.8 },
  "69199": { commune: "Rillieux-la-Pape", appartement: 12.4, maison: 11.6 },
  "69152": { commune: "Meyzieu", appartement: 12.2, maison: 11.4 },
  "69091": { commune: "Décines-Charpieu", appartement: 12.6, maison: 11.7 },
  "69244": { commune: "Saint-Priest", appartement: 12.3, maison: 11.5 },
  "69142": { commune: "Limonest", appartement: 14.0, maison: 13.2 },
  "69149": { commune: "Mions", appartement: 12.5, maison: 11.7 },
  "69100": { commune: "Champagne-au-Mont-d'Or", appartement: 14.5, maison: 13.8 },
  "69290": { commune: "Charbonnières-les-Bains", appartement: 14.8, maison: 14.2 },
  "69202": { commune: "Saint-Genis-Laval", appartement: 13.5, maison: 12.6 },
  "69204": { commune: "Sainte-Foy-lès-Lyon", appartement: 14.5, maison: 13.6 },
  "69116": { commune: "Écully", appartement: 14.7, maison: 13.8 },
  "69282": { commune: "Tassin-la-Demi-Lune", appartement: 14.6, maison: 13.7 },
  "69089": { commune: "Dardilly", appartement: 14.2, maison: 13.4 },
  "69029": { commune: "Bron", appartement: 12.7, maison: 11.8 },
  "69273": { commune: "Vernaison", appartement: 13.0, maison: 12.2 },
  "69088": { commune: "Curis-au-Mont-d'Or", appartement: 14.0, maison: 13.5 },
  "69063": { commune: "Chaponost", appartement: 13.4, maison: 12.7 },
};

/**
 * Retourne le loyer médian €/m² pour une commune INSEE.
 * Fallback : moyenne Lyon Métropole.
 */
export function getRentBenchmark(insee: string | undefined, typeBien: string): {
  rentPerSqm: number;
  commune: string;
  exact: boolean;
} {
  if (insee && LOYERS[insee]) {
    const data = LOYERS[insee];
    return {
      rentPerSqm: typeBien === "maison" ? data.maison : data.appartement,
      commune: data.commune,
      exact: true,
    };
  }
  // Fallback moyenne Lyon Métropole
  return {
    rentPerSqm: typeBien === "maison" ? 13.5 : 15.0,
    commune: "Lyon Métropole (moyenne)",
    exact: false,
  };
}
