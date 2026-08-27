"use client";

import {
  createContext,
  useCallback,
  useContext,
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
  /** Valeur publiée connue côté client : overlay optimiste puis map serveur. */
  resolvePublished: (section: string, field: string) => string | undefined;
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
  // Overlay des valeurs publiées CETTE session (avant que le prop serveur ne se
  // rafraîchisse). N'écrase jamais rien de façon durable : après router.refresh
  // le prop `publishedFields` porte les mêmes valeurs.
  const [optimistic, setOptimistic] = useState<PublishedFields>({});

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

  const resolvePublished = useCallback(
    (section: string, field: string) => {
      const k = `${section}.${field}`;
      return optimistic[k] ?? publishedFields[k];
    },
    [optimistic, publishedFields],
  );

  const cancel = useCallback(() => setDrafts({}), []);

  const publish = useCallback(async () => {
    const entries = Object.entries(drafts);
    if (entries.length === 0) return;
    setPublishing(true);
    try {
      const rows = entries.map(([k, val]) => {
        const [section_key, field_key] = k.split(".");
        return {
          site_id: SITE_ID,
          section_key,
          field_key,
          content_type: val.type,
          content_value: val.value,
        };
      });
      const { error } = await supabase
        .from("site_content_fields")
        .upsert(rows, { onConflict: "site_id,section_key,field_key" });
      if (error) throw error;

      setOptimistic((prev) => {
        const next = { ...prev };
        for (const [k, val] of entries) next[k] = val.value;
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
      resolvePublished,
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
      resolvePublished,
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
