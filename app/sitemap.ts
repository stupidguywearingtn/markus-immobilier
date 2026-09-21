import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/blog";
import { getAllListings } from "@/lib/listings-all";

const BASE = "https://www.markusimmobilier.fr";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

/**
 * Date de dernière modification RÉELLE de chaque page statique (AAAA-MM-JJ, UTC).
 *
 * Pourquoi une table tenue à la main plutôt que `new Date()` : jusqu'au
 * 2026-09-17, chaque page statique déclarait la date du BUILD. Le site étant
 * redéployé presque tous les jours, le sitemap annonçait « 21 pages modifiées
 * aujourd'hui » à chaque déploiement. Google documente qu'une valeur `lastmod`
 * jugée non fiable est ignorée POUR TOUT LE FICHIER — y compris pour les
 * articles et les annonces, dont les dates sont exactes, elles.
 *
 * Règle d'entretien : on met la date du jour ici QUAND LE CONTENU DE LA PAGE
 * CHANGE VRAIMENT, exactement comme le champ `updated` d'un article de blog.
 * Un correctif technique, un changement de style ou un lien ajouté ne la
 * bougent pas. Oublier de l'avancer est sans gravité (Google recrawle de
 * toute façon) ; l'avancer à tort est le défaut coûteux — celui qu'on corrige.
 *
 * Valeurs initiales = date du dernier commit ayant touché la page (et ses
 * composants propres pour la home, dont le contenu vit dans `components/home`).
 */
const PAGE_LASTMOD: Record<string, string> = {
  "/": "2026-09-07",
  "/estimation": "2026-09-15",
  "/vendre": "2026-06-24",
  "/acheter": "2026-09-09",
  "/gestion-locative": "2026-09-21",
  "/estimation-immobiliere-lyon": "2026-09-08",
  "/estimation-immobiliere-villeurbanne": "2026-09-12",
  "/agence-immobiliere-villeurbanne": "2026-09-12",
  "/agence-immobiliere-gratte-ciel": "2026-09-15",
  "/agence-immobiliere-charpennes": "2026-09-15",
  "/agence-immobiliere-cusset": "2026-09-15",
  "/annonces": "2026-08-27",
  "/faire-gerer": "2026-09-18",
  "/blog": "2026-09-13",
  "/contact": "2026-06-24",
  "/recrutement": "2026-06-24",
  "/equipe": "2026-09-13",
  "/honoraires": "2026-09-15",
  "/mentions-legales": "2026-09-10",
  "/confidentialite": "2026-09-10",
  "/cookies": "2026-09-10",
};

/** Priorités et fréquences inchangées depuis l'origine du fichier. */
const STATIC_PAGES: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/estimation", priority: 0.9, changeFrequency: "monthly" },
  { path: "/vendre", priority: 0.9, changeFrequency: "monthly" },
  { path: "/acheter", priority: 0.9, changeFrequency: "monthly" },
  { path: "/gestion-locative", priority: 0.85, changeFrequency: "monthly" },
  { path: "/estimation-immobiliere-lyon", priority: 0.85, changeFrequency: "monthly" },
  { path: "/estimation-immobiliere-villeurbanne", priority: 0.9, changeFrequency: "monthly" },
  { path: "/agence-immobiliere-villeurbanne", priority: 0.85, changeFrequency: "monthly" },
  { path: "/agence-immobiliere-gratte-ciel", priority: 0.8, changeFrequency: "monthly" },
  { path: "/agence-immobiliere-charpennes", priority: 0.8, changeFrequency: "monthly" },
  { path: "/agence-immobiliere-cusset", priority: 0.8, changeFrequency: "monthly" },
  { path: "/annonces", priority: 0.8, changeFrequency: "daily" },
  { path: "/faire-gerer", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/recrutement", priority: 0.6, changeFrequency: "monthly" },
  { path: "/equipe", priority: 0.6, changeFrequency: "monthly" },
  { path: "/honoraires", priority: 0.6, changeFrequency: "yearly" },
  { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
  { path: "/confidentialite", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
];

/**
 * Deux pages affichent le catalogue : leur contenu change aussi quand une
 * annonce est publiée depuis le back-office. Leur `lastmod` est donc la plus
 * récente des deux dates (page elle-même / dernière annonce en ligne).
 */
const LISTING_DRIVEN = new Set(["/", "/annonces"]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allListings = await getAllListings(); // statiques + annonces publiées

  const listingTimes = allListings
    .map((l) => new Date(l.publishedAt).getTime())
    .filter((t) => Number.isFinite(t));
  const latestListing = listingTimes.length ? Math.max(...listingTimes) : 0;

  const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => {
    const own = new Date(PAGE_LASTMOD[p.path]).getTime();
    const stamp = LISTING_DRIVEN.has(p.path) ? Math.max(own, latestListing) : own;
    return {
      url: p.path === "/" ? BASE : `${BASE}${p.path}`,
      lastModified: new Date(stamp),
      priority: p.priority,
      changeFrequency: p.changeFrequency,
    };
  });

  // Biens RÉELS (statiques + annonces publiées depuis le back-office).
  // Les 10 biens de démonstration de `lib/mock-properties.ts` ne sont
  // volontairement PAS listés ici : ce sont des biens fictifs (« Loft
  // d'exception sur Bellecour », « Villa familiale à Écully »…), ils ne sont
  // liés depuis aucune page du site, et les soumettre à Google revenait à
  // faire indexer de fausses annonces au nom de l'agence. Leurs pages portent
  // désormais un `noindex` (voir `app/annonces/[id]/page.tsx`).
  const listingPages: MetadataRoute.Sitemap = allListings.map((l) => ({
    url: `${BASE}/annonces/${l.slug}`,
    lastModified: new Date(l.publishedAt),
    priority: 0.9,
    changeFrequency: "weekly",
  }));
  const blogPages: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${BASE}/blog/${a.slug}`,
    // date de dernière vraie mise à jour du contenu, sinon date de publication
    lastModified: new Date(a.updated ?? a.date),
    priority: 0.7,
    changeFrequency: "monthly",
  }));
  return [...staticPages, ...listingPages, ...blogPages];
}
