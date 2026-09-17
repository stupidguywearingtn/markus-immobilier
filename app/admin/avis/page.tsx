"use client";

import { CrudPage, type Row } from "@/components/admin/crud-page";
import { frDate } from "@/lib/reviews";

/** Avis clients : tout est modifiable — auteur, date, note, texte, ordre. */
export default function AdminAvisPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <CrudPage
      table="reviews"
      title="Avis clients"
      subtitle="Les témoignages affichés sur l'accueil. Recopiez les avis réels reçus (Google, e-mail…) : auteur, date et texte sont libres."
      addLabel="Ajouter un avis"
      emptyLabel="Aucun avis pour le moment."
      itemLabel={(r) => `l'avis de ${r.auteur}`}
      defaults={{ auteur: "", date_avis: today, note: 5, texte: "" }}
      fields={[
        { key: "auteur", label: "Nom affiché", type: "text", required: true, placeholder: "Ex. Roger G.", hint: "Prénom + initiale du nom, comme sur Google." },
        { key: "date_avis", label: "Date de l'avis", type: "date", required: true },
        { key: "note", label: "Note", type: "stars", required: true },
        { key: "texte", label: "Texte de l'avis", type: "textarea", required: true, placeholder: "Le texte exact laissé par le client." },
      ]}
      renderRow={(r: Row) => ({
        thumb: (
          <div className="w-11 h-11 rounded-full bg-sauge/15 text-sauge grid place-items-center text-sm font-bold shrink-0">
            {Number(r.note) || 5}★
          </div>
        ),
        title: String(r.auteur),
        meta: `${frDate(String(r.date_avis))} · ${String(r.texte ?? "")}`,
      })}
    />
  );
}
