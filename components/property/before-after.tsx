"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import type { AvantApresPair } from "@/lib/listings";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";

/** Un curseur avant/après : glisser révèle la projection après rénovation. */
function BeforeAfterSlider({ pair }: { pair: AvantApresPair }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50); // % — position du curseur
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div>
      <div
        ref={wrapRef}
        className="relative aspect-[4/3] rounded-[16px] overflow-hidden bg-gris select-none cursor-ew-resize touch-none"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as Element).setPointerCapture?.(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          setFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        role="slider"
        aria-label={`Comparer avant/après — ${pair.label}`}
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
      >
        {/* Après (projection) — plein cadre, en dessous */}
        <Image
          src={pair.apres.src}
          alt={pair.apres.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover pointer-events-none"
        />
        <span className="absolute top-3 right-3 z-10 text-[10.5px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-sauge text-blanc pointer-events-none">
          Après
        </span>

        {/* Avant (état réel) — recadré par-dessus via clip-path */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={pair.avant.src}
            alt={pair.avant.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute top-3 left-3 text-[10.5px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-anthracite text-blanc">
            Avant
          </span>
        </div>

        {/* Curseur */}
        <div
          className="absolute inset-y-0 z-10 pointer-events-none"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-blanc/90" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-blanc shadow-[0_4px_14px_rgba(0,0,0,0.25)] grid place-items-center">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--color-anthracite)" strokeWidth="2.2">
              <path d="M8 8l-5 4 5 4M16 8l5 4-5 4" />
            </svg>
          </div>
        </div>
      </div>
      <p className="mt-2.5 text-[13px] font-semibold text-anthracite">{pair.label}</p>
    </div>
  );
}

/** Section « projection après rénovation » — bien vendu à l'état brut. */
export function BeforeAfterSection({ pairs }: { pairs: AvantApresPair[] }) {
  if (pairs.length === 0) return null;

  return (
    <section className="bg-gris py-[80px] max-md:py-[56px]">
      <div className="max-w-content mx-auto px-8 max-md:px-5">
        <Reveal className="mb-10 max-w-[620px]">
          <Eyebrow className="mb-3">Projection</Eyebrow>
          <h2 className="font-bold text-2xl mb-3 tracking-[-0.01em]">
            Un aperçu du <span className="grad">potentiel</span>
          </h2>
          <p className="text-[#5a6166] text-[15px] leading-relaxed">
            Glissez le curseur pour visualiser une projection après rénovation.
            Vue d&apos;illustration, non contractuelle — le bien est vendu dans
            son état actuel.
          </p>
        </Reveal>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {pairs.map((pair, i) => (
            <Reveal key={pair.label} delay={i * 100}>
              <BeforeAfterSlider pair={pair} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
