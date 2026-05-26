/**
 * Clés — référence : /reference/markus-illustrations-demo.html
 * Anneau + dents qui se dessinent.
 */
export function KeysIllust({
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
      <circle pathLength="1" cx="44" cy="48" r="20" style={{ ["--draw-delay" as string]: "0s" }} />
      <circle pathLength="1" cx="44" cy="48" r="9" className="illust-accent" style={{ ["--draw-delay" as string]: "0.5s" }} />
      <path pathLength="1" d="M58 62 L96 100" style={{ ["--draw-delay" as string]: "0.7s" }} />
      <path pathLength="1" d="M96 100 l10 -10" style={{ ["--draw-delay" as string]: "1s" }} />
      <path pathLength="1" d="M86 90 l8 -8" style={{ ["--draw-delay" as string]: "1.15s" }} />
      <path pathLength="1" d="M78 82 l7 -7" className="illust-accent" style={{ ["--draw-delay" as string]: "1.3s" }} />
    </svg>
  );
}
