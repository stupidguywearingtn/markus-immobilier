import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Hero standard pour TOUTES les pages internes — source unique de vérité.
 * - Layout en 2 colonnes dès md (≥ 768px) : texte gauche / illustration droite.
 * - Titre H1 unique partout (clamp(40px, 5.5vw, 64px), weight 800).
 * - Tailles via inline style pour bypasser tout cache JIT Tailwind dev.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  illustration,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  illustration?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section
      className="relative bg-anthracite text-blanc overflow-hidden"
      style={{
        // Padding en inline style → garantit l'application (bypass cache JIT).
        // Top inclut la clearance du header sticky (~80px) → visuellement ~80px d'air en haut.
        // Bottom symétrique au top sans le header → ~120px d'air en bas. Mobile resserré.
        paddingTop: "clamp(140px, 14vw, 180px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
      }}
    >
      <div
        className="relative z-[1] max-w-content mx-auto px-8 max-md:px-5 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-center"
      >
        <div>
          <Eyebrow className="mb-4 lg:mb-5">{eyebrow}</Eyebrow>
          <h1
            className="font-extrabold tracking-[-0.02em] leading-[1.04]"
            style={{ fontSize: "clamp(40px, 5.5vw, 64px)" }}
          >
            {title}
          </h1>
          {lead && (
            <p
              className="text-white/75 max-w-[560px] mt-5 lg:mt-6 leading-relaxed"
              style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
            >
              {lead}
            </p>
          )}
          {actions && (
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          )}
        </div>
        {illustration && (
          <div
            className="hidden lg:flex justify-center items-center"
            style={{ minHeight: 280 }}
          >
            {illustration}
          </div>
        )}
      </div>
    </section>
  );
}
