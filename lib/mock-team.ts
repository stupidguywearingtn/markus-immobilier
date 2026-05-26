export type TeamMember = {
  prenom: string;
  nom: string;
  poste: string;
  email: string;
  telephone: string;
  /** Couleur de fond du placeholder avatar — choisie parmi nos tons */
  avatarTone: "anthracite" | "sauge" | "warm" | "cool";
};

/**
 * Mock — à remplacer par data réelle dès que le client envoie l'équipe.
 * Chaque membre : photo (placeholder), poste, nom, prénom, mail, tél (cliquables).
 */
export const TEAM: TeamMember[] = [
  {
    prenom: "Markus",
    nom: "Iordachescu",
    poste: "Fondateur · Directeur",
    email: "markus@markusimmobilier.fr",
    telephone: "04 78 37 13 67",
    avatarTone: "anthracite",
  },
  {
    prenom: "Camille",
    nom: "Berthier",
    poste: "Responsable Transaction",
    email: "camille@markusimmobilier.fr",
    telephone: "04 78 37 13 67",
    avatarTone: "sauge",
  },
  {
    prenom: "Thomas",
    nom: "Lefèvre",
    poste: "Conseiller en immobilier",
    email: "thomas@markusimmobilier.fr",
    telephone: "04 78 37 13 67",
    avatarTone: "warm",
  },
  {
    prenom: "Sophie",
    nom: "Garnier",
    poste: "Conseillère en immobilier",
    email: "sophie@markusimmobilier.fr",
    telephone: "04 78 37 13 67",
    avatarTone: "cool",
  },
  {
    prenom: "Karim",
    nom: "Benyahia",
    poste: "Gestion locative",
    email: "karim@markusimmobilier.fr",
    telephone: "04 78 37 13 67",
    avatarTone: "anthracite",
  },
  {
    prenom: "Léa",
    nom: "Dumont",
    poste: "Assistante Syndic",
    email: "lea@markusimmobilier.fr",
    telephone: "04 78 37 13 67",
    avatarTone: "sauge",
  },
];
