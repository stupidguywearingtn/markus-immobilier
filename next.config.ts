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
};

export default nextConfig;
