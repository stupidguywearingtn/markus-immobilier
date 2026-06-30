import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { ContractIllust } from "@/components/illustrations/contract";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";

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

export default function HonorairesPage() {
  return (
    <>
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
                  9 %
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
                  2,5 %
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
