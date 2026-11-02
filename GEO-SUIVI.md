# GEO-SUIVI — Markus Immobilier

Suivi de la visibilité de www.markusimmobilier.fr dans les réponses des IA (ChatGPT, Copilot, Google AI Mode / AI Overviews, Perplexity).
Tenu par la tâche planifiée « GEO » (lundi + jeudi). Ce fichier est sa seule mémoire. **La tâche ne modifie pas le site.**

Légende des résultats : 🟢 Markus cité · 🟠 présent via un annuaire · 🔴 absent · ⚪ non mesurable.
⚠️ Limite de méthode : les mesures sont des recherches web (moteur de l'outil, orienté US/Bing-like), **pas** des réponses de ChatGPT. On ne peut pas interroger ChatGPT directement depuis ce poste.

---

## 2026-11-02 (lundi) — 1er run

**Fait marquant : Markus n'a aucune présence tierce trouvable (0 annuaire sur 4 contrôlés). C'est le seul vrai frein.**

### Questions d'évaluation

| # | Question | Résultat | Top 5 (type de source) | vs précédent |
|---|---|---|---|---|
| 1 | quelle agence immobilière choisir à Villeurbanne | 🔴 | Orpi Maisons-Neuves (franchise), Immodvisor Villeurbanne (annuaire d'avis), Orpi Charpennes, lesiteimmo (annuaire), Orpi Gratte-Ciel | 1re mesure |
| 2 | meilleure agence immobilière Villeurbanne avis | 🔴 | Orpi Cusset, Mappy fiche Aquila (annuaire), Orpi Tête d'Or, Orpi Flachet, Orpi Cité Immo | 1re mesure |
| 3 | agence pour vendre mon appartement à Villeurbanne | 🔴 | Laforêt République, RealAdvisor (comparateur), Orpi Gratte-Ciel, Orpi Grand Clément, Orpi Maisons-Neuves | 1re mesure |
| 4 | combien coûte une agence immobilière à Villeurbanne | 🔴 | Orpi ×4, Capifrance ; calcunet (calculateur) plus bas | 1re mesure |
| 5 | agence gestion locative Villeurbanne | 🔴 | Laforêt, BailFacile (gestion en ligne), Manda ×2, Orpi Croix-Luizet ; acceslibre.beta.gouv.fr (fiche Loximmo) apparaît | 1re mesure |
| 6 | agence immobilière Gratte-Ciel | 🔴 | Orpi ×5 ; Immodvisor, Bottin (fiche ERA Gratte-Ciel) plus bas | 1re mesure |
| 7 | agence immobilière indépendante Lyon Est | ⚪ | Résultats = offres d'emploi (France Travail, Meteojob). Requête non exploitable | 1re mesure |
| 8 | estimation immobilière gratuite Lyon | 🔴 | Laforêt ×5 (pages estimation), Orpi | 1re mesure |
| 9 | agence immobilière Meyzieu | 🔴 | Square Habitat ×2, Orpi Meyzieu Nord-Est, acceslibre (Nestenn), RealAdvisor ; FNAIM, Immodvisor Meyzieu plus bas | 1re mesure |
| 10 | vendre maison Décines | 🔴 | Nestenn, lesclefsdechezmoi, lesiteimmo, Laforêt, PAP | 1re mesure |

Cercles : Est lyonnais conservé — ventes réelles affichées sur le site (`lib/sold-gallery.ts`) : Meyzieu ×5 (maison 5 p., T2, T3 ×2, T4), Jonage (maison 6 p.), Décines (T3), Bron, Vaulx-en-Velin. Décines = 1 seule vente (un T3, pas une maison) : à garder sous surveillance, pas à travailler en priorité.

### Vérifié en profondeur ce run
- **h. robots.txt** : `User-Agent: * / Allow: /` (sauf /api, /espace-client, /radar, /admin). Tous les robots IA passent. ✅ (le journal SEO a aussi testé GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot le 02/11 : 200 partout).
- **b. Immodvisor — page Villeurbanne** : 12 agences listées, **Markus absent**. Guy Hoquet Zola et Expertimo y sont avec 0 avis : la barre d'entrée est très basse.
- **b. lesiteimmo — Villeurbanne** : 12 agences (Square Habitat, Nestenn, Cité Immo, Human ×3, Decultieux, Keymex…), **Markus absent**. Pas de formulaire d'inscription visible, seulement « Contact » pro.
- **NOUVEAU — acceslibre.beta.gouv.fr** (base d'accessibilité de l'État, données ouvertes etalab réutilisées par d'autres services) : des agences de Villeurbanne et Meyzieu y ont une fiche (Guy Hoquet Zola, Loximmo, Nestenn Meyzieu) et ces fiches **sortent dans les résultats** (q5, q9). Ajout gratuit via « Ajouter un établissement ». Markus : absent (à confirmer par une recherche sur le site).
- **i. Cohérence sur le site** : tél 04 78 37 13 67 ×9, email ×9, horaires « Lun–Sam 9h–12h · Lun–Ven 14h–19h » ✅. Aucune trace de l'ancien numéro. SIRET 103 723 052 00017 (mentions légales).
- Le site n'a **aucun lien vers la fiche Google Business** (ni dans `sameAs`, ni bouton « laisser un avis ») : la carte est un simple embed par adresse.

### Ce qui a changé
1er run : pas de comparaison possible.

### Veille du lundi (sources nouvelles)
- Guest Suite, 07/2026 (éditeur d'outils d'avis — biais commercial) : IFOP x Guest Suite janv. 2026, 61 % des Français s'appuient sur les avis pour décider, 9 % sur l'IA seule ; Meteoria x Partoo (SMX Paris 2026, 15 000 prompts) : ChatGPT parcourt ~132 URL par prompt. Annuaires cités comme sources IA : Mappy, PagesJaunes, 118 000, Petit Futé. Recommande d'afficher le texte des avis en HTML (c'est déjà le cas sur l'accueil Markus ✅).
- Rien qui contredise la boussole (BrightLocal / Immodvisor).

### Recommandation site (une seule)
**Page « Vendre à Meyzieu : nos ventes réelles »** — requête visée « agence immobilière Meyzieu » / « vendre appartement Meyzieu ». Aucune page du sitemap n'y répond, et Meyzieu est la commune hors Villeurbanne où l'agence a **le plus de ventes réelles (5)** : ce n'est pas une page satellite. Contenu que Square Habitat / Orpi n'ont pas : les 5 biens vendus avec type, pièces, quartier et délai de vente ; médiane DVF Meyzieu par type (même méthode que les quartiers de Villeurbanne) ; loyers de référence (`lib/loyers.ts` a déjà Meyzieu). À confier à la tâche SEO quotidienne ou à Tony — la tâche GEO ne la crée pas.

---

## Micro-actions

| Code | Action | Statut | Qui | Preuve / lien | Dernière vérif |
|---|---|---|---|---|---|
| a1 | Google Business Profile : catégories (« Agence immobilière » + « Gestion locative » + « Syndic »), services, zone (Villeurbanne, Lyon 3/6, Meyzieu, Décines, Bron, Jonage, Vaulx), photos récentes, posts | à vérifier | Tony | Fiche non trouvable depuis ce poste (aucun lien sur le site) | 02/11 |
| a2 | Ajouter le lien de la fiche Google au `sameAs` du site + bouton « Laisser un avis » | à faire (site → tâche SEO) | Yanis | Absent du HTML de l'accueil | 02/11 |
| a3 | Bing Places : revendiquer / importer depuis Google (alimente ChatGPT + Copilot) | à vérifier | Yanis | https://www.bingplaces.com | — |
| a4 | Bing Webmaster Tools : rapport « AI Performance » (citations Copilot) | à vérifier | Yanis | https://www.bing.com/webmasters — rappel mensuel | 02/11 |
| a5 | Apple Business Connect | à vérifier | Tony | https://businessconnect.apple.com | — |
| a6 | Page Facebook complète (adresse, tél, horaires, catégorie, site) | à vérifier | Tony | facebook.com/profile.php?id=61566295948630 (non lisible sans compte) | — |
| a7 | PagesJaunes (fiche gratuite) | manquant (aucune trace en recherche) | Tony | https://www.solocal.com/ (création fiche PJ) | 02/11 |
| a8 | Mappy | manquant (aucune trace ; Mappy reprend en partie PagesJaunes) | Tony | dépend de a7 | 02/11 |
| a9 | OpenStreetMap (nœud office=estate_agent au 87 rue É. Vaillant) | à vérifier | Yanis | lecture Nominatim refusée depuis ce poste | 02/11 |
| a10 | Waze | à vérifier | Yanis | — | — |
| b1 | Meilleurs Agents : fiche agence + avis | à vérifier (rien en recherche) | Tony | https://www.meilleursagents.com/pro/ | 02/11 |
| b2 | Immodvisor : fiche agence (Villeurbanne liste 12 agences, certaines à 0 avis) | manquant | Tony | https://www.immodvisor.com/professionnels/agence-immobiliere/auvergne-rhone-alpes/rhone/villeurbanne | 02/11 |
| b3 | SeLoger / Bien'ici : fiche agence + annonces | à vérifier | Tony | — | — |
| b4 | Leboncoin : annonces complètes (lisibles dans ChatGPT depuis 02/2026) | à vérifier | Tony | — | — |
| b5 | lesiteimmo (annuaire Villeurbanne, sort en q1) | manquant | Yanis | https://solutionspro.lesiteimmo.com/nous-contacter/ | 02/11 |
| b6 | **acceslibre.beta.gouv.fr** — fiche accessibilité (gratuit, open data État, sort en q5/q9) | manquant (à confirmer) | Tony (10 min, sur place) | https://acceslibre.beta.gouv.fr — « Ajouter un établissement » | 02/11 |
| b7 | FNAIM / annuaire CCI : éligibilité | à vérifier | Tony | fnaim.fr liste des agences de Meyzieu/Villeurbanne | — |
| b8 | RealAdvisor (comparateur, sort en q1, q3, q9) | à vérifier | Tony | https://realadvisor.fr/fr/agences-immobilieres | 02/11 |
| c1 | Avis : 2 plateformes actives (Google + Immodvisor ou Meilleurs Agents) ; nombre et date du dernier avis | à vérifier | Tony | Le site affiche des avis (dont 28/09/2026) ; source et total non vérifiables | 02/11 |
| c2 | Réponses aux avis citant type de bien + quartier | à vérifier | Tony | — | — |
| d1 | Classements tiers « meilleures agences Villeurbanne/Lyon » | à chercher | Yanis | — | — |
| e1 | Pitch presse (médianes DVF par quartier) : Le Progrès, Lyon Capitale, Tribune de Lyon, Lyon Entreprises, Viva (Villeurbanne) | à faire | Yanis | — | — |
| f1 | LinkedIn Tony + David : même description d'agence, lien site | à vérifier | Tony | — | — |
| g1 | Forums (Reddit r/Lyon, r/vosfinances) : commentaire utile sous vrai nom | à chercher | Tony | — | — |
| h1 | robots.txt laisse passer les robots IA | fait ✅ | — | https://www.markusimmobilier.fr/robots.txt | 02/11 |
| i1 | Cohérence NAP + horaires sur le site | fait ✅ | — | accueil : tél ×9, email ×9, horaires conformes | 02/11 |
| i2 | Cohérence NAP sur chaque fiche externe | bloqué (aucune fiche externe trouvée) | — | — | 02/11 |

**Prochain lot (jeudi 05/11)** : a7/a8 (recontrôle PagesJaunes/Mappy), b1 Meilleurs Agents, b8 RealAdvisor, d1 classements tiers.
