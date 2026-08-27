"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SITE_ID } from "@/lib/backoffice/config";
import type { PublishedFields } from "@/lib/supabase/content";

export type DraftType = "text" | "image";
type Draft = { value: string; type: DraftType };
type Drafts = Record<string, Draft>; // clé : `${section}.${field}`

type Ctx = {
  isAdmin: boolean;
  enabled: boolean;
  toggle: () => void;
  drafts: Drafts;
  getDraft: (section: string, field: string) => string | undefined;
  setDraft: (
    section: string,
    field: string,
    type: DraftType,
    value: string,
  ) => void;
  hasDrafts: boolean;
  publish: () => Promise<void>;
  cancel: () => void;
  siteId: string;
  publishing: boolean;
  /** Valeurs publiées connues côté client (map injectée par le serveur). */
  published: PublishedFields;
};

const EditModeCtx = createContext<Ctx | null>(null);

export function EditModeProvider({
  publishedFields,
  children,
}: {
  publishedFields: PublishedFields;
  children: ReactNode;
}) {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [drafts, setDrafts] = useState<Drafts>({});
  const [publishing, setPublishing] = useState(false);
  // Copie locale re-synchronisée quand le layout serveur re-rend (router.refresh).
  const [published, setPublished] = useState<PublishedFields>(publishedFields);
  useEffect(() => setPublished(publishedFields), [publishedFields]);

  const setDraft = useCallback(
    (section: string, field: string, type: DraftType, value: string) => {
      setDrafts((d) => ({ ...d, [`${section}.${field}`]: { value, type } }));
    },
    [],
  );

  const getDraft = useCallback(
    (section: string, field: string) => drafts[`${section}.${field}`]?.value,
    [drafts],
  );

  const cancel = useCallback(() => setDrafts({}), []);

  const publish = useCallback(async () => {
    const entries = Object.entries(drafts);
    if (entries.length === 0) return;
    setPublishing(true);
    try {
      const rows = entries.map(([k, v]) => {
        const [section_key, field_key] = k.split(".");
        return {
          site_id: SITE_ID,
          section_key,
          field_key,
          content_type: v.type,
          content_value: v.value,
        };
      });
      const { error } = await supabase
        .from("site_content_fields")
        .upsert(rows, { onConflict: "site_id,section_key,field_key" });
      if (error) throw error;

      // Fusion optimiste dans la map locale, puis on jette les brouillons.
      setPublished((prev) => {
        const next = { ...prev };
        for (const [k, v] of entries) next[k] = v.value;
        return next;
      });
      setDrafts({});
      toast.success("Modifications publiées");
      router.refresh();
    } catch (e: unknown) {
      toast.error(
        e instanceof Error ? e.message : "Erreur lors de la publication",
      );
    } finally {
      setPublishing(false);
    }
  }, [drafts, router]);

  const value = useMemo<Ctx>(
    () => ({
      isAdmin,
      enabled: enabled && isAdmin,
      toggle: () => setEnabled((e) => !e),
      drafts,
      getDraft,
      setDraft,
      hasDrafts: Object.keys(drafts).length > 0,
      publish,
      cancel,
      siteId: SITE_ID,
      publishing,
      published,
    }),
    [
      isAdmin,
      enabled,
      drafts,
      getDraft,
      setDraft,
      publish,
      cancel,
      publishing,
      published,
    ],
  );

  return (
    <EditModeCtx.Provider value={value}>{children}</EditModeCtx.Provider>
  );
}

export function useEditMode() {
  const ctx = useContext(EditModeCtx);
  if (!ctx)
    throw new Error("useEditMode doit être utilisé dans <EditModeProvider>");
  return ctx;
}
