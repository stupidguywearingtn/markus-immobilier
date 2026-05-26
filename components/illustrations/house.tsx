/**
 * Maison + porte qui s'ouvre — référence : /reference/markus-illustrations-demo.html
 * Toit, murs, porte centrale, poignée sauge.
 */
export function HouseIllust({
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
      {/* Toit */}
      <path pathLength="1" d="M22 64 L60 30 L98 64" style={{ ["--draw-delay" as string]: "0s" }} />
      {/* Murs */}
      <path pathLength="1" d="M32 60 V112 H88 V60" style={{ ["--draw-delay" as string]: "0.45s" }} />
      {/* Cadre porte */}
      <path pathLength="1" d="M50 112 V78 H70 V112" style={{ ["--draw-delay" as string]: "0.9s" }} />
      {/* Battant (accent sauge) — pivot gauche */}
      <path
        pathLength="1"
        d="M50 78 h20 v34 h-20 z"
        className="illust-accent illust-door"
        style={{
          ["--draw-delay" as string]: "1.2s",
          strokeDasharray: "none",
          strokeDashoffset: 0,
        }}
      />
      {/* Poignée sauge */}
      <circle pathLength="1" cx="65" cy="96" r="1.6" className="illust-accent" style={{ ["--draw-delay" as string]: "1.4s" }} />
    </svg>
  );
}
