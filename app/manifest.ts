import type { MetadataRoute } from "next";

/**
 * Web App Manifest — icône d'écran d'accueil / PWA, surtout pour Android Chrome
 * (iOS utilise apple-icon.png). Sert le M blanc sur fond anthracite.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Markus Immobilier",
    short_name: "Markus",
    description:
      "Agence immobilière à Villeurbanne & Lyon — vente, location, gestion, estimation gratuite.",
    start_url: "/",
    display: "standalone",
    background_color: "#383E42",
    theme_color: "#383E42",
    lang: "fr",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
