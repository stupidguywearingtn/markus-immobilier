import { Reveal } from "@/components/reveal";
import { Button, ArrowRight } from "@/components/ui/button";
import { TeamCard, JoinUsCard } from "@/components/team/team-card";
import { getTeam } from "@/lib/content-db";
import { AdminManageLink } from "@/components/backoffice/AdminManageLink";
import { TeamIntro } from "@/components/home/team-intro";

/**
 * Section Équipe sur la home — réutilise les mêmes cartes que /equipe (TeamCard,
 * JoinUsCard) pour cohérence visuelle. Les collaborateurs viennent de la base
 * (gérés dans /admin/equipe) + 1 carte CTA « Pourquoi pas vous ? ».
 */
export async function Team() {
  const team = await getTeam();
  return (
    <section id="equipe" className="bg-blanc py-[120px] max-md:py-[72px]">
      <div className="max-w-content mx-auto px-8 max-md:px-5">
        <Reveal className="flex items-end justify-between gap-5 flex-wrap mb-[46px]">
          <TeamIntro />
          <div className="flex items-center gap-3 flex-wrap">
          <AdminManageLink href="/admin/equipe" label="Gérer l'équipe" />
          <Button href="/equipe" variant="outline">
            Voir tout le monde
            <ArrowRight size={15} />
          </Button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-md:gap-5">
          {team.map((m, i) => (
            <Reveal key={`${m.prenom}-${m.nom}`} delay={i * 90}>
              <TeamCard member={m} index={i} />
            </Reveal>
          ))}
          <Reveal delay={team.length * 90}>
            <JoinUsCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
