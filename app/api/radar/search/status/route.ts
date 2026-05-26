import { NextResponse } from "next/server";
import { getRunStatus, fetchDatasetItems } from "@/lib/radar/apify";
import { processListings } from "../route";
import type { SearchResponse } from "@/lib/radar/types";

/**
 * Polling pour les runs Apify async.
 *   GET /api/radar/search/status?runId=…&datasetId=…&city=…
 *
 * - Si run encore RUNNING : { ok: true, pending: true }
 * - Si SUCCEEDED         : fetch dataset, normalize+DVF+score → réponse complète
 * - Si FAILED / TIMED-OUT: { ok: false, error }
 *
 * Le client poll cet endpoint toutes les 3s.
 */

export const maxDuration = 60;
export const dynamic = "force-dynamic";

function jsonUtf8(body: unknown, status = 200): NextResponse {
  return new NextResponse(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const runId = url.searchParams.get("runId");
  const datasetId = url.searchParams.get("datasetId");
  const city = (url.searchParams.get("city") || "").trim();

  if (!runId || !datasetId || !city) {
    return jsonUtf8({ ok: false, error: "missing_params" }, 400);
  }

  try {
    const status = await getRunStatus(runId);
    if (status === "FAILED" || status === "TIMED-OUT" || status === "ABORTED") {
      return jsonUtf8({ ok: false, error: `run_${status.toLowerCase()}` }, 502);
    }
    if (status !== "SUCCEEDED") {
      // Toujours en cours
      return jsonUtf8({ ok: true, pending: true, status });
    }

    // Run terminé → on récupère le dataset et on traite
    const raw = await fetchDatasetItems(datasetId);
    const { listings, diagnostics } = await processListings(raw);
    const response: SearchResponse = {
      ok: true,
      city,
      count: listings.length,
      listings,
      source: "apify",
      diagnostics,
    };
    return jsonUtf8(response);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "apify_status_error";
    return jsonUtf8({ ok: false, error: msg }, 502);
  }
}
