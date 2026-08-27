"use client";

import Link from "next/link";
import { KeyRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEditMode } from "@/hooks/useEditMode";

/**
 * Bouton « Espace pro » dans la nav.
 * - admin connecté  -> bascule le mode édition
 * - sinon           -> lien vers /signin
 */
export function ProButton({ className = "" }: { className?: string }) {
  const { isAdmin } = useAuth();
  const { enabled, toggle } = useEditMode();

  if (isAdmin) {
    return (
      <button
        type="button"
        onClick={toggle}
        title={enabled ? "Désactiver l'édition" : "Activer l'édition"}
        aria-pressed={enabled}
        className={`w-[34px] h-[34px] grid place-items-center rounded-full border transition ${className}`}
        style={{
          background: enabled ? "var(--color-sauge)" : "transparent",
          borderColor: enabled
            ? "var(--color-sauge)"
            : "rgba(255,255,255,0.4)",
          color: enabled ? "var(--color-blanc)" : "inherit",
        }}
      >
        <KeyRound className="w-4 h-4" />
      </button>
    );
  }

  return (
    <Link
      href="/signin"
      title="Espace pro"
      aria-label="Espace pro"
      className={`w-[34px] h-[34px] grid place-items-center rounded-full border border-white/40 opacity-60 hover:opacity-100 hover:border-sauge transition ${className}`}
    >
      <KeyRound className="w-4 h-4" />
    </Link>
  );
}
