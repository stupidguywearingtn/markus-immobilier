/**
 * Client Apify pour le scraper Leboncoin (annonces) et l'actor téléphone.
 *
 * 2 patterns :
 * 1) `runSyncScrape` : POST run-sync-get-dataset-items (bloquant, ≤ 50s).
 * 2) `startScrapeRun` + `fetchRunResult` : lance un run async puis poll côté
 *    serveur si le sync est revenu en timeout (gardé pour le mode polling client).
 *
 * Actor par défaut : ahmed_hrid/leboncoin-immobilier-scraper.
 */

import type { RawLeboncoinListing } from "./normalize";

const APIFY_BASE = "https://api.apify.com/v2";
const DEFAULT_ACTOR = "ahmed_hrid~leboncoin-immobilier-scraper";

function getToken(): string {
  // Supporte les deux conventions de nommage (Apify docs utilise les deux selon
  // les pages : APIFY_TOKEN dans la CLI, APIFY_API_KEY dans certains SDKs).
  const t = process.env.APIFY_TOKEN || process.env.APIFY_API_KEY;
  if (!t) throw new Error("APIFY_TOKEN/APIFY_API_KEY env var missing");
  return t;
}

function actorSlug(): string {
  return process.env.APIFY_LEBONCOIN_ACTOR || DEFAULT_ACTOR;
}

export type ScrapeInput = {
  /** "9" = Ventes immobilières, "10" = Locations. */
  category?: "9" | "10";
  /** Ville française (ex. "Annemasse", "Lyon"). Envoyée en MAJUSCULES à l'actor. */
  location: string;
  maxItems?: number;
};

/**
 * Construit l'input EXACT attendu par ahmed_hrid/leboncoin-immobilier-scraper.
 *
 * Schéma de l'actor (vérifié via sa page Apify, mai 2026) :
 *   - category   : string REQUIS, "9" (Ventes) ou "10" (Locations). DÉFAUT "9".
 *   - location   : string OPTIONNEL, ex. "MARSEILLE", "PARIS", "LYON".
 *                  Si absent → "Tous la france".
 *   - maxItems   : integer 1–10000, défaut 100.
 *
 * NOTE : ne PAS envoyer `startUrls`, `searchUrls`, ou tout autre champ — l'actor
 * peut refuser un input non conforme à son schéma JSON.
 */
function buildActorInput(input: ScrapeInput) {
  return {
    category: input.category ?? "9",
    location: input.location.trim().toUpperCase(),
    maxItems: input.maxItems ?? 100,
  };
}

/**
 * Erreur enrichie portant le status HTTP + le corps brut de la réponse Apify,
 * pour pouvoir remonter le détail jusqu'à l'UI.
 */
export class ApifyHttpError extends Error {
  status: number;
  body: string;
  constructor(status: number, body: string) {
    super(`apify_${status}: ${body.slice(0, 200)}`);
    this.name = "ApifyHttpError";
    this.status = status;
    this.body = body;
  }
}

/**
 * POST /v2/acts/{actor}/run-sync-get-dataset-items
 * Lance le scraper ET attend la fin pour renvoyer le dataset.
 * Le caller doit appliquer un AbortSignal pour respecter le budget Vercel (< 60s).
 */
export async function runSyncScrape(
  input: ScrapeInput,
  signal?: AbortSignal,
): Promise<RawLeboncoinListing[]> {
  const token = getToken();
  const slug = actorSlug();
  const url = `${APIFY_BASE}/acts/${slug}/run-sync-get-dataset-items?token=${token}`;
  const payload = buildActorInput(input);

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`[apify] POST ${APIFY_BASE}/acts/${slug}/run-sync-get-dataset-items`);
  console.log(`[apify] payload:`, JSON.stringify(payload));

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  const rawText = await res.text();
  console.log(`[apify] response ${res.status} ${res.statusText}`);
  console.log(`[apify] body (first 500c):`, rawText.slice(0, 500));
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  if (!res.ok) {
    throw new ApifyHttpError(res.status, rawText);
  }
  let data: unknown;
  try {
    data = JSON.parse(rawText);
  } catch {
    throw new ApifyHttpError(res.status, `non_json_response: ${rawText.slice(0, 200)}`);
  }
  if (!Array.isArray(data)) {
    throw new ApifyHttpError(
      res.status,
      `unexpected_shape: ${JSON.stringify(data).slice(0, 200)}`,
    );
  }
  console.log(`[apify] ✓ runSyncScrape OK — ${data.length} items`);
  return data as RawLeboncoinListing[];
}

/* ───── Async (fallback long-running, > 50s) ───── */

export type RunHandle = { runId: string; datasetId: string };

/** Lance le scrape async, ne BLOQUE PAS. Retourne les IDs pour poller. */
export async function startScrapeRun(input: ScrapeInput): Promise<RunHandle> {
  const token = getToken();
  const slug = actorSlug();
  const url = `${APIFY_BASE}/acts/${slug}/runs?token=${token}`;
  const payload = buildActorInput(input);
  console.log(`[apify] POST ${APIFY_BASE}/acts/${slug}/runs (async)`);
  console.log(`[apify] payload:`, JSON.stringify(payload));
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const rawText = await res.text();
  console.log(`[apify] response ${res.status} ${res.statusText}`);
  console.log(`[apify] body (first 500c):`, rawText.slice(0, 500));
  if (!res.ok) {
    throw new ApifyHttpError(res.status, rawText);
  }
  let json: { data?: { id?: string; defaultDatasetId?: string } };
  try {
    json = JSON.parse(rawText);
  } catch {
    throw new ApifyHttpError(res.status, `non_json_response: ${rawText.slice(0, 200)}`);
  }
  const runId = json.data?.id;
  const datasetId = json.data?.defaultDatasetId;
  if (!runId || !datasetId) throw new ApifyHttpError(res.status, "apify_missing_run_ids");
  return { runId, datasetId };
}

export type RunStatus = "RUNNING" | "READY" | "SUCCEEDED" | "FAILED" | "TIMED-OUT" | "ABORTED";

export async function getRunStatus(runId: string): Promise<RunStatus> {
  const token = getToken();
  const res = await fetch(`${APIFY_BASE}/actor-runs/${runId}?token=${token}`);
  if (!res.ok) throw new Error(`apify_status_${res.status}`);
  const json = (await res.json()) as { data?: { status?: RunStatus } };
  return (json.data?.status as RunStatus) ?? "RUNNING";
}

export async function fetchDatasetItems(
  datasetId: string,
): Promise<RawLeboncoinListing[]> {
  const token = getToken();
  const res = await fetch(
    `${APIFY_BASE}/datasets/${datasetId}/items?token=${token}&clean=true`,
  );
  if (!res.ok) throw new Error(`apify_dataset_${res.status}`);
  const data = (await res.json()) as unknown;
  if (!Array.isArray(data)) throw new Error("apify_dataset_unexpected_shape");
  return data as RawLeboncoinListing[];
}

/* ───── Phone actor (clearpath/leboncoin-phone-scraper) ───── */

const DEFAULT_PHONE_ACTOR = "clearpath~leboncoin-phone-scraper";

/**
 * Résultat de la récupération téléphone.
 * - `phone: string` : numéro réellement trouvé.
 * - `phone: null`   : actor a tourné OK, mais le vendeur n'a pas publié de tel.
 *                     → côté UI, on affiche "Pas de numéro disponible", pas une erreur.
 */
export type PhoneLookupResult =
  | { found: true; phone: string }
  | { found: false; phone: null };

/**
 * POST /v2/acts/clearpath~leboncoin-phone-scraper/run-sync-get-dataset-items
 *
 * Input attendu par l'actor : `{ annonces: [url] }` (tableau d'URLs OU d'IDs).
 * Sortie : `[{ phone: string | null, ... }]` — null si vendeur sans tel.
 *
 * ⚠️ L'actor facture 0,05 $ par exécution. À appeler EXCLUSIVEMENT à la demande
 * (clic utilisateur), JAMAIS en batch automatique.
 *
 * Actor configurable via APIFY_PHONE_ACTOR si besoin.
 */
export async function fetchPhoneForUrl(
  url: string,
  signal?: AbortSignal,
): Promise<PhoneLookupResult> {
  const token = getToken();
  const slug = process.env.APIFY_PHONE_ACTOR || DEFAULT_PHONE_ACTOR;
  const endpoint = `${APIFY_BASE}/acts/${slug}/run-sync-get-dataset-items?token=${token}`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ annonces: [url] }),
    signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`apify_phone_${res.status}: ${text.slice(0, 200)}`);
  }
  const data = (await res.json()) as unknown;
  if (!Array.isArray(data) || data.length === 0) {
    return { found: false, phone: null };
  }
  const item = data[0] as Record<string, unknown>;
  return extractPhone(item);
}

function extractPhone(item: Record<string, unknown>): PhoneLookupResult {
  // Le champ canonique de clearpath/leboncoin-phone-scraper est `phone`.
  // Si null → vendeur sans tel publié.
  if (item.phone === null) return { found: false, phone: null };
  if (typeof item.phone === "string" && item.phone.trim().length >= 6) {
    return { found: true, phone: item.phone.trim() };
  }
  // Fallback : tente quelques alias au cas où l'actor évolue
  for (const alt of [item.phoneNumber, item.phone_number, item.tel]) {
    if (typeof alt === "string" && alt.trim().length >= 6) {
      return { found: true, phone: alt.trim() };
    }
  }
  return { found: false, phone: null };
}
