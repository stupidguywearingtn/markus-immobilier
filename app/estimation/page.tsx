import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { Button, ArrowRight } from "@/components/ui/button";
import { EstimationForm } from "@/components/forms/estimation-form";
import { KeysIllust } from "@/components/illustrations/keys";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

export const metadata: Metadata = {
  title: "Estimer mon bien — Outil n°1 en 2 minutes",
  description:
    "Estimation gratuite et sans engagement : valeur de vente, loyer mensuel, taux de rendement. Rapport PDF envoyé par email en moins de 2 minutes.",
};

const BENEFITS = [
  "Estimation de vente",
  "Estimation de location",
  "Taux de rendement",
  "Rapport PDF en moins de 2 min",
  "Gratuit & sans engagement",
];

export default function EstimationPage() {
  return (
    <>
      <PageHero
        eyebrow="★ Outil n°1"
        title={
          <>
            Estimez votre bien en moins de{" "}
            <span className="grad-light">2 minutes.</span>
          </>
        }
        lead={
          <>
            Un outil complet, sur-mesure, qui vous envoie un rapport PDF
            détaillé sur votre mail.{" "}
            <b className="text-blanc">Gratuit</b>,{" "}
            <b className="text-blanc">sans engagement</b>, et conçu par notre
            équipe locale.
          </>
        }
        illustration={
          <DrawOnScroll>
            <KeysIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        actions={
          <Button href="#formulaire" variant="cta">
            Estimer mon bien
            <ArrowRight />
          </Button>
        }
      />

      {/* BÉNÉFICES — bandeau juste sous le hero.
          flex-wrap + whitespace-nowrap sur chaque item : chaque libellé reste
          sur UNE seule ligne ; c'est l'item entier qui passe à la ligne suivante
          si besoin (jamais un libellé coupé en deux). */}
      <section className="bg-anthracite text-blanc pb-[40px] lg:pb-[60px] -mt-2 border-b border-white/[0.06]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 justify-center md:justify-between">
            {BENEFITS.map((b, i) => (
              <li
                key={i}
                className="flex items-center gap-2.5 text-[14px] text-white/90 whitespace-nowrap"
              >
                <span className="w-6 h-6 shrink-0 rounded-full bg-sauge/20 grid place-items-center">
                  <svg
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    fill="none"
                    stroke="var(--color-sauge)"
                    strokeWidth="2.6"
                    aria-hidden="true"
                  >
                    <path d="M5 12l5 5L20 6" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FORMULAIRE / RÉSULTAT */}
      <section
        id="formulaire"
        className="relative bg-anthracite py-[100px] max-md:py-[72px] overflow-hidden"
      >
        <DrawOnScroll className="absolute bottom-[40px] right-[2%] z-0 pointer-events-none opacity-50 max-md:hidden">
          <KeysIllust size={200} className="illust-on-dark" />
        </DrawOnScroll>

        <div className="relative z-[1] max-w-content mx-auto px-8 max-md:px-5">
          <Reveal className="text-center mb-12 text-blanc">
            <Eyebrow className="mb-3">3 étapes simples</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] font-bold tracking-[-0.01em] text-blanc">
              Votre rapport en{" "}
              <span className="grad-light">3 étapes.</span>
            </h2>
            <p className="text-white/65 max-w-[520px] mx-auto mt-3">
              Votre bien · sa localisation · vos coordonnées. C&apos;est tout.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <EstimationForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
