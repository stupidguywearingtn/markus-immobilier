"use client";

import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button, ArrowRight } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/ui/counter";
import { SectionVideoBg } from "@/components/ui/section-video-bg";
import { EditableText } from "@/components/backoffice/EditableText";
import { EditableImage } from "@/components/backoffice/EditableImage";
import { useV } from "@/hooks/useV";
import { ScrollLine } from "./scroll-line";

const STATS = [
  { target: 7, suffix: "", label: "Ans d'expérience" },
  { target: 250, suffix: "+", label: "Biens accompagnés" },
  { target: 40, suffix: "M€", label: "de projets" },
  { target: 300, suffix: "+", label: "Clients accompagnés" },
];

export function About() {
  const v = useV();

  return (
    <section
      id="apropos"
      // bg-anthracite = filet de sécurité : si la vidéo ET le poster échouent,
      // le texte blanc reste parfaitement lisible sur l'aplat de marque.
      className="relative overflow-hidden py-[120px] max-md:py-[72px] bg-anthracite text-blanc"
    >
      <SectionVideoBg
        src="/videos/agence-ambiance.mp4"
        poster="/videos/agence-ambiance-poster.jpg"
        overlay={0.72}
        blur={2}
      />
      <ScrollLine containerSelector="#apropos" />
      <div className="relative z-[1] max-w-content mx-auto px-8 max-md:px-5">
        <div className="grid gap-[64px] max-md:gap-10 items-center grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
          {/* Colonne gauche : vraie photo de l'agence */}
          <Reveal>
            <div className="relative aspect-[4/5] min-h-[380px] rounded-[14px] overflow-hidden bg-gradient-to-br from-[#dfe2dd] via-[#c9cec6] to-[#b9bfb4] shadow-[0_28px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-blanc/10">
              <EditableImage
                section="about"
                field="photo"
                value={v("about", "photo", "/agence-markus-villeurbanne.jpg")}
              >
                {(url) => (
                  <Image
                    src={url}
                    alt="Salle de réunion de l'agence Markus Immobilier à Villeurbanne"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                )}
              </EditableImage>

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
            <Eyebrow className="mb-4">
              <EditableText
                section="about"
                field="eyebrow"
                value={v("about", "eyebrow", "À propos")}
              />
            </Eyebrow>
            <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-[clamp(30px,4vw,46px)] mb-4">
              <EditableText
                section="about"
                field="title"
                value={v("about", "title", "Qui sommes-nous")}
              />
            </h2>
            <p className="text-blanc/85 mb-4 leading-relaxed">
              <EditableText
                as="span"
                multiline
                section="about"
                field="para_1"
                value={v(
                  "about",
                  "para_1",
                  "Chez Markus Immobilier, l'immobilier est avant tout une histoire de confiance. Implantée au cœur de Villeurbanne, notre agence indépendante vous accompagne dans la vente, la location et la gestion de vos biens.",
                )}
              />
            </p>
            <p className="text-blanc/85 mb-2 leading-relaxed">
              Notre indépendance, c&apos;est la liberté de vous conseiller{" "}
              <strong className="font-semibold text-blanc">
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
                    <div className="font-extrabold text-blanc leading-none text-[clamp(28px,3.4vw,40px)]">
                      <Counter target={s.target} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-blanc/70 mt-1.5 tracking-[0.04em]">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Button href="/equipe" variant="ghost">
              Notre équipe
              <ArrowRight size={15} />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
