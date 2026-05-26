"use client";

import { useState } from "react";
import type { ScoredListing } from "@/lib/radar/types";
import { scoreTier } from "@/lib/radar/score";
import { fetchListingPhone, type PhoneState } from "@/lib/radar/phone";
import { formatRelativeTime, freshnessTier } from "@/lib/radar/time";
import { cn } from "@/lib/utils";

const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " €";

const TIER_SCORE_COLOR: Record<ReturnType<typeof scoreTier>, string> = {
  top: "text-sauge",
  good: "text-anthracite",
  low: "text-amber-600",
  weak: "text-[#7a817f]",
};

function ScoreDots({ score }: { score: number }) {
  const filled = Math.round(score / 20);
  return (
    <span className="flex items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={cn(
            "inline-block w-[7px] h-[7px] rounded-full transition-colors",
            i < filled ? "bg-sauge" : "bg-[#d1d5ce]",
          )}
        />
      ))}
    </span>
  );
}

export function ListingCard({
  listing,
  onOpen,
  selected = false,
}: {
  listing: ScoredListing;
  onOpen: (l: ScoredListing) => void;
  selected?: boolean;
}) {
  const [phoneState, setPhoneState] = useState<PhoneState>({ status: "idle" });
  const tier = scoreTier(listing.score);
  const fresh = freshnessTier(listing.publishedAt);
  const isPrivate = listing.owner.type === "private";
  const photo = listing.images.thumb || listing.images.gallery[0];
  const publishedLabel = formatRelativeTime(listing.publishedAt);
  const isHot = isPrivate && fresh === "hot";

  const locationParts = [
    listing.location.district,
    listing.location.city,
    listing.location.zipcode,
  ].filter(Boolean);

  const specParts = [
    listing.realEstateType,
    listing.surface ? `${listing.surface} m²` : null,
    listing.rooms ? `${listing.rooms} p.` : null,
  ].filter(Boolean);

  return (
    <article
      className={cn(
        "group bg-blanc border rounded-[16px] flex overflow-hidden cursor-pointer",
        "transition-all duration-200 hover:shadow-[0_12px_32px_-10px_rgba(56,62,66,0.18)] hover:border-[rgba(56,62,66,0.22)] hover:-translate-y-[1px]",
        isHot
          ? "border-sauge/40 shadow-[0_4px_16px_-6px_rgba(158,165,150,0.25)]"
          : "border-[var(--bordure)]",
        selected && "ring-2 ring-sauge ring-offset-2",
      )}
      onClick={() => onOpen(listing)}
    >
      {/* Vignette à gauche, plus généreuse */}
      <div className="relative w-[124px] max-md:w-[100px] shrink-0 bg-gris self-stretch">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={listing.subject}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#c9cec6" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M3 15l5-5 4 4 3-3 6 6" />
              <circle cx="8" cy="8" r="1.5" />
            </svg>
          </div>
        )}
        {listing.images.count > 1 && (
          <span className="absolute bottom-2 right-2 bg-anthracite/80 text-blanc text-[10px] font-semibold px-1.5 py-0.5 rounded-full tabular-nums backdrop-blur-md">
            {listing.images.count}
          </span>
        )}
        {isHot && (
          <span className="absolute top-2 left-2 bg-sauge text-blanc text-[9px] font-extrabold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-full shadow-[0_2px_6px_-1px_rgba(158,165,150,0.6)]">
            Chaud
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 max-md:p-4 min-w-0 flex flex-col gap-2.5">
        {/* Row 1 : badge vendeur + date relative + score */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-[3px] rounded-full border",
                isPrivate
                  ? "bg-sauge/15 text-sauge border-sauge/30"
                  : "bg-anthracite/10 text-anthracite border-anthracite/15",
              )}
            >
              {isPrivate ? "Particulier" : "Agence"}
            </span>
            <span
              className={cn(
                "text-[11.5px] font-semibold tabular-nums",
                fresh === "hot"
                  ? "text-sauge"
                  : fresh === "fresh"
                    ? "text-anthracite"
                    : "text-[#7a817f]",
              )}
              title={new Date(listing.publishedAt).toLocaleString("fr-FR")}
            >
              {publishedLabel}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-[14px] font-extrabold tabular-nums leading-none",
                TIER_SCORE_COLOR[tier],
              )}
            >
              {listing.score}/100
            </span>
            <ScoreDots score={listing.score} />
          </div>
        </div>

        {/* Row 2 : titre annonce */}
        <h3 className="text-[14.5px] font-semibold text-anthracite leading-snug truncate">
          {listing.subject || "Annonce sans titre"}
        </h3>

        {/* Row 3 : specs + localisation */}
        <div className="text-[12.5px] text-[#5a6166] leading-tight truncate">
          {specParts.join(" · ")}
          {locationParts.length > 0 && (
            <span className="text-[#9aa09d]"> · {locationParts.join(" ")}</span>
          )}
        </div>

        {/* Row 4 : chips */}
        <div className="flex items-center gap-1.5 flex-wrap min-h-[20px]">
          {listing.mandateType === "exclusive" && <Chip label="Exclusif" tone="sauge" />}
          {listing.hasPhone && phoneState.status === "idle" && (
            <Chip label="Tél. dispo" tone="phone" />
          )}
          {!isPrivate && listing.daysOnline >= 60 && <Chip label="Mûr" tone="amber" />}
          {(listing.energyRate === "F" || listing.energyRate === "G") && (
            <Chip label={`DPE ${listing.energyRate}`} tone="warn" />
          )}
        </div>

        {/* Row 5 : prix + actions */}
        <div
          className="flex items-center justify-between gap-3 pt-3 border-t border-[var(--bordure)] mt-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="min-w-0">
            <span className="text-[19px] font-extrabold text-anthracite tracking-[-0.01em] leading-none tabular-nums">
              {eur(listing.price)}
            </span>
            {listing.pricePerSqm && (
              <span className="ml-2 text-[11.5px] text-[#7a817f] tabular-nums">
                {listing.pricePerSqm} €/m²
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {listing.hasPhone && phoneState.status === "idle" && (
              <ActionButton
                variant="primary"
                onClick={async () => {
                  setPhoneState({ status: "loading" });
                  const r = await fetchListingPhone(listing.url);
                  setPhoneState(r);
                }}
              >
                Appeler
              </ActionButton>
            )}
            {phoneState.status === "loading" && (
              <ActionButton variant="primary" disabled>
                …
              </ActionButton>
            )}
            {phoneState.status === "ok" && (
              <a
                href={`tel:${phoneState.phone.replace(/\s/g, "")}`}
                className="text-[11.5px] font-bold uppercase tracking-[0.08em] px-3.5 py-2 rounded-[8px] bg-sauge text-blanc hover:bg-[var(--sauge-hover)] transition tabular-nums"
                aria-label={`Appeler ${phoneState.phone}`}
              >
                {phoneState.phone}
              </a>
            )}
            {(phoneState.status === "error" || phoneState.status === "unavailable") && (
              <span className="text-[11px] text-[#7a817f] px-2">
                {phoneState.status === "unavailable" ? "Sans tél." : "Erreur"}
              </span>
            )}
            <ActionButton variant="outline" onClick={() => onOpen(listing)}>
              Voir →
            </ActionButton>
          </div>
        </div>
      </div>
    </article>
  );
}

function ActionButton({
  variant,
  onClick,
  disabled,
  children,
}: {
  variant: "primary" | "outline";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "text-[11.5px] font-bold uppercase tracking-[0.08em] px-3.5 py-2 rounded-[8px] transition",
        variant === "primary"
          ? "bg-sauge text-blanc hover:bg-[var(--sauge-hover)] disabled:opacity-50 disabled:cursor-wait"
          : "border border-[var(--bordure)] text-anthracite hover:border-anthracite/40 hover:bg-gris",
      )}
    >
      {children}
    </button>
  );
}

function Chip({
  label,
  tone,
}: {
  label: string;
  tone: "sauge" | "phone" | "warn" | "amber" | "muted";
}) {
  const styles: Record<typeof tone, string> = {
    sauge: "bg-sauge/15 text-sauge border-sauge/25",
    phone: "bg-green-50 text-green-700 border-green-200",
    warn: "bg-red-50 text-red-700 border-red-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    muted: "bg-gris text-[#7a817f] border-[var(--bordure)]",
  };
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.07em] font-semibold border",
        styles[tone],
      )}
    >
      {label}
    </span>
  );
}
