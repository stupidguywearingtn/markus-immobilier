# SEO-JOURNAL — Markus Immobilier

> Mémoire du chantier SEO / GEO quotidien. **Une entrée par run, la plus récente
> en haut.** Ce fichier est la seule mémoire entre deux runs : le lire en entier
> avant d'agir, et ne jamais recommencer un travail marqué comme fait.
>
> Le backlog SEO historique (audit du 2026-08-27) vit dans
> `docs/SESSION_LOG.md` § « SEO — à améliorer ». Ce journal-ci le complète et,
> en cas de contradiction, **le journal fait foi** (l'audit vieillit).

---

## État des lieux

*(mis à jour à chaque run, à partir de mesures réelles — pas de recopie de notes)*

**Au 2026-09-23**

- `git fetch origin` **en tout premier** (règle du 16/09) : pas de piège ce
  matin. `git ls-remote origin` rend le même SHA que le `HEAD` local
  (`0befbc4`, le run du 22/09), donc la référence distante du conteneur était
  à jour. Deuxième run sans décalage sur les quatre derniers.
- ⚠️ **Le conteneur démarre toujours sans `node_modules`** — `npm ci` avant
  tout contrôle. Quatrième constat identique (21, 22, 23/09) : ce n'est pas une
  régression, c'est l'état normal du conteneur. À traiter comme une étape de
  démarrage, plus comme une anomalie.
- **Mercredi : pas de veille** (elle se fait le lundi ; celle du 21/09 est la
  référence, la prochaine est due le **lundi 28/09**).
- **Les deux articles visés par le point (a) du backlog ont été mesurés en
  production avant d'agir**, et le diagnostic du 20/09 est confirmé au mot
  près : `/blog/rentabilite-locative-lyon` servait **231 mots**, 3 H2
  (« Le rendement brut », « Le rendement net », « À Lyon et Villeurbanne »),
  **aucune FAQ**, **aucun chiffre villeurbannais**, aucun `FAQPage` ;
  `/blog/investir-locatif-lyon` servait **225 mots**, 4 H2, même absence.
  Les deux répondaient HTTP 200, `BlogPosting` + `BreadcrumbList` seulement.
- **Trois SERP mesurées** (détail au tableau). « Agence immobilière
  Villeurbanne » **absente pour la 15ᵉ fois sur 15**, avec une composition
  **identique au compte corrigé du 22/09** — 6 annuaires ou franchises contre
  3 indépendantes locales. La correction du 22/09 tient : la SERP n'est pas
  fermée aux indépendantes.
- 🔴 **Le créneau du chantier du jour est le plus vide rencontré depuis le
  créneau syndic du 18/09** : sur les deux formulations « rentabilité /
  investissement locatif Villeurbanne », **zéro agence villeurbannaise dans
  les neuf résultats**, et surtout **aucun résultat ne publie de rendement par
  quartier calculé sur des prix de vente réels**. Tous donnent une fourchette
  nationale, un prix moyen commune entière, ou renvoient vers leur propre
  simulateur.
- ⚠️ **Piège de mesure évité de justesse, et il prolonge la leçon du 22/09.**
  Le résumé du moteur attribuait des chiffres précis aux deux premiers
  résultats (« Gratte-Ciel 3 688 €/m² », « rendement pouvant dépasser 6 % »,
  « loyers autour de 16,1 €/m² »). **Les deux pages, téléchargées une par une,
  ne publient aucun de ces chiffres** — elles n'en publient aucun du tout.
  Ces valeurs allaient être citées dans l'article comme « ce que publient les
  concurrents » : elles ne l'ont pas été. Détail en « Techniques apprises ».
- **`/gestion-locative` sert toujours son contenu du 21/09** et
  `/agence-immobiliere-charpennes` publie déjà un rendement brut de quartier
  au loyer communal, avec sa limite écrite noir sur blanc — c'est cette
  doctrine que le chantier du jour généralise aux sept quartiers.

**Au 2026-09-22**

- `git fetch origin` **en tout premier** (règle du 16/09) : le piège est
  **revenu**. `origin/main` du conteneur était figé au `85288f6` du 13/09, soit
  **neuf jours de retard**, alors que le vrai `main` distant portait déjà les
  runs des 15 au 21/09. Un `git ls-remote origin` l'a montré en une ligne, un
  `git fetch origin main` l'a aligné, et `git rev-list --left-right --count`
  est repassé à `0 0`. **Troisième occurrence** (16/09, 18/09, aujourd'hui) :
  la règle n'est pas une précaution théorique, elle a servi une fois sur deux.
- ⚠️ **Le conteneur démarre toujours sans `node_modules`** — `npm ci` avant
  tout contrôle (~35 s). Constat identique au 21/09, ce n'est pas une
  régression.
- **Mardi : pas de veille** (elle se fait le lundi ; celle du 21/09 est la
  référence, la prochaine est due le **lundi 28/09**).
- `sitemap.xml` en production = **53 URLs**, inchangé depuis le 17/09, et
  **les 53 ont été téléchargées et leur statut relevé une par une** (règle du
  17/09) : **53 × HTTP 200**, aucune fiction, aucune 404.
- **Audit de crawlabilité, six signaux jamais regardés jusqu'ici, tous sains** :
  aucun en-tête `X-Robots-Tag` sur aucune page ; `robots.txt` n'interdit que
  `/api/`, `/espace-client`, `/radar`, `/admin` et déclare bien le sitemap ;
  **les 53 URLs du sitemap sont toutes en `www`**, donc aucune ne passe par le
  308 non-www → www ; et surtout, la page servie à **Googlebot, GPTBot et
  PerplexityBot est identique à l'octet près** à celle servie à un navigateur
  (125 853 octets sur `/honoraires`, même valeur pour les quatre agents).
  **Aucun blocage de robot, aucun cloaking, aucune protection Vercel qui
  filtrerait les crawlers.**
- 🔴 **Le défaut du jour, trouvé en construisant le graphe des liens internes à
  partir du HTML rendu des 53 pages, et il n'était dans aucun backlog : le blog
  était un entonnoir.** `getRelatedArticles` ne désignait que **les deux
  articles les plus récents de chaque groupe** — donc 8 articles sur 26
  recevaient tous les liens « À lire aussi », et **les 18 autres n'en
  recevaient aucun**. Pire : **13 articles n'avaient, sur tout le site, qu'une
  seule page entrante — la liste `/blog`**. C'est le chantier du jour.
- **Le point 5bis du backlog est confirmé mais il visait à côté** : les 12
  articles « muets » du 16/09 le sont bien pour les liens **de corps de texte**
  (mesure refaite ce matin : 28 liens en corps, 12 articles à zéro), mais ils
  émettaient tous 2 liens via le bloc automatique. Le vrai trou n'était pas
  côté **émission**, il était côté **réception**.
- **Trois SERP mesurées** (détail au tableau). « Agence immobilière
  Villeurbanne » **absente pour la 14ᵉ fois sur 14** — et la lecture que ce
  journal en fait depuis six runs est **corrigée aujourd'hui** : la SERP n'est
  pas « 9 sur 9 des annuaires ou des franchises », elle compte **3 agences
  indépendantes locales** sur 9.
- ⚠️ **Découverte de méthode qui touche un protocole en cours** : l'outil de
  recherche de ce runner **n'honore ni `site:` ni les guillemets d'exactitude**
  (vérifié deux fois). Le test d'indexation profonde, négatif pour la 8ᵉ fois
  aujourd'hui, ne mesure donc **pas** ce qu'il prétend mesurer. Le protocole du
  13/09, qui devait se déclencher au 27/09, est **suspendu** — détail en
  « Techniques apprises ».

**Au 2026-09-21**

- `git fetch origin` **en tout premier** (règle du 16/09) : la référence
  distante du conteneur était **à jour** (`origin/main` = `2442ebf`, soit le
  run du 20/09), `git rev-list --left-right --count origin/main...HEAD` = `0 0`.
  Deuxième run d'affilée sans le piège des 16 et 18/09 ; la règle reste, elle
  coûte une commande.
- ⚠️ **Le conteneur démarre sans `node_modules`.** `npx tsc --noEmit` a d'abord
  rendu des centaines de « Cannot find module 'next' » qui n'ont rien à voir
  avec le code : il faut `npm ci` avant tout contrôle (15 s). À ne pas
  interpréter comme une régression — c'est la première fois que ça se présente.
- **Lundi : veille faite** (§ « Techniques apprises », 21/09), avec six jours de
  retard sur la cadence hebdomadaire — la précédente datait du 15/09.
- `sitemap.xml` en production = **53 URLs**, inchangé depuis le 17/09. Build
  local = **51** : l'écart, ce sont les annonces publiées en base et absentes du
  conteneur, écart déjà constaté et expliqué le 18/09 — pas une régression.
- **`/gestion-locative` mesurée en production avant d'agir** : **257 mots
  rendus**, 4 `<h2>` dont **aucun ne pose de question**, **aucune FAQ**, **aucun
  chiffre**, **aucune date de mise à jour**, et un seul JSON-LD propre
  (`Service`). Le diagnostic posé le 18/09 est confirmé au mot près : sa
  réponse à la question du prix était « nos honoraires sont calculés sur les
  loyers réellement encaissés », sans un taux ni un euro, alors qu'elle reçoit
  un **lien sitewide depuis le footer** que `/faire-gerer` n'a pas.
- **Trois SERP mesurées** (détail au tableau ci-dessous). « Agence immobilière
  Villeurbanne » **absente pour la 13ᵉ fois sur 13**. Le test d'indexation
  profonde est **négatif à J+8** — **échéance du protocole : ~27/09**, soit le
  prochain dimanche ; négatif après cette date, la consigne écrite le 13/09
  s'applique : arrêter d'écrire et chercher un blocage technique.
- ✅ **Vérifié en production après déploiement** (Vercel a mis ~19 tentatives de
  polling, soit quelques minutes) : `/gestion-locative` sert bien **1 780 mots**,
  1 `<h1>`, 6 H2, les 4 JSON-LD (`RealEstateAgent`, `Service`, `FAQPage`,
  `BreadcrumbList`), une **correspondance FAQPage ↔ texte visible sans écart**,
  le canonical et l'`og:url` sur la bonne page, une `og:image`, et la date
  visible au 21/09. `llms.txt` en ligne porte la nouvelle entrée, le sitemap
  reste à **53 URLs** avec `lastmod` du 21/09 sur cette page. Aucune espace
  perdue au rendu sur le HTML servi.
- **Nouvelle SERP, sur le créneau du chantier du jour** : « gestion locative
  Villeurbanne tarif honoraires ». Neuf résultats, **aucun villeurbannais** —
  Oqoro, BailFacile, Manda, Foncia, Imodirect, Plusse, Flatlooker, louer-et-gerer,
  et Murani (lyonnais). Différence importante avec le créneau syndic du 18/09 :
  **ici les concurrents publient bien des prix** (Oqoro affiche 4,9 % TTC). Le
  trou n'est donc pas « personne ne donne de chiffre » mais **« personne ne
  donne de chiffre villeurbannais, et personne ne va au bout du calcul »** —
  d'où l'angle fiscal retenu (voir « Chantiers faits »).

**Au 2026-09-20**

- `git fetch origin` **en tout premier** (règle du 16/09) : cette fois la
  référence distante du conteneur était **à jour** — `origin/main` = `c7e2a5c`,
  `git rev-list --left-right --count origin/main...HEAD` = `0 0`. Le piège des
  16 et 18/09 ne s'est pas reproduit ; la règle reste, il coûte une commande.
- ⚠️ **Le run du vendredi 19/09 n'a pas eu lieu** — aucun commit, aucune entrée
  de journal ce jour-là. C'est le deuxième run manqué depuis l'ouverture (après
  le lundi 14/09). Conséquence ici : le dernier run est celui du 18/09
  (contenu), donc la règle d'alternance s'applique comme s'il était d'hier.
- **Dimanche** : pas de veille (elle se fait le lundi). Celle du 15/09 reste la
  référence ; **la prochaine est due demain, lundi 21/09** — elle aura six
  jours de retard, à faire en premier.
- `sitemap.xml` en production = **53 URLs**, inchangé depuis le 17/09, et
  **listées une par une** (règle du 17/09, pas un compteur) : 21 pages, 6
  annonces réelles, 26 articles. Aucune fiction n'y est revenue.
- **Les 53 URLs ont été téléchargées et auditées** (statut, `<head>`, images,
  liens internes). Ce qui est **sain** : 53 × HTTP 200, `canonical` présent et
  correct sur **toutes** les pages indexables, **114 `<img>` et zéro `alt`
  manquant**, `robots.txt` qui n'interdit rien aux robots d'IA (`User-Agent: *`
  / `Allow: /`, seuls `/api/`, `/espace-client`, `/radar`, `/admin` sont
  exclus), `llms.txt` à jour (l'entrée `/faire-gerer` du 18/09 y est), une 404
  qui répond bien 404, et le PDF du barème qui se télécharge.
- 🔴 **Le défaut du jour, trouvé en auditant le `<head>` des 51 pages
  indexables, et il n'était dans aucun backlog : `og:image` n'était servi que
  sur 14 pages sur 51 — et sur les mauvaises.** Les 4 pages légales,
  `/contact`, `/equipe`, `/honoraires`, `/recrutement`, la home et les 6
  annonces l'avaient ; **les 26 articles du blog, `/vendre`, `/acheter`,
  `/estimation`, les 3 pages quartiers, `/agence-immobiliere-villeurbanne`,
  `/faire-gerer`, `/gestion-locative` et `/blog` ne l'avaient pas**.
- **Et le miroir du même défaut, plus grave** : les 8 pages qui ne déclaraient
  aucun `openGraph` héritaient de celui de la home — donc d'un
  **`og:url` pointant vers `https://www.markusimmobilier.fr`** et d'un titre
  qui ne les décrivait pas. **`/honoraires`, la page la plus citable du site,
  se présentait au partage comme la page d'accueil.** Enfin
  `twitter:title` / `twitter:description` étaient **les mêmes deux chaînes
  génériques sur les 51 pages**.
- **La cause est documentée à l'envers dans le code** : le commentaire de
  `app/opengraph-image.tsx` affirme que l'image « s'applique à tout le site
  sauf si une page définit sa propre opengraph-image ». La production le
  dément : dans l'App Router, `metadata.openGraph` n'est **pas** fusionné en
  profondeur — une page qui déclare son propre bloc **remplace** celui du
  layout, image comprise. C'est le chantier du jour.
- **Deux SERP mesurées** (détail au tableau) : « agence immobilière
  Villeurbanne » **absente pour la 12ᵉ fois sur 12**, et le test d'indexation
  profonde **négatif à J+7**. Échéance du protocole inchangée : **~27/09**.

**Au 2026-09-18**

- `git fetch origin` **en tout premier** (règle du 16/09) : la référence
  distante du conteneur était **périmée de quatre jours** (`origin/main` figé au
  13/09 alors que le vrai `main` distant porte les runs des 15, 16 et 17/09).
  Un `git ls-remote origin` l'a montré en une ligne, `git fetch` l'a aligné.
  C'est la **deuxième fois** que ce piège se présente : il est dans le
  conteneur, pas dans le dépôt. Après fetch : `0 0`, rien à refaire.
- **Vendredi** : pas de veille (elle se fait le lundi ; celle du 15/09 reste la
  référence, la prochaine est due le **lundi 21/09**).
- ⚠️ **Le site répond en `https://www.markusimmobilier.fr`** : tout appel à
  `markusimmobilier.fr` sans `www` renvoie un **308** vers le `www`. Mesurer
  avec `curl -sL` (ou directement sur le `www`), sinon on télécharge 15 octets
  de redirection et on croit la page vide. Noté ici parce que la première
  mesure du run est tombée dedans.
- **`/faire-gerer` mesurée en production avant d'agir** : **290 mots rendus**,
  aucun `<h2>` qui pose une question, et **aucun JSON-LD propre** (seulement le
  `RealEstateAgent` du gabarit). Le diagnostic du 17/09 est confirmé au mot
  près — c'était la page stratégique la plus faible du site.
- **Deux SERP mesurées sur son créneau, et elles disent la même chose** :
  « faire gérer son bien locatif Villeurbanne » (2ᵉ mesure) et, **nouvelle
  aujourd'hui**, « syndic de copropriété Villeurbanne tarif ». Sur la première,
  neuf résultats, **aucun tarif**. Sur la seconde, neuf résultats et **aucun
  résultat villeurbannais** : que des sites nationaux qui répondent « 150 à
  250 € par lot et par an » à une question locale. C'est le quatrième relevé
  consécutif (15, 16, 17 puis 18/09) où le créneau prenable est « personne ne
  répond avec un chiffre ».
- `sitemap.xml` en production = **53 URLs**, conforme au run du 17/09 (les 10
  fiches fictives sont bien sorties). Build local **51 URLs** : l'écart, ce sont
  les annonces publiées en base, absentes du conteneur — pas une régression.
- Le test d'indexation profonde reste **négatif à J+5** (échéance ~27/09), et
  « agence immobilière Villeurbanne » est absente pour la **11ᵉ** fois.

**Au 2026-09-17**

- Clone local **à jour** au démarrage : `git fetch origin` **en tout premier**
  (règle du 16/09), puis `git rev-list --left-right --count origin/main...HEAD`
  = `0 0`. Le run du 16/09 est bien en ligne, rien à refaire.
- **Jeudi** : pas de veille (elle se fait le lundi ; celle du 15/09 reste la
  référence).
- 🔴 **Le fait du jour, et il n'était dans aucun backlog : le sitemap de
  production soumettait à Google 10 fiches de biens FICTIFS.**
  `lib/mock-properties.ts` — dont l'en-tête dit « Extended mock — 10 biens
  variés (à remplacer par data réelle) » — alimentait un bloc `propertyPages`
  dans `app/sitemap.ts`. Résultat en ligne : `/annonces/lyon-2-bellecour-loft`
  (« Loft d'exception sur Bellecour, 1 250 000 € »),
  `/annonces/ecully-villa-famille`, `/annonces/lyon-6-foch-t4`… **10 pages sur
  les 63 du sitemap, soit 16 % de ce que le site déclare à Google, décrivaient
  des biens qui n'existent pas**, avec le vrai téléphone et le vrai e-mail de
  l'agence en pied de fiche. La consigne client est pourtant explicite :
  « pas de fausse annonce ».
- **Comment il a été trouvé — et pourquoi neuf runs l'avaient raté** : c'est la
  première fois qu'un run **liste** les URLs du sitemap au lieu de les
  **compter**. Les entrées du 07/09 au 16/09 écrivent « sitemap = 60 / 61 / 63
  URLs » sans jamais regarder lesquelles. (Voir « Erreurs commises ».)
- **Audit complet des 63 URLs de production**, téléchargées une par une et
  analysées (titre, meta description, canonical, meta robots, nombre de `<h1>`,
  types JSON-LD, mots rendus). Ce qui est **sain** : **aucun titre dupliqué**,
  **aucune description dupliquée ni vide**, **un `<h1>` et un seul sur les 63
  pages**, aucun `noindex` parasite, `RealEstateAgent` servi partout. Le seul
  défaut structurel trouvé : **les 10 fiches de démo n'ont pas de `canonical`**
  (les 6 vraies annonces l'ont) et **pas de `RealEstateListing`** — la
  différence de traitement était déjà dans le code, personne ne l'avait lue.
- **Second défaut technique mesuré : le `lastmod` du sitemap mentait.**
  **31 URLs sur 63** portaient exactement la même valeur —
  `2026-09-16T06:26:59.361Z`, c'est-à-dire **l'heure du build**. Les pages
  statiques étaient horodatées `new Date()`. Comme ce site est redéployé
  presque tous les jours (ces runs), le sitemap annonçait chaque jour « 21
  pages modifiées aujourd'hui ». Google documente qu'un `lastmod` jugé non
  fiable est ignoré **pour tout le fichier** — donc aussi pour les 26 articles
  et les annonces, dont les dates, elles, étaient exactes.
- **Ce qui, en revanche, est honnête et n'a pas été touché** : sur `/annonces`,
  les 10 cartes de démo sont précédées d'un encart visible (« Les biens
  ci-dessous illustrent la présentation du catalogue — ils ne sont pas encore
  disponibles »), portent un badge « À venir / Bientôt disponible » et **ne
  sont cliquables depuis nulle part**. La home n'en affiche **aucune** (le code
  ne complète la grille que s'il y a moins de 3 biens réels : il y en a 6).
  `llms.txt` **ne contient aucune fiche fictive** (vérifié ligne à ligne).
  **Le problème n'était donc pas la démo elle-même : c'était que le sitemap
  envoyait Google sur les pages de détail, seule surface où la fiction n'est
  pas signalée.**
- **La fiction n'est pas indexée aujourd'hui** (test SERP ajouté au tableau) :
  le chantier du jour est **préventif**, pas curatif. C'est dit tel quel, sans
  le gonfler.

**Au 2026-09-16**

- Clone local **à jour** après `git fetch` : `origin/main` = `b22137b`, les deux
  commits du 15/09 y sont. ⚠️ **Piège rencontré** : au tout premier `git log`,
  `origin/main` paraissait resté au 13/09 et la branche de travail semblait
  avoir deux commits d'avance — c'était une **référence distante périmée dans le
  conteneur**, pas une divergence. Un `git fetch origin` a suffi à l'aligner.
  → **Toujours `git fetch` AVANT de lire `origin/main`**, sinon on croit à un
  travail non poussé et on risque de le refaire.
- **Mercredi** : pas de veille (elle se fait le lundi ; celle du 15/09, qui
  rattrapait le lundi manqué, reste la référence).
- `sitemap.xml` en production = **63 URLs** (et non 61 comme l'écrivaient les
  entrées jusqu'au 15/09 : les 3 pages quartiers y sont entrées, et le compte
  n'avait pas été refait). Build local **82 pages**, inchangé : le chantier du
  jour ne crée aucune page.
- **Vérifié en ligne avant d'agir** (`curl` sur le HTML servi, jamais
  `WebFetch`) : `/honoraires` sert bien sa FAQ du 15/09 (« Qui paie les
  honoraires » ×5, `FAQPage`, plafonds 2026 cités) et
  `/agence-immobiliere-gratte-ciel` sert bien ses 6 H2 dont trois questions
  (prix au m², surface accessible, coût d'une vente) + `FAQPage` + date de mise
  à jour. **Les deux chantiers du 15/09 sont en production.**
- **Mesure qui a décidé du chantier** — maillage interne, compté dans le code
  puis **revérifié dans le HTML rendu** (voir l'erreur n°1 de la lecture
  ci-dessous) : **6 articles sur 26 émettaient un lien contextuel**, 20 n'en
  émettaient aucun. Surtout, **aucun des 26 articles ne liait `/honoraires`,
  ni aucune des 3 pages quartiers** — c'est-à-dire ni la page la plus citable
  du site, ni les trois pages créées la veille.
- **Défaut de fond trouvé au passage, et il est éditorial autant que
  structurel** : trois articles répondent à une question d'argent par une
  fourchette nationale (« 6 à 8 % TTC » pour la gestion, « 4 à 6 % du prix »
  pour la vente) alors que **le barème réel de l'agence est publié à un clic**.
  Le site sait répondre et ses articles répondent « ça dépend ».

**Au 2026-09-15**

- Clone local **à jour** au démarrage (`git log HEAD..origin/main` vide) : huit
  runs de suite. Un seul run aujourd'hui, pas de travail en double.
- ⚠️ **Le run du lundi 14/09 n'a pas eu lieu** — aucune entrée de journal,
  aucun commit ce jour-là. Conséquence concrète : **la veille hebdomadaire du
  lundi a sauté**. Elle a donc été faite aujourd'hui (mardi), et elle a
  rapporté la trouvaille la plus importante depuis le début du journal (voir
  « Techniques apprises », 15/09). → **Si un lundi saute, rattraper la veille
  le lendemain**, ne pas attendre le lundi suivant : elle a huit jours de
  retard quand on la néglige.
- `sitemap.xml` inchangé à **61 URLs**, build local **82 pages** : le chantier
  du jour renforce une page existante, il n'en crée aucune.
- **Mesuré en ligne avant d'agir** (`curl` sur le HTML servi, jamais
  `WebFetch` — piège du 13/09) : `/honoraires` sert bien son `OfferCatalog` de
  27 offres et son `BreadcrumbList` posés le 13/09. Mais la page **n'a aucune
  prose** : hors titres de section et libellés de tableaux, elle ne contient
  **pas une seule phrase**. C'est le contenu le plus citable du site (un barème
  public complet) et il **ne répond à aucune question en toutes lettres** —
  exactement le trou que l'étape 4 de la routine vise. C'est ce constat qui a
  décidé du chantier.
- **La SERP « qui paie les honoraires d'agence immobilière vente Villeurbanne »
  est mesurée pour la première fois, et elle est 100 % nationale et générique** :
  Foncia, PAP, Crédit Agricole, Barraine, Propriétés Privées, deux blogs de
  coachs. **Aucun résultat local, aucun barème réel, aucune référence légale
  datée.** La réponse-type des neuf résultats est « ça dépend du mandat, comptez
  3 à 8 % » — c'est-à-dire pas une réponse.
- 🔴 **Découverte à remonter au client** (voir « Hypothèses à vérifier ») : les
  trois montants de la part locataire du barème (8 / 10 / 12 €/m²) et les
  3 €/m² d'état des lieux **sont exactement les plafonds légaux d'avant 2026**.
  Ces plafonds ont été revalorisés au **1ᵉʳ janvier 2026** (10,09 €/m² en zone
  tendue, 3,03 €/m² pour l'état des lieux). Le barème de l'agence reste donc
  **parfaitement légal — il est sous le plafond** — mais il n'a visiblement pas
  été réindexé. **Rien n'a été modifié** : un barème est une décision
  commerciale du client, pas d'un run.

**Au 2026-09-13**

- Clone local **à jour** au démarrage (`git log HEAD..origin/main` vide) : sept
  runs de suite. Un seul run aujourd'hui, pas de travail en double.
- **Dimanche** : pas de veille (elle se fait le lundi). Celle du 07/09 reste la
  référence.
- `sitemap.xml` inchangé à **61 URLs**, build local **82 pages** : le chantier du
  jour n'ajoute ni page ni contenu visible, **uniquement du balisage**.
- ⚠️ **Piège d'outil découvert aujourd'hui, à retenir absolument : `WebFetch` ne
  peut pas servir à auditer des données structurées.** Il convertit la page en
  markdown et **supprime les `<script>`** : il a répondu « aucun bloc JSON-LD »
  sur `/equipe` **et** sur `/blog`, alors que les deux en servent (le
  `RealEstateAgent` du layout, plus un `BreadcrumbList` sur `/blog`). Il s'est
  aussi trompé sur un comptage simple : **24 articles annoncés sur `/blog`, 26
  en réalité**. → **Pour tout contrôle de balisage ou de comptage, `curl` sur le
  HTML brut, jamais `WebFetch`.** Un run qui aurait cru `WebFetch` aurait pu
  conclure que le site n'a aucune donnée structurée et tout réécrire.
- **Mesuré dans le HTML servi (curl), pas déduit du code** — ce qui a décidé du
  chantier :
  - `/honoraires` servait **zéro JSON-LD spécifique**. C'est pourtant la page
    la plus citable du site pour une IA (un barème public complet, 25 lignes
    tarifées, 4 tableaux) — constat déjà fait le 12/09, resté sans suite côté
    balisage.
  - `/equipe` servait **zéro JSON-LD spécifique** (confirmé : ni `Person`, ni
    `BreadcrumbList`), et n'a **aucun `<h2>`** — la page est construite en
    `<h1>` + `<h3>`.
  - `/blog` servait `BreadcrumbList` mais **ni `Blog` ni `ItemList`**.
  - **Le `RealEstateAgent` du layout n'avait pas d'`@id`**, et le `PROVIDER`
    des `Service` non plus. Conséquence : chaque page déclarait une agence
    *distincte* au lieu de décrire la même. C'est le vrai défaut de fond
    trouvé aujourd'hui, et il n'était dans aucun backlog.
  - `/equipe` **ne figurait pas dans `llms.txt`**.

**Au 2026-09-12**

- Clone local **à jour** au démarrage (`git log HEAD..origin/main` vide) : six
  runs de suite. Un seul run aujourd'hui, pas de travail en double.
- `sitemap.xml` en production = **61 URLs** (inchangé : le chantier renforce une
  page existante, il n'en crée aucune). Build local = **82 pages**.
- **`llms.txt` vérifié en production : il ne dérive pas.** Il n'est pas un
  fichier statique mais une **route générée** (`app/llms.txt/route.ts`) dérivée
  de `ARTICLES` et des annonces publiées : les 26 articles y étaient tous, à
  jour. → **Ne plus perdre de temps à « vérifier la dérive » de ce fichier** ;
  seule sa partie écrite en dur (pages principales, pages locales) peut vieillir,
  et c'est elle qui a été complétée aujourd'hui.
- **Mesuré en ligne avant d'agir, et c'est la mesure qui a décidé du chantier** :
  `/agence-immobiliere-villeurbanne` — la page qui vise la requête commerciale
  n°1 de la ville — servait **404 mots**, **5 H2 tous en slogans** (« Tout votre
  projet immobilier, au même endroit », « Indépendants, humains, réactifs »),
  **aucun chiffre**, **aucune FAQ**, **aucune date de mise à jour**. C'est la
  page stratégique la plus faible du site rapportée à son enjeu. Pour
  comparaison mesurée le même jour : `/estimation-immobiliere-villeurbanne`
  = 1 705 mots, 6 Q/R.
- **Données structurées : rien ne manque sur les pages clés, contrairement à ce
  qu'on pourrait supposer.** Vérifié dans le HTML servi : `RealEstateAgent`
  (avec `geo` + 2 `OpeningHoursSpecification`) est présent sur **toutes** les
  pages via le layout ; les pages locales ont en plus `Service` +
  `BreadcrumbList`. Les seuls manques réels : pas de `Person` sur `/equipe`,
  pas de `Blog`/`ItemList` sur `/blog` (voir « Chantiers en attente »).
- ⚠️ **Le piège de rendu JSX du 11/09 s'est reproduit, trois fois.** Un espace
  entre `</strong>` et le mot suivant a encore été avalé au build
  (« 5 %entre 300 001 », « 195 000 €d'après », « 3 923 €/m²à Ferrandière »).
  Détecté **uniquement** parce que le texte rendu a été relu après build, comme
  le journal l'impose depuis hier. Corrigé avec `{" "}`, rebuild, revérifié par
  regex. **Ce n'est pas un accident isolé : c'est systématique dès qu'un
  `<strong>` se termine en fin de ligne dans le JSX.**

**Au 2026-09-11**

- Clone local **à jour** au démarrage (`git log HEAD..origin/main` vide) : cinq
  runs de suite. Un seul run aujourd'hui, pas de travail en double.
- `sitemap.xml` en production = **61 URLs** (inchangé : le chantier réécrit une
  page existante, il n'en crée aucune). Build local = **82 pages**.
- **Mesuré en ligne avant d'agir**, pas déduit du code :
  `/blog/estimation-en-ligne-ou-agence` servait bien la version faible —
  **216 mots**, 3 H2 descriptifs (« L'estimation en ligne », « L'estimation par
  une agence », « La meilleure approche »), **aucun chiffre**, aucune FAQ, aucun
  tableau, `dateModified` = `datePublished` = 2026-06-09. Les 2 liens sortants
  posés le 10/09 étaient bien là. C'est ce qui a confirmé le chantier.
- 🟢 **Les chiffres DVF publiés depuis le 07/09 ont été recalculés à la source
  aujourd'hui et sont EXACTS.** Reproduction indépendante (nouvelle extraction
  du 11/09, même méthode) : commune **3 567 €/m²**, prix médian 195 000 €,
  surface médiane 62 m² ; Ferrandière **3 923**, Gratte-Ciel **3 846**,
  Charpennes **3 524**, Perralière **3 375**, Buers **3 271**, Cusset **3 171**,
  Cyprian **2 738** ; T1 4 000 / T2 3 830 / T3 3 494 / T4 3 211. **Tout
  correspond au chiffre près.** Seul écart : 1 876 ventes exploitables contre
  1 875 publiées (une vente de plus dans la révision DVF ; 1 875 restent
  rattachées à un quartier, donc le chiffre affiché sur le site reste juste).
  → **L'hypothèse « si les médianes sont recalculées, les pages se
  contrediront » est levée pour ce millésime.** Ne pas relancer ce calcul avant
  la prochaine publication DVF.
- ⚠️ **Piège de rendu JSX rencontré et corrigé avant publication** : un espace
  entre `</strong>` et le mot suivant a été **avalé au build** (« 76 000 €
  d'écartsur 62 m² ») alors que le code source en contenait un. Corrigé avec un
  `{" "}` explicite, rebuild, revérifié. **À retenir : sur ce projet, toujours
  relire le TEXTE RENDU après un build, pas seulement le JSX.**

**Au 2026-09-10**

- Clone local **à jour** au démarrage (`git log HEAD..origin/main` vide) : quatre
  runs de suite. Un seul run aujourd'hui, pas de travail en double.
- 🟢 **PREMIÈRE PREUVE D'INDEXATION.** L'hypothèse « indexation réelle inconnue »,
  ouverte depuis le 2026-09-07, est **partiellement levée** :
  `https://www.markusimmobilier.fr/` **remonte en résultat** sur la requête
  `"87 rue Édouard Vaillant" 69100 Villeurbanne agence immobilière`. Le site est
  donc bien indexé sur le nouveau domaine. Mesure obtenue **sans chercher le nom
  de marque** (requête adresse + secteur), donc conforme à la consigne client.
  → **Conséquence pour les prochains runs** : une absence de position n'est plus
  imputable à une non-indexation de la home. Ce n'est pas « le site n'est pas
  connu de Google », c'est « le site ne fait pas le poids sur ces requêtes ».
- ⚠️ **Aucune page profonde ne remonte, elle.** Testé avec une requête portant sur
  une donnée exclusive du site (`"Ferrandière – Maisons-Neuves" médiane 3 923 €/m²`) :
  8 résultats, **aucun de markusimmobilier.fr**, alors que la donnée exacte n'existe
  que chez nous. Deux lectures possibles (voir « Hypothèses ») : pages trop récentes,
  ou pages indexées mais trop faibles. **À remesurer chaque run avec cette requête**
  — c'est le meilleur test d'indexation profonde dont on dispose sans GSC.
- `sitemap.xml` en production = **61 URLs** (inchangé : le chantier du jour ne crée
  aucune page).
- **Bug constaté en production, pas dans une note d'audit** : les pages légales
  servaient un `<link rel="canonical">` pointant vers **la home**, pas vers
  elles-mêmes. Corrigé aujourd'hui (voir « Chantiers faits »).

**Au 2026-09-09**

- Clone local **à jour** au démarrage (`git log HEAD..origin/main` vide) : la
  routine « fetch avant tout » tient depuis trois runs. Un seul run a tourné
  aujourd'hui, pas de travail en double.
- `sitemap.xml` en production = **61 URLs** (inchangé : le chantier du jour
  réécrit une page existante, il n'en crée pas). Build local = **82 pages**.
- **Mesuré en ligne avant d'agir** (pas cru sur parole) :
  `/blog/ou-acheter-villeurbanne-quartiers` servait bien la version faible —
  ~270 mots, 2 H2, aucun chiffre, aucune FAQ, aucun tableau, « Mis à jour le
  2 juin 2026 ». C'est ce qui a décidé du chantier.
- Rappel opératoire confirmé : `npm ci` (~1 min) est indispensable avant
  `tsc`/`lint`/`build`, `node_modules` n'est pas dans le conteneur au démarrage.

**Au 2026-09-08**

- **Le clone local était à jour ce matin** (`git log HEAD..origin/main` vide) :
  la leçon du run n°2 (fetch avant tout) a été appliquée, aucun travail en
  double. **À refaire chaque jour, en premier.**
- `sitemap.xml` = **61 URLs** (60 la veille : +1 avec la nouvelle page
  estimation Villeurbanne). `robots.txt` ne bloque aucune page SEO.
- **8 pages SEO hors blog** : 4 locales (Villeurbanne + 3 quartiers), 2
  estimation (Lyon + **Villeurbanne, créée aujourd'hui**), vendre, acheter,
  gestion locative. 26 articles de blog.
- `node_modules` **n'est pas dans le conteneur au démarrage** : `npm ci` prend
  ~1 min et est indispensable avant `tsc`/`lint`/`build`. Sans lui, `tsc`
  crache une centaine de faux « Cannot find module » — ne pas les prendre pour
  des erreurs du code.
- **Délai de déploiement Vercel : ~60-80 s** (mesuré : 404 aux 3 premières
  tentatives, 200 à la 4ᵉ, soit ≈ 70 s après le push). Prévoir une boucle de
  ré-essai, ne pas conclure à un échec sur un premier 404.

**Au 2026-09-07**

- **Domaine connecté** ✅ — `https://www.markusimmobilier.fr` répond 200,
  `markusimmobilier.fr` redirige en 308 vers `www`. Ceci **clôt le point
  « High #1 » de l'audit du 2026-08-27** (qui disait le domaine non connecté et
  les canonicals pointant dans le vide). Ne pas le rouvrir.
- **Déploiement auto Vercel connecté** ✅ — vérifié aujourd'hui : le push sur
  `main` était en ligne en **moins d'une minute**. `ÉTAT-PROJET.md` le listait
  encore comme « à faire », c'est fait. Concrètement : un run peut vérifier son
  propre travail en prod dans la foulée du push, et doit le faire.
- `robots.txt` OK (bloque `/api/`, `/espace-client`, `/radar`, `/admin`),
  `sitemap.xml` = **60 URLs**.
- 26 articles de blog en SSG, 4 pages SEO locales + 3 pages quartiers.
- ~~**Home : toujours pas de `<h1>`**~~ → **corrigé au run n°2 du 2026-09-07**
  (`<h1>` unique en `sr-only` dans le hero). Constaté absent en début de
  journée, présent depuis.
- JSON-LD servis sur la home : `RealEstateAgent` + `FAQPage` (8 Q/R).
  ~~`RealEstateAgent` n'a ni `logo` ni `geo`~~ → **corrigé au run n°2**
  (`logo`, `image` et `geo` ajoutés).
- Les autres pages clés ont bien un `<h1>` unique et des `<title>` localisés.

### Positions mesurées

Mesure faite via recherche web (pas de Search Console : la propriété GSC n'est
toujours pas créée, `GOOGLE_SITE_VERIFICATION` non renseigné). **Aucune
recherche sur le nom de marque — interdit par le client.**

| Requête | 2026-09-23 | 2026-09-22 | 2026-09-21 | 2026-09-20 | 2026-09-18 | 2026-09-17 | 2026-09-16 | 2026-09-15 | 2026-09-13 | 2026-09-12 | 2026-09-11 | 2026-09-10 | 2026-09-09 | 2026-09-08 | 2026-09-07 |
|---|---|---|---| --- | --- | --- | --- | --- | --- |---|---|---|---|---|---|
| **NOUVEAU — `rentabilité locative Villeurbanne quel rendement net réel`** | **absent**, **1ʳᵉ mesure**. Neuf résultats, **aucun villeurbannais**, et surtout **aucun ne publie de rendement par quartier calculé sur des prix de vente réels** : fourchette nationale, prix moyen commune entière, ou renvoi vers leur propre simulateur. ⚠️ **Vérifié page par page, jamais sur le résumé du moteur** : les deux pages les mieux classées (horiz.io, lybox.fr), téléchargées directement, **ne publient en fait aucun prix, aucun loyer et aucun rendement** pour Villeurbanne — alors que le résumé du moteur leur en attribuait de précis. C'est le créneau du chantier du jour. | | | | | | | | | | | | | | |
| **NOUVEAU — `syndic de copropriété Villeurbanne tarif honoraires petite copropriété`** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent**, **1ʳᵉ mesure — et la SERP la plus vide rencontrée depuis l'ouverture du journal sur une requête locale** : **zéro résultat villeurbannais**. Neuf résultats, tous nationaux et génériques (Manda, Cotoit, MySweetimmo, Syndic One ×2, Pichet, Lea-syndic, LogicielSyndic, Syndicalur), qui répondent tous par une fourchette France entière (« 150 à 250 € par lot et par an », « forfait minimum de 3 000 à 4 000 € HT »). **Aucune agence de Villeurbanne ne se positionne sur le prix d'un syndic.** C'est cette mesure qui a élargi le chantier du jour au volet syndic. | | | | | | | | | | |
| **NOUVEAU — `faire gérer son bien locatif Villeurbanne agence syndic gestion`** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 9, **2ᵉ mesure**. SERP à nouveau **sans un seul tarif affiché** : Laforêt Villeurbanne (« faire gérer »), Manda, PagesJaunes ×2 (syndics / administrateurs de biens), Orpi Cetrim, Guy Hoquet Villeurbanne Zola, Immo de France ×2, mairie.com. Deux rotations en 24 h (Orpi Cetrim et Guy Hoquet entrent, Square Habitat et C&F Gestion sortent) — la composition, elle, ne bouge pas : franchises + annuaires. **C'est la requête du chantier du jour** : mesure de référence avant renforcement de `/faire-gerer`. | **absent** du top 9, **1ʳᵉ mesure**. SERP tenue par des pages « faire gérer » de franchises (Orpi Key Solutions, Laforêt Villeurbanne), deux pages d'annuaire PagesJaunes (syndics / administrateurs de biens), Square Habitat, Manda, C&F Gestion, Immo de France, mairie.com. **Aucun de ces résultats ne publie de tarif** — notre `/honoraires` et les deux articles du 16/09 le font. Requête notée pour un futur chantier ; **pas travaillée aujourd'hui** (le run est technique). | | | | | | | | | |
| 🟡 **NOUVEAU TEST — la fiction du site est-elle indexée ?** — `"Loft d'exception sur Bellecour" markusimmobilier annonce Lyon 2e` | *non remesuré* | *non remesuré* — protocole du 17/09 : une seule remesure vers le 01/10. | *non remesuré* | *non remesuré* | *non remesuré* — protocole posé le 17/09 : **une seule remesure vers le 01/10**, pas avant. | **aucune page de markusimmobilier.fr ne remonte** (SeLoger, ParuVendu, Belles Demeures, Airbnb…). **1ʳᵉ mesure, et c'est la bonne nouvelle du jour** : les 10 fiches de biens fictifs que le sitemap soumettait à Google ne sont **pas** indexées. Le chantier du jour est donc **préventif**, pas curatif. **À remesurer une fois** vers le 01/10 pour confirmer que le `noindex` n'a rien laissé passer. | | | | | | | | | |
| **NOUVEAU — `gestion locative Villeurbanne tarif agence pourcentage loyers`** | *non remesuré* | *non remesuré* | **absent**, **2ᵉ mesure** (formulée `gestion locative Villeurbanne tarif honoraires`). Neuf résultats, **aucun villeurbannais** : Oqoro, BailFacile, Manda, Murani (lyonnais), Foncia, louer-et-gerer, Imodirect, Plusse, Flatlooker. Composition **inchangée depuis le 16/09** : des plateformes nationales de gestion en ligne. **Oqoro publie toujours 4,9 % TTC**, les autres restent sur « 8 à 15 % » ou un formulaire. **Différence décisive avec le créneau syndic du 18/09** : ici les concurrents donnent bien des chiffres. Le trou n'est donc pas « personne ne chiffre » mais **« personne ne chiffre localement, et personne ne va au bout du calcul fiscal »** — c'est l'angle du chantier du jour, mesure de référence avant renforcement de `/gestion-locative`. | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 8, **1ʳᵉ mesure**. SERP tenue par des plateformes nationales de gestion en ligne : BailFacile, Oqoro, Foncia, Imodirect, Plusse, louer-et-gerer, votregestionlocative — **une seule agence locale**, Murani. Fait décisif pour le chantier du jour : **un seul de ces huit acteurs publie un taux précis** (Oqoro, 4,9 % charges comprises). Tous les autres répondent « entre 6 et 8 % HT, selon le bien » ou renvoient vers un formulaire. **Personne ne publie les frais fixes qui s'ajoutent au pourcentage** — c'est exactement ce que notre barème contient et ce que les deux articles touchés aujourd'hui publient désormais. | — | — | — | — | — | — | — | — |
| **NOUVEAU — `qui paie les honoraires d'agence immobilière vente Villeurbanne`** | *non remesuré* | *non remesuré* — **ne pas juger avant le ~29/09**. | *non remesuré* | *non remesuré* | *non remesuré* — **ne pas juger avant le ~29/09**. | *non remesuré* | *non remesuré* — **ne pas juger avant le ~29/09** (protocole posé le 15/09 : cette page vise la citation, pas la 1ʳᵉ page) | **absent**, **1ʳᵉ mesure**. SERP **entièrement nationale et générique** : Foncia, PAP, Crédit Agricole e-immobilier, Barraine, Propriétés Privées, Levine, + 2 blogs de coachs. **Zéro résultat local, zéro barème chiffré, zéro référence légale datée.** La réponse commune est « ça dépend du mandat, comptez 3 à 8 % ». **C'est la SERP la plus faible mesurée depuis le 11/09**, et c'est celle du chantier du jour. | — | — | — | — | — | — | — |
| agence immobilière Villeurbanne | **absent** du top 9 — **15ᵉ mesure, 15ᵉ absence**. La composition corrigée le 22/09 est **confirmée à l'identique** : 6 annuaires ou franchises (PagesJaunes, Immodvisor, **Nestenn ×2** — Est et Ouest, Orpi Cité Immo, Laforêt) contre **3 indépendantes locales** (Salengro, Immo de France, Decultieux). Rotation du jour : **Square Habitat, 1ᵉʳ le 22/09, sort du top 9** ; Nestenn y place deux agences. | **absent** du top 9 — **14ᵉ mesure, 14ᵉ absence**. Deux rotations : **Square Habitat revient et prend la 1ʳᵉ place, immodvisor sort** ; Nestenn Est recule de 1 à 2. Square Habitat, Nestenn Est, PagesJaunes, Orpi Cité Immo, Nestenn Ouest, Laforêt République, Salengro, Immo de France, Decultieux. ⚠️ **Correction d'une formule répétée six runs de suite dans ce journal** : « 9 résultats sur 9 sont des annuaires ou des franchises » est **faux**, et l'a toujours été. Le compte exact est **6** (PagesJaunes = annuaire ; Square Habitat, Nestenn ×2, Orpi, Laforêt = franchises) contre **3 agences indépendantes locales** — Salengro, Immo de France (au même endroit depuis plus de 40 ans) et Decultieux (fondée en 1962). La conclusion en est **renversée** : des indépendantes classent bien sur cette requête, elles sont simplement **anciennes et ancrées**. Ce qui les distingue de nous n'est donc pas leur statut mais leur ancienneté de domaine et leur notoriété locale — ce que ni le contenu ni le maillage ne fabriquent en quinze jours. Le levier fiche GBP (backlog n°3) reste valable, mais il faut cesser d'écrire que la SERP est fermée aux indépendantes : elle ne l'est pas. | **absent** du top 9 — **13ᵉ mesure, 13ᵉ absence**. Deux rotations : **Nestenn Est passe 1ᵉʳ et immodvisor sort**, Nestenn Ouest et Decultieux restent. Nestenn Est, PagesJaunes, Orpi Cité Immo, Nestenn Ouest, Laforêt République, Salengro, Immo de France, Decultieux, immodvisor. **9 sur 9 sont encore des annuaires ou des franchises**, sixième run consécutif. En six runs, aucune agence indépendante n'y entre ni n'en sort : seuls permutent un annuaire et deux franchises. **La veille du jour explique pourquoi le contenu n'y changera rien** — sur les requêtes locales, l'IA cite la fiche Google Business Profile avant le site (Profound : google.com 2ᵉ domaine le plus cité d'AI Mode). Levier = point 3 du backlog, action client. | **absent** du top 9 — **12ᵉ mesure, 12ᵉ absence**. Deux rotations : **immodvisor revient et Nestenn Est entre**, Square Habitat et ERA sortent. Nestenn Est, PagesJaunes, Orpi Cité Immo, Nestenn Ouest, Laforêt, Salengro, Immo de France, Decultieux, immodvisor. **9 résultats sur 9 sont encore des annuaires ou des franchises**, pour le cinquième run consécutif. En cinq runs, le seul mouvement de cette SERP est le va-et-vient d'un annuaire (immodvisor) et de deux franchises (ERA, Square Habitat, Nestenn Est) — **aucune agence indépendante n'y entre, dans aucun sens**. | **absent** du top 9 — **11ᵉ mesure, 11ᵉ absence**. Une rotation : **ERA revient**, immodvisor sort. Square Habitat, PagesJaunes, Orpi Cité Immo, Nestenn (Villeurbanne Ouest), Laforêt, ERA, Salengro, Immo de France, Decultieux. **9 résultats sur 9 sont encore des annuaires ou des franchises**, pour le quatrième run consécutif — le seul mouvement en quatre runs reste la permutation ERA ⇄ immodvisor, un annuaire contre une franchise. | **absent** du top 9 — **10ᵉ mesure, 10ᵉ absence**. Une rotation par rapport au 15-16/09 : **immodvisor revient**, ERA sort. Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn (Villeurbanne Ouest), Salengro, Immo de France, Decultieux, immodvisor. **9 résultats sur 9 sont encore des annuaires ou des franchises**, pour le troisième run consécutif. | **absent** du top 9 — **9ᵉ mesure, 9ᵉ absence**. SERP **strictement identique à celle du 15/09, sans une seule rotation** : Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn, ERA, Salengro, Immo de France, Decultieux. **9 résultats sur 9 sont des annuaires ou des franchises**, pour le deuxième run consécutif. | **absent** du top 9 — **8ᵉ mesure, 8ᵉ absence**. SERP stable, deux rotations : **Square Habitat et ERA rentrent**, immodvisor et un des deux Nestenn sortent. Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn, ERA, Salengro, Immo de France, Decultieux. **9 résultats sur 9 sont des annuaires ou des franchises** — pire qu'au 13/09 (8 sur 9). | **absent** du top 9 — **7ᵉ mesure, 7ᵉ absence**. SERP à nouveau stable, une seule rotation : **immodvisor entre** (annuaire d'avis), Square Habitat sort. Laforêt, PagesJaunes, Orpi Cité Immo, Nestenn ×2, Salengro, Immo de France, Decultieux, immodvisor. **8 des 9 résultats sont des annuaires ou des franchises** — le constat du 09/09 tient sans exception depuis 7 runs. | **absent** du top 9 — **6ᵉ mesure, 6ᵉ absence**. SERP stable, une rotation par rapport à la veille (Square Habitat entre, ERA sort) : Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn ×2, Salengro, Immo de France, Decultieux. **C'est la requête de la page renforcée aujourd'hui** — mesure de référence avant chantier. | **absent** du top 9 — SERP **identique** à la veille à une rotation près (ERA ressort, Laforêt reprend la 1ʳᵉ place). Toujours annuaires + franchises. | **absent** du top 9 — SERP quasi identique, 1 rotation : Square Habitat entre, ERA sort (Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn ×2, Salengro, Immo de France, Decultieux) | absent du top 8 | absent | absent |
| estimation immobilière Villeurbanne gratuite en ligne | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 8 — SERP **très renouvelée** en 2 jours : 4 entrants (Square Habitat, MonMandatLocal, BienEstimer/safti, EN MODE IMMO) face à Nestenn ×2, imkiz, Salengro. **MonMandatLocal affiche « 1 998 transactions réelles »** : 2ᵉ acteur en 2 jours à mettre en avant la donnée de transaction. | *non remesuré* (SERP identique 3 jours de suite — effort reporté sur le chantier technique) | **absent** du top 9 | absent | absent |
| estimation immobilière en ligne ou agence Villeurbanne fiable | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (article réécrit la veille, beaucoup trop tôt) | **absent** du top 10 — **1ʳᵉ mesure**. Aucun résultat éditorial qui chiffre quoi que ce soit : Imop, Nestenn ×2, MeilleursAgents, Liberkeys, Orpi, imkiz, Onva, Salengro, Decultieux. Que des pages de service et une page de prix de portail. **SERP la plus faible rencontrée depuis le début du journal sur une requête d'intention vendeur.** | *non mesuré* | *non mesuré* | *non mesuré* | *non mesuré* |
| prix m2 Villeurbanne par quartier **2026** | *non remesuré* | **absent** du top 9, **2ᵉ mesure** (la 1ʳᵉ datait du 10/09). SERP à nouveau renouvelée de moitié : MeilleursAgents, PAP, SeLoger, **CPIM**, prix-au-m2, fonciris, **regiefranchet**, immosudest, immovrai. Deux faits utiles. (1) **immovrai titre explicitement « ventes DVF 2026 »** : la donnée notariale n'est plus notre exclusivité d'affichage. (2) **CPIM publie « Charpennes 5 120 €/m² »**, soit **45 % au-dessus** des 3 524 €/m² que donnent les ventes DVF réelles sur Charpennes – Tonkin — exactement l'écart relevé le 12/09, toujours là neuf jours plus tard et toujours en première page. MeilleursAgents annonce de son côté 3 806 €/m² toutes typologies et une fourchette appartements de 2 625 à 5 205 €/m². **L'angle « écart entre prix affichés et prix réellement payés » reste donc intact et non publié** (backlog point 2). | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (SERP renouvelée de moitié la veille, rien de neuf à en tirer en 24 h) | **absent** du top 8 — SERP **nettement renouvelée** : 4 entrants (fonciris, prix-au-m2.fr, regiefranchet, **immovrai, qui affiche « ventes DVF »**) face à SeLoger, PAP, MeilleursAgents, immosudest | absent du top 8 | absent | absent |
| vendre appartement Villeurbanne **agence** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 10 — que des portails et des franchises (Orpi ×2, Nestenn, leboncoin, Guy Hoquet, Logic-Immo, Century 21, Salengro, Quatuor, Chomel) | *non remesuré* | absent du top 7 | *non mesuré* |
| agence immobilière Gratte-Ciel Villeurbanne | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 8 (Human Immobilier, Guy Hoquet ×2, Orpi, PagesJaunes, MeilleursAgents, ERA, Superimmo ×2) | *non remesuré* | absent du top 8 | *non mesuré* |
| agence immobilière Charpennes Villeurbanne | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (requête écartée depuis le 11/09) | *non remesuré* (requête écartée le 11/09 : le nom du quartier est celui d'un concurrent) | **absent** du top 9 — SERP tenue par une agence locale homonyme (« Agence Charpennes Rolin Bainson », présente 4 fois via Logic-Immo, SeLoger, Superimmo, repimmo), + PagesJaunes, Orpi, Guy Hoquet. **Requête quasi imprenable au contenu** : le nom du quartier est le nom d'un concurrent. | *non remesuré* | **absent** du top 9 | *non mesuré* | *non mesuré* |
| où acheter à Villeurbanne quartier | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (article réécrit il y a 2 jours) | *non remesuré* (article réécrit il y a 1 jour, trop tôt) | **absent** du top 8 | *non mesuré* | *non mesuré* |
| quel quartier choisir pour acheter un appartement à Villeurbanne 2026 | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (idem) | *non remesuré* (idem) | **absent** du top 8 | *non mesuré* | *non mesuré* |
| investir locatif Villeurbanne : rendement et quartier **2026** | **absent**, sur **deux** formulations mesurées ce matin (`investir locatif Lyon Villeurbanne rentabilité prix au m2 réel` et `rentabilité locative Villeurbanne quel rendement net réel`). **Zéro agence villeurbannaise dans les 9 résultats des deux** : horiz.io, Trackstone, Lybox, homelikehome, investissement-locatif.com, cashflowpositif, Hagnéré, Ynspir, pierre-de-lyon, cyriljarnias — et Immo de France (lyonnais) en 9ᵉ sur une seule. **C'est la SERP du chantier du jour.** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (mais voir la ligne du nouveau test : **ma-rentabilite.fr publie prix, loyers ET rendement par quartier villeurbannais** — 3ᵉ confirmation que cette SERP est fermée) | **absent** du top 7 — **1ʳᵉ mesure**. SERP tenue par des spécialistes de l'investissement qui publient **tous** des prix ET des rendements par quartier (lybox, investissement-locatif.com, CPIM, geraldinearrou, Hagnéré, MonInvestImmo). **Terrain fermé, pas ouvert** : contrairement aux SERP acheteur et estimation, la donnée chiffrée y est déjà la norme. **Mais leurs chiffres ne sont pas les nôtres** : CPIM annonce « Charpennes 5 120 €/m² » quand DVF donne 3 524 €/m² sur Charpennes – Tonkin. Piste éditoriale notée en backlog. | *non mesuré* | *non mesuré* | *non mesuré* | *non mesuré* | *non mesuré* |
| 🟢 **TEST D'INDEXATION** — `"87 rue Édouard Vaillant" 69100 Villeurbanne agence immobilière` | *non remesuré* | *non remesuré* (acquis le 10/09) | *non remesuré* | *non remesuré* | *non remesuré* (acquis le 10/09) | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (acquis le 10/09) | *non remesuré* (acquis le 10/09) | *non remesuré* (acquis le 10/09, la home est indexée — inutile de le repayer chaque jour) | **markusimmobilier.fr PRÉSENT** dans les résultats | *non mesuré* | *non mesuré* | *non mesuré* |
| 🔴 **TEST D'INDEXATION PROFONDE** — `"Ferrandière – Maisons-Neuves" médiane 3 923 €/m²` | *non remesuré* | *non remesuré* — test abandonné le 13/09. | *non remesuré* | *non remesuré* | *non remesuré* — test abandonné le 13/09. | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* — **test abandonné** : un concurrent publie le même chiffre (12/09), il ne diagnostique plus rien. Remplacé par la ligne ci-dessous. | 🔴 **toujours absent** du top 9, **J+5**. Fait nouveau et important : **bien-estimer/safti publie 3 911 €/m² pour Ferrandière – Maisons-Neuves** et MeilleursAgents tient le quartier. **Notre médiane 3 923 €/m² n'est plus un chiffre exclusif** — à 12 € près, un concurrent publie le même. Le test perd donc sa valeur de diagnostic d'indexation : il faudra en trouver un autre (voir « Hypothèses »). | 🔴 **toujours absent** du top 8 (J+4 après la réécriture de l'article prix). SeLoger, MeilleursAgents et les portails sortent sur le nom du quartier, aucun ne publie ce chiffre. **2ᵉ test ajouté aujourd'hui, même résultat** : `Villeurbanne 250 000 € combien de m² Gratte-Ciel Cyprian Les Brosses` → 0 résultat de markusimmobilier.fr, alors que le tableau budget → surface n'existe que chez nous. | **absent** du top 8, alors que ce chiffre exact n'est publié que par nous | *non mesuré* | *non mesuré* | *non mesuré* |
| 🔴 **NOUVEAU TEST D'INDEXATION PROFONDE** (remplace celui de Ferrandière) — `Villeurbanne estimation "erreur médiane" 15,5 % prix au m² quartier ventes DVF 2025` | *non remesuré* | 🔴 **absent** du top 9, **8ᵉ mesure, J+9**. SERP **encore identique** (PAP, imkiz, prix-au-m2, immovrai, lespriximmo, fonciris, immosudest, valoris-immo, france-dpe) et le moteur répond une fois de plus, explicitement, que l'« erreur médiane » de 15,5 % **n'apparaît pas dans les résultats**. **Huit mesures, huit absences** — le seuil que le 21/09 avait fixé pour déclencher la consigne du 13/09 est donc atteint. ⚠️ **Mais il ne faut PAS la déclencher, et la raison est un défaut de l'instrument, découvert aujourd'hui** : l'outil de recherche de ce runner **n'honore ni l'opérateur `site:` ni la recherche exacte entre guillemets**. Vérifié deux fois ce matin : `site:markusimmobilier.fr honoraires` a rendu neuf PDF de l'Assemblée nationale, et une phrase recopiée mot pour mot de `/honoraires` (« Pour un T2 de 45 m²… 585 € TTC ») a rendu neuf pages thématiques sans correspondance exacte. Ce test ne mesure donc **pas** l'indexation : il mesure un classement thématique sur une requête longue, ce qu'aucune page neuve ne gagne. **Huit « absences » ne prouvent aucun blocage technique.** Conséquence, écrite pour le run du 27/09 : le protocole du 13/09 est **suspendu, pas déclenché** — voir « Techniques apprises » et « Hypothèses à vérifier ». | 🔴 **absent** du top 9, **7ᵉ mesure, J+8**. SERP **encore identique** (imkiz, prix-au-m2, immovrai, lespriximmo, fonciris, immosudest, valoris-immo, PAP, france-dpe). Le moteur de réponse répond une nouvelle fois, explicitement, que l'« erreur médiane » de 15,5 % **n'apparaît pas dans les résultats**. **Échéance du protocole : ~27/09, soit dimanche prochain.** Sept mesures, sept absences : si la huitième l'est aussi, la consigne du 13/09 s'applique sans discussion — arrêter d'écrire et chercher un blocage technique d'indexation. | 🔴 **absent** du top 9, **6ᵉ mesure, J+7**. SERP **strictement identique** à celle du 18/09 (imkiz, prix-au-m2, immovrai, lespriximmo, ma-rentabilite, immo-land, fonciris, immosudest, valoris-immo). Le moteur de réponse répond encore explicitement que l'« erreur médiane » de 15,5 % **n'apparaît pas dans les résultats**. **Échéance du protocole inchangée : ~27/09.** Rien à conclure à J+7. | 🔴 **absent** du top 9, **5ᵉ mesure, J+5**. SERP stable (imkiz, prix-au-m2, immovrai, lespriximmo, ma-rentabilite, immo-land, fonciris, immosudest, valoris-immo). Le moteur de réponse répond encore explicitement que l'« erreur médiane » de 15,5 % **n'apparaît pas dans les résultats**. **Échéance du protocole inchangée : ~27/09.** Rien à conclure à J+5. | 🔴 **absent** du top 9, **4ᵉ mesure, J+4**. SERP stable (PAP, imkiz, prix-au-m2, lespriximmo, immovrai, immosudest, fonciris) + valoris-immo. Le moteur de réponse répond encore explicitement que la métrique « n'apparaît pas dans les résultats ». **Échéance du protocole inchangée : ~27/09.** Rien à conclure à J+4. | 🔴 **absent** du top 7, **3ᵉ mesure, J+3**. SERP quasi inchangée (PAP, imkiz, prix-au-m2, lespriximmo, immovrai, fonciris, immosudest). Le moteur de réponse dit à nouveau **explicitement** ne pas trouver l'« erreur médiane » de 15,5 %. **Échéance du protocole inchangée : ~27/09.** Rien à conclure à J+3. | 🔴 **absent** du top 7, **2ᵉ mesure, J+2**. SERP presque inchangée (prix-au-m2, immovrai, lespriximmo, immosudest, fonciris) avec 2 entrants — **immo-land.fr** et **valoris-immo.fr**. Le moteur n'a de nouveau **pas trouvé le chiffre** : il répond que la métrique « n'apparaît pas dans les résultats ». **Échéance du protocole inchangée : ~27/09.** Rien à conclure à J+2. | 🔴 **absent** du top 8, **1ʳᵉ mesure**. Le test est bâti sur un chiffre que **personne d'autre ne calcule** (l'erreur médiane d'une estimation au prix au m², publiée le 11/09) : la concurrence ne peut pas le produire, contrairement à la médiane de Ferrandière. Le moteur de réponse a même répondu explicitement que *« cette information n'apparaît pas dans les résultats »*. Résultats : imkiz, prix-au-m2.fr, lespriximmo, **immovrai**, **ma-rentabilite.fr**, immosudest, fonciris, indice-ville. | — | — | — | — | — | — |

**Lecture au 2026-09-20** — trois faits, dont un qui dit quelque chose sur la
**méthode d'audit** plus que sur le site.

1. 🔴 **Un audit du `<head>` n'avait jamais été fait en entier, et il a trouvé
   quelque chose du premier coup.** Le 17/09 avait audité les 63 URLs sur le
   `<title>`, la description, le canonical, le `<h1>` et les types JSON-LD —
   cinq signaux, tous sains. Personne n'avait regardé les balises d'aperçu.
   Résultat : **37 pages sur 51 sans `og:image`, et 8 pages qui déclaraient
   l'URL de la home comme étant la leur**, depuis l'ouverture du domaine. Le
   défaut ne se voit ni dans le rendu, ni dans le sitemap, ni dans les données
   structurées — uniquement en listant les `<meta property="og:…">` de chaque
   page. **Corollaire de la règle du 17/09** : ce n'est pas seulement un
   compteur qu'il faut remplacer par une liste, c'est aussi **la liste des
   signaux qu'on vérifie** qu'il faut élargir, sinon on audite toujours les
   mêmes cinq champs.
2. ⚠️ **Le code documentait l'inverse de ce que fait la production.** Le
   commentaire d'en-tête de `app/opengraph-image.tsx` dit que l'image
   « s'applique à tout le site sauf si une page définit sa propre
   opengraph-image ». C'est faux dès qu'une page déclare un bloc `openGraph` —
   et 14 pages le faisaient. **Un commentaire n'est pas une mesure** : celui-ci
   a probablement dissuadé de vérifier. (Voir « Techniques apprises ».)
3. **La SERP « agence immobilière Villeurbanne » en est à 12 mesures, 12
   absences**, et le bilan de cinq runs est net : les seuls mouvements sont des
   permutations entre annuaires et franchises (immodvisor, ERA, Square Habitat,
   Nestenn Est). **Aucune agence indépendante n'y entre ni n'en sort.** Le
   levier reste la fiche Google Business Profile (backlog n°1 et n°3) — c'est
   la douzième fois que ce journal l'écrit, et c'est toujours la chose la plus
   utile à remonter au client.

**Lecture au 2026-09-18** — trois faits, dont un qui **ferme une question
restée ouverte quatre runs de suite**.

1. **Le créneau « personne ne publie de prix » est confirmé pour la quatrième
   fois, et cette fois sur une SERP totalement vide de local.** Sur « syndic de
   copropriété Villeurbanne tarif », **aucun des neuf résultats n'est
   villeurbannais** : ce sont des éditeurs de logiciels, des syndics en ligne et
   des blogs qui répondent par une moyenne France entière. Une agence
   villeurbannaise qui explique *comment* se fixe un forfait de syndic — et
   pourquoi il ne peut pas être affiché à l'avance — ne concurrence personne sur
   cette requête : elle est seule.
2. 🟢 **Publier « nous n'avons pas de tarif public » est une réponse, pas un
   aveu.** C'est la décision éditoriale du jour et elle mérite d'être écrite :
   sur le syndic, le site **n'invente aucun prix** (il n'y en a pas au barème)
   mais il explique le mécanisme légal qui le fixe — contrat type du décret du
   26 mars 2015, forfait voté en AG, liste limitative des prestations
   facturables en plus. C'est exactement ce que les neuf résultats nationaux ne
   font pas : ils donnent un chiffre moyen sans dire d'où il vient.
3. **La SERP « agence immobilière Villeurbanne » en est à 11 mesures, 11
   absences, et son seul mouvement en quatre runs est ERA ⇄ immodvisor** —
   c'est-à-dire une franchise contre un annuaire. Rien de neuf : le levier y
   reste la fiche Google Business Profile (backlog n°1 et n°3), et c'est
   toujours la chose la plus utile à faire remonter au client.

**Lecture au 2026-09-17** — trois points, dont un qui concerne la **méthode de
ce journal** plus que le site.

1. **Une mesure de routine n'est une mesure que si on regarde le contenu.**
   « `sitemap.xml` = 63 URLs » a été écrit dans ce journal cinq runs de suite.
   Le chiffre était juste (à partir du 16/09) et il ne servait à rien : dix de
   ces URLs étaient des biens inventés. La ligne « robots.txt OK, sitemap OK »
   est devenue un rituel, et un rituel ne trouve rien. → **Règle posée
   aujourd'hui : un contrôle de routine qui produit toujours le même résultat
   doit être approfondi ou supprimé, pas répété.**
2. **La SERP « agence immobilière Villeurbanne » est fermée pour la dixième
   fois de suite** — 9 résultats sur 9 sont des annuaires ou des franchises, et
   le seul mouvement en trois runs est une permutation ERA ⇄ immodvisor,
   c'est-à-dire **un annuaire qui remplace une franchise**. Le diagnostic du
   09/09 n'a jamais été démenti en dix mesures : **sur cette requête le levier
   est la fiche Google Business Profile, pas le contenu**. C'est la chose la
   plus utile à faire remonter au client, et elle ne coûte rien à écrire une
   onzième fois.
3. **Une SERP neuve, mesurée aujourd'hui, et laissée volontairement de côté** :
   « faire gérer son bien locatif Villeurbanne ». Neuf résultats, **aucun ne
   publie de tarif** — le même trou que celui qui a fait le chantier du 15/09
   (« qui paie les honoraires ») et celui du 16/09 (gestion locative). C'est le
   troisième relevé consécutif où le créneau prenable est « personne ne répond
   avec un chiffre ». `/faire-gerer` fait **290 mots, 2 H2, aucun JSON-LD
   propre** : c'est désormais le meilleur candidat « contenu » du backlog. Il
   n'a **pas** été traité aujourd'hui — le run devait être technique, et il
   l'est resté.

**Lecture au 2026-09-16** — trois faits, dont un qui **corrige une erreur de
diagnostic que j'ai failli écrire dans ce journal**.

1. ⚠️ **Le maillage interne ne se mesure pas avec un `grep` sur `href="…"`.**
   Première mesure du jour : « `/honoraires` ne reçoit que 4 liens internes,
   tous du petit cluster de landing pages qui se citent entre elles ». C'est
   **faux** : le footer du site (`components/layout/site-footer.tsx`) construit
   sa navigation depuis un **tableau d'objets** (`{ href: "/honoraires", label:
   … }`), que le motif `href="/honoraires"` ne capture pas. `/honoraires` reçoit
   donc en réalité **un lien sitewide**, sur les 82 pages. L'erreur a été prise
   à temps, en relisant le HTML **rendu** d'un article (le lien y apparaissait
   alors que je ne l'avais pas posé). → **Règle : mesurer le maillage sur le
   HTML rendu, jamais sur le code source seul.** Un `grep` de code rate tout ce
   qui passe par une structure de données.
2. **La vraie hiérarchie du maillage, une fois la mesure refaite**, est plus
   intéressante que la fausse. Le footer lie `/vendre`, `/acheter`,
   `/gestion-locative`, `/estimation`, `/estimation-immobiliere-lyon`,
   `/agence-immobiliere-villeurbanne`, `/equipe`, `/blog`, `/honoraires`,
   `/recrutement`. Il **ne lie pas** les 3 pages quartiers ni
   `/estimation-immobiliere-villeurbanne`. Ces quatre pages — dont les trois
   créées le 15/09 — sont **les pages stratégiques les moins maillées du
   site** : aucun lien de gabarit, uniquement quelques liens contextuels entre
   pages sœurs. Et **aucun des 26 articles ne leur envoyait quoi que ce soit**.
3. **La SERP du chantier du jour est ouverte, et pour une raison précise.** Sur
   « gestion locative Villeurbanne tarif », huit résultats : **un seul publie un
   taux** (Oqoro, 4,9 %). Les autres disent « 6 à 8 % HT, ça dépend » ou cachent
   le prix derrière un formulaire. **Aucun ne publie les frais fixes** qui
   s'ajoutent au pourcentage. Le schéma des 11/09 et 15/09 se répète une
   troisième fois : **la SERP prenable est celle où personne ne répond, pas
   celle où les concurrents sont petits.**

**Lecture au 2026-09-15** — la veille rattrapée change la hiérarchie des
priorités du journal. Quatre points, dont deux qui corrigent une croyance.

1. 🟢 **« Absent du top 10 » n'interdit pas d'être cité par une IA — et c'est
   mesuré.** L'étude Seer (8 500 mots-clés, mai 2026) et les statistiques
   agrégées 2026 convergent : **83 % des citations d'AI Overview proviennent de
   pages situées hors du top 10 organique**, et le recouvrement entre citations
   AIO et top 10 est tombé de ~76 % (mi-2025) à 17–54 % (début 2026). **C'est
   la meilleure nouvelle de ce journal depuis son ouverture** : huit absences
   de suite sur « agence immobilière Villeurbanne » ne condamnent **pas** la
   stratégie de citabilité. Les deux objectifs (classer, être cité) se
   dissocient réellement, et le second ne passe plus par le premier.
2. 🔴 **Mais la même étude dit que le schema FAQ n'est pas le levier — et ce
   journal en a fait beaucoup.** Détail et lecture critique en « Techniques
   apprises ». Conséquence immédiate sur le backlog : **le maillage interne
   (point 5) passe devant le balisage des dernières pages (point 8)**, parce
   que les liens internes sont l'un des rares signaux qui corrèlent
   *positivement* avec la citation.
3. **La SERP du chantier du jour est la plus faible mesurée depuis le 11/09.**
   « Qui paie les honoraires d'agence » ne ramène que des pages nationales
   génériques qui répondent « ça dépend, comptez 3 à 8 % ». Le schéma du 11/09
   se répète à l'identique : **la SERP la plus prenable n'est pas celle où les
   concurrents sont petits, c'est celle où personne ne répond vraiment.**
4. **La SERP « agence immobilière Villeurbanne » s'est encore refermée** : 9
   résultats sur 9 sont désormais des annuaires ou des franchises (8 sur 9 au
   13/09). Le diagnostic du 09/09 tient pour la huitième fois — **le levier y
   est la fiche Google Business Profile, pas le contenu.** Action client
   (backlog n°1 et n°3), et c'est la chose la plus utile à faire remonter.

**Lecture au 2026-09-13** — le test d'indexation profonde est **reconstruit**, et
la SERP « agence » confirme pour la septième fois qu'elle ne se prend pas au
contenu.

1. **Le nouveau test d'indexation profonde est en place et il est meilleur que
   l'ancien.** Il porte sur l'**erreur médiane de 15,5 %** publiée le 11/09 :
   contrairement à la médiane de Ferrandière (que safti publie à 12 € près), ce
   chiffre suppose d'avoir rejoué 1 875 estimations contre les prix réellement
   payés. **Aucun concurrent ne peut le produire par hasard.** Première mesure :
   **négatif**. Le compteur du protocole repart donc d'aujourd'hui, pas du
   10/09 : → **si ce test est encore négatif après le ~27/09**, l'explication
   « délai d'indexation » devient indéfendable et il faudra chercher un blocage
   technique. D'ici là, une absence ne prouve rien.
2. **7 mesures, 7 absences, et 8 résultats sur 9 sont des annuaires ou des
   franchises** sur « agence immobilière Villeurbanne ». Le nouvel entrant du
   jour est **immodvisor**, un annuaire d'avis — c'est-à-dire *encore* un
   annuaire. Le diagnostic du 09/09 n'a jamais été démenti depuis : **sur cette
   requête, le levier est la fiche Google Business Profile et les citations
   d'annuaires, pas le contenu du site.** C'est une action client (backlog n°1
   et n°3) et elle devient la chose la plus utile à faire remonter.
3. **Troisième confirmation que la SERP investissement est fermée** : la requête
   du nouveau test a fait sortir **ma-rentabilite.fr**, qui publie prix au m²,
   loyers *et* rendement **par quartier villeurbannais** (« Les Poulettes »).
   Après CPIM et consorts le 12/09, c'est le troisième acteur à le faire. La
   note du 12/09 tient : sur ces deux articles, l'angle n'est pas « encore des
   chiffres », c'est **l'écart entre prix affichés et prix réellement payés**.
4. Point de vigilance repéré au passage, **sans action aujourd'hui** : les
   agrégateurs de cette SERP donnent des noms de quartiers et des classements
   qui ne recoupent pas les nôtres (l'un annonce « Perralliere » quartier **le
   plus cher** à 3 955 €/m² quand nos ventes DVF 2025 donnent
   Perralière – Grandclément à 3 375 €/m², et Ferrandière en tête à 3 923).
   Ce n'est **pas une contradiction de nos chiffres** — périmètres et périodes
   diffèrent (« 12 derniers mois » chez eux, année 2025 chez nous, contours
   officiels chez nous) — mais c'est exactement pourquoi notre différenciateur
   doit rester **le contour officiel du quartier et la méthode publiée**. Noté
   en « Hypothèses à vérifier », rien à corriger sur le site.

**Lecture au 2026-09-12** — deux faits neufs, dont un qui **retire un outil de
diagnostic** au journal.

1. 🔴 **Le test d'indexation profonde vient de perdre sa validité.** Il reposait
   sur l'idée que « 3 923 €/m² à Ferrandière – Maisons-Neuves » n'est publié que
   par nous. **Ce n'est plus vrai** : bien-estimer/safti affiche
   **3 911 €/m²** sur ce quartier et MeilleursAgents le couvre aussi. À 12 €
   près, un concurrent publie le même chiffre. Donc une absence sur cette
   requête ne prouve plus rien sur notre indexation — elle peut simplement
   vouloir dire que Google préfère safti. **Le protocole du 10/09 (« si c'est
   encore négatif après le ~21/09, chercher un blocage technique ») ne peut plus
   se fonder sur ce test.** Il faut un test bâti sur une donnée que la
   concurrence ne peut pas produire : les chiffres de **dispersion** (P25–P75,
   erreur médiane 15,5 %, taux 18/36/62 %) publiés le 11/09 sont les seuls
   candidats sérieux — personne ne les calcule. **À utiliser comme nouveau test
   dès le prochain run.**
2. **La SERP « investissement locatif Villeurbanne » est fermée, pas ouverte.**
   Première mesure aujourd'hui, et elle invalide une intuition raisonnable : on
   pouvait croire que les deux articles faibles du backlog
   (`investir-locatif-lyon`, `rentabilite-locative-lyon`) visaient un terrain
   vide comme l'était le terrain acheteur. C'est l'inverse : **les six résultats
   publient déjà des prix et des rendements par quartier**. → **Conséquence
   directe sur le backlog** : réécrire ces deux articles « avec des chiffres »
   ne suffira pas, puisque tout le monde en a. En revanche la mesure a fait
   apparaître un angle que personne ne tient : **CPIM annonce « Charpennes
   5 120 €/m² » là où les ventes DVF donnent 3 524 €/m² sur Charpennes –
   Tonkin**, soit 45 % d'écart. L'écart entre *prix affichés par les sites
   d'investissement* et *prix réellement payés* est mesurable avec nos données
   et n'est publié nulle part. C'est ça, l'angle de ces deux articles — pas
   « encore des chiffres ».

**Lecture au 2026-09-11** — trois enseignements, dont un qui change la façon de
choisir les prochains chantiers.

1. **La requête « en ligne ou agence » est le terrain le moins tenu mesuré
   jusqu'ici.** Sur les 10 résultats, **aucun ne publie un seul chiffre** : ce
   sont des pages de service d'agences et de portails qui affirment « l'agence
   est plus fiable » sans jamais dire de combien. L'intention est pourtant
   franchement vendeur (qui compare les deux méthodes prépare une vente). C'est
   ce qui a décidé du chantier du jour, et c'est un cas d'école : **la SERP la
   plus faible n'est pas celle où les concurrents sont petits, c'est celle où
   personne ne répond vraiment à la question posée.**
2. **Le test d'indexation profonde reste négatif, à J+4.** Un **second** test a
   été ajouté aujourd'hui, sur la donnée exclusive de l'article acheteur
   (budget → surface) : négatif lui aussi. Deux données que personne d'autre ne
   publie, deux absences. Le protocole du 10/09 tient : **si c'est encore
   négatif après le ~21/09, l'explication « délai d'indexation » devient
   indéfendable** et il faudra chercher un blocage technique, pas écrire plus.
3. **Le créneau « donnée de transaction » se peuple vite.** Le 10/09, immovrai
   entrait en affichant « ventes DVF ». Aujourd'hui, **MonMandatLocal entre sur
   la requête estimation en affichant « 1 998 transactions réelles »**. Deux
   acteurs en deux jours. Notre différenciateur ne peut plus être « nous, on
   source » : ce sera **la finesse** (contours officiels de quartiers,
   typologies, dispersion) et **la transparence de la méthode**, y compris ses
   limites. Le chantier du jour va exactement dans ce sens.

Un quatrième point, pour éviter de perdre du temps : sur **« agence immobilière
Charpennes Villeurbanne »**, le top 9 est occupé quatre fois par une agence
locale nommée **« Agence Charpennes Rolin Bainson »**, relayée par Logic-Immo,
SeLoger, Superimmo et repimmo. Le nom du quartier *est* le nom d'un concurrent :
**cette requête ne se prend pas au contenu**. Ne pas y consacrer un chantier.

**Lecture au 2026-09-10** — le fait marquant n'est pas dans les positions
(toujours aucune, comme attendu : les contenus ont 1 à 3 jours), il est dans les
**deux tests d'indexation ajoutés aujourd'hui**, qui se contredisent utilement :

- La **home est indexée** — elle sort sur une requête adresse. On peut donc
  **fermer le débat « Google ne connaît pas le site »**.
- Mais une requête sur une **donnée exclusive** du site (la médiane 3 923 €/m²
  de Ferrandière, publiée nulle part ailleurs) ne le fait **pas** remonter. Si
  l'article prix était indexé et jugé pertinent, il devrait sortir premier sur
  sa propre donnée : personne d'autre ne peut répondre. **C'est le signal le
  plus actionnable obtenu depuis le début de ce journal.**

Deux explications possibles, à départager les prochains runs (voir
« Hypothèses ») : (a) délai d'indexation des pages profondes, ou (b) pages
profondes crawlées mais peu ou pas indexées, faute de signaux internes. **C'est
(b) qui a décidé du chantier du jour** : jusqu'à aujourd'hui, les 26 articles ne
pouvaient émettre **aucun lien** depuis leur corps de texte, et les 2 pages de
données les plus riches du site ne recevaient donc quasiment rien.

Second point de SERP, sur « prix m2 Villeurbanne par quartier 2026 » : la SERP
s'est **renouvelée de moitié** en 24 h, et l'un des entrants (**immovrai**)
affiche explicitement « ventes DVF » — c'est-à-dire **exactement notre angle**.
Le créneau « prix sourcé DVF » n'est plus vide ; il se peuple. Ne pas en
conclure qu'il faut l'abandonner, mais **ne plus le considérer comme un terrain
libre**.

**Lecture au 2026-09-09** : toujours aucune position, et les deux SERP suivies
depuis trois jours sont **strictement identiques**. Rien de neuf à en conclure :
l'article prix a 2 jours, la page estimation Villeurbanne 1 jour. Le délai de
jugement se compte en semaines. **Ne pas refaire ces chantiers.**

Ce qui est **nouveau et a décidé du chantier du jour** : les deux requêtes
« acheteur » mesurées pour la première fois montrent une SERP **nettement plus
faible** que celles déjà suivies. Sur « où acheter à Villeurbanne quartier », le
seul résultat éditorial du top 8 est un **billet de blog homeloop de 2021** ;
le reste, ce sont des pages de listes d'annonces (SeLoger, Century 21, BienIci,
ParuVendu) qui ne répondent pas à la question posée, plus un résultat hors sujet
(un annuaire de magasins). Sur « quel quartier choisir… 2026 », les 8 résultats
sont des articles génériques d'acteurs nationaux ou de blogs d'investissement :
**aucun ne publie de prix par quartier sourcé**. C'est le terrain le moins tenu
identifié depuis le début de ce journal — d'où le choix de renforcer l'article
acheteur plutôt que d'insister sur les requêtes « agence » et « estimation »,
tenues par des annuaires et des portails.

Deux enseignements de SERP, utiles pour choisir les prochains chantiers :

- Le top de « agence immobilière Villeurbanne » et de « agence immobilière
  Gratte-Ciel » est occupé par des **annuaires (PagesJaunes, Superimmo,
  MeilleursAgents) et des réseaux franchisés**. Sur ces requêtes, le levier
  décisif est la **fiche Google Business Profile et les citations d'annuaires**,
  pas le contenu du site. À dire au client : c'est une action qui lui appartient.
- Sur « prix m2 » et « estimation », les résultats sont des **pages de données**
  (portails). C'est le seul terrain où la traçabilité du chiffre peut battre
  l'autorité de domaine — d'où le choix des chantiers du 07/09 et du 08/09.

---

## Chantiers faits

### 2026-09-23 — `rentabilite-locative-lyon` : le rendement brut des sept quartiers de Villeurbanne, calculé sur les prix signés, frais de notaire déduits, et chaque charge convertie en points de rendement

**Pourquoi cet angle.** Le backlog désignait depuis le 12/09 la paire
`investir-locatif-lyon` / `rentabilite-locative-lyon` comme le meilleur
candidat contenu, et le 22/09 a acté que le run du 23 pouvait être un run de
contenu. La mesure de ce matin a tranché entre les deux : sur les deux
formulations « rentabilité / investissement locatif Villeurbanne », la SERP ne
contient **aucune agence villeurbannaise** et surtout **aucun rendement par
quartier calculé sur des prix de vente réels**. Or le site possède les deux
moitiés du calcul depuis le 07/09 — les médianes DVF par quartier
(`lib/quartiers.ts`) et le loyer médian communal (`LOYER_MEDIAN_HC`) — sans
les avoir jamais croisées ailleurs que sur une seule page de quartier.
**Un seul article a été réécrit**, pas les deux : `investir-locatif-lyon`
reste au backlog (voir « Chantiers en attente »).

**Ce qui a été publié** — `231 → 2 379 mots rendus`, 7 H2 tous formulés en
questions, FAQ de 6 Q/R, `updated` au 23/09.

1. **Un tableau de rendement brut pour les sept quartiers publiables**, à deux
   colonnes : rendement sur le prix, et rendement **frais de notaire inclus**
   (7,5 %, milieu de la fourchette de notre propre article). De 6,40 % à
   Cyprian – Les Brosses à 4,47 % à Ferrandière – Maisons-Neuves, 4,91 % pour
   la commune. Les frais de notaire retirent **0,31 à 0,45 point** selon le
   quartier — personne, sur cette SERP, ne les met au dénominateur.
2. **La limite de méthode écrite noir sur blanc, deux fois.** Le loyer appliqué
   est **communal**, faute de loyer de référence publié à la maille du
   quartier : les écarts du tableau sont donc des écarts de **prix**, à loyer
   constant. C'est la doctrine déjà posée sur `/agence-immobiliere-charpennes`
   le 15/09, généralisée ici.
3. **Le refus de publier un rendement par typologie, expliqué.** Un T1 se loue
   plus cher au m² qu'un T4 ; appliquer un loyer unique aux typologies
   donnerait un classement faux, favorable aux grandes surfaces. Ce que les
   données disent sans ambiguïté, en revanche, c'est le **prix** : T1 médian
   4 000 €/m², T4 3 211 €/m², soit **24,6 % d'écart** (DVF 2025).
4. **Un second tableau qui convertit chaque charge en points de rendement**,
   sur un cas de référence dérivé des médianes : T2 de 44 m² à 170 000 €, loué
   642 €/mois HC. Un mois de vacance = **−0,35 point** ; une année de gestion
   déléguée (6 % + 20 €) = **−0,26** ; la GLI = **−0,11** ; et surtout
   **toute charge de 100 €/an = −0,055 point**, règle que le lecteur applique
   à sa propre taxe foncière.
5. **Le refus de publier un montant de taxe foncière, argumenté** : elle
   dépend de la valeur locative cadastrale du lot, deux appartements du même
   immeuble peuvent différer, et la seule donnée fiable est l'avis du vendeur.
   L'article dit de le réclamer avant de signer. C'est l'inverse exact de ce
   que fait la SERP, qui avance des moyennes.
6. **Le volet juridique, sourcé sur du primaire.** Villeurbanne applique
   l'encadrement des loyers : le loyer d'un bail neuf ou renouvelé est plafonné
   par le « loyer de référence majoré » fixé par arrêté préfectoral. L'article
   cite **la décision du tribunal administratif de Lyon du 14 octobre 2025**
   (requête n° 2309987) annulant l'arrêté du 29 septembre 2023 pour carte
   insuffisamment précise, précise que l'annulation porte sur un arrêté et non
   sur le principe, et renvoie vers **service-public.gouv.fr** et **la page
   encadrement des loyers de la préfecture du Rhône**. Trois liens externes,
   dont deux `.gouv.fr` — la veille du 15/09 (étude Seer) donne les citations
   de sources officielles comme corrélées à la citation en AI Overview.
7. **Une démonstration chiffrée contre les rendements affichés** : au prix
   médian de Gratte-Ciel (3 846 €/m²), afficher 6 % de rendement brut
   suppose un loyer de **19,23 €/m² HC**, soit **près de 32 % au-dessus** de la
   médiane communale — et le loyer y est plafonné.
8. **Le rendement a monté par le bas** : la médiane communale est passée de
   3 981 €/m² (2022) à 3 567 (2025), −10,4 % ; **à loyer inchangé, cette seule
   baisse a ajouté 0,51 point** de rendement brut (4,40 % → 4,91 %).

**Cohérence du site, vérifiée et corrigée.** La FAQ de
`ou-acheter-villeurbanne-quartiers` affirmait depuis le 09/09 que « Markus
Immobilier ne publie pas de rendement par quartier ». C'était déjà faux depuis
le 15/09 (`/agence-immobiliere-charpennes` en publie un), et ça le devenait
franchement aujourd'hui. **La réponse a été réécrite** pour donner la
fourchette 4,47–6,40 % et rappeler que l'écart est un écart de prix. Le
`FAQPage` de cette page est généré depuis le même tableau : la correspondance
JSON-LD ↔ visible a été **revérifiée sur le HTML rendu, 5 Q/R sur 5 conformes**.

**Maillage.** L'article gagne un lien de corps entrant depuis
`investir-locatif-lyon` (phrase justifiée : « avant de retenir un secteur,
regardez ce qu'il rapporte vraiment »), et émet 7 liens internes contextuels
(`prix-immobilier-villeurbanne-2026`, `ou-acheter-villeurbanne-quartiers`,
`frais-de-notaire-lyon-2026`, `cout-gestion-locative`, `/honoraires`,
`/gestion-locative`, `/estimation-immobiliere-villeurbanne`).

**Vérifié sur le HTML rendu, jamais sur la source** (règle du 18/09), serveur
de production local :
`2 379 mots` dans `<main>`, 1 `<h1>`, 7 `<h2>`, **2 tableaux**, **zéro markdown
brut** (règle du 22/09 : `**` et `](` cherchés dans le texte rendu, aucune
occurrence), les 4 JSON-LD (`RealEstateAgent`, `BlogPosting`, `FAQPage`,
`BreadcrumbList`), `dateModified` = `2026-09-23`, `article:modified_time`
idem, **les 6 réponses du `FAQPage` retrouvées à l'identique dans le texte
visible**, canonical et `og:url` sur `/blog/rentabilite-locative-lyon`,
`og:image` présente, date visible « Mis à jour le 23 septembre 2026 ».
`sitemap.xml` sert `lastmod` = `2026-09-23` sur cette URL (dérivé
automatiquement de `updated`, aucune table à toucher) et `llms.txt` porte le
nouvel extrait avec les chiffres (dérivé d'`excerpt`, rien à maintenir à la
main). `npx tsc --noEmit` propre, `npm run build` en succès,
`/blog`, `/blog/investir-locatif-lyon` et `/agence-immobiliere-charpennes`
toujours en 200.

**Un seul fichier modifié : `lib/blog.ts`.** Aucun composant, aucun gabarit,
aucune page. L'outil d'estimation n'a pas été approché.

### 2026-09-22 — Le blog cesse d'être un entonnoir : 18 articles sur 26 ne recevaient aucun lien d'un frère, 13 n'avaient que `/blog` comme seule page entrante

**Angle : maillage interne** (le précédent datait du 16/09 ; le 21/09 était un
run de contenu, donc un deuxième d'affilée était exclu).

**Ce qui a été mesuré avant d'agir.** Le graphe complet des liens internes a
été reconstruit à partir du **HTML rendu** des 53 pages de production — pas du
code source, règle du 16/09. Résultat : **aucune page orpheline**, mais une
distribution très déséquilibrée. 15 pages reçoivent un lien sitewide (52
sources), et à l'autre bout **13 articles de blog reçoivent exactement un
lien : celui de la liste `/blog`**.

**La cause, trouvée dans `lib/blog.ts`.** `getRelatedArticles` filtrait les
articles partageant la même page « argent » (`internalHref`), triait du plus
récent au plus ancien et prenait `.slice(0, n)` — c'est-à-dire **toujours les
deux mêmes**, les deux plus récents du groupe. Répartition des 26 articles en 4
groupes : `/vendre` (9), `/acheter` (8), `/estimation` (5),
`/gestion-locative` (4). Donc **8 articles recevaient 100 % des liens « À lire
aussi » et 18 n'en recevaient aucun**, depuis l'ouverture du blog. Le défaut ne
se voit ni dans le rendu d'une page prise isolément (le bloc est là, il a l'air
normal), ni dans le sitemap, ni dans les données structurées : **uniquement en
agrégeant les liens des 26 pages**.

**Le correctif.** Parcours **cyclique** du groupe au lieu d'une troncature :
l'article d'indice `i` pointe vers `i+1` et `i+2`, modulo la taille du groupe.
Dans un cycle, chaque nœud a exactement 2 arcs entrants et 2 sortants. Tous les
groupes comptant au moins 3 articles, **les 26 articles reçoivent désormais 2
liens entrants de frères**. Le choix reste **déterministe** (aucun aléa, aucune
dépendance à la date du jour) : le rendu statique est stable d'un build à
l'autre, condition pour que Google voie le même graphe à chaque passage.

**Vérifié sur le rendu local, pas sur le source** : liens entrants
inter-articles, **minimum 2, maximum 9, aucun article à zéro** — contre 13
articles à zéro avant.

**Second volet — le lot du 16/09 repris.** 11 liens de corps de texte posés sur
**6 des 12 articles** qui n'en émettaient aucun, et **uniquement là où la
phrase existante les appelait déjà** :

| Article | Lien posé (ancre → cible) |
|---|---|
| `diagnostics-obligatoires-vente` | « DPE » → `/blog/dpe-2026-ce-qui-change` · « Loi Carrez » → `/blog/loi-carrez-surface` |
| `achat-immobilier-lyon-checklist` | « capacité d'emprunt », « frais de notaire », « charges », « offre », « compromis » → les 5 articles correspondants |
| `taxe-fonciere-vente-qui-paie` | « compromis de vente » → `/blog/compromis-de-vente-delais` |
| `plus-value-immobiliere-calcul` | « frais d'acquisition » → `/blog/frais-de-notaire-lyon-2026` |
| `faire-offre-achat` | « obtention de prêt » → `/blog/capacite-emprunt-immobilier` · « prix du secteur » → `/blog/prix-immobilier-villeurbanne-2026` |
| `dpe-2026-ce-qui-change` | « diagnostics déjà exigés avant toute vente » → `/blog/diagnostics-obligatoires-vente` |

Bilan du volet : **28 → 40 liens de corps**, **12 → 6 articles muets**.
`achat-immobilier-lyon-checklist` en porte 5 à lui seul, et c'est justifié :
l'article **est** la check-list des étapes d'un achat, chaque étape a sa page
dédiée, et les 5 ancres sont des mots déjà présents dans le texte. Aucune
phrase n'a été écrite pour accueillir un lien.

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**
- **Ne pas passer le bloc « À lire aussi » de 2 à 3 cartes.** La grille est en
  `sm:grid-cols-2` ; une troisième carte casse la symétrie en 2+1. Le gain de
  maillage est nul (le cycle suffit), le coût est visuel.
- **Ne pas toucher aux 6 articles muets restants** (`home-staging`,
  `compromis-de-vente-delais`, `charges-copropriete`,
  `questions-a-poser-visite`, `loi-carrez-surface`, `lmnp-location-meublee`) :
  aucune phrase n'y appelle un lien aujourd'hui, et en forcer un serait de la
  sur-optimisation, pas du maillage. Règle du 16/09 tenue.
- **Ne pas bouger les dates de mise à jour.** Poser un lien contextuel n'est
  pas une mise à jour de contenu ; gonfler `dateModified` pour ça
  contredirait frontalement le correctif du 17/09 (« le sitemap cesse de mentir
  sur les dates »). Aucun `updated` touché, donc aucun `dateModified` touché.
- **Ne pas ajouter `/faire-gerer` au pied de page** alors que la mesure montre
  qu'elle ne reçoit que **5 liens entrants** contre 52 pour `/gestion-locative`
  (qui, elle, est au footer). C'est un changement **sitewide** sur les 53
  pages, décidé sur une mesure d'aujourd'hui, sans recul : noté en
  « Hypothèses à vérifier », pas poussé.
- **Ne pas déclencher la consigne du 13/09** malgré la 8ᵉ absence du test
  d'indexation profonde — l'instrument de mesure s'est révélé défaillant ce
  matin (voir « Techniques apprises »).

**Contrôle de non-régression avant push.** `tsc --noEmit` propre ; `eslint` sur
`lib/blog.ts`, `components/blog/article-body.tsx` et `app/blog/**` : **0 erreur**
(les 25 erreurs du dépôt sont préexistantes, dans `scripts/` et `studio/`, et
leur nombre est inchangé) ; build complet, 85 pages générées. Puis **le nombre
de mots rendus des 53 pages a été comparé un à un entre la production et le
build local** : écart nul ou ≤ 4 mots partout, sauf la home (−50) et
`/annonces` (−48) — écart déjà connu et expliqué le 18/09 (les annonces
publiées en base sont absentes du conteneur), et `/blog/dpe-2026-ce-qui-change`
(+11), qui est la seule phrase réellement allongée aujourd'hui. Aucune page du
site hors blog n'a bougé d'un mot.

**Fichiers touchés** : `lib/blog.ts` (algorithme + 11 liens),
`components/blog/article-body.tsx` (moteur d'inline). **Rien d'autre.**
Ni l'outil d'estimation, ni le sitemap, ni les données structurées, ni
`llms.txt` (aucune page nouvelle : rien à y déclarer).

✅ **Vérifié en production après déploiement.** La mise en ligne a pris
**~1 h 15** après le push (contre quelques minutes les jours précédents) —
long, mais elle a fini par se faire ; rien à remonter au client de ce côté. Le
`git push` a été le seul geste nécessaire.

Relecture des **26 articles téléchargés un par un depuis la production**, avec
un paramètre anti-cache sur chaque requête :

- **liens entrants inter-articles : minimum 2, maximum 9, aucun article à
  zéro** — contre 13 articles à une seule page entrante (`/blog`) ce matin.
  Le cycle fonctionne exactement comme simulé ;
- **zéro markdown brut** dans le texte visible des 26 articles (recherche des
  sous-chaînes `](` et `**`) : les 5 liens qui s'affichaient en clair au
  premier rendu sont bien rendus en `<a href>` ;
- **les 11 liens du jour sont tous servis**, avec les bonnes ancres —
  `achat-immobilier-lyon-checklist` en porte 5, `diagnostics-obligatoires-vente`
  et `faire-offre-achat` 2 chacun, les trois autres 1 ;
- **JSON-LD inchangé** : types identiques, et `dateModified` toujours égal à
  `datePublished` sur les articles touchés (12/05, 23/06, 05/05) — aucune date
  gonflée, conformément à la décision ci-dessus.

**Non-régression hors blog, mesurée sur les mêmes pages qu'au début du run** :
`/honoraires` 1 054 mots, `/gestion-locative` 1 780, `/faire-gerer` 1 832,
`/estimation-immobiliere-villeurbanne` 1 620, `/blog` 989, home 1 351 —
**identique au mot près** à la mesure d'avant chantier. `sitemap.xml` toujours
à **53 URLs**. Aucune page hors blog n'a bougé.

⚠️ **Un troisième piège d'instrument, dans la vérification elle-même.** La
première passe de contrôle hors blog a rendu `/faire-gerer` = 1 780 mots
(exactement la valeur de `/gestion-locative`) et la home = 989 (celle de
`/blog`). Cause : `curl -o p.html` avait échoué sur ces deux URLs et **le
fichier de la page précédente était encore là**, donc le script a mesuré deux
fois la même page sans rien signaler. → **Règle : après un téléchargement,
vérifier que le fichier a bien été réécrit (`rm` avant, test de taille après)
avant de mesurer quoi que ce soit.** Deux valeurs identiques sur deux pages
différentes sont un signal d'alerte, pas une coïncidence. C'est le troisième
piège d'outillage de la journée, après le `pkill` qui tuait son propre shell et
le moteur de recherche sans recherche exacte.

### 2026-09-21### 2026-09-21 — `/gestion-locative` : l'arbitrage « déléguer ou gérer seul » chiffré, et le fait que personne ne publie — au loyer médian villeurbannais, les honoraires de gestion ne sont **pas** déductibles

**Ce qui a décidé du chantier.** Candidat ouvert le 18/09 et arrivé en tête du
backlog : la page reçoit un lien sitewide depuis le footer, et elle servait
**257 mots**, quatre `<h2>` affirmatifs, aucune FAQ, aucun chiffre, aucune date.
Sa page sœur `/faire-gerer`, reprise le 18/09, en sert 1 832. L'angle « contenu »
était dû (dernier run technique le 20/09).

**L'angle, choisi pour ne pas refaire `/faire-gerer`.** Partage de rôles écrit
en en-tête des deux fichiers pour que le prochain run ne les confonde pas :

| Page | Question à laquelle elle répond |
|---|---|
| `/faire-gerer` | **Combien ça coûte** — barème traduit en euros — et le syndic |
| `/gestion-locative` | **Faut-il déléguer** — arbitrage fiscal et de risque |

Le coût n'est donc **pas recalculé** ici : il est cité une fois et renvoyé à
`/faire-gerer`. Les six H2 sont disjoints de ses six H2, et les six Q/R de la
FAQ sont disjointes de sa FAQ.

**La trouvaille du jour, et c'est elle qui justifie la page.** En dérivant le
cas de référence villeurbannais (62 m², loyer médian communal, soit 905 €/mois
HC) on tombe sur **10 860 € de loyers bruts annuels — sous le seuil de
15 000 € du micro-foncier**. Or au micro-foncier, aucune charge réelle ne se
déduit : l'abattement forfaitaire de 30 % est censé tout couvrir. Donc
**sur l'appartement villeurbannais médian, l'argument « les honoraires de
gestion sont déductibles », que répètent toutes les pages concurrentes,
est faux.** Ils ne le deviennent qu'au régime réel.

Le calcul va jusqu'au bout, et il joue contre l'intérêt commercial immédiat de
l'agence — ce qui est précisément ce qui le rend citable :
- le régime réel n'est avantageux que si les charges réelles dépassent
  l'abattement de 30 %, soit **3 258 €/an** ici ; les 672 € de gestion en font
  moins du quart, donc **déléguer ne justifie pas, à lui seul, de quitter le
  micro-foncier** ;
- le réel s'impose au-delà de 1 250 €/mois de loyers, soit ~86 m² au loyer
  médian, ou deux studios ;
- coût net d'une année de gestion au réel, prélèvements sociaux de 17,2 %
  inclus : **482 €** (TMI 11 %), **355 €** (30 %), **281 €** (41 %).

**Le second chiffre qui recadre le débat.** Un mois de vacance coûte 905 €
quand une année entière de gestion déléguée en coûte 672 : **un mois de
vacance de trop = 1,3 année de gestion**. Formulé ainsi, l'arbitrage ne porte
plus sur le taux mais sur la vacance et les impayés. Aucune promesse de
performance n'est faite derrière — l'agence ne dispose d'aucune donnée de
vacance à publier, et l'inventer est exclu.

**Ce qui a été fait, précisément.**
- `app/gestion-locative/page.tsx` réécrit : **257 → 1 780 mots rendus**, six H2
  formulés en questions réelles, chacun répondant **dès la première phrase**
  (voir la veille du jour : 80 % des passages extraits par AI Mode ont la
  réponse en première phrase).
- Un tableau du **coût net après impôt par tranche marginale**, avec la formule
  et les références en légende.
- Une liste sourcée des **huit obligations du bailleur qui gère seul** (bail
  type et diagnostics, états des lieux, quittance et décompte de charges de
  l'article 21, révision IRL, décence énergétique, restitution du dépôt,
  assurance PNO).
- Le **risque chiffré** : retard de restitution du dépôt majoré de 10 % du
  loyer mensuel par mois entamé (article 22), soit **91 €/mois** ici.
- **FAQ de 6 Q/R** générée depuis le même tableau que le JSON-LD `FAQPage`
  (correspondance vérifiée sur le HTML servi : 0 écart).
  `Service` + `FAQPage` + `BreadcrumbList`, `updated` visible au 21/09.
- `llms.txt` réécrit pour cette page (entrée de 44 mots → 1 774 caractères),
  `lastmod` du sitemap porté au 21/09.

**Sources citées sur la page — rien d'inventé, tout vérifié ce matin.**
CGI art. 31 I-1°-a et BOFiP BOI-RFPI-BASE-20-10 (déductibilité au réel des
honoraires versés à un tiers) · BOI-RFPI-DECLA-10 (seuil de 15 000 €,
abattement de 30 %, option réel de 3 ans irrévocable) · loi n° 89-462 du
6 juillet 1989, art. 21 et 22 · loi Climat et Résilience n° 2021-1104
(calendrier de décence énergétique : G interdit depuis le 1ᵉʳ janvier 2025,
F en 2028, E en 2034) · loi n° 65-557, art. 9-1 (PNO) · taux de prélèvements
sociaux sur revenus fonciers à 17,2 % (confirmé pour 2026 : la hausse de CSG à
10,6 % ne vise pas les revenus fonciers). Tous les euros sont **dérivés** de
`lib/quartiers.ts` et du barème de `/honoraires`, jamais saisis à la main.

**Un problème que j'ai créé et refermé dans le même run.** L'article de blog
`gestion-locative-villeurbanne-deleguer-ou-non` (227 mots) portait **exactement
le titre** que je donnais à la page. Correction prise du côté du **contenu
neuf**, pas de l'existant : la page a été retitrée (« Déléguer sa gestion
locative ou gérer seul : le calcul à Villeurbanne »), l'article garde le sien,
et une phrase y a été ajoutée avec un lien contextuel vers la page, qui devient
la réponse détaillée. L'article n'a **pas** été redaté (`updated` reste au
16/09) : une phrase ajoutée n'est pas une mise à jour de fond, et redater à
vide est un signal de spam.

**Contrôles avant push.** `npm ci`, `tsc --noEmit` (0), `eslint` (0), `build`
(OK), puis relecture du HTML **servi**. Sept espaces perdues au rendu JSX ont
été trouvées et corrigées avec `{" "}` — dont **deux que le détecteur du 18/09
ne voit pas** (voir « Techniques apprises » du jour).

**Ce que j'ai décidé de NE PAS faire.**
- **Ne pas publier de comparaison de tarifs avec les plateformes nationales**
  (Oqoro à 4,9 % TTC, etc.), alors que la SERP du jour les expose. Recopier le
  prix affiché d'un concurrent sur une page commerciale, sans pouvoir vérifier
  ce qu'il recouvre ni le tenir à jour, c'est publier un chiffre qu'on ne
  maîtrise pas. La page compare au coût de la vacance, pas aux concurrents.
- **Ne pas chiffrer le temps passé à gérer soi-même.** C'est l'argument naturel
  de l'angle, et toutes les pages concurrentes avancent « X heures par an ».
  Personne ne l'a mesuré ici : la page liste les obligations et laisse le
  lecteur juger.
- **Ne pas toucher au gabarit `SeoLanding`** : il portait déjà `updated` et
  `afterSections`, tout est passé par ses props. Zéro risque sur les cinq
  autres pages qui l'utilisent.
- **Ne pas réécrire l'article de blog** : ce serait un second chantier, et la
  règle des petits lots vaut ici comme ailleurs.

### 2026-09-20 — Chaque page déclare enfin son propre aperçu : 37 pages récupèrent une `og:image`, 8 cessent de se présenter comme la home

**Ce qui a décidé du chantier.** Étape 2 du jour : les 53 URLs du sitemap
téléchargées et auditées une par une, sur des signaux jamais regardés jusqu'ici
(statut HTTP, balises d'aperçu, `alt` des images, cibles des liens internes).
Tout est sain sauf un bloc : **`og:image` n'était servi que sur 14 pages sur
51**, et la répartition était l'inverse de celle qu'on voudrait — les 4 pages
légales, `/contact`, `/equipe`, `/honoraires`, `/recrutement`, la home et les 6
annonces l'avaient ; **les 26 articles du blog, `/vendre`, `/acheter`,
`/estimation`, `/blog`, les 3 pages quartiers,
`/agence-immobiliere-villeurbanne`, `/faire-gerer` et `/gestion-locative` ne
l'avaient pas**.

**La cause, et pourquoi elle est passée dix runs sans être vue.** Dans l'App
Router, `metadata.openGraph` n'est **pas** fusionné en profondeur avec celui du
layout : dès qu'une page déclare son propre bloc, elle **remplace** celui du
parent — y compris l'image générée par `app/opengraph-image.tsx`, le `siteName`
et la `locale`. Les 14 pages qui avaient une image sont exactement celles qui
**ne déclaraient rien**. Et l'en-tête de `app/opengraph-image.tsx` affirme le
contraire (« s'applique à tout le site sauf si une page définit sa propre
opengraph-image ») : le code disait que c'était réglé.

**Le miroir du même défaut, plus gênant que l'image manquante.** Les 8 pages
qui n'avaient pas de bloc `openGraph` héritaient de celui de la home : elles
servaient donc `og:url = https://www.markusimmobilier.fr`, plus le titre et la
description de la page d'accueil. **`/honoraires` — le barème public complet,
la page la plus citable du site — se déclarait comme étant la home.** Le
`canonical`, lui, était correct partout : Google ne confondait pas les pages,
mais tout ce qui lit l'Open Graph (aperçus de partage, robots d'IA,
prévisualiseurs de liens) recevait une identité fausse. Enfin,
`twitter:title` et `twitter:description` étaient **deux chaînes génériques
identiques sur les 51 pages**.

**Ce qui a été fait.**
- **`lib/seo/share.ts`** (nouveau) : `shareMeta()` pour les pages ordinaires,
  `shareArticleMeta()` pour les articles. Le helper construit le bloc complet à
  partir du seul `path` canonique de la page — `og:url` absolue, titre et
  description propres, image 1200×630 du site (ou les photos de la page quand
  elle en a), `siteName`, `locale`, et un `twitter:*` qui correspond enfin à la
  page. L'en-tête du fichier explique la règle de non-fusion de l'App Router,
  pour que le prochain run n'ait pas à la redécouvrir.
- **22 pages câblées** : les 12 qui avaient un `openGraph` incomplet
  (`/acheter`, `/vendre`, `/estimation`, `/estimation-immobiliere-lyon`,
  `/estimation-immobiliere-villeurbanne`, `/gestion-locative`, `/faire-gerer`,
  `/blog`, `/agence-immobiliere-villeurbanne` et les 3 pages quartiers), les 8
  qui n'en avaient aucun (`/honoraires`, `/contact`, `/equipe`, `/recrutement`,
  `/annonces`, `/mentions-legales`, `/confidentialite`, `/cookies`), plus les
  deux routes dynamiques (`/blog/[slug]`, `/annonces/[id]`). Les fiches de
  biens réels **gardent leurs propres photos** en `og:image` : le helper les
  accepte en entrée.
- **`article:modified_time` sur les 26 articles**, alimenté par le champ
  `updated` de `lib/blog.ts` — celui-là même qui alimente déjà le
  `dateModified` du JSON-LD. Les articles n'exposaient que
  `article:published_time`, donc une date figée à la publication : les 9
  articles réécrits entre le 07 et le 16/09 affichaient toujours leur date
  d'origine dans le `<head>`. **La date de modification est désormais la vraie,
  jamais celle du build** — même principe que le `lastmod` du sitemap corrigé
  le 17/09.

**Contrôle qualité avant push.**
- `tsc --noEmit` : propre. `eslint app lib` : **18 problèmes avant, 18 après**
  (vérifié en stashant le diff) — le chantier n'en ajoute aucun.
- `next build` complet, puis **les 71 pages HTML générées relues une par une**
  par script : `og:url` **égale le `canonical`** sur toutes les pages
  indexables, `og:image` présente partout, `og:site_name` et `og:locale`
  présents partout, `article:modified_time` conforme au champ `updated` sur les
  26 articles. Seule `/_global-error` n'a pas de `<head>` — c'est une frontière
  d'erreur, pas une page.
- `/annonces` étant rendue à la demande, elle a été vérifiée en lançant le
  serveur de production en local (`next start`) et en lisant le HTML servi.
- `https://www.markusimmobilier.fr/opengraph-image` répond **200 / image/png /
  73 214 octets** : l'URL absolue posée dans le helper est servie.
- **Aucun changement de rendu** : le diff ne touche que des blocs `metadata`.
  Aucun composant, aucun texte visible, aucune donnée structurée modifiée.
  L'outil d'estimation n'est pas approché.

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**
- **Pas d'`og:image` personnalisée par page** (une image générée par article,
  avec son titre). C'est faisable avec `ImageResponse` et ce serait plus joli,
  mais ça ajoute 26 générations d'images au build pour un gain d'aperçu, pas de
  citation. Le défaut à corriger aujourd'hui était l'absence, pas l'uniformité.
- **Pas touché aux 10 fiches de démonstration ni à `/signin`, `/espace-client`,
  `/radar`, `/admin/*`** : elles héritent encore de l'aperçu de la home, mais
  elles sont toutes en `noindex` ou interdites par `robots.txt`. Les corriger
  serait du bruit dans le diff.
- **Pas d'`hreflang`** alors que `CLAUDE.md` mentionne une bascule FR/EN : **il
  n'existe aucune page en anglais**. Déclarer un `hreflang` vers des URL qui
  n'existent pas serait une erreur, pas une amélioration. Noté en
  « Hypothèses à vérifier ».
- **Pas de chantier de contenu aujourd'hui** : le run du 18/09 en était un, et
  celui du 19/09 n'a pas eu lieu — l'alternance s'applique quand même.

**Vérification en production, faite le jour même (2026-09-20, après déploiement
Vercel).** Les 53 URLs du sitemap re-téléchargées et relues une par une :

- **`og:image` : 53/53** (contre 14/51 avant le run).
- **`og:site_name` et `og:locale` : 53/53.**
- **`og:url` égale le `canonical` sur les 53 pages** — plus aucune page ne se
  déclare comme la home.
- **`article:modified_time` : 26/26 articles**, et il **correspond au
  `dateModified` du JSON-LD** (vérifié sur `cout-gestion-locative` 2026-09-16,
  `charges-copropriete` 2026-03-05, `estimation-en-ligne-ou-agence`
  2026-09-11).
- **`twitter:title` : 53 valeurs distinctes** là où le site en servait **une
  seule** pour toutes ses pages.
- **Le rendu n'a pas bougé** : les 23 articles téléchargés avant le push ont été
  recomptés après — **nombre de mots rendus identique au mot près sur les 23**.

Note d'outillage : deux téléchargements sur 53 ont échoué en transit (`/blog` et
`blog/gestion-locative-villeurbanne-deleguer-ou-non`, 0 octet) puis ont répondu
200 à la reprise. Ce n'est pas le site, c'est le proxy du conteneur — **un
audit de masse doit vérifier que chaque fichier est non vide avant de conclure**,
sinon il compte une page saine comme absente. Le même symptôme (`000`) s'était
produit plus tôt dans le run sur le PDF du barème, qui se télécharge
parfaitement à la seconde tentative.

### 2026-09-18 — `/faire-gerer` passe de 290 à 1 919 mots : ce que coûte vraiment la gestion d'un bien à Villeurbanne, et pourquoi un syndic n'affiche pas de prix

**Pourquoi cette page.** Elle était, depuis le 12/09, la page stratégique la
plus faible du site : **290 mots, 2 H2 décoratifs (« Une agence, deux métiers »,
« Demandez votre étude personnalisée »), aucun JSON-LD propre**, et un
formulaire syndic en bas. Mesuré en production avant d'agir, pas repris du
backlog. En face, deux SERP mesurées le même jour ne publient **aucun prix** :
neuf résultats sur « faire gérer son bien locatif Villeurbanne », neuf sur
« syndic de copropriété Villeurbanne tarif » — dont **zéro villeurbannais**.
L'agence, elle, a un barème public complet à un clic. C'est le quatrième run
d'affilée où le créneau prenable est le même : *personne ne répond avec un
chiffre*.

**Ce qui a été écrit** (`app/faire-gerer/page.tsx`), inséré **entre les deux
cartes et le formulaire**, sans toucher ni au hero, ni aux cartes, ni au
`SyndicForm` :

- **6 H2, tous formulés comme des questions posées à voix haute**, chacun
  ouvrant sur une réponse autonome de 2-3 phrases (règle GEO) :
  1. *Combien coûte la gestion locative d'un appartement à Villeurbanne ?*
  2. *Qu'est-ce que le taux de gestion couvre, et qu'est-ce qui reste facturé à part ?*
  3. *Comment comparer deux taux de gestion locative ?*
  4. *Faut-il prendre la garantie loyers impayés ?*
  5. *Combien coûte un syndic de copropriété, et pourquoi aucun tarif n'est affiché ?*
  6. *Quand une copropriété peut-elle remettre son syndic en concurrence ?*
- **Le chiffrage que personne ne publie**, sur un cas villeurbannais entièrement
  dérivé de données déjà sur le site : appartement de **62 m²** (surface médiane
  des ventes DVF 2025, `lib/quartiers.ts`) loué au **loyer médian communal de
  14,6 €/m² HC** (`LOYER_MEDIAN_HC`, carte des loyers data.gouv.fr), soit
  **905 €/mois**. D'où : **54 €/mois, 652 €/an** de gestion (6 % TTC),
  **672 €/an** frais et débours inclus, **717 €** avec envois postaux ;
  **GLI 272 €/an** (2,5 %), soit « environ 9 jours de loyer » ; **mise en
  location 977 €** (9 % du loyer annuel HC, part propriétaire) ; et le seuil où
  le **minimum de 25 € cesse d'être théorique : 417 € d'encaissements
  mensuels**, soit un logement de **moins de 29 m²**. Ce dernier point n'est
  publié nulle part ailleurs — c'est l'arithmétique du barème, que personne ne
  fait.
- **Une clé de comparaison HT/TTC**, rendue en liste numérotée de 3
  vérifications : un taux annoncé **8 % HT revient à 9,6 % TTC**, soit 60 % de
  plus qu'un **6 % TTC** — pour la même prestation. Plus l'assiette (loyers
  encaissés ou loyer théorique) et les frais fixes à additionner. C'est la
  réponse directe au « entre 6 et 8 % » des neuf résultats nationaux, sans citer
  ni dénigrer personne.
- **Le volet syndic, sans inventer de prix.** L'agence **n'a pas de tarif syndic
  public** : la page le dit et explique pourquoi — rémunération = **forfait
  annuel voté en AG**, **contrat type du décret n° 2015-342 du 26 mars 2015**,
  **liste limitative** des prestations facturables en plus (annexe 2), forfait
  chiffré après étude de l'immeuble. Et la question que tout copropriétaire
  pose : **article 21 de la loi du 10 juillet 1965** — mise en concurrence tous
  les trois ans par le conseil syndical, dispense possible à la majorité de
  l'article 25, non obligatoire s'il n'y a pas de conseil syndical. **Les deux
  textes ont été vérifiés sur Légifrance pendant le run**, pas cités de mémoire.
- **FAQ visible de 6 Q/R**, volontairement **disjointes** de celles de
  `/honoraires` et de `/agence-immobiliere-villeurbanne` (seuil du minimum de
  25 €, déductibilité au réel vs micro-foncier, honoraires de mise en location
  côté propriétaire, mandat de gestion ≠ contrat de syndic, frais hors forfait
  du syndic, délai de réponse).
- **4 liens contextuels sortants** posés là où la phrase les appelle :
  `/honoraires` ×2, `/gestion-locative`, et le renvoi au formulaire de la page.

**Données structurées — 4 blocs, tous adossés au visible** : `Service`,
`FAQPage` (généré depuis le **même tableau** que la FAQ affichée), `HowTo`
(généré depuis le **même tableau** que les 3 vérifications affichées) et
`BreadcrumbList`. Correspondance JSON-LD ↔ HTML rendu **vérifiée par script**
sur le serveur de production local : les 6 questions, les 6 réponses et les 3
étapes du `HowTo` se retrouvent **caractère pour caractère** dans le texte
visible.

**Anti-divergence.** Aucun euro n'est saisi à la main : tous sont calculés dans
le module depuis les taux du barème et les constantes de `lib/quartiers.ts`.
Changer le barème ou la médiane DVF change la page, la FAQ, le `HowTo`, la meta
description et le `Service` en même temps — ils ne peuvent pas se contredire.

**Deux compléments, parce qu'ils accompagnent le contenu** (et non parce que
« il manquait du balisage ») :
- `app/sitemap.ts` : `PAGE_LASTMOD["/faire-gerer"]` passe de `2026-06-24` à
  `2026-09-18` — la page a réellement changé, c'est le couplage manuel assumé
  depuis le 17/09 ;
- `app/llms.txt/route.ts` : la page **n'y figurait pas du tout**. Elle y entre
  avec ses chiffres et les deux références légales, sur le modèle de la ligne
  `/honoraires`.

**Vérifications avant push** : `tsc --noEmit` **0 erreur**, `npm run build`
**OK** (82 pages, aucune régression), `npm run lint` **0 problème sur les trois
fichiers touchés** (les 27 erreurs restantes sont préexistantes et vivent dans
`studio/` et `scripts/`), `/honoraires`, `/gestion-locative` et la home
toujours en **200**. Page rendue mesurée : **1 919 mots** (290 avant, même
méthode de comptage), **1 seul `<h1>`**, 4 JSON-LD propres.

**Vérifié EN PRODUCTION après déploiement** (`curl -sL` sur
`www.markusimmobilier.fr`, ~2 min après le push) : `/faire-gerer` sert bien
**1 919 mots** (290 avant), ses **4 JSON-LD propres** (`Service`, `FAQPage` avec
ses 6 `Question`, `HowTo` avec ses 3 `HowToStep`, `BreadcrumbList`), le
`lastmod` du sitemap est passé au **2026-09-18**, la ligne `/faire-gerer` est
bien dans `llms.txt`, et le contrôle de collage typographique ne trouve **aucun
cas** sur la page servie. Le chantier est en ligne, pas seulement commité.

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- **Ne pas inventer un tarif de syndic**, même « à partir de ». Le barème de
  l'agence n'en contient pas ; en publier un serait une affirmation sans source
  sur la page la plus engageante du créneau. La page explique le mécanisme à la
  place — et c'est précisément ce qui la distingue.
- **Ne pas toucher au `SyndicForm` ni à sa section** (consigne « il faut juste
  rien casser »). Le formulaire, son `id="formulaire"`, son fond gris et sa
  route API sont inchangés à la ligne près.
- **Ne pas changer le fond de la section formulaire** pour rétablir
  l'alternance blanc → gris → blanc : le formulaire est une **carte blanche à
  grosse ombre**, elle a besoin d'un fond gris pour se détacher. Le contenu a
  donc été posé en blanc, séparé des cartes par un filet `--bordure`, plutôt
  que de déplacer un risque visuel sur un composant qui marche.
- **Ne pas réécrire `/gestion-locative` dans la foulée** : sa section « Le
  coût » reste vague (« calculés sur les loyers réellement encaissés », « en
  partie déductibles ») alors que `/faire-gerer` chiffre désormais tout. C'est
  un vrai trou, mais c'est un **deuxième chantier de contenu** — il part en
  backlog, pas dans ce run.
- **Ne pas poser de liens entrants supplémentaires** vers `/faire-gerer` : elle
  en reçoit déjà quatre contextuels (`/honoraires`,
  `/agence-immobiliere-villeurbanne`, `/agence-immobiliere-charpennes`,
  `/gestion-locative`) plus le hero de la home. En rajouter aujourd'hui serait
  de la sur-optimisation, pas du maillage.

### 2026-09-17 — Le sitemap cesse de déclarer de la fiction, et cesse de mentir sur les dates

**Angle du jour : technique.** C'est l'angle que le backlog du 16/09 imposait
(« le prochain run ne doit reprendre ni maillage ni contenu de page »). Angles
récents : maillage (16/09), contenu de page de fond (15/09 ×2), données
structurées (13/09), page « argent » (12/09), contenu blog (11/09).

**Pourquoi ce chantier plutôt qu'un autre.** Il n'était dans aucun backlog : il
sort entièrement de l'étape 2. En listant — pour la première fois — les 63 URLs
du sitemap au lieu de les compter, deux défauts sont apparus, tous deux dans le
même fichier (`app/sitemap.ts`) et tous deux portant sur **ce que le site
raconte à Google de lui-même** :

1. **10 des 63 URLs soumises étaient des biens inventés.** Un bloc
   `propertyPages` poussait dans le sitemap les 10 placeholders de
   `lib/mock-properties.ts` — « Loft d'exception sur Bellecour, 1 250 000 € »,
   « Villa familiale 6 pièces piscine, Écully », « T4 d'exception, Lyon 6e
   Foch »… Sur `/annonces`, ces cartes sont honnêtement présentées (encart
   « ils ne sont pas encore disponibles », badge « À venir », aucun lien). Mais
   **les pages de détail, elles, ne portent aucun avertissement** : elles
   affichent « À vendre — 1 250 000 € », une galerie, des « points forts » et
   le vrai téléphone de l'agence. Et c'est **exactement** cette surface que le
   sitemap soumettait, à `priority` 0.6, sans même un `canonical`. Un visiteur
   venu de Google y aurait lu une annonce ; le client a explicitement interdit
   les fausses annonces.
2. **Le `lastmod` était faux sur 31 URLs sur 63** : les pages statiques étaient
   horodatées `new Date()`, donc à l'heure du build. Ce site étant redéployé
   presque chaque jour, le sitemap annonçait quotidiennement « 21 pages
   modifiées aujourd'hui ». Google ignore un `lastmod` qu'il juge non fiable —
   **et il l'ignore pour tout le fichier**, y compris pour les 26 articles et
   les annonces, dont les dates étaient justes. Le seul signal de fraîcheur que
   le site contrôle s'annulait lui-même.

**Ce qui a été fait — 3 fichiers, aucune modification visible du site.**

| Fichier | Changement | Effet |
|---|---|---|
| `app/sitemap.ts` | suppression du bloc `propertyPages` (import de `PROPERTIES` retiré) | **63 → 53 URLs** en production (51 au build local, qui n'a pas accès aux 2 annonces Supabase). Plus une seule URL fictive soumise. |
| `app/sitemap.ts` | table `PAGE_LASTMOD` (21 pages) + `STATIC_PAGES` | chaque page statique porte **sa vraie date de dernier changement de contenu**, reprise du dernier commit l'ayant touchée. Plus de valeur commune : **30 dates distinctes** au lieu de 31 URLs partageant l'heure du build. |
| `app/sitemap.ts` | `LISTING_DRIVEN` = `{ "/", "/annonces" }` | ces deux pages affichent le catalogue : leur `lastmod` est la plus récente des deux dates (page / dernière annonce publiée). Automatique, donc sans dérive. |
| `app/annonces/[id]/page.tsx` | `robots: { index: false, follow: true }` **dans la seule branche « bien de démo »** | les 10 fiches fictives sortent de l'index si Google en a crawlé. Les vraies annonces sortent de la fonction **avant** cette branche : leur metadata, leur `canonical` et leur `RealEstateListing` sont **strictement inchangés** (vérifié dans le HTML construit). |
| `app/annonces/page.tsx` | `data-nosnippet` sur la `<section>` des placeholders | Google et les réponses génératives ne peuvent plus citer « Loft d'exception sur Bellecour — 1 250 000 € » comme une annonce de l'agence. **Zéro changement visuel**, zéro effet sur l'indexation de la page, et les 6 biens réels sont **au-dessus**, hors du bloc (vérifié par position dans le DOM rendu). |

**Le volet GEO du jour est celui-là.** Aucun contenu nouveau n'a été écrit —
c'est un run technique — mais la règle « ne jamais publier de fausse donnée »
vaut autant pour ce qu'une IA peut citer que pour ce qu'un lecteur peut lire.
Un moteur de réponse interrogé sur le catalogue de l'agence pouvait jusqu'à
aujourd'hui reprendre une fiche inventée : `data-nosnippet` + `noindex` ferment
les deux portes. `llms.txt`, lui, était déjà propre (il est généré depuis les
vraies annonces) — **vérifié, pas supposé**.

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**

- **Ne pas supprimer `lib/mock-properties.ts` ni les 10 pages.** Elles
  alimentent la grille et les filtres de `/annonces` (encart d'avertissement
  compris) et la grille de la home quand le catalogue tombe sous 3 biens. Les
  retirer, c'est toucher au **rendu** d'une page qui fonctionne et que le
  client a validée — la consigne est de ne pas le faire. `noindex` +
  `data-nosnippet` + sortie du sitemap règlent tout le volet SEO/GEO **sans
  rien changer à l'écran**.
- **Ne pas ajouter d'avertissement sur les 10 fiches de détail.** Ce serait la
  bonne correction éditoriale (elles sont la seule surface où la fiction n'est
  pas signalée), mais c'est une modification de rendu. → **à soumettre au
  client**, noté en « Hypothèses à vérifier ».
- **Ne pas déclencher le protocole « blocage technique d'indexation ».** Le
  test profond est négatif pour la 4ᵉ fois (J+4) ; l'échéance posée le 13/09
  est le **~27/09**. Rien à conclure avant.
- **Ne pas traiter `/faire-gerer`** alors que sa SERP mesurée aujourd'hui est
  ouverte (aucun des 9 résultats ne publie de tarif) : c'est un chantier de
  **contenu**, et le run du jour devait être technique. Il part en tête du
  backlog.
- **Ne pas dériver le `lastmod` de `git log` au build.** Ce serait sans
  entretien, mais Vercel clone en profondeur limitée : un `git log` y est peu
  fiable et un build qui casse coûte plus cher que la table. La table a par
  ailleurs le bon sens de panne — **l'oublier sous-déclare une modification
  (bénin) ; c'est la sur-déclarer qui nuit**, et c'est ce qu'on vient de
  supprimer.

**Contrôles avant push** : `npx tsc --noEmit` propre ; `eslint` sans aucune
remontée sur les 3 fichiers touchés ; `npm run build` = **82 pages**, identique
à hier (aucune page créée ni supprimée). Vérifié **dans le HTML construit et
sur un serveur de production local** (`next start`), pas dans le code :
`sitemap.xml` servi = 51 URLs, **0 URL fictive**, 30 `lastmod` distincts ;
`/annonces/lyon-2-bellecour-loft` sert `<meta name="robots" content="noindex,
follow">` ; `/annonces/studio-a-vendre-villeurbanne-tolstoi` (bien réel) ne
sert **aucun** `meta robots` et garde son `canonical` ; sur `/annonces`, la
balise `data-nosnippet` s'ouvre **après** le dernier bien réel du DOM
(position 29 214 contre 24 055) et avant le footer.

**Vérifié EN PRODUCTION après déploiement** (≈ 50 s, deux essais) :
`sitemap.xml` servi = **53 URLs, aucune fiction**, **29 `lastmod` distincts**
(contre 31 URLs partageant l'heure du build ce matin) ;
`/annonces/lyon-2-bellecour-loft` sert `noindex, follow` ;
`/annonces/studio-a-vendre-villeurbanne-tolstoi` sert son `canonical` et
**aucun** `meta robots` ; `/annonces` sert `data-nosnippet` avec les 6 biens
réels **avant** l'ouverture de la section (39 237 dans le DOM, footer à
100 296) ; `llms.txt` toujours sans aucune fiche fictive ; `/`, `/honoraires`,
`/estimation`, `/annonces`, `/equipe`, `/faire-gerer`,
`/agence-immobiliere-gratte-ciel` et un article de blog répondent **200**.

> ⚠️ **Piège de vérification à retenir** : au **premier** essai, `/annonces`
> ne servait pas encore `data-nosnippet` alors que le sitemap, lui, était déjà
> à jour — puis la balise est apparue. `/annonces` est une route **dynamique**
> (elle lit les `searchParams` des filtres), elle n'est donc pas pré-rendue et
> se propage indépendamment des pages statiques. → **Ne pas conclure à un échec
> de déploiement sur un premier contrôle ; re-tester avec un cache-buster.**
> Et, corollaire du 15/09 : cette page ne peut pas se vérifier dans
> `.next/server/app/*.html` — il faut un `next start` local ou la production.

---

### 2026-09-16 — Le blog cesse d'être une impasse : 9 articles s'ouvrent vers les pages stratégiques, et les articles « combien ça coûte » citent enfin le barème réel

**Pourquoi ce chantier.** Trois raisons convergentes, toutes mesurées le matin
même, aucune reprise d'une note ancienne :

1. **L'angle était le bon au calendrier.** Les deux runs du 15/09 étaient du
   « contenu de page » ; le backlog interdisait explicitement de le reprendre.
   Le maillage interne (backlog n°5) était désigné prioritaire depuis la veille
   du 15/09, sur une base sérieuse : l'étude Seer trouve que les **liens
   internes corrèlent positivement** avec la citation en AI Overview, là où le
   schema FAQ ne corrèle pas.
2. **La mesure a confirmé le trou, et l'a déplacé.** 6 articles sur 26
   émettaient un lien. Mais le vrai manque n'était pas « 20 articles muets » :
   c'était que **`/honoraires` et les 3 pages quartiers ne recevaient aucun
   lien contextuel du blog**, alors que les pages quartiers n'ont **pas non
   plus** de lien de gabarit (elles ne sont pas dans le footer). Ce sont les
   pages stratégiques les moins maillées du site.
3. **Le défaut était aussi éditorial.** `cout-gestion-locative` s'intitule
   « combien ça coûte vraiment ? » et répondait « en général 6 à 8 % TTC ».
   `vendre-sans-agence` chiffrait la commission à « souvent 4 à 6 % du prix ».
   Pendant ce temps `/honoraires` publie le barème exact. **Un passage qui
   répond « ça dépend » n'est jamais cité par un LLM** — et il ne mérite pas
   non plus d'être lu.

**Ce qui a été fait.** 9 articles touchés, **14 liens contextuels posés**
(13 → 27 liens dans le blog, 6 → 14 articles émetteurs), **chaque ancre
différente**, et aucun lien posé là où la phrase ne l'appelait pas :

| Article | Lien(s) posé(s) | Ce qui a changé dans le texte |
|---|---|---|
| `ou-acheter-villeurbanne-quartiers` | → les **3 pages quartiers** | 1 phrase de fin : ce que contient chaque page (prix au m², surface par budget, coût d'une vente). **Premiers liens du blog vers ces pages.** |
| `cout-gestion-locative` | → `/honoraires` | La fourchette « 6 à 8 % » est suivie du **taux réel : 6 % des encaissements, min. 25 €/lot**. Nouveau paragraphe sur les **frais fixes** (20 €/an de débours, 45 €/lot/an si courrier postal) — *ce que personne d'autre ne publie*. GLI chiffrée à **2,5 %**. |
| `gestion-locative-villeurbanne-deleguer-ou-non` | → `/honoraires` | Même correction, ancre et formulation différentes. |
| `vendre-sans-agence` | → `/blog/prix-immobilier…`, `/honoraires` | « 4 à 6 % » devient le barème réel (**9 000 € forfaitaires**, puis **6 %**, puis 5 %) + l'ordre de grandeur sur le prix médian villeurbannais : **≈ 11 700 € sur 195 000 €**. C'est la somme exacte que « vendre seul » économise. |
| `mandat-simple-ou-exclusif` | → `/honoraires` | Fait vérifiable ajouté : le barème **ne distingue pas** mandat simple et exclusif. |
| `frais-de-notaire-lyon-2026` | → `/blog/prix-immobilier…`, `/honoraires` | Nouveau H2 **« Les frais de notaire incluent-ils les honoraires d'agence ? »** (question réellement posée), réponse « non » en tête. Exemple villeurbannais ajouté : **13 500 à 15 600 €** sur 195 000 €. |
| `capacite-emprunt-immobilier` | → `/blog/ou-acheter…` | Nouveau H2 **« Combien de m² votre capacité d'emprunt achète-t-elle à Villeurbanne ? »**, réponse en tête : **250 000 € = 65 m² à Gratte-Ciel, 91 m² à Cyprian – Les Brosses**. |
| `vendre-vite-lyon` | → `/estimation-immobiliere-villeurbanne` | Pointeur seul, pas de nouveau chiffre. |
| `rentabilite-locative-lyon` | → `/blog/prix-immobilier…`, `/honoraires` | Point de méthode : au dénominateur, prix **payés** et non affichés. |

**`llms.txt`** : les 3 lignes des pages quartiers dataient d'avant leur
réécriture du 15/09 (« immobilier dans le quartier X à Villeurbanne »). Elles
portent désormais la médiane du quartier, son volume de ventes et son angle
propre. **C'est la seule dérive réelle trouvée dans ce fichier** — le reste est
généré.

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**

- **Ne pas poser de lien dans les 11 autres articles muets.** La règle du 10/09
  (« par petits lots, jamais 40 liens d'un coup sur des ancres proches ») tient :
  27 liens sur 26 articles est déjà un maillage normal, 40 serait un motif de
  sur-optimisation. Il reste 12 articles sans lien, c'est volontaire.
- **Ne pas réécrire `rentabilite-locative-lyon` ni `investir-locatif-lyon`.**
  Ils sont au backlog (n°2) avec un angle précis — l'écart entre prix affichés
  par les sites d'investissement et prix réellement payés. Y toucher
  aujourd'hui aurait consommé cet angle pour un simple lien. Un lien posé, la
  réécriture reste entière.
- **Ne pas ajouter de `FAQPage` aux articles touchés.** La veille du 15/09 dit
  que ce schema ne corrèle pas avec la citation ; le backlog interdit d'ouvrir
  un chantier dont la justification est « ajouter du schema ».
- **Ne pas toucher au barème lui-même** (part locataire non réindexée sur les
  plafonds 2026) : décision commerciale du client, voir « Hypothèses ».
- **Ne pas bumper `updated` sur les 3 articles où je n'ai posé qu'un pointeur**
  (`vendre-vite-lyon`, `rentabilite-locative-lyon`,
  `ou-acheter-villeurbanne-quartiers`). La routine demande d'actualiser la date
  **seulement quand le contenu change vraiment** ; ajouter un lien n'est pas une
  mise à jour. Les 6 articles qui reçoivent un chiffre neuf passent à
  `updated: 2026-09-16` — et leur `dateModified` JSON-LD suit automatiquement.

**Contrôles avant push :** `tsc --noEmit` propre ; `npm run lint` = 38 problèmes,
**tous préexistants et aucun dans les fichiers touchés** (vérifié fichier par
fichier) ; `npm run build` = 82 pages, compilation OK ; **texte rendu relu dans
le HTML construit** pour les 9 articles — les 14 liens sont présents avec le bon
`href`, et aucune phrase n'est collée (le piège `</strong>`+espace du 11-12/09 ne
s'applique pas ici : ces textes sont des chaînes dans `lib/blog.ts`, pas du JSX).
Chaque chiffre publié a été relu **dans `app/honoraires/page.tsx` et
`lib/quartiers.ts`**, pas dans ce journal.

---

### 2026-09-15 (run n°2, session interactive) — Les trois pages quartiers deviennent des pages de recherche : prix DVF, budgets chiffrés, FAQ, et le maillage `/estimation` → quartiers enfin posé

**Pourquoi ce chantier, et pourquoi maintenant.** C'est le dernier trou béant
identifié par l'audit live du 07/09 et jamais comblé depuis : les trois pages
quartiers faisaient **350 à 650 mots, aucun prix, aucune FAQ**, alors que les
résultats qui tiennent ces SERP (Human Immobilier sur Gratte-Ciel, Nestenn,
Laforêt, Hosman, imkiz) publient 2 500 à 8 000 mots avec données de marché.
Ce sont des pages de marque, pas des pages de recherche — et elles ne sortent
sur aucune des requêtes visées.

Le second motif est le maillage, que la veille du 15/09 désigne comme le levier
le mieux corrélé à la citation : **`/estimation` n'émettait aucun lien vers les
pages quartiers**, alors que les trois pages quartiers pointaient déjà vers
elle. Le sens retour manquait, sur la page commerciale n°1 du site.

**Ce qui a été fait.**

1. **`lib/quartiers.ts` — source de vérité unique** des chiffres DVF par
   quartier (les 7 médianes publiables, la médiane communale, les typologies, le
   loyer médian communal), plus les helpers de formatage et de calcul
   (`ecartCommune`, `surfacePourBudget`, `honorairesVente`). Conséquence
   directe : **aucune page n'écrit plus un chiffre en dur**, donc deux pages ne
   peuvent plus diverger, et la mise à jour DVF 2026 se fera en un seul endroit.
   Les valeurs sont exactement celles publiées le 07/09, pas un recalcul.

2. **`components/seo/quartier-prix.tsx`** — tableau des 7 quartiers + ligne
   commune, la ligne du quartier courant surlignée, scroll dans le cadre (jamais
   de scroll de page), source et limites en `figcaption` (dont le non-publié
   Saint-Jean et son motif).

3. **Les trois pages quartiers réécrites** — H2 formulés en questions
   réellement posées, réponse autonome en tête de chaque section, `updated`
   visible, FAQ de 5 Q/R **générée depuis le même tableau que le JSON-LD
   `FAQPage`** (impossible de désynchroniser). Un angle propre par page, aucun
   contenu recopié d'une page à l'autre :
   - **Gratte-Ciel** → l'angle est le **volume** : 655 ventes sur 1 875, soit
     ~35 % du marché villeurbannais dans un seul quartier. Un marché liquide se
     paie en semaines de visites quand le prix est faux. Et une réponse honnête
     sur l'extension du centre-ville : **aucune accélération mesurable** dans les
     prix de vente (+1,2 % quartier contre +1,5 % commune), donc on le dit au
     lieu de le supposer.
   - **Charpennes** → l'angle est **l'écart annonces / ventes réelles**, le seul
     angle libre trouvé le 12/09 : un site d'investissement affichait
     5 120 €/m² contre 3 524 €/m² en DVF, soit **+45 %**, ≈ 112 000 € d'écart de
     budget sur un T3 de 70 m². Plus le rendement locatif **calculé** (T2 40 m²
     → ~5,0 % brut) avec ses deux limites écrites noir sur blanc : loyer de
     référence **communal** (il n'existe pas de loyer par quartier) et rendement
     brut. C'est exactement ce que les concurrents affirment sans le sourcer.
   - **Cusset** → l'angle est la **surface par euro** : seul quartier métro A
     moins cher que la médiane communale de plus de 10 %, 14 m² de plus qu'à
     Gratte-Ciel pour 250 000 €. Et le constat de résistance : −5,8 % depuis
     2022, deuxième meilleur de la commune après Ferrandière.

4. **Maillage posé dans les deux sens.** Nouvelle section statique sur
   `/estimation` (« Sur quoi repose l'estimation ? ») avec le tableau des
   quartiers et **6 liens sortants** : les 3 quartiers, la page Villeurbanne,
   l'article prix au m², et `/estimation-immobiliere-lyon`. Chaque page quartier
   émet de son côté vers `/estimation`, `/honoraires`, l'article prix,
   `/agence-immobiliere-villeurbanne` et **ses deux quartiers voisins** (maillage
   latéral). Règle du 10/09 respectée : un lien seulement là où la phrase
   l'appelait déjà.

5. **Correction factuelle.** La page Cusset annonçait « métro A **et
   tramway** ». Il n'y a **pas de tramway** à Cusset ni à Laurent Bonnevay : la
   desserte est le métro A (stations Cusset et Flachet, terminus Laurent
   Bonnevay – Astroballe) et les bus. Vérifié avant publication, commentaire
   posé dans le fichier pour ne pas le réintroduire. La page Charpennes annonçait
   « métro A et B, tramway » sans préciser : les lignes **T1 et T4** sont
   nommées, vérifiées.

**Contrôle qualité fait.** `npx tsc --noEmit` clean, `eslint` sans aucune
remontée sur les 6 fichiers touchés, `npm run build` OK. HTML pré-rendu
inspecté page par page :

| Page | Mots rendus (avant → après) | FAQPage | `<summary>` visibles | Tableau |
|---|---|---|---|---|
| `/agence-immobiliere-gratte-ciel` | ~375 → **1 380** | 5 Q | 5 | 1 |
| `/agence-immobiliere-charpennes` | ~600 → **1 443** | 5 Q | 5 | 1 |
| `/agence-immobiliere-cusset` | ~375 → **1 295** | 5 Q | 5 | 1 |
| `/estimation` | ~250 → **581** | — | — | 1 |

Et surtout : **`FAQPage.mainEntity[].name` comparé un à un aux `<summary>`
rendus sur les trois pages — identiques, zéro mismatch.** Les valeurs calculées
ont été relues dans le HTML servi (3 846 €/m², 65 m² pour 250 000 €, 14 300 €
d'honoraires, +7,8 % ; 5 120 €/m² et +45 % à Charpennes ; 79 m² et 14 m² de gain
à Cusset).

> ⚠️ **L'outil d'estimation n'a pas été touché.** La consigne client est « il
> faut juste rien casser » : la nouvelle section vit **en dehors** de
> `<EstimationForm />`, elle est purement statique, et le bloc résultat
> (`components/property/estimation-result.tsx`) n'a pas été ouvert. Le chantier
> n°6 des « Chantiers en attente » (fourchette de dispersion dans le résultat)
> reste donc entier et toujours à soumettre au client.

**Limite de la vérification.** `npm run build` a été validé avec un stub local
de `next/font/google` (le proxy de la session bloque `fonts.googleapis.com`) —
ce stub n'est **pas** commité, `app/layout.tsx` est inchangé. Le rendu des pages
et tout le HTML inspecté ci-dessus sont donc réels ; seule la police était
remplacée pendant la vérification. À confirmer en production après déploiement
Vercel.

**À faire au prochain run** : vérifier en prod que les trois pages servent bien
leur `FAQPage` et leur tableau, puis **reprendre le chantier n°5** (maillage des
20 articles de blog non touchés) — c'est le seul angle « maillage » qui reste, et
le run du 15/09 n°2 vient de servir l'angle « contenu de page de fond » pour la
deuxième fois de la journée. **Ne pas réécrire de page quartier avant une mesure
de position.**

---

### 2026-09-15 — `/honoraires` répond enfin en toutes lettres : 6 questions, le droit cité et daté, le cas villeurbannais chiffré

**Angle du jour** : *contenu sur une page de fond*. Angles récents : données
structurées (13/09), page « argent » (12/09), contenu blog (11/09). Le run du
14/09 n'a pas eu lieu. Ce chantier **complète** celui du 13/09 (qui avait balisé
le barème sans écrire une ligne) au lieu de le répéter : c'est le backlog n°7,
ouvert ce jour-là précisément pour ça.

**Pourquoi cette page, décidé par deux mesures et pas par le backlog seul :**

1. `/honoraires` **ne contient aucune prose**. Hors titres de section et
   libellés de tableaux, la page n'a **pas une seule phrase**. C'est le contenu
   le plus citable du site — un barème public de 27 lignes tarifées — et il ne
   répond à **aucune question en toutes lettres**. Un moteur de réponse ne peut
   pas citer un tableau comme réponse à « qui paie les honoraires ».
2. La SERP « qui paie les honoraires d'agence immobilière vente Villeurbanne »,
   mesurée pour la première fois, est **100 % nationale et générique** : neuf
   résultats (Foncia, PAP, Crédit Agricole, coachs…) dont la réponse commune
   est « ça dépend du mandat, comptez 3 à 8 % ». **Aucun barème réel, aucune
   référence légale datée, aucun ancrage local.**

#### Ce qui a été publié : 6 questions, aucune redondante

La page reçoit une section FAQ (eyebrow + `<h2>`, la page passe de 4 à 5 `<h2>`),
un chapeau de réponse autonome, 6 Q/R visibles et un `FAQPage` généré depuis le
même tableau.

**Le point de méthode du jour — la FAQ a été écrite _en soustrayant_ celle qui
existe déjà.** `/agence-immobiliere-villeurbanne` porte depuis le 12/09 une FAQ
de 6 Q/R qui traite déjà « combien coûte une agence pour vendre », « honoraires
de gestion locative » et « faut-il payer pour faire estimer ». C'étaient mes
trois premières idées. Les reprendre aurait servi **deux `FAQPage` concurrentes
sur les mêmes questions**, à deux URLs du même site — le contraire de l'effet
recherché. Les six retenues sont donc **disjointes par construction**, et un
commentaire dans le code le dit pour que le prochain run ne défasse pas ce choix.

| Question | Ce qu'elle apporte, et que la SERP n'a pas |
|---|---|
| Qui paie les honoraires d'agence lors d'une vente ? | le barème dit « charge vendeur », **et** la précision que la loi ne l'impose pas : c'est le mandat qui désigne le redevable |
| Les honoraires sont-ils dus si la vente ne se fait pas ? | **non**, article 6 de la loi Hoguet (loi n° 70-9 du 2 janvier 1970) ; règlement chez le notaire à l'acte authentique (décret n° 72-678 du 20 juillet 1972, art. 73) |
| Les honoraires sont-ils compris dans le prix affiché ? | oui (charge vendeur), **et** la distinction d'avec les frais de notaire, qui ne reviennent pas à l'agence |
| Combien un locataire paie-t-il à l'agence **à Villeurbanne** ? | **la réponse la plus exclusive de la page** — voir ci-dessous |
| Quels frais s'ajoutent aux 6 % de la gestion locative ? | les 5 lignes de gestion occasionnelle, chiffrées ; personne ne publie ça |
| Pourquoi une agence doit-elle afficher son barème, TTC ? | arrêté du 10 janvier 2017, modifié le 26 janvier 2022 (« prix maximum pratiqués ») |

#### La réponse que personne d'autre ne peut donner

**Villeurbanne est classée en zone tendue** — donc la part locataire du barème
(10 €/m² + 3 €/m² d'état des lieux) s'applique, soit **585 € TTC pour un T2 de
45 m²**. Un montant en euros, pour un logement type, dans une commune nommée :
c'est le format exact qu'un moteur de réponse peut reprendre tel quel.

Et la réponse va plus loin que le barème : ces montants sont **inférieurs aux
plafonds légaux applicables depuis le 1ᵉʳ janvier 2026** — 10,09 €/m² en zone
tendue et 3,03 €/m² pour l'état des lieux, fixés par les **arrêtés des 17 juillet
et 20 novembre 2025**, qui indexent désormais ces plafonds sur l'IRL après onze
ans de gel. **Aucun des neuf résultats de la SERP ne mentionne cette
revalorisation.**

#### Vérification des faits juridiques — le vrai travail du jour

Rien de tout cela n'a été écrit de mémoire. Chaque texte cité a été vérifié, et
**une source s'est révélée périmée en cours de route** : `juridiquimmo` annonce
encore que « les nouveaux montants ne sont pas fixés », parce que l'article est
antérieur à l'arrêté du 20 novembre 2025. Les montants n'ont été publiés
qu'après recoupement de **deux sources professionnelles concordantes au
centime** (Journal de l'Agence, citant l'arrêté du 20/11/2025 ; CLCV). La
classification de Villeurbanne en zone tendue a été vérifiée séparément.
→ **Règle appliquée : sur un chiffre de droit, une source récente ne suffit
pas ; il faut deux sources concordantes et la date du texte.**

#### La date visible, sans attestation mensongère

Le 13/09 avait refusé toute date sur cette page, faute de connaître la date
d'entrée en vigueur du barème — et ce refus reste juste. La routine demande
pourtant une date visible sur les pages de fond. **Solution retenue :
« Références légales vérifiées le 15 septembre 2026 », suivie de « Cette date ne
préjuge pas de la date d'entrée en vigueur du barème lui-même ».** La date ne
couvre que ce qui est vérifiable — les textes cités. Le blocage du 13/09 est
donc **contourné honnêtement, pas levé** : la question au client reste ouverte.

#### Maillage

3 liens sortants contextuels posés dans le chapeau, **chacun appelé par la
phrase** (règle du 10/09) : `/estimation`, `/agence-immobiliere-villeurbanne`
(qui rapporte le barème au prix médian communal) et `/faire-gerer`. La veille du
jour valide ce réflexe : le maillage interne est l'un des rares signaux qui
corrèlent *positivement* avec la citation en AI Overview.

#### `llms.txt`

La ligne `/honoraires` ne portait que les chiffres du barème. Elle porte
désormais **les réponses** : qui paie, quand c'est dû (loi Hoguet), les 585 €
du T2 villeurbannais et les plafonds 2026, les frais occasionnels, l'obligation
d'affichage. C'est ce qu'un LLM lit quand il cherche à répondre, pas un tableau.

#### Contrôle qualité

`npm ci` · `tsc --noEmit` **0 erreur** · `eslint` **0 erreur** sur les 2 fichiers
touchés · `npm run build` OK (**82 pages**, inchangé).

**Innocuité prouvée, pas supposée.** Le diff est **purement additif** : sur les
113 lignes ajoutées, les **seules** suppressions sont la ligne d'`import`
(réécrite en multi-lignes) et la ligne `llms.txt` (étendue). **Aucune ligne de
rendu existante n'a été modifiée** — les quatre tableaux du barème sont
intacts, ce qui est vérifié côté balisage : l'`OfferCatalog` sert toujours
**5 sections et 27 offres**. Pas de double build cette fois : aucun gabarit
partagé n'est touché, contrairement au 13/09.

**Correspondance JSON-LD ↔ visible, vérifiée par script sur le HTML pré-rendu** —
et pas seulement comptée : les **6 questions ET les 6 réponses** du `FAQPage`
sont cherchées *mot pour mot* dans le texte visible de la page (scripts et
styles retirés, entités HTML décodées, espaces normalisés) → **12 sur 12
présentes, 0 écart**. Servi : `RealEstateAgent`, `OfferCatalog`, `FAQPage`,
`BreadcrumbList` · **6 `<summary>` visibles pour 6 `Question`** · **1 `<h1>`**,
5 `<h2>`. **Contrôle anti-collage** (le piège JSX des 11 et 12/09, où un espace
en fin de ligne après `</strong>` est avalé au build) passé par regex sur tout
le texte rendu : **aucun motif suspect**. Les réponses étant des chaînes d'un
tableau TS et non du JSX, elles y échappent par construction — seul le chapeau
était exposé, et ses `{" "}` sont explicites.

**Décidé de NE PAS faire, et pourquoi :**

- **Citer le prix médian villeurbannais (195 000 €) pour chiffrer les
  honoraires de vente.** C'était tentant et plus local. Mais
  `/agence-immobiliere-villeurbanne` porte déjà ce calcul (≈ 11 700 € TTC), et
  le journal signale depuis le 12/09 que ce chiffre **dépend de la tranche du
  barème** : le dupliquer aurait créé une **6ᵉ page couplée aux médianes DVF**,
  à refaire au prochain recalcul. La question « combien coûte une agence pour
  vendre » est d'ailleurs déjà traitée là-bas. → aucun couplage DVF ajouté
  aujourd'hui, la liste des 5 pages dérivées reste close.
- **Corriger la part locataire du barème (8/10/12 €/m²) pour l'aligner sur les
  plafonds 2026.** C'est la découverte du jour, et elle est tentante à
  « corriger ». **Il ne faut surtout pas** : le barème est **légal tel quel**
  (il est *sous* le plafond), et le montant facturé par une agence est une
  **décision commerciale du client**, jamais d'un run. → remonté en
  « Hypothèses à vérifier ».
- **Ajouter une question sur la négociabilité des honoraires.** C'est l'une des
  questions les plus posées, et elle aurait bien marché. Mais y répondre
  suppose de connaître la politique commerciale de l'agence : toute réponse
  aurait été une invention sur le client.
- **Retirer ou alléger le `FAQPage`** à la lumière de la veille du jour (le
  schema FAQ ne corrèle pas avec la citation). Raisonnement et refus détaillés
  en « Techniques apprises » : la valeur est dans la **FAQ visible**, le
  balisage est gratuit, sans risque de mismatch ici, et l'étude ne montre pas
  de pénalité. On cesse d'en attendre un gain, on ne le démonte pas.

### 2026-09-13 — Données structurées : une seule agence, un barème balisé, deux conseillers nommés, 26 articles listés

**Angle du jour** : *données structurées*. C'est l'angle que le journal du 12/09
désignait explicitement (« jamais servi depuis le début du journal, et il est
petit »), après une page « argent » le 12/09 et du contenu blog le 11/09.
**Aucun contenu visible n'a été écrit ni modifié aujourd'hui** — et c'est
prouvé, pas affirmé (voir « Contrôle qualité »).

**Pourquoi ces pages-là, décidé par la mesure `curl`** (et non par `WebFetch`,
qui s'est révélé inutilisable pour ça — voir « État des lieux ») :

| Page | Ce qu'elle servait ce matin |
|---|---|
| `/honoraires` | **aucun JSON-LD**, alors que c'est un barème public de 25 lignes tarifées — le contenu le plus citable du site |
| `/equipe` | **aucun JSON-LD**, alors que 2 conseillers y sont nommés avec e-mail et téléphone directs |
| `/blog` | `BreadcrumbList` seul — **ni `Blog` ni `ItemList`** pour ses 26 articles |
| toutes | le `RealEstateAgent` **sans `@id`** → une agence différente déclarée à chaque page |

#### 1. Le défaut de fond, qui n'était dans aucun backlog : l'agence sans identité

Le site décrivait l'agence **au moins deux fois par page** sans jamais dire que
c'était la même : le `RealEstateAgent` complet du layout (adresse, `geo`,
horaires, `sameAs`) d'un côté, et le `PROVIDER` abrégé des `Service` de l'autre.
Pour un moteur, ce sont **deux entités jumelles et concurrentes**, chacune
moitié moins bien décrite que la vraie.

Correction : une constante `AGENCY_ID` (`…/#agence`) portée par le nœud du
layout **et** par le `provider` des `Service`. Toutes les mentions fusionnent
désormais en un seul nœud. Vérifié : l'`@id` est servi sur **67 des 68 pages
pré-rendues** — la 68ᵉ est `_global-error`, qui n'utilise pas le layout.

C'est la modification la plus structurante du jour, et elle tient en une ligne
par fichier. **Elle n'était dans aucun backlog** : elle est sortie de la lecture
du code, pas d'une liste.

#### 2. `/honoraires` — le barème publié devient un barème lisible par une machine

`offerCatalogLd()` construit un `OfferCatalog` de **27 offres** réparties en 5
sections, **à partir des mêmes constantes qui rendent les tableaux** (`TRANSACTION`,
`LOCATION_LOCATAIRE`, `GESTION_COURANTE`, `GESTION_OCCASIONNELLE`). Même
garantie que `faqLd()` : ajouter une ligne au barème l'ajoute au balisage, en
retirer une la retire des deux côtés — **le mismatch est impossible par
construction**, pas seulement évité.

Les deux taux affichés **hors tableau** (9 % part propriétaire, 2,5 % GLI)
étaient écrits en dur dans le JSX. Ils sont passés en constantes
(`LOCATION_PROPRIETAIRE`, `GLI`) **lues à la fois par l'affichage et par le
JSON-LD** — sinon ces deux-là, et eux seuls, auraient pu diverger.

**Le point de rigueur du jour** : un `price` numérique n'est émis que lorsque la
cellule est un **montant en euros ferme**. Sur 27 offres, **5 seulement** en
portent un (2 000, 5 000, 9 000, 120, 100 €). Tout le reste — « 6 % », « 8 €/m² »,
« 20 €/an », « 70 € + 10 €/lot suppl. », « Vacation » — reste une chaîne
reprise mot pour mot. Baliser « 8 €/m² » comme `price: 8` aurait affirmé un prix
que la page ne dit pas : c'est un tarif au mètre carré, pas un montant.

#### 3. `/equipe` — deux personnes réelles, balisées sans rien affirmer de neuf

`teamLd(TEAM)` émet 2 `Person` (nom, `jobTitle`, bio, e-mail, téléphone en
E.164, photo) reliés à l'agence par `worksFor`, plus le rattachement inverse
`employee` sur le nœud `AGENCY_ID`. **Tout vient de `TEAM`, la source qui rend
déjà les cartes** : aucune affirmation nouvelle sur une personne réelle — c'est
la condition posée le 12/09 quand l'item « auteur humain » a été écarté.
`BreadcrumbList` ajouté au passage (il manquait).

#### 4. `/blog` — les 26 articles déclarés d'un bloc

`blogLd()` émet un nœud `Blog` (+ `publisher` → `AGENCY_ID`) et un `ItemList` de
**26 `ListItem`** dans l'ordre d'affichage des cartes, avec URL et titre visible.
C'est **la seule page du site qui déclare les 26 URLs d'articles d'un seul bloc,
sous forme lisible par une machine** — ce qui vise directement la question n°1
du journal (les pages profondes sont-elles indexées ?).

Choix délibéré : l'`ItemList` **pointe** vers les articles, il ne les redécrit
pas. Publier 26 `BlogPosting` complets ici aurait créé un second jeu de nœuds
concurrent de celui des pages d'articles — avec un conflit garanti, puisque la
carte affiche `title` et la page d'article `h1`, qui diffèrent. Le détail
éditorial reste déclaré par la page qui le porte. Chaque `BlogPosting` reçoit en
revanche un `@id` stable et un `isPartOf` vers le `Blog` : le graphe se referme.
**`author` et `publisher` des articles n'ont pas été touchés** — ils
fonctionnent.

#### 5. `llms.txt`

`/equipe` **n'y figurait pas du tout**. Ligne ajoutée, **générée depuis `TEAM`**
(donc elle ne dérivera pas) : les deux conseillers, leur poste et leurs
coordonnées directes. C'est la réponse à « qui contacter chez Markus
Immobilier », que le fichier ne donnait pas.

#### Contrôle qualité

`npm ci` · `tsc --noEmit` **0 erreur** · `eslint` **0 erreur** sur les 7 fichiers
touchés · `npm run build` OK (**82 pages**, 68 pré-rendues, inchangé).

**La preuve d'innocuité, faite et pas supposée.** Le chantier touche
`app/layout.tsx` (toutes les pages) et le gabarit des 26 articles : c'est
exactement le cas où le journal du 10/09 impose le **double build**. Fait —
build de HEAD stashé, build de la version modifiée, puis comparaison du **texte
visible** des 68 pages pré-rendues (`<script>` et `<style>` retirés, balises
retirées, espaces normalisés) :

> **68 pages sur 68 : texte visible identique à l'octet près.**

Les deux littéraux `9 %` et `2,5 %` passés en constantes rendent donc bien la
même chose, et le passage de l'`@id` dans le layout n'a rien déplacé.

**Vérifications de correspondance JSON-LD ↔ visible**, une par une et pas
seulement comptées :

- `/honoraires` : les **27 libellés de prestation** et les **27 tarifs** sont
  cherchés dans le texte visible de la page → **0 absent**. Deux libellés
  l'étaient à la première passe (« Mise en location », « Assurance GLI —
  Garantie des Loyers Impayés » : ma formulation, pas celle de la page) →
  remplacés par le texte exact de l'encadré (« Part propriétaire »,
  « Assurance GLI ») avant rebuild.
- `/equipe` : 2 `Person` pour 2 membres affichés, téléphones convertis
  correctement (`06 81 78 77 40` → `+33681787740`), `employee` ↔ `worksFor`
  cohérents dans les deux sens.
- `/blog` : `numberOfItems` = 26 = nombre de `ListItem` = nombre de `<h2>` servis
  par la page, **26 URLs uniques**.

**Décidé de NE PAS faire, et pourquoi :**

- **Mettre une date « Dernière mise à jour » sur `/honoraires`.** L'étape 4 de la
  routine la demande sur les pages de fond, et cette page n'en a pas. Mais je ne
  peux pas savoir depuis un run **depuis quand ce barème est en vigueur** :
  afficher « à jour au 13/09/2026 » serait une attestation que rien ne fonde, sur
  la page la plus engageante du site juridiquement. Le PDF téléchargeable est un
  troisième exemplaire que je ne peux pas relire. → **à demander au client** :
  une date d'entrée en vigueur du barème, à afficher et à porter en
  `priceValidUntil`. Noté en « Hypothèses à vérifier ».
- **Remplacer `author`/`publisher` des 26 articles par une référence à
  `AGENCY_ID`.** Ce serait plus juste sur le plan des entités (le
  `RealEstateAgent` *est* une `Organization`). Mais ça modifie un balisage
  d'auteur qui fonctionne sur 26 pages, pour un gain d'élégance. Règle du
  projet : on ne corrige pas ce qui marche. Seuls `@id` et `isPartOf` ont été
  **ajoutés**.
- **Ajouter une FAQ à `/honoraires`.** Ce serait le complément naturel du barème
  (« qui paie les honoraires ? », « sont-ils négociables ? ») et la page s'y
  prête. Mais c'est un **chantier de contenu**, et aujourd'hui était un jour de
  balisage : une `FAQPage` sans FAQ visible serait précisément le mismatch que
  le projet s'interdit. → noté en « Chantiers en attente », c'est un bon
  candidat pour un prochain run de contenu.
- **Baliser `/faire-gerer`, `/recrutement` et `/annonces`**, qui ne servent eux
  non plus aucun JSON-LD spécifique. Le chantier en aurait fait 6 pages au lieu
  de 3, et ces trois-là n'ont ni la citabilité du barème, ni l'enjeu d'entité de
  l'équipe, ni les 26 URLs du blog. → noté en « Chantiers en attente ».
- **Ajouter un `<h2>` à `/equipe`.** La page n'en a aucun (`<h1>` puis des
  `<h3>`), ce qui la rend mal découpée pour un LLM. Mais corriger ça, c'est
  toucher au rendu d'une page qui fonctionne, un jour où j'ai justement démontré
  que je ne touchais à rien de visible. → « Hypothèses à vérifier ».

### 2026-09-12 — Renforcement de `/agence-immobiliere-villeurbanne` : publier ce que coûte une agence

**Angle du jour** : *renforcer une page stratégique existante*. Le journal du
11/09 demandait de ne pas enchaîner deux réécritures d'articles de blog. C'est
respecté : le chantier porte sur une **page « argent »**, pas sur le blog.

**Pourquoi celle-là, décidé par la mesure.** Deux constats de l'étape 2, faits
en production et pas déduits du code :

1. La page servait **404 mots**, 5 H2 de slogan, aucun chiffre, aucune FAQ,
   aucune date. C'est la page stratégique la plus faible du site rapportée à son
   enjeu — elle vise « agence immobilière Villeurbanne », mesurée absente
   **six runs de suite**.
2. La SERP de cette requête est tenue par des annuaires et des franchises, et
   le journal a raison depuis le 09/09 : **au classement Google, le contenu n'y
   battra pas PagesJaunes**. Le levier y est la fiche Google Business Profile,
   qui appartient au client.

**Le pari, et il est explicite** : ce chantier ne vise pas la 1ʳᵉ page de Google
sur cette requête. Il vise **la citation par les moteurs de réponse**. Parce que
la vraie trouvaille de l'étape 2 est ailleurs : dans les neuf résultats de cette
SERP, **aucun ne dit ce que coûte une agence**. Or Markus Immobilier publie un
barème complet sur `/honoraires` — et ce barème n'était **cité nulle part
ailleurs sur le site**, ni même listé dans `llms.txt`. On avait la réponse à la
question que tout le monde pose et personne ne traite, rangée dans un tableau
que rien ne référençait.

#### Ce qui a été publié

La page passe de **404 à 1 261 mots**, 6 H2 **tous reformulés en questions**,
chacun ouvrant sur une réponse autonome de 2-3 phrases :

| H2 | Réponse chiffrée en tête |
|---|---|
| Combien coûte une agence immobilière pour vendre à Villeurbanne ? | 9 000 € de 50 001 à 170 000 €, 6 % de 170 001 à 300 000 €, 5 % au-delà — soit **≈ 11 700 € TTC** sur le prix médian villeurbannais de 195 000 € |
| À quel prix se vendent les appartements de Villeurbanne ? | 3 567 €/m² médians sur 1 875 ventes 2025, de 2 738 à 3 923 €/m² selon le quartier |
| Que fait une agence entre l'estimation et la signature ? | la chaîne complète, énumérée |
| Combien coûte la gestion locative à Villeurbanne ? | 6 % des encaissements (min. 25 €), GLI 2,5 %, mise en location 9 % du loyer annuel HC |
| Agence indépendante ou réseau franchisé : qu'est-ce que ça change ? | barème fixé par l'agence, deux interlocuteurs nommés |
| Où se trouve l'agence et quels sont ses horaires ? | adresse, horaires, téléphone |

Le calcul **11 700 €** est la seule dérivation de la page (6 % × 195 000 €), et
elle croise deux sources déjà publiées sur le site : le barème de `/honoraires`
et le prix médian DVF de l'article prix. **Aucun chiffre neuf n'a été inventé ni
recalculé** — conformément à la méthode du 09/09 (« la dérivation transparente
vaut un calcul neuf »).

**FAQ de 6 questions**, visible et reprise à l'identique en JSON-LD `FAQPage`
via `faqLd(FAQ)` sur le même tableau que `<FaqBlock>` : mismatch impossible par
construction. **`updated` = 2026-09-12**, légitime (404 → 1 261 mots).

#### Maillage

La page ne recevait que **2 liens internes** (footer + 1 depuis
`/estimation-immobiliere-villeurbanne`). Deux liens entrants contextuels ont été
posés, **uniquement là où la phrase existante les appelait déjà** (règle du
10/09) : depuis `/agence-immobiliere-gratte-ciel` (« l'implantation de notre
agence à Villeurbanne ») et `/agence-immobiliere-cusset` (« la connaissance
locale de notre agence à Villeurbanne »). **Un troisième était prévu depuis
`/agence-immobiliere-charpennes` : il n'a pas été posé**, parce qu'aucune phrase
de cette page ne l'appelait — forcer l'ancre aurait violé la règle. Sortants :
7 liens contextuels (honoraires ×2, article prix, 3 pages quartier, estimation
Villeurbanne, gestion locative, faire-gérer, équipe, contact).

#### `llms.txt`

Vérifié en production : la partie générée (26 articles, annonces) est exacte, il
ne dérive pas. Mais sa partie écrite en dur avait deux trous, comblés
aujourd'hui : **`/honoraires` n'y figurait pas du tout** (alors que c'est le
contenu le plus citable du site pour une IA : un barème public complet), et la
ligne de `/agence-immobiliere-villeurbanne` décrivait encore une page de
présentation. Les deux lignes portent désormais les chiffres eux-mêmes.

#### Bonus qualité — un chiffre non sourcé encore en ligne

Sur `/estimation-immobiliere-villeurbanne`, la **FAQ** affirmait toujours que
les critères invisibles « pèsent 15 à 20 % ». Le 11/09 avait corrigé cette
formulation **dans le corps de texte** mais **pas dans la FAQ** — donc elle
partait aussi dans le JSON-LD `FAQPage`. Remplacée par la mesure publiée la
veille : *erreur médiane de 15,5 %, 36 % des ventes estimées à moins de 10 %
près*. `updated` de cette page **volontairement non bougé** (2026-09-08) : une
phrase corrigée n'est pas une mise à jour de contenu, et redater à vide est un
signal de spam (veille du 07/09).

**Contrôle qualité** : `npm ci` · `tsc --noEmit` **0 erreur** · `eslint` sur les
5 fichiers touchés : **0 erreur sur la page neuve**, et les deux pages quartier
passent de **7 à 5 erreurs pré-existantes** (deux apostrophes échappées au
passage dans les phrases réécrites — aucune ajoutée). `npm run build` OK
(**82 pages**, inchangé). HTML pré-rendu relu : **1 `<h1>`**, 6 H2 en questions,
**6 `<summary>` visibles pour 6 `Question` en JSON-LD** (libellés comparés un à
un), `Service` + `FAQPage` + `BreadcrumbList` + le `RealEstateAgent` du layout,
et **contrôle anti-collage par regex** sur tout le texte rendu après correction
des trois espaces avalés.

### 2026-09-11 — Réécriture de « estimation en ligne ou agence » : la fiabilité mesurée, pas affirmée

**Angle du jour** : *réécriture en profondeur d'un article faible*. Le 10/09
était un jour technique ; le journal demandait explicitement de rebasculer sur
du contenu, et désignait **cet article comme meilleur candidat**. C'est ce qui a
été fait.

**Pourquoi celui-là, confirmé par la mesure.** C'était le point 2 du backlog. Les
deux mesures de l'étape 2 l'ont confirmé plutôt que l'inverse : (a) la page
servait bien **216 mots sans un seul chiffre** (vérifié en production, pas
déduit du code) ; (b) la SERP correspondante est **la plus faible mesurée depuis
le début de ce journal** — dix résultats, zéro chiffre, alors que l'intention est
vendeur.

#### L'idée : répondre à la question que tout le monde élude

Tous les concurrents écrivent « l'estimation en ligne est moins fiable qu'une
agence ». **Aucun ne dit de combien.** C'est une question factuelle, et nous
avions de quoi y répondre : la base DVF permet de mesurer l'écart entre ce que
donne la méthode du prix au m² et ce que les gens ont réellement payé.

**Le test publié** : pour chacune des 1 875 ventes d'appartements de 2025 à
Villeurbanne, calculer `médiane €/m² du quartier × surface`, puis comparer au
prix réel enregistré chez le notaire.

| Résultat | Valeur |
|---|---|
| Ventes estimées à moins de 5 % près | **18 %** |
| à moins de 10 % près | **36 %** |
| à moins de 20 % près | **62 %** |
| Erreur médiane | **15,5 %** |
| Idem avec la médiane **communale** au lieu du quartier | 31 % à moins de 10 % |

Ce dernier point est le plus intéressant éditorialement : **connaître le quartier
ne fait gagner que 5 points**. L'essentiel de l'écart ne vient donc pas de la
localisation mais de ce que DVF ne contient pas (étage, état, DPE, charges) —
c'est-à-dire exactement ce que la visite d'un conseiller apporte. L'article
démontre l'utilité de l'agence **avec les chiffres de l'agence**, au lieu de
l'affirmer.

**Les deux tableaux publiés** (données neuves, publiées nulle part ailleurs) :

1. **Dispersion par quartier** — médiane, moitié centrale des ventes (P25–P75),
   et l'écart converti **en euros** sur la surface médiane du quartier. Commune :
   2 954 – 4 173 €/m², soit **≈ 76 000 € sur 62 m²**. Par quartier, de
   ≈ 58 000 € (Perralière – Grandclément) à ≈ 78 000 € (Cyprian – Les Brosses).
2. **Dispersion par typologie** — T1 ≈ 38 000 €, T2 ≈ 48 000 €, T3 ≈ 75 000 €,
   T4 ≈ 92 000 €. *Plus le logement est grand, moins l'estimation automatique est
   précise* : une phrase vraie, chiffrée, et que personne ne publie.

Et le passage le plus citable, parce qu'il est contre-intuitif et vérifiable :
**la fiabilité d'une estimation automatique dépend du quartier.** À
Gratte-Ciel – Dedieu – Charmettes, 42 % des ventes 2025 tombent à moins de 10 %
près ; à Buers – Croix-Luizet et Cyprian – Les Brosses, **25 %**.

#### Le garde-fou : recalculer avant de dériver

Publier la dispersion **autour** de médianes déjà publiées imposait de vérifier
d'abord que ces médianes tiennent toujours (DVF est révisée rétroactivement).
Elles ont donc été **entièrement recalculées à la source** avant d'écrire une
ligne : les 8 quartiers et les 4 typologies correspondent **au chiffre près** à
ce qui est en ligne depuis le 07/09 (détail dans « État des lieux »). Sans cette
vérification, l'article aurait pu contredire deux autres pages du site.

Un commentaire en tête de `lib/blog.ts` recense désormais **quatre** contenus
dérivés des mêmes médianes (l'article prix, l'article acheteur, le tableau
`REPERES` de la page estimation Villeurbanne, et ce nouvel article) : ils devront
être refaits **ensemble** au prochain recalcul.

#### Volet GEO appliqué

- **8 H2, tous formulés en questions réellement posées** (« Une estimation
  immobilière en ligne est-elle fiable ? », « De combien le prix au m² varie-t-il
  à l'intérieur d'un même quartier ? », « L'estimation en ligne est-elle moins
  précise pour un grand logement ? »).
- **Réponses autonomes de 2-3 phrases en tête de chaque H2**, relues une par une
  contre le piège n°1 du journal (le fragment qui dépend du titre). Une seule
  réécriture a été nécessaire cette fois — sur « Pourquoi deux appartements
  identiques… », dont la réponse commençait par « Parce que… ».
- **Chiffre-clé dans la première phrase de l'article**, pas gardé pour la fin.
- **FAQ de 5 questions**, visible et reprise à l'identique en JSON-LD `FAQPage`
  (générée depuis le même tableau que l'affichage).
- **`updated` = 2026-09-11** — et cette fois c'est légitime : 216 → 2 055 mots.
- **Méthode ET limites publiées**, dont celle qui coûte : *le test est favorable
  à la méthode testée*, puisque la médiane est calculée sur les ventes mêmes
  qu'elle sert à prédire. Le dire renforce le chiffre au lieu de l'affaiblir.

**Maillage** : 3 liens sortants contextuels (article prix, guide d'estimation,
page estimation Villeurbanne) + **2 liens entrants** posés dans des phrases que
le texte existant appelait déjà — depuis l'article prix et depuis
`/estimation-immobiliere-villeurbanne`. L'article passait de **0 lien entrant**.

**Bonus qualité** : sur `/estimation-immobiliere-villeurbanne`, le corps de texte
affirmait un écart de **« 15 à 20 % »** sans source. Remplacé par l'écart
interquartile réellement mesuré (2 954 – 4 173 €/m², ≈ 76 000 € sur 62 m²) et un
lien vers la démonstration. La mesure du jour **confirme** d'ailleurs l'ordre de
grandeur (erreur médiane 15,5 %) : le chiffre n'était pas faux, il n'était pas
sourçable.

**Contrôle qualité** : `npm ci` · `tsc --noEmit` **0 erreur** · `eslint` **0
erreur** sur les 2 fichiers touchés · `npm run build` OK (**82 pages**). HTML
pré-rendu : **1 seul `<h1>`**, 8 `<h2>`, 2 `<table>`, **5 `<summary>` visibles
pour 5 `Question` / 5 `Answer` en JSON-LD** (libellés comparés un à un, pas
seulement comptés), `BlogPosting` + `FAQPage` + `BreadcrumbList`,
`datePublished 2026-06-09` / `dateModified 2026-09-11`, **aucun marqueur
`[texte](href)` non parsé**, et les 2 pages liées toujours à 1 `<h1>` avec leur
FAQ intacte (5 et 6 questions).

**Vérifié en production** après déploiement : 2 passes anti-cache concordantes
sur l'article (8 H2, 2 tableaux, 5 FAQ visibles ↔ 5 `Question`,
`dateModified 2026-09-11`, aucun marqueur brut) ; `sitemap.xml` toujours à
**61 URLs** avec `lastmod 2026-09-11` sur l'article ; `llms.txt` a repris le
nouveau titre tout seul ; **4 occurrences du lien** servies sur l'article prix et
**2** sur la page estimation Villeurbanne.

**Décidé de NE PAS faire, et pourquoi :**

- **Publier une ligne « T5 et + »** dans le tableau de dispersion. Le calcul
  montre que le « T5+ » publié le 07/09 (2 967 €/m²) correspond en réalité aux
  logements de **5 pièces exactement**, pas à « 5 pièces et plus » (2 984 €/m²
  sur 144 ventes). Publier une ligne T5 aujourd'hui aurait soit contredit le
  tableau existant, soit propagé une étiquette inexacte. → **noté en
  « Hypothèses à vérifier »**, à corriger dans le même run que le prochain
  recalcul, pas à la volée.
- **Corriger les 3 autres occurrences du « 15 à 20 % » non sourcé** (FAQ de la
  page estimation Villeurbanne, et 2 passages dans `lib/blog.ts`). La mesure du
  jour les confirme, ils ne sont donc pas faux ; les réécrire aurait élargi le
  chantier à 4 fichiers pour un gain nul. → à traiter le jour où l'un de ces
  contenus sera réécrit pour une autre raison.
- **Toucher au bloc de résultat de l'outil d'estimation** pour y afficher la
  fourchette de dispersion. Ce serait pertinent — l'outil pourrait dire « à ce
  stade, la fourchette réelle de votre quartier est de X à Y » — mais la consigne
  client sur l'outil est « il faut juste rien casser », et c'est un chantier de
  produit, pas de SEO. → **noté en « Chantiers en attente »**, à soumettre au
  client d'abord.
- **Changer l'`internalHref` de l'article** (`/estimation`). Il envoie vers
  l'outil, c'est le chemin de conversion le plus court. Non touché.

### 2026-09-10 — Déblocage du maillage interne depuis le corps des articles + canonicals des pages légales

**Angle du jour** : *technique / structurel*. Les trois runs précédents portaient
tous sur du contenu ; le journal demandait explicitement de basculer.

**Pourquoi celui-là.** C'était le **backlog n°6, reporté trois runs de suite**
(08/09, 09/09) avec à chaque fois la même raison : « ça touche le rendu des 26
articles, c'est un chantier à part entière ». Aujourd'hui était le jour prévu
pour ce chantier à part entière — et la mesure de l'étape 2 l'a confirmé plutôt
que l'inverse : le test d'indexation profonde montre que nos pages de données ne
sortent même pas sur leur propre chiffre exclusif, alors qu'elles ne recevaient
presque aucun lien interne.

#### 1. Syntaxe de lien dans le corps des articles

`inline()` (`components/blog/article-body.tsx`) ne gérait que `**gras**`. Ajout
de `[texte](/chemin)` → `next/link`, et `[texte](https://…)` → `<a>` avec
`target="_blank"` + `rel="noopener noreferrer"`.

**Le point qui rendait ce chantier sûr, et qu'il faut retenir** : la syntaxe
était **inexistante dans les 26 articles** (vérifié par grep avant d'écrire une
ligne). Le changement est donc **inerte par construction** sur tout article où
je ne pose pas de lien — ce n'est pas « probablement sans risque », c'est
démontrable.

Et démontré, pas seulement raisonné : **double build (version modifiée, puis
version `HEAD` stashée) et diff du texte rendu des 26 pages pré-rendues**.
Résultat : **20 articles sur 26 rendent un texte identique à l'octet près**, et
les **6 qui changent sont exactement les 6 où j'ai posé un lien**. C'est la
méthode à réutiliser pour tout chantier touchant un gabarit partagé.

> ⚠️ **Piège du diff HTML brut** : comparer les fichiers `.html` directement
> donne « 26/26 modifiés » et ne prouve rien — Turbopack ré-hache les noms de
> chunks à chaque build. **Comparer le texte rendu** (tags retirés, espaces
> normalisés), pas le HTML.

#### 2. Les 11 liens contextuels posés

Tous dans des **phrases déjà existantes**, jamais dans un bloc « voir aussi ».
Cible choisie sur un critère unique : les pages stratégiques qui recevaient le
moins de liens entrants.

| Page cible | Liens entrants gagnés |
|---|---|
| `/blog/prix-immobilier-villeurbanne-2026` | **+5** |
| `/estimation-immobiliere-villeurbanne` | **+4** (elle passe de 2 à 6) |
| `/blog/ou-acheter-villeurbanne-quartiers` | **+2** |

Articles émetteurs : `comment-estimer-son-bien…` (2), `estimation-en-ligne-ou-agence`
(2), `investir-locatif-lyon` (2), `ou-acheter-villeurbanne-quartiers` (2),
`prix-immobilier-villeurbanne-2026` (2), `vendre-appartement-lyon-etapes` (1).
Les deux articles de données se lient désormais **réciproquement**.

**Aucun chiffre nouveau n'a été écrit.** Les rares phrases ajoutées ne servent
qu'à porter le lien.

**`updated` volontairement NON modifié sur les 6 articles.** C'est l'application
directe de la veille du 07/09 : « ne bouger `updated` que si le contenu change
vraiment — redater sans réécrire est un signal de spam ». Poser un lien n'est
pas une réécriture. Conséquence assumée : pas de gain de fraîcheur aujourd'hui.

#### 3. Canonical fautif des pages légales (problème découvert à l'étape 2)

Le backlog n°1 annonçait « canonicals **manquants** ». La production disait
autre chose : les canonicals étaient **présents et faux**. `/mentions-legales`,
`/confidentialite`, `/cookies` et `/espace-client` servaient
`<link rel="canonical" href="https://www.markusimmobilier.fr">` — elles se
**déclaraient donc comme des doublons de la home**.

**Cause** : `app/layout.tsx` posait `alternates: { canonical: "/" }`. Dans
l'App Router, **les metadata d'un layout sont héritées par toute page qui ne les
surcharge pas** — le canonical fuyait sur tout le site. Les pages SEO n'étaient
pas touchées (elles posent toutes le leur), d'où l'invisibilité du bug.

Correction : défaut retiré du layout (la home garde le sien dans `app/page.tsx`,
vérifié inchangé), + canonical propre sur les 3 pages légales. Un commentaire
dans `layout.tsx` explique pourquoi il ne faut pas le remettre.

`/signin` passe en `noindex, nofollow` via un `app/signin/layout.tsx` dédié (la
page est un composant client, elle ne peut pas exporter de `metadata`).
**Volontairement pas ajoutée au `disallow` de `robots.txt`** : une URL bloquée
au crawl ne peut pas être lue, donc son `noindex` n'est jamais vu. Bloquer et
désindexer sont deux actions contradictoires.

**Contrôle qualité** : `tsc --noEmit` **0 erreur** · `eslint` **0 erreur** sur
les 7 fichiers touchés · `npm run build` OK (82 pages) · JSON-LD de l'article
prix intact (**5 `Question` / 5 `Answer`**, `FAQPage`, `BlogPosting`,
`BreadcrumbList`) · **1 seul `<h1>`** sur chacun des 6 articles modifiés · aucun
marqueur `[texte](href)` non parsé, et aucune fuite de marqueur dans les
`metaDescription`, `excerpt` ou FAQ (celles-ci ne contiennent aucun lien).

**Vérifié en production** : les 3 pages légales servent leur propre canonical,
la home garde le sien, `/signin` sert `noindex, nofollow`, les 6 articles
servent leurs 11 liens, aucun marqueur brut, `sitemap.xml` toujours à 61 URLs
(aucune page créée, c'est attendu).

> ⚠️ **Cache CDN rencontré deux fois** — exactement le piège noté le 09/09, et
> le `?cb=<random>` **n'a pas suffi cette fois**. `/mentions-legales` a servi
> l'ancienne version au 1ᵉʳ appel, et l'article acheteur a alterné
> ancien/nouveau/ancien sur trois passes espacées de 15 s. Après ~60 s de plus :
> **5 passes sur 5 correctes**. **Leçon affinée : sur un cache multi-nœuds, un
> seul appel anti-cache ne prouve rien — il faut plusieurs passes espacées, et
> ne conclure à un échec qu'après une série entièrement négative.**

**Décidé de NE PAS faire, et pourquoi :**

- **Réécrire un article faible** (`investir-locatif-lyon`, `rentabilite-locative-lyon`,
  `estimation-en-ligne-ou-agence`). Ils restent les plus mauvais du site, mais
  c'était un jour « technique » : enchaîner un 4ᵉ run de contenu aurait laissé
  le maillage bloqué une semaine de plus. → toujours en attente, backlog n°5.
- **Retirer `/espace-client` du `disallow` de `robots.txt` pour lui poser un
  `noindex`.** Ce serait la manœuvre correcte (le lien 👤 du header la rend
  atteignable, donc indexable en URL seule), mais ça revient à **ouvrir au crawl
  une page que le client a explicitement fermée**. Pas une décision de run
  automatique. → noté en « Hypothèses à vérifier », à soumettre au client.
- **Bumper les dates `updated`** des 6 articles (voir plus haut).
- **Poser plus de 11 liens.** Il aurait été facile d'en mettre 30 : chaque
  article parle de prix ou d'estimation. Un maillage qui répète le même lien
  dans 26 pages sur des ancres identiques est un signal de manipulation, pas de
  structure. Un lien n'a été posé que là où la phrase existante l'appelait déjà.

### 2026-09-09 — Réécriture de l'article « où acheter à Villeurbanne » (angle acheteur)

**Angle du jour** : *réécriture en profondeur d'un article faible*. La veille
était une création de page ; le journal interdisait d'enchaîner deux créations.

**Pourquoi celui-là.** C'était le point 1 du backlog, et les mesures de l'étape 2
l'ont confirmé plutôt que l'inverse : les deux requêtes acheteur testées pour la
première fois ont la SERP la plus faible rencontrée jusqu'ici (voir « Positions
mesurées »). En face, l'article existant était le plus mauvais du site sur un
sujet où l'on a de la donnée : **~270 mots, 2 H2, cinq puces qualitatives, zéro
chiffre, zéro source, pas de FAQ** — vérifié en production avant d'agir, pas
déduit du code.

**Le principe suivi : zéro chiffre nouveau.** Toutes les médianes viennent du
calcul DVF du 07/09 déjà publié. Rien n'a été recalculé « à la louche », rien
n'a été inventé. Ce qui est neuf, ce sont des **dérivations transparentes** de
ces médianes, chacune légendée comme telle.

**Ce qui a été fait.**

1. **Réécriture complète** de `ou-acheter-villeurbanne-quartiers` dans
   `lib/blog.ts` : ~1 500 mots, 7 H2, 2 tableaux, 1 liste ordonnée, FAQ de 5
   questions. Nouveaux `title`, `h1`, `metaDescription`, `excerpt` alignés sur
   la requête réelle (« où acheter à Villeurbanne », « quel quartier »).
2. **Tableau « budget → surface »** — la donnée vraiment neuve du site :
   200 000 / 250 000 / 300 000 € convertis en m² au prix médian de chaque
   quartier. Résultat parlant : **65 m² à Gratte-Ciel contre 91 m² à
   Cyprian – Les Brosses pour 250 000 €**. Personne ne publie ça, et ça répond
   exactement à la question posée à voix haute à une IA.
3. **Tableau de positionnement** : écart au prix médian communal (en %) +
   volume de ventes 2025 par quartier. L'écart en % est une dérivation neuve ;
   le volume est réutilisé sous un angle nouveau (**liquidité / facilité de
   revente**, pas « taille d'échantillon »).
4. **Refus explicite de publier un rendement locatif par quartier**, écrit noir
   sur blanc dans l'article. Le seul loyer de référence public est **communal**
   (14,6 €/m² HC, `lib/loyers.ts`) ; l'appliquer à chaque quartier aurait
   fabriqué des chiffres faux. Seul le rendement brut **communal** est publié
   (≈ 4,9 % = 14,6 × 12 ÷ 3 567), avec ses limites. Dire pourquoi on ne publie
   pas un chiffre est un signal de fiabilité, pas un manque.
5. **Aucune prévision de prix.** La section « résistance depuis 2022 » se
   termine explicitement par : ces écarts disent d'où vient chaque quartier, pas
   où il va.
6. **Volet GEO appliqué** : 7 H2 tous formulés en questions réelles ; réponse
   autonome de 2-3 phrases en tête de chaque H2 — **relues une par une contre le
   piège n°1 du journal** (un fragment qui dépend du titre : « Parce que… »,
   « Oui, mais… ») ; chiffre-clé dans le tout premier paragraphe ; FAQ de 5
   questions visible et reprise à l'identique en JSON-LD ; `updated` =
   2026-09-09, donc `dateModified` et `lastmod` du sitemap suivent.

**Maillage entrant — 4 nouveaux liens contextuels** vers l'article, depuis
`/acheter` et les 3 pages quartier (`gratte-ciel`, `charpennes`, `cusset`). Ces
3 pages y gagnent au passage **la médiane €/m² de leur propre secteur**, qu'elles
n'avaient pas : elles ciblent « agence immobilière <quartier> » et n'avaient
aucune donnée chiffrée. Liens en `next/link` et apostrophes échappées, pour ne
pas ajouter d'erreur de lint.

**Contrôle qualité** : `npm ci`, `tsc --noEmit` **0 erreur**, `npm run build` OK
(82 pages). Lint : **13 erreurs après vs 14 avant** sur les 5 fichiers touchés
(comparaison faite en lintant la version `HEAD` stashée) — donc **aucune erreur
ajoutée**, et une pré-existante corrigée au passage sur Charpennes.
HTML pré-rendu vérifié : **1 seul `<h1>`**, les 7 H2, **5 `<summary>` visibles
pour 5 `Question` en JSON-LD**, 2 `<table>`, `datePublished 2026-06-02` /
`dateModified 2026-09-09`, « Mis à jour le 9 septembre 2026 » affiché,
`lastmod 2026-09-09` dans le sitemap, et **1 lien entrant servi sur chacune des
4 pages**, toutes toujours à 1 seul `<h1>`.

**Vérifié en production** — le déploiement Vercel était en ligne **dès la
première tentative** (plus rapide que les ~70 s mesurées le 08/09).
`https://www.markusimmobilier.fr/blog/ou-acheter-villeurbanne-quartiers` sert
1 `<h1>`, 7 `<h2>`, 2 `<table>`, **5 `<summary>` pour 5 `Question`**,
`BlogPosting` + `FAQPage` + `BreadcrumbList`, `dateModified 2026-09-09`.
`sitemap.xml` porte `lastmod 2026-09-09`, `llms.txt` a repris le nouveau titre
et le nouvel `excerpt` chiffré tout seul. Les 4 liens entrants sont servis.

> ⚠️ **Piège de vérification rencontré** : au premier passage,
> `/agence-immobiliere-cusset` renvoyait **0 lien** alors que les 3 autres pages
> en servaient 1 — c'était un **cache CDN encore chaud**, pas un bug. Relancé
> avec un paramètre anti-cache : 1 lien, immédiatement. **Ne pas conclure à un
> échec de déploiement sur une seule requête ; refaire l'appel avec
> `?cb=<random>` avant de rouvrir un chantier.**

**Décidé de NE PAS faire, et pourquoi :**

- **Ajouter la syntaxe `[texte](href)` dans `inline()`** pour poser des liens
  dans le corps des articles (backlog n°6). Ça reste le vrai plafond du maillage
  interne, mais ça touche le rendu des **26 articles** : c'est un chantier à
  part entière, pas un à-côté. Les 4 liens entrants ont été posés depuis des
  pages React, où c'était sans risque. → toujours en attente.
- **Republier le tableau des prix par quartier** dans cet article. Il est déjà
  dans l'article prix ; le dupliquer aurait mis deux pages du site en
  concurrence sur la même requête. L'article acheteur ne reprend que les
  médianes dont il a besoin, sous un angle différent.
- **Publier un rendement locatif par quartier** (voir point 4).
- **Décrire la desserte transports des 4 quartiers sans page dédiée**
  (Ferrandière, Perralière – Grandclément, Buers, Cyprian). Les lignes exactes
  n'étaient pas vérifiables ici sans risque d'erreur factuelle sur le site d'une
  agence. Pour Gratte-Ciel / Charpennes / Cusset, on s'en tient à ce que les
  pages du site affirment déjà (métro A ; A+B + tram ; A + tram).

### 2026-09-08 — Page dédiée « estimation immobilière Villeurbanne »

**Angle du jour** : *création d'une page sur une requête non couverte* — pas de
contenu blog, pour ne pas refaire deux jours de suite le même type de chantier.

**Pourquoi celui-là.** C'était le point 3 du backlog, et c'est le trou le plus
coûteux du site : `/estimation-immobiliere-lyon` existait, mais **rien sur
« estimation immobilière Villeurbanne »** — la requête commerciale la plus
rentable dans la ville même de l'agence (intention de vente, et l'outil
d'estimation est le différenciateur du site). Vérifié avant d'agir : absent du
top 9, et la page `/estimation` ne sert qu'un `<h1>` générique
(« Estimez votre bien en moins de 2 minutes ») sans aucun ancrage Villeurbanne.

**Le risque du doublon, traité de front.** Le backlog prévenait : ne pas créer un
quasi-doublon de `/estimation`. Les quatre pages du champ ont donc des angles
explicitement séparés, et un commentaire en tête de fichier les rappelle :

| Page | Rôle |
|---|---|
| `/estimation` | l'outil (formulaire), transactionnel |
| `/estimation-immobiliere-lyon` | même service, échelle Lyon |
| `/blog/prix-immobilier-villeurbanne-2026` | l'analyse du marché et ses chiffres |
| **`/estimation-immobiliere-villeurbanne`** | **« combien vaut mon bien ici, et comment l'estimer »** |

**Ce qui a été fait.**

1. **Page `/estimation-immobiliere-villeurbanne`** (statique, SSG). Contenu
   ancré sur des chiffres réels, **aucun chiffre nouveau inventé** : tout vient
   du calcul DVF 2025 déjà publié le 07/09 (extraction du 07/09/2026).
2. **Tableau de repères par quartier** — la seule donnée vraiment neuve, et
   c'est une *dérivation transparente*, pas une invention : médiane €/m² du
   quartier × surface médiane du type de bien, pour un T2 (45 m²) et un T3
   (65 m²). Ex. T3 à Gratte-Ciel ≈ 250 000 €, à Cyprian – Les Brosses
   ≈ 178 000 €. La légende dit explicitement que c'est **un ordre de grandeur de
   départ, pas l'estimation d'un logement**. Utile parce que ça répond à la
   question réellement posée (« combien vaut mon T3 à Cusset »), que personne ne
   publie par quartier.
3. **Volet GEO appliqué à fond** :
   - **6 H2, tous formulés en questions réelles** (« Combien vaut un appartement
     à Villeurbanne aujourd'hui ? », « Pourquoi le prix au m² de votre quartier
     ne suffit-il pas ? »…).
   - **Réponses autonomes** : première rédaction faite, puis **relue et corrigée**
     parce que 4 réponses sur 6 commençaient par un fragment dépendant du titre
     (« Parce que… », « Les deux, dans cet ordre. », « Oui, parce que… », « Sur
     les ventes réellement conclues »). Réécrites pour se suffire hors contexte.
     **C'est le piège n°1 du volet GEO : on croit avoir écrit une réponse directe
     alors qu'on a écrit une suite de phrase.** À revérifier systématiquement.
   - **`Dernière mise à jour` visible** (« 8 septembre 2026 ») dans un `<time
     dateTime>`.
   - **FAQ de 6 questions**, visible et reprise à l'identique en JSON-LD.
4. **Données structurées** : `Service` + **`HowTo`** (3 étapes, nouveau type sur
   ce site) + `FAQPage` + `BreadcrumbList`. **Les trois derniers sont générés
   depuis les mêmes tableaux JS que l'affichage** (`ETAPES`, `FAQ`) : la
   désynchronisation est structurellement impossible, pas juste « vérifiée ».
5. **Maillage interne entrant** depuis `/agence-immobiliere-villeurbanne` et
   `/estimation-immobiliere-lyon` (liens contextuels, pas un bloc de liens), et
   sortant vers l'article prix, `/vendre`, les 3 pages quartiers et Lyon.
   `sitemap.ts` et `llms.txt` mis à jour.

**Support technique ajouté — additif, rien de modifié dans l'existant** :
helpers `faqLd()` / `howToLd()` dans `components/seo/json-ld.tsx`, composant
`components/seo/faq-block.tsx`, et **deux props optionnelles** sur `SeoLanding`
(`updated`, `afterSections`). Les 7 pages qui utilisent `SeoLanding` ne passent
aucune de ces props et sont donc rendues exactement comme avant — vérifié sur
le HTML pré-rendu (1 `<h1>` chacune, contenus intacts).

**Contrôle qualité** : `npm ci` puis `tsc --noEmit` **0 erreur** · `eslint` **0
erreur** sur tous les fichiers touchés (les 6 erreurs restantes sur
`agence-immobiliere-villeurbanne` et `estimation-immobiliere-lyon` sont
**pré-existantes** — vérifié en lintant la version `HEAD` stashée, mêmes erreurs
aux mêmes endroits) · `npm run build` OK, page pré-rendue en statique.

**Vérifié en production** (≈ 70 s après le push) : la page sert **1 seul `<h1>`**,
les 6 H2 en questions, **6 `<summary>` visibles pour 6 `Question` en JSON-LD**
(correspondance exacte), `HowTo` + 3 `HowToStep`, `Service`, `BreadcrumbList`,
le `<time dateTime="2026-09-08">`, le canonical correct. `sitemap.xml` est passé
à **61 URLs**, `llms.txt` porte la nouvelle ligne, et les **2 liens entrants sont
bien servis**. `robots.txt` ne la bloque pas.

**Décidé de NE PAS faire, et pourquoi :**

- **Ajouter le support des liens dans le corps des articles de blog.** Le
  rendu `inline()` de `components/blog/article-body.tsx` ne gère que le gras :
  impossible de poser un lien contextuel depuis l'article prix vers la nouvelle
  page. Y toucher aurait modifié le rendu des **26 articles** pour un seul lien.
  Écarté au titre de « en cas de doute sur un changement touchant au rendu
  existant, ne pas le faire ». → noté en attente.
- **Changer l'`internalHref` de l'article prix** (`/estimation` → nouvelle page).
  Meilleur pour le maillage, mais ça allonge le chemin de conversion vers
  l'outil. Pas touché : le client a demandé de ne rien casser qui marche.
- **Réutiliser le chiffre « 9 % »** dans le contenu estimation. Voir « Erreurs
  commises » : ce n'est pas un honoraire de vente.

### 2026-09-07 (run n°2) — Fondations on-page de la home : `<h1>` + `geo`/`logo`

> ⚠️ **Deux runs de la routine ont tourné en parallèle ce 2026-09-07** (13:11 et
> 13:24 UTC). Le second a démarré sur un clone antérieur aux commits du premier
> et a donc **refait le même chantier DVF de son côté, sans le savoir**. Ce
> travail en double a été **jeté sans être poussé** dès la découverte des
> commits amont : la version du premier run était déjà en ligne et vérifiée, et
> elle s'appuie sur les **contours officiels de la Métropole de Lyon**, plus
> légitimes que le regroupement d'IRIS INSEE qu'avait fait le second.
> **Leçon opératoire, à appliquer dès demain : commencer tout run par
> `git fetch origin main && git log --oneline HEAD..origin/main` AVANT de lire
> le journal.** Le journal du clone local peut être périmé de plusieurs commits ;
> lui seul ne suffit pas à savoir ce qui est déjà fait.

**Chantier retenu à la place** : les deux points en tête du backlog, tous deux
re-vérifiés absents sur le HTML servi en production avant d'agir. Ils sont
petits mais concernent la page la plus forte du site et la requête la plus
rentable (« agence immobilière Villeurbanne »).

1. **`<h1>` sur la home** — il n'y en avait *aucun*. Ajouté dans
   `components/home/hero.tsx` : « Markus Immobilier — agence immobilière à
   Villeurbanne et Lyon : achat, vente, location et gestion locative ».
   - **En `sr-only`, volontairement.** Le titre visuel du hero est le logo, et
     la DA est validée : `CLAUDE.md` interdit de la réinventer et impose de
     s'abstenir en cas de doute sur un changement de rendu. Un `h1` textuel
     visible aurait modifié le hero ; le `sr-only` apporte la sémantique
     manquante **sans toucher un pixel**. Ce n'est pas du cloaking : le texte
     décrit exactement le contenu de la page, et `sr-only` est déjà le motif
     utilisé ailleurs dans le projet (skip-link du layout, formulaires).
   - Vérifié : **exactement un `<h1>`** dans le HTML généré, hero visuellement
     inchangé, `useV()` du back-office non impacté.
2. **`geo` + `logo` dans `RealEstateAgent`** (`app/layout.tsx`) — ajoutés, plus
   `image` (photo de l'agence). Coordonnées **géocodées via la Base Adresse
   Nationale** (`api-adresse.data.gouv.fr`), correspondance exacte au numéro,
   score 0,978 : **lat 45.77238 / lon 4.880949**. Relevées à la source, pas à la
   main — commentaire posé dans le code pour qu'on ne les « corrige » pas plus
   tard au jugé.

**Contrôle qualité** : `tsc --noEmit` OK · `eslint` OK sur les 2 fichiers
touchés · `npm run build` OK (81 pages) · HTML pré-rendu inspecté (1 seul `h1`,
`logo` / `image` / `geo` bien sérialisés dans le JSON-LD).

**Vérifié en production après déploiement** (≈ 1 min après le push, cohérent
avec ce qu'avait constaté le run n°1) : `https://www.markusimmobilier.fr/` sert
bien **un `<h1>` unique** et le `RealEstateAgent` avec `logo`, `image` et
`geo`.

**Décidé de NE PAS faire** : republier une seconde version des chiffres DVF.
Deux jeux de médianes concurrents sur le même sujet (17 quartiers IRIS vs 8
quartiers officiels) auraient été une régression de crédibilité, pas un gain.

### 2026-09-07 — Prix au m² par quartier de Villeurbanne, calculés sur données réelles

**Pourquoi ce chantier.** Sur les trois requêtes testées, « prix m2
Villeurbanne » est celle où (a) le site est absent, (b) l'intention est
directement commerciale (qui cherche un prix au m² prépare une vente), et (c) on
pouvait produire quelque chose que **les concurrents n'ont pas** : des médianes
recalculées à la source, avec méthode et tailles d'échantillon publiées. Les
portails (MeilleursAgents, SeLoger, PAP) publient des estimations propriétaires
non sourcées ; c'est exactement le terrain où un contenu daté + sourcé + chiffré
se fait citer par une IA.

En plus, cela **débloque un point en attente client depuis longtemps** :
`ÉTAT-PROJET.md` demandait « ajouter les vrais prix €/m² par quartier dans
`lib/blog.ts` », en attente parce qu'il était interdit d'inventer un chiffre. Le
calcul lève le blocage sans rien inventer.

**Ce qui a été fait.**

1. **Calcul des prix** (hors dépôt, script jetable) :
   - Base **DVF** (demandes de valeurs foncières), Etalab / data.gouv.fr,
     fichiers commune 69266 (Villeurbanne), années **2022 → 2025**.
     `https://files.data.gouv.fr/geo-dvf/latest/csv/{année}/communes/69/69266.csv`
     — 2026 n'existe pas encore (404) ; **2025 est la dernière année complète**
     (ventes du 2025-01-03 au 2025-12-31).
   - Contours de quartiers **officiels** de la Métropole de Lyon, via WFS :
     `https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=adr_voie_lieu.adrquartier&outputFormat=application/json;%20subtype=geojson&SRSNAME=EPSG:4326`
     (201 polygones sur toute la métropole ; les 8 quartiers de Villeurbanne se
     sélectionnent tout seuls par point-dans-polygone sur les ventes 69266).
   - Filtrage : `nature_mutation = Vente` · **une seule ligne bâtie par
     mutation** (écarte les ventes de lots multiples, qui faussent le €/m²) ·
     surface ≥ 10 m² · 800 ≤ €/m² ≤ 12 000 · **médiane** (pas moyenne).
   - Résultat : **1 875 ventes d'appartements exploitables en 2025**
     (2 399 en 2022, 1 847 en 2023, 1 648 en 2024).

2. **Réécriture complète de l'article `prix-immobilier-villeurbanne-2026`**
   (`lib/blog.ts`) — il faisait 8 blocs sans un seul chiffre, il en fait
   maintenant ~30 avec 3 tableaux de données et une FAQ. Nouveau `title`, `h1`,
   `metaDescription`, `excerpt` alignés sur la requête réelle.

3. **Volet GEO appliqué** :
   - Réponse directe et autonome en tête de l'article **et** de chaque H2
     (2-3 phrases qui se suffisent à elles-mêmes, développement après).
   - H2 formulés en **questions réellement posées** : « Quel est le prix au m² à
     Villeurbanne en 2026 ? », « Quel est le prix au m² par quartier ? »,
     « Combien coûte un T2 ou un T3 ? », « Comment ces prix ont-ils été
     calculés ? ».
   - **Section méthodologie complète** avec sources nommées et datées, et les
     deux limites assumées (décalage de publication DVF ; DVF ignore état,
     étage, DPE). La transparence méthodologique est ce qui rend un chiffre
     citable.
   - **`Dernière mise à jour` visible** (« Mis à jour le 7 septembre 2026 ») et
     `dateModified` correspondant dans le JSON-LD.
   - **FAQ de 5 questions**, visible sur la page **et** en JSON-LD `FAQPage`
     — vérifié après build : les 5 `name`/`acceptedAnswer` sont bien présents
     dans le HTML servi (pas de mismatch).

4. **Chiffres publiés** (à réutiliser tels quels, ne pas les recalculer à la
   louche) :

   | Quartier (contour officiel) | Médiane 2025 | vs 2024 | vs 2022 | n 2025 |
   |---|---|---|---|---|
   | Ferrandière – Maisons-Neuves | 3 923 €/m² | +7,3 % | −2,0 % | 187 |
   | Gratte-Ciel – Dedieu – Charmettes | 3 846 €/m² | +1,2 % | −10,6 % | 655 |
   | Charpennes – Tonkin | 3 524 €/m² | −1,3 % | −13,2 % | 200 |
   | Perralière – Grandclément | 3 375 €/m² | +1,3 % | −11,4 % | 330 |
   | Buers – Croix-Luizet | 3 271 €/m² | +2,1 % | −11,5 % | 223 |
   | Cusset – Bonnevay | 3 171 €/m² | +3,1 % | −5,8 % | 213 |
   | Cyprian – Les Brosses | 2 738 €/m² | +3,4 % | −10,0 % | 53 |

   Villeurbanne entier, appartements : **3 567 €/m²** en 2025 (+1,5 % vs 2024,
   −10,4 % vs 2022), prix médian 195 000 €, surface médiane 62 m².
   Maisons : 4 186 €/m², prix médian 372 300 € (n = 85).
   Par typologie 2025 : T1 4 000 €/m² (115 000 €) · T2 3 830 (170 000 €) ·
   T3 3 494 (226 250 €) · T4 3 211 (255 000 €) · T5+ 2 967 (290 670 €).
   **Quartier Saint-Jean volontairement non publié** : 153 ventes seulement sur
   4 ans, échantillon trop mince pour une médiane annuelle honnête.

5. **Support technique ajouté** (additif, rien de cassé) :
   - `lib/blog.ts` : blocs `h3` et `table` (avec `caption` + `source`), champs
     `updated?` et `faq?` sur `Article`.
   - `components/blog/article-body.tsx` : rendu des tableaux (scroll horizontal
     **dans** le cadre, jamais de scroll de page — mobile-first) et des `h3`.
   - `app/blog/[slug]/page.tsx` : `dateModified = updated ?? date`, bandeau
     « Mis à jour le » sur `updated`, bloc FAQ visible + JSON-LD `FAQPage`
     généré **depuis le même tableau** que l'affichage (impossible de
     désynchroniser).
   - `app/sitemap.ts` : `lastModified` des articles sur `updated ?? date`.
   - **Maillage interne** : lien depuis `/agence-immobiliere-villeurbanne`
     (section « Villeurbanne, quartier par quartier ») vers le nouvel article.
   - `llms.txt` se met à jour tout seul (il dérive de `ARTICLES`) — vérifié :
     le nouvel `excerpt` chiffré y remonte.

**Contrôle qualité fait** : `npm run build` OK (81 pages), `npm run lint` sans
aucune remontée sur les fichiers touchés (les 39 erreurs restantes sont
pré-existantes, dans `scripts/` et `studio/`). HTML pré-rendu inspecté :
7 H2 en questions, 3 tableaux, 5 `<summary>`, `datePublished 2026-04-14` /
`dateModified 2026-09-07`, FAQPage ↔ FAQ visible cohérents.

**Vérifié en production après déploiement** (et pas seulement en local) :
`https://www.markusimmobilier.fr/blog/prix-immobilier-villeurbanne-2026` sert
bien les 3 tableaux, les 6 H2 en questions, les 5 entrées de FAQ, le
`BlogPosting` daté `2026-04-14 → 2026-09-07`, le `FAQPage` cohérent avec la FAQ
visible. `llms.txt` et `sitemap.xml` (`lastmod 2026-09-07`) ont suivi tout
seuls, et le lien depuis `/agence-immobiliere-villeurbanne` est en place.

---

## Chantiers en attente

Par ordre d'impact estimé. **Alterner les angles** — ne pas refaire deux jours
de suite un chantier « contenu blog ».

~~1. `<h1>` sur la home~~ — **fait au run n°2 du 2026-09-07.**
~~2. `logo` + `geo` dans `RealEstateAgent`~~ — **fait au run n°2 du 2026-09-07.**
~~3. Page dédiée « estimation immobilière Villeurbanne »~~ — **faite le 2026-09-08.**
~~4. Article `ou-acheter-villeurbanne-quartiers`~~ — **réécrit le 2026-09-09.**
~~5. Canonicals des pages légales + `/signin` noindex~~ — **fait le 2026-09-10**
(le canonical n'était pas manquant mais **faux** : il pointait vers la home).
~~6. Liens dans le corps des articles de blog~~ — **fait le 2026-09-10**
(syntaxe `[texte](href)` + 11 liens posés).
~~7. Réécrire `estimation-en-ligne-ou-agence`~~ — **fait le 2026-09-11**
(216 → 2 055 mots, dispersion DVF mesurée, FAQ, 2 liens entrants).
~~8. Renforcer `/agence-immobiliere-villeurbanne`~~ — **fait le 2026-09-12**
(404 → 1 261 mots, barème d'honoraires publié sur la page, FAQ de 6 Q/R,
2 liens entrants, `llms.txt` complété).
~~9. Données structurées `Person` sur `/equipe` + `employee`~~ — **fait le
2026-09-13**, avec trois compléments que la mesure a fait apparaître :
`OfferCatalog` du barème sur `/honoraires` (27 offres), `Blog` + `ItemList` des
26 articles sur `/blog`, et surtout **un `@id` unique pour l'agence** sur tout
le site. `/blog` avait bien le manque `Blog`/`ItemList` annoncé.

~~7. FAQ visible sur `/honoraires`~~ — **fait le 2026-09-15** (6 Q/R disjointes
de celles de `/agence-immobiliere-villeurbanne`, droit cité et daté, cas
locataire villeurbannais chiffré, `FAQPage`, `llms.txt` étendu).

~~10. Contenu des trois pages quartiers + maillage `/estimation` → quartiers~~
— **fait le 2026-09-15 (run n°2, session interactive)** : 350-650 mots → 1 295
à 1 443 mots par page, médianes DVF par quartier via la nouvelle source unique
`lib/quartiers.ts`, FAQ de 5 Q/R + `FAQPage` sur chacune, un angle distinct par
page, et les 6 liens sortants de `/estimation` qui manquaient. Un trou ouvert
depuis l'audit du 07/09.

~~5 (volet blog). Maillage interne depuis les articles~~ — **entamé le
2026-09-16, à moitié fait.** 9 articles ouverts, 14 liens posés, 6 → 14 articles
émetteurs sur 26. **Il reste 12 articles muets**, et c'est volontaire (règle des
petits lots). Les pages qui manquaient le plus de liens entrants contextuels
— `/honoraires` et les 3 pages quartiers — en ont désormais.

~~Sortir les 10 fiches fictives de l'index + `lastmod` véridique~~ — **fait le
2026-09-17** (sitemap 63 → 53 URLs, `noindex` sur les fiches de démo,
`data-nosnippet` sur le bloc placeholders de `/annonces`, table `PAGE_LASTMOD`).
Trouvé à l'étape 2, absent de tous les backlogs.

~~**NOUVEAU candidat — remettre `/gestion-locative` au niveau de `/faire-gerer`**~~
*(ouvert le 18/09)* — **FAIT le 2026-09-21** : 257 → 1 780 mots, 6 H2 en
questions réelles disjoints de ceux de `/faire-gerer`, angle « déléguer ou
gérer seul » traité par la **fiscalité** (micro-foncier / régime réel) et par
le **risque chiffré**, pas en refaisant le calcul du coût. FAQ de 6 Q/R,
`Service` + `FAQPage` + `BreadcrumbList`, `llms.txt` réécrit, `lastmod` au
21/09. La consigne « ne pas dupliquer les 6 H2 ni la FAQ de `/faire-gerer` »
a été tenue et le partage de rôles est désormais écrit en en-tête des deux
fichiers.

~~**Point 2 (a) — réécriture de `rentabilite-locative-lyon`**~~ — **FAIT le
2026-09-23** : 231 → 2 379 mots, rendement brut des 7 quartiers calculé sur les
prix DVF signés, colonne « frais de notaire inclus », second tableau qui
convertit chaque charge en points de rendement, volet encadrement des loyers
sourcé sur le TA de Lyon et deux `.gouv.fr`, FAQ de 6 Q/R. **La moitié `b` du
point 2 reste ouverte** : `investir-locatif-lyon` sert toujours **225 mots** et
4 H2 sans chiffre, mesurés en production ce matin. Il reçoit désormais un lien
de corps vers son frère réécrit, mais il n'a été ni réécrit ni daté.
**C'est le meilleur candidat contenu du backlog après aujourd'hui** — angle
libre, à ne surtout PAS reprendre celui du 23/09 : l'article de rendement a
pris le calcul, les frais d'acquisition, l'encadrement et la taxe foncière.
L'angle qui reste et que le site possède : **ce que Villeurbanne offre qu'un
investisseur ne trouve pas dans les arrondissements lyonnais**, en croisant nos
médianes DVF avec la liquidité par quartier (nombre de ventes 2025, de 53 à
655) et la résistance des prix depuis 2022 — deux séries que nous avons déjà
et que personne ne publie en regard l'une de l'autre.

**Angle du dernier run : contenu blog** (23/09, `rentabilite-locative-lyon`).
Angle précédent : maillage interne (22/09, algorithme des articles
liés + 11 liens de corps). Puis : contenu sur une page de fond
(21/09, `/gestion-locative`). Puis : technique (20/09, balises d'aperçu),
contenu (18/09, `/faire-gerer`), technique (17/09), maillage (16/09), contenu
(15/09, deux fois), données structurées (13/09), page « argent » (12/09),
contenu blog (11/09).
→ ~~**Le prochain run (mercredi 23/09) peut être un run de contenu**~~ —
**fait, c'en était un.** Le run du **jeudi 24/09 ne doit donc PAS être un run
de contenu** (règle : pas deux d'affilée). Candidats pour le 24/09, dans
l'ordre : **(c) un run technique côté données**, ou **le maillage** vers
`/blog/rentabilite-locative-lyon`, qui vient d'être publié et n'a pour l'instant
qu'**un seul lien de corps entrant**. Candidats d'origine conservés ci-dessous :
(a) ~~**la réécriture de `investir-locatif-lyon` / `rentabilite-locative-lyon`**
    (point 2)~~ — **moitié faite le 23/09**, voir ci-dessus. ⚠️ **La
    justification écrite ici le 22/09 s'appuyait sur une attribution non
    vérifiée** (« CPIM publiait Charpennes 5 120 €/m² ») : voir « Techniques
    apprises » du 23/09 et « Hypothèses à vérifier ». L'angle retenu le 23/09
    ne repose pas dessus ;
(b) **un article mince réécrit** parmi les 23 (voir le classement ci-dessous) ;
(c) **un run technique** : il n'y a plus de blocage de crawl à chercher —
    l'audit du 22/09 a vérifié en-têtes `X-Robots-Tag`, `robots.txt`, cohérence
    `www` du sitemap, statut des 53 URLs et **réponse servie à Googlebot,
    GPTBot et PerplexityBot** (identique à l'octet près à celle d'un
    navigateur). Tout est sain. Le seul angle technique restant qui vaille un
    run est côté **données**, pas côté crawl.
→ **Le protocole du test d'indexation profonde est suspendu** (voir
« Techniques apprises », 22/09) : l'outil de recherche de ce runner n'honore ni
`site:` ni les guillemets d'exactitude, donc ses huit « absences » ne
démontrent aucun blocage. **Ne pas déclencher la consigne du 13/09 le 27/09.**
→ **Point 1 (Search Console) remonté encore d'un cran le 22/09** : ce n'est
plus seulement « de meilleures mesures », c'est désormais **la seule façon de
répondre à la question que ce journal traîne depuis neuf jours** — les pages
profondes sont-elles indexées ? Aucun outil disponible ici ne sait le dire.
→ **Remonté d'un cran par la veille du 21/09** : le point 3 (fiche Google
Business Profile) n'est plus « un levier parmi d'autres ». Sur les requêtes
locales, c'est la fiche GBP que l'IA cite, avant le site (Profound : google.com
2ᵉ domaine le plus cité d'AI Mode ; Sterling Sky : les AI local packs font
apparaître 32 % seulement des entreprises des map packs). **Aucun chantier de
contenu ne compensera son absence.** À remonter au client avec le point 1.
→ ⚠️ **Nuance apportée le 22/09 à ce qui précède** : ce journal a écrit six
runs de suite que la SERP « agence immobilière Villeurbanne » était « 9 sur 9
des annuaires ou des franchises » et qu'« aucune agence indépendante n'y entre ».
**C'est faux.** Le compte exact du 22/09 est 6 (PagesJaunes + 5 franchises)
contre **3 indépendantes locales** : Salengro, Immo de France et Decultieux,
fondée en 1962. Des indépendantes classent donc très bien — elles sont
anciennes et ancrées. Ce qui nous sépare d'elles n'est pas un statut mais de
l'ancienneté de domaine et de la notoriété locale. La fiche GBP reste le
levier ; l'argument « la SERP est fermée aux indépendantes » doit disparaître.
→ **Mesure du 20/09 qui pèse sur ce choix, et qui n'avait jamais été faite en
une fois** : sur les 26 articles téléchargés en production, **23 font entre 165
et 433 mots rendus**, sans FAQ, sans date de mise à jour visible, sans chiffre
local ; les 3 réécrits (07, 09 et 11/09) font 1 758 à 2 230 mots. **23 des 53
URLs du site sont donc du contenu mince** — c'est, en volume, le premier passif
du site, et au rythme d'un article par run il faut cinq mois pour le résorber.
**Classement complet, mesuré sur le HTML rendu en production le 20/09** (mots
dans `<main>`, hors en-tête et pied de page) — le scratchpad d'un run ne
survit pas, donc il est recopié ici :
`charges-copropriete` 165 · `loi-carrez-surface` 173 · `lmnp-location-meublee`
175 · `faire-offre-achat` 181 · `diagnostics-obligatoires-vente` 185 ·
`home-staging-vendre-plus-cher` 190 · `achat-immobilier-lyon-checklist` 191 ·
`compromis-de-vente-delais` 191 · `vendre-vite-lyon` 197 ·
`questions-a-poser-visite` 200 · `plus-value-immobiliere-calcul` 203 ·
`taxe-fonciere-vente-qui-paie` 211 ·
`gestion-locative-villeurbanne-deleguer-ou-non` 227 · `investir-locatif-lyon`
229 · `rentabilite-locative-lyon` 229 · `vendre-appartement-lyon-etapes` 233 ·
`mandat-simple-ou-exclusif` 234 · `capacite-emprunt-immobilier` 262 ·
`dpe-2026-ce-qui-change` 269 · `cout-gestion-locative` 284 ·
`vendre-sans-agence` 336 · `frais-de-notaire-lyon-2026` 349 ·
`comment-estimer-son-bien-immobilier-lyon-villeurbanne` 433.
Puis les trois réécrits : `prix-immobilier-villeurbanne-2026` 1 758 ·
`ou-acheter-villeurbanne-quartiers` 2 099 · `estimation-en-ligne-ou-agence`
2 230. **Seuls ces trois-là portent un `FAQPage`** ; les 23 autres n'ont que
`BlogPosting` + `BreadcrumbList`.
→ **Règle d'origine conservée** : pas deux runs de contenu d'affilée.

~~**Candidat n°1 — renforcer `/faire-gerer`**~~ *(ouvert le 17/09)* — **FAIT le 2026-09-18** : 290 → 1 919 mots, 6 H2 en questions, chiffrage complet de la gestion sur un cas villeurbannais, volet syndic traité **sans inventer de tarif** (contrat type, forfait voté en AG, article 21), FAQ de 6 Q/R, `Service` + `FAQPage` + `HowTo` + `BreadcrumbList`, entrée `llms.txt` créée. Le point 8 (baliser la page en `Service`) est absorbé au passage. *(Texte d'origine conservé ci-dessous : son diagnostic de SERP reste la référence.)*

**Diagnostic d'origine du 17/09.**
Mesuré aujourd'hui : la page fait **290 mots, 2 H2, aucun JSON-LD propre**
(seulement le `RealEstateAgent` du gabarit) — c'est, rapportée à son enjeu, la
page stratégique la plus faible du site depuis que
`/agence-immobiliere-villeurbanne` a été reprise le 12/09. Et sa SERP, mesurée
le même jour, est **ouverte pour la même raison que celles du 15/09 et du
16/09** : les 9 résultats (Orpi Key Solutions, Laforêt, PagesJaunes ×2, Square
Habitat, Manda, C&F Gestion, Immo de France, mairie.com) **ne publient aucun
tarif**. Le site, lui, a le barème complet à un clic — et il a déjà écrit les
bonnes phrases dans deux articles le 16/09. Angle : ce que coûte la gestion
(6 % des encaissements, min. 25 €/lot, GLI 2,5 %, débours 20 €/an, 45 €/lot/an
si courrier postal), ce que le mandat couvre, et le cas syndic. Ce chantier
peut absorber le point 8 (baliser la page en `Service`) au passage.

**NOUVEAU candidat — remettre `/gestion-locative` au niveau de `/faire-gerer`**
*(ouvert le 18/09)*. Constat fait en écrivant le chantier du jour : la page
`/gestion-locative` (gabarit `SeoLanding`, 3 sections) répond à la question du
prix par *« nos honoraires sont calculés sur les loyers réellement encaissés et
sont en partie déductibles »* — **aucun taux, aucun euro, aucune FAQ, pas de
date de mise à jour**, alors que la page sœur chiffre désormais tout. Elle
reçoit pourtant un **lien sitewide depuis le footer**, ce que `/faire-gerer`
n'a pas. Chantier de contenu, à ne pas enchaîner tout de suite (deux runs de
contenu d'affilée), mais c'est le meilleur candidat « contenu » du backlog
après aujourd'hui. Attention en le traitant : **ne pas dupliquer** les 6 H2 de
`/faire-gerer` ni sa FAQ — l'angle libre est « déléguer ou gérer soi-même »,
chiffré (coût de la gestion vs temps passé), pas « combien ça coûte » à
nouveau.

Les deux candidats posés le 16/09, qui restent valables ensuite :
- **un run technique** — le point 8 (baliser `/faire-gerer`, `/recrutement`,
  `/annonces`) est petit mais c'est du confort ; plus utile serait de chercher
  **un blocage technique d'indexation** si le test profond est encore négatif
  après le ~27/09 (voir ci-dessous) ;
- **la réécriture de `investir-locatif-lyon` / `rentabilite-locative-lyon`**
  (point 2), dont l'angle est déjà arrêté et documenté — mais c'est du contenu
  blog, donc **pas avant un run d'un autre type**.

**⚠️ Re-priorisation du 15/09, motivée par la veille, pas par une intuition.**
L'étude Seer (mai 2026) trouve que le **schema FAQ/HowTo ne corrèle pas** avec
la citation en AI Overview, alors que **les liens internes** et **les citations
de sources officielles (.gov/.edu)** corrèlent positivement. Conséquences :
- le point **5 (maillage : 6 articles sur 26 seulement émettent un lien)** monte
  au rang de chantier prioritaire, il n'est plus un « complément » ;
- le point **8 (baliser les 3 dernières pages)** descend : c'est du confort, pas
  un levier de citation ;
- **ne plus ouvrir de chantier dont la justification principale est « ajouter du
  schema »**. Le balisage reste bienvenu quand il accompagne du contenu ; il ne
  vaut plus un run à lui seul.

**À faire en premier au prochain run** : remesurer le **nouveau** test
d'indexation profonde (`Villeurbanne estimation "erreur médiane" 15,5 % prix au
m² quartier ventes DVF 2025`). Posé le 13/09, **2 mesures, 2 absences** (la
seconde le 15/09, à J+2 — rien à en conclure encore).
**Échéance du protocole : ~27/09.** Négatif après cette date ⇒ arrêter d'écrire
et chercher un blocage technique d'indexation.

**Nouveau, à mesurer à partir du prochain run** : `qui paie les honoraires
d'agence immobilière vente Villeurbanne` — c'est la requête du chantier du
15/09, mesurée absente le jour même (SERP 100 % nationale et générique). C'est
aussi **le meilleur test de la thèse « on peut être cité sans classer »** que la
veille du 15/09 vient d'établir : la page ne vise pas la 1ʳᵉ page Google, elle
vise la citation. **Ne pas la juger avant deux semaines** (~29/09).

1. **Créer la propriété Google Search Console** + poser
   `GOOGLE_SITE_VERIFICATION` dans Vercel + soumettre le sitemap. **Action
   client**, mais c'est ce qui débloquera de vraies mesures de position à la
   place des recherches web approximatives. À rappeler. **Priorité montée d'un
   cran le 10/09** : le test d'indexation profonde pose une question (les pages
   profondes sont-elles indexées ?) que **seule GSC peut trancher**. On tourne
   à l'aveugle sur ce point précis.

2. **Réécrire un article faible** — il en reste deux, aucun n'a de FAQ ni de
   champ `updated` :
   - `investir-locatif-lyon` — ~227 mots, **aucun chiffre** ;
   - `rentabilite-locative-lyon` — ~194 mots ; il n'a qu'un **exemple fictif**
     (150 000 € / 650 € / 5,2 %), pas de donnée de marché. On dispose pourtant
     du loyer médian communal (14,6 €/m² HC) et des prix par typologie.

   **Ne pas les enchaîner** : un par semaine au plus, en alternance avec des
   chantiers techniques. **Pas avant un run technique**, le 11/09 était déjà un
   run de contenu.

   > Piste pour ces deux-là, sortie du chantier du 11/09 : la méthode
   > « dispersion » se transpose au locatif. On ne peut pas publier un
   > rendement par quartier (un seul loyer de référence, communal — voir
   > 09/09), mais on peut publier **la dispersion des prix d'achat par
   > typologie**, déjà calculée, et en déduire honnêtement **une fourchette de
   > rendement** au lieu d'un chiffre unique faussement précis.
   >
   > ⚠️ **Corrigé le 12/09 par la mesure de SERP** : la piste ci-dessus reste
   > vraie mais elle est **insuffisante**. La SERP « investir locatif
   > Villeurbanne » est **fermée** — les six résultats publient déjà prix et
   > rendements par quartier. Publier « encore des chiffres » n'y suffira pas.
   > **Le seul angle libre trouvé** : ces sites annoncent des prix nettement
   > au-dessus des ventes réelles (CPIM : « Charpennes 5 120 €/m² » contre
   > 3 524 €/m² en DVF sur Charpennes – Tonkin, soit 45 % d'écart). Mesurer et
   > publier **l'écart entre prix affichés par les sites d'investissement et
   > prix réellement payés** est faisable avec nos données et n'existe nulle
   > part. C'est ça, le sujet de ces deux articles.

6. **Afficher une fourchette de dispersion dans le résultat de l'outil
   d'estimation.** Les données existent désormais (P25–P75 par quartier et par
   typologie, ventes 2025). Dire « votre quartier affiche X à Y €/m² sur les
   ventes réelles » rendrait le rapport nettement plus crédible et réutiliserait
   le travail du 11/09. **Mais c'est le bloc de résultat de l'outil** : la
   consigne client est « il faut juste rien casser ». → **à soumettre au client
   avant de coder quoi que ce soit.**

3. **Fiche Google Business Profile** — constat de SERP reconfirmé le 10/09 : les
   requêtes « agence immobilière Villeurbanne / Gratte-Ciel » sont tenues par
   des annuaires et des franchises (sur Gratte-Ciel, **Superimmo apparaît deux
   fois** dans le top 8). Sur celles-là, le contenu du site ne suffira pas ; le
   levier est la fiche GBP + les citations d'annuaires (PagesJaunes, Superimmo,
   MeilleursAgents…). **Action client**, à remonter avec le point 1.

7. **FAQ visible sur `/honoraires`** *(ouvert le 13/09)* — la page porte
   désormais son barème en `OfferCatalog`, mais elle ne répond toujours pas aux
   questions que les gens posent autour du prix : « qui paie les honoraires
   d'agence ? », « sont-ils négociables ? », « sont-ils dus si la vente ne se
   fait pas ? », « que couvre exactement le pourcentage ? ». Réponses factuelles
   possibles sans rien inventer (barème + mandat + usage), FAQ visible + `faqLd()`
   sur le même tableau. **Bon candidat pour un prochain run de contenu**, et il
   complète le chantier du 13/09 au lieu de le répéter.

8. **Baliser `/faire-gerer`, `/recrutement`, `/annonces`** *(ouvert le 13/09)* —
   les trois dernières pages sans JSON-LD spécifique. Candidats naturels :
   `Service` sur `/faire-gerer`, `JobPosting` sur `/recrutement` **seulement si
   une offre réelle et datée y est affichée** (sinon s'abstenir : un `JobPosting`
   sans poste ouvert est trompeur), `ItemList` des annonces sur `/annonces`.
   Petit chantier, à grouper avec autre chose.

~~4. **Données structurées `Person` sur `/equipe` + `employee` sur l'agence**~~ —
**FAIT le 2026-09-13.** *(Texte d'origine conservé ci-dessous : il explique
pourquoi cet item a remplacé « auteur humain », et cette raison reste valable.)*
—
   **remplace l'ancien item « bloc auteur + `author` humain sur les articles »,
   qui est écarté** (voir « Erreurs commises », 12/09 : attribuer la rédaction
   des articles à Tony Pistilli serait une affirmation fausse, et le client a
   interdit d'inventer). Ce qui est en revanche **entièrement factuel et
   toujours pas balisé** : `/equipe` affiche déjà Tony PISTILLI (fondateur,
   CEO – agent immobilier) et David PISTILLI (conseiller), avec e-mail et
   téléphone directs. Les baliser en `Person` et les rattacher en `employee`
   du `RealEstateAgent` ne fait que **structurer ce qui est déjà visible** —
   aucun risque factuel. Vérifié le 12/09 : `/equipe` ne sert **aucun** JSON-LD
   spécifique, seulement le `RealEstateAgent` du layout. **Meilleur candidat
   pour le prochain run** (petit, sûr, angle « données structurées » jamais
   servi). Même famille : `/blog` ne sert ni `Blog` ni `ItemList`.

~~5bis. **Finir le maillage : 12 articles n'émettent toujours aucun lien**~~
   — **à moitié fait le 2026-09-22** : 6 des 12 traités, 11 liens posés,
   28 → 40 liens de corps sur le blog. **Restent 6 articles muets**
   (`home-staging-vendre-plus-cher`, `compromis-de-vente-delais`,
   `charges-copropriete`, `questions-a-poser-visite`, `loi-carrez-surface`,
   `lmnp-location-meublee`) et c'est volontaire : **aucune phrase n'y appelle
   un lien aujourd'hui**. Les rouvrir n'a de sens que le jour où l'un d'eux est
   réécrit — un article de 165 mots n'a pas la matière pour porter un lien
   contextuel honnête. ⚠️ **Et ce point regardait dans le mauvais sens** : le
   vrai trou du maillage n'était pas l'émission mais la **réception** (18
   articles ne recevaient aucun lien d'un frère), corrigé le 22/09 par
   l'algorithme cyclique. *(Énoncé d'origine conservé ci-dessous.)*

   *(état au 16/09)*. Ce sont les plus courts et les plus génériques
   (`dpe-2026-ce-qui-change`, `diagnostics-obligatoires-vente`,
   `achat-immobilier-lyon-checklist`, `taxe-fonciere-vente-qui-paie`,
   `plus-value-immobiliere-calcul`, `home-staging-vendre-plus-cher`,
   `compromis-de-vente-delais`, `faire-offre-achat`, `charges-copropriete`,
   `questions-a-poser-visite`, `loi-carrez-surface`, `lmnp-location-meublee`).
   **Ne pas les traiter d'un bloc** : un lot de 5-6, en complément d'un autre
   chantier, et seulement là où la phrase l'appelle. Sur plusieurs d'entre eux
   (`loi-carrez-surface`, `charges-copropriete`) **aucune phrase ne l'appelle
   aujourd'hui** — forcer un lien y serait de la sur-optimisation, pas du
   maillage.

*(Texte d'origine du point 5, conservé : sa règle vaut toujours.)*

5. **Étendre le maillage aux 20 articles non touchés le 10/09.**
   *(Non avancé le 12/09 : le chantier du jour a posé ses liens sur les pages
   quartier, pas dans le blog. Toujours 6 articles sur 26 qui émettent un lien.)* La syntaxe
   existe désormais, mais seuls 6 articles sur 26 émettent un lien. **À faire
   par petits lots** (5-6 articles par run, en complément d'un autre chantier),
   jamais d'un coup : poser 40 liens en une fois, sur des ancres proches, est un
   motif de sur-optimisation. Règle appliquée le 10/09 à conserver : **un lien
   seulement là où la phrase existante l'appelle déjà**.

---

## Hypothèses à vérifier

- 🔴 **« CPIM : Charpennes 5 120 €/m² » est-il un chiffre vérifié ou un résumé
  de moteur ?** *(23/09)* Cette valeur est entrée dans le journal le 12/09, a
  été recitée le 22/09 comme justification d'un chantier, et elle est
  aujourd'hui **écrite en dur dans l'en-tête de commentaire de
  `app/agence-immobiliere-charpennes/page.tsx`** (« les sites d'investissement
  y annoncent des prix très au-dessus des ventes réelles »). Aucune entrée du
  journal ne dit qu'elle a été relevée sur la page elle-même. Or le run du
  23/09 a démontré que le résumé du moteur **fabrique des attributions
  chiffrées** (voir « Techniques apprises »). **À vérifier au prochain run en
  téléchargeant la page CPIM Charpennes.** Si elle ne publie pas ce prix, la
  mention doit sortir du code — elle n'est pas affichée au lecteur, mais elle
  sert de justification à un contenu publié. Priorité : c'est la seule
  affirmation du site qui nomme un concurrent.

- **La règle « pas deux runs de contenu d'affilée » tient-elle encore ?**
  *(23/09)* Elle a été posée le 16/09 pour éviter de ne faire que du blog. Mais
  la mesure du 20/09 a chiffré le passif : **23 des 53 URLs du site sont du
  contenu mince**, et à un article par run alterné, il faut **dix mois**, pas
  cinq, pour le résorber. Question ouverte, à ne pas trancher sur une
  intuition : vaut-il mieux garder l'alternance, ou grouper 2–3 runs de contenu
  d'affilée puis 2–3 runs techniques ? **Aucune donnée ici ne permet de
  répondre** — il faudrait voir si les articles réécrits (07, 09, 11 et 23/09)
  gagnent des positions, ce qu'aucun outil disponible dans ce conteneur ne sait
  mesurer. **Se rattache au point 1 (Search Console).** En attendant, la règle
  est conservée telle quelle.

- **Faut-il ajouter `/faire-gerer` au pied de page ?** *(22/09)* Mesuré
  aujourd'hui sur le graphe des liens rendus : `/gestion-locative` reçoit **52
  liens entrants** (elle est au footer, donc sitewide) quand `/faire-gerer` n'en
  reçoit que **5**, alors que les deux pages sont sœurs, font toutes deux ~1 800
  mots depuis les 18 et 21/09, et se partagent explicitement les rôles (écrit en
  en-tête des deux fichiers). L'écart de maillage ne reflète donc plus un écart
  de valeur. **Pas fait** : c'est un changement **sitewide sur 53 pages**, pris
  sur une mesure du jour, et le footer est un composant partagé — la règle
  « en cas de doute sur le rendu, ne pas le faire » s'applique. À trancher avec
  le client : soit `/faire-gerer` entre au footer à côté de sa sœur, soit les
  deux pages fusionnent, soit `/gestion-locative` devient la seule porte
  d'entrée et `/faire-gerer` son approfondissement (auquel cas c'est un lien
  contextuel depuis `/gestion-locative` qu'il faut, pas un lien de footer).
- **Le bloc « À lire aussi » doit-il traverser les groupes ?** *(22/09)* Le
  cycle posé aujourd'hui reste **à l'intérieur** d'un groupe (`internalHref`),
  ce qui garde la cohérence thématique mais enferme chaque groupe sur lui-même :
  aucun article `/acheter` ne pointe vers un article `/vendre`. Les 11 liens de
  corps posés aujourd'hui traversent, eux, les groupes (« charges » depuis la
  check-list d'achat, « frais d'acquisition » depuis la plus-value). Faut-il
  qu'une des deux cartes vienne d'un autre groupe ? **Non tranché** : ça se
  mesure, pas ça s'intuitionne, et il faut d'abord voir ce que le cycle donne.
  Ne pas y toucher avant plusieurs semaines.

- **Faut-il une version anglaise du site, ou retirer la mention FR/EN ?**
  *(20/09)* `CLAUDE.md` liste une bascule **FR/EN (i18n)** dans les
  redirections attendues. Mesuré aujourd'hui : **aucune page du site ne sert de
  `hreflang`, et il n'existe aucune URL en anglais.** C'est cohérent — déclarer
  un `hreflang` vers des pages inexistantes serait une erreur technique, pas
  une amélioration, et **rien n'a donc été ajouté**. Mais la question reste
  ouverte côté client : soit une version anglaise est réellement prévue (et
  alors `hreflang` + `x-default` se posent le jour où les pages existent), soit
  la ligne de `CLAUDE.md` est un reliquat de cadrage. **À trancher avec le
  client, pas dans un run.** Enjeu SEO réel mais secondaire : la clientèle
  visée est villeurbannaise.

- **Les balises d'aperçu corrigées le 20/09 changent-elles quelque chose de
  mesurable ?** *(20/09)* Honnêtement : **`og:image` et `og:url` ne sont pas
  des facteurs de classement**, et le chantier du jour ne doit pas être présenté
  comme tel. Ce qu'il corrige est réel — 37 pages sans image d'aperçu, 8 pages
  qui déclaraient l'URL de la home comme la leur, un `article:modified_time`
  absent alors que la date existait — et ce qu'il touche est lu par les
  prévisualiseurs de liens, les robots d'IA et les outils de partage, pas par
  l'algorithme de classement. **À ne pas remesurer en SERP** : il n'y a rien à
  y voir. Si un effet existe, il sera sur la fraîcheur perçue des articles
  (`article:modified_time`), et il ne se mesure pas en position.

- **Le client veut-il publier un tarif de syndic ?** *(18/09)* La page
  `/faire-gerer` explique désormais **pourquoi** un forfait de syndic ne peut
  pas être affiché à l'avance (contrat type, vote en AG) — c'est vrai, et c'est
  ce qui la distingue des neuf résultats nationaux qui donnent une moyenne sans
  source. **Mais** rien n'interdirait à l'agence de publier un ordre de grandeur
  *observé sur ses propres copropriétés* (forfait par lot, fourchette),
  exactement comme elle publie son barème de gestion. Ce serait le seul chiffre
  local sur cette requête. **Ne rien écrire tant que le client n'a pas fourni
  ces données** : les inventer est exclu.
- **La médiane de surface (62 m²) est celle des appartements VENDUS, pas des
  appartements LOUÉS** *(18/09)*. Le cas de référence de `/faire-gerer` croise
  donc une surface issue de DVF 2025 et un loyer au m² issu de la carte des
  loyers : c'est un **ordre de grandeur honnête et une hypothèse explicite sur
  la page** (« votre bien n'est pas la médiane : le calcul se refait sur votre
  loyer réel »), pas une mesure du parc locatif. Si une source publique donne un
  jour la surface médiane des logements loués à Villeurbanne, la remplacer et
  redater la page.

- 🔴 **Les 10 biens de démonstration — trois questions à poser au client**
  *(17/09)*. Ce sont des placeholders inventés (`lib/mock-properties.ts`,
  en-tête « à remplacer par data réelle ») qui restent **visibles** sur
  `/annonces`, sous un encart honnête et sans lien cliquable. Le run a coupé
  toute exposition aux moteurs (hors sitemap, `noindex`, `data-nosnippet`) et
  **n'a rien changé à l'écran**, conformément à la consigne. Restent trois
  décisions qui appartiennent au client :
  1. **Garde-t-on des biens fictifs sur le site public ?** Avec 6 vraies
     annonces, la grille se tient sans eux. Les retirer est un changement de
     rendu, donc pas une décision de run.
  2. **Si on les garde, faut-il un avertissement sur les fiches de détail ?**
     Elles affichent « À vendre — 1 250 000 € » sans aucune mention de démo :
     c'est la seule surface du site où la fiction n'est pas signalée. Elles ne
     sont plus atteignables que par URL directe, mais l'incohérence reste.
  3. **Le jour où de vrais mandats les remplacent**, trois choses se défont
     ensemble : le `noindex` de `app/annonces/[id]/page.tsx`, le
     `data-nosnippet` de `app/annonces/page.tsx`, et il faudra remettre ces
     URLs dans le sitemap. Un commentaire le rappelle aux trois endroits.
- **`PAGE_LASTMOD` (`app/sitemap.ts`) est un couplage manuel assumé**
  *(17/09)* : quand un run modifie vraiment le contenu d'une page statique, il
  doit avancer sa date dans cette table — comme le champ `updated` d'un
  article. **Oublier est bénin** (Google recrawle quand même) ; ce qui nuisait,
  et qui est corrigé, c'est de déclarer 21 pages modifiées à chaque
  déploiement. Les articles de blog et les annonces ne sont pas concernés :
  leurs dates sont déjà générées depuis leurs propres champs.
- **Trois articles de blog citent désormais le BARÈME, en clair** *(16/09)* :
  `cout-gestion-locative` et
  `gestion-locative-villeurbanne-deleguer-ou-non` (gestion **6 %**, min. 25 €,
  débours **20 €/an**, correspondance **45 €/lot/an**, GLI **2,5 %**) et
  `vendre-sans-agence` (**9 000 €** forfaitaires, **6 %**, **5 %**, ≈ **11 700 €**
  sur 195 000 €). **Si le client change son barème, ces trois textes doivent
  bouger avec `app/honoraires/page.tsx`**, en plus des deux pages déjà listées
  plus bas et de la ligne `/honoraires` de `app/llms.txt/route.ts`. Un
  commentaire en tête de `lib/blog.ts` le rappelle, et c'est un couplage
  **manuel assumé** : un texte rédigé ne se génère pas depuis un tableau de
  tarifs.
- **Trois articles de plus citent une dérivation des médianes DVF** *(16/09)* :
  `vendre-sans-agence` et `frais-de-notaire-lyon-2026` (prix médian
  **195 000 €**), `capacite-emprunt-immobilier` (**250 000 € = 65 m² à
  Gratte-Ciel / 91 m² à Cyprian – Les Brosses**). Ils rejoignent la liste des
  pages à refaire **dans le même run** au prochain recalcul DVF (voir plus bas).
  Aucun ne recalcule quoi que ce soit : tous reprennent un chiffre déjà publié.
- **« 6 à 8 % TTC » corrigé en « 6 à 8 % » dans deux articles** *(16/09)*, et
  c'est délibéré : les sources qui publient cette fourchette de marché
  l'annoncent **HT**, notre barème est affiché **TTC**. L'ancien texte mélangeait
  les deux bases sans le dire. Écrire la fourchette sans base et notre taux avec
  la sienne est la seule formulation qui ne soit pas trompeuse. **Ne pas
  « rétablir » le TTC** sur la fourchette de marché lors d'une relecture future.

- 🔴 **La part locataire du barème n'a pas été réindexée sur les plafonds 2026 —
  à remonter au client** *(15/09)*. Les trois montants affichés (**8 / 10 /
  12 €/m²** selon la zone) et les **3 €/m²** d'état des lieux sont **exactement
  les plafonds légaux d'avant 2026**. Ces plafonds ont été revalorisés au
  **1ᵉʳ janvier 2026** et sont désormais indexés sur l'IRL : **8,07 / 10,09 /
  12,10 €/m²** et **3,03 €/m²** (arrêtés des 17 juillet et 20 novembre 2025,
  +0,87 % après onze ans de gel), applicables aux **baux signés à compter du
  1ᵉʳ janvier 2026**.
  **Rien n'a été modifié, et rien ne doit l'être sans le client** : le barème
  est **parfaitement légal tel quel** — il est *sous* le plafond — et le montant
  facturé est une décision commerciale. Deux conséquences si le client décide
  de réindexer : (1) les montants changent dans `LOCATION_LOCATAIRE`
  (`app/honoraires/page.tsx`), **et le JSON-LD suit automatiquement** ; (2) mais
  la **FAQ posée le 15/09 cite « 10 €/m² », « 3 €/m² » et « 585 € pour un T2 de
  45 m² » en clair** — ces trois valeurs devraient être mises à jour **dans le
  même run**, sinon la page se contredit. C'est le seul couplage manuel
  introduit aujourd'hui, et il est volontaire (un calcul d'exemple ne se génère
  pas depuis un tableau de tarifs sans compliquer le code plus que ça ne vaut).
  **À poser en même temps que la question sur la date du barème et sur le PDF.**

- **Depuis quand le barème d'honoraires est-il en vigueur ? — à demander au
  client** *(13/09)*. **Toujours ouvert au 15/09**, mais **contourné** : la page
  porte désormais « Références légales vérifiées le 15 septembre 2026 », avec la
  mention explicite que cette date **ne préjuge pas** de l'entrée en vigueur du
  barème. La routine a donc sa date visible sans attestation mensongère. Ce qui
  reste bloqué tant que le client n'a pas répondu : le `priceValidUntil` de
  l'`OfferCatalog`. `/honoraires` n'affiche aucune date, et le run ne peut pas
  en inventer une. Deux conséquences : (1) pas de « Dernière mise à jour » sur
  cette page, alors que la routine la demande sur les pages de fond ; (2) le
  balisage `OfferCatalog` posé aujourd'hui **n'a pas de `priceValidUntil`**, qui
  serait pourtant le champ le plus utile pour un moteur de réponse. Dès que le
  client donne une date d'entrée en vigueur, les deux se règlent d'un coup.
  À poser en même temps que la question sur le PDF (voir plus bas).

- **`/equipe` n'a aucun `<h2>`** *(13/09)*. La page est construite en `<h1>` puis
  `<h3>` de cartes. Pour un LLM, elle n'a donc aucun point d'extraction
  intermédiaire — c'est contraire à la règle GEO « chaque H2 ouvre par une
  réponse autonome ». **Non corrigé le 13/09 volontairement** : c'était un run
  de balisage, dont l'engagement était de ne toucher à aucun rendu. À traiter le
  jour où cette page sera reprise pour son contenu (elle ne fait que ~290 mots).

- **Les agrégateurs publient des quartiers qui ne sont pas les nôtres**
  *(13/09)*. Sur la SERP du nouveau test, un agrégateur donne « Perralliere »
  comme quartier **le plus cher** de Villeurbanne à 3 955 €/m², là où nos ventes
  DVF 2025 donnent **Perralière – Grandclément à 3 375 €/m²** et placent
  Ferrandière – Maisons-Neuves en tête (3 923). **Ce n'est pas une contradiction
  de nos chiffres** : périodes différentes (« 12 derniers mois » vs année 2025)
  et surtout **périmètres différents** — nous utilisons les contours officiels
  de la Métropole, eux un découpage maison. Rien à corriger. Mais si un client
  ou un lecteur oppose un jour ces chiffres aux nôtres, **la réponse est la
  méthode publiée**, et c'est une raison de plus de ne jamais la retirer des
  articles.

- 🔴 **Le test d'indexation profonde du 10/09 n'est plus valide** *(constaté le
  12/09)*. Il supposait que la médiane « 3 923 €/m² à Ferrandière –
  Maisons-Neuves » n'était publiée que par nous. **Faux depuis** :
  bien-estimer/safti publie **3 911 €/m²** sur ce quartier. Une absence sur
  cette requête ne prouve donc plus rien. **Le protocole « si c'est encore
  négatif après le ~21/09, chercher un blocage technique » ne tient plus sur ce
  test** ; il doit être rebâti sur un chiffre que la concurrence ne peut pas
  produire — les chiffres de **dispersion** du 11/09 (P25–P75 par quartier,
  erreur médiane 15,5 %, taux 18/36/62 %) sont les seuls candidats sérieux.
  **La question de fond reste entière et reste la n°1 du site** : les pages
  profondes sont-elles indexées ? Seule GSC peut trancher (backlog n°1).

- **Une cinquième page publie maintenant une dérivation des médianes DVF**
  *(12/09)* : `/agence-immobiliere-villeurbanne` cite la médiane communale
  (3 567 €/m²), l'amplitude par quartier (2 738 – 3 923 €/m²) et le prix médian
  (195 000 €), ce dernier servant au calcul « ≈ 11 700 € TTC d'honoraires ».
  **À refaire en même temps que les quatre autres** au prochain recalcul DVF
  (liste ci-dessous) — et attention, sur cette page le prix médian n'est pas
  qu'affiché : **il alimente un calcul d'honoraires**. S'il change de tranche de
  barème (la tranche 6 % court de 170 001 à 300 000 €), le pourcentage cité
  change aussi.

- **Le barème d'honoraires de vente est désormais cité sur deux pages**
  *(12/09)* : `/honoraires` (page canonique, tableau complet + PDF) et
  `/agence-immobiliere-villeurbanne` (3 tranches sur 8, citées en texte).
  **Si le client change son barème, les deux doivent bouger ensemble**, plus la
  ligne `/honoraires` de `app/llms.txt/route.ts` qui en reprend les chiffres.
  Le PDF `public/bareme-honoraires-markus.pdf` est un troisième exemplaire, non
  vérifiable depuis un run — **à signaler au client**.

- **QUATRE pages du site publient désormais des dérivations des mêmes médianes
  DVF 2025.** Si ces médianes sont un jour recalculées, **les quatre doivent être
  refaites dans le même run**, sinon le site se contredit :
  1. `/blog/prix-immobilier-villeurbanne-2026` — les médianes elles-mêmes ;
  2. `/estimation-immobiliere-villeurbanne` — constante `REPERES` (T2 45 m² /
     T3 65 m² par quartier) **et, depuis le 11/09, l'écart interquartile cité
     dans le corps de texte** (2 954 – 4 173 €/m², ≈ 76 000 € sur 62 m²) ;
  3. `/blog/ou-acheter-villeurbanne-quartiers` — tableau budget → surface
     (200/250/300 k€) et écarts en % au prix médian communal ;
  4. **`/blog/estimation-en-ligne-ou-agence`** *(11/09)* — quartiles par quartier
     et par typologie, écarts en euros, et les taux 18 / 36 / 62 % + erreur
     médiane 15,5 %.
  Un commentaire en tête de `lib/blog.ts` le rappelle. La règle « DVF est révisée
  rétroactivement, tout recalculer plutôt que patcher » (plus bas) s'applique aux
  quatre.
  → **Bonne nouvelle du 11/09** : le recalcul indépendant fait ce jour-là rend
  les médianes **exactes au chiffre près**. Le risque est donc théorique tant
  qu'un nouveau millésime DVF n'est pas publié. **Ne pas relancer ce calcul
  « pour vérifier » avant cette publication** : c'est une heure de run pour rien.

- **Étiquette « T5+ » probablement inexacte dans l'article prix.** Le tableau par
  typologie du 07/09 affiche « T5+ : 2 967 €/m² ». Le recalcul du 11/09 montre
  que 2 967 €/m² correspond aux logements de **5 pièces exactement** (n = 116) ;
  « 5 pièces et plus » donne **2 984 €/m²** (n = 144). L'écart est mince mais
  l'étiquette est fausse. **Non corrigé volontairement le 11/09** : toucher au
  tableau de l'article prix pour 17 €/m² aurait élargi un chantier de contenu à
  une page qui fonctionne. → **à corriger dans le même run que le prochain
  recalcul DVF**, pas isolément.
- **Le rendement brut communal publié (≈ 4,9 %) croise deux millésimes** : loyer
  médian 14,6 €/m² issu du jeu « Carte des loyers » (data.gouv.fr, millésime
  2023-2024, tel que documenté dans `lib/loyers.ts`) et prix médian DVF 2025.
  C'est assumé et dit dans l'article, mais **à revérifier si un millésime plus
  récent de la carte des loyers sort** — et le chiffre doit rester cohérent avec
  ce que l'outil d'estimation affiche, puisqu'il utilise la même constante.
- **Les 3 pages quartier affichent maintenant un prix médian** (Gratte-Ciel
  3 846 €/m², Charpennes – Tonkin 3 524, Cusset – Bonnevay 3 171). Le périmètre
  du quartier officiel ne coïncide pas exactement avec l'usage courant du nom
  (« Cusset » vs « Cusset – Bonnevay ») : le nom complet du quartier officiel est
  écrit à chaque fois pour ne pas induire en erreur. **À signaler au client s'il
  relit ces pages** — comme le tableau `REPERES`, il n'a pas explicitement
  demandé qu'on affiche des prix sur les pages quartier.

- **Les positions mesurées ne viennent pas de Google.fr.** L'outil de recherche
  disponible ici est orienté US et ne reproduit pas exactement une SERP
  française géolocalisée. « Absent du top 8/9 » est donc un signal fiable
  d'absence, mais les positions fines (page 2 vs page 3) ne le sont pas. **Ne
  pas surinterpréter une variation d'une place d'un run à l'autre** : tant que
  GSC n'est pas branché, seul le passage absent → présent compte vraiment.
- ~~**Indexation réelle inconnue.**~~ → **partiellement levée le 2026-09-10** :
  la home **est indexée** (elle remonte sur une requête adresse). Ne plus
  rouvrir ce point pour la home.
  **Ce qui reste ouvert, et qui est maintenant la question n°1 du site** : les
  **pages profondes** sont-elles indexées ? Une requête sur la médiane
  3 923 €/m² de Ferrandière — chiffre publié **nulle part ailleurs** — ne fait
  pas remonter l'article prix. Deux lectures :
  **(a)** délai d'indexation (l'article a été réécrit le 07/09, soit 3 jours) ;
  **(b)** pages crawlées mais jugées trop faibles, faute de signaux internes.
  Le maillage posé le 10/09 agit sur (b). **Protocole pour départager** :
  remesurer la requête Ferrandière à chaque run. Si elle reste négative
  **au-delà de deux semaines** (soit après le ~21/09), (a) devient
  indéfendable et il faudra chercher un blocage technique d'indexation, pas
  écrire plus de contenu. **Seule GSC peut vraiment trancher** (backlog n°1).

- **`/espace-client` est `disallow` dans `robots.txt` mais reste liée depuis le
  header (icône 👤).** Une URL bloquée au crawl peut malgré tout être indexée
  « en URL seule » si elle est liée, et son `noindex` ne sera jamais lu puisque
  Google n'a pas le droit de la charger. La manœuvre correcte serait de
  **retirer le `disallow` et de poser un `noindex`** — mais cela revient à
  ouvrir au crawl une page que le client a fermée. **Non fait volontairement le
  10/09 : à soumettre au client**, ce n'est pas une décision de run automatique.
  (`/radar` est dans le même cas ; `/signin`, lui, n'était pas bloqué, d'où le
  `noindex` posé sans hésitation.)

- **Le créneau « prix sourcé DVF » se peuple.** Au 10/09, la SERP « prix m2
  Villeurbanne par quartier 2026 » s'est renouvelée de moitié en 24 h, et
  **immovrai.com y entre en affichant explicitement « ventes DVF »** — le même
  argument que le nôtre. À surveiller : si plusieurs acteurs publient du DVF
  recalculé, notre différenciateur ne sera plus la source mais **la finesse du
  découpage** (contours officiels de quartiers) et **la transparence de la
  méthode**. Ne pas abandonner l'angle, mais ne plus le traiter comme vide.
- **`FAQPage` sur la home + sur cet article** : l'audit du 2026-08-27 notait de
  ne pas ajouter de nouveaux `FAQPage` en espérant un rich result (Google les a
  restreints aux sites gouv/santé depuis août 2023). Cette note reste vraie
  **pour l'affichage SERP**. Le `FAQPage` ajouté aujourd'hui l'est **uniquement
  pour la citabilité LLM**, ce qui est un objectif différent et explicite du
  cahier des charges. Aucune contradiction, mais ne pas en attendre d'étoiles
  ni d'accordéon dans Google.
- **Les colonnes « T2 45 m² » / « T3 65 m² » de la page estimation Villeurbanne
  sont une dérivation, pas une mesure** : médiane €/m² du quartier × surface
  médiane du type. Elles sont légendées comme telles (« ordre de grandeur de
  départ, pas l'estimation de votre logement »). **Deux points à surveiller** :
  (1) si l'article prix est un jour recalculé, **ces 14 valeurs doivent être
  recalculées en même temps**, sinon les deux pages se contrediront ; (2) c'est
  le seul endroit du site où l'on publie un prix en euros pour un bien
  théorique — **à soumettre au client** s'il relit la page, il n'a pas demandé
  ça explicitement. Le retirer est trivial (constante `REPERES`).

- **DVF est révisée rétroactivement** à chaque publication. Les chiffres 2022-2024
  publiés aujourd'hui peuvent bouger de quelques euros. Si on republie ces
  tableaux plus tard, **tout recalculer** plutôt que d'ajouter une colonne à des
  chiffres anciens.
- **Le T3 en vente de l'agence** (`/annonces/appartement-t3-vendre-villeurbanne-grand-clement`,
  279 000 € pour 58,67 m² = 4 755 €/m²) est nettement au-dessus de la médiane
  Perralière – Grandclément (3 375 €/m²). Ce n'est pas incohérent (terrasse,
  jardin, parking, DPE B — que DVF ne voit pas), mais **ne jamais utiliser les
  médianes de l'article pour commenter un bien du catalogue** : le client n'a
  pas demandé ça et ça peut se retourner contre lui en négociation.

---

## Erreurs commises et corrigées

### 2026-09-22 — J'ai publié cinq liens qui s'affichaient en markdown brut, et je ne l'ai vu qu'en relisant le HTML **rendu**

**Ce que j'ai fait.** En posant les liens de corps de texte du jour, j'ai écrit
les ancres qui tombaient sur un terme déjà en gras sous la forme
`**[charges](/blog/charges-copropriete)**` — le lien à l'intérieur du gras. La
syntaxe paraît évidente, elle est valide en markdown, et le fichier source
compile parfaitement : `tsc` est propre, `eslint` est propre, le build passe.

**Ce que ça donnait à l'écran.** Le moteur d'inline de
`components/blog/article-body.tsx` découpe le texte avec une alternance de
regex, et l'alternative « gras » (`\*\*[^*]+\*\*`) vient **avant** celle du
lien. Or `**[charges](/blog/charges-copropriete)**` ne contient aucune `*`
entre ses deux paires : l'alternative « gras » le capture **en entier** et le
rend tel quel. Le lecteur voyait, en gras, la chaîne
`[charges](/blog/charges-copropriete)` — crochets, parenthèses et URL compris.
**5 des 11 liens du jour sont sortis comme ça**, et évidemment aucun n'était un
lien : zéro valeur de maillage, et un article défiguré.

**Comment je l'ai vu.** Pas en relisant le code, où tout paraissait juste. En
appliquant la règle du 18/09 : **après build, extraire le texte visible de
`<main>` et y chercher ce qui ne devrait jamais s'y trouver.** J'ai cherché la
sous-chaîne `](` et les `**` dans le texte rendu, et les cinq sont ressortis
immédiatement. Le contrôle tient en trois lignes de Python et il a rattrapé une
publication ratée.

**Deuxième erreur, dans la vérification elle-même.** Après le correctif du
moteur, j'ai rebuild et relancé le serveur local — et **le contrôle a de
nouveau signalé les 5 liens cassés**. J'ai failli conclure que le correctif ne
marchait pas. En réalité `pkill -f "next start"` avait tué **le processus du
shell qui exécutait la commande** (la ligne de commande du shell contenait elle
aussi la chaîne « next start »), donc le rebuild n'avait jamais eu lieu et
l'ancien serveur, lancé avant le correctif, tenait toujours le port 3210. Le
second `npm run start` avait échoué en silence sur un port occupé. → **Règle :
après avoir arrêté un serveur local, vérifier que le processus a bien disparu
(`ps`) et que celui qui répond est bien le nouveau, avant d'interpréter le
moindre résultat.** Un `ps aux | grep next-server` montrait un PID démarré
trois minutes avant le correctif.

**Le correctif.** Une alternative « lien en gras » ajoutée **en tête** de
`INLINE_RE`, avec sa propre regex de capture, qui rend un `<Link>` au poids du
`<strong>` voisin (`font-semibold` au lieu de `font-medium`). C'est un ajout,
pas une réécriture : les trois formes existantes (`**gras**`, `[texte](/x)`,
`[texte](https://…)`) passent par exactement le même chemin qu'avant. Le
pourquoi est écrit en commentaire au-dessus de la regex, ordre des alternatives
compris — c'est le genre de piège qui se retend tout seul à la prochaine
retouche.

**Après correctif, mesuré sur le rendu** : `](` et `**` introuvables dans le
texte visible des 26 articles, et les 11 liens sortent bien en `<a href>`.

### 2026-09-21 — J'ai corrompu 73 lignes du journal avec un script, en croyant n'en toucher que 20

**Ce qui s'est passé.** Pour ajouter la colonne `2026-09-21` au tableau des
SERP, j'ai écrit un script qui insérait une cellule dans « toute ligne
commençant par `|` située après l'en-tête du tableau ». Or **ce journal contient
d'autres tableaux** — le récapitulatif de fichiers du 17/09, celui des liens
posés le 16/09, celui que je venais d'écrire dans mon propre chantier. Les
73 lignes de ces tableaux ont reçu une cellule `*non remesuré*` en deuxième
position, ce qui les a décalées et cassées.

**Comment ça a été vu.** Pas par le script : par un `awk` de contrôle lancé
après coup sur les lignes commençant par `|` au-delà du tableau. Le premier
résultat affiché était `| Page | *non remesuré* | Question à laquelle elle
répond |`, ce qui ne laissait aucun doute.

**Comment ça a été réparé sans perdre le travail du jour.** Un
`git checkout SEO-JOURNAL.md` aurait effacé les trois entrées écrites juste
avant. La réparation a donc été ciblée : sur les seules lignes **situées après
la fin du tableau SERP**, supprimer la deuxième cellule quand elle vaut
exactement ` *non remesuré* `. Vérification finale par `git diff -U0` :
**20 lignes supprimées, toutes dans le tableau SERP, et rien d'autre** — le
reste du diff n'est que de l'ajout.

**Les deux règles à garder.**
1. **Un script qui modifie ce journal doit borner sa zone d'action**, jamais
   filtrer sur un motif de ligne. Le tableau SERP va de son en-tête à la
   première ligne qui ne commence pas par `|` : c'est cette borne qu'il faut
   calculer d'abord, et n'écrire que dedans.
2. **Après toute édition scriptée d'un fichier Markdown, relire ce qu'on n'a
   pas visé.** `git diff --stat` puis la liste des lignes **supprimées** dit en
   deux secondes si le script a débordé : une édition qui n'ajoute que du
   contenu ne doit supprimer que les lignes qu'on remplace sciemment.

*(rien à corriger de runs précédents : ce journal démarre aujourd'hui)*

- **2026-09-17 — Neuf runs ont « vérifié le sitemap » sans jamais le lire.**
  Du 07/09 au 16/09, chaque entrée de ce journal porte une ligne du type
  « `sitemap.xml` = 60 / 61 / 63 URLs, `robots.txt` OK ». Le chiffre a même été
  corrigé le 16/09 (61 → 63) — donc le fichier a été **recompté**, et toujours
  pas **regardé**. En listant les URLs pour la première fois aujourd'hui, on
  trouve que **10 d'entre elles décrivent des biens qui n'existent pas**, sur
  un site dont la consigne client n°1 est « n'invente jamais ». Le défaut était
  en ligne depuis l'ouverture du domaine.
  Ce que ça a coûté : dix jours d'exposition, et un chantier trouvé par hasard
  plutôt que par méthode.
  → **Règle : un contrôle de routine qui rend toujours le même verdict doit
  être approfondi ou supprimé.** « Combien d'URLs » n'est pas une mesure ;
  « lesquelles, et que contiennent-elles » en est une. Corollaire pratique :
  quand un audit se résume à un compteur, remplacer le compteur par une liste.

- **2026-09-16 — Diagnostic de maillage faux, pris avant publication : le
  `grep` de code ne voit pas les liens de gabarit.** J'ai mesuré les liens
  entrants de chaque page stratégique avec un motif `href="/honoraires"` sur les
  `.ts/.tsx`, et conclu que `/honoraires` ne recevait que **4 liens**, tous du
  cluster de landing pages. **Faux** : le footer est construit depuis un
  **tableau d'objets** (`{ href: "/honoraires", label: "Nos honoraires" }`) dans
  `components/layout/site-footer.tsx` — le motif ne le capture pas. `/honoraires`
  reçoit en réalité **un lien sitewide, sur les 82 pages**. L'erreur a été
  repérée parce que le HTML **rendu** d'un article que je n'avais pas encore
  touché contenait déjà un lien `/honoraires`.
  Ce que ça aurait coûté : le journal aurait enregistré « page orpheline » pour
  une page liée partout, et un run suivant aurait pu poser des liens en masse
  vers une page qui n'en manque pas.
  → **Règle : le maillage se mesure sur le HTML rendu (`.next/server/app/**.html`
  ou `curl`), jamais sur le code source seul.** Un `grep` de code rate tout ce
  qui transite par une structure de données — et la plupart des navigations en
  sont une.
  → **Corollaire utile, trouvé grâce à la correction** : les pages *vraiment*
  peu maillées ne sont pas celles qu'on croit. Ce sont celles **absentes du
  footer** : les 3 pages quartiers et
  `/estimation-immobiliere-villeurbanne`.

- **2026-09-16 — Chiffre du journal périmé, corrigé : le sitemap fait 63 URLs,
  pas 61.** Les entrées du 11/09 au 15/09 écrivent toutes « `sitemap.xml`
  inchangé à 61 URLs ». Le compte réel en production est de **63** : les 3 pages
  quartiers y sont entrées. Le « inchangé » a été recopié d'un run à l'autre
  sans recompter. → **Règle : ne jamais recopier un chiffre d'état d'une entrée
  précédente — le recompter, c'est une commande.**

- **2026-09-12 — Affirmation fausse du journal, corrigée : « rien dans le code
  ne donne un barème d'honoraires de vente ».** L'entrée du 08/09 conclut ainsi,
  après avoir (à juste titre) établi que le 9 % est la part propriétaire sur la
  **mise en location**. La première moitié du raisonnement est bonne, la
  conclusion est **fausse** : `app/honoraires/page.tsx` contient bel et bien un
  barème de transaction complet (constante `TRANSACTION`, 8 tranches, « à la
  charge du vendeur ») — 9 000 € de 50 001 à 170 000 €, 6 % de 170 001 à
  300 000 €, 5 % jusqu'à 500 000 €, 4 % jusqu'à 700 000 €, 3,5 % jusqu'à 1 M€,
  3 % au-delà. Cette phrase a coûté quatre jours : elle a laissé croire que le
  site ne pouvait pas répondre à « combien coûte une agence », qui est **la**
  question de la requête commerciale n°1. C'est devenu le chantier du 12/09.
  → **Règle : quand une vérification aboutit à « le code ne contient pas X »,
  vérifier l'absence aussi soigneusement qu'on aurait vérifié la présence.**
  Un `grep` sur « 9 % » ne prouve rien sur l'existence d'un barème de vente.

- **2026-09-12 — Item de backlog écarté avant d'être fait : `author` humain sur
  les articles de blog.** Le backlog (point 4, écrit le 09/09) proposait de
  remplacer `author: Organization` par un auteur humain identifié, « Tony
  Pistilli », pour l'E-E-A-T. **Ne pas le faire.** Les articles ne sont pas
  écrits par Tony Pistilli ; le publier serait une affirmation fausse sur une
  personne réelle, exactement ce que la consigne client interdit (« n'invente
  jamais »). Accessoirement, Google accepte explicitement une `Organization`
  comme `author` — le gain supposé est faible et le risque factuel certain.
  → **Remplacé par un item factuellement sûr** : baliser en `Person` les
  membres d'équipe **déjà affichés** sur `/equipe` (backlog n°4 réécrit).
  → **Règle plus générale : un item de backlog écrit par un run précédent n'est
  pas une décision validée.** Il se relit avec les mêmes règles que le reste.

- **2026-09-08 — Piège évité sur les « chiffres validés » : le 9 % n'est PAS un
  honoraire de vente.** La consigne de la routine liste « honoraires 9 % part
  propriétaire » parmi les chiffres réutilisables tels quels. J'allais m'en
  servir dans une FAQ sur l'estimation avant vente. Vérification faite dans
  `app/honoraires/page.tsx` : **9 % = part propriétaire sur la _mise en
  location_, calculée sur le loyer annuel hors charges** (et 2,5 % = assurance
  GLI, également locatif). **Rien dans le code ne donne un barème d'honoraires
  de vente.** Écrire « 9 % de commission sur la vente » aurait été une erreur
  factuelle publiée sur le site d'une agence — la faute la plus coûteuse
  possible ici. → **Règle : un « chiffre validé » ne dit pas à quoi il
  s'applique. Toujours retrouver son contexte dans le code avant de l'employer
  dans une nouvelle phrase.**

- **Audit du 2026-08-27 partiellement périmé** — corrigé ici : il classait en
  « High #1 » le fait que le domaine ne soit pas connecté. Il l'est depuis.
  Leçon appliquée : **toujours refetcher le site avant de croire une note
  d'audit**, y compris celles de ce journal.

- **2026-09-07 (run n°2) — Item de backlog invalidé : `AggregateRating` /
  `Review` pour obtenir des étoiles en SERP.** `docs/SESSION_LOG.md` le classe
  encore en « High #3 » (« ajouter `aggregateRating` + `review[]` au JSON-LD
  `RealEstateAgent` → possibilité d'étoiles en SERP »). **C'est faux : ne pas le
  faire.** Google exclut explicitement les avis « self-serving » — un avis
  portant sur l'entité A publié sur le site de l'entité A : *« if the entity
  that's being reviewed controls the reviews about itself, their pages that use
  LocalBusiness or any other type of Organization structured data are ineligible
  for star review feature »*. Les 3 avis de la home sont exactement ce cas.
  Gain attendu : **zéro étoile**, pour un balisage à risque.
  Sources : [Review snippet — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
  et [Making Review Rich Results more helpful](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful)
  (règle en vigueur depuis 2019, revérifiée le 2026-09-07).
  → **Item mort. Ne pas le ressortir du backlog historique.** Si on veut des
  étoiles un jour, le levier est la fiche **Google Business Profile**, pas le
  JSON-LD du site.

---

## Techniques apprises

### 2026-09-23 — Méthode : le résumé du moteur attribue aux pages des chiffres qu'elles ne publient pas, et j'ai failli les citer

Le 22/09 avait établi que l'outil de recherche de ce runner n'honore ni `site:`
ni les guillemets d'exactitude. Aujourd'hui il a fait pire, et d'une façon qui
aurait fini dans l'article publié.

**Ce qui s'est passé.** La recherche « investir locatif Lyon Villeurbanne
rentabilité prix au m2 réel » a rendu neuf liens **et un résumé** qui
attribuait des chiffres précis aux premiers résultats : « Gratte-Ciel
3 688 €/m² », « rentabilité brute estimée à 5,75 % », « rendements bruts entre
4,2 et 6,8 % », « loyers autour de 16,1 €/m² ». C'était une aubaine :
l'article du jour a précisément pour angle l'écart entre les prix affichés par
les sites d'investissement et les prix réellement payés, et ces valeurs
allaient être citées telles quelles, avec leur source et leur date.

**Ce que la vérification a donné.** Les deux pages les mieux classées
(`horiz.io/ou-investir/villes/Villeurbanne/69100` et la page Villeurbanne de
`lybox.fr`), téléchargées une par une, **ne publient aucun de ces chiffres**.
Elles n'en publient aucun du tout : prose qualitative, renvoi vers un
simulateur. Le résumé n'avait pas mal cité une page, il avait **fabriqué une
attribution** à partir d'un agrégat de neuf résultats hétérogènes.

**Ce que ça change dans le protocole.**

1. **Un chiffre lu dans le résumé d'une recherche n'est pas une mesure — c'est
   une rumeur.** Il ne peut ni entrer dans un contenu publié, ni entrer dans ce
   journal comme « ce que publient les concurrents ». Règle : **aucun chiffre
   attribué à un tiers ne sort d'un résumé de moteur ; il sort du HTML de la
   page, téléchargée.**
2. **Cela vaut rétroactivement.** Le journal porte déjà au moins une
   attribution de ce type — « CPIM : Charpennes 5 120 €/m² », relevée le 12/09
   et recitée le 22/09, aujourd'hui recopiée jusque dans l'en-tête de
   `app/agence-immobiliere-charpennes/page.tsx`. Elle n'a **pas** été
   revérifiée sur la page source, et l'entrée du 12/09 ne dit pas si elle
   l'avait été. **À vérifier au prochain run** (voir « Hypothèses à
   vérifier ») : si elle vient d'un résumé, elle doit disparaître du code.
3. **Formulation de repli, qui a été retenue aujourd'hui.** Quand la
   vérification page par page est impossible ou trop coûteuse, on décrit ce
   qu'on a réellement constaté — « aucun des neuf résultats ne publie de
   rendement par quartier calculé sur des prix de vente réels » — plutôt que
   de citer un chiffre attribué. C'est moins spectaculaire, c'est vrai, et
   c'est vérifiable par un lecteur.

**Ce que ça coûte** : deux `WebFetch` de plus par affirmation, soit une minute.
**Ce que ça évite** : publier sous la marque du client un chiffre faux
attribué nommément à un concurrent.

### 2026-09-22 — L'instrument de mesure de ce journal ne sait pas faire de recherche exacte, et un protocole entier reposait dessus

**Le fait.** L'outil de recherche web de ce runner **n'honore ni l'opérateur
`site:` ni les guillemets d'exactitude**. Deux vérifications ce matin, toutes
deux sans appel :

1. `site:markusimmobilier.fr honoraires` → neuf résultats, dont **neuf PDF de
   questions écrites de l'Assemblée nationale**. Zéro page du domaine
   interrogé. L'opérateur n'est pas appliqué, il est traité comme du texte.
2. Une phrase recopiée **mot pour mot** de `/honoraires`, entre guillemets
   (« Pour un T2 de 45 m² … 585 € TTC »), a rendu neuf pages thématiques sur la
   zone tendue à Villeurbanne, **aucune ne contenant la phrase**. Le moteur a
   même paraphrasé le chiffre pour le commenter — signe qu'il a fait une
   recherche sémantique, pas une recherche littérale.

**Pourquoi ça compte ici, et beaucoup.** Le **test d'indexation profonde**
ouvert le 13/09 est construit sur cette hypothèse : « si je cherche un chiffre
que nous seuls publions et que le site ne sort pas, c'est que la page n'est pas
indexée ». **Cette inférence ne tient que si le moteur fait de l'exactitude.**
Il n'en fait pas. Ce que le test mesure réellement, c'est **un classement
thématique sur une requête longue et concurrentielle** — ce qu'une page de
quinze jours sur un domaine neuf ne gagne jamais, indexée ou non. Les huit
absences ne démontrent donc **rien** sur l'indexation.

**Conséquence, écrite pour le run du 27/09** : la consigne du 13/09 (« négatif
après le ~27/09 ⇒ arrêter d'écrire et chercher un blocage technique
d'indexation ») est **suspendue, pas déclenchée**. Elle ne peut pas l'être sur
un instrument défaillant. Deux façons de trancher pour de bon, dans l'ordre de
fiabilité :

- **Search Console** (backlog n°1, action client) : l'inspection d'URL est la
  **seule** réponse qui fasse autorité sur « cette page est-elle indexée ». Ce
  constat fait remonter le point 1 d'un cran de plus — il ne débloque plus
  seulement « de vraies mesures de position », il débloque **la seule question
  que ce journal ne sait pas trancher seul depuis neuf jours**.
- À défaut, **ne plus faire reposer un diagnostic binaire sur ce moteur**. Il
  reste utile pour ce qu'il fait bien — lire la **composition** d'une SERP,
  voir qui occupe le terrain, repérer ce que les concurrents publient — et
  c'est d'ailleurs de là que sont sortis les bons chantiers des 15, 16, 18 et
  21/09. Il est simplement incapable de répondre « cette chaîne exacte
  existe-t-elle dans l'index ».

**Règle générale, et elle dépasse ce cas** : *avant de bâtir un protocole de
décision sur un outil, tester l'outil sur un cas dont on connaît déjà la
réponse.* Le contrôle coûtait une requête (« cherche une phrase que je viens de
lire sur ma propre page ») et il aurait invalidé le test **le 13/09**, avant que
huit runs n'écrivent huit lignes de tableau pour rien. Le journal a appliqué
cette discipline au site — « un commentaire n'est pas une mesure » (20/09), « un
contrôle de routine qui rend toujours le même résultat doit être approfondi ou
supprimé » (17/09) — sans jamais l'appliquer à **ses propres instruments**.

### 2026-09-22 — Méthode : un défaut de maillage ne se voit que dans l'agrégat, jamais page par page

Le défaut trouvé aujourd'hui est **invisible à l'échelle d'une page**. Ouvrez
`/blog/loi-carrez-surface` : le bloc « À lire aussi » est là, il affiche deux
cartes, tout a l'air normal. Ouvrez les 26 articles un par un : tout a l'air
normal 26 fois. Le défaut n'apparaît qu'en **renversant le graphe** — en
comptant, pour chaque page, **qui pointe vers elle** au lieu de regarder vers
qui elle pointe. Là, il saute aux yeux : 8 pages concentraient tous les liens,
13 n'avaient qu'une seule page entrante.

La recette, réutilisable telle quelle :

1. Télécharger le **HTML rendu** des URLs du sitemap (jamais le source —
   règle du 16/09 : le footer construit sa nav depuis un tableau d'objets,
   qu'aucun `grep href=` ne capture).
2. Retirer les `<script>` avant d'extraire les `<a href>` — la charge utile RSC
   de Next contient les mêmes URLs et double artificiellement les comptes.
3. Construire `cible → {sources}`, puis **trier par nombre de sources
   croissant**. Les premières lignes sont le diagnostic.
4. Distinguer les liens **sitewide** (52 sources = header/footer) des liens
   **contextuels** : sans cette distinction, tout semble bien maillé.

Corollaire qui vaut d'être noté : **un audit de maillage ne doit pas seulement
compter les liens émis, mais les liens reçus.** Le backlog portait depuis le
16/09 un point « 12 articles n'émettent aucun lien » — exact, mais qui regardait
dans le mauvais sens. Les 12 articles muets émettaient en réalité 2 liens
chacun via le bloc automatique ; le vrai trou était côté **réception**, et il
concernait 18 articles, pas 12.

### 2026-09-21 — Veille hebdomadaire : la thèse « on peut être cité sans classer » n'est plus une hypothèse, elle est mesurée

*(Veille du lundi, en retard de six jours sur celle du 15/09. Sources primaires
uniquement — les résumés de blogs recyclés ont été écartés.)*

**1. Le chiffre qui change la stratégie de ce site : 38 % seulement des pages
citées en AI Overview sont dans le top 10, contre 76 % un an plus tôt.**
Ahrefs, mis à jour le **2 mars 2026**, sur 863 000 SERP et 4 millions d'URLs
citées — soit le double de l'échantillon de l'étude de juillet 2025 qui donnait
76,1 %. L'auteure attribue la chute au **« query fan-out »** : depuis le
déploiement de Gemini 3 en janvier 2026, une requête est éclatée en
sous-requêtes plus nombreuses et plus larges, et les citations sont puisées
dans des SERP connexes où peu de pages classent sur la requête d'origine.
→ **Ce que ça vaut ici.** Le site est absent de « agence immobilière
Villeurbanne » depuis treize relevés, et il le restera tant que la fiche GBP et
les citations d'annuaires ne bougent pas (action client). Cette étude dit que
**ce n'est plus une raison d'arrêter d'écrire** : la citation par une IA passe
de moins en moins par le classement. La thèse posée prudemment le 15/09
(« on peut être cité sans classer ») est désormais chiffrée. Elle valide aussi,
après coup, le pari de la page du jour, qui vise la citation sur une question
précise plus que la position sur « gestion locative Villeurbanne ».
Source : https://ahrefs.com/blog/ai-overview-citations-top-10/ (02/03/2026).

**2. La forme d'un passage citable est mesurée, et elle a des nombres.**
Search Engine Land, sur un corpus de **15,7 millions de citations d'AI Mode** :
le passage mis en avant fait **117 mots de médiane** (une réponse complète de
plusieurs phrases, pas une phrase isolée), **80 % des passages extraits placent
la réponse dans la première phrase**, et la **profondeur dans la page n'a pas
de lien mesurable avec la citation** — du texte situé à des milliers de pixels
du haut est cité comme le reste.
→ **Trois conséquences opérationnelles, appliquées dès aujourd'hui.** (a) La
règle « réponse directe en tête » se précise : ce n'est pas « 2-3 phrases »,
c'est **la réponse dans la première phrase**, puis un développement jusqu'à
~120 mots. (b) **Une FAQ en bas de page n'est pas pénalisée** : l'inquiétude
n'avait pas lieu d'être, on peut continuer à les placer après les sections.
(c) Un passage doit rester **autonome** : c'est bien un bloc qui est extrait,
pas la page.
⚠️ **Honnêteté sur la source** : l'article renvoie un 403 à la lecture directe.
Les chiffres ci-dessus viennent du résumé de résultat de recherche, **pas du
texte intégral** — à reconfirmer si un run s'en sert pour trancher quelque
chose d'important.
Source : searchengineland.com/what-15-7-million-ai-mode-citations-reveal-about-getting-quoted-by-google-483393

**3. En recherche locale, le terrain se resserre, et Google se cite lui-même.**
Deux mesures convergentes : les AI local packs font apparaître **32 % seulement
du nombre d'entreprises uniques** des map packs traditionnels, et le nombre
d'entreprises visibles **recule sur 88 % des 322 marchés** analysés par Sterling
Sky ; en parallèle, Profound mesure que **google.com est devenu le 2ᵉ domaine
le plus cité d'AI Mode**, avec une hausse de 8,4× en deux mois venant presque
entièrement des **fiches Google Business Profile** affichées en panneau sur les
requêtes à intention locale.
→ **Ce que ça vaut ici, et c'est inconfortable.** Le point 3 du backlog (fiche
GBP) n'est plus « un levier parmi d'autres » : sur les requêtes locales, la
fiche est **le contenu que l'IA cite**, avant le site. Aucun chantier de contenu
ne compensera son absence. À remonter au client **avec le point 1 (Search
Console)**, et avec cette mesure à l'appui — c'est l'argument qui manquait.

**4. Côté Google, rien d'applicable ce mois-ci.** Les mises à jour de
documentation de juillet à septembre 2026 portent sur des sujets hors périmètre
(badges de profil Search, sources préférées, favicon, licences de données
européennes, suivi de colis). Les types de données structurées retirés du
rapport Search Console le **9 septembre** — Course Info, Claim Review,
Estimated Salary, Learning Video, Special Announcement, Vehicle Listing — **ne
sont utilisés par aucune page du site** : rien à corriger. Confirmation au
passage : **FAQ et HowTo restent absents de la documentation des résultats
enrichis** (dépréciés en 2023, inchangé). Ils gardent leur intérêt pour
l'extraction par les LLM, pas pour un affichage enrichi — ce qui reste
cohérent avec la re-priorisation du 15/09 (« ne plus ouvrir de chantier dont la
justification principale est d'ajouter du schema »).
Source : https://developers.google.com/search/updates

---

### 2026-09-21 — Méthode : le détecteur de collages du 18/09 a un angle mort, et la relecture humaine reste obligatoire

**Ce qui s'est passé.** Le contrôle du 18/09 (chercher un chiffre, un `€`, un
`%` ou un `m²` immédiatement suivi d'une lettre) a trouvé **5 collages sur 7**
dans la page du jour. Les deux qu'il a laissés passer ont été trouvés en
**relisant le texte rendu comme un lecteur** :

- `le régime micro-fonciers'applique de plein droit` — venant de
  `<strong>régime micro-foncier</strong> s&apos;applique` ;
- `un logement d'environ 86m²` — venant de `{SURFACE_SEUIL} m²`.

**Pourquoi il ne les voit pas.** Sa regex exige un `€`, un `%` ou un `m²` juste
avant la lettre collée. Or la perte d'espace ne dépend pas du **contenu** : elle
dépend de la **frontière JSX**. Une balise `</strong>` suivie d'un retour à la
ligne perd l'espace exactement comme une expression `{…}`, et `r` collé à `s`
ne déclenche aucun motif.

**Le détecteur à utiliser désormais — il est exact, pas heuristique.** React
sérialise chaque frontière entre deux nœuds de texte par un commentaire
`<!-- -->`. Une espace perdue est donc, très exactement, **un `<!-- -->` collé
des deux côtés** :

```bash
python3 - <<'EOF'
import re
h = open('/tmp/p.html', encoding='utf-8').read()
main = re.sub(r'<script.*?</script>', '', re.search(r'<main.*?</main>', h, re.S).group(0), flags=re.S)
for m in re.finditer(r'\S<!-- -->\S', main):
    print(repr(main[max(0, m.start()-50):m.end()+20]))
EOF
```

**Il faut cependant le lire, pas l'appliquer aveuglément** : il signale aussi
les adjacences **voulues** — `(672 €)`, `30 %,`, `672 €{" "}×`. Sur la page du
jour, 6 signalements, tous légitimes une fois les 7 vraies fautes corrigées.
Les cellules de tableau, elles, produisent un faux positif dans le détecteur du
18/09 (`11 %190 €482 €`) parce qu'il retire les balises sans les remplacer.

**La règle qui ne change pas, et qui a servi deux fois aujourd'hui :** aucun
détecteur ne remplace la **lecture du texte rendu en entier**, à voix basse.
C'est elle qui a trouvé les deux derniers, et c'est elle qui a montré que la
phrase d'accroche de chaque H2 répondait bien dès la première phrase.

**Piège d'environnement à connaître, il a coûté une mesure fausse aujourd'hui.**
Un `next start` laissé en fond **continue de servir l'ancien build** : le
rebuild ne le remplace pas. J'ai mesuré deux fois de suite une page corrigée et
lu les mêmes 6 collages, jusqu'à voir `EADDRINUSE` dans le log du second
serveur — qui n'avait jamais démarré. **Toujours vérifier le log du serveur
qu'on vient de lancer, ou lancer sur un port neuf.**

**Et un point de configuration du conteneur, nouveau :** le clone démarre
**sans `node_modules`**. Un `tsc --noEmit` lancé avant `npm ci` rend des
centaines de « Cannot find module 'next' » qui ne sont pas des erreurs du code.
`npm ci` prend 15 secondes.

### 2026-09-20 — Méthode : un commentaire de code n'est pas une mesure, et un audit ne vaut que par la liste des signaux qu'il regarde

**Ce qui s'est passé.** `app/opengraph-image.tsx` porte depuis l'origine un
commentaire d'en-tête qui dit que l'image générée « s'applique à tout le site
sauf si une page définit sa propre opengraph-image ». C'est une affirmation
plausible, écrite par quelqu'un qui connaissait le framework, et **elle est
fausse** : dans l'App Router, `metadata.openGraph` n'est pas fusionné en
profondeur avec celui du layout. Une page qui déclare son propre bloc
`openGraph` **remplace** celui du parent — image de fichier comprise. Quatorze
pages déclaraient un bloc ; les 26 articles du blog aussi. Résultat en ligne :
**37 pages sur 51 sans `og:image`**, pendant que le code affirmait le contraire.

**Ce que ça coûte, et pourquoi c'est une technique à retenir.** Ce défaut a
traversé onze runs. Il n'était pas caché : il suffisait d'un `curl` et d'un
`grep 'og:image'`. Ce qui l'a protégé, c'est que **personne n'avait de raison
de le chercher** — le commentaire disait que c'était couvert, et les audits
précédents (notamment celui du 17/09, qui a téléchargé les 63 URLs) ne
regardaient que cinq signaux : `<title>`, description, canonical, `<h1>`, types
JSON-LD. Les balises d'aperçu n'étaient dans aucune liste.

**Deux règles, dont une qui prolonge celle du 17/09.**
1. **Un commentaire de code décrit une intention, jamais un état.** Quand un
   commentaire affirme qu'un comportement s'applique « partout », c'est un
   endroit où mesurer, pas un endroit où faire confiance. Formulation
   opérationnelle : *si le code dit « ça marche partout », vérifier partout.*
2. **La règle du 17/09 (« remplacer un compteur par une liste ») a un second
   étage : élargir la liste des signaux auditables.** Auditer 53 URLs sur les
   mêmes cinq champs, tous les jours, ne trouvera jamais un sixième défaut.
   **Liste des signaux effectivement vérifiés à ce jour, à compléter au fil des
   runs** : statut HTTP · `<title>` · meta description · `canonical` ·
   `<h1>` unique · meta robots · types JSON-LD · nombre de mots rendus ·
   `lastmod` du sitemap · liens internes émis et reçus · `alt` des images ·
   **balises `og:*` et `twitter:*` (ajoutées le 20/09)**.
   **Jamais encore audités** : poids et format des images, temps de réponse et
   Core Web Vitals, en-têtes HTTP de cache, `hreflang` (sans objet aujourd'hui,
   voir « Hypothèses »), cohérence des ancres de liens internes.

**Rappel technique utile pour la suite (Next.js App Router).** Les `metadata`
d'un layout sont héritées **champ par champ au premier niveau** : une page qui
déclare `openGraph` perd `images`, `siteName` et `locale` du parent ; une page
qui ne déclare rien hérite de **tout**, y compris d'un `url` qui ne la décrit
pas. Les deux moitiés du défaut du 20/09 viennent de là. Le helper
`lib/seo/share.ts` existe pour qu'aucune page n'ait plus à composer ce bloc à
la main — **toute nouvelle page doit l'utiliser**.

### 2026-09-18 — Méthode : un contenu publié n'est vérifié que dans le HTML **rendu**, jamais dans le source

**Ce qui s'est passé.** La page du jour compose beaucoup de chiffres à
l'intérieur de phrases (`… les {eur(FRAIS_DEBOURS)} annuels de frais …`). Le
build passait, `tsc` passait, le lint passait — et le texte servi disait
**« les 20 €annuels »**, **« environ 9jours »**, **« de 62m² »**,
**« en 2025— loué »**, **« 717 €si vous »**. Six collages, invisibles au
relecteur du code parce que **l'espace est bien présent dans le fichier
source** : c'est le rendu JSX/React qui la perd entre une expression et le
texte qui la suit. Corrigé en écrivant l'espace explicitement (`{" "}`).

**La règle à garder.** Après chaque chantier de contenu : builder, servir la
page, extraire le texte et **le relire comme un humain**. Un contrôle
mécanique suffit à trouver ces collages :

```bash
npm run build && npm run start &
curl -s http://127.0.0.1:3000/<page> -o /tmp/p.html
python3 - <<'EOF'
import re, html
h = open('/tmp/p.html', encoding='utf-8').read()
h = re.sub(r'<script.*?</script>', '', h, flags=re.S)
t = html.unescape(re.sub(r'<[^>]+>', '', h))
for m in re.finditer(r'[\w%€²](?:—|(?<=[€%²])[A-Za-zÀ-ÿ])', t):
    print(repr(t[max(0, m.start()-40):m.start()+15]))
EOF
```

(Il cherche un chiffre, un `€`, un `%` ou un `m²` immédiatement suivi d'une
lettre ou d'un tiret cadratin : c'est la signature exacte de ces collages.)

**Pourquoi ça compte au-delà de l'esthétique.** Ces phrases sont écrites pour
être **citées telles quelles** par un moteur de réponse. « 20 €annuels » dans
un passage extrait, c'est le passage qui perd sa crédibilité — et il est
recopié tel quel, faute comprise.

**Deuxième méthode confirmée le même jour : vérifier la correspondance JSON-LD
↔ visible par script, pas à l'œil.** Les blocs `FAQPage` et `HowTo` sont
générés depuis les mêmes tableaux que l'affichage ; le contrôle consiste à
parser les `<script type="application/ld+json">` du HTML servi et à vérifier
que **chaque `name` et chaque `text` se retrouve dans le texte de la page**
(après `html.unescape`, sans quoi les apostrophes typographiques font échouer
la comparaison à tort). 6 questions, 6 réponses, 3 étapes : toutes retrouvées.

**Et un piège d'environnement, la deuxième fois qu'il se présente :** le
domaine sert un **308 vers `www.`**. Un `curl -s https://markusimmobilier.fr/x`
renvoie **15 octets** — pas une page vide, une redirection. Toujours `curl -sL`,
ou mesurer directement sur `www.markusimmobilier.fr`.

### 2026-09-17 — Méthode : auditer un site par ce qu'il déclare, et neutraliser sans supprimer

Deux choses réutilisables sont sorties du run technique du jour.

**1. L'audit « par déclaration » : partir du sitemap comme d'une liste, pas
comme d'un compteur.** La procédure tient en quelques minutes et elle a trouvé
ce que dix runs de lecture de code avaient manqué :

1. `curl` le `sitemap.xml`, **extraire les `<loc>` et les lire une par une** ;
2. télécharger **chaque** URL et en extraire mécaniquement : `<title>`, meta
   description, `canonical`, meta `robots`, nombre de `<h1>`/`<h2>`, types
   JSON-LD, nombre de mots rendus ;
3. chercher les **anomalies de groupe**, pas les pages une par une — titres ou
   descriptions dupliqués, `canonical` manquant, `lastmod` identiques,
   pages anormalement courtes. **Les 10 fiches fictives se sont signalées
   toutes seules : c'était le seul groupe sans `canonical`.**

Le principe général : **les défauts d'un site se voient dans les écarts entre
pages comparables**, pas dans la lecture d'une page isolée. Un tableau de 63
lignes trié par colonne les fait apparaître en quelques secondes.

**2. Neutraliser sans supprimer, quand la consigne est « ne rien casser ».**
Face à un contenu qu'on ne doit pas montrer à Google mais qu'on n'a pas le
droit de retirer de l'écran, trois leviers se combinent, du plus large au plus
fin, et **aucun ne change le rendu** :

| Levier | Ce qu'il fait | Ce qu'il ne fait pas |
|---|---|---|
| Retirer l'URL du `sitemap.xml` | on cesse de **soumettre** la page | ne la désindexe pas si elle est déjà connue |
| `robots: { index: false, follow: true }` | la sort de l'index ; les liens qu'elle porte continuent de circuler | inutile si `robots.txt` bloque le crawl — **la page doit rester crawlable pour que le `noindex` soit lu** |
| `data-nosnippet` sur une `<section>` | interdit l'usage de ce texte en extrait et dans les réponses génératives | ne désindexe pas la page, n'affecte pas son classement |

Le troisième est le plus utile en GEO et le moins connu : il permet de laisser
un bloc visible pour l'humain tout en le rendant **non citable** par une IA. Il
n'est honoré que sur `div`, `span` et `section`. Le piège à éviter : vérifier
**la position réelle dans le DOM rendu** de ce qu'on englobe — ici, s'assurer
que les 6 vraies annonces sont bien **avant** l'ouverture de la section, sans
quoi on rendrait le vrai catalogue non citable en voulant masquer la démo.

### 2026-09-16 — Méthode : un lien interne se justifie par la phrase, pas par la cible

Le réflexe, quand on décide « aujourd'hui je fais du maillage », est de partir
des **pages à renforcer** et de chercher où caser un lien vers elles. C'est ce
qui produit des ancres répétées, des phrases ajoutées pour porter un lien, et
une page qui reçoit quinze liens en un jour — les trois signaux de
sur-optimisation.

La méthode qui a marché aujourd'hui part de l'autre bout, et elle est
reproductible :

1. **Lister les phrases qui posent déjà une question à laquelle une autre page
   du site répond.** Pas les pages : les *phrases*. Ici, quatre d'entre elles
   disaient littéralement « en général 6 à 8 % », « souvent 4 à 6 % du prix »,
   « une garantie loyers impayés peut s'ajouter » — des réponses évasives à des
   questions d'argent, dans un site qui publie un barème complet.
2. **Remplacer l'évasif par le chiffre du site, et lier au passage.** Le lien
   devient alors la **source** de l'affirmation, pas un appât : « notre gestion
   courante est à 6 % des encaissements — [barème public](/honoraires) ». Un
   lien qui source un chiffre est lu comme une citation par un humain comme par
   un LLM ; un lien posé sur « cliquez ici » ne l'est par personne.
3. **S'arrêter là où aucune phrase ne l'appelle.** Douze articles n'ont reçu
   aucun lien aujourd'hui pour cette seule raison. C'est un critère d'arrêt
   objectif — il évite d'avoir à trancher « combien de liens, c'est trop ? ».

**Effet secondaire, et c'est peut-être le vrai gain :** appliquée
sérieusement, cette méthode ne produit pas que des liens. Elle transforme
quatre passages « ça dépend » en passages **autonomes et chiffrés**, c'est-à-dire
exactement le format que l'étape 4 de la routine réclame pour la citation par
une IA. **Un chantier de maillage bien mené est un chantier GEO déguisé.**

**Contre-exemple à garder en tête** : `loi-carrez-surface` et
`charges-copropriete` traitent de sujets où le site n'a rien de plus à dire que
n'importe qui. Aucune phrase n'y appelle un lien, et aucun lien n'y a été posé.
Le jour où ces articles seront réécrits avec une donnée locale, le lien
viendra tout seul.

### 2026-09-15 — Veille (rattrapage du lundi manqué) : deux résultats qui changent la stratégie, dont un contre nous

> Le run du lundi 14/09 n'a pas eu lieu ; la veille hebdomadaire a donc été
> faite le mardi. La précédente datait du **07/09** — huit jours. **Leçon de
> cadence : si un lundi saute, rattraper la veille le lendemain.**

#### 1. 🟢 Être cité ne passe plus par le classement — et c'est chiffré

**Le recouvrement entre les citations d'AI Overview et le top 10 organique
s'est effondré** : ~76 % mi-2025, **17 à 54 % début 2026** selon les études, et
**83 % des citations d'AIO proviennent de pages hors du top 10**. Un AIO
contient en moyenne **13,34 sources**, puisées dans un vivier bien plus large
que les dix résultats visibles.

**Pourquoi ça compte ici, précisément** : ce journal mesure depuis huit runs
une absence totale sur « agence immobilière Villeurbanne », et cette absence a
servi d'aiguillon permanent. Elle ne dit **rien** de la citabilité. Les deux
objectifs du cahier des charges (classer sur Google *et* être cité par les IA)
étaient traités comme un seul avec deux échéances ; **ce sont deux objectifs
distincts, et le second n'a pas besoin du premier.** → Ne plus lire une absence
de position comme un échec du travail de citabilité, et ne plus différer un
chantier de citabilité au motif que la SERP est tenue par des annuaires.

Sources : [Seer Interactive — *What It Takes To Rank In Google's AI Overviews
in 2026*](https://www.seerinteractive.com/insights/what-it-takes-to-rank-in-googles-ai-overviews-in-2026-is-not-what-you-think)
(8 500 mots-clés stratifiés sur 30 secteurs, capturés du 7 au 13 mai 2026 via
SerpAPI, 6 354 pages gagnantes analysées) ·
[SeoProfy — statistiques AI Overviews 2026](https://seoprofy.com/blog/google-ai-overviews/).
Consultées le 2026-09-15.

#### 2. 🔴 Le schema FAQ ne corrèle pas avec la citation — et ce journal en a beaucoup posé

La même étude Seer trouve que **les deux signaux les plus travaillés par le
métier — le schema et l'E-E-A-T — sont ceux qui corrèlent le moins** avec une
première citation. Les sites à **69 % de couverture schema FAQ sous-performent
d'environ 10×** face à Reddit (0 % de FAQ) ; la cohorte à **76 % de bios
d'auteur** ne pèse que **1,94 %** des citations, quand Reddit, sans aucune bio,
en capte **20,4 %**. Ce qui corrèle **positivement** : **plus de liens
internes**, **~2× plus de citations de sources .gov/.edu**, un format de
**1 000–2 000 mots** plutôt que des guides de 5 000+, et un **schema minimal**
(« Article + Breadcrumb suffit »).

**Lecture critique, parce que le chiffre invite à une conclusion trop rapide.**
La comparaison de référence est Reddit : un site d'UGC qui gagne pour des
raisons (volume, fraîcheur, discussion, valeur d'entraînement) sans rapport
avec l'absence de schema. **C'est une corrélation, pas une causalité**, et les
auteurs le reconnaissent eux-mêmes en avançant l'hypothèse que les plateformes
d'IA ont un intérêt structurel à remonter le contenu dont elles ont besoin. Un
site qui couvre 69 % de ses pages en schema FAQ est, en pratique, souvent un
site qui empile des FAQ creuses — **ce que l'étude mesure est probablement la
FAQ de remplissage, pas le balisage lui-même.**

**Ce qui a donc été décidé, et ce qui ne l'a pas été :**
- ❌ **On ne retire aucun `FAQPage` existant.** Rien dans l'étude ne montre de
  pénalité ; sur ce site le balisage est généré depuis le contenu visible
  (mismatch impossible) et son coût est nul. Démonter du balisage sain sur la
  foi d'une corrélation serait exactement l'erreur que ce journal reproche aux
  notes d'audit périmées.
- ✅ **On cesse d'en attendre un gain.** Le `FAQPage` n'est plus un argument
  suffisant pour ouvrir un chantier — c'est ce qui fait descendre le backlog
  n°8 et monter le n°5 (maillage interne).
- ✅ **Le format visé se confirme** : les articles réécrits ici font 1 200 à
  2 100 mots, pile dans la fourchette qui gagne. **Ne pas céder à la tentation
  du guide de 5 000 mots.**
- ✅ **Citer des sources officielles est un levier, pas un ornement.** Le
  chantier du jour cite loi Hoguet, décret de 1972 et trois arrêtés ; les
  articles prix citent DVF (data.gouv.fr). C'est exactement le signal
  « .gov/.edu » que l'étude voit corréler. **À systématiser** : quand une
  affirmation peut s'adosser à un texte officiel daté, le citer.

#### 3. ChatGPT et Perplexity ne citent pas les mêmes sources

**Seuls ~11 % des domaines sont cités à la fois par ChatGPT et par Perplexity.**
Wikipédia pèse **47,9 %** du top 10 des sources de ChatGPT ; Perplexity, dont
Reddit était la première source jusqu'au procès d'octobre 2025 (**−86 %** de
citations Reddit ensuite), a la plus forte part de **.edu (3,2 %)** et de
domaines nationaux (**4,4 %**). Un document doit passer des filtres de
**pertinence sémantique, fraîcheur, qualité structurelle, autorité et
engagement** avant d'être cité.

**Application ici** : viser « être cité par les IA » comme un objectif unique
est une erreur de cadrage — les moteurs ne se recouvrent presque pas. Pour une
agence locale, le levier commun aux deux reste **la donnée locale factuelle,
datée et sourcée**, qu'aucun des deux ne trouve ailleurs. C'est déjà la ligne
du journal ; elle est confirmée, pas modifiée. Source :
[AI Platform Citation Source Index 2026](https://everything-pr.com/ai-platform-citation-source-index-2026)
(synthèse de 6 études, >680 M de citations, août 2024 – avril 2026), consultée
le 2026-09-15.

#### 4. Méthode — vérifier un chiffre de droit avant de le publier

Sortie du chantier du jour, et réutilisable partout. En cherchant les plafonds
d'honoraires de location 2026, **trois sources ont donné trois réponses** :
l'une les anciens montants (8/10/12), l'autre « pas encore fixés », la troisième
les nouveaux au centime. Aucune n'était malhonnête — **elles avaient des dates
de rédaction différentes**, et le texte qui fixe les montants (arrêté du
20 novembre 2025) est postérieur à celui qui annonce le principe (17 juillet
2025). → **Sur un chiffre de droit : deux sources professionnelles concordantes
minimum, et toujours identifier le texte ET sa date.** Une source récente mais
antérieure au dernier texte est fausse sans être mensongère. Publier un plafond
légal erroné sur le site d'une agence serait une faute comparable à celle
évitée le 08/09 sur le « 9 % ».

### 2026-09-13 — Méthode : baliser une entité, et ne jamais baliser plus que ce qu'on voit

Pas de veille aujourd'hui (**dimanche** — elle se fait le lundi ; celle du 07/09
reste la référence). Quatre méthodes réutilisables sont sorties du run.

- **⚠️ `WebFetch` ne sert pas à auditer du balisage — `curl` obligatoire.**
  L'outil convertit la page en markdown et **supprime les `<script>`** : il a
  affirmé « aucun JSON-LD » sur deux pages qui en servent, et compté 24 articles
  là où il y en a 26. **C'est le genre d'erreur qui fait refaire un travail déjà
  fait**, ou conclure à tort qu'une page est nue. Pour tout ce qui est balisage,
  comptage de balises, canonical ou méta : `curl` sur le HTML brut, et on lit
  soi-même.

- **Un site qui décrit son entreprise sur chaque page sans `@id` ne décrit pas
  une entreprise, il en décrit vingt.** C'est le défaut trouvé aujourd'hui, et
  il était invisible page par page : chaque bloc JSON-LD était correct isolément.
  Il ne se voit qu'en se demandant *« ces deux nœuds parlent-ils du même
  objet, et comment le moteur est-il censé le savoir ? »*. **Réflexe à garder :
  une entité récurrente (l'agence, le blog, une personne) doit avoir un `@id`
  unique et stable, déclarée en entier à un seul endroit et référencée partout
  ailleurs.**

- **Ne jamais convertir en nombre ce que la page n'affiche pas comme un nombre.**
  La tentation, sur un barème, est de tout passer en `price`. Mais « 8 €/m² »
  n'est pas un prix de 8 €, et « 6 % » n'est pas un prix du tout. Sur 27 offres,
  **5 seulement** ont reçu un `price` numérique ; les 22 autres gardent le tarif
  en texte, mot pour mot. Un balisage qui sur-affirme est pire qu'un balisage
  pauvre : il est **faux**, et il est opposable.

- **La garantie « impossible par construction » se généralise.** Le projet
  l'appliquait déjà aux FAQ (`faqLd(FAQ)` lit le tableau affiché). Elle vaut pour
  tout balisage dérivé d'un contenu visible : **construire le JSON-LD depuis la
  même constante que le rendu**, jamais le recopier. Corollaire trouvé
  aujourd'hui : quand une valeur est écrite **en dur dans le JSX** (les taux
  9 % et 2,5 % hors tableau), il faut **l'extraire en constante d'abord** —
  sinon c'est exactement là, et seulement là, que les deux versions divergeront
  un jour. Et le contrôle final ne se fait pas sur le code mais sur le rendu :
  **chercher chaque libellé et chaque tarif balisé dans le texte visible de la
  page servie** (2 libellés sur 27 ne passaient pas à la première passe — ma
  formulation, pas celle de la page).

### 2026-09-12 — Méthode : chercher la réponse qu'on possède déjà sans la publier

Pas de veille aujourd'hui (**samedi** — la veille se fait le lundi ; celle du
07/09 reste la référence). Quatre méthodes réutilisables sont sorties du run.

- **Avant d'écrire quoi que ce soit, inventorier ce que le site sait déjà et ne
  dit pas.** Le chantier du jour n'a demandé **aucune donnée neuve** : le barème
  d'honoraires existait depuis toujours sur `/honoraires`, et il n'était cité
  nulle part ailleurs — ni sur la page qui vise la requête commerciale n°1, ni
  dans `llms.txt`. La question que personne ne traite dans la SERP (« combien ça
  coûte ») avait donc sa réponse **déjà écrite, à un clic, et invisible**.
  → **Généralisable** : quand une SERP élude une question, vérifier d'abord si
  le site possède la réponse quelque part. C'est plus rapide qu'un calcul et
  c'est sans risque factuel.
- **Distinguer « ranker » et « être cité » permet de travailler des requêtes
  qu'on a renoncé à gagner.** Le journal avait classé « agence immobilière
  Villeurbanne » en requête perdue d'avance au contenu — et c'est vrai **au
  classement**. Mais la SERP dit aussi que personne n'y publie de prix : c'est
  une place vide pour un moteur de réponse, qui n'a pas d'annuaire à classer,
  seulement des passages à citer. → **Une requête « imprenable en SEO » peut
  rester ouverte en GEO. Ne pas confondre les deux verdicts.** (Nuance : cela ne
  vaut pas pour « agence immobilière Charpennes », où le problème n'est pas
  l'autorité mais l'homonymie avec un concurrent.)
- **Le meilleur test d'indexation s'use : le vérifier avant de s'y fier.** Le
  test « donnée exclusive » du 10/09 était une bonne idée, et il est devenu
  invalide en deux jours parce qu'un concurrent publie désormais le même chiffre
  à 12 € près. Personne ne l'aurait vu sans relire les résultats au lieu de
  compter les absences. → **Règle : avant de conclure d'un test négatif,
  revérifier que sa prémisse tient encore.** Corollaire : un test d'indexation
  doit se fonder sur une donnée **méthodologiquement** hors de portée des
  concurrents (un calcul de dispersion), pas seulement sur une donnée qu'ils
  n'ont pas encore publiée.
- **Le piège `</strong>` n'est pas une anecdote, c'est un défaut reproductible.**
  Noté le 11/09, il s'est reproduit **trois fois** le 12/09 dans un fichier
  neuf. Le déclencheur est identifié : dès qu'un `</strong>` tombe en fin de
  ligne dans le JSX, l'espace qui suit est avalé au build. → **Deux réflexes à
  garder : écrire `{" "}` explicitement après tout `<strong>` en fin de ligne,
  et relire le TEXTE RENDU après build** — un contrôle par regex
  (`[0-9€%²](?=[a-zA-Z])`) trouve ces collages en une seconde.

### 2026-09-11 — Méthode : chiffrer ce que les concurrents se contentent d'affirmer

Pas de veille aujourd'hui (**vendredi** — la veille se fait le lundi ; celle du
07/09 reste la référence). Quatre méthodes réutilisables sont sorties du run.

- **Chercher la phrase que tout le monde écrit sans jamais la chiffrer.** Les dix
  résultats de la SERP « estimation en ligne ou agence » affirment la même chose
  — l'agence est plus fiable — et **aucun ne dit de combien**. Une affirmation
  universellement répétée et jamais quantifiée est une **place vide** :
  la chiffrer donne un passage court, autonome, vérifiable, sans concurrence.
  → **Généralisable** : avant d'écrire un article de conseil, lister les
  affirmations que la SERP répète, et se demander laquelle nos données peuvent
  transformer en mesure. C'est plus rentable que d'écrire « mieux » la même
  chose.
- **Mesurer la faiblesse de sa propre méthode est un argument commercial, pas un
  aveu.** L'article démontre qu'une estimation au prix au m² se trompe souvent —
  alors que le site vend justement un outil d'estimation en ligne. Ce n'est pas
  un tir dans le pied : le chiffre qui « accuse » l'outil (36 % seulement) est
  celui qui **justifie la visite du conseiller**, donc le métier de l'agence. La
  preuve en est le détail le plus fort du run : passer de la médiane communale à
  celle du quartier ne fait gagner que **5 points** — donc l'essentiel de
  l'écart tient à ce qu'un humain seul peut voir.
  → **Généralisable** : quand une donnée semble desservir le client, vérifier
  d'abord à quoi elle sert *après* la phrase. Souvent elle vend l'étape
  suivante.
- **Recalculer avant de dériver, toujours.** Publier la dispersion *autour* de
  médianes déjà en ligne supposait que ces médianes tiennent encore. Elles ont
  été recalculées **entièrement** avant d'écrire une ligne — et elles
  correspondaient au chiffre près. Coût : une dizaine de minutes. Gain : la
  certitude de ne pas mettre quatre pages du site en contradiction.
  **Corollaire** : c'est ce recalcul qui a révélé l'étiquette « T5+ » inexacte
  (voir « Hypothèses »). Une vérification de routine trouve des choses que
  personne ne cherchait.
- **Reproduire une méthode décrite dans le journal : le piège du filtre.** La
  recette notée le 07/09 dit « une seule ligne bâtie par mutation ». Appliquée
  au pied de la lettre en comptant **aussi les dépendances** comme lignes bâties,
  elle donne **220 ventes au lieu de 1 875** (tout appartement avec une cave est
  écarté) et une surface médiane de 32 m² au lieu de 62. Le résultat était
  absurde et l'a signalé tout seul. **Règle : quand un pipeline reproduit un
  chiffre connu, le comparer à ce chiffre AVANT d'exploiter ses sorties.** Ici,
  « 1 875 ventes » publié servait de test de non-régression gratuit.
  → *Correction de la recette* : « une seule ligne **de logement**
  (`type_local` ∈ {Appartement, Maison}) par mutation » — les dépendances et les
  locaux commerciaux ne comptent pas.

### 2026-09-10 — Méthode : modifier un gabarit partagé et le prouver inoffensif

Pas de veille aujourd'hui (**jeudi** — la veille se fait le lundi ; celle du
07/09 reste la référence). Quatre méthodes réutilisables sont sorties du run.

- **Le test « donnée exclusive » : un diagnostic d'indexation gratuit.** Pour
  savoir si une page profonde est indexée sans GSC, chercher **un chiffre que
  seule cette page publie**. Si la page ne sort pas sur sa propre donnée
  exclusive, ce n'est pas une question de concurrence — personne d'autre ne peut
  répondre — c'est un problème d'indexation ou de crédibilité. **Bien plus
  informatif qu'une requête commerciale**, où l'absence s'explique par mille
  raisons. À refaire chaque run.
- **Rendre un changement risqué *démontrablement* inerte, au lieu de l'éviter.**
  Le maillage a été reporté 3 runs parce qu'il « touche le rendu des 26
  articles ». La sortie n'était pas d'oser, c'était de **choisir une syntaxe
  absente du contenu existant**, puis de le prouver : grep avant d'écrire, puis
  **double build (version modifiée vs `HEAD` stashée) + diff du texte rendu**.
  20/26 identiques à l'octet près, 6 modifiés = exactement les 6 voulus.
  → **Généralisable** : avant de renoncer à un chantier « qui touche à
  l'existant », chercher s'il existe une forme du changement dont l'inocuité se
  *mesure*. La règle « en cas de doute, ne pas faire » vise le doute, pas le
  risque : un risque mesuré n'est plus un doute.
- **Diffs de build : comparer le texte rendu, jamais le HTML brut.** Turbopack
  ré-hache les noms de chunks à chaque build, donc un `cmp` sur les `.html`
  donne « 100 % modifiés » et ne prouve rien. Retirer `<script>`/`<style>`,
  supprimer les tags, normaliser les espaces, puis comparer.
- **Un backlog n'est pas une mesure.** Le backlog annonçait « canonicals
  **manquants** » sur les pages légales. La production servait des canonicals
  **présents et faux** (pointant vers la home) — un problème différent, avec une
  cause différente (héritage des metadata du layout Next). Un item de backlog
  décrit un symptôme observé un jour donné ; **le refetch de l'étape 2 n'est pas
  une formalité, il requalifie le chantier**.

### 2026-09-09 — Méthode : produire de la donnée neuve sans nouveau calcul

Pas de veille aujourd'hui (**mercredi** — la veille se fait le lundi ; celle du
07/09 reste la référence). Trois méthodes réutilisables sont sorties du chantier.

- **La dérivation transparente vaut un calcul neuf.** On a produit une donnée
  que personne d'autre ne publie (« ce que 250 000 € achètent, par quartier »)
  **sans toucher une seule fois à DVF** : c'est une division du budget par une
  médiane déjà publiée, légendée comme telle. Coût : zéro. Risque de
  contradiction avec les pages existantes : zéro, puisque la source est la même.
  → **Avant de relancer un calcul, chercher quelle question de lecteur les
  chiffres déjà publiés permettraient de trancher sous un autre angle.** Un même
  jeu de médianes peut alimenter « combien ça coûte » (vendeur), « combien vaut
  mon bien » (estimation) et « ce que mon budget achète » (acheteur) sans jamais
  se répéter.
- **Écrire pourquoi on ne publie pas un chiffre est un contenu en soi.** On
  aurait pu afficher un rendement locatif par quartier en appliquant le loyer
  communal partout : c'est ce que font les sites concurrents, et c'est faux. Le
  dire explicitement dans l'article (« nous ne publions volontairement pas de
  rendement par quartier, voici pourquoi ») donne un passage court, autonome et
  factuel — exactement le format qu'une IA cite. **À réutiliser** : chaque fois
  qu'on renonce à un chiffre pour une raison méthodologique, la raison se publie.
- **Deux pages ne doivent jamais porter le même tableau.** L'article acheteur
  aurait pu reprendre le tableau des prix par quartier ; il ne reprend que les
  valeurs dont ses propres H2 ont besoin. Règle : **une donnée, une page
  canonique** ; les autres pages la citent en la transformant pour leur angle.

### 2026-09-08 — Méthode : garantir la correspondance JSON-LD ↔ contenu visible

Pas de veille aujourd'hui (**mardi** — la veille se fait le lundi, celle du
07/09 reste d'actualité). Deux méthodes réutilisables sont sorties du chantier :

- **Ne jamais recopier une FAQ ou une procédure dans son JSON-LD.** Déclarer un
  tableau JS (`FAQ`, `ETAPES`), le passer *à la fois* au rendu visible et au
  générateur de balisage (`faqLd(FAQ)`, `howToLd({steps: ETAPES})`). Le mismatch
  devient **impossible par construction**, au lieu d'être « vérifié une fois ».
  Outils désormais disponibles : `faqLd()` et `howToLd()` dans
  `components/seo/json-ld.tsx`, `<FaqBlock items={…}>` dans
  `components/seo/faq-block.tsx`. **Les réutiliser, ne pas en réécrire d'autres.**
- **Enrichir un gabarit partagé sans risque** : ajouter des **props
  optionnelles** (ici `updated` et `afterSections` sur `SeoLanding`) plutôt que
  de modifier le rendu existant. Les pages qui ne les passent pas sont
  strictement inchangées — et ça se vérifie en comparant le HTML pré-rendu.
- **Distinguer les erreurs de lint pré-existantes des siennes** : `git stash`,
  linter la version `HEAD`, `git stash pop`, comparer. Sur ce repo, 6 erreurs
  `react/no-unescaped-entities` / `no-html-link-for-pages` sont pré-existantes
  dans les pages SEO (plus 39 dans `scripts/` et `studio/`) : ne pas les
  « corriger » au passage, mais **ne jamais en ajouter**. Dans une page neuve,
  utiliser `next/link` et `&apos;` dès le départ.

### 2026-09-07 — Veille GEO (lundi)

Recherche sur l'état de l'art de la citation par les IA. Sources : rapports
d'éditeurs d'outils GEO (OtterlyAI, *The AI Citations Report 2026*, > 1 M de
citations analysées sur ChatGPT / Perplexity / AI Overviews ; The Digital Bloom,
*AI Citation Position & Revenue Report 2026*). **Ce sont des études d'éditeurs,
donc intéressées** — à traiter comme des indications de direction, pas comme des
lois.

Ce qui est **nouveau et applicable ici** :

- **La fraîcheur pèse très lourd.** Un contenu mis à jour dans les 30 derniers
  jours serait cité ~3,2× plus qu'un contenu ancien. → *Appliqué* : champ
  `updated` distinct de `date`, affiché en clair, repris dans `dateModified` et
  dans `lastModified` du sitemap. → *Conséquence pour les runs suivants* : mieux
  vaut **rafraîchir en profondeur un article existant** que d'en empiler un
  nouveau. Mais **ne bouger `updated` que si le contenu change vraiment** —
  redater sans réécrire est un signal de spam, pas une optimisation.
- **La densité factuelle prime sur la longueur.** Chiffres, dates et sources
  citées feraient remonter des pages pourtant mal classées en SEO classique
  (jusqu'à +40 % de visibilité en réponse IA). → C'est exactement le pari du
  chantier d'aujourd'hui : le site ne peut pas battre SeLoger en autorité, il
  peut le battre en **traçabilité du chiffre**.
- **Le début du contenu est surpondéré** : ~44 % des citations proviendraient
  des 30 premiers % de la page. → *Appliqué* : la réponse chiffrée complète est
  dans le **premier paragraphe**, pas gardée pour la conclusion.
- **L'autorité de domaine reste dominante** pour ChatGPT (sites très linkés
  cités ~3,5× plus). → À accepter : sur les requêtes génériques, on ne gagnera
  pas contre les portails. **Viser les requêtes longues et locales** où la
  donnée précise fait la différence (« prix m² quartier Gratte-Ciel »,
  « combien coûte un T3 à Villeurbanne »), pas « prix immobilier Lyon ».

À ne **pas** faire d'après cette veille : viser Reddit/Quora (qui captent une
grosse part des citations) — hors périmètre et contraire à la consigne client de
ne pas produire de faux contenu communautaire.

### Méthode réutilisable — recalculer un prix au m² local

La recette DVF + contours Grand Lyon décrite plus haut est **réutilisable telle
quelle pour n'importe quelle commune de la métropole** : changer le code INSEE
(69266 = Villeurbanne, 69123 = Lyon, 69266… voir data.gouv). Les deux pièges :
(1) ne garder que les mutations à **une seule ligne de logement**, sinon les
€/m² sont absurdes ; (2) utiliser la **médiane**, jamais la moyenne.

> ⚠️ **Précision ajoutée le 11/09, après s'y être fait prendre** : « une seule
> ligne de logement » = une seule ligne dont le `type_local` vaut
> **Appartement ou Maison**. Les **dépendances** (caves, parkings) et les locaux
> commerciaux ne comptent pas dans ce décompte. En les comptant, on écarte tout
> appartement vendu avec sa cave et on tombe à **220 ventes au lieu de 1 875**
> pour 2025. Autres filtres : `nature_mutation = Vente`, surface ≥ 10 m²,
> 800 ≤ €/m² ≤ 12 000. Les URLs DVF **redirigent** : utiliser `curl -sL`
> (sans `-L`, on récupère 138 octets de HTML et un fichier vide).
>
> **Chiffres de contrôle pour Villeurbanne 2025** (à réutiliser comme test de
> non-régression avant d'exploiter un nouveau calcul) : 1 876 ventes
> d'appartements exploitables, dont 1 875 rattachées à un quartier ; médiane
> communale 3 567 €/m² ; prix médian 195 000 € ; surface médiane 62 m².
