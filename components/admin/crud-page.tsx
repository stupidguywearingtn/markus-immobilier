"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Field, Textarea, TextInput } from "@/components/forms/primitives";

/**
 * Page d'administration « liste » générique — même logique que les annonces :
 * ajouter, modifier, supprimer, masquer, réordonner. Utilisée par
 * /admin/equipe, /admin/avis et /admin/vendus.
 *
 * Chaque table a les colonnes communes `id`, `position`, `visible`,
 * `created_at` (voir supabase/migrations/0003_equipe_avis_vendus.sql).
 * Les modifications sont visibles sur le site public sous ~10 s (ISR).
 */

export type Row = {
  id: string;
  position: number;
  visible: boolean;
  [key: string]: unknown;
};

export type FieldDef = {
  key: string;
  label: string;
  type: "text" | "textarea" | "date" | "stars" | "photo" | "email" | "tel" | "toggle";
  required?: boolean;
  placeholder?: string;
  hint?: string;
  /** Occupe toute la largeur du formulaire (sinon une demi-colonne en desktop). */
  full?: boolean;
  /** Dossier dans le bucket `site-images` (type photo). */
  folder?: string;
  /** Ratio de l'aperçu photo, ex. "4/5" ou "3/2". */
  ratio?: string;
};

type Values = Record<string, string | number | boolean | null>;

const BUCKET = "site-images";

export function CrudPage({
  table,
  title,
  subtitle,
  addLabel,
  emptyLabel,
  itemLabel,
  fields,
  defaults,
  renderRow,
}: {
  table: string;
  title: string;
  subtitle: string;
  addLabel: string;
  emptyLabel: string;
  /** Nom singulier utilisé dans les confirmations, ex. « ce collaborateur ». */
  itemLabel: (r: Row) => string;
  fields: FieldDef[];
  defaults: Values;
  renderRow: (r: Row) => { thumb?: ReactNode; title: string; meta?: string };
}) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  // null = pas d'éditeur ouvert · "new" = ajout · id = modification
  const [editing, setEditing] = useState<string | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("position", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) {
      toast.error(
        error.message.includes("does not exist") || error.code === "42P01"
          ? "La table n'existe pas encore : exécutez la migration 0003 dans Supabase."
          : error.message,
      );
      setRows([]);
      return;
    }
    setRows((data as Row[]) ?? []);
  }, [table]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  useEffect(() => {
    if (editing) editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [editing]);

  const current = editing && editing !== "new" ? rows?.find((r) => r.id === editing) : undefined;

  const save = async (values: Values) => {
    setBusy("editor");
    const payload = { ...values };
    const { error } =
      editing === "new"
        ? await supabase.from(table).insert({
            ...payload,
            position: (rows ?? []).reduce((m, r) => Math.max(m, r.position), -1) + 1,
          })
        : await supabase.from(table).update(payload).eq("id", editing);
    setBusy(null);
    if (error) return toast.error(error.message);
    toast.success(
      editing === "new" ? "Ajouté ✓ — en ligne d'ici quelques secondes" : "Enregistré ✓",
    );
    setEditing(null);
    load();
  };

  const remove = async (r: Row) => {
    if (!confirm(`Supprimer définitivement ${itemLabel(r)} ?`)) return;
    setBusy(r.id);
    const { error } = await supabase.from(table).delete().eq("id", r.id);
    setBusy(null);
    if (error) return toast.error(error.message);
    // Photo uploadée : suppression best-effort dans le bucket.
    for (const f of fields.filter((f) => f.type === "photo")) {
      const url = r[f.key];
      if (typeof url === "string") removeUploaded(url);
    }
    if (editing === r.id) setEditing(null);
    toast.success("Supprimé");
    load();
  };

  const toggleVisible = async (r: Row) => {
    setBusy(r.id);
    const { error } = await supabase.from(table).update({ visible: !r.visible }).eq("id", r.id);
    setBusy(null);
    if (error) return toast.error(error.message);
    toast.success(r.visible ? "Masqué sur le site" : "Affiché sur le site");
    load();
  };

  const move = async (index: number, dir: -1 | 1) => {
    if (!rows) return;
    const target = index + dir;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    setRows(next); // retour visuel immédiat
    setBusy(rows[index].id);
    // Positions renumérotées 0..n : corrige au passage d'éventuels doublons.
    const updates = next
      .map((r, i) => ({ r, i }))
      .filter(({ r, i }) => r.position !== i)
      .map(({ r, i }) => supabase.from(table).update({ position: i }).eq("id", r.id));
    const results = await Promise.all(updates);
    setBusy(null);
    const failed = results.find((x) => x.error);
    if (failed?.error) toast.error(failed.error.message);
    load();
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.01em]">{title}</h1>
          <p className="text-sm text-[#7a817f] mt-1">{subtitle}</p>
        </div>
        {editing !== "new" && (
          <button
            type="button"
            onClick={() => setEditing("new")}
            className="inline-flex items-center gap-2 bg-anthracite text-white rounded-[8px] px-5 py-3 text-sm font-semibold uppercase tracking-[0.06em]"
          >
            <Plus className="w-4 h-4" /> {addLabel}
          </button>
        )}
      </div>

      {editing && (
        <div ref={editorRef} className="scroll-mt-[140px] mb-10">
          <Editor
            key={editing}
            title={editing === "new" ? addLabel : "Modifier"}
            fields={fields}
            initial={current ? pick(current, fields) : defaults}
            saving={busy === "editor"}
            onCancel={() => setEditing(null)}
            onSave={save}
          />
        </div>
      )}

      {rows === null ? (
        <div className="grid place-items-center py-20 text-[#7a817f]">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : rows.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center text-[#7a817f]">{emptyLabel}</div>
      ) : (
        <div className="bg-white rounded-2xl divide-y divide-[var(--bordure)] overflow-hidden">
          {rows.map((r, i) => {
            const view = renderRow(r);
            const disabled = busy === r.id;
            return (
              <div
                key={r.id}
                className={`flex items-center gap-4 p-4 max-md:flex-wrap ${
                  editing === r.id ? "bg-gris" : ""
                }`}
              >
                <div className="flex flex-col shrink-0">
                  <IconBtn label="Monter" disabled={disabled || i === 0} onClick={() => move(i, -1)}>
                    <ArrowUp className="w-3.5 h-3.5" />
                  </IconBtn>
                  <IconBtn
                    label="Descendre"
                    disabled={disabled || i === rows.length - 1}
                    onClick={() => move(i, 1)}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </IconBtn>
                </div>
                {view.thumb}
                <div className={`flex-1 min-w-0 ${r.visible ? "" : "opacity-50"}`}>
                  <div className="font-semibold text-anthracite truncate">
                    {view.title}
                    {!r.visible && (
                      <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-[0.1em] bg-gris text-[#7a817f] px-2 py-0.5 rounded-full">
                        Masqué
                      </span>
                    )}
                  </div>
                  {view.meta && (
                    <div className="text-xs text-[#7a817f] mt-0.5 line-clamp-1">{view.meta}</div>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditing(r.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gris text-sm hover:bg-[#e9ebe6]"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Modifier
                  </button>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => toggleVisible(r)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gris text-sm hover:bg-[#e9ebe6] disabled:opacity-40"
                  >
                    {r.visible ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" /> Masquer
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" /> Afficher
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => remove(r)}
                    className="inline-flex items-center px-2 py-1.5 rounded-lg text-[#7a817f] hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function IconBtn({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="p-1 rounded text-[#7a817f] hover:bg-gris hover:text-anthracite disabled:opacity-25 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

function pick(r: Row, fields: FieldDef[]): Values {
  const out: Values = {};
  for (const f of fields) {
    const v = r[f.key];
    out[f.key] =
      typeof v === "string" || typeof v === "number" || typeof v === "boolean" ? v : null;
  }
  return out;
}

/* ───────────────────────── Formulaire ───────────────────────── */

function Editor({
  title,
  fields,
  initial,
  saving,
  onCancel,
  onSave,
}: {
  title: string;
  fields: FieldDef[];
  initial: Values;
  saving: boolean;
  onCancel: () => void;
  onSave: (v: Values) => void;
}) {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: string, v: Values[string]) => setValues((s) => ({ ...s, [k]: v }));

  const submit = () => {
    const errs: Record<string, string> = {};
    for (const f of fields) {
      const v = values[f.key];
      if (f.required && (v === null || v === undefined || String(v).trim() === "")) {
        errs[f.key] = "Champ obligatoire";
      }
      if (f.type === "email" && typeof v === "string" && v.trim() && !/^\S+@\S+\.\S+$/.test(v.trim())) {
        errs[f.key] = "Adresse e-mail invalide";
      }
    }
    setErrors(errs);
    if (Object.keys(errs).length) return toast.error("Complétez les champs en rouge");
    const clean: Values = {};
    for (const f of fields) {
      const v = values[f.key];
      clean[f.key] = typeof v === "string" ? (v.trim() === "" ? null : v.trim()) : v;
    }
    onSave(clean);
  };

  return (
    <div className="bg-white rounded-2xl p-6 max-md:p-5 border-2 border-sauge/60 shadow-[0_22px_50px_-22px_rgba(56,62,66,0.22)]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-lg text-[#7a817f] hover:bg-gris"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((f) => (
          <Field
            key={f.key}
            label={f.type === "toggle" ? undefined : f.label}
            required={f.required}
            hint={f.hint}
            error={errors[f.key]}
            htmlFor={`f-${f.key}`}
            className={f.full || f.type === "textarea" || f.type === "photo" ? "md:col-span-2" : ""}
          >
            <Input f={f} value={values[f.key]} onChange={(v) => set(f.key, v)} error={!!errors[f.key]} />
          </Field>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 mt-7">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-5 py-3 rounded-[8px] text-sm font-semibold text-[#5a6166] hover:bg-gris"
        >
          Annuler
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-sauge hover:bg-sauge-hover text-white rounded-[8px] px-6 py-3 text-sm font-semibold uppercase tracking-[0.06em] disabled:opacity-50"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Enregistrer
        </button>
      </div>
    </div>
  );
}

function Input({
  f,
  value,
  onChange,
  error,
}: {
  f: FieldDef;
  value: Values[string];
  onChange: (v: Values[string]) => void;
  error: boolean;
}) {
  const str = value === null || value === undefined ? "" : String(value);
  switch (f.type) {
    case "textarea":
      return (
        <Textarea
          id={`f-${f.key}`}
          value={str}
          placeholder={f.placeholder}
          error={error}
          rows={5}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "stars":
      return <StarsInput value={Number(value) || 5} onChange={onChange} />;
    case "toggle":
      return (
        <label className="inline-flex items-center gap-3 cursor-pointer select-none h-11">
          <input
            id={`f-${f.key}`}
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="w-5 h-5 accent-[var(--color-sauge)]"
          />
          <span className="text-[14px] text-anthracite">{f.label}</span>
        </label>
      );
    case "photo":
      return <PhotoInput f={f} value={str} onChange={onChange} />;
    default:
      return (
        <TextInput
          id={`f-${f.key}`}
          type={f.type === "date" ? "date" : f.type === "email" ? "email" : f.type === "tel" ? "tel" : "text"}
          value={str}
          placeholder={f.placeholder}
          error={error}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

function StarsInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1 h-11" role="radiogroup" aria-label="Note">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
          onClick={() => onChange(n)}
          className="p-1"
        >
          <Star
            className="w-6 h-6"
            stroke="var(--color-sauge)"
            fill={n <= value ? "var(--color-sauge)" : "transparent"}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-[#7a817f]">{value}/5</span>
    </div>
  );
}

function PhotoInput({
  f,
  value,
  onChange,
}: {
  f: FieldDef;
  value: string;
  onChange: (v: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Choisissez une image (JPG, PNG, WebP)");
    setUploading(true);
    try {
      const blob = await downscale(file);
      const path = `${f.folder ?? "divers"}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.jpg`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, blob, { cacheControl: "31536000", upsert: false, contentType: "image/jpeg" });
      if (error) throw error;
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Photo chargée — pensez à enregistrer");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Erreur d'upload");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-5 max-sm:flex-col max-sm:items-start">
      <div
        className="relative w-[160px] shrink-0 rounded-xl overflow-hidden bg-gris border border-[var(--bordure)] grid place-items-center"
        style={{ aspectRatio: f.ratio ?? "4/5" }}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <ImagePlus className="w-7 h-7 text-[#9aa09d]" />
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/70 grid place-items-center">
            <Loader2 className="w-6 h-6 animate-spin text-anthracite" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-anthracite text-white text-sm font-semibold disabled:opacity-50"
        >
          <ImagePlus className="w-4 h-4" /> {value ? "Changer la photo" : "Choisir une photo"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-left text-sm text-[#7a817f] hover:text-red-600"
          >
            Retirer la photo
          </button>
        )}
        <span className="text-[12px] text-[#7a817f] italic">
          Photo de téléphone acceptée : elle est réduite automatiquement.
        </span>
      </div>
    </div>
  );
}

/** Réduit l'image à 1800 px max (côté long), JPEG 85 % — une photo de téléphone
 *  de 5 Mo tombe sous ~400 Ko, sans perte visible sur le site. */
async function downscale(file: File, max = 1800): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * scale);
    const h = Math.round(bmp.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bmp, 0, 0, w, h);
    bmp.close();
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.85));
    return blob ?? file;
  } catch {
    return file; // format non décodable par le navigateur : on envoie l'original
  }
}

/** Supprime du bucket une photo uploadée depuis le back-office (jamais les /public). */
function removeUploaded(url: string) {
  const marker = `/${BUCKET}/`;
  const i = url.indexOf(marker);
  if (i === -1) return;
  const path = decodeURIComponent(url.slice(i + marker.length).split("?")[0]);
  void supabase.storage.from(BUCKET).remove([path]);
}
