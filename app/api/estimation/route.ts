import { NextResponse } from "next/server";
import { z } from "zod";
import { notify } from "@/lib/notify";
import { sendEmail, DEFAULT_NOTIFY_EMAIL } from "@/lib/email";
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

// Le pipeline (géocodage + DVF + appel Claude non streamé) peut dépasser la
// limite par défaut des fonctions Vercel — cf. /api/recrutement.
export const maxDuration = 60;

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

  // 7) Notify lead (log structuré)
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

  // 8) Emails Resend — (a) au demandeur, (b) à l'agence. Non bloquant : un échec
  //    d'email ne doit pas faire échouer l'estimation. On logge chaque résultat.
  const notifyEmail = process.env.ESTIMATION_NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL;
  const emails = buildEstimationEmails({
    prenom: data.prenom,
    nom: data.nom,
    email: data.email,
    telephone: data.telephone,
    typeBien: data.typeBien,
    adresse: data.adresse,
    commune,
    surface: data.surface,
    low: estimation.low,
    high: estimation.high,
    basePrice: estimation.basePrice,
    pricePerSqm: estimation.pricePerSqmAdjusted,
    confidence: estimation.confidence.label,
    score: score.overall,
  });

  const [clientSend, agencySend] = await Promise.all([
    sendEmail({
      to: data.email,
      subject: emails.client.subject,
      html: emails.client.html,
      replyTo: notifyEmail,
    }),
    sendEmail({
      to: notifyEmail,
      subject: emails.agency.subject,
      html: emails.agency.html,
      replyTo: data.email,
    }),
  ]);

  console.log(
    `[estimation/email] client(${data.email})=${clientSend.ok ? "OK" : `FAIL:${clientSend.status}:${clientSend.error}`} | agency(${notifyEmail})=${agencySend.ok ? "OK" : `FAIL:${agencySend.status}:${agencySend.error}`}`,
  );

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
      email: {
        client: clientSend.ok ? "ok" : `error:${clientSend.status}:${clientSend.error}`,
        agency: agencySend.ok ? "ok" : `error:${agencySend.status}:${agencySend.error}`,
        notifyTo: notifyEmail,
      },
    },
  });
}

/* ───────────────────────────────────────────────────────────────────────────
   Templates email — HTML inline (email-safe), charte Markus.
   ─────────────────────────────────────────────────────────────────────────── */

type EmailPayload = {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  typeBien: string;
  adresse: string;
  commune?: string;
  surface?: number;
  low: number;
  high: number;
  basePrice: number;
  pricePerSqm: number;
  confidence: string;
  score: number;
};

function buildEstimationEmails(p: EmailPayload) {
  const eur = (n: number) =>
    new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " €";
  const ANTHRACITE = "#383E42";
  const SAUGE = "#9EA596";
  const lieu = p.commune ? `${p.adresse} — ${p.commune}` : p.adresse;

  const shell = (inner: string) => `
<div style="margin:0;padding:0;background:#F4F5F3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F5F3;padding:32px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;color:${ANTHRACITE};">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(56,62,66,0.10);">
        <tr><td style="background:${ANTHRACITE};padding:26px 32px;">
          <span style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:0.04em;">MARKUS</span>
          <span style="color:${SAUGE};font-size:11px;letter-spacing:0.32em;display:block;margin-top:2px;">IMMOBILIER</span>
        </td></tr>
        ${inner}
        <tr><td style="background:#F4F5F3;padding:20px 32px;font-size:11px;color:#7a817f;line-height:1.6;">
          Markus Immobilier — 87 rue Édouard Vaillant, 69100 Villeurbanne<br/>
          04 78 37 13 67 · villeurbanne@markusimmobilier.fr
        </td></tr>
      </table>
    </td></tr>
  </table>
</div>`;

  // (a) Email au demandeur
  const clientHtml = shell(`
    <tr><td style="padding:32px;">
      <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${SAUGE};font-weight:700;margin:0 0 10px;">Votre estimation</p>
      <h1 style="font-size:22px;margin:0 0 16px;color:${ANTHRACITE};">Bonjour ${p.prenom}, voici votre estimation</h1>
      <p style="font-size:15px;line-height:1.6;color:#3d4347;margin:0 0 22px;">
        Merci d'avoir utilisé notre outil d'estimation pour votre bien situé <b>${lieu}</b>${p.surface ? ` (${p.surface} m²)` : ""}. Voici la fourchette estimée à partir des ventes récentes du secteur :
      </p>
      <div style="background:#F4F5F3;border-left:3px solid ${SAUGE};border-radius:12px;padding:22px 24px;margin:0 0 22px;">
        <div style="font-size:28px;font-weight:800;color:${ANTHRACITE};">${eur(p.low)} – ${eur(p.high)}</div>
        <div style="font-size:13px;color:#7a817f;margin-top:6px;">Prix médian : <b style="color:${ANTHRACITE};">${eur(p.basePrice)}</b> · ${eur(p.pricePerSqm)}/m² · Fiabilité ${p.confidence}</div>
      </div>
      <p style="font-size:15px;line-height:1.6;color:#3d4347;margin:0 0 24px;">
        Un conseiller Markus peut affiner cette estimation lors d'une visite et vous présenter une stratégie de prix sur-mesure — sans engagement.
      </p>
      <a href="tel:0478371367" style="display:inline-block;background:${SAUGE};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:13px 26px;border-radius:8px;">Être rappelé · 04 78 37 13 67</a>
      <p style="font-size:11px;color:#9aa09d;margin:22px 0 0;line-height:1.6;">
        Estimation indicative générée automatiquement à partir de données de marché. Elle ne constitue pas une évaluation contractuelle.
      </p>
    </td></tr>`);

  // (b) Email à l'agence
  const agencyHtml = shell(`
    <tr><td style="padding:32px;">
      <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${SAUGE};font-weight:700;margin:0 0 10px;">Nouveau lead estimation</p>
      <h1 style="font-size:20px;margin:0 0 18px;color:${ANTHRACITE};">${p.prenom} ${p.nom}</h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#3d4347;">
        ${row("Téléphone", `<a href="tel:${p.telephone.replace(/\s/g, "")}" style="color:${ANTHRACITE};font-weight:600;">${p.telephone}</a>`)}
        ${row("Email", `<a href="mailto:${p.email}" style="color:${ANTHRACITE};font-weight:600;">${p.email}</a>`)}
        ${row("Type de bien", p.typeBien)}
        ${row("Adresse", lieu)}
        ${row("Surface", p.surface ? `${p.surface} m²` : "—")}
        ${row("Estimation", `<b>${eur(p.low)} – ${eur(p.high)}</b> (médian ${eur(p.basePrice)})`)}
        ${row("€/m²", eur(p.pricePerSqm))}
        ${row("Score bien", `${p.score}/100`)}
        ${row("Fiabilité", p.confidence)}
      </table>
      <p style="font-size:13px;color:#7a817f;margin:22px 0 0;">À rappeler rapidement pendant que le lead est chaud.</p>
    </td></tr>`);

  return {
    client: {
      subject: `Votre estimation Markus Immobilier — ${p.adresse}`,
      html: clientHtml,
    },
    agency: {
      subject: `Nouveau lead estimation — ${p.prenom} ${p.nom}${p.commune ? ` (${p.commune})` : ""}`,
      html: agencyHtml,
    },
  };
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:9px 0;border-bottom:1px solid #eceee9;color:#7a817f;width:130px;vertical-align:top;">${label}</td>
    <td style="padding:9px 0;border-bottom:1px solid #eceee9;">${value}</td>
  </tr>`;
}
