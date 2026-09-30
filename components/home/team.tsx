import { getTeam } from "@/lib/content-db";
import { TeamView } from "@/components/home/team-view";

/**
 * Section Équipe sur la home — réutilise les mêmes cartes que /equipe (TeamCard,
 * JoinUsCard) pour cohérence visuelle. Les collaborateurs viennent de la base
 * (gérés dans /admin/equipe) + 1 carte CTA « Pourquoi pas vous ? ».
 * Le rendu vit dans `team-view.tsx` (réutilisé par l'éditeur de pages).
 */
export async function Team() {
  const team = await getTeam();
  return <TeamView team={team} />;
}
