import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { sanityClient } from "@/lib/sanity/client";

/**
 * Appelée par le Presentation Tool pour entrer en aperçu brouillon.
 * Valide le secret de preview signé (via @sanity/preview-url-secret, géré
 * en interne par defineEnableDraftMode) avant d'activer le cookie.
 */
export const { GET } = defineEnableDraftMode({
  client: sanityClient.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
