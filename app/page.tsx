import { Hero } from "@/components/home/hero";
import { Properties } from "@/components/home/properties";
import { About } from "@/components/home/about";
import { SoldParallax } from "@/components/home/sold-parallax";
import { Estimation } from "@/components/home/estimation";
import { Social } from "@/components/home/social";
import { Agency } from "@/components/home/agency";

/**
 * Markus Immobilier — Page d'accueil
 * Ordre EXACT (non négociable, voir CLAUDE.md) :
 * Hero → Biens dispo → Qui sommes-nous → Vendus parallaxe → Estimation
 *      → Réseaux + Discord → Agence → Footer (dans layout)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Properties />
      <About />
      <SoldParallax />
      <Estimation />
      <Social />
      <Agency />
    </>
  );
}
