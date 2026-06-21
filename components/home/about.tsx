import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button, ArrowRight } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/ui/counter";
import { ScrollLine } from "./scroll-line";

const STATS = [
  { target: 7, suffix: "", label: "Ans d'expérience" },
  { target: 250, suffix: "+", label: "Biens accompagnés" },
  { target: 40, suffix: "M€", label: "de projets" },
  { target: 300, suffix: "+", label: "Clients accompagnés" },
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
          {/* Colonne gauche : vraie photo de l'agence */}
          <Reveal>
            <div className="relative aspect-[4/5] min-h-[380px] rounded-[14px] overflow-hidden bg-gradient-to-br from-[#dfe2dd] via-[#c9cec6] to-[#b9bfb4] shadow-[0_28px_60px_-28px_rgba(56,62,66,0.35)]">
              {/* Photo de l'agence — déposer le fichier dans public/agence-markus.jpg */}
              <Image
                src="/agence-markus.jpg"
                alt="Intérieur de l'agence Markus Immobilier à Villeurbanne"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />

              {/* Dégradé bas pour lisibilité de la mention */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(56,62,66,0.5) 0%, transparent 100%)",
                }}
                aria-hidden="true"
              />
              {/* Mention discrète bas */}
              <div className="absolute bottom-5 right-5 text-[10px] tracking-[0.2em] uppercase text-blanc/85 font-semibold z-[2]">
                Villeurbanne
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Eyebrow className="mb-4">À propos</Eyebrow>
            <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-[clamp(30px,4vw,46px)] mb-4">
              Qui sommes-nous
            </h2>
            <p className="text-[#3d4347] mb-4 leading-relaxed">
              Chez Markus Immobilier, l&apos;immobilier est avant tout une{" "}
              <strong className="font-semibold text-anthracite">
                histoire de confiance
              </strong>
              . Implantée au cœur de Villeurbanne, notre agence indépendante vous
              accompagne dans la vente, la location et la gestion de vos biens.
            </p>
            <p className="text-[#3d4347] mb-2 leading-relaxed">
              Notre indépendance, c&apos;est la liberté de vous conseiller{" "}
              <strong className="font-semibold text-anthracite">
                en toute transparence
              </strong>
              , avec une vraie connaissance du terrain et une réactivité de
              chaque instant. À vos côtés à chaque étape, on écoute, on répond
              vite, on conseille et on protège votre projet.
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
