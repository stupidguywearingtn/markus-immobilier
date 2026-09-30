/**
 * Adresses déjà prises par une page codée du site : le client ne peut pas
 * créer une page à ces adresses (la page codée gagnerait de toute façon, et
 * la sienne serait invisible sans explication).
 */
export const RESERVED_SLUGS = new Set([
  "acheter", "admin", "annonces", "api", "blog", "confidentialite", "contact", "cookies",
  "equipe", "espace-client", "estimation", "estimation-immobiliere-lyon",
  "estimation-immobiliere-villeurbanne", "faire-gerer", "gestion-locative", "honoraires",
  "mentions-legales", "radar", "recrutement", "signin", "vendre",
  "agence-immobiliere-villeurbanne", "agence-immobiliere-gratte-ciel",
  "agence-immobiliere-charpennes", "agence-immobiliere-cusset",
  "sitemap.xml", "robots.txt", "llms.txt", "manifest.webmanifest", "opengraph-image",
  "icon", "apple-icon", "favicon.ico", "_next",
]);
