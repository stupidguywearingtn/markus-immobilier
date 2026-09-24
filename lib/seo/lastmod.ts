/**
 * Date de dernière modification RÉELLE de chaque page statique — SOURCE DE
 * VÉRITÉ UNIQUE (AAAA-MM-JJ, UTC).
 *
 * Trois consommateurs lisent cette table, et un seul chiffre les alimente :
 *   1. `app/sitemap.ts`      → le `lastmod` annoncé à Google ;
 *   2. les pages elles-mêmes → le « Dernière mise à jour : … » lu par un humain ;
 *   3. `webPageLd()`         → le `dateModified` du JSON-LD lu par les LLM.
 *
 * Pourquoi une table tenue à la main plutôt que `new Date()` : jusqu'au
 * 2026-09-17, chaque page statique déclarait la date du BUILD. Le site étant
 * redéployé presque tous les jours, le sitemap annonçait « 21 pages modifiées
 * aujourd'hui » à chaque déploiement. Google documente qu'une valeur `lastmod`
 * jugée non fiable est ignorée POUR TOUT LE FICHIER — y compris pour les
 * articles et les annonces, dont les dates sont exactes, elles.
 *
 * Pourquoi une table PARTAGÉE (déplacée ici depuis `app/sitemap.ts` le
 * 2026-09-24) : parce que les trois déclarations ci-dessus étaient recopiées à
 * la main et avaient déjà divergé. Mesuré en production ce jour-là,
 * `/estimation-immobiliere-villeurbanne` affichait « 8 septembre 2026 » à un
 * lecteur pendant que le sitemap annonçait « 12 septembre 2026 » à Google :
 * deux fraîcheurs contradictoires pour la même page, issues de deux copies
 * manuelles. Une page ne peut plus se contredire elle-même depuis qu'elles
 * lisent toutes la même ligne.
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
export const PAGE_LASTMOD: Record<string, string> = {
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

/**
 * Date ISO de dernière modification d'une page statique.
 *
 * Lève si le chemin est absent de la table : une page qui affiche une date de
 * fraîcheur doit la tenir de la table, jamais d'une constante locale recopiée
 * (c'est précisément la divergence corrigée le 2026-09-24). L'erreur se
 * produit au build, pas en production.
 */
export function lastmodOf(path: string): string {
  const iso = PAGE_LASTMOD[path];
  if (!iso) {
    throw new Error(
      `lastmodOf("${path}") : chemin absent de PAGE_LASTMOD (lib/seo/lastmod.ts). ` +
        `Ajouter la page à la table avec sa date de dernière modification réelle.`,
    );
  }
  return iso;
}

/** « 2026-09-12 » → « 12 septembre 2026 ». Format affiché à l'écran. */
export function fmtDateFr(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
