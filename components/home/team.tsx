import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { Button, ArrowRight } from "@/components/ui/button";
import { TeamCard, JoinUsCard } from "@/app/equipe/page";
import { TEAM } from "@/lib/mock-team";

/**
 * Section Équipe sur la home — réutilise les mêmes cartes que /equipe (TeamCard,
 * JoinUsCard) pour cohérence visuelle. 2 vraies cartes (Tony, David) + 1 CTA.
 */
export function Team() {
  return (
    <section id="equipe" className="bg-blanc py-[120px] max-md:py-[72px]">
      <div className="max-w-content mx-auto px-8 max-md:px-5">
        <Reveal className="flex items-end justify-between gap-5 flex-wrap mb-[46px]">
          <div className="max-w-[620px]">
            <Eyebrow className="mb-4">Les visages</Eyebrow>
            <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-[clamp(30px,4vw,46px)] mb-3">
              Notre <span className="grad">équipe.</span>
            </h2>
            <p className="text-lg text-[#5a6166]">
              Une équipe locale et joignable, qui partage la même exigence : votre
              projet, conduit avec sérieux.
            </p>
          </div>
          <Button href="/equipe" variant="outline">
            Voir tout le monde
            <ArrowRight size={15} />
          </Button>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-md:gap-5">
          {TEAM.map((m, i) => (
            <Reveal key={`${m.prenom}-${m.nom}`} delay={i * 90}>
              <TeamCard member={m} />
            </Reveal>
          ))}
          <Reveal delay={TEAM.length * 90}>
            <JoinUsCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
