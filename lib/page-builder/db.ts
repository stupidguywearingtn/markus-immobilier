import type { Data } from "@puckeditor/core";
import { serverSupabase } from "@/lib/supabase/server";
import { SITE_ID } from "@/lib/backoffice/config";

/**
 * Lecture SERVEUR des pages publiées depuis l'éditeur (table `site_pages`).
 * Ne jamais importer depuis un composant client.
 *
 * Cache : 60 s (comme le reste du back-office), et la publication force une
 * revalidation immédiate (app/api/admin/pages/revalidate) — le client voit sa
 * modification en ligne tout de suite, le visiteur ne paie jamais une requête
 * base à chaque affichage.
 */

export type PublishedPage = {
  slug: string;
  titre: string;
  data: Data;
  publishedAt: string | null;
};

type Row = { slug: string; titre: string; published: Data | null; published_at: string | null };

export async function getPublishedPage(slug: string): Promise<PublishedPage | null> {
  const sb = serverSupabase(60);
  if (!sb) return null;
  try {
    const { data, error } = await sb
      .from("site_pages")
      .select("slug, titre, published, published_at")
      .eq("site_id", SITE_ID)
      .eq("slug", slug)
      .eq("en_ligne", true)
      .not("published", "is", null)
      .maybeSingle();
    if (error || !data) return null;
    const row = data as Row;
    if (!row.published || !Array.isArray(row.published.content)) return null;
    return { slug: row.slug, titre: row.titre, data: row.published, publishedAt: row.published_at };
  } catch {
    return null;
  }
}

/** Pages libres publiées et indexables — pour le sitemap. */
export async function getPublishedPagesForSitemap(): Promise<{ slug: string; publishedAt: string | null }[]> {
  const sb = serverSupabase(3600);
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from("site_pages")
      .select("slug, published, published_at")
      .eq("site_id", SITE_ID)
      .eq("en_ligne", true)
      .neq("slug", "")
      .not("published", "is", null);
    if (error || !data) return [];
    return (data as Row[])
      .filter((r) => (r.published?.root as { props?: { indexer?: string } })?.props?.indexer !== "non")
      .map((r) => ({ slug: r.slug, publishedAt: r.published_at }));
  } catch {
    return [];
  }
}

/** Réglages SEO saisis dans le panneau « Page » de l'éditeur. */
export function rootSeo(data: Data): { title?: string; description?: string; noindex: boolean } {
  const p = ((data.root as { props?: Record<string, unknown> })?.props ?? data.root ?? {}) as Record<string, unknown>;
  const s = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
  return { title: s(p.title), description: s(p.description), noindex: p.indexer === "non" };
}
