# ÉTAT-PROJET — Markus Immobilier

> Lis ce fichier en tout début de session pour savoir où on en est.

## 🔗 Liens
- **Repo GitHub (privé)** : https://github.com/stupidguywearingtn/markus-immobilier
- **Prod Vercel** : https://markus-immobilier.vercel.app
- **Domaine cible (canonique)** : https://www.markusimmobilier.fr *(à connecter dans Vercel → Settings → Domains)*

## ✅ FAIT

- **Stack** : Next.js 16 + TS + Tailwind v4 + framer-motion + Lenis + react-hook-form + zod.
- **Home** (ordre) : Hero → Biens dispo → Qui sommes-nous → Équipe → Vendus parallaxe → Estimation → Avis clients → Suivez-nous → Agence.
- **Section « Qui sommes-nous »** : passée en **section forte anthracite sur vidéo** (design-system §8). Vraie photo de l'agence (`public/agence-markus-villeurbanne.jpg`, salle de réunion) en `next/image`, radius 14px + ombre douce + reveal au scroll. Fond = `components/ui/section-video-bg.tsx` (**réutilisable**) : `/videos/agence-ambiance.mp4` (H.264, sans piste audio, 2,5 Mo → **1,1 Mo**) + poster `/videos/agence-ambiance-poster.jpg`, `autoplay muted loop playsinline`, `preload="metadata"`, **chargée seulement à l'approche du viewport** (IntersectionObserver), overlay `rgba(31,35,38,0.72)` + blur 2px, texte en blanc/85. **`prefers-reduced-motion` → la balise `<video>` n'est jamais montée** (poster figé seul) ; repli poster puis aplat anthracite si la vidéo échoue. Vérifié desktop / mobile 390px / reduced-motion.
- **Pages** : `/annonces` + `/annonces/[id]`, `/faire-gerer`, `/estimation`, `/contact`, `/recrutement`, `/equipe`, `/honoraires`, `/espace-client` (coming soon), légales (mentions / confidentialité / cookies, contenu réel).
- **Header** : logo M seul (`logo-markus-mark.svg`), liens nav MAJUSCULES.
- **Hero** : logo borné `min(clamp(180,26vw,380), 48vh, 80vw)`. Vidéo de fond avec fix autoplay Safari (`muted` impératif + retry `canplay` + fallback gradient sur vraie erreur média).
- **Équipe** : Tony PISTILLI (Fondateur, vraie photo) · David PISTILLI (initiales DP) · carte « Pourquoi pas vous ? » (silhouette **statique** sauge sur anthracite) → `/recrutement`.
- **Avis clients** : 3 témoignages (Andrée P. / Roger G. / Didier & Béatrice F.), étoiles + date.
- **Footer** : centré, colonnes Services / Marque / L'Agence (+ « Nos avis clients »), réseaux Instagram · TikTok · YouTube · X · LinkedIn · Discord.
- **ANNONCES RÉELLES — système data-driven** : `lib/listings.ts` = source de vérité (un objet = un bien : id, slug, titre, type, transaction, statut, prix, adresse, quartier, description, atouts, taxeFoncière, chargesCopro, photos[alt], contact, seo). **Ajouter un bien = ajouter un objet + déposer les photos dans `public/annonces/<slug>/`** — home, hub, page dédiée, sitemap se mettent à jour seuls.
  - Composants : `components/property/listing-card.tsx`, `listing-gallery.tsx`, `listing-detail.tsx` (JSON-LD `Product`+`Offer`).
  - Route : `app/annonces/[id]` sert **les biens réels par slug en priorité**, repli sur les mocks (pas de conflit de segment dynamique).
  - **Biens en ligne (3)** : `/annonces/appartement-t3-vendre-villeurbanne-grand-clement` (**mis en avant**, vente, 279 000 €, T3 58,67 m² RDC, terrasse 10 m² + jardin 30 m² + parking couvert, DPE B / GES C, libre avril 2027) · `/annonces/garage-a-vendre-villeurbanne-laurent-bonnevay` (vente, 21 000 €) · `/annonces/garage-a-louer-villeurbanne-laurent-bonnevay` (location, 100 €/mois CC = 90 HC + 10 charges, « Disponible rapidement »).
  - JSON-LD unifié : **`RealEstateListing`** + `mainEntity` typé (`Apartment`/`House`/`Accommodation` selon `type`) portant `floorSize`, `numberOfRooms`, `floorLevel`, DPE/GES en `PropertyValue` + **`Offer`** (`Sell` / `LeaseOut` avec `UnitPriceSpecification` mensuelle en location).
  - `/annonces` : sections **Disponible — À vendre / Disponible — À louer / Vendus / Loués** (biens réels) + grille placeholders « À venir » en dessous. Le **filtre Vente/Location** de la barre filtre aussi ces sections (`?type=vente`).
  - Champs optionnels utiles : `loyerHorsCharges`, `chargesMensuelles`, `disponibilite`, `localisationTexte`, `prixMention`, `etage`, `dpe`, `ges`, `composition[]`, **`miseEnAvant`** (pousse le bien en 1er sur l'accueil et le hub) — aucun texte en dur dans les composants.
  - Fiche : échelle **DPE/GES A→G** (composant `EnergyScale`, tokens de marque), bloc **Composition**, mention de prix (« honoraires inclus… »), surface formatée FR via `surfaceLabel()`.
- **Section « Nos biens vendus » (parallaxe)** : **9 vraies photos client** (`public/vendus/`, sources 1600px → 1200px, ~1 Mo au total). Data-driven via `lib/sold-gallery.ts` (**ajouter une photo = déposer le fichier + ajouter un objet**). Vignettes passées de **portrait 3:4 à paysage 3:2** (= format natif de 7 photos sur 9, donc quasi aucun recadrage), ratio homogène pour toutes, `next/image` + `loading="lazy"`, radius 10px, ombre douce, badge « Vendu » sauge, titre repris du nom de fichier, **alt = « <titre> vendu(e) par Markus Immobilier »** (accord géré par le champ `feminin`). 3 colonnes desktop / 2 mobile ; chaque colonne = la liste décalée puis **doublée** (sinon un vide apparaît en bas de course, les vignettes paysage étant peu hautes). Scrim radial du titre renforcé (photos d'intérieurs très lumineuses).
- **Placeholders « À venir »** : flag `LISTINGS_COMING_SOON` (`components/property/property-card.tsx`) — ne concerne QUE les biens de démo. Les biens réels n'ont jamais ce badge. Retirer les mocks quand le catalogue réel sera fourni.
- **Favicon** : `app/icon.svg` = le M (favicon.ico par défaut supprimé). `app/apple-icon.tsx` généré (M blanc sur anthracite, iOS).
- **Estimation (étapes 1→3)** : formulaire conditionnel · géocodage BAN · comparables DVF (CSV data.gouv) · score /100 · positionnement · tendance 5 ans · voisinage · locatif · tableau comparables · **analyse LLM « L'œil de l'expert » = Claude Sonnet 4.6** (prompt expert enrichi).
- **Estimation — emails Resend (étape 4 partielle)** : au submit, 2 emails partent (demandeur + agence via `ESTIMATION_NOTIFY_EMAIL`) depuis `estimation@markusimmobilier.fr`. Logs status+message, repli sandbox si domaine non vérifié. **Testé OK en prod** (`notifyTo` = tony.pistilli@markusimmobilier.fr).
- **SEO** : metadata par page (titres/descriptions localisés Lyon/Villeurbanne), **canonicals** sur pages clés, `metadataBase`/sitemap/robots/OG sur **https://www.markusimmobilier.fr**, **image OG de marque** `app/opengraph-image.tsx` (1200×630), JSON-LD `RealEstateAgent` (layout) + `Service` & `BreadcrumbList` (/estimation, /contact), robots bloque `/api`, `/espace-client`, `/radar`, `/admin`.
- **Analytics : Umami** (cookieless, RGPD — pas de bandeau cookies). Script dans le layout, gated sur `NEXT_PUBLIC_UMAMI_WEBSITE_ID`. Events : `estimation_lancee`, `form_contact`, `form_faire_gerer`, `form_recrutement`, `clic_telephone` (header/footer), `clic_rdv` (CTA résultat estimation). Helper `lib/track.ts` (`window.umami?.track`, ne jette jamais).
- **Radar de prospection** (`/radar`, auth admin) : recherche live Apify Leboncoin · DVF · score inversé selon vendeur · tabs Particuliers/Concurrents · « À appeler aujourd'hui » · pagination · carte Leaflet · phone actor à la demande.
- **Favicon raster** : `public/favicon.ico` (16/32/48) + `icon.png` (512) + `apple-icon.png` (180) + `icon-192/512.png`, M blanc sur anthracite, déclarés via `metadata.icons` (sizes=any pour Safari iOS). Manifest web `/manifest.webmanifest`. Régénérable : `npm run favicons` (sharp + png-to-ico, `scripts/gen-favicons.mjs`).
- **Pages SEO locales** : `/vendre`, `/acheter`, `/gestion-locative`, `/agence-immobiliere-villeurbanne` + **pages quartiers** `/agence-immobiliere-gratte-ciel`, `-charpennes`, `-cusset` + **`/estimation-immobiliere-lyon`** (gabarit `components/layout/seo-landing.tsx`, JSON-LD Service + Breadcrumb, contenu localisé, maillage quartiers depuis la page Villeurbanne).
- **Blog** : `/blog` (hub) + `/blog/[slug]` — **26 articles SSG** (data `lib/blog.ts`, rendu `components/blog/article-body.tsx`, JSON-LD BlogPosting + Breadcrumb, « Mis à jour le », **section « À lire aussi »** via `getRelatedArticles` = maillage interne, CTA vers page « argent »). Liens header + footer + sitemap.
- **GSC** : balise `google-site-verification` via env `GOOGLE_SITE_VERIFICATION` (à renseigner dans Vercel quand le code GSC est dispo).
- **Favicon (recette finale = TEL&CASH)** : convention de fichiers `app/favicon.ico` + `app/icon.png` + `app/apple-icon.png` (PAS de `metadata.icons` explicite → évite les balises en double, fix Safari iOS). Manifest → `public/icon-192/512.png`.
- **GEO / IA** : `public/llms.txt` (servi sur `/llms.txt`) + **FAQ** sur la home (`components/home/faq.tsx`, 8 Q/R en `<details>` crawlables) avec **JSON-LD `FAQPage`**.
- **BACK-OFFICE éditable (Supabase) — remplace Sanity** (2026-08-27). Sanity retiré (`lib/sanity/`, `app/api/draft-mode/`, `next-sanity`, `VisualEditing`) ; dossier `/studio/` laissé inerte sur le disque. Voir `docs/BACK-OFFICE-SETUP.md` + specs `docs/superpowers/specs/2026-08-27-backoffice-*.md`.
  - **Sous-projet A — édition inline** : un admin connecté (Supabase Auth, `/signin`, bouton clé dans le header) active un « mode édition » et clique les textes/images de la home pour les modifier → brouillons → « Sauvegarder » publie en base (`site_content_fields`, clé `site_id/section/field`). Lecture publiée **server-side** (SEO). Champs câblés sur la home : eyebrows + titres plains + 1 paragraphe « Qui sommes-nous » + photo agence. Composants : `hooks/useAuth|useEditMode|useV`, `components/backoffice/*`. Tokens `--bo-*` dans `globals.css`. `SITE_ID` figé dans `lib/backoffice/config.ts`.
  - **Sous-projet B — annonces** : `/admin/annonces` (liste + `/new` + `/[id]/edit`), formulaire 4 étapes (`components/admin/listing-form.tsx`), photos → bucket `listings`, workflow brouillon → publier. `lib/listings-all.ts` fusionne les biens statiques (`lib/listings.ts`, inchangés, prioritaires) + les annonces publiées Supabase, pour `/annonces`, `/annonces/[id]`, la home et le `sitemap`.
  - Migrations SQL versionnées : `supabase/migrations/0001_backoffice.sql`, `0002_listings.sql`.

## ⏳ À FAIRE — actions utilisateur (Vercel / externe)

- **Supabase (back-office)** — voir `docs/BACK-OFFICE-SETUP.md` : créer le projet, exécuter les 2 migrations SQL, créer le compte admin (+ ligne `user_roles`), poser `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` en local **et** dans Vercel. Tant que ces vars valent le placeholder, le back-office reste inactif (le site public fonctionne normalement).

- **Vercel env vars** (sur le projet `markus-immobilier`) : `APIFY_API_KEY`, `RADAR_PASSWORD`, `RADAR_AUTH_TOKEN`, `ANTHROPIC_API_KEY`, `RESEND_API_KEY` (✓ posées), `ESTIMATION_NOTIFY_EMAIL` (✓), **`NEXT_PUBLIC_UMAMI_WEBSITE_ID`** (à ajouter pour activer Umami).
- **Umami** : créer le site sur cloud.umami.is, récupérer le website-id → le mettre dans `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
- **Domaine** : connecter `www.markusimmobilier.fr` dans Vercel (Settings → Domains) — les URLs SEO/canoniques pointent déjà dessus.
- **Vidéo Safari** : tester sur un vrai Safari ; si KO → vérifier que les `.mp4` sont en **H.264/AAC** (re-export si VP9/HEVC).
- **Déploiement auto** : connecter le repo GitHub dans Vercel (Settings → Git) pour redéployer à chaque push.
- **Textes légaux** : remplacer les `[À DATER…]` (/confidentialite, /cookies) au go-live.

## 🗺️ ROADMAP RESTANTE

- **Estimation étape 4 (reste)** : PDF téléchargeable du rapport (`@react-pdf/renderer`).
- **Formulaires — emails Resend** : estimation ✅, **contact ✅** (→ `villeurbanne@markusimmobilier.fr`, var `CONTACT_NOTIFY_EMAIL`, reply_to demandeur), **recrutement ✅** (→ idem, var `RECRUTEMENT_NOTIFY_EMAIL` ; CV pas encore en pièce jointe). **Reste : `faire-gerer`** (toujours `notify()` log seul).
- **PDF honoraires** : vrai barème généré via **pdfkit** (`scripts/make-pdf.js` → `npm run … node scripts/make-pdf.js`), bien formé, `public/bareme-honoraires-markus.pdf`.
- Passe de polish design (boutons, matière, micro-interactions) ; audit mobile + a11y + perf (next/image, Lighthouse).
- i18n FR/EN (à valider client). Google Business Profile (côté client) pour le SEO local.

## 📥 EN ATTENTE DU CLIENT / ACTIONS USER

- **Photos à déposer dans le repo** (je ne peux pas écrire les images collées dans le chat) — les déposer dans `public/Photo annonce/` (dossier gitignoré, sert de source brute ; je fais les copies optimisées) :
  - ✅ Photo de l'agence : faite (`public/agence-markus-villeurbanne.jpg`).
  - `public/equipe/tony-pistilli.jpg` → nouvelle photo de Tony (carte équipe).
  - **Photos intérieures du T3 Grand Clément** : la fiche n'a que 2 photos de parties communes (résidence + hall). Il manque le séjour/cuisine, les chambres, la terrasse et le jardin — c'est le bien le plus vendeur, ce sont les photos qui font la différence.
- **Articles blog 2 & 9** : ajouter les vrais prix €/m² par quartier (Villeurbanne) dans `lib/blog.ts` — actuellement formulé sans chiffres inventés.
- **Google Search Console** : créer la propriété `https://www.markusimmobilier.fr`, récupérer le code → var Vercel `GOOGLE_SITE_VERIFICATION` ; soumettre `sitemap.xml`.
- **Photo David PISTILLI** (fallback initiales DP en attendant).
- PDF honoraires officiel, **vrais mandats** (→ passer `LISTINGS_COMING_SOON` à `false`).
- Valider la section bonus « Nos biens vendus » (parallaxe, hors trame) — désormais avec les 9 vraies photos.
- **Vendus — à confirmer par le client** : les 9 photos sont des biens de l'**Est lyonnais** (Meyzieu ×4, Décines, Jonage, Vaulx-en-Velin, Bron) et non de Villeurbanne/Lyon ; le texte de la section a été ajusté en conséquence. Confirmer que c'est bien le positionnement voulu.
