/**
 * Immeuble qui se construit — référence : /reference/markus-illustrations-demo.html
 * Trait anthracite (ou blanc sur dark), accents sauge sur sol + porte.
 */
export function BuildingIllust({
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
      <path pathLength="1" d="M28 132 V34 H92 V132" style={{ ["--draw-delay" as string]: "0s" }} />
      <path pathLength="1" d="M16 132 H104" className="illust-accent" style={{ ["--draw-delay" as string]: "0.55s" }} />
      <path pathLength="1" d="M28 102 H92" style={{ ["--draw-delay" as string]: "0.7s" }} />
      <path pathLength="1" d="M28 72 H92" style={{ ["--draw-delay" as string]: "0.85s" }} />
      <path pathLength="1" d="M40 46 h12 v16 h-12 z" style={{ ["--draw-delay" as string]: "1s" }} />
      <path pathLength="1" d="M68 46 h12 v16 h-12 z" style={{ ["--draw-delay" as string]: "1.1s" }} />
      <path pathLength="1" d="M40 80 h12 v14 h-12 z" style={{ ["--draw-delay" as string]: "1.2s" }} />
      <path pathLength="1" d="M68 80 h12 v14 h-12 z" style={{ ["--draw-delay" as string]: "1.3s" }} />
      <path pathLength="1" d="M52 132 V110 h16 V132" className="illust-accent" style={{ ["--draw-delay" as string]: "1.45s" }} />
    </svg>
  );
}
