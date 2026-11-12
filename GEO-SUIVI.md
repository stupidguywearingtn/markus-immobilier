# GEO-SUIVI — Markus Immobilier

Suivi de la visibilité de www.markusimmobilier.fr dans les réponses des IA (ChatGPT, Copilot, Google AI Mode / AI Overviews, Perplexity).
Tenu par la tâche planifiée « GEO » (lundi + jeudi). Ce fichier est sa seule mémoire. **La tâche ne modifie pas le site.**

Légende des résultats : 🟢 Markus cité · 🟠 présent via un annuaire · 🔴 absent · ⚪ non mesurable.
⚠️ Limite de méthode : les mesures sont des recherches web (moteur de l'outil, orienté US/Bing-like), **pas** des réponses de ChatGPT. On ne peut pas interroger ChatGPT directement depuis ce poste.

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

## 2026-11-05 (jeudi) — 2e run

**Fait marquant : toujours 0/10. Mappy confirme qu'il reprend PagesJaunes (« Source : Pages Jaunes ») : une seule fiche gratuite = 2 annuaires, dont un qui sort déjà en q2.**

### Questions d'évaluation

| # | Question | Résultat | Top 5 (type de source) | vs 02/11 |
|---|---|---|---|---|
| 1 | quelle agence immobilière choisir à Villeurbanne | 🔴 | Orpi Maisons-Neuves (franchise), Immodvisor Villeurbanne (annuaire d'avis), Orpi Charpennes, lesiteimmo (annuaire), Orpi Gratte-Ciel | identique |
| 2 | meilleure agence immobilière Villeurbanne avis | 🔴 | Orpi Cusset, Mappy fiche Aquila (annuaire), Orpi Tête d'Or, Orpi Flachet, Orpi Cité Immo ; Mappy Pietrapolis + RealAdvisor plus bas | identique |
| 3 | agence pour vendre mon appartement à Villeurbanne | 🔴 | Laforêt République, RealAdvisor (comparateur), Orpi Cetrim, Orpi Gratte-Ciel, Orpi Grand Clément | ≈ identique |
| 4 | combien coûte une agence immobilière à Villeurbanne | 🔴 | Orpi ×2, barème PDF Orpi, Orpi ×2 ; Capifrance, RealAdvisor, Square Habitat, calcunet plus bas | identique |
| 5 | agence gestion locative Villeurbanne | 🔴 | Manda, Laforêt, BailFacile (gestion en ligne), Orpi République, Square Habitat | acceslibre sorti du top |
| 6 | agence immobilière Gratte-Ciel | 🔴 | Human Gratte-Ciel (réseau), Orpi ×4 | Human entre 1er |
| 7 | agence immobilière indépendante Lyon Est | ⚪ | Human Bron, Orpi, offres d'emploi, Immodvisor Vaulx/Villeurbanne, lesiteimmo Vaulx | toujours peu exploitable |
| 8 | estimation immobilière gratuite Lyon | 🔴 | Laforêt ×5 (pages estimation), Orpi | identique |
| 9 | agence immobilière Meyzieu | 🔴 | Square Habitat ×2, Orpi Meyzieu Nord-Est, Orpi local, acceslibre (Nestenn) ; RealAdvisor, Foncia, FNAIM, Immodvisor plus bas | identique |
| 10 | vendre maison Décines | 🔴 | Nestenn, Guy Hoquet ×2, lesclefsdechezmoi, lesiteimmo | Guy Hoquet monte |

Rappel : recherches web de l'outil, **pas** des réponses de ChatGPT (non interrogeable d'ici).

### Vérifié en profondeur ce run
- **a7/a8 PagesJaunes + Mappy** : la fiche Mappy d'Aquila (q2) indique « Source : Pages Jaunes » et renvoie vers « Modifier les infos sur PagesJaunes et Mappy ». Donc **une fiche PagesJaunes gratuite alimente aussi Mappy**. Markus : aucune fiche trouvée sur aucun des deux (recherches Mappy Villeurbanne + rue É. Vaillant). Statut : manquant.
- **b8 RealAdvisor** : page Villeurbanne (realadvisor.fr/fr/agences-immobilieres/69100-villeurbanne) classe « par proximité et nombre de ventes sur 24 mois » ; top : Century 21 Villa Urbana (50 ventes/24 mois, 4,8/5 sur 380 avis), Avi Korssia, Novea… **Markus absent** de la 1re page. La page propose aux agences de créer une « vitrine ». RealAdvisor sort en q2, q3, q4, q9 : c'est l'annuaire le plus transversal de nos 10 questions.
- **b1 Meilleurs Agents** : aucune trace de Markus et Meilleurs Agents ne sort sur aucune des 10 questions dans ce moteur. Reste à vérifier par Tony depuis l'espace pro (fiche souvent créée automatiquement à partir des mandats). Priorité baissée.
- **d1 Classements tiers** : recherche « meilleures agences immobilières Villeurbanne classement » → aucun classement éditorial tiers, uniquement Orpi/Square Habitat. Les seuls « classements » sont ceux des annuaires (RealAdvisor, Immodvisor). Rien à faire de plus pour l'instant.
- **h1 robots.txt** : inchangé (`User-Agent: * / Allow: /`). Test d'accès 200 pour GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, bingbot ✅.
- **Nouveaux annuaires repérés** : cylex-locale.fr (sort sur la requête PagesJaunes, inscription gratuite à vérifier — page non lisible d'ici) ; unemplacement.com (immobilier pro/commerce, peu pertinent).
- Leboncoin : la boutique qui sort en q7 est En Aparté Immobilier (La Tour-de-Salvagny), pas Markus. Boutique Markus non trouvée en recherche (b4 reste à vérifier par Tony).

### Ce qui a changé
Rien côté Markus. Côté concurrence : Human Immobilier monte (1er en q6, présent q3/q7), Guy Hoquet Décines/Meyzieu monte en q10. Rappel du journal SEO : invitation Discord morte et section « Qui sommes-nous » absente de l'accueil (déjà notifiés par la tâche SEO).

### Recommandation site (inchangée)
Page **« Vendre à Meyzieu : nos ventes réelles »** — toujours absente du sitemap (58 URL vérifiées le 05/11). Voir le run du 02/11.

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
| a3 | Bing Places : importer depuis Google (vérif. instantanée) — alimente ChatGPT + Copilot | à vérifier (présence non lisible d'ici) — dépend de a1 | Yanis (10 min) | https://www.bing.com/forbusiness (ex-bingplaces.com, oct. 2025) | 12/11 |
| a4 | Bing Webmaster Tools : rapport « AI Performance » (citations Copilot) | à vérifier | Yanis | https://www.bing.com/webmasters — rappel mensuel | 02/11 |
| a5 | Apple Business Connect | à vérifier | Tony | https://businessconnect.apple.com | — |
| a6 | Page Facebook complète (adresse, tél, horaires, catégorie, site) | à vérifier | Tony | facebook.com/profile.php?id=61566295948630 (non lisible sans compte) | — |
| a7 | PagesJaunes (fiche gratuite) — **alimente aussi Mappy** (« Source : Pages Jaunes ») | manquant | Tony (15 min) | https://www.solocal.com/ ; preuve Mappy : https://fr.mappy.com/poi/4d6dc5deb9eb2507919ecfc3 | 05/11 |
| a8 | Mappy | manquant — se règle avec a7 | Tony | fiches Mappy Aquila/Pietrapolis sortent en q2 | 05/11 |
| a9 | OpenStreetMap (point office=estate_agent au 87 rue É. Vaillant + nom, tél, site, horaires) | **manquant confirmé** (adresse = nœud 2685093389 sans commerce ; « Markus Immobilier » = 0) | Yanis (10 min) | https://www.openstreetmap.org/node/2685093389 | 12/11 |
| a10 | Waze | à vérifier | Yanis | — | — |
| b1 | Meilleurs Agents : fiche agence + avis | à vérifier (Tony, espace pro) — ne sort sur aucune des 10 questions, priorité basse | Tony | https://www.meilleursagents.com/pro/ | 05/11 |
| b2 | Immodvisor : fiche agence (Villeurbanne liste 12 agences, certaines à 0 avis) | manquant | Tony | https://www.immodvisor.com/professionnels/agence-immobiliere/auvergne-rhone-alpes/rhone/villeurbanne | 02/11 |
| b3 | SeLoger / Bien'ici : fiche agence + annonces | à vérifier par Tony (portails non indexés par l'outil) : son logiciel diffuse-t-il vers ces portails ? | Tony | — | 12/11 |
| b4 | **Leboncoin : page boutique pro complète** (titre « agence immobilière à Villeurbanne », présentation, horaires) + annonces complètes — la boutique Decultieux sort 1re en q6 et en q1/q4 | manquant (boutique Markus non trouvée) — **priorité haute** | Tony (20 min) | preuve : https://www.leboncoin.fr/boutique/21409 | 09/11 |
| b5 | lesiteimmo (annuaire Villeurbanne, sort en q1) | manquant | Yanis | https://solutionspro.lesiteimmo.com/nous-contacter/ | 02/11 |
| b6 | **acceslibre.beta.gouv.fr** — fiche accessibilité (gratuit, open data État, sort en q5/q9) | manquant (confirmé : recherche « markus » = 0 agence) | Tony (10 min, sur place) | https://acceslibre.beta.gouv.fr/contrib/start/ | 09/11 |
| b7 | FNAIM : fiche agence (sort en q9) — adhésion payante | non adhérent visible ; décision de Tony, priorité basse | Tony | ex. https://www.fnaim.fr/agence-immobiliere/905458/43-villeurbanne-aquila.htm | 12/11 |
| b8 | RealAdvisor : créer la « vitrine » agence + y déclarer les ventes (classement = proximité + ventes 24 mois) — sort en q1, q2, q3, q9 (pages agence, quartier, agent) — **action n°1** | manquant | Tony (20 min) | https://realadvisor.fr/fr/agences-immobilieres/69100-villeurbanne | 05/11 |
| c1 | Avis : 2 plateformes actives (Google + Immodvisor ou RealAdvisor) ; nombre et date du dernier avis | à vérifier — 0 plateforme tierce trouvée ; dernier avis affiché sur le site : 28/09/2026 | Tony | total Google non vérifiable d'ici | 09/11 |
| c2 | Réponses aux avis citant type de bien + quartier | à vérifier — 3 modèles prêts (run 09/11) | Tony | — | 09/11 |
| d1 | Classements tiers « meilleures agences Villeurbanne/Lyon » | aucun classement éditorial trouvé ; seuls les annuaires classent | Yanis | recherche 05/11 | 05/11 |
| e1 | Pitch presse (médianes DVF par quartier) : cible n°1 Le Progrès éd. Villeurbanne, n°2 Lyon Entreprises | pitch rédigé (run 09/11), à envoyer | Tony (envoi) / Yanis (trouver l'adresse rédaction) | articles concurrents sans source : news.lesiteimmo.com 21/04/2026 | 09/11 |
| f1 | LinkedIn Tony + David : même description d'agence, lien site | à vérifier | Tony | — | — |
| g1 | Forums (Reddit r/Lyon, r/vosfinances) : commentaire utile sous vrai nom | non mesurable d'ici (Reddit non indexé par l'outil) → recherche manuelle | Yanis (10 min) | reddit.com/r/Lyon | 09/11 |
| h1 | robots.txt laisse passer les robots IA | fait ✅ (7 robots → 200) | — | https://www.markusimmobilier.fr/robots.txt | 12/11 |
| i1 | Cohérence NAP + horaires sur le site | fait ✅ | — | accueil : tél ×9, email ×9, horaires conformes | 02/11 |
| i2 | Cohérence NAP sur chaque fiche externe | bloqué (aucune fiche externe trouvée) | — | — | 05/11 |
| b9 | Cylex (cylex-locale.fr) : fiche gratuite — annuaire généraliste qui sort en recherche locale | à vérifier (page illisible d'ici le 09/11) | Yanis (10 min) | https://www.cylex-locale.fr/villeurbanne/agence-immobili%c3%a8re/ | 09/11 |

| b10 | Zimo (annuaire de pros, sort sur 2 requêtes Villeurbanne) | à vérifier (page illisible d'ici) | Yanis | https://www.zimo.fr/professionnels/villeurbanne-69100 | 12/11 |
| c3 | Custplace (plateforme d'avis, fiches agences sortent en q6/q7) : page entreprise gratuite | à vérifier | Tony | https://fr.custplace.com | 12/11 |

**Prochain lot (lundi 16/11)** : b9 Cylex, b10 Zimo, c3 Custplace, f1 LinkedIn Tony + David — et veille du lundi. Prochain rappel Bing AI Performance (a4) : lundi 07/12.
