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
- **Annonces « À venir »** : flag `LISTINGS_COMING_SOON` dans `components/property/property-card.tsx`. Badge ambre « À venir » sur chaque carte (home + /annonces), CTA → « Bientôt disponible » (non cliquable), bandeau /annonces. → passer le flag à `false` quand de vrais mandats existent.
- **Favicon** : `app/icon.svg` = le M (favicon.ico par défaut supprimé). `app/apple-icon.tsx` généré (M blanc sur anthracite, iOS).
- **Estimation (étapes 1→3)** : formulaire conditionnel · géocodage BAN · comparables DVF (CSV data.gouv) · score /100 · positionnement · tendance 5 ans · voisinage · locatif · tableau comparables · **analyse LLM « L'œil de l'expert » = Claude Sonnet 4.6** (prompt expert enrichi).
- **Estimation — emails Resend (étape 4 partielle)** : au submit, 2 emails partent (demandeur + agence via `ESTIMATION_NOTIFY_EMAIL`) depuis `estimation@markusimmobilier.fr`. Logs status+message, repli sandbox si domaine non vérifié. **Testé OK en prod** (`notifyTo` = tony.pistilli@markusimmobilier.fr).
- **SEO** : metadata par page (titres/descriptions localisés Lyon/Villeurbanne), **canonicals** sur pages clés, `metadataBase`/sitemap/robots/OG sur **https://www.markusimmobilier.fr**, **image OG de marque** `app/opengraph-image.tsx` (1200×630), JSON-LD `RealEstateAgent` (layout) + `Service` & `BreadcrumbList` (/estimation, /contact), robots bloque `/api`, `/espace-client`, `/radar`, `/admin`.
- **Analytics : Umami** (cookieless, RGPD — pas de bandeau cookies). Script dans le layout, gated sur `NEXT_PUBLIC_UMAMI_WEBSITE_ID`. Events : `estimation_lancee`, `form_contact`, `form_faire_gerer`, `form_recrutement`, `clic_telephone` (header/footer), `clic_rdv` (CTA résultat estimation). Helper `lib/track.ts` (`window.umami?.track`, ne jette jamais).
- **Radar de prospection** (`/radar`, auth admin) : recherche live Apify Leboncoin · DVF · score inversé selon vendeur · tabs Particuliers/Concurrents · « À appeler aujourd'hui » · pagination · carte Leaflet · phone actor à la demande.
- **Favicon raster** : `public/favicon.ico` (16/32/48) + `icon.png` (512) + `apple-icon.png` (180) + `icon-192/512.png`, M blanc sur anthracite, déclarés via `metadata.icons` (sizes=any pour Safari iOS). Manifest web `/manifest.webmanifest`. Régénérable : `npm run favicons` (sharp + png-to-ico, `scripts/gen-favicons.mjs`).
- **Pages SEO locales** : `/vendre`, `/acheter`, `/gestion-locative`, `/agence-immobiliere-villeurbanne` (gabarit `components/layout/seo-landing.tsx`, JSON-LD Service + Breadcrumb, contenu localisé, CTA estimation/contact).
- **Blog** : `/blog` (hub) + `/blog/[slug]` (12 articles SSG, data dans `lib/blog.ts`, rendu `components/blog/article-body.tsx`, JSON-LD BlogPosting + Breadcrumb, CTA vers page « argent »). Liens header + footer + sitemap.
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
- Brancher réellement les formulaires contact / faire-gerer / recrutement (aujourd'hui `notify()` ne fait que logger — seul l'estimation envoie de vrais emails).
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
