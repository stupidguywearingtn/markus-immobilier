import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Markus Immobilier collecte, traite et protège vos données personnelles.",
};

export default function ConfidentialitePage() {
  return (
    <ComingSoonPage
      eyebrow="RGPD"
      title="Politique de"
      highlight="confidentialité."
      lead="Vos données sont traitées dans le strict respect du RGPD. Politique détaillée en cours de finalisation."
    />
  );
}
