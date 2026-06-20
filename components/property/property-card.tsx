"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export type PropertyKind = "vente" | "location";

export type PhotoVariant = "light" | "warm" | "cool" | "airy" | "pale" | "dark";

const photoGradient: Record<PhotoVariant, string> = {
  light: "linear-gradient(135deg, #dfe2dd, #c9cec6 60%, #b9bfb4)",
  warm: "linear-gradient(135deg, #cdd2cb, #b6bcb1)",
  cool: "linear-gradient(135deg, #d6dad3, #c0c6bb)",
  airy: "linear-gradient(135deg, #d2d7d0, #bbc1b6)",
  pale: "linear-gradient(135deg, #daded7, #c4cabf)",
  dark: "linear-gradient(135deg, #454c52, #363b40)",
};

export type Property = {
  id: string;
  price: string;
  priceSuffix?: string;
  location: string;
  title: string;
  rooms: number;
  surface: number;
  kind: PropertyKind;
  photos: Array<{ caption: string; variant: PhotoVariant }>;
};

/**
 * Les biens affichés sont des EXEMPLES de mise en page, pas de vrais mandats.
 * Tant que ce flag est `true` : badge « À venir » sur chaque carte + CTA adouci
 * (pas de lien vers une fiche). Passer à `false` quand de vrais biens existent.
 */
export const LISTINGS_COMING_SOON = true;

export function PropertyCard({ property }: { property: Property }) {
  const [index, setIndex] = useState(0);
  const total = property.photos.length;
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion.current) return;

    const delay = 3800 + Math.random() * 1200;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, delay);
    return () => window.clearInterval(id);
  }, [total]);

  const badgeClass =
    property.kind === "location"
      ? "bg-sauge text-blanc"
      : "bg-anthracite text-blanc";
  const badgeLabel = property.kind === "location" ? "À louer" : "À vendre";

  return (
    <article className="group bg-blanc border border-[var(--bordure)] rounded-[16px] overflow-hidden [transition:all_0.4s_var(--ease)] hover:-translate-y-2 hover:shadow-[0_28px_56px_-12px_rgba(56,62,66,0.22)] hover:border-[rgba(56,62,66,0.18)]">
      {/* Carrousel photo — plein cadre, ratio 4/3 strict */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gris">
        {property.photos.map((photo, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            {/* Visuel plein cadre (gradient en attendant les vraies photos) */}
            <div
              className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              style={{ background: photoGradient[photo.variant] }}
            />
            {/* Légende centrée discrète */}
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="flex flex-col items-center gap-2 text-center p-[18px] text-[#5d6560]">
                <svg
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="opacity-50"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-[10.5px] tracking-[0.18em] uppercase font-semibold opacity-60">
                  {photo.caption}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Dégradé bas pour la lisibilité (premium polish) */}
        <div
          className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none z-[3]"
          style={{
            background:
              "linear-gradient(to top, rgba(56,62,66,0.42) 0%, rgba(56,62,66,0.12) 50%, transparent 100%)",
          }}
        />

        {/* Badges haut-gauche : « À venir » (priorité) + type de bien */}
        <div className="absolute top-3.5 left-3.5 z-[4] flex items-center gap-1.5">
          {LISTINGS_COMING_SOON && (
            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.18)] bg-amber-400 text-anthracite">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4l3 2" />
              </svg>
              À venir
            </span>
          )}
          <span
            className={`text-[10.5px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.18)] ${badgeClass}`}
          >
            {badgeLabel}
          </span>
        </div>

        {/* Compteur 1/3 */}
        <span className="absolute top-3.5 right-3.5 z-[4] bg-anthracite/[0.78] text-blanc text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md tabular-nums">
          {index + 1}/{total}
        </span>

        {/* Dots indicateur */}
        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-[4] flex gap-1.5">
          {property.photos.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={[
                "h-[7px] rounded-full transition-all cursor-pointer",
                i === index
                  ? "w-[22px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  : "w-[7px] bg-white/55 hover:bg-white/80",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="text-[24px] font-bold text-anthracite tracking-[-0.01em] leading-none">
          {property.price}
          {property.priceSuffix && (
            <span className="text-[13px] text-[#7a817f] font-medium">
              {" "}
              {property.priceSuffix}
            </span>
          )}
        </div>
        <div className="text-[13px] text-[#7a817f] mt-2 mb-3.5 flex items-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            width="13"
            height="13"
            fill="none"
            stroke="var(--color-sauge)"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.4" />
          </svg>
          {property.location}
        </div>
        <h3 className="text-lg font-semibold mb-4 leading-[1.3]">
          {property.title}
        </h3>
        <div className="flex gap-[18px] pt-4 border-t border-[var(--bordure)] text-[13px] text-[#5a6166]">
          <div>
            <b className="text-anthracite font-bold">{property.rooms}</b> pièces
          </div>
          <div>
            <b className="text-anthracite font-bold">{property.surface}</b> m²
          </div>
        </div>
        {LISTINGS_COMING_SOON ? (
          <span className="mt-5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[#9aa09d] inline-flex items-center gap-1.5 cursor-default select-none">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4l3 2" />
            </svg>
            Bientôt disponible
          </span>
        ) : (
          <Link
            href={`/annonces/${property.id}`}
            className="mt-5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-sauge no-underline inline-flex items-center gap-1.5 transition-all hover:gap-3 group/cta"
          >
            Voir le bien
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="transition-transform group-hover/cta:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}
