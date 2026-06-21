import type { Metadata } from "next";
import { SeoLanding } from "@/components/layout/seo-landing";
import { JsonLd, breadcrumbLd, serviceLd } from "@/components/seo/json-ld";
import { PlantIllust } from "@/components/illustrations/plant";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

export const metadata: Metadata = {
  title: "Gestion locative à Villeurbanne & Lyon",
  description:
    "Confiez la gestion locative de votre bien à Villeurbanne et Lyon : sélection du locataire, loyers, quittances, sinistres, obligations légales. Tranquillité totale avec Markus Immobilier.",
  alternates: { canonical: "/gestion-locative" },
  openGraph: {
    title: "Gestion locative à Villeurbanne & Lyon — Markus Immobilier",
    description:
      "On gère votre bien locatif de A à Z : locataire, loyers, sinistres, conformité.",
    url: "https://www.markusimmobilier.fr/gestion-locative",
  },
};

export default function GestionLocativePage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "Gestion locative",
          serviceType: "Gestion de biens locatifs",
          description:
            "Gestion locative complète à Villeurbanne et Lyon : sélection du locataire, encaissement des loyers, gestion des sinistres et des obligations légales.",
          path: "/gestion-locative",
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Gestion locative", path: "/gestion-locative" },
        ])}
      />
      <SeoLanding
        eyebrow="Gestion locative"
        title={<>Faites gérer votre bien, <span className="grad-light">l'esprit libre.</span></>}
        lead="Vous louez un bien à Villeurbanne ou Lyon ? On s'occupe de tout — locataire, loyers, sinistres, obligations légales — pour que la location reste un revenu, pas une charge."
        illustration={
          <DrawOnScroll>
            <PlantIllust size={320} className="illust-on-dark" />
          </DrawOnScroll>
        }
        intro="Gérer un bien en location demande du temps et une vraie rigueur juridique — d'autant que les obligations se durcissent, notamment sur le DPE. Déléguer, c'est sécuriser vos revenus et récupérer votre tranquillité."
        sections={[
          {
            eyebrow: "Ce qu'on fait à votre place",
            h2: "Une gestion complète, de A à Z",
            bullets: [
              "Recherche et sélection du locataire (solvabilité, dossier).",
              "Rédaction du bail et états des lieux d'entrée et de sortie.",
              "Encaissement des loyers, quittances et révisions annuelles.",
              "Gestion des impayés, des sinistres et du suivi des travaux.",
              "Suivi des obligations légales (DPE, décence, diagnostics).",
            ],
          },
          {
            eyebrow: "Le coût",
            h2: "Un tarif clair, souvent déductible",
            body: (
              <p>
                Nos honoraires de gestion sont calculés sur les loyers réellement
                encaissés, et sont en partie déductibles de vos revenus fonciers. Une
                garantie loyers impayés (GLI) peut s'ajouter pour sécuriser totalement
                vos revenus. Tout est transparent, sans frais cachés.
              </p>
            ),
          },
          {
            eyebrow: "Déléguer ou gérer soi-même ?",
            h2: "Quand la délégation devient rentable",
            body: (
              <p>
                Gérer seul peut convenir si vous avez du temps, un seul bien proche de
                chez vous et une bonne maîtrise des obligations légales. Dès que vous
                valorisez votre temps et votre tranquillité — ou que la réglementation
                se complexifie — déléguer devient vite le choix gagnant.
              </p>
            ),
          },
        ]}
        ctaTitle={<>Confiez-nous <span className="grad-light">votre bien.</span></>}
        ctaText="Parlons de votre projet locatif : on vous propose une étude personnalisée, sans engagement."
        primaryHref="/faire-gerer"
        primaryLabel="Demander une étude"
      />
    </>
  );
}
