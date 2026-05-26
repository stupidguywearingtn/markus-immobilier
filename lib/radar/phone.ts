export type PhoneState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ok"; phone: string }
  | { status: "unavailable"; message: string }
  | { status: "error"; message: string };

export async function fetchListingPhone(url: string): Promise<PhoneState> {
  try {
    const res = await fetch(`/api/radar/phone?url=${encodeURIComponent(url)}`);
    const json = (await res.json()) as
      | { ok: true; phone: string }
      | { ok: true; phone: null; message: string }
      | { ok: false; error: string; hint?: string };

    if (!res.ok || !json.ok) {
      const msg =
        ("hint" in json && json.hint) ||
        ("error" in json
          ? json.error === "apify_token_missing"
            ? "Token Apify manquant."
            : "Récupération impossible."
          : "Récupération impossible.");
      return { status: "error", message: msg as string };
    }
    if (json.phone === null) {
      return {
        status: "unavailable",
        message: (json as { message?: string }).message ?? "Pas de numéro disponible",
      };
    }
    return { status: "ok", phone: (json as { phone: string }).phone };
  } catch {
    return { status: "error", message: "Erreur réseau." };
  }
}
