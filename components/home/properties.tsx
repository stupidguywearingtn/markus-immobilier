import { Eyebrow } from "@/components/ui/eyebrow";
import { Button, ArrowRight } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { PropertyCard } from "@/components/property/property-card";
import { featuredProperties } from "@/lib/mock-properties";

export function Properties() {
  return (
    <section id="biens" className="py-[120px] max-md:py-[72px] bg-blanc">
      <div className="max-w-content mx-auto px-8 max-md:px-5">
        <Reveal className="flex items-end justify-between gap-5 flex-wrap mb-[46px]">
          <div className="max-w-[620px]">
            <Eyebrow className="mb-4">Aperçu</Eyebrow>
            <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-[clamp(30px,4vw,46px)] mb-4">
              Nos biens disponibles
            </h2>
            <p className="text-lg text-[#5a6166]">
              Un aperçu de la présentation de notre catalogue.{" "}
              <span className="text-anthracite font-semibold">Nos annonces arrivent très prochainement.</span>
            </p>
          </div>
          <Button href="/annonces" variant="outline">
            Voir tous nos biens
            <ArrowRight size={15} />
          </Button>
        </Reveal>

        <div className="grid gap-[26px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
