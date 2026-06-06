import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { LegalFooterNav, LegalSection } from "@/components/layout/legal-section";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Markus Immobilier",
  description:
    "Comment Markus Immobilier collecte, traite et protège vos données personnelles, conformément au RGPD.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        eyebrow="RGPD"
        title={
          <>
            Politique de{" "}
            <span className="grad-light">confidentialité.</span>
          </>
        }
        lead="Quelles données nous collectons, pourquoi, combien de temps nous les conservons et quels sont vos droits."
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
              Markus Immobilier attache une grande importance à la protection
              de vos données personnelles. La présente politique explique
              quelles données nous collectons, pourquoi, combien de temps nous
              les conservons et quels sont vos droits, conformément au
              Règlement général sur la protection des données (RGPD) et à la
              loi « Informatique et Libertés ».
            </p>
          </div>

          <LegalSection
            index={1}
            label="Responsable"
            title="Responsable de traitement"
          >
            <p>Le responsable du traitement de vos données est :</p>
            <p>
              <strong>Markus Immobilier</strong> — SARL au capital de 10 000 €
              <br />
              87 rue Édouard Vaillant, 69100 Villeurbanne
              <br />
              RCS Lyon 103 723 052
              <br />
              E-mail :{" "}
              <a href="mailto:villeurbanne@markusimmobilier.fr">
                villeurbanne@markusimmobilier.fr
              </a>
              <br />
              Téléphone : <a href="tel:0478371367">04 78 37 13 67</a>
            </p>
          </LegalSection>

          <LegalSection
            index={2}
            label="Collecte"
            title="Données collectées et finalités"
          >
            <p>
              Nous ne collectons que les données nécessaires à chaque
              démarche. Selon votre situation, nous pouvons traiter :
            </p>

            <h3>Demande de contact (formulaire ou e-mail)</h3>
            <ul>
              <li>
                <strong>Données :</strong> nom, prénom, e-mail, téléphone,
                contenu de votre message.
              </li>
              <li>
                <strong>Finalité :</strong> répondre à votre demande et
                assurer le suivi de notre échange.
              </li>
              <li>
                <strong>Base légale :</strong> votre consentement et/ou les
                mesures précontractuelles prises à votre demande.
              </li>
            </ul>

            <h3>Estimation d&apos;un bien (outil d&apos;estimation en ligne)</h3>
            <ul>
              <li>
                <strong>Données :</strong> e-mail, caractéristiques du bien
                (type, surface, localisation, etc.).
              </li>
              <li>
                <strong>Finalité :</strong> calculer une estimation et vous
                envoyer le rapport correspondant.
              </li>
              <li>
                <strong>Base légale :</strong> votre consentement et les
                mesures précontractuelles prises à votre demande.
              </li>
            </ul>

            <h3>Espace client</h3>
            <ul>
              <li>
                <strong>Données :</strong> identifiants de connexion et
                données liées à votre dossier (vente, location ou gestion).
              </li>
              <li>
                <strong>Finalité :</strong> vous donner accès au suivi de
                votre dossier.
              </li>
              <li>
                <strong>Base légale :</strong> l&apos;exécution du contrat qui
                nous lie.
              </li>
            </ul>

            <h3>
              Relation contractuelle (vente, location, gestion locative,
              syndic)
            </h3>
            <ul>
              <li>
                <strong>Données :</strong> identité, coordonnées, données
                relatives au bien, justificatifs requis par la réglementation
                (revenus, pièces d&apos;identité, etc.), données bancaires le
                cas échéant.
              </li>
              <li>
                <strong>Finalité :</strong> exécuter nos missions et
                respecter nos obligations légales (loi Hoguet, lutte contre
                le blanchiment, obligations comptables et fiscales).
              </li>
              <li>
                <strong>Base légale :</strong> l&apos;exécution du contrat et
                le respect de nos obligations légales.
              </li>
            </ul>

            <h3>Recrutement (page « On recrute »)</h3>
            <ul>
              <li>
                <strong>Données :</strong> identité, coordonnées, CV, lettre
                de motivation et parcours professionnel.
              </li>
              <li>
                <strong>Finalité :</strong> étudier votre candidature.
              </li>
              <li>
                <strong>Base légale :</strong> votre consentement et les
                mesures prises avant une éventuelle embauche.
              </li>
            </ul>

            <p>
              Nous ne collectons aucune donnée à votre insu et ne pratiquons
              pas de décision entièrement automatisée produisant des effets
              juridiques à votre égard.
            </p>
          </LegalSection>

          <LegalSection
            index={3}
            label="Destinataires"
            title="Qui reçoit vos données"
          >
            <p>
              Vos données sont traitées par le personnel habilité de Markus
              Immobilier. Elles peuvent être transmises, uniquement lorsque
              c&apos;est nécessaire, à :
            </p>
            <ul>
              <li>
                nos outils et prestataires techniques, notamment notre
                messagerie professionnelle (Microsoft Outlook / Microsoft
                365) et notre logiciel immobilier Orisha Real Estate (AC3),
                qui agissent en qualité de sous-traitants ;
              </li>
              <li>
                les partenaires indispensables à la réalisation de votre
                projet : notaires, diagnostiqueurs, organismes de garantie
                financière et d&apos;assurance, établissements bancaires, le
                cas échéant ;
              </li>
              <li>
                les autorités administratives ou judiciaires lorsque la loi
                l&apos;exige.
              </li>
            </ul>
            <p>
              <strong>
                Nous ne vendons ni ne louons vos données personnelles à des
                tiers.
              </strong>
            </p>
          </LegalSection>

          <LegalSection
            index={4}
            label="Transferts"
            title="Transfert hors Union européenne"
          >
            <p>
              Certains de nos prestataires (par exemple Microsoft) peuvent
              être amenés à traiter des données en dehors de l&apos;Union
              européenne. Dans ce cas, ces transferts sont encadrés par des
              garanties appropriées conformes au RGPD (clauses
              contractuelles types de la Commission européenne ou mécanisme
              équivalent).
            </p>
          </LegalSection>

          <LegalSection
            index={5}
            label="Conservation"
            title="Durées de conservation"
          >
            <p>
              Conformément aux recommandations de la CNIL, vos données sont
              conservées pour les durées suivantes :
            </p>
            <ul>
              <li>
                <strong>Prospect</strong> / demande de contact ou
                d&apos;estimation sans suite : 3 ans à compter du dernier
                contact de votre part.
              </li>
              <li>
                <strong>Client</strong> (relation contractuelle) : pendant
                toute la durée de la relation, puis archivage selon les
                délais légaux applicables (notamment les obligations
                comptables et celles issues de la lutte contre le
                blanchiment).
              </li>
              <li>
                <strong>Candidature</strong> non retenue : 2 ans maximum
                après le dernier contact, sauf opposition de votre part.
              </li>
            </ul>
            <p>
              Au terme de ces durées, vos données sont supprimées ou
              anonymisées.
            </p>
          </LegalSection>

          <LegalSection index={6} label="Sécurité" title="Sécurité des données">
            <p>
              Nous mettons en œuvre des mesures techniques et
              organisationnelles appropriées pour protéger vos données contre
              toute perte, accès non autorisé ou divulgation : accès
              restreint au personnel habilité, comptes protégés par mot de
              passe et recours à des prestataires offrant des garanties de
              sécurité reconnues.
            </p>
          </LegalSection>

          <LegalSection index={7} label="Droits" title="Vos droits">
            <p>
              Conformément au RGPD, vous disposez des droits suivants sur vos
              données :
            </p>
            <ul>
              <li>droit d&apos;accès ;</li>
              <li>droit de rectification ;</li>
              <li>droit à l&apos;effacement ;</li>
              <li>droit à la limitation du traitement ;</li>
              <li>droit d&apos;opposition ;</li>
              <li>droit à la portabilité ;</li>
              <li>
                droit de définir des directives relatives au sort de vos
                données après votre décès.
              </li>
            </ul>
            <p>
              Vous pouvez exercer ces droits en nous écrivant à{" "}
              <a href="mailto:villeurbanne@markusimmobilier.fr">
                villeurbanne@markusimmobilier.fr
              </a>{" "}
              ou par courrier à l&apos;adresse de l&apos;agence, en
              justifiant de votre identité.
            </p>
            <p>
              Nous nous engageons à vous répondre dans un délai d&apos;un
              mois. Si vous estimez, après nous avoir contactés, que vos
              droits ne sont pas respectés, vous pouvez introduire une
              réclamation auprès de la CNIL : 3 place de Fontenoy – TSA
              80715 – 75334 Paris Cedex 07,{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.cnil.fr
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection index={8} label="Cookies" title="Cookies et traceurs">
            <p>
              Le site dépose uniquement les cookies strictement nécessaires à
              son fonctionnement. Il intègre par ailleurs une carte Google
              Maps, susceptible de déposer des cookies tiers lors de son
              affichage. Vous pouvez à tout moment configurer votre
              navigateur pour accepter ou refuser les cookies. Pour plus de
              détails, consultez notre{" "}
              <a href="/cookies">Politique de cookies</a>.
            </p>
          </LegalSection>

          <LegalSection
            index={9}
            label="Évolutions"
            title="Modification de la présente politique"
          >
            <p>
              Nous pouvons être amenés à modifier la présente politique de
              confidentialité afin de l&apos;adapter aux évolutions légales
              ou à nos pratiques. La version applicable est celle publiée sur
              le site à la date de votre consultation.
            </p>
          </LegalSection>

          <LegalFooterNav current="confidentialite" />
        </article>
      </section>
    </>
  );
}
