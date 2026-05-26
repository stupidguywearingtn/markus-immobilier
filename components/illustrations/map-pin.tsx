/**
 * Pin de carte qui tombe — design-system §7 ("à décliner")
 * Inscrit la silhouette d'un pin, dot sauge au centre, base ovale.
 */
export function MapPinIllust({
  size = 170,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 140"
      width={size}
      height={size}
      className={`illust ${className}`}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <path pathLength="1"
        d="M60 18 C 82 18, 96 36, 96 58 C 96 80, 60 116, 60 116 C 60 116, 24 80, 24 58 C 24 36, 38 18, 60 18 Z"
        style={{ ["--draw-delay" as string]: "0s" }}
      />
      <circle pathLength="1"
        cx="60"
        cy="56"
        r="11"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "0.9s" }}
      />
      <ellipse pathLength="1"
        cx="60"
        cy="126"
        rx="16"
        ry="3"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "1.2s" }}
      />
    </svg>
  );
}
