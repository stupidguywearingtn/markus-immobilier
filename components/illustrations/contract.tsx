/**
 * Contrat signé — référence : /reference/markus-illustrations-demo.html
 * Feuille + lignes de texte + signature ondulée + tampon ✓ (sauge).
 */
export function ContractIllust({
  size = 200,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 140"
      width={size}
      height={size * (140 / 120)}
      className={`illust ${className}`}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* Page */}
      <path pathLength="1" d="M34 18 H76 L92 34 V122 H34 Z" style={{ ["--draw-delay" as string]: "0s" }} />
      {/* Coin replié */}
      <path pathLength="1" d="M76 18 V34 H92" style={{ ["--draw-delay" as string]: "0.5s" }} />
      {/* Lignes de texte */}
      <path pathLength="1" d="M44 52 H82" style={{ ["--draw-delay" as string]: "0.65s" }} />
      <path pathLength="1" d="M44 64 H82" style={{ ["--draw-delay" as string]: "0.78s" }} />
      <path pathLength="1" d="M44 76 H68" style={{ ["--draw-delay" as string]: "0.9s" }} />
      {/* Signature ondulée (accent sauge) */}
      <path
        pathLength="1"
        d="M44 100 c 6 -12 12 10 18 -2 s 12 8 20 -4"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "1.05s" }}
      />
      {/* Tampon — cercle + check (accent sauge) */}
      <circle pathLength="1" cx="82" cy="108" r="13" className="illust-accent" style={{ ["--draw-delay" as string]: "1.5s" }} />
      <path pathLength="1" d="M76 108 l4 4 8 -8" className="illust-accent" style={{ ["--draw-delay" as string]: "1.8s" }} />
    </svg>
  );
}
