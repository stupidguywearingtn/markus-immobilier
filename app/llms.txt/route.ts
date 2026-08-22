import { LISTINGS, TYPE_LABEL, eur, surfaceLabel, transactionLabel } from "@/lib/listings";
import { ARTICLES } from "@/lib/blog";

/**
 * llms.txt — généré dynamiquement (GEO : ChatGPT, Claude, Perplexity…).
 *
 * Remplace un fichier public/llms.txt statique qui se désynchronisait à chaque
 * nouveau bien/article (ex. 4e bien et 16 articles manquants constatés). En le
 * dérivant de LISTINGS / ARTICLES, il reste toujours exact sans y repenser.
 */

const BASE = "https://www.markusimmobilier.fr";

function listingLine(l: (typeof LISTINGS)[number]): string {
  const specs = [
    l.surface != null ? surfaceLabel(l.surface) : null,
    l.pieces != null ? `${l.pieces} pièces` : null,
    l.dpe ? `DPE ${l.dpe}` : null,
  ]
    .filter(Boolean)
    .join(", ");
  const prix = l.prixSuffixe ? `${eur(l.prix)} ${l.prixSuffixe}` : eur(l.prix);
  const desc = [
    `${TYPE_LABEL[l.type]} ${transactionLabel(l).toLowerCase()}`,
    specs || null,
    `${l.adresse}, ${l.codePostal} ${l.ville} (${l.quartier})`,
    l.atouts.slice(0, 3).join(", ") || null,
  ]
    .filter(Boolean)
    .join(", ");
  return `- [${l.titre} — ${prix}](${BASE}/annonces/${l.slug}): ${desc}`;
}

function articleLine(a: (typeof ARTICLES)[number]): string {
  return `- [${a.title}](${BASE}/blog/${a.slug}): ${a.excerpt}`;
}

export async function GET() {
  const disponibles = LISTINGS.filter((l) => l.statut === "disponible");
  const articlesByDate = [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));

  const body = `# Markus Immobilier

> Agence immobilière indépendante à Villeurbanne, intervenant à Lyon et dans le Grand Lyon. Vente, achat, location et gestion locative. Estimation immobilière gratuite en ligne en moins de 2 minutes, basée sur les ventes réelles (données DVF).

## Pages principales
- [Accueil](${BASE}): présentation de l'agence, services et estimation gratuite
- [Estimation gratuite](${BASE}/estimation): outil d'estimation en ligne basé sur les transactions réelles à Villeurbanne et Lyon
- [Estimation immobilière à Lyon](${BASE}/estimation-immobiliere-lyon): estimation gratuite d'un bien à Lyon, basée sur les ventes réelles
- [Vendre](${BASE}/vendre): accompagnement à la vente d'un bien à Villeurbanne et Lyon
- [Acheter](${BASE}/acheter): recherche et achat de biens à Lyon et Villeurbanne
- [Gestion locative](${BASE}/gestion-locative): gestion locative pour propriétaires bailleurs
- [Contact](${BASE}/contact): adresse, téléphone et horaires de l'agence

## Annonces (biens à vendre / à louer)
- [Toutes nos annonces](${BASE}/annonces): biens à vendre et à louer à Villeurbanne et Lyon
${disponibles.map(listingLine).join("\n")}

## Pages locales (Villeurbanne et quartiers)
- [Agence immobilière à Villeurbanne](${BASE}/agence-immobiliere-villeurbanne): agence locale, services et secteur d'intervention
- [Agence immobilière Gratte-Ciel](${BASE}/agence-immobiliere-gratte-ciel): immobilier dans le quartier Gratte-Ciel à Villeurbanne
- [Agence immobilière Charpennes](${BASE}/agence-immobiliere-charpennes): immobilier dans le quartier Charpennes à Villeurbanne
- [Agence immobilière Cusset](${BASE}/agence-immobiliere-cusset): immobilier dans le quartier Cusset à Villeurbanne

## Blog (conseils immobiliers Lyon / Villeurbanne)
${articlesByDate.map(articleLine).join("\n")}

## Informations
- Nom : Markus Immobilier (SARL)
- Adresse : 87 rue Édouard Vaillant, 69100 Villeurbanne
- Téléphone : 04 78 37 13 67
- Zone d'intervention : Villeurbanne, Lyon, Grand Lyon
- Services : estimation, vente, achat, location, gestion locative
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
