import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LenisProvider } from "@/components/lenis-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

// Domaine canonique de production (www). Une seule version en canonique.
const SITE_URL = "https://www.markusimmobilier.fr";
// ID Umami Cloud — à définir dans Vercel : NEXT_PUBLIC_UMAMI_WEBSITE_ID
const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Markus Immobilier — Agence immobilière à Villeurbanne & Lyon",
    template: "%s · Markus Immobilier",
  },
  description:
    "Agence indépendante à Villeurbanne. Vente, location, gestion. Estimez votre bien gratuitement en moins de 2 minutes.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Markus Immobilier",
    title: "Markus Immobilier — Agence immobilière à Villeurbanne & Lyon",
    description:
      "Agence indépendante à Villeurbanne. Vente, location, gestion. Estimez votre bien gratuitement en moins de 2 minutes.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Markus Immobilier",
    description:
      "Agence immobilière à Villeurbanne & Lyon — vente, location, gestion. Estimation gratuite en 2 minutes.",
  },
  // Favicons : auto-détectés par Next via app/favicon.ico, app/icon.png (onglet)
  // et app/apple-icon.png (apple-touch-icon / écran d'accueil iOS) — même recette
  // que TEL & CASH. Pas de metadata.icons explicite (évite les balises en double).
  // Vérification Google Search Console — pose le code dans la var d'env
  // GOOGLE_SITE_VERIFICATION (Vercel). Rend <meta name="google-site-verification">.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#383E42",
  width: "device-width",
  initialScale: 1,
};

// JSON-LD RealEstateAgent — pour Google Knowledge Panel & rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Markus Immobilier",
  description:
    "Agence immobilière indépendante à Villeurbanne. Vente, location, gestion, syndic.",
  url: SITE_URL,
  telephone: "+33478371367",
  email: "villeurbanne@markusimmobilier.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "87 rue Édouard Vaillant",
    addressLocality: "Villeurbanne",
    postalCode: "69100",
    addressCountry: "FR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "12:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "14:00",
      closes: "19:00",
      description: "sur rendez-vous",
    },
  ],
  areaServed: ["Villeurbanne", "Lyon", "Métropole de Lyon"],
  sameAs: [
    "https://www.instagram.com/markusimmobilier/",
    "https://www.tiktok.com/@markusimmobilier",
    "https://x.com/markusimmo_",
    "https://www.youtube.com/@markusimmobilier",
    "https://www.facebook.com/profile.php?id=61566295948630",
    "https://www.linkedin.com/company/markusimmobilier/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${montserrat.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Skip-link a11y — sr-only par défaut, visible uniquement au focus clavier */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:px-5 focus:py-3 focus:bg-anthracite focus:text-blanc focus:font-semibold focus:text-[13px] focus:uppercase focus:tracking-[0.08em] focus:rounded-lg focus:no-underline focus:shadow-lg"
        >
          Aller au contenu
        </a>
        <LenisProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </LenisProvider>
        {/* Umami — analytics cookieless / RGPD-friendly (pas de bandeau cookies).
            Ne se charge que si NEXT_PUBLIC_UMAMI_WEBSITE_ID est défini. */}
        {UMAMI_ID && (
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={UMAMI_ID}
            strategy="afterInteractive"
          />
        )}
        {/* Vercel Speed Insights — Core Web Vitals, cookieless.
            À activer aussi dans Vercel : projet → Speed Insights → Enable. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
