import type { Metadata } from "next";
import Link from "next/link";
import { SeoLanding } from "@/components/layout/seo-landing";
import { JsonLd, breadcrumbLd, faqLd, serviceLd } from "@/components/seo/json-ld";
import { FaqBlock, type FaqItem } from "@/components/seo/faq-block";
import { QuartierPrixTable } from "@/components/seo/quartier-prix";
import { BuildingIllust } from "@/components/illustrations/building";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import {
  COMMUNE,
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
 * Page quartier « agence immobilière Gratte-Ciel ».
 *
 * Constat du 2026-09-07 (audit live) : cette page faisait ~350-400 mots, aucun
 * prix, aucune FAQ, aucun JSON-LD FAQPage — une page de marque, pas une page de
 * recherche. Les résultats qui tiennent la SERP (Human Immobilier, Nestenn,
 * Laforêt, Hosman, imkiz) publient 2 500 à 8 000 mots avec données de marché.
 *
 * Parti pris (2026-09-15) : ce qu'aucun d'eux ne publie, c'est la médiane DVF
 * recalculée sur le contour officiel du quartier, avec la taille d'échantillon.
 * C'est ce que cette page sert, et c'est ce qui la rend citable.
 *
 * ⚠️ Aucun chiffre en dur dans ce fichier : tout vient de `lib/quartiers.ts`
 * (même source que /blog/prix-immobilier-villeurbanne-2026) et les honoraires
 * du barème public de /honoraires. Ne jamais écrire ici un prix d'une autre
 * provenance.
 */

const Q = QUARTIERS["gratte-ciel"];
const ECART = ecartCommune(Q.median);
const PART_VENTES = Math.round((Q.n / COMMUNE.n) * 100);
const PRIX_MEDIAN_QUARTIER = Q.median * COMMUNE.surfaceMediane;
const HONO = honorairesVente(PRIX_MEDIAN_QUARTIER);

export const metadata: Metadata = {
  title: "Agence immobilière Gratte-Ciel (Villeurbanne) — prix au m² réels",
  description: `Prix médian à Gratte-Ciel : ${fmtM2(Q.median)} sur les ${Q.n} ventes d'appartements de 2025 (base DVF), soit ${fmtPct(ECART)} vs Villeurbanne. Markus Immobilier : estimation gratuite, vente, achat, location et gestion dans le quartier.`,
  alternates: { canonical: "/agence-immobiliere-gratte-ciel" },
  openGraph: {
    title: "Agence immobilière Gratte-Ciel — Markus Immobilier",
    description: `Prix au m² réels à Gratte-Ciel (${fmtM2(Q.median)}, ventes 2025), estimation gratuite, vente, achat et gestion locative.`,
    url: "https://www.markusimmobilier.fr/agence-immobiliere-gratte-ciel",
  },
};

/** FAQ visible — le JSON-LD FAQPage est généré depuis ce même tableau. */
const FAQ: FaqItem[] = [
  {
    q: "Quel est le prix au m² à Gratte-Ciel (Villeurbanne) ?",
    a: `Le prix médian est de ${fmtM2(Q.median)}, calculé sur les ${Q.n} ventes d'appartements réellement signées en 2025 dans le contour officiel « ${Q.contour} » (base DVF publiée par l'État). C'est ${fmtPct(ECART)} par rapport à la médiane de Villeurbanne, qui s'établit à ${fmtM2(COMMUNE.median)}. Ce n'est pas une moyenne d'annonces : ce sont des prix de vente effectifs.`,
  },
  {
    q: "Quelle surface peut-on acheter à Gratte-Ciel avec 250 000 € ?",
    a: `Au prix médian du quartier, 250 000 € représentent environ ${surfacePourBudget(Q.median, 250000)} m², soit un grand T3 ou un petit T4. Avec 200 000 €, on est autour de ${surfacePourBudget(Q.median, 200000)} m² ; avec 300 000 €, autour de ${surfacePourBudget(Q.median, 300000)} m². Ces repères valent pour un bien au prix médian : l'étage, l'ascenseur, l'état et le DPE font ensuite varier le prix réel de plusieurs centaines d'euros au m².`,
  },
  {
    q: "Les prix ont-ils baissé à Gratte-Ciel ?",
    a: `Oui, mais la baisse est derrière nous. Le quartier est à ${fmtPct(Q.vs2022)} par rapport à 2022, ce qui est proche de la baisse observée sur toute la commune (${fmtPct(COMMUNE.vs2022)}). En revanche, sur la dernière année mesurée, la médiane est repartie à ${fmtPct(Q.vs1an)} — le marché s'est stabilisé plutôt qu'il ne continue de reculer.`,
  },
  {
    q: "Le projet d'extension des Gratte-Ciel fait-il monter les prix ?",
    a: `Les ventes enregistrées ne le montrent pas encore. En 2025, le quartier progresse de ${fmtPct(Q.vs1an)} quand la commune entière progresse de ${fmtPct(COMMUNE.vs1an)} : l'écart n'est pas significatif. Le quartier conserve sa prime historique de ${fmtPct(ECART)} sur la médiane communale, mais aucune accélération liée à l'extension n'est mesurable dans les prix de vente à ce stade. Nous préférons le dire que de le supposer.`,
  },
  {
    q: "Combien de biens se vendent chaque année à Gratte-Ciel ?",
    a: `${Q.n} appartements y ont été vendus en 2025, sur ${COMMUNE.n} dans toute la commune : environ ${PART_VENTES} % du marché villeurbannais se joue dans ce seul secteur. C'est de loin le quartier le plus liquide de la ville, ce qui joue en faveur d'un vendeur — mais qui signifie aussi qu'un acheteur y a de la concurrence.`,
  },
];

const A =
  "text-anthracite font-semibold underline underline-offset-2 hover:text-sauge";

export default function GratteCielPage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "Agence immobilière à Gratte-Ciel",
          serviceType: "Services immobiliers",
          description:
            "Agence immobilière dans le quartier Gratte-Ciel à Villeurbanne : vente, achat, location, gestion locative et estimation gratuite, appuyée sur les prix de vente réels du secteur.",
          path: "/agence-immobiliere-gratte-ciel",
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Agence immobilière Gratte-Ciel", path: "/agence-immobiliere-gratte-ciel" },
        ])}
      />
      <JsonLd data={faqLd(FAQ)} />
      <SeoLanding
        eyebrow="Gratte-Ciel"
        title={<>Votre agence immobilière à <span className="grad-light">Gratte-Ciel.</span></>}
        lead="Markus Immobilier accompagne vos projets immobiliers au cœur du quartier Gratte-Ciel, à Villeurbanne. Vente, achat, location, gestion : on connaît ce secteur par cœur."
        illustration={
          <DrawOnScroll>
            <BuildingIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        updated={MAJ}
        intro={
          <>
            À Gratte-Ciel, le prix médian d&apos;un appartement est de{" "}
            <strong>{fmtM2(Q.median)}</strong>, calculé sur les {Q.n} ventes
            réellement signées en 2025 — soit {fmtPct(ECART)} par rapport à la
            médiane de Villeurbanne. C&apos;est le quartier le plus cher et le
            plus actif de la ville après Ferrandière : environ {PART_VENTES} %
            des appartements villeurbannais vendus l&apos;an dernier
            l&apos;ont été ici. Voici ce que disent les chiffres, et ce que ça
            change concrètement pour vendre ou acheter dans le secteur.
          </>
        }
        sections={[
          {
            eyebrow: "Le marché",
            h2: "Quel est le prix au m² à Gratte-Ciel ?",
            body: (
              <>
                <p>
                  <strong>{fmtM2(Q.median)}</strong> pour un appartement, sur les{" "}
                  {Q.n} ventes enregistrées dans le contour officiel «{" "}
                  {Q.contour} » en 2025. Le quartier se situe {fmtPct(ECART)}{" "}
                  au-dessus de la médiane communale ({fmtM2(COMMUNE.median)}) et
                  arrive deuxième des sept quartiers publiables de Villeurbanne.
                </p>
                <QuartierPrixTable surligne="gratte-ciel" />
                <p>
                  Ces médianes ne sont pas des estimations de portail : elles
                  sont recalculées à partir de la base DVF publiée par
                  l&apos;État, ventes réelles à l&apos;acte, et découpées selon
                  les contours de quartiers de la Métropole de Lyon. La méthode
                  complète et les prix par typologie sont détaillés dans notre
                  analyse des{" "}
                  <Link href="/blog/prix-immobilier-villeurbanne-2026" className={A}>
                    prix au m² réels par quartier de Villeurbanne
                  </Link>
                  .
                </p>
              </>
            ),
          },
          {
            eyebrow: "Votre budget",
            h2: "Quelle surface peut-on acheter à Gratte-Ciel ?",
            body: (
              <>
                <p className="mb-3">
                  Au prix médian du quartier, un budget de 200 000 € correspond à
                  environ <strong>{surfacePourBudget(Q.median, 200000)} m²</strong>,
                  250 000 € à <strong>{surfacePourBudget(Q.median, 250000)} m²</strong>,
                  et 300 000 € à <strong>{surfacePourBudget(Q.median, 300000)} m²</strong>.
                  À surface égale, le même budget donne{" "}
                  {surfacePourBudget(QUARTIERS.cusset.median, 250000) -
                    surfacePourBudget(Q.median, 250000)}{" "}
                  m² de plus à{" "}
                  <Link href="/agence-immobiliere-cusset" className={A}>
                    Cusset
                  </Link>{" "}
                  — c&apos;est le prix de la centralité.
                </p>
                <p>
                  Ces repères valent pour un bien au prix médian. Dans un quartier
                  à fort cachet comme celui-ci, l&apos;étage, la présence
                  d&apos;un ascenseur, la luminosité, le DPE et la proximité
                  immédiate du marché déplacent facilement le prix de plusieurs
                  centaines d&apos;euros au m². C&apos;est précisément ce qu&apos;un
                  prix au m² moyen ne sait pas dire — et ce qu&apos;une{" "}
                  <Link href="/estimation" className={A}>
                    estimation sur les ventes réelles du quartier
                  </Link>{" "}
                  corrige en deux minutes.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Vendre ici",
            h2: "Combien coûte la vente d'un appartement à Gratte-Ciel ?",
            body: (
              <>
                <p className="mb-3">
                  Un appartement de {COMMUNE.surfaceMediane} m² — la surface
                  médiane villeurbannaise — au prix médian du quartier
                  représente environ{" "}
                  <strong>{fmtEur(Math.round(PRIX_MEDIAN_QUARTIER / 1000) * 1000)}</strong>.
                  {HONO && (
                    <>
                      {" "}
                      À ce niveau de prix, nos honoraires de vente relèvent de la
                      tranche <strong>{HONO.label}</strong> du barème, soit
                      environ{" "}
                      <strong>{fmtEur(Math.round(HONO.montant / 100) * 100)} TTC</strong>,
                      à la charge du vendeur.
                    </>
                  )}
                </p>
                <p>
                  Le barème est public et identique pour tous les mandants : il
                  est affiché en entier sur notre page{" "}
                  <Link href="/honoraires" className={A}>
                    honoraires
                  </Link>
                  , tranche par tranche, y compris pour la location et la
                  gestion. Aucun pourcentage négocié au cas par cas, aucun frais
                  de dossier ajouté à la signature.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Le quartier",
            h2: "Pourquoi Gratte-Ciel reste le secteur le plus demandé de Villeurbanne",
            body: (
              <>
                <p className="mb-3">
                  Gratte-Ciel est le cœur historique et commerçant de la ville :
                  l&apos;ensemble architectural des années 1930, le marché, le
                  Théâtre National Populaire, l&apos;hôtel de ville, les
                  commerces du cours Émile Zola, et le métro A qui met la
                  Part-Dieu à quelques minutes. Le projet d&apos;extension du
                  centre-ville prolonge ce tissu vers le nord.
                </p>
                <p>
                  Ce qui se traduit dans les chiffres de deux façons : une prime
                  de {fmtPct(ECART)} sur le prix communal, et surtout un volume de
                  transactions sans équivalent en ville — {Q.n} ventes en un an,
                  soit près de {PART_VENTES} % du marché villeurbannais. Un
                  marché liquide, c&apos;est un délai de vente plus court quand
                  le prix est juste, et une décote rapide quand il ne
                  l&apos;est pas : sur ce secteur, se tromper de 5 % à la mise en
                  vente se paie en semaines de visites inutiles. Voir aussi notre
                  page{" "}
                  <Link href="/agence-immobiliere-villeurbanne" className={A}>
                    agence immobilière à Villeurbanne
                  </Link>{" "}
                  et le quartier voisin de{" "}
                  <Link href="/agence-immobiliere-charpennes" className={A}>
                    Charpennes
                  </Link>
                  .
                </p>
              </>
            ),
          },
          {
            eyebrow: "Nos services ici",
            h2: "Ce que Markus Immobilier fait pour vous à Gratte-Ciel",
            bullets: [
              `Estimation gratuite appuyée sur les ventes réelles du quartier, pas sur un prix au m² national.`,
              "Vente de votre appartement au juste prix, du mandat à l'acte notarié.",
              "Accompagnement à l'achat, avec accès aux biens avant publication.",
              "Location et mise en gestion, barème public et garantie loyers impayés en option.",
            ],
          },
        ]}
        afterSections={<FaqBlock items={FAQ} />}
        ctaTitle={<>Un projet à <span className="grad-light">Gratte-Ciel ?</span></>}
        ctaText="Estimez votre bien gratuitement en 2 minutes, sur les ventes réelles du quartier — ou échangez directement avec un conseiller du secteur."
      />
    </>
  );
}
