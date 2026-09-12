import type { Metadata } from "next";
import Link from "next/link";
import { SeoLanding } from "@/components/layout/seo-landing";
import {
  JsonLd,
  breadcrumbLd,
  faqLd,
  howToLd,
  serviceLd,
} from "@/components/seo/json-ld";
import { FaqBlock, type FaqItem } from "@/components/seo/faq-block";
import { KeysIllust } from "@/components/illustrations/keys";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

/**
 * Page « estimation immobilière Villeurbanne » — requête commerciale n°1 dans la
 * ville de l'agence, sur laquelle le site n'avait aucune page dédiée (seule
 * /estimation-immobiliere-lyon existait).
 *
 * Angle volontairement DISTINCT des pages voisines, pour ne pas créer de doublon :
 *  - /estimation                          = l'outil (formulaire), transactionnel ;
 *  - /estimation-immobiliere-lyon         = même service, échelle Lyon ;
 *  - /blog/prix-immobilier-villeurbanne-2026 = l'analyse du marché et ses chiffres ;
 *  - cette page                           = « combien vaut mon bien ici, et comment
 *    l'estimer », les repères chiffrés par quartier appliqués à une estimation.
 *
 * ⚠️ Tous les chiffres viennent du calcul DVF publié dans l'article prix
 * (ventes 2025, extraction du 7 septembre 2026). Ne jamais en écrire un qui ne
 * vienne pas de là — et si on republie, tout recalculer (DVF est révisée
 * rétroactivement).
 */

const UPDATED = "2026-09-08";

export const metadata: Metadata = {
  title: "Estimation immobilière à Villeurbanne — gratuite en 2 min",
  description:
    "Estimation immobilière gratuite à Villeurbanne, basée sur les ventes réelles (DVF) : médiane 3 567 €/m² en 2025, repères par quartier, valeur de vente, loyer et rendement en moins de 2 minutes.",
  alternates: { canonical: "/estimation-immobiliere-villeurbanne" },
  openGraph: {
    title: "Estimation immobilière à Villeurbanne — gratuite en 2 min",
    description:
      "Combien vaut votre bien à Villeurbanne ? Repères par quartier calculés sur les ventes réelles, et estimation gratuite en moins de 2 minutes.",
    url: "https://www.markusimmobilier.fr/estimation-immobiliere-villeurbanne",
  },
};

/** Étapes affichées ET reprises à l'identique dans le JSON-LD HowTo. */
const ETAPES = [
  {
    name: "Renseignez l'adresse du bien",
    text: "Indiquez l'adresse exacte de votre appartement ou maison à Villeurbanne. C'est elle qui détermine les ventes de référence retenues autour de votre logement.",
  },
  {
    name: "Décrivez le logement",
    text: "Surface, nombre de pièces, étage, état général, DPE, balcon, terrasse ou parking : ce sont ces critères qui expliquent l'essentiel des écarts de prix à l'intérieur d'un même quartier.",
  },
  {
    name: "Recevez le rapport",
    text: "L'outil calcule une fourchette de prix de vente, un loyer estimé et un rendement, puis vous envoie le rapport détaillé par e-mail. Comptez moins de deux minutes, gratuitement et sans engagement.",
  },
];

/** FAQ visible — le JSON-LD FAQPage est généré depuis ce même tableau. */
const FAQ: FaqItem[] = [
  {
    q: "Combien vaut un appartement à Villeurbanne en 2026 ?",
    a: "La médiane est de 3 567 €/m², calculée sur les 1 875 ventes d'appartements réellement signées à Villeurbanne en 2025 (base DVF, dernière année complète publiée). Selon le quartier, elle va de 2 738 €/m² à Cyprian – Les Brosses à 3 923 €/m² à Ferrandière – Maisons-Neuves.",
  },
  {
    q: "L'estimation en ligne de Markus Immobilier est-elle vraiment gratuite ?",
    a: "Oui, elle est gratuite et sans engagement. Vous renseignez l'adresse et les caractéristiques du bien, et vous recevez par e-mail un rapport avec une fourchette de prix de vente, un loyer estimé et un rendement, en moins de deux minutes. Aucune obligation de nous confier la vente ensuite.",
  },
  {
    q: "Combien vaut un T3 à Villeurbanne ?",
    a: "Un T3 s'est vendu 226 250 € en médiane à Villeurbanne en 2025, pour une surface médiane de 65 m² (soit 3 494 €/m²), sur 578 ventes. Selon le quartier, un T3 de 65 m² se situe plutôt autour de 178 000 € à Cyprian – Les Brosses et de 255 000 € à Ferrandière – Maisons-Neuves.",
  },
  {
    q: "Sur quelles données repose l'estimation ?",
    a: "Sur les ventes réellement conclues, pas sur les prix affichés dans les annonces. Nous utilisons la base DVF (demandes de valeurs foncières) publiée par l'État sur data.gouv.fr, qui recense le prix réel de chaque vente enregistrée par les notaires, puis nous ajustons selon les caractéristiques précises du logement.",
  },
  {
    q: "Une estimation en ligne suffit-elle pour fixer son prix de vente ?",
    a: "Elle donne une fourchette fiable, mais pas le prix final. Aucune donnée publique ne connaît la luminosité, le calme, la qualité de la copropriété ou les travaux votés. Mesurée sur les 1 875 ventes de 2025, une estimation fondée sur le seul prix au m² du quartier se trompe de 15,5 % en médiane, et ne tombe à moins de 10 % du prix réellement payé que dans 36 % des cas. La visite gratuite d'un conseiller sert précisément à resserrer la fourchette.",
  },
  {
    q: "Faut-il faire estimer son bien avant de le mettre en vente à Villeurbanne ?",
    a: "Oui, car le marché ne rattrape plus les erreurs de prix. Après trois années de baisse, la médiane est repartie de +1,5 % entre 2024 et 2025 et le nombre de ventes de +14 % : il y a des acheteurs, mais ils comparent. Un bien affiché au-dessus de sa valeur stagne, puis se vend en dessous après plusieurs baisses successives.",
  },
];

/** Repères par quartier — médiane DVF 2025 × surface médiane du type de bien. */
const REPERES = [
  ["Ferrandière – Maisons-Neuves", "3 923 €", "≈ 177 000 €", "≈ 255 000 €"],
  ["Gratte-Ciel – Dedieu – Charmettes", "3 846 €", "≈ 173 000 €", "≈ 250 000 €"],
  ["Charpennes – Tonkin", "3 524 €", "≈ 159 000 €", "≈ 229 000 €"],
  ["Perralière – Grandclément", "3 375 €", "≈ 152 000 €", "≈ 219 000 €"],
  ["Buers – Croix-Luizet", "3 271 €", "≈ 147 000 €", "≈ 213 000 €"],
  ["Cusset – Bonnevay", "3 171 €", "≈ 143 000 €", "≈ 206 000 €"],
  ["Cyprian – Les Brosses", "2 738 €", "≈ 123 000 €", "≈ 178 000 €"],
];

const A = "text-anthracite font-semibold underline underline-offset-2 hover:text-sauge";

function RepereTable() {
  const headers = ["Quartier", "Médiane €/m²", "T2 · 45 m²", "T3 · 65 m²"];
  return (
    <figure className="my-5">
      {/* le tableau scrolle dans son cadre : jamais de scroll horizontal de page */}
      <div className="overflow-x-auto rounded-[12px] border border-[var(--bordure)]">
        <table className="w-full border-collapse text-[14.5px] min-w-[480px]">
          <caption className="caption-top text-left text-[13px] text-[#6b7276] px-4 pt-3 pb-2">
            Ordre de grandeur pour un appartement, par quartier de Villeurbanne
          </caption>
          <thead>
            <tr className="bg-gris">
              {headers.map((h, j) => (
                <th
                  key={j}
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
            {REPERES.map((row, j) => (
              <tr key={j} className="border-t border-[var(--bordure)]">
                {row.map((cell, k) => (
                  <td
                    key={k}
                    className={`px-4 py-3 text-[#3d4347] ${
                      k === 0
                        ? "text-left font-medium text-anthracite"
                        : "text-right tabular-nums"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-[12.5px] text-[#6b7276] leading-relaxed">
        Médianes calculées sur les ventes d&apos;appartements DVF 2025
        (data.gouv.fr / Etalab) rattachées aux contours officiels de quartiers de
        la Métropole de Lyon — extraction du 7 septembre 2026, calcul Markus
        Immobilier. Les deux dernières colonnes sont la médiane du quartier
        multipliée par la surface médiane du type de bien : un ordre de grandeur
        de départ, pas l&apos;estimation de votre logement. Le quartier Saint-Jean
        n&apos;est pas listé (trop peu de ventes pour une médiane fiable).
      </figcaption>
    </figure>
  );
}

export default function EstimationVilleurbannePage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "Estimation immobilière à Villeurbanne",
          serviceType: "Estimation de bien immobilier",
          description:
            "Estimation gratuite de la valeur de vente, du loyer et du rendement d'un bien à Villeurbanne, basée sur les ventes réelles enregistrées par les notaires (base DVF), avec rapport détaillé en moins de 2 minutes.",
          path: "/estimation-immobiliere-villeurbanne",
        })}
      />
      <JsonLd
        data={howToLd({
          name: "Comment estimer un bien immobilier à Villeurbanne",
          description:
            "Obtenir gratuitement une fourchette de prix de vente, un loyer estimé et un rendement pour un appartement ou une maison à Villeurbanne, à partir des ventes réelles du secteur.",
          totalTime: "PT2M",
          steps: ETAPES,
        })}
      />
      <JsonLd data={faqLd(FAQ)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          {
            name: "Estimation immobilière Villeurbanne",
            path: "/estimation-immobiliere-villeurbanne",
          },
        ])}
      />
      <SeoLanding
        eyebrow="Estimation · Villeurbanne"
        title={
          <>
            Estimation immobilière à <span className="grad-light">Villeurbanne.</span>
          </>
        }
        lead="Combien vaut votre bien à Villeurbanne ? La médiane s'établit à 3 567 €/m² sur les ventes de 2025 — mais elle varie de 2 738 à 3 923 €/m² selon le quartier. Obtenez votre fourchette précise, gratuitement, en moins de 2 minutes."
        illustration={
          <DrawOnScroll>
            <KeysIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        updated={UPDATED}
        intro="Estimer un bien à Villeurbanne demande mieux qu'une moyenne de ville : entre Cyprian – Les Brosses et Ferrandière – Maisons-Neuves, l'écart de prix au m² atteint 43 %. Voici les repères réels par quartier, la méthode que nous appliquons, et ce qu'une estimation peut — ou ne peut pas — vous dire."
        sections={[
          {
            eyebrow: "Les repères du marché",
            h2: "Combien vaut un appartement à Villeurbanne aujourd'hui ?",
            body: (
              <>
                <p>
                  Le prix médian d&apos;un appartement à Villeurbanne est de{" "}
                  <strong>3 567 €/m²</strong>, calculé sur les{" "}
                  <strong>1 875 ventes réellement signées en 2025</strong> (base
                  DVF, dernière année complète publiée). Pour une maison, la
                  médiane est de <strong>4 186 €/m²</strong>. Selon le quartier,
                  la médiane appartement va de 2 738 à 3 923 €/m².
                </p>
                <RepereTable />
                <p>
                  Ces repères servent à savoir si vous êtes dans le bon ordre de
                  grandeur, pas à fixer un prix : à l&apos;intérieur d&apos;un
                  même quartier, l&apos;écart entre deux biens comparables est
                  souvent plus grand que l&apos;écart entre deux quartiers. Le
                  détail complet, année par année et par type de bien, est dans
                  notre analyse des{" "}
                  <Link href="/blog/prix-immobilier-villeurbanne-2026" className={A}>
                    prix au m² réels par quartier de Villeurbanne
                  </Link>
                  .
                </p>
              </>
            ),
          },
          {
            eyebrow: "La marche à suivre",
            h2: "Comment estimer son bien à Villeurbanne en 2 minutes ?",
            body: (
              <>
                <p>
                  Estimer un bien à Villeurbanne prend moins de deux minutes en
                  ligne et demande trois informations : l&apos;adresse du bien,
                  ses caractéristiques et votre e-mail. L&apos;outil renvoie une
                  fourchette de prix de vente, un loyer estimé et un taux de
                  rendement, dans un rapport détaillé envoyé par e-mail.
                  C&apos;est gratuit et sans engagement.
                </p>
                <ol className="mt-3 space-y-3">
                  {ETAPES.map((e, i) => (
                    <li key={e.name} className="flex items-start gap-3">
                      <span className="w-6 h-6 shrink-0 rounded-full bg-sauge/20 grid place-items-center text-[12px] font-bold text-anthracite">
                        {i + 1}
                      </span>
                      <span className="text-[15.5px] leading-relaxed text-[#3d4347]">
                        <strong className="text-anthracite">{e.name}.</strong>{" "}
                        {e.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </>
            ),
          },
          {
            eyebrow: "Nos sources",
            h2: "Sur quelles données repose l'estimation ?",
            body: (
              <p>
                Notre estimation à Villeurbanne repose sur les{" "}
                <strong>ventes réellement conclues</strong>, pas sur les prix
                affichés dans les annonces. Nous utilisons la base{" "}
                <strong>DVF (demandes de valeurs foncières)</strong> publiée par
                l&apos;État sur data.gouv.fr, qui recense le prix inscrit chez le
                notaire pour chaque vente, avec sa localisation. Les prix
                d&apos;annonce, eux, intègrent une marge de négociation et
                surestiment le marché. Nous écartons les ventes de lots
                multiples et les valeurs aberrantes, nous raisonnons en médiane
                plutôt qu&apos;en moyenne, puis nous ajustons selon les critères
                précis de votre logement.
              </p>
            ),
          },
          {
            eyebrow: "Les limites",
            h2: "Pourquoi le prix au m² de votre quartier ne suffit-il pas ?",
            body: (
              <>
                <p>
                  Le prix au m² d&apos;un quartier ne suffit pas à estimer un
                  bien, et l&apos;écart se mesure : sur les ventes de 2025, la
                  moitié centrale des appartements vendus à Villeurbanne s&apos;est
                  conclue entre <strong>2 954 et 4 173 €/m²</strong>, soit près de{" "}
                  <strong>76 000 € d&apos;écart</strong>{" "}
                  sur 62 m² — la surface médiane vendue dans la commune. La base
                  DVF ne dit rien de
                  l&apos;état du bien, de l&apos;étage, de l&apos;exposition ni du
                  DPE — or ce sont eux qui expliquent l&apos;essentiel des
                  différences à l&apos;intérieur d&apos;un quartier. Nous avons
                  mesuré{" "}
                  <Link href="/blog/estimation-en-ligne-ou-agence" className={A}>
                    de combien un prix au m² peut se tromper, quartier par
                    quartier
                  </Link>
                  . Ce qui fait bouger votre prix par rapport à la médiane :
                </p>
                <ul className="mt-3 space-y-2.5">
                  {[
                    "L'étage et l'ascenseur : un dernier étage avec ascenseur se paie, un 4ᵉ sans ascenseur se décote.",
                    "Le DPE : depuis l'interdiction de louer les logements classés G (janvier 2025), puis F (janvier 2028), les passoires thermiques se négocient nettement sous le marché.",
                    "L'extérieur : balcon, terrasse ou jardin, un différenciateur majeur depuis 2020.",
                    "Les charges de copropriété : élevées, elles réduisent directement le budget de l'acheteur.",
                    "Le stationnement : un garage ou une place se valorise à part, en plus du prix au m² habitable.",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="w-5 h-5 shrink-0 mt-0.5 rounded-full bg-sauge/20 grid place-items-center">
                        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="var(--color-sauge)" strokeWidth="2.8">
                          <path d="M5 12l5 5L20 6" />
                        </svg>
                      </span>
                      <span className="text-[15.5px] leading-relaxed text-[#3d4347]">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ),
          },
          {
            eyebrow: "En ligne ou sur place",
            h2: "Estimation en ligne ou visite d'un conseiller : laquelle choisir ?",
            body: (
              <p>
                Les deux sont utiles, dans cet ordre : l&apos;estimation en
                ligne d&apos;abord, la visite d&apos;un conseiller ensuite.
                L&apos;estimation en ligne vous donne
                en deux minutes une fourchette fondée sur les ventes réelles du
                secteur : c&apos;est le bon point de départ, y compris si vous
                réfléchissez encore. La visite d&apos;un conseiller, gratuite
                elle aussi, sert à resserrer cette fourchette avec ce
                qu&apos;aucune donnée publique ne voit : la luminosité réelle, le
                calme, la qualité de la copropriété, les travaux votés. Nous
                sommes installés{" "}
                <Link href="/agence-immobiliere-villeurbanne" className={A}>
                  87 rue Édouard Vaillant à Villeurbanne
                </Link>{" "}
                et intervenons sur toute la commune, de{" "}
                <Link href="/agence-immobiliere-gratte-ciel" className={A}>Gratte-Ciel</Link>{" "}
                à{" "}
                <Link href="/agence-immobiliere-charpennes" className={A}>Charpennes</Link>{" "}
                et{" "}
                <Link href="/agence-immobiliere-cusset" className={A}>Cusset</Link>, ainsi
                que sur{" "}
                <Link href="/estimation-immobiliere-lyon" className={A}>Lyon</Link> et la
                métropole.
              </p>
            ),
          },
          {
            eyebrow: "Vendre en 2026",
            h2: "Faut-il faire estimer son bien avant de le mettre en vente ?",
            body: (
              <p>
                Oui : à Villeurbanne, faire estimer son bien avant de le mettre
                en vente est devenu décisif, parce que le marché ne rattrape
                plus les erreurs de prix. Après trois années de baisse, la
                médiane villeurbannaise est
                remontée de <strong>+1,5 % entre 2024 et 2025</strong>, et le
                nombre de ventes de <strong>+14 %</strong> (1 875 contre 1 648) :
                il y a des acheteurs, mais ils comparent bien mieux qu&apos;en
                2021. Un bien affiché 10 % au-dessus de sa valeur ne trouve pas
                preneur en attendant que le marché monte — il stagne, puis se
                vend en dessous de son prix réel après plusieurs baisses. Une
                fois la fourchette connue, notre page{" "}
                <Link href="/vendre" className={A}>vendre son bien</Link> détaille
                l&apos;accompagnement jusqu&apos;à la signature.
              </p>
            ),
          },
        ]}
        afterSections={<FaqBlock items={FAQ} />}
        ctaTitle={
          <>
            Estimez votre bien à <span className="grad-light">Villeurbanne.</span>
          </>
        }
        ctaText="Gratuit, sans engagement, en moins de 2 minutes : valeur de vente, loyer estimé et rendement."
        primaryHref="/estimation"
        primaryLabel="Lancer mon estimation gratuite"
      />
    </>
  );
}
