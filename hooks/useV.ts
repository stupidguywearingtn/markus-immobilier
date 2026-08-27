"use client";

import { useCallback } from "react";
import { useEditMode } from "@/hooks/useEditMode";

/**
 * Résout la valeur d'un champ éditable :
 *   brouillon en cours  >  valeur publiée (map serveur)  >  fallback codé en dur
 *
 * Utilisable dans n'importe quel composant client sous <EditModeProvider>.
 */
export function useV() {
  const { getDraft, published } = useEditMode();
  return useCallback(
    (section: string, field: string, fallback: string) => {
      const draft = getDraft(section, field);
      if (draft !== undefined) return draft;
      const pub = published[`${section}.${field}`];
      return pub !== undefined && pub !== "" ? pub : fallback;
    },
    [getDraft, published],
  );
}
