import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button, ArrowRight } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { ListingGallery } from "@/components/property/listing-gallery";
import { JsonLd, breadcrumbLd, BASE } from "@/components/seo/json-ld";
import {
  eur,
  surfaceLabel,
  TYPE_LABEL,
  STATUT_LABEL,
  transactionLabel,
  type Listing,
} from "@/lib/listings";

/** Type schema.org du bien décrit (mainEntity du RealEstateListing). */
const ACCOMMODATION_TYPE: Record<Listing["type"], string> = {
  appartement: "Apartment",
  maison: "House",
  immeuble: "Residence",
  garage: "Accommodation",
  parking: "Accommodation",
  local: "Accommodation",
  terrain: "Accommodation",
};

/** Fiche complète d'un bien réel : galerie, infos, JSON-LD RealEstateListing, CTA. */
export function ListingDetail({ listing: l }: { listing: Listing }) {
  const dispo = l.statut === "disponible";
  const adresseComplete = `${l.adresse}, ${l.codePostal} ${l.ville}`;

  const isLocation = l.transaction === "location";

  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: l.adresse,
    addressLocality: l.ville,
    postalCode: l.codePostal,
    addressRegion: "Auvergne-Rhône-Alpes",
    addressCountry: "FR",
  };

  // JSON-LD : RealEstateListing (la page d'annonce) + mainEntity décrivant le
  // bien (surface, pièces, DPE/GES) + Offer (prix de vente, ou loyer mensuel
  // via UnitPriceSpecification en location).
  const productLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: l.seo.h1,
    description: l.seo.description,
    url: `${BASE}/annonces/${l.slug}`,
    datePosted: l.publishedAt,
    image: l.photos.map((p) => `${BASE}${p.src}`),
    mainEntity: {
      "@type": ACCOMMODATION_TYPE[l.type],
      name: l.titre,
      description: l.description,
      address: postalAddress,
      ...(l.surface != null
        ? {
            floorSize: {
              "@type": "QuantitativeValue",
              value: l.surface,
              unitCode: "MTK", // mètre carré
              unitText: "m²",
            },
          }
        : {}),
      ...(l.pieces != null ? { numberOfRooms: l.pieces } : {}),
      ...(l.etage ? { floorLevel: l.etage } : {}),
      ...(l.dpe || l.ges
        ? {
            additionalProperty: [
              ...(l.dpe
                ? [
                    {
                      "@type": "PropertyValue",
                      name: "DPE",
                      value: l.dpe,
                      description: "Diagnostic de performance énergétique",
                    },
                  ]
                : []),
              ...(l.ges
                ? [
                    {
                      "@type": "PropertyValue",
                      name: "GES",
                      value: l.ges,
                      description: "Émissions de gaz à effet de serre",
                    },
                  ]
                : []),
            ],
          }
        : {}),
    },
    offers: {
      "@type": "Offer",
      price: l.prix,
      priceCurrency: "EUR",
      ...(isLocation
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: l.prix,
              priceCurrency: "EUR",
              unitCode: "MON", // par mois
              billingIncrement: 1,
              description: "Loyer mensuel charges comprises",
            },
            businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
          }
        : { businessFunction: "http://purl.org/goodrelations/v1#Sell" }),
      availability: dispo
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
      url: `${BASE}/annonces/${l.slug}`,
      seller: {
        "@type": "RealEstateAgent",
        name: "Markus Immobilier",
        telephone: "+33478371367",
        address: {
          "@type": "PostalAddress",
          streetAddress: "87 rue Édouard Vaillant",
          addressLocality: "Villeurbanne",
          postalCode: "69100",
          addressCountry: "FR",
        },
      },
      areaServed: { "@type": "Place", address: postalAddress },
    },
  };

  return (
    <>
      <JsonLd data={productLd} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Annonces", path: "/annonces" },
          { name: l.seo.h1, path: `/annonces/${l.slug}` },
        ])}
      />

      {/* Fil d'Ariane + en-tête */}
      <section className="pt-[140px] lg:pt-[160px] pb-8 max-md:pt-[120px] bg-blanc">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <nav
            className="flex items-center gap-2 text-[12px] text-[#7a817f] mb-5 tracking-[0.04em]"
            aria-label="Fil d'Ariane"
          >
            <Link href="/" className="hover:text-anthracite transition">Accueil</Link>
            <span className="text-sauge">/</span>
            <Link href="/annonces" className="hover:text-anthracite transition">Annonces</Link>
            <span className="text-sauge">/</span>
            <span className="text-anthracite font-semibold">{TYPE_LABEL[l.type]} — {l.ville}</span>
          </nav>

          <div className="flex items-start justify-between gap-6 flex-wrap mb-6">
            <div>
              <Eyebrow className="mb-3">
                {transactionLabel(l)} · {l.quartier}
              </Eyebrow>
              <h1 className="font-extrabold text-[clamp(28px,4vw,46px)] tracking-[-0.01em] leading-[1.1] max-w-[820px]">
                {l.seo.h1}
              </h1>
              <div className="text-[#7a817f] mt-3 flex items-center gap-2">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--color-sauge)" strokeWidth="1.8" aria-hidden="true">
                  <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.4" />
                </svg>
                {adresseComplete}
              </div>
            </div>
            <div className="text-right max-md:text-left">
              <div className="flex items-center gap-1.5 justify-end max-md:justify-start mb-2">
                <span className={`inline-block text-[10.5px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full ${l.transaction === "location" ? "bg-sauge text-blanc" : "bg-anthracite text-blanc"}`}>
                  {transactionLabel(l)}
                </span>
                <span className={`inline-block text-[10.5px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border ${dispo ? "bg-sauge/15 text-sauge border-sauge/40" : "bg-gris text-[#7a817f] border-[var(--bordure)]"}`}>
                  {l.disponibilite ?? STATUT_LABEL[l.statut]}
                </span>
              </div>
              <div className="text-[clamp(28px,3.5vw,42px)] font-extrabold tracking-[-0.01em] leading-none tabular-nums">
                {eur(l.prix)}
                {l.prixSuffixe && (
                  <span className="text-base text-[#7a817f] font-medium"> {l.prixSuffixe}</span>
                )}
              </div>
              {l.loyerHorsCharges != null && l.chargesMensuelles != null && (
                <div className="text-[13px] text-[#7a817f] mt-1.5 tabular-nums">
                  soit {l.loyerHorsCharges} € hors charges + {l.chargesMensuelles} € de charges
                </div>
              )}
              {l.prixMention && (
                <div className="text-[13px] text-[#7a817f] mt-1.5 max-w-[280px] ml-auto max-md:ml-0 leading-snug">
                  {l.prixMention}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="bg-blanc">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <ListingGallery photos={l.photos} />
        </div>
      </section>

      {/* Description + atouts + infos / colonne contact */}
      <section className="bg-blanc pt-[60px] pb-[100px] max-md:pb-[72px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5 grid gap-10 grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Reveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <Spec label="Type" value={TYPE_LABEL[l.type]} />
                {l.pieces != null && <Spec label="Pièces" value={`${l.pieces} pièces`} />}
                {l.surface != null && (
                  <Spec label="Surface" value={surfaceLabel(l.surface)} />
                )}
                {l.etage && <Spec label="Étage" value={l.etage} />}
                {l.pieces == null && <Spec label="Transaction" value={transactionLabel(l)} />}
                {l.taxeFonciere != null && (
                  <Spec label="Taxe foncière" value={`${l.taxeFonciere} €/an`} />
                )}
                {l.chargesCopro != null && (
                  <Spec label="Charges copro." value={`${l.chargesCopro} €/an`} />
                )}
              </div>
            </Reveal>

            {(l.dpe || l.ges) && (
              <Reveal>
                <div className="mb-10 rounded-[16px] border border-[var(--bordure)] p-6 max-md:p-5">
                  <Eyebrow className="mb-4">Performance énergétique</Eyebrow>
                  <div className="flex flex-wrap gap-8">
                    {l.dpe && <EnergyScale label="DPE — Consommation" value={l.dpe} />}
                    {l.ges && <EnergyScale label="GES — Émissions" value={l.ges} />}
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal>
              <Eyebrow className="mb-3">Description</Eyebrow>
              <h2 className="font-bold text-2xl mb-4 tracking-[-0.01em]">Le bien en détail</h2>
              <p className="text-[#3d4347] text-[16px] leading-[1.75] mb-10 whitespace-pre-line">
                {l.description}
              </p>
            </Reveal>

            {l.composition && l.composition.length > 0 && (
              <Reveal delay={100}>
                <Eyebrow className="mb-3">Composition</Eyebrow>
                <h2 className="font-bold text-xl mb-5 tracking-[-0.01em]">
                  L&apos;agencement du bien
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2.5 gap-x-6 list-none mb-10">
                  {l.composition.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-3 text-[15px] text-[#3d4347] border-b border-[var(--bordure)] pb-2.5"
                    >
                      <span
                        className="w-1.5 h-1.5 shrink-0 rounded-full bg-sauge mt-[9px]"
                        aria-hidden="true"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {l.atouts.length > 0 && (
              <Reveal delay={120}>
                <Eyebrow className="mb-3">Points forts</Eyebrow>
                <h2 className="font-bold text-xl mb-5 tracking-[-0.01em]">
                  Ce qui fait la différence
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none">
                  {l.atouts.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-[15px] text-anthracite">
                      <span className="w-6 h-6 shrink-0 rounded-full bg-sauge/20 grid place-items-center mt-0.5">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="var(--color-sauge)" strokeWidth="2.6" aria-hidden="true">
                          <path d="M5 12l5 5L20 6" />
                        </svg>
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal delay={160}>
              <div className="mt-10 bg-gris rounded-[16px] p-6 max-md:p-5">
                <Eyebrow className="mb-3">Localisation</Eyebrow>
                <p className="text-[15px] text-[#3d4347] leading-relaxed">
                  {adresseComplete} — quartier <b className="text-anthracite">{l.quartier}</b>
                  {l.localisationTexte ? `, ${l.localisationTexte}` : "."}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Colonne contact */}
          <Reveal delay={180} className="max-lg:order-first">
            <aside className="bg-gris rounded-[16px] p-7 lg:sticky lg:top-[100px]">
              <Eyebrow className="mb-3">Votre contact</Eyebrow>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#9ea596] to-[#7a8170] grid place-items-center text-blanc font-bold text-xl">
                  {l.contact.nom.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-base">{l.contact.nom}</div>
                  <div className="text-xs text-[#7a817f]">{l.contact.agence}</div>
                </div>
              </div>
              <div className="space-y-2.5 text-sm mb-6">
                <a
                  href={`tel:${l.contact.telephone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-anthracite hover:text-sauge transition font-semibold"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  {l.contact.telephone}
                </a>
                <a
                  href={`mailto:${l.contact.email}`}
                  className="flex items-center gap-2.5 text-anthracite hover:text-sauge transition break-all"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  {l.contact.email}
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <Button href="/contact" variant="cta">
                  Contacter / Être rappelé
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

      {/* CTA bas de page */}
      <section className="bg-anthracite text-blanc py-[80px] max-md:py-[60px]">
        <div className="max-w-[760px] mx-auto px-8 max-md:px-5 text-center">
          <Reveal>
            <Eyebrow className="mb-4">Ce bien vous intéresse ?</Eyebrow>
            <h2 className="font-bold text-[clamp(26px,3.6vw,40px)] tracking-[-0.01em] mb-4">
              Organisons une <span className="grad-light">visite.</span>
            </h2>
            <p className="text-blanc/75 mb-7 max-w-[520px] mx-auto leading-relaxed">
              Un conseiller Markus vous répond rapidement — et peut aussi estimer
              gratuitement votre propre bien.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="cta">
                Être rappelé
                <ArrowRight />
              </Button>
              <Button href="/estimation" variant="ghost">
                Estimer mon bien
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA sticky mobile */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-[80] bg-blanc rounded-[16px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] p-3 flex items-center gap-3 border border-[var(--bordure)]">
        <div className="flex-1 min-w-0">
          <div className="font-bold text-lg text-anthracite leading-none tabular-nums">
            {eur(l.prix)}
          </div>
          <div className="text-[11px] text-[#7a817f] mt-0.5 truncate">
            {TYPE_LABEL[l.type]} · {l.ville}
          </div>
        </div>
        <a
          href={`tel:${l.contact.telephone.replace(/\s/g, "")}`}
          className="btn-base btn-cta btn-sweep !py-3 !px-5 text-xs"
        >
          Appeler
        </a>
      </div>
    </>
  );
}

const DPE_LETTRES = ["A", "B", "C", "D", "E", "F", "G"] as const;

/** Échelle A→G sobre (tokens de marque, pas de dégradé vert/rouge criard). */
function EnergyScale({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.1em] text-[#7a817f] font-semibold mb-2.5">
        {label}
      </div>
      <div className="flex items-center gap-1.5" role="img" aria-label={`${label} : ${value} sur une échelle de A à G`}>
        {DPE_LETTRES.map((lettre) => {
          const actif = lettre === value;
          return (
            <span
              key={lettre}
              aria-hidden="true"
              className={`grid place-items-center rounded-[6px] font-bold leading-none transition ${
                actif
                  ? "w-9 h-9 bg-sauge text-blanc text-[16px] shadow-[0_4px_12px_rgba(158,165,150,0.5)]"
                  : "w-7 h-7 bg-gris text-[#a9b0ad] text-[12px]"
              }`}
            >
              {lettre}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gris rounded-[12px] p-5">
      <div className="text-[11px] uppercase tracking-[0.1em] text-[#7a817f] font-semibold mb-1">
        {label}
      </div>
      <div className="text-[17px] font-bold text-anthracite">{value}</div>
    </div>
  );
}
