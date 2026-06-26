import type { Metadata } from "next";
import { SeoLanding } from "@/components/layout/seo-landing";
import { JsonLd, breadcrumbLd, serviceLd } from "@/components/seo/json-ld";
import { BuildingIllust } from "@/components/illustrations/building";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

export const metadata: Metadata = {
  title: "Agence immobilière Cusset (Villeurbanne)",
  description:
    "Markus Immobilier dans le quartier Cusset à Villeurbanne : vente, achat, location, gestion locative et estimation gratuite. Quartier familial et accessible, bien desservi.",
  alternates: { canonical: "/agence-immobiliere-cusset" },
  openGraph: {
    title: "Agence immobilière Cusset — Markus Immobilier",
    description:
      "Vente, achat, location et estimation gratuite dans le quartier Cusset à Villeurbanne.",
    url: "https://www.markusimmobilier.fr/agence-immobiliere-cusset",
  },
};

export default function CussetPage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "Agence immobilière à Cusset",
          serviceType: "Services immobiliers",
          description:
            "Agence immobilière dans le quartier Cusset à Villeurbanne : vente, achat, location, gestion locative et estimation gratuite.",
          path: "/agence-immobiliere-cusset",
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Agence immobilière Cusset", path: "/agence-immobiliere-cusset" },
        ])}
      />
      <SeoLanding
        eyebrow="Cusset"
        title={<>Votre agence immobilière à <span className="grad-light">Cusset.</span></>}
        lead="Markus Immobilier vous accompagne dans le quartier Cusset, à Villeurbanne : vente, achat, location et gestion. Un secteur familial, accessible et bien desservi."
        illustration={
          <DrawOnScroll>
            <BuildingIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        intro="Desservi par le métro A et le tramway, Cusset est un quartier résidentiel et familial de Villeurbanne, apprécié pour son bon rapport qualité-prix et ses commerces de proximité. Un secteur souvent plus accessible que l'hyper-centre, idéal pour un premier achat."
        sections={[
          {
            eyebrow: "Le quartier",
            h2: "Cusset, le bon plan familial",
            body: (
              <p>
                Entre l'avenue Salengro et la place de la Nation, Cusset offre un
                cadre résidentiel calme, des écoles, des commerces et un accès
                rapide au centre de Villeurbanne comme à Lyon. Des prix souvent
                plus doux que Gratte-Ciel, pour une qualité de vie reconnue.
              </p>
            ),
          },
          {
            eyebrow: "Nos services ici",
            h2: "Markus Immobilier à Cusset",
            bullets: [
              "Estimation gratuite basée sur les ventes réelles du quartier.",
              "Vente de votre bien au juste prix, accompagnement complet.",
              "Recherche et achat adaptés aux familles et primo-accédants.",
              "Location et gestion locative pour les propriétaires.",
            ],
          },
          {
            eyebrow: "Notre approche",
            h2: "Une estimation au plus près du terrain",
            body: (
              <p>
                À Cusset, les écarts de prix se jouent sur l'état du bien, l'étage,
                le calme de la rue et la proximité des transports. Notre
                connaissance locale nous permet d'estimer juste et de conseiller
                avec précision, que vous vendiez ou achetiez.
              </p>
            ),
          },
        ]}
        ctaTitle={<>Un projet à <span className="grad-light">Cusset ?</span></>}
        ctaText="Estimez votre bien gratuitement en 2 minutes, ou échangez avec un conseiller qui connaît le quartier."
      />
    </>
  );
}
