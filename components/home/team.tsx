import { Reveal } from "@/components/reveal";
import { Button, ArrowRight } from "@/components/ui/button";
import { TeamCard, JoinUsCard } from "@/components/team/team-card";
import { TEAM } from "@/lib/mock-team";
import { TeamIntro } from "@/components/home/team-intro";

/**
 * Section Équipe sur la home — réutilise les mêmes cartes que /equipe (TeamCard,
 * JoinUsCard) pour cohérence visuelle. 2 vraies cartes (Tony, David) + 1 CTA.
 */
export function Team() {
  return (
    <section id="equipe" className="bg-blanc py-[120px] max-md:py-[72px]">
      <div className="max-w-content mx-auto px-8 max-md:px-5">
        <Reveal className="flex items-end justify-between gap-5 flex-wrap mb-[46px]">
          <TeamIntro />
          <Button href="/equipe" variant="outline">
            Voir tout le monde
            <ArrowRight size={15} />
          </Button>
        </Reveal>

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
  );
}
