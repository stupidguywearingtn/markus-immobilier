"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Copy,
  Eye,
  EyeOff,
  FilePlus2,
  Home,
  Loader2,
  PencilRuler,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { SITE_ID } from "@/lib/backoffice/config";
import { slugify } from "@/lib/backoffice/slugify";
import { RESERVED_SLUGS } from "@/lib/page-builder/slugs";
import { TEMPLATES, homeData } from "@/lib/page-builder/templates";

type PageRow = {
  id: string;
  slug: string;
  titre: string;
  published: object | null;
  published_at: string | null;
  en_ligne: boolean;
  updated_at: string;
};
type DraftRow = { page_id: string; updated_at: string };

const fmt = (d: string) =>
  new Date(d).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

/** Liste des pages éditables + création d'une nouvelle page. */
export function PagesList() {
  const router = useRouter();
  const [pages, setPages] = useState<PageRow[] | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [{ data: p, error }, { data: d }] = await Promise.all([
      supabase
        .from("site_pages")
        .select("id, slug, titre, published, published_at, en_ligne, updated_at")
        .eq("site_id", SITE_ID)
        .order("created_at", { ascending: true }),
      supabase.from("site_page_drafts").select("page_id, updated_at"),
    ]);
    if (error) {
      toast.error(
        error.message.includes("site_pages")
          ? "Table des pages absente : exécutez supabase/migrations/0004_pages.sql dans Supabase."
          : error.message,
      );
      setPages([]);
      return;
    }
    let rows = (p ?? []) as PageRow[];
    // L'accueil doit toujours exister (créé par la migration, recréé ici au besoin).
    if (!rows.some((r) => r.slug === "")) {
      const { data: home } = await supabase
        .from("site_pages")
        .insert({ site_id: SITE_ID, slug: "", titre: "Accueil" })
        .select("id, slug, titre, published, published_at, en_ligne, updated_at")
        .single();
      if (home) rows = [home as PageRow, ...rows];
    }
    rows.sort((a, b) => (a.slug === "" ? -1 : b.slug === "" ? 1 : 0));
    setPages(rows);
    setDrafts(Object.fromEntries(((d ?? []) as DraftRow[]).map((x) => [x.page_id, x.updated_at])));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const toggleOnline = async (p: PageRow) => {
    setBusy(p.id);
    const { error } = await supabase.from("site_pages").update({ en_ligne: !p.en_ligne }).eq("id", p.id);
    setBusy(null);
    if (error) return toast.error(error.message);
    toast.success(p.en_ligne ? "Page retirée du site" : "Page remise en ligne");
    await revalidate(p.slug);
    void load();
  };

  const duplicate = async (p: PageRow) => {
    setBusy(p.id);
    try {
      const { data: draft } = await supabase.from("site_page_drafts").select("data").eq("page_id", p.id).maybeSingle();
      const source = (draft?.data ?? p.published ?? homeData()) as object;
      const taken = new Set(pages?.map((x) => x.slug));
      let slug = `${p.slug || "accueil"}-copie`;
      for (let i = 2; taken.has(slug) || RESERVED_SLUGS.has(slug); i++) slug = `${p.slug || "accueil"}-copie-${i}`;
      const { data: row, error } = await supabase
        .from("site_pages")
        .insert({ site_id: SITE_ID, slug, titre: `${p.titre} (copie)` })
        .select("id")
        .single();
      if (error || !row) throw error ?? new Error("Création impossible");
      await supabase.from("site_page_drafts").insert({ page_id: row.id, data: source });
      toast.success("Page dupliquée (non publiée)");
      void load();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setBusy(null);
    }
  };

  const remove = async (p: PageRow) => {
    setBusy(p.id);
    const { error } = await supabase.from("site_pages").delete().eq("id", p.id);
    setBusy(null);
    setConfirmDelete(null);
    if (error) return toast.error(error.message);
    toast.success("Page supprimée");
    await revalidate(p.slug);
    void load();
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
        <div>
          <h1 className="text-[28px] font-bold leading-tight">Pages du site</h1>
          <p className="text-sm text-[#7a817f] mt-1 max-w-[520px]">
            Ajoutez, déplacez et modifiez les sections de vos pages. Rien n&apos;est visible par les visiteurs
            tant que vous n&apos;avez pas cliqué sur « Publier ».
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreating((c) => !c)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-anthracite text-white text-sm font-semibold"
        >
          <FilePlus2 className="w-4 h-4" /> Nouvelle page
        </button>
      </div>

      {creating && pages && (
        <NewPageForm
          taken={new Set(pages.map((p) => p.slug))}
          onCancel={() => setCreating(false)}
          onCreated={(id) => router.push(`/admin/pages/${id}`)}
        />
      )}

      {!pages ? (
        <div className="py-16 grid place-items-center text-[#7a817f]">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <ul className="space-y-3">
          {pages.map((p) => {
            const draftAt = drafts[p.id];
            const status = !p.published
              ? { label: "Jamais publiée", tone: "bg-[#f1f2ef] text-[#7a817f]" }
              : !p.en_ligne
                ? { label: "Hors ligne", tone: "bg-[#f1f2ef] text-[#7a817f]" }
                : draftAt && (!p.published_at || draftAt > p.published_at)
                  ? { label: "Modifications non publiées", tone: "bg-sauge/20 text-[#5d6656]" }
                  : { label: "En ligne", tone: "bg-anthracite text-white" };
            const isHome = p.slug === "";
            const isBusy = busy === p.id;
            return (
              <li key={p.id} className="bg-white rounded-[14px] p-4 pr-3 flex items-center gap-4 flex-wrap">
                <div className="w-11 h-11 rounded-full bg-gris grid place-items-center shrink-0">
                  {isHome ? <Home className="w-5 h-5 text-anthracite" /> : <PencilRuler className="w-5 h-5 text-anthracite" />}
                </div>
                <div className="flex-1 min-w-[180px]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{p.titre}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${status.tone}`}>{status.label}</span>
                  </div>
                  <div className="text-[13px] text-[#7a817f] mt-0.5">
                    markusimmobilier.fr/{p.slug}
                    {p.published_at && <> · publiée le {fmt(p.published_at)}</>}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <Link
                    href={`/admin/pages/${p.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-anthracite text-white text-[13px] font-semibold"
                  >
                    <PencilRuler className="w-3.5 h-3.5" /> Modifier
                  </Link>
                  {!!p.published && p.en_ligne && (
                    <a href={`/${p.slug}`} target="_blank" rel="noreferrer" className="icon-btn" title="Voir la page">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button type="button" className="icon-btn" title="Dupliquer" disabled={isBusy} onClick={() => duplicate(p)}>
                    <Copy className="w-4 h-4" />
                  </button>
                  {!isHome && !!p.published && (
                    <button
                      type="button"
                      className="icon-btn"
                      title={p.en_ligne ? "Retirer du site" : "Remettre en ligne"}
                      disabled={isBusy}
                      onClick={() => toggleOnline(p)}
                    >
                      {p.en_ligne ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                  {!isHome &&
                    (confirmDelete === p.id ? (
                      <span className="inline-flex items-center gap-1 text-[13px]">
                        <button type="button" className="px-2.5 py-1.5 rounded-[8px] bg-red-600 text-white font-semibold" onClick={() => remove(p)}>
                          Supprimer
                        </button>
                        <button type="button" className="px-2 py-1.5 text-[#7a817f]" onClick={() => setConfirmDelete(null)}>
                          Annuler
                        </button>
                      </span>
                    ) : (
                      <button type="button" className="icon-btn hover:!text-red-600" title="Supprimer" onClick={() => setConfirmDelete(p.id)}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ))}
                  {isBusy && <Loader2 className="w-4 h-4 animate-spin text-[#7a817f] ml-1" />}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-[12px] text-[#9aa09d] mt-6 leading-relaxed">
        Les pages outils (estimation, annonces, blog, pages quartiers) restent protégées : elles sont optimisées pour
        Google et ne passent pas par l&apos;éditeur.
      </p>
    </div>
  );
}

function NewPageForm({
  taken,
  onCancel,
  onCreated,
}: {
  taken: Set<string>;
  onCancel: () => void;
  onCreated: (id: string) => void;
}) {
  const [titre, setTitre] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [tpl, setTpl] = useState(TEMPLATES[0].key);
  const [saving, setSaving] = useState(false);

  const finalSlug = slugTouched ? slugify(slug) : slugify(titre);
  const error = useMemo(() => {
    if (!finalSlug) return "Donnez un titre à la page.";
    if (RESERVED_SLUGS.has(finalSlug)) return "Cette adresse est déjà utilisée par une page du site.";
    if (taken.has(finalSlug)) return "Une page existe déjà à cette adresse.";
    return null;
  }, [finalSlug, taken]);

  const create = async () => {
    if (error) return;
    setSaving(true);
    try {
      const t = TEMPLATES.find((x) => x.key === tpl) ?? TEMPLATES[0];
      const { data: row, error: e1 } = await supabase
        .from("site_pages")
        .insert({ site_id: SITE_ID, slug: finalSlug, titre: titre.trim() })
        .select("id")
        .single();
      if (e1 || !row) throw e1 ?? new Error("Création impossible");
      const { error: e2 } = await supabase.from("site_page_drafts").insert({ page_id: row.id, data: t.build(titre.trim()) });
      if (e2) throw e2;
      onCreated(row.id);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Erreur");
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-[16px] p-6 max-md:p-5 mb-6 border border-[var(--bordure)]">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-[13px] font-semibold">Titre de la page</span>
          <input
            autoFocus
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Ex. Vendre son appartement à Villeurbanne"
            className="mt-1.5 w-full px-3.5 py-2.5 rounded-[8px] border border-[var(--bordure)] focus:border-sauge outline-none"
          />
        </label>
        <label className="block">
          <span className="text-[13px] font-semibold">Adresse</span>
          <div className="mt-1.5 flex items-center rounded-[8px] border border-[var(--bordure)] focus-within:border-sauge">
            <span className="pl-3.5 text-[13px] text-[#9aa09d] whitespace-nowrap">markusimmobilier.fr/</span>
            <input
              value={slugTouched ? slug : finalSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              className="flex-1 min-w-0 px-1 py-2.5 outline-none bg-transparent"
            />
          </div>
        </label>
      </div>

      <div className="mt-5">
        <span className="text-[13px] font-semibold">Point de départ</span>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {TEMPLATES.map((t) => (
            <button
              type="button"
              key={t.key}
              onClick={() => setTpl(t.key)}
              className={`text-left rounded-[10px] px-4 py-3 border transition ${
                tpl === t.key ? "border-anthracite bg-gris" : "border-[var(--bordure)] hover:border-sauge"
              }`}
            >
              <div className="font-semibold text-sm">{t.label}</div>
              <div className="text-[12px] text-[#7a817f] mt-0.5">{t.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 flex-wrap">
        <button
          type="button"
          disabled={!!error || saving}
          onClick={create}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-anthracite text-white text-sm font-semibold disabled:opacity-40"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <FilePlus2 className="w-4 h-4" />}
          Créer et ouvrir l&apos;éditeur
        </button>
        <button type="button" onClick={onCancel} className="text-sm text-[#7a817f]">
          Annuler
        </button>
        {titre && error && <span className="text-[13px] text-red-600">{error}</span>}
      </div>
    </div>
  );
}

/** Vide le cache public de la page (voir app/api/admin/pages/revalidate). */
export async function revalidate(slug: string) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return;
  await fetch("/api/admin/pages/revalidate", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
    body: JSON.stringify({ slug }),
  }).catch(() => {});
}
