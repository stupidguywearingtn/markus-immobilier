import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { Button, ArrowRight } from "@/components/ui/button";

export type SeoSection = {
  eyebrow?: string;
  h2: ReactNode;
  body?: ReactNode;
  bullets?: string[];
};

/**
 * Gabarit de page SEO locale (vendre, acheter, gestion locative, page ville…).
 * Hero + sections alternées (blanc / gris) + bloc CTA estimation/contact.
 * Respecte la DA : Eyebrow sauge, dégradé partiel de titre, reveal au scroll.
 */
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export function SeoLanding({
  eyebrow,
  title,
  lead,
  illustration,
  intro,
  updated,
  sections,
  afterSections,
  ctaTitle,
  ctaText,
  primaryHref = "/estimation",
  primaryLabel = "Estimer mon bien gratuitement",
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  illustration?: ReactNode;
  intro?: ReactNode;
  /**
   * ISO. Affiche « Dernière mise à jour : … » en tête de contenu.
   * La fraîcheur affichée pèse lourd dans la citation par les LLM — mais ne la
   * bouger QUE si le contenu change réellement (redater à vide = signal de spam).
   */
  updated?: string;
  sections: SeoSection[];
  /** Contenu libre inséré après les sections (FAQ, tableau…), dans la colonne de texte. */
  afterSections?: ReactNode;
  ctaTitle: ReactNode;
  ctaText: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        illustration={illustration}
        actions={
          <>
            <Button href={primaryHref} variant="cta">
              {primaryLabel}
              <ArrowRight />
            </Button>
            <Button href="/contact" variant="ghost">
              Nous contacter
            </Button>
          </>
        }
      />

      <section className="bg-blanc py-[100px] max-md:py-[64px]">
        <div className="max-w-[860px] mx-auto px-8 max-md:px-5">
          {updated && (
            <Reveal>
              <p className="text-[13px] text-[#6b7276] mb-6">
                Dernière mise à jour :{" "}
                <time dateTime={updated}>{fmtDate(updated)}</time>
              </p>
            </Reveal>
          )}
          {intro && (
            <Reveal>
              <p className="text-[17px] leading-relaxed text-[#3d4347] mb-14 max-md:mb-10">
                {intro}
              </p>
            </Reveal>
          )}

          <div className="space-y-14 max-md:space-y-10">
            {sections.map((s, i) => (
              <Reveal key={i} delay={(i % 3) * 80}>
                <section>
                  {s.eyebrow && <Eyebrow className="mb-3">{s.eyebrow}</Eyebrow>}
                  <h2
                    className="font-bold tracking-[-0.01em] text-anthracite mb-4 leading-[1.15]"
                    style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}
                  >
                    {s.h2}
                  </h2>
                  {s.body && (
                    <div className="text-[15.5px] leading-relaxed text-[#3d4347] space-y-3">
                      {s.body}
                    </div>
                  )}
                  {s.bullets && (
                    <ul className="mt-3 space-y-2.5">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="w-5 h-5 shrink-0 mt-0.5 rounded-full bg-sauge/20 grid place-items-center">
                            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="var(--color-sauge)" strokeWidth="2.8">
                              <path d="M5 12l5 5L20 6" />
                            </svg>
                          </span>
                          <span className="text-[15.5px] leading-relaxed text-[#3d4347]">
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          {afterSections && <Reveal>{afterSections}</Reveal>}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-anthracite text-blanc py-[90px] max-md:py-[64px]">
        <div className="max-w-[760px] mx-auto px-8 max-md:px-5 text-center">
          <Reveal>
            <h2 className="font-bold text-[clamp(26px,3.6vw,40px)] tracking-[-0.01em] mb-4">
              {ctaTitle}
            </h2>
            <p className="text-blanc/75 mb-7 max-w-[520px] mx-auto leading-relaxed">
              {ctaText}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={primaryHref} variant="cta">
                {primaryLabel}
                <ArrowRight />
              </Button>
              <Button href="tel:0478371367" variant="ghost">
                04 78 37 13 67
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
