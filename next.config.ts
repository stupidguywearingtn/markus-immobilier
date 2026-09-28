import type { NextConfig } from "next";

const supabaseHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : undefined;
  } catch {
    return undefined;
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Images uploadées depuis le back-office (buckets `site-images`, `listings`)
      ...(supabaseHost
        ? [{ protocol: "https" as const, hostname: supabaseHost }]
        : []),
      // Repli : tout sous-domaine *.supabase.co (si l'env n'est pas dispo au build)
      { protocol: "https" as const, hostname: "*.supabase.co" },
    ],
  },

  /**
   * Cache navigateur des médias statiques de `public/`.
   *
   * Mesuré en production le 2026-09-28 : ces fichiers sortent en
   * `cache-control: public, max-age=0, must-revalidate` — alors que
   * `/_next/static/*` sort bien en `public, max-age=31536000, immutable`.
   * Conséquence : la vidéo du hero (2,3 Mo), l'affiche vidéo et le logo SVG
   * repassent par une requête de revalidation à **chaque** navigation interne,
   * alors que leur contenu ne change qu'au déploiement suivant.
   *
   * Sept jours, et volontairement **sans `immutable`** : le gain est acquis dès
   * la deuxième page vue, et un fichier remplacé sous le même nom se rattrape
   * en une semaine au pire — pas en un an, ce qui serait le cas avec
   * `immutable` et rendrait un changement de vidéo invisible pour les
   * visiteurs déjà venus.
   */
  async headers() {
    const oneWeek = "public, max-age=604800, stale-while-revalidate=86400";
    return [
      { source: "/videos/:path*", headers: [{ key: "Cache-Control", value: oneWeek }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: oneWeek }] },
      { source: "/vendus/:path*", headers: [{ key: "Cache-Control", value: oneWeek }] },
      { source: "/annonces/:path*", headers: [{ key: "Cache-Control", value: oneWeek }] },
    ];
  },
};

export default nextConfig;
