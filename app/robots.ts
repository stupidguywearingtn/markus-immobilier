import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Outils internes / privés — hors index.
        disallow: ["/api/", "/espace-client", "/radar", "/admin"],
      },
    ],
    sitemap: "https://www.markusimmobilier.fr/sitemap.xml",
  };
}
