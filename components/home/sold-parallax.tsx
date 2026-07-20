"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SOLD_ITEMS, soldAlt, type SoldItem } from "@/lib/sold-gallery";

/** Vitesses de défilement (vh) : début → fin de la traversée de la section. */
const SPEEDS: Array<[number, number]> = [
  [-12, -42],
  [-4, -66],
  [-18, -40],
];

/**
 * Répartit les photos en N colonnes : chaque colonne reçoit la liste complète,
 * décalée, puis doublée.
 *
 * - décalée → deux colonnes voisines n'affichent jamais la même photo côte à côte ;
 * - doublée → la colonne reste plus haute que la fenêtre sur toute la course de
 *   la parallaxe (sinon un vide apparaît en bas sur mobile, où les vignettes
 *   paysage sont peu hautes). Le doublon n'est jamais visible : la fenêtre ne
 *   montre que ~3 vignettes à la fois.
 */
function buildColumn(items: SoldItem[], index: number, total: number): SoldItem[] {
  const offset = Math.round((items.length / total) * index);
  const rotated = [...items.slice(offset), ...items.slice(0, offset)];
  return [...rotated, ...rotated];
}

export function SoldParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const colsRef = useRef<Array<HTMLDivElement | null>>([]);

  const columns = SPEEDS.map((_, i) => buildColumn(SOLD_ITEMS, i, SPEEDS.length));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      colsRef.current.forEach((col, i) => {
        if (col)
          col.style.transform = `translateY(${(SPEEDS[i][0] + SPEEDS[i][1]) / 2}vh)`;
      });
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      colsRef.current.forEach((col, i) => {
        if (!col) return;
        const [a, b] = SPEEDS[i];
        col.style.transform = `translateY(${a + (b - a) * p}vh)`;
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vendus"
      aria-label="Nos biens vendus"
      className="relative h-[230vh] max-md:h-[180vh] bg-anthracite"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex gap-3.5 p-3.5 bg-anthracite">
        {columns.map((items, ci) => (
          <div
            key={ci}
            ref={(el) => {
              colsRef.current[ci] = el;
            }}
            className={[
              "flex-1 min-w-0 flex flex-col gap-3.5 will-change-transform",
              // 3e colonne masquée sur mobile (vignettes trop étroites à 3 colonnes)
              ci >= 2 ? "max-md:hidden" : "",
            ].join(" ")}
          >
            {items.map((item, ii) => (
              <SoldCard key={`${ci}-${ii}`} item={item} />
            ))}
          </div>
        ))}

        {/* Overlay titre (centré, au-dessus de la parallaxe) */}
        <div
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center pointer-events-none text-blanc px-6"
          // Scrim renforcé : les photos fournies sont des intérieurs très
          // lumineux (murs blancs, baies vitrées) — sans ça, l'eyebrow sauge et
          // le paragraphe deviennent illisibles au centre.
          style={{
            background:
              "radial-gradient(72% 62% at 50% 45%, rgba(32,36,39,.94) 0%, rgba(32,36,39,.82) 40%, rgba(32,36,39,.42) 72%, rgba(32,36,39,0) 100%)",
          }}
        >
          <Eyebrow className="mb-4 [text-shadow:0_2px_14px_rgba(0,0,0,.7)]">
            Notre track record
          </Eyebrow>
          <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-blanc text-[clamp(30px,4vw,46px)] mb-4 [text-shadow:0_4px_30px_rgba(0,0,0,.5)]">
            Nos biens vendus
          </h2>
          <p className="text-white/75 max-w-[460px] [text-shadow:0_2px_16px_rgba(0,0,0,.6)]">
            Des dizaines de projets menés à bien à Lyon, Villeurbanne et dans
            l&apos;Est lyonnais. Faites défiler pour découvrir.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Vignette paysage 3:2 — le format natif de la majorité des photos fournies,
 * donc quasiment aucun recadrage. Ratio identique pour toutes (homogénéité).
 */
function SoldCard({ item }: { item: SoldItem }) {
  return (
    <figure className="relative w-full aspect-[3/2] rounded-[10px] overflow-hidden shrink-0 shadow-[0_12px_28px_-12px_rgba(0,0,0,0.5)] bg-[#3e454b]">
      <Image
        src={item.src}
        alt={soldAlt(item)}
        fill
        sizes="(max-width: 768px) 46vw, 31vw"
        loading="lazy"
        className="object-cover object-center"
      />

      {/* Scrim bas : lisibilité du titre quelle que soit la photo */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(24,27,29,0.88) 0%, rgba(24,27,29,0.45) 45%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Badge Vendu */}
      <span className="absolute top-2.5 left-2.5 z-[3] bg-sauge text-blanc text-[9.5px] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full shadow-[0_4px_10px_rgba(158,165,150,0.4)]">
        Vendu
      </span>

      {/* Titre repris du nom de fichier */}
      <figcaption className="absolute inset-x-0 bottom-0 z-[3] p-3 max-md:p-2.5">
        <span className="block text-blanc font-semibold leading-tight text-[13px] max-md:text-[11px]">
          {item.titre}
        </span>
      </figcaption>
    </figure>
  );
}
