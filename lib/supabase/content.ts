import { createClient } from "@supabase/supabase-js";
import { SITE_ID } from "@/lib/backoffice/config";

/**
 * Lecture SERVEUR des champs publiés (`site_content_fields`).
 * Ne JAMAIS importer ce module depuis un composant client.
 *
 * Renvoie une map `` `${section}.${field}` `` -> valeur publiée (non vide).
 * Ne jette jamais : en cas d'erreur / config absente -> `{}` (les composants
 * retombent sur leur fallback codé en dur).
 */
export type PublishedFields = Record<string, string>;

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

const serverClient =
  URL && KEY
    ? createClient(URL, KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: {
          // Cache ISR : revalidation toutes les 60 s.
          fetch: (input: RequestInfo | URL, init?: RequestInit) =>
            fetch(input, {
              ...init,
              next: { revalidate: 60 },
            } as RequestInit),
        },
      })
    : null;

export async function getPublishedFields(): Promise<PublishedFields> {
  if (!serverClient) return {};
  try {
    const { data, error } = await serverClient
      .from("site_content_fields")
      .select("section_key, field_key, content_value")
      .eq("site_id", SITE_ID);

    if (error || !data) return {};

    const map: PublishedFields = {};
    for (const row of data as Array<{
      section_key: string;
      field_key: string;
      content_value: string | null;
    }>) {
      const v = row.content_value ?? "";
      if (v !== "") map[`${row.section_key}.${row.field_key}`] = v;
    }
    return map;
  } catch {
    return {};
  }
}
