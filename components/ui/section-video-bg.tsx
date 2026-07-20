"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vidéo d'ambiance en fond de section (design-system §8 « vidéo signature »).
 *
 * Principes :
 * - Le POSTER est toujours peint en fond CSS : tant que la vidéo n'est pas
 *   chargée (ou si elle échoue, ou si l'utilisateur a réduit les animations),
 *   on voit une image figée — jamais un trou. Sous le poster, la couleur de
 *   section reste le dernier filet de sécurité.
 * - `prefers-reduced-motion` → on ne monte même pas la balise <video>.
 * - La vidéo ne démarre qu'une fois la section proche du viewport
 *   (IntersectionObserver) : elle est en milieu de page, inutile de la
 *   télécharger au chargement initial.
 * - Overlay sombre (+ flou léger) par-dessus, pour que le texte reste lisible :
 *   on doit deviner le mouvement, pas être distrait.
 */
export function SectionVideoBg({
  src,
  poster,
  /** Opacité de l'overlay sombre (0 → 1). */
  overlay = 0.62,
  /** Flou appliqué à la vidéo, en px. */
  blur = 2,
  className = "",
}: {
  src: string;
  poster: string;
  overlay?: number;
  blur?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(true); // on part prudent (SSR = poster seul)
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  // prefers-reduced-motion (réévalué si l'utilisateur change son réglage)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // On ne charge la vidéo qu'à l'approche de la section.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  // Autoplay Safari : `muted` doit être posé impérativement sur le DOM avant
  // play(), sinon NotAllowedError (même correctif que le hero).
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !visible || reduce) return;

    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("playsinline", "");

    const tryPlay = () => v.play().catch(() => { /* retenté au canplay */ });
    tryPlay();
    v.addEventListener("canplay", tryPlay, { once: true });

    // Fallback poster seul UNIQUEMENT sur vraie erreur média (codec/réseau),
    // pas sur un simple rejet d'autoplay.
    const onMediaError = () => {
      if (v.error) setFailed(true);
    };
    v.addEventListener("error", onMediaError, true);

    return () => {
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("error", onMediaError, true);
    };
  }, [visible, reduce]);

  const showVideo = visible && !reduce && !failed;

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Poster figé : visible avant chargement, en reduced-motion et en repli */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${poster})`,
          filter: blur ? `blur(${blur}px)` : undefined,
          transform: blur ? "scale(1.06)" : undefined, // masque les bords floutés
        }}
      />

      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            filter: blur ? `blur(${blur}px)` : undefined,
            transform: blur ? "scale(1.06)" : undefined,
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          tabIndex={-1}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Overlay sombre : garantit le contraste du texte par-dessus */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(31,35,38,${overlay})` }}
      />
    </div>
  );
}
