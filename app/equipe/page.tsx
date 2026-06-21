import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { BuildingIllust } from "@/components/illustrations/building";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import { TEAM, type TeamMember } from "@/lib/mock-team";

export const metadata: Metadata = {
  title: "Notre équipe — Markus Immobilier Villeurbanne",
  description:
    "Les visages derrière Markus Immobilier. Tony et David Pistilli, à votre service à Lyon et Villeurbanne.",
  alternates: { canonical: "/equipe" },
};

const TONES: Record<TeamMember["avatarTone"], string> = {
  anthracite: "bg-gradient-to-br from-[#4a5258] to-[#2c3135]",
  sauge: "bg-gradient-to-br from-sauge to-sauge-hover",
  warm: "bg-gradient-to-br from-[#bdc3b8] to-[#a4ab9d]",
  cool: "bg-gradient-to-br from-[#7a8a8f] to-[#4a5258]",
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
                <TeamCard member={m} />
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

export function TeamCard({ member: m }: { member: TeamMember }) {
  return (
    <article className="group h-full bg-blanc border border-[var(--bordure)] rounded-[20px] overflow-hidden hover:border-sauge/40 hover:shadow-[0_28px_56px_-20px_rgba(56,62,66,0.22)] hover:-translate-y-1.5 transition-all duration-500">
      {/* Avatar : photo si fournie, sinon placeholder initiales tonalisé */}
      <div className={`relative aspect-[4/5] ${TONES[m.avatarTone]}`}>
        {m.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={m.photo}
            alt={`${m.prenom} ${m.nom}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
          />
        ) : (
          <>
            <div className="absolute inset-0 grid place-items-center">
              <span className="text-blanc/90 font-extrabold text-[clamp(48px,8vw,84px)] tracking-[-0.02em] leading-none">
                {m.prenom[0]}
                {m.nom[0]}
              </span>
            </div>
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 bg-blanc/15 backdrop-blur rounded-full text-[10px] uppercase tracking-[0.14em] text-blanc/85 font-semibold">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              Photo à venir
            </div>
          </>
        )}
        {/* Badge FONDATEUR si présent — angle haut droit, sauge */}
        {m.label && (
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-sauge text-blanc rounded-full text-[10px] uppercase tracking-[0.18em] font-extrabold shadow-[0_4px_12px_-2px_rgba(158,165,150,0.6)]">
            {m.label}
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="p-6 max-md:p-5">
        <Eyebrow className="mb-2 !text-[10.5px]">{m.poste}</Eyebrow>
        <h3 className="text-[20px] font-bold tracking-[-0.01em] mb-4">
          {m.prenom} <span className="text-anthracite">{m.nom}</span>
        </h3>
        <div className="space-y-2.5 text-[13.5px]">
          <a
            href={`mailto:${m.email}`}
            className="flex items-center gap-2.5 text-anthracite hover:text-sauge transition"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--color-sauge)" strokeWidth="1.8" className="shrink-0">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            <span className="break-all">{m.email}</span>
          </a>
          <a
            href={`tel:${m.telephone.replace(/\s/g, "")}`}
            className="flex items-center gap-2.5 text-anthracite hover:text-sauge transition"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--color-sauge)" strokeWidth="1.8" className="shrink-0">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            {m.telephone}
          </a>
        </div>
      </div>
    </article>
  );
}

/** Carte CTA — invite à rejoindre l'équipe.
 *
 *  Visuel 100 % STATIQUE (aucune animation) : silhouette minimaliste au trait,
 *  sauge sur fond anthracite, centrée dans un bloc `aspect-[4/5]` strictement
 *  identique à la photo de Tony et au bloc DP de David. Style "relief / dessin
 *  au trait" — pas de fioritures. */
export function JoinUsCard() {
  return (
    <Link
      href="/recrutement"
      className="group h-full bg-anthracite text-blanc rounded-[20px] overflow-hidden border border-anthracite hover:border-sauge hover:shadow-[0_28px_56px_-20px_rgba(56,62,66,0.35)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#454c52] via-[#363b40] to-[#2b3034]">
        {/* Silhouette au trait sauge — buste + tête. Centrée, taille responsive
            cappée à 55 % de la largeur du bloc (cohérent avec un portrait). */}
        <div className="absolute inset-0 grid place-items-center">
          <svg
            viewBox="0 0 200 250"
            fill="none"
            stroke="#9EA596"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[55%] max-w-[200px] h-auto"
            aria-label="Silhouette d'agent — place ouverte chez Markus Immobilier"
          >
            {/* Tête */}
            <circle cx="100" cy="88" r="40" />
            {/* Buste / épaules — courbe symétrique qui descend jusqu'au bas */}
            <path d="M34 250 C 34 178 64 154 100 154 C 136 154 166 178 166 250" />
          </svg>
        </div>
      </div>

      {/* Bloc texte — eyebrow / titre / texte / bouton (inchangés) */}
      <div className="p-6 max-md:p-5 flex-1 flex flex-col">
        <Eyebrow className="mb-2 !text-[10.5px]">On recrute</Eyebrow>
        <h3 className="text-[20px] font-bold tracking-[-0.01em] mb-2">
          Pourquoi pas <span className="grad-light">vous ?</span>
        </h3>
        <p className="text-[13.5px] text-blanc/75 leading-relaxed mb-5">
          On cherche des agents commerciaux indépendants pour rejoindre une
          agence qui investit dans ses talents.
        </p>
        <div className="mt-auto inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-sauge group-hover:gap-2.5 transition-all">
          Découvrir le poste
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
