import type { Data } from "@puckeditor/core";
import { DEFINITIONS, HOME_ORDER } from "./definitions";

/**
 * Points de départ d'une page. Chaque section démarre avec son contenu par
 * défaut (textes Markus réalistes), que le client n'a plus qu'à ajuster.
 */

function uid(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function block(type: keyof typeof DEFINITIONS, overrides: Record<string, unknown> = {}) {
  return {
    type,
    props: { ...(DEFINITIONS[type].defaultProps ?? {}), ...overrides, id: `${type}-${uid()}` },
  };
}

function page(types: (keyof typeof DEFINITIONS)[], title = ""): Data {
  return {
    root: { props: { title, description: "", indexer: "oui" } },
    content: types.map((t) => block(t)),
    zones: {},
  } as Data;
}

/** L'accueil tel qu'il est en ligne aujourd'hui (ordre de la trame client). */
export function homeData(): Data {
  return page([...HOME_ORDER]);
}

export const TEMPLATES: { key: string; label: string; description: string; build: (titre: string) => Data }[] = [
  {
    key: "service",
    label: "Page service",
    description: "Grand titre, présentation, déroulé en étapes, appel à l'action.",
    build: (t) => page(["Bandeau", "TexteImage", "Etapes", "Chiffres", "AppelAction"], t),
  },
  {
    key: "landing",
    label: "Page de campagne",
    description: "Pour une offre ou une pub : atouts, preuves, FAQ et formulaire.",
    build: (t) => page(["Bandeau", "Cartes", "Citation", "Faq", "ContactFormulaire"], t),
  },
  {
    key: "article",
    label: "Page de texte",
    description: "Titre + texte libre, pour une page d'information.",
    build: (t) => page(["Bandeau", "TexteLibre", "AppelAction"], t),
  },
  {
    key: "vide",
    label: "Page vide",
    description: "Vous ajoutez les sections vous-même.",
    build: (t) => page([], t),
  },
];
