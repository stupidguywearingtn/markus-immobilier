# ÉTAT-PROJET — Markus Immobilier

> Lis ce fichier en tout début de session pour savoir où on en est.

## ✅ FAIT

- **Stack** : Next.js 15 + TS + Tailwind v4 + framer-motion + Lenis + shadcn (deps-only) + react-hook-form + zod.
- **Home** (hero : logo complet + vidéos dynamiques desktop/mobile ; sections dans l'ordre de la trame).
- **Pages** : `/annonces` + `/annonces/[id]`, `/faire-gerer`, `/estimation`, `/contact`, `/recrutement`, `/equipe`, `/honoraires` (barème réel), `/espace-client` (coming soon), pages légales.
- **Vrai logo** (SVG, dégradé via mask) : header + hero + favicon.
- **Vidéos hero fal.ai** (16:9 desktop + 9:16 mobile), plein cadre.
- **Illustrations animées** (fix `pathLength`) ; « Excellence » (médaille) sur `/recrutement`.
- **Carte Google Maps embed** sur `/contact` + section agence.
- **PageHero partagé** (offset header + tailles de titres).
- **Outil d'estimation — étapes 1→3 faites** : formulaire intelligent conditionnel · géocodage BAN · comparables DVF (CSV officiels data.gouv, 5 ans, médiane pondérée + 15 coefficients) · score /100 · positionnement · tendance 5 ans · voisinage · potentiel locatif · tableau comparables · analyse LLM « L'œil de l'expert » (Claude Haiku 4.5). OK en local.
- **Déployé Vercel** : https://markus-immobilier.vercel.app

## ⏳ À FAIRE — PRIORITÉ IMMÉDIATE

- **Vercel env vars** : ajouter `ANTHROPIC_API_KEY` + `RESEND_API_KEY` (action utilisateur).
- **Estimation — étape 4** : PDF du rapport (`@react-pdf/renderer`) charte Markus + bouton « Télécharger mon rapport » + email auto au client + à l'agence (Resend ; sandbox `onboarding@resend.dev` en attendant la vérif DNS de markusimmobilier.fr).
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

- Photos équipe (vraies, pas d'IA), photos des biens, photo de l'agence, PDF honoraires officiel, vraies annonces, infos légales (mentions).
- Accès DNS de markusimmobilier.fr pour vérifier le domaine Resend (mails clients réels).
- Valider la section bonus « Nos biens vendus » (parallaxe, hors trame).
