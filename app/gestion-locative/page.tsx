import type { Metadata } from "next";
import Link from "next/link";
import { shareMeta } from "@/lib/seo/share";
import { SeoLanding } from "@/components/layout/seo-landing";
import {
  JsonLd,
  breadcrumbLd,
  faqLd,
  serviceLd,
} from "@/components/seo/json-ld";
import { FaqBlock, type FaqItem } from "@/components/seo/faq-block";
import { PlantIllust } from "@/components/illustrations/plant";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import { COMMUNE, DVF_ANNEE, LOYER_MEDIAN_HC } from "@/lib/quartiers";

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
 *    CGI art. 31, I-1°-a ; BOFiP BOI-RFPI-BASE-20-10.
 *  - prélèvements sociaux sur revenus fonciers : 17,2 %.
 *  - pénalité de retard sur le dépôt de garantie : 10 % du loyer mensuel en
 *    principal par mois entamé → loi n° 89-462 du 6 juillet 1989, art. 22.
 *  - calendrier de décence énergétique (G au 1ᵉʳ janvier 2025, F en 2028,
 *    E en 2034) → loi Climat et Résilience n° 2021-1104 du 22 août 2021.
 *  - assurance PNO obligatoire en copropriété → loi n° 65-557, art. 9-1.
 *  Aucune durée de gestion « en heures par an » n'est avancée : personne ne
 *  l'a mesurée ici, et l'inventer est exclu.
 */

/** Date de dernière modification réelle du contenu de cette page (ISO). */
const UPDATED = "2026-09-21";

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

const eur = (n: number) => `${n.toLocaleString("fr-FR")} €`;
const pct = (t: number) =>
  `${(t * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %`;

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
    q: "L'option pour le régime réel est-elle réversible ?",
    a: `Non, pas immédiatement : l'option est exercée pour trois ans et elle est irrévocable pendant cette période. Elle se prend sans formalité particulière, par la simple souscription de la déclaration n° 2044 dans le délai de dépôt de la déclaration de revenus. Passés les trois ans, elle reste valable tant que vous demeurez dans le champ du micro-foncier, et vous pouvez alors revenir à l'abattement forfaitaire. Source : BOFiP, BOI-RFPI-DECLA-10.`,
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
    a: "Non, pas pour une nouvelle mise en location. Depuis le 1ᵉʳ janvier 2025, un logement classé G au diagnostic de performance énergétique n'atteint plus le niveau de performance minimal exigé par le critère de décence, en application de la loi Climat et Résilience du 22 août 2021. Un bail signé avant cette date n'est pas rompu, mais l'interdiction s'applique à son renouvellement ou à sa reconduction tacite. Les logements classés F suivront au 1ᵉʳ janvier 2028, et les E au 1ᵉʳ janvier 2034.",
  },
  {
    q: "Le propriétaire doit-il remettre une quittance chaque mois ?",
    a: "Seulement si le locataire la demande, mais alors gratuitement et sans délai. L'article 21 de la loi du 6 juillet 1989 impose que la quittance ventile les sommes versées en distinguant le loyer et les charges. Le même article oblige le bailleur à communiquer au locataire le décompte des charges par nature un mois avant leur régularisation annuelle — c'est l'une des obligations les plus souvent oubliées en gestion directe.",
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
                  droit. Or au micro-foncier, aucune charge réelle ne se déduit :
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
                  I-1°-a du code général des impôts). Le gain dépend alors de
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
              "Établir un bail conforme au contrat type réglementaire et y annexer le dossier de diagnostic technique complet (DPE, état des risques, et selon l'immeuble plomb, amiante, électricité, gaz).",
              "Dresser un état des lieux d'entrée et un état des lieux de sortie, contradictoires et comparables — c'est la pièce qui décide du sort du dépôt de garantie.",
              "Remettre une quittance gratuite dès que le locataire la demande, en ventilant loyer et charges (article 21 de la loi du 6 juillet 1989).",
              "Réviser le loyer une fois par an si le bail comporte une clause de révision, en appliquant l'indice de référence des loyers du trimestre prévu au contrat.",
              "Régulariser les charges annuellement et communiquer au locataire leur décompte par nature un mois avant la régularisation.",
              "Maintenir le logement décent, ce qui inclut depuis le 1ᵉʳ janvier 2025 un DPE au minimum classé F, puis E au 1ᵉʳ janvier 2028 et D au 1ᵉʳ janvier 2034.",
              "Restituer le dépôt de garantie dans le mois suivant la remise des clés si les deux états des lieux concordent, dans les deux mois s'ils révèlent des dégradations imputables au locataire.",
              "Souscrire au minimum une assurance de responsabilité civile propriétaire non occupant, obligatoire en copropriété (article 9-1 de la loi du 10 juillet 1965).",
            ],
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
