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
 *    6 % au-delà de 50 000 € de plus-value imposable) → service-public.gouv.fr,
 *    fiche F10864, consultée et relue le 2026-09-30, revérifiée le 2026-10-19
 *    (fiche « vérifiée le 15 avril 2026 », taux et barèmes inchangés).
 *  - PÉRIMÈTRE de l'exonération de résidence principale (six assouplissements,
 *    délai normal de vente après déménagement, condition de cession simultanée
 *    des dépendances, présomption du kilomètre pour un garage) → BOFiP-Impôts,
 *    BOI-RFPI-PVI-10-40-10, version en vigueur du 27/06/2023, § 190 et § 330 à
 *    § 360, lu le 2026-10-19. ⚠️ Cette FAQ disait « à condition que le logement
 *    soit l'habitation habituelle et effective au moment de la vente » SANS les
 *    assouplissements : un vendeur déjà déménagé en concluait qu'il perdait
 *    l'exonération. Le détail vit sur /blog/plus-value-immobiliere-calcul ;
 *    si le périmètre change là-bas, il change ici aussi.
 *  - indemnités de remboursement anticipé : plafond de 6 mois d'intérêts sur le
 *    capital remboursé ET de 3 % du capital restant dû, et absence d'indemnité
 *    quand le remboursement fait suite à la vente du logement pour changement
 *    de lieu de travail, cessation forcée d'activité ou décès →
 *    service-public.gouv.fr, fiche F1669, consultée le 2026-09-30, revérifiée
 *    le 2026-10-21 (fiche « vérifiée le 16 septembre 2026 », trois cas
 *    d'exonération et deux plafonds inchangés).
 *    ⚠️ Mais les deux plafonds NE BORNENT PAS un prêt à taux VARIABLE : la
 *    même fiche prévoit que l'indemnité « peut être majorée par des intérêts
 *    compensateurs ». La page affirmait « jamais plus que le plus faible de
 *    deux plafonds » sans réserve — elle sous-estimait ce que le vendeur peut
 *    devoir. Corrigé le 2026-10-21, section et FAQ.
 *  - délai de rétractation de l'acquéreur, sort du dépôt de garantie et
 *    engagement du vendeur → service-public.gouv.fr, fiche F2965 « Promesse de
 *    vente d'un logement existant », vérifiée le 10 avril 2026, et fiche
 *    F37190 « Achat d'un logement en copropriété », vérifiée le 19 septembre
 *    2025, lues le 2026-10-21.
 *    ⚠️ DEUX DÉFAUTS CORRIGÉS CE JOUR-LÀ. (1) La page écrivait que le délai
 *    de 10 jours « suit la signature du compromis » : il court en réalité à
 *    compter du LENDEMAIN DE LA PREMIÈRE PRÉSENTATION de la lettre recommandée
 *    qui le notifie à l'acquéreur (ou de sa remise en main propre), et ne
 *    démarre pas tant que les sept documents de copropriété n'ont pas tous été
 *    remis. Le corpus se CONTREDISAIT : /blog/vendre-sans-agence publiait déjà
 *    le bon point de départ. Les quatre emplacements fautifs (/vendre ×2,
 *    /acheter, /blog/compromis-de-vente-delais) ont été alignés.
 *    (2) La FAQ répondait « Non » tout court à « le vendeur peut-il se
 *    rétracter ? » : la fiche dit « ne peut pas, EN PRINCIPE », l'exception
 *    étant une clause de faculté de rétractation ou de dédit à son profit —
 *    et elle se négocie AVANT de signer. Si ce périmètre change, il change
 *    aussi sur /acheter et /blog/compromis-de-vente-delais.
 *  - taxe foncière de l'année de la vente : redevable unique au 1er janvier,
 *    prorata purement conventionnel → article 1415 du CGI et impots.gouv.fr,
 *    « J'ai acheté / vendu un bien immobilier cette année », lus le
 *    2026-10-21. L'affirmation était juste mais NON SOURCÉE ; la source a été
 *    ajoutée, le texte n'a pas changé.
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
    a: `Non, l'exonération est totale : la plus-value réalisée sur la vente de la résidence principale n'est soumise ni à l'impôt sur le revenu ni aux prélèvements sociaux, sans condition de durée de détention ni de montant. Le logement doit être l'habitation habituelle et effective du vendeur au jour de la vente, mais cette condition connaît six assouplissements — dont celui du vendeur qui a déjà déménagé, à condition de vendre dans un délai normal et de n'avoir ni loué ni prêté le logement entre-temps. Les dépendances (cave, garage, place de stationnement) sont exonérées à condition d'être cédées simultanément et de former avec le logement un tout indissociable. C'est le cas le plus fréquent, et il explique pourquoi la majorité des vendeurs villeurbannais ne paient aucun impôt sur leur vente. Sources : service-public.gouv.fr, fiche F10864 ; BOFiP-Impôts, BOI-RFPI-PVI-10-40-10, § 190 et § 330.`,
  },
  {
    q: "Peut-on vendre un appartement dont le crédit n'est pas remboursé ?",
    a: `Oui, et c'est la situation la plus courante. Le notaire rembourse la banque sur le prix de vente le jour de l'acte, puis verse le solde au vendeur. Si le contrat de prêt prévoit une indemnité de remboursement anticipé, elle ne peut dépasser ni ${IRA_MOIS} mois d'intérêts sur le capital remboursé au taux moyen du prêt, ni ${IRA_PCT} % du capital restant dû. Sur un prêt à taux variable, en revanche, cette indemnité peut être majorée d'intérêts compensateurs — la somme qui permet à la banque de percevoir, sur la durée déjà courue, le taux moyen prévu à l'origine : les deux plafonds ne suffisent donc pas à borner ce que coûte un remboursement anticipé sur un taux variable. Et l'indemnité n'est pas due du tout lorsque la vente fait suite à un changement de lieu de travail, à une cessation forcée d'activité professionnelle ou à un décès, pour le vendeur ou son conjoint. Source : service-public.gouv.fr, fiche F1669, vérifiée le 16 septembre 2026.`,
  },
  {
    q: "Qui paie la taxe foncière l'année de la vente ?",
    a: "Le propriétaire au 1er janvier reste le redevable légal pour l'année entière : c'est lui que l'administration fiscale appelle, même s'il a vendu en février. En pratique, l'acte de vente prévoit presque toujours un prorata, l'acheteur remboursant au vendeur la part correspondant aux jours où il est propriétaire. Ce prorata est une convention entre les parties, pas une règle fiscale : il n'existe que s'il est écrit dans l'acte. Sources : article 1415 du code général des impôts, qui établit la taxe pour l'année entière d'après les faits existants au 1er janvier ; impots.gouv.fr, « J'ai acheté / vendu un bien immobilier cette année ».",
  },
  {
    q: "Le vendeur peut-il se rétracter après avoir signé le compromis ?",
    a: "En principe non : le vendeur est définitivement engagé à vendre dès sa signature du compromis, et le délai de rétractation de 10 jours calendaires ne bénéficie qu'à l'acquéreur non professionnel. Une seule exception existe de son côté : que le compromis contienne lui-même une clause de faculté de rétractation ou de dédit à son profit — elle se négocie avant de signer, jamais après. Et le délai de l'acquéreur ne part pas de la signature : il commence le lendemain de la première présentation de la lettre recommandée qui lui notifie le compromis, ou de sa remise en main propre. C'est la raison pour laquelle un vendeur ne devrait signer un compromis qu'une fois son propre projet arrêté : relogement, calendrier, montant attendu au terme de la vente. Source : service-public.gouv.fr, fiche F2965, vérifiée le 10 avril 2026.",
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
            {fmtEur(PRIX_OBSERVE)} ({COMMUNE.n.toLocaleString("fr-FR")}{" "}
                  ventes,
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
                  {SURFACE}{" "}
                  m² vendu au prix médian de son secteur. Le prix de
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
                  . Trois de ces quartiers ont leur propre page de marché, avec
                  le nombre de ventes, l&apos;évolution depuis 2022 et la
                  surface accessible par budget :{" "}
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
                  . Et si vous hésitez encore à vendre seul, le même décompte
                  mené sans agence — ce qui reste à votre charge, et ce qu&apos;une
                  erreur de prix coûte face aux honoraires économisés — est
                  détaillé dans{" "}
                  <Link href="/blog/vendre-sans-agence" className={A}>
                    vendre sans agence à Villeurbanne
                  </Link>
                  .
                </p>
                <p className="text-[13px] text-[#6b7276]">
                  Prix : médianes des ventes d&apos;appartements enregistrées à
                  Villeurbanne (commune 69266) en {DVF_ANNEE}{" "}
                  dans la base DVF
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
                    <strong>À la charge du vendeur</strong>{" "}
                    — honoraires de
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
                    <strong>Partagé par convention</strong>{" "}
                    — la taxe foncière
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
                  {fmtPourcent(Math.abs(QUARTIERS.charpennes.vs2022))}{" "}
                  à
                  Charpennes – Tonkin. Ce n&apos;est pas une bonne nouvelle pour
                  le vendeur — il vend moins cher — mais c&apos;est une ligne
                  d&apos;impôt en moins, et personne ne la lui dit.
                </p>
                <p>
                  Quand la plus-value existe, deux mécanismes la réduisent avant
                  imposition. Le prix d&apos;achat peut être majoré
                  forfaitairement de {fmtPourcent(PV_FORFAIT_ACQUISITION)}{" "}
                    au titre des
                  frais d&apos;acquisition et de {PV_FORFAIT_TRAVAUX} % au titre
                  des travaux si le bien est détenu depuis plus de cinq ans,
                  sans avoir à produire de justificatif. Et la durée de
                  détention efface progressivement l&apos;assiette : exonération
                  d&apos;impôt sur le revenu au-delà de {PV_ANS_IR} ans, de
                  prélèvements sociaux au-delà de {PV_ANS_PS} ans.
                </p>
                {/*
                 * ⚠️ Les deux bornes « 9,7 % » et « 23,9 % » sont reprises
                 * TELLES QUELLES de la colonne « Hausse nécessaire » du tableau
                 * de `/blog/plus-value-immobiliere-calcul` (lib/blog.ts) :
                 * Ferrandière – Maisons-Neuves pour le minimum, Charpennes –
                 * Tonkin pour le maximum. Elles ne sont pas recalculées ici,
                 * parce que l'article les dérive de ses médianes DÉJÀ arrondies
                 * (4 365 / 3 524) : refaire le calcul depuis `vs2022` donnerait
                 * 23,8 % et ferait diverger les deux pages de 0,1 point.
                 * Si le tableau de l'article change, changer ces deux nombres.
                 */}
                <p>
                  Reste la question que personne ne chiffre : à partir de quel
                  prix de revente l&apos;impôt commence-t-il réellement ? Pour
                  un achat réalisé en 2022 au prix médian du quartier, il faut
                  revendre entre 9,7 % et 23,9 % au-dessus du prix médian
                  constaté aujourd&apos;hui, selon le secteur, avant que la
                  moindre plus-value soit imposable.{" "}
                  <Link href="/blog/plus-value-immobiliere-calcul" className={A}>
                    Le seuil d&apos;imposition quartier par quartier
                  </Link>{" "}
                  publie ce chiffre pour les sept quartiers villeurbannais, avec
                  le calcul déroulé étape par étape.
                </p>
                <p className="text-[13px] text-[#6b7276]">
                  Source : service-public.gouv.fr, fiche F10864
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
                    Souvent rien, et, sur un prêt à taux fixe, jamais plus que
                    le plus faible de deux plafonds : {IRA_MOIS}{" "}
                    mois d&apos;intérêts sur le capital
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
                  Une réserve que presque personne n&apos;écrit, et elle joue
                  contre le vendeur : <strong>sur un prêt à taux variable,
                  cette indemnité peut être majorée d&apos;intérêts
                  compensateurs</strong> — la somme qui permet à la banque de
                  percevoir, sur la durée déjà courue, le taux moyen prévu à
                  l&apos;origine. Les deux plafonds ci-dessus ne suffisent donc
                  pas à borner ce que coûte un remboursement anticipé sur un
                  taux variable : c&apos;est le contrat de prêt qu&apos;il faut
                  lire, et la banque doit communiquer gratuitement le montant
                  exact sur demande écrite de remboursement anticipé.
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
                  Source : service-public.gouv.fr, fiche F1669 « Peut-on rembourser
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
                  prix : il prévoit généralement un dépôt de garantie, consigné
                  sur le compte séquestre du notaire et déduit du prix le jour
                  de l&apos;acte — mais il n&apos;est ni obligatoire ni
                  encaissable à la signature, comme détaillé plus bas. Entre les
                  deux, comptez généralement deux à trois mois — le temps des vérifications du notaire et du
                  financement de l&apos;acheteur.
                </p>
                <p>
                  Une asymétrie mérite d&apos;être connue avant de signer :{" "}
                  <strong>
                    le délai de rétractation de 10 jours calendaires ne
                    bénéficie qu&apos;à l&apos;acquéreur non professionnel, et
                    il ne part pas de la signature
                  </strong>
                  . Il commence le lendemain de la première présentation de la
                  lettre recommandée qui notifie le{" "}
                  <Link href="/blog/compromis-de-vente-delais" className={A}>
                    compromis
                  </Link>{" "}
                  à l&apos;acheteur, ou de sa remise en main propre ; s&apos;il
                  s&apos;achève un samedi, un dimanche ou un jour férié, il est
                  prolongé jusqu&apos;au premier jour ouvrable suivant. Pour un
                  lot de copropriété, il ne démarre même pas tant que les sept
                  documents de copropriété n&apos;ont pas tous été remis. Le
                  vendeur n&apos;est donc libéré du risque de retrait qu&apos;à
                  une date qui dépend d&apos;une notification, pas de sa propre
                  signature.
                </p>
                <p>
                  Le vendeur, lui, est engagé dès qu&apos;il signe, et il ne
                  peut en principe pas se rétracter. La seule exception est une clause de faculté
                  de rétractation ou de dédit inscrite à son profit dans
                  l&apos;acte : elle se négocie avant la signature, jamais
                  après. C&apos;est pourquoi il vaut mieux avoir arrêté son
                  propre calendrier — relogement, achat suivant, montant
                  attendu — avant de signer plutôt qu&apos;après.
                </p>
                <p className="text-[13px] text-[#6b7276]">
                  Source : service-public.gouv.fr, fiche F2965 « Promesse de
                  vente d&apos;un logement existant : promesse unilatérale ou
                  compromis », vérifiée le 10 avril 2026.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Dépôt de garantie",
            h2: "Que devient le dépôt de garantie si l'acheteur renonce à acheter ?",
            body: (
              <>
                <p>
                  <strong>
                    Cela dépend entièrement du motif, et un seul cas de
                    renoncement laisse la somme au vendeur.
                  </strong>{" "}
                  Le dépôt est restitué intégralement à l&apos;acheteur si une
                  condition suspensive du compromis ne se réalise pas — un refus
                  de prêt, le cas le plus fréquent. Il lui est également
                  restitué s&apos;il exerce son droit de rétractation : le
                  professionnel qui le détient doit alors le lui rendre dans un
                  délai maximum de 21 jours à compter du lendemain de la
                  rétractation. Il reste en revanche acquis au vendeur si
                  l&apos;acheteur renonce en dehors de ces deux cas. Et si la
                  vente se fait, il est simplement déduit du prix le jour de
                  l&apos;acte.
                </p>
                <p>
                  Deux précisions que les vendeurs découvrent souvent trop tard.
                  D&apos;abord, aucun dépôt n&apos;est obligatoire : ce
                  n&apos;est pas une condition de validité du compromis, même
                  s&apos;il est d&apos;usage d&apos;en prévoir un, en général
                  entre 5 et 10 % du prix de vente. Ensuite, un vendeur ne peut
                  pas l&apos;encaisser quand il veut — exiger ou recevoir un
                  versement avant la fin du délai de rétractation est puni
                  d&apos;une amende de 30 000 €, sauf si la promesse est conclue
                  par l&apos;intermédiaire d&apos;un professionnel mandaté
                  (notaire ou agent immobilier) ou si les fonds sont consignés
                  chez un professionnel disposant d&apos;une garantie
                  financière. C&apos;est l&apos;une des contraintes les plus
                  concrètes de la{" "}
                  <Link href="/blog/vendre-sans-agence" className={A}>
                    vente sans agence
                  </Link>
                  .
                </p>
                <p className="text-[13px] text-[#6b7276]">
                  Sources : service-public.gouv.fr, fiche F2965 « Promesse de
                  vente d&apos;un logement existant », vérifiée le 10 avril
                  2026 ; fiche F37190 « Achat d&apos;un logement en
                  copropriété », vérifiée le 19 septembre 2025.
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
