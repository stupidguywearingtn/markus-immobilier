/**
 * Normalise une annonce Leboncoin (forme Apify scraper) → RadarListing.
 * Décode les chaînes mojibake au passage.
 */

import { decodeMojibake } from "./decode";
import type { RadarListing, OwnerType } from "./types";

// Forme brute Apify/Leboncoin (champs utiles uniquement)
export type RawLeboncoinListing = {
  list_id: number | string;
  first_publication_date: string;
  subject?: string;
  url?: string;
  price?: number[];
  has_phone?: boolean;
  images?: {
    thumb_url?: string;
    urls?: string[];
    urls_thumb?: string[];
    nb_images?: number;
  };
  attributes?: Array<{
    key: string;
    value?: string;
    value_label?: string;
  }>;
  location?: {
    city_label?: string;
    city?: string;
    zipcode?: string;
    district?: string;
    lat?: number;
    lng?: number;
  };
  owner?: {
    type?: string;
    name?: string;
    siren?: string;
  };
};

function findAttr(
  list: RawLeboncoinListing["attributes"],
  key: string,
): string | undefined {
  return list?.find((a) => a.key === key)?.value;
}

function findAttrLabel(
  list: RawLeboncoinListing["attributes"],
  key: string,
): string | undefined {
  const a = list?.find((x) => x.key === key);
  return a?.value_label ?? a?.value;
}

export function normalizeListing(raw: RawLeboncoinListing): RadarListing {
  const publishedAt = new Date(raw.first_publication_date.replace(" ", "T") + "Z").toISOString();
  const daysOnline = Math.max(
    0,
    Math.floor((Date.now() - new Date(publishedAt).getTime()) / 86_400_000),
  );

  const price = Array.isArray(raw.price) ? raw.price[0] : 0;
  const surface = Number(findAttr(raw.attributes, "square")) || undefined;
  const rooms = Number(findAttr(raw.attributes, "rooms")) || undefined;
  const bedrooms = Number(findAttr(raw.attributes, "bedrooms")) || undefined;
  const realEstateType = decodeMojibake(findAttrLabel(raw.attributes, "real_estate_type"));
  const energyRate = findAttr(raw.attributes, "energy_rate")?.toUpperCase();
  const buildingYear = Number(findAttr(raw.attributes, "building_year")) || undefined;
  const mandateRaw = findAttr(raw.attributes, "mandate_type");
  const mandateType: RadarListing["mandateType"] =
    mandateRaw === "exclusive" ? "exclusive" : mandateRaw === "simple" ? "simple" : undefined;

  const ownerType: OwnerType = raw.owner?.type === "private" ? "private" : "pro";

  const galleryUrls = raw.images?.urls ?? [];
  const thumb = raw.images?.urls_thumb?.[0] ?? raw.images?.thumb_url ?? galleryUrls[0] ?? null;

  return {
    id: String(raw.list_id),
    source: "leboncoin",
    url: raw.url ?? "",
    subject: decodeMojibake(raw.subject),
    publishedAt,
    daysOnline,
    price,
    surface,
    rooms,
    bedrooms,
    pricePerSqm: surface && surface > 0 && price > 0 ? Math.round(price / surface) : undefined,
    realEstateType,
    energyRate,
    buildingYear,
    mandateType,
    hasPhone: !!raw.has_phone,
    images: {
      thumb,
      gallery: galleryUrls,
      count: raw.images?.nb_images ?? galleryUrls.length,
    },
    location: {
      lat: typeof raw.location?.lat === "number" ? raw.location.lat : null,
      lng: typeof raw.location?.lng === "number" ? raw.location.lng : null,
      city: decodeMojibake(raw.location?.city ?? ""),
      district: decodeMojibake(raw.location?.district),
      zipcode: raw.location?.zipcode ?? "",
      label: decodeMojibake(raw.location?.city_label ?? ""),
    },
    owner: {
      type: ownerType,
      name: decodeMojibake(raw.owner?.name ?? ""),
      siren: raw.owner?.siren,
    },
  };
}
