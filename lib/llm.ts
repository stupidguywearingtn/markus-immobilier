/**
 * Client LLM — analyse rédigée par Claude Haiku.
 * Ton : expert immobilier bienveillant et pointu, ton Markus (premium, concret).
 * Cohérence stricte avec les chiffres calculés — n'invente rien hors données.
 *
 * Coût : ~ 0,01–0,02 € par rapport (claude-haiku-4-5).
 */

import type { Comparable } from "./dvf";
import type {
  EstimationResult,
  TrendResult,
  PositioningResult,
  NeighborhoodResult,
  RentResult,
  ScoreResult,
  EstimationInput,
} from "./estimation";

export type LlmAnalysis = {
  pointsForts: string[];
  pointsAttention: string[];
  strategiePrix: string;
  valorisations: string[];
  profilAcheteur: string;
  canauxDiffusion: string[];
  synthese: string;
};

const SYSTEM_PROMPT = `Tu es un expert immobilier senior chez Markus Immobilier, agence indépendante premium à Villeurbanne / Lyon. Tu rédiges des analyses pour des propriétaires qui veulent estimer leur bien.

TON : professionnel, concret, premium, rassurant. Comme un agent terrain expérimenté qui parle simplement. Tu valorises sans flatter, tu signales sans alarmer.

RÈGLES ABSOLUES :
1. Ne JAMAIS inventer un chiffre, une donnée de marché ou un fait qui n'est pas dans le payload fourni.
2. Reste cohérent avec la fourchette d'estimation et les comparables : ne dis pas "votre bien vaut X" si X n'est pas dans le payload.
3. Ne mentionne pas "DVF", "API", "Carte des loyers" — parle de "ventes voisines récentes", "marché du secteur", "loyers de référence".
4. Cite l'adresse / la commune naturellement. Adapte le ton selon objectif (vendre / louer / investir / estimer).
5. Sois SPÉCIFIQUE à ce bien : utilise état, étage, exposition, DPE, atouts cochés. Évite le générique.
6. Pour les "valorisations à fort ROI" : sois pragmatique (DPE F→C, home staging, peinture, cuisine) et cite ordre de grandeur seulement si évident.
7. Profil d'acheteur cible : déduis du type, surface, pièces, secteur, prix (jeune couple primo, famille, investisseur locatif…).

FORMAT DE SORTIE : JSON STRICT uniquement, pas de prose autour, pas de markdown. Structure exacte :
{
  "pointsForts": ["...", "...", "..."],                  // 3 à 5 puces courtes (≤ 18 mots chacune)
  "pointsAttention": ["...", "..."],                     // 2 à 4 puces, factuelles, jamais agressives
  "strategiePrix": "...",                                // 2–4 phrases : prix de présentation conseillé vs prix plancher, argumentaire
  "valorisations": ["...", "..."],                       // 2–4 recommandations ROI concrètes
  "profilAcheteur": "...",                               // 1–2 phrases décrivant la cible
  "canauxDiffusion": ["...", "..."],                     // 2–4 canaux pertinents (réseau Markus, portails, réseaux sociaux, club investisseurs…)
  "synthese": "..."                                      // 3–5 phrases : synthèse chaleureuse qui donne envie de prendre RDV Markus
}`;

type LlmPayload = {
  subject: EstimationInput & { typeBien: string; adresse: string; commune?: string };
  estimation: EstimationResult;
  comparables: Comparable[];
  trend: TrendResult;
  positioning: PositioningResult;
  neighborhood: NeighborhoodResult;
  rent: RentResult;
  score: ScoreResult;
  objectif?: string; // vendre / louer / estimer / investir
};

function buildUserPrompt(p: LlmPayload): string {
  const eur = (n: number) => new Intl.NumberFormat("fr-FR").format(Math.round(n));
  const compactComparables = p.comparables.slice(0, 8).map((c) => ({
    date: c.date,
    surface: c.surface,
    prix: c.prix,
    pricePerSqm: c.pricePerSqm,
    distance: c.distanceMeters,
    voie: c.voie,
  }));

  return `DONNÉES DU BIEN

Type : ${p.subject.typeBien}
Adresse : ${p.subject.adresse}${p.subject.commune ? ` (${p.subject.commune})` : ""}
Surface : ${p.subject.surface ?? "?"} m²
${p.subject.surfaceTerrain ? `Terrain : ${p.subject.surfaceTerrain} m²` : ""}
${typeof p.subject.etage === "number" ? `Étage : ${p.subject.etage}${p.subject.ascenseur ? " + ascenseur" : ""}` : ""}
État : ${p.subject.etat ?? "non renseigné"}
Année : ${p.subject.anneeConstruction ?? "non renseignée"}
DPE : ${p.subject.dpe ?? "non renseigné"}
Extérieur : ${p.subject.exterieur ?? "aucun"}${p.subject.surfaceExterieur ? ` (${p.subject.surfaceExterieur} m²)` : ""}
Exposition : ${p.subject.exposition ?? "non renseignée"}
Piscine : ${p.subject.piscine ? "oui" : "non"}
Atouts cochés : ${p.subject.atouts?.join(", ") || "aucun"}
Annexes : ${p.subject.annexes?.join(", ") || "aucune"}
${p.objectif ? `Objectif du propriétaire : ${p.objectif}` : ""}

ESTIMATION CALCULÉE
Fourchette : ${eur(p.estimation.low)} – ${eur(p.estimation.high)} €
Prix médian : ${eur(p.estimation.basePrice)} €
€/m² ajusté : ${eur(p.estimation.pricePerSqmAdjusted)} €/m²
€/m² médian secteur : ${eur(p.estimation.pricePerSqmMedian)} €/m²
Confiance : ${p.estimation.confidence.label} (${p.estimation.confidence.score}/100, ${p.estimation.comparablesUsed} ventes voisines à ${p.estimation.radiusUsedMeters} m)
Coefficients appliqués : ${p.estimation.adjustmentsApplied.map((a) => `${a.name} ${a.pct > 0 ? "+" : ""}${a.pct}%`).join(", ") || "aucun"}

POSITIONNEMENT
Le bien à ${eur(p.estimation.pricePerSqmAdjusted)} €/m² se place au ${p.positioning.subjectPercentile}ᵉ percentile des ventes proches (min ${eur(p.positioning.min)} / médian ${eur(p.positioning.median)} / max ${eur(p.positioning.max)} €/m²).

CONTEXTE MARCHÉ
- Tendance €/m² 12 derniers mois vs 12-24 mois : ${p.trend.pct12m > 0 ? "+" : ""}${p.trend.pct12m}%
- Évolution annuelle (5 ans) : ${p.trend.byYear.map((y) => `${y.year} = ${eur(y.medianEurM2)} €/m² (${y.count} ventes)`).join(", ")}
- Quartier (<500m) : ${eur(p.neighborhood.quartier)} €/m² · Proche (500-1500m) : ${eur(p.neighborhood.proche)} €/m² · Commune : ${eur(p.neighborhood.commune)} €/m²

POTENTIEL LOCATIF
Loyer estimé : ${eur(p.rent.monthlyRent)} €/mois (${p.rent.rentPerSqm} €/m² ${p.rent.commune})
Rendement brut : ${p.rent.yieldGross}% · Rendement net estimé : ${p.rent.yieldNet}%

SCORE DU BIEN
${p.score.overall}/100 — Emplacement ${p.score.emplacement} · État ${p.score.etat} · Rareté ${p.score.rarete} · Potentiel ${p.score.potentiel}

COMPARABLES RÉCENTS (top 8)
${JSON.stringify(compactComparables, null, 2)}

Rédige maintenant l'analyse JSON.`;
}

export async function generateAnalysis(payload: LlmPayload): Promise<{
  analysis: LlmAnalysis | null;
  error?: string;
  model?: string;
}> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.trim().length < 10) {
    return { analysis: null, error: "missing_api_key" };
  }

  const model = "claude-haiku-4-5-20251001";

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1800,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildUserPrompt(payload) }],
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return { analysis: null, error: `api_${res.status}: ${errText.slice(0, 200)}`, model };
    }

    const data = (await res.json()) as {
      content?: { type: string; text: string }[];
    };

    const text = data.content?.find((c) => c.type === "text")?.text ?? "";
    if (!text) return { analysis: null, error: "empty_response", model };

    // Extrait le bloc JSON (Claude renvoie parfois du texte autour)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return { analysis: null, error: "no_json_block", model };

    let parsed: LlmAnalysis;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      return { analysis: null, error: "json_parse_failed", model };
    }

    // Validation soft des clés
    if (!parsed.synthese || !Array.isArray(parsed.pointsForts)) {
      return { analysis: null, error: "invalid_schema", model };
    }

    return { analysis: parsed, model };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return { analysis: null, error: `fetch_${msg.slice(0, 100)}`, model };
  }
}
