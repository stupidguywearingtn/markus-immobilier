import type { Property } from "@/components/property/property-card";

/**
 * Extended mock — 10 biens variés (à remplacer par data réelle).
 * Champs supplémentaires (etage, dpe, description) utilisés sur la fiche détail.
 */
export type PropertyExtended = Property & {
  etage?: number | string;
  dpe?: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  description: string;
  features: string[];
};

export const PROPERTIES: PropertyExtended[] = [
  {
    id: "villeurbanne-gratte-ciel-3p",
    price: "425 000 €",
    location: "Villeurbanne, Gratte-Ciel",
    title: "Appartement haussmannien lumineux",
    rooms: 3,
    surface: 72,
    kind: "vente",
    etage: 3,
    dpe: "C",
    photos: [
      { caption: "Photo 1 — Salon", variant: "light" },
      { caption: "Photo 2 — Cuisine", variant: "warm" },
      { caption: "Photo 3 — Chambre", variant: "cool" },
    ],
    description:
      "Au cœur du quartier emblématique des Gratte-Ciel, un appartement haussmannien de caractère, baigné de lumière naturelle. Volumes généreux, hauteur sous plafond 2.90m, parquet point de Hongrie d'origine. Cuisine entièrement rénovée et ouverte sur le séjour. Idéal premier achat ou investissement locatif.",
    features: [
      "Hauteur sous plafond 2.90m",
      "Parquet d'origine",
      "Cuisine équipée 2023",
      "Double exposition",
      "Cave en sous-sol",
    ],
  },
  {
    id: "villeurbanne-charpennes-maison",
    price: "695 000 €",
    location: "Villeurbanne, Charpennes",
    title: "Maison contemporaine avec jardin",
    rooms: 5,
    surface: 145,
    kind: "vente",
    etage: "Maison",
    dpe: "B",
    photos: [
      { caption: "Photo 1 — Façade", variant: "airy" },
      { caption: "Photo 2 — Jardin", variant: "cool" },
      { caption: "Photo 3 — Séjour", variant: "pale" },
    ],
    description:
      "Maison d'architecte contemporaine livrée en 2019, dans une rue calme à 5 min des Charpennes. Jardin paysager 180m², terrasse plein sud, garage 2 voitures. Prestations haut de gamme : domotique, plancher chauffant, baies vitrées coulissantes.",
    features: [
      "Jardin 180m²",
      "Terrasse plein sud",
      "Garage 2 voitures",
      "Domotique intégrée",
      "Plancher chauffant",
    ],
  },
  {
    id: "lyon-3-part-dieu-t2",
    price: "1 250 €",
    priceSuffix: "/ mois",
    location: "Lyon 3e, Part-Dieu",
    title: "T2 lumineux refait à neuf",
    rooms: 2,
    surface: 44,
    kind: "location",
    etage: 5,
    dpe: "C",
    photos: [
      { caption: "Photo 1 — Pièce de vie", variant: "airy" },
      { caption: "Photo 2 — Cuisine", variant: "warm" },
      { caption: "Photo 3 — Terrasse", variant: "pale" },
    ],
    description:
      "T2 entièrement refait à neuf en 2024 au 5e étage avec ascenseur, à 2 min de la Part-Dieu. Loyer charges comprises (chauffage collectif inclus). Disponible immédiatement.",
    features: [
      "Refait à neuf 2024",
      "5e avec ascenseur",
      "Chauffage collectif",
      "Charges comprises",
    ],
  },
  {
    id: "lyon-6-foch-t4",
    price: "780 000 €",
    location: "Lyon 6e, Foch",
    title: "T4 d'exception, balcon filant",
    rooms: 4,
    surface: 105,
    kind: "vente",
    etage: 4,
    dpe: "B",
    photos: [
      { caption: "Photo 1 — Salon double", variant: "light" },
      { caption: "Photo 2 — Suite parentale", variant: "warm" },
      { caption: "Photo 3 — Balcon", variant: "airy" },
    ],
    description:
      "Adresse prestigieuse avenue Foch : T4 traversant avec balcon filant Est/Ouest, vue dégagée. Trois chambres dont une suite parentale. Place de parking en sous-sol.",
    features: [
      "Balcon filant 14m²",
      "Traversant Est/Ouest",
      "Suite parentale",
      "Parking sous-sol",
      "Cave",
    ],
  },
  {
    id: "villeurbanne-cusset-studio",
    price: "650 €",
    priceSuffix: "/ mois",
    location: "Villeurbanne, Cusset",
    title: "Studio meublé tout équipé",
    rooms: 1,
    surface: 22,
    kind: "location",
    etage: 2,
    dpe: "D",
    photos: [
      { caption: "Photo 1 — Vue d'ensemble", variant: "warm" },
      { caption: "Photo 2 — Kitchenette", variant: "cool" },
    ],
    description:
      "Studio meublé entièrement équipé, parfait pour étudiant ou jeune actif. Métro Cusset à 3 min à pied. Bail mobilité ou meublé étudiant.",
    features: ["Entièrement meublé", "Kitchenette équipée", "Bail mobilité possible"],
  },
  {
    id: "lyon-2-bellecour-loft",
    price: "1 250 000 €",
    location: "Lyon 2e, Bellecour",
    title: "Loft d'exception sur Bellecour",
    rooms: 5,
    surface: 195,
    kind: "vente",
    etage: 6,
    dpe: "C",
    photos: [
      { caption: "Photo 1 — Loft", variant: "pale" },
      { caption: "Photo 2 — Cuisine îlot", variant: "airy" },
      { caption: "Photo 3 — Vue Bellecour", variant: "warm" },
    ],
    description:
      "Loft de 195m² au dernier étage avec vue panoramique sur la place Bellecour. Volumes XXL, double hauteur partielle, terrasse 30m². Bien d'exception très rare sur le marché.",
    features: [
      "Vue Bellecour",
      "Terrasse 30m²",
      "Double hauteur",
      "Dernier étage",
      "Service de conciergerie",
    ],
  },
  {
    id: "villeurbanne-tonkin-t3",
    price: "1 450 €",
    priceSuffix: "/ mois",
    location: "Villeurbanne, Tonkin",
    title: "T3 familial avec balcon",
    rooms: 3,
    surface: 68,
    kind: "location",
    etage: 4,
    dpe: "C",
    photos: [
      { caption: "Photo 1 — Séjour", variant: "light" },
      { caption: "Photo 2 — Chambre", variant: "pale" },
      { caption: "Photo 3 — Balcon", variant: "cool" },
    ],
    description:
      "T3 lumineux dans résidence sécurisée du Tonkin, balcon 6m². Proche INSA et Doua. Cave et parking inclus.",
    features: ["Résidence sécurisée", "Balcon 6m²", "Cave", "Parking inclus"],
  },
  {
    id: "lyon-7-jean-mace-t2",
    price: "295 000 €",
    location: "Lyon 7e, Jean Macé",
    title: "T2 d'investisseur, idéal locatif",
    rooms: 2,
    surface: 41,
    kind: "vente",
    etage: 2,
    dpe: "D",
    photos: [
      { caption: "Photo 1 — Séjour", variant: "warm" },
      { caption: "Photo 2 — Cuisine", variant: "light" },
    ],
    description:
      "T2 dans copropriété ravalée, secteur Jean Macé très demandé en location. Loué actuellement 720€/mois, rendement brut 2.9%.",
    features: ["Loué 720€/mois", "Copropriété ravalée 2022", "Métro à 4 min"],
  },
  {
    id: "ecully-villa-famille",
    price: "1 180 000 €",
    location: "Écully, centre",
    title: "Villa familiale 6 pièces piscine",
    rooms: 6,
    surface: 220,
    kind: "vente",
    etage: "Maison",
    dpe: "B",
    photos: [
      { caption: "Photo 1 — Façade", variant: "airy" },
      { caption: "Photo 2 — Piscine", variant: "cool" },
      { caption: "Photo 3 — Cuisine", variant: "pale" },
    ],
    description:
      "Villa des années 2000 entièrement rénovée, sur terrain clos arboré de 1200m² avec piscine chauffée. 4 chambres, 2 salles de bain, bureau, double garage.",
    features: [
      "Terrain 1200m²",
      "Piscine chauffée",
      "4 chambres + bureau",
      "Double garage",
      "Quartier résidentiel",
    ],
  },
  {
    id: "lyon-3-montchat-maison",
    price: "1 850 €",
    priceSuffix: "/ mois",
    location: "Lyon 3e, Montchat",
    title: "Maison de village 4 pièces",
    rooms: 4,
    surface: 110,
    kind: "location",
    etage: "Maison",
    dpe: "C",
    photos: [
      { caption: "Photo 1 — Façade", variant: "light" },
      { caption: "Photo 2 — Cour", variant: "warm" },
      { caption: "Photo 3 — Mezzanine", variant: "pale" },
    ],
    description:
      "Maison de ville charmante avec cour pavée 25m², esprit village au cœur de Montchat. 3 chambres, bureau, mezzanine. Idéale famille.",
    features: ["Cour 25m²", "3 chambres + bureau", "Quartier village", "Esprit charme"],
  },
];

// Compatibilité avec l'ancien import (utilisé sur la home)
export const featuredProperties = PROPERTIES.slice(0, 3);
