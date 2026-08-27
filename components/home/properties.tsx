"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Button, ArrowRight } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { PropertyCard } from "@/components/property/property-card";
import { ListingCard } from "@/components/property/listing-card";
import { featuredProperties } from "@/lib/mock-properties";
import { getAvailableListings } from "@/lib/listings";
import { EditableText } from "@/components/backoffice/EditableText";
import { useV } from "@/hooks/useV";

export function Properties() {
  const v = useV();
  const listings = getAvailableListings();
  // On complète la grille avec des placeholders « À venir » tant qu'il y a
  // moins de 3 biens réels. Dès que le catalogue se remplit, ils disparaissent.
  const placeholders = featuredProperties.slice(
    0,
    Math.max(0, 3 - listings.length),
  );

  return (
    <section id="biens" className="py-[120px] max-md:py-[72px] bg-blanc">
      <div className="max-w-content mx-auto px-8 max-md:px-5">
        <Reveal className="flex items-end justify-between gap-5 flex-wrap mb-[46px]">
          <div className="max-w-[620px]">
            <Eyebrow className="mb-4">
              <EditableText
                section="properties"
                field="eyebrow"
                value={v("properties", "eyebrow", "Aperçu")}
              />
            </Eyebrow>
            <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-[clamp(30px,4vw,46px)] mb-4">
              <EditableText
                section="properties"
                field="title"
                value={v("properties", "title", "Nos biens disponibles")}
              />
            </h2>
            <p className="text-lg text-[#5a6166]">
              {listings.length > 0
                ? "Nos biens actuellement à la vente et à la location, à Villeurbanne et à Lyon."
                : "Un aperçu de la présentation de notre catalogue. Nos annonces arrivent très prochainement."}
            </p>
          </div>
          <Button href="/annonces" variant="outline">
            Voir tous nos biens
            <ArrowRight size={15} />
          </Button>
        </Reveal>

        <div className="grid gap-[26px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((l, i) => (
            <Reveal key={l.id} delay={i * 100}>
              <ListingCard listing={l} />
            </Reveal>
          ))}
          {placeholders.map((p, i) => (
            <Reveal key={p.id} delay={(listings.length + i) * 100}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
