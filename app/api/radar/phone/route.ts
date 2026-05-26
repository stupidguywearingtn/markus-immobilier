import { NextResponse } from "next/server";
import { fetchPhoneForUrl } from "@/lib/radar/apify";

/**
 * Récupère le numéro de téléphone d'UNE annonce Leboncoin via l'actor Apify
 * dédié. Appelé à la demande, depuis le panneau détail (clic "Récupérer le
 * téléphone"). Pas d'appel batch.
 *
 *   GET /api/radar/phone?url=<URL_annonce>
 *
 * Renvoie { ok, phone } ou { ok: false, error }.
 */

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const SYNC_BUDGET_MS = 50_000;

function jsonUtf8(body: unknown, status = 200): NextResponse {
  return new NextResponse(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url).searchParams.get("url");
  if (!url || !/^https?:\/\/(www\.)?leboncoin\.fr\//.test(url)) {
    return jsonUtf8({ ok: false, error: "invalid_url" }, 400);
  }
  if (!process.env.APIFY_TOKEN && !process.env.APIFY_API_KEY) {
    return jsonUtf8({ ok: false, error: "apify_token_missing" }, 500);
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), SYNC_BUDGET_MS);
  try {
    const result = await fetchPhoneForUrl(url, ctrl.signal);
    clearTimeout(timer);
    // Actor a tourné OK mais vendeur sans tel → 200, on dit clairement "pas dispo"
    if (!result.found) {
      return jsonUtf8({
        ok: true,
        phone: null,
        message: "Pas de numéro disponible",
      });
    }
    return jsonUtf8({ ok: true, phone: result.phone });
  } catch (err) {
    clearTimeout(timer);
    const msg = err instanceof Error ? err.message : "phone_fetch_failed";
    return jsonUtf8({ ok: false, error: msg }, 502);
  }
}
