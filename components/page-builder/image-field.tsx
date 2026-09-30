"use client";

import { useRef, useState } from "react";
import { ImagePlus, Images, Loader2, Link2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

/**
 * Champ « image » de l'éditeur de pages : importer une photo (réduite
 * automatiquement), la choisir dans la bibliothèque des photos déjà importées,
 * ou coller un lien. La valeur stockée est une simple URL.
 */

const BUCKET = "site-images";
const FOLDER = "pages";

export function ImageField({
  value,
  onChange,
  readOnly,
}: {
  value?: string;
  onChange: (v: string) => void;
  readOnly?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [lib, setLib] = useState<string[] | null>(null);
  const [libOpen, setLibOpen] = useState(false);
  const [urlOpen, setUrlOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Choisissez une image (JPG, PNG, WebP)");
    setUploading(true);
    try {
      const blob = await downscale(file);
      const path = `${FOLDER}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.jpg`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, blob, { cacheControl: "31536000", upsert: false, contentType: "image/jpeg" });
      if (error) throw error;
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
      setLib(null); // la bibliothèque sera rechargée avec la nouvelle photo
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Erreur d'import");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const openLib = async () => {
    setLibOpen((o) => !o);
    if (lib) return;
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list(FOLDER, { limit: 60, sortBy: { column: "created_at", order: "desc" } });
    if (error) {
      toast.error(error.message);
      setLib([]);
      return;
    }
    setLib(
      (data ?? [])
        .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f.name))
        .map((f) => supabase.storage.from(BUCKET).getPublicUrl(`${FOLDER}/${f.name}`).data.publicUrl),
    );
  };

  return (
    <div className="pbf">
      <div className="pbf-preview">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" />
        ) : (
          <ImagePlus size={26} strokeWidth={1.5} />
        )}
        {uploading && (
          <div className="pbf-busy">
            <Loader2 size={22} className="animate-spin" />
          </div>
        )}
        {value && !readOnly && (
          <button type="button" className="pbf-remove" title="Retirer l'image" onClick={() => onChange("")}>
            <X size={14} />
          </button>
        )}
      </div>

      {!readOnly && (
        <div className="pbf-actions">
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
          <button type="button" className="pbf-btn pbf-btn-main" disabled={uploading} onClick={() => inputRef.current?.click()}>
            <ImagePlus size={15} /> {value ? "Changer" : "Importer"}
          </button>
          <button type="button" className="pbf-btn" onClick={openLib}>
            <Images size={15} /> Bibliothèque
          </button>
          <button type="button" className="pbf-btn" onClick={() => setUrlOpen((o) => !o)} title="Coller un lien">
            <Link2 size={15} />
          </button>
        </div>
      )}

      {urlOpen && (
        <input
          className="pbf-url"
          placeholder="https://… ou /photo.jpg"
          defaultValue={value ?? ""}
          onBlur={(e) => onChange(e.currentTarget.value.trim())}
          onKeyDown={(e) => {
            if (e.key === "Enter") onChange(e.currentTarget.value.trim());
          }}
        />
      )}

      {libOpen && (
        <div className="pbf-lib">
          {lib === null && <Loader2 size={18} className="animate-spin" />}
          {lib?.length === 0 && <span className="pbf-hint">Aucune photo importée pour l&apos;instant.</span>}
          {lib?.map((u) => (
            <button
              type="button"
              key={u}
              className={`pbf-thumb ${u === value ? "is-active" : ""}`}
              onClick={() => {
                onChange(u);
                setLibOpen(false);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <span className="pbf-hint">Photo de téléphone acceptée : elle est réduite automatiquement.</span>
    </div>
  );
}

/** Réduit l'image à 2000 px max (côté long), JPEG 85 %. */
async function downscale(file: File, max = 2000): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    bmp.close();
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.85));
    return blob ?? file;
  } catch {
    return file;
  }
}
