import type { Metadata } from "next";
import { SeoLanding } from "@/components/layout/seo-landing";
import { JsonLd, breadcrumbLd, serviceLd } from "@/components/seo/json-ld";
import { BuildingIllust } from "@/components/illustrations/building";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

export const metadata: Metadata = {
  title: "Agence immobilière à Villeurbanne",
  description:
    "Markus Immobilier, agence immobilière indépendante à Villeurbanne (87 rue Édouard Vaillant). Vente, achat, location, gestion locative et estimation gratuite à Villeurbanne et Lyon.",
  alternates: { canonical: "/agence-immobiliere-villeurbanne" },
  openGraph: {
    title: "Agence immobilière à Villeurbanne — Markus Immobilier",
    description:
      "Agence indépendante au cœur de Villeurbanne : vente, achat, location, gestion, estimation.",
    url: "https://www.markusimmobilier.fr/agence-immobiliere-villeurbanne",
  },
};

export default function AgenceVilleurbannePage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "Agence immobilière à Villeurbanne",
          serviceType: "Services immobiliers",
          description:
            "Agence immobilière indépendante à Villeurbanne : vente, achat, location, gestion locative et estimation gratuite.",
          path: "/agence-immobiliere-villeurbanne",
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Agence immobilière Villeurbanne", path: "/agence-immobiliere-villeurbanne" },
        ])}
      />
      <SeoLanding
        eyebrow="Villeurbanne"
        title={<>Votre agence immobilière <span className="grad-light">à Villeurbanne.</span></>}
        lead="Markus Immobilier est une agence indépendante implantée au cœur de Villeurbanne, 87 rue Édouard Vaillant. Vente, achat, location, gestion : on connaît le terrain quartier par quartier."
        illustration={
          <DrawOnScroll>
            <BuildingIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        intro="Choisir une agence locale et indépendante, c'est choisir la proximité, la réactivité et une vraie connaissance du marché de Villeurbanne et de la métropole lyonnaise. Voici ce qui nous distingue."
        sections={[
          {
            eyebrow: "Nos services",
            h2: "Tout votre projet immobilier, au même endroit",
            bullets: [
              "Estimation gratuite de votre bien en moins de 2 minutes.",
              "Vente d'appartements et de maisons, du juste prix à la signature.",
              "Accompagnement à l'achat, ciblé sur votre projet et votre budget.",
              "Location et gestion locative complète, en toute tranquillité.",
            ],
          },
          {
            eyebrow: "Notre secteur",
            h2: "Villeurbanne et la métropole de Lyon",
            body: (
              <p>
                Gratte-Ciel, Charpennes, Cusset, Le Tonkin, Les Brosses… mais aussi
                Lyon 3, Lyon 6 et la métropole : chaque quartier a sa dynamique et ses
                niveaux de prix. Notre implantation locale nous permet d'estimer juste
                et de conseiller avec précision.
              </p>
            ),
          },
          {
            eyebrow: "Notre différence",
            h2: "Indépendants, humains, réactifs",
            body: (
              <p>
                Pas de grosse machine ni de process déshumanisé : une équipe locale et
                joignable, qui défend votre intérêt et vous répond vite. Notre
                indépendance, c'est la liberté de vous conseiller en toute transparence.
              </p>
            ),
          },
          {
            eyebrow: "Nous trouver",
            h2: "Au 87 rue Édouard Vaillant, 69100 Villeurbanne",
            body: (
              <p>
                Métro et tramway à proximité immédiate. Ouvert du lundi au samedi
                9h-12h et du lundi au vendredi 14h-19h sur rendez-vous. Téléphone :{" "}
                <a href="tel:0478371367" className="text-anthracite font-semibold underline underline-offset-2 hover:text-sauge">
                  04 78 37 13 67
                </a>
                .
              </p>
            ),
          },
        ]}
        ctaTitle={<>Parlons de <span className="grad-light">votre projet.</span></>}
        ctaText="Estimation, vente, achat ou gestion : un conseiller Markus vous répond rapidement, sans engagement."
      />
    </>
  );
}
