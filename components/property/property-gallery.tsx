"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Galerie photos pour fiche bien.
 * Pattern inspiré de 21st.dev "Gallery Animation" — strip horizontale expandable au hover
 * + lightbox modale avec prev/next/close + compteur.
 * Adapté à notre stack (gradients en attendant les vraies photos).
 */

const gradients = [
  "linear-gradient(135deg, #dfe2dd, #c9cec6 60%, #b9bfb4)",
  "linear-gradient(135deg, #cdd2cb, #b6bcb1)",
  "linear-gradient(135deg, #d6dad3, #c0c6bb)",
  "linear-gradient(135deg, #d2d7d0, #bbc1b6)",
  "linear-gradient(135deg, #daded7, #c4cabf)",
] as const;

export function PropertyGallery({
  photos,
}: {
  photos: Array<{ caption: string }>;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  // Block body scroll when lightbox open
  useEffect(() => {
    if (selected !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [selected]);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      else if (e.key === "ArrowRight")
        setSelected((s) => (s !== null ? (s + 1) % photos.length : null));
      else if (e.key === "ArrowLeft")
        setSelected((s) =>
          s !== null ? (s - 1 + photos.length) % photos.length : null,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, photos.length]);

  const flex = (i: number) => {
    if (hovered === null) return 1;
    return hovered === i ? 2.2 : 0.55;
  };

  return (
    <>
      <div
        className="flex gap-2.5 h-[68vh] max-md:h-[42vh] w-full max-md:flex-col max-md:h-auto"
        onMouseLeave={() => setHovered(null)}
      >
        {photos.map((photo, i) => (
          <motion.button
            key={i}
            type="button"
            className="relative cursor-pointer overflow-hidden rounded-[12px] group max-md:flex-1 max-md:h-[180px]"
            style={{ flex: 1, background: gradients[i % gradients.length] }}
            animate={{ flex: flex(i) }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(i)}
            onClick={() => setSelected(i)}
            aria-label={`Agrandir ${photo.caption}`}
          >
            {/* Caption au centre */}
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="flex flex-col items-center gap-2 text-center p-4 text-[#5d6560]/70">
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
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
                <span className="text-[11px] tracking-[0.18em] uppercase font-semibold opacity-70">
                  {photo.caption}
                </span>
              </div>
            </div>
            {/* Overlay assombri quand autre tile hovered */}
            <motion.div
              className="absolute inset-0 bg-anthracite pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: hovered !== null && hovered !== i ? 0.35 : 0,
              }}
              transition={{ duration: 0.35 }}
            />
            {/* Loupe icon visible au hover de la tile active */}
            <div
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-blanc/90 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="var(--color-anthracite)"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-anthracite/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Galerie agrandie"
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Fermer"
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-blanc transition"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            {/* Prev */}
            {photos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected((s) =>
                    s !== null ? (s - 1 + photos.length) % photos.length : null,
                  );
                }}
                aria-label="Photo précédente"
                className="absolute left-5 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-blanc transition"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next */}
            {photos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected((s) =>
                    s !== null ? (s + 1) % photos.length : null,
                  );
                }}
                aria-label="Photo suivante"
                className="absolute right-5 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-blanc transition"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image (placeholder gradient) */}
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full aspect-[4/3] max-h-[82vh] rounded-[14px] overflow-hidden"
              style={{ background: gradients[selected % gradients.length] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="flex flex-col items-center gap-3 text-[#5d6560]/70">
                  <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.4" className="opacity-50">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span className="text-xs tracking-[0.2em] uppercase font-semibold opacity-70">
                    {photos[selected].caption}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-blanc text-xs uppercase tracking-[0.2em] font-semibold tabular-nums bg-white/10 px-4 py-2 rounded-full">
              {selected + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
