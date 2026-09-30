import { Render } from "@puckeditor/core/rsc";
import type { Data } from "@puckeditor/core";
import { serverConfig } from "@/lib/page-builder/config.server";
import { DEFINITIONS } from "@/lib/page-builder/definitions";

/**
 * Rendu PUBLIC d'une page construite dans l'éditeur. 100 % serveur : Google
 * reçoit le HTML complet, et l'éditeur (Puck) n'est jamais envoyé au visiteur.
 */
export function PageRender({ data }: { data: Data }) {
  // Filet de sécurité : une section dont le type n'existe plus est ignorée
  // au lieu de faire planter toute la page.
  const safe = { ...data, content: data.content.filter((c) => c.type in DEFINITIONS) } as Data;
  return <Render config={serverConfig} data={safe} />;
}
