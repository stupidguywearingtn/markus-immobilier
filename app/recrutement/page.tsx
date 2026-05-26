import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { Button, ArrowRight } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { PageHero } from "@/components/layout/page-hero";
import { ApplicationForm } from "@/components/forms/application-form";
import { ExcellenceIllust } from "@/components/illustrations/excellence";
import { BuildingIllust } from "@/components/illustrations/building";
import { KeysIllust } from "@/components/illustrations/keys";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

export const metadata: Metadata = {
  title: "Recrutement — Rejoignez Markus Immobilier",
  description:
    "Agents commerciaux indépendants : outils innovants, accompagnement, communauté. Rejoignez une agence qui investit dans ses talents.",
};

const ATOUTS = [
  {
    title: "Outil d'estimation n°1",
    body: "Le différenciateur Markus : rapport PDF en 2 min avec vente, location et rendement. Vos prospects l'adorent.",
  },
  {
    title: "Accompagnement terrain",
    body: "Un coach dédié, des process clairs, des formations régulières. Vous n'êtes jamais seul·e.",
  },
  {
    title: "Communauté Discord",
    body: "Échangez en direct avec l'équipe et la communauté. Bourse d'échange, partages, soutien.",
  },
  {
    title: "Agence locale indépendante",
    body: "Pas de grosse machine. Une équipe humaine à Villeurbanne, agile et soudée.",
  },
  {
    title: "Cadre de travail moderne",
    body: "Outils numériques au top, locaux pensés pour vous, flexibilité réelle.",
  },
  {
    title: "Communication forte",
    body: "Présence Instagram, TikTok, YouTube, LinkedIn — vous bénéficiez de notre visibilité.",
  },
];

const MISSIONS = [
  "Recherche de biens & prise de mandats",
  "Commercialisation (vente, location)",
  "Gestion du portefeuille acheteur / vendeur",
  "Négociation et closing",
  "Accompagnement et fidélisation des clients",
];

const PROFIL = [
  "Commercial·e en reconversion OU pro de l'immo confirmé·e",
  "Sens de la négociation, du contact, de l'écoute",
  "Relationnel solide et autonomie",
  "Goût du challenge et de l'indépendance",
];

export default function RecrutementPage() {
  return (
    <>
      <PageHero
        eyebrow="On recrute"
        title={
          <>
            Rejoignez <span className="grad-light">Markus Immobilier.</span>
          </>
        }
        lead={
          <>
            On recherche des{" "}
            <b className="text-blanc">agents commerciaux indépendants</b> pour
            bosser dans une super agence avec des{" "}
            <b className="text-blanc">outils innovants</b> dans un{" "}
            <b className="text-blanc">cadre top</b>.
          </>
        }
        illustration={
          <DrawOnScroll>
            <ExcellenceIllust size={360} className="illust-on-dark" />
          </DrawOnScroll>
        }
        actions={
          <>
            <Button href="#postuler" variant="cta">
              Postuler / Échangeons
              <ArrowRight />
            </Button>
            <Button href="#markus-c-est" variant="ghost">
              Pourquoi nous ?
            </Button>
          </>
        }
      />

      {/* MARKUS C'EST — atouts différenciants */}
      <section
        id="markus-c-est"
        className="bg-blanc py-[120px] max-md:py-[80px]"
      >
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <Reveal className="text-center mb-14">
            <Eyebrow className="mb-4">Markus, c&apos;est</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em] mb-5">
              Ce qui change la <span className="grad">donne.</span>
            </h2>
            <p className="text-[#5a6166] max-w-[560px] mx-auto">
              Une agence qui investit dans ses agents, pas l&apos;inverse.
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-md:gap-4 mb-16 max-md:mb-10 bg-gris rounded-[20px] p-10 max-md:p-7">
              <Stat target={250} suffix="+" label="Biens accompagnés" />
              <Stat target={600} suffix="+" label="Clients accompagnés" />
              <Stat target={9} suffix="M€" label="de projets" />
              <Stat target={13} suffix="+" label="Ans d'expérience" />
            </div>
          </Reveal>

          {/* Atouts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-md:gap-5">
            {ATOUTS.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 90}>
                <article className="h-full bg-blanc border border-[var(--bordure)] rounded-[16px] p-7 hover:border-sauge/50 hover:shadow-[0_18px_40px_-20px_rgba(56,62,66,0.18)] hover:-translate-y-1 transition-all duration-400">
                  <div className="w-10 h-10 rounded-full bg-sauge/15 grid place-items-center text-sauge font-bold mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bold text-[17px] mb-2 tracking-[-0.005em]">
                    {a.title}
                  </h3>
                  <p className="text-[14px] text-[#5a6166] leading-relaxed">
                    {a.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MISSIONS + PROFIL */}
      <section className="bg-gris py-[120px] max-md:py-[80px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5 grid grid-cols-1 lg:grid-cols-2 gap-12 max-md:gap-10">
          <Reveal>
            <Eyebrow className="mb-4">Le poste</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em] mb-6">
              Vos <span className="grad">missions.</span>
            </h2>
            <ul className="space-y-3.5 mb-8">
              {MISSIONS.map((m) => (
                <ListItem key={m}>{m}</ListItem>
              ))}
            </ul>
            <DrawOnScroll>
              <KeysIllust size={120} />
            </DrawOnScroll>
          </Reveal>

          <Reveal delay={120}>
            <Eyebrow className="mb-4">Vous</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em] mb-6">
              Votre <span className="grad">profil.</span>
            </h2>
            <ul className="space-y-3.5 mb-8">
              {PROFIL.map((p) => (
                <ListItem key={p}>{p}</ListItem>
              ))}
            </ul>
            <DrawOnScroll>
              <BuildingIllust size={120} />
            </DrawOnScroll>
          </Reveal>
        </div>
      </section>

      {/* TÉMOIGNAGES VIDÉO (placeholders) */}
      <section className="bg-blanc py-[120px] max-md:py-[80px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <Reveal className="text-center mb-14">
            <Eyebrow className="mb-4">Ils en parlent</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em] mb-3">
              Les agents <span className="grad">Markus.</span>
            </h2>
            <p className="text-[#5a6166] max-w-[480px] mx-auto">
              Trois témoignages vidéo arrivent prochainement.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-md:gap-5">
            {[
              { name: "Sophie", role: "Agent depuis 3 ans" },
              { name: "Karim", role: "En reconversion" },
              { name: "Léa", role: "Senior commercial" },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="group relative aspect-[3/4] rounded-[18px] overflow-hidden bg-gradient-to-br from-[#454c52] to-[#363b40] cursor-pointer hover:shadow-[0_30px_60px_-20px_rgba(56,62,66,0.5)] transition-all duration-500">
                  {/* Play button */}
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="w-20 h-20 rounded-full bg-blanc/95 backdrop-blur grid place-items-center group-hover:scale-110 transition-transform duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                      <svg viewBox="0 0 24 24" width="26" height="26" fill="var(--color-anthracite)" className="ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="text-blanc font-bold text-lg">{t.name}</div>
                    <div className="text-white/70 text-xs uppercase tracking-[0.1em]">
                      {t.role}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.16em] text-white/60 font-semibold">
                    Vidéo à venir
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CANDIDATURE */}
      <section
        id="postuler"
        className="relative bg-gris py-[120px] max-md:py-[80px] overflow-hidden"
      >
        <div className="relative z-[1] max-w-[820px] mx-auto px-8 max-md:px-5">
          <Reveal className="text-center mb-12">
            <Eyebrow className="mb-4">Échangeons</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em] mb-4">
              Postulez en <span className="grad">2 minutes.</span>
            </h2>
            <p className="text-[#5a6166] max-w-[460px] mx-auto">
              On vous rappelle pour échanger — sans engagement, en toute
              transparence.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ApplicationForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Stat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-extrabold text-anthracite leading-none text-[clamp(28px,3.4vw,40px)]">
        <Counter target={target} suffix={suffix} />
      </div>
      <div className="text-[11px] uppercase tracking-[0.1em] text-[#7a817f] mt-2.5 font-semibold">
        {label}
      </div>
    </div>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-6 h-6 shrink-0 mt-0.5 rounded-full bg-sauge/20 grid place-items-center">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="var(--color-sauge)" strokeWidth="2.8">
          <path d="M5 12l5 5L20 6" />
        </svg>
      </span>
      <span className="text-[15px] text-anthracite leading-relaxed">{children}</span>
    </li>
  );
}
