"use client";

import { CrudPage, type Row } from "@/components/admin/crud-page";

/** Équipe : ajouter / modifier / supprimer / réordonner un collaborateur. */
export default function AdminEquipePage() {
  return (
    <CrudPage
      table="team_members"
      title="Équipe"
      subtitle="Les collaborateurs affichés sur l'accueil et sur la page Notre équipe. L'ordre de la liste est l'ordre du site."
      addLabel="Ajouter un collaborateur"
      emptyLabel="Aucun collaborateur pour le moment."
      itemLabel={(r) => `${r.prenom} ${r.nom}`}
      defaults={{ prenom: "", nom: "", poste: "", badge: null, bio: "", email: "", telephone: "", photo_url: null }}
      fields={[
        { key: "photo_url", label: "Photo", type: "photo", folder: "equipe", ratio: "4/5", hint: "Portrait vertical de préférence. Sans photo, les initiales s'affichent." },
        { key: "prenom", label: "Prénom", type: "text", required: true, placeholder: "Ex. Julie" },
        { key: "nom", label: "Nom", type: "text", required: true, placeholder: "Ex. MARTIN" },
        { key: "poste", label: "Poste", type: "text", required: true, placeholder: "Conseiller en immobilier" },
        { key: "badge", label: "Badge (optionnel)", type: "text", placeholder: "Fondateur", hint: "Petite pastille sur la photo. Laisser vide pour aucune." },
        { key: "email", label: "E-mail", type: "email", placeholder: "prenom.nom@markusimmobilier.fr" },
        { key: "telephone", label: "Téléphone", type: "tel", placeholder: "06 00 00 00 00" },
        { key: "bio", label: "Présentation", type: "textarea", placeholder: "Deux phrases sur son rôle et son expérience." },
      ]}
      renderRow={(r: Row) => ({
        thumb: <Avatar url={r.photo_url as string | null} initials={`${String(r.prenom ?? "")[0] ?? ""}${String(r.nom ?? "")[0] ?? ""}`} />,
        title: `${r.prenom} ${r.nom}`,
        meta: [r.poste, r.telephone].filter(Boolean).join(" · "),
      })}
    />
  );
}

function Avatar({ url, initials }: { url: string | null; initials: string }) {
  return (
    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-anthracite text-white grid place-items-center text-sm font-bold shrink-0">
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="absolute inset-0 w-full h-full object-cover object-[center_20%]" />
      ) : (
        initials
      )}
    </div>
  );
}
