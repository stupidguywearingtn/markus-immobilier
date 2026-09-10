import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { LegalFooterNav, LegalSection } from "@/components/layout/legal-section";

export const metadata: Metadata = {
  title: "Mentions légales — Markus Immobilier",
  description:
    "Mentions légales du site markusimmobilier.fr : éditeur, carte professionnelle, garantie financière, assurance RCP, médiation, hébergement.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Informations légales"
        title={
          <>
            Mentions <span className="grad-light">légales.</span>
          </>
        }
        lead="Éditeur, hébergeur, carte professionnelle, garantie financière, assurance — tout ce qui encadre l'activité de Markus Immobilier."
      />

      <section className="bg-blanc py-[100px] max-md:py-[64px]">
        <article className="max-w-[820px] mx-auto px-8 max-md:px-5">
          <LegalSection index={1} label="Éditeur" title="Éditeur du site">
            <p>
              Le présent site (markusimmobilier.fr) est édité par :
            </p>
            <p>
              <strong>Markus Immobilier</strong>
              <br />
              Société à responsabilité limitée (SARL) au capital de 10 000 €
              <br />
              Siège social : 87 rue Édouard Vaillant, 69100 Villeurbanne
              <br />
              RCS Lyon : 103 723 052
              <br />
              SIRET : 103 723 052 00017
              <br />
              N° TVA intracommunautaire : FR 55 103 723 052
              <br />
              Téléphone :{" "}
              <a href="tel:0478371367">04 78 37 13 67</a>
              <br />
              E-mail :{" "}
              <a href="mailto:villeurbanne@markusimmobilier.fr">
                villeurbanne@markusimmobilier.fr
              </a>
              <br />
              Directeur de la publication : Tony PISTILLI, gérant
            </p>
          </LegalSection>

          <LegalSection index={2} label="Activité" title="Activité réglementée">
            <p>
              Markus Immobilier est une agence immobilière exerçant les activités
              de transaction, location et syndic de copropriété.
            </p>
            <p>
              <strong>Carte professionnelle</strong> n° CPI 6901 2026 000 000 044
              <br />
              Mentions : Transaction sur immeubles et fonds de commerce —
              Gestion immobilière — Syndic de copropriété
              <br />
              Délivrée par la CCI Lyon Métropole Saint-Étienne Roanne.
            </p>
          </LegalSection>

          <LegalSection index={3} label="Garantie" title="Garantie financière">
            <p>
              Garantie financière souscrite auprès de :
              <br />
              <strong>GALIAN-SMABTP</strong> — 89 rue La Boétie, 75008 Paris
            </p>
            <ul>
              <li>
                Activité de gestion immobilière : garantie d&apos;un montant de{" "}
                <strong>120 000 €</strong>.
              </li>
              <li>
                Activité de syndic de copropriété : garantie d&apos;un montant de{" "}
                <strong>120 000 €</strong>.
              </li>
              <li>
                Activité de transaction sur immeubles et fonds de commerce :
                absence de maniement de fonds — la société ne perçoit aucun
                fonds, effet ou valeur à l&apos;occasion de son activité de
                transaction (« Non détention de fonds »).
              </li>
            </ul>
          </LegalSection>

          <LegalSection
            index={4}
            label="Assurance"
            title="Responsabilité civile professionnelle"
          >
            <p>
              Markus Immobilier est titulaire d&apos;une assurance
              responsabilité civile professionnelle souscrite auprès de :
            </p>
            <p>
              <strong>GALIAN-SMABTP</strong> — 89 rue La Boétie, 75008 Paris
              <br />
              Contrat n° RCP_01_175646U
              <br />
              Couverture géographique : France
            </p>
          </LegalSection>

          <LegalSection
            index={5}
            label="Médiation"
            title="Médiation de la consommation"
          >
            <p>
              Conformément aux articles L.611-1 et suivants et R.612-1 et
              suivants du Code de la consommation, le client consommateur a le
              droit de recourir gratuitement à un médiateur de la consommation
              en vue de la résolution amiable d&apos;un litige qui
              l&apos;opposerait à l&apos;agence, après avoir adressé une
              réclamation écrite préalable à Markus Immobilier.
            </p>
            <p>
              Markus Immobilier relève du médiateur suivant :
              <br />
              <strong>GIE MEDIMMOCONSO</strong>
              <br />1 Allée du Parc de Mesemena – Bât A – CS 25222, 44505 La
              Baule Cedex
              <br />
              Site internet :{" "}
              <a
                href="https://www.medimmoconso.fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.medimmoconso.fr
              </a>
            </p>
            <p>
              Le consommateur peut saisir directement le médiateur via son site
              internet.
            </p>
          </LegalSection>

          <LegalSection index={6} label="Hébergement" title="Hébergeur du site">
            <p>
              Le site est hébergé par :
              <br />
              <strong>OVH SAS</strong>
              <br />2 rue Kellermann, 59100 Roubaix, France
              <br />
              Téléphone : 1007 (depuis la France)
              <br />
              <a
                href="https://www.ovhcloud.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.ovhcloud.com
              </a>
            </p>
          </LegalSection>

          <LegalSection
            index={7}
            label="Propriété"
            title="Propriété intellectuelle"
          >
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images,
              logos, charte graphique, structure) est la propriété exclusive de
              Markus Immobilier ou de ses partenaires, et est protégé par les
              lois relatives à la propriété intellectuelle. Toute reproduction,
              représentation, modification ou exploitation, totale ou partielle,
              sans autorisation écrite préalable est interdite et constituerait
              une contrefaçon sanctionnée par le Code de la propriété
              intellectuelle.
            </p>
          </LegalSection>

          <LegalSection
            index={8}
            label="Données"
            title="Données personnelles"
          >
            <p>
              Le traitement de vos données personnelles est décrit en détail
              dans notre{" "}
              <a href="/confidentialite">Politique de confidentialité</a>.
            </p>
            <p>
              Conformément au Règlement général sur la protection des données
              (RGPD) et à la loi « Informatique et Libertés », vous disposez
              d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
              de limitation et d&apos;opposition sur vos données. Vous pouvez
              exercer ces droits en écrivant à{" "}
              <a href="mailto:villeurbanne@markusimmobilier.fr">
                villeurbanne@markusimmobilier.fr
              </a>
              .
            </p>
            <p>
              Vous pouvez également introduire une réclamation auprès de la
              CNIL (
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.cnil.fr
              </a>
              ).
            </p>
          </LegalSection>

          <LegalSection index={9} label="Cookies" title="Gestion des cookies">
            <p>
              L&apos;utilisation des cookies sur ce site et leur paramétrage
              sont détaillés dans notre{" "}
              <a href="/cookies">Politique de cookies</a>.
            </p>
          </LegalSection>

          <LegalSection
            index={10}
            label="Liens"
            title="Liens et réseaux sociaux"
          >
            <p>
              Markus Immobilier est présente sur Instagram, TikTok, LinkedIn et
              Discord. Le site peut contenir des liens vers ces plateformes ou
              d&apos;autres sites tiers, dont Markus Immobilier ne saurait être
              tenue responsable du contenu ni des pratiques en matière de
              données personnelles.
            </p>
          </LegalSection>

          <LegalFooterNav current="mentions" />
        </article>
      </section>
    </>
  );
}
