/**
 * Types Radar de prospection — annonce normalisée (Leboncoin → forme interne).
 */

export type OwnerType = "private" | "pro";

export type RadarListing = {
  id: string;
  source: "leboncoin";
  url: string;
  subject: string;
  publishedAt: string; // ISO
  daysOnline: number;
  price: number; // €
  surface?: number; // m²
  rooms?: number;
  bedrooms?: number;
  pricePerSqm?: number; // €/m²
  realEstateType?: string; // Maison / Appartement / Terrain…
  energyRate?: string; // A–G
  buildingYear?: number;
  mandateType?: "simple" | "exclusive";
  hasPhone: boolean;
  images: {
    thumb: string | null;
    gallery: string[];
    count: number;
  };
  location: {
    lat: number | null;
    lng: number | null;
    city: string;
    district?: string;
    zipcode: string;
    label: string;
  };
  owner: {
    type: OwnerType;
    name: string;
    siren?: string;
  };
};

export type ScoredListing = RadarListing & {
  score: number;
  scoreBreakdown: {
    ownership: number;
    age: number;
    overpriced: number;
    proExclusive: number;
  };
  marketM2?: number; // €/m² médian secteur (DVF)
};

export type SearchResponse = {
  ok: boolean;
  city: string;
  count: number;
  listings: ScoredListing[];
  source: "mock" | "apify";
  diagnostics?: {
    dvfHits?: number;
    dvfMisses?: number;
    duplicatesDropped?: number;
    timing?: { fetch?: number; dvf?: number; score?: number };
    error?: string;
  };
};
