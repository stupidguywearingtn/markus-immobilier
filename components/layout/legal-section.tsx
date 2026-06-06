import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";

/**
 * Section numérotée pour les pages légales — typographie unifiée.
 * Eyebrow "01 · Éditeur du site" + H2 + body. Espacement constant entre sections.
 */
export function LegalSection({
  index,
  label,
  title,
  children,
}: {
  index: number;
  label: string;
  title?: ReactNode;
  children: ReactNode;
}) {
  const numero = String(index).padStart(2, "0");
  return (
    <Reveal className="not-first:pt-12 first:pt-0">
      <Eyebrow className="mb-3">
        {numero} · {label}
      </Eyebrow>
      {title && (
        <h2
          className="font-bold tracking-[-0.01em] text-anthracite mb-5 leading-[1.15]"
          style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}
        >
          {title}
        </h2>
      )}
      <div className="legal-prose">{children}</div>
    </Reveal>
  );
}

/**
 * Pied de page commun aux 3 pages légales — pivot entre Mentions / Confidentialité
 * / Cookies + rappel coordonnées.
 */
export function LegalFooterNav({ current }: { current: "mentions" | "confidentialite" | "cookies" }) {
  const links = [
    { key: "mentions", href: "/mentions-legales", label: "Mentions légales" },
    { key: "confidentialite", href: "/confidentialite", label: "Politique de confidentialité" },
    { key: "cookies", href: "/cookies", label: "Politique de cookies" },
  ] as const;

  return (
    <div className="mt-20 max-md:mt-12 pt-10 border-t border-[var(--bordure)]">
      <Eyebrow className="mb-4">Voir aussi</Eyebrow>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] mb-8">
        {links
          .filter((l) => l.key !== current)
          .map((l) => (
            <li key={l.key}>
              <a
                href={l.href}
                className="text-anthracite hover:text-sauge underline underline-offset-4 decoration-[var(--bordure)] hover:decoration-sauge transition"
              >
                {l.label}
              </a>
            </li>
          ))}
      </ul>
      <p className="text-[13px] text-[#7a817f] leading-relaxed">
        Une question ? Écrivez-nous à{" "}
        <a
          href="mailto:villeurbanne@markusimmobilier.fr"
          className="text-anthracite font-semibold hover:text-sauge transition"
        >
          villeurbanne@markusimmobilier.fr
        </a>{" "}
        ou appelez le{" "}
        <a
          href="tel:0478371367"
          className="text-anthracite font-semibold hover:text-sauge transition"
        >
          04 78 37 13 67
        </a>
        .
      </p>
    </div>
  );
}
