import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button, ArrowRight } from "@/components/ui/button";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

/**
 * Page provisoire on-brand. Aucune page ne doit retourner 404 :
 * - Header/Footer ajoutés par le layout
 * - Eyebrow + h1 (avec grad sur 1-2 mots)
 * - Lead
 * - Pill "Bientôt disponible" sauge animée
 * - Illustration de section (généreuse, dessinée au scroll)
 * - CTA retour accueil + contact
 */
export function ComingSoonPage({
  eyebrow,
  title,
  highlight,
  lead,
  illustration,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  lead: string;
  illustration?: ReactNode;
}) {
  return (
    <section className="relative min-h-[78vh] flex items-center justify-center bg-gris py-[120px] max-md:py-[80px] overflow-hidden">
      {/* Illustration en arrière-plan généreux */}
      {illustration && (
        <DrawOnScroll className="absolute top-1/2 right-[6%] -translate-y-1/2 z-0 pointer-events-none max-lg:right-[-8%] max-md:opacity-25 opacity-90">
          {illustration}
        </DrawOnScroll>
      )}

      <div className="relative z-[1] max-w-content mx-auto px-8 max-md:px-5 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div className="max-w-[620px]">
          <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
          <h1 className="font-extrabold text-[clamp(36px,5.5vw,62px)] tracking-[-0.02em] leading-[1.04] mb-6">
            {title} <span className="grad">{highlight}</span>
          </h1>
          <p className="text-[#5a6166] text-lg mb-8 max-w-[520px]">{lead}</p>

          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-sauge/15 border border-sauge/30 text-sauge text-[11px] font-semibold tracking-[0.2em] uppercase mb-10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-sauge opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sauge" />
            </span>
            Bientôt disponible
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button href="/" variant="primary">
              Retour à l&apos;accueil
              <ArrowRight size={15} />
            </Button>
            <Button href="/contact" variant="outline">
              Nous contacter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
