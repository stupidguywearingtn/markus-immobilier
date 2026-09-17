"use client";

import { CrudPage, type Row } from "@/components/admin/crud-page";

/** Biens vendus : la galerie « Nos biens vendus » de l'accueil. */
export default function AdminVendusPage() {
  return (
    <CrudPage
      table="sold_items"
      title="Biens vendus"
      subtitle="Les vignettes « Vendu » de la galerie de l'accueil. Une photo + un titre court suffisent."
      addLabel="Ajouter un bien vendu"
      emptyLabel="Aucun bien vendu pour le moment."
      itemLabel={(r) => `« ${r.titre} »`}
      defaults={{ titre: "", photo_url: null, feminin: false }}
      fields={[
        { key: "photo_url", label: "Photo", type: "photo", folder: "vendus", ratio: "3/2", required: true, hint: "Format paysage de préférence (la vignette est en 3:2)." },
        { key: "titre", label: "Titre", type: "text", required: true, placeholder: "T3 — Villeurbanne", hint: "Type de bien — commune. Ex. « Maison 5 pièces — Meyzieu »." },
        { key: "feminin", label: "Nom féminin (« maison vendue » plutôt que « vendu »)", type: "toggle", hint: "Sert au texte alternatif de la photo, pour Google." },
      ]}
      renderRow={(r: Row) => ({
        thumb: (
          <div className="relative w-16 aspect-[3/2] rounded-lg overflow-hidden bg-gris shrink-0">
            {typeof r.photo_url === "string" && r.photo_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={r.photo_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
            )}
          </div>
        ),
        title: String(r.titre),
      })}
    />
  );
}
