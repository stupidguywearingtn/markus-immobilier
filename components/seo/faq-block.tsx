import { Eyebrow } from "@/components/ui/eyebrow";

export type FaqItem = { q: string; a: string };

/**
 * FAQ visible, rendue à partir d'un tableau de Q/R.
 *
 * ⚠️ Le JSON-LD `FAQPage` de la page DOIT être généré depuis **ce même tableau**
 * (`faqLd(items)`), jamais recopié à la main : c'est ce qui garantit qu'affichage
 * et données structurées ne divergent jamais. Même parti pris que les articles
 * de blog (`app/blog/[slug]/page.tsx`).
 */
export function FaqBlock({
  items,
  title = "Questions fréquentes",
}: {
  items: FaqItem[];
  title?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mt-14 max-md:mt-10 pt-9 border-t border-[var(--bordure)]">
      <Eyebrow className="mb-5">{title}</Eyebrow>
      <div className="space-y-3">
        {items.map((f) => (
          <details
            key={f.q}
            className="group bg-gris rounded-[12px] border border-[var(--bordure)] px-5 py-4"
          >
            <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-[15.5px] font-semibold text-anthracite leading-snug">
              {f.q}
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="var(--color-sauge)"
                strokeWidth="2.4"
                className="shrink-0 mt-1 transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-[#3d4347]">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
