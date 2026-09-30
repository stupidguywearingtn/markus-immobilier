"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SITE_ID } from "@/lib/backoffice/config";

/**
 * Raccourci « Modifier les sections » de la barre admin : retrouve la page
 * par son adresse et ouvre directement son éditeur (crée l'accueil au besoin).
 */
function Ouvrir() {
  const router = useRouter();
  const params = useSearchParams();
  const { isAdmin, loading } = useAuth();
  const slug = params.get("slug") ?? "";

  useEffect(() => {
    if (loading) return;
    if (!isAdmin) {
      router.replace(`/signin?from=${encodeURIComponent(`/admin/pages/ouvrir?slug=${slug}`)}`);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("site_pages")
        .select("id")
        .eq("site_id", SITE_ID)
        .eq("slug", slug)
        .maybeSingle();
      let id = data?.id as string | undefined;
      if (!id && slug === "") {
        const { data: created } = await supabase
          .from("site_pages")
          .insert({ site_id: SITE_ID, slug: "", titre: "Accueil" })
          .select("id")
          .single();
        id = created?.id as string | undefined;
      }
      if (id) router.replace(`/admin/pages/${id}`);
      else {
        toast.error("Cette page ne se modifie pas dans l'éditeur de sections");
        router.replace("/admin/pages");
      }
    })();
  }, [loading, isAdmin, router, slug]);

  return (
    <div className="min-h-screen grid place-items-center text-[#7a817f]">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  );
}

export default function OuvrirPage() {
  return (
    <Suspense>
      <Ouvrir />
    </Suspense>
  );
}
