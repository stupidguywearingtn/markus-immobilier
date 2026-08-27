import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { BuildingIllust } from "@/components/illustrations/building";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import { TeamCard, JoinUsCard } from "@/components/team/team-card";
import { TEAM } from "@/lib/mock-team";

export const metadata: Metadata = {
  title: "Notre équipe — Markus Immobilier Villeurbanne",
  description:
    "Les visages derrière Markus Immobilier. Tony et David Pistilli, à votre service à Lyon et Villeurbanne.",
  alternates: { canonical: "/equipe" },
};

export default function EquipePage() {
  return (
    <>
      <PageHero
        eyebrow="Les visages"
        title={<>Notre <span className="grad-light">équipe.</span></>}
        lead="Une équipe locale, joignable, qui partage la même exigence : votre projet, conduit avec sérieux."
        illustration={
          <DrawOnScroll>
            <BuildingIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
      />

      {/* GRILLE — 2 vraies cartes + 1 carte « Pourquoi pas vous ? » */}
      <section className="bg-blanc py-[120px] max-md:py-[80px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-md:gap-5">
            {TEAM.map((m, i) => (
              <Reveal key={`${m.prenom}-${m.nom}`} delay={i * 90}>
                <TeamCard member={m} index={i} />
              </Reveal>
            ))}
            <Reveal delay={TEAM.length * 90}>
              <JoinUsCard />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
