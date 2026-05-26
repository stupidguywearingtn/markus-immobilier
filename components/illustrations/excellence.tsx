/**
 * Excellence — médaille avec rubans, anneau intérieur et étoile.
 * Réf : /reference/illustration-excellence.svg.
 *
 * Pattern : tracé qui se dessine au scroll (via DrawOnScroll wrapper).
 * - Strokes principaux héritent de la couleur via `.illust` (anthracite par
 *   défaut, blanc cassé en variante `.illust-on-dark`).
 * - Accents (anneau intérieur + étoile) en sauge via `.illust-accent`.
 */
export function ExcellenceIllust({
  size = 220,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 360 300"
      width={size}
      height={size * (300 / 360)}
      className={`illust ${className}`}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* Médaille extérieure */}
      <circle
        pathLength="1"
        cx="180"
        cy="120"
        r="60"
        style={{ ["--draw-delay" as string]: "0s" }}
      />
      {/* Ruban gauche */}
      <path
        pathLength="1"
        d="M150 176 L136 244 L168 218"
        style={{ ["--draw-delay" as string]: "0.35s" }}
      />
      {/* Ruban droit */}
      <path
        pathLength="1"
        d="M210 176 L224 244 L192 218"
        style={{ ["--draw-delay" as string]: "0.45s" }}
      />
      {/* Anneau intérieur (sauge) */}
      <circle
        pathLength="1"
        className="illust-accent"
        cx="180"
        cy="120"
        r="46"
        style={{ ["--draw-delay" as string]: "0.6s" }}
      />
      {/* Étoile (sauge) */}
      <path
        pathLength="1"
        className="illust-accent"
        d="M180 92 L186.7 110.9 L206.9 111.7 L191.1 124.2 L196.9 143.6 L180 132.4 L163.1 143.6 L168.9 124.2 L153.1 111.7 L173.3 110.9 Z"
        style={{ ["--draw-delay" as string]: "1s" }}
      />
    </svg>
  );
}
