import type { Metadata } from "next";
import { SeoLanding } from "@/components/layout/seo-landing";
import { JsonLd, breadcrumbLd, serviceLd } from "@/components/seo/json-ld";
import { KeysIllust } from "@/components/illustrations/keys";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

export const metadata: Metadata = {
  title: "Estimation immobilière à Lyon — gratuite en 2 min",
  description:
    "Estimation immobilière gratuite à Lyon, basée sur les ventes réelles : valeur de vente, loyer et rendement. Rapport détaillé en moins de 2 minutes avec Markus Immobilier.",
  alternates: { canonical: "/estimation-immobiliere-lyon" },
  openGraph: {
    title: "Estimation immobilière à Lyon — gratuite en 2 min",
    description:
      "Estimez votre bien à Lyon gratuitement, à partir des transactions réelles du secteur.",
    url: "https://www.markusimmobilier.fr/estimation-immobiliere-lyon",
  },
};

export default function EstimationLyonPage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "Estimation immobilière à Lyon",
          serviceType: "Estimation de bien immobilier",
          description:
            "Estimation gratuite de la valeur de vente, du loyer et du rendement d'un bien à Lyon, basée sur les ventes réelles, avec rapport détaillé en moins de 2 minutes.",
          path: "/estimation-immobiliere-lyon",
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Estimation immobilière Lyon", path: "/estimation-immobiliere-lyon" },
        ])}
      />
      <SeoLanding
        eyebrow="Estimation · Lyon"
        title={<>Estimation immobilière à <span className="grad-light">Lyon.</span></>}
        lead="Combien vaut votre bien à Lyon ? Obtenez une fourchette de prix réaliste, gratuite et sans engagement, en moins de 2 minutes — basée sur les ventes réelles près de chez vous."
        illustration={
          <DrawOnScroll>
            <KeysIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        intro="Le marché lyonnais est l'un des plus dynamiques de France, mais aussi l'un des plus contrastés d'un arrondissement à l'autre. Une estimation fiable ne se base pas sur une moyenne de quartier : elle croise les transactions réelles et les caractéristiques précises de votre logement."
        sections={[
          {
            eyebrow: "Comment ça marche",
            h2: "Une estimation en 3 informations",
            body: (
              <p>
                Indiquez l'adresse de votre bien, ses caractéristiques (surface,
                état, étage, DPE, extérieurs) et votre e-mail : notre outil
                calcule instantanément une fourchette de prix de vente, un loyer
                estimé et un rendement, puis vous envoie un rapport détaillé.
              </p>
            ),
          },
          {
            eyebrow: "Sur quoi repose l'estimation",
            h2: "Les ventes réelles, pas les prix affichés",
            body: (
              <p>
                Nous nous appuyons sur les ventes réellement conclues (base
                officielle DVF) autour de votre bien à Lyon, et non sur les prix
                d'annonce souvent surévalués. Ces données sont ensuite ajustées
                selon les critères précis de votre logement.
              </p>
            ),
          },
          {
            eyebrow: "Tout Lyon et la métropole",
            h2: "Lyon, Villeurbanne et le Grand Lyon",
            body: (
              <p>
                Lyon 1 à Lyon 9, Villeurbanne, Caluire, Bron, Vénissieux… chaque
                secteur a sa dynamique. Implantés à Villeurbanne, nous estimons et
                accompagnons sur toute la métropole lyonnaise. Pour affiner la
                fourchette, un conseiller peut se déplacer gratuitement.
              </p>
            ),
          },
        ]}
        ctaTitle={<>Estimez votre bien à <span className="grad-light">Lyon.</span></>}
        ctaText="Gratuit, sans engagement, en moins de 2 minutes. Lancez votre estimation maintenant."
        primaryHref="/estimation"
        primaryLabel="Lancer mon estimation gratuite"
      />
    </>
  );
}
