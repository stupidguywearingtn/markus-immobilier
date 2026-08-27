"use client";

import { useCallback } from "react";
import { useEditMode } from "@/hooks/useEditMode";

/**
 * Résout la valeur d'un champ éditable :
 *   brouillon en cours  >  valeur publiée (overlay session > map serveur)  >  fallback
 *
 * Utilisable dans n'importe quel composant client sous <EditModeProvider>.
 */
export function useV() {
  const { getDraft, resolvePublished } = useEditMode();
  return useCallback(
    (section: string, field: string, fallback: string) => {
      const draft = getDraft(section, field);
      if (draft !== undefined) return draft;
      const pub = resolvePublished(section, field);
      return pub !== undefined && pub !== "" ? pub : fallback;
    },
    [getDraft, resolvePublished],
  );
}
