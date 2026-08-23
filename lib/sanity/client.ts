import { createClient } from "next-sanity";

/**
 * Client Sanity — lecture seule, contenu éditable depuis /studio.
 *
 * projectId/dataset ne sont pas secrets (embarqués côté client par design
 * Sanity) : valeurs en dur en fallback, overridables via env si besoin
 * (ex. dataset "staging" en preview).
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uq5g9w2i",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-01-01",
  useCdn: true,
});
