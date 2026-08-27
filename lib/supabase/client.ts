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
// .trim() : une valeur d'env avec espace/retour-ligne parasite (copier-coller
// dans Vercel) produit sinon "Failed to execute 'fetch' on 'Window': Invalid value"
// (caractère invalide dans l'URL ou l'en-tête apikey/Authorization).
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
  "https://placeholder.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "placeholder-anon-key";

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
