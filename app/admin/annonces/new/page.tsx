"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ListingForm } from "@/components/admin/listing-form";

export default function NewListingPage() {
  // uuid généré côté client : sert de préfixe d'upload ET d'id de ligne.
  const [id] = useState(() => crypto.randomUUID());

  return (
    <>
      <Link
        href="/admin/annonces"
        className="inline-flex items-center gap-1.5 text-sm text-[#7a817f] hover:text-anthracite mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Toutes les annonces
      </Link>
      <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.01em] mb-6">
        Nouvelle annonce
      </h1>
      <ListingForm listingId={id} mode="new" />
    </>
  );
}
