import type { ReactNode } from "react";

/**
 * Sur-titre — signature de marque (design-system §3).
 * MAJ, espacement +0.28em, couleur sauge.
 * À placer en ouverture de chaque section.
 */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-sauge font-semibold text-xs uppercase tracking-[0.28em] inline-block ${className}`}
    >
      {children}
    </span>
  );
}
