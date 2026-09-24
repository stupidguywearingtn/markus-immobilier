import type { Metadata } from "next";
import { shareMeta } from "@/lib/seo/share";
import Link from "next/link";
import { SeoLanding } from "@/components/layout/seo-landing";
import { JsonLd, breadcrumbLd, faqLd, serviceLd, webPageLd } from "@/components/seo/json-ld";
import { FaqBlock, type FaqItem } from "@/components/seo/faq-block";
import { QuartierPrixTable } from "@/components/seo/quartier-prix";
import { BuildingIllust } from "@/components/illustrations/building";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import { lastmodOf } from "@/lib/seo/lastmod";
import {
  COMMUNE,
  LOYER_MEDIAN_HC,
  MAJ,
  QUARTIERS,
  ecartCommune,
  fmtEur,
  fmtM2,
  fmtPct,
  honorairesVente,
  surfacePourBudget,
} from "@/lib/quartiers";

/**
 * Page quartier « agence immobilière Charpennes ».
 *
 * Constat du 2026-09-07 (audit live) : ~550-650 mots, aucun prix, aucune FAQ.
 *
 * Parti pris (2026-09-15) : Charpennes est LE quartier où l'angle locatif est
 * légitime (métro A + B + T1 + T4, campus à proximité). Deux faits que personne
 * ne publie et que nos données donnent :
 *  1. c'est le seul des sept quartiers publiables dont la médiane BAISSE encore
 *     sur la dernière année, et celui qui a le plus reculé depuis 2022 ;
 *  2. les sites d'investissement y annoncent des prix très au-dessus des ventes
 *     réelles (CPIM : « Charpennes 5 120 €/m² » contre notre médiane DVF).
 *
 * ⚠️ Le rendement affiché s'appuie sur le loyer médian COMMUNAL
 * (`LOYER_MEDIAN_HC`) : il n'existe pas de loyer de référence par quartier.
 * Cette limite doit rester écrite noir sur blanc dans la page — c'est ce qui
 * distingue ce contenu des rendements « par quartier » inventés par les
 * concurrents. Aucun chiffre en dur ici : tout vient de `lib/quartiers.ts`.
 */

const Q = QUARTIERS.charpennes;
const ECART = ecartCommune(Q.median);
const PRIX_MEDIAN_QUARTIER = Q.median * COMMUNE.surfaceMediane;
const HONO = honorairesVente(PRIX_MEDIAN_QUARTIER);

/** Rendement brut indicatif d'un T2 de 40 m² au prix médian du quartier. */
const T2_M2 = 40;
const T2_PRIX = Q.median * T2_M2;
const T2_LOYER_MOIS = Math.round(LOYER_MEDIAN_HC * T2_M2);
const T2_RENDEMENT = ((T2_LOYER_MOIS * 12) / T2_PRIX) * 100;
const fmtRdt = (n: number) =>
  `${n.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;

/** Prix affiché par les sites d'investissement, relevé le 2026-09-12 (CPIM). */
const PRIX_AFFICHE_INVEST = 5120;
const ECART_INVEST = Math.round((PRIX_AFFICHE_INVEST / Q.median - 1) * 100);

export const metadata: Metadata = {
  title: "Agence immobilière Charpennes (Villeurbanne) — prix et rendement réels",
  description: `Prix médian à Charpennes – Tonkin : ${fmtM2(Q.median)} sur les ${Q.n} ventes d'appartements de 2025 (base DVF), ${fmtPct(Q.vs2022)} depuis 2022. Markus Immobilier : estimation gratuite, vente, location et gestion locative.`,
  alternates: { canonical: "/agence-immobiliere-charpennes" },
  ...shareMeta({
    title: "Agence immobilière Charpennes — Markus Immobilier",
    description: `Prix au m² réels à Charpennes (${fmtM2(Q.median)}, ventes 2025), rendement locatif chiffré, estimation gratuite.`,
    path: "/agence-immobiliere-charpennes",
  }),
};

/** FAQ visible — le JSON-LD FAQPage est généré depuis ce même tableau. */
const FAQ: FaqItem[] = [
  {
    q: "Quel est le prix au m² à Charpennes (Villeurbanne) ?",
    a: `Le prix médian est de ${fmtM2(Q.median)}, calculé sur les ${Q.n} ventes d'appartements réellement signées en 2025 dans le contour officiel « ${Q.contour} » (base DVF publiée par l'État). C'est ${fmtPct(ECART)} par rapport à la médiane de Villeurbanne, qui s'établit à ${fmtM2(COMMUNE.median)}. Attention aux chiffres nettement plus élevés que l'on trouve en ligne : ils viennent d'annonces, pas de ventes.`,
  },
  {
    q: "Pourquoi certains sites annoncent-ils plus de 5 000 €/m² à Charpennes ?",
    a: `Parce qu'ils publient des prix d'annonces ou des estimations propriétaires, pas des prix de vente. Un site d'investissement relevé en septembre 2026 affichait ${fmtM2(PRIX_AFFICHE_INVEST)} pour Charpennes, soit ${ECART_INVEST} % au-dessus de la médiane des ventes réellement enregistrées dans le quartier la même année. Sur un T3, l'écart représente plusieurs dizaines de milliers d'euros de budget. Les chiffres de cette page viennent des actes, via la base DVF de l'État.`,
  },
  {
    q: "Charpennes est-il un bon secteur pour investir en locatif ?",
    a: `C'est le secteur le mieux desservi de Villeurbanne — Charpennes – Charles Hernu réunit les métros A et B et les tramways T1 et T4 — donc la demande locative y est structurellement forte. Ordre de grandeur : un T2 de ${T2_M2} m² au prix médian du quartier représente environ ${fmtEur(Math.round(T2_PRIX / 1000) * 1000)}, pour un loyer d'environ ${fmtEur(T2_LOYER_MOIS)} hors charges, soit ${fmtRdt(T2_RENDEMENT)} de rendement brut. Précision importante : ce calcul utilise le loyer médian de la commune (${LOYER_MEDIAN_HC.toLocaleString("fr-FR")} €/m² hors charges), car il n'existe pas de loyer de référence par quartier. Et c'est un rendement brut : charges de copropriété, taxe foncière, vacance et honoraires de gestion ne sont pas déduits.`,
  },
  {
    q: "Pourquoi les prix ont-ils plus baissé à Charpennes qu'ailleurs à Villeurbanne ?",
    a: `Charpennes – Tonkin est le quartier qui a le plus reculé de la commune : ${fmtPct(Q.vs2022)} depuis 2022, contre ${fmtPct(COMMUNE.vs2022)} pour Villeurbanne entière. C'est aussi le seul des sept quartiers publiables dont la médiane baisse encore sur la dernière année mesurée (${fmtPct(Q.vs1an)}, quand la commune remonte de ${fmtPct(COMMUNE.vs1an)}). Les données de vente ne disent pas pourquoi ; elles disent que pour un acheteur, c'est aujourd'hui le secteur central le plus négociable de la ville.`,
  },
  {
    q: "Combien d'appartements se vendent chaque année à Charpennes ?",
    a: `${Q.n} appartements y ont été vendus en 2025, contre ${QUARTIERS["gratte-ciel"].n} à Gratte-Ciel – Dedieu – Charmettes. Un marché plus étroit signifie moins de points de comparaison, donc une estimation plus sensible à la qualité du bien : à Charpennes plus qu'ailleurs, un prix au m² moyen ne suffit pas.`,
  },
];

const A =
  "text-anthracite font-semibold underline underline-offset-2 hover:text-sauge";

export default function CharpennesPage() {
  return (
    <>
      <JsonLd
        data={webPageLd({
          path: "/agence-immobiliere-charpennes",
          name: "Agence immobilière Charpennes (Villeurbanne)",
          description:
            "Prix au m² réels et rendement locatif du quartier Charpennes, calculés sur les ventes enregistrées.",
          dateModified: lastmodOf("/agence-immobiliere-charpennes"),
        })}
      />
      <JsonLd
        data={serviceLd({
          name: "Agence immobilière à Charpennes",
          serviceType: "Services immobiliers",
          description:
            "Agence immobilière dans le quartier Charpennes à Villeurbanne : vente, achat, location, gestion locative et estimation gratuite, appuyée sur les prix de vente réels du secteur.",
          path: "/agence-immobiliere-charpennes",
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Agence immobilière Charpennes", path: "/agence-immobiliere-charpennes" },
        ])}
      />
      <JsonLd data={faqLd(FAQ)} />
      <SeoLanding
        eyebrow="Charpennes"
        title={<>Votre agence immobilière à <span className="grad-light">Charpennes.</span></>}
        lead="Markus Immobilier vous accompagne à Charpennes, le quartier le mieux desservi de Villeurbanne. Vente, achat, location et investissement locatif."
        illustration={
          <DrawOnScroll>
            <BuildingIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        updated={MAJ}
        intro={
          <>
            À Charpennes – Tonkin, le prix médian d&apos;un appartement est de{" "}
            <strong>{fmtM2(Q.median)}</strong>, calculé sur les {Q.n} ventes
            réellement signées en 2025 — soit {fmtPct(ECART)} par rapport à la
            médiane de Villeurbanne. C&apos;est aussi le quartier qui a le plus
            reculé depuis 2022 ({fmtPct(Q.vs2022)}), ce qui en fait aujourd&apos;hui
            le secteur central le plus négociable de la ville. Voici les chiffres,
            et ce qu&apos;ils changent pour vendre, acheter ou investir ici.
          </>
        }
        sections={[
          {
            eyebrow: "Le marché",
            h2: "Quel est le prix au m² à Charpennes ?",
            body: (
              <>
                <p>
                  <strong>{fmtM2(Q.median)}</strong> pour un appartement, sur les{" "}
                  {Q.n} ventes enregistrées dans le contour officiel «{" "}
                  {Q.contour} » en 2025 — {fmtPct(ECART)} par rapport à la
                  médiane communale ({fmtM2(COMMUNE.median)}).
                </p>
                <QuartierPrixTable surligne="charpennes" />
                <p>
                  Deux lectures utiles dans ce tableau. La première : Charpennes
                  est le <strong>seul quartier encore en baisse</strong> sur la
                  dernière année ({fmtPct(Q.vs1an)}) alors que les six autres
                  remontent. La seconde : c&apos;est celui qui a le plus perdu
                  depuis 2022 ({fmtPct(Q.vs2022)} contre {fmtPct(COMMUNE.vs2022)}{" "}
                  pour la commune). La méthode de calcul et les prix par
                  typologie sont détaillés dans notre analyse des{" "}
                  <Link href="/blog/prix-immobilier-villeurbanne-2026" className={A}>
                    prix au m² réels par quartier de Villeurbanne
                  </Link>
                  .
                </p>
              </>
            ),
          },
          {
            eyebrow: "À vérifier",
            h2: "Pourquoi trouve-t-on des prix bien plus élevés ailleurs sur le web ?",
            body: (
              <>
                <p className="mb-3">
                  Parce que la plupart des chiffres en ligne sont des{" "}
                  <strong>prix d&apos;annonces</strong>, pas des prix de vente.
                  Un site d&apos;investissement locatif relevé en septembre 2026
                  affichait <strong>{fmtM2(PRIX_AFFICHE_INVEST)}</strong> pour
                  Charpennes, soit <strong>{ECART_INVEST} % de plus</strong> que
                  la médiane des ventes réellement signées dans le quartier la
                  même année.
                </p>
                <p>
                  Sur un T3 de 70 m², cet écart représente environ{" "}
                  {fmtEur(Math.round(((PRIX_AFFICHE_INVEST - Q.median) * 70) / 1000) * 1000)}{" "}
                  de budget. Un acheteur qui se fie à ces chiffres surpaie ; un
                  vendeur qui s&apos;en sert pour fixer son prix reste en vitrine.
                  C&apos;est la raison pour laquelle nos estimations partent des
                  actes, et jamais des annonces.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Investir",
            h2: "Quel rendement locatif attendre à Charpennes ?",
            body: (
              <>
                <p className="mb-3">
                  Ordre de grandeur, calculé et non affirmé : un T2 de {T2_M2} m²
                  au prix médian du quartier représente environ{" "}
                  <strong>{fmtEur(Math.round(T2_PRIX / 1000) * 1000)}</strong>{" "}
                  pour un loyer d&apos;environ{" "}
                  <strong>{fmtEur(T2_LOYER_MOIS)} hors charges</strong>, soit{" "}
                  <strong>{fmtRdt(T2_RENDEMENT)} de rendement brut</strong>.
                </p>
                <p className="mb-3">
                  Deux limites à garder en tête, que les rendements « par
                  quartier » publiés ailleurs passent sous silence. D&apos;abord,
                  ce calcul utilise le <strong>loyer médian de la commune</strong>{" "}
                  ({LOYER_MEDIAN_HC.toLocaleString("fr-FR")} €/m² hors charges) :
                  il n&apos;existe pas de loyer de référence par quartier, donc
                  personne ne peut honnêtement publier un rendement propre à
                  Charpennes. Ensuite, un rendement <em>brut</em> ne déduit ni les
                  charges de copropriété, ni la taxe foncière, ni la vacance, ni
                  les honoraires de gestion.
                </p>
                <p>
                  Ce que le secteur a pour lui est en revanche factuel : la
                  station Charpennes – Charles Hernu réunit les{" "}
                  <strong>métros A et B</strong> et les{" "}
                  <strong>tramways T1 et T4</strong>, la Part-Dieu et les campus
                  sont à quelques minutes, et la frontière avec Lyon 6 est à pied.
                  Pour confier la suite, tout est sur notre page{" "}
                  <Link href="/gestion-locative" className={A}>
                    gestion locative
                  </Link>{" "}
                  et le dossier se lance depuis{" "}
                  <Link href="/faire-gerer" className={A}>
                    faire gérer mon bien
                  </Link>
                  .
                </p>
              </>
            ),
          },
          {
            eyebrow: "Votre budget",
            h2: "Quelle surface peut-on acheter à Charpennes ?",
            body: (
              <p>
                Au prix médian du quartier, 200 000 € correspondent à environ{" "}
                <strong>{surfacePourBudget(Q.median, 200000)} m²</strong>,
                250 000 € à <strong>{surfacePourBudget(Q.median, 250000)} m²</strong>{" "}
                et 300 000 € à <strong>{surfacePourBudget(Q.median, 300000)} m²</strong>{" "}
                — soit {surfacePourBudget(Q.median, 250000) - surfacePourBudget(QUARTIERS["gratte-ciel"].median, 250000)}{" "}
                m² de plus qu&apos;à{" "}
                <Link href="/agence-immobiliere-gratte-ciel" className={A}>
                  Gratte-Ciel
                </Link>{" "}
                pour le même budget. Un appartement de {COMMUNE.surfaceMediane} m²
                au prix médian du quartier représente environ{" "}
                <strong>{fmtEur(Math.round(PRIX_MEDIAN_QUARTIER / 1000) * 1000)}</strong>
                {HONO && (
                  <>
                    , ce qui place nos honoraires de vente dans la tranche{" "}
                    <strong>{HONO.label}</strong> du{" "}
                    <Link href="/honoraires" className={A}>
                      barème public
                    </Link>
                    , soit environ {fmtEur(Math.round(HONO.montant / 100) * 100)} TTC
                  </>
                )}
                . Pour une fourchette sur votre bien précis, l&apos;
                <Link href="/estimation" className={A}>
                  estimation en ligne
                </Link>{" "}
                prend deux minutes et compare aux ventes du secteur.
              </p>
            ),
          },
          {
            eyebrow: "Nos services ici",
            h2: "Ce que Markus Immobilier fait pour vous à Charpennes",
            bullets: [
              "Estimation gratuite appuyée sur les ventes réelles du quartier, pas sur des prix d'annonces.",
              "Vente d'appartements, du mandat à l'acte notarié.",
              "Recherche pour les investisseurs : rendement calculé avant l'offre, pas après.",
              "Mise en location et gestion locative complète, barème public.",
            ],
          },
        ]}
        afterSections={<FaqBlock items={FAQ} />}
        ctaTitle={<>Un projet à <span className="grad-light">Charpennes ?</span></>}
        ctaText="Estimez votre bien gratuitement en 2 minutes sur les ventes réelles du quartier, ou parlons de votre projet locatif."
      />
    </>
  );
}
