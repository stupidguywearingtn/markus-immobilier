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
export type DpeLettre = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type ListingPhoto = {
  /** Chemin public, ex. /annonces/<slug>/photo.jpeg */
  src: string;
  /** Alt descriptif et localisé (SEO images). */
  alt: string;
  /** Vue d'illustration (projection après rénovation) — badge « Projection » affiché. */
  isProjection?: boolean;
};

/** Paire avant/après pour un bien vendu « à rénover » — vue d'illustration. */
export type AvantApresPair = {
  label: string;
  avant: ListingPhoto;
  apres: ListingPhoto;
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
  /** Mention légale sous le prix, ex. « Honoraires d'agence inclus… ». */
  prixMention?: string;
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
  /** Ex. "Rez-de-chaussée", "3e étage". */
  etage?: string;
  /** Diagnostic de performance énergétique (A→G). */
  dpe?: DpeLettre;
  /** Émissions de gaz à effet de serre (A→G). */
  ges?: DpeLettre;
  /** Composition détaillée, ex. ["Séjour + cuisine équipée", "2 chambres"]. */
  composition?: string[];
  /** Mis en avant en 1er sur l'accueil et le hub. */
  miseEnAvant?: boolean;
  /** 1re phrase = description claire et autosuffisante (LLM-ready). */
  description: string;
  atouts: string[];
  /** €/an */
  taxeFonciere?: number;
  /** €/an */
  chargesCopro?: number;
  photos: ListingPhoto[];
  /** Bien « à rénover » : paires avant (état réel) / après (projection). */
  avantApres?: AvantApresPair[];
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
    id: "appartement-t3-villeurbanne-grand-clement",
    slug: "appartement-t3-vendre-villeurbanne-grand-clement",
    titre: "Appartement T3 avec terrasse et jardin — Villeurbanne (Grand Clément)",
    type: "appartement",
    transaction: "vente",
    statut: "disponible",
    miseEnAvant: true,
    prix: 279000,
    prixMention: "Honoraires d'agence inclus · frais de notaire en sus",
    disponibilite: "Libre en avril 2027",
    adresse: "4 rue Paul Kruger",
    quartier: "Grand Clément",
    ville: "Villeurbanne",
    codePostal: "69100",
    surface: 58.67,
    pieces: 3,
    etage: "Rez-de-chaussée",
    dpe: "B",
    ges: "C",
    composition: [
      "Séjour avec cuisine intégrée et équipée",
      "2 chambres",
      "Salle de bains avec baignoire",
      "WC séparé",
      "Terrasse de 10 m² et jardin privatif de 30 m²",
      "Place de parking couverte incluse",
    ],
    localisationTexte:
      "un quartier vivant et bien équipé, à proximité immédiate des commerces, des écoles et du tramway qui rejoint Lyon en quelques minutes. Accès rapide aux grands axes.",
    description:
      "Cet appartement T3 de 58,67 m² à vendre à Villeurbanne, dans le quartier Grand Clément, est proposé à 279 000 €. Charmant rez-de-chaussée dans une résidence agréable, il offre une pièce de vie lumineuse avec cuisine intégrée et équipée, deux chambres, une salle de bains avec baignoire et un WC séparé.\n\nSes espaces extérieurs sont rares sur le secteur : une terrasse de 10 m², un jardin privatif de 30 m² et une jardinière végétalisée d'environ 30 m². Une place de parking couverte est incluse. Chauffage individuel au gaz, interphone, et un excellent DPE B qui limite les charges d'énergie.\n\nIdéal pour un premier achat, une résidence principale ou un investissement. Le bien est vendu libre de toute occupation : un congé pour vente est en cours, l'appartement sera disponible en avril 2027.",
    atouts: [
      "Terrasse de 10 m² et jardin privatif de 30 m²",
      "Place de parking couverte incluse",
      "Cuisine intégrée et équipée",
      "DPE B — excellente performance énergétique",
      "Chauffage individuel au gaz",
      "Interphone",
      "Commerces, écoles et tramway vers Lyon à proximité",
      "Vendu libre de toute occupation",
    ],
    photos: [
      {
        src: "/annonces/appartement-t3-vendre-villeurbanne-grand-clement/appartement-t3-villeurbanne-grand-clement-residence-jardin.jpeg",
        alt: "Résidence de l'appartement T3 à vendre à Villeurbanne Grand Clément",
      },
      {
        src: "/annonces/appartement-t3-vendre-villeurbanne-grand-clement/appartement-t3-villeurbanne-grand-clement-hall-entree.jpeg",
        alt: "Hall d'entrée de la résidence – T3 Villeurbanne",
      },
    ],
    contact: CONTACT_TONY,
    seo: {
      title:
        "Appartement T3 58 m² avec terrasse et jardin à vendre – Villeurbanne Grand Clément – 279 000 € | Markus Immobilier",
      description:
        "T3 de 58 m² en rez-de-chaussée à vendre à Villeurbanne (Grand Clément) : terrasse, jardin privatif, parking couvert. DPE B. 279 000 €. Libre avril 2027.",
      h1: "Appartement T3 avec terrasse et jardin – Villeurbanne (Grand Clément)",
    },
    publishedAt: "2026-07-20",
  },
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
  {
    id: "studio-villeurbanne-tolstoi",
    slug: "studio-a-vendre-villeurbanne-tolstoi",
    titre: "Studio à rénover — Villeurbanne (Tolstoï)",
    type: "appartement",
    transaction: "vente",
    statut: "disponible",
    prix: 109000,
    prixMention: "Honoraires d'agence inclus · honoraires à la charge du vendeur",
    disponibilite: "Libre de suite",
    adresse: "Résidence Le Lafayette II",
    quartier: "Tolstoï",
    ville: "Villeurbanne",
    codePostal: "69100",
    surface: 33.21,
    pieces: 1,
    etage: "Rez-de-chaussée",
    dpe: "E",
    ges: "E",
    composition: [
      "Pièce de vie spacieuse et facilement aménageable",
      "Coin cuisine ouvert, possibilité coin repas",
      "Salle d'eau avec WC",
      "Grand placard mural",
      "Cave privative en sous-sol incluse",
    ],
    localisationTexte:
      "un emplacement recherché en cœur de Villeurbanne, à proximité immédiate des commerces, des écoles et des services. Transports en commun accessibles à pied vers Lyon, accès rapide aux grands axes.",
    description:
      "Studio de 33,21 m² à vendre à Villeurbanne, au rez-de-chaussée de la résidence Le Lafayette II (quartier Tolstoï), entièrement à rénover, proposé à 109 000 €. Il se compose d'une pièce de vie spacieuse et facilement aménageable, d'un coin cuisine ouvert permettant d'installer un coin repas, d'une salle d'eau avec WC et d'un grand placard mural. Une cave privative en sous-sol est incluse dans la vente.\n\nLe bien est à rénover intégralement : sols, murs, cuisine et salle d'eau sont à reprendre. C'est l'occasion de repenser entièrement la distribution et les prestations, pour un studio remis au goût du jour et immédiatement locatif.\n\nExposition Est, accès de plain-pied sans marche ni escalier. Immeuble de bon standing avec ascenseur et interphone, dans un secteur calme et résidentiel. Chauffage collectif. Emplacement recherché en cœur de Villeurbanne, avec une demande locative constante portée par les étudiants, les jeunes actifs et les seniors.\n\nIdéal pour un investisseur : petite surface, forte rotation locative, DPE classé E permettant la location sans restriction jusqu'en 2034. Bien libre de toute occupation.",
    atouts: [
      "À rénover intégralement — potentiel de valorisation",
      "Cave privative en sous-sol incluse",
      "Exposition Est, accès de plain-pied",
      "Immeuble avec ascenseur et interphone",
      "Chauffage collectif",
      "Secteur calme et résidentiel, cœur de Villeurbanne",
      "Forte demande locative (étudiants, jeunes actifs, seniors)",
      "DPE E — location sans restriction jusqu'en 2034",
      "Vendu libre de toute occupation",
    ],
    taxeFonciere: 756,
    chargesCopro: 1290,
    photos: [
      {
        src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-projection-sejour.jpeg",
        alt: "Projection de la pièce de vie après rénovation — studio à vendre à Villeurbanne Tolstoï (vue d'illustration, non contractuelle)",
        isProjection: true,
      },
      {
        src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-piece-de-vie.jpeg",
        alt: "Pièce de vie du studio à vendre à Villeurbanne, quartier Tolstoï, à rénover",
      },
      {
        src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-jardin-residence.jpeg",
        alt: "Jardin et espace vert de la résidence Le Lafayette II à Villeurbanne",
      },
      {
        src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-piece-de-vie-2.jpeg",
        alt: "Pièce de vie du studio à vendre à Villeurbanne Tolstoï, second angle",
      },
      {
        src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-cuisine.jpeg",
        alt: "Coin cuisine du studio à vendre à Villeurbanne, quartier Tolstoï",
      },
      {
        src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-hall-entree.jpeg",
        alt: "Hall d'entrée de la résidence Le Lafayette II à Villeurbanne",
      },
      {
        src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-salle-eau.jpeg",
        alt: "Salle d'eau à rénover du studio à vendre à Villeurbanne Tolstoï",
      },
    ],
    avantApres: [
      {
        label: "Pièce de vie",
        avant: {
          src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-piece-de-vie.jpeg",
          alt: "Pièce de vie du studio à Villeurbanne Tolstoï avant rénovation",
        },
        apres: {
          src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-projection-sejour.jpeg",
          alt: "Projection de la pièce de vie du studio à Villeurbanne Tolstoï après rénovation",
        },
      },
      {
        label: "Pièce de vie — coin bureau",
        avant: {
          src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-piece-de-vie-2.jpeg",
          alt: "Second angle de la pièce de vie du studio à Villeurbanne Tolstoï avant rénovation",
        },
        apres: {
          src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-projection-sejour-2.jpeg",
          alt: "Projection de la pièce de vie du studio à Villeurbanne Tolstoï après rénovation, coin bureau",
        },
      },
      {
        label: "Cuisine",
        avant: {
          src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-cuisine.jpeg",
          alt: "Coin cuisine du studio à Villeurbanne Tolstoï avant rénovation",
        },
        apres: {
          src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-projection-cuisine.jpeg",
          alt: "Projection du coin cuisine du studio à Villeurbanne Tolstoï après rénovation",
        },
      },
      {
        label: "Salle d'eau",
        avant: {
          src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-salle-eau.jpeg",
          alt: "Salle d'eau du studio à Villeurbanne Tolstoï avant rénovation",
        },
        apres: {
          src: "/annonces/studio-a-vendre-villeurbanne-tolstoi/studio-tolstoi-villeurbanne-projection-salle-eau.jpeg",
          alt: "Projection de la salle d'eau du studio à Villeurbanne Tolstoï après rénovation",
        },
      },
    ],
    contact: CONTACT_TONY,
    seo: {
      title:
        "Studio 33 m² à rénover à vendre – Villeurbanne Tolstoï – 109 000 € | Markus Immobilier",
      description:
        "Studio de 33 m² à rénover à vendre à Villeurbanne (Tolstoï), rez-de-chaussée avec cave. Fort potentiel locatif, DPE E valable jusqu'en 2034. 109 000 €.",
      h1: "Studio à rénover – Villeurbanne (Tolstoï)",
    },
    publishedAt: "2026-08-17",
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

/** Surface formatée FR : 58.67 → « 58,67 m² », 30 → « 30 m² ». */
export const surfaceLabel = (m2: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(m2) + " m²";

/**
 * Biens disponibles : mis en avant d'abord, puis du plus récent au plus ancien
 * (accueil + hub). `miseEnAvant` permet de pousser le bien le plus vendeur.
 */
export function getAvailableListings(): Listing[] {
  return getListingsByStatut("disponible").sort((a, b) => {
    if (!!a.miseEnAvant !== !!b.miseEnAvant) return a.miseEnAvant ? -1 : 1;
    return a.publishedAt < b.publishedAt ? 1 : -1;
  });
}

/** Libellé court du bandeau : « À vendre » / « À louer ». */
export function transactionLabel(l: Listing): string {
  return l.transaction === "location" ? "À louer" : "À vendre";
}
