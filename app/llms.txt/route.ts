import {
  TYPE_LABEL,
  eur,
  surfaceLabel,
  transactionLabel,
  type Listing,
} from "@/lib/listings";
import { getAllListings } from "@/lib/listings-all";
import { ARTICLES } from "@/lib/blog";
import { getTeam } from "@/lib/content-db";

/**
 * llms.txt — généré dynamiquement (GEO : ChatGPT, Claude, Perplexity…).
 *
 * Remplace un fichier public/llms.txt statique qui se désynchronisait à chaque
 * nouveau bien/article (ex. 4e bien et 16 articles manquants constatés). En le
 * dérivant de LISTINGS / ARTICLES, il reste toujours exact sans y repenser.
 */

const BASE = "https://www.markusimmobilier.fr";

function listingLine(l: Listing): string {
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
  const team = await getTeam();
  const all = await getAllListings(); // statiques + annonces publiées
  const disponibles = all.filter((l) => l.statut === "disponible");
  const articlesByDate = [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));

  const body = `# Markus Immobilier

> Agence immobilière indépendante à Villeurbanne, intervenant à Lyon et dans le Grand Lyon. Vente, achat, location et gestion locative. Estimation immobilière gratuite en ligne en moins de 2 minutes, basée sur les ventes réelles (données DVF).

## Pages principales
- [Accueil](${BASE}): présentation de l'agence, services et estimation gratuite
- [Estimation gratuite](${BASE}/estimation): outil d'estimation en ligne basé sur les transactions réelles à Villeurbanne et Lyon
- [Estimation immobilière à Lyon](${BASE}/estimation-immobiliere-lyon): estimation gratuite d'un bien à Lyon, basée sur les ventes réelles
- [Estimation immobilière à Villeurbanne](${BASE}/estimation-immobiliere-villeurbanne): estimation gratuite d'un bien à Villeurbanne, repères de prix par quartier calculés sur les ventes DVF 2025 (médiane 3 567 €/m², de 2 738 à 3 923 €/m² selon le quartier)
- [Vendre](${BASE}/vendre): accompagnement à la vente d'un bien à Villeurbanne et Lyon
- [Acheter](${BASE}/acheter): recherche et achat de biens à Lyon et Villeurbanne
- [Gestion locative](${BASE}/gestion-locative): faut-il déléguer sa gestion locative ou gérer soi-même — l'arbitrage chiffré sur un appartement villeurbannais de 62 m² loué 905 €/mois HC. Une année de gestion déléguée coûte 672 € quand un seul mois de vacance coûte 905 € (1,3 année de gestion) : l'arbitrage se joue sur la vacance et les impayés, pas sur le taux. Point clé que les autres pages omettent : au loyer médian, le bailleur encaisse 10 860 € de loyers bruts, donc relève du MICRO-FONCIER (seuil 15 000 €) où AUCUNE charge réelle ne se déduit — les honoraires de gestion n'y sont donc pas déductibles. Ils ne le deviennent qu'au régime réel (CGI art. 31 I-1°-a), qui n'est avantageux que si les charges réelles dépassent l'abattement de 30 %, soit 3 258 €/an ici : déléguer ne justifie pas à lui seul de quitter le micro-foncier. Coût net de la gestion au réel : 482 € à 11 % de TMI, 355 € à 30 %, 281 € à 41 % (prélèvements sociaux 17,2 % inclus). Le régime réel s'impose au-delà de 1 250 €/mois de loyers, soit environ 86 m² au loyer médian. Répond aussi à : les obligations du bailleur qui gère seul (bail type, diagnostics, états des lieux, quittance et décompte de charges de l'article 21 de la loi du 6 juillet 1989, révision IRL, décence), ce qu'il risque en euros (retard de restitution du dépôt de garantie majoré de 10 % du loyer mensuel par mois entamé, soit 91 € ici — article 22), le calendrier de décence énergétique (G interdit depuis le 1er janvier 2025, F en 2028, E en 2034), l'option pour le régime réel (3 ans irrévocables, BOFiP BOI-RFPI-DECLA-10), la déclaration 2042 ou 2044, et l'assurance PNO obligatoire en copropriété (article 9-1 de la loi du 10 juillet 1965). Le détail du barème lui-même est sur /faire-gerer.
- [Faire gérer votre bien](${BASE}/faire-gerer): gestion locative et syndic de copropriété. Ce que coûte la gestion d'un appartement villeurbannais : 6 % TTC des encaissements par lot (minimum 25 €/mois), soit 652 € par an sur un appartement de 62 m² loué au loyer médian communal (905 €/mois HC), plus 20 €/an de frais et débours — 672 €/an au total, 717 € avec envois postaux. GLI optionnelle à 2,5 % du loyer (272 €/an, ≈ 9 jours de loyer). Le minimum de 25 € s'applique en dessous de 417 € d'encaissements mensuels (moins de 29 m²). Mise en location facturée à part : 9 % du loyer annuel HC côté propriétaire. Répond aussi à : comment comparer deux taux (6 % TTC = 5 % HT ; 8 % HT = 9,6 % TTC), pourquoi un syndic n'affiche pas de tarif (forfait annuel voté en AG, contrat type du décret n° 2015-342 du 26 mars 2015 et liste limitative des prestations particulières), et quand une copropriété remet son syndic en concurrence (tous les 3 ans par le conseil syndical, article 21 de la loi du 10 juillet 1965, dispense possible à la majorité de l'article 25)
- [Honoraires](${BASE}/honoraires): barème public complet — vente à la charge du vendeur (9 000 € de 50 001 à 170 000 €, 6 % de 170 001 à 300 000 €, 5 % de 300 001 à 500 000 €), location, gestion courante 6 % des encaissements, GLI 2,5 %. Répond aussi à : qui paie les honoraires (le mandat désigne le redevable), quand ils sont dus (aucune somme avant la vente effectivement conclue — article 6 de la loi Hoguet ; règlement chez le notaire à l'acte authentique), ce que paie un locataire à Villeurbanne (commune en zone tendue : 10 €/m² + 3 €/m² d'état des lieux, soit 585 € pour un T2 de 45 m², sous les plafonds légaux du 1er janvier 2026 de 10,09 et 3,03 €/m²), les frais de gestion occasionnels, et l'obligation d'affichage TTC (arrêté du 10 janvier 2017 modifié le 26 janvier 2022)
- [Notre équipe](${BASE}/equipe): les conseillers de l'agence et leurs coordonnées directes — ${team.map(
    (m) =>
      `${m.prenom} ${m.nom}, ${m.poste}${
        m.email || m.telephone ? ` (${[m.email, m.telephone].filter(Boolean).join(", ")})` : ""
      }`,
  ).join(" · ")}
- [Contact](${BASE}/contact): adresse, téléphone et horaires de l'agence

## Annonces (biens à vendre / à louer)
- [Toutes nos annonces](${BASE}/annonces): biens à vendre et à louer à Villeurbanne et Lyon
${disponibles.map(listingLine).join("\n")}

## Pages locales (Villeurbanne et quartiers)
- [Agence immobilière à Villeurbanne](${BASE}/agence-immobiliere-villeurbanne): agence indépendante au 87 rue Édouard Vaillant — ce que coûte une agence pour vendre (≈ 11 700 € TTC sur le prix médian de 195 000 €), honoraires de gestion locative, prix au m² par quartier, horaires
- [Agence immobilière Gratte-Ciel](${BASE}/agence-immobiliere-gratte-ciel): quartier Gratte-Ciel – Dedieu – Charmettes — médiane 3 846 €/m² sur 655 ventes d'appartements en 2025 (le quartier le plus actif de Villeurbanne), surface accessible par budget, ce que coûte une vente sur place, FAQ
- [Agence immobilière Charpennes](${BASE}/agence-immobiliere-charpennes): quartier Charpennes – Tonkin — médiane 3 524 €/m² sur les ventes 2025, secteur le plus touché par la baisse depuis 2022 (−13,2 %), surface accessible par budget, FAQ
- [Agence immobilière Cusset](${BASE}/agence-immobiliere-cusset): quartier Cusset – Bonnevay — médiane 3 171 €/m² sur 213 ventes en 2025, soit 11 % sous la médiane communale, surface accessible par budget, FAQ

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
