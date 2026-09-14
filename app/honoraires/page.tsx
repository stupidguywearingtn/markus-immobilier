import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { ContractIllust } from "@/components/illustrations/contract";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import { JsonLd, breadcrumbLd, faqLd, offerCatalogLd } from "@/components/seo/json-ld";
import { FaqBlock, type FaqItem } from "@/components/seo/faq-block";

export const metadata: Metadata = {
  title: "Nos honoraires — Barème complet",
  description:
    "Barème détaillé Transaction, Location et Gestion locative. Honoraires Markus Immobilier à Lyon et Villeurbanne, en toute transparence.",
  alternates: { canonical: "/honoraires" },
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

/** Date de dernière mise à jour du contenu éditorial de la page (pas du barème :
 *  l'agence n'a pas communiqué de date d'entrée en vigueur, donc aucune n'est
 *  affichée ni balisée en `priceValidUntil`). */
const UPDATED = "2026-09-14";

const A =
  "text-anthracite font-semibold underline underline-offset-2 hover:text-sauge";

/**
 * Taux réellement payé selon le prix de vente.
 *
 * ⚠️ Ce tableau n'est PAS balisé en `Offer` : ce ne sont pas des tarifs
 * supplémentaires mais l'application arithmétique directe du barème
 * `TRANSACTION` ci-dessus (forfait ou pourcentage de la tranche). Le baliser
 * reviendrait à déclarer des offres qui n'existent pas.
 * 195 000 € = prix médian d'un appartement villeurbannais en 2025 (ventes DVF),
 * chiffre déjà publié sur /blog/prix-immobilier-villeurbanne-2026.
 */
const TAUX_EFFECTIF: [string, string, string][] = [
  ["120 000 €", "9 000 €", "7,5 %"],
  ["170 000 €", "9 000 €", "5,3 %"],
  ["195 000 € (prix médian villeurbannais)", "11 700 €", "6,0 %"],
  ["250 000 €", "15 000 €", "6,0 %"],
  ["300 000 €", "18 000 €", "6,0 %"],
  ["320 000 €", "16 000 €", "5,0 %"],
  ["450 000 €", "22 500 €", "5,0 %"],
  ["600 000 €", "24 000 €", "4,0 %"],
];

/**
 * FAQ visible. Le `FAQPage` JSON-LD est généré depuis CE tableau (`faqLd(FAQ)`),
 * jamais recopié : affichage et balisage ne peuvent pas diverger.
 */
const FAQ: FaqItem[] = [
  {
    q: "Qui paie les honoraires d'agence lors d'une vente à Villeurbanne ?",
    a: "Le vendeur. Le barème de Markus Immobilier indique « à la charge du vendeur » pour toute la partie transaction, et le mandat le reprend. Le montant n'est pas un pourcentage unique : il suit un barème par tranches, de 2 000 € forfaitaires sous 25 000 € à 3 % au-delà d'un million d'euros.",
  },
  {
    q: "Combien coûtent les honoraires pour vendre un appartement à 250 000 € ?",
    a: "15 000 € TTC, soit 6 % : c'est le taux de la tranche 170 001 – 300 000 € du barème. À titre de comparaison, un bien vendu 170 000 € coûte 9 000 € forfaitaires (5,3 % du prix) et un bien vendu 320 000 € coûte 16 000 € (5 %, tranche 300 001 – 500 000 €).",
  },
  {
    q: "Les honoraires d'agence sont-ils dus si la vente ne se fait pas ?",
    a: "Non. L'article 6 de la loi Hoguet (loi n° 70-9 du 2 janvier 1970) interdit à un agent immobilier d'exiger ou d'accepter une rémunération avant que l'opération ait été effectivement conclue et constatée dans un seul acte écrit contenant l'engagement des parties. L'estimation, les photos, les visites et la diffusion des annonces ne se facturent donc pas séparément : sans vente, il n'y a pas d'honoraires.",
  },
  {
    q: "Combien coûte la mise en location d'un appartement à Villeurbanne ?",
    a: "Côté propriétaire, 9 % du loyer annuel hors charges. Côté locataire, la part est plafonnée par la loi ALUR : 8, 10 ou 12 € par m² de surface habitable selon la zone de la commune, plus 3 €/m² pour l'état des lieux d'entrée. La loi impose aussi que la part facturée au locataire ne dépasse jamais celle facturée au propriétaire.",
  },
  {
    q: "Combien coûte la gestion locative chez Markus Immobilier ?",
    a: "6 % du total des encaissements mensuels par lot, avec un minimum de 25 €, auxquels s'ajoutent 20 € par an de frais et débours (extranet). L'assurance GLI, facultative, coûte 2,5 % du loyer. Les interventions ponctuelles (gestion de sinistre, réception de travaux, clôture de gestion) sont tarifées à part, ligne par ligne, dans le barème ci-dessus.",
  },
  {
    q: "Pourquoi cette agence publie-t-elle l'intégralité de son barème ?",
    a: "L'affichage des honoraires TTC est une obligation : l'arrêté du 10 janvier 2017, applicable depuis le 1er avril 2017 et modifié par l'arrêté du 26 janvier 2022, impose aux professionnels de l'immobilier d'informer les consommateurs de leurs tarifs. Markus Immobilier va au-delà du minimum en publiant les cinq barèmes complets en ligne et en PDF téléchargeable, transaction, location et gestion comprises.",
  },
];

export default function HonorairesPage() {
  return (
    <>
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

      {/* COMPRENDRE LE BARÈME — contenu de fond + FAQ */}
      <section className="bg-gris py-[120px] max-md:py-[80px]">
        <div className="max-w-[860px] mx-auto px-8 max-md:px-5">
          <Reveal>
            <p className="text-[13px] text-[#6b7276] mb-6">
              Dernière mise à jour :{" "}
              <time dateTime={UPDATED}>14 septembre 2026</time>
            </p>
            <p className="text-[17px] leading-relaxed text-[#3d4347] mb-14 max-md:mb-10">
              Un barème affiché ne dit pas tout. Voici ce que ces chiffres
              représentent concrètement : qui règle la facture, ce que
              l&apos;on paie vraiment en pourcentage du prix de vente, et dans
              quels cas rien n&apos;est dû.
            </p>
          </Reveal>

          <div className="space-y-14 max-md:space-y-10">
            <Reveal>
              <section>
                <Eyebrow className="mb-3">Qui paie</Eyebrow>
                <h2
                  className="font-bold tracking-[-0.01em] text-anthracite mb-4 leading-[1.15]"
                  style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}
                >
                  Qui paie les honoraires d&apos;agence, le vendeur ou
                  l&apos;acheteur ?
                </h2>
                <div className="text-[15.5px] leading-relaxed text-[#3d4347] space-y-3">
                  <p>
                    Pour une vente, les honoraires de Markus Immobilier sont{" "}
                    <strong>à la charge du vendeur</strong>{" "}
                    : c&apos;est écrit sur le barème de transaction ci-dessus et
                    repris dans le mandat. Pour une location, la loi partage la
                    facture entre les deux parties : le propriétaire règle{" "}
                    <strong>9 % du loyer annuel hors charges</strong>{" "}
                    et le locataire une part plafonnée par la loi ALUR à 8, 10 ou
                    12 € par m² selon la zone, plus 3 €/m² pour l&apos;état des
                    lieux d&apos;entrée. Cette part locataire ne peut jamais
                    dépasser celle du propriétaire.
                  </p>
                  <p>
                    Publier ces montants n&apos;est pas une faveur : l&apos;
                    <a
                      href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000033888549/"
                      className={A}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      arrêté du 10 janvier 2017
                    </a>{" "}
                    — applicable depuis le 1ᵉʳ avril 2017, modifié par
                    l&apos;arrêté du 26 janvier 2022 — impose aux professionnels
                    de l&apos;immobilier d&apos;informer les consommateurs de
                    leurs honoraires TTC. Ce que peu d&apos;agences font, en
                    revanche, c&apos;est publier le barème{" "}
                    <em>entier</em>, gestion locative comprise. C&apos;est le
                    parti pris de{" "}
                    <Link href="/agence-immobiliere-villeurbanne" className={A}>
                      notre agence à Villeurbanne
                    </Link>
                    .
                  </p>
                </div>
              </section>
            </Reveal>

            <Reveal delay={80}>
              <section>
                <Eyebrow className="mb-3">Taux réel</Eyebrow>
                <h2
                  className="font-bold tracking-[-0.01em] text-anthracite mb-4 leading-[1.15]"
                  style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}
                >
                  Combien représentent vraiment les honoraires en pourcentage du
                  prix ?
                </h2>
                <div className="text-[15.5px] leading-relaxed text-[#3d4347] space-y-3">
                  <p>
                    Entre{" "}
                    <strong>3 % et 9 %</strong>{" "}
                    du prix de vente, selon le montant du bien : le barème
                    fonctionne par tranches, pas par taux unique. Sur le prix
                    médian d&apos;un appartement villeurbannais en 2025 —{" "}
                    <strong>195 000 €</strong>{" "}
                    d&apos;après les ventes enregistrées chez le notaire — les
                    honoraires s&apos;élèvent à{" "}
                    <strong>11 700 € TTC</strong>, soit 6,0 % du prix. Sous
                    170 000 €, le forfait de 9 000 € représente un taux effectif
                    d&apos;autant plus élevé que le bien est modeste.
                  </p>
                </div>
                <div className="mt-6">
                  <RateTable rows={TAUX_EFFECTIF} />
                </div>
                <p className="mt-4 text-[13px] text-[#6b7276] italic">
                  Application directe du barème de transaction ci-dessus. Prix
                  médian 2025 issu des ventes réelles enregistrées dans la base
                  DVF —{" "}
                  <Link href="/blog/prix-immobilier-villeurbanne-2026" className={A}>
                    détail par quartier
                  </Link>
                  .
                </p>
              </section>
            </Reveal>

            <Reveal delay={160}>
              <section>
                <Eyebrow className="mb-3">Effet de seuil</Eyebrow>
                <h2
                  className="font-bold tracking-[-0.01em] text-anthracite mb-4 leading-[1.15]"
                  style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}
                >
                  Le pourcentage baisse-t-il quand le prix de vente augmente ?
                </h2>
                <div className="text-[15.5px] leading-relaxed text-[#3d4347] space-y-3">
                  <p>
                    Oui, mais par paliers nets plutôt que progressivement — et
                    deux seuils méritent d&apos;être connus avant de fixer un
                    prix de mise en vente. À{" "}
                    <strong>170 000 €</strong>, les honoraires sont de 9 000 €
                    forfaitaires ; juste au-dessus, la tranche à 6 % s&apos;
                    applique et le montant passe à 10 200 €. À{" "}
                    <strong>300 000 €</strong>, ils atteignent 18 000 € (6 %) ;
                    juste au-dessus, la tranche à 5 % ramène le montant à environ{" "}
                    <strong>15 000 €</strong>.
                  </p>
                  <p>
                    Autrement dit, un bien vendu un peu au-dessus de 300 000 €
                    laisse mécaniquement davantage au vendeur qu&apos;un bien
                    vendu juste en dessous : environ 285 000 € net contre
                    282 000 €. Ce
                    n&apos;est pas une raison pour surévaluer un bien — un prix
                    trop haut allonge le délai de vente — mais c&apos;est une
                    raison de plus de partir d&apos;une{" "}
                    <Link href="/estimation-immobiliere-villeurbanne" className={A}>
                      estimation sérieuse
                    </Link>{" "}
                    plutôt que d&apos;un chiffre rond.
                  </p>
                </div>
              </section>
            </Reveal>

            <Reveal delay={80}>
              <section>
                <Eyebrow className="mb-3">Vente sans suite</Eyebrow>
                <h2
                  className="font-bold tracking-[-0.01em] text-anthracite mb-4 leading-[1.15]"
                  style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}
                >
                  Que se passe-t-il si le bien ne se vend pas ?
                </h2>
                <div className="text-[15.5px] leading-relaxed text-[#3d4347] space-y-3">
                  <p>
                    Aucun honoraire n&apos;est dû. L&apos;article 6 de la{" "}
                    <strong>loi Hoguet</strong>{" "}
                    (loi n° 70-9 du 2 janvier 1970) interdit à un agent
                    immobilier d&apos;exiger ou d&apos;accepter une rémunération
                    avant que l&apos;opération ait été{" "}
                    <em>
                      effectivement conclue et constatée dans un seul acte écrit
                      contenant l&apos;engagement des parties
                    </em>
                    . L&apos;estimation, le reportage photo, les visites et la
                    diffusion des annonces ne se facturent donc pas séparément.
                  </p>
                  <p>
                    Une précision qui compte : la seule signature d&apos;un
                    compromis ne déclenche pas automatiquement la rémunération.
                    Lorsque l&apos;acte contient une condition suspensive — un
                    prêt bancaire, le plus souvent — la vente n&apos;est
                    considérée comme définitivement conclue qu&apos;une fois
                    cette condition réalisée. Le même principe vaut pour la{" "}
                    <Link href="/faire-gerer" className={A}>
                      gestion locative
                    </Link>{" "}
                    : les 6 % portent sur les loyers réellement encaissés, pas
                    sur les loyers théoriques.
                  </p>
                </div>
              </section>
            </Reveal>
          </div>

          <FaqBlock items={FAQ} />
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

/** Tableau à 3 colonnes du taux effectif — même habillage que `PricingTable`. */
function RateTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto rounded-[16px] border border-[var(--bordure)] shadow-[0_18px_50px_-30px_rgba(56,62,66,0.18)]">
      <table className="w-full text-left bg-blanc">
        <thead>
          <tr className="bg-anthracite text-blanc">
            <th className="px-6 py-4 max-md:px-4 max-md:py-3 text-[11px] uppercase tracking-[0.14em] font-bold">
              Prix de vente
            </th>
            <th className="px-6 py-4 max-md:px-4 max-md:py-3 text-[11px] uppercase tracking-[0.14em] font-bold text-right">
              Honoraires TTC
            </th>
            <th className="px-6 py-4 max-md:px-4 max-md:py-3 text-[11px] uppercase tracking-[0.14em] font-bold text-right">
              Taux effectif
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r[0]}
              className="border-t border-[var(--bordure)] hover:bg-gris transition-colors"
            >
              <td className="px-6 py-4 max-md:px-4 max-md:py-3 text-[14px] text-anthracite">
                {r[0]}
              </td>
              <td className="px-6 py-4 max-md:px-4 max-md:py-3 text-[15px] font-bold text-anthracite text-right tabular-nums whitespace-nowrap">
                {r[1]}
              </td>
              <td className="px-6 py-4 max-md:px-4 max-md:py-3 text-[15px] font-bold text-sauge text-right tabular-nums whitespace-nowrap">
                {r[2]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
