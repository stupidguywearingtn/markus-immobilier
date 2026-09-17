/**
 * BIENS VENDUS — galerie parallaxe de la home (section bonus « Nos biens vendus »).
 *
 * ➜ Source réelle : table Supabase `sold_items`, gérée dans /admin/vendus
 *   (ajout, suppression, ordre, photo). Cette liste n'est plus qu'un REPLI,
 *   affiché si la base est injoignable (voir lib/content-db.ts).
 *
 * Le titre reprend le nom du fichier fourni par le client, remis en typographie
 * française (accents + noms de communes corrects) : « T3 - DECINES » →
 * « T3 — Décines ».
 */

export type SoldItem = {
  /** Présent quand le bien vient de la base (géré dans /admin/vendus). */
  id?: string;
  src: string;
  /** Titre affiché sur la vignette. */
  titre: string;
  /**
   * Accord du participe pour l'alt (« maison vendue » / « T3 vendu »).
   * Défaut : masculin.
   */
  feminin?: boolean;
};

export const SOLD_ITEMS: SoldItem[] = [
  { src: "/vendus/maison-5-pieces-meyzieu.jpeg", titre: "Maison 5 pièces — Meyzieu", feminin: true },
  { src: "/vendus/t3-decines.jpeg", titre: "T3 — Décines" },
  { src: "/vendus/t4-bron.jpeg", titre: "T4 — Bron" },
  { src: "/vendus/maison-6-pieces-jonage.jpeg", titre: "Maison 6 pièces — Jonage", feminin: true },
  { src: "/vendus/t2-meyzieu.jpeg", titre: "T2 — Meyzieu" },
  { src: "/vendus/t3-meyzieu.jpeg", titre: "T3 — Meyzieu" },
  { src: "/vendus/maison-5-pieces-vaulx-en-velin.jpeg", titre: "Maison 5 pièces — Vaulx-en-Velin", feminin: true },
  { src: "/vendus/t4-meyzieu.jpeg", titre: "T4 — Meyzieu" },
  { src: "/vendus/t3-meyzieu-2.jpeg", titre: "T3 — Meyzieu" },
];

/** Alt SEO : « <titre> vendu(e) par Markus Immobilier ». */
export function soldAlt(item: SoldItem): string {
  return `${item.titre} ${item.feminin ? "vendue" : "vendu"} par Markus Immobilier`;
}
