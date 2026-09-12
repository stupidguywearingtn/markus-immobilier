import type { Metadata } from "next";
import Link from "next/link";
import { SeoLanding } from "@/components/layout/seo-landing";
import { JsonLd, breadcrumbLd, faqLd, serviceLd } from "@/components/seo/json-ld";
import { FaqBlock, type FaqItem } from "@/components/seo/faq-block";
import { BuildingIllust } from "@/components/illustrations/building";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

/**
 * Page « agence immobilière Villeurbanne » — requête commerciale n°1 de la ville
 * de l'agence, mesurée absente du top 9 cinq runs de suite (SERP tenue par des
 * annuaires et des réseaux franchisés).
 *
 * Parti pris (2026-09-12) : sur cette SERP, le contenu ne battra pas
 * PagesJaunes ni les franchises au classement — le levier y est la fiche Google
 * Business Profile. En revanche, **aucun de ces résultats ne publie ce que coûte
 * une agence**. C'est ce que cette page répond, chiffres du barème à l'appui :
 * l'objectif est la citation par les moteurs de réponse (ChatGPT, Perplexity,
 * AI Overviews) sur « combien coûte une agence immobilière à Villeurbanne ».
 *
 * ⚠️ Deux familles de chiffres, deux sources, aucune invention :
 *  - honoraires → `app/honoraires/page.tsx` (barème public, page canonique).
 *    Le barème VENTE est à la charge du vendeur ; le 9 % est la part
 *    propriétaire sur la MISE EN LOCATION, jamais sur une vente.
 *  - prix au m² → calcul DVF publié dans /blog/prix-immobilier-villeurbanne-2026
 *    (ventes 2025). Ne jamais écrire ici un prix qui n'en vienne pas.
 */

const UPDATED = "2026-09-12";

export const metadata: Metadata = {
  title: "Agence immobilière à Villeurbanne — honoraires et secteur",
  description:
    "Markus Immobilier, agence indépendante à Villeurbanne (87 rue Édouard Vaillant) : barème d'honoraires public, prix au m² par quartier calculés sur les ventes réelles, estimation gratuite en 2 minutes.",
  alternates: { canonical: "/agence-immobiliere-villeurbanne" },
  openGraph: {
    title: "Agence immobilière à Villeurbanne — Markus Immobilier",
    description:
      "Agence indépendante au cœur de Villeurbanne : honoraires publiés, prix par quartier, vente, achat, location et gestion.",
    url: "https://www.markusimmobilier.fr/agence-immobiliere-villeurbanne",
  },
};

/** FAQ visible — le JSON-LD FAQPage est généré depuis ce même tableau. */
const FAQ: FaqItem[] = [
  {
    q: "Combien coûte une agence immobilière pour vendre à Villeurbanne ?",
    a: "Chez Markus Immobilier, les honoraires de vente sont à la charge du vendeur et suivent un barème public : 9 000 € forfaitaires pour un bien vendu entre 50 001 et 170 000 €, 6 % entre 170 001 et 300 000 €, puis 5 % entre 300 001 et 500 000 €. Sur le prix médian d'un appartement villeurbannais en 2025 — 195 000 € d'après les ventes enregistrées — cela représente environ 11 700 € TTC.",
  },
  {
    q: "Quels sont les honoraires de gestion locative à Villeurbanne ?",
    a: "La gestion courante est facturée 6 % TTC des encaissements mensuels par lot, avec un minimum de 25 €. La garantie loyers impayés (GLI) est optionnelle, à 2,5 % du loyer. La mise en location, elle, est facturée séparément : 9 % du loyer annuel hors charges pour la part propriétaire.",
  },
  {
    q: "Quel est le prix au m² à Villeurbanne en 2026 ?",
    a: "La médiane est de 3 567 €/m² pour un appartement, calculée sur les 1 875 ventes réellement signées dans la commune en 2025 (base DVF publiée par l'État). Selon le quartier, elle va de 2 738 €/m² à Cyprian – Les Brosses à 3 923 €/m² à Ferrandière – Maisons-Neuves, soit 43 % d'écart.",
  },
  {
    q: "Où se trouve l'agence et quels sont ses horaires ?",
    a: "Markus Immobilier est installée au 87 rue Édouard Vaillant, 69100 Villeurbanne, à proximité immédiate du métro et du tramway. L'agence est ouverte du lundi au samedi de 9h à 12h, et du lundi au vendredi de 14h à 19h sur rendez-vous. Téléphone : 04 78 37 13 67.",
  },
  {
    q: "L'agence intervient-elle en dehors de Villeurbanne ?",
    a: "Oui. Markus Immobilier travaille sur l'ensemble de Villeurbanne, sur Lyon et plus largement sur la Métropole de Lyon, pour la vente, l'achat, la location et la gestion locative. Le secteur de proximité reste Villeurbanne, où l'agence est implantée.",
  },
  {
    q: "Faut-il payer pour faire estimer son bien ?",
    a: "Non. L'estimation en ligne est gratuite et sans engagement : vous renseignez l'adresse et les caractéristiques du logement, et vous recevez par e-mail une fourchette de prix de vente, un loyer estimé et un rendement, en moins de deux minutes. La visite d'un conseiller pour affiner la fourchette est également gratuite.",
  },
];

const A =
  "text-anthracite font-semibold underline underline-offset-2 hover:text-sauge";

export default function AgenceVilleurbannePage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "Agence immobilière à Villeurbanne",
          serviceType: "Services immobiliers",
          description:
            "Agence immobilière indépendante à Villeurbanne : vente, achat, location, gestion locative et estimation gratuite. Barème d'honoraires public.",
          path: "/agence-immobiliere-villeurbanne",
        })}
      />
      <JsonLd data={faqLd(FAQ)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Agence immobilière Villeurbanne", path: "/agence-immobiliere-villeurbanne" },
        ])}
      />
      <SeoLanding
        eyebrow="Villeurbanne"
        title={<>Votre agence immobilière <span className="grad-light">à Villeurbanne.</span></>}
        lead="Markus Immobilier est une agence indépendante implantée au cœur de Villeurbanne, 87 rue Édouard Vaillant. Vente, achat, location, gestion : on connaît le terrain quartier par quartier."
        illustration={
          <DrawOnScroll>
            <BuildingIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        updated={UPDATED}
        intro="Markus Immobilier est une agence immobilière indépendante installée à Villeurbanne depuis 7 ans, au 87 rue Édouard Vaillant. Plus de 250 biens accompagnés, 300 clients, 40 M€ de projets menés depuis ce secteur. Cette page répond aux questions qu'on nous pose le plus souvent avant de choisir une agence : ce que ça coûte, ce que ça couvre, et à quels prix se vendent réellement les biens du quartier."
        sections={[
          {
            eyebrow: "Honoraires",
            h2: "Combien coûte une agence immobilière pour vendre à Villeurbanne ?",
            body: (
              <>
                <p className="mb-3">
                  Les honoraires de vente de Markus Immobilier sont à la charge
                  du vendeur et suivent un barème public : <strong>9 000 €</strong>{" "}
                  forfaitaires pour un bien vendu entre 50 001 et 170 000 €,{" "}
                  <strong>6 %</strong> entre 170 001 et 300 000 €, puis{" "}
                  <strong>5 %</strong>{" "}
                  entre 300 001 et 500 000 € et 4 % au-delà de 500 000 €. Sur le
                  prix médian d&apos;un appartement villeurbannais en 2025 —{" "}
                  <strong>195 000 €</strong>{" "}
                  d&apos;après les ventes enregistrées chez le notaire — cela
                  représente{" "}
                  <strong>environ 11 700 € TTC</strong>.
                </p>
                <p>
                  Le barème complet, y compris la location et la gestion, est
                  publié sur{" "}
                  <Link href="/honoraires" className={A}>
                    notre page honoraires
                  </Link>{" "}
                  et téléchargeable en PDF. C&apos;est volontaire : un vendeur
                  doit pouvoir comparer le coût d&apos;une agence avant de
                  pousser sa porte, pas après.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Notre secteur",
            h2: "À quel prix se vendent les appartements de Villeurbanne ?",
            body: (
              <>
                <p className="mb-3">
                  Le prix médian d&apos;un appartement à Villeurbanne est de{" "}
                  <strong>3 567 €/m²</strong>, calculé sur les{" "}
                  <strong>1 875 ventes</strong> réellement signées dans la
                  commune en 2025. Selon le quartier, la médiane va de{" "}
                  <strong>2 738 €/m²</strong> à Cyprian – Les Brosses à{" "}
                  <strong>3 923 €/m²</strong>{" "}
                  à Ferrandière – Maisons-Neuves,
                  soit 43 % d&apos;écart d&apos;un bout à l&apos;autre de la
                  ville.
                </p>
                <p>
                  Ces chiffres ne sont pas des moyennes d&apos;annonces : ils
                  sont recalculés à partir de la base DVF publiée par
                  l&apos;État, quartier par quartier. Le détail complet est dans
                  notre analyse des{" "}
                  <Link href="/blog/prix-immobilier-villeurbanne-2026" className={A}>
                    prix au m² réels par quartier de Villeurbanne
                  </Link>
                  . Nous intervenons notamment à{" "}
                  <Link href="/agence-immobiliere-gratte-ciel" className={A}>Gratte-Ciel</Link>,{" "}
                  <Link href="/agence-immobiliere-charpennes" className={A}>Charpennes</Link> et{" "}
                  <Link href="/agence-immobiliere-cusset" className={A}>Cusset</Link>,
                  mais aussi au Tonkin, aux Brosses, et plus largement sur Lyon
                  et la métropole.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Nos services",
            h2: "Que fait une agence entre l'estimation et la signature ?",
            body: (
              <p className="mb-3">
                Une agence prend en charge la chaîne complète : fixer le prix,
                constituer le dossier de diagnostics, présenter le bien, filtrer
                et accompagner les visites, négocier, puis suivre le compromis
                jusqu&apos;à l&apos;acte notarié. Chez Markus Immobilier, tout
                commence par une{" "}
                <Link href="/estimation-immobiliere-villeurbanne" className={A}>
                  estimation immobilière à Villeurbanne
                </Link>{" "}
                : repères de prix par quartier calculés sur les ventes réelles,
                et fourchette personnalisée en moins de 2 minutes.
              </p>
            ),
            bullets: [
              "Estimation gratuite de votre bien en moins de 2 minutes.",
              "Vente d'appartements et de maisons, du juste prix à la signature.",
              "Accompagnement à l'achat, ciblé sur votre projet et votre budget.",
              "Location et gestion locative complète, en toute tranquillité.",
            ],
          },
          {
            eyebrow: "Location & gestion",
            h2: "Combien coûte la gestion locative à Villeurbanne ?",
            body: (
              <>
                <p className="mb-3">
                  La gestion courante est facturée <strong>6 % TTC</strong> des
                  encaissements mensuels par lot, avec un minimum de 25 €. La
                  garantie loyers impayés est optionnelle, à{" "}
                  <strong>2,5 % du loyer</strong>. La mise en location est
                  facturée à part : <strong>9 % du loyer annuel hors charges</strong>{" "}
                  côté propriétaire, et de 8 à 12 €/m² côté locataire selon la
                  zone, plus 3 €/m² par état des lieux.
                </p>
                <p>
                  Ce sont les tarifs du{" "}
                  <Link href="/honoraires" className={A}>
                    barème public
                  </Link>
                  , identiques pour tous les mandants. Le détail de ce que
                  couvre la gestion est sur la page{" "}
                  <Link href="/gestion-locative" className={A}>
                    gestion locative
                  </Link>
                  , et le dossier se lance depuis{" "}
                  <Link href="/faire-gerer" className={A}>
                    faire gérer mon bien
                  </Link>
                  .
                </p>
              </>
            ),
          },
          {
            eyebrow: "Notre différence",
            h2: "Agence indépendante ou réseau franchisé : qu'est-ce que ça change ?",
            body: (
              <p>
                Une agence indépendante fixe elle-même son barème et ses méthodes,
                sans redevance ni process imposés par un siège — et vous parlez
                directement à la personne qui décide. Markus Immobilier est
                indépendante depuis 7 ans : deux interlocuteurs,{" "}
                <Link href="/equipe" className={A}>
                  Tony et David Pistilli
                </Link>
                , joignables sur leur ligne directe, un barème publié en ligne et
                des estimations appuyées sur les ventes réelles du secteur plutôt
                que sur un outil national.
              </p>
            ),
          },
          {
            eyebrow: "Nous trouver",
            h2: "Où se trouve l'agence et quels sont ses horaires ?",
            body: (
              <p>
                Markus Immobilier est au{" "}
                <strong>87 rue Édouard Vaillant, 69100 Villeurbanne</strong>,
                métro et tramway à proximité immédiate. L&apos;agence est ouverte
                du lundi au samedi de 9h à 12h, et du lundi au vendredi de 14h à
                19h sur rendez-vous. Téléphone :{" "}
                <a href="tel:0478371367" className={A}>
                  04 78 37 13 67
                </a>{" "}
                — ou passez par la{" "}
                <Link href="/contact" className={A}>
                  page contact
                </Link>
                .
              </p>
            ),
          },
        ]}
        afterSections={<FaqBlock items={FAQ} />}
        ctaTitle={<>Parlons de <span className="grad-light">votre projet.</span></>}
        ctaText="Estimation, vente, achat ou gestion : un conseiller Markus vous répond rapidement, sans engagement."
      />
    </>
  );
}
