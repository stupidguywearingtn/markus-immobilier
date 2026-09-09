import type { Metadata } from "next";
import Link from "next/link";
import { SeoLanding } from "@/components/layout/seo-landing";
import { JsonLd, breadcrumbLd, serviceLd } from "@/components/seo/json-ld";
import { BuildingIllust } from "@/components/illustrations/building";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

export const metadata: Metadata = {
  title: "Agence immobilière Gratte-Ciel (Villeurbanne)",
  description:
    "Markus Immobilier, votre agence au cœur du quartier Gratte-Ciel à Villeurbanne : vente, achat, location, gestion et estimation gratuite. Une équipe locale qui connaît le secteur.",
  alternates: { canonical: "/agence-immobiliere-gratte-ciel" },
  openGraph: {
    title: "Agence immobilière Gratte-Ciel — Markus Immobilier",
    description:
      "Vente, achat, location et estimation gratuite dans le quartier Gratte-Ciel à Villeurbanne.",
    url: "https://www.markusimmobilier.fr/agence-immobiliere-gratte-ciel",
  },
};

export default function GratteCielPage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "Agence immobilière à Gratte-Ciel",
          serviceType: "Services immobiliers",
          description:
            "Agence immobilière dans le quartier Gratte-Ciel à Villeurbanne : vente, achat, location, gestion locative et estimation gratuite.",
          path: "/agence-immobiliere-gratte-ciel",
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Agence immobilière Gratte-Ciel", path: "/agence-immobiliere-gratte-ciel" },
        ])}
      />
      <SeoLanding
        eyebrow="Gratte-Ciel"
        title={<>Votre agence immobilière à <span className="grad-light">Gratte-Ciel.</span></>}
        lead="Markus Immobilier accompagne vos projets immobiliers au cœur du quartier Gratte-Ciel, à Villeurbanne. Vente, achat, location, gestion : on connaît ce secteur par cœur."
        illustration={
          <DrawOnScroll>
            <BuildingIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        intro="Gratte-Ciel est le cœur historique et commerçant de Villeurbanne : architecture emblématique des années 1930, marché, commerces, et un projet d'extension qui dynamise tout le secteur. Un quartier très recherché, où une estimation juste fait toute la différence."
        sections={[
          {
            eyebrow: "Le quartier",
            h2: "Pourquoi Gratte-Ciel séduit autant",
            body: (
              <p>
                Central, vivant et parfaitement desservi (métro A, nombreuses
                lignes de bus, accès rapide à la Part-Dieu), Gratte-Ciel attire
                familles, cadres et primo-accédants. Son cachet architectural et
                son extension en cours en font un secteur à forte demande — donc
                au marché tendu, où les biens bien présentés partent vite. Côté
                prix, la médiane du quartier Gratte-Ciel – Dedieu – Charmettes
                ressort à 3 846 €/m² sur les ventes d&apos;appartements de 2025
                (base DVF), soit 7,8 % au-dessus de la médiane de Villeurbanne :
                environ 65 m² pour un budget de 250 000 €. Le détail budget par
                budget est dans notre guide{" "}
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
            h2: "Ce que Markus Immobilier fait pour vous à Gratte-Ciel",
            bullets: [
              "Estimation gratuite et précise, basée sur les ventes réelles du quartier.",
              "Vente de votre appartement au juste prix, du mandat à la signature.",
              "Accompagnement à l'achat, avec accès aux biens avant publication.",
              "Location et gestion locative en toute tranquillité.",
            ],
          },
          {
            eyebrow: "Notre force",
            h2: "Une connaissance fine du secteur",
            body: (
              <p>
                Estimer un bien à Gratte-Ciel ne se résume pas à un prix au m²
                moyen : l'étage, le cachet de l'immeuble, la luminosité et la
                proximité du marché jouent énormément. Notre implantation locale
                nous permet d'ajuster au plus juste.
              </p>
            ),
          },
        ]}
        ctaTitle={<>Un projet à <span className="grad-light">Gratte-Ciel ?</span></>}
        ctaText="Estimez votre bien gratuitement en 2 minutes, ou échangez directement avec un conseiller du secteur."
      />
    </>
  );
}
