# ÉTAT-PROJET — Markus Immobilier

> Lis ce fichier en tout début de session pour savoir où on en est.

## ✅ FAIT

- **Stack** : Next.js 16 + TS + Tailwind v4 + framer-motion + Lenis + shadcn (deps-only) + react-hook-form + zod.
- **Home** (ordre) : Hero → Biens dispo → Qui sommes-nous → **Équipe** → Vendus parallaxe → Estimation → **Avis clients** → Suivez-nous → Agence.
- **Pages** : `/annonces` + `/annonces/[id]`, `/faire-gerer`, `/estimation`, `/contact`, `/recrutement`, `/equipe`, `/honoraires` (barème réel), `/espace-client` (coming soon), pages légales (mentions / confidentialité / cookies) avec contenu réel.
- **Header** : logo M seul (`logo-markus-mark.svg`), liens nav en MAJUSCULES.
- **Hero** : logo borné `min(clamp(180,26vw,380), 48vh, 80vw)` — plus jamais d'explosion sur grand écran ou zoom.
- **Section Équipe** : 3 cartes — Tony PISTILLI (Fondateur, **vraie photo intégrée** depuis `public/`) · David PISTILLI (initiales DP — photo à venir) · « Pourquoi pas vous ? » avec **SVG animé** (silhouette + cadre photo + balayage lumineux, animations SMIL embarquées) → `/recrutement`.
- **Section Avis clients** : 3 témoignages Andrée P. / Roger G. / Didier & Béatrice F. avec étoiles + date.
- **Footer** : centré, colonnes Services / Marque / L'Agence (inclut « Nos avis clients »), réseaux Instagram · TikTok · YouTube · X · LinkedIn · Discord.
- **Vrai logo** (SVG, dégradé via mask) : header + hero + favicon.
- **Vidéos hero fal.ai** (16:9 desktop + 9:16 mobile), plein cadre.
- **Illustrations animées** (fix `pathLength`) ; « Excellence » (médaille) sur `/recrutement`.
- **Carte Google Maps embed** sur `/contact` + section agence.
- **PageHero partagé** (offset header + tailles de titres).
- **Outil d'estimation — étapes 1→3 faites** : formulaire intelligent conditionnel · géocodage BAN · comparables DVF (CSV officiels data.gouv, 5 ans, médiane pondérée + 15 coefficients) · score /100 · positionnement · tendance 5 ans · voisinage · potentiel locatif · tableau comparables · analyse LLM « L'œil de l'expert » (Claude Haiku 4.5). OK en local.
- **Radar de prospection** (`/radar`, sous auth admin) : recherche live Apify Leboncoin (actor `ahmed_hrid/leboncoin-immobilier-scraper`, category="9") · normalize · DVF enrichment · score d'opportunité inversé selon vendeur (particulier récent = chaud, agence ancienne = mûre) · vue liste avec tabs Particuliers/Concurrents · section « À appeler aujourd'hui » (particuliers ≤48h) · pagination 15 par 15 · vue carte Leaflet · panneau détail avec phone actor clearpath à la demande.
- **Déployé Vercel** : https://markus-immobilier.vercel.app

## ⏳ À FAIRE — PRIORITÉ IMMÉDIATE

- **Vercel env vars** : `APIFY_API_KEY`, `RADAR_PASSWORD`, `RADAR_AUTH_TOKEN`, `ANTHROPIC_API_KEY`, `RESEND_API_KEY` (action utilisateur).
- ~~Photo Tony Pistilli~~ → **livrée** (utilisée directement depuis `public/WhatsApp Image 2026-06-03 at 13.26.07.jpeg`, object-position [center 22%] pour cadrage visage).
- **Estimation — étape 4** : PDF du rapport (`@react-pdf/renderer`) charte Markus + bouton « Télécharger mon rapport » + email auto au client + à l'agence (Resend ; sandbox `onboarding@resend.dev` en attendant la vérif DNS de markusimmobilier.fr).
- **Textes légaux** : remplacer les deux `[À DATER au jour de la mise en ligne]` (sur `/confidentialite` et `/cookies`) le jour du go-live.
- **PASSE DE POLISH design** (pas encore faite) :
  - **Boutons premium harmonisés** : CTA star (dégradé sauge + profondeur + sweep + flèche + glow), primary anthracite, outline/ghost ; tailles cohérentes, focus visibles.
  - **Matière** : grain/texture subtil + halos radiaux sauge sur sections anthracite ; hover de cartes homogène (lift + ombre + zoom + bordure).
  - **Interface** : underline animé sauge (liens/nav), transitions de page subtiles, barre de progression de scroll sauge, séparateurs hairline sauge, dégradé de titres cohérent.
  - Rester subtil/premium, pas chargé ; respecter `prefers-reduced-motion`.

## 🗺️ ROADMAP RESTANTE

- Audit mobile (375/768) + a11y (focus, contrastes, ARIA) + perf (`next/image`, lazy-load, Lighthouse).
- Brancher les autres formulaires (contact, faire-gerer/syndic, candidature recrutement) pour qu'ils envoient vraiment (Resend) — actuellement UX seulement.
- i18n FR/EN (`next-intl`) — à valider avec le client.
- SEO (meta/OG, robots, schema RealEstateAgent), déploiement final.

## 📥 EN ATTENTE DU CLIENT

- ~~Texte de présentation « Qui sommes-nous »~~ → **livré et intégré** (paragraphes définitifs câblés dans `components/home/about.tsx`).
- ~~Photo Tony PISTILLI~~ → **livrée et intégrée** depuis `public/`.
- **Photo David PISTILLI** (fallback initiales DP en attendant la vraie photo).
- Photo de l'agence, vraies photos des biens, PDF honoraires officiel, vraies annonces.
- Accès DNS de markusimmobilier.fr pour vérifier le domaine Resend (mails clients réels).
- Valider la section bonus « Nos biens vendus » (parallaxe, hors trame).
