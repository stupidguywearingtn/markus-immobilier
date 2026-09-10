import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * /signin est la connexion à l'espace pro : elle n'a rien à faire dans l'index.
 * Le `noindex` est posé ici (et pas dans page.tsx) parce que la page est un
 * composant client, qui ne peut pas exporter de `metadata`.
 *
 * Volontairement PAS ajoutée au `disallow` de robots.txt : une URL bloquée au
 * crawl ne peut pas être lue, donc son `noindex` n'est jamais vu. Pour sortir
 * une page de l'index, il faut au contraire laisser Google la crawler.
 */
export const metadata: Metadata = {
  title: "Connexion",
  robots: { index: false, follow: false },
};

export default function SigninLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
