"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, ArrowRight } from "@/components/ui/button";
import {
  Field,
  TextInput,
  Textarea,
  NativeSelect,
} from "@/components/forms/primitives";
import { StepIndicator, StepPanel } from "@/components/forms/multi-step";
import { AnimatePresence } from "framer-motion";
import { Loader2, Trash2, ArrowUp, ArrowDown, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { LISTINGS, type ListingType, type ListingTransaction } from "@/lib/listings";
import { uniqueSlug } from "@/lib/backoffice/slugify";

const TYPES: { value: ListingType; label: string }[] = [
  { value: "appartement", label: "Appartement" },
  { value: "maison", label: "Maison" },
  { value: "garage", label: "Garage" },
  { value: "parking", label: "Parking" },
  { value: "local", label: "Local commercial" },
  { value: "terrain", label: "Terrain" },
  { value: "immeuble", label: "Immeuble" },
];
const DPE = ["", "A", "B", "C", "D", "E", "F", "G"];
const BUCKET = "listings";

export type ListingFormInitial = {
  slug?: string;
  status?: "draft" | "published";
  titre?: string;
  type?: ListingType;
  transaction?: ListingTransaction;
  prix?: number | null;
  prix_suffixe?: string | null;
  adresse?: string | null;
  quartier?: string | null;
  ville?: string | null;
  code_postal?: string | null;
  surface?: number | null;
  pieces?: number | null;
  dpe?: string | null;
  ges?: string | null;
  description?: string | null;
  atouts?: string[] | null;
  photos?: { url: string; alt: string }[] | null;
  mise_en_avant?: boolean | null;
};

type Photo = { url: string; alt: string };

export function ListingForm({
  listingId,
  mode,
  initial,
}: {
  listingId: string;
  mode: "new" | "edit";
  initial?: ListingFormInitial;
}) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">(
    initial?.status ?? "draft",
  );
  const [takenSlugs, setTakenSlugs] = useState<string[]>([]);

  const [f, setF] = useState({
    titre: initial?.titre ?? "",
    type: (initial?.type ?? "appartement") as ListingType,
    transaction: (initial?.transaction ?? "vente") as ListingTransaction,
    mise_en_avant: Boolean(initial?.mise_en_avant),
    prix: initial?.prix != null ? String(initial.prix) : "",
    prix_suffixe: initial?.prix_suffixe ?? "",
    adresse: initial?.adresse ?? "",
    quartier: initial?.quartier ?? "",
    ville: initial?.ville ?? "Villeurbanne",
    code_postal: initial?.code_postal ?? "69100",
    surface: initial?.surface != null ? String(initial.surface) : "",
    pieces: initial?.pieces != null ? String(initial.pieces) : "",
    description: initial?.description ?? "",
    dpe: initial?.dpe ?? "",
    ges: initial?.ges ?? "",
  });
  const [atouts, setAtouts] = useState<string[]>(initial?.atouts ?? []);
  const [atoutDraft, setAtoutDraft] = useState("");
  const [photos, setPhotos] = useState<Photo[]>(initial?.photos ?? []);
  const [uploading, setUploading] = useState(false);
  const [slugOverride, setSlugOverride] = useState(initial?.slug ?? "");
  const [slugUnlocked, setSlugUnlocked] = useState(false);

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) =>
    setF((prev) => ({ ...prev, [k]: v }));

  // Slugs déjà pris (statiques + base, hors annonce courante) pour l'unicité.
  useEffect(() => {
    let alive = true;
    (async () => {
      const staticSlugs = LISTINGS.map((l) => l.slug);
      const { data } = await supabase
        .from("listings")
        .select("id, slug")
        .neq("id", listingId);
      if (!alive) return;
      setTakenSlugs([
        ...staticSlugs,
        ...((data as { slug: string }[] | null)?.map((r) => r.slug) ?? []),
      ]);
    })();
    return () => {
      alive = false;
    };
  }, [listingId]);

  const computedSlug = useMemo(() => {
    if (status === "published" && initial?.slug) return initial.slug; // figé après publication
    if (slugUnlocked && slugOverride.trim())
      return uniqueSlug(slugOverride, takenSlugs);
    return uniqueSlug(f.titre || "annonce", takenSlugs);
  }, [status, initial?.slug, slugUnlocked, slugOverride, f.titre, takenSlugs]);

  /* ---------- Photos ---------- */
  const onFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const added: Photo[] = [];
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${listingId}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 7)}.${ext}`;
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (error) throw error;
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
        added.push({
          url: data.publicUrl,
          alt: `${f.titre || "Bien"} — ${f.ville}`,
        });
      }
      setPhotos((p) => [...p, ...added]);
      toast.success(
        `${added.length} photo${added.length > 1 ? "s" : ""} ajoutée${
          added.length > 1 ? "s" : ""
        }`,
      );
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Erreur d'upload");
    } finally {
      setUploading(false);
    }
  };

  const movePhoto = (i: number, dir: -1 | 1) => {
    setPhotos((p) => {
      const j = i + dir;
      if (j < 0 || j >= p.length) return p;
      const next = [...p];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };
  const removePhoto = (i: number) => {
    const target = photos[i];
    setPhotos((p) => p.filter((_, k) => k !== i));
    // Suppression best-effort dans le bucket.
    try {
      const marker = `/${BUCKET}/`;
      const idx = target.url.indexOf(marker);
      if (idx !== -1) {
        const path = target.url.slice(idx + marker.length);
        void supabase.storage.from(BUCKET).remove([path]);
      }
    } catch {
      /* ignore */
    }
  };

  /* ---------- Enregistrement ---------- */
  const persist = async (nextStatus: "draft" | "published") => {
    if (!f.titre.trim()) {
      toast.error("Le titre est obligatoire.");
      setStep(1);
      return;
    }
    if (!f.description.trim()) {
      toast.error("La description est obligatoire.");
      setStep(3);
      return;
    }
    const prix = parseInt(f.prix, 10);
    if (!Number.isFinite(prix) || prix <= 0) {
      toast.error("Prix invalide.");
      setStep(2);
      return;
    }

    setSaving(true);
    try {
      const row = {
        id: listingId,
        slug: computedSlug,
        status: nextStatus,
        titre: f.titre.trim(),
        type: f.type,
        transaction: f.transaction,
        prix,
        prix_suffixe:
          f.transaction === "location"
            ? f.prix_suffixe.trim() || "/mois CC"
            : f.prix_suffixe.trim() || null,
        adresse: f.adresse.trim() || null,
        quartier: f.quartier.trim() || null,
        ville: f.ville.trim() || "Villeurbanne",
        code_postal: f.code_postal.trim() || "69100",
        surface: f.surface ? Number(f.surface) : null,
        pieces: f.pieces ? parseInt(f.pieces, 10) : null,
        dpe: f.dpe || null,
        ges: f.ges || null,
        description: f.description.trim(),
        atouts,
        photos,
        mise_en_avant: f.mise_en_avant,
        ...(nextStatus === "published"
          ? { published_at: new Date().toISOString() }
          : {}),
      };

      const { error } = await supabase
        .from("listings")
        .upsert(row, { onConflict: "id" });
      if (error) throw error;

      setStatus(nextStatus);
      toast.success(
        nextStatus === "published"
          ? "Annonce publiée ✓"
          : "Brouillon enregistré ✓",
      );

      if (mode === "new") {
        router.replace(`/admin/annonces/${listingId}/edit`);
      } else {
        router.refresh();
      }
    } catch (e: unknown) {
      toast.error(
        e instanceof Error ? e.message : "Erreur lors de l'enregistrement",
      );
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Rendu ---------- */
  return (
    <div className="bg-blanc rounded-[20px] p-8 max-md:p-6 shadow-[0_30px_70px_-25px_rgba(56,62,66,0.18)] max-w-[820px]">
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
          style={{
            background: status === "published" ? "var(--color-sauge)" : "#eee",
            color: status === "published" ? "#fff" : "#7a817f",
          }}
        >
          {status === "published" ? "Publiée" : "Brouillon"}
        </span>
        <code className="text-[11px] text-[#7a817f] truncate max-w-[60%]">
          /annonces/{computedSlug}
        </code>
      </div>

      <StepIndicator
        current={step}
        total={4}
        labels={["Nature", "Chiffres & lieu", "Descriptif", "Photos"]}
      />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <StepPanel key="s1" stepKey={1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Type de bien" required>
                <NativeSelect
                  value={f.type}
                  onChange={(e) => set("type", e.target.value as ListingType)}
                >
                  {TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
              <Field label="Transaction" required>
                <NativeSelect
                  value={f.transaction}
                  onChange={(e) =>
                    set(
                      "transaction",
                      e.target.value as ListingTransaction,
                    )
                  }
                >
                  <option value="vente">Vente</option>
                  <option value="location">Location</option>
                </NativeSelect>
              </Field>
              <Field
                label="Titre de l'annonce"
                required
                className="md:col-span-2"
                hint="Ex. « Appartement T3 avec terrasse — Villeurbanne (Grand Clément) »"
              >
                <TextInput
                  value={f.titre}
                  onChange={(e) => set("titre", e.target.value)}
                  placeholder="Appartement T3 avec terrasse — Villeurbanne"
                />
              </Field>
              <label className="md:col-span-2 inline-flex items-center gap-3 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={f.mise_en_avant}
                  onChange={(e) => set("mise_en_avant", e.target.checked)}
                  className="w-4 h-4 accent-[var(--color-sauge)]"
                />
                Mettre en avant (1re position sur l&apos;accueil et le hub)
              </label>

              {(mode === "edit" || slugUnlocked) && (
                <Field
                  label="Slug (URL)"
                  className="md:col-span-2"
                  hint={
                    status === "published"
                      ? "Figé après publication (ne pas casser les liens / le SEO)."
                      : "Laisser vide = généré depuis le titre."
                  }
                >
                  <div className="flex items-center gap-2">
                    <TextInput
                      value={slugOverride}
                      disabled={status === "published" && !slugUnlocked}
                      onChange={(e) => setSlugOverride(e.target.value)}
                      placeholder={computedSlug}
                    />
                    {status === "published" && (
                      <button
                        type="button"
                        onClick={() => setSlugUnlocked((v) => !v)}
                        className="text-xs text-[#7a817f] underline whitespace-nowrap"
                      >
                        {slugUnlocked ? "Verrouiller" : "Déverrouiller"}
                      </button>
                    )}
                  </div>
                </Field>
              )}
            </div>
            <StepNav onNext={() => setStep(2)} />
          </StepPanel>
        )}

        {step === 2 && (
          <StepPanel key="s2" stepKey={2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label={
                  f.transaction === "location"
                    ? "Loyer mensuel (€ CC)"
                    : "Prix de vente (€)"
                }
                required
              >
                <TextInput
                  inputMode="numeric"
                  value={f.prix}
                  onChange={(e) =>
                    set("prix", e.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="279000"
                />
              </Field>
              <Field label="Suffixe de prix" hint="Ex. « /mois CC »">
                <TextInput
                  value={f.prix_suffixe}
                  onChange={(e) => set("prix_suffixe", e.target.value)}
                  placeholder={
                    f.transaction === "location" ? "/mois CC" : "(optionnel)"
                  }
                />
              </Field>
              <Field label="Adresse" className="md:col-span-2">
                <TextInput
                  value={f.adresse}
                  onChange={(e) => set("adresse", e.target.value)}
                  placeholder="4 rue Paul Kruger"
                />
              </Field>
              <Field label="Quartier">
                <TextInput
                  value={f.quartier}
                  onChange={(e) => set("quartier", e.target.value)}
                  placeholder="Grand Clément"
                />
              </Field>
              <Field label="Ville">
                <TextInput
                  value={f.ville}
                  onChange={(e) => set("ville", e.target.value)}
                />
              </Field>
              <Field label="Code postal">
                <TextInput
                  value={f.code_postal}
                  onChange={(e) => set("code_postal", e.target.value)}
                />
              </Field>
              <Field label="Surface (m²)" hint="Optionnel pour garage / terrain">
                <TextInput
                  inputMode="decimal"
                  value={f.surface}
                  onChange={(e) => set("surface", e.target.value)}
                  placeholder="58.67"
                />
              </Field>
              <Field label="Nombre de pièces" hint="Optionnel">
                <TextInput
                  inputMode="numeric"
                  value={f.pieces}
                  onChange={(e) =>
                    set("pieces", e.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="3"
                />
              </Field>
            </div>
            <StepNav onBack={() => setStep(1)} onNext={() => setStep(3)} />
          </StepPanel>
        )}

        {step === 3 && (
          <StepPanel key="s3" stepKey={3}>
            <Field
              label="Description"
              required
              hint="La 1re phrase doit être claire et autosuffisante (type, surface, ville, prix)."
            >
              <Textarea
                value={f.description}
                onChange={(e) => set("description", e.target.value)}
                rows={8}
                placeholder="Cet appartement T3 de 58 m² à vendre à Villeurbanne…"
              />
            </Field>

            <Field label="Atouts" className="mt-5">
              <div className="flex items-center gap-2">
                <TextInput
                  value={atoutDraft}
                  onChange={(e) => setAtoutDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (atoutDraft.trim()) {
                        setAtouts((a) => [...a, atoutDraft.trim()]);
                        setAtoutDraft("");
                      }
                    }
                  }}
                  placeholder="Terrasse de 10 m² et jardin privatif"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (atoutDraft.trim()) {
                      setAtouts((a) => [...a, atoutDraft.trim()]);
                      setAtoutDraft("");
                    }
                  }}
                  className="shrink-0 h-11 px-3 rounded-[10px] bg-anthracite text-white grid place-items-center"
                  aria-label="Ajouter l'atout"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {atouts.length > 0 && (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {atouts.map((a, i) => (
                    <li
                      key={`${a}-${i}`}
                      className="flex items-center justify-between gap-3 bg-gris rounded-lg px-3 py-2 text-sm"
                    >
                      <span>{a}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setAtouts((list) => list.filter((_, k) => k !== i))
                        }
                        className="text-[#7a817f] hover:text-red-600"
                        aria-label="Retirer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-5 mt-5">
              <Field label="DPE">
                <NativeSelect
                  value={f.dpe}
                  onChange={(e) => set("dpe", e.target.value)}
                >
                  {DPE.map((d) => (
                    <option key={d || "none"} value={d}>
                      {d || "Non concerné"}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
              <Field label="GES">
                <NativeSelect
                  value={f.ges}
                  onChange={(e) => set("ges", e.target.value)}
                >
                  {DPE.map((d) => (
                    <option key={d || "none"} value={d}>
                      {d || "Non concerné"}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
            </div>
            <StepNav onBack={() => setStep(2)} onNext={() => setStep(4)} />
          </StepPanel>
        )}

        {step === 4 && (
          <StepPanel key="s4" stepKey={4}>
            <Field
              label="Photos"
              hint="La 1re photo sert de vignette. Glissez avec ↑ / ↓ pour réordonner."
            >
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={uploading}
                onChange={(e) => onFiles(e.target.files)}
                className="block w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-anthracite file:text-white file:px-3 file:py-1.5 file:text-xs file:font-semibold"
              />
              {uploading && (
                <div className="flex items-center gap-2 text-sm text-[#7a817f] mt-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Téléversement…
                </div>
              )}
            </Field>

            {photos.length > 0 && (
              <ul className="mt-4 flex flex-col gap-3">
                {photos.map((p, i) => (
                  <li
                    key={p.url}
                    className="flex items-center gap-3 bg-gris rounded-xl p-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.url}
                      alt=""
                      className="w-20 h-16 object-cover rounded-lg shrink-0"
                    />
                    <input
                      value={p.alt}
                      onChange={(e) =>
                        setPhotos((list) =>
                          list.map((x, k) =>
                            k === i ? { ...x, alt: e.target.value } : x,
                          ),
                        )
                      }
                      placeholder="Texte alternatif (SEO)"
                      className="flex-1 h-9 px-3 rounded-lg border border-[var(--bordure)] text-sm focus:outline-none focus:border-sauge"
                    />
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => movePhoto(i, -1)}
                        disabled={i === 0}
                        className="p-1.5 rounded hover:bg-black/5 disabled:opacity-30"
                        aria-label="Monter"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => movePhoto(i, 1)}
                        disabled={i === photos.length - 1}
                        className="p-1.5 rounded hover:bg-black/5 disabled:opacity-30"
                        aria-label="Descendre"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="p-1.5 rounded hover:bg-red-50 text-[#7a817f] hover:text-red-600"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex items-center justify-between gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 text-[#7a817f] hover:text-anthracite transition text-sm font-semibold uppercase tracking-[0.08em]"
              >
                <ArrowUp className="w-4 h-4 rotate-[-90deg]" /> Retour
              </button>
              <div className="flex items-center gap-3 flex-wrap">
                <Button
                  variant="outline"
                  disabled={saving}
                  onClick={() => persist("draft")}
                >
                  {saving ? "…" : "Enregistrer le brouillon"}
                </Button>
                {status === "published" ? (
                  <Button
                    variant="primary"
                    disabled={saving}
                    onClick={() => persist("draft")}
                  >
                    Dépublier
                  </Button>
                ) : (
                  <Button
                    variant="cta"
                    disabled={saving}
                    onClick={() => persist("published")}
                  >
                    {saving ? "…" : "Publier"}
                    <ArrowRight />
                  </Button>
                )}
              </div>
            </div>
          </StepPanel>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepNav({
  onBack,
  onNext,
}: {
  onBack?: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[#7a817f] hover:text-anthracite transition text-sm font-semibold uppercase tracking-[0.08em]"
        >
          <ArrowUp className="w-4 h-4 rotate-[-90deg]" /> Retour
        </button>
      ) : (
        <span />
      )}
      <Button variant="cta" onClick={onNext}>
        Continuer
        <ArrowRight />
      </Button>
    </div>
  );
}
