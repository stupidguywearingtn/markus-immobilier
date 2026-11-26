# GEO-SUIVI — Markus Immobilier

Suivi de la visibilité de www.markusimmobilier.fr dans les réponses des IA (ChatGPT, Copilot, Google AI Mode / AI Overviews, Perplexity).
Tenu par la tâche planifiée « GEO » (lundi + jeudi). Ce fichier est sa seule mémoire. **La tâche ne modifie pas le site.**

Légende des résultats : 🟢 Markus cité · 🟠 présent via un annuaire · 🔴 absent · ⚪ non mesurable.
⚠️ Limite de méthode : les mesures sont des recherches web (moteur de l'outil, orienté US/Bing-like), **pas** des réponses de ChatGPT. On ne peut pas interroger ChatGPT directement depuis ce poste.

---

## 2026-11-26 (jeudi) — 8e run

**Fait marquant : le pare-feu Vercel affiche désormais une page « Vercel Security Checkpoint » (vérification JavaScript, `x-vercel-mitigated: challenge`) — même au navigateur sur `sitemap.xml`, et une fois sur deux à GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot (résultats qui changent d'un essai à l'autre). Le 23/11 c'était un refus net (`deny`). Un robot ne sait pas passer ce genre de vérification, sauf s'il est reconnu « robot vérifié » par Vercel : non tranchable d'ici (accès Vercel MCP = 0 équipe). h1 reste l'action n°1. Markus : 0/10 (8e run). Leboncoin pro → diffusion automatique sur AVendreALouer (relancé le 04/11) : b4 vaut double.**

### Questions d'évaluation

| # | Question | Résultat | Top 5 (type de source) | vs 23/11 |
|---|---|---|---|---|
| 1 | quelle agence immobilière choisir à Villeurbanne | 🔴 | Immodvisor Villeurbanne (annuaire d'avis), **Leboncoin Decultieux**, Orpi Charpennes, Orpi Gratte-Ciel, Orpi Saint-Jean ; Laforêt, RealAdvisor, Bottin.fr plus bas | identique |
| 2 | meilleure agence immobilière Villeurbanne avis | 🔴 | **Leboncoin Decultieux (1re)**, Immodvisor fiche Guy Hoquet Zola, RealAdvisor ×3 (hors Villeurbanne) ; Immodvisor Villeurbanne 11e | identique |
| 3 | agence pour vendre mon appartement à Villeurbanne | 🔴 | Laforêt République ×2, Orpi Tolstoï, Orpi République, Orpi Château-Gaillard ; Orpi Cetrim estimation 6e | identique |
| 4 | combien coûte une agence immobilière à Villeurbanne | 🔴 | calcunet (calculateur), Orpi Gratte-Ciel, Orpi Tête d'Or, Orpi Croix-Luizet, Orpi Cusset ; barème Orpi (PDF), Leboncoin Decultieux 9e, Empruntis, Capifrance plus bas | Orpi remplace SeLoger/Laforêt (requête précisée « frais honoraires ») |
| 5 | agence gestion locative Villeurbanne | 🔴 | Laforêt, Foncia, Orpi Cetrim, BailFacile, Orpi Flachet ; acceslibre (Loximmo) 10e, Manda, Leboncoin Decultieux, Square Habitat plus bas | identique |
| 6 | agence immobilière Gratte-Ciel | 🔴 | **Leboncoin Decultieux (1re)**, Human Gratte-Ciel, Orpi ×3 ; Guy Hoquet, FNAIM plus bas | identique |
| 7 | agence immobilière indépendante Lyon Est | 🔴 | **Leboncoin Decultieux (1re)**, Leboncoin boutique 4222279, Mappy (Homicca), RealAdvisor, PagesJaunes Lyon 2e ; efficity, Square Habitat plus bas | identique |
| 8 | estimation immobilière gratuite Lyon | 🔴 | Orpi (page estimation Lyon, 1re), Laforêt ×4 ; Capifrance plus bas | identique |
| 9 | agence immobilière Meyzieu | 🔴 | Orpi Nord-Ouest, Orpi Nord-Est, Foncia, Square Habitat ×2 ; acceslibre (Nestenn), FNAIM ×2, RealAdvisor Blaow + Pro Deal, Immodvisor ×2, lesiteimmo, Mon Chasseur Immo, Mappy plus bas | identique |
| 10 | vendre maison Décines | 🔴 | Orpi (annonces) ×3, Guy Hoquet Décines ×2 ; Laforêt, lesiteimmo (dont page « vendu »), etreproprio, lesclefsdechezmoi plus bas | identique |

Rappel : recherches web de l'outil, **pas** des réponses de ChatGPT (non interrogeable d'ici). Le journal SEO signale un **nouveau core update Google (« December 2026 », depuis le 24/11)** : ne rien conclure sur les positions.

### Vérifié en profondeur ce run
- **h1 accès des robots — ALERTE qui change de forme** : `robots.txt` inchangé (`User-Agent: * / Allow: /`, sauf /api, /espace-client, /radar, /admin). Tests depuis ce poste (3 séries) : navigateur, ClaudeBot, Google-Extended, bingbot → 200 sur l'accueil ; GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot → **403 `x-vercel-mitigated: challenge`** une fois sur deux, variable d'un essai à l'autre (même Googlebot a pris un 403 une fois). `sitemap.xml` avec un user-agent de navigateur → page **« Vercel Security Checkpoint »**. Le 23/11 : `deny` ; le 19/11 : 7/7 en 200. Lecture : une protection anti-robots (Bot Protection en mode « Challenge » ou « Attack Challenge Mode ») est active. Les vrais robots d'OpenAI/Bing passent peut-être (Vercel laisse passer les robots qu'il a vérifiés par leur adresse IP), mais nos tests ne peuvent pas le prouver. **Test qui tranche** : Bing Webmaster Tools → Inspection d'URL → « Live URL » sur l'accueil et `/sitemap.xml` ; Vercel → Firewall → journaux filtrés sur « GPTBot / OAI-SearchBot / bingbot » (si des requêtes de ces robots sont « challenged » ou « denied » → les autoriser par une règle « Bypass »). Statut : **à vérifier (alerte)**, Yanis.
- **b4 Leboncoin** : aucune boutique Markus trouvée (recherche dédiée : seule la boutique Decultieux 21409 sort ; Leboncoin refuse la lecture d'ici, 403). **Nouveau** : depuis le 04/11, les annonces pros éligibles publiées sur Leboncoin sont **diffusées automatiquement sur AVendreALouer** (portail relancé, FR/EN/ES), gérées depuis l'Espace pro (MySweetImmo, 04/11, maj 11/11). → une boutique Leboncoin = 2 portails. Statut : manquant.
- **b8 RealAdvisor** : page Villeurbanne relue (35 noms : Century 21 Villa Urbana, Nestenn Villeurbanne Ouest, Avi Korssia, Novea, Catanéo, Pietrapolis, Blaow, Success Immo, Era Presqu'Île…). **Markus absent, confirmé.** Statut : manquant.
- **b13 Immovrai** : page d'inscription lue : « 100 % gratuit · vérifié avant publication · modifiable à tout moment · deux minutes », champs nom, SIRET, adresse (positionne la fiche, zone 15 km), tél, site, description, logo, photo de façade. Présence actuelle de Markus : non trouvable (les pages ville testées renvoient 404 ; carte non lisible d'ici). Statut : manquant (probable), Yanis.
- Sitemap (lu avec ClaudeBot) : 58 URL, inchangé. Pages existantes pour q4 (`/honoraires`), q5 (`/gestion-locative`), q6 (`/agence-immobiliere-gratte-ciel`), q8 (`/estimation-immobiliere-lyon`) ; toujours rien pour Meyzieu / Décines.

### Ce qui a changé
Côté Markus : rien dans les résultats. Côté site : le blocage du 23/11 (`deny`) est devenu une vérification (`challenge`), toujours gênante pour les robots IA. Côté sources : figé ; Leboncoin Decultieux toujours sur 6/10 (dont 1re en q2, q6, q7).

### Recommandation site (inchangée)
Page **« Vendre à Meyzieu : nos ventes réelles »** — absente du sitemap (58 URL vérifiées le 26/11).

---

## 2026-11-23 (lundi) — 7e run

**Fait marquant : ⚠️ le site renvoie « 403 Forbidden » (pare-feu Vercel, en-tête `x-vercel-mitigated: deny`) à toutes les requêtes de ce poste — navigateur, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Google-Extended, Bingbot — sauf ClaudeBot (200). Le 19/11 : 7/7 en 200 ; la tâche SEO a encore eu 200 ce matin à 07h42. Impossible de dire d'ici si les vrais robots d'OpenAI / Bing sont bloqués (nos tests usurpent leur nom depuis une IP qui n'est pas la leur) → vérification Vercel à faire par Yanis en priorité. Markus : 0/10 (7e run).**

### Questions d'évaluation

| # | Question | Résultat | Top 5 (type de source) | vs 19/11 |
|---|---|---|---|---|
| 1 | quelle agence immobilière choisir à Villeurbanne | 🔴 | Immodvisor Villeurbanne (annuaire d'avis), **Leboncoin Decultieux**, Orpi Charpennes, Orpi Gratte-Ciel, Orpi Saint-Jean ; Laforêt, RealAdvisor, Bottin.fr plus bas | identique |
| 2 | meilleure agence immobilière Villeurbanne avis | 🔴 | **Leboncoin Decultieux (1re)**, Immodvisor fiche Guy Hoquet Zola, RealAdvisor ×3 (hors Villeurbanne) ; Immodvisor Villeurbanne 11e | identique |
| 3 | agence pour vendre mon appartement à Villeurbanne | 🔴 | Laforêt République ×2, Orpi Tolstoï, Orpi République, Orpi Château-Gaillard ; Orpi Cetrim estimation 6e | identique |
| 4 | combien coûte une agence immobilière à Villeurbanne | 🔴 | calcunet (calculateur), **Leboncoin Decultieux**, SeLoger édito (média), Laforêt, Orpi (article estimation) | ≈ identique |
| 5 | agence gestion locative Villeurbanne | 🔴 | Laforêt, Foncia, Orpi Cetrim, BailFacile, Orpi Flachet ; acceslibre (Loximmo) 10e, Manda, Leboncoin Decultieux 17e | identique |
| 6 | agence immobilière Gratte-Ciel | 🔴 | **Leboncoin Decultieux (1re)**, Human Gratte-Ciel, Orpi ×3 ; Guy Hoquet, FNAIM plus bas | identique |
| 7 | agence immobilière indépendante Lyon Est | 🔴 | **Leboncoin Decultieux (1re)**, Leboncoin boutique 4222279, Mappy (Homicca), RealAdvisor, PagesJaunes Lyon 2e | identique |
| 8 | estimation immobilière gratuite Lyon | 🔴 | Orpi (page estimation Lyon, 1re), Laforêt ×4 ; Capifrance plus bas | Orpi passe 1er |
| 9 | agence immobilière Meyzieu | 🔴 | Orpi Nord-Ouest, Orpi Nord-Est, Foncia, Square Habitat ×2 ; acceslibre (Nestenn), FNAIM ×2, RealAdvisor Blaow + Pro Deal, Immodvisor, lesiteimmo, Mon Chasseur Immo, Mappy plus bas | ≈ identique |
| 10 | vendre maison Décines | 🔴 | Orpi (annonces) ×3, Guy Hoquet Décines ×2 ; Laforêt, Nestenn, lesiteimmo (dont page « vendu »), etreproprio plus bas | PAP sort |

Rappel : recherches web de l'outil, **pas** des réponses de ChatGPT (non interrogeable d'ici). Core update Google toujours en cours (J+13 selon le journal SEO) : ne rien conclure sur les positions.

### Vérifié en profondeur ce run
- **h1 robots / accès des robots — ALERTE** : `robots.txt` lui-même est inchangé (`User-Agent: * / Allow: /`, lu avec l'user-agent ClaudeBot). Mais la page d'accueil, `robots.txt` et `sitemap.xml` renvoient **403 + `x-vercel-mitigated: deny`** à tout autre user-agent depuis ce poste (testé 3 fois, `markusimmobilier.fr` et `www.`). C'est le **pare-feu Vercel**, pas le code (`proxy.ts` ne bloque rien, pas de `vercel.json`). Deux lectures possibles : (a) seule l'IP de ce conteneur est filtrée (protection anti-robots qui laisse passer les robots « vérifiés ») → sans conséquence ; (b) une règle « AI Bots » ou un mode d'attaque a été activé → GPTBot, OAI-SearchBot et Bingbot réels seraient bloqués, ce qui couperait ChatGPT et Copilot. **Non tranchable d'ici** (Vercel MCP : accès à l'équipe non autorisé). Test simple : inspection d'URL « test en direct » dans Bing Webmaster Tools et Google Search Console, + onglet Firewall de Vercel. Statut h1 : **à vérifier (alerte)**.
- **b2 Immodvisor** : aucune page d'inscription gratuite trouvée ; Immodvisor vend un outil d'avis aux pros (fiche liée à l'abonnement, à confirmer). La FAQ est le point d'entrée. Statut : à vérifier par Tony (appel ou formulaire), priorité sous b4/b8.
- **c1 Avis du site** : 3 avis affichés, le plus récent **28/09/2026** (8 semaines), puis 30/06 et 07/05. Inchangé. Aucune note ni total Google lisible.
- **e1 Le Progrès** : adresse de la rédaction de Villeurbanne non trouvée par le moteur. Reste à Yanis (page contact leprogres.fr ou standard de l'agence Lyon).
- **NOUVEAU b13 Immovrai** : carte d'agences avec **inscription gratuite** pour les agences (page dédiée). Immovrai sort déjà sur « prix m² Villeurbanne » (titre « ventes DVF 2026 », relevé par la tâche SEO) : même angle que les médianes DVF de Markus.
- Sitemap : 58 URL, toujours aucune page Meyzieu/Décines/Bron/Jonage/Vaulx. `sameAs` : 6 réseaux, toujours pas la fiche Google (a2). Tél. ×9 sur l'accueil ✅.

### Veille du lundi
- BrightLocal « Local AI Visibility Study » (16/09/2026, M. Hawkes ; ~200 000 recherches locales, 1 967 762 citations — c'est l'étude de la boussole, biais commercial assumé) : **sites d'entreprise = 42 % des citations**, fiche Google = 28,6 %, Yelp 9,5 % ; recoupement entre deux recherches répétées : 20–33 %. → Nuance la boussole : le site compte aussi (surtout côté Google), mais la fiche Google reste la 1re source unique.
- Yext (09/10/2025, 6,8 M citations, vendeur d'annuaires — biais fort) : Gemini favorise les sites des marques, **OpenAI s'appuie surtout sur les annuaires tiers** ; Reddit ≈ 2 %. iPullRank (maj 26/10/2026) ne fait que reprendre Yext.
- Leboncoin Immo relance la marque AVendreALouer (MySweetImmo, 04/11/2026) : à vérifier si les annonces pros Leboncoin y sont reprises (lié à b4).
- Rien ne contredit la boussole : ChatGPT = annuaires ; Google = fiche Google + site.

### Ce qui a changé
Côté Markus : rien dans les résultats. **Nouveau risque technique** : pare-feu Vercel qui refuse nos requêtes (cf. h1). Côté sources : quasi figé ; Leboncoin Decultieux toujours sur 6/10.

### Recommandation site (inchangée)
Page **« Vendre à Meyzieu : nos ventes réelles »** — absente du sitemap (58 URL vérifiées le 23/11).

---

## 2026-11-19 (jeudi) — 6e run

**Fait marquant : la boutique Leboncoin de Decultieux (agence indépendante, Villeurbanne) sort désormais sur 6 questions sur 10 (q1, q2, q4, q5, q6, q7), dont 1re en q2, q6, q7. Markus : toujours 0/10. Nouvel annuaire en q1 : Bottin.fr (87 agences de Villeurbanne, Markus absent).**

### Questions d'évaluation

| # | Question | Résultat | Top 5 (type de source) | vs 16/11 |
|---|---|---|---|---|
| 1 | quelle agence immobilière choisir à Villeurbanne | 🔴 | Immodvisor Villeurbanne (annuaire d'avis), **Leboncoin boutique Decultieux**, Orpi Charpennes, Orpi Gratte-Ciel, Orpi Cusset ; Laforêt, **Bottin.fr (annuaire)**, RealAdvisor plus bas | Leboncoin monte 2e, Bottin entre |
| 2 | meilleure agence immobilière Villeurbanne avis | 🔴 | **Leboncoin Decultieux (1re)**, Immodvisor fiche Guy Hoquet Zola, RealAdvisor ×3 (hors Villeurbanne) ; Immodvisor Villeurbanne 11e | Leboncoin + Immodvisor entrent |
| 3 | agence pour vendre mon appartement à Villeurbanne | 🔴 | Laforêt République ×2, Orpi Tolstoï, Orpi République, Orpi Château-Gaillard ; Orpi Cetrim estimation plus bas | RealAdvisor sort du top 5 |
| 4 | combien coûte une agence immobilière à Villeurbanne | 🔴 | calcunet (calculateur), **Leboncoin Decultieux**, SeLoger édito (média), Laforêt ×2 | identique |
| 5 | agence gestion locative Villeurbanne | 🔴 | Laforêt, Foncia, Orpi Cetrim, BailFacile, Orpi Flachet ; acceslibre (Loximmo) 10e, Manda, Leboncoin Decultieux, Square Habitat plus bas | Foncia monte, Leboncoin entre (17e) |
| 6 | agence immobilière Gratte-Ciel | 🔴 | **Leboncoin Decultieux (1re)**, Human Gratte-Ciel, Orpi ×3 ; annonces Guy Hoquet, FNAIM plus bas | identique |
| 7 | agence immobilière indépendante Lyon Est | 🔴 | **Leboncoin Decultieux (1re)**, Leboncoin boutique 4222279, Mappy (Homicca), RealAdvisor, PagesJaunes annuaire Lyon 2e ; efficity, Mappy plus bas | PagesJaunes monte 5e |
| 8 | estimation immobilière gratuite Lyon | 🔴 | Orpi, Laforêt ×4 (pages estimation) | identique |
| 9 | agence immobilière Meyzieu | 🔴 | Orpi Nord-Ouest, Orpi Nord-Est, Foncia, Square Habitat ×2 ; acceslibre (Nestenn), FNAIM ×2, **RealAdvisor vitrines Blaow + Pro Deal**, Immodvisor, lesiteimmo, Mappy plus bas | ≈ identique |
| 10 | vendre maison Décines | 🔴 | Orpi (annonces) ×2, PAP, Guy Hoquet ×2 ; Laforêt, Nestoria, Capifrance, lesiteimmo, lesclefsdechezmoi plus bas | ≈ identique |

Rappel : recherches web de l'outil, **pas** des réponses de ChatGPT (non interrogeable d'ici). Le core update Google (depuis le 10/11) tourne toujours : ne rien conclure sur les positions.

### Vérifié en profondeur ce run
- **b5 lesiteimmo** : page Villeurbanne lue (12 agences : Square Habitat ×2, Nestenn, Xpertisimmo, Cité Immo, Cimm, Human ×3, Decultieux, Keymex, DSI). **Markus absent, confirmé.** Pas de formulaire d'inscription ; seulement « Diffuser ses annonces » (pied de page) et le contact pro. Les fiches semblent venir de la diffusion d'annonces → lié à b3/b4. Sort en q9 et q10.
- **b12 Bottin.fr (NOUVEAU)** : page « Agences immobilières à Villeurbanne » sort en q1. Lue : **87 établissements** (dont beaucoup d'indépendants et de mandataires seuls), **Markus absent**. Bouton « Ajouter un établissement » sur la page ; options payantes existent (« Publicité & Sponsorisation ») — ne prendre que la fiche gratuite.
- **b11 Omny** : start-up française (CEO Franck Le Tendre) qui fait chercher un logement **dans ChatGPT** en langage naturel et transmet le contact au conseiller. Seule source branchée connue : **iad** (annonce 29/09/2026, maj 06/11). Rien sur les agences indépendantes. → Yanis peut écrire à Omny pour savoir si une agence indépendante peut y brancher ses annonces. Priorité moyenne.
- **a5 Apple** : Apple Business Connect a été **remplacé par « Apple Business »** (annonce Apple 24/03/2026, gratuit depuis le 14/04, 200+ pays, données migrées automatiquement). C'est là qu'on revendique la fiche Plans / Siri. Présence de Markus dans Plans : à vérifier (Plans non lisible d'ici). URL : business.apple.com.
- **a10 Waze** : Waze **ne passe pas** par la fiche Google Business ; ajout du lieu dans l'appli (Signaler → Lieu, photo de la façade, catégorie) validé par des éditeurs bénévoles, ou via l'éditeur de carte. Gratuit (aucun coût mentionné). Présence actuelle : à vérifier dans l'appli.
- **a6 Facebook** : page non lisible d'ici (accès refusé). Reste à vérifier par Tony.
- **a2 lien fiche Google** : toujours absent du `sameAs` et du HTML de l'accueil (6 réseaux, pas Google).
- **h1 robots.txt** : inchangé ; 7 robots IA → 200 ✅. Sitemap : 58 URL, aucune page Meyzieu/Décines/Bron/Jonage/Vaulx.

### Ce qui a changé
Côté Markus : rien. Côté sources : la **page boutique Leboncoin** d'un indépendant de Villeurbanne passe de 3-4 à **6 questions sur 10**. C'est aujourd'hui la source tierce la plus transversale de nos mesures, devant RealAdvisor. b4 devient l'action n°1. Bottin.fr entre (q1).

### Recommandation site (inchangée)
Page **« Vendre à Meyzieu : nos ventes réelles »** — absente du sitemap (58 URL vérifiées le 19/11).

---

## 2026-11-16 (lundi) — 5e run

**Fait marquant : rien ne bouge (Markus 0/10, 5e run de suite). Les mêmes sources tiennent le top : RealAdvisor, Leboncoin boutique Decultieux, Immodvisor. Une page PagesJaunes « agences immobilières » sort désormais en q7.**

### Questions d'évaluation

| # | Question | Résultat | Top 5 (type de source) | vs 12/11 |
|---|---|---|---|---|
| 1 | quelle agence immobilière choisir à Villeurbanne | 🔴 | RealAdvisor (Beauvallon), Immodvisor Villeurbanne (annuaire d'avis), RealAdvisor ×2 (autres communes), RealAdvisor (quartier Charpennes-Wilson) ; Orpi Charpennes/Gratte-Ciel, Leboncoin boutique Decultieux plus bas | identique |
| 2 | meilleure agence immobilière Villeurbanne avis | 🔴 | 16 pages RealAdvisor hors Villeurbanne (moteur bruité) | identique |
| 3 | agence pour vendre mon appartement à Villeurbanne | 🔴 | Laforêt République, RealAdvisor ×2 (quartiers), Orpi République, Orpi Maisons-Neuves ; RealAdvisor vitrine Avi Korssia 13e | Orpi Cetrim estimation entre |
| 4 | combien coûte une agence immobilière à Villeurbanne | 🔴 | calcunet (calculateur), SeLoger édito (média), **Leboncoin boutique Decultieux**, Laforêt ×2 | identique |
| 5 | agence gestion locative Villeurbanne | 🔴 | Laforêt, BailFacile, Manda, Orpi Cetrim, Square Habitat ; acceslibre (Loximmo) 8e, Foncia plus bas | identique |
| 6 | agence immobilière Gratte-Ciel | 🔴 | **Leboncoin boutique Decultieux (1re)**, Human Gratte-Ciel, Orpi ×3 ; annonces FNAIM plus bas | Leboncoin revient 1er |
| 7 | agence immobilière indépendante Lyon Est | 🔴 | Leboncoin Decultieux (1re), Leboncoin boutique 4222279, RealAdvisor, efficity ×2 (mandataires) ; Mappy (Homicca), **PagesJaunes annuaire Lyon 2e**, Custplace plus bas | PagesJaunes entre |
| 8 | estimation immobilière gratuite Lyon | 🔴 | Laforêt ×12, Orpi | identique |
| 9 | agence immobilière Meyzieu | 🔴 | Square Habitat ×2, Orpi Nord-Ouest, Orpi Nord-Est, RealAdvisor vitrine Blaow ; acceslibre (Nestenn), RealAdvisor Pro Deal, Foncia, FNAIM, Immodvisor, lesiteimmo plus bas | identique |
| 10 | vendre maison Décines | 🔴 | Orpi (annonces) ×2, lesclefsdechezmoi (portail), Guy Hoquet, Nestoria (agrégateur) ; PAP, Laforêt, Capifrance, lesiteimmo plus bas | identique |

Rappel : recherches web de l'outil, **pas** des réponses de ChatGPT (non interrogeable d'ici).

### Vérifié en profondeur ce run
- **b9 Cylex** : page Villeurbanne toujours illisible d'ici (fetch refusé). En recherche `site:cylex-locale.fr` : fiches Foncia Location, Agence CC Immo, Iméance (Villeurbanne). **Markus : aucune fiche trouvée.** Statut : manquant (probable), inscription gratuite à faire par Yanis.
- **b10 Zimo** : Zimo est un **moteur d'annonces immobilières** ; ses pages « professionnel » (ACI Immobilier, Accorimm Villeurbanne, CIMM Immobilier) semblent créées à partir des flux d'annonces des agences. **Markus : aucune page.** Pas une inscription manuelle : se règle si le logiciel d'annonces de Tony diffuse vers Zimo (lié à b3). Priorité basse.
- **c3 Custplace** : page illisible (erreur du site). La recherche « custplace agence immobilière Villeurbanne » ne sort **aucune** fiche Custplace de Villeurbanne ; une seule fiche Custplace (Espaces Atypiques Bellecour) sort en q7. Priorité basse — garder Google + RealAdvisor comme les 2 plateformes d'avis.
- **f1 LinkedIn Tony / David** : recherche « Tony Pistilli LinkedIn immobilier Villeurbanne » → **aucun profil trouvé** par le moteur (seulement d'autres agents). Non mesurable d'ici : Yanis doit vérifier à la main que les 2 profils existent, sont publics et portent la même phrase d'agence + le lien du site.
- **h1 robots.txt** : inchangé ; 7 robots IA → 200 ✅. Sitemap : 58 URL, toujours aucune page Meyzieu/Décines/Bron/Jonage/Vaulx.

### Ce qui a changé
Côté Markus : rien. Côté sources : PagesJaunes (page annuaire) entre en q7 → renforce a7 (fiche PagesJaunes = aussi Mappy). Classement quasi figé depuis le 09/11 : les gagnants restent les agences qui ont **une vitrine sur un annuaire** (RealAdvisor, Leboncoin), pas celles qui ont le meilleur site. Contexte : un core update Google tourne depuis le 10/11 (journal SEO) — ne rien conclure sur les positions de cette semaine.

### Veille du lundi
- Stratenet, « Baromètre GEO de l'immobilier belge », oct. 2026 (agence partenaire HubSpot — biais commercial) : 50 agences, 50 questions, 403 réponses ChatGPT / Perplexity / AI Overview. **33 % des réponses ne citent aucune agence** ; 10 agences sur 50 jamais citées ; 14 des 40 citées n'apparaissent que sur un seul moteur ; **le volume d'annonces ne prédit pas la citation** (un leader à 12,3 % des annonces = 2 % des citations ; deux agences à ~5 % des annonces à Liège = 0 citation). Belgique, pas France, mesure d'un jour. Conforte la boussole (moteurs différents → travailler les deux ; ce qui compte = être lisible dans les sources tierces).
- MySweetImmo, 06/10/2026 (média qui vend de la visibilité — biais) : aucun chiffre GEO nouveau. Confirme AI Overviews/AI Mode en France depuis le 22/07/2026 et que Google dit qu'aucun balisage spécial n'est nécessaire. Cite Leboncoin et **Omny** comme déjà intégrés à ChatGPT → Omny à vérifier (nouvelle ligne b11).
- Rien ne contredit la boussole BrightLocal / Immodvisor.

### Recommandation site (inchangée)
Page **« Vendre à Meyzieu : nos ventes réelles »** — absente du sitemap (58 URL vérifiées le 16/11).

---

## 2026-11-12 (jeudi) — 4e run

**Fait marquant : deux petites agences de Meyzieu (Blaow, Pro Deal Transaction) sortent en q9 avec leur simple vitrine RealAdvisor, et la boutique Leboncoin de Decultieux sort désormais 1re en q7. Markus : toujours 0/10.**

### Questions d'évaluation

| # | Question | Résultat | Top 5 (type de source) | vs 09/11 |
|---|---|---|---|---|
| 1 | quelle agence immobilière choisir à Villeurbanne | 🔴 | RealAdvisor (page quartier Beauvallon), Immodvisor Villeurbanne (annuaire d'avis), RealAdvisor ×2 (autres communes), Orpi Charpennes ; Orpi Gratte-Ciel, Leboncoin boutique Decultieux plus bas | RealAdvisor monte en tête |
| 2 | meilleure agence immobilière Villeurbanne avis | 🔴 | 16 pages RealAdvisor, toutes hors Villeurbanne (moteur à côté de la question) | résultat bruité, RealAdvisor seul |
| 3 | agence pour vendre mon appartement à Villeurbanne | 🔴 | Laforêt République, RealAdvisor (quartier), RealAdvisor (quartier), Orpi République, Orpi Maisons-Neuves ; **RealAdvisor vitrine Avi Korssia** (indépendant) plus bas | ≈ identique |
| 4 | combien coûte une agence immobilière à Villeurbanne | 🔴 | calcunet (calculateur), SeLoger édito (média), **Leboncoin boutique Decultieux**, Laforêt ×2 | SeLoger édito entre |
| 5 | agence gestion locative Villeurbanne | 🔴 | Laforêt, BailFacile, Manda, Orpi Cetrim, Square Habitat ; acceslibre (Loximmo) 8e, Foncia plus bas | acceslibre revient |
| 6 | agence immobilière Gratte-Ciel | 🔴 | Human Gratte-Ciel 1er, puis résultats hors sujet (Grasse, Paris, Dubaï) | Leboncoin Decultieux sort, bruit |
| 7 | agence immobilière indépendante Lyon Est | 🔴 | **Leboncoin boutique Decultieux (1re)**, Leboncoin boutique 4222279, RealAdvisor, efficity (mandataires), Mappy (Homicca) | devient exploitable (était ⚪) |
| 8 | estimation immobilière gratuite Lyon | 🔴 | Laforêt ×12, Orpi | identique |
| 9 | agence immobilière Meyzieu | 🔴 | Square Habitat ×2, Orpi Nord-Ouest, Orpi Nord-Est, **RealAdvisor vitrine Blaow immobilier** ; acceslibre (Nestenn), **RealAdvisor vitrine Pro Deal**, Foncia, FNAIM, Immodvisor, lesiteimmo plus bas | 2 vitrines RealAdvisor d'indépendants entrent |
| 10 | vendre maison Décines | 🔴 | Orpi (annonce) ×2, lesclefsdechezmoi (portail), Guy Hoquet, Nestoria (agrégateur) | identique |

Rappel : recherches web de l'outil, **pas** des réponses de ChatGPT (non interrogeable d'ici). Le moteur a été plus bruité que d'habitude (q2, q6).

### Vérifié en profondeur ce run
- **a9 OpenStreetMap** : Nominatim répond enfin. Le 87 rue Édouard Vaillant existe comme simple adresse (nœud 2685093389, quartier Gratte-Ciel) **sans aucun commerce** ; recherche « Markus Immobilier » = 0 résultat. **Manquant confirmé.** Ajout gratuit en 10 min sur openstreetmap.org (point « office=estate_agent » + nom, tél, site, horaires). OSM alimente Apple Plans, Waze en partie et de nombreuses applis.
- **a3 Bing Places** : l'outil a déménagé sur **bing.com/forbusiness** (oct. 2025). Import direct depuis la fiche Google avec **vérification instantanée** (source : ppc.land). Présence actuelle de Markus : à vérifier (Bing non lisible d'ici). Dépend de a1 (avoir accès à la fiche Google).
- **b3 SeLoger / Bien'ici** : ces portails ne sont pas indexés par le moteur de l'outil (recherche `site:bienici.com` → 0 résultat Bien'ici). Aucune trace de Markus. À vérifier par Tony : son logiciel d'annonces diffuse-t-il vers SeLoger / Bien'ici / Leboncoin ? Piste écartée : `data/test.json` contient des annonces Leboncoin, mais ce sont des annonces d'autres agences (données de test), pas celles de Markus.
- **b7 FNAIM** : une fiche FNAIM (adresse, tél, services, annonces) sort en q9 pour Meyzieu. Markus n'est pas adhérent visible (carte pro CCI, aucune mention FNAIM sur le site). L'adhésion est payante : **décision de Tony, priorité basse** (pas une micro-action gratuite).
- **h1 robots.txt** : inchangé ; 7 robots IA → 200 ✅.
- **Nouveaux repérés** : Custplace (plateforme d'avis, ses fiches agences sortent en q6/q7) ; Zimo (annuaire de pros, sort sur 2 requêtes Villeurbanne ; page illisible d'ici).

### Ce qui a changé
Côté Markus : rien. Côté sources : RealAdvisor confirme qu'une **simple vitrine d'agence indépendante** suffit à sortir (Avi Korssia en q3, Blaow et Pro Deal en q9). Leboncoin Decultieux passe 1er en q7. Sitemap : 58 URL, toujours pas de page Meyzieu.

### Recommandation site (inchangée)
Page **« Vendre à Meyzieu : nos ventes réelles »** — absente du sitemap (58 URL vérifiées le 12/11).

---

## 2026-11-09 (lundi) — 3e run

**Fait marquant : une agence indépendante de Villeurbanne (Decultieux) sort 1re sur « agence immobilière Gratte-Ciel » grâce à sa simple page boutique Leboncoin, et cette page sort aussi en q1 et q4. Markus : toujours 0/10.**

### Questions d'évaluation

| # | Question | Résultat | Top 5 (type de source) | vs 05/11 |
|---|---|---|---|---|
| 1 | quelle agence immobilière choisir à Villeurbanne | 🔴 | Orpi Maisons-Neuves, Immodvisor Villeurbanne (annuaire d'avis), Orpi Charpennes, lesiteimmo (annuaire), Orpi Gratte-Ciel ; Leboncoin boutique Decultieux + RealAdvisor (C21 Villa Urbana) plus bas | Leboncoin + RealAdvisor entrent |
| 2 | meilleure agence immobilière Villeurbanne avis | 🔴 | Orpi Cusset, Mappy Aquila (annuaire, source PagesJaunes), Orpi Tête d'Or, Orpi Flachet, Orpi Cité Immo ; RealAdvisor C21, Mappy Pietrapolis plus bas | identique |
| 3 | agence pour vendre mon appartement à Villeurbanne | 🔴 | Laforêt République, RealAdvisor (page quartier), Orpi Cetrim, Orpi Gratte-Ciel, Orpi Grand Clément ; Human Gratte-Ciel, RealAdvisor agent plus bas | identique |
| 4 | combien coûte une agence immobilière à Villeurbanne | 🔴 | calcunet (calculateur), Orpi Cetrim, Orpi Cité Immo, **Leboncoin boutique Decultieux**, Laforêt (blog tarifs) | calcunet monte 1er, Leboncoin entre |
| 5 | agence gestion locative Villeurbanne | 🔴 | Manda, BailFacile, Orpi République, Square Habitat, Manda ; Foncia plus bas | ≈ identique |
| 6 | agence immobilière Gratte-Ciel | 🔴 | **Leboncoin boutique Decultieux (1er)**, Human Gratte-Ciel, Orpi ×3 | Leboncoin entre 1er |
| 7 | agence immobilière indépendante Lyon Est | ⚪ | offres d'emploi (France Travail, Meteojob, HelloWork) | non exploitable |
| 8 | estimation immobilière gratuite Lyon | 🔴 | Laforêt ×5, Orpi | identique |
| 9 | agence immobilière Meyzieu | 🔴 | Square Habitat ×2, Orpi Meyzieu Nord-Est, Orpi local, acceslibre (Nestenn) ; RealAdvisor, Foncia, FNAIM, Immodvisor, lesiteimmo plus bas | identique |
| 10 | vendre maison Décines | 🔴 | Orpi (annonce), lesclefsdechezmoi (portail), Guy Hoquet, Nestoria (agrégateur), PAP | Nestenn sort du top 5 |

Rappel : recherches web de l'outil, **pas** des réponses de ChatGPT (non interrogeable d'ici).

### Vérifié en profondeur ce run
- **b4 Leboncoin (NOUVEAU, priorité montée)** : `leboncoin.fr/boutique/21409` = Decultieux Immobilier (32 cours Émile-Zola, agence familiale indépendante, 39 annonces). Titre de page « agence immobilière à Villeurbanne » + texte de présentation + horaires. Elle sort en **q1, q4, q6 (1re)**. Une page boutique pro Leboncoin bien remplie suffit donc à entrer dans nos questions — et Leboncoin est lisible par ChatGPT depuis 02/2026. Boutique Markus : **non trouvée** (recherche dédiée). À vérifier par Tony : a-t-il un compte pro Leboncoin ? si oui, compléter la présentation.
- **b6 acceslibre** : recherche « markus » sur acceslibre → aucun établissement Markus Immobilier (seulement un hôtel, un coiffeur, un bar…). **Manquant confirmé.** Formulaire : https://acceslibre.beta.gouv.fr/contrib/start/ . Les fiches concurrentes (ex. Guy Hoquet Zola, créée 05/12/2023, jamais mise à jour) suffisent à sortir en q5/q9.
- **c1 Avis** : avis affichés sur l'accueil (base du site) : les plus récents datent du 28/09/2026, puis 30/06 et 07/05/2026. Aucune page d'avis tierce trouvée (ni Immodvisor, ni RealAdvisor, ni Mappy). Nombre d'avis Google : **à vérifier** (fiche introuvable d'ici, toujours aucun lien vers elle sur le site — a2).
- **g1 Forums** : Reddit n'est pas indexé par le moteur de l'outil (recherche `site:reddit.com` → 0 résultat Reddit). **Non mesurable d'ici** : à faire à la main par Yanis (10 min sur reddit.com/r/Lyon, recherche « agence immobilière »).
- **e1 Presse** : cibles repérées qui publient sur les prix à Villeurbanne **sans aucune source chiffrée ni pro cité** : news.lesiteimmo.com (« Villeurbanne moins cher que Lyon », 21/04/2026, avis d'expert anonyme, aucune source) ; MoneyVox « Vigie des prix » (17/10/2026, chiffres MeilleursAgents, rédigé avec un outil → peu de place pour un pro). Cible n°1 retenue : **Le Progrès, édition Villeurbanne** (rédaction locale) ; n°2 : Lyon Entreprises. Pitch prêt ci-dessous.
- **h1 robots.txt** : inchangé ; 7 robots IA → 200 ✅ (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, bingbot).
- **b9 Cylex** : page non lisible d'ici (erreur du site). Reste à vérifier.

### Pitch presse (e1) — à envoyer par Tony, sous son nom
> Objet : Villeurbanne, prix réels par quartier — les chiffres des ventes notariées
> Bonjour, je dirige Markus Immobilier, agence indépendante à Villeurbanne. Nous publions les médianes de prix par quartier calculées sur les ventes réelles enregistrées par l'État (DVF), pas sur des prix affichés. Les écarts entre Gratte-Ciel, Cusset, Charpennes ou Grand Clément sont nets, et souvent loin des prix affichés. Je peux vous transmettre le tableau, la méthode et commenter ce que ça change pour un vendeur en 2026. Disponible pour un échange de 10 minutes. Tony Pistilli — 04 78 37 13 67

### Modèles de réponse aux avis (c2) — à adapter, jamais copiés tels quels
1. « Merci Claire ! Vendre votre T3 à Grand Clément en 6 semaines, avec un acheteur déjà financé, c'était l'objectif. Bonne suite à Lyon 3. — Tony, Markus Immobilier »
2. « Merci M. et Mme D. Votre maison de Meyzieu méritait une vraie mise en valeur : ravi que les visites aient été ciblées. — Tony »
3. « Merci Karim. La gestion de votre studio aux Charpennes continue avec nous : n'hésitez pas pour la révision du loyer en janvier. — David »

### Ce qui a changé
Côté Markus : rien. Côté sources : Leboncoin (page boutique d'une agence indépendante) entre dans 3 questions dont une à la 1re place ; RealAdvisor apparaît désormais en q1, q2, q3, q9 (pages agence, quartier et agent) → c'est l'annuaire le plus transversal, il reste l'action n°1. Nestenn sort du top 5 en q10.

### Veille du lundi
- Journal du Net, 12/10/2026 (F. Berthoud, Kappn — biais commercial) : aucun chiffre nouveau. Points utiles : distinguer « agence citée dans la réponse » / « site cité comme source » / « agence recommandée » ; privilégier « quelques profils pros pertinents plutôt que beaucoup d'annuaires automatiques » ; publier des exemples de ventes anonymisés et nommer les pros. Ne contredit pas la boussole.
- BrightLocal « AI directory sources » (26/08/2026, mis à jour 16/09) : c'est l'étude ~1,9 M de citations déjà dans la boussole ; pas de version plus récente trouvée.
- Rappel Bing AI Performance (a4) : déjà fait le 02/11, prochain rappel le 07/12.

### Recommandation site (inchangée)
Page **« Vendre à Meyzieu : nos ventes réelles »** — toujours absente du sitemap (58 URL vérifiées le 09/11). Note : la page `/agence-immobiliere-gratte-ciel` existe mais ne sort pas en q6 ; ce n'est pas un manque de page, c'est un manque de sources externes.

---

## 2026-11-02 → 2026-11-05 (runs 1-2, résumés)

- **Fait marquant du 1er run** : Markus n'a aucune présence tierce trouvable ; 0/10 aux deux runs. q7 non exploitable le 02/11 (offres d'emploi), exploitable depuis.
- **Cercles** : Est lyonnais gardé — ventes réelles affichées sur le site (`lib/sold-gallery.ts`) : Meyzieu ×5 (maison 5 p., T2, T3 ×2, T4), Jonage (maison 6 p.), Décines (1 T3), Bron, Vaulx-en-Velin. Décines = 1 seule vente : surveiller, pas prioritaire.
- **Constats durables** : Immodvisor et lesiteimmo Villeurbanne = 12 agences chacun, Markus absent (certaines fiches Immodvisor à 0 avis) ; acceslibre (open data État) sort en q5/q9 ; **une fiche PagesJaunes alimente aussi Mappy** (« Source : Pages Jaunes ») ; RealAdvisor Villeurbanne classe « proximité + ventes 24 mois » (Century 21 Villa Urbana : 50 ventes, 4,8/5 sur 380 avis) ; aucun classement éditorial tiers « meilleures agences » ; Meilleurs Agents ne sort sur aucune question. Site : NAP ✅ (tél ×9, email ×9, horaires conformes, SIRET 103 723 052 00017), aucun lien vers la fiche Google.
- **Veille 02/11** : Guest Suite / IFOP (janv. 2026) : 61 % des Français s'appuient sur les avis, 9 % sur l'IA seule ; Meteoria x Partoo : ChatGPT parcourt ~132 URL par prompt ; annuaires cités : Mappy, PagesJaunes, 118 000, Petit Futé.
- **Recommandation site (posée le 02/11, inchangée depuis)** : page « Vendre à Meyzieu : nos ventes réelles » (requêtes « agence immobilière Meyzieu » / « vendre appartement Meyzieu ») : les 5 biens vendus (type, pièces, quartier, délai), médiane DVF Meyzieu par type, loyers de référence (`lib/loyers.ts` a Meyzieu). À confier à la tâche SEO ou à Tony.

---

## Micro-actions

| Code | Action | Statut | Qui | Preuve / lien | Dernière vérif |
|---|---|---|---|---|---|
| a1 | Google Business Profile : catégories (« Agence immobilière » + « Gestion locative » + « Syndic »), services, zone (Villeurbanne, Lyon 3/6, Meyzieu, Décines, Bron, Jonage, Vaulx), photos récentes, posts | à vérifier | Tony | Fiche non trouvable depuis ce poste (aucun lien sur le site) | 02/11 |
| a2 | Ajouter le lien de la fiche Google au `sameAs` du site + bouton « Laisser un avis » | à faire (site → tâche SEO) — toujours absent | Yanis | `sameAs` = 6 réseaux, pas Google | 23/11 |
| a3 | Bing Places : importer depuis Google (vérif. instantanée) — alimente ChatGPT + Copilot | à vérifier (présence non lisible d'ici) — dépend de a1 | Yanis (10 min) | https://www.bing.com/forbusiness (ex-bingplaces.com, oct. 2025) | 12/11 |
| a4 | Bing Webmaster Tools : rapport « AI Performance » (citations Copilot) | à vérifier | Yanis | https://www.bing.com/webmasters — rappel mensuel | 02/11 |
| a5 | **Apple Business** (remplace Business Connect depuis 03/2026, gratuit) : revendiquer la fiche Plans / Siri | à vérifier (Plans non lisible d'ici) | Tony (15 min) | https://business.apple.com — annonce : https://www.apple.com/fr/newsroom/2026/03/introducing-apple-business/ | 19/11 |
| a6 | Page Facebook complète (adresse, tél, horaires, catégorie, site) | à vérifier (fetch refusé le 19/11) | Tony | facebook.com/profile.php?id=61566295948630 | 19/11 |
| a7 | PagesJaunes (fiche gratuite) — **alimente aussi Mappy** (« Source : Pages Jaunes ») | manquant | Tony (15 min) | https://www.solocal.com/ ; preuve Mappy : https://fr.mappy.com/poi/4d6dc5deb9eb2507919ecfc3 | 05/11 |
| a8 | Mappy | manquant — se règle avec a7 | Tony | fiches Mappy Aquila/Pietrapolis sortent en q2 | 05/11 |
| a9 | OpenStreetMap (point office=estate_agent au 87 rue É. Vaillant + nom, tél, site, horaires) | **manquant confirmé** (adresse = nœud 2685093389 sans commerce ; « Markus Immobilier » = 0) | Yanis (10 min) | https://www.openstreetmap.org/node/2685093389 | 12/11 |
| a10 | Waze : ajouter le lieu dans l'appli (Signaler → Lieu, photo façade) — ne passe pas par Google | à vérifier dans l'appli | Yanis (5 min, sur place) | https://support.google.com/waze/answer/6262592?hl=fr | 19/11 |
| b1 | Meilleurs Agents : fiche agence + avis | à vérifier (Tony, espace pro) — ne sort sur aucune des 10 questions, priorité basse | Tony | https://www.meilleursagents.com/pro/ | 05/11 |
| b2 | Immodvisor : fiche agence (Villeurbanne liste 12 agences, certaines à 0 avis) | manquant — aucune inscription gratuite trouvée (outil d'avis vendu aux pros ?) : Tony demande via la FAQ | Tony | https://www.immodvisor.com/contenu/notre-faq | 23/11 |
| b3 | SeLoger / Bien'ici : fiche agence + annonces | à vérifier par Tony (portails non indexés par l'outil) : son logiciel diffuse-t-il vers ces portails ? | Tony | — | 12/11 |
| b4 | **Leboncoin : page boutique pro complète** (titre « agence immobilière à Villeurbanne », présentation, horaires) + annonces complètes — la boutique Decultieux sort sur **6/10 questions** (1re en q2, q6, q7) — **depuis le 04/11 les annonces pros Leboncoin sont aussi diffusées automatiquement sur AVendreALouer** — **action n°2** | manquant (boutique Markus non trouvée, 26/11) | Tony (20 min) | preuve : https://www.leboncoin.fr/boutique/21409 ; AVendreALouer : https://www.mysweetimmo.com/2026/11/04/immobilier-leboncoin-immo-relance-la-marque-historique-avendrealouer/ | 26/11 |
| b5 | lesiteimmo (annuaire, sort en q9/q10) — fiches issues de la diffusion d'annonces, pas de formulaire | manquant confirmé (12 agences, pas Markus) — lié à b3 | Yanis (contact pro) | https://www.lesiteimmo.com/agences-immobilieres/villeurbanne-69100 | 19/11 |
| b6 | **acceslibre.beta.gouv.fr** — fiche accessibilité (gratuit, open data État, sort en q5/q9) | manquant (confirmé : recherche « markus » = 0 agence) | Tony (10 min, sur place) | https://acceslibre.beta.gouv.fr/contrib/start/ | 09/11 |
| b7 | FNAIM : fiche agence (sort en q9) — adhésion payante | non adhérent visible ; décision de Tony, priorité basse | Tony | ex. https://www.fnaim.fr/agence-immobiliere/905458/43-villeurbanne-aquila.htm | 12/11 |
| b8 | RealAdvisor : créer la « vitrine » agence + y déclarer les ventes (classement = proximité + ventes 24 mois) — sort en q1, q2, q7, q9 — **action n°3** | manquant confirmé (35 noms sur la page Villeurbanne, pas Markus) | Tony (20 min) | https://realadvisor.fr/fr/agences-immobilieres/69100-villeurbanne | 26/11 |
| c1 | Avis : 2 plateformes actives (Google + Immodvisor ou RealAdvisor) ; nombre et date du dernier avis | à vérifier — 0 plateforme tierce trouvée ; dernier avis affiché sur le site : 28/09/2026 (8 semaines) | Tony | total Google non vérifiable d'ici | 23/11 |
| c2 | Réponses aux avis citant type de bien + quartier | à vérifier — 3 modèles prêts (run 09/11) | Tony | — | 09/11 |
| d1 | Classements tiers « meilleures agences Villeurbanne/Lyon » | aucun classement éditorial trouvé ; seuls les annuaires classent | Yanis | recherche 05/11 | 05/11 |
| e1 | Pitch presse (médianes DVF par quartier) : cible n°1 Le Progrès éd. Villeurbanne, n°2 Lyon Entreprises | pitch rédigé (run 09/11), à envoyer — adresse rédaction toujours introuvable par le moteur | Tony (envoi) / Yanis (trouver l'adresse sur leprogres.fr) | articles concurrents sans source : news.lesiteimmo.com 21/04/2026 | 23/11 |
| f1 | LinkedIn Tony + David : même description d'agence, lien site | à vérifier à la main (aucun profil trouvé par le moteur le 16/11) | Yanis (10 min) | linkedin.com | 16/11 |
| g1 | Forums (Reddit r/Lyon, r/vosfinances) : commentaire utile sous vrai nom | non mesurable d'ici (Reddit non indexé par l'outil) → recherche manuelle | Yanis (10 min) | reddit.com/r/Lyon | 09/11 |
| h1 | robots.txt laisse passer les robots IA **+ pare-feu Vercel ne les bloque pas** — **action n°1** | ⚠️ **à vérifier (alerte)** : robots.txt OK ; 23/11 = 403 `deny`, 26/11 = page « Vercel Security Checkpoint » (`challenge`) une fois sur deux pour GPTBot / OAI-SearchBot / ChatGPT-User / PerplexityBot, et sur `sitemap.xml` même au navigateur. Vérifier Vercel → Firewall (Bot Protection, Attack Challenge Mode, journaux par robot) + « Live URL » dans Bing Webmaster Tools | Yanis (15 min) | https://vercel.com/docs/bot-protection | 26/11 |
| i1 | Cohérence NAP + horaires sur le site | fait ✅ | — | accueil : tél ×9, email ×9, horaires conformes | 02/11 |
| i2 | Cohérence NAP sur chaque fiche externe | bloqué (aucune fiche externe trouvée) | — | — | 05/11 |
| b9 | Cylex (cylex-locale.fr) : fiche gratuite — annuaire généraliste (Foncia, CC Immo, Iméance y sont pour Villeurbanne) | manquant (aucune fiche Markus en recherche ; page illisible d'ici) | Yanis (10 min) | https://www.cylex-locale.fr/villeurbanne/agence-immobili%c3%a8re/ | 16/11 |
| b10 | Zimo (moteur d'annonces ; pages « professionnel » créées depuis les flux d'annonces) | manquant — se règle via la diffusion des annonces (lié à b3), priorité basse | Tony | https://www.zimo.fr/professionnels/villeurbanne-69100 | 16/11 |
| b11 | Omny = recherche de logement **dans ChatGPT** ; seule source connue : iad (09/2026). Demander à Omny si une agence indépendante peut brancher ses annonces | à faire (mail) | Yanis (10 min) | https://www.mysweetimmo.com/2026/09/29/immobilier-iad-connecte-ses-annonces-a-chatgpt-avec-omny/ | 19/11 |
| b12 | Bottin.fr : fiche gratuite (page Villeurbanne = 87 établissements, sort en q1) — ne pas prendre d'option payante | manquant (Markus absent) | Yanis (10 min) | https://www.bottin.fr/annuaire/agence-immobiliere-a-villeurbanne-69266.htm (bouton « Ajouter un établissement ») | 19/11 |
| b13 | **Immovrai** : carte d'agences, inscription gratuite (2 min, vérifiée avant publication) ; Immovrai sort sur « prix m² Villeurbanne » avec des ventes DVF (même angle que Markus) | manquant (probable — carte non lisible d'ici) | Yanis (10 min) | https://www.immovrai.com/agence/inscription | 26/11 |
| c3 | Custplace (plateforme d'avis) | aucune fiche Custplace Villeurbanne ne sort ; page illisible — priorité basse | Tony | https://fr.custplace.com | 16/11 |

**Prochain lot (lundi 30/11)** : h1 (re-tester + lire ce que Yanis a trouvé dans Vercel / Bing), a7 PagesJaunes (fiche créée ?), b6 acceslibre (re-recherche « markus »), b12 Bottin.fr, + veille du lundi. Prochain rappel Bing AI Performance (a4) : lundi 07/12.
