"use client";

import { useEffect, useRef } from "react";

/**
 * Trait SVG sauge qui se dessine au scroll dans une section.
 * Inspiré Skiper UI #19. Stroke-dashoffset piloté par la progression scroll.
 */
export function ScrollLine({
  containerSelector,
}: {
  containerSelector: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!path || !container) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = reduce ? "0" : String(len);

    if (reduce) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      path.style.strokeDashoffset = String(len * (1 - Math.min(1, p * 1.15)));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [containerSelector]);

  return (
    <svg
      viewBox="0 0 500 900"
      preserveAspectRatio="none"
      className="absolute top-[6%] -right-[8%] h-[88%] w-[46%] z-0 pointer-events-none opacity-55 max-md:w-[80%] max-md:-right-[20%] max-md:opacity-30"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M40 20 C 320 80, 120 230, 380 320 C 560 400, 60 520, 360 620 C 540 700, 120 830, 430 890"
        fill="none"
        stroke="var(--color-sauge)"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}
