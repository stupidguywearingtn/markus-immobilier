import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { PropertyCard, LISTINGS_COMING_SOON } from "@/components/property/property-card";
import { ListingCard } from "@/components/property/listing-card";
import { FiltersBar } from "@/components/property/filters-bar";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getAvailableListings, getListingsByStatut } from "@/lib/listings";
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
    "Sélection de biens à la vente et à la location à Lyon et Villeurbanne. Filtrez par type, localisation, surface, budget, pièces.",
  alternates: { canonical: "/annonces" },
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

      {/* BIENS RÉELS — groupés par statut, filtrés par transaction si demandé */}
      <ListingsByStatus transaction={filters.type} />

      {/* GRILLE + FILTRES (placeholders de présentation) */}
      <section className="bg-blanc">
        <div className="max-w-content mx-auto px-8 max-md:px-5 pt-10 pb-[120px] max-md:pb-[72px]">
          {LISTINGS_COMING_SOON && (
            <div className="mb-8 flex items-start gap-3.5 rounded-[14px] border border-amber-300/60 bg-amber-50 px-5 py-4">
              <span className="shrink-0 mt-0.5 grid place-items-center w-7 h-7 rounded-full bg-amber-400 text-anthracite">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v4l3 2" />
                </svg>
              </span>
              <div>
                <p className="text-[14.5px] font-bold text-anthracite leading-tight">
                  D&apos;autres annonces arrivent très prochainement.
                </p>
                <p className="text-[13px] text-[#7a6a3a] mt-1 leading-relaxed">
                  Les biens ci-dessous illustrent la présentation du catalogue (ils ne
                  sont pas encore disponibles). Pour être averti dès la mise en ligne
                  d&apos;un mandat,{" "}
                  <a href="/contact" className="font-semibold underline underline-offset-2 hover:text-anthracite">
                    contactez-nous
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

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

/**
 * Biens RÉELS groupés par statut : Disponible / Vendus / Loués.
 * Les vendus et loués restent visibles (preuve d'activité + SEO), dans leur
 * propre sous-section. Se remplit tout seul depuis lib/listings.ts.
 *
 * `transaction` vient du filtre Vente/Location de la barre : quand il est posé,
 * seules les sections correspondantes restent affichées.
 */
function ListingsByStatus({
  transaction,
}: {
  transaction?: "vente" | "location";
}) {
  // Mis en avant d'abord (miseEnAvant), puis du plus récent au plus ancien.
  const disponibles = getAvailableListings();
  const groups = [
    {
      statut: "dispo-vente" as const,
      transaction: "vente" as const,
      eyebrow: "Disponible — À vendre",
      title: <>Nos biens <span className="grad">à vendre.</span></>,
      items: disponibles.filter((l) => l.transaction === "vente"),
    },
    {
      statut: "dispo-location" as const,
      transaction: "location" as const,
      eyebrow: "Disponible — À louer",
      title: <>Nos biens <span className="grad">à louer.</span></>,
      items: disponibles.filter((l) => l.transaction === "location"),
    },
    {
      statut: "vendu" as const,
      transaction: "vente" as const,
      eyebrow: "Vendus",
      title: <>Récemment <span className="grad">vendus.</span></>,
      items: getListingsByStatut("vendu"),
    },
    {
      statut: "loue" as const,
      transaction: "location" as const,
      eyebrow: "Loués",
      title: <>Récemment <span className="grad">loués.</span></>,
      items: getListingsByStatut("loue"),
    },
  ].filter(
    (g) =>
      g.items.length > 0 && (!transaction || g.transaction === transaction),
  );

  if (groups.length === 0) return null;

  return (
    <section className="bg-blanc pt-[70px] max-md:pt-[50px]">
      <div className="max-w-content mx-auto px-8 max-md:px-5 space-y-16 max-md:space-y-12">
        {groups.map((g) => (
          <div key={g.statut}>
            <Reveal className="mb-8">
              <Eyebrow className="mb-3">{g.eyebrow}</Eyebrow>
              <h2 className="font-bold text-[clamp(26px,3.4vw,38px)] tracking-[-0.01em]">
                {g.title}
              </h2>
            </Reveal>
            <div className="grid gap-[26px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {g.items.map((l, i) => (
                <Reveal key={l.id} delay={Math.min(i, 6) * 80}>
                  <ListingCard listing={l} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
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
