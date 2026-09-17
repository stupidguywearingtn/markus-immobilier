export type TeamMember = {
  /** Présent quand le membre vient de la base (géré dans /admin/equipe). */
  id?: string;
  prenom: string;
  nom: string;
  label?: string; // optionnel — badge au-dessus du poste (ex. "FONDATEUR")
  poste: string;
  /** Courte bio affichée sous le nom (éditable en ligne). */
  bio?: string;
  email: string;
  telephone: string;
  /** Chemin photo public (peut être null si pas encore livrée → placeholder initiales) */
  photo?: string | null;
  /** Couleur de fond du placeholder quand pas de photo */
  avatarTone: "anthracite" | "sauge" | "warm" | "cool";
};

/**
 * Équipe Markus Immobilier — REPLI statique.
 * Source réelle : table Supabase `team_members`, gérée dans /admin/equipe
 * (ajouter / modifier / supprimer / réordonner un collaborateur). Cette liste
 * n'est affichée que si la base est injoignable (voir lib/content-db.ts).
 */
export const TEAM: TeamMember[] = [
  {
    prenom: "Tony",
    nom: "PISTILLI",
    label: "Fondateur",
    poste: "CEO – Agent immobilier",
    bio: "Fondateur de Markus Immobilier, Tony pilote l'agence et accompagne vendeurs comme acquéreurs sur Villeurbanne et Lyon, de l'estimation à la signature.",
    email: "tony.pistilli@markusimmobilier.fr",
    telephone: "06 81 78 77 40",
    photo: "/TONYPISTILLY.png",
    avatarTone: "anthracite",
  },
  {
    prenom: "David",
    nom: "PISTILLI",
    poste: "Conseiller en immobilier",
    bio: "Conseiller en immobilier, David suit chaque projet de la première visite jusqu'au rendez-vous chez le notaire, avec le sens du détail et de la réactivité.",
    email: "david.pistilli@markusimmobilier.fr",
    telephone: "06 65 78 01 11",
    photo: null,
    avatarTone: "sauge",
  },
];
