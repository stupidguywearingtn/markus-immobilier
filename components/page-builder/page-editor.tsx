"use client";

import "@puckeditor/core/puck.css";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Puck, type Data, type Overrides } from "@puckeditor/core";
import {
  ArrowLeft,
  Check,
  CloudOff,
  ExternalLink,
  History,
  Loader2,
  RotateCcw,
  Rocket,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { editorConfig, type EditorMeta } from "@/lib/page-builder/config.client";
import { homeData } from "@/lib/page-builder/templates";
import { DEFINITIONS } from "@/lib/page-builder/definitions";
import { revalidate } from "./pages-list";

/**
 * ÉDITEUR DE PAGE — plein écran, par-dessus le site.
 *
 * Cycle de vie du contenu :
 *   chaque modification  → brouillon enregistré tout seul (site_page_drafts)
 *   « Publier »          → copie dans site_pages.published + une version dans
 *                          l'historique + cache de la page vidé → en ligne
 *   « Historique »       → recharge une ancienne version dans l'éditeur
 *                          (à republier pour la remettre en ligne)
 * Le visiteur ne voit JAMAIS un brouillon.
 */

type PageRow = {
  id: string;
  slug: string;
  titre: string;
  published: Data | null;
  published_at: string | null;
};

type SaveState = "idle" | "dirty" | "saving" | "saved" | "error";

type Ctx = {
  page: PageRow;
  save: SaveState;
  publishing: boolean;
  hasUnpublished: boolean;
  publish: () => void;
  openHistory: () => void;
  discard: () => void;
};
const EditorCtx = createContext<Ctx | null>(null);
const useEditor = () => useContext(EditorCtx)!;

// ── Traduction de l'interface Puck ──────────────────────────────────────────
export const DICTIONARY_FR: Record<string, string> = {
  "header-publish": "Publier",
  "header-undo": "Annuler",
  "header-redo": "Rétablir",
  "header-toggle-leftsidebar": "Afficher / masquer le panneau de gauche",
  "header-toggle-rightsidebar": "Afficher / masquer le panneau de droite",
  "header-toggle-menubar": "Menu",
  "action-selectparent": "Sélectionner le parent",
  "action-duplicate": "Dupliquer",
  "action-delete": "Supprimer",
  "label-page": "Page",
  "label-component": "Section",
  "outline-empty": "Aucune section",
  "outline-item-collapse": "Replier",
  "outline-item-expand": "Déplier",
  "outline-header-title": "Plan de la page",
  "outline-header-collapseall": "Tout replier",
  "outline-item-duplicate": "Dupliquer",
  "outline-item-delete": "Supprimer",
  "drawer-category-collapse": "Replier {title}",
  "drawer-category-expand": "Déplier {title}",
  "drawer-category-other": "Autres",
  "canvas-noconfig": "Section inconnue : {type}",
  "field-readonly": "Lecture seule",
  "field-arrayitem-summary": "Élément n°{index}",
  "field-arrayitem-duplicate": "Dupliquer",
  "field-arrayitem-delete": "Supprimer",
  "field-external-selectdata": "Choisir",
  "field-external-search": "Rechercher",
  "field-external-togglefilters": "Filtres",
  "field-external-item": "Élément",
  "field-external-result-singular": "{count} résultat",
  "field-external-result-plural": "{count} résultats",
  "field-richtext-bold": "Gras",
  "field-richtext-italic": "Italique",
  "field-richtext-underline": "Souligné",
  "field-richtext-strikethrough": "Barré",
  "field-richtext-blockquote": "Citation",
  "field-richtext-code-inline": "Code",
  "field-richtext-code-block": "Bloc de code",
  "field-richtext-list-bullet": "Liste à puces",
  "field-richtext-list-ordered": "Liste numérotée",
  "field-richtext-horizontalrule": "Trait",
  "field-richtext-align-left": "Aligner à gauche",
  "field-richtext-align-center": "Centrer",
  "field-richtext-align-right": "Aligner à droite",
  "field-richtext-align-justify": "Justifier",
  "field-richtext-select": "Style",
  "field-richtext-headingselect-1": "Titre 1",
  "field-richtext-headingselect-2": "Titre 2",
  "field-richtext-headingselect-3": "Intertitre",
  "field-richtext-headingselect-4": "Titre 4",
  "field-richtext-headingselect-5": "Titre 5",
  "field-richtext-headingselect-6": "Titre 6",
  "field-richtext-alignselect-left": "Gauche",
  "field-richtext-alignselect-center": "Centre",
  "field-richtext-alignselect-right": "Droite",
  "field-richtext-alignselect-justify": "Justifié",
  "field-richtext-listselect-bullet": "Liste à puces",
  "field-richtext-listselect-ordered": "Liste numérotée",
  "viewport-zoom-in": "Zoomer",
  "viewport-zoom-out": "Dézoomer",
  "viewport-zoom-auto": "{zoom} % (auto)",
  "viewport-toggle-menu": "Choisir l'écran",
  "viewport-switch": "Voir en {label}",
  "viewport-switch-default": "Changer d'écran",
  "plugin-blocks": "Ajouter",
  "plugin-outline": "Plan",
  "plugin-fields": "Réglages",
  "plugin-components": "Sections",
  "layout-maximize": "agrandir",
  "layout-minimize": "réduire",
  "loader-loading": "chargement",
};

export const VIEWPORTS = [
  { width: 390, height: "auto" as const, label: "Mobile", icon: "Smartphone" as const },
  { width: 820, height: "auto" as const, label: "Tablette", icon: "Tablet" as const },
  { width: 1440, height: "auto" as const, label: "Ordinateur", icon: "Monitor" as const },
];

/**
 * CSS injecté dans l'aperçu (iframe). Les apparitions au scroll (« reveal »)
 * attendent le défilement pour s'afficher : dans l'éditeur on veut tout voir,
 * tout de suite, sinon une section fraîchement ajoutée paraît vide.
 */
const PREVIEW_CSS = `
  .reveal{opacity:1!important;transform:none!important;filter:none!important}
  html{scroll-behavior:auto!important}
  body{padding-top:0!important}
`;

export function PreviewStyles({ children, document: doc }: { children: ReactNode; document?: Document }) {
  useEffect(() => {
    if (!doc) return;
    const style = doc.createElement("style");
    style.setAttribute("data-markus-editor", "");
    style.textContent = PREVIEW_CSS;
    doc.head.appendChild(style);
    return () => style.remove();
  }, [doc]);
  return <>{children}</>;
}

/** Un contenu reçu de la base peut être incomplet : on le rend toujours valide pour Puck. */
function normalize(d: unknown): Data | null {
  if (!d || typeof d !== "object") return null;
  const data = d as Partial<Data>;
  if (!Array.isArray(data.content)) return null;
  // On écarte les sections dont le type n'existe plus (renommée / retirée du code).
  const content = data.content.filter((c) => c && typeof c.type === "string" && c.type in DEFINITIONS);
  return {
    root: data.root && "props" in (data.root as object) ? data.root : { props: {} },
    content,
    zones: data.zones ?? {},
  } as Data;
}

export function PageEditor({ pageId, meta }: { pageId: string; meta: EditorMeta }) {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [page, setPage] = useState<PageRow | null>(null);
  const [initial, setInitial] = useState<Data | null>(null);
  const [mountKey, setMountKey] = useState(0);
  const [save, setSave] = useState<SaveState>("idle");
  const [publishing, setPublishing] = useState(false);
  const [hasUnpublished, setHasUnpublished] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const dataRef = useRef<Data | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Dernier contenu connu (chargé / enregistré) : sert à ignorer les onChange
  // que Puck émet sans vraie modification (montage, re-sélection…).
  const lastJson = useRef<string>("");

  // ── Accès ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!authLoading && !isAdmin) router.replace(`/signin?from=/admin/pages/${pageId}`);
  }, [authLoading, isAdmin, router, pageId]);

  // ── Chargement ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAdmin) return;
    let cancelled = false;
    (async () => {
      const [{ data: p, error }, { data: draft }] = await Promise.all([
        supabase.from("site_pages").select("id, slug, titre, published, published_at").eq("id", pageId).maybeSingle(),
        supabase.from("site_page_drafts").select("data").eq("page_id", pageId).maybeSingle(),
      ]);
      if (cancelled) return;
      if (error || !p) {
        toast.error("Page introuvable");
        router.replace("/admin/pages");
        return;
      }
      const row = p as PageRow;
      const start =
        normalize(draft?.data) ??
        normalize(row.published) ??
        (row.slug === "" ? homeData() : ({ root: { props: { title: row.titre } }, content: [], zones: {} } as Data));
      dataRef.current = start;
      lastJson.current = JSON.stringify(start);
      setHasUnpublished(!!draft?.data || !row.published);
      setPage(row);
      setInitial(start);
    })();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, pageId, router]);

  // ── Brouillon automatique ────────────────────────────────────────────────
  const saveDraft = useCallback(async () => {
    if (!dataRef.current) return;
    setSave("saving");
    const { error } = await supabase
      .from("site_page_drafts")
      .upsert({ page_id: pageId, data: dataRef.current }, { onConflict: "page_id" });
    setSave(error ? "error" : "saved");
    if (error) toast.error(`Brouillon non enregistré : ${error.message}`);
  }, [pageId]);

  const onChange = useCallback(
    (d: Data) => {
      dataRef.current = d;
      const json = JSON.stringify(d);
      if (json === lastJson.current) return;
      lastJson.current = json;
      setSave("dirty");
      setHasUnpublished(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(saveDraft, 1200);
    },
    [saveDraft],
  );

  // Quitter l'onglet avec un brouillon pas encore envoyé → avertissement navigateur.
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => {
      if (save === "dirty" || save === "saving") e.preventDefault();
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [save]);

  // ── Publication ──────────────────────────────────────────────────────────
  const publish = useCallback(async () => {
    if (!page || !dataRef.current) return;
    if (timer.current) clearTimeout(timer.current);
    setPublishing(true);
    try {
      const data = dataRef.current;
      const now = new Date().toISOString();
      const { error: e1 } = await supabase
        .from("site_pages")
        .update({ published: data, published_at: now })
        .eq("id", page.id);
      if (e1) throw e1;
      const { data: u } = await supabase.auth.getUser();
      await supabase.from("site_page_versions").insert({ page_id: page.id, data, created_by: u.user?.id ?? null });
      await supabase.from("site_page_drafts").delete().eq("page_id", page.id);
      await revalidate(page.slug);
      setPage({ ...page, published: data, published_at: now });
      setHasUnpublished(false);
      setSave("idle");
      toast.success("Publié ✓ — la page est à jour en ligne");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Publication impossible");
    } finally {
      setPublishing(false);
    }
  }, [page]);

  /** Recharge un contenu dans l'éditeur (version de l'historique, ou version en ligne). */
  const loadData = useCallback(
    async (d: Data, asDraft: boolean) => {
      const n = normalize(d);
      if (!n) return;
      dataRef.current = n;
      lastJson.current = JSON.stringify(n);
      setInitial(n);
      setMountKey((k) => k + 1);
      if (asDraft) {
        setHasUnpublished(true);
        await saveDraft();
      }
    },
    [saveDraft],
  );

  const discard = useCallback(async () => {
    if (!page?.published) return;
    await supabase.from("site_page_drafts").delete().eq("page_id", page.id);
    setHasUnpublished(false);
    setSave("idle");
    await loadData(page.published, false);
    toast.success("Brouillon abandonné — retour à la version en ligne");
  }, [page, loadData]);

  const overrides = useMemo<Partial<Overrides>>(
    () => ({
      headerActions: () => <HeaderActions />,
      iframe: PreviewStyles,
    }),
    [],
  );

  if (authLoading || !isAdmin || !page || !initial) {
    return (
      <div className="fixed inset-0 z-[1000] bg-gris grid place-items-center text-[#7a817f]">
        <Loader2 className="w-7 h-7 animate-spin" />
      </div>
    );
  }

  return (
    <EditorCtx.Provider
      value={{
        page,
        save,
        publishing,
        hasUnpublished,
        publish,
        openHistory: () => setHistoryOpen(true),
        discard,
      }}
    >
      <div className="markus-editor fixed inset-0 z-[1000] bg-white" data-lenis-prevent>
        <Puck
          key={mountKey}
          config={editorConfig}
          data={initial}
          metadata={meta as Record<string, unknown>}
          onChange={onChange}
          onPublish={publish}
          overrides={overrides}
          viewports={VIEWPORTS}
          dictionary={DICTIONARY_FR}
          headerTitle={page.titre}
          headerPath={`/${page.slug}`}
          height="100vh"
        />
        {historyOpen && (
          <HistoryPanel
            pageId={page.id}
            onClose={() => setHistoryOpen(false)}
            onRestore={async (d) => {
              setHistoryOpen(false);
              await loadData(d, true);
              toast.success("Version rechargée — cliquez sur « Publier » pour la remettre en ligne");
            }}
          />
        )}
      </div>
    </EditorCtx.Provider>
  );
}

// ── Barre d'actions (en haut à droite) ──────────────────────────────────────

function HeaderActions() {
  const { page, save, publishing, hasUnpublished, publish, openHistory, discard } = useEditor();
  const status =
    save === "saving" || save === "dirty" ? (
      <span className="me-status">
        <Loader2 size={14} className="animate-spin" /> Enregistrement…
      </span>
    ) : save === "error" ? (
      <span className="me-status is-error">
        <CloudOff size={14} /> Brouillon non enregistré
      </span>
    ) : hasUnpublished ? (
      <span className="me-status">
        <Check size={14} /> Brouillon enregistré · pas encore en ligne
      </span>
    ) : (
      <span className="me-status is-ok">
        <Check size={14} /> À jour en ligne
      </span>
    );

  return (
    <div className="me-actions">
      <Link href="/admin/pages" className="me-btn" title="Retour à la liste des pages">
        <ArrowLeft size={15} /> Pages
      </Link>
      {status}
      <button type="button" className="me-btn" onClick={openHistory} title="Versions publiées">
        <History size={15} /> Historique
      </button>
      {hasUnpublished && page.published && (
        <button type="button" className="me-btn" onClick={discard} title="Revenir à la version en ligne">
          <RotateCcw size={15} /> Annuler mes changements
        </button>
      )}
      {page.published && (
        <a href={`/${page.slug}`} target="_blank" rel="noreferrer" className="me-btn" title="Voir la page en ligne">
          <ExternalLink size={15} />
        </a>
      )}
      <button type="button" className="me-btn me-btn-primary" disabled={publishing} onClick={publish}>
        {publishing ? <Loader2 size={15} className="animate-spin" /> : <Rocket size={15} />} Publier
      </button>
    </div>
  );
}

// ── Historique des publications ─────────────────────────────────────────────

function HistoryPanel({
  pageId,
  onClose,
  onRestore,
}: {
  pageId: string;
  onClose: () => void;
  onRestore: (d: Data) => void;
}) {
  const [rows, setRows] = useState<{ id: string; created_at: string }[] | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("site_page_versions")
      .select("id, created_at")
      .eq("page_id", pageId)
      .order("created_at", { ascending: false })
      .limit(40)
      .then(({ data }) => setRows((data ?? []) as { id: string; created_at: string }[]));
  }, [pageId]);

  const restore = async (id: string) => {
    setLoadingId(id);
    const { data } = await supabase.from("site_page_versions").select("data").eq("id", id).single();
    setLoadingId(null);
    if (data?.data) onRestore(data.data as Data);
  };

  return (
    <div className="me-modal" role="dialog" aria-modal="true" aria-label="Historique des publications" onClick={onClose}>
      <div className="me-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="me-modal-head">
          <strong>Historique des publications</strong>
          <button type="button" onClick={onClose} aria-label="Fermer">
            <X size={18} />
          </button>
        </div>
        <p className="me-modal-hint">
          Chaque « Publier » crée une version. Rechargez-en une pour revenir en arrière, puis publiez-la.
        </p>
        {!rows && <Loader2 size={18} className="animate-spin" />}
        {rows?.length === 0 && <p className="me-modal-hint">Aucune publication pour l&apos;instant.</p>}
        <ul>
          {rows?.map((r, i) => (
            <li key={r.id}>
              <span>
                {new Date(r.created_at).toLocaleString("fr-FR", {
                  weekday: "short",
                  day: "2-digit",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {i === 0 && <em> · en ligne</em>}
              </span>
              <button type="button" className="me-btn" disabled={!!loadingId} onClick={() => restore(r.id)}>
                {loadingId === r.id ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />} Recharger
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
