"use client";

import { useEffect, useRef } from "react";

/**
 * Tampon ✓ — apparaît sur la carte rapport quand done=true.
 * Cercle sauge + checkmark sauge, dessin progressif.
 */
export function StampCheck({
  size = 56,
  show,
  className = "",
}: {
  size?: number;
  show: boolean;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    if (show) {
      svgRef.current.classList.add("is-drawn");
    } else {
      svgRef.current.classList.remove("is-drawn");
    }
  }, [show]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 60 60"
      width={size}
      height={size}
      className={`illust ${className}`}
      aria-hidden="true"
      style={{
        overflow: "visible",
        opacity: show ? 1 : 0,
        transform: show ? "scale(1) rotate(-12deg)" : "scale(0.6) rotate(-12deg)",
        transition: "opacity 0.4s var(--ease), transform 0.5s var(--ease)",
      }}
    >
      <circle pathLength="1"
        cx="30"
        cy="30"
        r="22"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "0s", strokeWidth: 3 }}
      />
      <path pathLength="1"
        d="M20 30 l7 7 14-14"
        className="illust-accent"
        style={{ ["--draw-delay" as string]: "0.4s", strokeWidth: 3.5 }}
      />
    </svg>
  );
}
