import Link from "next/link";
import Image from "next/image";
import {
  eur,
  surfaceLabel,
  TYPE_LABEL,
  STATUT_LABEL,
  transactionLabel,
  type Listing,
} from "@/lib/listings";

/**
 * Carte d'un bien RÉEL (par opposition aux placeholders « À venir »).
 * Photo réelle + badge de statut + prix + lien vers la fiche dédiée.
 */
export function ListingCard({ listing: l }: { listing: Listing }) {
  const sold = l.statut !== "disponible";
  const photo = l.photos[0];

  return (
    <article className="group h-full bg-blanc border border-[var(--bordure)] rounded-[16px] overflow-hidden flex flex-col [transition:all_0.4s_var(--ease)] hover:-translate-y-2 hover:shadow-[0_28px_56px_-12px_rgba(56,62,66,0.22)] hover:border-[rgba(56,62,66,0.18)]">
      <Link
        href={`/annonces/${l.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-gris no-underline"
      >
        {photo && (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 ${sold ? "grayscale-[0.4]" : ""}`}
          />
        )}
        <div
          className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none z-[3]"
          style={{
            background:
              "linear-gradient(to top, rgba(56,62,66,0.45) 0%, rgba(56,62,66,0.12) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        {/* Badges : transaction + statut si vendu/loué */}
        <div className="absolute top-3.5 left-3.5 z-[4] flex items-center gap-1.5">
          <span
            className={`text-[10.5px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.18)] ${
              l.transaction === "location"
                ? "bg-sauge text-blanc"
                : "bg-anthracite text-blanc"
            }`}
          >
            {transactionLabel(l)}
          </span>
          {sold && (
            <span className="text-[10.5px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full bg-blanc text-anthracite shadow-[0_4px_12px_rgba(0,0,0,0.18)]">
              {STATUT_LABEL[l.statut]}
            </span>
          )}
        </div>
        {l.photos.length > 1 && (
          <span className="absolute top-3.5 right-3.5 z-[4] bg-anthracite/[0.78] text-blanc text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md tabular-nums">
            {l.photos.length} photos
          </span>
        )}
      </Link>

      <div className="p-6 flex-1 flex flex-col">
        <div className="text-[24px] font-bold text-anthracite tracking-[-0.01em] leading-none">
          {eur(l.prix)}
          {l.prixSuffixe && (
            <span className="text-[13px] text-[#7a817f] font-medium"> {l.prixSuffixe}</span>
          )}
        </div>
        <div className="text-[13px] text-[#7a817f] mt-2 mb-3.5 flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--color-sauge)" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.4" />
          </svg>
          {l.ville}, {l.quartier}
        </div>
        <h3 className="text-lg font-semibold mb-4 leading-[1.3]">{l.titre}</h3>

        <div className="flex gap-[18px] pt-4 border-t border-[var(--bordure)] text-[13px] text-[#5a6166]">
          <div>
            <b className="text-anthracite font-bold">{TYPE_LABEL[l.type]}</b>
          </div>
          {l.surface != null && (
            <div>
              <b className="text-anthracite font-bold">{surfaceLabel(l.surface)}</b>
            </div>
          )}
          {l.pieces != null && (
            <div>
              <b className="text-anthracite font-bold">{l.pieces}</b> pièces
            </div>
          )}
          {l.dpe && (
            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-[0.08em] text-[#7a817f] font-semibold">
                DPE
              </span>
              <span className="grid place-items-center w-[22px] h-[22px] rounded-[6px] bg-sauge text-blanc text-[12px] font-bold leading-none">
                {l.dpe}
              </span>
            </div>
          )}
        </div>

        <Link
          href={`/annonces/${l.slug}`}
          className="mt-5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-sauge no-underline inline-flex items-center gap-1.5 transition-all hover:gap-3"
        >
          Voir le bien
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
