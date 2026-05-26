import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { fetchComparables } from "@/lib/dvf";
import { geocodeAddress } from "@/lib/estimation";
import { normalizeListing, type RawLeboncoinListing } from "@/lib/radar/normalize";
import { scoreListing } from "@/lib/radar/score";
import type { ScoredListing, SearchResponse } from "@/lib/radar/types";
import { ApifyHttpError, runSyncScrape, startScrapeRun } from "@/lib/radar/apify";

/**
 * Radar — recherche par ville.
 *
 *   GET /api/radar/search?city=<ville>[&source=mock|apify]
 *
 * Mode `mock` (défaut) : lit data/test.json (UTF-8) → score → renvoie.
 * Mode `apify`         : essaie run-sync 50s ; si timeout, bascule async +
 *                        renvoie { pending: true, runId, datasetId } à poller
 *                        sur /api/radar/search/status.
 */

export const maxDuration = 60; // Vercel Pro
export const dynamic = "force-dynamic";

const SYNC_BUDGET_MS = 50_000; // marge de 10s sous la limite Vercel

async function loadMockData(): Promise<RawLeboncoinListing[]> {
  const filePath = path.join(process.cwd(), "data", "test.json");
  const raw = await fs.readFile(filePath, { encoding: "utf8" });
  return JSON.parse(raw);
}

/** €/m² médian secteur via DVF (lib/dvf.ts, cache mémoire). */
async function getMarketM2(
  insee: string | undefined,
  lat: number | null,
  lng: number | null,
  typeBien: string | undefined,
  surface: number | undefined,
): Promise<number | undefined> {
  if (!insee || lat == null || lng == null) return undefined;
  const t = (typeBien || "").toLowerCase();
  const dvfType = t.includes("maison")
    ? "maison"
    : t.includes("terrain")
      ? "terrain"
      : t.includes("local")
        ? "local"
        : "appartement";
  try {
    const res = await fetchComparables({
      lat,
      lon: lng,
      insee,
      typeBien: dvfType,
      surface,
      minResults: 5,
      monthsBack: 36,
    });
    if (res.comparables.length === 0) return undefined;
    const sorted = res.comparables.map((c) => c.pricePerSqm).sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  } catch {
    return undefined;
  }
}

/** Normalise + enrichit DVF + score, pour un lot d'annonces brutes. */
export async function processListings(raw: RawLeboncoinListing[]): Promise<{
  listings: ScoredListing[];
  diagnostics: { dvfHits: number; dvfMisses: number; duplicatesDropped: number };
}> {
  // Dédup par list_id : l'actor Apify renvoie parfois la même annonce 2x.
  // On filtre AVANT normalize/DVF/score pour ne pas payer les coûts en double.
  const seen = new Set<string>();
  const uniqueRaw = raw.filter((item) => {
    const id = String(item.list_id ?? "");
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
  const duplicatesDropped = raw.length - uniqueRaw.length;
  if (duplicatesDropped > 0) {
    console.log(
      `[radar/processListings] dedup: ${raw.length} → ${uniqueRaw.length} (-${duplicatesDropped} doublons)`,
    );
  }

  // Log un échantillon brut de first_publication_date pour vérifier le format
  if (uniqueRaw[0]) {
    console.log(
      `[radar/processListings] sample first_publication_date raw="${uniqueRaw[0].first_publication_date}" → parsed=${new Date(
        (uniqueRaw[0].first_publication_date || "").replace(" ", "T") + "Z",
      ).toISOString()}`,
    );
  }

  const normalized = uniqueRaw.map(normalizeListing);

  const inseeCache = new Map<string, string | undefined>();
  async function inseeFor(addr: string): Promise<string | undefined> {
    if (inseeCache.has(addr)) return inseeCache.get(addr);
    const geo = await geocodeAddress(addr);
    inseeCache.set(addr, geo?.insee);
    return geo?.insee;
  }

  let dvfHits = 0;
  let dvfMisses = 0;
  const scored = await Promise.all(
    normalized.map(async (l) => {
      const key =
        `${l.location.zipcode || ""} ${l.location.city || ""}`.trim() ||
        l.location.label;
      const insee = key ? await inseeFor(key) : undefined;
      const marketM2 = await getMarketM2(
        insee,
        l.location.lat,
        l.location.lng,
        l.realEstateType,
        l.surface,
      );
      if (marketM2) dvfHits++;
      else dvfMisses++;
      return scoreListing(l, marketM2);
    }),
  );
  scored.sort((a, b) => b.score - a.score);
  return {
    listings: scored,
    diagnostics: { dvfHits, dvfMisses, duplicatesDropped },
  };
}

function jsonUtf8(body: unknown, init?: number | { status?: number }): NextResponse {
  const status = typeof init === "number" ? init : init?.status ?? 200;
  return new NextResponse(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const city = (url.searchParams.get("city") || "").trim();
  const source = (url.searchParams.get("source") || "mock").toLowerCase();

  if (!city) return jsonUtf8({ ok: false, error: "missing_city" }, 400);

  const t0 = Date.now();

  // ────── MODE LIVE APIFY — AUCUN FALLBACK vers mock ──────
  if (source === "apify") {
    console.log(`\n[radar/search] LIVE Apify request for city="${city}"`);
    if (!process.env.APIFY_TOKEN && !process.env.APIFY_API_KEY) {
      return jsonUtf8(
        {
          ok: false,
          error: "apify_token_missing",
          hint: "APIFY_API_KEY manquante côté serveur.",
          httpStatus: null,
          apifyBody: null,
        },
        500,
      );
    }

    // 1) Tentative run-sync avec budget 50s
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), SYNC_BUDGET_MS);
    try {
      const raw = await runSyncScrape({ location: city, maxItems: 100 }, ctrl.signal);
      clearTimeout(timer);
      const tFetch = Date.now() - t0;
      const { listings, diagnostics } = await processListings(raw);
      console.log(
        `[radar/search] ✓ Apify returned ${raw.length} raw / ${listings.length} scored for "${city}"`,
      );
      const response: SearchResponse = {
        ok: true,
        city,
        count: listings.length,
        listings,
        source: "apify",
        diagnostics: {
          ...diagnostics,
          timing: { fetch: tFetch, dvf: Date.now() - t0 - tFetch, score: 0 },
        },
      };
      return jsonUtf8(response);
    } catch (err) {
      clearTimeout(timer);
      const aborted = ctrl.signal.aborted || (err instanceof Error && err.name === "AbortError");
      if (!aborted) {
        // Erreur Apify dure (4xx/5xx/parse) — on REMONTE le détail brut au client
        const status = err instanceof ApifyHttpError ? err.status : null;
        const body = err instanceof ApifyHttpError ? err.body : null;
        const msg = err instanceof Error ? err.message : "apify_error";
        console.error(
          `[radar/search] ✗ Apify FAILED for "${city}" — status=${status} msg=${msg}`,
        );
        return jsonUtf8(
          {
            ok: false,
            error: msg,
            httpStatus: status,
            apifyBody: body,
            hint: status
              ? `Apify a répondu HTTP ${status}.`
              : "Erreur côté actor Apify.",
          },
          502,
        );
      }
      // 2) Sync trop long → bascule en async
      console.log(`[radar/search] sync budget exceeded for "${city}" → async fallback`);
      try {
        const handle = await startScrapeRun({ location: city, maxItems: 100 });
        return jsonUtf8({
          ok: true,
          pending: true,
          city,
          runId: handle.runId,
          datasetId: handle.datasetId,
          message: "Recherche longue — polling sur /api/radar/search/status",
        });
      } catch (err2) {
        const status = err2 instanceof ApifyHttpError ? err2.status : null;
        const body = err2 instanceof ApifyHttpError ? err2.body : null;
        const msg = err2 instanceof Error ? err2.message : "apify_start_failed";
        console.error(`[radar/search] ✗ startScrapeRun FAILED for "${city}":`, msg);
        return jsonUtf8(
          {
            ok: false,
            error: msg,
            httpStatus: status,
            apifyBody: body,
            hint: `Impossible de lancer le run async.`,
          },
          502,
        );
      }
    }
  }

  // ────── MODE MOCK (test.json) — JAMAIS atteint si source=apify ──────
  const raw = await loadMockData();
  const tFetch = Date.now() - t0;
  const { listings, diagnostics } = await processListings(raw);
  const response: SearchResponse = {
    ok: true,
    city,
    count: listings.length,
    listings,
    source: "mock",
    diagnostics: {
      ...diagnostics,
      timing: { fetch: tFetch, dvf: Date.now() - t0 - tFetch, score: 0 },
    },
  };
  return jsonUtf8(response);
}
