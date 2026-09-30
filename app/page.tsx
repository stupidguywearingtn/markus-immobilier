import type { Metadata } from "next";
import { getAllAvailableListings } from "@/lib/listings-all";
import { getReviews, getSoldItems } from "@/lib/content-db";
import { Hero } from "@/components/home/hero";
import { Properties } from "@/components/home/properties";
import { About } from "@/components/home/about";
import { Team } from "@/components/home/team";
import { SoldParallax } from "@/components/home/sold-parallax";
import { Estimation } from "@/components/home/estimation";
import { Reviews } from "@/components/home/reviews";
import { Faq } from "@/components/home/faq";
import { Social } from "@/components/home/social";
import { Agency } from "@/components/home/agency";
import { PageRender } from "@/components/page-builder/page-render";
import { getPublishedPage, rootSeo } from "@/lib/page-builder/db";

const DEFAULT_TITLE = "Markus Immobilier — Agence immobilière à Villeurbanne & Lyon";
const DEFAULT_DESCRIPTION =
  "Agence immobilière indépendante à Villeurbanne. Vente, location et gestion à Lyon et Villeurbanne. Estimez votre bien gratuitement en moins de 2 minutes.";

/**
 * Titre / description Google : ceux saisis dans l'éditeur de pages s'ils
 * existent, sinon les valeurs historiques ci-dessus.
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublishedPage("");
  const seo = page ? rootSeo(page.data) : null;
  return {
    title: { absolute: seo?.title ?? DEFAULT_TITLE },
    description: seo?.description ?? DEFAULT_DESCRIPTION,
    alternates: { canonical: "/" },
  };
}

/**
 * Markus Immobilier — Page d'accueil
 *
 * Ordre :
 *   Hero
 *   → Nos biens disponibles
 *   → Qui sommes-nous
 *   → Notre équipe (collaborateurs gérés dans /admin/equipe + « Pourquoi pas vous ? »)
 *   → Nos biens vendus (parallaxe)
 *   → Outil d'estimation
 *   → Nos avis clients
 *   → FAQ (questions fréquentes + JSON-LD FAQPage / GEO)
 *   → Suivez-nous + Discord
 *   → Notre agence (horaires + carte)
 *   → Footer (dans le layout)
 */
export default async function HomePage() {
  // Accueil publié depuis l'éditeur de pages (/admin/pages) → il prend la main.
  // Sinon (jamais publié, ou Supabase indisponible) : l'accueil codé ci-dessous,
  // strictement identique à ce qui était en ligne avant l'éditeur.
  const built = await getPublishedPage("");
  if (built) return <PageRender data={built.data} />;

  const [listings, reviews, sold] = await Promise.all([
    getAllAvailableListings(),
    getReviews(),
    getSoldItems(),
  ]);
  return (
    <>
      <Hero />
      <Properties listings={listings} />
      <About />
      <Team />
      <SoldParallax items={sold} />
      <Estimation />
      <Reviews reviews={reviews} />
      <Faq />
      <Social />
      <Agency />
    </>
  );
}
