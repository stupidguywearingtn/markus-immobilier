import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales — Markus Immobilier",
};

export default function MentionsLegalesPage() {
  return (
    <ComingSoonPage
      eyebrow="Informations légales"
      title="Mentions"
      highlight="légales."
      lead="MARKUS IMMOBILIER — 87 rue Édouard Vaillant, 69100 Villeurbanne. Page complète en cours de finalisation."
    />
  );
}
