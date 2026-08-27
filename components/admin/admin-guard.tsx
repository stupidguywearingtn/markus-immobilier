"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

/**
 * Garde d'accès admin pour les pages /admin/*.
 * - chargement -> spinner
 * - non admin  -> redirection /signin
 * - admin      -> contenu
 */
export function AdminGuard({ children }: { children: ReactNode }) {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace("/signin?from=/admin/annonces");
    }
  }, [loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-[#7a817f]">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-[#7a817f] text-sm">
        Accès réservé — redirection…
      </div>
    );
  }
  return <>{children}</>;
}
