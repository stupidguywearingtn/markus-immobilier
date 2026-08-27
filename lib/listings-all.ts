import {
  LISTINGS,
  CONTACT_TONY,
  type Listing,
  type ListingType,
  type ListingTransaction,
  type DpeLettre,
} from "@/lib/listings";
import { serverSupabase } from "@/lib/supabase/server";

/**
 * Fusion des annonces : source statique (`lib/listings.ts`, biens historiques)
 * + annonces publiées créées depuis le back-office Supabase.
 *
 * Les biens statiques sont PRIORITAIRES en cas de collision de slug.
 * Ne jette jamais : si Supabase est absent/HS -> uniquement les statiques.
 */

type DbPhoto = { url: string; alt: string };

type DbListingRow = {
  id: string;
  slug: string;
  status: string;
  titre: string;
  type: string;
  transaction: string;
  prix: number;
  prix_suffixe: string | null;
  adresse: string | null;
  quartier: string | null;
  ville: string;
  code_postal: string;
  surface: number | null;
  pieces: number | null;
  dpe: string | null;
  ges: string | null;
  description: string;
  atouts: string[] | null;
  photos: DbPhoto[] | null;
  mise_en_avant: boolean;
  created_at: string;
  published_at: string | null;
};

/** Colonnes lues pour l'affichage public. */
const DB_COLS =
  "id, slug, status, titre, type, transaction, prix, prix_suffixe, adresse, quartier, ville, code_postal, surface, pieces, dpe, ges, description, atouts, photos, mise_en_avant, created_at, published_at";

function rowToListing(r: DbListingRow): Listing {
  const photos = (Array.isArray(r.photos) ? r.photos : [])
    .filter((p) => p && typeof p.url === "string" && p.url)
    .map((p) => ({ src: p.url, alt: p.alt || `${r.titre} — ${r.ville}` }));

  return {
    id: r.id,
    slug: r.slug,
    titre: r.titre,
    type: r.type as ListingType,
    transaction: r.transaction as ListingTransaction,
    statut: "disponible",
    prix: r.prix,
    prixSuffixe: r.prix_suffixe ?? undefined,
    adresse: r.adresse ?? "",
    quartier: r.quartier ?? "",
    ville: r.ville,
    codePostal: r.code_postal,
    surface: r.surface ?? undefined,
    pieces: r.pieces ?? undefined,
    dpe: (r.dpe as DpeLettre) ?? undefined,
    ges: (r.ges as DpeLettre) ?? undefined,
    miseEnAvant: r.mise_en_avant,
    description: r.description,
    atouts: r.atouts ?? [],
    photos: photos.length ? photos : [{ src: "", alt: r.titre }],
    contact: CONTACT_TONY,
    seo: {
      title: `${r.titre} | Markus Immobilier`,
      description: (r.description || "").replace(/\s+/g, " ").trim().slice(0, 160),
      h1: r.titre,
    },
    publishedAt: (r.published_at ?? r.created_at ?? new Date().toISOString()).slice(
      0,
      10,
    ),
  };
}

export async function getPublishedDbListings(): Promise<Listing[]> {
  const supabase = serverSupabase();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("listings")
      .select(DB_COLS)
      .eq("status", "published");
    if (error || !data) return [];
    return (data as DbListingRow[]).map(rowToListing);
  } catch {
    return [];
  }
}

/** Toutes les annonces (statiques + base publiée), dédoublonnées par slug. */
export async function getAllListings(): Promise<Listing[]> {
  const db = await getPublishedDbListings();
  const bySlug = new Map<string, Listing>();
  for (const l of LISTINGS) bySlug.set(l.slug, l); // statiques prioritaires
  for (const l of db) if (!bySlug.has(l.slug)) bySlug.set(l.slug, l);
  return [...bySlug.values()];
}

/** Annonces disponibles : mises en avant d'abord, puis plus récentes d'abord. */
export async function getAllAvailableListings(): Promise<Listing[]> {
  const all = await getAllListings();
  return all
    .filter((l) => l.statut === "disponible")
    .sort((a, b) => {
      if (!!a.miseEnAvant !== !!b.miseEnAvant) return a.miseEnAvant ? -1 : 1;
      return a.publishedAt < b.publishedAt ? 1 : -1;
    });
}

export async function getListingBySlug(
  slug: string,
): Promise<Listing | undefined> {
  const statik = LISTINGS.find((l) => l.slug === slug);
  if (statik) return statik;
  const db = await getPublishedDbListings();
  return db.find((l) => l.slug === slug);
}

/** Slugs de toutes les annonces (pour generateStaticParams / sitemap). */
export async function getAllListingSlugs(): Promise<string[]> {
  const all = await getAllListings();
  return all.map((l) => l.slug);
}
