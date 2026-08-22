import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { Button, ArrowRight } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page introuvable — Markus Immobilier",
  robots: { index: false, follow: true },
};

/**
 * 404 sur mesure — le défaut Next.js est une page blanche sans navigation.
 * On récupère ce trafic perdu (lien cassé, faute de frappe, ancienne annonce)
 * en le redirigeant vers l'estimation, l'objectif prioritaire du site.
 */
export default function NotFound() {
  return (
    <section
      className="grid place-items-center text-center px-6"
      style={{ minHeight: "70svh", paddingTop: "140px", paddingBottom: "80px" }}
    >
      <Reveal className="max-w-[520px]">
        <Eyebrow className="mb-4">Erreur 404</Eyebrow>
        <h1 className="font-bold text-[clamp(28px,4vw,42px)] tracking-[-0.01em] leading-[1.15] mb-4">
          Cette page n&apos;existe <span className="grad">pas (ou plus).</span>
        </h1>
        <p className="text-[#5a6166] text-[15.5px] leading-relaxed mb-8">
          Le lien est peut-être obsolète ou le bien n&apos;est plus disponible.
          En attendant, voici ce qui peut vous être utile :
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <Button href="/estimation" variant="sauge">
            Estimer mon bien
            <ArrowRight />
          </Button>
          <Button href="/annonces" variant="outline">
            Voir nos annonces
          </Button>
        </div>
        <Link
          href="/"
          className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#7a817f] hover:text-anthracite transition"
        >
          ← Retour à l&apos;accueil
        </Link>
      </Reveal>
    </section>
  );
}
