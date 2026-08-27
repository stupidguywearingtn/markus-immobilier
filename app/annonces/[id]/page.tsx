import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button, ArrowRight } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyGallery } from "@/components/property/property-gallery";
import { MapPinIllust } from "@/components/illustrations/map-pin";
import { FloorPlanIllust } from "@/components/illustrations/floor-plan";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import { PROPERTIES } from "@/lib/mock-properties";
import { getListingBySlug, getAllListingSlugs } from "@/lib/listings-all";
import { ListingDetail } from "@/components/property/listing-detail";

type Params = Promise<{ id: string }>;

// Les annonces publiées après le build sont rendues à la demande.
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;

  // 1) Bien RÉEL (par slug) — SEO dédié
  const listing = await getListingBySlug(id);
  if (listing) {
    return {
      // `absolute` = on court-circuite le template "%s · Markus Immobilier" du
      // layout, sinon la marque apparaît deux fois dans le <title>.
      title: { absolute: listing.seo.title },
      description: listing.seo.description,
      alternates: { canonical: `/annonces/${listing.slug}` },
      openGraph: {
        type: "website",
        title: listing.seo.title,
        description: listing.seo.description,
        url: `https://www.markusimmobilier.fr/annonces/${listing.slug}`,
        images: listing.photos.map((p) => ({ url: p.src, alt: p.alt })),
      },
    };
  }

  // 2) Repli : bien de démo
  const property = PROPERTIES.find((p) => p.id === id);
  if (!property) return { title: "Bien introuvable" };
  return {
    title: `${property.title} — ${property.location}`,
    description: property.description.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const slugs = await getAllListingSlugs(); // statiques + annonces publiées
  return [
    ...slugs.map((slug) => ({ id: slug })),
    ...PROPERTIES.map((p) => ({ id: p.id })),
  ];
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  // Les biens réels ont la priorité sur les placeholders de démo.
  const listing = await getListingBySlug(id);
  if (listing) return <ListingDetail listing={listing} />;

  const property = PROPERTIES.find((p) => p.id === id);
  if (!property) notFound();

  const similar = PROPERTIES.filter(
    (p) => p.id !== property.id && p.kind === property.kind,
  ).slice(0, 3);

  const badgeLabel = property.kind === "location" ? "À louer" : "À vendre";
  const badgeClass =
    property.kind === "location"
      ? "bg-sauge text-blanc"
      : "bg-anthracite text-blanc";

  return (
    <>
      {/* Breadcrumb + Header */}
      <section className="pt-[140px] lg:pt-[160px] pb-8 max-md:pt-[120px] bg-blanc">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <div className="flex items-center gap-2 text-[12px] text-[#7a817f] mb-5 tracking-[0.04em]">
            <Link href="/" className="hover:text-anthracite transition">
              Accueil
            </Link>
            <span className="text-sauge">/</span>
            <Link href="/annonces" className="hover:text-anthracite transition">
              Annonces
            </Link>
            <span className="text-sauge">/</span>
            <span className="text-anthracite font-semibold">
              {property.title}
            </span>
          </div>

          <div className="flex items-start justify-between gap-6 flex-wrap mb-6">
            <div>
              <Eyebrow className="mb-3">{badgeLabel}</Eyebrow>
              <h1 className="font-extrabold text-[clamp(28px,4vw,46px)] tracking-[-0.01em] leading-[1.1] max-w-[800px]">
                {property.title}
              </h1>
              <div className="text-[#7a817f] mt-3 flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="var(--color-sauge)"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.4" />
                </svg>
                {property.location}
              </div>
            </div>
            <div className="text-right max-md:text-left">
              <span
                className={`inline-block text-[10.5px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full mb-2 ${badgeClass}`}
              >
                {badgeLabel}
              </span>
              <div className="text-[clamp(28px,3.5vw,42px)] font-extrabold tracking-[-0.01em] leading-none">
                {property.price}
                {property.priceSuffix && (
                  <span className="text-base text-[#7a817f] font-medium">
                    {" "}
                    {property.priceSuffix}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section className="bg-blanc">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <PropertyGallery photos={property.photos} />
        </div>
      </section>

      {/* SÉPARATEUR — Plan d'appartement qui se trace au scroll */}
      <section className="bg-blanc pt-12 max-md:pt-10" aria-hidden="true">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <div className="relative flex items-center gap-6 max-md:gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--bordure)] to-transparent" />
            <DrawOnScroll>
              <FloorPlanIllust size={200} className="max-md:w-[140px] max-md:h-auto" />
            </DrawOnScroll>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[var(--bordure)] to-transparent" />
          </div>
        </div>
      </section>

      {/* SPECS + DESCRIPTION + FEATURES + CONTACT (split) */}
      <section className="bg-blanc pt-[60px] pb-[100px] max-md:pb-[72px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5 grid gap-10 grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
          {/* Colonne gauche : specs + description + features */}
          <div>
            <Reveal>
              {/* Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <Spec
                  icon={<RoomsIcon />}
                  label="Pièces"
                  value={String(property.rooms)}
                />
                <Spec
                  icon={<SurfaceIcon />}
                  label="Surface"
                  value={`${property.surface} m²`}
                />
                <Spec
                  icon={<FloorIcon />}
                  label="Étage"
                  value={String(property.etage ?? "—")}
                />
                <Spec
                  icon={<DpeIcon />}
                  label="DPE"
                  value={property.dpe ?? "—"}
                />
              </div>
            </Reveal>

            <Reveal>
              <Eyebrow className="mb-3">Description</Eyebrow>
              <h2 className="font-bold text-2xl mb-4 tracking-[-0.01em]">
                Le bien en détail
              </h2>
              <p className="text-[#5a6166] text-[16px] leading-[1.7] mb-10 whitespace-pre-line">
                {property.description}
              </p>
            </Reveal>

            {property.features.length > 0 && (
              <Reveal delay={120}>
                <Eyebrow className="mb-3">Points forts</Eyebrow>
                <h3 className="font-bold text-xl mb-5 tracking-[-0.01em]">
                  Ce qui fait la différence
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none">
                  {property.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-[15px] text-anthracite"
                    >
                      <span className="w-6 h-6 shrink-0 rounded-full bg-sauge/20 grid place-items-center mt-0.5">
                        <svg
                          viewBox="0 0 24 24"
                          width="12"
                          height="12"
                          fill="none"
                          stroke="var(--color-sauge)"
                          strokeWidth="2.6"
                          aria-hidden="true"
                        >
                          <path d="M5 12l5 5L20 6" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          {/* Colonne droite : carte agent + CTA */}
          <Reveal delay={180} className="max-lg:order-first">
            <aside className="bg-gris rounded-[16px] p-7 lg:sticky lg:top-[100px]">
              <Eyebrow className="mb-3">Votre conseiller</Eyebrow>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#9ea596] to-[#7a8170] grid place-items-center text-blanc font-bold text-xl">
                  M
                </div>
                <div>
                  <div className="font-semibold text-base">Markus Immobilier</div>
                  <div className="text-xs text-[#7a817f]">
                    Villeurbanne · Lyon
                  </div>
                </div>
              </div>
              <div className="space-y-2.5 text-sm mb-6">
                <a
                  href="tel:0478371367"
                  className="flex items-center gap-2.5 text-anthracite hover:text-sauge transition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  04 78 37 13 67
                </a>
                <a
                  href="mailto:villeurbanne@markusimmobilier.fr"
                  className="flex items-center gap-2.5 text-anthracite hover:text-sauge transition break-all"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  villeurbanne@markusimmobilier.fr
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <Button href="/contact" variant="cta">
                  Contacter
                  <ArrowRight />
                </Button>
                <Button href="/estimation" variant="outline">
                  Estimer un bien similaire
                </Button>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* CARTE / LOCALISATION */}
      <section className="bg-gris py-[80px] max-md:py-[60px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <Reveal className="mb-8">
            <Eyebrow className="mb-3">Localisation</Eyebrow>
            <h2 className="font-bold text-2xl tracking-[-0.01em]">
              {property.location}
            </h2>
          </Reveal>
          <Reveal>
            <div className="relative min-h-[360px] rounded-[14px] overflow-hidden bg-gradient-to-br from-[#dfe2dd] via-[#c9cec6] to-[#b9bfb4]">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--color-anthracite) 1px, transparent 1px), linear-gradient(to bottom, var(--color-anthracite) 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
                aria-hidden="true"
              />
              <DrawOnScroll className="absolute inset-0 grid place-items-center">
                <MapPinIllust size={180} />
              </DrawOnScroll>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#5d6560]/60 whitespace-nowrap">
                Carte Google Maps (intégration à venir)
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BIENS SIMILAIRES */}
      {similar.length > 0 && (
        <section className="bg-blanc py-[100px] max-md:py-[72px]">
          <div className="max-w-content mx-auto px-8 max-md:px-5">
            <Reveal className="mb-10">
              <Eyebrow className="mb-3">À découvrir aussi</Eyebrow>
              <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em]">
                Biens <span className="grad">similaires.</span>
              </h2>
            </Reveal>
            <div className="grid gap-[26px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {similar.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky CTA mobile */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-[80] bg-blanc rounded-[16px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] p-3 flex items-center gap-3 border border-[var(--bordure)]">
        <div className="flex-1 min-w-0">
          <div className="font-bold text-lg text-anthracite leading-none tabular-nums">
            {property.price}
            {property.priceSuffix && (
              <span className="text-xs text-[#7a817f] font-medium ml-1">
                {property.priceSuffix}
              </span>
            )}
          </div>
          <div className="text-[11px] text-[#7a817f] mt-0.5 truncate">
            {property.location}
          </div>
        </div>
        <Button href="/contact" variant="cta" className="!py-3 !px-5 text-xs">
          Contacter
        </Button>
      </div>
    </>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-gris rounded-[12px] p-5 flex items-center gap-3">
      <div className="w-10 h-10 shrink-0 rounded-full bg-blanc grid place-items-center text-sauge">
        {icon}
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-[0.1em] text-[#7a817f] font-semibold">
          {label}
        </div>
        <div className="text-lg font-bold text-anthracite tabular-nums">
          {value}
        </div>
      </div>
    </div>
  );
}

function RoomsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 21V8l9-5 9 5v13" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}
function SurfaceIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M3 9h18" />
    </svg>
  );
}
function FloorIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 20h18M3 16h12M3 12h18M3 8h12M3 4h18" />
    </svg>
  );
}
function DpeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M13 2L3 14h7l-1 8 11-12h-7l1-8z" />
    </svg>
  );
}
