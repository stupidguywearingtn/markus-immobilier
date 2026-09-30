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
import { KeysIllust } from "@/components/illustrations/keys";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import {
  COMMUNE,
  DVF_ANNEE,
  QUARTIERS,
  fmtEur,
  fmtM2,
  honorairesVente,
} from "@/lib/quartiers";
import { lastmodOf } from "@/lib/seo/lastmod";

/**
 * Page « vendre » — angle : CE QU'IL RESTE AU VENDEUR.
 *
 * Réécrite le 2026-09-30 (306 mots rendus, 5 H2 dont un seul en question,
 * aucune FAQ, aucun chiffre, aucune date auparavant — mesuré en production le
 * matin même, sur la page servie). Motif du chantier : la requête
 * « vendre appartement Villeurbanne » est mesurée sans nous depuis l'ouverture
 * du journal, et c'est cette page qui la vise.
 *
 * ⚠️ Partage du sujet — à ne dupliquer avec aucune des trois pages voisines :
 *   /honoraires                        = LE BARÈME lui-même (page canonique).
 *   /agence-immobiliere-villeurbanne   = COMBIEN COÛTE UNE AGENCE pour vendre.
 *   /estimation-immobiliere-villeurbanne = À QUEL PRIX vendre (l'estimation).
 *   /vendre (ici)                      = CE QUI SE RETRANCHE DU PRIX et ce
 *                                        qu'il reste au vendeur à l'arrivée.
 * Les honoraires ne sont donc ni réexpliqués ni rejustifiés ici : ils sont une
 * ligne du décompte, chiffrée puis renvoyée à /honoraires.
 *
 * ⚠️ Provenance des chiffres — rien n'est inventé, tout est dérivé ou sourcé :
 *  - médianes €/m² par quartier, prix médian observé (195 000 €) et surface
 *    médiane (62 m²) → ventes DVF 2025, `lib/quartiers.ts`.
 *  - honoraires de transaction → barème public, `honorairesVente()`, qui lit
 *    les mêmes tranches que le tableau visible de /honoraires.
 *  - recul de 10,4 % du prix médian au m² depuis 2022 → `COMMUNE.vs2022`.
 *  - plus-value immobilière (19 % d'IR, 17,2 % de prélèvements sociaux,
 *    exonération totale de la résidence principale, exonération d'IR à plus de
 *    22 ans et de prélèvements sociaux à plus de 30 ans, forfaits de 7,5 % de
 *    frais d'acquisition et de 15 % de travaux après 5 ans, surtaxe de 2 % à
 *    6 % au-delà de 50 000 € de plus-value imposable) → service-public.fr,
 *    fiche F10864, consultée et relue le 2026-09-30.
 *  - indemnités de remboursement anticipé : plafond de 6 mois d'intérêts sur le
 *    capital remboursé ET de 3 % du capital restant dû, et absence d'indemnité
 *    quand le remboursement fait suite à la vente du logement pour changement
 *    de lieu de travail, cessation forcée d'activité ou décès →
 *    service-public.fr, fiche F1669, consultée le 2026-09-30.
 *  Aucun délai de vente « observé » n'est avancé : personne ne l'a mesuré ici.
 *  Aucun prix de diagnostic n'est avancé : le coût dépend du diagnostiqueur.
 */

/** Date de dernière modification réelle du contenu de cette page (ISO). */
const UPDATED = lastmodOf("/vendre");

const A =
  "text-anthracite font-semibold underline underline-offset-2 hover:text-sauge";

/* --- Cas de référence, entièrement dérivé de lib/quartiers.ts ------------ */
const SURFACE = COMMUNE.surfaceMediane; // 62 m², médiane DVF 2025
const PRIX_OBSERVE = COMMUNE.prixMedian; // 195 000 €, prix médian réellement signé
const HONO_OBSERVE = honorairesVente(PRIX_OBSERVE)!;
const NET_OBSERVE = PRIX_OBSERVE - HONO_OBSERVE.montant;

/** Un appartement de la surface médiane, au prix médian de chaque quartier. */
type Ligne = {
  contour: string;
  median: number;
  prix: number;
  honoraires: number;
  label: string;
  taux: number;
  net: number;
};

const LIGNES: Ligne[] = Object.values(QUARTIERS)
  .map((q) => {
    const prix = q.median * SURFACE;
    const h = honorairesVente(prix)!;
    return {
      contour: q.contour,
      median: q.median,
      prix,
      honoraires: h.montant,
      label: h.label,
      taux: (h.montant / prix) * 100,
      net: prix - h.montant,
    };
  })
  .sort((a, b) => b.prix - a.prix);

const FORFAIT = LIGNES.filter((l) => l.label.startsWith("9 000"));
const PROPORTIONNEL = LIGNES.filter((l) => !l.label.startsWith("9 000"));

const fmtTaux = (n: number) =>
  `${n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`;

/**
 * « 10,4 % » — séparateur décimal français.
 * ⚠️ Ne JAMAIS interpoler un nombre à virgule directement dans le JSX :
 * React rend `10.4`, séparateur anglo-saxon, sur une page française.
 * (Défaut trouvé le 2026-09-30 en relisant le HTML rendu de cette page.)
 */
const fmtPourcent = (n: number) =>
  `${n.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;

/* --- Plus-value : taux et seuils, sources en en-tête --------------------- */
const PV_IR = 19;
const PV_PS = 17.2;
const PV_FORFAIT_ACQUISITION = 7.5;
const PV_FORFAIT_TRAVAUX = 15;
const PV_ANS_IR = 22;
const PV_ANS_PS = 30;

/* --- Remboursement anticipé, sources en en-tête -------------------------- */
const IRA_MOIS = 6;
const IRA_PCT = 3;

/** Recul du prix médian au m² depuis 2022, pour la question plus-value. */
const RECUL_2022 = Math.abs(COMMUNE.vs2022); // 10,4 %

/** FAQ visible — le JSON-LD FAQPage est généré depuis ce MÊME tableau. */
const FAQ: FaqItem[] = [
  {
    q: "Le vendeur paie-t-il les frais de notaire ?",
    a: "Non. Les frais de notaire — droits de mutation, émoluments et débours — sont payés par l'acheteur, qui les verse en plus du prix le jour de l'acte authentique. Le vendeur n'en supporte que la part correspondant à d'éventuelles formalités le concernant, comme la mainlevée d'une hypothèque. L'exception est la vente « acte en main », rare, où le vendeur accepte contractuellement de les prendre en charge : elle doit être écrite noir sur blanc dans l'avant-contrat, sans quoi la règle par défaut s'applique.",
  },
  {
    q: `Combien reste-t-il au vendeur sur un appartement vendu au prix médian de Villeurbanne ?`,
    a: `Sur le prix médian réellement signé à Villeurbanne en ${DVF_ANNEE}, soit ${fmtEur(PRIX_OBSERVE)}, les honoraires de transaction représentent ${HONO_OBSERVE.label} du prix, soit ${fmtEur(HONO_OBSERVE.montant)}. Le vendeur perçoit donc ${fmtEur(NET_OBSERVE)} avant remboursement d'un éventuel crédit, prorata de taxe foncière et solde de charges de copropriété. Les frais de notaire n'entrent pas dans ce décompte : ils sont payés par l'acheteur, en plus du prix.`,
  },
  {
    q: "Vendre sa résidence principale à Villeurbanne est-il imposable ?",
    a: `Non, l'exonération est totale. La plus-value réalisée sur la vente de la résidence principale et de ses dépendances — cave, garage, place de stationnement — n'est soumise ni à l'impôt sur le revenu ni aux prélèvements sociaux, à condition que le logement soit bien l'habitation habituelle et effective du vendeur au moment de la vente. C'est le cas le plus fréquent, et il explique pourquoi la majorité des vendeurs villeurbannais ne paient aucun impôt sur leur vente. Source : service-public.fr, fiche F10864.`,
  },
  {
    q: "Peut-on vendre un appartement dont le crédit n'est pas remboursé ?",
    a: `Oui, et c'est la situation la plus courante. Le notaire rembourse la banque sur le prix de vente le jour de l'acte, puis verse le solde au vendeur. Si le contrat de prêt prévoit une indemnité de remboursement anticipé, elle ne peut dépasser ni ${IRA_MOIS} mois d'intérêts sur le capital remboursé au taux moyen du prêt, ni ${IRA_PCT} % du capital restant dû. Et elle n'est pas due du tout lorsque la vente fait suite à un changement de lieu de travail, à une cessation forcée d'activité professionnelle ou à un décès, pour le vendeur ou son conjoint. Source : service-public.fr, fiche F1669.`,
  },
  {
    q: "Qui paie la taxe foncière l'année de la vente ?",
    a: "Le propriétaire au 1er janvier reste le redevable légal pour l'année entière : c'est lui que l'administration fiscale appelle, même s'il a vendu en février. En pratique, l'acte de vente prévoit presque toujours un prorata, l'acheteur remboursant au vendeur la part correspondant aux jours où il est propriétaire. Ce prorata est une convention entre les parties, pas une règle fiscale : il n'existe que s'il est écrit dans l'acte.",
  },
  {
    q: "Le vendeur peut-il se rétracter après avoir signé le compromis ?",
    a: "Non. Le délai de rétractation de 10 jours qui suit la signature du compromis ne bénéficie qu'à l'acheteur non professionnel. Le vendeur, lui, est engagé dès sa signature et ne dispose d'aucun délai équivalent. C'est la raison pour laquelle un vendeur ne devrait signer un compromis qu'une fois son propre projet arrêté : relogement, calendrier, montant attendu au terme de la vente.",
  },
];

export const metadata: Metadata = {
  title: "Vendre à Villeurbanne : ce qu'il reste vraiment au vendeur",
  description: `Sur le prix médian villeurbannais de ${fmtEur(PRIX_OBSERVE)}, ce qui se retranche du prix et ce que le vendeur perçoit : honoraires quartier par quartier, plus-value, remboursement anticipé, taxe foncière.`,
  alternates: { canonical: "/vendre" },
  ...shareMeta({
    title: "Vendre son bien à Villeurbanne — ce qu'il reste au vendeur",
    description: `Le décompte complet d'une vente à Villeurbanne, calculé sur les prix d'appartements réellement signés en ${DVF_ANNEE}.`,
    path: "/vendre",
  }),
};

export default function VendrePage() {
  return (
    <>
      <JsonLd
        data={webPageLd({
          path: "/vendre",
          name: "Vendre à Villeurbanne : ce qu'il reste vraiment au vendeur",
          description: `Décompte d'une vente immobilière à Villeurbanne : honoraires de transaction au prix médian de chaque quartier, imposition de la plus-value, indemnités de remboursement anticipé, prorata de taxe foncière.`,
          dateModified: UPDATED,
        })}
      />
      <JsonLd
        data={serviceLd({
          name: "Vente immobilière",
          serviceType: "Vente d'appartement et de maison",
          description: `Accompagnement à la vente d'un bien immobilier à Villeurbanne et Lyon : estimation sur les ventes signées, commercialisation, négociation, signature. Honoraires à la charge du vendeur, ${HONO_OBSERVE.label} du prix au prix médian villeurbannais de ${fmtEur(PRIX_OBSERVE)}.`,
          path: "/vendre",
        })}
      />
      <JsonLd data={faqLd(FAQ)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Vendre", path: "/vendre" },
        ])}
      />
      <SeoLanding
        eyebrow="Vendre"
        title={
          <>
            Vendre, et savoir <span className="grad-light">ce qu&apos;il reste.</span>
          </>
        }
        lead="La plupart des pages sur la vente parlent du prix d'affichage. Celle-ci part de l'autre bout : ce qui se retranche de ce prix, et ce que le vendeur villeurbannais perçoit réellement à l'arrivée."
        illustration={
          <DrawOnScroll>
            <KeysIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        updated={UPDATED}
        intro={
          <>
            Un vendeur ne compare pas des pourcentages, il compare des montants
            au bout du compte. Le prix médian réellement signé pour un
            appartement à Villeurbanne en {DVF_ANNEE} est de{" "}
            {fmtEur(PRIX_OBSERVE)} ({COMMUNE.n.toLocaleString("fr-FR")} ventes,
            base DVF) : c&apos;est le point de départ de toutes les lignes qui
            suivent. Le cas de référence des tableaux est un appartement de{" "}
            {SURFACE} m², la surface médiane des appartements vendus à
            Villeurbanne cette année-là.
          </>
        }
        sections={[
          {
            eyebrow: "Le décompte",
            h2: "Sur le prix de vente, combien le vendeur touche-t-il réellement à Villeurbanne ?",
            body: (
              <>
                <p>
                  <strong>
                    Au prix médian villeurbannais de {fmtEur(PRIX_OBSERVE)}, le
                    vendeur perçoit {fmtEur(NET_OBSERVE)} une fois les
                    honoraires de transaction déduits
                  </strong>{" "}
                  — soit {HONO_OBSERVE.label} du prix, {fmtEur(HONO_OBSERVE.montant)}.
                  Les frais de notaire n&apos;entrent pas dans ce décompte :
                  c&apos;est l&apos;acheteur qui les paie, en plus du prix. Ce
                  net s&apos;entend avant remboursement d&apos;un éventuel
                  crédit, prorata de taxe foncière et solde de charges de
                  copropriété, traités plus bas.
                </p>
                <p>
                  Quartier par quartier, voici ce que donne un appartement de{" "}
                  {SURFACE} m² vendu au prix médian de son secteur. Le prix de
                  chaque ligne est une référence de marché, pas une estimation :
                  à surface égale, l&apos;étage, l&apos;ascenseur,
                  l&apos;extérieur et le DPE déplacent le prix réel à
                  l&apos;intérieur d&apos;un même quartier, et nous avons{" "}
                  <Link href="/blog/estimation-en-ligne-ou-agence" className={A}>
                    mesuré de combien
                  </Link>
                  .
                </p>
                <div className="overflow-x-auto rounded-[12px] border border-[var(--bordure)] my-2">
                  <table className="w-full border-collapse text-[14.5px] min-w-[620px]">
                    <caption className="caption-top text-left text-[13px] text-[#6b7276] px-4 pt-3 pb-2">
                      Appartement de {SURFACE} m² vendu au prix médian de son
                      quartier — honoraires de transaction à la charge du
                      vendeur, et montant perçu avant remboursement de crédit.
                    </caption>
                    <thead>
                      <tr className="bg-gris">
                        {[
                          "Quartier",
                          "Prix médian",
                          "Prix du bien",
                          "Honoraires",
                          "Taux effectif",
                          "Perçu par le vendeur",
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
                        <tr
                          key={l.contour}
                          className="border-t border-[var(--bordure)]"
                        >
                          <td className="px-4 py-3 text-left font-medium text-anthracite">
                            {l.contour}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                            {fmtM2(l.median)}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                            {fmtEur(l.prix)}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                            {fmtEur(l.honoraires)}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                            {fmtTaux(l.taux)}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums font-medium text-anthracite">
                            {fmtEur(l.net)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  Une ligne se lit différemment des autres.{" "}
                  <strong>
                    {FORFAIT.map((l) => l.contour).join(", ")} est le seul
                    quartier de Villeurbanne où un appartement de {SURFACE} m²
                    au prix médian passe sous la barre des {fmtEur(170000)}
                  </strong>
                  , la tranche où le barème est forfaitaire — {FORFAIT[0].label}{" "}
                  au lieu de {PROPORTIONNEL[0].label}. Le taux effectif y tombe à{" "}
                  {fmtTaux(FORFAIT[0].taux)} du prix, contre{" "}
                  {fmtTaux(PROPORTIONNEL[0].taux)} dans les six autres. Le
                  barème complet, tranche par tranche, est publié sur la page{" "}
                  <Link href="/honoraires" className={A}>
                    nos honoraires
                  </Link>
                  .
                </p>
                <p className="text-[13px] text-[#6b7276]">
                  Prix : médianes des ventes d&apos;appartements enregistrées à
                  Villeurbanne (commune 69266) en {DVF_ANNEE} dans la base DVF
                  publiée par Etalab sur data.gouv.fr, rattachées aux contours
                  de quartiers officiels de la Métropole de Lyon. Honoraires :
                  barème public de l&apos;agence, montants TTC à la charge du
                  vendeur.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Qui paie quoi",
            h2: "Quels frais sont à la charge du vendeur, et lesquels reviennent à l'acheteur ?",
            body: (
              <>
                <p>
                  <strong>
                    Le vendeur paie les honoraires d&apos;agence, les
                    diagnostics techniques et, le cas échéant, l&apos;impôt sur
                    la plus-value et l&apos;indemnité de remboursement anticipé
                    de son prêt. L&apos;acheteur paie les frais de notaire.
                  </strong>{" "}
                  C&apos;est la répartition par défaut, et la confusion la plus
                  fréquente porte sur les frais de notaire : ils représentent la
                  ligne la plus lourde de l&apos;opération, et elle ne sort pas
                  de la poche du vendeur.
                </p>
                <ul className="mt-3 space-y-2.5 list-disc pl-5 text-[15.5px] leading-relaxed text-[#3d4347]">
                  <li>
                    <strong>À la charge du vendeur</strong> — honoraires de
                    transaction ; dossier de diagnostics techniques ; mainlevée
                    d&apos;hypothèque s&apos;il y en a une ; impôt sur la
                    plus-value si le bien n&apos;est pas la résidence
                    principale ; indemnité de remboursement anticipé si le
                    contrat de prêt en prévoit une ; solde de charges de
                    copropriété jusqu&apos;au jour de l&apos;acte.
                  </li>
                  <li>
                    <strong>À la charge de l&apos;acheteur</strong> — les frais
                    de notaire, dont nous avons publié le{" "}
                    <Link href="/blog/frais-de-notaire-lyon-2026" className={A}>
                      calcul exact pour Villeurbanne et Lyon en 2026
                    </Link>
                    , taxes et émoluments compris.
                  </li>
                  <li>
                    <strong>Partagé par convention</strong> — la taxe foncière
                    de l&apos;année en cours, dont le{" "}
                    <Link href="/blog/taxe-fonciere-vente-qui-paie" className={A}>
                      prorata entre vendeur et acheteur
                    </Link>{" "}
                    n&apos;existe que s&apos;il est écrit dans l&apos;acte.
                  </li>
                </ul>
                <p>
                  Les diagnostics obligatoires méritent d&apos;être lancés tôt :
                  ils conditionnent la signature du compromis, et le DPE doit
                  figurer dès l&apos;annonce. Leur{" "}
                  <Link href="/blog/diagnostics-obligatoires-vente" className={A}>
                    liste et leurs durées de validité
                  </Link>{" "}
                  dépendent du bien ; leur prix, lui, dépend du diagnostiqueur,
                  et nous n&apos;en publions pas de montant que nous
                  n&apos;aurions pas relevé nous-mêmes.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Plus-value",
            h2: "Faut-il payer un impôt sur la plus-value en vendant à Villeurbanne ?",
            body: (
              <>
                <p>
                  <strong>
                    Pas si le bien vendu est votre résidence principale :
                    l&apos;exonération est alors totale, impôt sur le revenu
                    comme prélèvements sociaux.
                  </strong>{" "}
                  Elle couvre le logement et ses dépendances — cave, garage,
                  place de stationnement — à condition qu&apos;il s&apos;agisse
                  de votre habitation habituelle et effective au moment de la
                  vente. Dans les autres cas, la plus-value est imposée à{" "}
                  {PV_IR} % d&apos;impôt sur le revenu et {fmtPourcent(PV_PS)} de
                  prélèvements sociaux, avec une surtaxe de 2 % à 6 % au-delà de{" "}
                  {fmtEur(50000)} de plus-value imposable.
                </p>
                <p>
                  <strong>
                    Un fait local change la réponse pour beaucoup de vendeurs
                    villeurbannais : le prix médian au m² d&apos;un appartement
                    à Villeurbanne est inférieur de {fmtPourcent(RECUL_2022)} à son niveau
                    de 2022.
                  </strong>{" "}
                  Un propriétaire qui a acheté au prix médian de son quartier en
                  2022 et qui revend aujourd&apos;hui au prix médian du même
                  quartier vend donc en dessous de son prix d&apos;achat : il
                  n&apos;y a pas de plus-value, et donc rien à imposer. Le recul
                  va de {fmtPourcent(Math.abs(QUARTIERS.ferrandiere.vs2022))} à
                  Ferrandière – Maisons-Neuves à{" "}
                  {fmtPourcent(Math.abs(QUARTIERS.charpennes.vs2022))} à
                  Charpennes – Tonkin. Ce n&apos;est pas une bonne nouvelle pour
                  le vendeur — il vend moins cher — mais c&apos;est une ligne
                  d&apos;impôt en moins, et personne ne la lui dit.
                </p>
                <p>
                  Quand la plus-value existe, deux mécanismes la réduisent avant
                  imposition. Le prix d&apos;achat peut être majoré
                  forfaitairement de {fmtPourcent(PV_FORFAIT_ACQUISITION)} au titre des
                  frais d&apos;acquisition et de {PV_FORFAIT_TRAVAUX} % au titre
                  des travaux si le bien est détenu depuis plus de cinq ans,
                  sans avoir à produire de justificatif. Et la durée de
                  détention efface progressivement l&apos;assiette : exonération
                  d&apos;impôt sur le revenu au-delà de {PV_ANS_IR} ans, de
                  prélèvements sociaux au-delà de {PV_ANS_PS} ans.
                </p>
                <p className="text-[13px] text-[#6b7276]">
                  Source : service-public.fr, fiche F10864
                  « Impôt sur le revenu — Plus-value immobilière », consultée le
                  30 septembre 2026. La plus-value est calculée et prélevée par
                  le notaire le jour de l&apos;acte.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Crédit en cours",
            h2: "Rembourser son crédit par anticipation coûte-t-il quelque chose au vendeur ?",
            body: (
              <>
                <p>
                  <strong>
                    Souvent rien, et jamais plus que le plus faible de deux
                    plafonds : {IRA_MOIS} mois d&apos;intérêts sur le capital
                    remboursé au taux moyen du prêt, ou {IRA_PCT} % du capital
                    restant dû avant le remboursement.
                  </strong>{" "}
                  L&apos;indemnité de remboursement anticipé n&apos;est due que
                  si le contrat de prêt la prévoit, et la loi la plafonne
                  strictement. Le notaire la règle sur le prix de vente en même
                  temps que le solde du capital, avant de verser le reste au
                  vendeur.
                </p>
                <p>
                  Trois situations l&apos;annulent complètement lorsque le
                  remboursement fait suite à la vente du logement : un changement
                  de lieu de travail, du vendeur ou de son conjoint ; une
                  cessation forcée d&apos;activité professionnelle, un
                  licenciement notamment ; un décès, du vendeur ou de son
                  conjoint. Un vendeur qui déménage pour son travail n&apos;a
                  donc aucune indemnité à payer, quoi que prévoie son contrat —
                  c&apos;est à lui de le faire valoir auprès de sa banque, qui
                  ne l&apos;applique pas toujours d&apos;office.
                </p>
                <p className="text-[13px] text-[#6b7276]">
                  Source : service-public.fr, fiche F1669 « Peut-on rembourser
                  son crédit immobilier par anticipation ? », consultée le
                  30 septembre 2026.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Calendrier",
            h2: "À quel moment le vendeur reçoit-il l'argent de la vente ?",
            body: (
              <>
                <p>
                  <strong>
                    À la signature de l&apos;acte authentique, pas au compromis.
                  </strong>{" "}
                  Le compromis engage les deux parties mais ne transfère aucun
                  prix : l&apos;acheteur y verse un dépôt de garantie, conservé
                  par le notaire et déduit du prix le jour de l&apos;acte.
                  Entre les deux, comptez généralement deux à trois mois — le
                  temps des vérifications du notaire et du financement de
                  l&apos;acheteur.
                </p>
                <p>
                  Une asymétrie mérite d&apos;être connue avant de signer :{" "}
                  <strong>
                    le délai de rétractation de 10 jours ne bénéficie
                    qu&apos;à l&apos;acheteur
                  </strong>
                  . Le vendeur, lui, est engagé dès sa signature du{" "}
                  <Link href="/blog/compromis-de-vente-delais" className={A}>
                    compromis
                  </Link>
                  , sans délai équivalent. C&apos;est pourquoi il vaut mieux
                  avoir arrêté son propre calendrier — relogement, achat
                  suivant, montant attendu — avant de signer plutôt qu&apos;après.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Notre rôle",
            h2: "Qu'est-ce qu'une agence locale change à ce décompte ?",
            body: (
              <>
                <p>
                  Elle n&apos;en change qu&apos;une ligne : la sienne. Les
                  autres — frais de notaire, plus-value, indemnité de
                  remboursement anticipé, taxe foncière — ne dépendent ni de
                  l&apos;agence ni de son barème. Ce sur quoi elle pèse
                  réellement, c&apos;est le prix de départ : un prix fixé
                  au-dessus du marché fait perdre les premières semaines, qui
                  sont celles où l&apos;attention des acheteurs est la plus
                  forte, et se solde presque toujours par une baisse.
                </p>
                <p>
                  C&apos;est pour cette raison que nous partons des ventes
                  réellement signées plutôt que des prix affichés, et que nous
                  publions{" "}
                  <Link href="/blog/prix-immobilier-villeurbanne-2026" className={A}>
                    les médianes réelles par quartier
                  </Link>{" "}
                  ainsi que notre barème. Vous pouvez lancer une{" "}
                  <Link href="/estimation-immobiliere-villeurbanne" className={A}>
                    estimation à Villeurbanne
                  </Link>{" "}
                  en moins de deux minutes, ou nous appeler au 04 78 37 13 67
                  pour en parler avant de décider quoi que ce soit.
                </p>
              </>
            ),
          },
        ]}
        afterSections={<FaqBlock items={FAQ} />}
        ctaTitle={
          <>
            Combien vaut <span className="grad-light">votre bien ?</span>
          </>
        }
        ctaText="Lancez une estimation gratuite en moins de 2 minutes, ou parlez-en directement avec un conseiller."
      />
    </>
  );
}
