import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Pages — Admin",
  robots: { index: false, follow: false },
};

/** Pas d'AdminShell ici : la liste l'ajoute elle-même, l'éditeur est plein écran. */
export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
