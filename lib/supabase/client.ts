import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase — navigateur (singleton).
 *
 * L'anon key est publique par design : la sécurité repose sur les policies RLS
 * (écriture réservée aux admins via `has_role`). Voir supabase/migrations/.
 *
 * Si les variables d'env sont absentes, on n'échoue PAS (le site public doit
 * rester servable) : on instancie sur une URL placeholder et on avertit dans la
 * console côté navigateur. Le back-office reste alors inactif tant que
 * NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY ne sont pas définis.
 */
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

if (typeof window !== "undefined" && !supabaseConfigured) {
  console.warn(
    "[supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY manquants — back-office inactif.",
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    // Pas de localStorage en SSR : on ne le passe que côté client.
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});
