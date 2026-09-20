import type { Metadata } from "next";
import { shareMeta } from "@/lib/seo/share";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { BuildingIllust } from "@/components/illustrations/building";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import { TeamCard, JoinUsCard } from "@/components/team/team-card";
import { getTeam } from "@/lib/content-db";
import { AdminManageLink } from "@/components/backoffice/AdminManageLink";
import { JsonLd, breadcrumbLd, teamLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Notre équipe — Markus Immobilier Villeurbanne",
  description:
    "Les visages derrière Markus Immobilier. Tony et David Pistilli, à votre service à Lyon et Villeurbanne.",
  alternates: { canonical: "/equipe" },
  ...shareMeta({
    title: "Notre équipe — Markus Immobilier Villeurbanne",
    description:
      "Tony et David Pistilli, les conseillers de l'agence, avec leurs coordonnées directes.",
    path: "/equipe",
  }),
};

export default async function EquipePage() {
  const team = await getTeam();
  return (
    <>
      {/* Balisage des deux conseillers DÉJÀ affichés sur la page (nom, poste,
          e-mail et téléphone directs), rattachés à l'agence par `employee`.
          Construit depuis la même source que les cartes (base, repli statique). */}
      <JsonLd data={teamLd(team, "/equipe")} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Notre équipe", path: "/equipe" },
        ])}
      />
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

      {/* GRILLE — les collaborateurs + 1 carte « Pourquoi pas vous ? » */}
      <section className="bg-blanc py-[120px] max-md:py-[80px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <div className="flex justify-end mb-6 empty:hidden">
            <AdminManageLink href="/admin/equipe" label="Gérer l'équipe" />
          </div>
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
    </>
  );
}
