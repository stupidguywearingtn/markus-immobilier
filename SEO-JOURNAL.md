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

| Requête | 2026-09-15 | 2026-09-13 | 2026-09-12 | 2026-09-11 | 2026-09-10 | 2026-09-09 | 2026-09-08 | 2026-09-07 |
|---| --- | --- |---|---|---|---|---|---|
| **NOUVEAU — `qui paie les honoraires d'agence immobilière vente Villeurbanne`** | **absent**, **1ʳᵉ mesure**. SERP **entièrement nationale et générique** : Foncia, PAP, Crédit Agricole e-immobilier, Barraine, Propriétés Privées, Levine, + 2 blogs de coachs. **Zéro résultat local, zéro barème chiffré, zéro référence légale datée.** La réponse commune est « ça dépend du mandat, comptez 3 à 8 % ». **C'est la SERP la plus faible mesurée depuis le 11/09**, et c'est celle du chantier du jour. | — | — | — | — | — | — | — |
| agence immobilière Villeurbanne | **absent** du top 9 — **8ᵉ mesure, 8ᵉ absence**. SERP stable, deux rotations : **Square Habitat et ERA rentrent**, immodvisor et un des deux Nestenn sortent. Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn, ERA, Salengro, Immo de France, Decultieux. **9 résultats sur 9 sont des annuaires ou des franchises** — pire qu'au 13/09 (8 sur 9). | **absent** du top 9 — **7ᵉ mesure, 7ᵉ absence**. SERP à nouveau stable, une seule rotation : **immodvisor entre** (annuaire d'avis), Square Habitat sort. Laforêt, PagesJaunes, Orpi Cité Immo, Nestenn ×2, Salengro, Immo de France, Decultieux, immodvisor. **8 des 9 résultats sont des annuaires ou des franchises** — le constat du 09/09 tient sans exception depuis 7 runs. | **absent** du top 9 — **6ᵉ mesure, 6ᵉ absence**. SERP stable, une rotation par rapport à la veille (Square Habitat entre, ERA sort) : Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn ×2, Salengro, Immo de France, Decultieux. **C'est la requête de la page renforcée aujourd'hui** — mesure de référence avant chantier. | **absent** du top 9 — SERP **identique** à la veille à une rotation près (ERA ressort, Laforêt reprend la 1ʳᵉ place). Toujours annuaires + franchises. | **absent** du top 9 — SERP quasi identique, 1 rotation : Square Habitat entre, ERA sort (Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn ×2, Salengro, Immo de France, Decultieux) | absent du top 8 | absent | absent |
| estimation immobilière Villeurbanne gratuite en ligne | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 8 — SERP **très renouvelée** en 2 jours : 4 entrants (Square Habitat, MonMandatLocal, BienEstimer/safti, EN MODE IMMO) face à Nestenn ×2, imkiz, Salengro. **MonMandatLocal affiche « 1 998 transactions réelles »** : 2ᵉ acteur en 2 jours à mettre en avant la donnée de transaction. | *non remesuré* (SERP identique 3 jours de suite — effort reporté sur le chantier technique) | **absent** du top 9 | absent | absent |
| estimation immobilière en ligne ou agence Villeurbanne fiable | *non remesuré* | *non remesuré* | *non remesuré* (article réécrit la veille, beaucoup trop tôt) | **absent** du top 10 — **1ʳᵉ mesure**. Aucun résultat éditorial qui chiffre quoi que ce soit : Imop, Nestenn ×2, MeilleursAgents, Liberkeys, Orpi, imkiz, Onva, Salengro, Decultieux. Que des pages de service et une page de prix de portail. **SERP la plus faible rencontrée depuis le début du journal sur une requête d'intention vendeur.** | *non mesuré* | *non mesuré* | *non mesuré* | *non mesuré* |
| prix m2 Villeurbanne par quartier **2026** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (SERP renouvelée de moitié la veille, rien de neuf à en tirer en 24 h) | **absent** du top 8 — SERP **nettement renouvelée** : 4 entrants (fonciris, prix-au-m2.fr, regiefranchet, **immovrai, qui affiche « ventes DVF »**) face à SeLoger, PAP, MeilleursAgents, immosudest | absent du top 8 | absent | absent |
| vendre appartement Villeurbanne **agence** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 10 — que des portails et des franchises (Orpi ×2, Nestenn, leboncoin, Guy Hoquet, Logic-Immo, Century 21, Salengro, Quatuor, Chomel) | *non remesuré* | absent du top 7 | *non mesuré* |
| agence immobilière Gratte-Ciel Villeurbanne | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 8 (Human Immobilier, Guy Hoquet ×2, Orpi, PagesJaunes, MeilleursAgents, ERA, Superimmo ×2) | *non remesuré* | absent du top 8 | *non mesuré* |
| agence immobilière Charpennes Villeurbanne | *non remesuré* | *non remesuré* (requête écartée depuis le 11/09) | *non remesuré* (requête écartée le 11/09 : le nom du quartier est celui d'un concurrent) | **absent** du top 9 — SERP tenue par une agence locale homonyme (« Agence Charpennes Rolin Bainson », présente 4 fois via Logic-Immo, SeLoger, Superimmo, repimmo), + PagesJaunes, Orpi, Guy Hoquet. **Requête quasi imprenable au contenu** : le nom du quartier est le nom d'un concurrent. | *non remesuré* | **absent** du top 9 | *non mesuré* | *non mesuré* |
| où acheter à Villeurbanne quartier | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (article réécrit il y a 2 jours) | *non remesuré* (article réécrit il y a 1 jour, trop tôt) | **absent** du top 8 | *non mesuré* | *non mesuré* |
| quel quartier choisir pour acheter un appartement à Villeurbanne 2026 | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (idem) | *non remesuré* (idem) | **absent** du top 8 | *non mesuré* | *non mesuré* |
| investir locatif Villeurbanne : rendement et quartier **2026** | *non remesuré* | *non remesuré* (mais voir la ligne du nouveau test : **ma-rentabilite.fr publie prix, loyers ET rendement par quartier villeurbannais** — 3ᵉ confirmation que cette SERP est fermée) | **absent** du top 7 — **1ʳᵉ mesure**. SERP tenue par des spécialistes de l'investissement qui publient **tous** des prix ET des rendements par quartier (lybox, investissement-locatif.com, CPIM, geraldinearrou, Hagnéré, MonInvestImmo). **Terrain fermé, pas ouvert** : contrairement aux SERP acheteur et estimation, la donnée chiffrée y est déjà la norme. **Mais leurs chiffres ne sont pas les nôtres** : CPIM annonce « Charpennes 5 120 €/m² » quand DVF donne 3 524 €/m² sur Charpennes – Tonkin. Piste éditoriale notée en backlog. | *non mesuré* | *non mesuré* | *non mesuré* | *non mesuré* | *non mesuré* |
| 🟢 **TEST D'INDEXATION** — `"87 rue Édouard Vaillant" 69100 Villeurbanne agence immobilière` | *non remesuré* | *non remesuré* (acquis le 10/09) | *non remesuré* (acquis le 10/09) | *non remesuré* (acquis le 10/09, la home est indexée — inutile de le repayer chaque jour) | **markusimmobilier.fr PRÉSENT** dans les résultats | *non mesuré* | *non mesuré* | *non mesuré* |
| 🔴 **TEST D'INDEXATION PROFONDE** — `"Ferrandière – Maisons-Neuves" médiane 3 923 €/m²` | *non remesuré* | *non remesuré* — **test abandonné** : un concurrent publie le même chiffre (12/09), il ne diagnostique plus rien. Remplacé par la ligne ci-dessous. | 🔴 **toujours absent** du top 9, **J+5**. Fait nouveau et important : **bien-estimer/safti publie 3 911 €/m² pour Ferrandière – Maisons-Neuves** et MeilleursAgents tient le quartier. **Notre médiane 3 923 €/m² n'est plus un chiffre exclusif** — à 12 € près, un concurrent publie le même. Le test perd donc sa valeur de diagnostic d'indexation : il faudra en trouver un autre (voir « Hypothèses »). | 🔴 **toujours absent** du top 8 (J+4 après la réécriture de l'article prix). SeLoger, MeilleursAgents et les portails sortent sur le nom du quartier, aucun ne publie ce chiffre. **2ᵉ test ajouté aujourd'hui, même résultat** : `Villeurbanne 250 000 € combien de m² Gratte-Ciel Cyprian Les Brosses` → 0 résultat de markusimmobilier.fr, alors que le tableau budget → surface n'existe que chez nous. | **absent** du top 8, alors que ce chiffre exact n'est publié que par nous | *non mesuré* | *non mesuré* | *non mesuré* |
| 🔴 **NOUVEAU TEST D'INDEXATION PROFONDE** (remplace celui de Ferrandière) — `Villeurbanne estimation "erreur médiane" 15,5 % prix au m² quartier ventes DVF 2025` | 🔴 **absent** du top 7, **2ᵉ mesure, J+2**. SERP presque inchangée (prix-au-m2, immovrai, lespriximmo, immosudest, fonciris) avec 2 entrants — **immo-land.fr** et **valoris-immo.fr**. Le moteur n'a de nouveau **pas trouvé le chiffre** : il répond que la métrique « n'apparaît pas dans les résultats ». **Échéance du protocole inchangée : ~27/09.** Rien à conclure à J+2. | 🔴 **absent** du top 8, **1ʳᵉ mesure**. Le test est bâti sur un chiffre que **personne d'autre ne calcule** (l'erreur médiane d'une estimation au prix au m², publiée le 11/09) : la concurrence ne peut pas le produire, contrairement à la médiane de Ferrandière. Le moteur de réponse a même répondu explicitement que *« cette information n'apparaît pas dans les résultats »*. Résultats : imkiz, prix-au-m2.fr, lespriximmo, **immovrai**, **ma-rentabilite.fr**, immosudest, fonciris, indice-ville. | — | — | — | — | — | — |

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

**Angle des deux derniers runs : contenu sur une page de fond** (15/09, deux
fois). Angles précédents : données structurées (13/09), page « argent » (12/09),
contenu blog (11/09). → **Le prochain run ne doit reprendre aucun de ces
angles**, et surtout pas « contenu de page ». L'angle **maillage interne** dans
le blog reste le plus rentable d'après la veille du 15/09 : **c'est le point 5**
— le volet `/estimation` ↔ quartiers est fait, le volet blog (20 articles
n'émettant aucun lien) est entier.

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

*(rien à corriger de runs précédents : ce journal démarre aujourd'hui)*

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
