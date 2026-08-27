# Spec — Back-office annonces (sous-projet B)

> Date : 2026-08-27
> Statut : validé pour implémentation
> Prérequis : sous-projet A livré (`2026-08-27-backoffice-inline-edit-design.md`) —
> fournit Supabase, `useAuth`/`isAdmin`, la barre d'édition, `next.config`
> `remotePatterns`, les dépendances (`@supabase/supabase-js`, `lucide-react`,
> `sonner`).

## 1. Objectif

Un back-office `/admin/annonces` où l'agence **crée, édite, publie et dépublie**
des annonces immobilières directement depuis le site, sans toucher au code. Les
annonces publiées apparaissent sur `/annonces`, `/annonces/[slug]`, le bloc
« Nos biens disponibles » de la Home et le `sitemap.xml`, **en plus** des
annonces statiques existantes de `lib/listings.ts`.

## 2. Décisions cadre (validées)

| Sujet | Décision |
|---|---|
| Annonces existantes | **`lib/listings.ts` reste** la source des 3 (bientôt 4) annonces actuelles. Supabase = **nouvelles annonces seulement**. Les pages **fusionnent** les deux sources. |
| Workflow | **Brouillon → Publier.** Création en `draft` (invisible du public), l'admin publie quand prêt. Dépublication possible. |
| Photos | **Bucket Supabase dédié `listings`**, chemin `listings/<annonceId>/<ordre>-<timestamp>.<ext>`. Upload multiple + réordonnancement dans le formulaire. |
| Champs v1 | **Essentiels** (voir §4). Champs avancés (taxe foncière, charges copro, loyer HC détaillé, composition, avant/après, SEO custom) = plus tard. |
| Auth | `isAdmin` (Supabase, du sous-projet A). Écritures directes Supabase sous RLS admin — pas d'API route. |

## 3. Base de données — migration `supabase/migrations/0002_listings.sql`

### Table `public.listings`

| Colonne | Type | Notes |
|---|---|---|
| `id` | uuid PK default `gen_random_uuid()` | |
| `slug` | text **unique not null** | généré depuis `titre` (slugify FR : minuscules, sans accents, `-`), suffixe `-2`, `-3`… en cas de collision. **Ne doit pas collisionner avec un slug de `lib/listings.ts`** — vérifié à la génération côté serveur/form. |
| `status` | text not null default `'draft'` | `'draft'` \| `'published'` (check contrainte) |
| `titre` | text not null | |
| `type` | text not null | `garage`\|`parking`\|`appartement`\|`maison`\|`local`\|`terrain`\|`immeuble` (mêmes valeurs que `ListingType`) |
| `transaction` | text not null | `vente`\|`location` |
| `prix` | integer not null | € (vente = prix ; location = loyer mensuel CC) |
| `prix_suffixe` | text | ex. `/mois CC` |
| `adresse` | text | |
| `quartier` | text | |
| `ville` | text not null default `'Villeurbanne'` | |
| `code_postal` | text not null default `'69100'` | |
| `surface` | numeric | m² |
| `pieces` | integer | |
| `dpe` | text | `A`..`G` ou null |
| `ges` | text | `A`..`G` ou null |
| `description` | text not null | 1re phrase = description autosuffisante (LLM-ready), comme l'existant |
| `atouts` | text[] not null default `'{}'` | |
| `photos` | jsonb not null default `'[]'` | `[{ "url": string, "alt": string }]`, **ordre = ordre d'affichage** |
| `mise_en_avant` | boolean not null default false | pousse en 1er sur home + hub |
| `created_at` | timestamptz not null default now() | |
| `updated_at` | timestamptz not null default now() | trigger `touch_updated_at` (déjà défini en 0001) |
| `published_at` | timestamptz | posé au 1er passage en `published` |

Contraintes check : `status in ('draft','published')`, `type in (…)`,
`transaction in ('vente','location')`, `dpe`/`ges` in `A..G` ou null.

### RLS

```sql
alter table public.listings enable row level security;

-- lecture publique : uniquement les annonces publiées
create policy "listings public read published"
  on public.listings for select
  using (status = 'published');

-- admin : tout voir + tout écrire
create policy "listings admin all"
  on public.listings for all
  using (public.has_role(auth.uid(),'admin'))
  with check (public.has_role(auth.uid(),'admin'));

create trigger listings_touch before update on public.listings
  for each row execute function public.touch_updated_at();
```

> Les deux policies `select` se cumulent en OR : le public voit `published`,
> l'admin voit tout. OK.

### Bucket `listings`

```sql
insert into storage.buckets (id, name, public) values ('listings','listings',true)
on conflict (id) do nothing;

create policy "listings-bucket public read"
  on storage.objects for select using (bucket_id = 'listings');
create policy "listings-bucket admin write"
  on storage.objects for insert with check (bucket_id = 'listings' and public.has_role(auth.uid(),'admin'));
create policy "listings-bucket admin update"
  on storage.objects for update using (bucket_id = 'listings' and public.has_role(auth.uid(),'admin'));
create policy "listings-bucket admin delete"
  on storage.objects for delete using (bucket_id = 'listings' and public.has_role(auth.uid(),'admin'));
```

## 4. Formulaire de création / édition — 4 étapes

Réutilise `components/forms/multi-step.tsx` (`StepIndicator`, `StepPanel`) et
`components/forms/primitives.tsx` (`Field`, `TextInput`, etc.). État local
(`useState`), pas de `react-hook-form` obligatoire (mais dispo si plus simple).

| Étape | Champs |
|---|---|
| **1 — Nature** | `type` (select), `transaction` (radio vente/location), `titre` (text), `mise_en_avant` (checkbox) |
| **2 — Chiffres & lieu** | `prix` (number), `prix_suffixe` (text, affiché si location, défaut `/mois CC`), `adresse`, `quartier`, `ville`, `code_postal`, `surface` (number, optionnel pour garage/parking/terrain), `pieces` (number, idem) |
| **3 — Descriptif** | `description` (textarea), `atouts` (liste éditable : input + « ajouter », puces supprimables), `dpe` (select A–G + « non concerné »), `ges` (select A–G + « non concerné ») |
| **4 — Photos** | upload multiple (`<input type="file" multiple accept="image/*">`), miniatures réordonnables (drag ou boutons ↑/↓), champ `alt` par photo (pré-rempli `"<titre> — <ville>"`, éditable), suppression. Upload immédiat vers `listings/<id>/…` (l'`id` est créé dès l'ouverture du formulaire « new » via un premier `insert` en `draft`, ou un uuid généré côté client et utilisé à l'insert). |

Décision technique pour l'`id` en création : **générer l'uuid côté client**
(`crypto.randomUUID()`), l'utiliser comme préfixe de chemin d'upload ET comme
`id` de la ligne à l'`insert`. Évite le brouillon fantôme si l'admin abandonne.

Bas de formulaire : « Enregistrer le brouillon » (upsert `status` inchangé) et,
en édition, « Publier » / « Dépublier ».

### Slug

`lib/backoffice/slugify.ts` → `slugify(titre)`. À l'insert, le serveur/form
vérifie l'unicité contre `listings` **et** contre les slugs statiques
(`LISTINGS.map(l => l.slug)` importés) ; suffixe numérique si collision. Le slug
est **modifiable** tant que l'annonce est en `draft` ; figé après publication
(sinon lien mort / perte SEO) — champ en lecture seule si `status==='published'`,
avec bouton « déverrouiller » qui prévient du risque.

## 5. Pages back-office

Toutes sous `app/admin/annonces/`, `"use client"` pour les parties
interactives, garde `isAdmin` via `useAuth()` → si `!isAdmin && !loading` →
`router.replace("/signin?from=/admin/annonces")`.

| Route | Contenu |
|---|---|
| `app/admin/annonces/page.tsx` | Liste : brouillons + publiées (2 groupes), colonnes titre / type / transaction / prix / statut / maj. Actions par ligne : Éditer, Publier/Dépublier, Supprimer (confirm). Bouton « + Nouvelle annonce ». |
| `app/admin/annonces/new/page.tsx` | Formulaire §4 (uuid généré client). À l'enregistrement → redirection vers `…/[id]/edit`. |
| `app/admin/annonces/[id]/edit/page.tsx` | Même formulaire, pré-rempli (`select … where id`). Publier / Dépublier / Supprimer. |

Un lien « Annonces » est déjà présent dans `EditModeToolbar` (préparé en A).
Ajouter aussi un lien dans une éventuelle page `/admin` d'index (optionnel).

`robots.ts` bloque déjà `/admin` — rien à faire.

## 6. Fusion des sources publiques

### `lib/listings-all.ts` (nouveau)

```ts
import { LISTINGS, type Listing } from "@/lib/listings";
// mappe une ligne Supabase → objet compatible `Listing` (mêmes clés)

export async function getPublishedDbListings(): Promise<Listing[]> { … }
// select * from listings where status = 'published'
// map → Listing : prix_suffixe→prixSuffixe, code_postal→codePostal,
//   photos jsonb → [{src: url, alt}], statut: "disponible" (les DB listings
//   publiées sont "disponibles" ; "vendu/loué" hors périmètre v1),
//   contact: CONTACT par défaut (Tony), seo: dérivé { title: `${titre} | Markus Immobilier`,
//   description: description.slice(0,160), h1: titre }, publishedAt: published_at.

export async function getAllListings(): Promise<Listing[]> {
  const db = await getPublishedDbListings();
  const bySlug = new Map<string, Listing>();
  for (const l of LISTINGS) bySlug.set(l.slug, l);
  for (const l of db) if (!bySlug.has(l.slug)) bySlug.set(l.slug, l); // statiques prioritaires
  return [...bySlug.values()];
}

export async function getAllAvailableListings(): Promise<Listing[]> { /* tri miseEnAvant puis publishedAt desc, comme getAvailableListings */ }
export async function getListingBySlug(slug: string): Promise<Listing | undefined> { /* statique d'abord, puis DB */ }
```

Ne jette jamais (catch → `[]`, on retombe sur les statiques).

### Pages à adapter (lecture DB en plus du statique)

| Fichier | Changement |
|---|---|
| `app/annonces/page.tsx` | remplacer les helpers statiques par `getAllListings()` / `getAllAvailableListings()` (page déjà `async`). |
| `app/annonces/[id]/page.tsx` | `generateMetadata` + composant : `getListingBySlug(id)` (async) au lieu de `getListing(id)`. `generateStaticParams` : passe **`async`** et concatène `LISTINGS` + slugs DB publiés. Ajouter `export const dynamicParams = true` pour que les annonces publiées après le build soient rendues à la demande. `getListing` synchrone reste utilisé par les fallbacks mocks — garder l'import mock inchangé. |
| `components/home/properties.tsx` | reçoit ses biens en props depuis `app/page.tsx` (déjà le cas ? sinon `app/page.tsx` passe `await getAllAvailableListings()`). |
| `app/sitemap.ts` | passe **`async`** ; `listingPages` = `LISTINGS` + DB publiés (`getAllListings()`), `lastModified` = `publishedAt`. |
| `app/llms.txt/route.ts` | si elle liste les annonces : idem (à vérifier). |

### `next/image`

`remotePatterns` pour `*.supabase.co` : ajouté en sous-projet A. Vérifier qu'il
couvre le bucket `listings` (même host) — oui.

## 7. JSON-LD / composants d'affichage

`ListingDetail`, `listing-gallery`, `listing-card`, `EnergyScale`,
`surfaceLabel()`, JSON-LD `RealEstateListing` : **inchangés**. Les objets issus
de la DB respectent le type `Listing`, donc rendus par les mêmes composants. Les
champs optionnels absents (`composition`, `avantApres`, `taxeFonciere`,
`localisationTexte`, `etage`, `prixMention`) → le composant les gère déjà en
`undefined`.

## 8. Contact par défaut des annonces DB

Réutiliser `CONTACT_TONY` (exporté depuis `lib/listings.ts` — le rendre
`export`). Pas de champ contact dans le formulaire v1.

## 9. Tests / vérification

`npm run typecheck` + `npm run build` + checklist manuelle :

1. Migration `0002` passe ; `select` public ne renvoie que `published`.
2. Non-admin sur `/admin/annonces` → redirigé vers `/signin`.
3. Admin : créer une annonce, uploader 3 photos, réordonner, enregistrer brouillon → **absente** de `/annonces` public.
4. Publier → apparaît sur `/annonces`, `/annonces/<slug>`, bloc Home, `sitemap.xml`.
5. Page dédiée : JSON-LD `RealEstateListing` valide (Rich Results Test), photos servies depuis Supabase, galerie OK.
6. `mise_en_avant` → l'annonce passe 1re sur home + hub, avant les statiques non mises en avant.
7. Dépublier → disparaît du public, reste en back-office.
8. Slug : deux annonces même titre → `-2` ; collision avec un slug statique → suffixe.
9. Supprimer une annonce → ligne + (idéalement) photos du bucket retirées.
10. Aucune régression sur les 4 annonces statiques existantes.

## 10. Hors périmètre v1

- Statuts `vendu` / `loué` sur les annonces DB (et bascule auto).
- Champs avancés : taxe foncière, charges copro, loyer HC/charges détaillés, `composition[]`, `avantApres`, `localisationTexte`, `etage`, `prixMention`, SEO custom par champ.
- Édition inline des annonces statiques `lib/listings.ts` (elles restent en code).
- Rôle « éditeur » distinct d'« admin ».
- Nettoyage automatique des photos orphelines du bucket (suppression best-effort à la suppression d'annonce seulement).
- Génération assistée de la description (LLM).

## 11. Ordre d'implémentation

1. Migration `0002_listings.sql` (table + RLS + bucket) — appliquée sur Supabase.
2. `lib/backoffice/slugify.ts`.
3. `lib/listings-all.ts` (+ `export CONTACT_TONY`, `export` helpers nécessaires depuis `lib/listings.ts`).
4. Composant formulaire `components/admin/listing-form.tsx` (4 étapes) + upload photos.
5. Pages `app/admin/annonces/{page,new/page,[id]/edit/page}.tsx` + garde `isAdmin`.
6. Adaptation pages publiques : `app/annonces/page.tsx`, `app/annonces/[id]/page.tsx` (+ `generateStaticParams` async, `dynamicParams`), `app/page.tsx` / `properties.tsx`, `app/sitemap.ts`, `app/llms.txt/route.ts` (si concerné).
7. `npm run typecheck` + `npm run build` + checklist §9.
8. MAJ `ÉTAT-PROJET.md` (section annonces : « + création depuis /admin/annonces, stockage Supabase »).
