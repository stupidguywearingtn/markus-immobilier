import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase pour les Server Components / route handlers en LECTURE
 * publique (anon key, RLS = seules les lignes publiques sortent).
 * Ne JAMAIS importer depuis un composant client.
 *
 * `revalidate` : durée de cache ISR de la requête sous-jacente (secondes).
 * Renvoie `null` si l'environnement Supabase n'est pas configuré.
 */
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function serverSupabase(revalidate = 60): SupabaseClient | null {
  if (!URL || !KEY) return null;
  return createClient(URL, KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...init, next: { revalidate } } as RequestInit),
    },
  });
}
