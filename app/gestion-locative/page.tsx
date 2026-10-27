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
import { PlantIllust } from "@/components/illustrations/plant";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import { COMMUNE, DVF_ANNEE, LOYER_MEDIAN_HC, QUARTIERS } from "@/lib/quartiers";
import { lastmodOf } from "@/lib/seo/lastmod";

/**
 * Page « gestion locative » — angle : DÉLÉGUER OU GÉRER SOI-MÊME, chiffré.
 *
 * Renforcée le 2026-09-21 (257 mots rendus, 4 H2 dont aucun en question,
 * aucune FAQ, aucun chiffre, aucune date auparavant — mesuré en production).
 *
 * ⚠️ Partage du sujet avec /faire-gerer — à ne pas dupliquer.
 *   /faire-gerer      = COMBIEN ÇA COÛTE (barème traduit en euros) + syndic.
 *   /gestion-locative = FAUT-IL DÉLÉGUER (arbitrage fiscal et de risque).
 * Les six H2 d'ici sont disjoints des six H2 de /faire-gerer, et la FAQ d'ici
 * est disjointe de sa FAQ. Le coût lui-même n'est PAS recalculé ici : il est
 * cité une fois et renvoyé à /faire-gerer, qui en est la page canonique.
 *
 * ⚠️ Provenance des chiffres — rien n'est inventé, tout est dérivé ou sourcé :
 *  - taux et frais fixes → barème public, `app/honoraires/page.tsx` (TTC).
 *  - surface médiane (62 m²) → ventes DVF 2025, `lib/quartiers.ts`.
 *  - loyer médian communal (14,6 €/m² HC) → carte des loyers data.gouv.fr,
 *    `lib/loyers.ts` / `LOYER_MEDIAN_HC`.
 *  - micro-foncier : seuil 15 000 € de revenus fonciers bruts, abattement
 *    forfaitaire de 30 %, option réel sur 3 ans irrévocable → BOFiP
 *    BOI-RFPI-DECLA-10.
 *  - déductibilité au réel des honoraires versés à un tiers pour la gestion →
 *    CGI art. 31, I-1°-e ; BOFiP BOI-RFPI-BASE-20-10 § 20 et § 60.
 *    ⚠️ C'est bien le « e » (frais d'administration et de gestion), pas le
 *    « a » (dépenses de réparation et d'entretien) : le BOI le dit à son § 20.
 *  - prélèvements sociaux sur revenus fonciers : 17,2 %.
 *  - pénalité de retard sur le dépôt de garantie : 10 % du loyer mensuel en
 *    principal par mois entamé → loi n° 89-462 du 6 juillet 1989, art. 22.
 *  - décence énergétique (section « La décence », ajoutée le 2026-10-27) : le
 *    critère dépend de la DATE DU BAIL, pas de la date de location, et pour la
 *    première période ce n'est PAS une classe — moins de 450 kWh d'énergie
 *    finale/m²/an pour un bail signé, renouvelé ou tacitement reconduit entre
 *    2023 et 2024, puis classes A à F (2025-2027), A à E (2028-2033), A à D
 *    (à partir de 2034) → service-public.gouv.fr, fiche F2042 « Logement à
 *    louer décent », onglet MÉTROPOLE, vérifiée le 21 mars 2025 ; critère de
 *    l'article 6 de la loi n° 89-462 du 6 juillet 1989 et du décret
 *    n° 2002-120 du 30 janvier 2002.
 *    ⚠️ Le calendrier OUTRE-MER est décalé : ne jamais écrire celui-ci comme
 *    national. ⚠️ L'étiquette du DPE se calcule en énergie PRIMAIRE et le seuil
 *    de 450 kWh en énergie FINALE : les deux ne sont pas interchangeables, et
 *    c'est pourquoi un G pouvait rester décent sous un bail de 2023-2024.
 *  - limites au pouvoir du juge (même section, article 20-1 de la loi du
 *    6 juillet 1989 via la fiche F2042) : copropriété + travaux proposés en AG
 *    pour un bail 2023-2024 ; risque de pathologie du bâti attesté par un
 *    architecte, ou refus d'autorisation d'urbanisme/patrimoine, pour un bail
 *    depuis 2025 ; preuve à la charge du propriétaire. Mise en demeure LRAR puis
 *    DEUX MOIS avant la saisine du juge des contentieux de la protection, CDC
 *    facultative. ⚠️ Ces trois cas étaient à ZÉRO occurrence du corpus avant le
 *    27/10/2026 : un silence qui fermait un droit du bailleur.
 *  - assurance PNO obligatoire en copropriété → loi n° 65-557, art. 9-1.
 *  - encadrement des loyers (section « Le plafond », ajoutée le 2026-10-24) :
 *    préfecture du Rhône, page « Encadrement des loyers » — dispositif en
 *    vigueur à Lyon et Villeurbanne depuis le 1ᵉʳ novembre 2021, loyer de
 *    référence majoré = +20 % / minoré = −30 %, arrêté n° DDT 69-2025-10-23-00004
 *    pour les baux signés à compter du 01/11/2025 et arrêté
 *    n° DDT-69-2026-10-23-00004 du 23 octobre 2026 pour ceux signés à compter
 *    du 01/11/2026 ; mise en demeure du préfet puis amende de 5 000 € / 15 000 €.
 *    Mécanique du bail, du complément de loyer et des recours → fiche F1314
 *    (service-public.gouv.fr), vérifiée le 1ᵉʳ août 2026, onglet
 *    « Lyon, Villeurbanne ». Terme de l'expérimentation (23 novembre 2026,
 *    loi ELAN art. 140 portée de 5 à 8 ans par la loi 3DS du 21 février 2022)
 *    et prolongation de deux ans adoptée par le Sénat en première lecture le
 *    21 octobre 2026 (scrutin public n° 25, texte non définitif) → dossier
 *    législatif du Sénat, PPL « pour retrouver la confiance et l'équilibre
 *    dans les rapports locatifs ».
 *    ⚠️ La GRILLE de loyers de référence n'est volontairement PAS reproduite :
 *    révisée chaque année, une valeur périmée nuirait plus qu'une absence.
 *  Aucune durée de gestion « en heures par an » n'est avancée : personne ne
 *  l'a mesurée ici, et l'inventer est exclu.
 */

/** Date de dernière modification réelle du contenu de cette page (ISO). */
const UPDATED = lastmodOf("/gestion-locative");

/* --- Barème (source : /honoraires, montants TTC) ------------------------- */
const TAUX_GESTION = 0.06;
const FRAIS_DEBOURS = 20; // € / an (extranet)

/* --- Fiscalité des revenus fonciers (sources en en-tête) ----------------- */
const SEUIL_MICRO = 15000; // € de revenus fonciers bruts / an
const ABATTEMENT_MICRO = 0.3;
const PRELEV_SOCIAUX = 0.172;
const FORFAIT_AUTRES_FRAIS = 20; // € / local / an, CGI art. 31

/* --- Cas de référence villeurbannais, entièrement dérivé ----------------- */
const SURFACE = COMMUNE.surfaceMediane; // 62 m², médiane DVF 2025
const LOYER_MOIS = Math.round(SURFACE * LOYER_MEDIAN_HC); // 905 € HC
const LOYER_AN = LOYER_MOIS * 12;
const GESTION_AN = Math.round(LOYER_MOIS * TAUX_GESTION * 12);
const GESTION_AN_TOTAL = GESTION_AN + FRAIS_DEBOURS;
const ABATTEMENT_EUROS = Math.round(LOYER_AN * ABATTEMENT_MICRO);
const LOYER_MOIS_SEUIL = Math.round(SEUIL_MICRO / 12);
const SURFACE_SEUIL = Math.ceil(LOYER_MOIS_SEUIL / LOYER_MEDIAN_HC);
const PENALITE_DEPOT = Math.round(LOYER_MOIS * 0.1);
const MOIS_VACANCE_RATIO = (LOYER_MOIS / GESTION_AN_TOTAL).toLocaleString(
  "fr-FR",
  { minimumFractionDigits: 1, maximumFractionDigits: 1 },
);

/** Économie d'impôt au régime réel, par tranche marginale d'imposition. */
const TMI = [0.11, 0.3, 0.41];
const ecoImpot = (tmi: number) =>
  Math.round(GESTION_AN_TOTAL * (tmi + PRELEV_SOCIAUX));

/* --- Fourchette de rendement brut par quartier ---------------------------
 * Loyer annuel HC au m² / médiane DVF du quartier. Les deux termes viennent
 * de `lib/quartiers.ts`, comme dans /blog/rentabilite-locative-lyon et sur
 * /faire-gerer : les trois pages ne peuvent pas afficher trois fourchettes
 * différentes du même fait.
 */
const RENDEMENTS_QUARTIERS = Object.values(QUARTIERS).map(
  (q) => (LOYER_MEDIAN_HC * 12) / q.median,
);
const RENDEMENT_MIN = Math.min(...RENDEMENTS_QUARTIERS);
const RENDEMENT_MAX = Math.max(...RENDEMENTS_QUARTIERS);

const eur = (n: number) => `${n.toLocaleString("fr-FR")} €`;
const pct = (t: number) =>
  `${(t * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %`;
/** Taux au centième, pour les rendements (« 4,91 % »). */
const pct2 = (t: number) =>
  `${(t * 100).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} %`;
/** Écart de deux taux, exprimé en points (« 1,93 point »). */
const points = (t: number) =>
  `${(t * 100).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} point`;

export const metadata: Metadata = {
  title: "Déléguer sa gestion locative ou gérer seul : le calcul à Villeurbanne",
  description: `Déléguer sa gestion locative à Villeurbanne coûte ${eur(
    GESTION_AN_TOTAL,
  )} par an sur un appartement loué au loyer médian — moins qu'un seul mois de vacance. Déductibilité réelle, régime micro-foncier, obligations du bailleur qui gère seul.`,
  alternates: { canonical: "/gestion-locative" },
  ...shareMeta({
    title: "Déléguer sa gestion locative ou gérer seul — le calcul à Villeurbanne",
    description: `L'arbitrage chiffré sur un appartement villeurbannais : ${eur(
      GESTION_AN_TOTAL,
    )} par an de gestion, ce que le micro-foncier change à la déductibilité, et ce que le bailleur assume seul.`,
    path: "/gestion-locative",
  }),
};

const A =
  "text-anthracite font-semibold underline underline-offset-2 hover:text-sauge";

/** FAQ visible — le JSON-LD FAQPage est généré depuis ce MÊME tableau. */
const FAQ: FaqItem[] = [
  {
    q: "Un bail signé le 30 octobre 2026 et un bail signé le 2 novembre 2026 sont-ils plafonnés au même montant ?",
    a: "Non : ils relèvent de deux arrêtés préfectoraux différents. Le plafond applicable est celui de l'arrêté en vigueur à la date de signature du bail. Un bail signé le 30 octobre 2026 relève de l'arrêté n° DDT 69-2025-10-23-00004, qui vise les baux signés à compter du 1ᵉʳ novembre 2025 ; un bail signé le 2 novembre 2026 relève de l'arrêté n° DDT-69-2026-10-23-00004 du 23 octobre 2026, qui vise les baux signés à compter du 1ᵉʳ novembre 2026. Les deux grilles sont publiées par la préfecture du Rhône et c'est la seule source à consulter avant de fixer un loyer : nous ne reproduisons pas ces montants, qui sont révisés chaque année.",
  },
  {
    q: "Le locataire peut-il contester un complément de loyer, et dans quel délai ?",
    a: "Oui, dans un délai de trois mois à compter de la signature du bail, en saisissant la commission départementale de conciliation — et c'est au bailleur ou à son agence de prouver que le complément est justifié, pas au locataire de prouver l'inverse. Si la conciliation échoue, le locataire a trois mois à compter de la réception de l'avis de la commission pour saisir le juge des contentieux de la protection, qui peut annuler ou diminuer le complément ; le loyer qu'il fixe s'applique à partir de la date d'entrée en vigueur du bail, donc rétroactivement. Source : service-public.gouv.fr, fiche F1314, vérifiée le 1ᵉʳ août 2026. La proposition de loi adoptée par le Sénat le 21 octobre 2026 porterait ce délai de trois mois à un an, mais elle n'est pas définitivement adoptée.",
  },
  {
    q: "L'option pour le régime réel est-elle réversible ?",
    a: `Non, pas immédiatement : l'option est exercée pour trois ans et elle est irrévocable pendant cette période. Elle se prend sans formalité particulière, par la simple souscription de la déclaration n° 2044 dans le délai de dépôt de la déclaration de revenus. Au terme des trois ans, en revanche, l'option cesse de produire ses effets : vous retrouvez le choix chaque année. Si vous continuez à déposer une 2044 au-delà de ce terme, l'administration considère que vous exercez une option annuelle, et non plus triennale — autrement dit vous pouvez revenir à l'abattement forfaitaire d'une année sur l'autre, sans attendre un nouveau cycle de trois ans. Source : BOFiP, BOI-RFPI-DECLA-10 § 240 et § 250, version en vigueur depuis le 6 mars 2025.`,
  },
  {
    q: "Faut-il déclarer les loyers sur la 2042 ou sur la 2044 ?",
    a: `Au micro-foncier, il n'y a pas de 2044 à remplir : le montant brut des loyers encaissés se porte directement sur la déclaration de revenus n° 2042, et l'abattement de ${pct(
      ABATTEMENT_MICRO,
    )} est appliqué automatiquement par l'administration. Au régime réel, les loyers et chaque charge déduite se déclarent sur la 2044, et c'est ce document qui permet de déduire les honoraires de gestion pour leur montant réel.`,
  },
  {
    q: `Les ${eur(
      FORFAIT_AUTRES_FRAIS,
    )} de frais de gestion forfaitaires de l'administration, est-ce la même chose que les frais de débours de l'agence ?`,
    a: `Non, ce sont deux lignes différentes qui portent par coïncidence le même montant. Le CGI fixe forfaitairement à ${eur(
      FORFAIT_AUTRES_FRAIS,
    )} par local et par an les « autres frais de gestion » que le bailleur peut déduire au régime réel sans justificatif (correspondance, téléphone, déplacements). Les ${eur(
      FRAIS_DEBOURS,
    )} annuels facturés par l'agence sont, eux, une prestation réelle (accès à l'extranet propriétaire) qui figure au barème et se déduit en plus, sur justificatif.`,
  },
  {
    q: "Mon logement est classé G au DPE : puis-je encore le louer ?",
    a: "Non, pas pour une nouvelle mise en location. Pour un bail signé, renouvelé ou tacitement reconduit entre 2025 et 2027, seules les classes A à F peuvent être louées : la classe G n'atteint plus le niveau de performance minimal exigé par le critère de décence. Un bail signé avant 2025 n'est pas rompu, mais l'interdiction s'applique à son renouvellement comme à sa reconduction tacite. Attention à ne pas confondre les paliers : un bail signé entre 2023 et 2024 et non encore renouvelé relève d'un critère de CONSOMMATION — moins de 450 kWh d'énergie finale par m² de surface habitable et par an — et non d'une classe. Ensuite, seules les classes A à E pourront être louées pour un bail de 2028 à 2033, et A à D à partir de 2034. Source : service-public.gouv.fr, fiche F2042 « Logement à louer décent », onglet Métropole, vérifiée le 21 mars 2025.",
  },
  {
    q: "J'ai signé un bail en 2024 : l'interdiction de louer un logement classé G s'applique-t-elle à moi ?",
    a: "Pas tant que ce bail n'est ni renouvelé ni tacitement reconduit. Le critère de décence énergétique se lit à la date du bail : un bail signé, renouvelé ou tacitement reconduit entre 2023 et 2024 reste gouverné par un seuil de consommation — moins de 450 kWh d'énergie finale par m² de surface habitable et par an, estimée par le DPE — et non par une classe. Comme l'étiquette du DPE se calcule en énergie primaire et non en énergie finale, un logement classé G peut se trouver sous ce seuil. En revanche, au renouvellement ou à la reconduction tacite du bail, c'est le palier de la période en cours qui s'applique : classes A à F jusqu'en 2027, A à E de 2028 à 2033. Source : service-public.gouv.fr, fiche F2042, onglet Métropole, vérifiée le 21 mars 2025.",
  },
  {
    q: "Le juge peut-il obliger un bailleur en copropriété à faire des travaux de performance énergétique ?",
    a: "Pas dans trois cas, et c'est le seul abri du propriétaire. Pour un bail de 2023-2024, le juge ne peut ordonner aucune mesure visant le seuil de consommation si le logement est en copropriété et si le propriétaire démontre qu'il a proposé en assemblée générale des travaux sur les parties ou équipements communs et que, malgré des travaux dans ses parties privatives, le seuil est resté hors d'atteinte. Pour un bail signé depuis 2025, le juge ne peut ordonner les travaux ni s'ils feraient courir un risque de pathologie du bâti — structures, clos et couvert — attesté par une note argumentée d'un architecte, ni s'ils modifieraient les parties extérieures ou les éléments d'architecture et ont été refusés pour ce motif par l'autorité compétente en urbanisme ou en patrimoine. Dans ces deux derniers cas, c'est au propriétaire de fournir au juge les documents attestant l'impossibilité des travaux. Hors ces cas, le juge peut fixer les travaux et leur délai, réduire le loyer ou suspendre son paiement et la durée du bail. Source : article 20-1 de la loi n° 89-462 du 6 juillet 1989, via la fiche F2042 de service-public.gouv.fr, vérifiée le 21 mars 2025.",
  },
  {
    q: "Le propriétaire doit-il remettre une quittance chaque mois ?",
    a: "Seulement si le locataire la demande, mais alors gratuitement et sans délai. L'article 21 de la loi du 6 juillet 1989 impose que la quittance ventile les sommes versées en distinguant le loyer et les charges, et toute clause du bail qui ferait payer au locataire la quittance ou son envoi est réputée non écrite. Le refus de délivrer la quittance demandée est sanctionné : jusqu'à un an de prison et 20 000 € d'amende pour un bailleur personne physique, 100 000 € pour une personne morale. Le décompte des charges par nature, lui, relève d'un autre texte — l'article 23 de la même loi pour un logement vide, l'article 25-10 pour un meublé — et doit parvenir au locataire un mois avant la régularisation annuelle. Source : service-public.fr, fiches F2066 (vérifiée le 1ᵉʳ octobre 2026) et F947.",
  },
  {
    q: "Un propriétaire bailleur en copropriété doit-il souscrire une assurance ?",
    a: "Oui. L'article 9-1 de la loi du 10 juillet 1965 impose à chaque copropriétaire, occupant ou bailleur, d'être assuré au minimum contre les risques de responsabilité civile. C'est l'assurance dite « propriétaire non occupant » (PNO), distincte de l'assurance habitation du locataire et de l'assurance de l'immeuble souscrite par le syndic. Elle est déductible des revenus fonciers au régime réel.",
  },
];

export default function GestionLocativePage() {
  return (
    <>
      <JsonLd
        data={webPageLd({
          path: "/gestion-locative",
          name: "Déléguer sa gestion locative ou gérer seul — le calcul à Villeurbanne",
          description:
            "L'arbitrage déléguer / gérer seul chiffré à Villeurbanne, fiscalité comprise.",
          dateModified: lastmodOf("/gestion-locative"),
        })}
      />
      <JsonLd
        data={serviceLd({
          name: "Gestion locative",
          serviceType: "Gestion de biens locatifs",
          description: `Gestion locative complète à Villeurbanne et Lyon : sélection du locataire, encaissement des loyers, gestion des sinistres et des obligations légales. ${pct(
            TAUX_GESTION,
          )} TTC des encaissements, soit ${eur(
            GESTION_AN_TOTAL,
          )} par an sur un appartement loué au loyer médian communal.`,
          path: "/gestion-locative",
        })}
      />
      <JsonLd data={faqLd(FAQ)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Gestion locative", path: "/gestion-locative" },
        ])}
      />
      <SeoLanding
        eyebrow="Gestion locative"
        title={
          <>
            Déléguer, ou <span className="grad-light">gérer soi-même ?</span>
          </>
        }
        lead="Vous louez un bien à Villeurbanne ou Lyon et vous hésitez à confier sa gestion. Cette page pose l'arbitrage en euros, sur un appartement villeurbannais réel — pas en arguments."
        illustration={
          <DrawOnScroll>
            <PlantIllust size={320} className="illust-on-dark" />
          </DrawOnScroll>
        }
        updated={UPDATED}
        intro={
          <>
            La plupart des pages qui traitent ce sujet opposent « le temps gagné »
            à « le pourcentage payé ». Les deux vrais paramètres sont ailleurs :
            ce que la délégation coûte <em>après impôt</em>, et ce que le bailleur
            assume seul quand quelque chose se passe mal. Le cas de référence de
            cette page est un appartement de {SURFACE} m² — la surface médiane
            des appartements vendus à Villeurbanne en {DVF_ANNEE} — loué au loyer
            médian communal, soit {eur(LOYER_MOIS)} par mois hors charges.
          </>
        }
        sections={[
          {
            eyebrow: "L'arbitrage",
            h2: "Gérer soi-même ou déléguer : qu'est-ce qui coûte le plus cher à Villeurbanne ?",
            body: (
              <>
                <p>
                  Sur cet appartement, une année complète de gestion déléguée
                  coûte <strong>{eur(GESTION_AN_TOTAL)}</strong>, tandis
                  qu&apos;un seul mois pendant lequel le logement reste vide en
                  coûte <strong>{eur(LOYER_MOIS)}</strong>. Autrement dit, un
                  mois de vacance de trop représente{" "}
                  <strong>{MOIS_VACANCE_RATIO} année de gestion</strong>.
                  L&apos;arbitrage ne se joue donc pas sur le pourcentage : il se
                  joue sur les mois sans loyer et sur les impayés, dont le
                  montant dépasse les honoraires d&apos;un ordre de grandeur.
                </p>
                <p>
                  C&apos;est la raison pour laquelle comparer « 0 € de frais » à
                  « {pct(TAUX_GESTION)}{" "}des encaissements » n&apos;a pas de sens
                  tant que les deux colonnes ne contiennent pas les mêmes lignes.
                  La gestion directe n&apos;est pas gratuite : elle transfère le
                  coût de la vacance, du contentieux et de la mise en conformité
                  sur le propriétaire, qui l&apos;absorbe en euros et en temps
                  plutôt qu&apos;en honoraires. Le détail du barème et son calcul
                  ligne à ligne sont sur la page{" "}
                  <Link href="/faire-gerer" className={A}>
                    faire gérer votre bien
                  </Link>
                  .
                </p>
                <p>
                  Un dernier repère remet ces montants à leur échelle : ce que
                  rapporte le bien. Le rendement locatif brut d&apos;un
                  appartement villeurbannais ne vaut pas la même chose selon le
                  secteur — il va de{" "}
                  <strong>
                    {pct2(RENDEMENT_MIN)}{" "}à {pct2(RENDEMENT_MAX)}
                  </strong>{" "}
                  d&apos;un quartier à l&apos;autre aux prix réellement signés
                  en {DVF_ANNEE}, soit un écart de{" "}
                  {points(RENDEMENT_MAX - RENDEMENT_MIN)}. Sur un bien du haut
                  de cette fourchette, une année d&apos;honoraires pèse
                  nettement moins qu&apos;un mois de vacance ;{" "}
                  <Link href="/blog/rentabilite-locative-lyon" className={A}>
                    le rendement quartier par quartier
                  </Link>{" "}
                  permet de situer le vôtre avant de trancher.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Fiscalité",
            h2: "Sur un appartement villeurbannais loué au loyer médian, les honoraires de gestion sont-ils déductibles ?",
            body: (
              <>
                <p>
                  <strong>Non, pas automatiquement</strong>{" "}— et c&apos;est
                  l&apos;inverse de ce qu&apos;affirment la plupart des pages sur
                  le sujet. Le bailleur de cet appartement encaisse{" "}
                  {eur(LOYER_AN)} de loyers bruts par an, soit moins que le seuil
                  de {eur(SEUIL_MICRO)} en dessous duquel le{" "}
                  <strong>régime micro-foncier</strong>{" "}s&apos;applique de plein
                  droit — à deux conditions que les pages sur le sujet oublient :
                  ce seuil s&apos;apprécie sur l&apos;ensemble des revenus bruts
                  fonciers du <strong>foyer fiscal</strong>, quote-part de SCI
                  comprise, et non sur ce seul logement ; et il faut
                  qu&apos;aucun membre du foyer ne possède un bien relevant
                  d&apos;un régime spécial — monument historique, amortissement
                  « Périssol », « Besson neuf » ou « Robien », conventionnement
                  ANAH (« Borloo ancien », « Cosse »), « Loc&apos;Avantages » —
                  qui exclut le micro-foncier quel que soit le montant encaissé.
                  À l&apos;inverse, et c&apos;est l&apos;erreur symétrique :
                  bénéficier du « Pinel », du « Denormandie » ou du « Malraux »
                  ne fait <em>pas</em> obstacle au micro-foncier (BOFiP,
                  BOI-RFPI-DECLA-10 § 60 et § 90 à 130). Or au micro-foncier,
                  aucune charge réelle ne se déduit :
                  l&apos;administration applique un abattement forfaitaire de{" "}
                  {pct(ABATTEMENT_MICRO)} censé tout couvrir. Les{" "}
                  {eur(GESTION_AN_TOTAL)}{" "}d&apos;honoraires ne viennent donc en
                  déduction de rien.
                </p>
                <p>
                  La déductibilité n&apos;existe qu&apos;au{" "}
                  <strong>régime réel</strong>, où les rémunérations et
                  commissions versées à un tiers pour la gestion d&apos;un
                  immeuble sont déductibles pour leur montant réel (article 31,
                  I-1°-e du code général des impôts — le « e », frais
                  d&apos;administration et de gestion, et non le « a » des
                  dépenses de réparation : c&apos;est le BOFiP
                  BOI-RFPI-BASE-20-10 qui le dit à son § 20). La commission de
                  mise en location
                  entre dans le même poste : le BOFiP y range expressément, à
                  son § 60, « les commissions versées par un propriétaire à une
                  agence de location ». Le gain dépend alors de
                  votre tranche marginale, majorée des {pct(PRELEV_SOCIAUX)} de
                  prélèvements sociaux sur les revenus fonciers :
                </p>
                <div className="overflow-x-auto rounded-[12px] border border-[var(--bordure)] my-2">
                  <table className="w-full border-collapse text-[14.5px] min-w-[480px]">
                    <caption className="caption-top text-left text-[13px] text-[#6b7276] px-4 pt-3 pb-2">
                      Coût réel d&apos;une année de gestion déléguée (
                      {eur(GESTION_AN_TOTAL)}) au régime réel, selon la tranche
                      marginale d&apos;imposition.
                    </caption>
                    <thead>
                      <tr className="bg-gris">
                        {[
                          "Tranche marginale",
                          "Économie d'impôt",
                          "Coût net de la gestion",
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
                      {TMI.map((t) => (
                        <tr key={t} className="border-t border-[var(--bordure)]">
                          <td className="px-4 py-3 text-left font-medium text-anthracite">
                            {pct(t)}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                            {eur(ecoImpot(t))}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-[#3d4347]">
                            {eur(GESTION_AN_TOTAL - ecoImpot(t))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[13px] text-[#6b7276]">
                  Calcul : {eur(GESTION_AN_TOTAL)} × (tranche marginale +{" "}
                  {pct(PRELEV_SOCIAUX)}). Sources : CGI art. 31 et BOFiP
                  BOI-RFPI-BASE-20-10 pour la déductibilité, BOI-RFPI-DECLA-10
                  pour le micro-foncier.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Le seuil",
            h2: "À partir de quel loyer le régime réel devient-il intéressant ?",
            body: (
              <>
                <p>
                  Le basculement ne dépend pas des honoraires de gestion : il
                  dépend du total de vos charges réelles. Le régime réel ne
                  devient avantageux que lorsque celles-ci dépassent
                  l&apos;abattement forfaitaire de {pct(ABATTEMENT_MICRO)}, soit{" "}
                  <strong>{eur(ABATTEMENT_EUROS)} par an</strong> sur cet
                  appartement. Les {eur(GESTION_AN_TOTAL)} de gestion en
                  représentent moins du quart :{" "}
                  <strong>
                    déléguer ne justifie pas, à lui seul, de quitter le
                    micro-foncier
                  </strong>
                  .
                </p>
                <p>
                  Ce qui fait franchir ce seuil, ce sont les postes lourds —
                  travaux d&apos;entretien et de réparation, intérêts
                  d&apos;emprunt, taxe foncière, charges de copropriété non
                  récupérables, primes d&apos;assurance — auxquels les honoraires
                  s&apos;ajoutent ensuite. L&apos;autre bascule est mécanique :
                  au-delà de {eur(SEUIL_MICRO)} de loyers bruts annuels, soit{" "}
                  {eur(LOYER_MOIS_SEUIL)}{" "}par mois ou, au loyer médian
                  villeurbannais, un logement d&apos;environ {SURFACE_SEUIL}{" "}m²,
                  le régime réel s&apos;impose et la question ne se pose plus.
                  Le seuil s&apos;apprécie sur l&apos;ensemble de vos revenus
                  fonciers : deux studios y suffisent souvent.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Gérer seul",
            h2: "Que doit faire, concrètement, un propriétaire qui gère seul son logement ?",
            body: (
              <p>
                Gérer seul, ce n&apos;est pas « encaisser un loyer » : c&apos;est
                tenir une liste d&apos;obligations dont chacune a son texte et son
                délai. Aucune n&apos;est optionnelle, et leur oubli se paie soit
                en contentieux, soit en somme à restituer. Voici celles qui
                reviennent chaque année ou à chaque changement de locataire.
              </p>
            ),
            bullets: [
              "Fixer le loyer de base dans la limite du loyer de référence majoré de l'arrêté préfectoral en vigueur à la date de signature du bail, et faire figurer au bail comme dans l'annonce le loyer de base, le loyer de référence et le loyer de référence majoré — détaillé dans la section suivante.",
      "Établir un bail conforme au contrat type réglementaire et y annexer le dossier de diagnostic technique complet (DPE, état des risques, et selon l'immeuble plomb, amiante, électricité, gaz).",
              "Dresser un état des lieux d'entrée et un état des lieux de sortie, contradictoires et comparables — c'est la pièce qui décide du sort du dépôt de garantie.",
              "Remettre une quittance gratuite dès que le locataire la demande, en ventilant loyer et charges (article 21 de la loi du 6 juillet 1989).",
              "Réviser le loyer une fois par an si le bail comporte une clause de révision, en appliquant l'indice de référence des loyers du trimestre prévu au contrat — SAUF si le logement est classé F ou G au DPE : réviser le loyer y est alors interdit, pour tout bail signé, renouvelé ou tacitement reconduit depuis le 24 août 2022 en métropole (service-public.fr, fiche F1310, vérifiée le 1ᵉʳ août 2026).",
              "Régulariser les charges annuellement et communiquer au locataire leur décompte par nature un mois avant la régularisation (article 23 de la loi du 6 juillet 1989 ; article 25-10 pour un meublé), puis tenir les justificatifs à sa disposition pendant les six mois qui suivent.",
              "Maintenir le logement décent, ce qui inclut un niveau de performance énergétique minimal dont le palier dépend de la DATE DU BAIL, et non de la date à laquelle vous louez : moins de 450 kWh d'énergie finale par m² et par an pour un bail signé, renouvelé ou tacitement reconduit entre 2023 et 2024, puis les classes A à F entre 2025 et 2027 (la classe G est exclue), A à E entre 2028 et 2033 et A à D à partir de 2034 — détaillé plus bas, avec les trois cas où le juge ne peut PAS ordonner les travaux.",
              "Restituer le dépôt de garantie dans le mois suivant la remise des clés si les deux états des lieux concordent, dans les deux mois s'ils révèlent des dégradations imputables au locataire.",
              "Souscrire au minimum une assurance de responsabilité civile propriétaire non occupant, obligatoire en copropriété (article 9-1 de la loi du 10 juillet 1965).",
            ],
          },
          {
            eyebrow: "Le plafond",
            h2: "Quel plafond de loyer s'applique à un bail signé à Villeurbanne aujourd'hui ?",
            body: (
              <>
                <p>
                  <strong>
                    Le loyer hors charges d&apos;un logement loué à Villeurbanne
                    ne peut pas dépasser le « loyer de référence majoré » fixé
                    par l&apos;arrêté préfectoral en vigueur à la date de
                    signature du bail.
                  </strong>{" "}
                  Pour un bail signé jusqu&apos;au 31 octobre 2026, ce texte est
                  l&apos;arrêté n° DDT 69-2025-10-23-00004 ; pour un bail signé à
                  compter du 1ᵉʳ novembre 2026, c&apos;est l&apos;arrêté{" "}
                  <strong>n° DDT-69-2026-10-23-00004 du 23 octobre 2026</strong>,
                  publié par la préfecture du Rhône. C&apos;est la date de
                  signature du bail qui désigne le texte applicable — ni la date
                  de mise en annonce, ni celle de l&apos;entrée dans les lieux.
                </p>
                <p>
                  Ce plafond n&apos;est pas un prix unique. L&apos;arrêté fixe un
                  loyer de référence par <em>catégorie</em> de logement — secteur
                  géographique, nombre de pièces, époque de construction,
                  location vide ou meublée — exprimé en euros par mètre carré de
                  surface habitable. Le loyer de référence majoré lui est{" "}
                  <strong>supérieur de 20 %</strong>, et le loyer de référence
                  minoré <strong>inférieur de 30 %</strong>. D&apos;où une
                  conséquence que peu de pages énoncent : le loyer médian
                  communal de {LOYER_MEDIAN_HC.toLocaleString("fr-FR")} €/m² qui
                  sert de repère ailleurs sur cette page{" "}
                  <strong>ne permet pas de tester la légalité d&apos;un loyer</strong>,
                  parce qu&apos;une médiane communale n&apos;est pas une médiane
                  de catégorie. Nous ne reproduisons pas la grille ici : elle est
                  révisée chaque année, et une valeur périmée coûterait plus cher
                  qu&apos;une absence de valeur.
                </p>
                <p>
                  Trois montants doivent figurer <strong>dans le bail et dans
                  l&apos;annonce</strong> : le loyer de base, le loyer de
                  référence et le loyer de référence majoré de la catégorie du
                  logement. Si le bail omet le loyer de référence majoré, le
                  locataire a <strong>un mois</strong> à compter de la prise
                  d&apos;effet du bail pour mettre le bailleur en demeure de
                  l&apos;indiquer, par lettre recommandée avec accusé de
                  réception ; le bailleur a un mois pour répondre, et à défaut de
                  réponse ou en cas de refus, le locataire peut saisir le juge
                  des contentieux de la protection dans les trois mois suivants
                  pour obtenir une diminution de loyer.
                </p>
                <p>
                  Si le loyer de base dépasse le plafond — qu&apos;il soit
                  mentionné au bail ou non — le locataire peut demander la
                  diminution du loyer et le remboursement des trop-perçus,
                  saisir la commission départementale de conciliation puis le
                  juge, et signaler le dépassement à la préfecture. Le préfet
                  peut alors mettre le bailleur en demeure de mettre le bail en
                  conformité et de rembourser ; à défaut, l&apos;amende
                  administrative atteint <strong>5 000 €</strong> pour une
                  personne physique et <strong>15 000 €</strong> pour une
                  personne morale. Le contrôle du dispositif est confié à
                  l&apos;équipe métropolitaine de l&apos;habitat, et un numéro
                  vert (0805 160 111) renseigne les particuliers.
                </p>
                <p>
                  Un <strong>complément de loyer</strong> permet de dépasser le
                  plafond, mais à deux conditions cumulatives : le logement
                  présente des caractéristiques particulières de localisation ou
                  de confort, <em>et</em> le loyer de base est déjà égal au loyer
                  de référence majoré. Son montant et les caractéristiques qui le
                  justifient doivent figurer au bail, et la preuve en incombe au
                  bailleur ou à son agence. Depuis le{" "}
                  <strong>18 août 2022</strong>, il est interdit dès que le
                  logement présente une seule des caractéristiques listées par le
                  texte : DPE de classe F ou G, sanitaires sur le palier, signes
                  d&apos;humidité sur certains murs, vis-à-vis à moins de dix
                  mètres, fenêtres laissant anormalement passer l&apos;air,
                  infiltrations ou inondations venant de l&apos;extérieur,
                  problèmes d&apos;évacuation d&apos;eau au cours des trois
                  derniers mois, installation électrique dégradée, mauvaise
                  exposition de la pièce principale.{" "}
                  <em>
                    Source : service-public.gouv.fr, fiche F1314, vérifiée le
                    1ᵉʳ août 2026 ; préfecture du Rhône, page « Encadrement des
                    loyers ».
                  </em>
                </p>
                <p>
                  Reste une échéance que tout bailleur villeurbannais a intérêt à
                  connaître avant de signer : l&apos;encadrement des loyers est
                  une <strong>expérimentation</strong>, ouverte par
                  l&apos;article 140 de la loi ELAN du 23 novembre 2018 et portée
                  de cinq à huit ans par la loi 3DS du 21 février 2022. Elle{" "}
                  <strong>arrive à son terme le 23 novembre 2026</strong>. Le
                  Sénat a adopté le <strong>21 octobre 2026</strong>, en première
                  lecture, une prolongation de deux ans à périmètre constant —
                  aucune nouvelle commune ne pourrait rejoindre le dispositif, et
                  les collectivités engagées pourraient en sortir ; le texte
                  n&apos;est pas définitif et doit retourner devant
                  l&apos;Assemblée nationale. Ce que deviendraient les baux en
                  cours si rien n&apos;était adopté avant cette date n&apos;est
                  réglé par aucun texte publié à ce jour : nous ne le supposons
                  pas, et cette page sera corrigée quand le texte le sera. Le
                  rendement qu&apos;un loyer plafonné laisse espérer est chiffré
                  quartier par quartier dans notre{" "}
                  <Link href="/blog/rentabilite-locative-lyon" className={A}>
                    analyse de la rentabilité locative
                  </Link>
                  .
                </p>
              </>
            ),
          },
          {
            eyebrow: "La décence",
            h2: "Mon logement est-il encore louable au regard de son DPE ?",
            body: (
              <>
                <p>
                  <strong>
                    Cela dépend de la date du bail, et pas de la date à laquelle
                    vous louez : le critère de décence énergétique n&apos;est pas
                    le même pour un bail signé en 2024 et pour un bail signé
                    aujourd&apos;hui.
                  </strong>{" "}
                  La fiche officielle pose quatre périodes, et pour la première
                  ce n&apos;est même pas une classe de DPE qui compte, mais une
                  consommation. C&apos;est la distinction que la plupart des
                  pages écrasent en une seule date.
                </p>
                <ul className="mt-3 space-y-2.5 list-disc pl-5 text-[15.5px] leading-relaxed text-[#3d4347]">
                  <li>
                    <strong>
                      Bail signé, renouvelé ou tacitement reconduit entre 2023 et
                      2024
                    </strong>{" "}
                    : le logement doit consommer{" "}
                    <strong>
                      moins de 450 kWh d&apos;énergie finale par m² de surface
                      habitable et par an
                    </strong>
                    , consommation estimée par le DPE. Aucune classe n&apos;est
                    visée ici. Et comme l&apos;étiquette du DPE se calcule en
                    énergie <em>primaire</em>, un logement classé G pouvait
                    rester sous ce seuil d&apos;énergie finale : un bail de trois
                    ans signé fin 2024 court jusqu&apos;à fin 2027 et reste
                    gouverné par ce critère-là tant qu&apos;il n&apos;est pas
                    renouvelé ni tacitement reconduit.
                  </li>
                  <li>
                    <strong>Bail entre 2025 et 2027</strong> : seules les classes{" "}
                    <strong>A à F</strong> peuvent être louées — autrement dit la
                    classe G est exclue.
                  </li>
                  <li>
                    <strong>Bail entre 2028 et 2033</strong> : seules les classes{" "}
                    <strong>A à E</strong> — la classe F est exclue à son tour.
                  </li>
                  <li>
                    <strong>Bail à partir de 2034</strong> : seules les classes{" "}
                    <strong>A à D</strong> — la classe E est exclue.
                  </li>
                </ul>
                <p>
                  <strong>
                    Ce que presque personne n&apos;écrit, et qui est le seul
                    abri du bailleur : le juge ne peut pas tout ordonner.
                  </strong>{" "}
                  Si le logement n&apos;est pas décent, le locataire met le
                  propriétaire en demeure par lettre recommandée ; après{" "}
                  <strong>deux mois</strong> sans réponse ou en cas de désaccord
                  persistant, l&apos;un ou l&apos;autre peut saisir le juge des
                  contentieux de la protection, la commission départementale de
                  conciliation restant facultative. Le juge peut alors fixer les
                  travaux et leur délai, <strong>réduire le loyer</strong>, ou{" "}
                  <strong>suspendre son paiement</strong> et la durée du bail
                  jusqu&apos;à réalisation des travaux. Mais dans trois cas la loi lui
                  interdit d&apos;imposer la mise aux normes énergétiques, et le
                  premier vise la situation la plus courante à Villeurbanne, où
                  73 582 lots d&apos;habitation se répartissent dans 2 065
                  copropriétés immatriculées :
                </p>
                <ul className="mt-3 space-y-2.5 list-disc pl-5 text-[15.5px] leading-relaxed text-[#3d4347]">
                  <li>
                    <strong>Bail de 2023-2024, logement en copropriété</strong> :
                    le juge ne peut ordonner aucune mesure visant le seuil de
                    consommation si le propriétaire démontre qu&apos;il a proposé
                    en assemblée générale des travaux sur les parties ou les
                    équipements communs et que, malgré des travaux dans ses
                    parties privatives, le seuil est resté hors d&apos;atteinte.
                    En pratique, cela se prouve avec la convocation et le
                    procès-verbal de l&apos;assemblée : cet abri se prépare donc
                    avant le litige, pas pendant.
                  </li>
                  <li>
                    <strong>Bail depuis 2025, risque pour le bâti</strong> : le
                    juge ne peut ordonner les travaux s&apos;ils feraient courir
                    un risque de pathologie du bâti — structures, clos et
                    couvert — attesté par une note argumentée rédigée sous sa
                    responsabilité par un architecte.
                  </li>
                  <li>
                    <strong>Bail depuis 2025, refus d&apos;autorisation</strong>{" "}
                    : le juge ne peut pas davantage ordonner les travaux
                    s&apos;ils modifieraient les parties extérieures, le second
                    œuvre ou les éléments d&apos;architecture et de décoration,
                    et ont été refusés pour ce motif par l&apos;autorité
                    compétente en urbanisme ou en patrimoine.
                  </li>
                </ul>
                <p>
                  Dans les deux derniers cas, <strong>la preuve incombe au
                  propriétaire</strong> : c&apos;est à lui de fournir au juge les
                  documents attestant que les travaux sont impossibles, le juge
                  pouvant reporter sa décision dans l&apos;attente de la décision
                  administrative. Sources : service-public.gouv.fr, fiche F2042
                  « Logement à louer décent », onglet Métropole, vérifiée le
                  21 mars 2025 ; critère de performance énergétique de
                  l&apos;article 6 de la loi n° 89-462 du 6 juillet 1989 et du
                  décret n° 2002-120 du 30 janvier 2002, recours du locataire et
                  limites au pouvoir du juge de l&apos;article 20-1 de la même
                  loi. Le calendrier outre-mer est différent et n&apos;est pas
                  celui ci-dessus. Combien de logements sont concernés à
                  Villeurbanne, étiquette par étiquette, est compté dans notre{" "}
                  <Link href="/blog/dpe-2026-ce-qui-change" className={A}>
                    relevé des DPE de la commune
                  </Link>{" "}
                  — qui dit aussi ce que le nouveau coefficient du 1ᵉʳ janvier
                  2027 peut changer pour un logement chauffé à l&apos;électricité.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Le risque",
            h2: "Que risque un bailleur qui gère seul, et combien cela coûte-t-il ?",
            body: (
              <>
                <p>
                  Trois manquements ont un prix chiffrable, et ce sont les trois
                  plus fréquents en gestion directe. Rendre le dépôt de garantie
                  en retard majore la somme due de{" "}
                  <strong>10 % du loyer mensuel en principal par mois entamé</strong>{" "}
                  de retard — soit {eur(PENALITE_DEPOT)}{" "}par mois sur notre
                  appartement de référence, et l&apos;article 22 de la loi du
                  6 juillet 1989 ne laisse au bailleur aucune marge
                  d&apos;appréciation.
                </p>
                <p>
                  Louer un logement devenu indécent au sens du DPE expose, lui, à
                  une suspension du loyer et à une obligation de travaux : depuis
                  le 1ᵉʳ janvier 2025, un logement classé G ne peut plus être mis
                  en location, y compris au renouvellement d&apos;un bail
                  antérieur. Enfin, un impayé non traité dans les premières
                  semaines devient une procédure : sur ce bien,{" "}
                  <strong>
                    un seul mois de loyer perdu ({eur(LOYER_MOIS)}) dépasse une
                    année entière d&apos;honoraires de gestion
                  </strong>
                  . C&apos;est ce rapport, et non le taux, qui décide de
                  l&apos;arbitrage.
                </p>
              </>
            ),
          },
          {
            eyebrow: "À la carte",
            h2: "Peut-on déléguer une partie seulement de la gestion ?",
            body: (
              <p>
                Oui : la mise en location et la gestion courante sont deux
                prestations distinctes, facturées séparément et qui peuvent se
                prendre l&apos;une sans l&apos;autre. Un propriétaire qui se sent
                à l&apos;aise avec les quittances et la révision annuelle peut ne
                confier que la recherche et la sélection du locataire — l&apos;
                étape où se jouent la vacance et le risque d&apos;impayé — puis
                gérer lui-même. À l&apos;inverse, un bailleur qui a déjà un
                locataire en place peut n&apos;entrer qu&apos;en gestion
                courante. Les deux lignes, avec leur prix, figurent au{" "}
                <Link href="/honoraires" className={A}>
                  barème public
                </Link>
                . Pour savoir ce que couvre exactement chacune des deux, tâche
                par tâche, voir{" "}
                <Link
                  href="/blog/gestion-locative-villeurbanne-deleguer-ou-non"
                  className={A}
                >
                  ce que fait une agence quand vous lui confiez la gestion
                </Link>
                .
              </p>
            ),
          },
        ]}
        afterSections={<FaqBlock items={FAQ} />}
        ctaTitle={
          <>
            Confiez-nous <span className="grad-light">votre bien.</span>
          </>
        }
        ctaText="Parlons de votre projet locatif : on vous propose une étude personnalisée, sans engagement."
        primaryHref="/faire-gerer"
        primaryLabel="Demander une étude"
      />
    </>
  );
}
