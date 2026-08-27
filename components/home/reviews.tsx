"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/backoffice/EditableText";
import { useV } from "@/hooks/useV";

type Review = {
  name: string;
  date: string; // format "JJ/MM/AAAA"
  stars: number;
  text: string;
};

const REVIEWS: Review[] = [
  {
    name: "Andrée P.",
    date: "19/05/2020",
    stars: 5,
    text: "Équipe très dynamique… Connaît bien le terrain et cible parfaitement sa clientèle. Merci à Monsieur Pistilli qui s'est investi à 100 % pour la vente de mon appartement. Bravo à vous tous.",
  },
  {
    name: "Roger G.",
    date: "28/09/2021",
    stars: 5,
    text: "Tony a mené d'une main de maître un doublé : la vente d'une maison et l'achat d'un appartement. Nous avons été suivis, accompagnés et très bien conseillés du premier jour jusqu'à la signature chez le notaire.",
  },
  {
    name: "Didier & Béatrice F.",
    date: "07/05/2021",
    stars: 5,
    text: "Écoute, disponibilité, réactivité, et surtout un conseiller extrêmement compétent qui a traité notre dossier de bout en bout avec exemplarité. Les services de Tony Pistilli sont à la fois de qualité et différenciants. Encore merci !",
  },
];

export function Reviews() {
  const v = useV();
  return (
    <section id="avis" className="bg-gris py-[120px] max-md:py-[72px]">
      <div className="max-w-content mx-auto px-8 max-md:px-5">
        <Reveal className="text-center max-w-[640px] mx-auto mb-14 max-md:mb-10">
          <Eyebrow className="mb-4">
            <EditableText
              section="reviews"
              field="eyebrow"
              value={v("reviews", "eyebrow", "Témoignages")}
            />
          </Eyebrow>
          <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-[clamp(30px,4vw,46px)] mb-4">
            Nos <span className="grad">avis clients.</span>
          </h2>
          <p className="text-[#5a6166]">
            <EditableText
              as="span"
              multiline
              section="reviews"
              field="subtitle"
              value={v(
                "reviews",
                "subtitle",
                "Ce que nos clients disent du suivi, de la rigueur et de l'accompagnement Markus.",
              )}
            />
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-md:gap-5">
          {REVIEWS.map((r, i) => (
            <Reveal key={`${r.name}-${r.date}`} delay={i * 100}>
              <ReviewCard review={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="h-full bg-blanc border border-[var(--bordure)] rounded-[18px] p-7 max-md:p-6 flex flex-col gap-4 hover:border-sauge/40 hover:shadow-[0_22px_50px_-22px_rgba(56,62,66,0.22)] hover:-translate-y-1 transition-all duration-500">
      {/* Étoiles + guillemets décoratifs */}
      <div className="flex items-start justify-between gap-4">
        <Stars count={review.stars} />
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="var(--color-sauge)"
          className="opacity-25 shrink-0"
          aria-hidden="true"
        >
          <path d="M7 7h4v4H7c0 2 1 3 3 3v2c-3 0-5-2-5-5V7zm9 0h4v4h-4c0 2 1 3 3 3v2c-3 0-5-2-5-5V7z" />
        </svg>
      </div>

      <p className="text-[14.5px] text-[#3d4347] leading-[1.7] italic flex-1">
        « {review.text} »
      </p>

      <div className="pt-4 border-t border-[var(--bordure)] flex items-center justify-between gap-3">
        <span className="font-bold text-anthracite text-[14px]">
          {review.name}
        </span>
        <span className="text-[12px] text-[#7a817f] tabular-nums">
          {review.date}
        </span>
      </div>
    </article>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Note : ${count} sur 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill={i < count ? "var(--color-sauge)" : "transparent"}
          stroke="var(--color-sauge)"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 2l2.6 6.3 6.8.6-5.2 4.5 1.6 6.6L12 16.7l-5.8 3.3 1.6-6.6L2.6 8.9l6.8-.6L12 2z" />
        </svg>
      ))}
    </div>
  );
}
