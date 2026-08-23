import { createClient, type SanityClient } from "next-sanity";

/**
 * Client Sanity — lecture seule, contenu éditable depuis /studio.
 *
 * projectId/dataset ne sont pas secrets (embarqués côté client par design
 * Sanity) : valeurs en dur en fallback, overridables via env si besoin
 * (ex. dataset "staging" en preview).
 */
export const STUDIO_URL =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "https://markus-immobilier.sanity.studio";

/** Client public : contenu publié uniquement, cache CDN, jamais de stega. */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uq5g9w2i",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-01-01",
  useCdn: true,
  perspective: "published",
  stega: { enabled: false, studioUrl: STUDIO_URL },
});

/**
 * Client preview (Draft Mode / Presentation Tool uniquement) : lit les
 * brouillons non publiés, stega activé (marqueurs invisibles pour les
 * overlays cliquables). Le token n'est utilisé QUE côté serveur — jamais
 * exposé au navigateur.
 */
export function getPreviewClient(): SanityClient {
  return sanityClient.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
    useCdn: false,
    perspective: "drafts",
    stega: { enabled: true, studioUrl: STUDIO_URL },
  });
}
