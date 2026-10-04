import type { Metadata } from "next";
import Link from "next/link";
import { shareMeta } from "@/lib/seo/share";
import { SeoLanding } from "@/components/layout/seo-landing";
import {
  JsonLd,
  breadcrumbLd,
  faqLd,
  serviceLd,
  webPageLd,
} from "@/components/seo/json-ld";
import { FaqBlock, type FaqItem } from "@/components/seo/faq-block";
import { HouseIllust } from "@/components/illustrations/house";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import { COMMUNE, DVF_ANNEE, TYPOLOGIES, fmtEur, fmtM2 } from "@/lib/quartiers";
import { lastmodOf } from "@/lib/seo/lastmod";

/**
 * Page « acheter » — angle : LE BUDGET TOTAL, PRIX SIGNÉ + FRAIS D'ACQUISITION.
 *
 * Réécrite le 2026-10-02 (278 mots rendus, 5 H2 dont aucun ne pose de question,
 * aucune FAQ, aucun chiffre, aucune date auparavant — mesuré en production le
 * matin même, sur la page servie). C'était la dernière page commerciale du site
 * restée au niveau de rédaction d'origine.
 *
 * ⚠️ Pourquoi CET angle, et pas « quel apport faut-il ? » : la formulation
 * « apport » a été mesurée deux fois et écartée deux fois (01/10 : 9 résultats
 * nationaux, zéro source locale ; 02/10 sur la reformulation par quartier et
 * typologie : 9 résultats, TOUS des portails d'annonces, intention
 * transactionnelle). Ce qui reste exploitable est un constat GEO, pas SEO : sur
 * cette question, le résumé du moteur admet lui-même qu'aucun résultat ne donne
 * le montant, et retombe sur des fourchettes nationales. Le site peut être la
 * seule source qui additionne prix signé et frais à l'euro près. C'est
 * exactement ce que fait cette page, et rien d'autre.
 *
 * ⚠️ Partage du sujet — à ne dupliquer avec aucune des pages voisines :
 *   /blog/frais-de-notaire-lyon-2026        = LE CALCUL des frais, poste par poste.
 *   /blog/investir-locatif-lyon             = LA MESURE prix affichés vs signés.
 *   /blog/prix-immobilier-villeurbanne-2026 = LES MÉDIANES par quartier.
 *   /blog/ou-acheter-villeurbanne-quartiers = QUEL QUARTIER pour quel budget.
 *   /blog/capacite-emprunt-immobilier       = COMBIEN LA BANQUE PRÊTE.
 *   /acheter (ici)                          = LA SOMME À PRÉVOIR EN TOUT, et ce
 *                                             que la banque ne finance pas.
 * Les frais ne sont donc ni recalculés ni réexpliqués ici : ils sont une ligne
 * du total, citée puis renvoyée à l'article qui les détaille.
 *
 * ⚠️ Provenance des chiffres — rien n'est inventé :
 *  - prix médians par typologie et prix médian communal → `lib/quartiers.ts`
 *    (médianes DVF 2025, commune 69266).
 *  - montants de frais (taxes + émoluments TTC) → repris TELS QUELS des calculs
 *    publiés le 2026-09-29 dans /blog/frais-de-notaire-lyon-2026, qui les dérive
 *    des mêmes médianes, du taux de 5,00 % voté par la Métropole de Lyon
 *    (tableau DGFiP au 1ᵉʳ juin 2026) et du barème réglementé des émoluments
 *    (tableau 5 n° 54 de l'article A. 444-91 du code de commerce).
 *    ⚠️ NE PAS les recalculer ici : deux calculs indépendants finiraient par
 *    diverger d'un euro et la page contredirait l'article. Seule l'ADDITION
 *    prix + frais est faite ici, elle ne peut pas diverger.
 *  - écarts prix affichés / prix signés (16,1 % à 45,3 %) → relevés source par
 *    source le 2026-09-27, publiés dans /blog/investir-locatif-lyon.
 *  - délai de rétractation de 10 jours au seul bénéfice de l'acquéreur, délai
 *    usuel de deux à trois mois entre compromis et acte → déjà publiés sur
 *    /vendre et /blog/compromis-de-vente-delais, repris à l'identique.
 *  AUCUN taux d'apport bancaire n'est avancé : personne ne l'a mesuré ici, et
 *  c'est une politique d'établissement, pas une règle. La page le dit.
 */

/** Date de dernière modification réelle du contenu de cette page (ISO). */
const UPDATED = lastmodOf("/acheter");

const A =
  "text-anthracite font-semibold underline underline-offset-2 hover:text-sauge";

/* --- Frais d'acquisition déjà publiés, par typologie ---------------------- */
/**
 * Taxes + émoluments TTC, acheteur ordinaire, au prix médian villeurbannais de
 * chaque typologie. Valeurs reprises mot pour mot de
 * /blog/frais-de-notaire-lyon-2026 (« 8 876 € pour un T1 (115 000 €), 12 889 €
 * pour un T2 (170 000 €), 16 992 € pour un T3 (226 250 €), 19 090 € pour un T4
 * (255 000 €) »). Débours et contribution de sécurité immobilière non compris.
 * T5 et + est volontairement absent : l'article ne publie pas son montant, et
 * on ne le fabrique pas ici.
 */
const FRAIS_PAR_TYPE: Record<string, number> = {
  T1: 8876,
  T2: 12889,
  T3: 16992,
  T4: 19090,
};

/** Frais au prix médian communal (195 000 €), même source. */
const FRAIS_MEDIAN = 14712;

/** Frais pour un 62 m² au prix médian du quartier le moins cher / le plus cher. */
const FRAIS_62_MIN = 12871; // Cyprian – Les Brosses, prix 169 756 €
const FRAIS_62_MAX = 18231; // Ferrandière – Maisons-Neuves, prix 243 226 €
const PRIX_62_MIN = 169756;
const PRIX_62_MAX = 243226;

/** Économie de part fiscale d'un primo-accédant sur un 62 m², par quartier. */
const PRIMO_MIN = 869;
const PRIMO_MAX = 1245;

/** Écart mesuré entre prix affichés en ligne et prix signés, par quartier. */
const ECART_MIN = 16.1;
const ECART_MAX = 45.3;
/** Prix communal affiché par un site spécialisé, relevé le 2026-09-27. */
const AFFICHE_COMMUNE = 4380;

const BUDGET_MEDIAN = COMMUNE.prixMedian + FRAIS_MEDIAN;
const BUDGET_62_MIN = PRIX_62_MIN + FRAIS_62_MIN;
const BUDGET_62_MAX = PRIX_62_MAX + FRAIS_62_MAX;

type LigneType = {
  type: string;
  prix: number;
  frais: number;
  total: number;
  taux: number;
};

const LIGNES: LigneType[] = TYPOLOGIES.filter(
  (t) => FRAIS_PAR_TYPE[t.type] !== undefined,
).map((t) => {
  const frais = FRAIS_PAR_TYPE[t.type];
  return {
    type: t.type,
    prix: t.prixMedian,
    frais,
    total: t.prixMedian + frais,
    taux: (frais / t.prixMedian) * 100,
  };
});

const T2 = LIGNES.find((l) => l.type === "T2")!;

/**
 * « 7,58 % » — séparateur décimal français.
 * ⚠️ Ne JAMAIS interpoler un nombre à virgule directement dans le JSX : React
 * rend « 7.58 » sur une page française. (Défaut trouvé le 2026-09-30 sur /vendre.)
 */
const fmtTaux = (n: number) =>
  `${n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`;

const fmtPourcent = (n: number) =>
  `${n.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;

/** FAQ visible — le JSON-LD FAQPage est généré depuis ce MÊME tableau. */
const FAQ: FaqItem[] = [
  {
    q: "Quel budget total faut-il prévoir pour acheter un T2 à Villeurbanne ?",
    a: `Environ ${fmtEur(T2.total)} au prix médian villeurbannais : ${fmtEur(T2.prix)} de prix d'achat — la médiane des T2 réellement signés dans la commune en ${DVF_ANNEE} — plus ${fmtEur(T2.frais)} de taxes et d'émoluments de notaire, soit ${fmtTaux(T2.taux)} du prix. S'y ajoutent les débours et la contribution de sécurité immobilière, quelques centaines d'euros, et le coût de la garantie du prêt, qui dépend du montage retenu avec la banque. Ces chiffres sont des repères de marché : le prix réel d'un bien précis dépend de son quartier, de son étage, de son état et de son DPE.`,
  },
  {
    q: "Les frais de notaire sont-ils finançables par le prêt immobilier ?",
    a: `Dans la plupart des montages, non : la banque finance le prix du bien, et les frais d'acquisition restent à la charge de l'acheteur en trésorerie, le jour de l'acte authentique. C'est ce qui rend ces montants structurants — à Villeurbanne, entre ${fmtEur(FRAIS_62_MIN)} et ${fmtEur(FRAIS_62_MAX)} pour un appartement de ${COMMUNE.surfaceMediane} m² selon le quartier. Certains établissements acceptent de les intégrer au prêt, mais c'est une décision d'établissement, pas une règle : elle se vérifie dossier par dossier.`,
  },
  {
    q: "Peut-on acheter à Villeurbanne sans apport ?",
    a: "Nous ne publions pas de taux d'apport, parce qu'il n'en existe pas de règle : chaque banque fixe sa propre exigence, et elle varie avec le profil de l'emprunteur et l'état du marché du crédit. Ce qui est certain et chiffrable, en revanche, c'est la part que le prêt ne couvre généralement pas : les frais d'acquisition. Un acheteur qui dispose exactement de cette somme n'achète pas « sans apport », il couvre les frais — la distinction compte au moment de monter le dossier.",
  },
  {
    q: "Le prix affiché dans une annonce est-il le prix auquel on signe à Villeurbanne ?",
    a: `Rarement, et l'écart a été mesuré : les prix au m² publiés en ligne pour Villeurbanne dépassent de ${fmtPourcent(ECART_MIN)} à ${fmtPourcent(ECART_MAX)} les médianes des ventes réellement signées dans les mêmes contours de quartier. Sur la commune entière, un site spécialisé annonçait ${fmtM2(AFFICHE_COMMUNE)} quand les ${COMMUNE.n.toLocaleString("fr-FR")} ventes d'appartements enregistrées en ${DVF_ANNEE} donnent ${fmtM2(COMMUNE.median)}. Un prix affiché indique ce qu'un vendeur espère, donc le point de départ d'une négociation, pas son point d'arrivée.`,
  },
  {
    q: "Combien de temps s'écoule entre l'offre acceptée et la remise des clés ?",
    a: "Comptez généralement deux à trois mois entre la signature du compromis et celle de l'acte authentique : c'est le temps des vérifications du notaire, des purges de droits de préemption et de l'obtention du prêt. L'acheteur non professionnel dispose en outre d'un délai de rétractation de dix jours après la signature du compromis, délai dont le vendeur, lui, ne bénéficie pas. Les clés sont remises à l'acte authentique, pas au compromis.",
  },
  {
    q: "L'acheteur paie-t-il des honoraires d'agence chez Markus Immobilier ?",
    a: "Non. Notre barème met les honoraires de transaction à la charge du vendeur : le prix affiché sur nos annonces est celui que règle l'acheteur, sans honoraires à y ajouter. Les frais d'acquisition, eux, restent dus en plus du prix — ce sont deux choses distinctes, et la seconde ne nous revient pas : elle va pour l'essentiel à la Métropole de Lyon, à la commune et à l'État.",
  },
];

export const metadata: Metadata = {
  title: `Acheter à Villeurbanne : le budget total, prix signé et frais compris`,
  description: `Ce qu'un achat villeurbannais coûte en tout : ${fmtEur(BUDGET_MEDIAN)} au prix médian de ${fmtEur(COMMUNE.prixMedian)}, frais d'acquisition compris. Budget par typologie, écart entre prix affichés et prix signés, ce que la banque ne finance pas.`,
  alternates: { canonical: "/acheter" },
  ...shareMeta({
    title: "Acheter à Villeurbanne — le budget réel, frais compris",
    description: `Prix réellement signés en ${DVF_ANNEE} et frais d'acquisition additionnés, typologie par typologie.`,
    path: "/acheter",
  }),
};

export default function AcheterPage() {
  return (
    <>
      <JsonLd
        data={webPageLd({
          path: "/acheter",
          name: "Acheter à Villeurbanne : le budget total, prix signé et frais compris",
          description: `Budget d'acquisition à Villeurbanne : prix médians réellement signés par typologie, frais de notaire additionnés, écart mesuré entre prix affichés et prix signés, part que le prêt ne couvre pas.`,
          dateModified: UPDATED,
        })}
      />
      <JsonLd
        data={serviceLd({
          name: "Accompagnement à l'achat",
          serviceType: "Achat d'appartement et de maison",
          description: `Accompagnement des acquéreurs à Villeurbanne et Lyon : recherche, visites, offre, financement et signature. Honoraires de transaction à la charge du vendeur : le prix affiché est celui que règle l'acheteur, frais d'acquisition en plus (${fmtEur(T2.frais)} pour un T2 au prix médian villeurbannais de ${fmtEur(T2.prix)}).`,
          path: "/acheter",
        })}
      />
      <JsonLd data={faqLd(FAQ)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Acheter", path: "/acheter" },
        ])}
      />
      <SeoLanding
        eyebrow="Acheter"
        title={
          <>
            Acheter à Villeurbanne, <span className="grad-light">le budget en entier.</span>
          </>
        }
        lead="La plupart des pages sur l'achat annoncent un prix au m². Celle-ci donne la somme qu'il faut réunir : le prix auquel les biens se signent réellement, et tout ce qui s'y ajoute avant la remise des clés."
        illustration={
          <DrawOnScroll>
            <HouseIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        updated={UPDATED}
        intro={
          <>
            Un acheteur ne compare pas des pourcentages, il réunit une somme. Le
            prix médian réellement signé pour un appartement à Villeurbanne en{" "}
            {DVF_ANNEE} est de {fmtEur(COMMUNE.prixMedian)} (
            {COMMUNE.n.toLocaleString("fr-FR")}{" "}
            ventes, base DVF) ; frais
            d&apos;acquisition compris, le budget à prévoir est de{" "}
            {fmtEur(BUDGET_MEDIAN)}. Les chiffres ci-dessous partent tous des
            ventes enregistrées chez le notaire, jamais des prix d&apos;annonce.
          </>
        }
        sections={[
          {
            eyebrow: "Le total",
            h2: "Combien faut-il prévoir en tout pour acheter un appartement à Villeurbanne ?",
            body: (
              <>
                <p>
                  <strong>
                    Au prix médian villeurbannais de {fmtEur(COMMUNE.prixMedian)}
                    , le budget total est de {fmtEur(BUDGET_MEDIAN)}
                  </strong>{" "}
                  — le prix, plus {fmtEur(FRAIS_MEDIAN)}{" "}
                    de taxes et
                  d&apos;émoluments de notaire. Selon la taille du bien, ce
                  supplément va de {fmtEur(LIGNES[0].frais)} à{" "}
                  {fmtEur(LIGNES[LIGNES.length - 1].frais)}, soit{" "}
                  {fmtTaux(LIGNES[LIGNES.length - 1].taux)} à{" "}
                  {fmtTaux(LIGNES[0].taux)} du prix : le barème est dégressif,
                  donc le pourcentage baisse quand le prix monte.
                </p>
                <div className="overflow-x-auto rounded-[12px] border border-[var(--bordure)] my-2">
                  <table className="w-full border-collapse text-[14.5px] min-w-[560px]">
                    <caption className="caption-top text-left text-[13px] text-[#6b7276] px-4 pt-3 pb-2">
                      Budget à réunir pour un appartement acheté au prix médian
                      villeurbannais de sa typologie, acheteur ordinaire.
                    </caption>
                    <thead>
                      <tr className="bg-gris">
                        {[
                          "Typologie",
                          "Prix médian signé",
                          "Frais d'acquisition",
                          "Part du prix",
                          "Budget total",
                        ].map((h, j) => (
                          <th
                            key={h}
                            scope="col"
                            className={`px-4 py-3 font-semibold text-anthracite text-[12.5px] uppercase tracking-[0.06em] ${
                              j === 0 ? "text-left" : "text-right"
                            }`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {LIGNES.map((l) => (
                        <tr key={l.type} className="border-t border-[var(--bordure)]">
                          <td className="px-4 py-3 text-left font-medium text-anthracite">
                            {l.type}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                            {fmtEur(l.prix)}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                            {fmtEur(l.frais)}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                            {fmtTaux(l.taux)}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums font-medium text-anthracite">
                            {fmtEur(l.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  Le quartier déplace ce total davantage que la typologie. Pour
                  un appartement de {COMMUNE.surfaceMediane} m² — la surface
                  médiane des ventes villeurbannaises — acheté au prix médian de
                  son secteur,{" "}
                  <strong>
                    le budget va de {fmtEur(BUDGET_62_MIN)} à{" "}
                    {fmtEur(BUDGET_62_MAX)}{" "}
                    d&apos;un bout à l&apos;autre de la
                    commune
                  </strong>
                  , soit {fmtEur(BUDGET_62_MAX - BUDGET_62_MIN)}{" "}
                  d&apos;écart à
                  surface égale. Le détail des frais quartier par quartier est
                  publié dans notre{" "}
                  <Link href="/blog/frais-de-notaire-lyon-2026" className={A}>
                    calcul des frais de notaire à Villeurbanne
                  </Link>
                  , et la traduction d&apos;un budget en mètres carrés
                  accessibles dans{" "}
                  <Link href="/blog/ou-acheter-villeurbanne-quartiers" className={A}>
                    où acheter selon votre budget
                  </Link>
                  . Trois quartiers ont leur propre page de marché, avec le
                  nombre de ventes de l&apos;année et l&apos;évolution des prix
                  depuis 2022 :{" "}
                  <Link href="/agence-immobiliere-gratte-ciel" className={A}>
                    Gratte-Ciel
                  </Link>
                  ,{" "}
                  <Link href="/agence-immobiliere-charpennes" className={A}>
                    Charpennes
                  </Link>{" "}
                  et{" "}
                  <Link href="/agence-immobiliere-cusset" className={A}>
                    Cusset
                  </Link>
                  .
                </p>
                <p className="text-[13px] text-[#6b7276]">
                  Prix : médianes des ventes d&apos;appartements enregistrées à
                  Villeurbanne (commune 69266) en {DVF_ANNEE}, base DVF publiée
                  par Etalab sur data.gouv.fr, calcul Markus Immobilier. Frais :
                  taxes au taux de 5,00 % voté par la Métropole de Lyon (tableau
                  DGFiP au 1ᵉʳ juin 2026) et émoluments du barème réglementé,
                  TVA comprise — montants repris de notre article dédié. Débours
                  et contribution de sécurité immobilière non compris, quelques
                  centaines d&apos;euros.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Le prix de départ",
            h2: "Le prix affiché est-il le prix auquel on signe à Villeurbanne ?",
            body: (
              <>
                <p>
                  <strong>
                    Non, et l&apos;écart a été mesuré : les prix au m² publiés en
                    ligne pour Villeurbanne dépassent de {fmtPourcent(ECART_MIN)}{" "}
                    à {fmtPourcent(ECART_MAX)} les médianes des ventes
                    réellement signées dans les mêmes contours.
                  </strong>{" "}
                  Sur la commune entière, un site spécialisé annonçait{" "}
                  {fmtM2(AFFICHE_COMMUNE)} quand les{" "}
                  {COMMUNE.n.toLocaleString("fr-FR")}{" "}
                  ventes d&apos;appartements
                  enregistrées en {DVF_ANNEE} donnent {fmtM2(COMMUNE.median)}.
                  Nous avons comparé{" "}
                  <Link href="/blog/investir-locatif-lyon" className={A}>
                    trois sources ligne à ligne
                  </Link>
                  , avec la réserve de périmètre qui s&apos;impose sur le
                  quartier où l&apos;écart est le plus fort.
                </p>
                <p>
                  Pour un acheteur, la conséquence est pratique. Un prix
                  d&apos;annonce dit ce qu&apos;un vendeur espère aujourd&apos;hui :
                  c&apos;est un point de départ, pas un point d&apos;arrivée. La
                  banque et le notaire, eux, travaillent sur des transactions
                  abouties. Partir des{" "}
                  <Link href="/blog/prix-immobilier-villeurbanne-2026" className={A}>
                    médianes signées par quartier
                  </Link>{" "}
                  évite les deux erreurs symétriques : surpayer un bien aligné
                  sur une statistique d&apos;annonces, ou écarter d&apos;emblée un
                  secteur que l&apos;on croit hors budget.
                </p>
                <p>
                  Une médiane de quartier ne reste qu&apos;un ordre de grandeur.
                  À surface égale et dans la même rue, l&apos;étage,
                  l&apos;ascenseur, l&apos;exposition, l&apos;état et le DPE
                  déplacent le prix réel — et{" "}
                  <Link href="/blog/estimation-en-ligne-ou-agence" className={A}>
                    nous avons mesuré de combien
                  </Link>
                  .
                </p>
              </>
            ),
          },
          {
            eyebrow: "Ce que le prêt ne couvre pas",
            h2: "Qu'est-ce que la banque ne finance pas dans un achat immobilier ?",
            body: (
              <>
                <p>
                  <strong>
                    Les frais d&apos;acquisition, dans la plupart des montages.
                  </strong>{" "}
                  La banque finance le prix du bien ; les taxes et les émoluments
                  du notaire sont réglés en trésorerie le jour de l&apos;acte
                  authentique. À Villeurbanne, cela représente entre{" "}
                  {fmtEur(FRAIS_62_MIN)} et {fmtEur(FRAIS_62_MAX)} pour un{" "}
                  {COMMUNE.surfaceMediane}{" "}
                  m² selon le quartier — une somme à
                  réunir en plus de l&apos;apport que la banque demande sur le
                  prix lui-même.
                </p>
                <p>
                  Nous ne publions pas de taux d&apos;apport, et c&apos;est
                  délibéré : il n&apos;en existe pas de règle. Chaque
                  établissement fixe le sien, et il bouge avec le profil de
                  l&apos;emprunteur et l&apos;état du marché du crédit. Ce
                  qu&apos;on peut chiffrer honnêtement, c&apos;est la part que le
                  prêt ne couvre généralement pas. Pour le reste, la question
                  utile est celle de{" "}
                  <Link href="/blog/capacite-emprunt-immobilier" className={A}>
                    votre capacité d&apos;emprunt
                  </Link>
                  , que votre banque ou un courtier arrêtera avant la première
                  visite.
                </p>
                <p>
                  Un acheteur peut réduire cette ligne dans un cas précis.{" "}
                  <strong>
                    Un primo-accédant échappe au demi-point de majoration voté
                    par la Métropole de Lyon en 2025 et économise entre{" "}
                    {fmtEur(PRIMO_MIN)} et {fmtEur(PRIMO_MAX)} sur un{" "}
                    {COMMUNE.surfaceMediane} m² villeurbannais
                  </strong>
                  , selon le quartier. La condition — ne pas avoir été
                  propriétaire de sa résidence principale au cours des deux
                  années précédentes — est vérifiée par le notaire, et le{" "}
                  <Link href="/blog/frais-de-notaire-lyon-2026" className={A}>
                    détail du calcul
                  </Link>{" "}
                  est publié quartier par quartier.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Le calendrier",
            h2: "Combien de temps entre l'offre acceptée et la remise des clés ?",
            body: (
              <>
                <p>
                  <strong>
                    Deux à trois mois en général entre la signature du compromis
                    et celle de l&apos;acte authentique
                  </strong>
                  , le temps des vérifications du notaire, des purges de droits de
                  préemption et de l&apos;obtention du prêt. Les clés sont remises
                  à l&apos;acte, pas au compromis : entre les deux, l&apos;acheteur
                  verse un dépôt de garantie conservé par le notaire et déduit du
                  prix le jour de la signature.
                </p>
                <p>
                  Une asymétrie joue en faveur de l&apos;acheteur :{" "}
                  <strong>
                    le délai de rétractation de dix jours qui suit le compromis ne
                    bénéficie qu&apos;à l&apos;acquéreur non professionnel
                  </strong>
                  . Le vendeur, lui, est engagé dès sa signature. La condition
                  suspensive d&apos;obtention de prêt protège ensuite
                  l&apos;acheteur jusqu&apos;à la réponse de la banque : son délai
                  et son montant se négocient au moment de rédiger{" "}
                  <Link href="/blog/compromis-de-vente-delais" className={A}>
                    le compromis
                  </Link>
                  , pas après. Avant d&apos;en arriver là, la façon de{" "}
                  <Link href="/blog/faire-offre-achat" className={A}>
                    formuler une offre
                  </Link>{" "}
                  et les{" "}
                  <Link href="/blog/questions-a-poser-visite" className={A}>
                    questions à poser en visite
                  </Link>{" "}
                  pèsent plus lourd que le prix affiché.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Notre rôle",
            h2: "Qu'est-ce qu'une agence locale change pour un acheteur ?",
            body: (
              <>
                <p>
                  <strong>
                    Pas une ligne du total : l&apos;acheteur ne nous paie pas.
                  </strong>{" "}
                  Notre barème met les honoraires de transaction à la charge du
                  vendeur — le prix affiché sur nos annonces est celui que règle
                  l&apos;acheteur, sans honoraires à y ajouter. Les frais
                  d&apos;acquisition, eux, ne nous reviennent pas : ils vont pour
                  l&apos;essentiel à la Métropole de Lyon, à la commune et à
                  l&apos;État. Le barème complet est public sur{" "}
                  <Link href="/honoraires" className={A}>
                    nos honoraires
                  </Link>
                  .
                </p>
                <p>
                  Ce sur quoi nous pesons réellement, c&apos;est le prix de départ
                  et la qualité de ce que vous visitez : savoir ce qu&apos;un
                  étage, un ascenseur ou un DPE valent dans un secteur donné,
                  repérer les charges de copropriété et les travaux votés avant
                  l&apos;offre, et vous dire quand un prix est au-dessus de ce que
                  le quartier signe. Gratte-Ciel, Charpennes, Cusset, Lyon 3,
                  Lyon 6 : chaque secteur a sa dynamique, et nous la publions
                  plutôt que de la garder.
                </p>
                <p>
                  Dites-nous ce que vous cherchez et nous vous prévenons dès
                  qu&apos;un bien correspond, souvent avant sa publication. Vous
                  pouvez aussi parcourir{" "}
                  <Link href="/annonces" className={A}>
                    nos annonces en cours
                  </Link>{" "}
                  ou nous appeler au 04 78 37 13 67.
                </p>
              </>
            ),
          },
        ]}
        afterSections={<FaqBlock items={FAQ} />}
        ctaTitle={
          <>
            Un projet d&apos;achat <span className="grad-light">à Villeurbanne ?</span>
          </>
        }
        ctaText="Dites-nous ce que vous cherchez — on vous prévient dès qu'un bien correspond, souvent avant la publication."
        primaryHref="/annonces"
        primaryLabel="Voir les biens disponibles"
      />
    </>
  );
}
