"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vidéo de fond du hero — responsive desktop/mobile.
 *
 * /public/videos :
 *   hero-desktop.mp4   (16:9, ≥ 768px)
 *   hero-mobile.mp4    (9:16, < 768px)
 *   hero-poster.jpg    (frame statique pendant le chargement / fallback)
 *
 * Si la vidéo échoue (404, codec, autoplay bloqué) → onError remonte au parent
 * qui masque la balise et laisse apparaître le dégradé ken-burns.
 *
 * Respecte prefers-reduced-motion : pause si l'utilisateur le demande
 * (design-system §6).
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [reduce, setReduce] = useState(false);

  // Choix du fichier selon la largeur écran (mobile-first : < 768px = portrait)
  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 767.98px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    // ?v= sert de cache-buster : à bumper à chaque nouvelle génération vidéo
    const v = "3";
    const apply = () => {
      setSrc(
        mqMobile.matches
          ? `/videos/hero-mobile.mp4?v=${v}`
          : `/videos/hero-desktop.mp4?v=${v}`,
      );
      setReduce(mqReduce.matches);
    };
    apply();

    mqMobile.addEventListener("change", apply);
    mqReduce.addEventListener("change", apply);
    return () => {
      mqMobile.removeEventListener("change", apply);
      mqReduce.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Safari : la prop JSX `muted` n'est pas fiablement appliquée au DOM par
    // React → l'autoplay est bloqué (NotAllowedError) et la vidéo disparaît.
    // On force la propriété impérativement AVANT play().
    v.muted = true;
    v.defaultMuted = true;
    // playsInline impératif aussi (iOS Safari l'exige pour ne pas passer en
    // plein écran / bloquer l'autoplay).
    v.setAttribute("playsinline", "");

    if (reduce) {
      v.pause();
      return;
    }

    const tryPlay = () => v.play().catch(() => { /* on réessaie au canplay */ });
    tryPlay();
    // Filet : si la 1re tentative échoue (vidéo pas encore prête sur Safari),
    // on retente quand le navigateur signale qu'il peut lire.
    v.addEventListener("canplay", tryPlay, { once: true });

    // Fallback gradient UNIQUEMENT sur vraie erreur média (codec/réseau),
    // pas sur un simple rejet d'autoplay.
    const onMediaError = () => {
      if (v.error) setFailed(true);
    };
    v.addEventListener("error", onMediaError, true);

    return () => {
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("error", onMediaError, true);
    };
  }, [reduce, src]);

  if (failed || !src) return null;

  return (
    <video
      key={src}
      ref={videoRef}
      className="z-[1]"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
      }}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/videos/hero-poster.jpg"
      // Pas de onError → setFailed ici : Safari émet parfois un error transitoire
      // sur <video> (pas sur <source>) ; on ne veut pas masquer définitivement.
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
