# Spec — Back-office éditable « à la Wix » (sous-projet A : édition inline + fondations)

> Date : 2026-08-27
> Statut : validé pour implémentation
> Suite : sous-projet B (`2026-08-27-backoffice-annonces-design.md`), à faire après A.

## 1. Objectif

Permettre à un admin connecté d'activer un **mode édition** sur le site public,
de cliquer directement sur les **textes importants** et les **images** pour les
modifier, d'accumuler des brouillons, puis de **publier tout d'un coup**. Le
public voit toujours la dernière version publiée (rendue côté serveur pour le
SEO), avec repli sur un texte codé en dur.

Ce sous-projet livre : la base Supabase, l'auth, le mode édition, les composants
`Editable*`, la barre d'édition, la page `/signin`, le **retrait de Sanity**, et
la **Home câblée en référence**.

## 2. Décisions cadre (validées)

| Sujet | Décision |
|---|---|
| Sanity | **Retiré.** Ce système le remplace. `/studio/` laissé inerte sur le disque (déjà hors `tsconfig`), suppression définitive dans un second temps. |
| Auth | **Supabase Auth complète** : comptes email/mot de passe, table `user_roles`, page `/signin`, pas de création de compte public. |
| Rendu | Valeurs **publiées lues côté serveur** (HTML initial correct, pas de flash). Brouillons + UI d'édition côté client. |
| Périmètre éditable | **Textes importants uniquement** : eyebrows, H2 de section, sous-titres, quelques paragraphes clés, images clés. **Exclus** : blog, FAQ, mentions légales, cartes de biens (données), formulaires. |
| Périmètre livraison | Fondations + **Home** câblée comme exemple de référence + recette documentée. |
| Dépendances ajoutées | `@supabase/supabase-js` (requis), `lucide-react` (icônes), `sonner` (toasts, langage « action complétée » du design-system). Modale « Remplacer l'image » faite maison (pas de primitive Dialog dans le projet). |

## 3. Résolution d'une valeur

```
brouillon en cours (si mode édition actif)  >  valeur publiée en base  >  fallback codé en dur
```

- **Un seul point de lecture serveur** : `getPublishedFields()` est appelé **une seule fois**, dans `app/layout.tsx`, et la map est injectée dans `<EditModeProvider publishedFields={…}>`.
- **Tout le reste passe par `useV()`** (client). Les composants de section qui portent un champ éditable deviennent des **Client Components** (`"use client"`) et lisent leurs valeurs via `useV()`. Le contexte du provider est peuplé pendant le rendu serveur → le HTML initial contient déjà la bonne valeur publiée (pas de flash, SEO préservé).
- Raison : `EditableImage` prend une **render-prop** (`children: (url) => ReactNode`, une fonction) — non sérialisable, donc impossible à passer d'un Server Component à un Client Component. On ne fait donc **aucun** prop-drilling serveur→client de valeurs ; on centralise dans le provider + `useV()`.
- Pendant le SSR, `isAdmin` est `false` (session Supabase pas encore résolue) → les `Editable*` rendent le chemin nu `<Tag>{value}</Tag>` avec `value` issue de `useV()` = map publiée. Correct.

## 4. Base de données — migration `supabase/migrations/0001_backoffice.sql`

Contenu (repris du guide, tel quel) :

- `type public.app_role as enum ('admin','user')`.
- Table `public.user_roles (id, user_id → auth.users, role, created_at, unique(user_id, role))`, RLS activée.
- Fonction `public.has_role(_user_id uuid, _role app_role) returns boolean` — `language sql stable security definer set search_path = public`.
- **`grant execute on function public.has_role(uuid, public.app_role) to anon, authenticated;`** (obligatoire — sinon `isAdmin` reste `false`, erreur 42501).
- Policies `user_roles` : lecture par soi-même ou admin ; gestion réservée admin.
- Fonction `public.touch_updated_at()` (trigger générique `updated_at`).
- `type public.content_type as enum ('text','image','richtext')`.
- Table `public.site_content_fields (id, site_id uuid, section_key text, field_key text, content_type default 'text', content_value text, updated_at, unique(site_id, section_key, field_key))` + index sur `site_id`.
- Policies : `scf public read` (`using (true)`) ; `scf admin write` (`for all using/with check has_role(auth.uid(),'admin')`).
- Trigger `scf_touch before update`.
- Bucket storage `site-images` (public) + policies : lecture publique, insert/update/delete réservés `has_role(auth.uid(),'admin')`.

### `SITE_ID`

Constante fixe partagée : `lib/backoffice/config.ts`

```ts
export const SITE_ID = "11111111-1111-1111-1111-111111111111"; // UUID figé, à ne jamais changer
```

Aucune ligne à insérer : une ligne apparaît au premier « Sauvegarder » d'un
champ. Tant qu'aucune ligne n'existe, le fallback s'affiche.

### Compte admin (procédure documentée dans la spec + README)

1. Supabase → Authentication → Users → Add user (email + mot de passe, *Auto Confirm*).
2. Copier l'UID.
3. SQL : `insert into public.user_roles (user_id, role) values ('<UID>', 'admin') on conflict do nothing;`
4. Vérif : `select public.has_role('<UID>', 'admin');` → `true`.

## 5. Variables d'environnement

`.env.local` (et Vercel) — nouvelles clés :

```
NEXT_PUBLIC_SUPABASE_URL="https://<ref>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<clé publishable>"
```

Anciennes clés Sanity (`NEXT_PUBLIC_SANITY_*`, `SANITY_API_READ_TOKEN`) :
laissées dans `.env.local` mais **plus lues** ; à retirer au nettoyage final.

## 6. Fichiers à créer / modifier

### 6.1 Client & lecture

| Fichier | Rôle |
|---|---|
| `lib/supabase/client.ts` | client navigateur singleton. `createClient(URL, ANON_KEY, { auth: { storage: typeof window!=="undefined" ? window.localStorage : undefined, persistSession: true, autoRefreshToken: true } })`. Jette si env manquantes. |
| `lib/supabase/content.ts` | **serveur**. `getPublishedFields(): Promise<Record<string,string>>` — `select section_key, field_key, content_value from site_content_fields where site_id = SITE_ID`. Renvoie une map `` `${section}.${field}` `` → valeur. `next: { revalidate: 60 }`. Ne jette jamais (catch → `{}`). Utilise un client serveur léger (`createClient` avec l'anon key, sans storage). |
| `lib/backoffice/config.ts` | `SITE_ID`. |

### 6.2 Hooks (tous `"use client"`)

| Fichier | Rôle |
|---|---|
| `hooks/useAuth.tsx` | Contexte. `user`, `session`, `isAdmin`, `loading`, `signOut`. `onAuthStateChange` + `getSession`. `isAdmin` via `select` sur `user_roles` (`.eq('role','admin').maybeSingle()`), appel **déféré** (`setTimeout(…,0)`) dans le callback. |
| `hooks/useEditMode.tsx` | Contexte `<EditModeProvider siteId publishedFields onPublished>`. État `enabled` (effectif = `enabled && isAdmin`), `drafts: Record<string,{value,type}>`, `setDraft`, `getDraft`, `hasDrafts`, `publish()` (upsert groupé `onConflict: "site_id,section_key,field_key"` + `toast`), `cancel()`, `publishing`, `siteId`, `publishedFields`. |
| `hooks/useV.ts` | `useV()` → `(section, field, fallback) => getDraft(s,f) ?? publishedFields[`${s}.${f}`] || fallback`. Lit `useEditMode()`. |

Note : contrairement au guide, `useSiteContentFields` (cache module + fetch
client) **n'est pas repris** — la lecture publiée passe par le serveur
(`getPublishedFields`) et la map est injectée dans le provider. `onPublished`
déclenche un `router.refresh()` (Next) pour re-render le serveur avec les
nouvelles valeurs, puis `EditModeProvider` doit aussi **mettre à jour sa map
locale** (les Client Components ne se re-montent pas au `router.refresh`) : le
provider stocke `publishedFields` dans un `useState` initialisé par la prop et
`useEffect(() => setState(prop), [prop])` la resynchronise quand le layout
re-rend. En complément, après `publish()`, on fusionne immédiatement les
brouillons publiés dans cette map locale (optimiste) avant de vider `drafts`.

### 6.3 Composants (`components/backoffice/`, tous `"use client"`)

| Fichier | Rôle |
|---|---|
| `EditableText.tsx` | `props: { section, field, value, as?, className?, style?, multiline? }`. Hors mode édition → `<Tag>{value}</Tag>` nu (aucun surcoût DOM). En mode édition → `<span>` wrapper `inline-block` + `<Tag contentEditable>` : survol = contour sauge, clic = édition, `Entrée` valide (sauf `multiline`), `Échap` annule, `blur` = `commit` → `setDraft(section, field, "text", innerText)`. Badge stylo + hint « Entrée = valider · Échap = annuler ». `prefers-reduced-motion` : pas de transition. |
| `EditableImage.tsx` | `props: { section, field, value, children:(url)=>ReactNode, transform? }`. Hors mode édition → `children(value)` nu. En mode édition → overlay « Remplacer » → **modale maison** (`position:fixed`, focus-trap léger, `Échap` ferme) : `<input type="file">` → upload vers bucket `site-images` chemin `${siteId}/${section}-${field}-${Date.now()}.${ext}` → `getPublicUrl` → `setDraft(section, field, "image", url)` ; ou champ URL → `setDraft`. Toast « Image mise à jour (brouillon) ». |
| `EditModeToolbar.tsx` | Barre `position:fixed; top:0; z-index:200`, visible si `isAdmin`. Activer/Désactiver, compteur « N modif(s) non sauvegardée(s) », Sauvegarder / Annuler (si `hasDrafts`), email + Quitter (`signOut` → `/`). Spacer de hauteur mesurée (`ResizeObserver`). Lien discret « Annonces » → `/admin/annonces` (préparé pour B, rendu même si la page n'existe pas encore). |
| `ProviderTree.tsx` | `"use client"`. Enveloppe : `<AuthProvider>` → `<EditModeProvider siteId={SITE_ID} publishedFields={…} onPublished={router.refresh}>` → `children` + `<EditModeToolbar/>` + `<Toaster position="top-right" richColors/>`. Reçoit `publishedFields` en prop depuis le layout serveur. |

### 6.4 Styles — `app/globals.css` (append)

```css
:root{
  --bo-accent:#383E42;          /* barre + base UI édition : anthracite (DA) */
  --bo-accent-contrast:#FFFFFF;
  --bo-dark:#1f2326;
  --bo-dirty:#9EA596;           /* sauge : signale un brouillon non publié */
  --bo-outline:#9EA596;         /* contour au survol d'une zone éditable */
}
```

(Contours d'édition en **sauge**, barre en **anthracite** : respect du
design-system ; la barre n'est jamais vue par le public.)

### 6.5 Page de connexion — `app/signin/page.tsx` (`"use client"`)

Formulaire email + mot de passe + « mot de passe oublié »
(`resetPasswordForEmail`, `redirectTo: ${origin}/reset-password`). Réutilise
`Field` / `TextInput` (`components/forms/primitives.tsx`), `Button`, `Eyebrow`.
DA identique à `app/admin/login/page.tsx` (section anthracite + carte blanche).
Messages d'erreur francisés (`invalid login credentials` → « Email ou mot de
passe incorrect. », etc.). Si déjà connecté → message « Connecté » + lien retour
accueil. Pas de page `/reset-password` dans ce lot (le lien mène à une page
Supabase par défaut ; page dédiée = amélioration ultérieure notée dans
`ÉTAT-PROJET.md`).

### 6.6 Câblage racine — `app/layout.tsx`

- Retirer : `import { VisualEditing }`, `import { draftMode }`, `const isDraftMode`, `{isDraftMode && <VisualEditing/>}`.
- Ajouter : `const publishedFields = await getPublishedFields();` puis envelopper `<LenisProvider>…</LenisProvider>` (header + main + footer) dans `<ProviderTree publishedFields={publishedFields}>`.
- Le skip-link `<a href="#main">` reste **premier enfant** de `<body>` ; `<ProviderTree>` enveloppe tout le reste (donc `SiteHeader` est dedans — il porte le bouton clé).
- `publishedFields` est un `Record<string,string>` (sérialisable) → passage serveur→client OK.

### 6.7 Nav — bouton « Espace pro »

Nouveau composant `components/backoffice/ProButton.tsx` (`"use client"`), icône
`KeyRound` (lucide) :
- `isAdmin` → `<button onClick={toggle}>` (fond sauge si `enabled`).
- sinon → `<Link href="/signin">` discret (opacité réduite).

`components/layout/site-header.tsx` : vérifier au moment de l'implémentation s'il
est déjà `"use client"`. Dans tous les cas, on y **insère `<ProButton/>`**
(lui-même client) à côté du numéro de téléphone — pas besoin de convertir le
header s'il est serveur (un Server Component peut rendre un Client Component).

### 6.8 Retrait de Sanity

Supprimer :
- `lib/sanity/` (dossier entier : `client.ts`, `queries.ts`).
- `app/api/draft-mode/` (dossier : `enable/`, `disable/`).
- Dépendance `next-sanity` de `package.json` racine (`npm uninstall next-sanity`).
- Dans `components/home/hero.tsx` : remplacer `getHeroContent()` par lecture directe de la map (`Hero` reçoit `ctaMicrocopy` en prop depuis `app/page.tsx`, ou lit `getPublishedFields()` — voir §7).

Laisser :
- `studio/` (inerte, hors `tsconfig`).
- `studio/`-related dans `.gitignore` inchangé.

Mettre à jour `ÉTAT-PROJET.md` : section CMS → « Back-office Supabase (édition
inline + annonces) ; Sanity retiré le 2026-08-27, dossier /studio inerte ».

## 7. Home câblée — champs éditables (référence)

`app/page.tsx` **ne change pas** (pas de prop-drilling de contenu). Les
composants de section qui reçoivent un champ éditable deviennent
`"use client"` et lisent via `const v = useV()`. Impact concret :

- `components/home/hero.tsx` : actuellement `async` + `await getHeroContent()`.
  → devient `"use client"`, non-`async`, lit `v("hero","cta_microcopy", "Résultat en moins de 2 minutes")`. Il ne rend que `LogoFull`, `Button`, `HeroVideo` (déjà compatibles client). `app/page.tsx` n'`await` plus rien pour le Hero.
- `components/home/about.tsx` : → `"use client"`. Utilise déjà `Reveal`, `Counter`, `SectionVideoBg`, `ScrollLine` (tous compatibles client) et `next/image`. Aucune perte de SSR (un Client Component est rendu en HTML au SSR).
- `components/home/{properties,team,estimation,reviews,agency}.tsx` : passer `"use client"` **uniquement** celles qui portent un champ éditable ; si l'une est trop lourde à convertir, extraire son couple eyebrow+H2 dans un petit wrapper client `SectionHeading` dédié. Décision par composant à l'implémentation, tranche par défaut = convertir le composant.

Convention de clés : `section` = bloc logique, `field` = rôle.

| section | field | type | Emplacement | Fallback (valeur actuelle) |
|---|---|---|---|---|
| `hero` | `cta_microcopy` | text | `hero.tsx` `<small>` sous le CTA | « Résultat en moins de 2 minutes » |
| `properties` | `eyebrow` | text | eyebrow section Biens dispo | (valeur actuelle du composant) |
| `properties` | `title` | text | H2 Biens dispo | idem |
| `about` | `eyebrow` | text | `about.tsx` `<Eyebrow>` | « À propos » |
| `about` | `title` | text | `about.tsx` H2 | « Qui sommes-nous » |
| `about` | `para_1` | text (multiline) | `about.tsx` 1er `<p>` | texte actuel (sans le `<strong>` — voir note) |
| `about` | `photo` | image | `about.tsx` `<Image src="/agence-markus-villeurbanne.jpg">` | ce chemin |
| `team` | `eyebrow` / `title` | text | section Équipe (home) | valeurs actuelles |
| `estimation` | `eyebrow` / `title` | text | `estimation.tsx` | valeurs actuelles |
| `reviews` | `eyebrow` / `title` | text | `reviews.tsx` | valeurs actuelles |
| `agency` | `eyebrow` / `title` | text | `agency.tsx` | valeurs actuelles |

**Note `about.para_1`** : le paragraphe actuel contient du `<strong>` inline.
`EditableText` édite du texte brut. Décision : pour ce champ, le fallback et la
valeur éditable sont en **texte plein** (on perd le gras inline en mode édité).
Acceptable pour un paragraphe ; documenté dans la recette. Les autres paragraphes
riches ne sont pas rendus éditables.

Les eyebrows/titres exacts des sections `properties`, `team`, `estimation`,
`reviews`, `agency` seront relevés dans leurs composants au moment de
l'implémentation (fallbacks = chaînes actuelles, copiées telles quelles).

## 8. Recette « rendre un champ éditable » (à documenter dans le code)

1. **Texte** : `<EditableText section="x" field="y" as="h2" className="…" value={v("x","y","Fallback")} />` où `v` vient de `useV()` (client) ou la map (serveur).
2. **Image** : render-prop `<EditableImage section=… field=… value={…}>{(url)=> <Image src={url} …/>}</EditableImage>`.
3. Clés `section`/`field` **stables** : un renommage crée un nouveau champ, l'ancien contenu publié devient orphelin (inoffensif).

## 9. Sécurité / RLS — points de vigilance

- `has_role` **doit** être `security definer` + `set search_path = public` (récursion RLS sinon).
- `grant execute … to anon, authenticated` **obligatoire**.
- L'anon key est publique par design (RLS protège l'écriture). Les écritures ne
  passent QUE si `has_role(auth.uid(),'admin')` — donc session Supabase valide +
  ligne `user_roles`.
- Bucket `site-images` public en lecture (URLs stables pour `next/image`) ;
  upload réservé admin.
- `next.config.ts` : ajouter `images.remotePatterns` pour `<ref>.supabase.co`
  (sinon `next/image` refuse les URLs Supabase). Fait dans ce lot car
  `about.photo` peut être remplacée par un upload.

## 10. Tests (TDD — voir skill test-driven-development à l'implémentation)

Le projet n'a pas encore de runner de test. Décision : **pas d'introduction de
Vitest/Jest dans ce lot** (hors périmètre, risque de dérive). Vérification =
`npm run typecheck` + `npm run build` + **checklist manuelle** :

1. `npm run build` passe sans Sanity.
2. Visiteur non connecté : Home identique à aujourd'hui, HTML initial contient les vrais textes (voir source).
3. `/signin` avec mauvais mot de passe → message FR ; bon mot de passe → redirection.
4. Compte sans rôle admin → pas de barre d'édition.
5. Compte admin → barre visible ; Activer → survol des zones = contour sauge.
6. Éditer un H2 → `Entrée` → compteur « 1 modif » ; Sauvegarder → toast, `router.refresh`, valeur persistée (visible après F5, déconnecté).
7. Remplacer `about.photo` par un upload → brouillon → Sauvegarder → image servie depuis Supabase, `next/image` OK.
8. `Annuler` jette les brouillons.
9. `prefers-reduced-motion` : aucune animation d'édition.
10. Lighthouse Home : pas de régression SEO (contenu dans le HTML source).

## 11. Hors périmètre (notés pour plus tard)

- Page `/reset-password` dédiée.
- Édition de listes structurées (`EditableField` + table dédiée) — non nécessaire ici.
- Suppression définitive de `studio/` + clés Sanity dans `.env.local`.
- Extension de l'édition aux autres pages (`/vendre`, `/acheter`, quartiers, `/contact`…).
- Historique/versions des champs, rôles multiples, connexion Google.

## 12. Ordre d'implémentation

1. Migration SQL + projet Supabase + compte admin + env vars.
2. `lib/supabase/client.ts`, `lib/supabase/content.ts`, `lib/backoffice/config.ts`.
3. `hooks/useAuth.tsx` + `app/signin/page.tsx` (+ deps `@supabase/supabase-js`, `lucide-react`, `sonner`).
4. `hooks/useEditMode.tsx`, `hooks/useV.ts`.
5. `components/backoffice/` : `EditableText`, `EditableImage`, `EditModeToolbar`, `ProviderTree`, `ProButton`.
6. `app/globals.css` tokens + `next.config.ts` remotePatterns.
7. Câblage `app/layout.tsx` + `site-header.tsx`.
8. Retrait Sanity (`lib/sanity/`, `app/api/draft-mode/`, `next-sanity`, `getHeroContent`).
9. Home câblée (§7).
10. `npm run typecheck` + `npm run build` + checklist §10.
11. MAJ `ÉTAT-PROJET.md`.
