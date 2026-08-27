"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { eur } from "@/lib/listings";

type Row = {
  id: string;
  slug: string;
  titre: string;
  type: string;
  transaction: string;
  prix: number;
  status: "draft" | "published";
  updated_at: string;
};

export default function AdminAnnoncesPage() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("id, slug, titre, type, transaction, prix, status, updated_at")
      .order("updated_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      setRows([]);
      return;
    }
    setRows((data as Row[]) ?? []);
  }, []);

  useEffect(() => {
    // Chargement initial : setState survient après l'await (pas synchrone).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const setStatus = async (r: Row, status: "draft" | "published") => {
    setBusy(r.id);
    const patch: Record<string, unknown> = { status };
    if (status === "published") patch.published_at = new Date().toISOString();
    const { error } = await supabase
      .from("listings")
      .update(patch)
      .eq("id", r.id);
    setBusy(null);
    if (error) return toast.error(error.message);
    toast.success(status === "published" ? "Publiée ✓" : "Dépubliée");
    load();
  };

  const remove = async (r: Row) => {
    if (!confirm(`Supprimer définitivement « ${r.titre} » ?`)) return;
    setBusy(r.id);
    const { error } = await supabase.from("listings").delete().eq("id", r.id);
    setBusy(null);
    if (error) return toast.error(error.message);
    toast.success("Annonce supprimée");
    load();
  };

  const drafts = rows?.filter((r) => r.status === "draft") ?? [];
  const published = rows?.filter((r) => r.status === "published") ?? [];

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.01em]">
            Annonces
          </h1>
          <p className="text-sm text-[#7a817f] mt-1">
            Créez et gérez les biens publiés sur le site.
          </p>
        </div>
        <Link
          href="/admin/annonces/new"
          className="inline-flex items-center gap-2 bg-anthracite text-white rounded-[8px] px-5 py-3 text-sm font-semibold uppercase tracking-[0.06em]"
        >
          <Plus className="w-4 h-4" /> Nouvelle annonce
        </Link>
      </div>

      {rows === null ? (
        <div className="grid place-items-center py-20 text-[#7a817f]">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : rows.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center text-[#7a817f]">
          Aucune annonce pour le moment.
        </div>
      ) : (
        <div className="space-y-10">
          <Group
            title={`Brouillons (${drafts.length})`}
            rows={drafts}
            busy={busy}
            onStatus={setStatus}
            onRemove={remove}
          />
          <Group
            title={`Publiées (${published.length})`}
            rows={published}
            busy={busy}
            onStatus={setStatus}
            onRemove={remove}
          />
        </div>
      )}
    </>
  );
}

function Group({
  title,
  rows,
  busy,
  onStatus,
  onRemove,
}: {
  title: string;
  rows: Row[];
  busy: string | null;
  onStatus: (r: Row, s: "draft" | "published") => void;
  onRemove: (r: Row) => void;
}) {
  if (rows.length === 0) return null;
  return (
    <section>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a817f] mb-3">
        {title}
      </h2>
      <div className="bg-white rounded-2xl divide-y divide-[var(--bordure)] overflow-hidden">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-4 p-4 max-md:flex-wrap"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-anthracite truncate">
                {r.titre}
              </div>
              <div className="text-xs text-[#7a817f] mt-0.5">
                {r.type} · {r.transaction} · {eur(r.prix)}
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Link
                href={`/admin/annonces/${r.id}/edit`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gris text-sm hover:bg-[#e9ebe6]"
              >
                <Pencil className="w-3.5 h-3.5" /> Éditer
              </Link>
              {r.status === "published" ? (
                <button
                  type="button"
                  disabled={busy === r.id}
                  onClick={() => onStatus(r, "draft")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gris text-sm hover:bg-[#e9ebe6] disabled:opacity-40"
                >
                  <EyeOff className="w-3.5 h-3.5" /> Dépublier
                </button>
              ) : (
                <button
                  type="button"
                  disabled={busy === r.id}
                  onClick={() => onStatus(r, "published")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sauge text-white text-sm hover:bg-sauge-hover disabled:opacity-40"
                >
                  <Eye className="w-3.5 h-3.5" /> Publier
                </button>
              )}
              <button
                type="button"
                disabled={busy === r.id}
                onClick={() => onRemove(r)}
                className="inline-flex items-center px-2 py-1.5 rounded-lg text-[#7a817f] hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                aria-label="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
