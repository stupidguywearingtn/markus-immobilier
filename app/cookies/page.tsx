import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { LegalFooterNav, LegalSection } from "@/components/layout/legal-section";

export const metadata: Metadata = {
  title: "Politique de cookies — Markus Immobilier",
  description:
    "Cookies utilisés par markusimmobilier.fr et comment les gérer dans votre navigateur.",
};

export default function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Préférences"
        title={
          <>
            Politique de <span className="grad-light">cookies.</span>
          </>
        }
        lead="Comment notre site utilise les cookies et comment vous pouvez les gérer depuis votre navigateur."
      />

      <section className="bg-blanc py-[100px] max-md:py-[64px]">
        <article className="max-w-[820px] mx-auto px-8 max-md:px-5">
          <p className="inline-block bg-gris border border-[var(--bordure)] rounded-full px-3.5 py-1.5 text-[12px] text-[#5a6166] mb-10">
            Dernière mise à jour :{" "}
            <strong className="text-anthracite font-semibold">
              [À DATER au jour de la mise en ligne]
            </strong>
          </p>

          <div className="legal-prose mb-12">
            <p>
              Cette page explique comment le site de Markus Immobilier utilise
              les cookies et technologies similaires, et comment vous pouvez
              les gérer.
            </p>
          </div>

          <LegalSection
            index={1}
            label="Définition"
            title="Qu'est-ce qu'un cookie ?"
          >
            <p>
              Un cookie est un petit fichier déposé sur votre appareil
              (ordinateur, tablette, smartphone) lors de la visite d&apos;un
              site internet. Il permet notamment d&apos;assurer le bon
              fonctionnement du site et de mémoriser certaines informations
              relatives à votre navigation.
            </p>
          </LegalSection>

          <LegalSection
            index={2}
            label="Inventaire"
            title="Les cookies que nous utilisons"
          >
            <p>
              Notre site n&apos;utilise pas d&apos;outil de mesure
              d&apos;audience ni de cookies publicitaires. Nous ne suivons pas
              votre navigation à des fins commerciales et ne partageons
              aucune donnée de navigation à des fins de ciblage.
            </p>

            <h3>Cookies strictement nécessaires</h3>
            <p>
              Ces cookies sont indispensables au bon fonctionnement du site
              (sécurité, affichage, navigation, accès à l&apos;espace
              client). Ils ne nécessitent pas votre consentement préalable.
              Sans eux, certaines fonctionnalités du site ne pourraient pas
              fonctionner.
            </p>

            <h3>Cookies tiers liés à la carte Google Maps</h3>
            <p>
              Notre page de contact intègre une carte fournie par Google
              Maps. Lors de son affichage, Google est susceptible de déposer
              ses propres cookies sur votre appareil. Ces cookies sont régis
              par la{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                politique de confidentialité de Google
              </a>
              . Si vous ne souhaitez pas qu&apos;ils soient déposés, vous
              pouvez paramétrer votre navigateur en conséquence (voir
              ci-dessous).
            </p>
          </LegalSection>

          <LegalSection
            index={3}
            label="Paramétrage"
            title="Comment gérer les cookies"
          >
            <p>
              Vous pouvez à tout moment accepter, refuser ou supprimer les
              cookies en configurant votre navigateur. Voici les liens
              d&apos;aide des principaux navigateurs :
            </p>
            <ul>
              <li>
                <strong>Google Chrome :</strong>{" "}
                <a
                  href="https://support.google.com/chrome"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  support.google.com/chrome
                </a>
              </li>
              <li>
                <strong>Mozilla Firefox :</strong>{" "}
                <a
                  href="https://support.mozilla.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  support.mozilla.org
                </a>
              </li>
              <li>
                <strong>Safari :</strong>{" "}
                <a
                  href="https://support.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  support.apple.com
                </a>
              </li>
              <li>
                <strong>Microsoft Edge :</strong>{" "}
                <a
                  href="https://support.microsoft.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  support.microsoft.com
                </a>
              </li>
            </ul>
            <p>
              Le refus des cookies strictement nécessaires peut toutefois
              altérer le bon fonctionnement du site.
            </p>
          </LegalSection>

          <LegalSection index={4} label="Évolutions" title="Mise à jour">
            <p>
              Si nous venions à utiliser de nouveaux cookies (par exemple un
              outil de mesure d&apos;audience), cette page serait mise à jour
              et, le cas échéant, un dispositif de recueil de votre
              consentement serait mis en place avant tout dépôt.
            </p>
            <p>
              Pour toute question relative aux cookies ou à vos données
              personnelles, vous pouvez nous écrire à{" "}
              <a href="mailto:villeurbanne@markusimmobilier.fr">
                villeurbanne@markusimmobilier.fr
              </a>
              . Consultez également notre{" "}
              <a href="/confidentialite">Politique de confidentialité</a>.
            </p>
          </LegalSection>

          <LegalFooterNav current="cookies" />
        </article>
      </section>
    </>
  );
}
