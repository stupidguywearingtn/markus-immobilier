"use client";

import { useEffect, useRef } from "react";

/**
 * Compteur animé déclenché à l'intersection.
 * Ease cubique 1-(1-p)^3, durée 1500 ms. Respecte prefers-reduced-motion.
 */
export function Counter({
  target,
  suffix = "+",
  duration = 1500,
  className = "",
}: {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();

          let start: number | null = null;
          const tick = (ts: number) => {
            if (start === null) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
            el.textContent = `${val}${suffix}`;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      0{suffix}
    </span>
  );
}
