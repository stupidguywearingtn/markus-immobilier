"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AdminGuard } from "@/components/admin/admin-guard";

/** Onglets du back-office : une entrée par contenu géré en liste. */
const TABS = [
  { href: "/admin/annonces", label: "Annonces" },
  { href: "/admin/equipe", label: "Équipe" },
  { href: "/admin/avis", label: "Avis clients" },
  { href: "/admin/vendus", label: "Biens vendus" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gris pt-[120px] pb-24 px-6 max-md:px-4">
      <div className="max-w-[900px] mx-auto">
        <AdminGuard>
          <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
            <nav
              aria-label="Back-office"
              className="flex gap-1 bg-white rounded-full p-1 overflow-x-auto max-w-full"
            >
              {TABS.map((t) => {
                const active = pathname?.startsWith(t.href);
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={`px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition ${
                      active ? "bg-anthracite text-white" : "text-[#5a6166] hover:bg-gris"
                    }`}
                  >
                    {t.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-[#7a817f] hover:text-anthracite"
            >
              <ArrowLeft className="w-4 h-4" /> Retour au site
            </Link>
          </div>
          {children}
        </AdminGuard>
      </div>
    </div>
  );
}
