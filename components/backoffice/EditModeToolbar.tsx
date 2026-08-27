"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Loader2, Pencil, X, LogOut, Save } from "lucide-react";
import { toast } from "sonner";
import { useEditMode } from "@/hooks/useEditMode";
import { useAuth } from "@/hooks/useAuth";

export function EditModeToolbar() {
  const {
    isAdmin,
    enabled,
    toggle,
    drafts,
    hasDrafts,
    publish,
    cancel,
    publishing,
  } = useEditMode();
  const { user, signOut } = useAuth();
  const barRef = useRef<HTMLDivElement>(null);

  // La barre peut passer sur 2 lignes : on mesure sa hauteur réelle et on
  // l'expose en variable CSS (`--bo-bar-height`). globals.css s'en sert pour
  // décaler le <body> et le <header> fixe → la barre ne recouvre jamais rien.
  useEffect(() => {
    const root = document.documentElement;
    if (!isAdmin || !barRef.current) {
      root.style.removeProperty("--bo-bar-height");
      return;
    }
    const el = barRef.current;
    const apply = () =>
      root.style.setProperty(
        "--bo-bar-height",
        `${Math.ceil(el.getBoundingClientRect().height)}px`,
      );
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--bo-bar-height");
    };
  }, [isAdmin]);

  if (!isAdmin) return null;

  const draftCount = Object.keys(drafts).length;

  const doSignOut = async () => {
    await signOut();
    toast.success("Déconnecté");
    window.location.href = "/";
  };

  return (
    <>
      <div
        ref={barRef}
        className="fixed top-0 inset-x-0 z-[200] shadow-[0_4px_18px_rgba(0,0,0,0.45)]"
        style={{
          background: "var(--bo-accent)",
          color: "var(--bo-accent-contrast)",
        }}
        role="region"
        aria-label="Barre d'édition admin"
      >
        <div className="max-w-[1600px] mx-auto px-4 py-2 flex items-center gap-3 text-sm">
          <Pencil className="w-4 h-4 flex-none" />
          <span className="font-medium hidden sm:inline">
            {enabled ? "Mode édition ACTIF" : "Mode édition désactivé"}
          </span>
          <button
            type="button"
            onClick={toggle}
            className="px-3 py-1 rounded text-xs font-semibold flex-none"
            style={{
              background: enabled
                ? "rgba(0,0,0,0.25)"
                : "var(--bo-accent-contrast)",
              color: enabled ? "var(--bo-accent-contrast)" : "var(--bo-accent)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            {enabled ? "Désactiver" : "Activer"}
          </button>

          {enabled && hasDrafts && (
            <span
              className="px-2.5 py-1 rounded text-xs font-semibold flex-none"
              style={{ background: "var(--bo-dark)", color: "var(--bo-dirty)" }}
            >
              {draftCount} modif{draftCount > 1 ? "s" : ""} non sauvegardée
              {draftCount > 1 ? "s" : ""}
            </span>
          )}

          <div className="flex-1" />

          <Link
            href="/admin/annonces"
            className="hidden md:inline text-xs opacity-80 hover:opacity-100 underline underline-offset-2 flex-none"
          >
            Annonces
          </Link>

          {enabled && hasDrafts && (
            <>
              <button
                type="button"
                onClick={cancel}
                disabled={publishing}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs hover:bg-black/20 disabled:opacity-40"
              >
                <X className="w-3.5 h-3.5" /> Annuler
              </button>
              <button
                type="button"
                onClick={publish}
                disabled={publishing}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded font-semibold text-sm disabled:opacity-50"
                style={{
                  background: "var(--bo-accent-contrast)",
                  color: "var(--bo-accent)",
                }}
              >
                {publishing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sauvegarde…
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Sauvegarder
                  </>
                )}
              </button>
            </>
          )}

          <span
            className="hidden md:inline text-xs opacity-80 flex-none truncate max-w-[180px]"
            title={user?.email ?? ""}
          >
            {user?.email}
          </span>
          <button
            type="button"
            onClick={doSignOut}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-black/20"
            aria-label="Se déconnecter"
          >
            <LogOut className="w-3.5 h-3.5" />{" "}
            <span className="hidden sm:inline">Quitter</span>
          </button>
        </div>
      </div>
    </>
  );
}
