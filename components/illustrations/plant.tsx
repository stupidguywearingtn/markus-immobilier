/**
 * Plante qui pousse — design-system §7 (à décliner)
 * Usage : gestion locative = patrimoine qui grandit dans le temps.
 * Tige sauge + feuilles anthracite qui se tracent au scroll.
 */
export function PlantIllust({
  size = 220,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 200"
      width={size}
      height={size}
      className={`illust ${className}`}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* Pot */}
      <path pathLength="1"
        d="M40 180 L80 180 L76 196 L44 196 Z"
        style={{ ["--draw-delay" as string]: "0s" }}
      />
      <path pathLength="1"
        d="M38 180 H82"
        style={{ ["--draw-delay" as string]: "0.25s" }}
      />
      {/* Tige principale (sauge) */}
      <path pathLength="1"
        d="M60 180 C 60 160, 60 140, 60 120 C 60 100, 60 80, 60 60"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "0.4s" }}
      />
      {/* Feuille gauche bas */}
      <path pathLength="1"
        d="M60 150 C 40 145, 28 135, 24 122 C 32 124, 48 132, 60 144"
        style={{ ["--draw-delay" as string]: "1s" }}
      />
      {/* Feuille droite mi */}
      <path pathLength="1"
        d="M60 120 C 80 115, 92 105, 96 92 C 88 94, 72 102, 60 114"
        style={{ ["--draw-delay" as string]: "1.2s" }}
      />
      {/* Feuille gauche haut */}
      <path pathLength="1"
        d="M60 92 C 44 87, 34 78, 32 66 C 40 68, 52 76, 60 86"
        style={{ ["--draw-delay" as string]: "1.4s" }}
      />
      {/* Petit bourgeon sauge en haut */}
      <circle pathLength="1"
        cx="60"
        cy="56"
        r="4"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "1.6s" }}
      />
      <path pathLength="1"
        d="M56 56 C 56 50, 64 50, 64 56"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "1.7s" }}
      />
    </svg>
  );
}
