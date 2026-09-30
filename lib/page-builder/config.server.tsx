import { getAllAvailableListings } from "@/lib/listings-all";
import { getReviews, getSoldItems } from "@/lib/content-db";
import { Hero } from "@/components/home/hero";
import { Properties } from "@/components/home/properties";
import { About } from "@/components/home/about";
import { Team } from "@/components/home/team";
import { SoldParallax } from "@/components/home/sold-parallax";
import { Estimation } from "@/components/home/estimation";
import { Reviews } from "@/components/home/reviews";
import { Faq as HomeFaq } from "@/components/home/faq";
import { Social } from "@/components/home/social";
import { Agency } from "@/components/home/agency";
import * as B from "@/components/page-builder/blocks";
import { ContactBlock } from "@/components/page-builder/contact-block";
import { makeConfig } from "./definitions";

/**
 * Configuration du SITE PUBLIC (rendu serveur → HTML complet pour Google).
 * Les sections maison lisent leurs données elles-mêmes, exactement comme sur
 * l'accueil codé en dur : rien ne change pour le visiteur.
 */

async function BiensServer() {
  return <Properties listings={await getAllAvailableListings()} />;
}
async function AvisServer() {
  return <Reviews reviews={await getReviews()} />;
}
async function VendusServer() {
  return <SoldParallax items={await getSoldItems()} />;
}

/** FAQ libre : ajoute le balisage FAQPage (résultats enrichis Google + IA). */
function FaqServer(props: B.FaqProps) {
  const qa = (props.items ?? []).filter(
    (q) => typeof q.question === "string" && q.question.trim() && typeof q.reponse === "string" && q.reponse.trim(),
  ) as { question: string; reponse: string }[];
  const jsonLd = qa.length
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: qa.map((q) => ({
          "@type": "Question",
          name: q.question.trim(),
          acceptedAnswer: { "@type": "Answer", text: q.reponse.trim() },
        })),
      }).replace(/</g, "\\u003c")
    : undefined;
  return <B.Faq {...props} jsonLd={jsonLd} />;
}


export const serverConfig = makeConfig({
  MaisonHero: () => <Hero />,
  MaisonBiens: () => <BiensServer />,
  MaisonAPropos: () => <About />,
  MaisonEquipe: () => <Team />,
  MaisonVendus: () => <VendusServer />,
  MaisonEstimation: () => <Estimation />,
  MaisonAvis: () => <AvisServer />,
  MaisonFaq: () => <HomeFaq />,
  MaisonReseaux: () => <Social />,
  MaisonAgence: () => <Agency />,

  Bandeau: B.Bandeau,
  TitreSection: B.TitreSection,
  TexteImage: B.TexteImage,
  TexteLibre: B.TexteLibre,
  Chiffres: B.Chiffres,
  Cartes: B.Cartes,
  Etapes: B.Etapes,
  Faq: FaqServer,
  Citation: B.Citation,
  ImagePleine: B.ImagePleine,
  Galerie: B.Galerie,
  Video: B.Video,
  AppelAction: B.AppelAction,
  ContactFormulaire: ContactBlock,
  Espace: B.Espace,
});
