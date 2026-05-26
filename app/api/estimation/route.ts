import { NextResponse } from "next/server";
import { z } from "zod";
import { notify } from "@/lib/notify";
import { fetchComparables } from "@/lib/dvf";
import {
  computeEstimation,
  computeTrend,
  computePositioning,
  computeNeighborhood,
  computeRent,
  computeScore,
  geocodeAddress,
} from "@/lib/estimation";
import { generateAnalysis } from "@/lib/llm";

/**
 * Pipeline d'estimation — étape 3 du build.
 * 1. Valide le payload.
 * 2. Géocode l'adresse côté serveur si nécessaire.
 * 3. Récupère les comparables DVF (5 ans, commune INSEE).
 * 4. Calcule : estimation, tendance, positionnement, voisinage, locatif, score.
 * 5. Appelle Claude Haiku pour l'analyse rédigée (graceful si pas de clé).
 * 6. Retourne le rapport complet.
 */

const schema = z
  .object({
    typeBien: z.enum(["appartement", "maison", "terrain", "immeuble", "local"]),
    adresse: z.string().min(5),
    adresseLat: z.number().optional(),
    adresseLng: z.number().optional(),
    adresseCommune: z.string().optional(),
    adresseCodePostal: z.string().optional(),
    adresseInsee: z.string().optional(),
    surface: z.number().positive().optional(),
    surfaceTerrain: z.number().positive().optional(),
    prenom: z.string().min(2),
    nom: z.string().min(2),
    email: z.email(),
    telephone: z.string().min(10),
    rgpd: z.literal(true),
  })
  .passthrough();

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }
  const data = parsed.data;

  // 1) Géocodage
  let lat = data.adresseLat;
  let lon = data.adresseLng;
  let insee = data.adresseInsee;
  let commune = data.adresseCommune;
  let postcode = data.adresseCodePostal;
  let geoFallback = false;

  if (typeof lat !== "number" || typeof lon !== "number" || !insee) {
    const geo = await geocodeAddress(data.adresse);
    if (!geo) {
      return NextResponse.json(
        { ok: false, error: "geocode_failed", message: "Adresse non géocodée." },
        { status: 422 },
      );
    }
    lat = geo.lat;
    lon = geo.lon;
    insee = insee ?? geo.insee;
    commune = commune ?? geo.commune;
    postcode = postcode ?? geo.postcode;
    geoFallback = true;
  }

  // 2) DVF — 5 ans, même commune
  const dvf = await fetchComparables({
    lat,
    lon,
    insee,
    typeBien: data.typeBien,
    surface: data.surface,
    minResults: 8,
    monthsBack: 36,
  });

  const comparables = dvf.comparables;
  const radiusUsed = dvf.radiusUsed;

  // 3) Pas assez de comparables ou pas de surface → réponse minimale
  if (comparables.length < 2 || !data.surface) {
    await notify("estimation", {
      prenom: data.prenom, nom: data.nom, email: data.email, telephone: data.telephone,
      typeBien: data.typeBien, adresse: data.adresse, surface: data.surface,
      estimation: null,
    });
    return NextResponse.json({
      ok: true,
      estimation: null,
      comparables,
      geo: { lat, lon, fallback: geoFallback, commune, postcode },
      diagnostics: { dvfError: false, radiusUsed, totalComparables: comparables.length },
    });
  }

  // 4) Estimation principale
  const estimationInput = {
    typeBien: data.typeBien,
    surface: data.surface,
    surfaceTerrain: data.surfaceTerrain,
    etage: (data as Record<string, unknown>).etage as number | undefined,
    ascenseur: (data as Record<string, unknown>).ascenseur as boolean | undefined,
    exterieur: (data as Record<string, unknown>).exterieur as string | undefined,
    surfaceExterieur: (data as Record<string, unknown>).surfaceExterieur as number | undefined,
    exposition: (data as Record<string, unknown>).exposition as string | undefined,
    piscine: (data as Record<string, unknown>).piscine as boolean | undefined,
    combles: (data as Record<string, unknown>).combles as boolean | undefined,
    etat: (data as Record<string, unknown>).etat as string | undefined,
    anneeConstruction: (data as Record<string, unknown>).anneeConstruction as string | undefined,
    dpe: (data as Record<string, unknown>).dpe as string | undefined,
    atouts: (data as Record<string, unknown>).atouts as string[] | undefined,
    annexes: (data as Record<string, unknown>).annexes as string[] | undefined,
  };

  const estimation = computeEstimation(estimationInput, comparables, radiusUsed);

  // 5) Analyses macro (sur 5 ans de ventes commune)
  const trend = computeTrend(dvf.allTypeInCommune);
  const positioning = computePositioning(estimation.pricePerSqmAdjusted, comparables);
  const neighborhood = computeNeighborhood(dvf.allTypeInCommune);
  const rent = computeRent(insee, data.typeBien, data.surface, estimation.basePrice);
  const score = computeScore(estimationInput, estimation, trend, positioning);

  // 6) Analyse LLM (gracieuse si clé absente)
  const objectif = (data as Record<string, unknown>).objectif as string | undefined;
  const { analysis, error: llmError, model } = await generateAnalysis({
    subject: { ...estimationInput, adresse: data.adresse, commune, typeBien: data.typeBien },
    estimation,
    comparables,
    trend,
    positioning,
    neighborhood,
    rent,
    score,
    objectif,
  });

  // 7) Notify lead
  await notify("estimation", {
    prenom: data.prenom,
    nom: data.nom,
    email: data.email,
    telephone: data.telephone,
    typeBien: data.typeBien,
    adresse: data.adresse,
    commune,
    surface: data.surface,
    estimation: {
      low: estimation.low,
      high: estimation.high,
      basePrice: estimation.basePrice,
      pricePerSqm: estimation.pricePerSqmAdjusted,
      confidence: estimation.confidence.label,
      score: score.overall,
    },
  });

  return NextResponse.json({
    ok: true,
    estimation,
    comparables: comparables.slice(0, 12),
    trend,
    positioning,
    neighborhood,
    rent,
    score,
    analysis,
    geo: { lat, lon, fallback: geoFallback, commune, postcode, insee },
    diagnostics: {
      dvfError: false,
      radiusUsed,
      totalComparables: comparables.length,
      llmError: llmError ?? null,
      llmModel: model ?? null,
    },
  });
}
