import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { SyndicForm } from "@/components/forms/syndic-form";
import { PlantIllust } from "@/components/illustrations/plant";
import { HandshakeIllust } from "@/components/illustrations/handshake";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import {
  JsonLd,
  breadcrumbLd,
  faqLd,
  howToLd,
  serviceLd,
} from "@/components/seo/json-ld";
import { FaqBlock, type FaqItem } from "@/components/seo/faq-block";
import { COMMUNE, DVF_ANNEE, LOYER_MEDIAN_HC } from "@/lib/quartiers";

/**
 * Page « faire gérer son bien » — gestion locative + syndic.
 *
 * Renforcée le 2026-09-18 (290 mots, 2 H2, aucun JSON-LD propre auparavant).
 * Motif, mesuré le 17/09 puis reconfirmé le 18/09 : sur « faire gérer son bien
 * locatif Villeurbanne » comme sur « syndic de copropriété Villeurbanne tarif »,
 * **aucun des résultats ne publie de prix** — ni les franchises locales, ni les
 * annuaires, ni les comparateurs nationaux, qui s'en tiennent à « entre 6 et
 * 8 % » ou à un formulaire. L'agence, elle, a un barème public.
 *
 * ⚠️ Provenance des chiffres — rien n'est inventé, tout est dérivé :
 *  - taux et frais fixes → barème public, `app/honoraires/page.tsx` (page
 *    canonique). Tous les montants du barème sont TTC.
 *  - surface médiane (62 m²) → ventes DVF 2025, `lib/quartiers.ts`.
 *  - loyer médian communal (14,6 €/m² HC) → carte des loyers data.gouv.fr,
 *    `lib/loyers.ts` / `LOYER_MEDIAN_HC`.
 *  - les euros affichés sont calculés ci-dessous à partir de ces sources, pas
 *    saisis à la main : ils ne peuvent pas diverger du barème ni des données.
 *  - le SYNDIC n'a pas de tarif public chez l'agence : la page le dit, et
 *    n'en invente aucun (rémunération = forfait voté en AG, contrat type).
 */

/** Date de dernière modification réelle du contenu de cette page (ISO). */
const UPDATED = "2026-09-18";

/* --- Barème (source : /honoraires, montants TTC) ------------------------- */
const TAUX_GESTION = 0.06;
const MIN_GESTION = 25; // € / mois / lot
const TAUX_GLI = 0.025;
const FRAIS_DEBOURS = 20; // € / an (extranet)
const FRAIS_COURRIER = 45; // € / lot / an, si envois postaux
const TAUX_MISE_EN_LOCATION = 0.09; // du loyer annuel HC, part propriétaire

/* --- Cas de référence villeurbannais, entièrement dérivé ----------------- */
const SURFACE = COMMUNE.surfaceMediane; // 62 m², médiane DVF 2025
const LOYER_MOIS = Math.round(SURFACE * LOYER_MEDIAN_HC); // 905 € HC
const GESTION_MOIS = Math.round(LOYER_MOIS * TAUX_GESTION);
const GESTION_AN = Math.round(LOYER_MOIS * TAUX_GESTION * 12);
const GESTION_AN_TOTAL = GESTION_AN + FRAIS_DEBOURS;
const GESTION_AN_COURRIER = GESTION_AN_TOTAL + FRAIS_COURRIER;
const GLI_MOIS = Math.round(LOYER_MOIS * TAUX_GLI);
const GLI_AN = Math.round(LOYER_MOIS * TAUX_GLI * 12);
const GLI_JOURS = Math.round(TAUX_GLI * 365);
const SEUIL_MIN = Math.round(MIN_GESTION / TAUX_GESTION);
const SEUIL_SURFACE = Math.ceil(SEUIL_MIN / LOYER_MEDIAN_HC);
const MISE_EN_LOCATION = Math.round(LOYER_MOIS * 12 * TAUX_MISE_EN_LOCATION);

const eur = (n: number) => `${n.toLocaleString("fr-FR")} €`;
const pct = (t: number) =>
  `${(t * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %`;

export const metadata: Metadata = {
  title: "Faire gérer votre bien — Syndic & gestion locative à Villeurbanne",
  description: `Gestion locative à Villeurbanne : ${pct(
    TAUX_GESTION,
  )} TTC des encaissements, soit ${eur(
    GESTION_AN_TOTAL,
  )} par an sur un appartement loué au loyer médian de la commune. Syndic de copropriété, étude chiffrée sous 48h ouvrées.`,
  alternates: { canonical: "/faire-gerer" },
  openGraph: {
    title: "Faire gérer votre bien — gestion locative & syndic à Villeurbanne",
    description:
      "Ce que coûte réellement la gestion d'un bien locatif à Villeurbanne, barème public à l'appui, et comment est fixée la rémunération d'un syndic de copropriété.",
    url: "https://www.markusimmobilier.fr/faire-gerer",
  },
};

/**
 * Les trois vérifications de la section « comparer deux offres » — source
 * unique du texte visible ET du `HowTo` balisé, pour qu'ils ne divergent pas.
 */
const COMPARAISON = [
  {
    name: "Vérifier si le taux est annoncé HT ou TTC",
    text: `Un taux HT et un taux TTC ne se comparent pas directement. Avec une TVA à 20 %, ${pct(
      TAUX_GESTION,
    )} TTC correspond à 5 % HT, et un taux annoncé 8 % HT revient à 9,6 % TTC. L'arrêté du 10 janvier 2017, modifié le 26 janvier 2022, impose aux professionnels de l'immobilier d'afficher leurs prix maximum toutes taxes comprises : c'est la base de comparaison à exiger.`,
  },
  {
    name: "Vérifier l'assiette sur laquelle le taux s'applique",
    text: `Le pourcentage peut porter sur les loyers réellement encaissés ou sur le loyer théorique, charges comprises ou non. Ici il s'applique au total des encaissements mensuels par lot, avec un minimum de ${eur(
      MIN_GESTION,
    )} : un mois sans loyer encaissé est un mois sans honoraires de gestion, hors minimum.`,
  },
  {
    name: "Additionner les frais fixes et les prestations facturées à part",
    text: `Le taux seul ne fait pas le coût annuel. S'y ajoutent ici ${eur(
      FRAIS_DEBOURS,
    )} par an de frais et débours, ${eur(
      FRAIS_COURRIER,
    )} par lot et par an si les courriers partent par voie postale, et des prestations occasionnelles facturées à l'unité. La mise en location d'un nouveau locataire est, elle aussi, facturée séparément.`,
  },
];

/** FAQ visible — le JSON-LD FAQPage est généré depuis ce MÊME tableau. */
const FAQ: FaqItem[] = [
  {
    q: `À partir de quel loyer le minimum de ${eur(MIN_GESTION)} s'applique-t-il ?`,
    a: `En dessous de ${eur(
      SEUIL_MIN,
    )} d'encaissements mensuels, c'est le minimum qui s'applique : ${eur(
      MIN_GESTION,
    )} divisé par ${pct(
      TAUX_GESTION,
    )} donne exactement ce seuil. Au loyer médian villeurbannais de ${LOYER_MEDIAN_HC.toLocaleString(
      "fr-FR",
    )} €/m² hors charges, cela correspond à un logement de moins de ${SEUIL_SURFACE} m² — un studio, en pratique. Sur un tel lot, le taux effectivement payé est donc supérieur à ${pct(
      TAUX_GESTION,
    )} ; au-delà, c'est bien le pourcentage qui s'applique.`,
  },
  {
    q: "Les honoraires de gestion locative sont-ils déductibles des impôts ?",
    a: "Au régime réel d'imposition des revenus fonciers, les honoraires de gestion et les primes d'assurance — dont la garantie loyers impayés — se déduisent des loyers perçus pour leur montant réel. Au micro-foncier, en revanche, aucune charge ne se déduit : l'administration applique un abattement forfaitaire de 30 % qui est censé tout couvrir. C'est donc le régime d'imposition, pas le montant des honoraires, qui décide de leur déductibilité.",
  },
  {
    q: "Qui paie les honoraires de mise en location, et combien coûtent-ils au propriétaire ?",
    a: `La mise en location est facturée à part de la gestion, une seule fois, à chaque changement de locataire. La part propriétaire est de ${pct(
      TAUX_MISE_EN_LOCATION,
    )} du loyer annuel hors charges, soit ${eur(
      MISE_EN_LOCATION,
    )} pour un logement loué ${eur(
      LOYER_MOIS,
    )} par mois. Le locataire en règle également une part, plafonnée par la loi et qui ne peut jamais dépasser celle du propriétaire.`,
  },
  {
    q: "La gestion locative et le syndic, est-ce le même contrat ?",
    a: "Non, et ils n'ont ni le même signataire ni le même objet. Le mandat de gestion est signé par le propriétaire d'un lot pour son bien loué. Le contrat de syndic, lui, est voté en assemblée générale par le syndicat des copropriétaires et porte sur les parties communes de l'immeuble entier. Un même immeuble peut donc avoir un syndic et des lots gérés par plusieurs agences différentes.",
  },
  {
    q: "Un syndic peut-il facturer des frais en plus de son forfait ?",
    a: "Oui, mais uniquement les prestations figurant sur la liste limitative annexée au décret n° 2015-342 du 26 mars 2015 — notamment les assemblées générales supplémentaires, le suivi de travaux, les prestations liées à la mutation d'un lot et les litiges. Tout ce qui ne figure pas sur cette liste relève du forfait annuel voté en assemblée générale et ne peut pas être refacturé.",
  },
  {
    q: "Combien de temps faut-il pour recevoir une proposition chiffrée ?",
    a: "Le formulaire en bas de cette page prend environ deux minutes. Un conseiller rappelle ensuite sous 48 heures ouvrées avec une étude adaptée au bien ou à la copropriété : nombre de lots, équipements, état locatif. L'agence est joignable directement au 04 78 37 13 67, au 87 rue Édouard Vaillant à Villeurbanne.",
  },
];

const A =
  "text-anthracite font-semibold underline underline-offset-2 hover:text-sauge";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function FaireGererPage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "Gestion locative et syndic de copropriété à Villeurbanne",
          serviceType: "Gestion locative et syndic de copropriété",
          description: `Gestion locative et syndic de copropriété à Villeurbanne et Lyon. Gestion courante facturée ${pct(
            TAUX_GESTION,
          )} TTC des encaissements par lot (minimum ${eur(
            MIN_GESTION,
          )}), garantie loyers impayés optionnelle à ${pct(
            TAUX_GLI,
          )} du loyer, barème public. Syndic : forfait annuel chiffré après étude de la copropriété.`,
          path: "/faire-gerer",
        })}
      />
      <JsonLd data={faqLd(FAQ)} />
      <JsonLd
        data={howToLd({
          name: "Comparer deux offres de gestion locative",
          description:
            "Trois vérifications pour comparer sur la même base deux taux de gestion locative proposés par des agences immobilières.",
          steps: COMPARAISON,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Faire gérer votre bien", path: "/faire-gerer" },
        ])}
      />

      <PageHero
        eyebrow="Gestion & Syndic"
        title={
          <>
            Confiez la gestion à une{" "}
            <span className="grad-light">agence locale.</span>
          </>
        }
        lead="Markus Immobilier accompagne propriétaires bailleurs et copropriétés avec des outils modernes et une équipe dédiée à Villeurbanne / Lyon. Étude personnalisée sous 48h ouvrées."
        illustration={
          <DrawOnScroll>
            <PlantIllust size={360} className="illust-on-dark" />
          </DrawOnScroll>
        }
      />

      {/* 2 CARTES */}
      <section className="bg-blanc py-[100px] max-md:py-[72px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <Reveal className="text-center mb-12 max-md:mb-10">
            <Eyebrow className="mb-4">Deux expertises</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em]">
              Une agence, <span className="grad">deux métiers.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-md:gap-6">
            <Reveal>
              <article className="relative h-full bg-gris rounded-[24px] p-10 max-md:p-7 border border-[var(--bordure)] hover:border-sauge/50 hover:shadow-[0_30px_60px_-20px_rgba(56,62,66,0.18)] transition-all duration-500">
                <DrawOnScroll className="mb-7">
                  <PlantIllust size={120} />
                </DrawOnScroll>
                <Eyebrow className="mb-4">Propriétaires bailleurs</Eyebrow>
                <h3 className="text-[26px] font-bold tracking-[-0.01em] mb-4">
                  Gestion <span className="grad">locative.</span>
                </h3>
                <p className="text-[#5a6166] mb-7 leading-relaxed">
                  Recherche de locataires solvables, états des lieux,
                  encaissement, entretien, GLI. On s&apos;occupe de tout pendant
                  que votre patrimoine grandit.
                </p>
                <ul className="space-y-3 text-[14px] text-anthracite">
                  <Bullet>Sélection rigoureuse des locataires</Bullet>
                  <Bullet>Quittances et appels de loyers automatisés</Bullet>
                  <Bullet>GLI (garantie loyers impayés) en option</Bullet>
                  <Bullet>Extranet propriétaire en temps réel</Bullet>
                </ul>
              </article>
            </Reveal>

            <Reveal delay={140}>
              <article className="relative h-full bg-anthracite text-blanc rounded-[24px] p-10 max-md:p-7 overflow-hidden hover:shadow-[0_30px_60px_-20px_rgba(56,62,66,0.5)] transition-all duration-500">
                <DrawOnScroll className="mb-7">
                  <HandshakeIllust size={150} className="illust-on-dark" />
                </DrawOnScroll>
                <Eyebrow className="mb-4">Copropriétés</Eyebrow>
                <h3 className="text-[26px] font-bold tracking-[-0.01em] mb-4 text-blanc">
                  Syndic de{" "}
                  <span className="grad-light">copropriété.</span>
                </h3>
                <p className="text-white/70 mb-7 leading-relaxed">
                  Un syndic local, joignable, transparent. Comptabilité claire,
                  AG bien préparées, suivi des travaux et des prestataires de
                  bout en bout.
                </p>
                <ul className="space-y-3 text-[14px] text-white/90">
                  <Bullet light>Comptabilité claire et accessible</Bullet>
                  <Bullet light>AG préparées et bien menées</Bullet>
                  <Bullet light>Suivi des travaux et prestataires</Bullet>
                  <Bullet light>Conseiller dédié à votre copropriété</Bullet>
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CE QUE ÇA COÛTE — contenu de fond */}
      <section className="bg-blanc pb-[110px] max-md:pb-[72px]">
        <div className="max-w-[860px] mx-auto px-8 max-md:px-5 border-t border-[var(--bordure)] pt-14 max-md:pt-10">
          <Reveal>
            <p className="text-[13px] text-[#6b7276] mb-6">
              Dernière mise à jour :{" "}
              <time dateTime={UPDATED}>{fmtDate(UPDATED)}</time>
            </p>
            <Eyebrow className="mb-3">Ce que ça coûte</Eyebrow>
            <p className="text-[17px] leading-relaxed text-[#3d4347] mb-14 max-md:mb-10">
              La plupart des agences répondent « entre 6 et 8 %, ça dépend » à la
              question du prix de la gestion. Notre barème est public, et cette
              page le traduit en euros sur un cas villeurbannais réel : un
              appartement de {SURFACE} m² — la surface médiane des appartements
              vendus dans la commune en {DVF_ANNEE}{" "}— loué au loyer médian
              communal. Elle explique aussi pourquoi un syndic, lui, ne peut pas
              afficher de tarif à l&apos;avance.
            </p>
          </Reveal>

          <div className="space-y-14 max-md:space-y-10">
            <Reveal>
              <section>
                <Eyebrow className="mb-3">Gestion locative</Eyebrow>
                <H2>
                  Combien coûte la gestion locative d&apos;un appartement à
                  Villeurbanne ?
                </H2>
                <Body>
                  <p>
                    La gestion courante est facturée{" "}
                    <strong>{pct(TAUX_GESTION)} TTC</strong> du total des
                    encaissements mensuels par lot, avec un minimum de{" "}
                    {eur(MIN_GESTION)}. Sur un appartement de {SURFACE} m² loué
                    au loyer médian villeurbannais — soit{" "}
                    <strong>{eur(LOYER_MOIS)} par mois hors charges</strong> —
                    cela représente <strong>{eur(GESTION_MOIS)} par mois</strong>
                    , soit <strong>{eur(GESTION_AN)} par an</strong>. En ajoutant
                    les {eur(FRAIS_DEBOURS)}{" "}annuels de frais et débours
                    (extranet), le coût complet d&apos;une année de gestion
                    ressort à <strong>{eur(GESTION_AN_TOTAL)}</strong>, ou{" "}
                    {eur(GESTION_AN_COURRIER)}{" "}si vous demandez l&apos;envoi des
                    courriers par voie postale ({eur(FRAIS_COURRIER)} par lot et
                    par an).
                  </p>
                  <p>
                    Les deux repères de ce calcul sont publics et vérifiables :
                    la surface médiane de {SURFACE}{" "}m² vient des ventes
                    d&apos;appartements enregistrées à Villeurbanne en{" "}
                    {DVF_ANNEE} (base DVF de l&apos;État), et le loyer médian de{" "}
                    {LOYER_MEDIAN_HC.toLocaleString("fr-FR")} €/m² hors charges
                    de la carte des loyers publiée sur data.gouv.fr. Votre bien
                    n&apos;est pas la médiane : le calcul se refait sur votre
                    loyer réel, en appliquant le même taux. Le barème complet,
                    ligne par ligne, est sur la page{" "}
                    <Link href="/honoraires" className={A}>
                      nos honoraires
                    </Link>
                    .
                  </p>
                </Body>
              </section>
            </Reveal>

            <Reveal delay={80}>
              <section>
                <Eyebrow className="mb-3">Ce qui est compris</Eyebrow>
                <H2>
                  Qu&apos;est-ce que le taux de gestion couvre, et qu&apos;est-ce
                  qui reste facturé à part ?
                </H2>
                <Body>
                  <p>
                    Le taux couvre la <strong>gestion courante</strong> : appels
                    de loyers et encaissement, quittances, révision annuelle du
                    loyer, régularisation des charges, relances en cas de retard,
                    suivi de l&apos;entretien et accès à l&apos;extranet
                    propriétaire. Ce qui est ponctuel est facturé à part, et la
                    liste est publiée : vacation horaire à 100 €, document
                    d&apos;aide à la déclaration des revenus fonciers à 70 €,
                    envoi d&apos;un congé par lettre recommandée à 100 € par lot,
                    clôture de gestion à 90 €, suivi de travaux à 5 % de leur
                    montant.
                  </p>
                  <p>
                    Un point mérite d&apos;être dit clairement, parce qu&apos;il
                    surprend souvent :{" "}
                    <strong>
                      la mise en location n&apos;est pas comprise dans le taux de
                      gestion
                    </strong>
                    . Trouver un locataire, constituer son dossier, rédiger le
                    bail et faire l&apos;état des lieux relèvent d&apos;une
                    facturation distincte, due une seule fois à chaque
                    changement de locataire. Le détail des prestations de gestion
                    au quotidien est décrit sur la page{" "}
                    <Link href="/gestion-locative" className={A}>
                      gestion locative
                    </Link>
                    .
                  </p>
                </Body>
              </section>
            </Reveal>

            <Reveal delay={160}>
              <section>
                <Eyebrow className="mb-3">Comparer</Eyebrow>
                <H2>Comment comparer deux taux de gestion locative ?</H2>
                <Body>
                  <p>
                    Trois vérifications suffisent, et elles expliquent
                    l&apos;essentiel des écarts constatés entre deux devis : le
                    taux est-il HT ou TTC, sur quelle assiette porte-t-il, et
                    quels frais fixes s&apos;y ajoutent. Un taux affiché 8 % HT
                    coûte en réalité 9,6 % TTC, soit 60 % de plus qu&apos;un taux
                    de {pct(TAUX_GESTION)} TTC — pour la même prestation.
                  </p>
                </Body>
                <ol className="mt-4 space-y-4 list-none">
                  {COMPARAISON.map((c, i) => (
                    <li key={c.name} className="flex items-start gap-4">
                      <span className="w-7 h-7 shrink-0 rounded-full bg-sauge/20 grid place-items-center text-[13px] font-bold text-anthracite">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[15.5px] font-semibold text-anthracite mb-1">
                          {c.name}
                        </p>
                        <p className="text-[15.5px] leading-relaxed text-[#3d4347]">
                          {c.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <Eyebrow className="mb-3">Loyers impayés</Eyebrow>
                <H2>Faut-il prendre la garantie loyers impayés ?</H2>
                <Body>
                  <p>
                    La garantie loyers impayés (GLI) est optionnelle et facturée{" "}
                    <strong>{pct(TAUX_GLI)} du loyer</strong>. Sur
                    l&apos;appartement de référence loué {eur(LOYER_MOIS)} par
                    mois, elle coûte {eur(GLI_MOIS)} par mois, soit{" "}
                    <strong>{eur(GLI_AN)} par an</strong>{" "}— l&apos;équivalent
                    d&apos;environ {GLI_JOURS}{" "}jours de loyer. C&apos;est le bon
                    ordre de grandeur à mettre en face du risque : un seul mois
                    d&apos;impayé représente déjà plus de trois fois cette somme.
                  </p>
                  <p>
                    La GLI ne remplace pas la sélection du locataire, elle la
                    complète — les assureurs conditionnent d&apos;ailleurs leur
                    garantie à un niveau de solvabilité du dossier. L&apos;étendue
                    exacte des garanties, les franchises et les plafonds
                    dépendent du contrat d&apos;assurance, qui vous est remis
                    avant toute signature.
                  </p>
                </Body>
              </section>
            </Reveal>

            <Reveal delay={80}>
              <section>
                <Eyebrow className="mb-3">Syndic</Eyebrow>
                <H2>
                  Combien coûte un syndic de copropriété, et pourquoi aucun tarif
                  n&apos;est affiché ?
                </H2>
                <Body>
                  <p>
                    Aucune agence ne peut afficher à l&apos;avance un prix de
                    syndic, et ce n&apos;est pas une manière d&apos;éviter la
                    question : la rémunération du syndic est un{" "}
                    <strong>forfait annuel voté en assemblée générale</strong>,
                    propre à chaque copropriété. Le décret n° 2015-342 du 26 mars
                    2015 impose un contrat type — un forfait qui couvre la
                    gestion courante, et une liste limitative de prestations
                    particulières qui sont les seules à pouvoir être facturées en
                    plus. Le forfait dépend donc du nombre de lots, des
                    équipements de l&apos;immeuble et du nombre
                    d&apos;assemblées : c&apos;est ce que chiffre
                    l&apos;étude remise sous 48 heures ouvrées.
                  </p>
                  <p>
                    Ce que couvre la gestion courante, en pratique : convocation
                    et tenue de l&apos;assemblée générale annuelle, exécution de
                    ses décisions, tenue de la comptabilité du syndicat et des
                    appels de charges, conservation des archives, souscription
                    des contrats communs et suivi des prestataires. Notre{" "}
                    <Link href="/honoraires" className={A}>
                      barème public
                    </Link>{" "}
                    couvre la transaction, la location et la gestion locative :
                    il ne comporte volontairement pas de ligne « syndic », qui
                    serait un prix inventé tant que l&apos;immeuble n&apos;a pas
                    été étudié.
                  </p>
                </Body>
              </section>
            </Reveal>

            <Reveal delay={160}>
              <section>
                <Eyebrow className="mb-3">Changer de syndic</Eyebrow>
                <H2>
                  Quand une copropriété peut-elle remettre son syndic en
                  concurrence ?
                </H2>
                <Body>
                  <p>
                    Tous les trois ans, le conseil syndical met en concurrence
                    plusieurs projets de contrat de syndic avant l&apos;assemblée
                    générale appelée à désigner le syndic : c&apos;est
                    l&apos;article 21 de la loi n° 65-557 du 10 juillet 1965.
                    Cette mise en concurrence peut être écartée si
                    l&apos;assemblée générale précédente en décide ainsi à la
                    majorité de l&apos;article 25, question qui doit alors être
                    inscrite à son ordre du jour. Et lorsque la copropriété
                    n&apos;a pas institué de conseil syndical, elle n&apos;est
                    pas obligatoire.
                  </p>
                  <p>
                    Indépendamment de ce calendrier, tout copropriétaire peut
                    demander au syndic d&apos;inscrire à l&apos;ordre du jour
                    l&apos;examen d&apos;un projet de contrat qu&apos;il
                    communique. Autrement dit : il n&apos;est pas nécessaire
                    d&apos;attendre une échéance particulière pour faire chiffrer
                    une alternative — seul le vote de l&apos;assemblée générale
                    tranche.
                  </p>
                </Body>
              </section>
            </Reveal>
          </div>

          <FaqBlock items={FAQ} />
        </div>
      </section>

      {/* FORMULAIRE */}
      <section id="formulaire" className="bg-gris py-[100px] max-md:py-[72px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <Reveal className="text-center mb-12 max-md:mb-10">
            <Eyebrow className="mb-4">Première étape</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em] mb-4">
              Demandez votre <span className="grad">étude personnalisée.</span>
            </h2>
            <p className="text-[#5a6166] max-w-[520px] mx-auto leading-relaxed">
              Deux minutes suffisent. Un conseiller vous rappelle sous 48h
              ouvrées avec une proposition adaptée à votre situation.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <SyndicForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-bold tracking-[-0.01em] text-anthracite mb-4 leading-[1.15]"
      style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}
    >
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[15.5px] leading-relaxed text-[#3d4347] space-y-3">
      {children}
    </div>
  );
}

function Bullet({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-5 h-5 shrink-0 mt-0.5 rounded-full bg-sauge/20 grid place-items-center">
        <svg
          viewBox="0 0 24 24"
          width="11"
          height="11"
          fill="none"
          stroke="var(--color-sauge)"
          strokeWidth="2.8"
          aria-hidden="true"
        >
          <path d="M5 12l5 5L20 6" />
        </svg>
      </span>
      <span className={light ? "text-white/90" : "text-anthracite"}>
        {children}
      </span>
    </li>
  );
}
