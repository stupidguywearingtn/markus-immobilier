"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { scoreTier } from "@/lib/radar/score";
import type { ScoredListing } from "@/lib/radar/types";
import { fetchListingPhone, type PhoneState } from "@/lib/radar/phone";

const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " €";

function pitchFor(l: ScoredListing): string {
  const isPrivate = l.owner.type === "private";
  const surface = l.surface ? `${l.surface} m²` : "ce bien";
  const days = l.daysOnline;
  if (isPrivate) {
    return `Bonjour, je suis [Prénom] de Markus Immobilier à Villeurbanne. Je vois que votre annonce pour ${surface} ${l.location.district ? `à ${l.location.district}` : ""} est en ligne depuis ${days} jour${days > 1 ? "s" : ""}. Êtes-vous toujours dans le projet ${l.realEstateType?.toLowerCase().includes("maison") ? "de location/vente" : "immobilier"} ? Nous accompagnons les propriétaires du secteur — visite gratuite et estimation sans engagement. Pourrions-nous échanger 5 minutes ?`;
  }
  return `Bonjour ${l.owner.name || ""}, [Prénom] de Markus Immobilier. Concernant votre mandat ${l.mandateType === "exclusive" ? "exclusif" : ""} sur ${surface} ${l.location.district ? `à ${l.location.district}` : ""}, en ligne depuis ${days}j — souhaitez-vous explorer un partenariat sur ce bien ?`;
}

export function ListingDetail({
  listing,
  onClose,
}: {
  listing: ScoredListing | null;
  onClose: () => void;
}) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [phoneState, setPhoneState] = useState<PhoneState>({ status: "idle" });

  useEffect(() => {
    setPhotoIdx(0);
    setCopied(false);
    setPhoneState({ status: "idle" });
  }, [listing?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (listing) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [listing, onClose]);

  return (
    <AnimatePresence>
      {listing && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-anthracite/60 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 z-[91] w-full max-w-[560px] bg-blanc text-anthracite overflow-y-auto shadow-[-30px_0_70px_-30px_rgba(0,0,0,0.4)]"
          >
            <DetailContent
              listing={listing}
              photoIdx={photoIdx}
              setPhotoIdx={setPhotoIdx}
              copied={copied}
              setCopied={setCopied}
              phoneState={phoneState}
              setPhoneState={setPhoneState}
              onClose={onClose}
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function DetailContent({
  listing,
  photoIdx,
  setPhotoIdx,
  copied,
  setCopied,
  phoneState,
  setPhoneState,
  onClose,
}: {
  listing: ScoredListing;
  photoIdx: number;
  setPhotoIdx: (n: number) => void;
  copied: boolean;
  setCopied: (b: boolean) => void;
  phoneState: PhoneState;
  setPhoneState: (s: PhoneState) => void;
  onClose: () => void;
}) {
  const photos = listing.images.gallery.length
    ? listing.images.gallery
    : listing.images.thumb
      ? [listing.images.thumb]
      : [];
  const current = photos[photoIdx];
  const tier = scoreTier(listing.score);
  const isPrivate = listing.owner.type === "private";
  const pitch = pitchFor(listing);

  return (
    <div>
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="sticky top-3 ml-auto mr-3 mt-3 z-10 grid place-items-center w-9 h-9 rounded-full bg-anthracite/85 text-blanc backdrop-blur-md hover:bg-anthracite transition"
        style={{ float: "right" }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>

      {/* Galerie */}
      <div className="relative aspect-[4/3] bg-gris overflow-hidden">
        {current ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current} alt={listing.subject} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-[#7a817f] text-sm">
            Pas de photo
          </div>
        )}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setPhotoIdx((photoIdx - 1 + photos.length) % photos.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-anthracite/70 text-blanc grid place-items-center hover:bg-anthracite transition"
              aria-label="Photo précédente"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setPhotoIdx((photoIdx + 1) % photos.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-anthracite/70 text-blanc grid place-items-center hover:bg-anthracite transition"
              aria-label="Photo suivante"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-anthracite/80 text-blanc text-[11px] font-semibold px-2.5 py-1 rounded-full tabular-nums">
              {photoIdx + 1} / {photos.length}
            </span>
          </>
        )}
      </div>

      <div className="p-7 max-md:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
          <div>
            <Eyebrow className="mb-2 !text-[10px]">
              {isPrivate ? "Particulier" : "Agence"} · Score {listing.score}/100 · {tier === "top" ? "Hot" : tier === "good" ? "Bon" : tier === "low" ? "Moyen" : "Faible"}
            </Eyebrow>
            <h3 className="text-xl font-bold tracking-[-0.01em] leading-snug">{listing.subject}</h3>
          </div>
          <div className="text-right">
            <div className="text-[22px] font-extrabold leading-none tabular-nums">{eur(listing.price)}</div>
            {listing.pricePerSqm && (
              <div className="text-[11px] text-[#7a817f] tabular-nums mt-1">
                {listing.pricePerSqm} €/m²
                {listing.marketM2 && (
                  <span className="ml-1.5 text-[10px] opacity-70">
                    vs {listing.marketM2} marché
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Adresse */}
        <div className="text-sm text-[#5a6166] mb-5 flex items-start gap-2">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--color-sauge)" strokeWidth="1.8" className="mt-0.5 shrink-0">
            <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.4" />
          </svg>
          <span>{listing.location.label || `${listing.location.district ?? ""} ${listing.location.city} ${listing.location.zipcode}`}</span>
        </div>

        {/* Score breakdown */}
        <div className="bg-gris rounded-[14px] p-5 mb-6">
          <div className="text-[10px] uppercase tracking-[0.14em] text-sauge font-bold mb-3">
            Pourquoi ce score
          </div>
          <ul className="space-y-1.5 text-[13px]">
            <ScoreLine label={`${isPrivate ? "Particulier" : "Agence"}`} value={listing.scoreBreakdown.ownership} />
            <ScoreLine label={`En ligne depuis ${listing.daysOnline}j`} value={listing.scoreBreakdown.age} />
            {listing.scoreBreakdown.overpriced > 0 && listing.marketM2 && (
              <ScoreLine label={`Prix > marché (${listing.marketM2} €/m²)`} value={listing.scoreBreakdown.overpriced} />
            )}
            {listing.scoreBreakdown.proExclusive > 0 && (
              <ScoreLine label="Pro · mandat exclusif ≥ 40j" value={listing.scoreBreakdown.proExclusive} />
            )}
          </ul>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-[13px]">
          <Spec label="Type" value={listing.realEstateType ?? "—"} />
          <Spec label="Surface" value={listing.surface ? `${listing.surface} m²` : "—"} />
          <Spec label="Pièces" value={listing.rooms?.toString() ?? "—"} />
          <Spec label="Chambres" value={listing.bedrooms?.toString() ?? "—"} />
          <Spec label="DPE" value={listing.energyRate ?? "—"} />
          <Spec label="Année" value={listing.buildingYear?.toString() ?? "—"} />
          <Spec label="Mandat" value={listing.mandateType ?? "—"} />
          <Spec label="Propriétaire" value={listing.owner.name || "—"} />
        </div>

        {/* Pitch d'appel */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase tracking-[0.14em] text-sauge font-bold">
              Accroche suggérée
            </div>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(pitch);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                } catch {
                  /* noop */
                }
              }}
              className="text-[11px] text-sauge font-semibold uppercase tracking-[0.08em] hover:underline"
            >
              {copied ? "Copié ✓" : "Copier"}
            </button>
          </div>
          <p className="bg-blanc border border-[var(--bordure)] rounded-[12px] p-4 text-[13px] leading-relaxed text-[#3d4347] italic">
            « {pitch} »
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 items-center">
          <Button href={listing.url} external variant="cta">
            Voir l&apos;annonce
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="ml-0.5">
              <path d="M14 5h5v5M19 5L10 14M19 14v5H5V5h5" />
            </svg>
          </Button>

          {/* Bouton phone — strictement à la demande (actor facturé 0,05 $ par run).
              N'apparaît que si has_phone === true. Disparaît après succès ou indispo. */}
          {listing.hasPhone &&
            phoneState.status !== "ok" &&
            phoneState.status !== "unavailable" && (
              <button
                type="button"
                disabled={phoneState.status === "loading"}
                onClick={async () => {
                  setPhoneState({ status: "loading" });
                  const r = await fetchListingPhone(listing.url);
                  setPhoneState(r);
                }}
                className="btn-base btn-outline btn-sweep"
              >
                {phoneState.status === "loading"
                  ? "Récupération…"
                  : "Récupérer le téléphone"}
              </button>
            )}

          {phoneState.status === "ok" && (
            <a
              href={`tel:${phoneState.phone.replace(/\s/g, "")}`}
              className="btn-base btn-sauge btn-sweep"
              aria-label={`Appeler ${phoneState.phone}`}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              {phoneState.phone}
            </a>
          )}

          {phoneState.status === "unavailable" && (
            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-gris text-[#7a817f] text-[13px] font-medium border border-[var(--bordure)]">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              {phoneState.message}
            </span>
          )}
        </div>

        {phoneState.status === "error" && (
          <p className="mt-3 text-[12px] text-red-600 font-medium" role="alert">
            {phoneState.message}
          </p>
        )}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-blanc border border-[var(--bordure)] rounded-[10px] p-3">
      <div className="text-[9.5px] uppercase tracking-[0.1em] text-[#7a817f] font-semibold mb-1">
        {label}
      </div>
      <div className="font-semibold truncate">{value}</div>
    </div>
  );
}

function ScoreLine({ label, value }: { label: string; value: number }) {
  return (
    <li className="flex justify-between items-center">
      <span className="text-[#5a6166]">{label}</span>
      <b className="text-anthracite tabular-nums">+{value}</b>
    </li>
  );
}
