# ÉTAT-PROJET — Markus Immobilier

> Lis ce fichier en tout début de session pour savoir où on en est.

## 🔗 Liens
- **Repo GitHub (privé)** : https://github.com/stupidguywearingtn/markus-immobilier
- **Prod Vercel** : https://markus-immobilier.vercel.app
- **Domaine cible (canonique)** : https://www.markusimmobilier.fr *(à connecter dans Vercel → Settings → Domains)*

## ✅ FAIT

- **Stack** : Next.js 16 + TS + Tailwind v4 + framer-motion + Lenis + react-hook-form + zod.
- **Home** (ordre) : Hero → Biens dispo → Qui sommes-nous → Équipe → Vendus parallaxe → Estimation → Avis clients → Suivez-nous → Agence.
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

## ⏳ À FAIRE — actions utilisateur (Vercel / externe)

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

- **Photos à déposer dans le repo** (je ne peux pas écrire les images collées dans le chat) :
  - `public/agence-markus.jpg` → photo de l'agence (section « Qui sommes-nous »). **Tant que le fichier n'est pas là, l'image est cassée sur la home.**
  - `public/equipe/tony-pistilli.jpg` → nouvelle photo de Tony (carte équipe). Idem.
- **Articles blog 2 & 9** : ajouter les vrais prix €/m² par quartier (Villeurbanne) dans `lib/blog.ts` — actuellement formulé sans chiffres inventés.
- **Google Search Console** : créer la propriété `https://www.markusimmobilier.fr`, récupérer le code → var Vercel `GOOGLE_SITE_VERIFICATION` ; soumettre `sitemap.xml`.
- **Photo David PISTILLI** (fallback initiales DP en attendant).
- Photo de l'agence, vraies photos des biens, PDF honoraires officiel, **vrais mandats** (→ passer `LISTINGS_COMING_SOON` à `false`).
- Valider la section bonus « Nos biens vendus » (parallaxe, hors trame).
