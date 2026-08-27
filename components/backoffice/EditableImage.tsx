"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Pencil, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { useEditMode } from "@/hooks/useEditMode";

type Props = {
  section: string;
  field: string;
  /** URL courante déjà résolue (brouillon > publié > fallback) via useV(). */
  value: string;
  /** Rendu réel de l'image, avec l'URL à utiliser. */
  children: (url: string) => ReactNode;
  /** Optionnel : transformation d'URL (CDN resize, etc.). */
  transform?: (url: string) => string;
};

const BUCKET = "site-images";

export function EditableImage({
  section,
  field,
  value,
  children,
  transform,
}: Props) {
  const { enabled, setDraft, siteId } = useEditMode();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

  const displayUrl = transform ? transform(value) : value;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${siteId}/${section}-${field}-${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      setDraft(section, field, "image", data.publicUrl);
      toast.success("Image mise à jour (brouillon)");
      setOpen(false);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Erreur d'upload");
    } finally {
      setUploading(false);
    }
  };

  if (!enabled) return <>{children(displayUrl)}</>;

  return (
    <>
      <div className="relative group/editable w-full h-full">
        <div
          className="w-full h-full rounded-sm cursor-pointer"
          style={{
            outline: "0 solid transparent",
            transition: "outline 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.outline = "2px solid var(--bo-outline)";
            e.currentTarget.style.outlineOffset = "-2px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.outline = "0 solid transparent";
          }}
        >
          {children(displayUrl)}
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold text-sm shadow-lg pointer-events-auto"
            style={{
              background: "var(--bo-accent)",
              color: "var(--bo-accent-contrast)",
            }}
          >
            <Pencil className="w-4 h-4" /> Remplacer
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Changer l'image"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white text-anthracite p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="font-bold text-lg">Changer l&apos;image</h2>
                <p className="text-sm text-[#7a817f]">
                  Téléversez un fichier ou collez une URL.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="text-[#7a817f] hover:text-anthracite"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) upload(f);
                }}
                className="block w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-anthracite file:text-white file:px-3 file:py-1.5 file:text-xs file:font-semibold"
              />

              <div className="space-y-2">
                <input
                  type="url"
                  placeholder="https://..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full h-10 px-3 rounded-[10px] border border-[var(--bordure)] text-sm focus:outline-none focus:border-sauge"
                />
                <button
                  type="button"
                  disabled={!url || uploading}
                  onClick={() => {
                    setDraft(section, field, "image", url);
                    toast.success("Image mise à jour (brouillon)");
                    setOpen(false);
                    setUrl("");
                  }}
                  className="w-full h-10 rounded-[10px] bg-sauge text-white font-semibold text-sm disabled:opacity-40"
                >
                  Utiliser cette URL
                </button>
              </div>

              {uploading && (
                <div className="flex items-center gap-2 text-sm text-[#7a817f]">
                  <Loader2 className="w-4 h-4 animate-spin" /> Téléversement…
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
