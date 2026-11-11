import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/seo/json-ld";

/**
 * FAQ — réponses courtes, factuelles, autosuffisantes (optimisées pour citation
 * par les IA / GEO) + balisage JSON-LD FAQPage.
 * Rendu en <details> natif : contenu présent dans le DOM (crawlable) même replié.
 */

type QA = { q: string; a: string };

const FAQ: QA[] = [
  {
    q: "Comment estimer la valeur de son bien à Villeurbanne ou Lyon ?",
    a: "Pour estimer un bien, on croise les ventes réelles récentes de biens comparables dans le secteur (données DVF) avec ses caractéristiques : surface, état, étage, exposition, DPE et extérieurs. L'outil d'estimation gratuit de Markus Immobilier réalise ce calcul en ligne en moins de 2 minutes.",
  },
  {
    q: "L'estimation Markus Immobilier est-elle vraiment gratuite ?",
    a: "Oui. L'estimation en ligne est entièrement gratuite et sans engagement. Elle fournit une fourchette de prix réaliste basée sur les transactions réelles à Villeurbanne et à Lyon.",
  },
  {
    q: "Quel est le prix moyen au m² à Villeurbanne en 2026 ?",
    a: "Le prix médian d'un appartement vendu à Villeurbanne est de 3 567 €/m² sur l'année 2025, et de 3 500 €/m² sur le premier semestre 2026 (940 ventes). Pour une maison, la médiane 2025 est de 4 186 €/m². Nous publions la médiane plutôt que la moyenne, parce qu'elle n'est pas tirée vers le haut par quelques ventes exceptionnelles : selon le quartier, elle va de 2 738 €/m² à Cyprian – Les Brosses à 3 923 €/m² à Ferrandière – Maisons-Neuves. Chiffres calculés par Markus Immobilier sur le fichier des valeurs foncières de la DGFiP (DVF), c'est-à-dire sur les ventes réellement signées et non sur les prix affichés.",
  },
  {
    q: "Combien de temps prend une estimation en ligne ?",
    a: "Moins de 2 minutes. Il suffit de renseigner l'adresse et les caractéristiques du bien pour obtenir une fourchette de prix immédiate.",
  },
  {
    q: "Sur quoi repose votre estimation ?",
    a: "Sur les ventes réellement conclues (base officielle DVF) près du bien, et non sur les prix affichés. Ces données sont ensuite ajustées selon les critères précis du logement.",
  },
  {
    q: "Quels services propose Markus Immobilier ?",
    a: "Markus Immobilier accompagne la vente, l'achat, la location et la gestion locative de biens à Villeurbanne, Lyon et dans le Grand Lyon, avec une estimation gratuite en ligne.",
  },
  {
    q: "Où se situe l'agence Markus Immobilier ?",
    a: "L'agence est située au 87 rue Édouard Vaillant, 69100 Villeurbanne. Téléphone : 04 78 37 13 67.",
  },
  {
    q: "Le DPE influence-t-il le prix d'un bien ?",
    a: "Oui, et par un mécanisme vérifiable plutôt que par un effet de marché : un logement classé G ne peut plus être mis en location depuis le 1er janvier 2025, la classe F suit à partir de 2028 et la classe E à partir de 2034. Un acheteur qui ne pourra pas louer le bien, ou qui devra financer des travaux pour le pouvoir, en tient compte dans son offre. À Villeurbanne, le risque est faible et concentré : 2 454 appartements sur les 49 717 diagnostiqués sont classés F ou G, soit 4,9 %, contre 7,1 % en France et 6,7 % à Lyon. Mais ce taux monte à 7,60 % pour les appartements construits entre 1948 et 1974, et à 12,37 % pour ceux d'avant 1948. Source : base DPE des logements existants de l'ADEME, extraction du 11 octobre 2026, comptage Markus Immobilier.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  return (
    <section id="faq" className="bg-gris py-[120px] max-md:py-[72px]">
      <JsonLd data={faqLd} />
      <div className="max-w-[820px] mx-auto px-8 max-md:px-5">
        <Reveal className="text-center mb-12 max-md:mb-9">
          <Eyebrow className="mb-4">Questions fréquentes</Eyebrow>
          <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-[clamp(30px,4vw,46px)]">
            Vos questions, <span className="grad">nos réponses.</span>
          </h2>
        </Reveal>

        <div className="flex flex-col gap-3">
          {FAQ.map((item, i) => (
            <Reveal key={i} delay={(i % 4) * 60}>
              <details className="group bg-blanc border border-[var(--bordure)] rounded-[14px] overflow-hidden hover:border-sauge/40 transition-colors">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 max-md:px-5 max-md:py-4 [&::-webkit-details-marker]:hidden">
                  <span className="font-semibold text-anthracite text-[15.5px] leading-snug">
                    {item.q}
                  </span>
                  <span className="shrink-0 grid place-items-center w-7 h-7 rounded-full bg-sauge/15 text-sauge transition-transform duration-300 group-open:rotate-45">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-5 max-md:px-5 max-md:pb-4 -mt-1">
                  <p className="text-[14.5px] leading-relaxed text-[#3d4347]">
                    {item.a}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
