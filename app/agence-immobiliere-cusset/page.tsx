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
  MAJ,
  QUARTIERS,
  TYPOLOGIES,
  ecartCommune,
  fmtEur,
  fmtM2,
  fmtPct,
  honorairesVente,
  surfacePourBudget,
} from "@/lib/quartiers";

/**
 * Page quartier « agence immobilière Cusset ».
 *
 * Constat du 2026-09-07 (audit live) : ~350-400 mots, aucun prix, aucune FAQ.
 *
 * Parti pris (2026-09-15) : l'angle de Cusset est la SURFACE. C'est le
 * quartier desservi par le métro A le moins cher de Villeurbanne, donc celui où
 * un même budget achète le plus de mètres carrés — un fait chiffrable qui
 * répond à l'intention réelle (« primo-accédant / famille cherche grand »).
 * Deuxième fait exploitable : c'est le quartier qui a le mieux résisté à la
 * baisse depuis 2022 après Ferrandière.
 *
 * ⚠️ Correction factuelle appliquée le 2026-09-15 : la page annonçait
 * « métro A ET tramway ». Il n'y a pas de tramway à Cusset ni à Laurent
 * Bonnevay — la desserte est le métro A (stations Cusset et Flachet, terminus
 * Laurent Bonnevay – Astroballe) et les bus. Ne pas réintroduire le tramway.
 *
 * Aucun chiffre en dur ici : tout vient de `lib/quartiers.ts`.
 */

const Q = QUARTIERS.cusset;
const GC = QUARTIERS["gratte-ciel"];
const ECART = ecartCommune(Q.median);
const ECART_GC = Math.round((GC.median / Q.median - 1) * 1000) / 10;
const PRIX_MEDIAN_QUARTIER = Q.median * COMMUNE.surfaceMediane;
const HONO = honorairesVente(PRIX_MEDIAN_QUARTIER);
const T4 = TYPOLOGIES.find((t) => t.type === "T4")!;
const GAIN_M2_250K =
  surfacePourBudget(Q.median, 250000) - surfacePourBudget(GC.median, 250000);

export const metadata: Metadata = {
  title: "Agence immobilière Cusset (Villeurbanne) — prix au m² réels",
  description: `Prix médian à Cusset – Bonnevay : ${fmtM2(Q.median)} sur les ${Q.n} ventes d'appartements de 2025 (base DVF), ${fmtPct(ECART)} vs Villeurbanne. Le quartier métro A le plus accessible de la ville. Estimation gratuite Markus Immobilier.`,
  alternates: { canonical: "/agence-immobiliere-cusset" },
  ...shareMeta({
    title: "Agence immobilière Cusset — Markus Immobilier",
    description: `Prix au m² réels à Cusset (${fmtM2(Q.median)}, ventes 2025), estimation gratuite, vente, achat et gestion locative.`,
    path: "/agence-immobiliere-cusset",
  }),
};

/** FAQ visible — le JSON-LD FAQPage est généré depuis ce même tableau. */
const FAQ: FaqItem[] = [
  {
    q: "Quel est le prix au m² à Cusset (Villeurbanne) ?",
    a: `Le prix médian est de ${fmtM2(Q.median)}, calculé sur les ${Q.n} ventes d'appartements réellement signées en 2025 dans le contour officiel « ${Q.contour} » (base DVF publiée par l'État). C'est ${fmtPct(ECART)} par rapport à la médiane de Villeurbanne (${fmtM2(COMMUNE.median)}), et ${ECART_GC.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} % de moins qu'à Gratte-Ciel – Dedieu – Charmettes.`,
  },
  {
    q: "Quelle surface peut-on acheter à Cusset avec 250 000 € ?",
    a: `Au prix médian du quartier, environ ${surfacePourBudget(Q.median, 250000)} m² — soit un T4 dans la plupart des cas. C'est ${GAIN_M2_250K} m² de plus que ce que le même budget achète à Gratte-Ciel, pour une desserte identique par le métro A. Avec 200 000 €, on est autour de ${surfacePourBudget(Q.median, 200000)} m² ; avec 300 000 €, autour de ${surfacePourBudget(Q.median, 300000)} m².`,
  },
  {
    q: "Cusset est-il moins cher que le reste de Villeurbanne ?",
    a: `Oui : ${fmtPct(ECART)} sous la médiane communale. Sur les sept quartiers publiables de la commune, Cusset – Bonnevay est le sixième en prix — seul Cyprian – Les Brosses est plus abordable, mais il n'est pas desservi par le métro. Cusset est donc le quartier le moins cher de Villeurbanne parmi ceux qui ont une station de métro.`,
  },
  {
    q: "Le quartier Cusset est-il bien desservi ?",
    a: `Il est traversé par la ligne A du métro, avec les stations Cusset et Flachet sur le cours Émile Zola et le terminus Laurent Bonnevay – Astroballe en limite est du quartier, d'où partent de nombreuses lignes de bus vers l'est de la métropole. La Part-Dieu est à une dizaine de minutes de métro. Il n'y a en revanche pas de tramway dans ce secteur.`,
  },
  {
    q: "Les prix ont-ils beaucoup baissé à Cusset ?",
    a: `Moins qu'ailleurs. Cusset – Bonnevay est à ${fmtPct(Q.vs2022)} par rapport à 2022, quand la commune entière est à ${fmtPct(COMMUNE.vs2022)} : c'est le quartier qui a le mieux résisté après Ferrandière – Maisons-Neuves. Et il remonte de ${fmtPct(Q.vs1an)} sur la dernière année mesurée, soit plus vite que la moyenne communale (${fmtPct(COMMUNE.vs1an)}).`,
  },
];

const A =
  "text-anthracite font-semibold underline underline-offset-2 hover:text-sauge";

export default function CussetPage() {
  return (
    <>
      <JsonLd
        data={webPageLd({
          path: "/agence-immobiliere-cusset",
          name: "Agence immobilière Cusset (Villeurbanne)",
          description:
            "Prix au m² réels du quartier Cusset, calculés sur les ventes enregistrées.",
          dateModified: lastmodOf("/agence-immobiliere-cusset"),
        })}
      />
      <JsonLd
        data={serviceLd({
          name: "Agence immobilière à Cusset",
          serviceType: "Services immobiliers",
          description:
            "Agence immobilière dans le quartier Cusset à Villeurbanne : vente, achat, location, gestion locative et estimation gratuite, appuyée sur les prix de vente réels du secteur.",
          path: "/agence-immobiliere-cusset",
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Agence immobilière Cusset", path: "/agence-immobiliere-cusset" },
        ])}
      />
      <JsonLd data={faqLd(FAQ)} />
      <SeoLanding
        eyebrow="Cusset"
        title={<>Votre agence immobilière à <span className="grad-light">Cusset.</span></>}
        lead="Markus Immobilier vous accompagne dans le quartier Cusset, à Villeurbanne : vente, achat, location et gestion. Le secteur métro A le plus accessible de la ville."
        illustration={
          <DrawOnScroll>
            <BuildingIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        updated={MAJ}
        intro={
          <>
            À Cusset – Bonnevay, le prix médian d&apos;un appartement est de{" "}
            <strong>{fmtM2(Q.median)}</strong>, calculé sur les {Q.n} ventes
            réellement signées en 2025 — soit {fmtPct(ECART)} par rapport à la
            médiane de Villeurbanne. Concrètement, c&apos;est le quartier
            desservi par le métro A où un même budget achète le plus de mètres
            carrés : {GAIN_M2_250K} m² de plus qu&apos;à Gratte-Ciel pour
            250 000 €. Voici les chiffres, et ce qu&apos;ils changent pour
            acheter ou vendre ici.
          </>
        }
        sections={[
          {
            eyebrow: "Le marché",
            h2: "Quel est le prix au m² à Cusset ?",
            body: (
              <>
                <p>
                  <strong>{fmtM2(Q.median)}</strong> pour un appartement, sur les{" "}
                  {Q.n} ventes enregistrées dans le contour officiel «{" "}
                  {Q.contour} » en 2025 — {fmtPct(ECART)} par rapport à la
                  médiane communale ({fmtM2(COMMUNE.median)}).
                </p>
                <QuartierPrixTable surligne="cusset" />
                <p>
                  Dans ce tableau, Cusset occupe le sixième rang sur sept. Le
                  seul quartier plus abordable, Cyprian – Les Brosses, n&apos;a
                  pas de station de métro : <strong>Cusset est donc le
                  quartier le moins cher de Villeurbanne parmi ceux desservis par
                  le métro A</strong>. C&apos;est aussi celui qui a le mieux
                  résisté à la baisse après Ferrandière ({fmtPct(Q.vs2022)} depuis
                  2022, contre {fmtPct(COMMUNE.vs2022)} pour la commune). La
                  méthode complète est détaillée dans notre analyse des{" "}
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
            h2: "Quelle surface peut-on acheter à Cusset ?",
            body: (
              <>
                <p className="mb-3">
                  Au prix médian du quartier, 200 000 € correspondent à environ{" "}
                  <strong>{surfacePourBudget(Q.median, 200000)} m²</strong>,
                  250 000 € à <strong>{surfacePourBudget(Q.median, 250000)} m²</strong>{" "}
                  et 300 000 € à <strong>{surfacePourBudget(Q.median, 300000)} m²</strong>.
                  Le même budget de 250 000 € achète{" "}
                  <strong>{GAIN_M2_250K} m² de plus</strong> qu&apos;à{" "}
                  <Link href="/agence-immobiliere-gratte-ciel" className={A}>
                    Gratte-Ciel
                  </Link>{" "}
                  — pour la même ligne de métro.
                </p>
                <p>
                  C&apos;est ce qui fait de Cusset un secteur de familles et de
                  premiers achats : à l&apos;échelle de la commune, le prix
                  médian d&apos;un T4 est de {fmtEur(T4.prixMedian)}, et c&apos;est
                  ici qu&apos;il est le plus atteignable. Pour situer votre bien
                  précisément, notre{" "}
                  <Link href="/estimation" className={A}>
                    estimation en ligne
                  </Link>{" "}
                  compare aux ventes réelles du secteur en deux minutes.
                </p>
              </>
            ),
          },
          {
            eyebrow: "Le quartier",
            h2: "Comment est desservi le quartier Cusset ?",
            body: (
              <p>
                Le quartier est traversé par la{" "}
                <strong>ligne A du métro</strong>, avec les stations Cusset et
                Flachet sur le cours Émile Zola, et le terminus{" "}
                <strong>Laurent Bonnevay – Astroballe</strong> en limite est,
                d&apos;où partent de nombreuses lignes de bus vers l&apos;est de
                la métropole. La Part-Dieu est à une dizaine de minutes. Le
                secteur est résidentiel, avec les commerces de proximité du cours
                Émile Zola, le parc de la Feyssine et la Rize à proximité, et une
                dominante de copropriétés des années 1960-1980 — des logements
                souvent plus grands et plus lumineux que dans l&apos;hyper-centre,
                mais dont le DPE pèse aujourd&apos;hui lourd dans la négociation.
              </p>
            ),
          },
          {
            eyebrow: "Vendre ici",
            h2: "Combien coûte la vente d'un appartement à Cusset ?",
            body: (
              <p>
                Un appartement de {COMMUNE.surfaceMediane} m² au prix médian du
                quartier représente environ{" "}
                <strong>{fmtEur(Math.round(PRIX_MEDIAN_QUARTIER / 1000) * 1000)}</strong>
                {HONO && (
                  <>
                    . À ce niveau de prix, nos honoraires de vente relèvent de la
                    tranche <strong>{HONO.label}</strong> du barème, soit environ{" "}
                    <strong>{fmtEur(Math.round(HONO.montant / 100) * 100)} TTC</strong>,
                    à la charge du vendeur
                  </>
                )}
                . Le barème complet est public et identique pour tous les
                mandants :{" "}
                <Link href="/honoraires" className={A}>
                  voir les honoraires
                </Link>
                . Sur ce secteur, deux points font la différence à la vente : le
                DPE, et la présence d&apos;un extérieur ou d&apos;un
                stationnement. Voir aussi notre page{" "}
                <Link href="/agence-immobiliere-villeurbanne" className={A}>
                  agence immobilière à Villeurbanne
                </Link>{" "}
                et le quartier voisin de{" "}
                <Link href="/agence-immobiliere-charpennes" className={A}>
                  Charpennes
                </Link>
                .
              </p>
            ),
          },
          {
            eyebrow: "Nos services ici",
            h2: "Ce que Markus Immobilier fait pour vous à Cusset",
            bullets: [
              "Estimation gratuite appuyée sur les ventes réelles du quartier, DPE et extérieur pris en compte.",
              "Vente d'appartements et de maisons, du mandat à l'acte notarié.",
              "Accompagnement au premier achat : budget, surface atteignable, points de vigilance en copropriété.",
              "Location et gestion locative complète, barème public.",
            ],
          },
        ]}
        afterSections={<FaqBlock items={FAQ} />}
        ctaTitle={<>Un projet à <span className="grad-light">Cusset ?</span></>}
        ctaText="Estimez votre bien gratuitement en 2 minutes sur les ventes réelles du quartier, ou échangez avec un conseiller du secteur."
      />
    </>
  );
}
