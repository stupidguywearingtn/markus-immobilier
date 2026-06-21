export type TeamMember = {
  prenom: string;
  nom: string;
  label?: string; // optionnel — badge au-dessus du poste (ex. "FONDATEUR")
  poste: string;
  email: string;
  telephone: string;
  /** Chemin photo public (peut être null si pas encore livrée → placeholder initiales) */
  photo?: string | null;
  /** Couleur de fond du placeholder quand pas de photo */
  avatarTone: "anthracite" | "sauge" | "warm" | "cool";
};

/**
 * Équipe réelle Markus Immobilier.
 * Placez les photos manquantes dans /public/equipe/ et renseignez `photo`.
 */
export const TEAM: TeamMember[] = [
  {
    prenom: "Tony",
    nom: "PISTILLI",
    label: "Fondateur",
    poste: "CEO – Agent immobilier",
    email: "tony.pistilli@markusimmobilier.fr",
    telephone: "06 81 78 77 40",
    // Déposer la nouvelle photo de Tony ici : public/equipe/tony-pistilli.jpg
    photo: "/equipe/tony-pistilli.jpg",
    avatarTone: "anthracite",
  },
  {
    prenom: "David",
    nom: "PISTILLI",
    poste: "Conseiller en immobilier",
    email: "david.pistilli@markusimmobilier.fr",
    telephone: "06 65 78 01 11",
    photo: null,
    avatarTone: "sauge",
  },
];
