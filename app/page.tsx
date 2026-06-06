import { Hero } from "@/components/home/hero";
import { Properties } from "@/components/home/properties";
import { About } from "@/components/home/about";
import { Team } from "@/components/home/team";
import { SoldParallax } from "@/components/home/sold-parallax";
import { Estimation } from "@/components/home/estimation";
import { Reviews } from "@/components/home/reviews";
import { Social } from "@/components/home/social";
import { Agency } from "@/components/home/agency";

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
 *   → Suivez-nous + Discord
 *   → Notre agence (horaires + carte)
 *   → Footer (dans le layout)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Properties />
      <About />
      <Team />
      <SoldParallax />
      <Estimation />
      <Reviews />
      <Social />
      <Agency />
    </>
  );
}
