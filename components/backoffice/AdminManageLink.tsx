"use client";

import Link from "next/link";
import { Settings2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

/**
 * Raccourci visible UNIQUEMENT par l'admin connecté : posé sur une section
 * gérée en liste (équipe, avis, biens vendus), il ouvre directement la page
 * d'administration correspondante. Rien n'est rendu pour un visiteur.
 */
export function AdminManageLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return null;
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-[0.08em] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.45)] hover:opacity-90 transition pointer-events-auto ${className}`}
      style={{ background: "var(--bo-accent)", color: "var(--bo-accent-contrast)" }}
    >
      <Settings2 className="w-3.5 h-3.5" />
      {label}
    </Link>
  );
}
