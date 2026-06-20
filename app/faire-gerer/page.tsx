import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { SyndicForm } from "@/components/forms/syndic-form";
import { PlantIllust } from "@/components/illustrations/plant";
import { HandshakeIllust } from "@/components/illustrations/handshake";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

export const metadata: Metadata = {
  title: "Faire gérer votre bien — Syndic & gestion locative à Villeurbanne",
  description:
    "Confiez la gestion de votre copropriété ou de votre bien locatif à Lyon et Villeurbanne à une agence locale aux outils modernes. Étude personnalisée sous 48h.",
  alternates: { canonical: "/faire-gerer" },
};

export default function FaireGererPage() {
  return (
    <>
      <PageHero
        eyebrow="Gestion & Syndic"
        title={
          <>
            Confiez la gestion à une{" "}
            <span className="grad-light">agence locale.</span>
          </>
        }
        lead="Markus Immobilier accompagne propriétaires bailleurs et copropriétés avec des outils modernes et une équipe dédiée à Villeurbanne / Lyon. Étude personnalisée sous 48h ouvrées."
        illustration={
          <DrawOnScroll>
            <PlantIllust size={360} className="illust-on-dark" />
          </DrawOnScroll>
        }
      />

      {/* 2 CARTES */}
      <section className="bg-blanc py-[100px] max-md:py-[72px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <Reveal className="text-center mb-12 max-md:mb-10">
            <Eyebrow className="mb-4">Deux expertises</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em]">
              Une agence, <span className="grad">deux métiers.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-md:gap-6">
            <Reveal>
              <article className="relative h-full bg-gris rounded-[24px] p-10 max-md:p-7 border border-[var(--bordure)] hover:border-sauge/50 hover:shadow-[0_30px_60px_-20px_rgba(56,62,66,0.18)] transition-all duration-500">
                <DrawOnScroll className="mb-7">
                  <PlantIllust size={120} />
                </DrawOnScroll>
                <Eyebrow className="mb-4">Propriétaires bailleurs</Eyebrow>
                <h3 className="text-[26px] font-bold tracking-[-0.01em] mb-4">
                  Gestion <span className="grad">locative.</span>
                </h3>
                <p className="text-[#5a6166] mb-7 leading-relaxed">
                  Recherche de locataires solvables, états des lieux,
                  encaissement, entretien, GLI. On s&apos;occupe de tout pendant
                  que votre patrimoine grandit.
                </p>
                <ul className="space-y-3 text-[14px] text-anthracite">
                  <Bullet>Sélection rigoureuse des locataires</Bullet>
                  <Bullet>Quittances et appels de loyers automatisés</Bullet>
                  <Bullet>GLI (garantie loyers impayés) en option</Bullet>
                  <Bullet>Extranet propriétaire en temps réel</Bullet>
                </ul>
              </article>
            </Reveal>

            <Reveal delay={140}>
              <article className="relative h-full bg-anthracite text-blanc rounded-[24px] p-10 max-md:p-7 overflow-hidden hover:shadow-[0_30px_60px_-20px_rgba(56,62,66,0.5)] transition-all duration-500">
                <DrawOnScroll className="mb-7">
                  <HandshakeIllust size={150} className="illust-on-dark" />
                </DrawOnScroll>
                <Eyebrow className="mb-4">Copropriétés</Eyebrow>
                <h3 className="text-[26px] font-bold tracking-[-0.01em] mb-4 text-blanc">
                  Syndic de{" "}
                  <span className="grad-light">copropriété.</span>
                </h3>
                <p className="text-white/70 mb-7 leading-relaxed">
                  Un syndic local, joignable, transparent. Comptabilité claire,
                  AG bien préparées, suivi des travaux et des prestataires de
                  bout en bout.
                </p>
                <ul className="space-y-3 text-[14px] text-white/90">
                  <Bullet light>Comptabilité claire et accessible</Bullet>
                  <Bullet light>AG préparées et bien menées</Bullet>
                  <Bullet light>Suivi des travaux et prestataires</Bullet>
                  <Bullet light>Conseiller dédié à votre copropriété</Bullet>
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section id="formulaire" className="bg-gris py-[100px] max-md:py-[72px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <Reveal className="text-center mb-12 max-md:mb-10">
            <Eyebrow className="mb-4">Première étape</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em] mb-4">
              Demandez votre <span className="grad">étude personnalisée.</span>
            </h2>
            <p className="text-[#5a6166] max-w-[520px] mx-auto leading-relaxed">
              Deux minutes suffisent. Un conseiller vous rappelle sous 48h
              ouvrées avec une proposition adaptée à votre situation.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <SyndicForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Bullet({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-5 h-5 shrink-0 mt-0.5 rounded-full bg-sauge/20 grid place-items-center">
        <svg
          viewBox="0 0 24 24"
          width="11"
          height="11"
          fill="none"
          stroke="var(--color-sauge)"
          strokeWidth="2.8"
          aria-hidden="true"
        >
          <path d="M5 12l5 5L20 6" />
        </svg>
      </span>
      <span className={light ? "text-white/90" : "text-anthracite"}>
        {children}
      </span>
    </li>
  );
}
