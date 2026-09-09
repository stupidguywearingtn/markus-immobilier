import type { Metadata } from "next";
import Link from "next/link";
import { SeoLanding } from "@/components/layout/seo-landing";
import { JsonLd, breadcrumbLd, serviceLd } from "@/components/seo/json-ld";
import { HouseIllust } from "@/components/illustrations/house";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

export const metadata: Metadata = {
  title: "Acheter un appartement à Lyon & Villeurbanne",
  description:
    "Achetez votre appartement ou maison à Lyon et Villeurbanne avec une agence locale : recherche ciblée, conseils acquéreur, financement, frais de notaire. Markus Immobilier.",
  alternates: { canonical: "/acheter" },
  openGraph: {
    title: "Acheter à Lyon & Villeurbanne — Markus Immobilier",
    description:
      "Recherche ciblée, conseils d'acquéreur et accompagnement jusqu'à la signature.",
    url: "https://www.markusimmobilier.fr/acheter",
  },
};

export default function AcheterPage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "Accompagnement à l'achat",
          serviceType: "Achat d'appartement et de maison",
          description:
            "Accompagnement des acquéreurs à Lyon et Villeurbanne : recherche, visites, conseils, négociation et financement.",
          path: "/acheter",
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Acheter", path: "/acheter" },
        ])}
      />
      <SeoLanding
        eyebrow="Acheter"
        title={<>Trouvez votre <span className="grad-light">prochain chez-vous.</span></>}
        lead="Acheter un appartement à Lyon ou Villeurbanne, c'est un projet de vie. On vous aide à cibler le bon bien, au bon prix, et à sécuriser chaque étape."
        illustration={
          <DrawOnScroll>
            <HouseIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        intro="Le marché lyonnais est dynamique et concurrentiel : les bons biens partent vite. Bien préparé et bien accompagné, vous achetez plus sereinement et vous évitez les mauvaises surprises. Voici notre méthode."
        sections={[
          {
            eyebrow: "Avant de chercher",
            h2: "Cadrer son budget et ses critères",
            bullets: [
              "Capacité d'emprunt, apport et frais de notaire (≈ 7-8 % dans l'ancien).",
              "Secteur, surface, étage, extérieur, proximité des transports.",
              "Distinguer les critères indispensables des préférences négociables.",
            ],
          },
          {
            eyebrow: "Pendant les visites",
            h2: "Repérer la vraie valeur d'un bien",
            body: (
              <p>
                Au-delà du coup de cœur, on vérifie l'état réel (humidité, isolation,
                luminosité), le montant des charges, les travaux votés en copropriété
                et le DPE. Notre connaissance du secteur vous évite de surpayer ou de
                passer à côté d'un défaut caché.
              </p>
            ),
          },
          {
            eyebrow: "Au moment d'acheter",
            h2: "Offrir au juste prix et sécuriser la signature",
            body: (
              <p>
                Nous vous aidons à formuler une offre cohérente avec le marché, puis à
                avancer sereinement : compromis de vente, délai de rétractation,
                obtention du prêt, et signature de l'acte authentique chez le notaire.
              </p>
            ),
          },
          {
            eyebrow: "Notre valeur ajoutée",
            h2: "Une équipe locale qui connaît chaque quartier",
            body: (
              <p>
                Gratte-Ciel, Charpennes, Lyon 3, Lyon 6… chaque secteur a sa dynamique
                et ses niveaux de prix. On vous oriente vers les opportunités qui
                correspondent vraiment à votre projet et à votre budget. Pour situer
                votre budget avant même de visiter, notre guide{" "}
                <Link
                  href="/blog/ou-acheter-villeurbanne-quartiers"
                  className="text-anthracite font-semibold underline underline-offset-2 hover:text-sauge"
                >
                  où acheter à Villeurbanne selon votre budget
                </Link>{" "}
                traduit les prix réels de chaque quartier en mètres carrés
                accessibles.
              </p>
            ),
          },
        ]}
        ctaTitle={<>Un projet d'achat <span className="grad-light">à Lyon ?</span></>}
        ctaText="Dites-nous ce que vous cherchez — on vous prévient dès qu'un bien correspond, souvent avant la publication."
        primaryHref="/annonces"
        primaryLabel="Voir les biens disponibles"
      />
    </>
  );
}
