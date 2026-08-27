"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import {
  ListingForm,
  type ListingFormInitial,
} from "@/components/admin/listing-form";

export default function EditListingPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [row, setRow] = useState<ListingFormInitial | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!alive) return;
      if (error || !data) setRow(null);
      else setRow(data as ListingFormInitial);
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  return (
    <>
      <Link
        href="/admin/annonces"
        className="inline-flex items-center gap-1.5 text-sm text-[#7a817f] hover:text-anthracite mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Toutes les annonces
      </Link>
      <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.01em] mb-6">
        Modifier l&apos;annonce
      </h1>

      {row === undefined && (
        <div className="grid place-items-center py-20 text-[#7a817f]">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}
      {row === null && (
        <div className="bg-white rounded-2xl p-10 text-center text-[#7a817f]">
          Annonce introuvable.
        </div>
      )}
      {row && <ListingForm listingId={id} mode="edit" initial={row} />}
    </>
  );
}
