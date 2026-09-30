import type { ComponentType } from "react";
import type { ComponentConfig, Config, Field, Fields } from "@puckeditor/core";
import { ImageField } from "@/components/page-builder/image-field";
import { ICONES } from "@/components/page-builder/blocks";

/**
 * DÉFINITIONS PARTAGÉES de l'éditeur de pages : pour chaque section, son nom
 * affiché, ses champs et son contenu de départ. AUCUN rendu ici.
 *
 * Deux configurations s'appuient dessus :
 *   - lib/page-builder/config.client.tsx → l'éditeur (navigateur)
 *   - lib/page-builder/config.server.tsx → le site public (rendu serveur, SEO)
 * Garder les champs à un seul endroit garantit que ce que le client édite est
 * exactement ce que le site affiche.
 *
 * Règle de charte : on n'expose JAMAIS de couleur, de police ou de taille
 * libre. Le client choisit parmi des variantes déjà validées.
 */

// ── Champs réutilisables ────────────────────────────────────────────────────

const txt = (label: string, placeholder?: string): Field => ({ type: "text", label, placeholder, contentEditable: true });
const area = (label: string, placeholder?: string): Field => ({ type: "textarea", label, placeholder, contentEditable: true });
/** Texte simple, NON éditable dans l'aperçu (liens, textes alternatifs…). */
const plain = (label: string, placeholder?: string): Field => ({ type: "text", label, placeholder });

const rich = (label: string): Field => ({
  type: "richtext",
  label,
  contentEditable: true,
  options: {
    // Uniquement ce qui a du sens dans la charte : paragraphes, gras,
    // italique, listes, liens, intertitres H3. Pas de code, pas de citation,
    // pas d'alignement libre.
    heading: { levels: [3] },
    code: false,
    codeBlock: false,
    blockquote: false,
    horizontalRule: false,
    strike: false,
    textAlign: false,
  },
});

export const imageField = (label = "Image"): Field => ({
  type: "custom",
  label,
  render: ({ value, onChange, readOnly }) => (
    <ImageField value={value as string | undefined} onChange={onChange} readOnly={readOnly} />
  ),
});

const fond = (): Field => ({
  type: "radio",
  label: "Fond",
  options: [
    { label: "Blanc", value: "blanc" },
    { label: "Gris clair", value: "gris" },
    { label: "Anthracite", value: "anthracite" },
  ],
});

const espacement: Field = {
  type: "select",
  label: "Espace en haut et en bas",
  options: [
    { label: "Normal", value: "normal" },
    { label: "Réduit", value: "compact" },
  ],
};

const alignement: Field = {
  type: "radio",
  label: "Alignement",
  options: [
    { label: "À gauche", value: "gauche" },
    { label: "Centré", value: "centre" },
  ],
};

const ancre: Field = {
  type: "text",
  label: "Ancre (optionnel)",
  placeholder: "ex. services → lien #services",
};

const bouton = (label: string): Field => ({
  type: "object",
  label,
  objectFields: {
    label: { type: "text", label: "Texte du bouton", placeholder: "Estimer mon bien" },
    lien: { type: "text", label: "Lien", placeholder: "/estimation, tel:0478371367, https://…" },
    style: {
      type: "select",
      label: "Style",
      options: [
        { label: "Anthracite (principal)", value: "primary" },
        { label: "Sauge (accent)", value: "sauge" },
        { label: "Contour", value: "outline" },
        { label: "Contour blanc (sur fond sombre)", value: "ghost" },
        { label: "Mise en avant", value: "cta" },
      ],
    },
  },
});

const head = {
  eyebrow: txt("Sur-titre (petites majuscules)", "À propos"),
  titre: txt("Titre", "Notre accompagnement"),
  titreAccent: txt("Fin du titre en dégradé (optionnel)", "sur-mesure."),
};

/** Champ « information » : explique au client où se modifie une section maison. */
const info = (texte: string, lien?: { href: string; label: string }): Field => ({
  type: "custom",
  label: "Comment modifier cette section",
  render: () => (
    <div className="pbf-info">
      <p>{texte}</p>
      {lien && (
        <a href={lien.href} target="_blank" rel="noreferrer">
          {lien.label} ↗
        </a>
      )}
    </div>
  ),
});

// ── Catégories du panneau « Ajouter une section » ───────────────────────────

export const CATEGORIES = {
  maison: {
    title: "Sections Markus",
    components: [
      "MaisonHero",
      "MaisonBiens",
      "MaisonAPropos",
      "MaisonEquipe",
      "MaisonVendus",
      "MaisonEstimation",
      "MaisonAvis",
      "MaisonFaq",
      "MaisonReseaux",
      "MaisonAgence",
    ],
  },
  ouverture: { title: "Titres & ouverture", components: ["Bandeau", "TitreSection"] },
  contenu: {
    title: "Contenu",
    components: ["TexteImage", "TexteLibre", "Cartes", "Etapes", "Chiffres", "Faq", "Citation"],
  },
  medias: { title: "Photos & vidéo", components: ["ImagePleine", "Galerie", "Video"] },
  conversion: { title: "Contact & action", components: ["AppelAction", "ContactFormulaire"] },
  miseEnPage: { title: "Mise en page", components: ["Espace"] },
};

// ── Réglages de la page (panneau « Page ») ──────────────────────────────────

export const ROOT_FIELDS: Fields = {
  title: { type: "text", label: "Titre Google (onglet du navigateur)" },
  description: { type: "textarea", label: "Description Google (150 caractères env.)" },
  indexer: {
    type: "radio",
    label: "Visible sur Google",
    options: [
      { label: "Oui", value: "oui" },
      { label: "Non (page cachée)", value: "non" },
    ],
  },
};

// ── Définitions des sections ────────────────────────────────────────────────

type Def = {
  label: string;
  fields: Fields;
  defaultProps?: Record<string, unknown>;
  /** Une seule occurrence par page (sections maison avec ancres/JSON-LD). */
  unique?: boolean;
};

const MAISON = (label: string, texte: string, lien?: { href: string; label: string }): Def => ({
  label,
  unique: true,
  fields: { info: info(texte, lien) },
});

export const DEFINITIONS: Record<string, Def> = {
  // ── Sections maison (celles qui sont déjà sur le site) ───────────────────
  MaisonHero: MAISON(
    "Hero vidéo + logo",
    "Le texte du hero se modifie directement sur le site : connectez-vous, activez le mode édition (bouton crayon) et cliquez sur le texte.",
  ),
  MaisonBiens: MAISON("Nos biens disponibles", "Les biens affichés viennent de vos annonces.", {
    href: "/admin/annonces",
    label: "Gérer les annonces",
  }),
  MaisonAPropos: MAISON(
    "Qui sommes-nous (vidéo)",
    "Titre, texte et photo se modifient directement sur le site en mode édition (bouton crayon).",
  ),
  MaisonEquipe: MAISON("Notre équipe", "Les collaborateurs se gèrent dans l'onglet Équipe.", {
    href: "/admin/equipe",
    label: "Gérer l'équipe",
  }),
  MaisonVendus: MAISON("Nos biens vendus (parallaxe)", "Les photos se gèrent dans l'onglet Biens vendus.", {
    href: "/admin/vendus",
    label: "Gérer les biens vendus",
  }),
  MaisonEstimation: MAISON(
    "Outil d'estimation (accroche)",
    "Section d'accroche vers l'outil d'estimation. L'outil lui-même est protégé et ne se modifie pas ici.",
  ),
  MaisonAvis: MAISON("Avis clients", "Les avis se gèrent dans l'onglet Avis clients.", {
    href: "/admin/avis",
    label: "Gérer les avis",
  }),
  MaisonFaq: MAISON(
    "FAQ de l'accueil",
    "Questions de l'accueil, optimisées pour Google et les IA. Pour une FAQ libre, ajoutez plutôt la section « Questions fréquentes ».",
  ),
  MaisonReseaux: MAISON("Suivez-nous (réseaux + Discord)", "Liens vers les réseaux sociaux officiels de l'agence."),
  MaisonAgence: MAISON("Notre agence (horaires + carte)", "Adresse, horaires et carte de l'agence."),

  // ── Sections libres ──────────────────────────────────────────────────────
  Bandeau: {
    label: "Bandeau d'ouverture (grand titre)",
    fields: {
      ...head,
      intro: area("Texte d'introduction"),
      image: imageField("Photo de fond"),
      imageAlt: plain("Description de la photo (pour Google)"),
      hauteur: {
        type: "radio",
        label: "Hauteur",
        options: [
          { label: "Moyenne", value: "moyenne" },
          { label: "Grande", value: "grande" },
        ],
      },
      alignement,
      bouton1: bouton("Bouton principal"),
      bouton2: bouton("Bouton secondaire"),
    },
    defaultProps: {
      eyebrow: "Markus Immobilier",
      titre: "Votre projet immobilier,",
      titreAccent: "entre de bonnes mains.",
      intro: "Une agence indépendante à Villeurbanne, à vos côtés de l'estimation à la signature.",
      image: "/agence-markus-villeurbanne.jpg",
      imageAlt: "Agence Markus Immobilier à Villeurbanne",
      hauteur: "moyenne",
      alignement: "gauche",
      bouton1: { label: "Estimer mon bien", lien: "/estimation", style: "cta" },
      bouton2: { label: "Nous contacter", lien: "/contact", style: "ghost" },
    },
  },

  TitreSection: {
    label: "Titre de section",
    fields: { ...head, intro: area("Texte sous le titre"), alignement, fond: fond(), espacement, ancre },
    defaultProps: {
      eyebrow: "Nos services",
      titre: "Ce que nous faisons",
      titreAccent: "pour vous.",
      intro: "",
      alignement: "gauche",
      fond: "blanc",
      espacement: "compact",
    },
  },

  TexteImage: {
    label: "Texte + photo",
    fields: {
      ...head,
      texte: rich("Texte"),
      image: imageField("Photo"),
      imageAlt: plain("Description de la photo (pour Google)"),
      imagePosition: {
        type: "radio",
        label: "Photo à",
        options: [
          { label: "Gauche", value: "gauche" },
          { label: "Droite", value: "droite" },
        ],
      },
      format: {
        type: "select",
        label: "Format de la photo",
        options: [
          { label: "Portrait", value: "portrait" },
          { label: "Paysage", value: "paysage" },
          { label: "Carré", value: "carre" },
        ],
      },
      bouton: bouton("Bouton"),
      fond: fond(),
      espacement,
      ancre,
    },
    defaultProps: {
      eyebrow: "Notre méthode",
      titre: "Un accompagnement",
      titreAccent: "de A à Z.",
      texte:
        "<p>De l'estimation à la remise des clés, un seul interlocuteur suit votre dossier. Nous connaissons chaque rue de Villeurbanne et de Lyon.</p><p>Résultat : un prix juste, une vente plus rapide et <strong>zéro mauvaise surprise</strong>.</p>",
      image: "/agence-markus-villeurbanne.jpg",
      imageAlt: "Agence Markus Immobilier",
      imagePosition: "gauche",
      format: "portrait",
      bouton: { label: "Prendre rendez-vous", lien: "/contact", style: "primary" },
      fond: "blanc",
      espacement: "normal",
    },
  },

  TexteLibre: {
    label: "Texte libre",
    fields: {
      eyebrow: head.eyebrow,
      titre: head.titre,
      texte: rich("Texte"),
      largeur: {
        type: "radio",
        label: "Largeur",
        options: [
          { label: "Confort de lecture", value: "etroite" },
          { label: "Large", value: "large" },
        ],
      },
      alignement,
      fond: fond(),
      espacement,
      ancre,
    },
    defaultProps: {
      eyebrow: "",
      titre: "Un titre",
      texte: "<p>Écrivez votre texte ici. Utilisez le <strong>gras</strong>, les listes et les liens depuis la barre d'outils.</p>",
      largeur: "etroite",
      alignement: "gauche",
      fond: "blanc",
      espacement: "normal",
    },
  },

  Chiffres: {
    label: "Chiffres clés (animés)",
    fields: {
      ...head,
      items: {
        type: "array",
        label: "Chiffres",
        max: 8,
        getItemSummary: (it: { valeur?: number; suffixe?: string }) => `${it.valeur ?? 0}${it.suffixe ?? ""}`,
        defaultItemProps: { valeur: 100, suffixe: "+", label: "Libellé" },
        arrayFields: {
          valeur: { type: "number", label: "Nombre", min: 0 },
          suffixe: { type: "text", label: "Après le nombre (+, %, M€…)" },
          label: txt("Libellé"),
        },
      },
      fond: fond(),
      espacement,
      ancre,
    },
    defaultProps: {
      eyebrow: "En chiffres",
      titre: "La confiance,",
      titreAccent: "ça se mesure.",
      items: [
        { valeur: 7, suffixe: "", label: "Ans d'expérience" },
        { valeur: 250, suffixe: "+", label: "Biens accompagnés" },
        { valeur: 40, suffixe: "M€", label: "de projets" },
        { valeur: 300, suffixe: "+", label: "Clients accompagnés" },
      ],
      fond: "anthracite",
      espacement: "normal",
    },
  },

  Cartes: {
    label: "Cartes (services, atouts)",
    fields: {
      ...head,
      intro: area("Texte sous le titre"),
      colonnes: {
        type: "radio",
        label: "Cartes par ligne",
        options: [
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
        ],
      },
      items: {
        type: "array",
        label: "Cartes",
        max: 12,
        getItemSummary: (it: { titre?: unknown }) => (typeof it.titre === "string" && it.titre) || "Carte",
        defaultItemProps: { icone: "maison", titre: "Titre de la carte", texte: "Deux phrases pour expliquer.", lien: "", lienLabel: "" },
        arrayFields: {
          icone: {
            type: "select",
            label: "Icône",
            options: [{ label: "Aucune", value: "" }, ...Object.entries(ICONES).map(([value, { label }]) => ({ label, value }))],
          },
          titre: txt("Titre"),
          texte: area("Texte"),
          lien: plain("Lien (optionnel)", "/vendre"),
          lienLabel: plain("Texte du lien", "En savoir plus"),
        },
      },
      fond: fond(),
      espacement,
      ancre,
    },
    defaultProps: {
      eyebrow: "Nos services",
      titre: "Tout votre projet,",
      titreAccent: "au même endroit.",
      intro: "",
      colonnes: "3",
      items: [
        { icone: "cle", titre: "Vendre", texte: "Estimation juste, diffusion ciblée et négociation jusqu'à la signature.", lien: "/vendre", lienLabel: "" },
        { icone: "maison", titre: "Acheter", texte: "Des biens sélectionnés et un accompagnement jusqu'aux clés.", lien: "/acheter", lienLabel: "" },
        { icone: "plante", titre: "Faire gérer", texte: "Gestion locative sereine : loyers, entretien, garanties.", lien: "/gestion-locative", lienLabel: "" },
      ],
      fond: "gris",
      espacement: "normal",
    },
  },

  Etapes: {
    label: "Étapes (déroulé)",
    fields: {
      ...head,
      intro: area("Texte sous le titre"),
      items: {
        type: "array",
        label: "Étapes",
        max: 8,
        getItemSummary: (it: { titre?: unknown }, i?: number) =>
          `${(i ?? 0) + 1}. ${(typeof it.titre === "string" && it.titre) || "Étape"}`,
        defaultItemProps: { titre: "Nouvelle étape", texte: "Ce qui se passe à cette étape." },
        arrayFields: { titre: txt("Titre"), texte: area("Texte") },
      },
      fond: fond(),
      espacement,
      ancre,
    },
    defaultProps: {
      eyebrow: "Comment ça marche",
      titre: "Vendre en",
      titreAccent: "4 étapes.",
      intro: "",
      items: [
        { titre: "Estimation", texte: "Un prix juste, basé sur les ventes réelles du quartier." },
        { titre: "Mise en valeur", texte: "Photos, annonce et diffusion ciblée." },
        { titre: "Visites & offres", texte: "Des acquéreurs qualifiés, une négociation menée pour vous." },
        { titre: "Signature", texte: "Suivi jusqu'à l'acte chez le notaire." },
      ],
      fond: "blanc",
      espacement: "normal",
    },
  },

  Faq: {
    label: "Questions fréquentes",
    fields: {
      ...head,
      items: {
        type: "array",
        label: "Questions",
        getItemSummary: (it: { question?: unknown }) => (typeof it.question === "string" && it.question) || "Question",
        defaultItemProps: { question: "Nouvelle question ?", reponse: "La réponse." },
        arrayFields: { question: txt("Question"), reponse: area("Réponse") },
      },
      fond: fond(),
      espacement,
      ancre,
    },
    defaultProps: {
      eyebrow: "FAQ",
      titre: "Vos questions,",
      titreAccent: "nos réponses.",
      items: [
        { question: "L'estimation est-elle gratuite ?", reponse: "Oui. L'estimation en ligne est gratuite et sans engagement, et un conseiller peut venir affiner le prix sur place." },
        { question: "Dans quels secteurs intervenez-vous ?", reponse: "Villeurbanne et Lyon, ainsi que les communes de l'Est lyonnais." },
      ],
      fond: "gris",
      espacement: "normal",
    },
  },

  Citation: {
    label: "Témoignage (citation)",
    fields: { citation: area("Citation"), auteur: txt("Auteur"), detail: txt("Précision (ex. vente d'un T3)"), fond: fond(), espacement, ancre },
    defaultProps: {
      citation: "Nous avons été suivis, accompagnés et très bien conseillés du premier jour jusqu'à la signature.",
      auteur: "Roger G.",
      detail: "Vente d'une maison",
      fond: "blanc",
      espacement: "normal",
    },
  },

  ImagePleine: {
    label: "Grande photo",
    fields: {
      image: imageField("Photo"),
      imageAlt: plain("Description de la photo (pour Google)"),
      legende: txt("Légende (optionnel)"),
      hauteur: {
        type: "radio",
        label: "Hauteur",
        options: [
          { label: "Moyenne", value: "moyenne" },
          { label: "Grande", value: "grande" },
        ],
      },
      cadre: {
        type: "radio",
        label: "Largeur",
        options: [
          { label: "Bord à bord", value: "pleine" },
          { label: "Dans la page (coins arrondis)", value: "contenu" },
        ],
      },
    },
    defaultProps: { image: "/agence-markus-villeurbanne.jpg", imageAlt: "", legende: "", hauteur: "moyenne", cadre: "contenu" },
  },

  Galerie: {
    label: "Galerie de photos",
    fields: {
      ...head,
      images: {
        type: "array",
        label: "Photos",
        max: 24,
        getItemSummary: (it: { alt?: string }, i?: number) => it.alt || `Photo ${(i ?? 0) + 1}`,
        defaultItemProps: { image: "", alt: "", legende: "" },
        arrayFields: {
          image: imageField("Photo"),
          alt: plain("Description (pour Google)"),
          legende: txt("Légende (optionnel)"),
        },
      },
      colonnes: {
        type: "radio",
        label: "Photos par ligne",
        options: [
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
        ],
      },
      format: {
        type: "select",
        label: "Format",
        options: [
          { label: "Paysage", value: "paysage" },
          { label: "Portrait", value: "portrait" },
          { label: "Carré", value: "carre" },
        ],
      },
      fond: fond(),
      espacement,
      ancre,
    },
    defaultProps: {
      eyebrow: "En images",
      titre: "Galerie",
      titreAccent: "",
      images: [
        { image: "/vendus/t3-decines.jpeg", alt: "T3 à Décines", legende: "" },
        { image: "/vendus/t4-bron.jpeg", alt: "T4 à Bron", legende: "" },
        { image: "/vendus/maison-5-pieces-meyzieu.jpeg", alt: "Maison à Meyzieu", legende: "" },
      ],
      colonnes: "3",
      format: "paysage",
      fond: "blanc",
      espacement: "normal",
    },
  },

  Video: {
    label: "Vidéo (YouTube, Vimeo…)",
    fields: {
      eyebrow: head.eyebrow,
      titre: head.titre,
      url: plain("Lien de la vidéo", "https://www.youtube.com/watch?v=…"),
      fond: fond(),
      espacement,
      ancre,
    },
    defaultProps: { eyebrow: "En vidéo", titre: "Découvrez l'agence", url: "", fond: "blanc", espacement: "normal" },
  },

  AppelAction: {
    label: "Appel à l'action",
    fields: {
      ...head,
      texte: area("Texte"),
      image: imageField("Photo de fond (optionnel)"),
      bouton1: bouton("Bouton principal"),
      bouton2: bouton("Bouton secondaire"),
      ancre,
    },
    defaultProps: {
      eyebrow: "Estimation gratuite",
      titre: "Combien vaut",
      titreAccent: "votre bien ?",
      texte: "Un rapport complet en moins de 2 minutes, basé sur les ventes réelles de votre quartier.",
      image: "",
      bouton1: { label: "Estimer mon bien", lien: "/estimation", style: "cta" },
      bouton2: { label: "04 78 37 13 67", lien: "tel:+33478371367", style: "ghost" },
    },
  },

  ContactFormulaire: {
    label: "Formulaire de contact",
    fields: { ...head, intro: area("Texte"), fond: fond(), espacement, ancre },
    defaultProps: {
      eyebrow: "Contact",
      titre: "Parlons de",
      titreAccent: "votre projet.",
      intro: "Réponse sous 24 h ouvrées. Vous pouvez aussi nous appeler au 04 78 37 13 67.",
      fond: "gris",
      espacement: "normal",
    },
  },

  Espace: {
    label: "Espace / séparateur",
    fields: {
      hauteur: {
        type: "radio",
        label: "Hauteur",
        options: [
          { label: "Petit", value: "petit" },
          { label: "Moyen", value: "moyen" },
          { label: "Grand", value: "grand" },
        ],
      },
      trait: {
        type: "radio",
        label: "Trait fin au milieu",
        options: [
          { label: "Non", value: "non" },
          { label: "Oui", value: "oui" },
        ],
      },
      fond: fond(),
    },
    defaultProps: { hauteur: "moyen", trait: "non", fond: "blanc" },
  },
};

/** Ordre actuel de la page d'accueil (trame client) — point de départ de l'éditeur. */
export const HOME_ORDER = [
  "MaisonHero",
  "MaisonBiens",
  "MaisonAPropos",
  "MaisonEquipe",
  "MaisonVendus",
  "MaisonEstimation",
  "MaisonAvis",
  "MaisonFaq",
  "MaisonReseaux",
  "MaisonAgence",
] as const;

// ── Assemblage d'une configuration Puck ─────────────────────────────────────

/** Données dont les sections maison ont besoin (annonces, avis…). */
export type BuilderMetadata = Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Renders = Record<keyof typeof DEFINITIONS, ComponentType<any>>;

/**
 * Construit la configuration Puck à partir des définitions + une table de
 * rendus. Le client et le serveur fournissent chacun leur table.
 */
export function makeConfig(renders: Renders): Config {
  const components: Record<string, ComponentConfig> = {};
  for (const [name, def] of Object.entries(DEFINITIONS)) {
    const Render = renders[name as keyof Renders];
    components[name] = {
      label: def.label,
      fields: def.fields,
      defaultProps: def.defaultProps ?? {},
      // `puck` (fonctions internes de l'éditeur) et `editMode` ne sont JAMAIS
      // transmis : une fonction ne peut pas traverser la frontière
      // serveur → composant client, et le rendu public planterait. Seules les
      // données (`metadata`) sont passées, sous le nom `meta`.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (all: any) => {
        const { puck, editMode, ...props } = all;
        void editMode;
        return <Render {...props} meta={puck?.metadata ?? {}} editing={!!puck?.isEditing} />;
      },
    } as ComponentConfig;
  }
  return {
    categories: CATEGORIES,
    root: { fields: ROOT_FIELDS, defaultProps: { title: "", description: "", indexer: "oui" } },
    components,
  } as unknown as Config;
}
