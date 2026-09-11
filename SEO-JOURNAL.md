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

| Requête | 2026-09-11 | 2026-09-10 | 2026-09-09 | 2026-09-08 | 2026-09-07 |
|---|---|---|---|---|---|
| agence immobilière Villeurbanne | **absent** du top 9 — SERP **identique** à la veille à une rotation près (ERA ressort, Laforêt reprend la 1ʳᵉ place). Toujours annuaires + franchises. | **absent** du top 9 — SERP quasi identique, 1 rotation : Square Habitat entre, ERA sort (Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn ×2, Salengro, Immo de France, Decultieux) | absent du top 8 | absent | absent |
| estimation immobilière Villeurbanne gratuite en ligne | **absent** du top 8 — SERP **très renouvelée** en 2 jours : 4 entrants (Square Habitat, MonMandatLocal, BienEstimer/safti, EN MODE IMMO) face à Nestenn ×2, imkiz, Salengro. **MonMandatLocal affiche « 1 998 transactions réelles »** : 2ᵉ acteur en 2 jours à mettre en avant la donnée de transaction. | *non remesuré* (SERP identique 3 jours de suite — effort reporté sur le chantier technique) | **absent** du top 9 | absent | absent |
| estimation immobilière en ligne ou agence Villeurbanne fiable | **absent** du top 10 — **1ʳᵉ mesure**. Aucun résultat éditorial qui chiffre quoi que ce soit : Imop, Nestenn ×2, MeilleursAgents, Liberkeys, Orpi, imkiz, Onva, Salengro, Decultieux. Que des pages de service et une page de prix de portail. **SERP la plus faible rencontrée depuis le début du journal sur une requête d'intention vendeur.** | *non mesuré* | *non mesuré* | *non mesuré* | *non mesuré* |
| prix m2 Villeurbanne par quartier **2026** | *non remesuré* (SERP renouvelée de moitié la veille, rien de neuf à en tirer en 24 h) | **absent** du top 8 — SERP **nettement renouvelée** : 4 entrants (fonciris, prix-au-m2.fr, regiefranchet, **immovrai, qui affiche « ventes DVF »**) face à SeLoger, PAP, MeilleursAgents, immosudest | absent du top 8 | absent | absent |
| vendre appartement Villeurbanne **agence** | *non remesuré* | **absent** du top 10 — que des portails et des franchises (Orpi ×2, Nestenn, leboncoin, Guy Hoquet, Logic-Immo, Century 21, Salengro, Quatuor, Chomel) | *non remesuré* | absent du top 7 | *non mesuré* |
| agence immobilière Gratte-Ciel Villeurbanne | *non remesuré* | **absent** du top 8 (Human Immobilier, Guy Hoquet ×2, Orpi, PagesJaunes, MeilleursAgents, ERA, Superimmo ×2) | *non remesuré* | absent du top 8 | *non mesuré* |
| agence immobilière Charpennes Villeurbanne | **absent** du top 9 — SERP tenue par une agence locale homonyme (« Agence Charpennes Rolin Bainson », présente 4 fois via Logic-Immo, SeLoger, Superimmo, repimmo), + PagesJaunes, Orpi, Guy Hoquet. **Requête quasi imprenable au contenu** : le nom du quartier est le nom d'un concurrent. | *non remesuré* | **absent** du top 9 | *non mesuré* | *non mesuré* |
| où acheter à Villeurbanne quartier | *non remesuré* (article réécrit il y a 2 jours) | *non remesuré* (article réécrit il y a 1 jour, trop tôt) | **absent** du top 8 | *non mesuré* | *non mesuré* |
| quel quartier choisir pour acheter un appartement à Villeurbanne 2026 | *non remesuré* (idem) | *non remesuré* (idem) | **absent** du top 8 | *non mesuré* | *non mesuré* |
| 🟢 **TEST D'INDEXATION** — `"87 rue Édouard Vaillant" 69100 Villeurbanne agence immobilière` | *non remesuré* (acquis le 10/09, la home est indexée — inutile de le repayer chaque jour) | **markusimmobilier.fr PRÉSENT** dans les résultats | *non mesuré* | *non mesuré* | *non mesuré* |
| 🔴 **TEST D'INDEXATION PROFONDE** — `"Ferrandière – Maisons-Neuves" médiane 3 923 €/m²` | 🔴 **toujours absent** du top 8 (J+4 après la réécriture de l'article prix). SeLoger, MeilleursAgents et les portails sortent sur le nom du quartier, aucun ne publie ce chiffre. **2ᵉ test ajouté aujourd'hui, même résultat** : `Villeurbanne 250 000 € combien de m² Gratte-Ciel Cyprian Les Brosses` → 0 résultat de markusimmobilier.fr, alors que le tableau budget → surface n'existe que chez nous. | **absent** du top 8, alors que ce chiffre exact n'est publié que par nous | *non mesuré* | *non mesuré* | *non mesuré* |

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

**Angle du dernier run : contenu (réécriture d'article).** Le prochain run doit
**rebasculer sur un chantier technique ou structurel** — ne pas enchaîner deux
réécritures. Les meilleurs candidats sont les points 4 et 5 ci-dessous ; le
point 1 reste l'action client la plus utile à rappeler.

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

4. **Bloc auteur + `author` sur les articles** (E-E-A-T) — actuellement
   `author` = Organization. Un auteur humain identifié (Tony Pistilli) serait
   plus fort. Bon candidat pour le prochain run technique.

5. **Étendre le maillage aux 20 articles non touchés le 10/09.** La syntaxe
   existe désormais, mais seuls 6 articles sur 26 émettent un lien. **À faire
   par petits lots** (5-6 articles par run, en complément d'un autre chantier),
   jamais d'un coup : poser 40 liens en une fois, sur des ancres proches, est un
   motif de sur-optimisation. Règle appliquée le 10/09 à conserver : **un lien
   seulement là où la phrase existante l'appelle déjà**.

---

## Hypothèses à vérifier

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
