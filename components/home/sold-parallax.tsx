"use client";

import { useEffect, useRef } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";

type Column = {
  speed: [number, number];
  items: string[];
};

const COLUMNS: Column[] = [
  {
    speed: [-12, -42],
    items: ["Appartement — Lyon 6e", "Maison — Caluire", "Duplex — Villeurbanne"],
  },
  {
    speed: [-4, -66],
    items: ["Villa — Écully", "T3 — Part-Dieu", "Loft — Gratte-Ciel"],
  },
  {
    speed: [-18, -40],
    items: ["Maison — Tassin", "Appartement — Lyon 3e", "Studio — Croix-Luizet"],
  },
  {
    speed: [-8, -58],
    items: ["Maison — Charpennes", "T4 — Lyon 7e", "Penthouse — Bron"],
  },
];

// Variantes de gradient pour rythmer visuellement les 12 cartes
const CARD_GRADIENTS = [
  "linear-gradient(135deg, #4a525a, #363b40)",
  "linear-gradient(135deg, #424950, #2c3236)",
  "linear-gradient(135deg, #525960, #3a4045)",
  "linear-gradient(135deg, #3e454b, #2a2f33)",
];

export function SoldParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const colsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      colsRef.current.forEach((col, i) => {
        if (col)
          col.style.transform = `translateY(${
            (COLUMNS[i].speed[0] + COLUMNS[i].speed[1]) / 2
          }vh)`;
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
        const [a, b] = COLUMNS[i].speed;
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
        {/* Cartes parallaxes — chaque carte en aspect-ratio 3/4 strict, plein cadre */}
        {COLUMNS.map((col, ci) => (
          <div
            key={ci}
            ref={(el) => {
              colsRef.current[ci] = el;
            }}
            className={[
              "flex-1 min-w-0 flex flex-col gap-3.5 will-change-transform",
              ci >= 2 ? "max-md:hidden" : "",
            ].join(" ")}
          >
            {col.items.map((label, ii) => (
              <div
                key={ii}
                className="relative w-full aspect-[3/4] rounded-[10px] overflow-hidden shrink-0 shadow-[0_12px_28px_-12px_rgba(0,0,0,0.5)]"
              >
                {/* Visuel plein cadre (gradient en attendant les vraies photos) */}
                <div
                  className="absolute inset-0 h-full w-full"
                  style={{
                    background: CARD_GRADIENTS[(ci + ii) % CARD_GRADIENTS.length],
                  }}
                  aria-hidden="true"
                />
                {/* Légende centrée */}
                <div className="absolute inset-0 grid place-items-center pointer-events-none">
                  <div className="flex flex-col items-center gap-2 text-center p-4 text-white/55">
                    <svg
                      viewBox="0 0 24 24"
                      width="26"
                      height="26"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="opacity-60"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                    <span className="text-[10px] tracking-[0.18em] uppercase font-semibold opacity-80">
                      {label}
                    </span>
                  </div>
                </div>
                {/* Badge Vendu */}
                <span className="absolute top-2.5 left-2.5 z-[3] bg-sauge text-blanc text-[9.5px] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full shadow-[0_4px_10px_rgba(158,165,150,0.4)]">
                  Vendu
                </span>
              </div>
            ))}
          </div>
        ))}

        {/* Overlay titre (centré, au-dessus de la parallaxe) */}
        <div
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center pointer-events-none text-blanc px-6"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 45%, rgba(56,62,66,.55), transparent)",
          }}
        >
          <Eyebrow className="mb-4">Notre track record</Eyebrow>
          <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-blanc text-[clamp(30px,4vw,46px)] mb-4 [text-shadow:0_4px_30px_rgba(0,0,0,.5)]">
            Nos biens vendus
          </h2>
          <p className="text-white/70 max-w-[440px]">
            Des dizaines de projets menés à bien à Lyon &amp; Villeurbanne. Faites
            défiler pour découvrir.
          </p>
        </div>
      </div>
    </section>
  );
}
