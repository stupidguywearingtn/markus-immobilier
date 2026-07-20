"use client";

import { useState } from "react";
import Image from "next/image";
import type { ListingPhoto } from "@/lib/listings";

/** Galerie photos réelles : grande image + vignettes cliquables. */
export function ListingGallery({ photos }: { photos: ListingPhoto[] }) {
  const [index, setIndex] = useState(0);
  if (photos.length === 0) return null;
  const current = photos[index];

  return (
    <div>
      <div className="relative aspect-[16/10] max-md:aspect-[4/3] rounded-[16px] overflow-hidden bg-gris">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setIndex((index - 1 + photos.length) % photos.length)}
              aria-label="Photo précédente"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-anthracite/70 text-blanc grid place-items-center hover:bg-anthracite transition"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIndex((index + 1) % photos.length)}
              aria-label="Photo suivante"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-anthracite/70 text-blanc grid place-items-center hover:bg-anthracite transition"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-anthracite/80 text-blanc text-[11px] font-semibold px-3 py-1.5 rounded-full tabular-nums backdrop-blur-md">
              {index + 1} / {photos.length}
            </span>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Voir la photo ${i + 1}`}
              className={`relative aspect-[4/3] rounded-[10px] overflow-hidden bg-gris transition ${
                i === index
                  ? "ring-2 ring-sauge ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="200px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
