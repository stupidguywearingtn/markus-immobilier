import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase pour les Server Components / route handlers en LECTURE
 * publique (anon key, RLS = seules les lignes publiques sortent).
 * Ne JAMAIS importer depuis un composant client.
 *
 * `cacheMode` :
 *   - un nombre  -> cache ISR de N secondes (`next: { revalidate: N }`)
 *   - `false`    -> aucune mise en cache (`cache: "no-store"`) — données toujours fraîches
 * Renvoie `null` si l'environnement Supabase n'est pas configuré.
 */
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function serverSupabase(
  cacheMode: number | false = 60,
): SupabaseClient | null {
  if (!SB_URL || !SB_KEY) return null;
  return createClient(SB_URL, SB_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const extra: RequestInit =
          cacheMode === false
            ? { cache: "no-store" }
            : ({ next: { revalidate: cacheMode } } as RequestInit);
        return fetch(input, { ...init, ...extra });
      },
    },
  });
}
