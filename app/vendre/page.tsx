import type { Metadata } from "next";
import { SeoLanding } from "@/components/layout/seo-landing";
import { JsonLd, breadcrumbLd, serviceLd } from "@/components/seo/json-ld";
import { KeysIllust } from "@/components/illustrations/keys";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

export const metadata: Metadata = {
  title: "Vendre son appartement à Villeurbanne & Lyon",
  description:
    "Vendez votre appartement ou maison à Villeurbanne et Lyon au juste prix : estimation gratuite, accompagnement complet, délais maîtrisés. Agence indépendante Markus Immobilier.",
  alternates: { canonical: "/vendre" },
  openGraph: {
    title: "Vendre son bien à Villeurbanne & Lyon — Markus Immobilier",
    description:
      "Estimation, diagnostics, mise en valeur, négociation, signature : on sécurise chaque étape de votre vente.",
    url: "https://www.markusimmobilier.fr/vendre",
  },
};

export default function VendrePage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "Vente immobilière",
          serviceType: "Vente d'appartement et de maison",
          description:
            "Accompagnement à la vente d'un bien immobilier à Villeurbanne et Lyon : estimation, commercialisation, négociation, signature.",
          path: "/vendre",
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Vendre", path: "/vendre" },
        ])}
      />
      <SeoLanding
        eyebrow="Vendre"
        title={<>Vendre votre bien, <span className="grad-light">au juste prix.</span></>}
        lead="Vous vendez à Villeurbanne ou à Lyon ? On vous accompagne de l'estimation à la signature — au bon prix, dans les bons délais, sans stress."
        illustration={
          <DrawOnScroll>
            <KeysIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        intro="Vendre un appartement ou une maison ne s'improvise pas. Le prix de départ, la qualité de la présentation et la réactivité font toute la différence entre un bien qui part vite au bon prix et un bien qui stagne. Voici comment nous sécurisons votre vente à Villeurbanne et à Lyon."
        sections={[
          {
            eyebrow: "Étape 1",
            h2: "Une estimation juste, basée sur les ventes réelles",
            body: (
              <p>
                Tout commence par le bon prix. Notre estimation croise les ventes
                réellement conclues près de chez vous et les caractéristiques précises
                de votre bien, pour une fourchette réaliste — pas un prix d'affichage
                trompeur. Un prix juste capte l'attention des acheteurs dès les
                premières semaines, là où elle est maximale.
              </p>
            ),
          },
          {
            eyebrow: "Étape 2",
            h2: "Préparer le dossier et mettre en valeur le bien",
            bullets: [
              "Réunir les diagnostics obligatoires (DPE, amiante, électricité…) en amont.",
              "Désencombrer, soigner la lumière et corriger les petits défauts.",
              "Photos professionnelles et annonce qui met en avant les vrais atouts.",
            ],
          },
          {
            eyebrow: "Étape 3",
            h2: "Commercialiser, négocier, signer",
            body: (
              <p>
                Nous diffusons votre bien sur les bons canaux, filtrons les acheteurs
                sérieux, organisons les visites et défendons votre prix grâce à une
                connaissance fine du marché local. Du compromis à l'acte authentique
                chez le notaire, vous êtes accompagné à chaque étape.
              </p>
            ),
          },
          {
            eyebrow: "Notre engagement",
            h2: "Une agence locale, indépendante et réactive",
            body: (
              <p>
                Implantés au cœur de Villeurbanne, nous connaissons le terrain quartier
                par quartier. Pas de grosse machine : une équipe humaine, joignable, qui
                défend votre intérêt et vous répond vite.
              </p>
            ),
          },
        ]}
        ctaTitle={<>Combien vaut <span className="grad-light">votre bien ?</span></>}
        ctaText="Lancez une estimation gratuite en moins de 2 minutes, ou parlez-en directement avec un conseiller."
      />
    </>
  );
}
