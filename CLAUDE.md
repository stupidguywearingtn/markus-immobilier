# CLAUDE.md — Markus Immobilier

Site vitrine d'une agence immobilière indépendante (Villeurbanne / Lyon). Refonte complète.

## Source de vérité
- **Design** : voir @design-system.md (couleurs, typo, composants, animations, illustrations). À respecter strictement.
- **Référence visuelle** : `/reference/markus-immobilier-maquette-v2.html` (la home, déjà validée) et `/reference/markus-illustrations-demo.html` (illustrations + dégradés). Reproduire ces composants et cette DA, ne pas réinventer.

## Stack recommandée
Next.js (App Router) + TypeScript + Tailwind + framer-motion + Lenis. (Permet d'utiliser directement les composants Skiper UI déjà choisis : parallaxe #30, trait scroll #19.) Adapter si besoin, mais garder les tokens du design-system.

## Marque — faits durs (ne jamais dévier)
- Nom : **MARKUS IMMOBILIER** (jamais « GRAND IMMO LYON »)
- Tél : **04 78 37 13 67** · Email : **villeurbanne@markusimmobilier.fr**
- Adresse : 87 rue Édouard Vaillant, 69100 Villeurbanne
- Couleurs : `#383E42` anthracite · `#FFFFFF` blanc · `#9EA596` vert-sauge (accent). Rien d'autre.
- Police : **Montserrat** uniquement.

## Structure du site
**Home (ordre EXACT, non négociable)** : Hero → Nos biens disponibles → Qui sommes-nous → [Nos biens vendus — parallaxe, section bonus] → Outil d'estimation → Suivez-nous + Discord → Notre agence (horaires + carte) → Footer.

**Pages dédiées** : Acheter/Louer (annonces) · Fiche bien · Faire gérer (formulaire syndic multi-étapes) · Estimation (l'outil) · Contact · Recrutement · Notre équipe · Nos honoraires · Espace client (phase 2).

**Redirections** : FR/EN (i18n) · Contactez-nous → /contact · On recrute → /recrutement · 👤 → /espace-client · Acheter/Louer → /annonces · Faire gérer → /faire-gerer · Estimation → /estimation · Notre équipe → /equipe · Honoraires → /honoraires (+ PDF).

## Règles « always »
- Toujours utiliser les tokens CSS du design-system (jamais de valeurs en dur).
- Chaque section ouvre par un eyebrow MAJ espacé sauge + un H2 (dégradé partiel possible).
- Animations : reveal au scroll + stagger ; respecter `prefers-reduced-motion`.
- Réutiliser le langage « action complétée » (chargement → confirmation → toast) là où c'est pertinent.
- Mobile-first : toutes les pages doivent être impeccables en responsive.
- Peu d'informations par écran, beaucoup de respiration.
