import { draftMode } from "next/headers";
import { sanityClient, getPreviewClient } from "./client";

export type HeroContent = {
  ctaMicrocopy: string;
};

/** Repris tel quel de components/home/hero.tsx — sert si Sanity est vide/HS. */
const FALLBACK_HERO: HeroContent = {
  ctaMicrocopy: "Résultat en moins de 2 minutes",
};

const HERO_QUERY = `*[_type == "heroSection"][0]{ ctaMicrocopy }`;

/**
 * Contenu du Hero (home). Ne jette jamais : si Sanity est vide (aucun
 * document publié) ou injoignable, on retombe sur le texte actuel du site
 * pour ne jamais casser la home.
 */
export async function getHeroContent(): Promise<HeroContent> {
  try {
    const isDraft = (await draftMode()).isEnabled;
    const client = isDraft ? getPreviewClient() : sanityClient;
    const data = await client.fetch<{ ctaMicrocopy?: string } | null>(
      HERO_QUERY,
      {},
      isDraft ? { cache: "no-store" } : { next: { revalidate: 60 } },
    );
    return { ctaMicrocopy: data?.ctaMicrocopy || FALLBACK_HERO.ctaMicrocopy };
  } catch (err) {
    console.error(
      "[sanity] échec récupération heroSection, fallback utilisé :",
      err instanceof Error ? err.message : err,
    );
    return FALLBACK_HERO;
  }
}
