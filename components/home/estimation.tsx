"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { Button, ArrowRight } from "@/components/ui/button";
import { KeysIllust } from "@/components/illustrations/keys";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import { SignatureSequence } from "@/components/property/signature-sequence";
import { EditableText } from "@/components/backoffice/EditableText";
import { useV } from "@/hooks/useV";

const BENEFITS = [
  { label: <><b>Estimation de vente</b></> },
  { label: <><b>Estimation de location</b></> },
  { label: <><b>Taux de rendement</b></> },
  { label: <>Rapport PDF en <b>moins de 2 min</b></> },
  { label: <><b>Gratuit</b> &amp; sans engagement</> },
];

/**
 * Section estimation de la home — utilise désormais le composant
 * partagé <SignatureSequence /> (même source que /estimation).
 */
export function Estimation() {
  const [runKey, setRunKey] = useState(0);
  const v = useV();

  return (
    <section
      id="estimation"
      className="relative py-[120px] max-md:py-[72px] bg-anthracite text-blanc overflow-hidden"
    >
      {/* Clés à part entière, en bas-gauche, visible sur fond sombre */}
      <DrawOnScroll className="absolute bottom-[60px] left-[40px] z-0 pointer-events-none max-md:hidden">
        <KeysIllust size={220} className="illust-on-dark" />
      </DrawOnScroll>

      <div className="relative max-w-content mx-auto px-8 max-md:px-5">
        <div className="grid gap-[60px] max-md:gap-10 items-center grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
          {/* Texte */}
          <Reveal>
            <span className="inline-flex items-center gap-2 bg-sauge/[0.18] text-sauge border border-sauge/40 px-4 py-[7px] rounded-full text-xs font-semibold tracking-[0.12em] uppercase mb-5">
              <EditableText
                section="estimation"
                field="eyebrow"
                value={v("estimation", "eyebrow", "★ Outil n°1")}
              />
            </span>
            <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-[clamp(30px,4vw,46px)] mb-4 text-blanc">
              Estimez votre bien en moins de{" "}
              <span className="grad-light">2 minutes.</span>
            </h2>
            <p className="text-white/70 text-lg max-w-[560px]">
              <EditableText
                as="span"
                multiline
                section="estimation"
                field="subtitle"
                value={v(
                  "estimation",
                  "subtitle",
                  "Notre outil d'estimation complet vous envoie un rapport PDF détaillé directement sur votre mail.",
                )}
              />
            </p>

            <ul className="list-none my-7 flex flex-col gap-4">
              {BENEFITS.map((b, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3.5 text-base text-white/90"
                >
                  <span className="w-[30px] h-[30px] shrink-0 rounded-full bg-sauge/20 grid place-items-center">
                    <svg
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                      fill="none"
                      stroke="var(--color-sauge)"
                      strokeWidth="2.4"
                      aria-hidden="true"
                    >
                      <path d="M5 12l5 5L20 6" />
                    </svg>
                  </span>
                  <span>{b.label}</span>
                </li>
              ))}
            </ul>

            <Button onClick={() => setRunKey((k) => k + 1)} variant="cta">
              Estimer mon bien
              <ArrowRight />
            </Button>
          </Reveal>

          {/* Séquence signature partagée */}
          <Reveal delay={120}>
            <SignatureSequence
              triggerKey={runKey}
              autoTriggerOnIntersection={true}
              size="default"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
