import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Gestion des cookies — Markus Immobilier",
};

export default function CookiesPage() {
  return (
    <ComingSoonPage
      eyebrow="Préférences"
      title="Gestion des"
      highlight="cookies."
      lead="Paramétrage et explications sur les cookies utilisés par le site. Page en cours de finalisation."
    />
  );
}
