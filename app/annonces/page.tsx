import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { PropertyCard } from "@/components/property/property-card";
import { FiltersBar } from "@/components/property/filters-bar";
import { HouseIllust } from "@/components/illustrations/house";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import {
  filterProperties,
  parseFilterParams,
} from "@/lib/filter-properties";
import { PROPERTIES } from "@/lib/mock-properties";

export const metadata: Metadata = {
  title: "Nos annonces — Acheter ou louer à Lyon & Villeurbanne",
  description:
    "Sélection de biens à la vente et à la location, soigneusement choisis. Filtrez par type, localisation, surface, budget, pièces.",
};

export default async function AnnoncesPage({
  searchParams,
}: {
  // Next 15 : searchParams est désormais une Promise
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const filters = parseFilterParams(sp);
  const results = filterProperties(filters);

  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title={
          <>
            Trouvez votre{" "}
            <span className="grad-light">prochain chez-vous.</span>
          </>
        }
        lead="Une sélection de biens à la vente et à la location à Lyon & Villeurbanne, soigneusement choisis par notre équipe."
        illustration={
          <DrawOnScroll>
            <HouseIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
      />

      {/* GRILLE + FILTRES */}
      <section className="bg-blanc">
        <div className="max-w-content mx-auto px-8 max-md:px-5 pt-10 pb-[120px] max-md:pb-[72px]">
          <FiltersBar
            initial={filters}
            resultsCount={results.length}
            totalCount={PROPERTIES.length}
          />

          {results.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-[26px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {results.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 6) * 60}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-[80px]">
      <DrawOnScroll className="inline-block">
        <HouseIllust size={160} className="opacity-60" />
      </DrawOnScroll>
      <h3 className="font-bold text-2xl mt-6 mb-3">Aucun bien ne correspond.</h3>
      <p className="text-[#7a817f] max-w-[420px] mx-auto mb-6">
        Essayez d&apos;élargir vos critères, ou contactez-nous : on a souvent des
        biens off-market avant publication.
      </p>
      <Button href="/contact" variant="primary">
        Nous contacter
      </Button>
    </div>
  );
}
