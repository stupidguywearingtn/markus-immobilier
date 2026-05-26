import { Eyebrow } from "@/components/ui/eyebrow";
import { Button, ArrowRight } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/ui/counter";
import { BuildingIllust } from "@/components/illustrations/building";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import { ScrollLine } from "./scroll-line";

const STATS = [
  { target: 13, suffix: "+", label: "Ans d'expérience" },
  { target: 250, suffix: "+", label: "Biens accompagnés" },
  { target: 9, suffix: "M€", label: "de projets" },
  { target: 600, suffix: "+", label: "Clients accompagnés" },
];

export function About() {
  return (
    <section
      id="apropos"
      className="relative overflow-hidden py-[120px] max-md:py-[72px] bg-gris"
    >
      <ScrollLine containerSelector="#apropos" />
      <div className="relative z-[1] max-w-content mx-auto px-8 max-md:px-5">
        <div className="grid gap-[64px] max-md:gap-10 items-center grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
          {/* Colonne gauche : composition Photo + Immeuble illustré */}
          <Reveal>
            <div className="relative aspect-[4/5] min-h-[380px] rounded-[14px] overflow-hidden bg-gradient-to-br from-[#dfe2dd] via-[#c9cec6] to-[#b9bfb4]">
              {/* Caption photo (placeholder en attendant la vraie photo) */}
              <div className="absolute top-6 left-6 z-[3] flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-semibold text-[#5d6560]/70">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                Photo de l&apos;agence
              </div>

              {/* Immeuble illustré, centré */}
              <DrawOnScroll className="absolute inset-0 grid place-items-center">
                <BuildingIllust size={260} className="opacity-90" />
              </DrawOnScroll>

              {/* Mention discrète bas */}
              <div className="absolute bottom-5 right-5 text-[9px] tracking-[0.2em] uppercase text-[#5d6560]/50">
                Villeurbanne
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Eyebrow className="mb-4">À propos</Eyebrow>
            <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-[clamp(30px,4vw,46px)] mb-4">
              Qui sommes-nous
            </h2>
            <p className="text-[#5a6166] mb-4">
              Markus Immobilier est une agence indépendante implantée à
              Villeurbanne, spécialisée dans la vente, la location et la gestion
              de biens. Ici, on ne fait pas « juste une vente » : on écoute, on
              conseille, on protège votre projet.
            </p>
            <p className="text-[#9aa09d] italic text-sm mb-2">
              [Texte de présentation à remplacer par celui que le client doit envoyer]
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[18px] my-9">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 100}>
                  <div>
                    <div className="font-extrabold text-anthracite leading-none text-[clamp(28px,3.4vw,40px)]">
                      <Counter target={s.target} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-[#7a817f] mt-1.5 tracking-[0.04em]">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Button href="/equipe" variant="primary">
              Notre équipe
              <ArrowRight size={15} />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
