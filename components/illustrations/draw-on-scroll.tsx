"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wrapper qui ajoute la classe `is-drawn` à son enfant <svg class="illust">
 * dès qu'il entre dans le viewport. Respecte prefers-reduced-motion.
 */
export function DrawOnScroll({
  children,
  className = "",
  threshold = 0.3,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const svg = el.querySelector(".illust");
    if (!svg) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svg.classList.add("is-drawn");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            svg.classList.add("is-drawn");
            io.disconnect();
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
