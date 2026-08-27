import type { Metadata } from "next";
import { getAllAvailableListings } from "@/lib/listings-all";
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

export const metadata: Metadata = {
  title: "Markus Immobilier — Agence immobilière à Villeurbanne & Lyon",
  description:
    "Agence immobilière indépendante à Villeurbanne. Vente, location et gestion à Lyon et Villeurbanne. Estimez votre bien gratuitement en moins de 2 minutes.",
  alternates: { canonical: "/" },
};

/**
 * Markus Immobilier — Page d'accueil
 *
 * Ordre :
 *   Hero
 *   → Nos biens disponibles
 *   → Qui sommes-nous
 *   → Notre équipe (Tony, David, « Pourquoi pas vous ? »)
 *   → Nos biens vendus (parallaxe)
 *   → Outil d'estimation
 *   → Nos avis clients
 *   → FAQ (questions fréquentes + JSON-LD FAQPage / GEO)
 *   → Suivez-nous + Discord
 *   → Notre agence (horaires + carte)
 *   → Footer (dans le layout)
 */
export default async function HomePage() {
  const listings = await getAllAvailableListings();
  return (
    <>
      <Hero />
      <Properties listings={listings} />
      <About />
      <Team />
      <SoldParallax />
      <Estimation />
      <Reviews />
      <Faq />
      <Social />
      <Agency />
    </>
  );
}
