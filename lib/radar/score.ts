/**
 * Score d'opportunité de prospection /100.
 *
 * Hypothèse métier (avril 2026) : l'ancienneté joue À L'INVERSE selon le type
 * de vendeur — un particulier qui vient de poster est OR, une agence qui peine
 * à vendre depuis longtemps est OR.
 *
 *   Particulier : ≤ 48h → +30 (à appeler MAINTENANT). Dégressif 30 → 0 entre 48h
 *                 et 7j. Au-delà → 0 (le concurrent a déjà appelé).
 *   Agence      : barème ancien (mandat qui traîne = mûr). +30 max à 90j.
 *
 *   + Ownership : Particulier +45, Pro +18
 *   + Prix > marché DVF +12 % → jusqu'à +22 (échelle linéaire jusqu'à +30 %)
 *   + Pro + mandat exclusif + en ligne ≥ 40j → +12
 */

import type { RadarListing, ScoredListing } from "./types";
import { hoursSince } from "./time";

export function scoreListing(
  listing: RadarListing,
  marketM2: number | undefined,
): ScoredListing {
  const breakdown = {
    ownership: 0,
    age: 0,
    overpriced: 0,
    proExclusive: 0,
  };

  // 1) Ownership
  breakdown.ownership = listing.owner.type === "private" ? 45 : 18;

  // 2) Ancienneté — logique INVERSÉE par type de vendeur
  if (listing.owner.type === "private") {
    // Particulier : récent = chaud. 0–48h → +30, 48h–7j → dégressif linéaire 30→0, >7j → 0
    const h = hoursSince(listing.publishedAt);
    if (h <= 48) {
      breakdown.age = 30;
    } else if (h <= 168) {
      const t = (h - 48) / (168 - 48); // 0 à 48h post-cutoff, 1 à 7j
      breakdown.age = Math.round(30 * (1 - t));
    } else {
      breakdown.age = 0;
    }
  } else {
    // Pro : ancienneté = maturité du mandat. Plafond 90j.
    const days = Math.min(listing.daysOnline, 90);
    breakdown.age = Math.round((days / 90) * 30);
  }

  // 3) Overpriced vs DVF
  if (
    listing.pricePerSqm &&
    listing.pricePerSqm > 0 &&
    marketM2 &&
    marketM2 > 0
  ) {
    const ratio = listing.pricePerSqm / marketM2;
    if (ratio > 1.12) {
      const scale = Math.min((ratio - 1.12) / 0.18, 1);
      breakdown.overpriced = Math.round(scale * 22);
    }
  }

  // 4) Pro exclusif depuis ≥ 40j
  if (
    listing.owner.type === "pro" &&
    listing.mandateType === "exclusive" &&
    listing.daysOnline >= 40
  ) {
    breakdown.proExclusive = 12;
  }

  const total =
    breakdown.ownership +
    breakdown.age +
    breakdown.overpriced +
    breakdown.proExclusive;

  return {
    ...listing,
    score: Math.min(100, Math.round(total)),
    scoreBreakdown: breakdown,
    marketM2,
  };
}

/** Bande de couleur du score, alignée DA (sauge / ambre / red / anthracite). */
export function scoreTier(score: number): "top" | "good" | "low" | "weak" {
  if (score >= 75) return "top";
  if (score >= 60) return "good";
  if (score >= 45) return "low";
  return "weak";
}
