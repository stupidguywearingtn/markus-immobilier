# Back-office éditable — mise en route (étape par étape)

Le code est déjà en place (branche `feat/backoffice-supabase`). Il reste **la
configuration Supabase**, qui ne peut pas être faite depuis le code. Suis les
étapes dans l'ordre. Compte ~15 min.

Tant que les variables `NEXT_PUBLIC_SUPABASE_*` valent le placeholder, **le site
public fonctionne normalement** — seul le back-office est inactif.

---

## 1. Créer le projet Supabase

1. Va sur [supabase.com](https://supabase.com) → **New project**.
   - Nom : `markus-immobilier` (ou ce que tu veux).
   - **Database password** : génère-le et note-le dans ton gestionnaire de mots de passe.
   - Region : `West EU (Paris)` ou `Frankfurt`.
2. Attends la fin de l'initialisation (~2 min).
3. **Project Settings → API** : récupère et garde sous la main :
   - **Project URL** → ressemble à `https://abcdefgh.supabase.co`
   - **Project API keys → `anon` `public`** → longue chaîne `eyJhbGciOi...`
     (c'est une clé publique, elle peut vivre côté navigateur — la sécurité vient des règles RLS).

---

## 2. Exécuter les 2 migrations SQL

Dans Supabase → **SQL Editor** → **New query**.

1. Ouvre le fichier **`supabase/migrations/0001_backoffice.sql`** du repo, copie
   **tout** son contenu, colle dans l'éditeur, clique **Run**.
   → crée : rôles (`user_roles`, `has_role`), table de contenu éditable
   (`site_content_fields`), bucket d'images `site-images`, et toutes les règles RLS.
2. Nouvelle query. Ouvre **`supabase/migrations/0002_listings.sql`**, copie
   tout, colle, **Run**.
   → crée : table `listings` (annonces), bucket `listings` (photos), RLS.

Si une commande renvoie « already exists », ce n'est pas grave (les scripts sont
ré-exécutables).

---

## 3. Créer le compte admin

1. Supabase → **Authentication → Users → Add user** :
   - **Email** : ton email (ex. `villeurbanne@markusimmobilier.fr`).
   - **Password** : choisis-en un solide.
   - **coche `Auto Confirm User`** (sinon il faut valider un email).
   - Create user.
2. Clique sur l'utilisateur créé, copie son **UID** (UUID sous le nom).
3. Retour dans **SQL Editor**, exécute (remplace l'UID) :

   ```sql
   insert into public.user_roles (user_id, role)
   values ('COLLE-L-UID-ICI', 'admin')
   on conflict (user_id, role) do nothing;
   ```

4. Vérifie :

   ```sql
   select public.has_role('COLLE-L-UID-ICI', 'admin');  -- doit renvoyer true
   ```

Pour ajouter un autre admin plus tard : refais l'étape 3 (Add user + ligne
`user_roles`). Il n'y a **pas** de création de compte publique, c'est voulu.

---

## 4. Variables d'environnement

### En local (`.env.local` à la racine)

Remplace les 2 lignes placeholder par tes vraies valeurs :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Puis relance `npm run dev`.

### Sur Vercel (projet `markus-immobilier`)

**Settings → Environment Variables** → ajoute les 2 mêmes clés
(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`), pour les
environnements **Production** + **Preview**. Redéploie.

---

## 5. Fusionner la branche

```bash
git checkout main
git merge feat/backoffice-supabase
git push
```

(ou ouvre une PR `feat/backoffice-supabase` → `main` sur GitHub et merge-la.)

---

## 6. Tester

### Édition inline (textes / images de la home)

1. Sur le site, en haut à droite du header : icône **clé** → page `/signin`.
2. Connecte-toi avec le compte admin.
3. Une **barre foncée** apparaît en haut de toutes les pages → clique **Activer**.
4. Survole un titre / eyebrow / le paragraphe « Qui sommes-nous » / la photo de
   l'agence : un contour sauge + un crayon apparaissent.
   - **Texte** : clic → tape → `Entrée` valide (`Échap` annule).
   - **Image** : clic → « Remplacer » → upload d'un fichier ou colle une URL.
5. La barre affiche « N modifs non sauvegardées ». Clique **Sauvegarder** →
   toast « Modifications publiées ».
6. Ouvre le site dans une fenêtre privée (déconnecté) : le nouveau texte est là,
   et présent dans le **code source** de la page (bon pour le SEO).
7. **Annuler** jette les brouillons non publiés. **Quitter** déconnecte.

> Champs éditables sur la home (volontairement limité) : les sur-titres (eyebrow)
> de chaque section, les titres « Aperçu / Nos biens disponibles » et « À propos /
> Qui sommes-nous », le 1er paragraphe de « Qui sommes-nous », la photo de
> l'agence, les sous-titres d'estimation et d'avis. Les titres avec un mot en
> dégradé restent figés (le dégradé ne survivrait pas à l'édition texte). Pour en
> ajouter, voir la recette dans `docs/superpowers/specs/2026-08-27-backoffice-inline-edit-design.md` §8.

### Créer une annonce

1. Barre d'édition → lien **Annonces** (ou va sur `/admin/annonces`).
2. **Nouvelle annonce** → formulaire en 4 étapes :
   1. Type, transaction (vente/location), titre, « mise en avant ».
   2. Prix, adresse, quartier, ville, code postal, surface, pièces.
   3. Description, atouts (Entrée pour ajouter), DPE/GES.
   4. Photos : ajoute plusieurs fichiers, réordonne avec ↑/↓, renseigne le texte
      alternatif (SEO). La 1re photo = vignette.
3. **Enregistrer le brouillon** → l'annonce n'est **pas** visible du public.
4. Quand elle est prête : **Publier** → elle apparaît sous ~1 min sur `/annonces`,
   `/annonces/<slug>`, la section « Nos biens disponibles » de l'accueil et le
   `sitemap.xml`.
5. Depuis la liste `/admin/annonces` : **Éditer**, **Dépublier**, **Supprimer**.

> Les 4 annonces historiques (`lib/listings.ts`) restent gérées dans le code et
> sont prioritaires en cas de slug identique. Les annonces créées ici vivent
> uniquement dans Supabase.

---

## Dépannage

| Symptôme | Cause / correctif |
|---|---|
| Pas de barre d'édition après connexion | La ligne `user_roles` (rôle `admin`) manque ou l'UID est faux. Rejoue l'étape 3 et le `select has_role(...)`. |
| « permission denied for function has_role » | Le `grant execute ... to anon, authenticated` du `0001` n'a pas été exécuté. Relance tout le `0001`. |
| Connexion refusée alors que le mot de passe est bon | L'utilisateur n'est pas *confirmé* : Authentication → Users → l'utilisateur → **Confirm user**. |
| Upload d'image en erreur | Le bucket `site-images` (ou `listings`) n'existe pas → relance la migration correspondante. |
| Image uploadée qui ne s'affiche pas (`next/image`) | Le domaine Supabase n'est pas autorisé. Il l'est via `next.config.ts` (`*.supabase.co`) — vérifie que le redeploy a bien pris la nouvelle config. |
| Une annonce publiée n'apparaît pas tout de suite | Cache ISR de 60 s. Attends ~1 min ou redéploie. |
| Le back-office ne fait rien / console : « NEXT_PUBLIC_SUPABASE_… manquants » | Les variables d'env ne sont pas posées (local et/ou Vercel). Étape 4. |

---

## Notes de sécurité

- L'`anon key` est publique **par design**. Toute écriture passe par les règles
  RLS : il faut une **session Supabase valide** ET une **ligne `user_roles` `admin`**.
- Les pages `/admin/*` sont aussi bloquées dans `robots.txt`.
- Suppression définitive possible plus tard : dossier `/studio/` (Sanity, inerte)
  et lignes `NEXT_PUBLIC_SANITY_*` / `SANITY_API_READ_TOKEN` dans `.env.local`.
