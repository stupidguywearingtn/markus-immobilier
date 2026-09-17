/**
 * AVIS CLIENTS — type partagé + repli statique.
 *
 * La source réelle est la table Supabase `reviews` (éditable dans
 * /admin/avis). Cette liste ne sert que si la base est injoignable ou si la
 * migration 0003 n'a pas encore été appliquée : le site ne se retrouve jamais
 * sans avis à cause d'une panne.
 */
export type Review = {
  id?: string;
  name: string;
  /** Format affiché « JJ/MM/AAAA ». */
  date: string;
  stars: number;
  text: string;
};

export const REVIEWS_FALLBACK: Review[] = [
  {
    name: "Andrée P.",
    date: "19/05/2020",
    stars: 5,
    text: "Équipe très dynamique… Connaît bien le terrain et cible parfaitement sa clientèle. Merci à Monsieur Pistilli qui s'est investi à 100 % pour la vente de mon appartement. Bravo à vous tous.",
  },
  {
    name: "Roger G.",
    date: "28/09/2021",
    stars: 5,
    text: "Tony a mené d'une main de maître un doublé : la vente d'une maison et l'achat d'un appartement. Nous avons été suivis, accompagnés et très bien conseillés du premier jour jusqu'à la signature chez le notaire.",
  },
  {
    name: "Didier & Béatrice F.",
    date: "07/05/2021",
    stars: 5,
    text: "Écoute, disponibilité, réactivité, et surtout un conseiller extrêmement compétent qui a traité notre dossier de bout en bout avec exemplarité. Les services de Tony Pistilli sont à la fois de qualité et différenciants. Encore merci !",
  },
];

/** « 2021-09-28 » → « 28/09/2021 ». Laisse passer toute autre forme telle quelle. */
export function frDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso;
}
