"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { EditableText } from "@/components/backoffice/EditableText";
import { useV } from "@/hooks/useV";

/**
 * Intro de la section Équipe (home). Isolée en composant client pour rendre
 * l'eyebrow et le sous-titre éditables sans convertir team.tsx (qui importe
 * des composants depuis la route /equipe).
 */
export function TeamIntro() {
  const v = useV();
  return (
    <div className="max-w-[620px]">
      <Eyebrow className="mb-4">
        <EditableText
          section="team"
          field="eyebrow"
          value={v("team", "eyebrow", "Les visages")}
        />
      </Eyebrow>
      <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-[clamp(30px,4vw,46px)] mb-3">
        Notre <span className="grad">équipe.</span>
      </h2>
      <p className="text-lg text-[#5a6166]">
        <EditableText
          as="span"
          multiline
          section="team"
          field="subtitle"
          value={v(
            "team",
            "subtitle",
            "Une équipe locale et joignable, qui partage la même exigence : votre projet, conduit avec sérieux.",
          )}
        />
      </p>
    </div>
  );
}
