/**
 * Poignée de main — design-system §7 (à décliner)
 * Usage : syndic = partenariat, recrutement = nous rejoindre.
 */
export function HandshakeIllust({
  size = 220,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 140"
      width={size}
      height={size * (140 / 200)}
      className={`illust ${className}`}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* Avant-bras gauche */}
      <path pathLength="1"
        d="M8 90 L48 78"
        style={{ ["--draw-delay" as string]: "0s", strokeWidth: 3 }}
      />
      <path pathLength="1"
        d="M8 102 L46 92"
        style={{ ["--draw-delay" as string]: "0.15s", strokeWidth: 3 }}
      />
      {/* Main gauche - paume */}
      <path pathLength="1"
        d="M48 78 C 60 72, 78 70, 92 72 L100 78 L96 100 L52 102 Z"
        style={{ ["--draw-delay" as string]: "0.4s" }}
      />
      {/* Avant-bras droit */}
      <path pathLength="1"
        d="M192 90 L152 78"
        style={{ ["--draw-delay" as string]: "0s", strokeWidth: 3 }}
      />
      <path pathLength="1"
        d="M192 102 L154 92"
        style={{ ["--draw-delay" as string]: "0.15s", strokeWidth: 3 }}
      />
      {/* Main droite - paume */}
      <path pathLength="1"
        d="M152 78 C 140 72, 122 70, 108 72 L100 78 L104 100 L148 102 Z"
        style={{ ["--draw-delay" as string]: "0.4s" }}
      />
      {/* Pouces qui se joignent (sauge) */}
      <path pathLength="1"
        d="M92 72 C 96 64, 104 64, 108 72"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "0.9s" }}
      />
      {/* Trait de jonction central (sauge) */}
      <path pathLength="1"
        d="M100 78 L100 96"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "1.1s" }}
      />
      {/* Petits doigts gauche */}
      <path pathLength="1"
        d="M88 88 L88 100"
        style={{ ["--draw-delay" as string]: "1.25s" }}
      />
      <path pathLength="1"
        d="M76 90 L76 102"
        style={{ ["--draw-delay" as string]: "1.32s" }}
      />
      <path pathLength="1"
        d="M64 92 L64 102"
        style={{ ["--draw-delay" as string]: "1.39s" }}
      />
      {/* Petits doigts droite */}
      <path pathLength="1"
        d="M112 88 L112 100"
        style={{ ["--draw-delay" as string]: "1.25s" }}
      />
      <path pathLength="1"
        d="M124 90 L124 102"
        style={{ ["--draw-delay" as string]: "1.32s" }}
      />
      <path pathLength="1"
        d="M136 92 L136 102"
        style={{ ["--draw-delay" as string]: "1.39s" }}
      />
    </svg>
  );
}
