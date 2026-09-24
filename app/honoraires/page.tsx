import type { Metadata } from "next";
import { shareMeta } from "@/lib/seo/share";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { ContractIllust } from "@/components/illustrations/contract";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import {
  JsonLd,
  breadcrumbLd,
  faqLd,
  offerCatalogLd,
  webPageLd,
} from "@/components/seo/json-ld";
import { FaqBlock, type FaqItem } from "@/components/seo/faq-block";
import { fmtDateFr, lastmodOf } from "@/lib/seo/lastmod";

export const metadata: Metadata = {
  title: "Nos honoraires — Barème complet",
  description:
    "Barème détaillé Transaction, Location et Gestion locative. Honoraires Markus Immobilier à Lyon et Villeurbanne, en toute transparence.",
  alternates: { canonical: "/honoraires" },
  ...shareMeta({
    title: "Nos honoraires — barème public complet",
    description:
      "Vente, location, gestion locative : le barème détaillé de Markus Immobilier, affiché en toutes lettres, et qui paie quoi.",
    path: "/honoraires",
  }),
};

const TRANSACTION = [
  ["Inférieur à 25 000 €", "2 000 €"],
  ["De 25 000 € à 50 000 €", "5 000 €"],
  ["De 50 001 € à 170 000 €", "9 000 €"],
  ["De 170 001 € à 300 000 €", "6 %"],
  ["De 300 001 € à 500 000 €", "5 %"],
  ["De 500 001 € à 700 000 €", "4 %"],
  ["De 700 001 € à 1 000 000 €", "3,5 %"],
  ["Supérieur à 1 000 000 €", "3 %"],
];

const LOCATION_LOCATAIRE = [
  ["Hors zones tendues et très tendues", "8 €/m²"],
  ["Zones tendues", "10 €/m²"],
  ["Zone très tendue", "12 €/m²"],
  ["État des lieux d'entrée", "3 €/m²"],
  ["État des lieux de sortie", "3 €/m²"],
  ["Garage – Parking – Box – Cave", "120 €"],
];

const GESTION_COURANTE = [
  [
    "Honoraires de base — sur le total des encaissements mensuels par lot (min. 25 €)",
    "6 %",
  ],
  ["Frais et débours / extranet", "20 €/an"],
  ["Frais annuel de correspondance (si envoi par courrier)", "45 €/lot"],
];

const GESTION_OCCASIONNELLE = [
  ["Vacation horaire", "100 €"],
  ["Déclaration et gestion de sinistre, présence expertise", "Vacation"],
  ["Réception des travaux ou livraison VEFA", "Vacation"],
  ["Ouverture dossier GLI, conciliation, relation huissier", "Vacation"],
  ["Document d'aide à la déclaration des revenus fonciers", "70 € + 10 €/lot suppl."],
  ["Envoi congé vente/reprise par LRAR", "100 €/lot"],
  ["Clôture fin de gestion (dossier complet + état comptable)", "90 € + 10 €/lot suppl."],
  ["Gestion des travaux", "5 % du montant des travaux"],
];

/**
 * Les deux taux affichés hors tableau (encadrés « Part propriétaire » et
 * « Assurance GLI »). Constantes pour que l'affichage et le JSON-LD lisent la
 * même valeur — c'est la règle du site : un barème balisé ne doit jamais
 * pouvoir diverger du barème visible.
 */
const LOCATION_PROPRIETAIRE = "9 %";
const GLI = "2,5 %";

/**
 * Barème structuré — construit à partir des MÊMES constantes que les tableaux
 * rendus plus bas. Ajouter une ligne au barème l'ajoute donc au balisage sans
 * rien faire de plus ; en retirer une la retire des deux côtés.
 */
const bareme = offerCatalogLd({
  name: "Barème d'honoraires Markus Immobilier",
  description:
    "Barème complet des honoraires TTC de l'agence Markus Immobilier à Villeurbanne : transaction (à la charge du vendeur), location et gestion locative.",
  path: "/honoraires",
  sections: [
    {
      name: "Honoraires de transaction",
      note: "À la charge du vendeur.",
      rows: TRANSACTION,
    },
    {
      name: "Honoraires de location — part locataire",
      note: "Baux d'habitation soumis à la loi du 6 juillet 1989 (conforme loi ALUR) et meublés. Montant maximum ne pouvant être supérieur aux honoraires facturés au propriétaire.",
      rows: LOCATION_LOCATAIRE,
    },
    {
      name: "Honoraires de location — part propriétaire",
      note: "Calculés sur le loyer annuel hors charges. Les honoraires facturés au propriétaire sont a minima équivalents à ceux du locataire.",
      // Libellés repris mot pour mot de l'encadré visible (titre + légende du
      // chiffre), pour que chaque `name` balisé existe tel quel sur la page.
      rows: [["Part propriétaire", `${LOCATION_PROPRIETAIRE} du loyer annuel HC`]],
    },
    {
      name: "Gestion locative courante",
      rows: [
        ...GESTION_COURANTE,
        ["Assurance GLI", `${GLI} du loyer`],
      ],
    },
    {
      name: "Honoraires de gestion occasionnels",
      rows: GESTION_OCCASIONNELLE,
    },
  ],
});

/**
 * Date à laquelle les textes cités dans la FAQ ont été revérifiés à la source.
 *
 * ⚠️ Elle ne date **pas** le barème : l'agence n'a jamais communiqué sa date
 * d'entrée en vigueur, et l'inventer serait une attestation sans fondement sur
 * la page la plus engageante du site. Elle ne couvre que les références
 * légales ci-dessous, qui, elles, sont vérifiables.
 */
const LEGAL_CHECKED = "2026-09-15";

/**
 * FAQ visible — le JSON-LD `FAQPage` est généré depuis ce MÊME tableau
 * (`faqLd(FAQ)`), jamais recopié : affichage et balisage ne peuvent pas diverger.
 *
 * Ces six questions sont volontairement disjointes de celles de
 * `/agence-immobiliere-villeurbanne`, qui traite déjà « combien coûte une agence
 * pour vendre », « honoraires de gestion locative » et « faut-il payer pour
 * faire estimer ». Dupliquer une FAQ d'une page à l'autre reviendrait à servir
 * deux `FAQPage` concurrentes sur les mêmes questions.
 *
 * Tous les montants cités proviennent des constantes du barème ci-dessus. Les
 * seules dérivations sont arithmétiques (45 m² × 10 €/m², puis × 3 €/m²).
 */
const FAQ: FaqItem[] = [
  {
    q: "Qui paie les honoraires d'agence lors d'une vente ?",
    a: "Le barème ci-dessus place les honoraires de transaction à la charge du vendeur. Aucune loi ne l'impose : c'est le mandat signé entre le vendeur et l'agence qui désigne le redevable, et un mandat peut tout aussi bien prévoir une charge acquéreur ou un partage. C'est donc une question à poser avant de signer un mandat, quelle que soit l'agence.",
  },
  {
    q: "Les honoraires d'agence sont-ils dus si la vente ne se fait pas ?",
    a: "Non. L'article 6 de la loi Hoguet (loi n° 70-9 du 2 janvier 1970) interdit à une agence de percevoir la moindre somme tant que l'opération n'est pas effectivement conclue et constatée par un acte écrit. Estimation, reportage photo, diffusion des annonces, visites et négociation ne sont donc facturés ni pendant le mandat, ni si la vente n'aboutit pas. Les honoraires sont réglés chez le notaire, le jour de la signature de l'acte authentique (décret n° 72-678 du 20 juillet 1972, article 73).",
  },
  {
    q: "Les honoraires sont-ils compris dans le prix affiché dans les annonces ?",
    a: "Oui, puisqu'ils sont à la charge du vendeur : le prix annoncé est celui que règle l'acquéreur, sans honoraires d'agence à ajouter. À ne pas confondre avec les frais de notaire, qui sont dus en plus par l'acquéreur et ne reviennent pas à l'agence : ils sont constitués pour l'essentiel des droits de mutation perçus par l'État et les collectivités.",
  },
  {
    q: "Combien un locataire paie-t-il à l'agence à Villeurbanne ?",
    a: "Villeurbanne est classée en zone tendue. La part locataire y est de 10 €/m² de surface habitable pour la visite, la constitution du dossier et la rédaction du bail, plus 3 €/m² pour l'état des lieux d'entrée. Pour un T2 de 45 m², cela représente 450 € puis 135 €, soit 585 € TTC au total. Ces deux montants restent inférieurs aux plafonds légaux applicables depuis le 1er janvier 2026 — 10,09 €/m² en zone tendue et 3,03 €/m² pour l'état des lieux — fixés par les arrêtés des 17 juillet et 20 novembre 2025, qui indexent désormais ces plafonds sur l'indice de référence des loyers après onze ans de gel.",
  },
  {
    q: "Quels frais s'ajoutent aux 6 % de la gestion locative ?",
    a: "Le barème distingue la gestion courante des interventions occasionnelles. En gestion courante s'ajoutent aux 6 % des encaissements 20 € par an de frais et débours (extranet) et, si les courriers sont envoyés par voie postale, 45 € par lot et par an. En occasionnel : vacation horaire à 100 €, aide à la déclaration des revenus fonciers à 70 € (plus 10 € par lot supplémentaire), envoi d'un congé par lettre recommandée à 100 € par lot, clôture de gestion à 90 € (plus 10 € par lot supplémentaire), et gestion de travaux à 5 % de leur montant.",
  },
  {
    q: "Pourquoi une agence doit-elle afficher son barème, et les montants sont-ils TTC ?",
    a: "Toutes les lignes du barème sont exprimées TTC : c'est le montant réellement facturé, sans supplément. L'affichage n'est pas un geste commercial mais une obligation : l'arrêté du 10 janvier 2017, modifié le 26 janvier 2022, impose à tout professionnel de l'immobilier de publier ses prix maximum toutes taxes comprises, en vitrine comme sur son site internet. Concrètement, cela permet de comparer deux agences sur le même terrain avant même de les rencontrer.",
  },
];

const A =
  "text-anthracite font-semibold underline underline-offset-2 hover:text-sauge";

/** Date de dernière modification réelle — source unique, cf. `lib/seo/lastmod.ts`. */
const UPDATED = lastmodOf("/honoraires");

export default function HonorairesPage() {
  return (
    <>
      <JsonLd
        data={webPageLd({
          path: "/honoraires",
          name: "Nos honoraires — Barème complet",
          description:
            "Barème détaillé Transaction, Location et Gestion locative de Markus Immobilier, à Lyon et Villeurbanne.",
          dateModified: lastmodOf("/honoraires"),
        })}
      />
      <JsonLd data={bareme} />
      <JsonLd data={faqLd(FAQ)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Nos honoraires", path: "/honoraires" },
        ])}
      />
      <PageHero
        eyebrow="Transparence"
        title={<>Nos <span className="grad-light">honoraires.</span></>}
        lead="Barème complet, à jour, accessible. Transaction · Location · Gestion locative. Aucune zone grise."
        illustration={
          <DrawOnScroll>
            <ContractIllust size={360} className="illust-on-dark" />
          </DrawOnScroll>
        }
        actions={
          <Button href="/bareme-honoraires-markus.pdf" external variant="cta">
            Télécharger le barème (PDF)
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
            </svg>
          </Button>
        }
      />

      {/* TRANSACTION */}
      <section className="bg-blanc py-[120px] max-md:py-[80px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <Reveal className="text-center mb-10 max-md:mb-8">
            <p className="text-[13px] text-[#6b7276]">
              Barème en vigueur — dernière mise à jour :{" "}
              <time dateTime={UPDATED}>{fmtDateFr(UPDATED)}</time>
            </p>
          </Reveal>

          <Reveal className="text-center mb-12 max-md:mb-8">
            <Eyebrow className="mb-3">Vente</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em] mb-3">
              Honoraires de <span className="grad">transaction.</span>
            </h2>
            <p className="text-[#7a817f] italic text-sm">
              à la charge du vendeur
            </p>
          </Reveal>

          <Reveal>
            <PricingTable
              headers={["Prestation", "Honoraires TTC"]}
              rows={TRANSACTION}
            />
          </Reveal>
        </div>
      </section>

      {/* LOCATION */}
      <section className="bg-gris py-[120px] max-md:py-[80px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <Reveal className="text-center mb-4">
            <Eyebrow className="mb-3">Location</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em] mb-3">
              Honoraires de <span className="grad">location.</span>
            </h2>
            <p className="text-[#7a817f] italic text-sm max-w-[640px] mx-auto">
              Baux d&apos;habitation soumis à la loi du 6 juillet 1989 (conforme
              loi ALUR) + meublés.
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <h3 className="text-[18px] font-bold uppercase tracking-[0.08em] mb-2">
              Part locataire
            </h3>
            <p className="text-[12px] text-[#7a817f] italic mb-5">
              Montant max ne pouvant être supérieur aux honoraires facturés au
              propriétaire.
            </p>
            <PricingTable
              headers={["Prestation", "Honoraires TTC"]}
              rows={LOCATION_LOCATAIRE}
            />
          </Reveal>

          <Reveal delay={120} className="mt-12">
            <div className="bg-blanc rounded-[16px] p-7 max-md:p-5 border border-[var(--bordure)]">
              <h3 className="text-[18px] font-bold uppercase tracking-[0.08em] mb-2">
                Part propriétaire
              </h3>
              <p className="text-[12px] text-[#7a817f] italic mb-4">
                Calculés sur le loyer annuel hors charges. Les honoraires
                facturés au propriétaire sont a minima équivalents à ceux du
                locataire.
              </p>
              <div className="flex items-baseline gap-3">
                <div className="text-[clamp(36px,5vw,52px)] font-extrabold text-anthracite leading-none">
                  {LOCATION_PROPRIETAIRE}
                </div>
                <div className="text-sm text-[#7a817f]">du loyer annuel HC</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GESTION LOCATIVE */}
      <section className="bg-blanc py-[120px] max-md:py-[80px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <Reveal className="text-center mb-12 max-md:mb-8">
            <Eyebrow className="mb-3">Gestion locative</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em] mb-3">
              Honoraires de <span className="grad">gestion.</span>
            </h2>
          </Reveal>

          <Reveal>
            <h3 className="text-[18px] font-bold uppercase tracking-[0.08em] mb-5">
              Gestion courante
            </h3>
            <PricingTable
              headers={["Prestation", "Tarif TTC"]}
              rows={GESTION_COURANTE}
            />
          </Reveal>

          <Reveal delay={120} className="mt-12">
            <div className="bg-gris rounded-[16px] p-7 max-md:p-5 flex items-center gap-5 max-md:flex-col max-md:items-start max-md:gap-3">
              <div className="flex-1">
                <h3 className="text-[18px] font-bold uppercase tracking-[0.08em] mb-1">
                  Assurance GLI
                </h3>
                <p className="text-[13px] text-[#7a817f]">
                  Garantie des Loyers Impayés — protège vos revenus locatifs.
                </p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[clamp(28px,4vw,40px)] font-extrabold text-anthracite leading-none">
                  {GLI}
                </span>
                <span className="text-sm text-[#7a817f]">du loyer</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={180} className="mt-12">
            <h3 className="text-[18px] font-bold uppercase tracking-[0.08em] mb-5">
              Honoraires occasionnels
            </h3>
            <PricingTable
              headers={["Prestation", "Tarif TTC"]}
              rows={GESTION_OCCASIONNELLE}
            />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gris py-[120px] max-md:py-[80px]">
        <div className="max-w-[900px] mx-auto px-8 max-md:px-5">
          <Reveal className="text-center mb-10 max-md:mb-8">
            <Eyebrow className="mb-3">Vos questions</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em]">
              Ce qu&apos;il faut savoir{" "}
              <span className="grad">avant de signer.</span>
            </h2>
          </Reveal>

          <Reveal>
            <div className="bg-blanc rounded-[16px] p-9 max-md:p-5 border border-[var(--bordure)]">
              <p className="text-[16px] leading-relaxed text-[#3d4347]">
                En vente, nos honoraires sont à la charge du vendeur et ne sont
                dus qu&apos;une fois la vente signée chez le notaire. En
                location, la part locataire est de 10 €/m² à Villeurbanne,
                commune classée en zone tendue, plus 3 €/m² d&apos;état des
                lieux. En gestion, 6 % des encaissements. Le détail de chaque
                cas est ci-dessous.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-[#3d4347]">
                Pour rapporter ces montants à un bien réel,{" "}
                <Link href="/estimation" className={A}>
                  l&apos;estimation en ligne
                </Link>{" "}
                est gratuite et sans engagement, la page{" "}
                <Link href="/agence-immobiliere-villeurbanne" className={A}>
                  agence immobilière à Villeurbanne
                </Link>{" "}
                situe le barème face au prix médian de la commune, et{" "}
                <Link href="/faire-gerer" className={A}>
                  faire gérer son bien
                </Link>{" "}
                détaille ce que recouvre la gestion locative.
              </p>

              <FaqBlock items={FAQ} />

              <p className="mt-8 text-[12px] text-[#7a817f] italic">
                Références légales vérifiées le{" "}
                <time dateTime={LEGAL_CHECKED}>15 septembre 2026</time>. Cette
                date ne préjuge pas de la date d&apos;entrée en vigueur du
                barème lui-même.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-anthracite text-blanc py-[100px] max-md:py-[72px]">
        <div className="max-w-[820px] mx-auto px-8 max-md:px-5 text-center">
          <Reveal>
            <Eyebrow className="mb-4">Une question sur le barème ?</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em] mb-6">
              On vous explique, <span className="grad-light">simplement.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="cta">
                Nous contacter
              </Button>
              <Button href="tel:0478371367" variant="ghost">
                04 78 37 13 67
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PricingTable({
  headers,
  rows,
}: {
  headers: [string, string];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-[16px] border border-[var(--bordure)] shadow-[0_18px_50px_-30px_rgba(56,62,66,0.18)]">
      <table className="w-full text-left bg-blanc">
        <thead>
          <tr className="bg-anthracite text-blanc">
            <th className="px-6 py-4 max-md:px-4 max-md:py-3 text-[11px] uppercase tracking-[0.14em] font-bold w-[70%]">
              {headers[0]}
            </th>
            <th className="px-6 py-4 max-md:px-4 max-md:py-3 text-[11px] uppercase tracking-[0.14em] font-bold text-right">
              {headers[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className="border-t border-[var(--bordure)] hover:bg-gris transition-colors"
            >
              <td className="px-6 py-4 max-md:px-4 max-md:py-3 text-[14px] text-anthracite">
                {r[0]}
              </td>
              <td className="px-6 py-4 max-md:px-4 max-md:py-3 text-[15px] font-bold text-sauge text-right tabular-nums whitespace-nowrap">
                {r[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
