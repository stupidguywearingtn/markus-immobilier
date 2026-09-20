import type { Metadata } from "next";
import { BASE } from "@/components/seo/json-ld";

/**
 * Métadonnées d'aperçu (Open Graph + Twitter Cards) d'une page.
 *
 * POURQUOI CE HELPER EXISTE — mesuré en production le 2026-09-20.
 * Dans l'App Router, `metadata.openGraph` n'est PAS fusionné en profondeur
 * avec celui du layout : dès qu'une page déclare son propre bloc `openGraph`,
 * elle REMPLACE celui du parent, y compris l'image générée par
 * `app/opengraph-image.tsx`, le `siteName` et la `locale`. Résultat constaté
 * sur le site en ligne : les 26 articles du blog et les 11 pages de service
 * (celles qui déclaraient un `openGraph`) ne servaient **aucune** `og:image`,
 * tandis que les 8 pages qui n'en déclaraient pas héritaient de celui de la
 * home — donc d'un `og:url` pointant vers la home et d'un titre qui ne les
 * décrivait pas.
 *
 * Ce helper rend le bloc complet à partir des seules informations propres à la
 * page. Il ne change rien au rendu : uniquement le contenu du <head>.
 */

/** Image d'aperçu par défaut : celle générée par `app/opengraph-image.tsx`. */
const DEFAULT_IMAGE = {
  url: `${BASE}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Markus Immobilier — Agence immobilière à Villeurbanne & Lyon",
};

type ShareImage = { url: string; alt?: string };

type ShareInput = {
  /** Titre d'aperçu — celui qui s'affiche au partage, pas forcément le <title>. */
  title: string;
  description: string;
  /** Chemin absolu depuis la racine, tel qu'il est en canonique ("/honoraires"). */
  path: string;
  /** Photos propres à la page (fiches de biens). À défaut, l'image du site. */
  images?: ShareImage[];
};

type ArticleShareInput = ShareInput & {
  /** ISO court (YYYY-MM-DD) — date de première publication. */
  publishedTime: string;
  /** ISO court — date de dernière modification réelle du contenu. */
  modifiedTime?: string;
};

function common({ title, description, path, images }: ShareInput) {
  const url = path === "/" ? BASE : `${BASE}${path}`;
  const pictures = images?.length ? images : [DEFAULT_IMAGE];
  return {
    url,
    pictures,
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: pictures.map((i) => i.url),
    },
  };
}

/** Page ordinaire (service, quartier, liste, page légale…). */
export function shareMeta(input: ShareInput): Pick<Metadata, "openGraph" | "twitter"> {
  const { url, pictures, twitter } = common(input);
  return {
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: "Markus Immobilier",
      title: input.title,
      description: input.description,
      url,
      images: pictures,
    },
    twitter,
  };
}

/** Article de blog : ajoute `article:published_time` / `article:modified_time`. */
export function shareArticleMeta(
  input: ArticleShareInput,
): Pick<Metadata, "openGraph" | "twitter"> {
  const { url, pictures, twitter } = common(input);
  return {
    openGraph: {
      type: "article",
      locale: "fr_FR",
      siteName: "Markus Immobilier",
      title: input.title,
      description: input.description,
      url,
      images: pictures,
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime ?? input.publishedTime,
    },
    twitter,
  };
}
