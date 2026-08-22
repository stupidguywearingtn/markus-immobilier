/**
 * Client LLM — analyse rédigée par Claude Sonnet 4.6.
 * Ton : expert immobilier senior chez Markus Immobilier (premium, concret,
 * agent terrain qui connaît son secteur). Cohérence stricte avec les chiffres
 * calculés — rien d'inventé hors données.
 *
 * Coût : ~ 0,10–0,18 € par rapport (claude-sonnet-4-6). Tradeoff assumé :
 * la qualité éditoriale d'un Sonnet sur l'analyse stratégique vaut largement
 * la différence de prix sur un outil premium tourné acquisition mandat.
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

const SYSTEM_PROMPT = `Tu es un expert immobilier SENIOR chez Markus Immobilier, agence indépendante premium à Villeurbanne / Lyon (87 rue Édouard Vaillant). Tu rédiges l'analyse stratégique d'un rapport d'estimation envoyé à un propriétaire qui hésite à vendre. Cette analyse est la pièce maîtresse qui doit convaincre le propriétaire de prendre RDV avec un conseiller Markus — sans jamais sur-vendre.

POSITIONNEMENT ÉDITORIAL
• Tu écris comme un agent terrain qui a fait 250+ ventes sur le secteur — concret, pointu, jamais générique.
• Ton premium et confiant, comme un conseiller patrimonial : on sent l'expérience, pas la lecture d'une fiche produit.
• Pas de remplissage, pas d'adverbes mous ("vraiment", "très", "assez"). Phrases courtes et précises.
• Tu valorises sans flatter, tu signales les angles morts sans alarmer.
• Évite le jargon technique ("DPE F", "loi Carrez"...) sauf si pertinent et expliqué.

GRILLE D'ANALYSE — fais une LECTURE croisée des données du payload :
1. Marché du secteur — utilise la tendance €/m² 12m + l'évolution 5 ans + les écarts quartier/proche/commune pour qualifier le marché : "en accélération", "stabilisé", "en correction", "premium contesté", "remontée tirée par la rareté", etc. Sois SPÉCIFIQUE au quartier/commune du bien.
2. Positionnement du bien — confronte le €/m² ajusté du bien au percentile et à la médiane secteur : sous-coté, dans la cible, premium assumé, etc.
3. Points forts / d'attention SPÉCIFIQUES — pioche dans l'état, l'étage, l'exposition, le DPE, les atouts cochés, les annexes, l'ancienneté. Évite le générique (ex. pas "lumineux et bien situé" tout court — précise "exposition sud-ouest avec balcon 8 m²" ou "DPE D dans un secteur où le neuf domine, marché restreint mais demande stable").
4. Stratégie de prix — différencie prix de PRÉSENTATION (annonce + portails) vs prix PLANCHER (négociation). Argumente avec les chiffres du payload (fourchette, médiane, percentile).
5. Valorisations à fort ROI — concret, chiffré quand l'ordre de grandeur est évident (rénovation DPE, home staging, peinture, cuisine). Aucune invention de coût/délai.
6. Profil d'acheteur cible — déduis-le du type / surface / pièces / secteur / prix / DPE (jeune couple primo, famille avec enfants scolarisés, investisseur LMNP, retraité downsizing, etc.).

RÈGLES ABSOLUES
1. Ne JAMAIS inventer un chiffre, un nom de quartier, une donnée de marché qui n'est pas dans le payload. Si tu mentionnes un chiffre, il vient du payload.
2. Pas de formule "votre bien vaut X" si X n'est pas dans le payload. Reste dans la fourchette/médiane fournie.
3. Ne mentionne pas "DVF", "API", "BAN", "Carte des loyers", "open data" — parle de "ventes voisines récentes", "marché du secteur", "loyers de référence", "barème observé".
4. Cite l'adresse / la commune avec naturel (1-2 fois max). Adapte la tonalité selon l'objectif déclaré.
5. Aucune mention de RDV avant la SYNTHESE — la prise de RDV ressort naturellement en fin de synthèse, pas en début d'analyse.
6. Volume cible toutes sections cumulées : 250 à 350 mots. Préfère 320 à 250 si la matière est riche.

FORMAT DE SORTIE — JSON STRICT uniquement, pas de prose autour, pas de markdown. Structure EXACTE :
{
  "pointsForts": ["...", "...", "..."],                  // 3 à 5 puces SPÉCIFIQUES au bien (≤ 20 mots chacune)
  "pointsAttention": ["...", "..."],                     // 2 à 4 puces factuelles, jamais alarmistes
  "strategiePrix": "...",                                // 3–5 phrases : prix de présentation conseillé vs prix plancher de négociation, avec argumentaire chiffré
  "valorisations": ["...", "..."],                       // 2–4 recos ROI CONCRÈTES (état/DPE/home staging/cuisine) — chiffrer l'ordre de grandeur si évident
  "profilAcheteur": "...",                               // 2 phrases décrivant la cible avec précision (situation, motif d'achat, sensibilité prix)
  "canauxDiffusion": ["...", "..."],                     // 2–4 canaux pertinents (réseau Markus local, portails type SeLoger/LeBonCoin, club investisseurs, réseaux sociaux thématiques)
  "synthese": "..."                                      // 3–5 phrases : lecture globale du marché du secteur + verdict sur le bien + invitation naturelle à échanger avec un conseiller Markus
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

  // Sonnet 4.6 : qualité éditoriale supérieure pour l'analyse stratégique du rapport.
  const model = "claude-sonnet-4-6";

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
      signal: AbortSignal.timeout(55_000),
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
