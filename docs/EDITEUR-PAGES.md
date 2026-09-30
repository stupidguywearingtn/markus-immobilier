# Éditeur de pages (sections glisser-déposer)

Le client modifie ses pages comme sur Wix / Shopify : ajouter, déplacer, dupliquer ou supprimer des sections, modifier les textes directement dans l'aperçu, changer les photos, créer de nouvelles pages. Moteur : [Puck](https://puckeditor.com) (MIT, open source), données dans Supabase.

## Mise en route (une fois)
1. Supabase → SQL Editor → coller et exécuter `supabase/migrations/0004_pages.sql`.
2. `npm install` (ajoute `@puckeditor/core`).
3. Se connecter en admin → barre admin → **Pages & sections** (ou `/admin/pages`).

Tant que l'accueil n'est pas publié depuis l'éditeur, le site affiche l'accueil codé : exécuter la migration ne change rien pour les visiteurs.

## Ce que le client peut faire
- **Accueil** : réordonner / retirer / ajouter des sections autour des sections maison (Hero, Biens, Qui sommes-nous, Équipe, Vendus, Estimation, Avis, FAQ, Réseaux, Agence).
- **Nouvelles pages** à l'adresse `markusimmobilier.fr/<adresse>`, à partir d'un modèle (service, campagne, texte, vide).
- 15 sections libres : Bandeau d'ouverture (H1), Titre, Texte + photo, Texte libre, Chiffres animés, Cartes, Étapes, FAQ (+ JSON-LD FAQPage), Témoignage, Grande photo, Galerie, Vidéo, Appel à l'action, Formulaire de contact, Espace.
- Aperçu mobile / tablette / ordinateur, annuler / rétablir, brouillon enregistré tout seul, **Publier**, **Historique** (retour à une version publiée), réglages Google par page (titre, description, visible ou non).

## Garde-fous
- Pas de couleur, police ni taille libre : fonds blanc / gris / anthracite, boutons de la charte, typo et animations imposées.
- Pages protégées (hors éditeur) : estimation, annonces, blog, pages quartiers, pages SEO. Leurs adresses sont réservées (`lib/page-builder/slugs.ts`).
- Le visiteur ne voit jamais un brouillon (table `site_page_drafts` admin-only).
- Rendu public 100 % serveur (`@puckeditor/core/rsc`) : HTML complet pour Google, l'éditeur n'est pas envoyé aux visiteurs.

## Fichiers
- `lib/page-builder/definitions.tsx` — sections, champs, contenus par défaut (source unique).
- `lib/page-builder/config.client.tsx` / `config.server.tsx` — rendu éditeur / rendu public.
- `components/page-builder/blocks.tsx` — les sections libres (charte Markus).
- `components/page-builder/page-editor.tsx` — l'éditeur (brouillon auto, publier, historique).
- `components/page-builder/pages-list.tsx` — `/admin/pages`.
- `app/[slug]/page.tsx` — pages créées ; `app/page.tsx` — accueil (éditeur si publié, sinon codé).
- `app/api/admin/pages/revalidate` — vide le cache à la publication (admin vérifié).

## Ajouter une nouvelle section (dev)
1. Composant dans `components/page-builder/blocks.tsx` (props → HTML, pas de données).
2. Définition (label, champs, défauts) dans `DEFINITIONS` + catégorie dans `CATEGORIES`.
3. L'ajouter aux deux tables de rendu (`config.client.tsx`, `config.server.tsx`).
