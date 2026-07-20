/**
 * BIENS RÉELS — source de vérité des annonces Markus Immobilier.
 *
 * ➜ AJOUTER UN BIEN = ajouter un objet dans LISTINGS + déposer les photos dans
 *   public/annonces/<slug>/. Rien d'autre à toucher : la home, le hub /annonces,
 *   la page dédiée /annonces/<slug>, le sitemap et llms.txt se mettent à jour
 *   automatiquement.
 *
 * Les biens de démo (lib/mock-properties.ts) restent affichés avec le badge
 * « À venir » tant que le catalogue réel n'est pas fourni.
 */

export type ListingType =
  | "garage"
  | "parking"
  | "appartement"
  | "maison"
  | "local"
  | "terrain"
  | "immeuble";

export type ListingTransaction = "vente" | "location";
export type ListingStatut = "disponible" | "vendu" | "loue";

export type ListingPhoto = {
  /** Chemin public, ex. /annonces/<slug>/photo.jpeg */
  src: string;
  /** Alt descriptif et localisé (SEO images). */
  alt: string;
};

export type Listing = {
  id: string;
  /** URL finale : /annonces/<slug> */
  slug: string;
  titre: string;
  type: ListingType;
  transaction: ListingTransaction;
  statut: ListingStatut;
  /** Prix en euros. Vente = prix de vente ; location = loyer mensuel (CC). */
  prix: number;
  /** Ex. "/mois CC" pour une location. */
  prixSuffixe?: string;
  /** Location : détail du loyer hors charges (€/mois). */
  loyerHorsCharges?: number;
  /** Location : charges mensuelles (€/mois). */
  chargesMensuelles?: number;
  /** Nuance de dispo affichée, ex. « Disponible rapidement ». */
  disponibilite?: string;
  /** Phrase de localisation (transports, commerces…) affichée sur la fiche. */
  localisationTexte?: string;
  adresse: string;
  quartier: string;
  ville: string;
  codePostal: string;
  surface?: number;
  pieces?: number;
  /** 1re phrase = description claire et autosuffisante (LLM-ready). */
  description: string;
  atouts: string[];
  /** €/an */
  taxeFonciere?: number;
  /** €/an */
  chargesCopro?: number;
  photos: ListingPhoto[];
  contact: { nom: string; agence: string; telephone: string; email: string };
  /** SEO propre à la page du bien. */
  seo: { title: string; description: string; h1: string };
  publishedAt: string; // ISO
};

export const TYPE_LABEL: Record<ListingType, string> = {
  garage: "Garage",
  parking: "Parking",
  appartement: "Appartement",
  maison: "Maison",
  local: "Local commercial",
  terrain: "Terrain",
  immeuble: "Immeuble",
};

export const STATUT_LABEL: Record<ListingStatut, string> = {
  disponible: "Disponible",
  vendu: "Vendu",
  loue: "Loué",
};

const CONTACT_TONY = {
  nom: "Tony Pistilli",
  agence: "Markus Immobilier",
  telephone: "06 81 78 77 40",
  email: "villeurbanne@markusimmobilier.fr",
};

export const LISTINGS: Listing[] = [
  {
    id: "garage-villeurbanne-laurent-bonnevay",
    slug: "garage-a-vendre-villeurbanne-laurent-bonnevay",
    titre: "Garage fermé en sous-sol — Villeurbanne (Laurent Bonnevay)",
    type: "garage",
    transaction: "vente",
    statut: "disponible",
    prix: 21000,
    adresse: "5 rue Bernard Lecache",
    quartier: "Laurent Bonnevay",
    ville: "Villeurbanne",
    codePostal: "69100",
    localisationTexte:
      "à deux pas du métro Laurent Bonnevay (ligne A). Secteur très bien desservi : transports, commerces et accès rapide au périphérique.",
    description:
      "Ce garage fermé en sous-sol à vendre à Villeurbanne, à deux pas du métro Laurent Bonnevay (ligne A), est proposé à 21 000 €. Idéalement situé dans un secteur recherché et très bien desservi, il convient aussi bien à un usage personnel (stationnement, stockage) qu'à un investissement locatif, dans une zone où la demande de stationnement est forte.",
    atouts: [
      "Accès sécurisé par portail avec badge",
      "Électricité dans le garage",
      "Résidence en copropriété bien tenue",
      "Proximité immédiate transports, commerces et périphérique",
    ],
    taxeFonciere: 94,
    chargesCopro: 120,
    photos: [
      {
        src: "/annonces/garage-villeurbanne-laurent-bonnevay/garage-ferme-villeurbanne-porte-ouverte.jpeg",
        alt: "Garage fermé à vendre à Villeurbanne près de Laurent Bonnevay, porte basculante ouverte",
      },
      {
        src: "/annonces/garage-villeurbanne-laurent-bonnevay/garage-ferme-villeurbanne-interieur.jpeg",
        alt: "Intérieur du box en sous-sol à vendre à Villeurbanne, éclairage et électricité",
      },
      {
        src: "/annonces/garage-villeurbanne-laurent-bonnevay/residence-acces-parking-souterrain-villeurbanne.jpeg",
        alt: "Résidence et rampe d'accès au parking souterrain à Villeurbanne, quartier Laurent Bonnevay",
      },
    ],
    contact: CONTACT_TONY,
    seo: {
      title:
        "Garage fermé à vendre à Villeurbanne (Laurent Bonnevay) – 21 000 € | Markus Immobilier",
      description:
        "Garage fermé en sous-sol à vendre à Villeurbanne, proche métro Laurent Bonnevay (ligne A). Accès sécurisé par badge, électricité. 21 000 €.",
      h1: "Garage fermé à vendre – Villeurbanne (Laurent Bonnevay)",
    },
    publishedAt: "2026-07-20",
  },
  {
    id: "garage-location-villeurbanne-laurent-bonnevay",
    slug: "garage-a-louer-villeurbanne-laurent-bonnevay",
    titre: "Garage fermé en sous-sol à louer — Villeurbanne (Laurent Bonnevay)",
    type: "garage",
    transaction: "location",
    statut: "disponible",
    prix: 100,
    prixSuffixe: "/mois CC",
    loyerHorsCharges: 90,
    chargesMensuelles: 10,
    disponibilite: "Disponible rapidement",
    adresse: "5 rue Bernard Lecache",
    quartier: "Laurent Bonnevay",
    ville: "Villeurbanne",
    codePostal: "69100",
    localisationTexte:
      "à deux pas du métro Laurent Bonnevay (ligne A). Secteur très bien desservi : transports, commerces et accès rapide au périphérique.",
    description:
      "Ce garage fermé en sous-sol à louer à Villeurbanne, à deux pas du métro Laurent Bonnevay (ligne A), est proposé à 100 €/mois charges comprises (90 € hors charges + 10 € de charges). Idéalement situé et très bien desservi, il est pratique pour stationner un véhicule ou pour du stockage, dans un secteur où la demande de stationnement est forte.",
    atouts: [
      "Électricité dans le garage",
      "Accès copropriété entièrement sécurisé par portail à badge",
      "Proximité immédiate métro, commerces et périphérique",
      "Disponible rapidement",
    ],
    photos: [
      {
        src: "/annonces/garage-a-louer-villeurbanne-laurent-bonnevay/garage-a-louer-villeurbanne-interieur-porte-ouverte.jpeg",
        alt: "Garage fermé à louer à Villeurbanne près de Laurent Bonnevay, porte basculante ouverte et éclairage",
      },
      {
        src: "/annonces/garage-a-louer-villeurbanne-laurent-bonnevay/garage-a-louer-villeurbanne-allee-sous-sol.jpeg",
        alt: "Garage fermé à louer à Villeurbanne près de Laurent Bonnevay, allée du parking en sous-sol",
      },
      {
        src: "/annonces/garage-a-louer-villeurbanne-laurent-bonnevay/garage-a-louer-villeurbanne-portail-acces-securise.jpeg",
        alt: "Garage fermé à louer à Villeurbanne près de Laurent Bonnevay, portail d'accès sécurisé de la copropriété",
      },
    ],
    contact: CONTACT_TONY,
    seo: {
      title:
        "Garage fermé à louer à Villeurbanne (Laurent Bonnevay) – 100 €/mois | Markus Immobilier",
      description:
        "Garage fermé sécurisé à louer à Villeurbanne, proche métro Laurent Bonnevay (ligne A). Électricité, accès par badge. 100 €/mois charges comprises.",
      h1: "Garage fermé à louer – Villeurbanne (Laurent Bonnevay)",
    },
    publishedAt: "2026-07-20",
  },
];

/* ───────── Helpers ───────── */

export const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " €";

export function getListing(slug: string): Listing | undefined {
  return LISTINGS.find((l) => l.slug === slug);
}

export function getListingsByStatut(statut: ListingStatut): Listing[] {
  return LISTINGS.filter((l) => l.statut === statut);
}

/** Biens disponibles, du plus récent au plus ancien (home + hub). */
export function getAvailableListings(): Listing[] {
  return getListingsByStatut("disponible").sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}

/** Libellé court du bandeau : « À vendre » / « À louer ». */
export function transactionLabel(l: Listing): string {
  return l.transaction === "location" ? "À louer" : "À vendre";
}
