/**
 * Plan d'appartement qui se trace — design-system §7 (à décliner)
 * Usage : fiche bien, /annonces, transitions visuelles.
 * Murs anthracite + portes/fenêtres sauge.
 */
export function FloorPlanIllust({
  size = 220,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 160"
      width={size}
      height={size * (160 / 200)}
      className={`illust ${className}`}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* Contour extérieur */}
      <path pathLength="1"
        d="M10 10 H190 V150 H10 Z"
        style={{ ["--draw-delay" as string]: "0s", strokeWidth: 3 }}
      />
      {/* Mur intérieur vertical 1 */}
      <path pathLength="1"
        d="M80 10 V90"
        style={{ ["--draw-delay" as string]: "0.45s", strokeWidth: 3 }}
      />
      {/* Mur intérieur horizontal */}
      <path pathLength="1"
        d="M10 90 H140"
        style={{ ["--draw-delay" as string]: "0.6s", strokeWidth: 3 }}
      />
      {/* Mur intérieur vertical 2 */}
      <path pathLength="1"
        d="M140 90 V150"
        style={{ ["--draw-delay" as string]: "0.75s", strokeWidth: 3 }}
      />
      {/* Mur intérieur vertical 3 */}
      <path pathLength="1"
        d="M80 90 V150"
        style={{ ["--draw-delay" as string]: "0.85s", strokeWidth: 3 }}
      />
      {/* Porte d'entrée (arc sauge) */}
      <path pathLength="1"
        d="M30 10 a 18 18 0 0 1 18 18"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "1s" }}
      />
      {/* Porte intérieure 1 (arc sauge) */}
      <path pathLength="1"
        d="M80 50 a 16 16 0 0 0 16 -16"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "1.15s" }}
      />
      {/* Porte intérieure 2 (arc sauge) */}
      <path pathLength="1"
        d="M80 110 a 16 16 0 0 1 16 16"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "1.25s" }}
      />
      {/* Fenêtre 1 (sauge) */}
      <path pathLength="1"
        d="M120 10 H160"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "1.35s", strokeWidth: 4 }}
      />
      {/* Fenêtre 2 (sauge) */}
      <path pathLength="1"
        d="M155 150 H180"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "1.45s", strokeWidth: 4 }}
      />
      {/* Fenêtre 3 (sauge) */}
      <path pathLength="1"
        d="M10 120 V145"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "1.55s", strokeWidth: 4 }}
      />
    </svg>
  );
}
