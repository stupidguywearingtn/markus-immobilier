import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/coming-soon";
import { KeysIllust } from "@/components/illustrations/keys";

export const metadata: Metadata = {
  title: "Espace client",
  description:
    "Votre espace personnel Markus Immobilier — dossiers, documents, suivi de transaction.",
};

export default function EspaceClientPage() {
  return (
    <ComingSoonPage
      eyebrow="Phase 2"
      title="Votre espace,"
      highlight="bientôt."
      lead="Suivi de vos dossiers, documents partagés, échanges avec votre conseiller. Espace client en développement."
      illustration={<KeysIllust size={300} />}
    />
  );
}
