import Link from "next/link";
import type { CSSProperties } from "react";

/**
 * Logo Markus — vrai fichier vectoriel.
 *
 * Méthode : CSS mask-image sur la silhouette du SVG → on contrôle la couleur
 * (ou le DÉGRADÉ) via `background`. Le mask découpe le rendu à la forme du M.
 *
 * - `gradient` → applique le dégradé de marque (cf. `.grad-light` du
 *   design-system, identique aux titres de section sur fond sombre).
 * - `color`    → couleur unie (currentColor par défaut).
 *
 * Les 2 sont mutuellement exclusifs : si `gradient=true`, `color` est ignoré.
 *
 * - LogoMark   → /brand/logo-markus-mark.svg (le M seul, viewBox serré)
 * - LogoFull   → /brand/logo-markus.svg      (M + MARKUS + IMMOBILIER)
 * - LogoLockup → mark + texte "MARKUS / IMMOBILIER" (header)
 */

// Dégradé de marque sur fond sombre — identique à `.grad-light` du design-system
const BRAND_GRADIENT = "linear-gradient(100deg, #ffffff 20%, #9EA596 95%)";

function maskStyles(url: string): CSSProperties {
  return {
    WebkitMaskImage: `url(${url})`,
    maskImage: `url(${url})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };
}

export function LogoMark({
  size = 34,
  color,
  gradient = false,
  className = "",
}: {
  size?: number;
  color?: string;
  gradient?: boolean;
  className?: string;
}) {
  const fillStyle: CSSProperties = gradient
    ? { backgroundImage: BRAND_GRADIENT }
    : { backgroundColor: color || "currentColor" };

  return (
    <span
      className={`shrink-0 select-none inline-block align-middle ${className}`}
      style={{
        width: size,
        height: size,
        ...fillStyle,
        ...maskStyles("/brand/logo-markus-mark.svg"),
      }}
      role="img"
      aria-label="Markus Immobilier"
    />
  );
}

export function LogoFull({
  width,
  color,
  gradient = false,
  className = "",
}: {
  width?: number;
  color?: string;
  gradient?: boolean;
  className?: string;
}) {
  const fillStyle: CSSProperties = gradient
    ? { backgroundImage: BRAND_GRADIENT }
    : { backgroundColor: color || "currentColor" };

  return (
    <span
      className={`select-none block ${className}`}
      style={{
        width: width ?? "100%",
        aspectRatio: "2196 / 1968",
        ...fillStyle,
        ...maskStyles("/brand/logo-markus.svg"),
      }}
      role="img"
      aria-label="Markus Immobilier"
    />
  );
}

/** Lockup mark + texte (header). */
export function LogoLockup({
  className = "",
  size = 34,
  color = "currentColor",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Markus Immobilier — accueil"
      className={`flex items-center gap-3 no-underline text-inherit ${className}`}
      style={{ color }}
    >
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <b className="font-bold text-base tracking-[0.14em]">MARKUS</b>
        <span className="text-[8.5px] tracking-[0.42em] font-medium opacity-80 mt-[3px]">
          IMMOBILIER
        </span>
      </span>
    </Link>
  );
}
