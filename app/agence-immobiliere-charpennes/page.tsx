import type { Metadata } from "next";
import Link from "next/link";
import { SeoLanding } from "@/components/layout/seo-landing";
import { JsonLd, breadcrumbLd, serviceLd } from "@/components/seo/json-ld";
import { BuildingIllust } from "@/components/illustrations/building";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

export const metadata: Metadata = {
  title: "Agence immobilière Charpennes (Villeurbanne)",
  description:
    "Markus Immobilier dans le quartier Charpennes à Villeurbanne : vente, achat, location, gestion locative et estimation gratuite. Secteur ultra-connecté, idéal investissement.",
  alternates: { canonical: "/agence-immobiliere-charpennes" },
  openGraph: {
    title: "Agence immobilière Charpennes — Markus Immobilier",
    description:
      "Vente, achat, location et estimation gratuite dans le quartier Charpennes à Villeurbanne.",
    url: "https://www.markusimmobilier.fr/agence-immobiliere-charpennes",
  },
};

export default function CharpennesPage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "Agence immobilière à Charpennes",
          serviceType: "Services immobiliers",
          description:
            "Agence immobilière dans le quartier Charpennes à Villeurbanne : vente, achat, location, gestion locative et estimation gratuite.",
          path: "/agence-immobiliere-charpennes",
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Agence immobilière Charpennes", path: "/agence-immobiliere-charpennes" },
        ])}
      />
      <SeoLanding
        eyebrow="Charpennes"
        title={<>Votre agence immobilière à <span className="grad-light">Charpennes.</span></>}
        lead="Markus Immobilier vous accompagne à Charpennes, l'un des quartiers les plus connectés de Villeurbanne. Vente, achat, location et investissement locatif."
        illustration={
          <DrawOnScroll>
            <BuildingIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        intro="À la frontière de Lyon 6, Charpennes est un carrefour majeur : métro A et B, tramway, accès immédiat à la Part-Dieu et aux campus. Très prisé des étudiants et jeunes actifs, c'est un secteur idéal pour habiter comme pour investir."
        sections={[
          {
            eyebrow: "Le quartier",
            h2: "Charpennes, le hub de Villeurbanne",
            body: (
              <p>
                Ultra-desservi (croisement métro A/B + tram), bordé de commerces
                et tout proche du Parc de la Tête d'Or, Charpennes concentre une
                demande locative forte et continue. Les petites surfaces s&apos;y
                louent vite, ce qui en fait un terrain de choix pour les
                investisseurs. Sur les ventes de 2025 (base DVF), la médiane du
                quartier Charpennes – Tonkin ressort à 3 524 €/m², au niveau de
                la médiane communale (−1,2 %) : environ 71 m² pour un budget de
                250 000 €. Comparaison quartier par quartier dans notre guide{" "}
                <Link
                  href="/blog/ou-acheter-villeurbanne-quartiers"
                  className="text-anthracite font-semibold underline underline-offset-2 hover:text-sauge"
                >
                  où acheter à Villeurbanne
                </Link>
                .
              </p>
            ),
          },
          {
            eyebrow: "Nos services ici",
            h2: "Markus Immobilier à Charpennes",
            bullets: [
              "Estimation gratuite fondée sur les transactions réelles du secteur.",
              "Vente d'appartements et accompagnement vendeur de A à Z.",
              "Recherche et achat ciblés, y compris pour l'investissement locatif.",
              "Gestion locative complète pour propriétaires bailleurs.",
            ],
          },
          {
            eyebrow: "Investir ici",
            h2: "Un secteur taillé pour le locatif",
            body: (
              <p>
                Avec sa proximité des campus et des transports, Charpennes offre
                une vacance locative faible et une demande stable. Un bon point
                de départ pour un investissement : tout commence par une
                estimation juste du prix d'achat et du loyer réaliste.
              </p>
            ),
          },
        ]}
        ctaTitle={<>Un projet à <span className="grad-light">Charpennes ?</span></>}
        ctaText="Estimez votre bien gratuitement, ou parlons de votre projet d'achat ou d'investissement dans le secteur."
      />
    </>
  );
}
