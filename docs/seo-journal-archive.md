# SEO-JOURNAL — archive

> Entrées de plus de 30 jours déplacées depuis `SEO-JOURNAL.md` (règle : le journal dépasse 16 000 lignes). « État des lieux », « Techniques apprises » et « Erreurs commises et corrigées » restent dans le journal.

## Chantiers faits — archivés le 2026-10-30 (entrées antérieures au 2026-09-30)

### 2026-09-29 — L'article « frais de notaire » cessait de répondre à sa propre question : le taux voté par la Métropole de Lyon, publié et chiffré quartier par quartier (349 → 2 519 mots)

**Pourquoi ce chantier, et pas un autre.** Le journal du 28/09 avait écrit deux
consignes pour aujourd'hui : (a) **un run de contenu** (le 28/09 était
technique) ; (b) candidat n°1 = **le passif des articles minces**, et dedans,
« plutôt les articles *argent* du milieu de classement » —
`frais-de-notaire-lyon-2026` (349 mots) étant nommé en premier. Les deux ont été
tenues. Le choix entre les quatre candidats « argent » a été tranché par la
**mesure de SERP de l'étape 2**, pas par le backlog : sur
`frais de notaire achat appartement ancien Lyon Villeurbanne calcul`, la page 1
est faite de **simulateurs** (notaires de Lyon, Immonot ×2,
immobilier.notaires.fr, mesfraisnotaire, calculfraisdenotaire) — et surtout,
**une agence villeurbannaise y classe avec une page « Calcul des frais de notaire
à Lyon 3, Villeurbanne et Lyon »** (`onva-immobilier-villeurbanne.fr`). Un
concurrent direct occupe donc le terrain, avec un outil ; nous étions absents,
avec 349 mots qui **esquivaient la question** (« vérifiez le taux du Rhône au
moment de l'achat »).

#### Le défaut de fond : l'article renvoyait le lecteur à une vérification qu'il ne pouvait pas faire

Mesuré en production avant d'agir : **349 mots**, 4 H2 dont **aucun ne pose de
question**, aucune FAQ, `BlogPosting` + `BreadcrumbList` seulement. Et une
phrase qui résume le problème : « Depuis 2025, les départements peuvent majorer
leur part jusqu'à 0,5 point […] **vérifiez le taux du Rhône au moment de
l'achat** ». Trois erreurs en une : (1) on demande au lecteur de faire le travail
qu'on lui promet ; (2) **Villeurbanne ne relève pas du département du Rhône**
mais de la **Métropole de Lyon**, qui vote son propre taux — les deux sont
listées comme deux collectivités distinctes par la DGFiP ; (3) le site ne
publiait donc, sur sa requête la plus chiffrable, **aucun chiffre local**.

#### Ce qui a été publié, et d'où viennent les chiffres

- **Le taux, de première main.** Le tableau DGFiP « Droits d'enregistrement et
  taxe de publicité foncière — taux applicables au **1ᵉʳ juin 2026** » a été
  **téléchargé** depuis `impots.gouv.fr` (c'est la version la plus récente :
  `dmto_2026-07/08/09.pdf` renvoient 404, `dmto_2026-06.pdf` répond).
  Ligne **« 69 Métropole de Lyon » : 5,00 % / 4,50 %**. La ligne voisine,
  « 69 Rhône (hors métropole de Lyon) », confirme que ce sont bien deux
  collectivités.
- **La taxe communale à 1,20 %, démontrée et pas supposée.** Le même document
  liste, en annexe, **les deux seules communes de France ayant voté une
  réduction en 2026** (Lamentin 971 → 0,70 %, soit −0,50 ; Tsingoni 976 →
  0,50 %, soit −0,70). Les deux réductions ramènent au même taux de départ :
  **1,20 %**, et **Villeurbanne n'est pas dans la liste**.
- **Le prélèvement de l'État** : 2,37 % du droit départemental (art. 1647, V du
  CGI), confirmé au BOFiP.
- **La fenêtre du dispositif** : majoration possible « au-delà de 4,50 % et dans
  la limite de 5 % », « trois ans à compter du 1ᵉʳ avril 2025 » → **1ᵉʳ avril
  2025 au 31 mars 2028** (BOFiP, version du 17/06/2026).
- **Le primo-accédant** : « première propriété » destinée « à l'usage de sa
  résidence principale », au sens de **l'article L. 31-10-3 du CCH** — soit
  ne pas avoir été propriétaire de sa résidence principale au cours des deux
  années précédentes.
- **Le barème des émoluments** (3,945 / 1,627 / 1,085 / 0,814 %, tableau 5 n° 54
  de l'art. A. 444-91 du code de commerce), corroboré par deux sources
  indépendantes dans la même session.
- **Les prix** : les médianes DVF 2025 de `lib/quartiers.ts`, inchangées.

**Ce que l'article publie et que personne d'autre ne publie** : le croisement des
deux. Trois tableaux — les trois taxes avec leurs deux colonnes acheteur
ordinaire / primo-accédant ; **taxes + émoluments à l'euro près pour un 62 m²
(la surface médiane villeurbannaise) au prix médian de chacun des 7 quartiers**,
de 12 871 € à Cyprian – Les Brosses à 18 231 € à Ferrandière – Maisons-Neuves ;
et **l'économie primo-accédant chiffrée par quartier**, de 869 € à 1 245 €
(998 € au prix médian communal). Aucun simulateur de la page 1 ne fait ça : ils
demandent un prix à l'utilisateur, ils ne lui disent pas ce que coûte son
quartier.

#### Volet GEO appliqué

6 H2 **tous formulés en questions réelles** (+ un 7ᵉ « Méthode et sources »),
chacun ouvrant par une **réponse directe en gras de 2–3 phrases** qui se suffit
à elle-même — un extracteur qui ne prend que le premier paragraphe d'un H2
repart avec le taux, le montant et la condition. **FAQ de 6 Q/R** visible et
reprise à l'identique en `FAQPage` (vérifié sur le HTML rendu : 6/6, questions
**et** réponses présentes dans le visible). `dateModified` au 2026-09-29,
« Mis à jour le 29 septembre 2026 » visible en tête. Chaque tableau porte une
**légende de source datée**.

#### Ce qui a été volontairement NON fait

- 🔴 **`rentabilite-locative-lyon` n'a pas été touché**, alors que le calcul du
  jour montre que son hypothèse de **7,5 %** présentée comme « milieu de la
  fourchette de l'ancien » est en réalité **une hypothèse basse** : taxes +
  émoluments pèsent déjà **7,49 % à 7,72 %** aux prix villeurbannais, **avant**
  débours et contribution de sécurité immobilière. Ce n'est pas une
  contradiction de fait (l'article annonce 7,5 % comme une hypothèse de calcul,
  pas comme une mesure), mais c'est une formulation à corriger. La corriger
  suppose de **recalculer une colonne entière et huit montants** — trop pour un
  ajout de fin de run. **C'est le petit chantier de demain** (voir « Chantiers
  en attente »).
- **Les débours et la contribution de sécurité immobilière ne sont pas
  chiffrés.** Leur taux n'a pas pu être établi de première main depuis ce
  conteneur (Legifrance 403, le BOFiP consulté ne les donne pas). Plutôt
  qu'inventer, l'article **écrit noir sur blanc qu'il ne les chiffre pas** et
  explique pourquoi. C'est ce qui rend le reste crédible.
- **Aucune remise chiffrée sur les émoluments.** La seule source lisible donnait
  un seuil et un plafond que la deuxième ne confirmait pas ; le texte se limite
  donc au **principe** (remise possible, à la main du notaire, applicable à tous
  ses clients dans les mêmes conditions), sans chiffre.
- **Aucun nouveau lien entrant posé.** Le maillage n'est pas rouvert sans mesure
  (règle du 24/09) ; l'article reçoit déjà un lien de corps de
  `rentabilite-locative-lyon`.

#### Contrôles avant push

`npx tsc --noEmit` muet ; `npm run lint` sans **aucune** nouvelle erreur sur
`lib/blog.ts` (les 25 erreurs du dépôt sont préexistantes et toutes dans
`scripts/` et `studio/`) ; `npm run build` réussi ; page servie en local :
**2 519 mots dans `<article>`** (contre 349), **4 tableaux rendus**, **7 H2**,
**zéro markdown brut** (`**` introuvable dans le HTML, 30 `<strong>`), **tous les
liens de corps convertis en `<a href>`** (0 occurrence de `](/`), JSON-LD
`BlogPosting` + `FAQPage` + `BreadcrumbList` + `RealEstateAgent` valides.
`git status` ne montre **qu'un seul fichier modifié**, `lib/blog.ts` : aucune
autre page ne peut avoir bougé.

#### Garde-fou posé dans le code

L'en-tête de `lib/blog.ts` gagne un paragraphe : cet article est désormais **le
plus dépendant de `lib/quartiers.ts`** (7 médianes de quartier + surface médiane
+ prix médian communal + 4 prix médians par typologie, tous **dérivés** en euros),
donc si les médianes bougent ses trois tableaux doivent être **recalculés, pas
patchés**. Et surtout, une péremption qui n'existait dans aucun autre article :
**ses taux fiscaux ont leur propre date de fin, le 31/03/2028**, indépendante de
DVF. C'est écrit dans le code, pas seulement ici.

### 2026-09-28 — Le signal « page experience » audité pour la première fois : 1,29 Mo de PNG brut servis par la home, et tous les médias du site en `max-age=0`

**Pourquoi ce chantier, et pas un autre.** Le journal du 27/09 avait écrit deux
consignes pour aujourd'hui : (a) la **veille hebdomadaire d'abord**, en retard
de sept jours ; (b) **pas un run de contenu**, le 27/09 en était un. Les deux
ont été tenues. Parmi les candidats non-contenu, le backlog plaçait en tête
« un signal jamais audité », avec quatre noms : **poids et format des images**,
**temps de réponse / Core Web Vitals**, **en-têtes HTTP de cache**, cohérence
des ancres internes. La veille du matin a tranché entre eux : la documentation
de Google sur les fonctionnalités d'IA **liste « Providing a great page
experience for users » parmi ce qui compte**, et **retire explicitement** le
schema spécial et les fichiers machine du lot — ce qui enterre le candidat n°2
du backlog (« ajouter du `BreadcrumbList` sur `/annonces` ») et promeut celui-ci.
Les trois premiers signaux ont donc été audités ensemble, sur les 53 URLs.

#### Défaut n°1 — la home servait 1,29 Mo de PNG non optimisé

Mesuré en production, pas déduit du code : les 53 URLs du sitemap ont été
téléchargées et balayées à la recherche de tout `src="…"` d'image **ne passant
pas par `/_next/image`**. Résultat : **exactement 2 pages sur 53**, et c'est le
même fichier sur les deux —

| | avant | après (mesuré sur l'optimiseur de production) |
|---|---|---|
| Photo d'équipe, `/` et `/equipe` | **1 355 682 o**, `image/png`, 842 × 1264 | **47 534 o**, `image/webp`, à 750w |

Soit **−96,5 %**, et **~1,29 Mo économisés par visite sur la home** — la page
la plus importante du site. Les paliers intermédiaires ont été mesurés sur le
même fichier : 19 914 o à 384w, 38 676 o à 640w.

**Cause, lue dans le code et non supposée.** `components/team/team-card.tsx`
rendait une balise `<img>` précédée d'un `// eslint-disable-next-line
@next/next/no-img-element`. Le commentaire n'expliquait pas pourquoi, mais la
lecture de `EditableImage` l'a donné : le back-office permet de **coller une URL
à la main** (« Utiliser cette URL »), donc l'URL peut pointer sur n'importe quel
hôte, et `next/image` **refuse** un hôte absent des `remotePatterns`. Passer
bêtement le composant à `next/image` aurait donc fait **disparaître l'image**
dans ce cas d'usage du client.

**Ce qui a été fait, avec le garde-fou correspondant.** La photo passe par
`next/image` **seulement si l'URL est couverte par `next.config.ts`** (tout
`*.supabase.co`, d'où viennent les photos téléversées) **ou servie par le site**
(chemin relatif). Sinon, la balise `<img>` d'origine est conservée à
l'identique. Le prédicat est écrit pour coller aux `remotePatterns` du fichier
de config, pas à une liste parallèle qui dériverait.

Un `sizes` a été calé sur la **largeur réelle de la carte dans la grille** —
identique sur la home et `/equipe` (`max-w-content` = 1240 px, `px-8`, `gap-7`,
1 → 2 → 3 colonnes), soit **373 px au-delà de 1024 px**. Sans lui, `next/image`
aurait demandé une image dimensionnée pour la largeur du viewport, 4 à 5 fois
trop grande.

`TeamCard` est utilisé **par la home et par `/equipe`** (c'est écrit en en-tête
du composant) : le correctif profite donc bien aux deux pages mesurées, et à
aucune autre.

#### Défaut n°2 — tous les médias du site en `max-age=0, must-revalidate`

Deuxième volet du même audit. En production :

| chemin | `cache-control` mesuré avant |
|---|---|
| `/_next/static/chunks/*.js` | `public, max-age=31536000, immutable` ✅ |
| `/videos/hero-desktop.mp4` (2 289 574 o) | `public, max-age=0, must-revalidate` 🔴 |
| `/TONYPISTILLY.png`, `/brand/*.svg`, `/vendus/*` | `public, max-age=0, must-revalidate` 🔴 |
| `/_next/image?url=/vendus/…&w=750` | `public, max-age=0, must-revalidate` 🔴 |

Le site déclarait donc ses bundles JavaScript immuables pour un an et sa vidéo
de 2,3 Mo revalidable à chaque navigation.

**Et le mécanisme a été établi dans les deux sens, pas supposé** : l'optimiseur
d'images **recopie le `cache-control` de l'amont**. Vérifié en local après
correctif — `/_next/image` d'un fichier couvert sort en `max-age=604800`, celui
d'un fichier **non** couvert retombe sur le plancher de Next (`max-age=14400`).
C'est la preuve que le `max-age=0` vu en production sur les images optimisées
venait bien de l'amont `public/`, et non d'un défaut de Next.

**Ce qui a été fait** : un bloc `headers()` dans `next.config.ts` sur
`/videos/:path*`, `/brand/:path*`, `/vendus/:path*`, `/annonces/:path*` →
`public, max-age=604800, stale-while-revalidate=86400`.

**Pourquoi sept jours et pas `immutable`** : `immutable` sur un fichier de
`public/` est un piège opérationnel — le jour où le client remplace
`hero-desktop.mp4` **sous le même nom**, les visiteurs déjà venus garderaient
l'ancienne vidéo un an. À sept jours, le gain est acquis dès la deuxième page
vue et le pire cas de péremption est une semaine.

#### Ce qui a été mesuré et déclaré SAIN — à ne pas réauditer

- **TTFB de 0,29 s à 0,67 s** sur 9 pages clés, transfert total ≤ 0,70 s.
- **Compression `br`** active sur le HTML.
- `/_next/static/*` correctement en `immutable`.
- **Aucune autre image hors `next/image`** sur les 53 pages.
- Les **5 `<img>` brutes restantes du code** sont dans `/admin`, `/radar` et
  `opengraph-image` — **aucune page publique**. *(Attention : le `grep '<img '`
  ne les trouve pas toutes, voir « Erreurs commises » du jour.)*

#### Volet GEO du run

**Rien à appliquer, et c'est volontaire.** Le run n'a touché **aucune ligne de
contenu, aucun H2, aucun JSON-LD et aucune FAQ** : il n'y avait donc pas de
« réponse directe en tête » à écrire ni de `dateModified` à bouger. Écrire une
date de mise à jour sur une page dont le texte n'a pas changé serait
exactement le mensonge de fraîcheur corrigé le 24/09. Le seul volet GEO fait
est un **contrôle** : `llms.txt` (16 369 octets) cite 48 URLs, **toutes vivantes
au sitemap**.

#### Contrôle qualité

- `tsc --noEmit` : **0 erreur**. `eslint` sur les deux fichiers : **0 erreur**.
- `next build` complet : **réussi**, 53 routes.
- Serveur de production local relu sur `/equipe` et `/` : `srcSet` complet,
  `sizes` correct, `loading="lazy"` conservé, `alt` conservé, et le cadrage
  `fill` produit exactement `position:absolute;height:100%;width:100%;left:0;
  top:0;right:0;bottom:0` — **équivalent aux classes `absolute inset-0 w-full
  h-full` précédentes**. Section équipe toujours rendue sur la home, carte
  « Pourquoi pas vous ? » intacte, **zéro image hors `next/image`** dans le HTML
  rendu.
- En-têtes relus en local : les quatre chemins sortent bien en `max-age=604800`.
- **Ce qui n'a pas pu être vérifié d'ici, et qui est donc une hypothèse à
  contrôler demain en production** : que Vercel n'écrase pas ces en-têtes à
  l'edge. Le contrôle local prouve la config, pas le comportement de l'hébergeur.
- **L'outil d'estimation n'a pas été approché** (ni formulaire, ni `lib/dvf.ts`,
  ni `lib/estimation.ts`, ni le bloc de résultat).

### 2026-09-27 — `investir-locatif-lyon` publie l'écart entre prix affichés et prix signés à Villeurbanne, et découvre au passage qu'une page de première page Google se contredit de 23 % sur sa propre URL

**Type de run : contenu blog.** Choisi parce que le dernier run réel (24/09)
était technique et que **les runs des 25 et 26/09 n'ont pas eu lieu** : le
chantier que le journal avait inscrit pour le vendredi 25/09, en toutes lettres
et déjà sourcé, attendait intact. Il n'a donc pas été choisi par habitude mais
récupéré — et remesuré avant d'être exécuté (règle du 24/09).

**Le problème, mesuré en production avant d'agir.** `/blog/investir-locatif-lyon`
servait **260 mots**, 4 `<h2>` dont aucun ne posait de question, **aucun
chiffre**, aucune FAQ, aucune date de mise à jour, et `BlogPosting` +
`BreadcrumbList` pour tout balisage. C'était le dernier des deux articles
« investissement » à n'avoir jamais été repris — son voisin
`rentabilite-locative-lyon` l'a été le 23/09.

**Le créneau, mesuré le même matin.** Sur « prix au m² annoncés sites
investissement contre prix réellement payés Villeurbanne », le moteur répond
**explicitement** que les résultats « ne contiennent pas spécifiquement de
données comparatives entre les prix annoncés sur les sites d'investissement
locatif et les prix réellement payés aux notaires ». Neuf résultats, aucun ne
publie cette mise en regard.

**Ce qui a été trouvé en téléchargeant les pages, et qui a fait le chantier.**
Cinq chiffres, quatre sources, un seul marché — tous relevés le 27/09/2026 sur le
HTML des pages, jamais dans un résumé (règle du 23/09) :

| Source | Prix au m² | Nature | Période |
|---|---|---|---|
| `cpim.fr` — réponse en tête d'article | **4 380 €/m²** | prix moyen ancien, **provenance non précisée** | avril 2026 |
| `cpim.fr` — encadré DVF, **bas de la même page** | **3 548 €/m²** | médiane des ventes, IQR 2 930–4 137, 3 550 ventes | 2024-2025 |
| `moninvestimmo.com` (page du 20/08/2026) | **3 548 €/m²** | médiane DVF recalculée, 3 550 ventes | 2024-2025 |
| `trackstone.fr` | **3 520 €/m²** | prix **moyen** des ventes | 2025 |
| **Nous** | **3 567 €/m²** | médiane DVF, 1 875 ventes d'appartements | 2025 |

Deux faits en sortent, et ils tiennent tous les deux sans interprétation.

1. 🔴 **Une page de première page Google se contredit elle-même de 23 % sur son
   propre sujet.** `cpim.fr/villeurbanne-prix-m2-quartiers/` (mise à jour le
   11/08/2026) ouvre sur 4 380 €/m² sans en dire la provenance, et publie plus
   bas, sur la même URL, un encadré sourcé DVF à 3 548 €/m². La formulation la
   plus citable qui en découle — et elle est arithmétique, pas polémique :
   **4 380 €/m² se situe au-dessus du prix payé pour les trois quarts des
   appartements réellement vendus à Villeurbanne**, puisque le quartile supérieur
   de son propre encadré s'arrête à 4 137 €/m².
2. 🟢 **Nos médianes viennent de recevoir leur première vérification externe
   indépendante**, et ce n'était pas cherché. Quatre des cinq valeurs ci-dessus
   tiennent dans **1,3 %**. Par quartier, moninvestimmo tombe à 0,7 %, 2,4 % et
   2,5 % de nous sur Cusset, Gratte-Ciel et Grandclément. Trois acteurs qui ne
   nous lisent pas, partant des mêmes ventes enregistrées, arrivent au même
   endroit. **Ce journal cherchait depuis le 07/09 un moyen de contrôler ses
   propres médianes autrement qu'en les recalculant : le voici.**

**L'angle publié, et pourquoi c'est celui-là.** L'article ne dit pas « les autres
mentent » : il montre **quel prix chacun mesure**. La ligne de partage n'est pas
entre les sites et nous, elle est entre **un prix demandé dans une annonce et un
prix signé chez un notaire** — démonstration faite par le contre-exemple
moninvestimmo, qui est un site d'investissement et qui tombe sur nos chiffres
parce qu'il part du DVF.

**Ce qui a été ajouté sur la page** (260 → **2 544 mots rendus**, 6 H2 tous
formulés en questions réelles) :

- le tableau des cinq sources ci-dessus, chaque provenance datée et nommée ;
- le tableau des écarts par quartier, **traduits en euros sur un T2 de 45 m²** :
  Cusset – Bonnevay +16,1 % (22 905 €), Gratte-Ciel +17,5 % (30 330 €), Buers –
  Croix-Luizet +19,8 % (29 205 €), Charpennes – Tonkin +45,3 % (71 820 €),
  commune entière +22,8 % (36 585 €) ;
- **la réfutation de l'explication de confort « c'est moyenne contre médiane »** :
  trackstone publie une *moyenne* et elle tombe **1,3 % SOUS** notre médiane, pas
  23 % au-dessus. Le mode de calcul n'explique donc pas l'écart ;
- une procédure en **5 étapes** pour vérifier soi-même un prix signé sur
  `app.dvf.etalab.gouv.fr`, avec les deux limites de la base (révision
  rétroactive, et elle ignore étage / état / DPE / copropriété) ;
- une **FAQ de 6 Q/R** rendue visiblement et en `FAQPage`, disjointe de celle du
  voisin du 23/09 ;
- trois liens de corps sortants (rendement, dispersion, guide des quartiers) et
  **un lien entrant** ajouté depuis `rentabilite-locative-lyon`, posé sur la
  phrase qui l'appelait déjà (« ils partent des prix payés, pas des prix
  demandés ») — méthode du 16/09, pas un lien forcé.

**Les réserves écrites sur la page, et elles jouent contre notre chiffre.** C'est
délibéré : un écart de +45 % annoncé sans réserve serait un argument, pas une
mesure.

- **Le +45,3 % de Charpennes est en partie un effet de périmètre**, et la page le
  dit : notre contour officiel « Charpennes – Tonkin » englobe le Tonkin, que
  cpim.fr traite à part **à 3 920 €/m²**. Comparer « Charpennes » seul à
  l'ensemble gonfle mécaniquement l'écart. Les quatre autres lignes ne souffrent
  pas de ce biais dans les mêmes proportions.
- **Les périodes diffèrent** (nos médianes : 2025 close ; les prix affichés :
  avril et août 2026). Un marché qui remonte creuse une part de l'écart sans que
  personne ne se trompe.
- **Un prix d'annonce au-dessus d'un prix signé n'est pas un prix menteur** —
  écrit tel quel, avec le rappel que certaines ventes se concluent au-dessus du
  prix demandé.

**Ce qui a été volontairement laissé de côté.**

- **Aucun rendement, aucun frais de notaire, aucun encadrement des loyers, aucune
  taxe foncière** : c'est le territoire du voisin réécrit le 23/09, et le backlog
  interdisait explicitement de le reprendre. La page y renvoie par un lien et en
  tire une seule phrase (un prix 20 % plus haut coûte ~1/6 du rendement brut).
- **Aucune liquidité par quartier, aucune résistance depuis 2022.** L'idée était
  inscrite au backlog comme « second volet » de cet article ; la lecture du code a
  montré que **`ou-acheter-villeurbanne-quartiers` les publie déjà** (655 contre
  53 ventes, −2,0 % contre −13,2 %). Republier ces séries aurait été un doublon :
  elles sont liées, pas recopiées. **Le backlog se trompait, la mesure a
  tranché** — deuxième fois en quatre runs (voir le 24/09).
- **Le 3 743 €/m² attribué à MeilleursAgents** par moninvestimmo n'est pas
  publié : `meilleursagents.com` et `seloger.com` rendent **HTTP 403** à ce
  conteneur, l'attribution n'a donc pas pu être vérifiée de première main. Une
  attribution d'attribution reste une rumeur (règle du 23/09).
- **`PAGE_LASTMOD` n'a pas été touchée** : aucune page statique n'a changé, seul
  un article de blog, dont la date vit dans son champ `updated`.

**Contrôles avant push** (procédure des 18 et 21/09, sur le HTML **servi** par un
`next start` lancé sur un port neuf — piège du 21/09) : `tsc --noEmit` et
`eslint` propres, `npm run build` OK, **2 544 mots**, 1 `<h1>`, 6 H2, **0 espace
perdue** au détecteur exact `<!-- -->`, **0 markdown brut**, `FAQPage` **6/6
retrouvés au mot près dans le texte visible**, canonical et `og:url` sur la bonne
page, `og:image` présente, `article:modified_time` / `dateModified` / `lastmod` /
date visible **tous au 27/09** via la source unique, `llms.txt` régénéré depuis
`ARTICLES` avec le nouveau titre et le nouvel extrait.

🔴 **Deux défauts de rendu trouvés par la relecture humaine, et par elle seule.**
Les deux détecteurs mécaniques étaient au vert quand le texte servi affichait
encore `*en dessous*` et `` `app.dvf.etalab.gouv.fr` `` **avec leurs délimiteurs
bruts** : le rendu des articles ne gère que `**gras**` et `[texte](href)`, pas
l'italique simple ni le code inline. Corrigé avant push. Voir « Erreurs commises
et corrigées ».

### 2026-09-24 — La fraîcheur déclarée du site devient une donnée unique et vraie : fin de l'espace réservé publié sur deux pages légales, fin de la page qui se contredisait, et 9 pages de fond enfin datées

**Type de run : technique / données.** Choisi parce que le 23/09 était un run
de contenu (règle : jamais deux d'affilée) et parce que le candidat « maillage »
inscrit pour aujourd'hui **a été invalidé par la mesure** (voir « État des
lieux » : le nouvel article reçoit 4 liens entrants, pas 1).

**Le problème, mesuré avant d'agir, en trois défauts d'une seule cause.**

La cause unique : **la fraîcheur du site était déclarée à trois endroits, par
trois copies manuelles indépendantes** — la table `PAGE_LASTMOD` du sitemap, un
`const UPDATED` recopié dans chaque page, et rien du tout côté JSON-LD. Trois
copies, donc trois occasions de diverger, et elles avaient divergé :

1. **Un espace réservé de rédaction publié en production.**
   `/confidentialite` et `/cookies` servaient littéralement
   `Dernière mise à jour : [À DATER au jour de la mise en ligne]`. Vérifié dans
   le HTML rendu, pas dans le source (règle du 18/09).
2. **Une page qui se contredisait.**
   `/estimation-immobiliere-villeurbanne` : **8 septembre** à l'écran,
   **12 septembre** dans le sitemap. L'arbitrage a été fait sur l'historique
   git, pas à la louche — voir « la date retenue » ci-dessous.
3. **Aucune date structurée hors du blog.** 26 `BlogPosting` datés, **21 pages
   statiques sans aucune date**, `/honoraires` comprise.

Pourquoi ça compte au-delà de la propreté : l'entrée du 17/09 rappelle que
Google ignore un `lastmod` jugé non fiable **pour tout le fichier**, articles et
annonces compris. Une page qui annonce deux fraîcheurs différentes est
exactement ce qui fabrique cette méfiance. Et côté GEO, une date visible et
concordante est un des rares signaux que les moteurs de réponse lisent
directement.

**Ce qui a été fait.**

- **`lib/seo/lastmod.ts` (nouveau)** — la table `PAGE_LASTMOD` quitte
  `app/sitemap.ts` et devient **source de vérité unique**, avec `lastmodOf()`
  et `fmtDateFr()`. `lastmodOf()` **lève au build** si un chemin manque : une
  page ne peut plus afficher une date tenue d'une constante locale.
  **Aucune valeur de date n'a été modifiée** au passage — la table est
  déplacée telle quelle.
- **`app/sitemap.ts`** — importe la table au lieu d'en détenir une copie.
  43 lignes retirées, aucun changement de comportement (vérifié, voir
  « contrôles » ci-dessous).
- **`/confidentialite` et `/cookies`** — l'espace réservé disparaît et laisse
  place à la vraie date, **10 septembre 2026**, tenue de la table (c'est la date
  du dernier commit ayant touché le contenu de ces pages, celui des canonicals
  du 10/09).
- **Les 4 pages qui recopiaient `const UPDATED = "…"`**
  (`/estimation-immobiliere-villeurbanne`, `/agence-immobiliere-villeurbanne`,
  `/gestion-locative`, `/faire-gerer`) lisent désormais `lastmodOf()`.
  **Trois d'entre elles ne bougent pas d'un mot** — leur copie était encore
  juste, et c'est la preuve que l'unification est inerte. La quatrième corrige
  la contradiction.
- **`webPageLd()` (nouveau, `components/seo/json-ld.tsx`)** — une entité
  `WebPage` dont le seul rôle est de dater la page, posée sur **9 pages de
  fond**. Pourquoi une entité à part : `dateModified` est une propriété de
  `CreativeWork` ; `FAQPage` en est un, mais **`Service` et `OfferCatalog` n'en
  sont pas** — les dater aurait été du schema.org invalide. Elle tient sa date
  de la même ligne que l'affichage, donc **le structuré ne peut plus
  contredire le visible**.
- **`/honoraires` reçoit enfin une date visible** — « Barème en vigueur —
  dernière mise à jour : 15 septembre 2026 », en tête du tableau des honoraires.
  C'est la page que ce journal désigne depuis le 20/09 comme la plus citable du
  site, et elle n'affichait aucune date.
- **`/estimation-immobiliere-lyon` reçoit sa date visible** (8 septembre 2026)
  via la propriété `updated` que `SeoLanding` supportait déjà.

**La date retenue pour `/estimation-immobiliere-villeurbanne` : 12 septembre.**
Les deux valeurs étaient défendables, l'arbitrage méritait d'être écrit. Le
commit du 12/09 dit en toutes lettres « Date de mise à jour non bougée », et il
n'a touché qu'**une seule ligne** de cette page — mais cette ligne est la
réponse d'une FAQ **visible**, dont une affirmation non sourcée (« 15 à 20 % »)
a été remplacée par une mesure sourcée (erreur médiane 15,5 %, 36 % des ventes à
moins de 10 %). La règle d'entretien de la table exclut de redater pour « un
correctif technique, un changement de style ou un lien ajouté » : **une réponse
de FAQ réécrite n'est aucun des trois**. C'est un changement de contenu visible,
donc 12/09. La valeur du sitemap avait raison, l'affichage avait tort.

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**

- **Ne pas dater `/vendre` et `/acheter`**, alors que la mécanique était prête
  et que le geste coûtait une ligne. `/vendre` n'a pas changé de contenu depuis
  le **24 juin**. Afficher « dernière mise à jour : 24 juin 2026 » sur la page
  de vente principale, c'est publier un signal de péremption sans contrepartie
  de citation. La bonne correction est de **rafraîchir le contenu d'abord** —
  c'est un run de contenu, inscrit au backlog. Redater à vide était l'autre
  option : elle est interdite ici, et c'est précisément le défaut que ce
  chantier corrige.
- **Ne pas toucher aux 3 pages quartiers**, qui affichent `MAJ` tenu de
  `lib/quartiers.ts` (la date de la **donnée DVF**, pas de la page). Les deux
  valeurs coïncident aujourd'hui (15/09) ; les fusionner mélangerait deux
  notions différentes pour un gain nul. Elles reçoivent en revanche leur
  `webPageLd`.
- **Ne pas toucher `llms.txt`** : aucune page n'a été ajoutée ni supprimée, et
  le fichier ne porte pas de dates. Vérifié, pas supposé.
- **Ne pas dédupliquer les 4 copies de `fmtDate`** repérées au passage
  (`seo-landing`, `faire-gerer`, `blog/[slug]`, `blog/page`). C'est du
  refactoring sans effet SEO, et la consigne est de ne pas refactoriser ce qui
  marche. `fmtDateFr` est disponible pour les prochains usages.

**Contrôles avant push.**

- `npx tsc --noEmit` : **0 erreur**.
- `eslint` : **inchangé** — 25 erreurs / 11 avertissements avant comme après,
  et les 2 erreurs du fichier `estimation-immobiliere-lyon` sont préexistantes
  (mêmes 2 `react/no-unescaped-entities`, décalées de 11 lignes).
- `npm run build` : **OK**, code de sortie 0.
- **HTML pré-rendu relu** (règle du 18/09) : sur les 11 pages touchées, la date
  visible et le `dateModified` du JSON-LD **concordent 9 fois sur 9** là où les
  deux existent ; **1 `<h1>` par page** ; **tous les blocs JSON-LD parsent**.
  `grep "À DATER"` sur tout le rendu : **aucune occurrence**.
- **Non-régression mesurée en comparant le rendu au HTML de production** : les
  7 pages dont la date ne devait pas changer sont à **delta 0 mot**
  (`/estimation-immobiliere-villeurbanne`, les 3 quartiers,
  `/agence-immobiliere-villeurbanne`, `/faire-gerer`, `/gestion-locative`).
  Les 4 deltas non nuls sont tous expliqués : `/honoraires` +12 et
  `/estimation-immobiliere-lyon` +8 (la ligne de date ajoutée),
  `/confidentialite` et `/cookies` −6 (l'espace réservé de 8 mots remplacé par
  une date de 3 mots). Les pages **non touchées** sont à delta 0, sauf `/` (−50)
  et `/equipe` (−2), **écart connu et documenté le 18/09** : les annonces et
  l'équipe publiées en base ne sont pas dans le conteneur.
- **Sitemap comparé ligne à ligne au sitemap de production** : **aucun `lastmod`
  ne change**, sauf `/` et `/annonces` — les deux seules pages `LISTING_DRIVEN`,
  dont la date est `max(page, dernière annonce)` et qui retombent sur la table
  faute des 2 annonces en base. Même cause que les 51 URLs locales contre 53 en
  ligne. **Ce n'est pas une régression de ce chantier.**

**✅ Vérifié en production après déploiement** (Vercel a mis ~1 minute) — les
11 pages touchées ont été retéléchargées et relues :

- **L'espace réservé a disparu du site** : `grep "À DATER"` sur les 11 pages
  servies ne rend **aucune occurrence**. `/confidentialite` et `/cookies`
  affichent « Dernière mise à jour : **10 septembre 2026** ».
- **La contradiction est levée** : `/estimation-immobiliere-villeurbanne` sert
  **12 septembre 2026** à l'écran **et** `"dateModified":"2026-09-12"` en
  JSON-LD — la même valeur que son `lastmod` au sitemap.
- **Date visible ↔ `dateModified` : 9 accords sur 9** (les 2 pages légales
  n'ayant pas de `webPageLd`, sans objet).
- **1 `<h1>` par page**, **tous les blocs JSON-LD parsent**, aucun bloc perdu.
- `/honoraires` sert bien sa date (**15 septembre 2026**) et ses 5 JSON-LD.
- **`sitemap.xml` : 53 URLs avant, 53 après, et ZÉRO `lastmod` modifié**,
  comparé ligne à ligne au sitemap téléchargé en début de run. Le déplacement
  de la table est donc inerte côté sitemap, comme prévu.
- ⚠️ 4 des 11 téléchargements ont rendu `000` au premier passage et `200` au
  réessai — le proxy du conteneur, pas le site (voir « Techniques apprises »).

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

**✅ Vérifié en production après déploiement** (Vercel a pris ~1 minute, 4
tentatives de polling à 15 s). `/blog/rentabilite-locative-lyon` sert bien
**2 379 mots**, 7 `<h2>`, **2 tableaux**, **zéro markdown brut**, les 4 JSON-LD,
`dateModified` = `2026-09-23`, la **correspondance `FAQPage` ↔ texte visible
sans écart sur les 6 Q/R**, le canonical sur la bonne page, une `og:image` et
la date visible « Mis à jour le 23 septembre 2026 ». Le `sitemap.xml` en ligne
reste à **53 URLs** — aucune URL créée, c'est une réécriture — avec `lastmod`
au 23/09 sur cette seule page, et `llms.txt` porte le nouvel extrait chiffré.
Les deux pages touchées indirectement sont saines elles aussi :
`ou-acheter-villeurbanne-quartiers` sert la nouvelle fourchette 4,47–6,40 % et
ses **5 Q/R restent conformes à son `FAQPage`** ; `investir-locatif-lyon` sert
son lien de corps vers l'article réécrit, sans markdown brut, et passe de 225 à
260 mots — il reste mince, c'est assumé, il est au backlog.

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

### 2026-09-21 — `/gestion-locative` : l'arbitrage « déléguer ou gérer seul » chiffré, et le fait que personne ne publie — au loyer médian villeurbannais, les honoraires de gestion ne sont **pas** déductibles

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

