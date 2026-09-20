import type { Metadata } from "next";
import { shareMeta } from "@/lib/seo/share";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { QuartierPrixTable } from "@/components/seo/quartier-prix";
import { DVF_ANNEE } from "@/lib/quartiers";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { Button, ArrowRight } from "@/components/ui/button";
import { EstimationForm } from "@/components/forms/estimation-form";
import { KeysIllust } from "@/components/illustrations/keys";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Estimation de bien à Lyon & Villeurbanne — gratuite en 2 min",
  description:
    "Estimation immobilière gratuite et sans engagement à Lyon et Villeurbanne : valeur de vente, loyer mensuel, taux de rendement. Rapport détaillé envoyé par email en moins de 2 minutes.",
  alternates: { canonical: "/estimation" },
  ...shareMeta({
    title: "Estimation de bien à Lyon & Villeurbanne — gratuite en 2 min",
    description:
      "Valeur de vente, loyer, rendement : votre rapport d'estimation en moins de 2 minutes. Gratuit, sans engagement.",
    path: "/estimation",
  }),
};

// JSON-LD : Service (l'outil d'estimation, différenciateur) + fil d'Ariane.
const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Estimation immobilière en ligne",
  serviceType: "Estimation de bien immobilier",
  description:
    "Estimation gratuite de la valeur de vente, du loyer et du rendement d'un bien à Lyon et Villeurbanne, avec rapport détaillé en moins de 2 minutes.",
  areaServed: ["Villeurbanne", "Lyon", "Métropole de Lyon"],
  url: "https://www.markusimmobilier.fr/estimation",
  provider: {
    "@type": "RealEstateAgent",
    name: "Markus Immobilier",
    telephone: "+33478371367",
    address: {
      "@type": "PostalAddress",
      streetAddress: "87 rue Édouard Vaillant",
      addressLocality: "Villeurbanne",
      postalCode: "69100",
      addressCountry: "FR",
    },
  },
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
};

const LNK =
  "text-anthracite font-semibold underline underline-offset-2 hover:text-sauge";

const BENEFITS = [
  "Estimation de vente",
  "Estimation de location",
  "Taux de rendement",
  "Rapport PDF en moins de 2 min",
  "Gratuit & sans engagement",
];

export default function EstimationPage() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Estimation", path: "/estimation" },
        ])}
      />
      <PageHero
        eyebrow="★ Outil n°1"
        title={
          <>
            Estimez votre bien en moins de{" "}
            <span className="grad-light">2 minutes.</span>
          </>
        }
        lead={
          <>
            Un outil complet, sur-mesure, qui vous envoie un rapport PDF
            détaillé sur votre mail.{" "}
            <b className="text-blanc">Gratuit</b>,{" "}
            <b className="text-blanc">sans engagement</b>, et conçu par notre
            équipe locale.
          </>
        }
        illustration={
          <DrawOnScroll>
            <KeysIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
        actions={
          <Button href="#formulaire" variant="cta">
            Estimer mon bien
            <ArrowRight />
          </Button>
        }
      />

      {/* BÉNÉFICES — bandeau juste sous le hero.
          flex-wrap + whitespace-nowrap sur chaque item : chaque libellé reste
          sur UNE seule ligne ; c'est l'item entier qui passe à la ligne suivante
          si besoin (jamais un libellé coupé en deux). */}
      <section className="bg-anthracite text-blanc pb-[40px] lg:pb-[60px] -mt-2 border-b border-white/[0.06]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 justify-center md:justify-between">
            {BENEFITS.map((b, i) => (
              <li
                key={i}
                className="flex items-center gap-2.5 text-[14px] text-white/90 whitespace-nowrap"
              >
                <span className="w-6 h-6 shrink-0 rounded-full bg-sauge/20 grid place-items-center">
                  <svg
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    fill="none"
                    stroke="var(--color-sauge)"
                    strokeWidth="2.6"
                    aria-hidden="true"
                  >
                    <path d="M5 12l5 5L20 6" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FORMULAIRE / RÉSULTAT */}
      <section
        id="formulaire"
        className="relative bg-anthracite py-[100px] max-md:py-[72px] overflow-hidden"
      >
        <DrawOnScroll className="absolute bottom-[40px] right-[2%] z-0 pointer-events-none opacity-50 max-md:hidden">
          <KeysIllust size={200} className="illust-on-dark" />
        </DrawOnScroll>

        <div className="relative z-[1] max-w-content mx-auto px-8 max-md:px-5">
          <Reveal className="text-center mb-12 text-blanc">
            <Eyebrow className="mb-3">3 étapes simples</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] font-bold tracking-[-0.01em] text-blanc">
              Votre rapport en{" "}
              <span className="grad-light">3 étapes.</span>
            </h2>
            <p className="text-white/65 max-w-[520px] mx-auto mt-3">
              Votre bien · sa localisation · vos coordonnées. C&apos;est tout.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <EstimationForm />
          </Reveal>
        </div>
      </section>

      {/* REPÈRES DE PRIX — contenu statique, SOUS le formulaire.
          Ajouté le 2026-09-15 pour deux raisons :
          1. maillage : /estimation n'émettait AUCUN lien vers les pages
             quartiers, alors que les trois pages quartiers pointent ici. La
             veille du 15/09 désigne les liens internes comme le levier de
             citation le mieux corrélé — ce sens-là manquait.
          2. contenu : la page ne servait qu'un H1, un H2 et un H3, sans une
             seule donnée de marché, sur une requête commerciale majeure.
          ⚠️ NE TOUCHE PAS au bloc résultat de l'outil (consigne client
          « il faut juste rien casser ») : cette section est purement statique
          et vit en dehors de <EstimationForm />. */}
      <section className="bg-blanc py-[100px] max-md:py-[64px]">
        <div className="max-w-[860px] mx-auto px-8 max-md:px-5">
          <Reveal>
            <Eyebrow className="mb-3">Repères de prix</Eyebrow>
            <h2
              className="font-bold tracking-[-0.01em] text-anthracite mb-4 leading-[1.15]"
              style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}
            >
              Sur quoi repose l&apos;estimation ?
            </h2>
            <div className="text-[15.5px] leading-relaxed text-[#3d4347] space-y-3">
              <p>
                Sur les ventes réellement signées autour de votre bien, pas sur
                une moyenne d&apos;annonces. L&apos;outil interroge la base DVF
                publiée par l&apos;État — les prix inscrits aux actes notariés —
                puis pondère les comparables selon leur distance et leur
                ancienneté. À titre de repère, voici les médianes de{" "}
                {DVF_ANNEE} par quartier de Villeurbanne, calculées avec la même
                source et le même filtrage.
              </p>
            </div>
            <QuartierPrixTable />
            <div className="text-[15.5px] leading-relaxed text-[#3d4347] space-y-3">
              <p>
                Un prix au m² de quartier ne remplace pas une estimation :
                l&apos;étage, l&apos;ascenseur, le DPE, l&apos;extérieur et
                l&apos;état déplacent facilement la valeur de 10 à 20 % autour de
                la médiane. C&apos;est précisément ce que le formulaire ci-dessus
                intègre.
              </p>
              <p>
                Nous détaillons le marché secteur par secteur sur nos pages{" "}
                <Link href="/agence-immobiliere-gratte-ciel" className={LNK}>
                  Gratte-Ciel
                </Link>
                ,{" "}
                <Link href="/agence-immobiliere-charpennes" className={LNK}>
                  Charpennes
                </Link>{" "}
                et{" "}
                <Link href="/agence-immobiliere-cusset" className={LNK}>
                  Cusset
                </Link>
                , ainsi que sur la page{" "}
                <Link href="/agence-immobiliere-villeurbanne" className={LNK}>
                  agence immobilière à Villeurbanne
                </Link>
                . La méthode de calcul complète, les prix par typologie et les
                limites assumées de la base DVF sont dans notre analyse des{" "}
                <Link href="/blog/prix-immobilier-villeurbanne-2026" className={LNK}>
                  prix au m² réels par quartier de Villeurbanne
                </Link>
                . Pour un bien à Lyon, voir{" "}
                <Link href="/estimation-immobiliere-lyon" className={LNK}>
                  estimation immobilière à Lyon
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
