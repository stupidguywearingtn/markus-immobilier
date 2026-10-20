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

**Au 2026-10-20**

- ✅ **AUCUN RUN MANQUÉ.** `git fetch origin` **en tout premier** (règle du 16/09) :
  avant fetch `origin/main` pointait sur `906585e`, après fetch **toujours sur
  `906585e`**, et **deux commits portent la date du 2026-10-19** — le run d'hier
  a bien eu lieu. 🆕 **Et c'est la PREMIÈRE configuration de départ saine en huit
  runs** : `HEAD`, `main` local et `origin/main` concordaient tous les trois au
  démarrage (`906585e`). 📌 **Ne pas en tirer de règle** : les sept runs
  précédents avaient sept configurations différentes, et le `main` local a
  retardé de huit puis quatorze commits. **Le `git fetch` d'abord reste
  obligatoire** — ici il a simplement confirmé au lieu de corriger.
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  **Vingt-sixième constat identique** (21/09 → 20/10).
- ⚠️ **L'auteur Git du conteneur est `Claude <noreply@anthropic.com>` au
  démarrage.** Reconfiguré en `Yanis Ouammou
  <93429758+stupidguywearingtn@users.noreply.github.com>` **avant le commit**
  (sinon Vercel Hobby bloque le build). **Neuvième confirmation : à refaire à
  chaque run.**
- ✅ **LA RECETTE DE PUSH TIENT POUR LE TROISIÈME RUN D'AFFILÉE.**
  `git branch -f main HEAD && git push -u origin main` → `906585e..5a1476f
  main -> main`, puis `origin/main == HEAD` vérifié. **Déploiement constaté
  entre t+80 s et t+100 s** (sondage toutes les 18–20 s). Même ordre de délai
  que les 18 et 19/10. ⚠️ **Trois `curl` ont échoué pendant le sondage**
  (`Recv failure: Connection reset by peer`, `SSL_ERROR_SYSCALL`) : ce sont des
  incidents de proxy, **pas** une absence de déploiement — relancer, ne pas
  conclure.
- Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** (l'hôte sans `www`
  répond 308).
- **Mardi : pas de veille** (faite le lundi 19/10, et son résultat était
  négatif). **Prochaine échéance : lundi 26/10.**
- 🟢 **LA SEULE REQUÊTE CIBLE DUE A ÉTÉ MESURÉE, et les interdits respectés.**
  « Vendre appartement Villeurbanne » (deux mesures par mois, dernière le
  13/10) — **site absent**, 9 résultats. Les deux SERP gelées
  (« agence immobilière Villeurbanne », « estimation immobilière Villeurbanne »)
  **n'ont pas été interrogées** : interdiction du 16/10 **jusqu'au 23/10**,
  toujours en vigueur. « Prix m2 Villeurbanne » a été mesurée le 19/10,
  **prochaine échéance le 26/10**.
  *(Résultats : `pap.fr` (annonce), **`laforet.com` ×2** — deux pages de blog de
  l'agence Villeurbanne-République —, `orpi.com/actualites/vente-appartement-villeurbanne`,
  `capifrance.fr`, `immo.trovit.fr` ×2, `zimo.fr` ×2.)*
  📌 **Deux faits de cette SERP :**
  - ⚠️ **`laforet.com` est le premier concurrent AGENCE à tenir deux positions
    sur une requête cible avec du CONTENU éditorial**, et non des annonces.
    Mais **ses deux pages sont périmées et le disent** : l'une est titrée
    « Villeurbanne en 2024 », l'autre publie **3 258 €/m² sur des transactions
    de 2019**. Le résumé du moteur l'a relevé de lui-même (« ses données de
    transactions datent de 2019, donc elles sont probablement obsolètes »).
  - 🟢 **`pap.fr` publie 3 623 €/m² (192 019 € pour 53 m²)** : **+1,6 %** au-dessus
    de notre médiane DVF signée 2025 (3 567 €/m²). **C'est le deuxième écart
    faible mesuré en deux runs**, après `blog.qoridor.fr` à −1,7 % le 19/10,
    alors que toutes les sources relevées du 27/09 au 18/10 étaient 16 à 45 %
    au-dessus. ⚠️ **Deux mesures ne font pas une tendance** (règle du 14/10) :
    à reconfirmer avant d'en tirer quoi que ce soit sur la thèse « affiché ≠
    signé ».
- 🟢 **CHANTIER DU JOUR : NON-CONTENU, comme prescrit le 19/10, et sur LE
  CANDIDAT N°1 DÉSIGNÉ — la justesse JURIDIQUE des trois dernières entrées de
  `/llms.txt`** (`/gestion-locative`, `/faire-gerer`, `/honoraires`).
  **Le candidat est entièrement consommé.** Détail en « Chantiers faits ».
- 🔴 🆕 **LE DÉFAUT CENTRAL EST UNE RÈGLE ABROGÉE DEPUIS SIX ANS, PUBLIÉE COMME
  EN VIGUEUR.** `/faire-gerer` écrivait « **Tous les trois ans**, le conseil
  syndical met en concurrence plusieurs projets de contrat de syndic ». Cette
  périodicité triennale a été **supprimée au 1ᵉʳ juin 2020** par l'**ordonnance
  n° 2019-1101 du 30 octobre 2019 (art. 20)**, qui a réécrit l'article 21 de la
  loi du 10 juillet 1965. 📌 **Et la cause de l'erreur est identifiable** : ce
  qui dure trois ans, c'est le **mandat** du syndic. **Deuxième fois après le
  17/10 (article 121 de la LF 2026) qu'une loi citée par une page avait été
  réécrite** — c'est désormais une famille, pas un accident.
- 🔴 **SIX DÉFAUTS AU TOTAL, dont trois de référence et un de périmètre qui
  faisait agir le lecteur ILLÉGALEMENT** : la liste des obligations du bailleur
  qui gère seul prescrivait « réviser le loyer une fois par an » **sans
  condition**, alors que réviser le loyer d'un logement **classé F ou G est
  interdit** depuis le 24/08/2022 ; le décompte de charges était rattaché à
  l'**article 21** (c'est l'**article 23**, 25-10 en meublé) ; la déductibilité
  des honoraires de gestion à l'**art. 31, I-1°-a** du CGI (c'est le **e**) ;
  le terme de l'option pour le régime réel était faux **dans le sens
  défavorable au lecteur** ; et `/honoraires` citait un « arrêté du 20 novembre
  2025 » **qui n'existe pas** (c'est la date de publication au JO ; l'arrêté est
  du **13 novembre 2025**). **C'est la 9ᵉ à 11ᵉ phrase de périmètre ou de
  référence fausse depuis le 11/10.**
- 🟢 **LE DÉTECTEUR DU 19/10 A SERVI ET IL A PAYÉ DEUX FOIS.** « La source citée
  dit-elle ce que la page affirme ? » : la page citait `BOI-RFPI-BASE-20-10`
  pour un alinéa **que ce BOI contredit à son § 20**, et `BOI-RFPI-DECLA-10`
  pour un terme d'option **que son § 250 contredit**. **Dans les deux cas, la
  source était la bonne et l'affirmation à côté était fausse** — exactement le
  motif décrit hier.
- 🔴 **UN DÉFAUT DE MA PROPRE RÉDACTION, TROUVÉ AVANT DE POUSSER, ET IL ÉTAIT
  DU TYPE QUE CE JOURNAL TRAQUE** : j'avais écrit que le « Malraux » exclut le
  micro-foncier. **Le § 60 du BOI dit l'inverse, noir sur blanc.** Détail en
  « Erreurs commises ».
- ✅ **PLUSIEURS RÈGLES VÉRIFIÉES JUSTES ET INCHANGÉES — NE PAS LES RÉAUDITER** :
  Villeurbanne **est** bien en zone tendue et non en zone très tendue (celle-ci
  = Paris et certaines communes d'Île-de-France, CCH D.304-1), donc **10,09 et
  3,03 €/m²** sont les bons plafonds ; **art. 6 de la loi Hoguet** ; **arrêté du
  10 janvier 2017 modifié le 26 janvier 2022** (et c'est ce modificatif qui a
  introduit la notion de **prix maximums**, ce que la page dit déjà) ;
  **art. 22** (dépôt de garantie, 91 €) ; **art. 9-1 de la loi de 1965** (PNO) ;
  **décret n° 2015-342** ; **calendrier de décence énergétique G 2025 / F 2028 /
  E 2034**, confirmé en vigueur ; dispense de mise en concurrence à la
  **majorité de l'art. 25** ; et **toute l'arithmétique des barèmes** (652 + 20
  = 672 €, 272 €, 417 €, 29 m², 3 258 €, 482/355/281 €, 585 €) **se recalcule**.
- ⚠️ **LÉGIFRANCE EST TOUJOURS INACCESSIBLE DEPUIS CE CONTENEUR — règle du 17/10
  confirmée, et avec un symptôme neuf à connaître.** `WebFetch` répond **403**,
  et `curl` **403 avec un `<title>Just a moment…</title>`** : c'est un mur
  Cloudflare, pas un problème d'URL. 🟢 **Et le substitut qui a tranché TOUT le
  run est l'ANIL** (agence publique) : c'est elle qui a donné le tableau complet
  des plafonds par zone avec leurs textes, et la date d'abrogation de la
  périodicité triennale. **Voir « Techniques apprises ».**
- ⚠️ **`lastmod` : TROIS ont bougé, et c'est une rupture assumée avec les treize
  runs précédents.** `/gestion-locative`, `/faire-gerer` et `/honoraires`
  passent au **2026-10-20** — seules URL des 53 de production à cette date.
  📌 **Motif, à opposer à la décision du 18/10 de NE PAS bouger `/acheter`** : le
  18/10 corrigeait **un euro sur trois montants**, sans rien apporter au
  lecteur. Ici, chacune des trois pages voit **une règle de droit changer de
  contenu** — une périodicité abrogée retirée, une interdiction ajoutée, un
  terme d'option corrigé. **La décision du 06/10 interdit d'acheter de la
  fraîcheur, pas de la déclarer quand elle est réelle.**
- ✅ **Signaux mesurés SAINS en PRODUCTION — ne pas les réauditer** :
  `npx tsc --noEmit` muet ; `npm run build` **vert (88/88 pages)** ;
  `npx eslint` propre sur les cinq fichiers touchés ; **53 URL au sitemap** ;
  les trois pages servent **2 236 / 2 099 / 1 197 mots** (contre 1 891 / 1 965 /
  1 127 avant le run), **1 `<h1>` chacune**, **5 / 6 / 5 blocs JSON-LD**, et
  **parité FAQ visible ↔ `FAQPage` 6/6 questions ET 6/6 réponses sur les
  trois** ; `dateModified` **2026-10-20** sur les trois ; **0 mot collé** ;
  « Dernière mise à jour : 20 octobre 2026 » visible sur `/gestion-locative` et
  `/faire-gerer`.
- ⚠️ 🆕 **PIÈGE DE MESURE À CONNAÎTRE — `wc -w` et `len(t.split())` ne donnent
  PAS le même nombre de mots** sur ces pages (2 099 contre 2 200 pour
  `/faire-gerer`, à contenu identique) : les espaces insécables du rendu.
  **Pendant quelques minutes, l'écart local ↔ production a ressemblé à un
  déploiement partiel.** 📌 **Comparer deux mesures faites avec le MÊME
  compteur, ou vérifier des CHAÎNES plutôt que des totaux** — c'est la
  vérification par chaînes qui a tranché.
- ✅ **Les 24 valeurs et références neuves sont servies en production** et **les
  4 formulations retirées ont disparu**, vérifié page par page et dans
  `/llms.txt` après déploiement (`31, I-1°-e`, `§ 20`, `§ 60`, `§ 240`, `§ 250`,
  `§ 90 à 130`, `article 23`, `25-10`, `2019-1101`, `30 octobre 2019`,
  `31 mai 2020`, `1ᵉʳ juin 2020`, `13 novembre 2025`, `20 novembre 2025`,
  `article 5 de la loi du 6 juillet 1989`, `F1310`, `F2066`, `F947`,
  `24 août 2022`, `foyer fiscal`, `Périssol`, `Loc'Avantages`, `20 000`,
  `100 000` — retirées : `I-1°-a`, « Le même article oblige », « Tous les trois
  ans, le conseil syndical », « arrêtés des 17 juillet et 20 novembre »).
- ✅ **`/estimation`, `lib/dvf.ts` et `lib/estimation.ts` NON touchés** —
  `git status` vérifié : **diff du chantier = 5 fichiers**
  (`app/gestion-locative/page.tsx`, `app/faire-gerer/page.tsx`,
  `app/honoraires/page.tsx`, `app/llms.txt/route.ts`, `lib/seo/lastmod.ts`).
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** : `/equipe` enchaîne
  `h1` sur `h3` (30/09) ; la page 404 sert deux `<meta name="robots">` non
  contradictoires (04/10) ; 6 `<a>` bruts pour des liens internes (06/10) ;
  indentation JSX bizarre mais sans effet sur deux pages de quartier (08/10).
  🆕 **Et un constat neuf : `/honoraires` ne sert AUCUN « Dernière mise à jour »
  visible**, là où `/gestion-locative` et `/faire-gerer` en ont un. **Non ajouté
  aujourd'hui** : cette page n'utilise ni `seo-landing` ni le bloc inline des
  deux autres, donc l'ajout touche au rendu d'une mise en page que je n'ai pas
  lue — voir « Chantiers en attente ».

**Au 2026-10-19**

- ✅ **AUCUN RUN MANQUÉ.** `git fetch origin` **en tout premier** (règle du 16/09) :
  avant fetch `origin/main` pointait sur `1cc9814`, après fetch sur `261c2ec`, et
  **trois commits portent la date du 2026-10-18** — le run d'hier a bien eu lieu.
  🆕 **Septième configuration de départ en sept runs** : la branche de session
  (`claude/dazzling-feynman-8se0ds`) et `origin/main` étaient tous deux sur
  `261c2ec`, le `main` LOCAL retardait de **quatorze commits** (`1cc9814`).
  📌 **Et c'est la deuxième fois que le `main` local retarde de plus de huit
  commits : ne jamais lire `git log main` sans fetch d'abord.**
- ✅ **LA RECETTE DE PUSH DU 18/10 FONCTIONNE ET N'A PAS BESOIN D'ÊTRE
  RETOUCHÉE.** `git branch -f main HEAD && git push -u origin main` →
  `261c2ec..60f651c main -> main`, puis `origin/main == HEAD` vérifié.
  **Déploiement constaté à t+60 s** (sondage toutes les 20 s : 2 414 mots à t+20
  et t+40, 4 364 mots à t+60). Même délai qu'hier.
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  **Vingt-cinquième constat identique** (21/09 → 19/10).
- ⚠️ **L'auteur Git du conteneur est `Claude <noreply@anthropic.com>` au
  démarrage.** Reconfiguré en `Yanis Ouammou
  <93429758+stupidguywearingtn@users.noreply.github.com>` **avant le commit**
  (sinon Vercel Hobby bloque le build). **Huitième confirmation : à refaire à
  chaque run.**
- Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** (l'hôte sans `www`
  répond 308).
- ✅ **LUNDI : LA VEILLE A ÉTÉ FAITE, ET EN PREMIER** (dernière le 12/10).
  **Prochaine échéance : lundi 26/10.** Résultat résumé en « Techniques
  apprises » — et **l'essentiel est négatif, ce qui est une information** :
  la page officielle `developers.google.com/search/updates` ne porte **aucun
  changement de données structurées** en septembre ni en octobre 2026.
  **Rien à appliquer, rien à corriger : ne pas refaire cette recherche avant le
  26/10.**
- 🟢 **LA SEULE REQUÊTE CIBLE DUE A ÉTÉ MESURÉE, et les interdits respectés.**
  « Prix m2 Villeurbanne » (hebdomadaire, dernière le 12/10) — **site absent**,
  9 résultats. Les deux SERP gelées (« agence immobilière Villeurbanne »,
  « estimation immobilière Villeurbanne ») **n'ont pas été interrogées** :
  interdiction du 16/10 **jusqu'au 23/10**, toujours en vigueur.
  « Vendre appartement Villeurbanne » est à deux mesures par mois (dernière le
  13/10).
- 🔴 🆕 **ET CETTE MESURE APPORTE UN FAIT NEUF QUI COMPTE : UN CONCURRENT ARRIVE
  SUR NOTRE ANGLE EXACT.** `blog.qoridor.fr` apparaît deux fois (page commune et
  **page de quartier Charpennes**) et publie des **prix DVF par quartier** —
  3 506 €/m² pour Villeurbanne « juillet 2026, 1 678 transactions notariales »,
  4 096 €/m² pour Charpennes « au 1er juillet 2026 ». **C'est la première fois
  qu'un acteur de cette SERP publie du DVF par quartier**, c'est-à-dire
  exactement ce qui fait la valeur de nos pages. 📌 **Et son chiffre communal
  (3 506 €/m²) est à −1,7 % de notre médiane DVF signée 2025 (3 567 €/m²) : à
  la différence de toutes les sources relevées depuis le 27/09, celui-là n'est
  PAS un prix affiché gonflé.** À suivre — voir « Chantiers en attente ».
  *(Autres résultats : `efficity.com` ×2 dont une page de RUE, `orpi.com`
  4 267 €/m² sans date, `realadvisor.fr` page de rue, `squarehabitat.fr`
  3 443 €/m² janvier 2026, `netvendeur.com`, `solvimo.com`.)*
- 🟢 **CHANTIER DU JOUR : CONTENU, comme prescrit le 18/10, et sur LE CANDIDAT
  N°1 DÉSIGNÉ — `plus-value-immobiliere-calcul`, pris côté JUSTESSE JURIDIQUE.**
  **2 414 → 4 364 mots.** Détail en « Chantiers faits ».
- 🔴 **UNE AFFIRMATION PUBLIÉE ÉTAIT FAUSSE, ET SA PROPRE SOURCE DISAIT LE
  CONTRAIRE.** La page écrivait « le vendeur n'a pas de démarche séparée à
  faire » en citant la fiche F10864 — laquelle demande de **reporter la
  plus-value en case 3VZ de la 2042-C**. **Première fois dans ce journal qu'un
  défaut se trouve en relisant la source que la page cite elle-même, sans aucun
  autre indice.** C'est un contrôle à ajouter : voir « Techniques apprises ».
- 🔴 **TROIS DÉFAUTS DE PÉRIMÈTRE, dont un qui faisait perdre de l'argent au
  lecteur** : l'exonération de résidence principale était conditionnée à
  l'occupation « au moment de la vente » sans mentionner les **six
  assouplissements** du BOFiP (un vendeur déjà déménagé en concluait qu'il
  l'avait perdue) ; les dépendances étaient données exonérées **sans condition**
  (il en faut deux) ; et l'**exonération de la première cession d'un logement
  autre que la RP** était absente du H2 qui pose exactement sa question.
  **C'est la 6ᵉ, 7ᵉ et 8ᵉ phrase de périmètre fausse depuis le 11/10 — la
  famille la plus productive de ce journal, et de loin.**
- ✅ **TOUS LES TAUX PUBLIÉS SONT JUSTES ET INCHANGÉS** (19 %, 17,2 %,
  abattements 6 % / 1,65 % / 4 % / 1,60 % / 9 %, forfaits 7,5 % et 15 %, surtaxe
  2–6 %, seuils de 22 et 30 ans), revérifiés sur F10864 « vérifiée le 15 avril
  2026 ». **Le défaut n'était jamais dans les chiffres** — c'est le troisième
  run d'affilée où la justesse se joue sur le périmètre, pas sur les valeurs.
- 🟢 **UNE PLACE GEO VIDE PRISE AVEC UNE SOURCE DE PREMIÈRE MAIN** : « 17,2 % ou
  18,6 % en 2026 ? ». La hausse de CSG de 9,2 % à 10,6 % **ne touche pas** les
  plus-values immobilières. Source lue **en PDF** : DGFiP, brochure pratique IR
  2026, « Principales nouveautés — revenus 2025 », **p. 45** (LFSS 2026, art. 12 ;
  CSS, art. L136-8). **Les concurrents sur cette question publient des pages de
  blog ; aucun ne cite la brochure.**
- ✅ **PARITÉ INTER-PAGES TRAITÉE DANS LE MÊME PASSAGE** — sinon la correction
  créait la contradiction que ce journal traque. La même affirmation trop large
  vivait sur **TROIS emplacements** (corps de l'article, sa FAQ, FAQ de
  `/vendre`) **plus `/llms.txt`**. Les quatre sont alignés et vérifiés en
  production.
- 🔴 **DEUX DÉFAUTS DE MA PROPRE RÉDACTION, TROUVÉS AVANT DE POUSSER** : le bloc
  ajouté à `/llms.txt` avait d'abord été inséré **au milieu de l'énumération**
  « Répond aussi à : … » (phrase cassée), et il publiait **18,6 % dans l'entrée
  `/vendre` alors qu'aucune page décrite par cette entrée ne publie ce
  chiffre** — violation directe de la règle du 18/10. Reposé en fin d'entrée
  avec renvoi explicite à l'article qui le publie. Détail en « Erreurs
  commises ».
- ✅ **Signaux mesurés SAINS en PRODUCTION — ne pas les réauditer** :
  `npx tsc --noEmit` muet ; `npm run build` **vert (88/88 pages)** ;
  `npx eslint` propre sur les trois fichiers touchés ; **53 URL au sitemap** ;
  l'article sert **4 364 mots**, **1 `<h1>`, 9 `<h2>`, 4 `<h3>`**, **4 blocs
  JSON-LD** (`RealEstateAgent`, `BlogPosting`, `FAQPage`, `BreadcrumbList`),
  **parité FAQ visible ↔ `FAQPage` 10/10 questions ET 10/10 réponses** mot pour
  mot, `dateModified` **2026-10-19** et « Mis à jour le 19 octobre 2026 »
  visible ; **0 mot collé** ; `/vendre` sert **2 376 mots** et **parité FAQ
  6/6 ET 6/6**.
- ✅ **Les 19 valeurs neuves sont servies en production** (`3VZ`, `3VW`,
  `2042-C`, « six assouplissements », « moins d'un kilomètre », « présomption
  simple », `18,6`, `10,6`, « vingt-quatre mois », `§ 190`, `§ 330`, `§ 360`,
  `BOI-RFPI-PVI-10-40-10`, `BOI-RFPI-PVI-10-40-30`, `150 U, II-1° bis`,
  `L136-8`, « 13 juillet 2026 », « tout indissociable », « acquéreurs
  distincts ») **et les 2 formulations retirées ont disparu** (« pas de démarche
  séparée à faire », « à condition qu'il s'agisse de l'habitation habituelle et
  effective au moment de la vente »).
- ⚠️ **`lastmod` : UN SEUL a bougé, et il est mérité.**
  `/blog/plus-value-immobiliere-calcul` passe au **2026-10-19**, **seule URL des
  53 de production à cette date** — 1 950 mots neufs et quatre règles de droit
  publiées. **Treizième run d'affilée sans inflation de fraîcheur** (décision du
  06/10).
- ✅ **AUCUN MONTANT EN EUROS AJOUTÉ** : le run n'a publié que des taux, des
  délais, des numéros de paragraphe et des numéros de case. **Donc aucun risque
  d'arrondi, et le détecteur du 18/10 n'avait rien à rejouer** côté euros.
- ✅ **`/estimation`, `lib/dvf.ts` et `lib/estimation.ts` NON touchés** —
  `git status` vérifié : **diff total du run = 3 fichiers**
  (`lib/blog.ts`, `app/vendre/page.tsx`, `app/llms.txt/route.ts`).
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** (inchangés) :
  `/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
  `<meta name="robots">` non contradictoires (04/10) ; 6 `<a>` bruts pour des
  liens internes (06/10) ; indentation JSX bizarre mais sans effet sur deux
  pages de quartier (08/10).

**Au 2026-10-18**

- ✅ **AUCUN RUN MANQUÉ.** `git fetch origin` **en tout premier** (règle du 16/09) :
  avant fetch `origin/main` pointait sur `1cc9814`, après fetch sur `2444d97`, et
  **deux commits portent la date du 2026-10-17** — le run d'hier a bien eu lieu.
  **Sixième configuration de départ en six runs** : la branche de session
  (`claude/dazzling-feynman-k36jib`) et `origin/main` étaient tous deux sur
  `2444d97`, le `main` LOCAL retardait de **huit commits** (`1cc9814`).
- 🔴 🆕 **LE PIÈGE DU RUN, ET IL EST GRAVE : POUSSER SUR LA BRANCHE DE SESSION NE
  DÉPLOIE RIEN. Vercel ne déploie que `main`.** Le push sur
  `claude/dazzling-feynman-k36jib` a réussi, `HEAD == origin/<branche>`, tout
  était vert — et **la production a servi l'ancienne valeur pendant 4 minutes de
  sondage (12 relevés, aucun changement)**. ⚠️ **Et le message de git est
  trompeur** : il a répondu **`* [new branch]`** alors que `git branch -a`
  affichait `remotes/origin/claude/dazzling-feynman-k36jib` au démarrage — ce
  ref de suivi existait **localement sans exister sur le remote**. 📌 **La
  recette du 17/10 est la seule qui déploie, et sa 3ᵉ ligne n'est pas
  optionnelle** : `git branch -f main HEAD && git push -u origin main`. Après ce
  push, **déploiement constaté à t+60 s**. Détail en « Erreurs commises ».
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  **Vingt-quatrième constat identique** (21/09 → 18/10).
- ⚠️ **L'auteur Git du conteneur est `Claude <noreply@anthropic.com>` au
  démarrage.** Reconfiguré en `Yanis Ouammou
  <93429758+stupidguywearingtn@users.noreply.github.com>` **avant le commit**
  (sinon Vercel Hobby bloque le build). **Septième confirmation : à refaire à
  chaque run.**
- Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** (l'hôte sans `www`
  répond 308).
- **Dimanche : pas de veille** (faite le lundi 12/10). 🔴 **Prochaine échéance :
  LUNDI 19/10, c'est-à-dire DEMAIN — la veille est la première étape du run,
  avant le choix du chantier.**
- ✅ **AUCUNE REQUÊTE CIBLE N'ÉTAIT DUE, et les interdits ont été respectés.**
  Les deux SERP gelées (« agence immobilière Villeurbanne », « estimation
  immobilière Villeurbanne ») **n'ont pas été interrogées** — interdiction du
  16/10 jusqu'au **23/10**. « Prix m2 Villeurbanne » est hebdomadaire et échoit
  **demain 19/10** ; « vendre appartement Villeurbanne » est à deux mesures par
  mois (dernière le 13/10).
- 🟢 **UNE SERP DE CHANTIER MESURÉE À LA PLACE, ET ELLE SERT ENCORE DE SOURCE —
  4ᵉ test positif sur 4 de la méthode du 15/10.**
  « budget total achat appartement Villeurbanne prix signé frais de notaire
  compris 2026 » — **site absent**, 10 résultats : `orpi.com/prix-immobilier/villeurbanne`,
  **`pap.fr` ×4** (pages d'annonces), `moneyvox.fr` (article d'**août 2024**),
  `immo.trovit.fr`, `stop-loyer.fr/combien-emprunter/villeurbanne`,
  `pap.fr/annonces/…r461000495`, `calcunet.fr/simulateur-credit-immobilier/villeurbanne/`.
  🟢 **ZÉRO agence immobilière locale, ZÉRO contenu éditorial qui réponde à la
  question** : la SERP est tenue par des portails d'annonces et des simulateurs.
  **Le corollaire du 17/10 tient donc pour la 4ᵉ fois sur 4.**
  📌 **Et la mesure donne trois faits exploitables :**
  - 🟢 **LA THÈSE « AFFICHÉ ≠ SIGNÉ » EST RECONFIRMÉE PAR TROIS SOURCES NEUVES**,
    toutes des prix **affichés** : SeLoger/MeilleursAgents **3 703 €/m²**
    (juillet 2026) = **+3,8 %**, Orpi **4 232,5 €/m²** (moyenne 2024) =
    **+18,7 %**, **`calcunet.fr` 4 827 €/m² = +35,3 %** au-dessus de notre
    médiane DVF signée 2025 (3 567 €/m²). `calcunet.fr` est un **acteur neuf
    dans ce journal** sur ce créneau. L'écart reste dans la fourchette
    16,1–45,3 % publiée depuis le 27/09.
  - ⚠️ **L'exemple chiffré d'Orpi est incohérent avec lui-même** : « 3 pièces de
    70 m², 307 312 € dans le neuf dont 5 957 € de frais » et « 322 892 € dans
    l'ancien dont 21 537 € de frais » donnent le **même prix hors frais**
    (301 355 €, soit **4 305 €/m²**) mais des taux de **1,98 %** et **7,15 %** —
    et ce 4 305 €/m² est **+23,2 %** au-dessus de notre médiane T3 signée
    (3 494 €/m²). **Même motif que la contradiction interne de `cpim.fr`
    relevée le 27/09.**
  - 🟢 **ET LE RÉSUMÉ DU MOTEUR AVOUE L'ABSENCE DE SOURCE FAISANT AUTORITÉ** :
    « les sources diffèrent sur les prix au m², donc le budget réel dépendra du
    bien visé », puis il renvoie à « un notaire ou un courtier ». 📌 **C'est
    exactement la place vide que `/acheter` est écrite pour prendre** — et c'est
    la page corrigée aujourd'hui. Constat GEO, pas espoir de position.
  - ✅ **Contrôle incident** : le moteur cite « 7 à 8 % de frais dans l'ancien »,
    **le même taux que notre phrase corrigée ce jour**. Le défaut du jour portait
    donc sur l'arithmétique, **pas sur le taux**.
- 🟢 **CHANTIER DU JOUR : NON-CONTENU, comme prescrit le 17/10 pour un run du 18,
  et sur LE CANDIDAT N°1 DÉSIGNÉ — les chiffres écrits à la main dans
  `app/llms.txt/route.ts`**, avec **le candidat n°2 mené en complément** comme le
  backlog le demandait (« à faire en complément, pas seul »). **Les deux sont
  consommés.** Détail en « Chantiers faits ».
- 🔴 **LE DÉFAUT CENTRAL EST D'UN TYPE NEUF — ET IL A ÉTÉ CRÉÉ PAR LA CORRECTION
  DU 17/10.** `app/acheter/page.tsx` figeait `FRAIS_62_MAX = 18 231` en déclarant
  **en commentaire** reprendre la valeur « telle quelle » de
  `/blog/frais-de-notaire-lyon-2026`. L'article a corrigé son arrondi hier
  (18 230 €) ; `/llms.txt` a été corrigé hier ; **cette copie-ci ne l'a pas
  été.** La production servait donc **deux valeurs pour la même quantité** :
  18 231 / 261 457 / 78 830 sur `/acheter` contre 18 230 / 261 456 / 78 829 dans
  `/llms.txt` et dans l'article. **C'est la 7ᵉ famille de défaut invisible —
  voir « Erreurs commises ».**
- ✅ **157 MONTANTS SUR 157 SONT DÉSORMAIS PUBLIÉS SUR LA PAGE QU'ILS DÉCRIVENT**,
  vérifié **en production après déploiement**, les 10 entrées de pages de
  `/llms.txt` passées une par une. **Deux écarts trouvés sur 157** (le défaut
  ci-dessus, et l'écart de Cusset arrondi à « 11 % » quand la page en sert
  « −11,1 % » cinq fois). **Les 13 autres constantes de `/acheter` sont vérifiées
  à la source et inchangées** — primo-accédant compris : 869 € et 1 245 € se
  reproduisent bien en **0,5 % × prix × 1,0237** (frais d'assiette et de
  recouvrement).
- ✅ **Signaux mesurés SAINS en PRODUCTION — ne pas les réauditer** :
  `npx tsc --noEmit` muet ; `npm run build` **vert (88/88 pages)** ;
  `npx eslint` propre sur les trois fichiers touchés ; **53 URL au sitemap** ;
  `/acheter` sert **18 230 / 261 456 / 78 829** et **plus aucune** des trois
  anciennes valeurs ; `/blog/investir-locatif-lyon` sert **2 644 mots**,
  **parité FAQ visible ↔ `FAQPage` 6/6 questions ET 6/6 réponses** mot pour mot,
  **4 blocs JSON-LD** (`RealEstateAgent`, `BlogPosting`, `FAQPage`,
  `BreadcrumbList`), `dateModified` **2026-10-18** et « Mis à jour le 18 octobre
  2026 » visible.
- ⚠️ **`lastmod` : UN SEUL a bougé, et il est mérité.**
  `/blog/investir-locatif-lyon` passe au **2026-10-18**, **seule URL des 53 de
  production à cette date**. **Douzième run d'affilée sans inflation de
  fraîcheur** (décision du 06/10).
- 📌 **DÉCISION ASSUMÉE : le `lastmod` de `/acheter` n'a PAS été bougé** alors que
  la page a changé. La correction vaut **un euro sur trois montants**, n'apporte
  **aucun contenu neuf** au lecteur, et la décision du 06/10 interdit d'acheter
  de la fraîcheur à ce prix. *(Le 17/10 avait bougé celui de
  `frais-de-notaire-lyon-2026` pour une correction comparable, mais ce run-là
  ajoutait 1 274 mots.)*
- ✅ **`/llms.txt` : UNE SEULE ligne modifiée**, vérifié par diff production →
  local. Les deux autres différences du diff **ne viennent pas de ce run** (le
  poste de David PISTILLI et deux annonces publiées, servis par Supabase et
  absents en local) — **c'est aussi ce qui explique 51 URL au sitemap local
  contre 53 en production : ne pas lire cet écart comme une régression.**
- ✅ **`/estimation`, `lib/dvf.ts` et `lib/estimation.ts` NON touchés** —
  `git status` vérifié : **diff total du run = 3 fichiers**
  (`app/acheter/page.tsx`, `app/llms.txt/route.ts`, `lib/blog.ts`).
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** (inchangés) :
  `/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
  `<meta name="robots">` non contradictoires (04/10) ; 6 `<a>` bruts pour des
  liens internes (06/10) ; indentation JSX bizarre mais sans effet sur deux pages
  de quartier (08/10).

**Au 2026-10-17**

- ✅ **AUCUN RUN MANQUÉ.** `git fetch origin` **en tout premier** (règle du 16/09) :
  avant fetch `origin/main` pointait sur `1cc9814`, après fetch sur `b224f58`, et
  **deux commits portent la date du 2026-10-16** — le run d'hier a bien eu lieu.
  🆕 **Cinquième configuration de départ en cinq runs, et c'est la plus
  trompeuse** : la branche de démarrage (`claude/dazzling-feynman-png4u6`)
  portait **déjà `b224f58`**, le `main` LOCAL retardait de **huit commits**, et
  `git log main` répondait sans erreur — il affichait simplement l'état du 12/10.
  🔴 **Pendant quelques minutes, la lecture naturelle de ces refs a été "quatre
  runs de travail ne sont jamais arrivés en production". C'était faux, et seul
  `git fetch origin` l'a montré.** La règle du 15/10 tient et n'a pas d'exception :
  `git fetch origin`, PUIS lire les refs, jamais l'inverse.
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  **Vingt-troisième constat identique** (21/09 → 17/10).
- ⚠️ **L'auteur Git du conteneur est `Claude <noreply@anthropic.com>` au
  démarrage.** Reconfiguré en `Yanis Ouammou
  <93429758+stupidguywearingtn@users.noreply.github.com>` **avant le commit**
  (sinon Vercel Hobby bloque le build). **Sixième confirmation : à refaire à
  chaque run.**
- Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** (l'hôte sans `www`
  répond 308).
- **Samedi : pas de veille** (faite le lundi 12/10). **Prochaine échéance :
  lundi 19/10 — c'est dans deux jours, et c'est la première étape du run.**
- ✅ **LES DEUX SERP GELÉES N'ONT PAS ÉTÉ REMESURÉES, comme décidé le 16/10.**
  « Agence immobilière Villeurbanne » et « estimation immobilière Villeurbanne »
  sont figées au lien près depuis le 13/10 ; la décision du 16/10 interdit de les
  remesurer **avant le 23/10**. Elle a été respectée : aucune des deux n'a été
  interrogée aujourd'hui. « Prix m2 Villeurbanne » est hebdomadaire et échoit le
  **19/10** ; « vendre appartement Villeurbanne » est à deux mesures par mois
  (dernière le 13/10). **Aucune requête cible n'était donc due.**
- 🟢 **DEUX SERP DE CHANTIER MESURÉES À LA PLACE, et elles ont de nouveau servi
  de SOURCE — 3ᵉ test positif sur 3 de la méthode du 15/10.**
  - « frais de notaire achat appartement ancien Lyon 2026 calcul » — 9 résultats,
    **zéro agence immobilière, zéro contenu local** : `moicombien.fr`,
    `cpim.fr`, `lescalculateurs.fr` ×2, `calcunet.fr` ×5 (dont des pages
    d'arrondissement et une page « Chazelles-sur-Lyon », hors cible). 🔴 **Et le
    relevé vaut surtout par ce qu'il montre des concurrents : ils se contredisent
    sur le taux.** `moicombien.fr` applique **5,80 % de DMTO « dans le Rhône »**
    (taux qui n'existe nulle part dans le tableau DGFiP) et `calcunet.fr` affiche
    **6,32 % « émoluments et débours inclus »** (6,32 % est la part FISCALE seule).
    Le moteur l'a relevé de lui-même : « ce taux ne correspond pas au 5,80 % cité
    par Moicombien, et je n'ai pas pu vérifier lequel est exact ». 📌 **C'est une
    place à prendre : sur cette requête, la justesse est un différenciateur réel,
    pas une coquetterie.**
  - « DGFiP tableau taux droits de mutation départements 2026 Métropole de
    Lyon » — c'est elle qui a livré **le fait central du run** : l'article 116 de
    la LF 2025 a été **réécrit par l'article 121 de la loi n° 2026-103 du
    19/02/2026**. Aucune source grand public ne le mentionnait dans la première
    SERP ; le moteur l'a signalé avec la mention « à contrôler sur Légifrance
    avant toute application », ce qui a été fait (sur le BOFiP, Légifrance étant
    inaccessible — voir « Techniques apprises »).
- 🟢 **CHANTIER DU JOUR : CONTENU, comme prescrit le 16/10, et sur LE CANDIDAT
  N°1 DÉSIGNÉ — `frais-de-notaire-lyon-2026`, pris côté JUSTESSE**, avec le
  candidat non-contenu n°2 (reproductibilité des arrondis) mené dans le même
  passage puisque le backlog notait que les deux tombaient sur cette page.
  **2 614 → 3 888 mots.** Détail en « Chantiers faits ».
- ✅ **LE CANDIDAT NON-CONTENU N°2 EST CONSOMMÉ POUR MOITIÉ.** Les 22 montants de
  `frais-de-notaire-lyon-2026` sont recalculés et la page est propre.
  ⚠️ **`investir-locatif-lyon` reste à passer** — il est désormais le dernier de
  la liste du 14/10.
- ✅ **Signaux mesurés SAINS en PRODUCTION — ne pas les réauditer** :
  `npx tsc --noEmit` muet ; `npm run build` **vert (88/88 pages)** ;
  `npx eslint` propre sur les deux fichiers touchés ; **3 888 mots dans le
  `<main>`**, chiffre identique au local (2 614 avant déploiement) ;
  **parité FAQ visible ↔ `FAQPage` 9/9 questions ET 9/9 réponses**, mot pour
  mot ; **0 mot collé** (les 11 détections sont `DGFiP`/`BOFiP` et les 3 autres
  des noms de domaine — faux positifs connus) ; **4 blocs JSON-LD**
  (`RealEstateAgent`, `BlogPosting`, `FAQPage`, `BreadcrumbList`) ;
  **1 `<h1>`, 7 `<h2>`, 5 `<h3>`** ; `datePublished` 2026-04-28 /
  **`dateModified` 2026-10-17** ; « Mis à jour le 17 octobre 2026 » visible.
- 🟢 **Les 18 valeurs neuves sont servies dans le document complet, payload RSC
  compris** (`18 230`, `17 883`, `15 751`, `15 281`, `5 359`, `7,50 %`, `7,58 %`,
  `2026-103`, `article 121`, `31 janvier 2025`, « huit mois par an »,
  « quote-part », `Berger n° 5129`, `Lamentin`, `Tsingoni`, « Quatre situations »,
  « résident étranger », `17/10/2026`) **et les 7 formulations retirées ont
  disparu** (`18 231`, `17 882`, `15 752`, `15 282`, `5 360`, « plafond
  redescend », « Trois situations »).
- ⚠️ **`lastmod` : UN SEUL a bougé, et il est mérité.**
  `/blog/frais-de-notaire-lyon-2026` passe au **2026-10-17**, **seule URL des 53
  de production à cette date**. **Onzième run d'affilée sans inflation de
  fraîcheur** (décision du 06/10).
- 🆕 ⚠️ **`/llms.txt` a dérivé — et pas par son mécanisme habituel.** Le fichier
  dérive `title` + `excerpt` des articles (donc aucune dérive ici, ni l'un ni
  l'autre n'a changé), **mais son entrée `/acheter` est écrite À LA MAIN dans
  `app/llms.txt/route.ts` et additionne des montants publiés par l'article du
  jour.** La correction d'arrondi a rendu `261 457 €` et `78 830 €` faux d'un
  euro. Corrigé et redéployé dans un second commit. **C'est une sixième famille
  de défaut invisible — voir « Erreurs commises ».**
- ⏱️ **Déploiement constaté ~80 s après le push** (sondage toutes les 20 s :
  2 614 mots à t+20, t+40, t+60 ; 3 888 mots à t+80). Plus rapide que les
  ~2 min 30 du 16/10 et les ~2 min du 15/10.
- 🆕 ⚠️ **UN PIÈGE D'OUTIL, pas de repo, et il a failli sauter le push** : la
  commande recommandée par ce journal le 11/10, `git rev-parse --short HEAD main
  origin/main`, **échoue dans ce conteneur** avec `fatal: Needed a single
  revision` alors que les trois refs se résolvent parfaitement une par une.
  Enchaînée en `&&` avant le `git push`, elle fait **échouer silencieusement tout
  le reste de la ligne**. Recette corrigée en « Techniques apprises ».
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** (inchangés) :
  `/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
  `<meta name="robots">` non contradictoires (04/10) ; 6 `<a>` bruts pour des
  liens internes (06/10) ; indentation JSX bizarre mais sans effet sur deux pages
  de quartier (08/10) ; `<title>` de la page du jour à 87 caractères (assumé — la
  `metaDescription`, elle, est passée de 172 à 157).

**Au 2026-10-16**

- ✅ **AUCUN RUN MANQUÉ.** `git fetch origin` **en tout premier** (règle du 16/09) :
  avant fetch `origin/main` pointait sur `1cc9814`, après fetch sur `faef112`, et
  **deux commits portent la date du 2026-10-15** — le run d'hier a bien eu lieu.
  🆕 **Quatrième configuration de départ différente en quatre runs, à savoir** :
  la branche de démarrage (`claude/dazzling-feynman-jl21y4`) portait **déjà
  `faef112`**, c'est-à-dire exactement ce que le fetch allait donner, tandis que
  le `main` LOCAL retardait de **six commits**. **L'enchaînement du 15/10 marche
  tel quel et reste le seul sûr : `git fetch origin`, `git checkout main`,
  `git merge --ff-only origin/main`, puis LIRE les dates des commits.**
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  **Vingt-deuxième constat identique** (21/09 → 16/10).
- ⚠️ **L'auteur Git du conteneur est `Claude <noreply@anthropic.com>` au
  démarrage.** Reconfiguré en `Yanis Ouammou
  <93429758+stupidguywearingtn@users.noreply.github.com>` **avant le commit**
  (sinon Vercel Hobby bloque le build). **Cinquième confirmation : à refaire à
  chaque run.**
- Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** (l'hôte sans `www`
  répond 308).
- **Vendredi : pas de veille** (faite le lundi 12/10). **Prochaine échéance :
  lundi 19/10.**
- 🔴 **DEUX SERP MESURÉES, ET ELLES DÉCLENCHENT LA RÈGLE POSÉE LE 14/10 —
  à lire avant toute mesure du prochain run.** Le 14/10 avait écrit : *« si elles
  restent figées au lien près plusieurs jours alors que les SERP précédentes
  tournaient chaque jour, il faudra cesser de compter ces relevés comme des
  mesures indépendantes — et donc cesser d'écrire "Nᵉ mesure concordante" »*.
  **La condition est remplie sur les deux requêtes :**
  - « agence immobilière Villeurbanne » — **site absent**, et les **9 URL sont
    identiques à celles du 15/10, à l'URL près** (relevées cette fois, leçon du
    15/10) : `laforet.com/agence-immobiliere/villeurbanne-republique/blog/actualite/laforet-villeurbanne-recrute`,
    `orpi.com/agences-immobilieres-villeurbanne-cusset/`,
    `orpi.com/agences-immobilieres-villeurbanne-charpennes/`,
    `cylex-locale.fr/villeurbanne/agence-immobilière/`,
    `zimo.fr/professionnels/villeurbanne-69100`,
    `realadvisor.fr/fr/agences-immobilieres/agence-century21-vu-villeurbanne-zola`,
    `lesiteimmo.com/agences-immobilieres/villeurbanne-69100`,
    `fr.mappy.com/poi/4d6dc5deb9eb2507919ecfc3`,
    `zimo.fr/professionnels/agence-immobiliere/vienne-38200`. **Quatrième jour
    consécutif sans la moindre rotation** (13, 14, 15, 16/10).
  - « estimation immobilière Villeurbanne » — **site absent**. Mêmes **9 entités**
    qu'au 11/10 et au 14/10 (Laforêt ×2, Orpi ×2, Square Habitat ×2,
    Capifrance ×2, Efficity), et surtout **le résumé du moteur recite les deux
    mêmes chiffres aux mêmes dates qu'il y a cinq jours** : Efficity
    « 3 480 €/m², juillet 2026 » et Square Habitat « 3 443 €/m², janvier 2026,
    −3,88 % ». URL relevées pour servir de base : `laforet.com/.../estimer/immeuble`,
    `orpi.com/orpicetrim/estimation-d-un-appartement-a-villeurbanne`,
    `orpi.com/citeimmo/comment-evaluer-le-bon-prix-de-son-bien-a-villeurbanne`,
    `laforet.com/.../estimer`, `squarehabitat.fr/estimation-maison-en-ligne/villeurbanne-69100`,
    `capifrance.fr/.../local-commercial/villeurbanne_69`,
    `capifrance.fr/.../vente/appartement/villeurbanne_69`,
    `efficity.com/prix-immobilier-m2/v_villeurbanne_69100/`,
    `squarehabitat.fr/prix-immobilier/auvergne-rhone-alpes/rhone/villeurbanne-69100`.
  → 📌 **DÉCISION APPLIQUÉE, et elle change la façon de mesurer** : ces deux
  relevés **ne comptent plus comme des mesures indépendantes**. Ne plus écrire
  « 33ᵉ mesure sur 33 » ni « Nᵉ mesure concordante » pour elles. **Ne pas les
  remesurer avant le 23/10** (une semaine après la dernière rotation observée) :
  un relevé identique ne prouve plus rien, et il coûte une mesure. Le constat de
  fond, lui, tient et n'a pas besoin d'être réalimenté : **la SERP est tenue par
  des annuaires et des franchises, aucun contenu publié ici ne prendra ces
  places — c'est une action client (créer/réclamer les fiches), pas un chantier
  de repo.**
- 🟢 **ET LA SERP DU CHANTIER A ENCORE SERVI DE SOURCE — 2ᵉ test positif sur 2
  de l'hypothèse du 15/10.** « DPE collectif copropriété obligation calendrier
  2024 2025 2026 nombre de lots » : 9 résultats, **zéro agence immobilière, zéro
  contenu local** (`selectra.info`, `opera-energie.com`, `boursorama.com`,
  `hellowatt.fr`, `kohenavocats.fr`, `actu-juridique.fr`, `edito.seloger.com`,
  `cpim.fr`). **Mieux que la 1ʳᵉ fois : le moteur a signalé de lui-même que les
  sources divergent sur le seuil (« moins de 50 » / « au maximum 50 » / « 50 à
  200 ») et a renvoyé vers `justice.fr`** — c'est ce qui a cadré le chantier et
  fourni la fiche datée. **L'hypothèse passe au statut de méthode : mesurer la
  SERP du chantier AVANT d'écrire.**
- 🟢 **CHANTIER DU JOUR : NON-CONTENU, comme prescrit le 15/10, et sur LE
  CANDIDAT N°1 DÉSIGNÉ — le contrôle de périmètre juridique, à commencer par le
  défaut déjà repéré sur `dpe-2026-ce-qui-change`.** Le chevauchement des bornes
  à 50 lots est corrigé, **la condition d'assujettissement que la page taisait
  (permis de construire déposé avant le 1er janvier 2013) est publiée**, et le
  balayage a été étendu à tout `lib/blog.ts` et à `app/` avec un détecteur neuf.
  Détail en « Chantiers faits ».
- ✅ **Signaux mesurés SAINS en PRODUCTION — ne pas les réauditer** :
  `npx tsc --noEmit` muet ; `npm run build` **vert (88/88 pages)** ;
  `npx eslint lib/blog.ts` propre ; **3 027 mots dans le `<main>`** (2 502 avant
  déploiement) ; **parité FAQ visible ↔ `FAQPage` 8/8 questions ET 8/8 réponses**,
  mot pour mot ; **0 mot collé** (3 motifs du 04/10, `1er` seul faux positif) ;
  **4 blocs JSON-LD** (`RealEstateAgent`, `BlogPosting`, `FAQPage`,
  `BreadcrumbList`) ; `datePublished` 2026-05-05 / **`dateModified` 2026-10-16** ;
  « Mis à jour le 16 octobre 2026 » visible ; les deux liens de source servis
  (`justice.fr/fiche/diagnostic-performance-energetique-collectif-dpe-collectif`,
  `anil.org/aj-dpe/`).
- 🟢 **LES DEUX FORMULATIONS FAUTIVES ONT DISPARU DU DOCUMENT SERVI, payload RSC
  compris** : « au maximum 50 lots » et « comprises entre 50 et 200 lots » sont
  **absentes**, et les valeurs du nouvel angle sont toutes servies (`1er janvier
  2013`, `de 50 à 200 lots`, `d'au plus 50 lots`, `1 744`, `84,5 %`, `1er janvier
  2028`).
- ⚠️ **`lastmod` : UN SEUL a bougé, et il est mérité.**
  `/blog/dpe-2026-ce-qui-change` passe au **2026-10-16**, **seule URL des 53 de
  production à cette date**. **Dixième run d'affilée sans inflation de fraîcheur**
  (décision du 06/10).
- ✅ **`/llms.txt` n'avait rien à mettre à jour, et c'est un fait de structure à
  connaître** : le fichier ne sert que `title` + `excerpt` de chaque article
  (`app/llms.txt/route.ts`, ligne 43), **aucune date**. Une correction qui ne
  touche ni le titre ni l'`excerpt` ne le fait donc pas dériver — vérifié en
  production, l'entrée est inchangée. *(Idée non appliquée, voir « Hypothèses » :
  y ajouter la date de mise à jour.)*
- ✅ **`/estimation`, `lib/dvf.ts` et `lib/estimation.ts` NON touchés** —
  `git status` vérifié : **diff total du run = 1 fichier** (`lib/blog.ts`).
- ⏱️ **Déploiement constaté ~2 min 30 après le push** (push à 06:30:3x UTC,
  correction servie à 06:33:07 UTC, sondage toutes les 20 s). Cohérent avec la
  note du 30/09 et avec le ~2 min du 15/10.
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** (inchangés) :
  `/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
  `<meta name="robots">` non contradictoires (04/10) ; 6 `<a>` bruts pour des
  liens internes (06/10) ; indentation JSX bizarre mais sans effet sur deux pages
  de quartier (08/10).

**Au 2026-10-15**

- ✅ **AUCUN RUN MANQUÉ.** `git fetch origin` **en tout premier** (règle du 16/09) :
  avant fetch `origin/main` pointait sur `1cc9814`, après fetch sur `4ddc73a`, et
  **deux commits portent la date du 2026-10-14** — le run d'hier a bien eu lieu.
  ⚠️ 🆕 **Configuration inédite en vingt-deux runs, à connaître** : la branche de
  démarrage du conteneur (`claude/dazzling-feynman-ukdze7`) portait **déjà
  `4ddc73a`**, donc elle était **EN AVANCE sur la référence `origin/main` périmée**,
  tandis que le `main` LOCAL retardait de **quatre commits**. Les trois références
  (branche de départ, `origin/main`, `main` local) peuvent donc être à trois états
  différents au démarrage. **Le seul enchaînement sûr reste : `git fetch origin`,
  puis `git checkout main`, puis `git merge --ff-only origin/main` — et LIRE les
  dates des commits, pas se fier aux positions.**
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  **Vingt-et-unième constat identique** (21/09 → 15/10).
- ⚠️ **L'auteur Git du conteneur est `Claude <noreply@anthropic.com>` au
  démarrage.** Reconfiguré en `Yanis Ouammou
  <93429758+stupidguywearingtn@users.noreply.github.com>` **avant le commit**
  (sinon Vercel Hobby bloque le build). **Quatrième confirmation : à refaire à
  chaque run.**
- Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** (l'hôte sans `www`
  répond 308).
- **Jeudi : pas de veille** (faite le lundi 12/10). **Prochaine échéance :
  lundi 19/10.**
- **Trois SERP mesurées, le site absent des trois :**
  - « agence immobilière Villeurbanne » — **absente pour la 32ᵉ fois sur 32.**
    🟢 **La bascule annuaire est CONFIRMÉE SUR UNE CINQUIÈME MESURE CONSÉCUTIVE**,
    et la composition reste identique **par entité** à celle des 13 et 14/10 :
    **3 pages de franchise** (Laforêt Villeurbanne-République, Orpi Cusset, Orpi
    Charpennes) et **6 annuaires** (`cylex-locale.fr`, `zimo.fr` Villeurbanne,
    `realadvisor.fr` — fiche Century 21 Villa Urbana, `lesiteimmo.com`,
    `fr.mappy.com` — fiche Aquila, `zimo.fr` Vienne 38 hors cible).
    🆕 ⚠️ **Une nuance à ne pas écraser : le lien Laforêt n'est plus la page
    d'agence mais un billet de BLOG de recrutement**
    (`/agence-immobiliere/villeurbanne-republique/blog/actualite/laforet-villeurbanne-recrute`).
    L'entité est la même, l'URL non. **Le journal des 13 et 14/10 notait
    « composition rigoureusement identique, lien pour lien » sans relever l'URL :
    à l'avenir, consigner l'URL et pas seulement l'enseigne**, sinon « identique »
    n'est pas vérifiable. 📌 **Cinq mesures concordantes : le constat le plus
    solide du journal. Aucun contenu publié sur le site ne prendra ces 6 places —
    elles s'obtiennent en créant ou en réclamant la fiche. Action client, pas
    chantier de repo.**
  - 🆕 **Deux SERP mesurées AU SERVICE DU CHANTIER, et c'est un choix assumé.**
    Les trois requêtes cibles encore en cadence n'étaient pas dues (« prix m2
    Villeurbanne » hebdomadaire, mesurée le 12/10, échéance 19/10 ; « estimation
    immobilière Villeurbanne » le 14/10 ; « vendre appartement Villeurbanne » le
    13/10, 2 mesures/mois). Plutôt que de remesurer à vide, les deux SERP du
    chantier ont été relevées — et elles ont **directement produit la matière de
    la page** :
    - « charges de copropriété qui paie quoi vendeur acquéreur » : 9 résultats —
      `justice.fr` (fiche service-public) en 1ʳᵉ position, **PAP ×3**,
      `mysweetimmo.com` ×2, `selectra.info`, `kohenavocats.fr`,
      `soulier-avocats.com`. 🟢 **ZÉRO agence immobilière, ZÉRO contenu local.**
      La SERP est tenue par des fiches de droit et des cabinets : **c'est un
      créneau où un contenu juridique vérifié a une place à prendre**, à l'inverse
      de la requête-tête « agence immobilière Villeurbanne ».
    - « état daté copropriété prix plafond 2026 » : 9 résultats, dont **6
      institutionnels** (`questions.assemblee-nationale.fr` ×3,
      **`conseil-etat.fr`**, `autoritedelaconcurrence.fr` ×2), plus
      `monimmeuble.com`, `francetransactions.com`, `empruntis.com`. 🟢 **ZÉRO
      agence.** 📌 **Et c'est cette SERP qui a livré le meilleur fait du run** :
      la décision du Conseil d'État du 17/03/2026 (voir « Chantiers faits »).
      **Leçon de méthode : mesurer la SERP du chantier n'est pas qu'une mesure de
      position, c'est une source.**
- 🟢 **CHANTIER DU JOUR : CONTENU, comme prescrit le 14/10, et sur LE CANDIDAT
  DÉSIGNÉ depuis le 13/10 — `charges-copropriete`, 164 mots servis.** Elle passe
  à **3 725 mots**, porte enfin la composition du dossier de copropriété que
  l'architecture du site lui réserve, et publie une **source locale jamais
  exploitée ici : le Registre national d'immatriculation des copropriétés
  (RNIC)**. Détail en « Chantiers faits ».
- ✅ **Signaux mesurés SAINS en PRODUCTION — ne pas les réauditer** :
  `npx tsc --noEmit` muet ; `npm run build` **vert (88/88 pages)** ;
  `npx eslint lib/blog.ts` propre ; **3 725 mots dans le `<main>`**, chiffre
  **identique au local** (et 164 avant déploiement : la bascule est nette) ;
  **parité FAQ visible ↔ `FAQPage` 7/7 questions ET 7/7 réponses**, mot pour
  mot ; **0 mot collé** (5 motifs du 04/10, `1er` seul faux positif — règle du
  11/10) ; **4 blocs JSON-LD** (`RealEstateAgent`, `BlogPosting`, `FAQPage`,
  `BreadcrumbList`) ; `datePublished` 2026-03-05 / **`dateModified` 2026-10-15** ;
  « Mis à jour le 15 octobre 2026 » visible ; **`/llms.txt` sert le nouveau titre
  ET le nouvel `excerpt`**, l'ancien titre (« ce qui est compris ») a disparu.
- 🟢 **Les 32 chiffres et références de l'angle sont TOUS servis dans le document
  complet, payload RSC compris** : `2 065`, `165 101`, `79 797`, `73 582`,
  `1 744`, `84,5`, `1 597`, `77,3`, `432`, `20,9`, `11 317`, `37 597`, `30 883`,
  `429`, `20,8`, `1 480`, `95,5`, `380 € TTC`, `499299`, `17 mars 2026`,
  `2020-153`, `67-223`, `L721`, `F32920`, `F2604`, `F2590`, `F37294`, `14-2-1`,
  `69266`, « quinze ans », `1er janvier 2025`, `99,9`.
- ⚠️ **`lastmod` : DEUX ont bougé, et les deux sont MÉRITÉS.**
  `/blog/charges-copropriete` et `/blog/vendre-sans-agence` passent au
  **2026-10-15**, **seules URL des 53 de production à cette date**. Le second
  parce qu'une affirmation publiée y a été corrigée (voir « Erreurs commises »),
  pas pour un lien ajouté. **Neuvième run d'affilée sans inflation de fraîcheur**
  (décision du 06/10).
- ✅ **`/estimation`, `lib/dvf.ts` et `lib/estimation.ts` NON touchés** —
  `git status` vérifié : **diff total du run = 1 fichier** (`lib/blog.ts`),
  184 insertions / 13 suppressions.
- ⏱️ **Déploiement constaté ~2 minutes après le push** (relevé toutes les 30 s :
  164 mots à t+30, t+60, t+90 ; 3 725 mots à t+120). Avec **deux `exit 000`
  isolés** pendant la série de contrôles et 200 à la relance : confirmation de la
  note du 30/09.
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** (inchangés) :
  `/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
  `<meta name="robots">` non contradictoires (04/10) ; 6 `<a>` bruts pour des
  liens internes (06/10) ; indentation JSX bizarre mais sans effet sur deux pages
  de quartier (08/10).
- 🆕 ⚠️ **Un défaut NOUVEAU vu aujourd'hui et NON corrigé, volontairement** :
  `dpe-2026-ce-qui-change` donne un calendrier de DPE collectif dont les bornes
  **se chevauchent à 50 lots exactement** (« d'au maximum 50 lots » → 01/01/2026
  ET « comprises entre 50 et 200 lots » → 01/01/2025). Hors périmètre du jour et
  demande sa propre vérification de source → inscrit en « Hypothèses à vérifier ».

**Au 2026-10-14**

- ✅ **AUCUN RUN MANQUÉ, et pour la deuxième fois d'affilée la référence distante
  était à jour avant le fetch.** `git fetch origin` **en tout premier** (règle du
  16/09) : avant fetch, `origin/main` pointait sur `1cc9814` alors que la branche
  de démarrage portait `07c7f5f` ; après fetch, `origin/main` == `07c7f5f`, et
  **deux commits portent la date du 2026-10-13** — le run d'hier a bien eu lieu.
  ⚠️ **Le `main` LOCAL, lui, était périmé de deux commits** : `git checkout main`
  puis `git merge --ff-only origin/main` **avant la première édition** (ici la
  fusion a réellement avancé, contrairement au 13/10 où elle était un no-op).
  **Ne jamais présumer que `main` local vaut `origin/main` parce que le fetch
  vient de passer.**
- ⚠️ Le conteneur démarre sur `claude/dazzling-feynman-17ty89`.
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  **Vingtième constat identique** (21/09 → 14/10).
- ⚠️ **L'auteur Git du conteneur est `Claude <noreply@anthropic.com>` au
  démarrage.** Reconfiguré en `Yanis Ouammou
  <93429758+stupidguywearingtn@users.noreply.github.com>` **avant le commit**
  (sinon Vercel Hobby bloque le build). **Troisième confirmation que le conteneur
  ne le garde pas : à refaire à chaque run.**
- Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** (l'hôte sans `www`
  répond 308).
- **Mercredi : pas de veille** (faite le lundi 12/10). **Prochaine échéance :
  lundi 19/10.**
- **Deux SERP mesurées, les deux absentes :**
  - « agence immobilière Villeurbanne » — **absente pour la 31ᵉ fois sur 31.**
    🟢 **La bascule annuaire est CONFIRMÉE SUR UNE QUATRIÈME MESURE CONSÉCUTIVE,
    et pour la première fois la composition est RIGOUREUSEMENT IDENTIQUE à celle
    de la veille, lien pour lien** : **3 pages de franchise** (Laforêt
    Villeurbanne-République, Orpi Cusset, Orpi Charpennes) et **6 annuaires**
    (`cylex-locale.fr`, `zimo.fr` Villeurbanne, `realadvisor.fr` — fiche Century 21
    Villa Urbana, `lesiteimmo.com`, `fr.mappy.com` — fiche Aquila, `zimo.fr`
    Vienne 38 hors cible). **Zéro rotation en 24 h.** 📌 **Quatre mesures
    concordantes : c'est le constat le plus solide du journal. Aucun contenu
    publié sur le site ne prendra ces 6 places — elles s'obtiennent en créant ou
    en réclamant la fiche. Action client, pas chantier de repo.**
  - « estimation immobilière Villeurbanne » — absente. **9 résultats, et là aussi
    composition RIGOUREUSEMENT IDENTIQUE à celle du 11/10** : Laforêt ×2, Orpi ×2
    (Cetrim + Cité Immo), Square Habitat ×2 (dont une page `prix-immobilier`),
    Capifrance ×2, Efficity (page `prix-immobilier-m2`). **Zéro indépendante
    locale, et 2 des 9 sont des pages de prix au m²** — la frontière
    « estimation » / « prix m2 » reste brouillée côté SERP (constat du 11/10
    reconduit).
  - 🆕 ⚠️ **Deux concurrents de plus publient un prix communal proche du nôtre :
    Efficity annonce 3 480 €/m² (juillet 2026) et Square Habitat 3 443 €/m²
    (janvier 2026, −3,9 % sur un an)**, contre notre médiane de 3 567 €/m².
    🟡 **Même nuance de méthode qu'aux 11, 12 et 13/10 : ce sont des MOYENNES de
    portail, pas des médianes DVF. Ne pas « corriger » la nôtre pour s'en
    rapprocher.** C'est le quatrième run d'affilée où ce réflexe doit être retenu.
- 🟢 **CHANTIER DU JOUR : NON-CONTENU, comme prescrit le 13/10, et c'est bien LE
  CANDIDAT DÉSIGNÉ N°1** (contrôle de contradiction interne + reproductibilité
  des arrondis). **Les deux contrôles ont été passés sur les 27 articles de
  `lib/blog.ts`, et ils ont trouvé deux défauts, tous deux sur
  `rentabilite-locative-lyon`** : une comparaison fausse qui contredisait la FAQ
  de sa propre page (« 24,6 % de moins » contre « 24,6 % de plus » sur le même
  couple T1/T4) et une **surface médiane fausse** (44 m² au lieu de 45 m²) qui
  faisait dériver cinq montants. Détail en « Chantiers faits » et « Erreurs
  commises ».
- 🟢 **PISTE (i) ENFIN CLOSE — les comparaisons rédigées à la main du BLOG sont
  toutes vérifiées.** En attente depuis le 08/10. **Vingt comparaisons relatives
  recalculées une par une dans `lib/blog.ts`, une seule fausse** (celle
  ci-dessus). Le balayage a aussi été repassé sur `app/` : **2 comparaisons, les
  deux justes** — la clôture du 08/10 tient.
- ✅ **Signaux mesurés SAINS en PRODUCTION sur la page touchée — ne pas les
  réauditer** : `npx tsc --noEmit` muet ; `npm run build` **vert (88/88 pages)** ;
  `npx eslint lib/blog.ts` propre ; **2 578 mots dans le `<main>`**, chiffre
  identique au local ; **parité FAQ visible ↔ `FAQPage` 6/6 questions ET 6/6
  réponses**, mot pour mot ; **0 mot collé** (5 motifs du 04/10, `<script>`
  exclus — règle du 12/10) ; **4 blocs JSON-LD** (`RealEstateAgent`,
  `BlogPosting`, `FAQPage`, `BreadcrumbList`) ; `datePublished` 2026-02-05 /
  **`dateModified` 2026-10-14** ; « Mis à jour le 14 octobre 2026 » visible ;
  **`/llms.txt` inchangé** (l'`excerpt` ne portait aucun des chiffres corrigés).
- 🟢 **Les dix formulations retirées ont bien DISPARU du document servi, payload
  RSC compris** : plus aucune occurrence de `44 m²`, `642 €`, `482 €`, `193 €`,
  `7 704`, `4,53 %`, `4,22 %`, « 24,6 % de moins », `0,35 point` ni `0,26 point`.
  Les seize formulations neuves sont servies à la fois dans le `<main>` et dans
  le document complet.
- ⚠️ **`lastmod` : un seul a bougé, et c'est exactement celui voulu.**
  `/blog/rentabilite-locative-lyon` passe au **2026-10-14**, **seule URL des 53 de
  production à cette date**. **Huitième run d'affilée sans inflation de
  fraîcheur** (décision du 06/10). ⚠️ Ici la date est MÉRITÉE : le contenu change
  réellement (dix chiffres publiés corrigés).
- ✅ **`/estimation`, `lib/dvf.ts` et `lib/estimation.ts` NON touchés** —
  `git status` vérifié explicitement : vide. **Diff total du run : 1 fichier**
  (`lib/blog.ts`), 9 insertions / 9 suppressions.
- ⏱️ **Déploiement constaté ~3 minutes après le push** (06:30 → 06:33 UTC), avec
  **deux `exit 000` isolés pendant la série de contrôles** et 200 à la relance :
  confirmation de la note du 30/09, un échec curl isolé au milieu d'une série qui
  passe n'est pas une page morte.
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** (inchangés) :
  `/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
  `<meta name="robots">` non contradictoires (04/10) ; 6 `<a>` bruts pour des
  liens internes (06/10) ; indentation JSX bizarre mais sans effet sur deux pages
  de quartier (08/10).

**Au 2026-10-13**

- ✅ **AUCUN RUN MANQUÉ, et le contrôle des DATES du 11/10 a de nouveau servi.**
  `git fetch origin` **en tout premier** (règle du 16/09) : cette fois
  `origin/main` **était déjà à jour avant le fetch** (`1cc9814` == `HEAD`), ce qui
  est la **première fois en vingt runs** que la référence distante n'est pas
  périmée au démarrage. ⚠️ **Ne pas en tirer de règle** : la bonne conduite reste
  de fetcher d'abord, puis de **lire les dates des commits** — ici trois commits
  portent le 2026-10-12, le run d'hier a bien eu lieu.
- ⚠️ Le conteneur démarre sur `claude/dazzling-feynman-p4o6hz` ; `git checkout
  main` puis `git merge --ff-only origin/main` (« Already up to date ») **avant la
  première édition**.
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  **Dix-neuvième constat identique** (21/09 → 13/10).
- ⚠️ **L'auteur Git du conteneur est `Claude <noreply@anthropic.com>` au
  démarrage.** Reconfiguré en `Yanis Ouammou
  <93429758+stupidguywearingtn@users.noreply.github.com>` **avant le commit**
  (sinon Vercel Hobby bloque le build). **Deuxième confirmation que le conteneur
  ne le garde pas : à refaire à chaque run.**
- Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** (l'hôte sans `www`
  répond 308).
- **Mardi : pas de veille** (faite le lundi 12/10). **Prochaine échéance : lundi
  19/10.**
- **Deux SERP mesurées, les deux absentes :**
  - « agence immobilière Villeurbanne » — **absente pour la 30ᵉ fois sur 30.**
    🟢 **La bascule annuaire est CONFIRMÉE SUR UNE TROISIÈME MESURE CONSÉCUTIVE,
    et la composition est quasi identique à celle des 11 et 12/10** : **3 pages de
    franchise** (Laforêt Villeurbanne-République, Orpi Cusset, Orpi Charpennes) et
    **6 annuaires** (`cylex-locale.fr`, `zimo.fr` ×2, `realadvisor.fr`,
    `lesiteimmo.com`, `fr.mappy.com`). Seuls changements : l'offre France Travail
    sort, une **seconde page `zimo.fr` entre — mais sur Vienne (38), hors cible**,
    et la page `realadvisor.fr` est désormais une fiche d'agence (Century 21 Villa
    Urbana) hébergée par l'annuaire. 📌 **Trois mesures concordantes : la
    recommandation « annuaires » n'est plus une hypothèse, c'est le constat le plus
    solide du journal sur cette requête.** Aucun contenu publié sur le site ne
    prendra ces 6 places.
    🆕 ⚠️ **Et « Aquila Immobilier » apparaît enfin comme un VRAI lien** (via
    `fr.mappy.com`), après avoir été un faux positif du résumé du moteur pendant
    4 runs (22→25/09). **La règle du 23/09 — ne compter que les liens — était la
    bonne, et elle vient de se vérifier à retardement.**
  - « vendre appartement Villeurbanne » — absente. **Cadence respectée** (2 mesures
    par mois au plus, précédente le 04/10). 9 résultats : PAP, **Laforêt blog ×2**,
    **Orpi actualités**, Capifrance, `immo.trovit.fr` ×2, `zimo.fr` ×2.
    🆕 🟡 **OBSERVATION QUI REMET EN CAUSE LA LECTURE DU 04/10 : la SERP n'est plus
    composée uniquement de listings.** Le 04/10 le constat était « 9 listings, zéro
    contenu éditorial » et il avait servi à fermer l'angle (« la réécriture de
    `/vendre` ne déplacera pas cette SERP »). Aujourd'hui **3 des 9 résultats sont
    des pages éditoriales** — deux articles de blog Laforêt sur « vendre
    rapidement votre appartement » et une page « actualités » Orpi.
    ⚠️ **La règle du 08/10 s'applique : un seul delta ne conclut rien.** À
    remesurer avant d'en tirer quoi que ce soit — inscrit en « Hypothèses ».
  - 🆕 **Un concurrent de plus publie un prix communal proche du nôtre : PAP
    annonce 3 623 €/m²** (et « 192 019 € pour 53 m² »), contre notre médiane de
    3 567 €/m². 🟡 **Même nuance de méthode que les 11 et 12/10 : c'est une
    MOYENNE, pas une médiane. Ne pas « corriger » la nôtre pour s'en rapprocher.**
- 🟢 **CHANTIER DU JOUR : CONTENU, comme prescrit le 12/10, et c'est bien LE
  CANDIDAT DÉSIGNÉ** (`loi-carrez-surface`, premier de la liste des pages de droit
  jamais revérifiées). **177 → 2 677 mots servis**, sept défauts de fond corrigés
  dont une **contradiction interne de la page avec elle-même** sur le seuil de
  1,80 m. Détail en « Chantiers faits » et « Erreurs commises ».
- 🟢 **NOUVELLE SOURCE DE DONNÉES OUVERTE, et elle était sous nos yeux depuis le
  07/09 : DVF porte les champs `lot1_surface_carrez` … `lot5_surface_carrez`.**
  Le site exploite DVF depuis cinq semaines sans avoir jamais lu ces colonnes.
  Détail d'usage en « Techniques apprises ».
- ✅ **Signaux mesurés SAINS en PRODUCTION sur la page touchée — ne pas les
  réauditer** : `npx tsc --noEmit` muet ; `npm run build` **vert (88/88 pages)** ;
  `npx eslint lib/blog.ts` propre ; **2 677 mots dans le `<main>`** (contre 177
  avant) ; **parité FAQ visible ↔ `FAQPage` 8/8 questions ET 8/8 réponses**, mot
  pour mot ; **0 mot collé** (motif du 04/10 appliqué après exclusion des
  `<script>`, règle du 12/10) ; **4 blocs JSON-LD** (`RealEstateAgent`,
  `BlogPosting`, `FAQPage`, `BreadcrumbList`, la `FAQPage` **créée par ce run**) ;
  `datePublished` 2026-01-15 / **`dateModified` 2026-10-13** ; « Mis à jour le
  13 octobre 2026 » visible ; **8 H2, tous formulés en questions** ; **3 tableaux**
  avec leurs sources datées en légende ; `<title>` **62 caractères** rendus
  (suffixe compris, contrôle du 12/10) et `metaDescription` **158**.
- ⚠️ **`lastmod` : un seul a bougé, et c'est exactement celui voulu.**
  `/blog/loi-carrez-surface` passe au **2026-10-13**, **seule URL des 53 de
  production à cette date** ; les **trois pages qui GAGNENT un lien entrant
  gardent le leur** — `comment-estimer` au 2026-04-07,
  `diagnostics-obligatoires-vente` au 2026-10-12, `vendre-sans-agence` au
  2026-10-07. **Septième run d'affilée sans inflation de fraîcheur** (décision du
  06/10).
- ✅ **`/estimation`, `lib/dvf.ts` et `lib/estimation.ts` NON touchés** —
  `git status` vérifié explicitement sur ces trois chemins : vide. **Diff total du
  run : 1 fichier** (`lib/blog.ts`), 141 insertions / 14 suppressions.
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** (inchangés) :
  `/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
  `<meta name="robots">` non contradictoires (04/10) ; 6 `<a>` bruts pour des
  liens internes (06/10) ; indentation JSX bizarre mais sans effet sur deux pages
  de quartier (08/10).

**Au 2026-10-12**

- ✅ **AUCUN RUN MANQUÉ, et le contrôle des DATES institué le 11/10 a servi.**
  `git fetch origin` **en tout premier (règle du 16/09)** : avant fetch,
  `origin/main` pointait sur `86be209` (la vérification du 05/10) alors que
  `HEAD` était sur `1521cb0` — soit **six runs d'écart apparents**. Après fetch,
  `origin/main` == `HEAD` == `1521cb0`, et **trois commits portent la date du
  2026-10-11** : le run d'hier a bien eu lieu. ⚠️ **Dix-neuvième confirmation que
  la référence distante du conteneur est périmée au démarrage** — ne jamais rien
  conclure de `origin/main` avant le fetch, et **toujours lire les dates des
  commits ensuite** (c'est ce contrôle qui a révélé les deux runs sautés du
  09 et 10/10).
- ⚠️ Le conteneur démarre sur `claude/dazzling-feynman-q7hty4`, et le `main`
  local était **9 commits en retard** → `git checkout main` puis
  `git merge --ff-only origin/main`, **avant la première édition** (leçon du
  07/10, appliquée comme procédure de démarrage).
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  **Dix-huitième constat identique** (21/09 → 12/10).
- ⚠️ **L'auteur Git du conteneur est `Claude <noreply@anthropic.com>` au
  démarrage, PAS celui qu'impose la consigne client.** Reconfiguré explicitement
  en `Yanis Ouammou <93429758+stupidguywearingtn@users.noreply.github.com>`
  **avant le commit** (sinon Vercel Hobby bloque le build). 🆕 **Ce point n'était
  pas dans le journal : à refaire à chaque run, le conteneur ne le garde pas.**
- Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** (l'hôte sans
  `www` répond 308).
- 🟢 **LUNDI : VEILLE FAITE** (la précédente datait du 05/10, elle avait donc une
  semaine de retard). Résultats en « Techniques apprises » — et **elle valide la
  méthode suivie depuis le 05/10**, elle ne la contredit pas.
- **Deux SERP mesurées, les deux absentes :**
  - « agence immobilière Villeurbanne » — **absente pour la 29ᵉ fois sur 29.**
    🟢 **LE CONSTAT DU 11/10 EST CONFIRMÉ SUR UNE SECONDE MESURE, et la
    composition est RIGOUREUSEMENT IDENTIQUE à celle d'hier** : **3 pages de
    franchise** (Laforêt Villeurbanne-République, Orpi Cusset, Orpi Charpennes),
    **5 ANNUAIRES** (`cylex-locale.fr`, `zimo.fr`, `realadvisor.fr`,
    `lesiteimmo.com`, `fr.mappy.com`) et une offre France Travail.
    📌 **La règle du 08/10 est donc satisfaite — deux mesures concordantes, ce
    n'est plus un delta isolé : sur cette requête, la page est tenue par le
    format annuaire, et aucun contenu publié sur le site ne prendra ces 5
    places.** La demande client « créer/réclamer les fiches annuaires » passe du
    statut d'hypothèse à celui de **recommandation étayée** — à formuler.
  - « prix m2 Villeurbanne » — absente. **Cadence hebdomadaire respectée** (non
    mesurée depuis le 06/10), remesurée avec la veille comme prévu.
    🆕 ⚠️ **Observation NOUVELLE et actionnable sur cette SERP : elle est tenue
    par des pages d'une granularité PLUS FINE que la commune.** Trois des neuf
    résultats ciblent une **rue** ou un **quartier** :
    `efficity.com/prix-immobilier-m2/s_rue-du-progres_villeurbanne_69100/`,
    `realadvisor.fr/fr/prix-m2-immobilier/69100-villeurbanne/rue-des-muriers`,
    `blog.qoridor.fr/prix-immobilier/villeurbanne/quartier/charpennes/`.
    **Notre page de prix est communale + 7 quartiers ; la SERP récompense la
    rue.** À instruire comme angle de contenu, sans conclure d'une seule mesure.
  - 🆕 **Un concurrent de plus publie une médiane proche de la nôtre, et il est
    le plus crédible rencontré jusqu'ici : `blog.qoridor.fr` annonce
    3 506 €/m² pour les appartements, « données DVF au 1er juillet 2026 »,
    calculé sur 1 678 transactions notariées** — contre notre 3 567 €/m². S'y
    ajoutent Orpi 4 267 €/m², Efficity 3 480 € (juillet 2026) et Square Habitat
    3 443 € (janvier 2026). 🟡 **Nuance de méthode du 11/10 toujours valable et
    même renforcée : ce sont des MOYENNES sur fenêtres glissantes, pas des
    médianes — les chiffres ne sont pas comparables terme à terme. Ne pas
    « corriger » notre médiane pour s'en rapprocher.**
- 🟢 **CHANTIER DU JOUR : NON-CONTENU, comme prescrit le 11/10, et c'est bien LE
  CANDIDAT DÉSIGNÉ** (audit des affirmations réglementaires, en commençant par
  `diagnostics-obligatoires-vente`). **Six défauts de droit trouvés en
  production, dont un qui rendait fausse une promesse de l'architecture du site
  elle-même.** Détail en « Chantiers faits » et « Erreurs commises ».
- 🟢 **`georisques.gouv.fr` N'EST PLUS FERMÉ — à retirer de la liste des domaines
  morts.** HTTP 200 sur la racine, et **son API répond sans clé** (détail en
  « Techniques apprises »). ⚠️ **Mais ses PAGES HTML sont une coquille JS sans
  texte** : l'API oui, les pages non.
- ⚠️ **`ecologie.gouv.fr` a rendu `exit 35` aujourd'hui alors qu'il répondait 200
  le 11/10, et `www.rhone.gouv.fr` un `exit 92`.** C'est le transitoire connu du
  30/09 : **une seule mesure ne ferme pas un domaine**, ne pas les reclasser.
- ✅ **Signaux mesurés SAINS sur la page touchée — ne pas les réauditer** :
  `npx tsc --noEmit` muet ; `npm run build` **vert** ; `npx eslint lib/blog.ts`
  propre ; **2 765 mots dans le `<main>`** (contre 217 avant) ; **parité FAQ
  visible ↔ `FAQPage` 6/6 questions ET 6/6 réponses**, mot pour mot ; **0 mot
  collé** (les 22 remontées par le motif minuscule+Majuscule sont **toutes dans
  le bloc JSON-LD**, aucune dans la prose — faux positifs) ; **4 blocs JSON-LD**
  (`RealEstateAgent`, `BlogPosting`, `FAQPage`, `BreadcrumbList`, la `FAQPage`
  étant **créée par ce run**) ; `datePublished` 2026-05-12 /
  **`dateModified` 2026-10-12** ; « Mis à jour le 12 octobre 2026 » visible ;
  **7 H2, tous formulés en questions** ; **tableau de 11 lignes** avec ses
  9 fiches sources datées en légende ; `<title>` **65 caractères** et
  `metaDescription` **158** (dans les cibles).
- ⚠️ **`lastmod` : un seul a bougé, et c'est exactement celui voulu.**
  `/blog/diagnostics-obligatoires-vente` passe au **2026-10-12**, **seule URL des
  53 de production à cette date** ; `charges-copropriete` reste au 2026-03-05,
  `prix-immobilier-villeurbanne-2026` au 2026-09-07 et `dpe-2026-ce-qui-change`
  au 2026-10-11 **bien que les trois reçoivent un lien entrant de la page
  réécrite**. **Sixième run d'affilée sans inflation de fraîcheur** (décision du
  06/10 : un lien reçu ne vaut pas une mise à jour de contenu).
- ✅ **`/estimation`, `lib/dvf.ts` et `lib/estimation.ts` NON touchés** —
  `git status` vérifié explicitement sur ces trois chemins : vide. **Diff total
  du run : 1 fichier** (`lib/blog.ts`), 120 insertions / 15 suppressions.
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** (inchangés) :
  `/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
  `<meta name="robots">` non contradictoires (04/10) ; 6 `<a>` bruts pour des
  liens internes (06/10) ; indentation JSX bizarre mais sans effet sur deux pages
  de quartier (08/10).

**Au 2026-10-11**

- 🔴 **DEUX RUNS MANQUÉS : le 09/10 et le 10/10 n'ont jamais tourné.** Ce n'est
  pas le piège habituel de la référence distante : `git fetch origin` **a bien été
  fait en premier** (règle du 16/09), et il a bien avancé `origin/main` de
  `86be209` à `acea3c9` — mais `acea3c9` **est la vérification du 08/10**, et
  aucun commit ne porte une date du 09 ou du 10. Le dernier chantier publié a donc
  **trois jours**. ⚠️ **Dix-huitième confirmation que la référence du conteneur est
  périmée au démarrage** (avant fetch : `origin/main` sur `86be209`, `HEAD` sur
  `acea3c9`), mais cette fois le fetch n'a PAS absous le calendrier : **il faut
  lire les DATES des commits, pas seulement comparer les refs.** C'est le contrôle
  que ce journal n'avait jamais fait et qui manquait.
- ⚠️ Le conteneur démarre sur `claude/dazzling-feynman-c25e72`, et cette branche
  **est au même commit que `origin/main`** après fetch (0 devant, 0 derrière) :
  rien à rattraper, aucun `merge --ff-only` nécessaire aujourd'hui.
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  **Dix-septième constat identique** (21/09 → 11/10).
- Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** (l'hôte sans `www`
  répond 308).
- **Dimanche : pas de veille** (faite le 05/10). ⚠️ **Prochaine échéance : lundi
  12/10 — c'est-à-dire DEMAIN, et elle est déjà en retard d'une semaine.**
- **Deux SERP mesurées, les deux absentes — et la composition de « agence
  immobilière Villeurbanne » a BASCULÉ :**
  - « agence immobilière Villeurbanne » — **absente pour la 28ᵉ fois sur 28.**
    🟢 **Mais la SERP n'est plus tenue par les franchises** : contre 10 résultats
    sur 10 en franchise les 07 et 08/10 (Laforêt + 9 pages Orpi), on relève
    aujourd'hui **3 pages de franchise seulement** (Laforêt Villeurbanne-
    République, Orpi Cusset, Orpi Charpennes) et **5 ANNUAIRES**
    (`cylex-locale.fr`, `zimo.fr`, `realadvisor.fr`, `lesiteimmo.com`,
    `fr.mappy.com`), plus une offre d'emploi France Travail. ⚠️ **À ne pas
    sur-interpréter — la leçon du 08/10 s'applique mot pour mot** : un seul delta
    ne dit ni que « la SERP s'ouvre » ni qu'elle se referme. **Mais il dit une
    chose utile** : sur cette requête, le format qui occupe la page n'est plus
    éditorial du tout, il est **annuaire**. Aucun contenu ne prendra cette place.
    📌 **Conséquence stratégique à instruire : le levier sur cette requête n'est
    pas du code, c'est la présence du client dans ces annuaires** (fiches Cylex,
    Zimo, RealAdvisor, LeSiteImmo, Mappy). **C'est une demande à formuler au
    client, pas un chantier de repo.**
  - « estimation immobilière Villeurbanne » — absente. **9 résultats, composition
    quasi identique au 08/10** : Laforêt ×2, Orpi ×2, Square Habitat ×2,
    Capifrance ×2, Efficity. **Deux des neuf sont des pages de prix au m²**
    (`efficity.com/prix-immobilier-m2/…`, `squarehabitat.fr/prix-immobilier/…`) :
    la frontière entre « estimation » et « prix m2 » se brouille côté SERP.
  - 🆕 ⚠️ **ET DEUX CONCURRENTS DE PLUS PUBLIENT UNE MÉDIANE PROCHE DE LA NÔTRE,
    ce qui aggrave le constat du 06/10 sur `fonciris` (3 571 € contre nos
    3 567 €).** Relevé dans les résultats du jour : **Efficity annonce
    3 480 €/m² (juillet 2026)** et **Square Habitat 3 443 €/m² (janvier 2026,
    −3,88 % sur un an)**, les deux en se disant adossés aux transactions DGFiP.
    **Notre avantage n'est donc plus la médiane communale** — il est sur ce que
    personne ne croise (contours de quartiers de la Métropole, net vendeur, seuil
    de plus-value, rendement, **et désormais la répartition des DPE**).
    🟡 **Nuance de méthode à garder** : ce sont des **moyennes** affichées par ces
    deux sites, pas des médianes, et sur des fenêtres glissantes — **les chiffres
    ne sont pas comparables au nôtre terme à terme.** Ne pas « corriger » notre
    médiane pour s'en rapprocher.
  - « prix m2 Villeurbanne » **non mesurée** : cadence hebdomadaire (06/10). À
    remesurer avec la veille du 12/10.
- 🟢 **CHANTIER DU JOUR : CONTENU, comme prescrit le 08/10** (le 08/10 était
  non-contenu). **Mais PAS le candidat désigné**, et le refus est motivé par une
  mesure : voir « Chantiers faits » et « Chantiers en attente ».
  **Réécriture de `dpe-2026-ce-qui-change` (337 → 2 502 mots servis), adossée à
  une source de données NEUVE pour ce site : la base DPE de l'ADEME.**
- 🟢 **NOUVELLE SOURCE DE DONNÉES OUVERTE ET EXPLOITABLE — `data.ademe.fr`.**
  Base « DPE Logements existants (depuis juillet 2021) », 15 756 542 diagnostics,
  Licence Ouverte 2.0, API `data-fair` avec agrégats (`/values_agg`) et comptages
  (`/lines?size=0`). **Joignable, rapide, filtrable par code INSEE.** C'est la
  première source de données locales nouvelle depuis DVF — détail d'usage en
  « Techniques apprises ».
- 🟢 **`ecologie.gouv.fr` EST JOIGNABLE** (HTTP 200, page « Diagnostic de
  performance énergétique »). **À ajouter à la liste des sources utilisables** —
  elle porte le calendrier du DPE collectif, introuvable sur service-public.
- ✅ **Signaux mesurés SAINS sur la page touchée — ne pas les réauditer** :
  `npx tsc --noEmit` muet ; `npm run build` **vert** ; `npx eslint lib/blog.ts`
  sans erreur ; **2 502 mots dans le `<main>`** (contre 280 avant) ; **parité FAQ
  visible ↔ `FAQPage` 7/7 questions ET 7/7 réponses**, mot pour mot ; **0 mot
  collé** sur les 5 motifs du 04/10 (seul `1er` remonte, faux positif d'ordinal) ;
  **4 blocs JSON-LD** (`RealEstateAgent`, `BlogPosting`, `FAQPage`,
  `BreadcrumbList`) ; `datePublished` 2026-05-05 / **`dateModified` 2026-10-11** ;
  « Mis à jour le 11 octobre 2026 » visible ; **8 H2, 8 liens internes, 4 liens
  externes** tous vers des sources officielles.
- ⚠️ **`lastmod` : un seul a bougé, et c'est exactement celui voulu.**
  `/blog/dpe-2026-ce-qui-change` passe au **2026-10-11**, **seule URL des 51 à
  cette date** ; `prix-immobilier-villeurbanne-2026` reste au 07/09 et
  `estimation-en-ligne-ou-agence` au 11/09 **bien qu'ils aient reçu un lien
  sortant** — application de la décision du 06/10 (une phrase ajoutée ne vaut pas
  une mise à jour de contenu). **Cinquième run d'affilée sans inflation de
  fraîcheur.** (51 URLs en conteneur = les 53 de production moins les annonces
  Supabase et les pages de l'éditeur : hypothèse close le 07/10.)
- ✅ **`/estimation`, `lib/dvf.ts` et `lib/estimation.ts` NON touchés.** Consigne
  client respectée (`git status` vérifié explicitement sur ces trois chemins :
  vide). **Diff total du run : 1 fichier** (`lib/blog.ts`).
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** (inchangés) :
  `/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
  `<meta name="robots">` non contradictoires (04/10) ; `<title>` longs (01/10 —
  celui du jour fait **65 caractères**, dans la cible, et la `metaDescription`
  **155**, sous les ~160) ; 6 `<a>` bruts pour des liens internes (06/10) ;
  indentation JSX bizarre mais sans effet sur deux pages de quartier (08/10).

**Au 2026-10-08**

- `git fetch origin` **en tout premier (règle du 16/09) : et le piège s'est
  reproduit à l'identique.** Avant fetch, `origin/main` pointait sur `86be209`
  (la vérification du 05/10) alors que `HEAD` était sur `679d981` — soit **deux
  runs d'écart apparents**. Après `git fetch`, `origin/main` == `HEAD` ==
  `679d981`. ✅ **AUCUN RUN MANQUÉ.** Dix-septième confirmation : la référence
  distante du conteneur au démarrage est périmée, **ne jamais rien conclure de
  `origin/main` avant le fetch**.
- 🟢 **`git checkout main` FAIT AVANT LA PREMIÈRE ÉDITION**, cette fois. Le
  conteneur démarre sur `claude/dazzling-feynman-x2l6gc`, local `main` était
  **4 commits en retard** → `git merge --ff-only origin/main` (avance rapide, rien
  de réécrit). **La leçon du 07/10 est appliquée** : c'est la procédure de
  démarrage, pas un rattrapage.
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  **Seizième constat identique** (21/09 → 08/10).
- ⚠️ Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** (l'hôte sans
  `www` répond 308).
- **Jeudi : pas de veille** (faite le 05/10). ⚠️ **Prochaine échéance : lundi
  12/10.**
- **Deux SERP mesurées, les deux absentes — et les DEUX compositions sont
  RIGOUREUSEMENT IDENTIQUES à celles du 07/10 :**
  - « agence immobilière Villeurbanne » — **absente pour la 27ᵉ fois sur 27.**
    **10 résultats sur 10 en franchise** : Laforêt Villeurbanne-République +
    **9 pages Orpi** (Cusset, Charpennes, Flachet, Saint-Jean, Grand-Clément,
    Gratte-Ciel, République, Croix-Luizet, et une page d'annonces). **Zéro
    indépendante locale**, comme le 07/10.
  - « estimation immobilière Villeurbanne » — absente. **9 résultats, même
    composition qu'hier** : Laforêt ×2, Orpi ×2, Square Habitat, **Capifrance ×4**.
  - 🟢 **NUANCE DE MÉTHODE, qui corrige à moitié la conclusion du 07/10.** Le
    07/10 concluait « la composition relevée d'un run à l'autre n'est pas stable ».
    **Deux mesures consécutives identiques montrent qu'elle PEUT l'être** : ce qui
    a bougé, c'est le passage 06/10 → 07/10, pas la composition en soi. **Donc ni
    « la SERP s'ouvre » ni « la SERP est instable » ne se concluent d'un seul
    delta.** Seule l'absence/présence du site reste une mesure fiable d'ici — et
    elle, elle n'a jamais bougé.
  - « prix m2 Villeurbanne » **non mesurée** : cadence hebdomadaire (décidée le
    06/10). À remesurer avec la veille du 12/10.
- 🟢 **CHANTIER DU JOUR : NON-CONTENU, comme prescrit le 07/10 — candidat n°3,
  piste (i), la JUSTESSE des calculs publiés.** Ouverte le 05/10, jamais traitée,
  périmètre cadré au fichier près par le 07/10. **Et elle rapporte : DEUX erreurs
  de fait réellement publiées, trouvées et corrigées.** Détail en
  « Chantiers faits » et en « Erreurs commises et corrigées ».
  1. 🔴 **`/agence-immobiliere-cusset` publiait « 21,3 % de moins qu'à
     Gratte-Ciel ». Le chiffre juste est 17,6 %** — asymétrie des pourcentages.
     La réponse était **aussi dans le JSON-LD `FAQPage`**, donc servie telle quelle
     aux moteurs d'IA.
  2. 🔴 **`/agence-immobiliere-gratte-ciel` annonçait « le quartier le plus cher et
     le plus actif de la ville APRÈS FERRANDIÈRE »** — or Gratte-Ciel est **le plus
     actif de tous, et de loin** (655 ventes, 35 %), et **Ferrandière est 6ᵉ sur 7**
     (187 ventes, 10,0 %). La page **se contredisait elle-même** : sa propre FAQ
     disait « de loin le quartier le plus liquide de la ville ».
- ✅ **CE QUI A ÉTÉ RECALCULÉ ET TOMBE JUSTE — ne pas réauditer.** Tous les
  montants dérivés des 4 pages du périmètre, recalculés **sans réutiliser les
  helpers du site** (script indépendant) :
  - honoraires et net vendeur des 7 quartiers + cas communal : **exacts à l'euro**
    (Ferrandière 14 594 €, Gratte-Ciel 14 307 €, Charpennes 13 109 €,
    Perralière 12 555 €, Buers 12 168 €, Cusset 11 796 €, Cyprian **9 000 €
    forfaitaires**, commune 11 700 €) ;
  - **l'effet de seuil de Cyprian est réel et bien dans le bon sens** : 169 756 €
    passe **244 € sous** les 170 000 €, donc forfait, donc **taux effectif 5,30 %,
    INFÉRIEUR aux 6,00 % des six autres** ;
  - `surfacePourBudget` : 52/65/78 m² (Gratte-Ciel), 57/71/85 (Charpennes),
    63/79/95 (Cusset) — justes ; les écarts en m² (14 m², 6 m²) sont des
    **différences de surfaces, pas des pourcentages** : pas d'asymétrie possible ;
  - `PART_VENTES` Gratte-Ciel = **35 %** (655/1 875) juste ;
  - rendement T2 Charpennes **4,97 %** → affiché « 5,0 % » ;
  - `ECART_INVEST` Charpennes **45 %** (5 120 vs 3 524) : formule **et sens de
    phrase corrects** (« au-dessus de la médiane ») ;
  - `ecartCommune()` des 7 quartiers : base = commune dans la formule **et** dans
    la phrase, donc **pas d'asymétrie** ;
  - 🟢 **les 7 rendements par quartier de `rentabilite-locative-lyon` recalculés un
    par un : 4,47 / 4,56 / 4,97 / 5,19 / 5,36 / 5,53 / 6,40 %, et 4,91 % commune —
    TOUS exacts au centième.** La grappe rendement est saine.
- 🟡 **FAUSSE PISTE INSTRUCTIVE, à ne pas rouvrir : les arrondis des pages de
  quartier.** Les 3 pages affichent le prix **arrondi au millier** et les
  honoraires **arrondis à la centaine**, mais le net vendeur **exact** — de quoi
  croire à trois nombres qui ne se soustraient pas (écarts de 445 €, 479 € et
  −394 €). **C'est déjà traité en toutes lettres** : les trois pages écrivent
  « **Sur le prix non arrondi**, le vendeur perçoit donc X € ». **Vérifié en
  production sur les trois.** Rien à corriger — et la leçon est en
  « Techniques apprises ».
- ✅ **Signaux mesurés SAINS sur les deux pages touchées — ne pas les réauditer** :
  `npx tsc --noEmit` muet ; `npm run build` **vert** ; `npx eslint` sur les
  3 fichiers touchés **sans erreur** ; **parité FAQ visible ↔ `FAQPage` 5/5
  questions ET 5/5 réponses, mot pour mot, sur les deux pages** (donc la réponse
  corrigée à 17,6 % est bien cohérente des deux côtés) ; **0 mot collé** sur les
  5 motifs du 04/10 (seul `.gouv` remonte, faux positif de `data.gouv.fr`) ;
  4 types de blocs JSON-LD servis ; `dateModified` = **2026-10-08** sur les deux.
- ⚠️ **`lastmod` : deux ont bougé, et ce sont exactement les deux voulus.**
  `/agence-immobiliere-gratte-ciel` et `/agence-immobiliere-cusset` passent au
  **2026-10-08** (une affirmation de fait corrigée **est** un changement de
  contenu) ; **`/agence-immobiliere-charpennes` reste au 04/10** parce qu'elle
  n'a **rien reçu** — elle a seulement été auditée. Diff total : **3 fichiers**.
- 🟡 **Découverte d'architecture, à connaître avant de toucher une date** : sur
  les pages de quartier, **la date VISIBLE et le `dateModified` ne viennent pas de
  la même source, et c'est délibéré.** `updated={MAJ}` (= `lib/quartiers.ts`,
  **2026-09-15**) dit au lecteur **quand les chiffres DVF ont été calculés** ;
  `lastmodOf()` dit aux crawlers **quand la page a changé**. Les deux restent donc
  cohérents aujourd'hui (les chiffres n'ont pas changé, les phrases oui) — **mais
  l'en-tête de `lib/seo/lastmod.ts` annonce que les pages lisent la table pour leur
  date visible, ce qui n'est pas le cas ici.** Non tranché, inscrit en
  « Hypothèses à vérifier » : **ne pas unifier sans décision.**
- ✅ **`/estimation`, `lib/dvf.ts` et `lib/estimation.ts` NON touchés.** Consigne
  client respectée (`git status` vérifié explicitement sur ces trois chemins).
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** (inchangés) :
  `/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
  `<meta name="robots">` non contradictoires (04/10) ; 32 `<title>` sur 53
  dépassent 70 caractères (01/10) ; 6 `<a>` bruts pour des liens internes (06/10) ;
  🆕 **indentation JSX bizarre mais sans effet** dans le chapô de
  `/agence-immobiliere-gratte-ciel` et `/agence-immobiliere-cusset`
  (`{fmtPct(ECART)}{" "}` suivi d'un retour à la ligne avant « par rapport à la ») :
  **le rendu est correct en production, vérifié** — application de « ne corrige
  rien qui fonctionne ».

**Au 2026-10-07**

- `git fetch origin` **en tout premier (règle du 16/09) : et aujourd'hui le piège
  était là.** Avant fetch, `origin/main` pointait sur `86be209` (la vérification
  du 05/10) alors que `HEAD` était sur `0b60dd3` — de quoi croire que le chantier
  du 06/10 n'avait jamais été poussé. Après `git fetch`, `origin/main` == `HEAD`
  == `0b60dd3`. ✅ **AUCUN RUN MANQUÉ.** La référence distante du conteneur au
  démarrage est périmée : **ne jamais rien conclure de `origin/main` avant le
  fetch.**
- Le conteneur démarre sur `claude/dazzling-feynman-10fjtr`, **qui pointe déjà sur
  `main`** (branche créée au démarrage de session).
  🔴 **PIÈGE DE PROCÉDURE, tombé dedans aujourd'hui : j'ai commité SANS avoir fait
  `git checkout main`.** Le commit est donc parti sur la branche de session, et
  `git push -u origin main` a poussé le ref `main` LOCAL, resté sur `86be209` —
  d'où un rejet « a pushed branch tip is behind its remote counterpart » qui n'a
  rien à voir avec un conflit. Rattrapé proprement : `git checkout main` puis
  `git merge --ff-only <commit>` (le parent du commit était déjà `origin/main`,
  donc avance rapide sans rien réécrire), puis push. **Règle à appliquer au
  démarrage, avant la première édition : `git checkout main` juste après le
  `git fetch`.** Le journal du 06/10 le disait (« `git checkout main` d'abord,
  comme toujours ») ; deuxième avertissement du journal lu et non exécuté
  aujourd'hui.
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  Quinzième constat identique (21/09 → 07/10).
- ⚠️ Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** (l'hôte sans
  `www` répond 308).
- **Mercredi : pas de veille** (faite le 05/10). ⚠️ **Prochaine échéance : lundi
  12/10.**
- **Deux SERP mesurées, les deux absentes — et la composition de la SERP bouge
  beaucoup plus que l'absence, ce qui est en soi une leçon de méthode :**
  - « agence immobilière Villeurbanne » — **absente pour la 26ᵉ fois sur 26.**
    Composition du jour : **10 résultats sur 10 en franchise** (Laforêt
    Villeurbanne-République + **9 pages Orpi** : Flachet, Cusset, Charpennes,
    République, Grand-Clément, Tête d'Or–Tonkin, Saint-Jean et deux pages
    d'annonces). ⚠️ **Zéro indépendante locale**, alors que le 06/10 en comptait
    **deux** (Salengro Immo, Orpi Cité Immo lue comme locale) et un rapport
    « 7 franchises / 2 indépendantes ». **Conclusion de méthode : la composition
    relevée d'un run à l'autre n'est pas stable et ne doit pas servir à conclure
    que « la SERP s'ouvre » ou « se verrouille ». Seule l'absence/présence du
    site est une mesure fiable d'ici.**
  - « estimation immobilière Villeurbanne » — absente. 9 résultats : Laforêt ×2,
    Orpi ×2, Square Habitat, **Capifrance ×4**. 🔴 **Et cette mesure CONTREDIT la
    lecture du 02/10** : ce jour-là, « 6 des 10 résultats étaient des pages prix
    au m² », d'où l'hypothèse que le moteur lisait la requête comme une demande
    de donnée et non de prestation. Aujourd'hui : **zéro page de prix, 9/9 pages
    de prestation d'agence.** L'hypothèse du 02/10 (faut-il remonter la donnée de
    prix avant la promesse de service sur
    `/estimation-immobiliere-villeurbanne` ?) **ne peut pas être tranchée sur des
    mesures aussi instables — ne pas toucher au rendu de cette page sur cette
    base.**
  - « prix m2 Villeurbanne » **non mesurée** : cadence hebdomadaire décidée le
    06/10. À remesurer avec la veille du 12/10.
- 🟢 **CHANTIER DU JOUR : CONTENU, comme prescrit le 06/10 — `vendre-sans-agence`
  passe de 399 à 2 583 mots rendus**, avec un angle qui n'existait nulle part
  ailleurs : l'écart en euros entre vendre seul et vendre accompagné. Détail en
  « Chantiers faits ».
- 🔴 **L'ERREUR LA PLUS INSTRUCTIVE DU RUN : j'ai écrit, typé et validé un tableau
  d'honoraires par quartier AVANT de découvrir que `/vendre` publie déjà le même
  calcul, à la formule près.** Détail en « Erreurs commises et corrigées ». Le
  tableau a été retiré avant le build final ; l'article renvoie à `/vendre`.
- ✅ **Signaux mesurés SAINS sur la page réécrite — ne pas les réauditer** :
  `npx tsc --noEmit` muet ; `npm run build` vert ; `npx eslint` sur les deux
  fichiers touchés **sans aucune erreur** ; **0 mot collé** sur les 2 583 mots du
  `<main>` (5 motifs du défaut du 04/10) ; **parité FAQ visible ↔ `FAQPage` 6/6
  pour les questions ET 6/6 pour les réponses, mot pour mot** ; 4 blocs JSON-LD
  (`RealEstateAgent`, `BlogPosting`, `FAQPage`, `BreadcrumbList`) ;
  `dateModified` = `2026-10-07` et « Mis à jour le 7 octobre 2026 » visible ;
  **11 liens internes servis dans le `<main>`** ; `title` 76 caractères avec le
  suffixe de marque, `metaDescription` **152** caractères (sous les ~160).
- ✅ **`/estimation`, `lib/dvf.ts` et `lib/estimation.ts` NON touchés.** Consigne
  client respectée (seuls `lib/blog.ts` et `app/vendre/page.tsx` sont modifiés).
- 🔴 **NOUVEAU DOMAINE FERMÉ, et il coûte un angle : `georisques.gouv.fr`.**
  `SSL_ERROR_SYSCALL` / « connection reset » sur 5 tentatives, avec et sans
  en-tête de navigateur, sur trois points d'API. **Sixième domaine fermé**
  (après meilleursagents, seloger, searchengineland, legifrance, economie.gouv).
  Conséquence directe : impossible de publier **quels risques concernent
  réellement Villeurbanne** (termites, mérule, radon, plan d'exposition au
  bruit) — l'article publie la condition légale et renvoie à la mairie, ce qui
  est honnête mais laisse la donnée locale sur la table. Inscrit en attente.
- ⚠️ **Sitemap : 51 URLs en local contre 53 mesurées en production le 06/10.**
  **Ce n'est pas une régression** : `app/sitemap.ts` agrège les annonces
  Supabase (`getAllListings`) et les pages de l'éditeur, absentes du conteneur.
  **À confirmer en ligne après déploiement**, pas à « corriger ».
- ⚠️ **`lastmod` : un seul a bougé, et c'est voulu.**
  `/blog/vendre-sans-agence` passe au 07/10 (contenu réellement réécrit) ;
  `/vendre` reste au 30/09 et `/blog/mandat-simple-ou-exclusif` au 16/09, parce
  qu'ils n'ont reçu **qu'une phrase portant un lien** — application littérale de
  la décision du 06/10 (ne pas faire d'inflation de fraîcheur).
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** (inchangés) :
  `/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
  `<meta name="robots">` non contradictoires (04/10) ; 32 `<title>` sur 53
  dépassent 70 caractères (01/10 — celui écrit aujourd'hui en fait 76, assumé) ;
  6 `<a>` bruts pour des liens internes (06/10, impact SEO nul).

**Au 2026-10-06**

- `git fetch origin` **en tout premier** (règle du 16/09) : **aucun piège cette
  fois, mais le fetch reste indispensable.** Avant fetch comme après, `HEAD` ==
  `origin/main` == `86be209`. ✅ **AUCUN RUN MANQUÉ** : le dernier commit du dépôt
  est bien celui du 05/10 (la vérification de production du 05/10 incluse).
  Le conteneur démarre sur `claude/dazzling-feynman-fczdvj` ; `git checkout main`
  d'abord, comme toujours. Le dépôt porte maintenant **une quinzaine** de branches
  `claude/…` plus `feat/backoffice-supabase` : ne s'en servir d'aucune.
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  Quatorzième constat identique (21/09 → 06/10).
- ⚠️ Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** : l'hôte sans
  `www` répond 308.
- **Mardi : pas de veille** (faite le 05/10). ⚠️ **Prochaine échéance : lundi
  12/10.**
- **Trois SERP mesurées, toutes absentes**, dont la troisième cible qui restait
  non mesurée depuis le 04/10 :
  - « agence immobilière Villeurbanne » — **absente pour la 25ᵉ fois sur 25.**
    Rapport **7 franchises ou annuaires / 2 indépendantes locales** (Nestenn ×2,
    pagesjaunes, Laforêt, Orpi Cité Immo, ERA, Immo de France ×2 + **Salengro
    Immo**, indépendante villeurbannaise). La 2ᵉ indépendante locale confirme la
    lecture du 04/10 : la SERP n'est pas verrouillée par les seules franchises.
  - « estimation immobilière Villeurbanne » — absente. 9 résultats = franchises
    et portails de prix (Nestenn, Square Habitat, Liberkeys, SeLoger, Safti,
    Novea, Netvendeur, Solvimo ×2).
  - 🆕 **« prix m2 Villeurbanne » — ABSENTE, et c'est la mesure la plus
    instructive du run.** Les **9 résultats sur 9 sont des portails nationaux de
    données de prix** : pap, journaldunet, realadvisor, meilleursagents, fonciris,
    safti, netvendeur, immosudest, solvimo. **Zéro agence, zéro contenu
    éditorial.** C'était « la seule requête où le site a une donnée propre que
    les concurrents n'ont pas » (note du 05/10) : la mesure dit que la donnée
    propre ne suffit pas à y entrer, parce que la SERP ne récompense pas un
    contenu mais un **type de page** (une page de données nationale, mise à jour
    mensuellement, avec un maillage ville par ville). ⚠️ **Et une alerte nouvelle :
    `fonciris.fr` titre « Prix m2 Villeurbanne : 3 571 €/m² (69100) 2026 » et dit
    s'appuyer sur la base DVF.** Notre médiane communale est **3 567 €/m²** — à
    4 € près la même. **L'avantage « nous partons des prix signés » n'est donc plus
    exclusif sur cette requête.** À inscrire comme hypothèse : voir ci-dessous.
- 🔴 **LE DÉFAUT DU JOUR, MESURÉ ET CHIFFRÉ : 14 ARTICLES SUR 26 NE RECEVAIENT
  AUCUN LIEN ÉDITORIAL.** Premier comptage, par article, des liens entrants
  venant d'une page hors `/blog` (donc hors listing et hors sitemap). Le 04/10
  avait établi que la grappe blog restait à la profondeur éditoriale 3-4 ; le
  comptage dit **pourquoi**, et c'est plus net que « profondeur » : **la moitié du
  blog n'est liée de nulle part.** Et le défaut touchait les deux articles les plus
  lourds du site après `frais-de-notaire` : `rentabilite-locative-lyon`
  (2 713 mots, rendement par quartier sur prix signés) et
  `plus-value-immobiliere-calcul` (2 598 mots, écrit **la veille**) recevaient
  **zéro** lien. Corrigé aujourd'hui (détail en « Chantiers faits »).
- ✅ **L'arbitrage « qui porte COMBIEN COÛTE LA GESTION LOCATIVE ? », ouvert le
  01/10 et reporté cinq fois, EST TRANCHÉ.** `/faire-gerer` (1 772 mots) publie le
  calcul en euros sur un cas villeurbannais réel ; `cout-gestion-locative`
  (340 mots) ne détient que la fourchette de marché et les deux frais fixes.
  **`/faire-gerer` revendique la requête, et l'article le dit désormais
  explicitement** par un lien de clôture. L'article n'a **pas** été vidé (consigne
  du 01/10 respectée : il garde ses deux frais fixes).
- 🟢 **MICRO-CHANTIER DU 05/10 FAIT, et le `grep` prescrit a payé : 8 occurrences,
  pas 2.** `service-public.fr` → `service-public.gouv.fr` (301 vérifié au `curl`
  ce jour, et les deux fiches F10864 et F1669 répondent **200** sur le nouveau
  domaine). Le journal du 05/10 n'en annonçait que deux ; il y en avait **six dans
  `app/vendre/page.tsx`** (2 commentaires de provenance, 2 réponses de FAQ, 2 blocs
  « Source » visibles) **et deux dans `app/llms.txt/route.ts`**. La 9ᵉ occurrence,
  dans `lib/blog.ts`, est un commentaire qui **documente** la redirection : laissée
  volontairement sur l'ancien domaine, elle n'aurait plus de sens autrement.
- ✅ **llms.txt AUDITÉ ET SAIN — ne pas le réécrire.** La consigne du brief
  (« tiens-le à jour quand tu ajoutes des pages, il dérive vite ») **ne s'applique
  pas ici** : `app/llms.txt/route.ts` liste les 26 articles par
  `articlesByDate.map(articleLine)`, dérivés de `ARTICLES`, donc avec leur titre et
  leur `excerpt` à jour **sans intervention**. Il ne peut pas dériver. Seule la
  prose des lignes de pages principales est écrite à la main — c'est là qu'était la
  source périmée, corrigée ci-dessus. ✅ **Ne pas réauditer** sauf ajout de page.
- ✅ **Signaux mesurés SAINS aujourd'hui — ne pas les réauditer** : sur les
  6 pages touchées, **0 mot collé** sur le texte rendu (contrôle strict du défaut
  du 04/10, 5 motifs, 9 288 mots balayés) ; **parité FAQ visible ↔ `FAQPage` 6/6
  mot pour mot sur les 5 pages à FAQ** ; les 7 nouveaux liens sont tous servis
  **dans le `<main>`** avec l'ancre attendue ; `npx tsc --noEmit` muet ;
  `npm run build` vert ; **aucune nouvelle erreur de lint** (les 24 erreurs du
  dépôt sont pré-existantes et dans `scripts/` et `studio/`).
- ✅ **`/estimation`, `lib/dvf.ts` et `lib/estimation.ts` NON touchés** (vérifié
  sur `git diff --name-only`). Consigne client respectée.
- ✅ **CHANTIER VÉRIFIÉ SERVI EN PRODUCTION LE JOUR MÊME** (déploiement constaté
  ~10 min après le push, plus lent que les ~2 min habituels). Les 7 liens, les
  rendements au centième, la source corrigée et l'inertie totale du sitemap
  (53 URLs, 0 `lastmod` déplacé) sont contrôlés en ligne — détail en « Chantiers
  en attente ». **Le run du 07/10 n'a donc rien à revérifier.**
- 🟢 **COHÉRENCE CHIFFRÉE — la piste (f) avance d'un cran, et par construction.**
  Les trois taux de rendement publiés aujourd'hui (`/faire-gerer`,
  `/gestion-locative`) ne sont **pas saisis** : ils sont calculés depuis
  `LOYER_MEDIAN_HC` et les médianes de `lib/quartiers.ts`, **les mêmes sources que
  `rentabilite-locative-lyon`**. Vérifié : 4,91 % commune, 4,47 %–6,40 % par
  quartier, écart 1,93 point — **identiques au centième** à ce que l'article
  publie. Les trois pages ne peuvent plus diverger.
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** (inchangés) :
  `/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
  `<meta name="robots">` non contradictoires (04/10) ; 32 `<title>` sur 53
  dépassent 70 caractères (01/10). 🆕 **Et un quatrième, découvert par le lint** :
  `app/estimation-immobiliere-lyon/page.tsx:94` lie
  `/estimation-immobiliere-villeurbanne` par un `<a>` brut au lieu de `<Link>`
  (5 autres cas dans `mentions-legales`, `cookies`, `confidentialite`, `annonces`).
  **Non corrigé, et pas par paresse : l'impact SEO est nul** — un `<a href="/…">`
  est un lien crawlable normal, le défaut est côté UX (rechargement complet).
  La règle « ne corrige rien qui fonctionne » s'applique.

**Au 2026-10-05**

- `git fetch origin` **en tout premier** (règle du 16/09) : **le piège était là pour
  la huitième fois sur dix-sept runs.** Avant le fetch, `origin/main` pointait sur
  `ffde5fa` alors que `HEAD` portait `aa9c05a` — de quoi croire que le run du 04/10
  n'avait pas été publié. **Après le fetch : `HEAD` == `origin/main` == `aa9c05a`.**
  Le conteneur démarre sur `claude/dazzling-feynman-f41jg9` ; `git checkout main` +
  `git merge --ff-only origin/main` d'abord, comme toujours.
- ⚠️ **`node_modules` absent au démarrage** — `npm ci` avant tout contrôle.
  Treizième constat identique (21/09 → 05/10).
- ⚠️ Toujours mesurer sur **`https://www.markusimmobilier.fr/…`** : l'hôte sans
  `www` répond 308.
- ✅ **AUCUN RUN MANQUÉ** : le dernier commit du dépôt est bien celui du 04/10.
- ✅ **VEILLE HEBDOMADAIRE FAITE** (lundi, après six reports — elle avait une
  semaine de retard). Détail en « Techniques apprises ». **Elle a produit la
  trouvaille la plus structurante depuis longtemps**, et elle contredit une
  consigne du brief : voir « Erreurs commises et corrigées ».
- **Trois SERP mesurées, toutes absentes.** « Agence immobilière Villeurbanne »
  **absente pour la 24ᵉ fois sur 24**, rapport **7 franchises / 2 annuaires /
  0 indépendante locale** (Human, Laforêt, Nestenn ×2, Orpi, ERA, Immo de France
  + Mappy, Superimmo). « Estimation immobilière Villeurbanne » absente : 9
  résultats = franchises et portails de prix (Nestenn ×2, Liberkeys, Orpi, Novea,
  Solvimo ×2, SeLoger, Galyo).
- 🔴 **CINQUIÈME CIBLE DU BRIEF RETIRÉE, ET L'HYPOTHÈSE DU 04/10 EST CONFIRMÉE :
  « agence immobilière Gratte-Ciel Villeurbanne » EST UNE REQUÊTE DE MARQUE.**
  Les 9 résultats sont, sans exception, des agences dont la **raison commerciale
  contient littéralement « Villeurbanne Gratte Ciel »** (Human Immobilier
  Villeurbanne Gratte Ciel, Guy Hoquet – Villeurbanne Gratte Ciel, ERA
  Villeurbanne Gratte-Ciel, Orpi Cité Immo) ou des annuaires qui listent ces
  mêmes agences nommées (bellesdemeures, logic-immo, meilleursagents, mappy,
  superimmo ×2, facebook). **Aucun contenu ne prendra cette SERP** : c'est une
  recherche d'entité, et Markus ne porte pas ce nom. **Ne plus la mesurer.**
  Avec « agence immobilière Charpennes Villeurbanne » (01/10), « vendre
  appartement Villeurbanne » (04/10) et les deux formulations de l'angle
  « apport » (01 et 02/10), cela fait **cinq cibles du brief d'origine dont la
  mesure a établi qu'aucun contenu ne les prendra**.
- 🟢 **NOUVEAU SIGNAL AUDITÉ ET SAIN — L'ACCÈS DES CRAWLERS D'IA, jamais vérifié
  en 24 runs.** La documentation OpenAI (developers.openai.com/api/docs/bots)
  précise qu'un site **doit laisser passer `OAI-SearchBot`** pour pouvoir être
  cité dans les réponses de ChatGPT search, et qu'un site exclu n'y apparaît plus
  qu'en lien de navigation. Le `robots.txt` de production sert
  `User-Agent: *` + `Allow: /` (seuls `/api/`, `/espace-client`, `/radar`,
  `/admin` sont fermés) : **tous les crawlers d'IA sont donc autorisés, aucun
  correctif nécessaire.** ✅ **Ne pas réauditer** — sauf si `robots.txt` change.
- 🔴 **L'ANGLE QUE LE BACKLOG RÉSERVAIT À AUJOURD'HUI A ÉTÉ MESURÉ PUIS REJETÉ —
  CINQUIÈME ANGLE INVALIDÉ PAR LA MESURE.** Le backlog prescrivait, pour
  `plus-value-immobiliere-calcul`, « le tableau des abattements année par
  année ». Mesure sur « abattement plus-value immobilière par année de détention
  tableau 2026 calcul » : **neuf résultats sur neuf publient déjà les deux mêmes
  tableaux** (IR 6 %/an de la 6ᵉ à la 21ᵉ, 4 % la 22ᵉ ; PS 1,65 %, 1,60 %, 9 %),
  à l'euro et au pourcent près — procivis, kohenavocats, fiscusia, renta-immo,
  berenfus, finalib, guidedesnotaires, koliving, calcunet. **Contenu de
  commodité, saturé.** C'est le motif « règle de droit générique » invalidé le
  29/09 et trois fois depuis. **Le tableau d'abattements n'a donc PAS été publié ;
  il est resté réduit à deux phrases avec renvoi.**
- 🆕 **DÉFAUT DE SOURCE DÉCOUVERT AU PASSAGE, ET IL EST SERVI EN PRODUCTION :
  `service-public.fr` RÉPOND 301 VERS `service-public.gouv.fr`.** Le site cite la
  fiche F10864 sous l'ancien domaine à **deux endroits au moins** (`app/vendre/
  page.tsx`, bloc source de la section plus-value, et `app/llms.txt/route.ts`,
  ligne de `/vendre`). La citation « fonctionne » encore par redirection, donc ce
  n'est pas cassé — mais citer un domaine périmé affaiblit une source, et les
  sources sont le levier GEO. **Non corrigé aujourd'hui, volontairement** (hors
  chantier, et la règle « en cas de doute sur le contenu existant, ne touche
  pas » s'applique) → inscrit en « Chantiers en attente » comme micro-chantier
  prêt à faire, avec ses emplacements. L'article écrit aujourd'hui cite, lui,
  le **bon** domaine.
- ✅ **Contrôle de cohérence chiffrée réussi, et il valide une méthode** : la
  médiane 2022 reconstituée par `med2025 / (1 + vs2022/100)` donne **3 981 €/m²**
  pour la commune — exactement la valeur **déjà publiée** par
  `rentabilite-locative-lyon` et par un tableau d'article. La reconstitution des
  médianes 2022 à partir de `lib/quartiers.ts` est donc fiable et réutilisable.
- ✅ **Signaux mesurés SAINS aujourd'hui — ne pas les réauditer** : `robots.txt`
  et l'accès des crawlers d'IA (ci-dessus) ; sur l'article touché, parité FAQ
  visible ↔ `FAQPage` **6/6 mot pour mot sur le HTML rendu**, **0 mot collé**
  (contrôle strict du défaut du 04/10), `dateModified` = 2026-10-05, sitemap
  **inerte sauf la seule ligne attendue** (1 `lastmod` déplacé sur 51).
  `/estimation`, `lib/dvf.ts` et `lib/estimation.ts` **non touchés** — le diff du
  jour ne contient **qu'un seul fichier**, `lib/blog.ts`.
- ⚠️ **Défauts mineurs VUS et volontairement NON corrigés** (inchangés) :
  `/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
  `<meta name="robots">` non contradictoires (04/10) ; 32 `<title>` sur 53
  dépassent 70 caractères (01/10).

**Au 2026-10-04**

- `git fetch origin` **en tout premier** (règle du 16/09) : **le piège était là, et
  il est exactement celui du 02/10.** Avant le fetch, `origin/main` pointait sur
  `ffde5fa` alors que `HEAD` portait `e47bbf8` — de quoi croire que le run du
  02/10 n'avait jamais été publié. **Après le fetch : `HEAD` == `origin/main` ==
  `e47bbf8`.** Septième occurrence sur seize runs. ⚠️ Le conteneur démarre sur
  une branche de travail `claude/…` ; le dépôt porte maintenant **une douzaine**
  de branches `claude/…` plus `feat/backoffice-supabase` : ne s'en servir
  d'aucune, travailler sur `main`.
- ⚠️ **Le conteneur démarre toujours sans `node_modules`** — `npm ci` avant tout
  contrôle. Douzième constat identique (21/09 → 04/10).
- ⚠️ **Rappel du 02/10, toujours vrai et toujours coûteux** : `markusimmobilier.fr`
  sans `www` répond **308**. L'hôte canonique est **`www.markusimmobilier.fr`**.
  Toujours mesurer sur `https://www.markusimmobilier.fr/…`.
- 🔴 **UN RUN A ÉTÉ MANQUÉ : le samedi 03/10.** Le dernier run du journal est le
  02/10 et le dernier commit du dépôt est le sien (`e47bbf8`, daté du 02/10).
  Rien n'a été poussé le 03/10. Le chantier que le backlog réservait au 03/10
  (pistes (b) et (c)) a donc été fait **aujourd'hui**.
- **Dimanche : pas de veille** (elle se fait le lundi). ⚠️ **La veille
  hebdomadaire est due DEMAIN, lundi 05/10** — la dernière date du 28/09, elle
  aura une semaine de retard. **Ne pas la sauter : c'est la première chose du
  run de demain, avant de choisir le chantier.**
- `sitemap.xml` en production = **53 URLs** (inchangé depuis le 17/09), les 53
  téléchargées (53 × HTTP 200 ; **cinq** échecs transitoires `SSL_ERROR_SYSCALL`
  rattrapés par relance — le défaut du 30/09 se reproduit, `--retry` ne suffit
  pas toujours).
- **Quatre SERP mesurées** (détail au tableau), **toutes absentes**. « Agence
  immobilière Villeurbanne » **absente pour la 23ᵉ fois sur 23**, rapport
  **8 annuaires ou franchises / 1 indépendante locale**.
- 🔴 **DEUX REQUÊTES DU BRIEF SONT À RECLASSER, ET LA MESURE EST NETTE :
  « vendre appartement Villeurbanne » est une requête TRANSACTIONNELLE.** Ses
  9 résultats sont **tous des pages de listings**, zéro éditorial. C'est le même
  motif d'échec que `/acheter` le 02/10. La réécriture de `/vendre` du 30/09 ne
  déplacera pas cette SERP — ce qui ne la condamne pas : son intérêt est la
  citation sur « ce qu'il reste au vendeur », que personne d'autre ne publie.
  **Ne plus espérer de position sur cette requête ; la mesurer deux fois par
  mois au plus.**
- 🟢 **LA THÈSE « PRIX AFFICHÉS ≠ PRIX SIGNÉS » EST RECONFIRMÉE PAR UNE SOURCE
  INDÉPENDANTE.** Sur « prix m2 Villeurbanne par quartier 2026 », le résumé du
  moteur publie sans réserve des médianes de quartier qui sont des prix
  d'annonces : Charpennes **5 120 €/m²**, Gratte-Ciel **4 520**, Cusset
  **3 680**. Nos médianes DVF des mêmes contours : **3 524 / 3 846 / 3 171**.
  Écart **+17,6 % à +45,3 %** — dans la fourchette 16,1–45,3 % publiée le 27/09.
  **Rien à écrire : l'angle est déjà publié à trois endroits** (`investir-locatif-lyon`,
  `/acheter`, pages quartiers).
- 🔴 **LE DÉFAUT DU JOUR, ET IL TENAIT À UN SIGNAL JAMAIS MESURÉ : LA PROFONDEUR
  ÉDITORIALE.** Premier audit des pistes (b) et (c) du backlog. La piste (b)
  revient **saine** (détail ci-dessous) ; la piste (c) a trouvé le défaut.
  Profondeur de clic calculée par BFS sur les 53 pages de production, deux fois :
  **tous liens confondus (nav + pied de page), le site est à 2 clics maximum,
  zéro orpheline — techniquement irréprochable.** Mais en ne comptant que les
  liens du `<main>`, c'est-à-dire ceux qui signalent l'importance plutôt que la
  simple accessibilité : **`/vendre` et `/acheter` sont à la profondeur 4, les
  plus profondes du site**, à égalité avec les articles les plus minces. Cause
  unique et structurelle : **aucune des quatre pages locales ne liait `/vendre`
  ni `/acheter`**, et réciproquement **ni `/vendre` ni `/acheter` ne liait une
  seule page de quartier** — alors que ce sont les mêmes quartiers et les mêmes
  chiffres. Corrigé aujourd'hui (détail en « Chantiers faits »).
- ✅ **PISTE (b) AUDITÉE ET SAINE — ne pas la réauditer.** Chaîne de redirection :
  `http://` → `https://` → `www`, **un saut de 308 à chaque fois, deux au
  maximum**, hôte canonique cohérent partout (**53 URLs du sitemap en `www`**,
  53 canonicals en `www`, `og:url` en `www`, `robots.txt` déclare le sitemap en
  `www`, llms.txt en `www`). **404 : vrai code 404 + `noindex`** sur une URL
  inconnue, y compris sous `/blog/`, `/annonces/` et `/estimation/`. Slash final
  → 308 vers l'URL sans slash. Routes `/api/` : **405 ou 401, aucune fuite de
  données** sur les 8 routes testées. `/admin` → 404, `/admin/pages` →
  `noindex, nofollow`, `/radar` → 307 vers `/admin/login` et **lié depuis aucune
  page publique**. Le `[slug]` attrape-tout de l'éditeur **refuse proprement**
  (`notFound()` hors liste blanche) et `app/sitemap.ts` **liste bien** les pages
  publiées depuis le back-office : le branchement SEO de l'éditeur livré le
  30/09 est correct, contrairement à ce qu'on pouvait craindre.
- 🔴 **UNE CLASSE DE DÉFAUT DE RENDU DÉCOUVERTE AU PASSAGE, ET ELLE ÉTAIT
  VISIBLE EN PRODUCTION : 20 MOTS COLLÉS SUR 8 PAGES.** « 1 875ventes »,
  « 62m² vendu », « 14 712 €de taxes », « +7,8 %par rapport », « en 2025dans la
  base DVF », « Métropole de Lyon.Médianes »… Une seule cause, documentée en
  « Techniques apprises » : **un nœud de texte JSX qui commence par une espace
  juste après une expression `{…}` et se poursuit à la ligne suivante perd cette
  espace au rendu.** Les 20 sont corrigées aujourd'hui, vérifiées sur le HTML
  rendu. **Ce défaut n'avait jamais été cherché en 20 runs** parce que tous les
  contrôles portaient sur la structure (titres, liens, JSON-LD, dates) et jamais
  sur le **texte visible**.
- ✅ **CHANTIER VÉRIFIÉ SERVI EN PRODUCTION LE JOUR MÊME** (déployé ~90 s après le
  push) — détail en « Chantiers faits ». Pour une fois la vérification ne tombe
  pas au run suivant : **le run du 05/10 n'a donc rien à revérifier ici.**
- ✅ **Signaux mesurés SAINS aujourd'hui — ne pas les réauditer** : les 6 pages
  touchées rendent leur FAQ visible **strictement identique** à leur `FAQPage`
  (6 Q/R sur `/vendre`, `/acheter`, `/agence-immobiliere-villeurbanne` ; 5 sur
  chaque page de quartier) ; les quatre montants nets publiés sur les pages
  locales **égalent à l'euro** le tableau de `/vendre` ; le sitemap ne bouge que
  les 4 lignes attendues ; `/estimation`, `lib/dvf.ts` et `lib/estimation.ts`
  **non touchés**.
- ⚠️ **Deux défauts mineurs VUS et volontairement NON corrigés** : la page 404
  sert **deux balises `<meta name="robots">`** (`noindex` et `noindex, follow`) —
  non contradictoires, donc sans effet, pré-existant ; et `/equipe` enchaîne
  toujours `h1` sur `h3` (relevé le 30/09). Inscrits en « Hypothèses à vérifier ».

**Au 2026-10-02**

- `git fetch origin` **en tout premier** (règle du 16/09) : **un piège, et il
  n'était qu'apparent — mais il faut savoir le lire.** Le conteneur démarre sur
  la branche de travail `claude/dazzling-feynman-g8h9jb`, et **avant** le fetch,
  `origin/main` pointait sur `ffde5fa` alors que `HEAD` portait `6d6299c` (le
  run du 01/10) : de quoi croire que le travail d'hier n'avait jamais été
  publié. **Après le fetch, `origin/main` == `6d6299c` : le run du 01/10 est
  bien sur `main` et bien déployé.** La référence locale `origin/main` était
  simplement périmée. → **Ne jamais conclure « le run d'hier n'a pas été
  poussé » avant d'avoir fetché**, et faire ensuite `git checkout main` +
  `git merge --ff-only origin/main` (le dépôt porte une dizaine de branches
  `claude/…` et `feat/backoffice-supabase` : ne s'en servir d'aucune).
- ⚠️ **Le conteneur démarre toujours sans `node_modules`** — `npm ci` avant tout
  contrôle. Onzième constat identique (21/09 → 02/10).
- ⚠️ **PIÈGE NOUVEAU ET COÛTEUX, à connaître dès la première commande :
  `markusimmobilier.fr` sans `www` répond **308** sur TOUTES les URLs.** L'hôte
  canonique est **`www.markusimmobilier.fr`**. Un `curl` sans `-L` et sans `www`
  rend 15 octets avec un code 200 trompeur dans les logs de boucle — c'est
  exactement ce qui s'est produit ce matin sur les 6 premières pages et sur le
  sitemap. **Toujours mesurer sur `https://www.markusimmobilier.fr/…`.**
- ✅ **Pas de run manqué** : le dernier run du journal (01/10) est bien le
  précédent, et **son chantier est vérifié servi en production** — `/acheter` et
  `/annonces` servent désormais deux `<h1>` distincts (« Acheter à Villeurbanne,
  sans surpayer. » / « Nos biens à vendre et à louer à Villeurbanne et à
  Lyon. »). Le correctif du 01/10 est donc bien déployé.
- **Vendredi : pas de veille** (elle se fait le lundi ; celle du 28/09 est la
  référence, **la prochaine est due le lundi 05/10** — et elle est due depuis
  une semaine, ne pas la sauter).
- `sitemap.xml` en production = **53 URLs** (inchangé depuis le 17/09).
- **Cinq SERP mesurées** (détail au tableau), dont **quatre premières mesures**.
  « Agence immobilière Villeurbanne » **absente pour la 22ᵉ fois sur 22**, sur
  9 résultats, rapport **7 annuaires ou franchises / 2 indépendantes locales**
  — un cran moins déséquilibré que le 8/1 d'hier, avec trois entrants et trois
  sortants en 24 h.
- 🔴 **L'ANGLE « APPORT » DE `/acheter` EST CLOS POUR DE BON, ET LE MOTIF
  D'ÉCHEC N'EST PAS CELUI D'HIER.** Le 01/10 demandait de mesurer la
  reformulation « apport par quartier et par typologie » avant d'écrire. Mesurée
  ce matin : les **9 résultats sont TOUS des portails d'annonces** (SeLoger ×2,
  Logic-Immo, Century 21, Orpi, Êtreproprio, ParuVendu, LeSiteImmo, Airbnb).
  Le défaut n'est pas « requête nationale déguisée » (motif du 29/09 et du
  01/10) mais **intention transactionnelle** : le moteur lit « montre-moi des T2
  à Gratte-Ciel ». Aucun contenu éditorial ne déplace neuf pages de listings.
- 🟢 **MAIS LA MÊME MESURE A OUVERT LE CHANTIER DU JOUR, SUR UN CRITÈRE GEO ET
  NON SEO.** Le résumé du moteur, sur cette requête, **écrit lui-même qu'aucun
  résultat ne donne le montant demandé** et retombe sur des fourchettes
  nationales (10-20 %). Une question dont le moteur admet n'avoir aucune source
  est une place vide pour la citation, même quand la SERP est imprenable. Le
  site peut être la seule source qui **additionne** prix signé et frais à
  l'euro près — c'est ce qu'il fait depuis ce matin.
- 🔴 **LE DÉFAUT DU JOUR, ET C'ÉTAIT LA DERNIÈRE PAGE COMMERCIALE DANS CET
  ÉTAT : `/acheter` servait 278 mots.** Mesuré en production ce matin sur la
  page servie : 5 H2 dont **aucun ne pose de question**, **aucune FAQ**,
  **aucun chiffre**, **aucune date**, et deux JSON-LD seulement (`Service`,
  `BreadcrumbList`) — ni `WebPage` ni `FAQPage`. Corrigé aujourd'hui
  (278 → **1 741 mots**, détail en « Chantiers faits »).
- ⚠️ **Un chiffre vu et volontairement NON repris** : sur la requête
  « marge de négociation Villeurbanne », le résumé du moteur avance un « taux de
  négociation médian de 3,85 % ». **Aucun des 9 résultats rendus ne permet de
  l'attribuer.** Non publié, inscrit en « Hypothèses à vérifier ».
- ✅ **Signaux mesurés SAINS aujourd'hui — ne pas les réauditer** : la page
  reconstruite rend **6 Q/R visibles strictement identiques au `FAQPage`**
  (comparaison faite sur le HTML rendu, espaces insécables normalisés), le
  `dateModified` du `WebPage` vaut `2026-10-02`, le sitemap ne bouge que la
  ligne `/acheter`, et `/vendre` comme `/annonces` sont inchangées.

**Au 2026-10-01**

- `git fetch origin` **en tout premier** (règle du 16/09) : **pas de piège ce
  matin.** `HEAD` local == `origin/main` == `ffde5fa` et
  `git rev-list --left-right --count origin/main...HEAD` = `0 0`. Septième run
  sur quatorze sans décalage. ⚠️ **Nouveauté à connaître** : le conteneur
  démarre désormais sur une **branche de travail** (`claude/…`), pas sur `main`
  — `git checkout main` avant toute chose, sinon le commit part sur une branche
  que personne ne lit. Le dépôt porte aussi deux branches `claude/…` et
  `feat/backoffice-supabase` côté distant : ne pas s'en servir.
- ⚠️ **Le conteneur démarre toujours sans `node_modules`** — `npm ci` avant tout
  contrôle. Dixième constat identique (21/09 → 01/10).
- ✅ **Pas de run manqué** : le dernier run du journal (30/09) est bien le
  précédent. Deux commits de back-office (`e08014f`, `ffde5fa`, éditeur de pages
  Puck) ont été poussés depuis, **hors périmètre SEO** — rien à y faire.
- **Jeudi : pas de veille** (elle se fait le lundi ; celle du 28/09 est la
  référence, **la prochaine est due le lundi 05/10**).
- `sitemap.xml` en production = **53 URLs** (inchangé depuis le 17/09), et **les
  53 ont été téléchargées** (53 × HTTP 200 ; **trois** échecs transitoires
  rattrapés par relance — le défaut du 30/09 se reproduit, `--retry` ne suffit
  pas toujours, il faut rejouer les manquantes).
- **Trois SERP mesurées** (détail au tableau). « Agence immobilière
  Villeurbanne » **absente pour la 21ᵉ fois sur 21**, sur une page qui ne rend
  que **9 résultats** aujourd'hui, avec **trois entrants en 24 h** et un rapport
  de **8 annuaires ou franchises / 1 indépendante locale** — le plus déséquilibré
  jamais mesuré.
- 🔴 **UNE REQUÊTE CIBLE DU BRIEF EST À RETIRER, ET LA MESURE EST SANS APPEL :
  « agence immobilière Charpennes Villeurbanne » est une requête de marque.**
  Les 9 résultats portent **tous** sur une seule entité, l'« AGENCE CHARPENNES
  ROLIN BAINSON » — un concurrent dont le nom commercial contient littéralement
  « Charpennes ». Aucun contenu ne déplace neuf résultats consacrés à une entité
  nommée. **Ne plus la viser** ; sur ce quartier, viser prix / estimation /
  rendement, ce que `/agence-immobiliere-charpennes` fait déjà.
- 🔴 **L'ANGLE PRÉVU POUR `/acheter` EST INVALIDÉ AVANT D'AVOIR ÉTÉ ÉCRIT.** La
  requête `quel apport faut-il pour acheter un appartement à Villeurbanne…`
  rend **9 résultats nationaux et génériques, zéro source locale**, et le résumé
  du moteur répond en fourchettes nationales sans jamais citer Villeurbanne.
  C'est le **troisième cas** du motif invalidé le 29/09. L'angle « ce que
  l'acheteur décaisse », proposé le 30/09, **ne suffit pas tel quel** : voir le
  backlog pour la reformulation.
- 🔴 **LE DÉFAUT DU JOUR, ET IL VENAIT D'UN SIGNAL JAMAIS AUDITÉ : LE SITE NE
  DISAIT PAS QUELLE PAGE RÉPOND À QUOI.** Premier audit de la nouvelle liste
  (piste (a) + piste (d) du 30/09), mené sur les `<title>`, `<h1>`,
  `<meta description>` et H2 des **53 pages de production**. Trois trouvailles,
  toutes corrigées aujourd'hui (détail en « Chantiers faits ») :
  1. **`/acheter` et `/annonces` servaient le MÊME `<h1>`** mot pour mot
     (« Trouvez votre prochain chez-vous. »).
  2. **La collision la plus forte du site : `/blog/gestion-locative-villeurbanne-deleguer-ou-non`
     (248 mots) portait mot pour mot le titre ET le H1 de `/gestion-locative`
     (1 708 mots).** Recouvrement title+h1 de **0,78**, le maximum des 1 378
     paires testées. L'article admettait lui-même dans son premier paragraphe
     que la page de service répondait mieux.
  3. **Cinq `<title>` servaient « Markus Immobilier » deux fois** (gabarit
     `%s · Markus Immobilier` de `app/layout.tsx` + marque déjà écrite dans le
     titre de la page) : `/confidentialite`, `/cookies`, `/mentions-legales`,
     `/equipe`, `/recrutement`.
- ⚠️ **L'AUDIT DU 30/09 AVAIT UN ANGLE MORT, ET IL FAUT LE SAVOIR** : il a
  conclu « 53 pages, 53 `<h1>` uniques » — ce qui était vrai **par page** (aucune
  page à zéro ni à deux `<h1>`) mais **n'a jamais testé l'unicité d'une page à
  l'autre**. Le doublon `/acheter` ↔ `/annonces` était là depuis l'origine.
  Voir « Erreurs commises et corrigées ».
- ✅ **Signaux mesurés SAINS aujourd'hui sur les 53 pages — ne pas les
  réauditer** : **aucune `<meta description>` manquante**, **aucune dupliquée**
  (53 descriptions distinctes), et après correction **53 `<h1>` distincts**.
- ⚠️ **Un signal mesuré mais volontairement NON corrigé** : **32 `<title>` sur 53
  dépassent 70 caractères** (jusqu'à 114 sur une fiche bien), donc se font
  tronquer en SERP. Non traité — ce serait toucher 32 pages qui fonctionnent
  pour un gain non mesurable d'ici, et plusieurs de ces titres longs portent
  justement la donnée différenciante. Inscrit en « Hypothèses à vérifier ».

**Au 2026-09-30**

- `git fetch origin` **en tout premier** (règle du 16/09) : **pas de piège ce
  matin.** `git ls-remote origin`, `HEAD` local et `origin/main` rendent le même
  SHA (`df0746c`, le run du 29/09), et
  `git rev-list --left-right --count origin/main...HEAD` = `0 0`. Sixième run
  sur treize sans décalage — la règle reste, elle coûte une commande.
- ⚠️ **Le conteneur démarre toujours sans `node_modules`** — `npm ci` avant tout
  contrôle. Neuvième constat identique (21 → 30/09).
- ✅ **Pas de run manqué** : le dernier run (29/09) est bien le précédent, et son
  chantier est **vérifié servi en production** — `/blog/frais-de-notaire-lyon-2026`
  rend **2 728 mots**, 7 H2 dont 6 en questions, `FAQPage` + `BlogPosting`, et le
  sitemap porte son `lastmod` au 2026-09-29.
- **Mercredi : pas de veille** (elle se fait le lundi ; celle du 28/09 est la
  référence, **la prochaine est due le lundi 05/10**).
- `sitemap.xml` en production = **53 URLs** (inchangé depuis le 17/09), et **les
  53 ont été téléchargées** (53 × HTTP 200, deux échecs TLS transitoires
  rattrapés par relance — voir plus bas).
- **Trois SERP mesurées** (détail au tableau). « Agence immobilière
  Villeurbanne » **absente pour la 20ᵉ fois sur 20**. 🟢 **Mais la SERP bouge
  fort** : quatre entrants en 24 h (ERA, Human Immobilier, Guy Hoquet, Mappy),
  trois sortants (Square Habitat, PagesJaunes, Decultieux), et le rapport passe
  à **8 annuaires ou franchises / 2 indépendantes locales** — le plus
  déséquilibré depuis la correction du 22/09. 🟢 **Et le faux positif
  « Aquila Immobilier » du résumé du moteur, systématique depuis quatre runs,
  ne se présente pas aujourd'hui** : le défaut de l'instrument est fréquent,
  pas constant.
- 🔴 **LE DÉFAUT DU JOUR, ET IL EST SUR UNE PAGE COMMERCIALE DE PREMIER RANG :
  `/vendre` servait 306 mots.** Mesuré sur la page servie ce matin : 5 H2 dont
  **un seul pose une question**, **aucune FAQ**, **aucun chiffre**, **aucune
  date**, et un seul JSON-LD utile (`Service`). C'est pourtant la page qui vise
  « vendre appartement Villeurbanne », requête mesurée **absente** ce matin
  aussi. Le contraste est net avec ses voisines du même gabarit :
  `/faire-gerer` sert 1 913 mots et `/gestion-locative` 1 860. **Le côté
  bailleur du site a été traité deux fois (18 et 21/09), le côté vendeur jamais.**
  C'est le chantier du jour.
- 🔴 **`/acheter` a exactement le même profil : 310 mots, 5 H2, 1 question,
  aucune FAQ, aucun chiffre.** Non traité aujourd'hui (un seul chantier par
  run), **inscrit en tête du backlog**.
- ✅ **LE CANDIDAT NON-CONTENU DÉSIGNÉ HIER — LA COHÉRENCE DES ANCRES — A ÉTÉ
  AUDITÉ, ET IL EST SAIN.** 421 liens internes extraits du `<main>` des 53 pages
  de production, puis inversés ancre → cibles. Résultat : **zéro ancre
  générique** (« cliquez ici », « en savoir plus », « lire la suite »…),
  **zéro ancre vide**, et **une seule ancre contradictoire sur tout le site** —
  « Estimer la valeur de mon bien » pointait vers `/estimation` depuis
  `loi-carrez-surface` et vers `/vendre` depuis `plus-value-immobiliere-calcul`.
  Corrigée aujourd'hui. **Le dernier signal de la liste du 20/09 est donc
  épuisé, et il n'a produit qu'un défaut d'une ligne** : c'est la première fois
  sur cinq qu'élargir la liste des signaux ne produit pas de trouvaille
  substantielle. La liste est close, il faut en inventer une autre.
- ✅ **Quatre signaux de plus audités au passage sur les 53 pages, tous sains —
  ne pas les réauditer** : **53 pages, 53 `<h1>` uniques** (aucune page à zéro
  ni à deux) ; **53 `<link rel="canonical">`, un par page** ; **aucune image
  sans attribut `alt`** dans le `<main>` ; **aucun lien interne mort** — les
  seules cibles hors sitemap sont `/espace-client`, `/signin` (interdits au
  robot, volontaire) et le PDF du barème. Un seul défaut mineur :
  **`/equipe` enchaîne un `h1` sur un `h3`**, saut de niveau sans conséquence
  SEO connue — noté, pas corrigé.
- ⚠️ **Un cinquième domaine inaccessible depuis ce conteneur** :
  `economie.gouv.fr` rend **HTTP 403** (page « Just a moment… », protection
  anti-robot). La liste est donc : `meilleursagents.com`, `seloger.com`,
  `searchengineland.com`, `legifrance.gouv.fr`, `economie.gouv.fr`.
  → **Contournement utilisé aujourd'hui, et il a marché du premier coup** :
  `service-public.fr` répond, et ses fiches donnent le droit applicable avec
  les mêmes chiffres. Les deux volets juridiques du chantier du jour en
  viennent (fiches **F10864** plus-value et **F1669** remboursement anticipé).
  **Pour un point de droit, l'ordre à suivre est désormais : BOFiP →
  service-public.fr → jamais Legifrance ni economie.gouv.fr depuis ce conteneur.**
- ⚠️ **Piège d'outillage revu, différent de celui du 24/09** : sur 53
  téléchargements d'affilée, **deux ont échoué en `SSL_ERROR_SYSCALL` (exit 35)
  alors que `--cacert` était bien passé**. Ce n'est donc pas la panne du 24/09
  (certificat manquant) mais une coupure transitoire : les deux URLs ont rendu
  HTTP 200 à la relance. **Ne pas conclure « page morte » sur un exit 35
  isolé — relancer d'abord**, et utiliser `--retry 3`.

**Au 2026-09-29**

- `git fetch origin` **en tout premier** (règle du 16/09) : **le piège était là
  une fois de plus, sous une forme un peu différente.** `origin/main` du
  conteneur pointait sur `0befbc4` (la vérification du 22/09) alors que le
  `HEAD` local portait déjà `66391bc` — c'est-à-dire que la **référence distante
  était périmée de sept commits**, pas la copie de travail. Après `fetch` :
  `HEAD` == `origin/main` == `66391bc`, et
  `git rev-list --left-right --count origin/main...HEAD` = `0 0`. **Sixième
  occurrence sur douze runs** (16, 18, 22, 24, 28, 29/09) : une fois sur deux.
  La règle reste en tête de protocole, et il faut la lire comme « les refs
  distantes du conteneur sont périmées par défaut », pas seulement « le local
  est en retard ».
- ⚠️ **Le conteneur démarre toujours sans `node_modules`** — `npm ci` avant tout
  contrôle. Huitième constat identique (21 → 29/09).
- ✅ **Pas de run manqué** : le dernier run (28/09) est bien le précédent.
- **Mardi : pas de veille** (elle se fait le lundi ; celle du 28/09 est la
  référence, **la prochaine est due le lundi 05/10**).
- 🟢 **L'HYPOTHÈSE OUVERTE HIER EST TRANCHÉE, ET DANS LE BON SENS : Vercel
  n'écrase PAS les en-têtes posés dans `next.config.ts`.** Mesuré en production
  ce matin, avant tout chantier :
  `https://www.markusimmobilier.fr/videos/hero-desktop.mp4` et
  `/brand/logo-markus.svg` renvoient tous deux
  `cache-control: public, max-age=604800, stale-while-revalidate=86400` —
  exactement ce qui était attendu. **Le passage par `vercel.json` n'est donc pas
  nécessaire ; ne pas ouvrir ce chantier.**
- 🟢 **La photo d'équipe est bien passée à l'optimiseur, et la carte s'affiche.**
  `/equipe` sert la photo via `/_next/image` (garde-fou `isOptimizable` non
  déclenché, l'URL Supabase est bien reconnue), la réponse sort en
  **`content-type: image/webp`, 53 404 octets** au lieu des **1 355 682 octets**
  de PNG brut d'avant-hier — **−96,1 % confirmé en production**, pas seulement en
  local. Et son `cache-control` est désormais
  `public, max-age=14400, must-revalidate` : le `max-age=0` qui se propageait
  depuis `public/` a disparu. Les deux volets du chantier du 28/09 sont donc
  **vérifiés en production**. ✅ Ne pas les réauditer.
- **Trois SERP mesurées** (détail au tableau). « Agence immobilière
  Villeurbanne » **absente pour la 19ᵉ fois sur 19**. Le rapport annuaires ou
  franchises / indépendantes locales tient encore : **6 / 3** (Square Habitat,
  Nestenn ×2, PagesJaunes, Orpi, Laforêt contre Salengro, Immo de France,
  Decultieux). 🟢 **Les noms continuent de bouger** : Square Habitat **revient**
  en 1ʳᵉ position après être sorti hier, `immodvisor` sort, Decultieux et Immo de
  France entrent. La SERP n'est pas figée.
  ⚠️ **4ᵉ faux positif consécutif du résumé du moteur** : « Aquila Immobilier »
  est de nouveau cité alors qu'il est **absent des neuf liens renvoyés** — non
  compté (règle du 23/09). C'est un défaut systématique de l'instrument, à
  traiter comme tel : **ne jamais compter un nom qui n'apparaît pas dans les
  liens**.
- 🔴 **L'ÉCHÉANCE DU 15/09 EST TOMBÉE, ET LA THÈSE N'EST PAS VALIDÉE.** La
  requête `qui paie les honoraires d'agence immobilière vente Villeurbanne`,
  posée le 15/09 comme test de « on peut être cité sans classer », a été mesurée
  ce matin : **9 liens renvoyés, aucun de `markusimmobilier.fr`**, et le résumé
  du moteur ne cite **aucune source locale** — il répond avec des généralités
  nationales (Crédit Agricole, PAP, Manda, CapiFrance…) et termine par « Ces
  informations s'appliquent à l'ensemble de la France, y compris à
  Villeurbanne ». Autrement dit : sur une requête pourtant explicitement locale,
  **le moteur n'a pas cherché de source locale**. Ce n'est donc pas la page
  `/honoraires` qui est en cause — c'est que la requête ne déclenche pas de
  besoin local côté moteur. **Résultat écrit tel quel, comme promis.**
  → Conséquence de méthode : **arrêter d'espérer une citation sur les requêtes
  « droit générique + nom de ville »**. Ce qui peut être cité, c'est ce que
  personne d'autre ne publie (un taux local voté, un prix signé par quartier),
  pas une règle nationale à laquelle on ajoute « à Villeurbanne ».
- ⚠️ **Un quatrième domaine inaccessible depuis ce conteneur** :
  `legifrance.gouv.fr` rend **HTTP 403**, même avec un user-agent de navigateur
  (testé sur deux URLs d'articles). La liste est donc : `meilleursagents.com`,
  `seloger.com`, `searchengineland.com`, `legifrance.gouv.fr`.
  → **Contournement trouvé et réutilisable** : `bofip.impots.gouv.fr` et
  `impots.gouv.fr` répondent, eux, et le BOFiP commente le texte de loi avec ses
  références. Pour un point de droit, **passer par le BOFiP plutôt que par
  Legifrance**.

**Au 2026-09-28**

- `git fetch origin` **en tout premier** (règle du 16/09) : **le piège était là,
  et il était gros.** Avant `fetch`, `origin/main` du conteneur pointait sur
  `0befbc4` (la vérification du 22/09) alors que le vrai `main` distant portait
  déjà `87fd7bb` — soit **six commits et cinq jours de retard**. Sans le
  `fetch`, tout ce run aurait travaillé sur un état du site vieux d'une
  semaine. `git fetch origin` a aligné : `HEAD` == `origin/main` ==
  `origin/claude/dazzling-feynman-vejrt6` == `87fd7bb`, et
  `git rev-list --left-right --count origin/main...HEAD` = `0 0`.
  **Cinquième occurrence sur onze runs** (16, 18, 22, 24, 28/09) : la règle a
  servi presque une fois sur deux, elle reste en tête de protocole.
- ⚠️ **Le conteneur démarre toujours sans `node_modules`** — `npm ci` avant tout
  contrôle. Septième constat identique (21 → 28/09) : étape de démarrage normale.
- ✅ **Pas de run manqué** : le dernier run (27/09) est bien le précédent, et les
  deux runs manqués des 25 et 26/09 restent les 3ᵉ et 4ᵉ de l'historique.
- **Lundi : veille faite** (la précédente datait du 21/09, donc elle avait bien
  **sept jours de retard**). Elle a été faite **avant** le choix du chantier, et
  elle a changé le classement du backlog — détail en « Techniques apprises ».
- `sitemap.xml` en production = **53 URLs** (inchangé depuis le 17/09), et les
  **53 ont été téléchargées** pour l'audit du jour.
- **Trois SERP mesurées** (détail au tableau). « Agence immobilière
  Villeurbanne » **absente pour la 18ᵉ fois sur 18**. Le rapport 6 annuaires ou
  franchises / 3 indépendantes locales tient pour la 4ᵉ mesure d'affilée, mais
  🟢 **les noms bougent enfin** : **Nestenn y apparaît deux fois** (Villeurbanne
  Est et Villeurbanne Ouest), Square Habitat sort, `immodvisor` entre. La SERP
  n'est donc pas figée, elle est juste fermée à nous.
  ⚠️ **3ᵉ faux positif consécutif du résumé du moteur** : « Aquila Immobilier »
  est cité une fois de plus alors qu'il est **absent des neuf liens renvoyés**
  — non compté (règle du 23/09). C'est systématique, pas accidentel.
- 🟢 **Trouvaille de SERP à garder** : sur `prix m2 Villeurbanne`,
  **`immobilier.notaires.fr` classe 4ᵉ**. La source officielle des ventes
  signées est donc présente sur ce créneau — c'est un appui pour l'angle
  « prix affichés contre prix signés » ouvert le 27/09, pas une concurrence.
- 🔴 **Le défaut du jour, sur le signal « page experience » que ce journal
  n'avait jamais audité, et il était sur la page la plus importante du site :
  la home ET `/equipe` servaient la même photo d'équipe en PNG brut de
  1 355 682 octets (1,29 Mo, 842 × 1264), hors pipeline `next/image`.**
  Cause lue dans le code : `TeamCard` rendait une balise `<img>` avec un
  `eslint-disable`, parce que l'URL de la photo est dynamique (base Supabase,
  ou URL collée à la main dans le back-office). **Audit des 53 URLs du
  sitemap** : ce sont les **deux seules** pages concernées, et c'est le même
  fichier. C'est le chantier du jour.
- 🔴 **Deuxième défaut du même audit : tous les fichiers de `public/` sortaient
  en `cache-control: public, max-age=0, must-revalidate`** — alors que
  `/_next/static/*` sort bien en `public, max-age=31536000, immutable`. La
  vidéo du hero (2 289 574 octets), son affiche et le logo SVG repassaient donc
  par une requête de revalidation à **chaque** navigation interne. Et l'en-tête
  **se propage** : les réponses `/_next/image` recopient le `cache-control` de
  l'amont, ce qui explique le `max-age=0` observé sur **toutes** les images
  optimisées du site.
- ✅ **Signaux du même audit mesurés SAINS — ne pas les réauditer** :
  **TTFB en production de 0,29 s à 0,67 s** sur 9 pages clés (total de
  transfert ≤ 0,70 s, le plus lent étant `/honoraires` à 0,69 s) ;
  **compression `br` active** sur le HTML ; `/_next/static/*` bien en
  `immutable` ; **aucune autre image hors `next/image`** sur les 53 pages ; les
  5 balises `<img>` brutes restantes du code sont toutes dans `/admin`,
  `/radar` ou le générateur d'`opengraph-image` — **aucune page publique**.
- ✅ **`llms.txt` vérifié, rien à corriger** : 16 369 octets, **48 URLs citées,
  toutes présentes au sitemap** (zéro URL morte). Ce contrôle a été fait parce
  que c'est une règle « always », **pas** parce que le fichier sert : la veille
  du jour a mesuré qu'il ne sert probablement à rien (voir « Techniques
  apprises »).
- ⚠️ **Un domaine de plus inaccessible depuis ce conteneur** :
  `searchengineland.com` rend **HTTP 403**, même avec un user-agent de
  navigateur. La liste est donc : `meilleursagents.com`, `seloger.com`,
  `searchengineland.com`. Conséquence directe aujourd'hui : l'étude CWV la plus
  citée de la veille **n'a pas pu être lue de première main**, et ses chiffres
  ne sont donc **pas** inscrits comme acquis.

**Au 2026-09-27**

- `git fetch origin` **en tout premier** (règle du 16/09) : **pas de piège ce
  matin**. `git ls-remote origin` et le `HEAD` local rendent le même SHA
  (`74036cb`, la vérification du 24/09), `git rev-list --left-right --count
  origin/main...HEAD` = `0 0`. Cinquième run sur dix sans décalage.
- ⚠️ **Le conteneur démarre toujours sans `node_modules`** — `npm ci` avant tout
  contrôle. Sixième constat identique (21 → 27/09) : étape de démarrage normale.
- 🔴 **Deux runs ont été manqués : les vendredi 25/09 et samedi 26/09 n'ont pas
  eu lieu.** Aucun commit, aucune entrée de journal ces deux jours-là, et la
  production le confirme — aucun `lastmod` du sitemap ne dépasse le 23/09. Ce
  sont les 3ᵉ et 4ᵉ runs manqués depuis l'ouverture (après les 14 et 19/09), et
  **c'est la première fois que deux sautent d'affilée**. Conséquence concrète et
  traitée : le chantier de contenu que le journal avait écrit noir sur blanc pour
  le 25/09 attendait intact, et c'est celui d'aujourd'hui. Le dernier run réel
  étant technique (24/09), la règle d'alternance désigne bien un run de contenu.
- **Dimanche : pas de veille** (elle se fait le lundi ; celle du 21/09 est la
  référence, **la prochaine est due demain, lundi 28/09** — elle aura sept jours
  de retard, à faire en premier).
- ✅ **Le protocole du test d'indexation profonde ne se déclenche PAS aujourd'hui,
  comme le 22/09 l'avait écrit pour ce jour précis.** L'échéance du 13/09 tombait
  au 27/09, mais l'instrument est disqualifié (l'outil de recherche de ce runner
  n'honore ni `site:` ni les guillemets d'exactitude) : le test n'a donc pas été
  remesuré, et la consigne « arrêter d'écrire et chercher un blocage technique »
  reste **suspendue**, pas déclenchée. C'est une décision, pas un oubli.
- `sitemap.xml` en production = **53 URLs** (inchangé depuis le 17/09), build
  local **51** : écart expliqué le 18/09 (annonces publiées en base, absentes du
  conteneur), pas une régression.
- **`/blog/investir-locatif-lyon` mesurée en production avant d'agir** :
  **260 mots rendus** (le backlog écrivait 225 — la mesure d'aujourd'hui est
  celle qui compte), 4 `<h2>` dont **aucun ne pose de question**, **aucun
  chiffre**, aucune FAQ, aucune date de mise à jour, et seulement `BlogPosting` +
  `BreadcrumbList` en JSON-LD. Le diagnostic du 23/09 est confirmé. Son voisin
  réécrit le 23/09 sert bien ses **2 379 mots**, ses 7 H2 en questions et son
  `FAQPage` : le chantier du 23/09 tient en production.
- **Trois SERP mesurées** (détail au tableau). « Agence immobilière
  Villeurbanne » **absente pour la 17ᵉ fois sur 17**, composition **identique au
  relevé du 24/09** (6 annuaires ou franchises contre 3 indépendantes locales),
  **sans une seule rotation en trois jours**. ⚠️ Le résumé du moteur cite de
  nouveau « Aquila Immobilier », **absent des neuf liens renvoyés** : non compté
  (règle du 23/09), et c'est la **deuxième fois de suite** que ce même faux
  positif se présente — il est systématique, pas accidentel.
- 🟢 **Le créneau du chantier du jour est mesuré vide, et l'outil le dit
  lui-même** : sur « prix au m² annoncés sites investissement contre prix
  réellement payés Villeurbanne », le moteur répond explicitement que les
  résultats « ne contiennent pas spécifiquement de données comparatives entre les
  prix annoncés sur les sites d'investissement locatif et les prix réellement
  payés aux notaires ». Neuf résultats, **aucun ne publie cette mise en regard**.
- 🟢 **Fait nouveau, trouvé en téléchargeant les pages concurrentes plutôt qu'en
  lisant un résumé, et il est le cœur du chantier : une page de première page
  Google se contredit elle-même de 23 % sur le prix au m² de Villeurbanne.**
  `cpim.fr/villeurbanne-prix-m2-quartiers/` (mise à jour le 11/08/2026) ouvre sur
  « Villeurbanne s'échange autour de **4 380 €/m²** dans l'ancien en avril 2026 »
  **sans indiquer la provenance de ce chiffre**, et publie plus bas, sur la même
  URL, un encadré explicitement sourcé DVF : « Appartements **3 548 €/m²**,
  moitié des ventes entre **2 930 et 4 137 €/m²**, **3 550 ventes** »
  (2024-2025). Conséquence directement citable : **4 380 €/m² se situe au-dessus
  du prix payé pour les trois quarts des appartements réellement vendus à
  Villeurbanne**, puisque le quartile supérieur de son propre encadré s'arrête à
  4 137 €/m².
- 🟢 **Et la meilleure nouvelle du run, qui n'était pas cherchée : nos médianes
  DVF viennent de recevoir leur première vérification externe indépendante.**
  Trois tiers qui partent des ventes enregistrées publient 3 548 €/m² (encadré
  DVF de cpim.fr), 3 548 €/m² (moninvestimmo.com, page du 20/08/2026) et
  3 520 €/m² (trackstone.fr, prix **moyen** 2025). Notre médiane DVF 2025 est de
  **3 567 €/m²** : les quatre valeurs tiennent dans **1,3 %**. Par quartier,
  moninvestimmo tombe à 0,7–2,5 % de nous sur Cusset, Gratte-Ciel et
  Grandclément. **Le chiffre du site est corroboré par des tiers qui ne nous
  lisent pas.**
- ⚠️ **Deux sources n'ont PAS pu être vérifiées de première main et ne sont donc
  pas citées dans l'article** : `meilleursagents.com` et `seloger.com` rendent
  tous deux **HTTP 403** à ce conteneur, même avec un user-agent de navigateur.
  moninvestimmo attribue 3 743 €/m² à MeilleursAgents pour août 2026 ; **ce
  chiffre n'a pas été publié**, parce qu'une attribution d'attribution reste une
  rumeur au sens de la règle du 23/09. À connaître pour les prochains runs.

**Au 2026-09-24**

- `git fetch origin` **en tout premier** (règle du 16/09) : le conteneur était
  cette fois **en retard d'un run** — `origin/main` pointait sur `0befbc4`
  (22/09) alors que le vrai `main` distant portait déjà `4a04964`, la
  vérification du 23/09. `git fetch` a aligné, `HEAD` == `origin/main` ensuite.
  **Quatrième occurrence sur neuf runs** (16, 18, 22, 24/09) : la règle a servi
  une fois sur deux, elle reste.
- ⚠️ **Le conteneur démarre toujours sans `node_modules`** — `npm ci` avant tout
  contrôle. Cinquième constat identique (21 → 24/09) : étape de démarrage
  normale, plus une anomalie.
- 🆕 **Piège d'outillage nouveau, à connaître avant toute mesure en production :
  `curl` échoue en TLS (`exit 35`) sur ce conteneur sans
  `--cacert /root/.ccr/ca-bundle.crt`.** La première mesure du run est tombée
  dedans et rendait `HTTP 000`, ce qui ressemble à s'y méprendre à un site
  hors-ligne. Détail et parade en « Techniques apprises ».
- **Jeudi : pas de veille** (elle se fait le lundi ; celle du 21/09 est la
  référence, la prochaine est due le **lundi 28/09**).
- `sitemap.xml` en production = **53 URLs**, inchangé depuis le 17/09, et
  **les 53 ont été téléchargées et relues une par une** : 53 × HTTP 200.
- **Deux signaux jamais audités jusqu'ici, tous deux sains** : les **53
  `<title>` sont uniques** et tiennent entre 54 et 123 caractères ; les **53
  `<meta name="description">` sont présentes, uniques et non tronquées**. Rien
  à faire de ce côté — c'est noté pour ne pas le réauditer.
- ✅ **Le maillage du 22/09 tient, et il invalide le candidat inscrit pour
  aujourd'hui.** Le graphe reconstruit sur le HTML rendu des 53 pages donne
  **zéro page à zéro lien entrant**. Surtout,
  `/blog/rentabilite-locative-lyon` — que le backlog décrivait hier comme
  n'ayant « qu'un seul lien de corps entrant » — en reçoit en fait **4**
  (`/blog`, `prix-immobilier-villeurbanne-2026`, `investir-locatif-lyon`,
  `comment-estimer-son-bien-immobilier-lyon-villeurbanne`). **Le chantier
  maillage prévu pour le 24/09 était donc sans objet** : il a été abandonné
  après mesure, pas exécuté par habitude.
- 🔴 **Le défaut du jour, trouvé en auditant la fraîcheur déclarée des 53 pages,
  et il n'était dans aucun backlog : le site publiait un espace réservé de
  rédaction.** `/confidentialite` et `/cookies` servaient en production, en
  toutes lettres, **« Dernière mise à jour : [À DATER au jour de la mise en
  ligne] »**. Deux pages légales — celles où un lecteur et un moteur vont
  précisément chercher un gage de sérieux.
- 🔴 **Et le miroir du même défaut, plus grave pour le SEO : une page se
  contredisait elle-même sur sa propre fraîcheur.**
  `/estimation-immobiliere-villeurbanne` affichait **« 8 septembre 2026 »** à un
  lecteur pendant que le sitemap annonçait **« 12 septembre 2026 »** à Google.
  Cause : la date visible vivait dans un `const UPDATED` recopié à la main dans
  chaque page, et la date du sitemap dans la table `PAGE_LASTMOD` de
  `app/sitemap.ts`. Deux copies manuelles de la même information, qui avaient
  dérivé. C'est le chantier du jour.
- **Troisième volet du même trou** : **aucune page non-blog ne déclarait de
  `dateModified`**. Les 26 `BlogPosting` sont datés ; les 21 pages statiques —
  dont `/honoraires`, que ce journal appelle depuis le 20/09 « la page la plus
  citable du site » — ne portaient **aucune date**, ni visible ni structurée.
- **Trois SERP mesurées** (détail au tableau). « Agence immobilière
  Villeurbanne » **absente pour la 16ᵉ fois sur 16**, composition inchangée
  depuis le 22/09 (6 annuaires ou franchises contre 3 indépendantes locales).

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

| Requête | **2026-10-04** | **2026-10-02** | 2026-10-01 | 2026-09-30 | 2026-09-29 | 2026-09-28 | 2026-09-27 | 2026-09-24 | 2026-09-23 | 2026-09-22 | 2026-09-21 | 2026-09-20 | 2026-09-18 | 2026-09-17 | 2026-09-16 | 2026-09-15 | 2026-09-13 | 2026-09-12 | 2026-09-11 | 2026-09-10 | 2026-09-09 | 2026-09-08 | 2026-09-07 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **NOUVEAU — `combien d'apport pour acheter un T2 à Villeurbanne Gratte-Ciel`** | *non remesuré* | **absent**, **1ʳᵉ mesure — et elle invalide la REFORMULATION que le 01/10 avait demandé de tester avant d'écrire `/acheter`.** Les 9 résultats sont **tous des portails d'annonces** : SeLoger (×2), Logic-Immo, Century 21, Orpi, Êtreproprio, ParuVendu, LeSiteImmo — et un Airbnb. **Zéro contenu éditorial, zéro source locale, aucune page qui réponde à la question posée.** Le motif d'échec n'est PAS celui du 01/10 (résultats nationaux génériques) : ici l'intention est lue comme **transactionnelle** — le moteur comprend « montre-moi des T2 à Gratte-Ciel », pas « explique-moi l'apport ». Un contenu éditorial ne déplacera pas neuf pages de listings. **→ L'angle « apport » est clos pour de bon, dans ses deux formulations.** 🟢 **MAIS la mesure donne autre chose, et c'est un signal GEO, pas SEO** : le résumé du moteur écrit noir sur blanc que « les résultats ne fournissent pas d'information précise sur l'apport nécessaire », puis retombe sur des fourchettes nationales (10-20 %). **Une question à laquelle le moteur admet lui-même n'avoir aucune source est une place vide pour la citation**, même quand la SERP est inattaquable. C'est ce constat, et non un espoir de position, qui a décidé le chantier du jour. | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* |
| **NOUVEAU — `acheter appartement Villeurbanne quel budget prix au m2 par quartier`** | *non remesuré* | **absent**, 1ʳᵉ mesure. SERP **éditoriale** cette fois, contrairement à la précédente : JournalDuNet, PAP, Square Habitat, Imkiz, MeilleursAgents, Hosman, prix-au-m2.fr, **lery-immobilier.com** (agence villeurbannaise, page « prix immobilier Villeurbanne 2026 »), Consortium Immobilier. **9 résultats, dont une indépendante locale qui classe avec exactement le format que nous publions déjà.** Toutes les valeurs citées par le résumé du moteur (3 806 €/m², 3 753 €/m² appartements, Gratte-Ciel 3 787 €/m²) sont des **prix affichés**, pas des prix signés. → Confirme que `/blog/prix-immobilier-villeurbanne-2026` (1 589 mots, FAQPage, mesuré ce matin) vise la bonne requête et qu'il n'y a **pas** de page à créer là ; et que l'argument différenciant du site reste l'écart affiché/signé. | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* |
| **NOUVEAU — `de combien négocier le prix d'un appartement à Villeurbanne marge de négociation`** | *non remesuré* | **absent**, 1ʳᵉ mesure. 9 résultats : **1 seul éditorial national** (Pretto), **7 pages « prix m² »** (Orpi, MeilleursAgents, ImmoSudEst, SeLoger, Fonciris, NetVendeur, Medicis) et 1 annonce. **Aucune réponse locale.** Le résumé du moteur avance « un taux de négociation médian de 3,85 % à Villeurbanne » — ⚠️ **chiffre NON attribué à une source identifiable dans les résultats rendus : ne pas le reprendre, ne pas le publier.** Noté en « Hypothèses à vérifier ». Requête gardée en observation : la place éditoriale locale est vide, mais l'intention penche vers les pages de prix, donc un éventuel chantier devrait partir de `/blog/prix-immobilier-villeurbanne-2026`, pas d'une page neuve. | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* |
| **NOUVEAU — `estimation immobilière Villeurbanne`** (requête nue du brief, à ne pas confondre avec la variante « gratuite en ligne » ci-dessous) | **absente**, 2ᵉ mesure (1ʳᵉ le 02/10). 9 résultats, composition quasi inchangée : Nestenn Est, Nestenn Ouest, Liberkeys, Orpi Cetrim, SeLoger, Novea, Galyo, Solvimo (×2). ⚠️ **Signal GEO du jour** : les trois sources citées par le résumé du moteur se contredisent sur le prix communal — **3 749 €/m² (septembre), 3 623 € (Galyo), 3 618 € (Solvimo)**, soit 131 €/m² d'écart entre elles, et aucune ne dit sur quoi elle est calculée. Notre médiane DVF (3 567 €/m², 1 875 ventes, méthode publiée) reste la seule chiffrée et sourcée — mais elle n'est pas citée. | **absente**, 1ʳᵉ mesure de la formulation nue. 10 résultats : Nestenn Villeurbanne Est, Liberkeys, Imkiz, SeLoger, Orpi Cetrim, Novea, PAP, Galyo, Solvimo (×2). **Constat utile : 6 des 10 résultats sont des pages « prix au m² », pas des pages de service d'estimation.** Le moteur lit cette requête comme une demande de **donnée de prix**, pas de prestation. → `/estimation-immobiliere-villeurbanne` porte déjà des repères de prix par quartier (vérifié dans `llms.txt`) ; si la page est reprise un jour, c'est la donnée chiffrée qu'il faut mettre en tête, pas la promesse de service. Inscrit au backlog, non traité aujourd'hui. | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* |
| **NOUVEAU — `quel apport faut-il pour acheter un appartement à Villeurbanne frais de notaire garantie`** | *non remesuré* | *non remesuré* | **absent**, **1ʳᵉ mesure — et elle invalide par avance l'angle inscrit au backlog pour `/acheter`.** Les 9 résultats sont **tous nationaux et génériques** : Immonot (Rhône), Empruntis, Meilleurtaux, Bouygues Immobilier, guideducredit, MAIF, ebassocies, JeChange, calculfraisdenotaire.net. **Aucune source locale, aucun acteur lyonnais ou villeurbannais.** Le résumé du moteur répond en fourchettes nationales (apport de 10 à 20 %, frais de notaire 7-8 % dans l'ancien, dépôt de garantie 5-10 %) **sans jamais mentionner Villeurbanne**. C'est le **troisième cas** du motif invalidé le 29/09 (« règle de droit générique + nom de ville » : le moteur n'y cherche pas de source locale). → **L'angle « ce que l'acheteur décaisse réellement, par quartier », proposé le 30/09 pour `/acheter`, ne suffira pas tel quel** : la requête qu'il viserait est une requête nationale déguisée. Si `/acheter` est repris, il faut l'ancrer sur une donnée que seuls les prix signés villeurbannais fournissent (par exemple : l'apport minimum en euros par quartier et par typologie), pas sur la règle de l'apport. | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* |
| **NOUVEAU — `frais de notaire achat appartement ancien Lyon Villeurbanne calcul`** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent**, **1ʳᵉ mesure — et c'est elle qui a désigné le chantier du jour.** Les 9 : cr-lyon.notaires.fr, Immonot ×2, immobilier.notaires.fr, **`onva-immobilier-villeurbanne.fr` (« Calcul des frais de notaire à Lyon 3, Villeurbanne et Lyon »)**, mesfraisnotaire, Lion d'Or Immobilier, calculfraisdenotaire.net, SLC Pitance. Deux enseignements : (a) la page 1 est faite de **simulateurs**, pas d'articles — un article qui donne le montant *sans* formulaire a un angle libre ; (b) **une agence villeurbannaise y classe déjà**, donc la requête est bien à portée d'un acteur local. Le résumé du moteur cite un chiffre de 6,32 % de DMTO pour le Rhône — **exactement** ce que notre calcul sur la source DGFiP retrouve, ce qui confirme l'ordre de grandeur sans qu'on ait à le citer de seconde main. | | | | | | | | | | | | | | | | | | |
| **NOUVEAU — `prix au m² annoncés sites investissement contre prix réellement payés Villeurbanne`** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent**, **1ʳᵉ mesure — et le moteur constate lui-même le vide** : il répond explicitement que les résultats « ne contiennent pas spécifiquement de données comparatives entre les prix annoncés sur les sites d'investissement locatif et les prix réellement payés aux notaires ». Neuf résultats (trackstone, horiz.io, CPIM, Orpi, Ynspir, immoradar, moninvestimmo, geraldinearrou, pappers), **aucun ne publie cette mise en regard**. C'est le créneau du chantier du jour, mesure de référence avant publication. | | | | | | | | | | | | | | | | |
| **NOUVEAU — `rentabilité locative Villeurbanne quel rendement net réel`** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent**, **1ʳᵉ mesure**. Neuf résultats, **aucun villeurbannais**, et surtout **aucun ne publie de rendement par quartier calculé sur des prix de vente réels** : fourchette nationale, prix moyen commune entière, ou renvoi vers leur propre simulateur. ⚠️ **Vérifié page par page, jamais sur le résumé du moteur** : les deux pages les mieux classées (horiz.io, lybox.fr), téléchargées directement, **ne publient en fait aucun prix, aucun loyer et aucun rendement** pour Villeurbanne — alors que le résumé du moteur leur en attribuait de précis. C'est le créneau du chantier du jour. | | | | | | | | | | | | | | |
| **NOUVEAU — `syndic de copropriété Villeurbanne tarif honoraires petite copropriété`** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent**, **1ʳᵉ mesure — et la SERP la plus vide rencontrée depuis l'ouverture du journal sur une requête locale** : **zéro résultat villeurbannais**. Neuf résultats, tous nationaux et génériques (Manda, Cotoit, MySweetimmo, Syndic One ×2, Pichet, Lea-syndic, LogicielSyndic, Syndicalur), qui répondent tous par une fourchette France entière (« 150 à 250 € par lot et par an », « forfait minimum de 3 000 à 4 000 € HT »). **Aucune agence de Villeurbanne ne se positionne sur le prix d'un syndic.** C'est cette mesure qui a élargi le chantier du jour au volet syndic. | | | | | | | | | | |
| **NOUVEAU — `faire gérer son bien locatif Villeurbanne agence syndic gestion`** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 9, **2ᵉ mesure**. SERP à nouveau **sans un seul tarif affiché** : Laforêt Villeurbanne (« faire gérer »), Manda, PagesJaunes ×2 (syndics / administrateurs de biens), Orpi Cetrim, Guy Hoquet Villeurbanne Zola, Immo de France ×2, mairie.com. Deux rotations en 24 h (Orpi Cetrim et Guy Hoquet entrent, Square Habitat et C&F Gestion sortent) — la composition, elle, ne bouge pas : franchises + annuaires. **C'est la requête du chantier du jour** : mesure de référence avant renforcement de `/faire-gerer`. | **absent** du top 9, **1ʳᵉ mesure**. SERP tenue par des pages « faire gérer » de franchises (Orpi Key Solutions, Laforêt Villeurbanne), deux pages d'annuaire PagesJaunes (syndics / administrateurs de biens), Square Habitat, Manda, C&F Gestion, Immo de France, mairie.com. **Aucun de ces résultats ne publie de tarif** — notre `/honoraires` et les deux articles du 16/09 le font. Requête notée pour un futur chantier ; **pas travaillée aujourd'hui** (le run est technique). | | | | | | | | | |
| 🟡 **NOUVEAU TEST — la fiction du site est-elle indexée ?** — `"Loft d'exception sur Bellecour" markusimmobilier annonce Lyon 2e` | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* — protocole du 17/09 : une seule remesure vers le 01/10. | *non remesuré* | *non remesuré* | *non remesuré* — protocole posé le 17/09 : **une seule remesure vers le 01/10**, pas avant. | **aucune page de markusimmobilier.fr ne remonte** (SeLoger, ParuVendu, Belles Demeures, Airbnb…). **1ʳᵉ mesure, et c'est la bonne nouvelle du jour** : les 10 fiches de biens fictifs que le sitemap soumettait à Google ne sont **pas** indexées. Le chantier du jour est donc **préventif**, pas curatif. **À remesurer une fois** vers le 01/10 pour confirmer que le `noindex` n'a rien laissé passer. | | | | | | | | | |
| **NOUVEAU — `gestion locative Villeurbanne tarif agence pourcentage loyers`** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent**, **2ᵉ mesure** (formulée `gestion locative Villeurbanne tarif honoraires`). Neuf résultats, **aucun villeurbannais** : Oqoro, BailFacile, Manda, Murani (lyonnais), Foncia, louer-et-gerer, Imodirect, Plusse, Flatlooker. Composition **inchangée depuis le 16/09** : des plateformes nationales de gestion en ligne. **Oqoro publie toujours 4,9 % TTC**, les autres restent sur « 8 à 15 % » ou un formulaire. **Différence décisive avec le créneau syndic du 18/09** : ici les concurrents donnent bien des chiffres. Le trou n'est donc pas « personne ne chiffre » mais **« personne ne chiffre localement, et personne ne va au bout du calcul fiscal »** — c'est l'angle du chantier du jour, mesure de référence avant renforcement de `/gestion-locative`. | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 8, **1ʳᵉ mesure**. SERP tenue par des plateformes nationales de gestion en ligne : BailFacile, Oqoro, Foncia, Imodirect, Plusse, louer-et-gerer, votregestionlocative — **une seule agence locale**, Murani. Fait décisif pour le chantier du jour : **un seul de ces huit acteurs publie un taux précis** (Oqoro, 4,9 % charges comprises). Tous les autres répondent « entre 6 et 8 % HT, selon le bien » ou renvoient vers un formulaire. **Personne ne publie les frais fixes qui s'ajoutent au pourcentage** — c'est exactement ce que notre barème contient et ce que les deux articles touchés aujourd'hui publient désormais. | — | — | — | — | — | — | — | — |
| **NOUVEAU — `qui paie les honoraires d'agence immobilière vente Villeurbanne`** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | 🔴 **ÉCHÉANCE ÉCHUE — thèse INVALIDÉE.** **absent** : 9 liens (Crédit Agricole e-immobilier, PAP, Manda, Barraine, CapiFrance, Levine, Sudgestion, Agence du Val d'Or, Propriétés Privées), **aucun de `markusimmobilier.fr`**, et **aucune source locale** dans le résumé du moteur — qui conclut de lui-même « Ces informations s'appliquent à l'ensemble de la France, y compris à Villeurbanne ». Le test posé le 15/09 (« être cité sans classer ») est donc **négatif** : sur une requête de droit générique + nom de ville, le moteur ne cherche pas de source locale. Ne plus viser ce type de requête. | *non remesuré* — **échéance du protocole demain (~29/09)**, donc pas encore jugeable | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* — **ne pas juger avant le ~29/09**. | *non remesuré* | *non remesuré* | *non remesuré* — **ne pas juger avant le ~29/09**. | *non remesuré* | *non remesuré* — **ne pas juger avant le ~29/09** (protocole posé le 15/09 : cette page vise la citation, pas la 1ʳᵉ page) | **absent**, **1ʳᵉ mesure**. SERP **entièrement nationale et générique** : Foncia, PAP, Crédit Agricole e-immobilier, Barraine, Propriétés Privées, Levine, + 2 blogs de coachs. **Zéro résultat local, zéro barème chiffré, zéro référence légale datée.** La réponse commune est « ça dépend du mandat, comptez 3 à 8 % ». **C'est la SERP la plus faible mesurée depuis le 11/09**, et c'est celle du chantier du jour. | — | — | — | — | — | — | — |
| agence immobilière Villeurbanne | **absente pour la 23ᵉ fois sur 23**, sur une page qui rend **9 résultats**. Composition : Human Immobilier (Villeurbanne Gratte Ciel), Nestenn Villeurbanne Est, Nestenn Villeurbanne Ouest, Laforêt Villeurbanne République, Orpi Cité Immo, ERA Villeurbanne, Mappy (annuaire), Salengro Immo, Immo de France Villeurbanne. Rapport **8 annuaires ou franchises / 1 indépendante locale** (Salengro) — aussi déséquilibré que le 01/10. Deux entrants en 48 h (Human Immobilier reprend la 1ʳᵉ place, Immo de France entre), un sortant (Guy Hoquet). 🔴 **Vingt-trois mesures, vingt-trois absences : cette SERP n'a jamais bougé d'un pouce pour nous.** Le parti pris du 12/09 (le levier y est la fiche Google Business Profile, pas le contenu) reste la seule lecture tenable. | **absente pour la 22ᵉ fois sur 22**, sur une page qui rend **9 résultats**. Composition : Nestenn Villeurbanne Est, Laforêt Villeurbanne République, Nestenn Villeurbanne Ouest, Human Immobilier Villeurbanne Gratte Ciel, Orpi Cité Immo, Mappy, Superimmo, Salengro Immo, Immo de France Villeurbanne. **7 annuaires ou franchises / 2 indépendantes locales** (Salengro, Immo de France) — un cran moins déséquilibré que le 8/1 du 01/10. **Trois entrants en 24 h** (Laforêt République, Orpi Cité Immo, Immo de France), **trois sortants** (ERA, Guy Hoquet, PagesJaunes). Human Immobilier « Villeurbanne Gratte Ciel » est présent pour le 3ᵉ run consécutif — à retenir pour la réserve inscrite au backlog sur la requête « agence immobilière Gratte-Ciel Villeurbanne ». | **absent** du top 9 — **21ᵉ mesure, 21ᵉ absence**. 🟢 **La SERP se renouvelle encore fort : trois entrants en 24 h** (Superimmo, **Salengro Immo**, Immo de France) et deux sortants (ERA, Guy Hoquet) ; Mappy, entrée hier, reste. Les 9 : Nestenn Ouest, Nestenn Est, Laforêt République, Human Immobilier Gratte-Ciel, Orpi Cité Immo, Mappy, **Superimmo**, **Salengro Immo**, Immo de France. Rapport **8 annuaires ou franchises / 1 indépendante locale** (Salengro) — le plus déséquilibré jamais mesuré. 🟢 **Deux enseignements** : (a) le top 10 est passé à **9 résultats seulement** aujourd'hui ; (b) **deux annuaires purs (Superimmo, Mappy) occupent la page 1**, ce qui veut dire que la place d'une indépendante villeurbannaise s'y prend — Salengro le démontre. Pas de faux positif « Aquila » cette fois non plus (2ᵉ run propre consécutif). | **absent** du top 10 — **20ᵉ mesure, 20ᵉ absence**. 🟢 **La SERP se renouvelle nettement : quatre entrants en 24 h.** Les 10 : Nestenn Ouest, Laforêt République, Orpi Cité Immo, Nestenn Est, **ERA**, **Human Immobilier Gratte-Ciel**, **Guy Hoquet Villeurbanne Zola**, **Mappy**, Salengro, Immo de France. Square Habitat, PagesJaunes et Decultieux sortent. Le rapport bascule à **8 annuaires ou franchises / 2 indépendantes locales** (Salengro, Immo de France) : le plus déséquilibré depuis le 22/09, et la sortie de Decultieux fait perdre une indépendante. 🟢 **Le faux positif « Aquila Immobilier » ne se présente PAS aujourd'hui** — il était systématique depuis 4 runs, il ne l'est donc pas définitivement. | **absent** du top 9 — **19ᵉ mesure, 19ᵉ absence**. Rapport **6 annuaires ou franchises / 3 indépendantes locales** pour la 5ᵉ fois d'affilée, mais les noms bougent encore : **Square Habitat revient en 1ʳᵉ position** (il était sorti hier), `immodvisor` sort, **Decultieux et Immo de France entrent**. Les 9 : Square Habitat, Nestenn Est, PagesJaunes, Orpi Cité Immo, Nestenn Ouest, Laforêt, Salengro, Immo de France, Decultieux. ⚠️ **4ᵉ faux positif consécutif** : « Aquila Immobilier » cité par le résumé alors qu'il est **absent des 9 liens** — non compté. | **absent** du top 9 — **18ᵉ mesure, 18ᵉ absence**. Rapport inchangé pour la 4ᵉ fois (**6 annuaires ou franchises contre 3 indépendantes locales**) mais, pour la première fois depuis le 22/09, **les noms bougent** : **Nestenn y apparaît deux fois** (Villeurbanne Est + Villeurbanne Ouest), Square Habitat sort, `immodvisor` entre. Les 9 : Nestenn Est, PagesJaunes, Orpi Cité Immo, Nestenn Ouest, Laforêt République, Salengro, Immo de France, Decultieux, immodvisor. ⚠️ **3ᵉ faux positif consécutif du résumé du moteur** : il cite encore « Aquila Immobilier », **absent des neuf liens renvoyés** — non compté (règle du 23/09) | **absent** du top 9 — **17ᵉ mesure, 17ᵉ absence**. Composition **identique au relevé du 24/09** : 6 annuaires ou franchises (Square Habitat, **Nestenn ×2** — Est et Ouest, PagesJaunes, Orpi Cité Immo, Laforêt République) contre **3 indépendantes locales** (Salengro, Immo de France, Decultieux). **Aucune rotation en trois jours.** ⚠️ Le résumé du moteur cite de nouveau « Aquila Immobilier », **absent des neuf liens renvoyés** : non compté (règle du 23/09) — **deuxième fois de suite que ce faux positif se présente**, il est donc systématique, pas accidentel. | **absent** du top 9 — **16ᵉ mesure, 16ᵉ absence**. Composition **identique au compte du 23/09** : 6 annuaires ou franchises (PagesJaunes, Square Habitat, **Nestenn ×2** — Est et Ouest, Orpi Cité Immo, Laforêt) contre **3 indépendantes locales** (Salengro, Immo de France, Decultieux). ⚠️ Le résumé du moteur cite en plus « Aquila Immobilier », **absent des neuf liens renvoyés** : non compté (règle du 23/09). | **absent** du top 9 — **15ᵉ mesure, 15ᵉ absence**. La composition corrigée le 22/09 est **confirmée à l'identique** : 6 annuaires ou franchises (PagesJaunes, Immodvisor, **Nestenn ×2** — Est et Ouest, Orpi Cité Immo, Laforêt) contre **3 indépendantes locales** (Salengro, Immo de France, Decultieux). Rotation du jour : **Square Habitat, 1ᵉʳ le 22/09, sort du top 9** ; Nestenn y place deux agences. | **absent** du top 9 — **14ᵉ mesure, 14ᵉ absence**. Deux rotations : **Square Habitat revient et prend la 1ʳᵉ place, immodvisor sort** ; Nestenn Est recule de 1 à 2. Square Habitat, Nestenn Est, PagesJaunes, Orpi Cité Immo, Nestenn Ouest, Laforêt République, Salengro, Immo de France, Decultieux. ⚠️ **Correction d'une formule répétée six runs de suite dans ce journal** : « 9 résultats sur 9 sont des annuaires ou des franchises » est **faux**, et l'a toujours été. Le compte exact est **6** (PagesJaunes = annuaire ; Square Habitat, Nestenn ×2, Orpi, Laforêt = franchises) contre **3 agences indépendantes locales** — Salengro, Immo de France (au même endroit depuis plus de 40 ans) et Decultieux (fondée en 1962). La conclusion en est **renversée** : des indépendantes classent bien sur cette requête, elles sont simplement **anciennes et ancrées**. Ce qui les distingue de nous n'est donc pas leur statut mais leur ancienneté de domaine et leur notoriété locale — ce que ni le contenu ni le maillage ne fabriquent en quinze jours. Le levier fiche GBP (backlog n°3) reste valable, mais il faut cesser d'écrire que la SERP est fermée aux indépendantes : elle ne l'est pas. | **absent** du top 9 — **13ᵉ mesure, 13ᵉ absence**. Deux rotations : **Nestenn Est passe 1ᵉʳ et immodvisor sort**, Nestenn Ouest et Decultieux restent. Nestenn Est, PagesJaunes, Orpi Cité Immo, Nestenn Ouest, Laforêt République, Salengro, Immo de France, Decultieux, immodvisor. **9 sur 9 sont encore des annuaires ou des franchises**, sixième run consécutif. En six runs, aucune agence indépendante n'y entre ni n'en sort : seuls permutent un annuaire et deux franchises. **La veille du jour explique pourquoi le contenu n'y changera rien** — sur les requêtes locales, l'IA cite la fiche Google Business Profile avant le site (Profound : google.com 2ᵉ domaine le plus cité d'AI Mode). Levier = point 3 du backlog, action client. | **absent** du top 9 — **12ᵉ mesure, 12ᵉ absence**. Deux rotations : **immodvisor revient et Nestenn Est entre**, Square Habitat et ERA sortent. Nestenn Est, PagesJaunes, Orpi Cité Immo, Nestenn Ouest, Laforêt, Salengro, Immo de France, Decultieux, immodvisor. **9 résultats sur 9 sont encore des annuaires ou des franchises**, pour le cinquième run consécutif. En cinq runs, le seul mouvement de cette SERP est le va-et-vient d'un annuaire (immodvisor) et de deux franchises (ERA, Square Habitat, Nestenn Est) — **aucune agence indépendante n'y entre, dans aucun sens**. | **absent** du top 9 — **11ᵉ mesure, 11ᵉ absence**. Une rotation : **ERA revient**, immodvisor sort. Square Habitat, PagesJaunes, Orpi Cité Immo, Nestenn (Villeurbanne Ouest), Laforêt, ERA, Salengro, Immo de France, Decultieux. **9 résultats sur 9 sont encore des annuaires ou des franchises**, pour le quatrième run consécutif — le seul mouvement en quatre runs reste la permutation ERA ⇄ immodvisor, un annuaire contre une franchise. | **absent** du top 9 — **10ᵉ mesure, 10ᵉ absence**. Une rotation par rapport au 15-16/09 : **immodvisor revient**, ERA sort. Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn (Villeurbanne Ouest), Salengro, Immo de France, Decultieux, immodvisor. **9 résultats sur 9 sont encore des annuaires ou des franchises**, pour le troisième run consécutif. | **absent** du top 9 — **9ᵉ mesure, 9ᵉ absence**. SERP **strictement identique à celle du 15/09, sans une seule rotation** : Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn, ERA, Salengro, Immo de France, Decultieux. **9 résultats sur 9 sont des annuaires ou des franchises**, pour le deuxième run consécutif. | **absent** du top 9 — **8ᵉ mesure, 8ᵉ absence**. SERP stable, deux rotations : **Square Habitat et ERA rentrent**, immodvisor et un des deux Nestenn sortent. Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn, ERA, Salengro, Immo de France, Decultieux. **9 résultats sur 9 sont des annuaires ou des franchises** — pire qu'au 13/09 (8 sur 9). | **absent** du top 9 — **7ᵉ mesure, 7ᵉ absence**. SERP à nouveau stable, une seule rotation : **immodvisor entre** (annuaire d'avis), Square Habitat sort. Laforêt, PagesJaunes, Orpi Cité Immo, Nestenn ×2, Salengro, Immo de France, Decultieux, immodvisor. **8 des 9 résultats sont des annuaires ou des franchises** — le constat du 09/09 tient sans exception depuis 7 runs. | **absent** du top 9 — **6ᵉ mesure, 6ᵉ absence**. SERP stable, une rotation par rapport à la veille (Square Habitat entre, ERA sort) : Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn ×2, Salengro, Immo de France, Decultieux. **C'est la requête de la page renforcée aujourd'hui** — mesure de référence avant chantier. | **absent** du top 9 — SERP **identique** à la veille à une rotation près (ERA ressort, Laforêt reprend la 1ʳᵉ place). Toujours annuaires + franchises. | **absent** du top 9 — SERP quasi identique, 1 rotation : Square Habitat entre, ERA sort (Laforêt, PagesJaunes, Square Habitat, Orpi Cité Immo, Nestenn ×2, Salengro, Immo de France, Decultieux) | absent du top 8 | absent | absent |
| estimation immobilière Villeurbanne gratuite en ligne | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 10, mesuré `estimation immobilière Villeurbanne` (même formulation qu'au 28/09). Les 10 : Nestenn Ouest, Nestenn Est, **liberkeys**, Orpi Cetrim, imkiz, MeilleursAgents, SeLoger, **Novea**, netvendeur, **PAP**. ⚠️ **Le constat du 28/09 s'aggrave : 5 des 10 sont des pages « prix au m² », pas des pages d'estimation** (MeilleursAgents, SeLoger, netvendeur, PAP, et imkiz qui titre « Prix m² et estimation »). Salengro, Decultieux et Solvimo sortent : **plus une seule agence villeurbannaise dans les 10**. Les valeurs du résumé (3 806 / 3 749 / 4 630 €/m²) **ne sont pas retenues** : MeilleursAgents et SeLoger rendent HTTP 403 à ce conteneur (règle du 27/09). | *non remesuré* | **absent** du top 9, mesuré `estimation immobilière Villeurbanne` (sans « gratuite »). Les 9 : Nestenn Est, Nestenn Ouest, MeilleursAgents, Orpi Cetrim, imkiz, Salengro, Decultieux, netvendeur, Solvimo. **Cinq des neuf sont des pages « prix au m² » d'agrégateurs**, pas des pages d'estimation. ⚠️ Le chiffre du résumé (3 806 €/m² attribués à MeilleursAgents) **n'est pas retenu** : ce domaine rend HTTP 403 à ce conteneur, donc invérifiable de première main (règle du 27/09) | *non remesuré* | **absent** du top 9, mesuré `estimation immobilière Villeurbanne gratuite`. Neuf résultats : Nestenn ×2, imkiz, bien-estimer-safti, immo-land, **Salengro**, netvendeur, **Decultieux**, solvimo. Créneau tenu par les **simulateurs nationaux** (6 sur 9) ; les deux seules locales sont les mêmes indépendantes anciennes que sur la SERP générique. | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 8 — SERP **très renouvelée** en 2 jours : 4 entrants (Square Habitat, MonMandatLocal, BienEstimer/safti, EN MODE IMMO) face à Nestenn ×2, imkiz, Salengro. **MonMandatLocal affiche « 1 998 transactions réelles »** : 2ᵉ acteur en 2 jours à mettre en avant la donnée de transaction. | *non remesuré* (SERP identique 3 jours de suite — effort reporté sur le chantier technique) | **absent** du top 9 | absent | absent |
| estimation immobilière en ligne ou agence Villeurbanne fiable | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (article réécrit la veille, beaucoup trop tôt) | **absent** du top 10 — **1ʳᵉ mesure**. Aucun résultat éditorial qui chiffre quoi que ce soit : Imop, Nestenn ×2, MeilleursAgents, Liberkeys, Orpi, imkiz, Onva, Salengro, Decultieux. Que des pages de service et une page de prix de portail. **SERP la plus faible rencontrée depuis le début du journal sur une requête d'intention vendeur.** | *non mesuré* | *non mesuré* | *non mesuré* | *non mesuré* |
| prix m2 Villeurbanne par quartier **2026** | **absent**, remesuré. 9 résultats, tous des portails ou des agrégateurs de prix : MeilleursAgents, Square Habitat, PAP, cpim.fr (×2), Safti, prix-au-m2.fr, Léry Immobilier, Meilleursquartiers. ⚠️ **Et la mesure donne un fait vérifiable et exploitable** : le résumé du moteur publie des médianes par quartier qui sont des **prix d'annonces**, et il les donne sans réserve — « Charpennes 5 120 €/m², Gratte-Ciel 4 520 €/m², Cusset 3 680 €/m² ». Nos médianes DVF des mêmes contours sont **3 524 / 3 846 / 3 171 €/m²**. L'écart va de **+17,6 % (Gratte-Ciel) à +45,3 % (Charpennes)** — exactement la fourchette 16,1–45,3 % publiée le 27/09 puis reprise sur `/acheter` le 02/10. **La thèse « prix affichés ≠ prix signés » est donc reconfirmée par une source indépendante, deux semaines après.** Rien à écrire de plus : l'angle est déjà publié à trois endroits. | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | Variante **communale** mesurée aujourd'hui (`prix m2 Villeurbanne`, pas « par quartier ») : **absent** du top 9 — efficity, Nestenn Ouest, SeLoger, **immobilier.notaires.fr**, Journal du Net, PAP, Orpi, MeilleursAgents, immosudest. 🟢 **Fait nouveau : `immobilier.notaires.fr` classe 4ᵉ**, donc la source officielle des ventes signées est présente sur ce créneau — c'est un argument pour l'angle « affiché contre signé » du 27/09, pas contre. Les valeurs du résumé (3 510 / 3 649 / 3 806 €/m²) **ne sont pas retenues** : aucune n'a été relue sur la page qui la publie | *non remesuré en tant que SERP* — mais **les cinq pages de ce créneau ont été téléchargées une par une** pour le chantier du jour (cpim.fr, trackstone.fr, orpi.com, moninvestimmo.com, horiz.io : 5 × HTTP 200). C'est là qu'a été trouvée la **contradiction interne de cpim.fr** (4 380 €/m² en tête d'article, 3 548 €/m² sourcé DVF en bas de la même page). ⚠️ **`meilleursagents.com` et `seloger.com` rendent HTTP 403 à ce conteneur**, même avec un user-agent de navigateur : leurs chiffres ne sont pas vérifiables de première main ici. | **absent** du top 9, **3ᵉ mesure**. Neuf résultats : Square Habitat, MeilleursAgents, PAP, SeLoger, **CPIM**, Fonciris, prix-au-m2, Régie Franchet, Immo Sud-Est. **Aucun villeurbannais.** C'est sur cette SERP que l'hypothèse CPIM a été tranchée (voir « Hypothèses à vérifier ») : la page existe, elle porte `dateModified` au 11/08/2026, et elle publie bien Charpennes **5 120 €/m²**. | *non remesuré* | **absent** du top 9, **2ᵉ mesure** (la 1ʳᵉ datait du 10/09). SERP à nouveau renouvelée de moitié : MeilleursAgents, PAP, SeLoger, **CPIM**, prix-au-m2, fonciris, **regiefranchet**, immosudest, immovrai. Deux faits utiles. (1) **immovrai titre explicitement « ventes DVF 2026 »** : la donnée notariale n'est plus notre exclusivité d'affichage. (2) **CPIM publie « Charpennes 5 120 €/m² »**, soit **45 % au-dessus** des 3 524 €/m² que donnent les ventes DVF réelles sur Charpennes – Tonkin — exactement l'écart relevé le 12/09, toujours là neuf jours plus tard et toujours en première page. MeilleursAgents annonce de son côté 3 806 €/m² toutes typologies et une fourchette appartements de 2 625 à 5 205 €/m². **L'angle « écart entre prix affichés et prix réellement payés » reste donc intact et non publié** (backlog point 2). | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (SERP renouvelée de moitié la veille, rien de neuf à en tirer en 24 h) | **absent** du top 8 — SERP **nettement renouvelée** : 4 entrants (fonciris, prix-au-m2.fr, regiefranchet, **immovrai, qui affiche « ventes DVF »**) face à SeLoger, PAP, MeilleursAgents, immosudest | absent du top 8 | absent | absent |
| vendre appartement Villeurbanne **agence** | **absent**, remesuré (1ʳᵉ mesure depuis la réécriture de `/vendre` le 30/09). 9 résultats, **tous des pages de listings** : Orpi Cité Immo, Laforêt, Nestenn, Guy Hoquet (×2), Orpi annonces, Guérin Immobilier, Salengro, Immo de France. **Zéro contenu éditorial.** → Même motif que `/acheter` le 02/10 : **intention transactionnelle**, le moteur lit « montre-moi des appartements à vendre ». La réécriture de `/vendre` ne déplacera pas cette SERP ; son intérêt est ailleurs (citation sur « ce qu'il reste au vendeur », requête que personne d'autre ne couvre). | *non remesuré* | *non remesuré* | **absent** du top 10, **2ᵉ mesure** (la 1ʳᵉ datait du 10/09), mesuré `vendre appartement Villeurbanne agence`. **C'est la requête du chantier du jour**, mesurée avant réécriture de `/vendre`. Les 10 : Orpi ×2 (annonces + Cité Immo), Laforêt, Nestenn, **fnaim.fr**, Guy Hoquet ×3, Nestenn Est, **guerin-immobilier.fr**. Composition **de même nature qu'au 10/09** — portails, franchises et une fédération — avec **une seule indépendante locale** (Mathieu Guérin, 10ᵉ). Fait décisif pour l'angle retenu : **les dix résultats sont des pages d'annonces ou de présentation d'agence ; aucun ne dit au vendeur ce qu'il touchera à l'arrivée.** Le créneau « décompte du net vendeur » est vide. | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 10 — que des portails et des franchises (Orpi ×2, Nestenn, leboncoin, Guy Hoquet, Logic-Immo, Century 21, Salengro, Quatuor, Chomel) | *non remesuré* | absent du top 7 | *non mesuré* |
| agence immobilière Gratte-Ciel Villeurbanne | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent** du top 8 (Human Immobilier, Guy Hoquet ×2, Orpi, PagesJaunes, MeilleursAgents, ERA, Superimmo ×2) | *non remesuré* | absent du top 8 | *non mesuré* |
| agence immobilière Charpennes Villeurbanne | *non remesuré* | *non remesuré* | **absent**, **1ʳᵉ mesure — et le résultat clôt la question : cette requête n'est pas à prendre.** Les 9 résultats portent **tous sur une seule entité**, l'**AGENCE CHARPENNES ROLIN BAINSON** (52 cours Émile Zola) : logic-immo, SeLoger, location-etudiant, e-pro, Mappy, Superimmo ×2, rolin-bainson.fr ×2. La requête se comporte donc comme une **requête de marque** — le nom commercial d'un concurrent contient littéralement « Charpennes » — et aucun contenu ne déplacera 9 résultats consacrés à une entité nommée. 🔴 **Conséquence stratégique : retirer « agence immobilière Charpennes Villeurbanne » des requêtes cibles** et viser sur ce quartier des requêtes non ambiguës (prix, estimation, rendement), ce que `/agence-immobiliere-charpennes` fait déjà. | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (requête écartée depuis le 11/09) | *non remesuré* (requête écartée le 11/09 : le nom du quartier est celui d'un concurrent) | **absent** du top 9 — SERP tenue par une agence locale homonyme (« Agence Charpennes Rolin Bainson », présente 4 fois via Logic-Immo, SeLoger, Superimmo, repimmo), + PagesJaunes, Orpi, Guy Hoquet. **Requête quasi imprenable au contenu** : le nom du quartier est le nom d'un concurrent. | *non remesuré* | **absent** du top 9 | *non mesuré* | *non mesuré* |
| où acheter à Villeurbanne quartier | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (article réécrit il y a 2 jours) | *non remesuré* (article réécrit il y a 1 jour, trop tôt) | **absent** du top 8 | *non mesuré* | *non mesuré* |
| quel quartier choisir pour acheter un appartement à Villeurbanne 2026 | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (idem) | *non remesuré* (idem) | **absent** du top 8 | *non mesuré* | *non mesuré* |
| investir locatif Villeurbanne : rendement et quartier **2026** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | **absent**, mesuré `investir locatif Villeurbanne quel quartier rendement 2026`. Neuf résultats, **aucun villeurbannais** : lybox, investissement-locatif.com, **CPIM**, ImAvenir, geraldinearrou, Hagnéré, **moninvestimmo**, Ynspir, Purple Immobilier. Fait neuf et important : **moninvestimmo publie des médianes explicitement tirées du DVF 2024-2025 et tombe à 0,7–2,5 % des nôtres** sur Cusset, Gratte-Ciel et Grandclément. La donnée notariale n'est donc plus notre différenciateur sur ce créneau ; ce qui l'est, c'est la **mise en regard affiché / signé**, que personne ne publie. | *non remesuré* | **absent**, sur **deux** formulations mesurées ce matin (`investir locatif Lyon Villeurbanne rentabilité prix au m2 réel` et `rentabilité locative Villeurbanne quel rendement net réel`). **Zéro agence villeurbannaise dans les 9 résultats des deux** : horiz.io, Trackstone, Lybox, homelikehome, investissement-locatif.com, cashflowpositif, Hagnéré, Ynspir, pierre-de-lyon, cyriljarnias — et Immo de France (lyonnais) en 9ᵉ sur une seule. **C'est la SERP du chantier du jour.** | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (mais voir la ligne du nouveau test : **ma-rentabilite.fr publie prix, loyers ET rendement par quartier villeurbannais** — 3ᵉ confirmation que cette SERP est fermée) | **absent** du top 7 — **1ʳᵉ mesure**. SERP tenue par des spécialistes de l'investissement qui publient **tous** des prix ET des rendements par quartier (lybox, investissement-locatif.com, CPIM, geraldinearrou, Hagnéré, MonInvestImmo). **Terrain fermé, pas ouvert** : contrairement aux SERP acheteur et estimation, la donnée chiffrée y est déjà la norme. **Mais leurs chiffres ne sont pas les nôtres** : CPIM annonce « Charpennes 5 120 €/m² » quand DVF donne 3 524 €/m² sur Charpennes – Tonkin. Piste éditoriale notée en backlog. | *non mesuré* | *non mesuré* | *non mesuré* | *non mesuré* | *non mesuré* |
| 🟢 **TEST D'INDEXATION** — `"87 rue Édouard Vaillant" 69100 Villeurbanne agence immobilière` | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (acquis le 10/09) | *non remesuré* | *non remesuré* | *non remesuré* (acquis le 10/09) | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* (acquis le 10/09) | *non remesuré* (acquis le 10/09) | *non remesuré* (acquis le 10/09, la home est indexée — inutile de le repayer chaque jour) | **markusimmobilier.fr PRÉSENT** dans les résultats | *non mesuré* | *non mesuré* | *non mesuré* |
| 🔴 **TEST D'INDEXATION PROFONDE** — `"Ferrandière – Maisons-Neuves" médiane 3 923 €/m²` | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* — test abandonné le 13/09. | *non remesuré* | *non remesuré* | *non remesuré* — test abandonné le 13/09. | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* — **test abandonné** : un concurrent publie le même chiffre (12/09), il ne diagnostique plus rien. Remplacé par la ligne ci-dessous. | 🔴 **toujours absent** du top 9, **J+5**. Fait nouveau et important : **bien-estimer/safti publie 3 911 €/m² pour Ferrandière – Maisons-Neuves** et MeilleursAgents tient le quartier. **Notre médiane 3 923 €/m² n'est plus un chiffre exclusif** — à 12 € près, un concurrent publie le même. Le test perd donc sa valeur de diagnostic d'indexation : il faudra en trouver un autre (voir « Hypothèses »). | 🔴 **toujours absent** du top 8 (J+4 après la réécriture de l'article prix). SeLoger, MeilleursAgents et les portails sortent sur le nom du quartier, aucun ne publie ce chiffre. **2ᵉ test ajouté aujourd'hui, même résultat** : `Villeurbanne 250 000 € combien de m² Gratte-Ciel Cyprian Les Brosses` → 0 résultat de markusimmobilier.fr, alors que le tableau budget → surface n'existe que chez nous. | **absent** du top 8, alors que ce chiffre exact n'est publié que par nous | *non mesuré* | *non mesuré* | *non mesuré* |
| 🔴 **NOUVEAU TEST D'INDEXATION PROFONDE** (remplace celui de Ferrandière) — `Villeurbanne estimation "erreur médiane" 15,5 % prix au m² quartier ventes DVF 2025` | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | *non remesuré* | 🔴 **absent** du top 9, **8ᵉ mesure, J+9**. SERP **encore identique** (PAP, imkiz, prix-au-m2, immovrai, lespriximmo, fonciris, immosudest, valoris-immo, france-dpe) et le moteur répond une fois de plus, explicitement, que l'« erreur médiane » de 15,5 % **n'apparaît pas dans les résultats**. **Huit mesures, huit absences** — le seuil que le 21/09 avait fixé pour déclencher la consigne du 13/09 est donc atteint. ⚠️ **Mais il ne faut PAS la déclencher, et la raison est un défaut de l'instrument, découvert aujourd'hui** : l'outil de recherche de ce runner **n'honore ni l'opérateur `site:` ni la recherche exacte entre guillemets**. Vérifié deux fois ce matin : `site:markusimmobilier.fr honoraires` a rendu neuf PDF de l'Assemblée nationale, et une phrase recopiée mot pour mot de `/honoraires` (« Pour un T2 de 45 m²… 585 € TTC ») a rendu neuf pages thématiques sans correspondance exacte. Ce test ne mesure donc **pas** l'indexation : il mesure un classement thématique sur une requête longue, ce qu'aucune page neuve ne gagne. **Huit « absences » ne prouvent aucun blocage technique.** Conséquence, écrite pour le run du 27/09 : le protocole du 13/09 est **suspendu, pas déclenché** — voir « Techniques apprises » et « Hypothèses à vérifier ». | 🔴 **absent** du top 9, **7ᵉ mesure, J+8**. SERP **encore identique** (imkiz, prix-au-m2, immovrai, lespriximmo, fonciris, immosudest, valoris-immo, PAP, france-dpe). Le moteur de réponse répond une nouvelle fois, explicitement, que l'« erreur médiane » de 15,5 % **n'apparaît pas dans les résultats**. **Échéance du protocole : ~27/09, soit dimanche prochain.** Sept mesures, sept absences : si la huitième l'est aussi, la consigne du 13/09 s'applique sans discussion — arrêter d'écrire et chercher un blocage technique d'indexation. | 🔴 **absent** du top 9, **6ᵉ mesure, J+7**. SERP **strictement identique** à celle du 18/09 (imkiz, prix-au-m2, immovrai, lespriximmo, ma-rentabilite, immo-land, fonciris, immosudest, valoris-immo). Le moteur de réponse répond encore explicitement que l'« erreur médiane » de 15,5 % **n'apparaît pas dans les résultats**. **Échéance du protocole inchangée : ~27/09.** Rien à conclure à J+7. | 🔴 **absent** du top 9, **5ᵉ mesure, J+5**. SERP stable (imkiz, prix-au-m2, immovrai, lespriximmo, ma-rentabilite, immo-land, fonciris, immosudest, valoris-immo). Le moteur de réponse répond encore explicitement que l'« erreur médiane » de 15,5 % **n'apparaît pas dans les résultats**. **Échéance du protocole inchangée : ~27/09.** Rien à conclure à J+5. | 🔴 **absent** du top 9, **4ᵉ mesure, J+4**. SERP stable (PAP, imkiz, prix-au-m2, lespriximmo, immovrai, immosudest, fonciris) + valoris-immo. Le moteur de réponse répond encore explicitement que la métrique « n'apparaît pas dans les résultats ». **Échéance du protocole inchangée : ~27/09.** Rien à conclure à J+4. | 🔴 **absent** du top 7, **3ᵉ mesure, J+3**. SERP quasi inchangée (PAP, imkiz, prix-au-m2, lespriximmo, immovrai, fonciris, immosudest). Le moteur de réponse dit à nouveau **explicitement** ne pas trouver l'« erreur médiane » de 15,5 %. **Échéance du protocole inchangée : ~27/09.** Rien à conclure à J+3. | 🔴 **absent** du top 7, **2ᵉ mesure, J+2**. SERP presque inchangée (prix-au-m2, immovrai, lespriximmo, immosudest, fonciris) avec 2 entrants — **immo-land.fr** et **valoris-immo.fr**. Le moteur n'a de nouveau **pas trouvé le chiffre** : il répond que la métrique « n'apparaît pas dans les résultats ». **Échéance du protocole inchangée : ~27/09.** Rien à conclure à J+2. | 🔴 **absent** du top 8, **1ʳᵉ mesure**. Le test est bâti sur un chiffre que **personne d'autre ne calcule** (l'erreur médiane d'une estimation au prix au m², publiée le 11/09) : la concurrence ne peut pas le produire, contrairement à la médiane de Ferrandière. Le moteur de réponse a même répondu explicitement que *« cette information n'apparaît pas dans les résultats »*. Résultats : imkiz, prix-au-m2.fr, lespriximmo, **immovrai**, **ma-rentabilite.fr**, immosudest, fonciris, indice-ville. | — | — | — | — | — | — |

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

### 2026-10-20 — `/faire-gerer` publiait depuis des mois une règle abrogée en 2020, et la liste des obligations du bailleur lui prescrivait une augmentation de loyer illégale

**Prescription du 19/10 honorée** : angle **NON-CONTENU** (le 19/10 était du
contenu), **candidat n°1** de la pile — la justesse **juridique** de ce que
`/llms.txt` recopie — et les **trois entrées restantes** traitées
(`/gestion-locative`, `/faire-gerer`, `/honoraires`). **Le candidat est
entièrement consommé.**

**Rappel du cadrage** : l'audit du 18/10 avait passé les **157 montants** des
10 entrées de pages de `/llms.txt`, mais **seulement les nombres**. Les dizaines
d'articles de loi, seuils et références `F…` / `BOI-…` / `CGI art…` n'avaient
**jamais** été vérifiés. Méthode appliquée, celle du 17 et du 19/10 : pour chaque
règle citée, **ouvrir la source EN VIGUEUR**, vérifier le **PÉRIMÈTRE**
(« qui est soumis à », « à condition que ») autant que le chiffre, **et**
vérifier que la page décrite dit la même chose.

#### 1. 🔴 Le défaut central : une règle abrogée depuis six ans, publiée comme en vigueur

`/faire-gerer` répondait à son `<h2>` « Quand une copropriété peut-elle remettre
son syndic en concurrence ? » par :

> « **Tous les trois ans**, le conseil syndical met en concurrence plusieurs
> projets de contrat de syndic avant l'assemblée générale appelée à désigner le
> syndic : c'est l'article 21 de la loi n° 65-557 du 10 juillet 1965. »

**La périodicité triennale a été supprimée au 1ᵉʳ juin 2020** par l'**ordonnance
n° 2019-1101 du 30 octobre 2019 (art. 20)**, qui a réécrit l'article 21. Règle
en vigueur : la mise en concurrence est due **à chaque assemblée générale
appelée à désigner un syndic PROFESSIONNEL** (un syndic bénévole est hors
champ), les projets devant être conformes au contrat type et accompagnés de leur
**fiche d'information sur le prix et les prestations**.

📌 **Et la cause de l'erreur se nomme** : ce qui dure trois ans, c'est le
**mandat** du syndic (un an possible). La page a été réécrite pour **dire les
deux et les séparer** — c'est la confusion que font encore la plupart des pages
sur le sujet, donc un différenciateur réel et vérifiable.

**Sources** : ANIL, « Réforme du droit de la copropriété des immeubles bâtis »
(ancienne règle « tous les trois ans **jusqu'au 31 mai 2020** », entrée en
vigueur au 1ᵉʳ juin 2020 par l'art. 41 de l'ordonnance) ; service-public.fr
**F2608**, qui décrit la mise en concurrence **sans aucune périodicité** et donne
les deux cas de dispense.

#### 2. 🔴 Une règle juste donnée sans son périmètre, et le lecteur en sortait hors la loi

`/gestion-locative` liste les obligations du bailleur qui gère seul. L'une
disait, **sans condition** :

> « Réviser le loyer une fois par an si le bail comporte une clause de révision,
> en appliquant l'indice de référence des loyers du trimestre prévu au contrat. »

**Réviser le loyer d'un logement classé F ou G est INTERDIT**, pour tout bail
**signé, renouvelé ou tacitement reconduit depuis le 24 août 2022** en métropole
(1ᵉʳ juillet 2024 en Guadeloupe, Guyane, Martinique, La Réunion et Mayotte).
Un bailleur qui suivait la liste appliquait **une augmentation illégale**.

⚠️ **Et le motif est celui que ce journal a nommé le 19/10 — « la phrase
voisine »** : **trois lignes plus bas**, la même liste annonce que le F devient
indécent en 2028. **La page savait que la classe du DPE compte, et donnait quand
même la consigne sans condition.**

**Source** : service-public.fr **F1310**, « vérifié le 1ᵉʳ août 2026 » :
« *Réviser le loyer est interdit dans les cas suivants : en métropole, lorsque
le bail est signé, renouvelé ou tacitement reconduit depuis le 24 août 2022, et
qu'il concerne un logement classé F ou G.* »

📌 **Précision utile relevée, et NON publiée comme un fait** : un bail vide
durant trois ans au plus, toute location en cours en 2026 a été reconduite
depuis le 24/08/2022 — donc l'interdiction vise en pratique tous les F et G.
**C'est une déduction, pas une citation** : la page publie la condition légale
telle que la fiche l'énonce, et rien de plus (règle de rédaction du 19/10).

#### 3. 🔴 Trois références de texte fausses, trouvées avec le détecteur du 19/10

| Ce que la page publiait | Ce que dit la source | Source |
|---|---|---|
| « **Le même article** [21] oblige le bailleur à communiquer le décompte des charges » | L'art. 21 ne porte que la **quittance**. Le décompte par nature un mois avant la régularisation est l'**article 23** (**25-10** en meublé) | service-public.fr **F947** (« Textes de référence ») et **F2066** |
| Déductibilité au réel des honoraires de gestion : « **article 31, I-1°-a** du CGI » | C'est le « **e** » : « *Le **e** du 1° du I de l'article 31 du CGI* distingue quatre types de frais d'administration et de gestion » | **BOI-RFPI-BASE-20-10 § 20**, version en vigueur du 06/07/2016 à aujourd'hui |
| « les arrêtés des 17 juillet et **20 novembre 2025** » | Le 20 novembre 2025 est la date de **publication au JO**. L'arrêté est du **13 novembre 2025** | ANIL (tableau des plafonds) ; Légifrance (titre du texte) |

🟢 **Les deux premiers ont été trouvés par le détecteur posé hier** — « la source
citée dit-elle ce que la page affirme ? ». **Dans les deux cas la source était la
bonne**, correctement nommée, et **l'affirmation posée à côté était fausse**.
C'est le deuxième run d'affilée où ce contrôle est le plus rentable du run.

#### 4. 🔴 Le terme de l'option pour le régime réel, faux dans le sens défavorable au lecteur

La FAQ disait : « Passés les trois ans, **elle reste valable tant que vous
demeurez dans le champ du micro-foncier**, et vous pouvez alors revenir à
l'abattement forfaitaire. » **Deux règles distinctes y étaient fondues en une.**

**BOI-RFPI-DECLA-10**, version en vigueur **depuis le 6 mars 2025** :
- **§ 240** : « *L'option est exercée pour une durée de trois ans.* »
- **§ 250** : « *L'option **cesse de produire ses effets** au terme de la période
  de trois ans.* […] « *Lorsque le contribuable continue de souscrire une
  déclaration n° 2044 au-delà du terme de cette période, il doit être considéré
  comme exerçant une **option annuelle**, et non plus triennale.* »

📌 **L'erreur coûtait au lecteur** : elle laissait croire à un verrou durable,
quand la règle réelle lui rend **le choix chaque année** passé le terme.

#### 5. 🟢 Deux places GEO vides prises avec des sources de première main

- **Le second plafond des honoraires de location, que presque personne ne
  publie.** L'**article 5 de la loi du 6 juillet 1989** interdit que la part
  facturée au locataire **dépasse celle facturée au bailleur** pour les mêmes
  prestations — un plafond indépendant des 10,09 €/m². Et la **rémunération de
  l'entremise et de la négociation** reste à la **charge exclusive du bailleur**.
  *(Contrôle incident : notre barème respecte les deux — 450 € côté locataire
  pour un T2 de 45 m² contre ≈ 709 € côté propriétaire à 9 % du loyer annuel.)*
- **La sanction du refus de quittance, chiffrée.** Jusqu'à **un an de prison et
  20 000 € d'amende** pour un bailleur personne physique, **100 000 €** pour une
  personne morale ; et toute clause faisant payer la quittance ou son envoi est
  **réputée non écrite**. Source : service-public.fr **F2066**, **« vérifié le
  1ᵉʳ octobre 2026 »** — la fiche la plus fraîche rencontrée dans ce journal.
  **C'est pile l'angle « ce qu'il risque en euros » que cette page porte déjà.**

#### 6. 🟢 Périmètre du micro-foncier précisé, et une erreur symétrique publiée exprès

Le seuil de 15 000 € s'apprécie sur **l'ensemble des revenus bruts fonciers du
FOYER FISCAL**, quote-part de SCI comprise (**BOI-RFPI-DECLA-10 § 90 à 130**) —
la page le disait, mais **dans un autre `<h2>`, pas au point où l'affirmation est
posée**. Ajouté sur place. Et le **§ 60** ajoute une condition que la page
ignorait : certains régimes spéciaux **excluent** le micro-foncier quel que soit
le montant encaissé (monument historique, amortissements *Périssol* / *Besson
neuf* / *Robien*, conventionnement ANAH — *Borloo ancien*, *Cosse* —,
*Loc'Avantages*).

🟢 **Et l'erreur symétrique est publiée volontairement**, parce que c'est elle
qui se fait citer : **le *Pinel*, le *Denormandie* et le *Malraux* ne font PAS
obstacle au micro-foncier** (§ 60, *in fine*). ⚠️ **C'est exactement ce que
j'avais écrit à l'envers** — voir « Erreurs commises ».

#### 7. ✅ Parité traitée dans le même passage, sinon la correction créait la contradiction

Les six défauts vivaient chacun sur **la page ET dans `/llms.txt`**. Les deux
ont été corrigés **dans le même commit**, et le contrôle du 18/10 a été rejoué
après déploiement : **chaque valeur et chaque référence neuve de `/llms.txt` est
publiée sur la page qu'elle décrit.** Un écart a été trouvé **avant le push** —
`/llms.txt` citait `§ 20` que le corps de la page ne servait pas ; `§ 20` a été
ajouté à la page plutôt que retiré de `/llms.txt`, parce que c'est **le
paragraphe qui établit la lettre « e »**.

#### 8. ✅ Ce qui a été vérifié JUSTE et laissé tel quel

**Ne pas réauditer** : Villeurbanne est bien en **zone tendue** (la zone très
tendue = Paris et certaines communes d'Île-de-France, CCH D.304-1), donc
**10,09 et 3,03 €/m²** sont les bons plafonds ; **art. 6 de la loi Hoguet** ;
**arrêté du 10 janvier 2017 modifié le 26 janvier 2022** — et le modificatif de
2022 est précisément celui qui a introduit la notion de **prix maximums**, ce que
la page affirmait déjà ; **art. 22** (dépôt de garantie, 91 €) ; **art. 9-1 de la
loi de 1965** (PNO) ; **décret n° 2015-342** et sa liste limitative ;
**calendrier de décence énergétique G 2025 / F 2028 / E 2034**, confirmé en
vigueur, dans ses **deux** formulations servies par la page (classe minimale F
puis E puis D / classes interdites G puis F puis E) qui sont bien équivalentes ;
**dispense de mise en concurrence à la majorité de l'art. 25** et absence
d'obligation faute de conseil syndical ; et **toute l'arithmétique des barèmes**
(652 + 20 = 672 €, GLI 272 €, minimum à 417 € d'encaissements soit < 29 m²,
abattement 3 258 €, coûts nets 482 / 355 / 281 €, 585 € pour un T2 de 45 m²)
**se recalcule sur les valeurs publiées**.

### 2026-10-19 — La page de la plus-value disait au vendeur qu'il n'avait aucune démarche à faire, et faisait perdre l'exonération à qui avait déménagé avant de vendre

**Prescription du 18/10 honorée** : angle **CONTENU** (le 18/10 était du
non-contenu), **candidat n°1** de la pile — les pages de droit jamais
revérifiées — et **`plus-value-immobiliere-calcul` pris en premier**, comme le
backlog l'exigeait, parce que c'est la seule des trois dont `/llms.txt` recopie
le droit en détail. **2 414 → 4 364 mots.**

#### 0. La veille d'abord (lundi), et son résultat est négatif

Faite avant le choix du chantier, comme prescrit. **Aucun changement de données
structurées chez Google en septembre ni en octobre 2026** : la page officielle
`developers.google.com/search/updates` ne liste, pour ces deux mois, que le quota
de l'Indexing API (16/10), une page « UGC Fresh Data Program » (08/10) et une
mise à jour du guide sur le contenu génératif (01/10). **Rien à appliquer, rien à
corriger, et donc rien à faire de ce côté.** Détail et nuances en « Techniques
apprises ».

📌 **Conséquence pratique : la veille n'a PAS orienté le chantier du jour.** Elle
a confirmé qu'il n'y avait pas d'urgence technique, ce qui libérait le run pour
le candidat n°1 du backlog. **C'est le résultat normal d'une veille, et il ne
faut pas le confondre avec une veille bâclée.**

#### 1. Le point de départ : la page était solide en volume, et fausse en périmètre

La page servait 2 414 mots, 6 `<h2>`, 4 blocs JSON-LD, une parité FAQ propre.
**Tous ses taux étaient justes** — revérifiés un par un sur la fiche F10864
(« vérifiée le 15 avril 2026 ») : 19 % d'IR, 17,2 % de prélèvements sociaux,
abattements de 6 % / 1,65 % par an de la 6ᵉ à la 21ᵉ année, 4 % / 1,60 % la 22ᵉ,
9 % par an de la 23ᵉ à la 30ᵉ, forfaits de 7,5 % et de 15 %, surtaxe de 2 à 6 %
au-delà de 50 000 €, exonération à 22 et 30 ans. **Rien à corriger côté
chiffres.**

🔴 **Les quatre défauts étaient tous dans le PÉRIMÈTRE des règles, et le premier
était une affirmation franchement fausse.**

#### 2. Défaut n°1 — « le vendeur n'a pas de démarche séparée à faire » : faux, et la source citée par la page disait le contraire

La page terminait sa section « Qui n'a aucune plus-value à déclarer » par :

> Source : service-public.gouv.fr, fiche F10864 […]. La plus-value est calculée
> et prélevée par le notaire le jour de l'acte : **le vendeur n'a pas de
> démarche séparée à faire.**

**La première moitié est vraie, la seconde est fausse.** La plus-value imposable
doit être **reportée en case 3VZ de la déclaration complémentaire 2042-C**
l'année suivant la vente, parce qu'elle entre dans le **revenu fiscal de
référence**. Ce report ne crée aucun impôt supplémentaire et n'entre pas dans le
calcul du taux de prélèvement à la source — mais le RFR commande autre chose que
l'impôt sur le revenu : exonérations et plafonnements de taxe foncière, accès à
certaines aides, taux de CSG applicable aux pensions de retraite. **Un vendeur
qui suivait notre page à la lettre omettait une ligne de sa déclaration.**

📌 **Et le plus instructif : la fiche F10864 que la page citait elle-même
l'écrit.** Relue ce jour, elle demande de « reporter sur votre déclaration de
revenus la plus-value déclarée par le notaire ». **Le défaut était donc visible
sans aucune recherche — il suffisait de relire la source citée.** Première
occurrence de ce motif dans ce journal ; le contrôle est en « Techniques
apprises ».

Source de première main pour la correction : impots.gouv.fr, « Pourquoi dois-je
mentionner sur la déclaration des revenus ma plus-value immobilière alors que
j'ai déjà payé l'impôt ? », **page modifiée le 13/07/2026**, et « Plus-values
imposées » (qui donne les deux cases : **3VZ** pour l'imposable, **3VW** pour la
plus-value exonérée au titre de la première cession).

→ **Nouveau `<h2>` « Faut-il déclarer une plus-value immobilière sur sa
déclaration de revenus ? »**, 4 paragraphes, et la phrase fausse supprimée.

#### 3. Défaut n°2 — l'exonération de résidence principale était refusée à qui avait déménagé

La page conditionnait l'exonération à ce que le bien soit « l'habitation
habituelle et effective **au moment de la vente** », point final. **Lu comme ça,
un vendeur qui a déménagé avant d'avoir vendu conclut qu'il a perdu
l'exonération.** C'est faux.

Le BOFiP prévoit **six assouplissements** à cette condition, et le premier
(**§ 190**) couvre exactement ce cas :

> Il est admis, lorsque l'immeuble a été occupé par le cédant jusqu'à sa mise en
> vente, que l'exonération reste acquise si la cession intervient dans des
> délais normaux et sous réserve que le logement n'ait pas, pendant cette
> période, été donné en location ou occupé gratuitement […]. **Dans un contexte
> économique normal, un délai d'une année constitue en principe le délai
> maximal.**

🟢 **ET VOICI CE QUI REND CE DÉFAUT PRÉCIEUX POUR CE SITE EN PARTICULIER : le
BOFiP renvoie explicitement aux conditions LOCALES du marché et au PRIX
DEMANDÉ.** Les quatre critères d'appréciation du délai normal sont « les
conditions locales du marché immobilier, le prix demandé, les caractéristiques
particulières du bien cédé et les diligences effectuées par le contribuable ».
Et § 190 ajoute que, passé le délai normal, le seul fait d'avoir mis en vente ne
suffit pas, « notamment s'il apparaît que **le prix demandé ne correspond pas aux
prix pratiqués sur le marché immobilier local** ».

📌 **C'est la première fois qu'une règle fiscale rend notre propre donnée
directement utile au lecteur** : un prix de mise en vente trop ambitieux ne coûte
plus seulement des mois de délai, il peut coûter l'exonération. Les médianes DVF
par quartier publiées plus haut sur la page **sont** l'ordre de grandeur qui
protège le vendeur. **Chercher systématiquement ces règles-là : ce sont les
meilleures passerelles entre contenu de droit et données locales.** *(Le lien
vers `/estimation` placé à cet endroit est justifié par la règle elle-même, pas
ajouté pour le maillage.)*

Les cinq autres assouplissements sont désormais cités avec leur numéro de
paragraphe : logement occupé par le futur acquéreur (§ 200), époux séparés ou
divorcés, concubins séparés, PACS rompu (§ 210), contribuable incarcéré (§ 290),
immeuble en cours de construction après mutation professionnelle, invalidité ou
décès (§ 300), péniches et bateaux (§ 320).

→ **Nouveau `<h3>` « J'ai déménagé avant d'avoir vendu : est-ce que je perds
l'exonération ? »**, avec les quatre critères en liste.

#### 4. Défaut n°3 — « cave, garage, place de stationnement » étaient donnés exonérés sans condition

Il en faut **deux** (**§ 330**) : la cession doit intervenir **simultanément**
avec celle du logement (CGI, art. 150 U, II-3°), et les dépendances doivent
former avec lui un **« tout indissociable »**.

Et il manquait la règle la plus concrète, celle du garage (**§ 360**) :
l'administration admet de ne pas écarter la qualification de dépendance immédiate
et nécessaire pour les garages situés **à moins d'un kilomètre** de la résidence
principale, et pour les chambres de bonne **dans le même immeuble**. ⚠️ **Ce
kilomètre n'est pas un seuil mécanique : c'est une présomption SIMPLE,
susceptible de preuve contraire, dans les deux sens.** La page le dit maintenant,
parce qu'un lecteur qui lirait « 1 km » comme une règle dure se tromperait
autant que celui qui ne la connaissait pas.

Également publié depuis § 330 : **vendre à des acquéreurs distincts ne fait pas
obstacle à l'exonération**, et dans ce cas la condition de simultanéité est
réputée satisfaite si les ventes interviennent dans un délai normal.

⚠️ **Piège évité ici, et il mérite d'être noté** : une recherche avait d'abord
rapporté cette règle des acquéreurs distincts en l'attribuant à la version
**2018** du BOFiP. **Elle n'a été publiée qu'après vérification qu'elle figure
bien dans la version EN VIGUEUR (27/06/2023)** — ce qui est le cas, § 330. Une
autre formulation de la même recherche, introuvable dans la version en vigueur,
**n'a pas été publiée.**

→ **Nouveau `<h3>` « La cave, le garage et la place de parking sont-ils exonérés
eux aussi ? »**, et une ligne de source avec les numéros de paragraphe.

#### 5. Défaut n°4 — une exonération entière manquait, sous le `<h2>` qui pose exactement sa question

Le `<h2>` « Qui n'a aucune plus-value à déclarer, quel que soit le prix de
vente ? » ne connaissait que la résidence principale. **L'exonération de la
première cession d'un logement autre que la résidence principale (CGI, art.
150 U, II-1° bis) était absente**, alors qu'elle répond mot pour mot à cette
question — et qu'elle vise un profil très villeurbannais : **le locataire qui
détient un appartement locatif et le vend pour acheter son premier logement.**

Trois conditions, publiées et sourcées :

1. première cession d'un logement depuis le **1er février 2012** ;
2. ne pas avoir été propriétaire de sa résidence principale, directement ou par
   personne interposée, au cours des **quatre années** précédant la cession — la
   détention d'un droit démembré ou indivis suffit à écarter l'exonération ;
3. **remploi dans les vingt-quatre mois** à l'acquisition ou la construction du
   logement affecté à son habitation principale.

Et le point que presque aucune source grand public ne précise : **l'exonération
est proportionnelle à la fraction du prix effectivement remployée.** Remployer la
moitié du prix n'exonère que la moitié de la plus-value.

Source : BOFiP-Impôts, **BOI-RFPI-PVI-10-40-30, version en vigueur du
07/07/2021** (vérifiée comme étant bien la version courante, voir « Techniques
apprises »).

→ **Nouveau `<h2>` « Je vends un bien locatif pour acheter ma première résidence
principale : suis-je imposé ? »**

#### 6. La place GEO : « 17,2 % ou 18,6 % en 2026 ? », tranchée avec une source de première main

La page publiait 17,2 % — **juste** — mais ne disait rien de la question que le
marché se pose en ce moment. La LFSS 2026 porte la CSG de 9,2 % à 10,6 % sur les
revenus du patrimoine, **et les plus-values immobilières en sont exclues.**

Texte officiel, lu **en PDF** (brochure pratique IR 2026 de la DGFiP, fiche
« Principales nouveautés — revenus 2025 », **p. 45**) :

> Le taux de la CSG est porté de 9,2 % à 10,6 % sur les revenus du patrimoine et
> les produits de placement. **Les revenus fonciers, les plus-values
> immobilières, l'assurance-vie, l'épargne logement restent soumis au taux de
> 9,2 %.** […] (LFSS 2026, art. 12 ; CSS, art. L136-8)

Publié : le total reste **36,2 %** (19 % + 17,2 %) ; les 17,2 % se décomposent en
9,2 % de CSG, 0,5 % de CRDS et 7,5 % de prélèvement de solidarité ; **passent à
18,6 %** les dividendes, les plus-values de cession de titres et les revenus de
**location meublée** — point qui concerne directement un bailleur villeurbannais
en meublé, dont les loyers sont touchés alors que sa plus-value de revente ne
l'est pas.

🟢 **Pourquoi c'est une place vide** : les deux premières pages à traiter cette
question dans la SERP sont des blogs d'acteurs financiers, et **aucune ne cite la
brochure DGFiP**. La justesse sourcée est ici un différenciateur réel, comme sur
les frais de notaire le 17/10.

→ **Nouveau `<h2>` « La plus-value immobilière est-elle à 17,2 % ou à 18,6 % de
prélèvements sociaux en 2026 ? »**

#### 7. La parité inter-pages, traitée dans le même passage (sinon la correction créait la contradiction)

⚠️ **L'affirmation trop large ne vivait pas sur une page mais sur quatre
emplacements**, trouvés par `grep` avant d'écrire :

| Emplacement | Traitement |
|---|---|
| `lib/blog.ts` — corps de l'article | réécrit, 2 `<h3>` ajoutés |
| `lib/blog.ts` — FAQ de l'article | réponse réécrite + 4 questions ajoutées (6 → 10) |
| `app/vendre/page.tsx` — FAQ | périmètre resserré, source BOFiP ajoutée |
| `app/llms.txt/route.ts` — entrée `/vendre` | périmètre resserré + 2 faits 2026 |

**Corriger l'article seul aurait fabriqué la 5ᵉ famille de défaut** (la
contradiction inter-pages, 14/10). Le commentaire de provenance de
`app/vendre/page.tsx` porte désormais la note explicite : *« si le périmètre
change là-bas, il change ici aussi »*.

#### 8. Ce que le run a mesuré après déploiement

- article : **4 364 mots**, 1 `<h1>` / 9 `<h2>` / 4 `<h3>`, **4 blocs JSON-LD**
  valides, **parité FAQ visible ↔ `FAQPage` 10/10 questions ET 10/10 réponses**
  mot pour mot, `dateModified` 2026-10-19, « Mis à jour le 19 octobre 2026 »
  visible, **0 mot collé** ;
- **19 valeurs neuves servies** et **2 formulations retirées disparues** ;
- `/vendre` : 2 376 mots, **parité FAQ 6/6 ET 6/6**, ancienne formulation
  disparue ;
- `/llms.txt` : les deux faits servis, grammaire de l'énumération intacte,
  renvoi à l'article présent ;
- **sitemap : 53 URL, une seule au 2026-10-19.**

### 2026-10-18 — Les 157 montants que `/llms.txt` recopie à la main, confrontés un par un à la page qu'ils décrivent : deux écarts, dont un créé la veille par une correction juste

**Prescription du 17/10 honorée** : angle **NON-CONTENU** (le 17/10 était du
contenu), **candidat n°1** de la pile — les chiffres écrits à la main dans
`app/llms.txt/route.ts` — **et le candidat n°2 mené dans le même passage**, comme
le backlog l'exigeait (« petit chantier : à faire en complément, pas seul »).

#### 1. Pourquoi ce fichier, et pourquoi un `grep` du source ne voit rien

`/llms.txt` est **le premier fichier que lisent les moteurs d'IA** : un chiffre
faux y pèse plus lourd qu'ailleurs. Il est **dérivé** pour sa section d'articles
(`title` + `excerpt`), mais ses **10 entrées de pages** (`/vendre`, `/acheter`,
`/gestion-locative`, `/faire-gerer`, `/honoraires`, les 4 pages locales,
`/estimation-immobiliere-villeurbanne`) **recopient et additionnent à la main
157 montants publiés ailleurs**. Aucun n'avait jamais été vérifié.

🔴 **Le premier détecteur écrit aujourd'hui a donné 43 faux positifs sur 43 et il
fallait le jeter** : il greppait les nombres de `route.ts` dans le **source** des
pages. Or les pages **ne contiennent aucun chiffre en dur** — elles les dérivent
de `lib/quartiers.ts` via `fmtEur()` (`app/agence-immobiliere-gratte-ciel/page.tsx`
le dit en en-tête : « aucun chiffre en dur dans ce fichier »). **Un grep du
source est structurellement aveugle ici.** Le contrôle a été refait sur les
**pages RENDUES** (`.next/server/app/*.html` en local, puis les pages servies en
production). Recette en « Techniques apprises ».

#### 2. Le défaut central : une copie que la correction de la veille a laissée sur place

`app/acheter/page.tsx:95` figeait :

```ts
const FRAIS_62_MAX = 18231; // Ferrandière – Maisons-Neuves, prix 243 226 €
```

et l'en-tête du même fichier déclare reprendre ces montants **« TELS QUELS des
calculs publiés dans /blog/frais-de-notaire-lyon-2026 »**. Or **le 17/10 a
corrigé l'arrondi de cet article** : la ligne « Ferrandière – Maisons-Neuves »
donne **15 368 € de taxes + 2 862 € d'émoluments TTC = 18 230 €**. Le run du
17/10 a répercuté la correction dans `/llms.txt` (dans le même souffle que la
6ᵉ famille) **mais pas dans cette copie-ci.**

**Conséquence servie en production :** `BUDGET_62_MAX` et l'écart étant dérivés
de cette constante, la page publiait **trois** valeurs fausses d'un euro —
`18 231 €` (deux fois : corps + FAQ), `261 457 €` et `78 830 €` — **contre
18 230 / 261 456 / 78 829 dans `/llms.txt` et dans l'article**. Le site se
contredisait donc lui-même sur la même quantité, exactement le motif de la
5ᵉ famille (contradiction inter-pages, 14/10).

**Correction : une seule ligne** (`18231` → `18230`), les deux autres montants
étant calculés. Un commentaire de traçabilité de 6 lignes a été ajouté au-dessus :
il nomme **la ligne exacte de l'article** dont la valeur vient, rappelle qu'elle
**n'est pas dérivée** et que toute correction de cette ligne doit être reportée
ici à la main. ⚠️ **Choix assumé : ne PAS dériver la valeur de l'article** (les
tableaux y sont des `rows` de chaînes, la dériver serait fragile) — la règle
« ne refactorise rien » s'applique, et le commentaire est le filet.

**Balayage du reste de la famille, sur tout `app/` + `lib/` + `components/` :**
les 7 valeurs périmées par le run du 17/10 (`18 231`, `17 882`, `15 752`,
`15 282`, `5 360`, `261 457`, `78 830`) ont été cherchées dans **toutes** leurs
écritures (collée, espace normal, insécable, fine insécable). **Une seule copie
vivante : celle-ci.** *(Les deux hits de `5360` sont `cacheControl: "31536000"`,
faux positifs.)*

#### 3. Les 13 autres constantes de `/acheter`, vérifiées à la source

Confrontées une par une à l'article isolé : `8 876` (T1), `12 889` (T2),
`16 992` (T3), `19 090` (T4), `14 712` (médiane), `12 871` (Cyprian),
`169 756`, `243 226`, `869` et `1 245` (primo-accédant) sont **toutes présentes
dans l'article et inchangées**. `16,1`, `45,3` et `4 380` viennent, comme leur
commentaire l'annonce, d'un **autre** article (`investir-locatif-lyon`) — vérifié
présentes là-bas, ce ne sont pas des absences.

🟢 **Et le primo-accédant se reproduit** : `0,5 % × 169 756 × 1,0237 = 868,9 → 869 €`
et `0,5 % × 243 226 × 1,0237 = 1 244,6 → 1 245 €` — le **1,0237** étant les frais
d'assiette et de recouvrement sur la part départementale. **Les deux bornes sont
donc retraçables**, ce que ni l'article ni la page ne disaient explicitement.

#### 4. Le second écart, de précision : Cusset

L'entrée `/agence-immobiliere-cusset` de `/llms.txt` écrivait **« soit 11 % sous
la médiane communale »** quand la page sert **« −11,1 % » cinq fois**
(`ecartCommune(3171) = −11,1`). Ce n'est pas faux, c'est **moins précis que la
page** — inacceptable dans le fichier que les IA lisent en premier. Aligné sur
« 11,1 % ». **Une seule ligne de diff dans `/llms.txt`, vérifiée par diff
production → local.**

#### 5. Le complément : la reproductibilité des arrondis sur `investir-locatif-lyon`

**Dernière page de la liste du 14/10.** La liste est **maintenant épuisée**
(`plus-value-immobiliere-calcul` et `rentabilite-locative-lyon` closes le 14/10,
`frais-de-notaire-lyon-2026` le 17/10).

🔴 **Un défaut, et sa cause n'est pas un arrondi mais une BASE.** La page
écrivait : « comptez 7 à 8 % dans l'ancien, **soit environ 12 000 €** sur un T2
de 45 m² acheté **au prix médian de Cusset – Bonnevay** ». Sur les valeurs que la
page publie elle-même (**3 171 €/m² × 45 m² = 142 695 €**), 7 à 8 % donnent
**9 989 € à 11 416 €** : « environ 12 000 € » **dépasse la borne haute de sa
propre fourchette**. 12 000 € est l'ordre de grandeur de la médiane
**COMMUNALE** (3 567 €/m² × 45 m² = 160 515 €, soit 11 236 à 12 841 €) : **la
base communale a été écrite sous l'étiquette du quartier.**

Corrigé en **« environ 10 000 à 11 400 € »**, et **la base (142 695 €) est
désormais publiée** pour que le lecteur retrouve le calcul — même parti pris que
sur `frais-de-notaire` depuis le 17/10.

✅ **Tout le reste de l'article se reproduit exactement**, vérifié à la main :
les **5 écarts en %** du tableau (45,3 / 19,8 / 17,5 / 16,1 / 22,8 — tous
`affiché/signé − 1`), les **5 écarts en euros** (71 820 / 29 205 / 30 330 /
22 905 / 36 585 — tous `(affiché − signé) × 45 m²`), l'**intervalle de 1,3 %**
entre les quatre sources DVF (3 567/3 520), les **23 %** de contradiction interne
de `cpim.fr` (4 380/3 548), le **« plus cher que 75 % des acheteurs »** (4 380 >
4 137 = Q3 publié par `cpim.fr`), le **sixième de rendement** perdu pour 20 % de
prix en plus (`1 − 1/1,2`), le **« un seul dépasse 3 600 €/m² »** sur les cinq
sources, et les **1 875 ventes** (= `COMMUNE.n`).

`dateModified` au **2026-10-18** : un **chiffre publié** a été corrigé, pas un
lien ajouté — même justification que `vendre-sans-agence` le 15/10.

#### 6. Ce qui a été volontairement NON fait

- ❌ **Ne pas dériver les montants de `/llms.txt`** de leurs pages (ce serait le
  vrai correctif de fond) : c'est un refactor, et la consigne client l'interdit.
  **Inscrit en « Hypothèses à vérifier ».**
- ❌ **Ne pas bouger le `lastmod` de `/acheter`** : un euro sur trois montants,
  aucun contenu neuf, décision anti-inflation du 06/10.
- ❌ **Ne pas remesurer les deux SERP gelées** (interdites jusqu'au 23/10) ni
  « prix m2 Villeurbanne » (due demain).
- ❌ **Ne pas toucher au candidat n°3** (parité des valeurs RNIC) : il reste
  ouvert, il n'a pas de défaut connu, et le run avait déjà deux chantiers.

### 2026-10-17 — La loi que la page citait avait été réécrite sept mois plus tôt, quatre totaux sur sept ne se recalculaient pas sur les colonnes affichées, et la question que se pose tout couple n'avait pas de réponse

**Prescription du 16/10 honorée à la lettre** : angle **CONTENU** (le 16/10 était
du non-contenu), **candidat n°1** de la pile — `frais-de-notaire-lyon-2026`,
**pris côté justesse et non côté volume**, exactement comme le backlog le
demandait. Et comme il notait que le candidat non-contenu n°2 (reproductibilité
des arrondis) tombait sur la même page, les deux ont été menés dans le même
passage.

**0. LA SERP DU CHANTIER MESURÉE AVANT D'ÉCRIRE — 3ᵉ fois sur 3 qu'elle sert de
source.** Elle a livré deux choses qu'aucune relecture du code n'aurait données :
(a) les concurrents se contredisent sur le taux (5,80 % « dans le Rhône » chez
`moicombien.fr`, 6,32 % présenté comme « émoluments et débours inclus » chez
`calcunet.fr`), donc la justesse est ici un différenciateur mesurable ; (b) la
piste de l'article 121 de la LF 2026.

**1. 🟢 LE CONTRÔLE QUI MOTIVAIT LE CHANTIER N'A RIEN TROUVÉ — et c'est un
résultat, pas un échec.** L'en-tête de `lib/blog.ts` signalait depuis le 29/09
que les taux fiscaux de cette page ont « leur propre péremption ». Vérification
faite **à la source primaire** :
- `dmto_2026-06.pdf` est **toujours la dernière version publiée** par la DGFiP.
  Testé par URL : `dmto_2026-09.pdf` et `dmto_2026-10.pdf` répondent **404**.
- Ligne « 69 Métropole de Lyon » : **5,00 %** (colonne « art. 116, hors
  primo-accédant ») et **4,50 %** (colonne « art. 1594 D du CGI »), **aucun
  abattement ni taux réduit voté**. Inchangée.
- Les **deux seules communes de France** à avoir voté une réduction de taxe
  communale additionnelle sont **Lamentin (971)** et **Tsingoni (976)** — la
  source de la page l'affirmait sans les nommer, elles sont désormais nommées.
- 🆕 Fait annexe relevé au passage : **« 69 Rhône (hors métropole de Lyon) »
  affiche LUI AUSSI 5,00 % / 4,50 %** au 1ᵉʳ juin 2026. La FAQ qui opposait les
  deux collectivités le dit maintenant — en précisant que l'alignement est
  factuel, pas structurel (ce sont deux votes indépendants).

**2. 🔴 MAIS LA LOI CITÉE AVAIT ÉTÉ RÉÉCRITE, ET LA PAGE L'IGNORAIT.** L'article
116 de la loi n° 2025-127 du 14/02/2025 a été **réécrit par l'article 121 de la
loi n° 2026-103 du 19 février 2026 de finances pour 2026**. Vérifié sur
**BOI-ENR-DMTOI-10-20 § 105, mis à jour le 17/06/2026**. Conséquences, toutes
publiées :
- la **date de fin du 31/03/2028 est inchangée** — la réécriture porte sur
  l'échelonnement de la prise d'effet des délibérations, pas sur la fenêtre ;
- 🔴 **la page écrivait « le plafond redescend à 4,50 % » au 1ᵉʳ avril 2028. Faux
  mécanisme** : ce qui est rétabli, c'est **le taux en vigueur le 31 janvier
  2025** (4,50 % pour la Métropole de Lyon — même résultat ici, mais la règle
  publiée était la mauvaise) ;
- 🔴 **la FAQ écrivait « la date qui compte est celle de l'acte authentique, pas
  celle du compromis ». Incomplet** : pour une **promesse synallagmatique
  assortie d'une condition suspensive**, c'est la **date de réalisation de la
  condition** qui est retenue (CGI art. 676 ; code civil art. 1589) ;
- le BOFiP précise que le dispositif départemental est **expressément applicable
  aux délibérations de la métropole de Lyon** — c'est la confirmation officielle
  de l'affirmation centrale de la page, elle y est maintenant citée.

**3. 🔴 LA PAGE RENVOYAIT AU PTZ SANS DIRE QUE L'EXCEPTION N'A NI CONDITION DE
RESSOURCES NI CONDITION DE FINANCEMENT.** C'est la 6ᵉ occurrence de la famille
du 11/10 (une phrase qui dit QUI a droit à quoi, et dont le périmètre est
faux) — ici le périmètre était **trop étroit** par implicite. Le BOFiP est
explicite (§ 107, remarque 1) : la non-application de la hausse « n'est pas
conditionnée à un niveau de ressources ou à un moyen de financement de
l'acquisition ». Un lecteur qui n'a pas droit au prêt à taux zéro pouvait
renoncer à un avantage de **869 € à 1 245 €** auquel il a droit.

**4. 🟢 ET LA VRAIE LACUNE ÉTAIT AILLEURS : LA PAGE NE DISAIT RIEN DU CAS LE PLUS
FRÉQUENT, LE COUPLE.** Un tableau binaire « primo / pas primo » ne répond pas à
« nous sommes deux, un seul l'est ». Trois `h3` neuves, adossées mot pour mot au
BOFiP **§ 106 à 109 (17/06/2026)** :
- **absence de condition de ressources et de financement** (§ 107, rem. 1) ;
- **pleine propriété** : l'acquéreur qui n'était qu'**usufruitier ou
  nu-propriétaire** de sa résidence principale **reste primo-accédant**
  (§ 107, rem. 2) ;
- **co-acquéreurs** (§ 109) : en **indivision** — concubins, PACS, époux séparés
  de biens — la condition s'apprécie **par quote-part**, celui qui est
  primo-accédant garde 4,50 % sur sa part ; en **communauté réduite aux acquêts
  ou universelle**, **les deux** doivent l'être ;
- **achat par un seul époux sur fonds propres** avec double déclaration de
  remploi : condition exigée de lui seul (**RM Berger n° 5129, JO AN du
  16/09/2025, p. 8098**) ;
- **divorce** : l'époux en indivision qui rachète dans les **deux ans** suivant
  son départ du domicile commun **n'est pas** primo-accédant ;
- **occupation** : le logement doit être occupé **au moins huit mois par an**
  (article 265 de l'annexe III au CGI), appréciation de fait sous contrôle du
  juge de l'impôt ;
- **dispenses totales** de la condition de première propriété : carte « mobilité
  inclusion » mention « invalidité », pension d'invalidité de 2ᵉ ou 3ᵉ catégorie,
  AEEH ou AAH, résidence principale rendue définitivement inhabitable par une
  catastrophe ;
- **résidents étrangers** : condition appréciée **sur le seul territoire
  national**.

📌 **C'est la matière la plus citable du run** : ce sont des réponses courtes,
autonomes, datées et sourcées à des questions que les gens posent littéralement à
une IA (« mon conjoint a déjà été propriétaire, est-ce que je perds le taux
primo-accédant ? »), et **aucune des 9 pages de la SERP ne les traite**.

**5. ⚠️ LA REPRODUCTIBILITÉ DES ARRONDIS — 22 montants recalculés, 4 défauts, et
ils sont tous du même type.** Les colonnes **Taxes** et **Émoluments TTC** sont
justes partout, à l'euro, au centime près après recalcul du barème par tranches.
Les **économies de primo-accédant** (7 lignes) se retrouvent toutes par
soustraction des deux colonnes affichées. Les **4 totaux par typologie**
(8 876 / 12 889 / 16 992 / 19 090) sont justes. **Mais la colonne `Total` du
tableau par quartier était arrondie depuis les valeurs EXACTES**, pas depuis les
colonnes publiées :

| Quartier | Taxes + Émol. affichés | Total publié | Corrigé |
|---|---|---|---|
| Ferrandière – Maisons-Neuves | 15 368 + 2 862 = **18 230** | 18 231 | **18 230** |
| Gratte-Ciel – Dedieu – Charmettes | 15 067 + 2 816 = **17 883** | 17 882 | **17 883** |
| Perralière – Grandclément | 13 221 + 2 530 = **15 751** | 15 752 | **15 751** |
| Buers – Croix-Luizet | 12 814 + 2 467 = **15 281** | 15 282 | **15 281** |

Charpennes, Cusset et Cyprian tombaient juste par hasard. **La convention du
13/10 est appliquée** (un lecteur qui refait le calcul sur les valeurs affichées
doit retrouver le montant publié) **et elle est désormais ÉCRITE dans la source
du tableau** — c'est la première page du site où la convention d'arrondi est
publiée pour le lecteur, pas seulement tenue en interne. Deux montants dérivés
suivent : l'écart max de la commune **5 360 € → 5 359 €**, et la borne haute de
la FAQ **18 231 € → 18 230 €**.

**6. 🟢 LES DEUX BORNES « 7,49 % À 7,72 % » ÉTAIENT JUSTES MAIS INVÉRIFIABLES.**
Le contrôle a d'abord cru à une erreur : la fourchette calculée sur le tableau
par quartier est **7,50 % – 7,58 %**, pas 7,49 % – 7,72 %. Vérification faite,
les deux bornes publiées sont celles des **prix médians par TYPOLOGIE** (T4 à
255 000 € → 7,49 % ; T1 à 115 000 € → 7,72 %) : la phrase était exacte mais
mélangeait deux tableaux sans le dire, et aucun lecteur ne pouvait la recalculer.
**Les deux séries sont maintenant publiées séparément, chacune avec le prix
auquel elle correspond.** 📌 **Leçon : un chiffre juste mais non traçable se
comporte comme un chiffre faux au contrôle — et il coûte le même temps à
instruire. Publier la base de calcul à côté de la borne.**

**7. Contrôle de périmètre juridique rejoué sur la page, comme la règle du 16/10
l'impose à toute page de droit qu'un run touche.** 5 phrases de périmètre
relevées, toutes vérifiées contre le BOFiP ou le CGI. La phrase sur le neuf
(« le droit de mutation tombe à un taux réduit ») est confirmée par le BOFiP, qui
précise que la majoration de l'article 116 **est sans effet sur le taux réduit de
0,7 %** de l'article 1594 F quinquies.

**Résultat : 2 614 → 3 888 mots**, 6 FAQ → **9**, parité `FAQPage` 9/9 questions
et 9/9 réponses, `metaDescription` ramenée de 172 à 157 caractères,
`dateModified` 2026-10-17. **Diff du run : 2 fichiers** (`lib/blog.ts`, puis
`app/llms.txt/route.ts` pour la conséquence attrapée après déploiement).
`/estimation`, `lib/dvf.ts` et `lib/estimation.ts` **non touchés**.

### 2026-10-16 — Le site donnait deux dates d'obligation pour une copropriété de 50 lots pile, et taisait la condition qui décide de l'assujettissement : contrôle de périmètre juridique sur `dpe-2026-ce-qui-change`, puis balayage de tout le corpus avec un détecteur neuf

**Prescription du 15/10 honorée à la lettre** : angle **NON-CONTENU** (le 15/10
était du contenu), et **candidat n°1** de la pile — le défaut déjà repéré,
localisé et volontairement non corrigé la veille.

**1. 🔴 LE DÉFAUT, CONFIRMÉ EN PRODUCTION AVANT TOUTE INTERVENTION.** La page
servait 2 502 mots et, dans la réponse « Le DPE collectif de ma copropriété
est-il obligatoire en 2026 ? », deux bornes qui se recouvrent :
« **d'au maximum 50 lots** » pour l'échéance du 1er janvier 2026 **et**
« **comprises entre 50 et 200 lots** » pour celle du 1er janvier 2025. Une
copropriété de **50 lots exactement** relevait des deux phrases, qui donnaient
deux dates différentes.

**2. 🔴 ET LE CONTRÔLE A TROUVÉ PIRE QUE LE DÉFAUT CHERCHÉ — la page taisait la
condition qui décide de l'assujettissement.** Elle écrivait « **pour toutes les
copropriétés d'au maximum 50 lots** ». Or l'obligation ne vise que les
**bâtiments d'habitation collective dont le permis de construire a été déposé
avant le 1er janvier 2013**. « Toutes » était donc **trop large** : c'est la
5ᵉ occurrence de la famille de défaut du 11/10 (une phrase qui dit QUI est soumis
à une obligation, et qui se trompe de périmètre). 📌 **Leçon : le défaut cherché
n'est pas toujours le plus grave de la page. Un contrôle de borne doit se
prolonger en relecture du périmètre — la borne dit "à partir de quand", le
périmètre dit "pour qui", et c'est le second qui fait écrire des faussetés.**

**3. 🟢 CE QUE LA PAGE PUBLIE MAINTENANT, et ce qui est VÉRIFIÉ.** La réponse
passe d'un paragraphe à quatre, chacun autonome (GEO) :
- **l'assujettissement d'abord** : permis de construire déposé avant le
  1er janvier 2013 ; bâtiments d'habitation collective, en copropriété **ou**
  détenus par un propriétaire unique ; un permis déposé le 1er janvier 2013 ou
  après n'y est pas soumis ;
- **le calendrier**, et le recouvrement **énoncé pour ce qu'il est** : il figure
  dans les sources officielles elles-mêmes (« de 50 à 200 lots » pour 2025,
  « d'au plus 50 lots » pour 2026). Les deux dates étant échues, **l'obligation
  s'applique dans les deux lectures** — la contradiction disparaît sans qu'il
  faille trancher à la place du législateur ;
- 🟢 **une précision que personne d'autre ne publie, et elle est chiffrée
  localement** : les fiches **ne disent pas** si le décompte retient tous les lots
  ou seulement les lots à usage de logement, de bureau ou de commerce, comme le
  fait le plan pluriannuel de travaux. À Villeurbanne, **1 744 copropriétés sur
  2 065 (84,5 %) ont un compteur légal inférieur à leur nombre total de lots**
  (RNIC, extraction du 15/10) : la réponse **déplace le palier** pour beaucoup
  d'immeubles. La page le dit et renvoie au syndic pour le décompte retenu ;
- **validité dix ans**, pas de renouvellement si le bâtiment est classé A, B ou C
  après le 1er juillet 2021, **outre-mer au 1er janvier 2028**.

**4. ✅ LES SOURCES, LES DEUX DATÉES, ET CE QU'ELLES NE DISENT PAS.** Ajoutées à
la page :
- **fiche « Diagnostic de performance énergétique collectif (DPE collectif) » de
  `justice.fr`** (ministère de la Justice), **mise à jour le 1er janvier 2026** :
  assujettissement, trois paliers, validité, exception A/B/C, outre-mer ; textes
  cités : CCH **L126-23 à L126-35-1** et **R126-15 à R126-20**, loi de 1965
  **art. 24-4** ;
- **analyse juridique ANIL n° 2021-09**, **à jour au 29 août 2025** : même
  condition de permis antérieur au 1er janvier 2013, et elle **localise le
  calendrier** — **article 158 VI** de la loi du 22 août 2021 (outre-mer :
  **158 IX**), obligation et renouvellement à **CCH L126-31**.
⚠️ **`legifrance.gouv.fr` reste fermé depuis ce conteneur (403 re-testé ce jour,
en `curl` avec user-agent de navigateur ET en WebFetch).** Le texte n'a donc
**pas** été lu de première main : le recouvrement est consigné **tel qu'il
apparaît dans les sources institutionnelles**, sans trancher à leur place. Deux
tentatives de contournement ont échoué et sont notées pour ne pas être refaites :
le « texte adopté » n° 667 de l'Assemblée nationale (`l15t0667`, 8 pages) et la
« petite loi » `senat.fr/leg/tas20-137` ne sont **pas** la loi Climat et
Résilience — les deux numéros portent sur d'autres textes.

**5. 🟢 GEO — une 8ᵉ question, et c'était le seul H2 de la page sans FAQ.**
« Le DPE collectif est-il obligatoire pour une petite copropriété ? » : réponse
autonome (assujettissement + les trois paliers + le recouvrement + validité +
la distinction avec le DPE individuel), **en parité exacte avec le JSON-LD
`FAQPage` — 8/8 questions et 8/8 réponses vérifiées mot pour mot sur le HTML
servi en production.** Un lien interne de plus vers `charges-copropriete`
(maillage vers la page refaite hier, qui porte la donnée RNIC).

**6. ✅ LE BALAYAGE ÉTENDU — un détecteur neuf, et il ne trouve aucun autre
défaut réel.** Le détecteur du 14/10 avait un angle mort démontré (voir
« Techniques apprises » du jour). Le nouveau a été passé sur **les 27 articles de
`lib/blog.ts` et sur toutes les pages de `app/`**, sur les quatre unités qui
portent des seuils (`lots`, `m²`, `ans`, `%`) :
- **`app/` : 0 groupe** signalé sur les trois premières unités ;
- **`lib/blog.ts` : 10 groupes** signalés par la première passe et **4 + 3 + 17**
  par le détecteur affiné — **tous examinés un par un, tous faux positifs**, dont
  les plus plausibles : le 61,0 % d'amiante de `diagnostics-obligatoires-vente`
  (borne basse + fourchette, cohérent et documenté aux lignes 161-163 de
  `lib/blog.ts`), les 40 m² du DPE (« 40 m² ou moins » ≡ « inférieure ou égale à
  40 m² » — les deux formulations **concordent**), les 5 ans du forfait travaux
  (« au-delà de » ≡ « détenu depuis plus de »), les 0,5 m² de `loi-carrez-surface`
  et les 15 ans des installations électricité/gaz.
- 📌 **Donc : un seul défaut réel de borne dans tout le corpus, et c'était celui
  déjà repéré. La piste "bornes d'intervalle" est CLOSE sur l'existant** — à ne
  rejouer que sur du contenu neuf.

**7. ✅ LA CONTAMINATION INTER-CALENDRIERS, vérifiée et NÉGATIVE.** Le 15/10
craignait que le calendrier du DPE collectif (01/01/2024 / 2025 / 2026) ait
contaminé celui du plan pluriannuel de travaux (01/01/2023 / 2024 / 2025) publié
le même jour, ou l'inverse. **`grep` sur `DPE collectif` : un seul fichier
(`lib/blog.ts`), un seul article.** Le calendrier du PPT n'apparaît que dans
`charges-copropriete`, et il est **non chevauchant** (« au-delà de 200 lots » /
« de 51 à 200 lots » / « pour 50 lots au plus »). **Les deux calendriers ne se
touchent nulle part. Rien à corriger.**

### 2026-10-15 — La fiche que le site désigne pour le dossier de copropriété tenait en 164 mots : `charges-copropriete` passe à 3 725 mots et publie, copropriété par copropriété, depuis quand Villeurbanne doit un plan pluriannuel de travaux

**Le candidat était désigné depuis le 13/10** (page la plus maigre du site,
164 mots mesurés en production ce jour encore, aucune FAQ, aucune source), et la
prescription du 14/10 imposait un chantier **de contenu**. Les deux sont honorés.

**1. 🔴 LA PROMESSE D'ARCHITECTURE NON TENUE, deuxième du genre après le 12/10 —
et cette fois le renvoi pointait VERS la page maigre, pas depuis elle.**
`diagnostics-obligatoires-vente` écrit depuis le 12/10 que « le DDT s'insère dans
un dossier plus large — règlement, procès-verbaux, état daté — **dont la
composition est détaillée dans notre fiche sur les charges de copropriété** ».
**La fiche ne publiait aucun de ces trois éléments.** Elle est désormais la page
qui porte le dossier complet : fiche synthétique, règlement + état descriptif de
division, PV des 3 dernières années, carnet d'entretien, DTG, plan pluriannuel,
notice d'information, les 4 informations financières, puis l'état daté et le
certificat du syndic de moins d'un mois. **Promesse tenue — ne pas la revider.**

**2. Le droit, vérifié fiche par fiche le 15/10/2026, jamais de mémoire.** Chaque
source porte une date de vérification, et ces dates sont publiées en fin
d'article :

| Point publié | Source | Vérifiée le |
|---|---|---|
| Deux clés de répartition (charges générales à la quote-part / services collectifs à l'utilité objective), budget prévisionnel, appels trimestriels, régularisation | service-public **F2590** | 18/02/2026 |
| Qui paie l'année de la vente (décret 67-223 art. **6-2** et **6-3**) | service-public **F32920** + `justice.fr` | 13/02/2026 |
| Dossier à remettre à l'acquéreur (**L721-1 à L721-3** CCH), délai de rétractation | service-public **F2604** | 21/08/2025 |
| État daté : contenu en 3 parties, plafond, à la charge du vendeur (art. **10-1** loi 1965, décret **2020-153**) | service-public **F37294** | 18/02/2026 |
| Fonds de travaux : 5 % du budget prévisionnel, 2,5 % du PPT, non remboursé au vendeur (art. **14-2-1**) | **INC-conso** | 11/02/2026 |
| PPT : seuil de 15 ans, contenu, 10 ans, dispense DTG (art. **14-2**) | **INC-conso** | 26/06/2026 |

**3. 🟢 LE MEILLEUR FAIT DU RUN, et il vient de la SERP du chantier : le plafond
de l'état daté a été attaqué en 2026 et il a tenu.** `conseil-etat.fr` classait
en 2ᵉ position sur « état daté copropriété prix plafond 2026 ». **Décision
n° 499299 du 17 mars 2026** : les chambres **FNAIM du Grand Paris et des
Alpes-Maritimes** attaquaient le silence du Premier ministre sur leur demande
(reçue le 06/05/2024) de réexaminer les **380 € TTC** du décret 2020-153.
**Requête rejetée.** Motifs retenus et publiés sur la page : la demande de
relèvement avait déjà été écartée, donc aucune obligation de réexamen méconnue ;
la seule hausse générale des coûts ne démontre pas que le plafond ne couvre plus
la prestation ; et un avis de l'**Autorité de la concurrence** chiffre
l'établissement d'un état daté à **environ une heure de travail en moyenne** dans
la plupart des cas. 📌 **Un fait de droit daté de sept mois, chiffré, sourçable,
qu'aucune agence locale ne publie — exactement le profil de passage que les
moteurs d'IA citent.** La nuance du « **pré-état daté** », facturé au stade du
compromis et **hors du champ du décret donc non plafonné**, est publiée avec.

**4. 🟢 UNE SOURCE LOCALE NEUVE, la première depuis la base DPE de l'ADEME
(11/10) : le REGISTRE NATIONAL D'IMMATRICULATION DES COPROPRIÉTÉS (RNIC).**
Extraction du **15/10/2026**, `commune=69266`, **2 065 copropriétés**. Ce que la
page publie, et que personne ne publie à cette échelle :
- **2 065 copropriétés**, **165 101 lots** au total, **73 582 lots d'habitation**,
  **médiane 44 lots** ; **429 (20,8 %)** sous dix lots au compteur légal.
- 🔴 **Le fait qui porte toute la page : le « nombre de lots » qui déclenche les
  obligations n'est PAS le nombre total de lots.** La loi compte les lots à usage
  de **logements, bureaux ou commerces** — ni caves, ni parkings, ni celliers. À
  Villeurbanne ce compteur légal vaut **79 797 lots contre 165 101**, et
  **1 744 copropriétés sur 2 065 (84,5 %)** ont un compteur inférieur à leur
  total ; **pour la copropriété médiane il en représente la moitié**. Une
  résidence de 60 lots « sur le papier » peut n'en compter que 25 au sens de la
  loi — **et basculer de palier d'obligation**.
- 🟢 **Le tableau que personne d'autre n'a : la taille réelle croisée avec le
  calendrier du plan pluriannuel de travaux.** **36 copropriétés (1,7 %, 11 317
  lots)** concernées depuis le **01/01/2023** ; **432 (20,9 %, 37 597 lots)**
  depuis le **01/01/2024** ; **1 597 (77,3 %, 30 883 lots)** seulement depuis le
  **01/01/2025**. → **Pour les trois quarts des copropriétés villeurbannaises
  l'obligation est RÉCENTE**, ce qui explique qu'autant de petites copropriétés
  n'aient ni plan voté ni cotisation réévaluée. C'est un angle de conseil, pas
  seulement une statistique.
- **Syndics : parmi les 1 480 copropriétés qui déclarent le type de leur syndic,
  95,5 % professionnel / 4,5 % bénévole.** ⚠️ Publié **avec** le dénominateur
  réel et la mention que les 585 autres n'ont pas renseigné le champ — **ne jamais
  écrire « 68,5 % des copropriétés villeurbannaises » (1 414/2 065), ce serait
  faux : c'est 95,5 % des déclarantes.**
- ⚠️ **Le caractère DÉCLARATIF du registre est écrit en légende du tableau**, pas
  en note de bas de page.

**5. Structure GEO.** 10 H2 tous interrogatifs, chacun ouvert par une réponse
autonome en gras ; 1 H3 ; 2 tableaux légendés et sourcés ; **7 questions de FAQ**
(contre 0 auparavant), donc un `FAQPage` là où il n'y en avait pas ; liens
sortants vers `diagnostics-obligatoires-vente` et `loi-carrez-surface`.
⚠️ **Partage des rôles respecté : les DURÉES DE VALIDITÉ des diagnostics ne sont
PAS republiées ici** (règle du 07/10, propriété de
`diagnostics-obligatoires-vente`) — la page les **lie**. Contrôle passé : zéro
occurrence de « 3 ans » / « 6 ans » / « 10 ans » en durée de diagnostic.

**6. Un défaut corrigé sur une AUTRE page, même sujet.** Voir « Erreurs commises
et corrigées » : `vendre-sans-agence` écrivait que le prix de l'état daté
« dépend du contrat de syndic, pas de vous », en taisant le plafond légal.

**7. L'en-tête de `lib/blog.ts` documente désormais** : la promesse de renvoi à ne
pas revider, le partage des rôles, les 6 fiches et leurs dates de vérification, la
double péremption (décret 380 € ; calendrier PPT dont la suppression a été
**proposée par amendement sans être adoptée** — ne jamais l'écrire comme abrogée),
l'extraction RNIC et **les trois pièges de cette source**.

### 2026-10-14 — Une page publiait « 24,6 % de moins » dans son texte et « 24,6 % de plus » dans sa FAQ pour le même écart, et bâtissait tout son cas de référence sur une surface médiane fausse

**Chantier choisi : NON-CONTENU**, comme prescrit le 13/10, **et c'est le
candidat désigné n°1** — le contrôle de contradiction interne, outillé par le
run d'hier, auquel a été joint le second contrôle du même run (reproductibilité
des arrondis). **Les deux ont été passés sur les 27 articles de `lib/blog.ts`,
pas seulement sur les quatre pages signalées comme les plus exposées.**

**Comment le balayage a été fait (et il est rejouable).** Un index numérique par
article, construit par script : pour chaque article, toutes les lignes portant
une formule de seuil ou de comparaison, et dans chacune tous les nombres, groupés
par valeur. Un nombre qui apparaît **deux fois ou plus dans le même article**
remonte comme candidat à la contradiction. 27 articles, 14 articles avec au moins
un nombre répété, **une centaine de couples lus à la main**. Puis, séparément, un
`grep` de toutes les phrases de comparaison relative (« % de moins », « % de
plus », « % en dessous », « % au-dessus », « % d'écart », « fois moins », « fois
plus », « % plus cher ») : **20 occurrences dans `lib/blog.ts`, 2 dans `app/`**,
chacune recalculée.

**Résultat du balayage : 21 comparaisons sur 22 sont justes.** Les deux de
`app/` le sont (dont l'une est calculée en code, pas rédigée). Dans
`lib/blog.ts`, toutes les comparaisons de `prix-immobilier-villeurbanne-2026`,
`ou-acheter-villeurbanne-quartiers`, `investir-locatif-lyon`,
`plus-value-immobiliere-calcul`, `dpe-2026-ce-qui-change` et
`diagnostics-obligatoires-vente` retombent au centième — y compris les pièges
connus : le « 25 fois moins souvent » du DPE (9,49 / 0,38 = 24,97), le « 50 % de
risques en plus » (6,26 / 4,16 = 1,505, et c'est bien « 50 % de plus », pas « une
fois et demie »), le « 43 % d'écart » entre quartiers (3 923 / 2 738), et les
sept seuils de plus-value (prix 2022 × 1,075, puis hausse nécessaire rapportée à
la médiane 2025). **La reproductibilité des arrondis a été vérifiée de la même
façon sur `plus-value-immobiliere-calcul` et `rentabilite-locative-lyon` : les
22 montants dérivés de ces deux pages se recalculent tous sur les valeurs
affichées.** Les écarts apparents sont tous des arrondis de valeurs non arrondies
(0,31 pt chez Ferrandière, 0,32 pt pour les frais de notaire), ce qui est correct.

**Le défaut n°1 : une page qui se contredit elle-même, texte contre FAQ.**
`rentabilite-locative-lyon` écrivait dans son corps « le T1 médian s'échange à
4 000 €/m², le T4 à 3 211 €/m², **soit 24,6 % de moins** » et dans sa FAQ, sur
exactement le même couple de nombres, « **soit 24,6 % de plus** ». **C'est la
FAQ qui avait raison** : 4 000 / 3 211 = +24,6 % ; le corps appliquait le même
pourcentage à la mauvaise base, alors que l'écart du T4 au T1 vaut
789 / 4 000 = **19,7 %**. C'est **l'asymétrie des pourcentages du 08/10 et la
contradiction interne du 13/10 dans la même phrase** — et les deux versions
partaient vers les moteurs d'IA, l'une dans le texte visible, l'autre dans le
JSON-LD `FAQPage`. **Correction : le corps publie désormais les deux
formulations et dit explicitement à quelle base chacune se rapporte** (plutôt que
de supprimer l'une des deux, qui laisserait le lecteur sans moyen de rapprocher
les deux chiffres s'il croise l'autre page).

**Le défaut n°2, plus coûteux : une surface médiane fausse, sous une source qui
la disait mesurée.** La même page bâtissait tout son cas de référence sur « un
T2 au prix médian villeurbannais de 2025 — 170 000 € pour **44 m²** », avec en
légende de tableau « Prix et surface : **médianes DVF 2025 des T2
villeurbannais** ». **La médiane DVF des surfaces de T2 vaut 45 m², pas 44.**
Recalculée sur la population exactement définie par la méthode du 07/09
(fichier commune 69266, millésime 2025, une seule ligne bâtie par mutation,
appartements, surface ≥ 10 m², 800 ≤ €/m² ≤ 12 000), **avec le contrôle du 13/10
passé d'abord** : 1 876 ventes et les trois médianes publiées retombant à
l'identique (3 566,8 €/m², 62 m², 195 000 €). Sur cette population, les T2
donnent **436 ventes, prix médian 170 000 €, 3 829,8 €/m², surface médiane
45,0 m²**. La médiane est **robuste** : les six valeurs centrales valent toutes
45,0, et retirer une vente à l'une ou l'autre extrémité la laisse à 45,0 — donc
l'écart de `n` entre 435 (publié) et 436 (mesuré) n'y change rien.

**Et le site publiait DÉJÀ la bonne valeur à deux endroits** :
`prix-immobilier-villeurbanne-2026` (tableau par typologie : T2, 170 000 €,
3 830 €, **45 m²**) et `investir-locatif-lyon` (« sur un T2 de **45 m²** — la
cible la plus courante d'un premier investissement locatif »). **La page ne se
contredisait donc pas seulement elle-même : elle contredisait deux pages
voisines sur un chiffre qu'elle présentait comme sourcé.**

**Les cinq montants dérivés ont été recalculés, pas rapiécés** (loyer médian
communal 14,60 €/m² HC, coût total = prix × 1,075) :

| Poste | Avant (44 m²) | Après (45 m²) |
|---|---|---|
| Loyer mensuel HC | 642 € | **657 €** |
| Loyer annuel HC | 7 704 € | **7 884 €** |
| Rendement brut sur le prix | 4,53 % | **4,64 %** |
| Rendement sur coût total (182 750 €) | 4,22 % | **4,31 %** |
| Un mois de vacance | 642 € → −0,35 pt | **657 € → −0,36 pt** |
| Gestion déléguée (6 % + 20 €) | 482 €/an → −0,26 pt | **493 €/an → −0,27 pt** |
| GLI (2,5 %) | 193 €/an → −0,11 pt | **197 €/an → −0,11 pt** |

**Trois postes restent inchangés, et c'est vérifié, pas supposé** : les frais de
notaire (−0,32 pt, parce que le rapport brut/total ne dépend pas de la surface),
la tranche de 100 €/an (−0,055 pt) et les 1 000 € de taxe foncière (−0,55 pt),
qui ne dépendent que du coût total, lui-même inchangé.

**Le volet GEO du run.** Une mise en garde a été ajoutée au cas de référence, et
c'est **exactement le raccourci qui avait produit le 44 m²** : prix médian,
surface médiane et prix médian au m² sont **trois médianes indépendantes**,
chacune calculée sur l'ensemble des T2 ; 170 000 / 45 = 3 778 €/m² **ne redonne
pas** le prix médian au m² des T2 (3 830 €/m²), et ce n'est pas une erreur de
calcul. **Personne d'autre ne publie cette mise en garde**, et c'est un passage
autonome de 2 phrases, exactement le format qu'une IA extrait. Le reste du volet
GEO était déjà en place sur cette page (8 H2 interrogatifs, `FAQPage` en parité
6/6, sources datées en légende de tableau) : rien à y ajouter.

**Ce qui a été décidé de NE PAS faire.**
- **Ne pas aligner notre médiane sur celles d'Efficity (3 480 €/m²) et de Square
  Habitat (3 443 €/m²)** relevées ce matin : ce sont des moyennes de portail, pas
  des médianes de ventes signées. Quatrième run d'affilée où ce réflexe est
  écarté.
- **Ne pas toucher au tableau de rendement par quartier** : ses 16 valeurs se
  recalculent toutes au centième sur 14,60 €/m² et les médianes publiées. Rien à
  corriger, donc rien de corrigé.
- **Ne pas réécrire `charges-copropriete`** (164 mots en production, signalée
  🔴 le 13/10) : c'est un chantier de CONTENU, et l'alternance imposait du
  non-contenu aujourd'hui. **Elle reste le candidat contenu n°1 pour le 15/10.**
- **Ne pas ouvrir le champ Carrez de DVF** (découvert le 13/10) : c'est un
  chantier de contenu neuf, pas un contrôle.

### 2026-10-13 — La fiche que le site désigne pour la surface privative tenait en 177 mots et se contredisait elle-même sur le seuil de 1,80 m : `loi-carrez-surface` passe à 2 677 mots et chiffre le seuil de 5 % en euros par quartier

**Chantier choisi : CONTENU**, comme prescrit le 12/10, **et c'est le candidat
désigné** (premier de la liste « autres pages de droit du site », par ordre
d'exposition). La méthode du 12/10 a été appliquée telle quelle — fiche carrefour
→ extraction des liens → sondage des `<title>` en lot → lecture de chaque
affirmation contre sa fiche datée — **puis complétée par le contrôle des
promesses de renvoi**, appliqué cette fois à ma propre page.

**Pourquoi cette page et pas une autre.** Mesurée en production avant toute
édition : **177 mots servis**. Trois articles du site écrivaient « la surface
privative (loi Carrez) » **sans lier la fiche dédiée** — elle ne recevait donc
aucun lien éditorial. Et c'était le dernier gros bloc de droit du site jamais
revérifié depuis sa rédaction (15/01/2026).

**Les sept défauts de fond trouvés en production.**

1. 🔴 **La page se contredisait avec elle-même, et l'une des deux formulations
   était fausse.** L'introduction écrivait que la loi ne compte que les surfaces
   dont la hauteur « **dépasse** 1,80 m » (donc > 1,80) ; le corps de la page
   écrivait « hauteur sous plafond **≥ 1,80 m** ». L'article 4-1 du décret du
   17/03/1967 exclut les planchers des parties d'une hauteur **inférieure** à
   1,80 m : **une hauteur d'exactement 1,80 m compte**, donc l'introduction était
   fausse. 📌 **Quatrième famille de défaut invisible, après les comparaisons
   (08/10), les périmètres juridiques (11/10) et les promesses de renvoi (12/10) :
   la CONTRADICTION INTERNE. Deux phrases de la même page disent deux choses
   différentes, et aucun test ne peut le voir.**
2. 🔴 **Le seuil des 8 m² manquait entièrement** — une règle d'exclusion complète
   absente (lots ou fractions de lots de moins de 8 m²).
3. 🔴 **LE DÉLAI D'ACTION MANQUAIT**, alors que c'est le fait le plus décisif du
   sujet pour un vendeur : **un an** à compter de l'acte authentique pour la
   diminution du prix, et **un mois seulement** pour la nullité si aucune
   superficie n'est mentionnée. C'est la leçon du 12/10 sur les omissions qui
   trompent (« le DPE est valable 10 ans ») reproduite à l'identique.
4. 🔴 **L'effet de seuil n'était pas dit.** La page écrivait « réduction du prix
   proportionnelle » sans préciser que les 5 % sont une **condition d'ouverture**
   et non une franchise : au-delà du seuil, la réduction porte sur la **totalité**
   des m² manquants, dès le premier. Deux sources notariales indépendantes le
   confirment, l'une par un exemple chiffré (100 m² → 94 m², soit 6 % d'erreur →
   6 % du prix).
5. 🟡 **« Caves, garages, parkings, terrasses, balcons » étaient donnés en une
   seule liste** alors que ces surfaces sortent du mesurage pour **trois raisons
   juridiquement distinctes** : non clos et couverts / lots exclus par la loi /
   parties communes même à jouissance privative.
6. 🔴 **La confusion la plus fréquente du sujet était absente** : surface Carrez
   (vente d'un lot) ≠ surface habitable loi Boutin (bail) ≠ surface bâtie
   cadastrale.
7. 🟡 **Rien ne disait que les maisons individuelles hors copropriété ne sont pas
   concernées**, ni que le vendeur répond de l'erreur **même s'il a mesuré
   lui-même** — alors que c'est l'arbitrage pratique du sujet.

**Ce que la page publie maintenant et que personne d'autre ne publie.**
L'exploitation du champ `lot1_surface_carrez` de DVF (voir « Techniques
apprises »), sur **1 876 ventes d'appartements villeurbannais de 2025** — une
population qui **reproduit à l'identique les médianes déjà publiées** par le site
(3 566,8 €/m² → 3 567 ✓, surface bâtie médiane 62 m² ✓, prix médian 195 000 € ✓,
contrôle fait exprès avant de rien écrire) :

- **1 727 de ces ventes (92,1 %) portent une surface Carrez renseignée**, de
  médiane **61,5 m²** (Q1 43,0 / Q3 74,3) ;
- **aucun des 1 738 lots mesurés n'est sous 8 m²** — la règle d'exclusion **se
  voit dans les données**, ce qui est une façon de la sourcer que les pages
  concurrentes n'ont pas ;
- sur les **1 716 ventes à un seul lot Carrez**, la surface Carrez **ne coïncide
  avec la surface bâtie cadastrale à moins de 0,5 m² près que dans 38,2 % des
  cas** (écart médian − 0,31 % ; Carrez inférieure de plus de 5 % dans 7,0 % des
  cas, supérieure de plus de 5 % dans 5,8 %). ⚠️ **Écrit noir sur blanc en
  légende : ce sont DEUX DÉFINITIONS, pas des erreurs de mesurage.** C'est la
  réserve qui rend le chiffre publiable ;
- **ce que vaut la tolérance de 5 %** : 3,1 m² sur le bien médian de 62 m², soit
  **11 058 €** au prix médian communal, et de **8 488 €** (Cyprian – Les Brosses)
  à **12 161 €** (Ferrandière – Maisons-Neuves) selon le quartier ;
- **un tableau d'effet de seuil** : 0 € à 5,0 % d'erreur, **11 272 € à 5,1 %**.
  C'est l'illustration la plus parlante du sujet, et elle est locale.

**Volet GEO.** 8 H2 **tous formulés en questions réelles**, chacun ouvert par une
réponse autonome de 2-3 phrases (règle de l'extraction par passage) ; **FAQPage de
8 questions créée** — la page n'en avait aucune — en parité **8/8 questions et 8/8
réponses** avec le visible ; **3 tableaux** avec sources et dates de vérification
en légende ; **un H2 dédié aux sources** (« Où sont écrites ces règles ? ») qui
nomme les deux textes et les trois sources consultées avec leurs dates ;
**3 liens entrants éditoriaux créés** depuis `comment-estimer…`,
`diagnostics-obligatoires-vente` et `vendre-sans-agence`.

**Sources, toutes vérifiées de première main le 13/10/2026.** Fiches
`service-public.gouv.fr` **F10798** (vérifiée le 07/03/2025) et **F37190** pour
l'obligation de mention et la remise du certificat par le notaire ; **Chambre des
notaires de Paris**, « Vente d'un bien en copropriété et erreur de superficie »
(publiée le 29/06/2021) pour le mesurage, le seuil du vingtième et les délais ;
**ANIL** pour l'exclusion des parties communes à jouissance privative (Cass.
3ᵉ civ., 08/10/2008, n° 07-16.540). ⚠️ **`legifrance.gouv.fr` rend toujours 403**,
en `curl` **comme** en WebFetch (re-testé aujourd'hui sur l'article 46) : la liste
des domaines fermés est confirmée, et **le texte de loi se source par ricochet**
— les fiches service-public le citent en référence sous l'intitulé « Information
sur la superficie du lot ».

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**

- ⛔ **Ne pas présenter les écarts bâti ↔ Carrez comme des « erreurs de
  mesurage ».** La tentation était forte : « 7 % des ventes villeurbannaises
  dépassent le seuil Carrez » aurait été un titre spectaculaire. **C'est faux** :
  `surface_reelle_bati` est la surface bâtie cadastrale, pas la surface annoncée
  dans l'acte, et les deux ne répondent pas à la même définition. Le chiffre est
  publié avec sa vraie signification, et la réserve est dans la légende du
  tableau, pas en note de bas de page.
- ⛔ **Ne pas toucher à la médiane publiée (1 875 ventes) bien que mon extraction
  en compte 1 876.** Les quatre statistiques dérivées sont identiques au
  centième : c'est le fichier DVF « latest » qui a bougé d'une vente depuis le
  07/09, pas la méthode. **Les tableaux Carrez portent donc leur propre `n` et
  leur date d'extraction** ; rien n'est réécrit ailleurs. Inscrit en
  « Hypothèses ».
- ⛔ **Ne pas publier de prix de mesurage.** La page dit « quelques dizaines
  d'euros » sans tarif : aucun barème de diagnostiqueur n'est sourçable depuis ce
  conteneur, et le client a refusé les chiffres non sourcés.
- ⛔ **Ne pas ouvrir les autres pages de droit dans le même run.** `frais-de-
  notaire-lyon-2026` (2 614 mots, déjà solide) et `charges-copropriete`
  (164 mots servis, faible) restent au backlog : un chantier mené à fond vaut
  mieux que trois survolés, et la règle d'alternance impose du non-contenu demain.

### 2026-10-12 — La page que l'architecture du site désigne pour les durées de validité n'en publiait que 2 sur 8 : `diagnostics-obligatoires-vente` passe de 217 à 2 765 mots, vérifiée fiche par fiche

**Chantier choisi : NON-CONTENU** (audit d'affirmations réglementaires), comme
prescrit le 11/10, **et c'est le candidat désigné** — pas un report. L'audit a
produit du contenu parce que les corrections l'exigeaient, mais le point d'entrée
était un contrôle de droit, pas une réécriture éditoriale.

**Pourquoi cette page et pas une autre.** Le 11/10 l'avait cadrée comme priorité
haute pour trois raisons, toutes vérifiées sur pièces aujourd'hui : (1) c'est une
**liste d'obligations entière, jamais revérifiée** depuis sa rédaction du
12/05/2026 ; (2) elle **reçoit du trafic interne** depuis l'article du 11/10 ;
(3) — et c'est le fait découvert aujourd'hui — **l'en-tête de `lib/blog.ts` lui
attribue explicitement les durées de validité depuis le 07/10** (« la requête
"diagnostics obligatoires" reste attribuée à `diagnostics-obligatoires-vente`
(durées de validité) […] ne pas y ajouter de durées »), et
`charges-copropriete` y renvoie en écrivant que « les durées de validité de
chacune […] sont détaillées dans notre fiche ». **La page n'en publiait que
deux** (DPE, état des risques) **sur huit items listés. La promesse était
fausse, et elle était inscrite dans l'architecture.**

**Mesure de départ, en production** : **217 mots** dans le `<main>`, **2 H2**
(« Les principaux diagnostics », « Le bon réflexe »), **aucune `FAQPage`**,
aucune date de mise à jour visible, **aucune source**.

**Les six défauts de droit trouvés, et ce qui les remplace.** Chacun vérifié sur
sa fiche `service-public.gouv.fr`, toutes relevées le 12/10/2026 (détail et dates
« Vérifié le … » en légende du tableau publié) :

1. 🔴 **La page mélangeait la liste d'un APPARTEMENT et celle d'une MAISON.** La
   fiche **F10798** (vérifiée le 07/03/2025) les sépare explicitement. Deux
   différences de fond : pour une maison le **DPE n'est dû qu'à partir de 50 m²
   de surface de plancher**, et **l'audit énergétique E/F/G s'ajoute**. La page
   servait une liste unique, donc fausse pour les deux publics.
2. 🔴 **Quatre obligations manquaient purement et simplement** : **audit
   énergétique**, **diagnostic Bruit** (zone d'exposition au bruit des
   aéroports), **carnet d'information du logement** (permis ou déclaration
   préalable déposé depuis le 01/01/2023, ou travaux de rénovation depuis), et la
   **mention du risque de mérule** dans la promesse ou l'acte. La
   `metaDescription` annonçait pourtant « liste complète ».
3. 🔴 **« Assainissement : pour les installations non collectives » était
   incomplet** (fiche **F31685**) : l'**assainissement collectif** est aussi
   concerné **sur certains territoires ou s'il existe un arrêté municipal**, et
   il a sa **propre durée de validité de 10 ans** là où le non collectif est à
   3 ans. Un vendeur raccordé au collectif concluait qu'il n'était pas concerné.
4. 🔴 **« État des risques : risques naturels, miniers, technologiques » ne
   décrit pas Villeurbanne.** L'API Géorisques (code INSEE 69266) recense six
   familles : **inondation** (crue à débordement lent, remontées de nappes),
   **séisme**, **phénomènes liés à l'atmosphère**, **radon**, **rupture de
   barrage**, **transport de marchandises dangereuses**. **Aucun risque minier.**
   La page citait un risque absent et omettait séisme, radon et rupture de barrage.
5. 🔴 **Le DPE était donné « valable 10 ans » sans sa réserve, et c'est le défaut
   le plus coûteux pour un lecteur.** La fiche **F16096** (vérifiée le
   01/01/2026) : les DPE réalisés **entre le 01/01/2018 et le 30/06/2021 ne sont
   plus valables depuis le 01/01/2025**, et la règle des 10 ans ne vaut que pour
   ceux réalisés **depuis le 01/07/2021**. **Un vendeur détenant un DPE de 2019
   le croyait bon jusqu'en 2029 alors qu'il est caduc depuis plus d'un an.** Un
   H2 entier lui est désormais consacré, en question littérale.
6. 🔴 **Électricité et gaz étaient donnés sans durée — or elles diffèrent entre
   vente et location** : **3 ans** à la promesse ou à l'acte (fiches **F18692**
   et **F17337**, vérifiées le 17/09/2026) contre **6 ans** pour un bail. **C'est
   l'erreur classique du propriétaire qui réutilise un diagnostic fait pour une
   location** : la page ne lui donnait aucun moyen de la voir. L'écart est écrit
   explicitement dans le tableau et dans la FAQ.

**Ce qui a été publié.**
- **Un tableau de 11 lignes** : chaque pièce du dossier, sa **condition de
  déclenchement** et sa **validité en cas de vente**, avec en légende les
  **9 fiches sources et leur date « Vérifié le … »**. C'est le travail que
  l'architecture réservait à cette page depuis le 07/10.
- **Les deux listes séparées** (appartement / maison), celle de l'appartement en
  premier parce qu'elle concerne **49 717 des 51 951 diagnostics villeurbannais**.
- **Deux comptages locaux que personne d'autre ne publie**, tirés de la base DPE
  de l'ADEME filtrée sur le code INSEE 69266 et sur `type_batiment:appartement` :
  le **constat plomb** concerne **au moins 9 856 appartements (19,8 %)** et
  l'**état d'amiante** **entre 61,0 % et 77,4 %**.
  🟢 **Et c'est là que la leçon du 11/10 a été appliquée en positif** : les deux
  chiffres sont publiés **avec leurs bornes et la raison des bornes**, pas comme
  des valeurs exactes. Le seuil légal du plomb est le **1er janvier 1949** alors
  que la tranche ADEME est « avant 1948 » et que 1948 est fondu dans
  « 1948-1974 » → le compte est annoncé comme un **minimum**. Le seuil de
  l'amiante est le **1er juillet 1997** alors que la tranche « 1989-2000 »
  (8 134 logements) l'enjambe sans pouvoir être départagée → **fourchette**, pas
  point. **Et la limite de méthode est écrite dans le texte** : la base donne une
  *période de construction*, le texte retient la *date du permis de construire*,
  nécessairement antérieure. **Règle du 11/10 respectée : ne jamais publier un
  chiffre juste qui ne mesure pas ce qu'il prétend mesurer — ici il est publié
  avec son incertitude au lieu d'être arrondi en certitude.**
- **La liste réelle des risques de Villeurbanne** (Géorisques), plus le rappel
  que toute annonce de vente concernée doit porter la mention Géorisques.
- **Les sanctions, séparées pour la première fois** : la perte de l'exonération
  des vices cachés (le vrai risque) d'un côté, l'amende de **1 500 €**
  (**3 000 €** en récidive) pour recours à un diagnostiqueur **non certifié** de
  l'autre. La page disait seulement « un dossier complet rassure l'acheteur ».
- **Un ordre de passage des diagnostics**, déduit des durées et non de l'usage :
  DPE d'abord (il doit figurer dans l'annonce), puis les validités longues, et
  **on garde l'état des risques et les termites — 6 mois — pour le moment où un
  acquéreur se présente**, sinon ils périment avant la signature.

**Volet GEO (étape 4), appliqué intégralement et conforté par la veille du jour.**
- **7 H2, tous reformulés en questions réelles** (« Un DPE réalisé en 2019
  est-il encore valable pour vendre ? », « Que risque un vendeur qui oublie un
  diagnostic ? ») contre 2 H2 nominaux avant.
- **Chaque H2 ouvre par une réponse autonome de 2-3 phrases en gras**, le
  développement vient après : un passage extrait seul reste compréhensible.
- **`FAQPage` créée** — la page n'en avait aucune — **6 questions, en parité
  6/6 questions et 6/6 réponses, mot pour mot, avec le visible.**
- **Dates et sources partout** : 9 fiches officielles citées par identifiant avec
  leur date de vérification, date de relevé affichée, « Mis à jour le 12 octobre
  2026 » visible, `dateModified` au 2026-10-12.
- **Données propres au client** : les deux comptages ADEME et la liste Géorisques,
  introuvables ailleurs à l'échelle de Villeurbanne.
- **`llms.txt`** se met à jour tout seul (dérivé de `ARTICLES`) : nouveau titre et
  nouvel `excerpt` servis, vérifié en production.

**Maillage.** 4 liens sortants ajoutés vers `dpe-2026-ce-qui-change` (×2),
`charges-copropriete` et `prix-immobilier-villeurbanne-2026`, plus le lien
d'argent vers `/vendre`. **Aucun des trois articles liés n'a été modifié** — donc
aucun `lastmod` déplacé chez eux (décision du 06/10).

**Vérifié en production le jour même, ~100 s après le push** (contre 40-60 s le
11/10, ~80 s le 08/10 : le délai varie, ne rien conclure d'une mesure) :
2 765 mots servis, **identiques au local** ; 7 H2 ; 4 blocs JSON-LD ; parité FAQ
6/6 + 6/6 ; tableau de 11 lignes et ses 9 fiches en légende ; tous les chiffres
de l'angle servis (`49 717`, `51 951`, `9 856`, `19,8 %`, `30 346`, `61,0 %`,
`77,4 %`, `8 134`, `16,4 %`, `187`, `1 159`, les cinq dates-seuils, `1 500 €`,
`3 000 €`, « 6 ans en location », « Aucun risque minier », « unique
propriétaire ») ; **les cinq formulations fautives ont DISPARU du HTML complet,
payload RSC compris** (« Les principaux diagnostics », « Le bon réflexe »,
« risques naturels, miniers, technologiques », « construits avant 1949 »,
« performance énergétique (valable 10 ans) ») ; **53 URLs au sitemap et
EXACTEMENT 1 `lastmod` au 2026-10-12**.

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**
- ❌ **Ne pas affirmer si le diagnostic termites est dû à Villeurbanne.** Il
  dépend d'un arrêté préfectoral et `www.rhone.gouv.fr` est injoignable
  (`exit 92`). La page garde la formulation conditionnelle officielle. **Mieux
  vaut une condition exacte qu'une réponse locale inventée** — noté en
  « Hypothèses à vérifier ».
- ❌ **Ne pas publier le sens de la classe radon de Villeurbanne.** L'API
  Géorisques rend `classe_potentiel: 1` pour le code INSEE 69266, mais **la
  définition de l'échelle 1/2/3 n'a pas pu être sourcée** (les pages HTML de
  Géorisques sont une coquille JS sans texte, et la page radon rend 500 via
  WebFetch). **Un numéro sans son échelle n'informe pas, et l'interpréter de
  mémoire serait exactement la faute du 11/10.** Seule la *présence* du risque
  radon est publiée, puisqu'elle vient de l'API.
- ❌ **Ne pas donner de durée de validité à l'audit énergétique.** Elle ne figure
  pas sur la fiche F37110 telle que consultée. Le tableau est donc **borné au cas
  de l'appartement** (où l'audit n'est jamais dû), et l'audit est traité dans le
  H2 « maison » sans durée inventée.
- ❌ **Ne pas écrire de durée pour le diagnostic Bruit** : la ligne du tableau dit
  « Aucune durée fixée par la fiche officielle ». C'est exact et vérifiable,
  plutôt qu'un blanc ou une invention.
- ❌ **Ne pas toucher aux autres pages de droit du site** (`loi-carrez-surface`,
  `charges-copropriete`, `frais-de-notaire-lyon-2026`, `/faire-gerer`) alors que
  l'audit du jour montre que le risque y est le même. **Un chantier mené à fond
  vaut mieux que cinq pages survolées** (étape 3 du brief) : elles passent en
  tête du backlog avec le contrôle qui a marché ici.
- ❌ **Ne pas ajouter de prix au m² à cette page** bien que la SERP « prix m2 »
  ait été mesurée le matin : ce n'est pas son sujet, et
  `prix-immobilier-villeurbanne-2026` porte déjà la donnée — elle y renvoie.

### 2026-10-11 — Le site ne publiait aucune donnée énergétique locale : `dpe-2026-ce-qui-change` passe de 337 à 2 502 mots et publie la répartition des DPE de Villeurbanne (49 717 appartements comptés dans la base ADEME)

**Chantier choisi : contenu**, comme prescrit le 08/10. **Mais pas le candidat
désigné, et le refus vient d'une mesure, pas d'une préférence.** Le backlog
pointait `comment-estimer-son-bien-immobilier-lyon-villeurbanne` (500 mots) en
avertissant qu'il empiète sur `/estimation`,
`/estimation-immobiliere-villeurbanne` et `estimation-en-ligne-ou-agence`, et en
exigeant de **trancher qui porte la requête AVANT d'écrire une ligne**. Le `grep`
de formule du 07/10 a été rejoué sur les angles que cet article pouvait prendre,
et il a **tué les deux seuls angles chiffrables qui restaient** :

- l'angle **« corriger la médiane par typologie »** (un T1 à 4 000 €/m² contre
  2 967 €/m² pour un T5) est **déjà publié quatre fois** —
  `prix-immobilier-villeurbanne-2026` en publie le tableau complet (5 lignes,
  prix médian, €/m², surface, effectifs), et `lib/blog.ts:775`, `:1454`, `:1527`
  plus `app/estimation-immobiliere-villeurbanne/page.tsx:79` en reprennent les
  chiffres ;
- l'angle **« dispersion et marge d'erreur »** est **déjà le cœur de
  `estimation-en-ligne-ou-agence`**, qui publie la fourchette par typologie
  (`3 464 – 4 724 €/m²` pour le T1, etc.) et l'erreur médiane de 15,5 %.

→ **Décision : cet article reste au backlog, et sa réécriture devra être
procédurale (la méthode, pas de nouveau tableau de marché), ou être une FUSION.**
Il n'avait rien de chiffrable à ajouter aujourd'hui. **Le journal du 07/10 avait
raison de prévenir ; le `grep` a transformé l'avertissement en contrôle, comme
l'exigeait la leçon du 07/10.**

**Ce qui a été fait à la place, et pourquoi c'est mieux placé.** Le site publie
beaucoup sur le prix et rien sur l'énergie, alors que le DPE est devenu un
critère de prix et d'interdiction de louer. `dpe-2026-ce-qui-change` servait
**280 mots en production**, sans un seul chiffre local, **sans FAQ et donc sans
`FAQPage`**, et était l'un des 11 orphelins éditoriaux du comptage du 06/10.
**Et surtout : une source de données entièrement nouvelle pour ce site était
disponible, la base DPE de l'ADEME** (voir « Techniques apprises »).

**Ce que l'article publie désormais, et que personne d'autre ne publie à la
maille de Villeurbanne.** Tous les comptages sont des agrégats de la base ADEME
« DPE Logements existants (depuis juillet 2021) », filtrés sur
`code_insee_ban:69266` et `type_batiment:"appartement"`, **extraction du
11 octobre 2026** (diagnostics établis du 01/07/2021 au 05/10/2026), **et chaque
chiffre de tête a été remesuré une seconde fois** avant d'être écrit :

1. **La répartition des 7 étiquettes** sur **49 717 appartements** : A 176 ·
   B 1 777 · C 25 614 · D 14 297 · E 5 399 · F 1 643 · G 811. **F + G = 2 454,
   soit 4,94 %** — contre **7,05 % en France** (10 646 482 appartements) et
   **6,72 % à Lyon** (209 444, les 9 arrondissements). **Villeurbanne a moins de
   passoires que la France et que Lyon**, et le C y domine (51,52 % contre
   41,77 % au national).
2. 🟢 **Une hypothèse tentante MESURÉE PUIS ÉCARTÉE, et c'est le meilleur passage
   de l'article.** On attribuerait volontiers ce bon score au chauffage urbain,
   très présent à Villeurbanne. **Mesuré : 17,95 % des appartements diagnostiqués
   y sont raccordés à un réseau de chaleur, contre 17,24 % en France.** Écart
   nul. L'article l'écrit noir sur blanc et renvoie vers la vraie cause.
3. **La vraie cause, et le tableau qui vaut le chantier : la part de F + G par
   période de construction.** avant 1948 **12,37 %** (1 219/9 856) · 1948-1974
   **7,60 %** (1 142/15 025) · 1975-1977 2,99 % · 1978-1982 0,72 % · 1983-1988
   0,41 % · 1989-2000 0,27 % · 2001-2005 0,05 % · 2006-2012 0,10 % · 2013-2021
   0,05 %. **La rupture est 1975** (première réglementation thermique) :
   **9,49 % avant (2 361/24 881) contre 0,38 % après (93/24 649), soit 25 fois
   moins souvent** — les deux agrégats vérifiés par une requête dédiée, pas par
   addition. Et **96 % des passoires de la commune sont dans le bâti d'avant
   1975**.
4. **Le chiffre local du changement de coefficient au 1ᵉʳ janvier 2026** :
   **1 287 appartements villeurbannais classés F ou G sont chauffés à
   l'électricité, dont 1 077 avec un DPE établi avant le 01/01/2026** (somme
   vérifiée : 1 077 + 210 = 1 287). Ce sont eux, nominativement, qui ont intérêt
   à demander la mise à jour gratuite. Et 52,4 % des passoires villeurbannaises
   sont électriques, 42,3 % au gaz, 3,1 % au réseau de chaleur.
5. **Le calendrier d'interdiction de location converti en effectifs locaux** :
   811 appartements en G (déjà), 1 643 en F (2028), 5 399 en E (2034) — **7 853
   logements diagnostiqués, 15,8 % du parc à l'horizon 2034**. Et le constat qui
   en sort : **l'échéance lourde n'est pas 2025 ni 2028, c'est 2034**, qui vise
   plus du double des F et G réunis.
6. **Les petites surfaces**, point très villeurbannais : **18 134 appartements
   diagnostiqués font ≤ 40 m², soit 36,5 %** de ceux dont la surface est
   renseignée (49 695), et **6,26 % d'entre eux sont F ou G contre 4,16 %
   au-dessus de 40 m²** — relié aux seuils adaptés depuis le 01/07/2024.

**Volet GEO appliqué intégralement.** **8 H2, tous formulés comme des questions
réellement posées** (« Mon immeuble date des années 1960 : quel risque d'avoir
une étiquette F ou G ? », « Faut-il un audit énergétique pour vendre un
appartement classé F ou G ? », « Mon DPE est-il encore valable ? »), **chacun
ouvrant sur une réponse autonome de 2-3 phrases** avant tout développement.
**FAQ de 7 questions, visible ET en `FAQPage`, parité 7/7 + 7/7 vérifiée mot pour
mot.** `dateModified` **2026-10-11** et « Mis à jour le 11 octobre 2026 » visible.
**Un H2 « Comment ces chiffres ont-ils été calculés ? »** qui donne la base, le
filtre, la date d'extraction **et trois limites assumées** (ce n'est pas un
recensement du parc mais le stock des DPE réalisés ; un logement peut y figurer
plusieurs fois et nous ne dédoublonnons pas ; les parts arrondies ne somment pas
à 100 %).

**Les règles réglementaires ont TOUTES été revérifiées sur source primaire avant
d'être republiées** — c'est ce qui a fait tomber deux défauts, détaillés en
« Erreurs commises et corrigées » :
- fiche **F16096** « Diagnostic de performance énergétique », service-public,
  **vérifiée le 01/01/2026** : coefficient 2,3 → 1,9, validité 10 ans, DPE de
  2018–30/06/2021 caducs depuis le 01/01/2025, seuils adaptés ≤ 40 m² depuis le
  01/07/2024 ;
- fiche **F33463**, **vérifiée le 20/02/2026** : G interdit depuis le 01/01/2025
  **renouvellement et reconduction tacite inclus**, F en 2028, E en 2034 ;
- fiche **F37110** « Audit énergétique … passoire thermique », **vérifiée le
  14/09/2026** : périmètre **maisons individuelles et immeubles en
  monopropriété**, classes **E, F ou G**, ventes signées depuis le 01/04/2023,
  extension aux **D au 01/01/2034** ;
- page **`ecologie.gouv.fr`** du ministère : calendrier du **DPE collectif**
  (01/01/2024 monopropriété et copros > 200 lots · 01/01/2025 copros 50–200 lots ·
  **01/01/2026 copros ≤ 50 lots**) — **introuvable sur service-public**, c'est
  cette page qui a permis de confirmer une phrase déjà publiée.
Les 4 liens externes de l'article pointent ces 4 sources, chacune **avec sa date
de vérification**.

**Maillage : 2 liens entrants ajoutés, et seulement dans des phrases qui
existaient déjà** (règle du 16/09, séquence validée le 07/10 : réécrire d'abord,
lier ensuite).
- `prix-immobilier-villeurbanne-2026` → la puce « Le DPE » de son bloc décote
  reçoit « elles sont rares dans la commune — **4,9 % des appartements
  diagnostiqués** — et concentrées sur le bâti d'avant 1975 » ;
- `estimation-en-ligne-ou-agence` → sa puce « Le DPE » reçoit « à Villeurbanne,
  **2 454 appartements diagnostiqués sont dans ce cas** ».
- Le lien de `diagnostics-obligatoires-vente` **existait déjà** : l'article a donc
  **3 liens entrants** et sort des 11 orphelins éditoriaux. **Il en reste 10.**

**`llms.txt` est à jour sans intervention** (dérivé de `ARTICLES` — il sert déjà
le nouveau titre et le nouvel `excerpt`, vérifié).

**Contrôles avant push** : `tsc` muet · `build` vert · `eslint lib/blog.ts` muet ·
2 502 mots servis · parité FAQ 7/7 + 7/7 · 0 mot collé · 4 blocs JSON-LD ·
**un seul `lastmod` déplacé sur les 51** · `title` 65 caractères ·
`metaDescription` 155 · **diff = 1 fichier**, `lib/blog.ts`.

### 2026-10-08 — Piste (i), la justesse des calculs : les nombres étaient tous bons, ce sont deux PHRASES qui mentaient (Cusset 21,3 % → 17,6 %, et Gratte-Ciel « le plus actif après Ferrandière » alors qu'il est le premier)

**Chantier choisi : non-contenu**, comme prescrit le 07/10 (deux runs de contenu
sur les trois précédents), et sur **le candidat n°3 désigné** : la piste (i),
ouverte le 05/10 et jamais traitée. **Périmètre pris tel que le 07/10 l'avait
cadré** : les quatre pages qui dérivent `honorairesVente()` et le produit
`médiane de quartier × COMMUNE.surfaceMediane` — `/vendre`,
`/agence-immobiliere-gratte-ciel`, `/agence-immobiliere-charpennes`,
`/agence-immobiliere-cusset`. Le `grep` de formule du 07/10 a été rejoué d'abord
et **rend exactement les mêmes quatre fichiers** : le cadrage était bon.

**Méthode : recalculer sans réutiliser le code du site.** Un script indépendant
(`scratchpad/calc.mjs`) réimplémente le barème et les produits à partir des seules
constantes de `lib/quartiers.ts`, puis les montants sont confrontés au **HTML
réellement servi en production** (les 4 pages téléchargées, texte isolé du
`<main>`). **C'est la bonne méthode et elle se réutilise** : vérifier qu'un nombre
est « là » ne dit rien ; le refaire dit tout.

**Résultat n°1 — tous les MONTANTS tombent juste.** Honoraires, net vendeur, taux
effectif, surfaces achetables, part des ventes, rendements : **exacts, y compris
l'effet de seuil de Cyprian** (169 756 €, 244 € sous la barre des 170 000 €, donc
forfait 9 000 €, donc taux effectif 5,30 % **inférieur** aux 6,00 % des six autres
— le sens de la bascule est bon). Les 7 rendements par quartier de
`rentabilite-locative-lyon` ont été recalculés un par un : **justes au centième**.
Détail chiffré en « État des lieux ».

**Résultat n°2 — l'erreur n'était pas dans les nombres, elle était dans les
phrases. Deux fois.**

🔴 **(a) `/agence-immobiliere-cusset` : « 21,3 % de moins qu'à Gratte-Ciel ».**
La formule publiée était `(GC.median / Q.median - 1) * 100` = **+21,3 %**, qui
répond à « de combien Gratte-Ciel est-il PLUS cher que Cusset ? ». La phrase, elle,
disait « Cusset est X % **de moins** qu'à Gratte-Ciel » — et cette grandeur-là vaut
`(1 - Q.median / GC.median) * 100` = **17,6 %**. **Les pourcentages ne sont pas
symétriques** : +21,3 % dans un sens valent −17,6 % dans l'autre. L'écart publié
était donc **surévalué de 3,7 points**, sur une page dont tout l'argument est « nos
chiffres viennent des actes ». ⚠️ **Et la phrase vivait dans une réponse de FAQ,
donc aussi dans le JSON-LD `FAQPage`** : le chiffre faux était servi tel quel aux
moteurs d'IA, exactement le canal que ce journal cherche à gagner.
→ Corrigé par une constante dont **le nom dit le sens** (`MOINS_CHER_QUE_GC`) et un
commentaire qui écrit l'asymétrie noir sur blanc, pour qu'on ne puisse pas
réintroduire la formule inverse sans la lire.

🔴 **(b) `/agence-immobiliere-gratte-ciel` : « le quartier le plus cher et le plus
actif de la ville APRÈS FERRANDIÈRE ».** Vrai pour le **prix** (Ferrandière
3 923 €/m² > Gratte-Ciel 3 846 €/m²), **faux pour l'activité** : Gratte-Ciel est
**premier des sept avec 655 ventes (35 % de la commune)** et **Ferrandière est
sixième sur sept avec 187 ventes (10,0 %)**. Le qualificatif « après Ferrandière »
portait sur les deux superlatifs et rendait le second absurde. **La page se
contredisait elle-même dans le même écran** : sa FAQ dit « de loin le quartier le
plus liquide de la ville », et son propre tableau affiche les 655 ventes.
→ Corrigé en séparant les deux superlatifs : « **le deuxième quartier le plus cher
de la ville, derrière Ferrandière – Maisons-Neuves, et de loin le plus actif** ».
La formulation est maintenant **alignée sur le reste de la page** (« arrive
deuxième des sept quartiers publiables », qui parlait déjà du prix seul).

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**
- ⛔ **Ne pas « corriger » les arrondis des pages de quartier.** J'ai d'abord cru
  tenir un troisième défaut : prix arrondi au millier − honoraires arrondis à la
  centaine ≠ net vendeur exact (445 €, 479 €, −394 € d'écart si le lecteur
  soustrait). **Les trois pages l'écrivent déjà** : « Sur le prix non arrondi, le
  vendeur perçoit donc X € ». Vérifié en production sur les trois. **Toucher à ça
  aurait cassé une rédaction honnête pour un défaut imaginaire.**
- ⛔ **Ne pas ajouter de helper d'écart relatif à `lib/quartiers.ts`.** C'était
  tentant (le fichier est fait pour ça), mais ce module est lu par 4+ pages et le
  défaut n'existait que sur **une**. Un export partagé pour un cas unique, c'est
  élargir le rayon de casse sans rien gagner. Correction gardée **locale**.
- ⛔ **Ne pas unifier la date visible (`MAJ`) et le `dateModified` (`lastmodOf`)**
  sur les pages de quartier. Divergence **antérieure** à ce run et défendable
  (date de la donnée vs date de la page). Inscrit en « Hypothèses à vérifier ».
- ⛔ **Ne pas avancer le `lastmod` de `/agence-immobiliere-charpennes`** : elle a
  été **auditée** (et déclarée saine), pas modifiée. Auditer n'est pas rafraîchir.
- ⛔ **Ne pas toucher à l'indentation JSX bizarre** des deux chapôs : rendu correct
  vérifié en production.

**Volet GEO.** Pas de nouveau contenu, donc pas de nouveau H2 ni de FAQ ajoutée —
mais **le volet GEO le plus élémentaire est précisément celui-là** : un passage
cité par une IA doit être **vrai**. Les deux phrases corrigées sont des passages
courts, autonomes et chiffrés, c'est-à-dire **exactement le genre d'extrait qu'un
LLM prélève** ; l'une était dans un `FAQPage`. **Parité FAQ visible ↔ JSON-LD
revérifiée après correction : 5/5 questions et 5/5 réponses sur les deux pages.**

**Contrôle avant push** : `tsc --noEmit` muet, `eslint` sans erreur sur les
3 fichiers, `npm run build` vert, parité FAQ 5/5+5/5, 0 mot collé, 2 `lastmod`
déplacés et seulement ceux-là, `/estimation` et les deux `lib/` de l'estimation
intouchés (vérifié par `git status` sur ces chemins).

### 2026-10-07 — `vendre-sans-agence` : l'article publiait le barème que tout le monde publie, il publie maintenant l'écart en euros entre vendre seul et vendre accompagné (399 → 2 583 mots)

**Chantier choisi : contenu**, comme prescrit le 06/10 (deux runs non-contenu sur
les trois précédents). Cible désignée par le backlog : `vendre-sans-agence`,
399 mots, **orphelin éditorial** (0 lien entrant au comptage du 06/10), et dernier
article « argent » mince de la grappe vente.

**L'angle, mesuré avant d'être écrit.** La requête est largement couverte au
niveau national : `pap.fr` publie une page dédiée « Vendre seul et sans agence :
combien ça coûte ? » (mise à jour du 15 avril 2025, téléchargée aujourd'hui).
**Mais cette page de référence ne chiffre jamais ce que le vendeur veut savoir** :
elle donne « diagnostics 200 à 700 € », « frais de notaire ≈ 8 %, à la charge de
l'acheteur », « commission 0 € », « vendre avec PAP : coût variable » — et **ne
fait aucune soustraction**. C'est là qu'était la place : personne ne met l'économie
réalisée en face du risque pris, **en euros et sur des données villeurbannaises.**

**Ce que l'article publie maintenant, et que personne d'autre ne publie :**

1. **Le point de bascule exact.** Dans la tranche 170 001 – 300 000 € du barème,
   les honoraires valent **exactement 6 %** du prix. Donc **une erreur de prix de
   6 % annule à l'euro près l'économie d'une vente sans agence.** Or l'erreur
   médiane d'une estimation faite sur les seules données publiques est, à
   Villeurbanne, de **15,5 %** — soit **30 225 €** sur un bien à 195 000 €, contre
   **11 700 €** d'honoraires économisés : **2,6 fois**. C'est le croisement de deux
   faits déjà publiés sur le site que personne n'avait mis ensemble (le motif qui
   a marché le 05/10), et il tombe juste par construction.
2. **Où vendre seul est le moins risqué, quartier par quartier** — repris de
   l'étude de dispersion de `estimation-en-ligne-ou-agence` : Gratte-Ciel –
   Dedieu – Charmettes 42 % des ventes estimées à moins de 10 % près (bâti
   homogène, 655 ventes), contre **25 % à Buers – Croix-Luizet et Cyprian – Les
   Brosses**. Aucun concurrent ne publie une recommandation « vendez seul ici,
   pas là » adossée à des prix signés.
3. **Trois points de droit que les articles « vendre sans agence » omettent**, tous
   sourcés sur **service-public.gouv.fr, fiche F2604 « Vente d'un logement en
   copropriété », vérifiée le 21 août 2025** :
   - **le délai de rétractation de 10 jours ne démarre qu'une fois les 7 documents
     de copropriété tous reçus** par l'acheteur — un seul manquant et l'acheteur
     reste libre de se retirer, sans que l'horloge ait commencé ;
   - **exiger ou recevoir un acompte avant la fin de ce délai est puni de
     30 000 € d'amende**, sauf promesse conclue via un professionnel mandaté ou
     fonds consignés chez un professionnel ayant une garantie financière dédiée.
     **C'est la différence la plus concrète entre vendre seul et vendre
     accompagné, et elle est juridique, pas commerciale** ;
   - une pièce manquante du dossier de diagnostic technique le jour de l'acte fait
     **tomber la clause d'exclusion de garantie** (le vendeur garantit le vice
     caché correspondant), et l'état des risques non remis en zone concernée ouvre
     **l'annulation de la vente ou une diminution du prix**.
4. **Le dossier de diagnostic technique réel d'un lot de copropriété : 14 pièces**
   avec leurs conditions de déclenchement (15 ans pour gaz et électricité, arrêté
   préfectoral pour la mérule, plan d'exposition au bruit, plan de protection de
   l'atmosphère…), et **les mentions obligatoires de l'annonce entre
   particuliers** (charges annuelles du budget prévisionnel, dépenses prévisibles
   du DPE, procédures de difficultés financières, renvoi vers Géorisques).

**Structure GEO appliquée** : 7 H2, **tous formulés en questions réelles** et
**tous ouvrant par une réponse autonome de 2-3 phrases** (« Encaisser un acompte
avant la fin du délai de rétractation de dix jours de l'acheteur. », « À
Gratte-Ciel – Dedieu – Charmettes. »). FAQ de **6 questions**, visible et reprise
à l'identique en `FAQPage` (parité 6/6 questions **et** 6/6 réponses, vérifiée sur
le HTML rendu). `updated: "2026-10-07"` → « Mis à jour le 7 octobre 2026 » visible
en eyebrow et `dateModified` dans `BlogPosting`.

**Honnêteté éditoriale assumée** (le client refuse les fausses pratiques, et un
article de vendeur qui descend la vente directe ne serait pas crédible) :
la FAQ dit que **vendre seul puis confier à une agence n'est pas un échec**, et
qu'un acheteur **ne paie pas forcément moins cher** chez un particulier,
puisque nos honoraires sont à la charge du vendeur — le prix affiché par l'agence
n'est pas majoré d'une commission acheteur.

**Maillage : l'article sort de la liste des orphelins, avec deux liens entrants**
placés dans des phrases existantes (motif du 06/10, aucun bloc ajouté) :
- `app/vendre/page.tsx` — en clôture du paragraphe qui commente le tableau de net
  vendeur par quartier, vers « vendre sans agence à Villeurbanne » ;
- `lib/blog.ts`, article `mandat-simple-ou-exclusif` — dans le chapô, qui parlait
  déjà de « le vendre vous-même ».
Et **11 liens internes sortants servis dans le `<main>`** : `/honoraires`,
`/vendre` ×2, `/estimation-immobiliere-villeurbanne`,
`/blog/prix-immobilier-villeurbanne-2026`, `/blog/estimation-en-ligne-ou-agence`,
`/blog/frais-de-notaire-lyon-2026`, `/blog/diagnostics-obligatoires-vente`
(+ fil d'Ariane et articles liés). `diagnostics-obligatoires-vente`, lui aussi
mince, **gagne ainsi un lien entrant au passage**.

**Script du calcul publié — à rejouer si les médianes ou le barème bougent :**

```js
// honoraires au prix médian communal (COMMUNE.prixMedian = 195 000 €)
// barème /honoraires, tranche 170 001–300 000 € = 6 %
const hono = 195000 * 0.06;            // 11 700 €
const err  = Math.round(195000*0.155); // 30 225 €  (erreur médiane 15,5 %)
const ratio = err / hono;              // 2,58 → « 2,6 fois »
const dix   = 195000 * 0.10;           // 19 500 €  (la liste 18/36/62 %)
// et le point de bascule : honoraires = 6 % du prix, donc une erreur de 6 %
// annule l'économie — vrai pour tout prix de la tranche, pas seulement 195 000 €.
```

**Contrôles passés avant push** : `npx tsc --noEmit` muet · `npm run build` vert ·
`npx eslint lib/blog.ts app/vendre/page.tsx` sans erreur · HTML rendu servi en
local (`next start`) : 2 583 mots dans le `<main>`, **0 mot collé** sur les
5 motifs du 04/10, parité FAQ 6/6 + 6/6, 4 blocs JSON-LD, 14 items dans la liste
annoncée comme « quatorze pièces », les trois dates de source visibles
(15 avril 2025, 21 août 2025) et les deux liens entrants servis sur
`/vendre` et `/blog/mandat-simple-ou-exclusif`.

**L'en-tête de `lib/blog.ts` a été mise à jour en conséquence** : elle dit
maintenant que cet article **ne doit pas** reprendre de tableau d'honoraires par
quartier (`/vendre` le porte), que la requête « diagnostics obligatoires » reste
attribuée à `diagnostics-obligatoires-vente`, quels chiffres recalculer si les
médianes ou le barème bougent, et que la fourchette 200–700 € est un chiffre
tiers daté qu'on ne rafraîchit jamais de mémoire.

### 2026-10-06 — La moitié du blog n'était liée de nulle part : les deux articles les plus lourds du site sortent de l'orphelinat éditorial (14 → 12 orphelins), et la source `service-public` cesse de rediriger

**Chantier choisi, et pourquoi.** Le backlog interdisait un run de contenu blog
(angle du 05/10) et désignait la **grappe blog** comme candidat non-contenu n°1.
Avant d'y toucher, le signal a été **mesuré autrement que le 04/10** : plutôt que
la profondeur de clic, un comptage des **liens éditoriaux entrants par article**
(liens venant d'une page hors `/blog`, donc ni le listing ni le sitemap).

**Le résultat a redéfini le chantier.** La mesure du 04/10 disait « la grappe blog
reste à la profondeur 3-4 ». Le comptage dit la cause : **14 articles sur 26 ne
recevaient aucun lien éditorial**, et tous les liens existants partaient des mêmes
7 pages (`/vendre`, `/acheter`, `/estimation-immobiliere-villeurbanne`,
`/estimation`, les 4 pages locales). Les trois pages de la grappe gestion
portaient **1 lien blog à elles trois** : `/faire-gerer` (1 772 mots) **0**,
`/honoraires` **0**, `/gestion-locative` **1**.

**Et le défaut touchait précisément les pages où il coûte le plus cher.** Classés
par poids, les articles orphelins étaient menés par **`rentabilite-locative-lyon`
(2 713 mots)** — le rendement par quartier calculé sur les prix signés, donnée que
personne d'autre ne publie — et **`plus-value-immobiliere-calcul` (2 598 mots)**,
écrit **la veille** avec le seuil d'imposition par quartier. Les deux plus gros
investissements de contenu du site, invisibles dans son propre graphe.

**Ce qui a été fait — 7 liens, aucun bloc « voir aussi ».** Chaque lien est inséré
dans une phrase qui répond à une question, pas dans une liste de renvois :

| Depuis | Vers | Prétexte éditorial |
|---|---|---|
| `/faire-gerer` | `rentabilite-locative-lyon` | ce que les 6 % retirent au rendement : **4,91 % → 4,62 %, 0,29 point** |
| `/faire-gerer` | `gestion-locative-…-deleguer-ou-non` | le partage des tâches (6 familles / 3 décisions au propriétaire) |
| `/gestion-locative` | `rentabilite-locative-lyon` | l'arbitrage remis à l'échelle du rendement (**4,47 %–6,40 %**, écart 1,93 point) |
| `/honoraires` | `frais-de-notaire-lyon-2026` | la confusion honoraires d'agence ≠ frais de notaire |
| `/vendre` | `plus-value-immobiliere-calcul` | le seuil d'imposition par quartier (**+9,7 % à +23,9 %**) |
| `/estimation-immobiliere-villeurbanne` | `/acheter` | la paire incomplète repérée le 04/10, refermée |
| `cout-gestion-locative` | `/faire-gerer` | l'arbitrage de cannibalisation tranché |

**Les chiffres publiés aujourd'hui ne sont pas saisis, ils sont dérivés.** Les
rendements viennent de `LOYER_MEDIAN_HC` et des médianes de `lib/quartiers.ts`,
**les mêmes sources que l'article** : `(LOYER_MEDIAN_HC × 12) / median`, puis
`× (1 − TAUX_GESTION)` pour le net de gestion — les honoraires portant sur les
loyers encaissés, ils amputent le rendement brut de leur propre taux. Trois pages,
une seule source : elles ne peuvent plus afficher trois fourchettes du même fait.
**Vérifié au centième contre l'article** : 4,91 % / 4,47 %–6,40 % / 1,93 point.

**La seule exception est documentée dans le code.** Les deux bornes du seuil
d'imposition sur `/vendre` (9,7 % et 23,9 %) sont **recopiées** du tableau de
l'article et non recalculées : l'article les dérive de médianes **déjà arrondies**
(4 365 / 3 524), et refaire le calcul depuis `vs2022` donnerait 23,8 % — **0,1 point
de divergence entre deux pages du même site**, exactement le défaut que la piste (f)
cherche. Un commentaire JSX le dit et indique quoi changer si le tableau bouge.

**Micro-chantier du 05/10 fait au passage, et le `grep` prescrit a payé.**
`service-public.fr` répond **301** vers `service-public.gouv.fr` (vérifié au `curl`
ce jour ; F10864 et F1669 répondent **200** sur le nouveau domaine). Le journal
annonçait 2 emplacements : il y en avait **8** — six dans `app/vendre/page.tsx`
(2 commentaires de provenance, 2 réponses de FAQ, 2 blocs « Source » visibles) et
deux dans `app/llms.txt/route.ts`. Les 8 sont corrigées ; **12 occurrences du
nouveau domaine vérifiées sur le HTML rendu de `/vendre`**. La 9ᵉ, dans
`lib/blog.ts`, est le commentaire qui **documente** la redirection : laissée sur
l'ancien domaine à dessein.

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**
1. **Ne pas lier les 12 autres orphelins.** Ils pèsent **200 à 500 mots**. Les
   lier depuis une page de service enverrait l'autorité vers des pages faibles et
   signalerait leur importance au moment où elle n'existe pas. L'orphelinat est
   ici le **symptôme** d'un contenu trop mince, pas la maladie : le remède est de
   les réécrire ou de les fusionner, pas de les lier. **14 → 12, et c'est le bon
   chiffre** — les 12 restants sont un backlog de contenu, pas de maillage.
2. **Ne pas toucher les dates de « Dernière mise à jour » ni les `lastmod`.**
   Ajouter un lien et une phrase de contexte n'est pas une mise à jour du contenu
   pour le lecteur : avancer la date serait de l'inflation de fraîcheur, que le
   brief interdit explicitement (« actualise-le seulement quand tu modifies
   vraiment le contenu »). **Vérifié : le sitemap local est inerte sur les
   5 pages touchées** (les 2 seuls écarts avec la production, `/` et `/annonces`,
   viennent de l'absence de base de données en local, pas du diff).
3. **Ne pas réécrire `llms.txt`.** Audité : il dérive les 26 articles de
   `ARTICLES`, il ne peut pas se désynchroniser. Rien à faire.
4. **Ne pas corriger les 6 `<a>` bruts** repérés par le lint (dont
   `estimation-immobiliere-lyon:94` → `/estimation-immobiliere-villeurbanne`).
   Un `<a href="/…">` est un lien crawlable normal : **impact SEO nul**, défaut
   côté UX seulement. « Ne corrige rien qui fonctionne. »
5. **Ne pas vider `cout-gestion-locative`** en le fusionnant dans `/faire-gerer`.
   Consigne du 01/10 : il détient la seule mention du site pour les deux frais
   fixes (20 €/an, 45 €/lot/an). Il garde son contenu et **cède la requête** par
   un lien, ce qui règle l'arbitrage sans perte.

**Contrôles avant push.** `npx tsc --noEmit` muet · `npm run build` vert · aucune
nouvelle erreur de lint (les 24 du dépôt sont pré-existantes, dans `scripts/` et
`studio/`) · **0 mot collé** sur les 6 pages rendues (5 motifs, 9 288 mots) ·
**parité FAQ 6/6 sur les 5 pages à FAQ** · les 7 liens servis dans le `<main>`
avec l'ancre attendue · 8 pages en **HTTP 200** sur le serveur de production local
· `/estimation`, `lib/dvf.ts`, `lib/estimation.ts` **non touchés**.

**Un défaut de ma propre rédaction, trouvé et corrigé avant le push.** La première
version écrivait `{points(…)}s` pour obtenir « 1,93 points ». En français le
pluriel ne commence qu'à 2 : « **1,93 point** » est la forme correcte. Corrigé,
rebuild, revérifié sur le HTML rendu. C'est le genre de faute qu'aucun contrôle
structurel n'attrape — seule la relecture du **texte rendu** la voit (leçon du
04/10, qui se confirme).

### 2026-10-05 — `plus-value-immobiliere-calcul` : l'article publiait le barème que tout le monde publie, il publie le seuil d'imposition par quartier (212 → 2 571 mots)

**Chantier choisi, et pourquoi.** Lundi, donc veille d'abord (voir « Techniques
apprises »), puis un run de CONTENU — l'angle du 04/10 était « audit + maillage »,
celui du 02/10 « page de service ». Le backlog désignait
`plus-value-immobiliere-calcul` (212 mots) comme candidat n°1 : le plus mince des
articles « argent » restants, 3 H2 qui sont des chaînes de mots-clés
(« Le taux », « Qui est exonéré ? », « Les abattements pour durée de détention »),
aucune FAQ, aucun chiffre local, aucune date de mise à jour.

**L'angle prescrit a été mesuré AVANT d'écrire, et rejeté.** Le backlog
prescrivait « le calcul pas à pas et les abattements année par année, le tableau
que /vendre ne publie pas ». Mesure : **neuf résultats sur neuf publient déjà ces
deux tableaux**, identiques au pourcent près. C'est du contenu de commodité et
c'est le motif « règle de droit générique + nom de ville » invalidé le 29/09.
**Cinquième angle invalidé par la mesure.** Le tableau n'a donc pas été publié :
le dernier H2 le résume en deux phrases et renvoie.

**L'angle retenu — le SEUIL d'imposition, que personne ne publie.** Il se déduit
de deux faits déjà publiés sur le site mais **jamais mis ensemble** :
1. le prix d'achat retenu par le fisc est **majoré forfaitairement de 7,5 %** au
   titre des frais d'acquisition, sans justificatif (le forfait travaux de 15 %,
   lui, exige plus de 5 ans de détention) ;
2. la médiane villeurbannaise a **reculé de 10,4 %** depuis 2022, et elle a
   reculé dans les 7 quartiers.
Le prix de référence monte donc pendant que le marché descend. **Conséquence
chiffrée, publiée quartier par quartier : il faudrait revendre 9,7 % à 23,9 %
au-dessus du prix médian 2025 pour devoir le premier euro d'impôt.**

**Ce qui a été écrit précisément** (un seul fichier touché, `lib/blog.ts`) :
- `title`, `metaDescription`, `h1` et `excerpt` réécrits sur le seuil (l'ancien
  titre était « Plus-value immobilière : calcul et exonérations (2026) », un
  intitulé de commodité sans marqueur local) ;
- **6 H2 reformulés en questions réellement posées**, chacun ouvert par une
  **réponse autonome de 2-3 phrases** (« Ai-je une plus-value à déclarer si j'ai
  acheté à Villeurbanne en 2022 ? », « À partir de quel prix de revente la
  plus-value devient-elle imposable ? », « Peut-on déduire une moins-value
  immobilière de ses impôts ? », …) ;
- un **tableau du seuil d'imposition pour les 7 quartiers + la commune**
  (médiane 2022, médiane 2025, seuil €/m², hausse nécessaire), avec légende de
  méthode et sources ;
- le **calcul en 6 étapes** déroulé sur le cas communal en 62 m² ;
- deux manques comblés que ni `/vendre` ni les concurrents ne traitent :
  **la non-imputabilité de la moins-value** (ni sur une plus-value de même
  nature, ni sur le revenu global ; exception étroite des fractions successives
  constatées par le même acte) — source **BOFiP BOI-RFPI-PVI-20-20** — et
  **le franchissement de la 5ᵉ année**, qui ouvre le forfait travaux de 15 % et
  pèse **37 023 €** sur le cas médian, davantage que les abattements des trois
  années suivantes ;
- une **FAQ de 6 questions**, visible et reprise en `FAQPage` depuis le même
  tableau source (parité par construction, vérifiée 6/6 sur le HTML rendu) ;
- `updated: "2026-10-05"` → `dateModified` et « Mis à jour le » visibles ;
- liens internes sortants : `/vendre`, `/blog/prix-immobilier-villeurbanne-2026`,
  `/blog/frais-de-notaire-lyon-2026`, `/blog/rentabilite-locative-lyon`.

**Disjonction avec `/vendre`, vérifiée avant d'écrire** (c'était la réserve du
backlog). `/vendre` répond « faut-il payer un impôt » au niveau **communal** et
cite déjà le recul de 10,4 %, les taux, les forfaits et les 22/30 ans. L'article,
lui, fait **l'arithmétique**, publie le **seuil par quartier** et traite la
**moins-value** — trois choses absentes de `/vendre`. Renvoi explicite à `/vendre`
pour le net vendeur.

**Convention d'arrondi, et pourquoi elle compte.** Première rédaction : la chaîne
était calculée sur les médianes 2022 **non arrondies**, si bien qu'un lecteur
refaisant « 3 981 × 62 × 1,075 » sur les chiffres **publiés** tombait 1 à 6 € à
côté des montants publiés. Corrigé avant le commit : **toute la chaîne est
maintenant dérivée des valeurs affichées** (3 981 × 62 = 246 822 ; × 1,075 =
265 334 ; − 221 154 = **−44 180**). Les montants par quartier ont bougé en
conséquence (Ferrandière −23 574, Charpennes −52 111, seuils Charpennes 4 365 et
Cusset 3 618, hausses 20,3 % et 23,9 %). **Règle à conserver : un article qui
publie à la fois des entrées et un résultat doit être calculable sur ses propres
chiffres affichés.** Documenté dans l'en-tête de `lib/blog.ts`.

**Contrôle de cohérence qui valide la méthode.** La médiane 2022 reconstituée par
`med2025 / (1 + vs2022/100)` donne **3 981 €/m²** pour la commune — exactement la
valeur **déjà publiée** par `rentabilite-locative-lyon`. La reconstitution est
donc fiable, et c'est un premier point de la piste (f) du backlog (cohérence des
chiffres d'une page à l'autre).

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**
- **Ne pas publier le tableau des abattements année par année** : mesuré saturé
  (9/9), contenu de commodité. Deux phrases + renvoi à la place.
- **Ne pas corriger `service-public.fr` → `service-public.gouv.fr`** dans
  `app/vendre/page.tsx` et `app/llms.txt/route.ts` : hors chantier du jour, et la
  règle « en cas de doute sur le contenu existant, ne touche pas » s'applique.
  Inscrit en « Chantiers en attente » comme micro-chantier prêt à faire.
- **Ne pas poser le lien `/acheter` manquant sur
  `/estimation-immobiliere-villeurbanne`** (oubli du 04/10) : c'est du maillage,
  l'angle du 04/10 ; ne pas mélanger deux chantiers dans un diff.
- **Ne pas toucher `llms.txt`** : il est **généré depuis `ARTICLES`**, donc la
  ligne de l'article s'est mise à jour seule. Rien à maintenir à la main (et voir
  « Erreurs commises et corrigées » sur ce que vaut `llms.txt`).

**Vérifications passées sur le HTML rendu** (build local, avant push) :
`tsc --noEmit` et `eslint` propres, `npm run build` exit 0, **0 mot collé**
(contrôle strict du défaut du 04/10), **parité FAQ ↔ FAQPage 6/6 mot pour mot**,
`datePublished` 2026-06-11 / `dateModified` 2026-10-05, sitemap **inerte sauf la
seule ligne attendue** (1 `lastmod` sur 51), **un seul fichier au diff**.

**Reste ouvert.** La vérification **en production** (le déploiement suit le push
de ~90 s) n'a pas été refaite après le commit : **à contrôler au prochain run**
— que la page serve bien 2 571 mots, le tableau, la FAQ et `dateModified`
2026-10-05.

### 2026-10-04 — La profondeur éditoriale mesurée pour la première fois : `/vendre` et `/acheter` étaient les pages les plus profondes du site, et 20 mots collés étaient servis en production

**Angle du jour** : *audit non-contenu* (pistes (b) et (c) du backlog), puis
**maillage interne**. Le 02/10 était un run de contenu long (`/acheter`) : le
backlog interdisait d'en enchaîner un second.

**Run manqué.** Le samedi 03/10 n'a produit ni commit ni entrée de journal. Le
chantier que le backlog lui réservait a été fait aujourd'hui.

#### Ce que la mesure a dit avant d'agir

Quatre SERP, **toutes absentes** (détail au tableau). Deux enseignements, dont un
qui ferme une porte et un qui en confirme une :

1. 🔴 **« vendre appartement Villeurbanne » est une requête transactionnelle** :
   9 résultats, **tous des pages de listings**, zéro éditorial. Même motif
   d'échec que `/acheter` le 02/10. La réécriture du 30/09 ne déplacera pas cette
   SERP. Ce n'est pas un échec du chantier du 30/09 — son intérêt est la citation
   sur « ce qu'il reste au vendeur », que personne d'autre ne publie — mais il
   faut cesser d'en attendre une position.
2. 🟢 **La thèse « prix affichés ≠ prix signés » est reconfirmée par une source
   indépendante, deux semaines après sa publication.** Le résumé du moteur publie
   sans réserve Charpennes à **5 120 €/m²**, Gratte-Ciel **4 520**, Cusset
   **3 680**, quand les médianes DVF des mêmes contours officiels sont **3 524 /
   3 846 / 3 171**. Écart **+17,6 % à +45,3 %**, dans la fourchette 16,1–45,3 %
   publiée le 27/09. **Rien à écrire** : l'angle est déjà sur trois pages.

#### Piste (b) — ce que le site renvoie hors HTML : auditée, SAINE

Premier audit de ce signal. Rien à corriger, et c'est un résultat :

| Contrôle | Résultat |
|---|---|
| Chaîne de redirection | `http://` → `https://` → `www`, **308 à chaque saut, 2 maximum** |
| Hôte canonique | cohérent partout : 53 `<loc>` du sitemap, 53 canonicals, `og:url`, `robots.txt`, `llms.txt` — **tous en `www`** |
| URL inconnue | **vrai 404 + `noindex`**, y compris sous `/blog/`, `/annonces/`, `/estimation/` |
| Slash final | 308 vers l'URL sans slash |
| 8 routes `/api/` en GET | **405** (method not allowed) ou **401** — aucune fuite |
| `/admin` · `/admin/pages` · `/radar` | 404 · `noindex, nofollow` · 307 vers `/admin/login`, lié depuis aucune page publique |
| `[slug]` attrape-tout de l'éditeur | `notFound()` hors liste blanche — **ne fabrique pas de 200 fantômes** |
| Pages de l'éditeur dans le sitemap | **oui** (`getPublishedPagesForSitemap`) — le branchement SEO du back-office du 30/09 est correct |

#### Piste (c) — profondeur de clic : LE DÉFAUT DU JOUR

BFS sur les 53 pages de production, mesuré **deux fois**, et c'est l'écart entre
les deux mesures qui est le résultat :

| Mesure | Résultat |
|---|---|
| **Tous liens** (nav + pied de page + corps) | **2 clics maximum, 0 orpheline** — techniquement irréprochable |
| **Liens du `<main>` seulement** (le signal d'importance, pas d'accessibilité) | profondeurs 0→4, **22 pages à la profondeur 4** |

À la profondeur 4, les plus profondes du site : **`/vendre` et `/acheter`**, à
égalité avec les articles les plus minces du blog. Pourtant elles ne manquent pas
de liens — 10 et 8 liens éditoriaux entrants. **Le défaut n'est pas le nombre, c'est
la provenance** : leurs liens entrants viennent **uniquement d'articles de blog**,
eux-mêmes à la profondeur 3-4 parce que le `<main>` de la home ne lie pas `/blog`.

Cause unique, vérifiée lien par lien :

- **aucune** des 4 pages locales (`/agence-immobiliere-villeurbanne`,
  `-gratte-ciel`, `-charpennes`, `-cusset`) ne liait `/vendre` ni `/acheter` ;
- **ni `/vendre` ni `/acheter`** ne liait une seule page de quartier.

Les deux grappes parlaient des **mêmes quartiers** avec les **mêmes chiffres** et
s'ignoraient complètement : les pages locales publient la médiane €/m² du
quartier et « ce que coûte une vente ici », `/vendre` publie depuis le 30/09 le
net vendeur **par quartier**, `/acheter` depuis le 02/10 le budget total **par
quartier**.

#### Ce qui a été fait — 10 liens éditoriaux, chacun porté par un fait

Règle du 10/09 respectée : **un lien n'est posé que là où la phrase existante
l'appelait déjà**, et chaque lien ajoute une donnée, jamais une formule de
renvoi seule.

**Des pages locales vers les pages commerciales (8 liens)**

- **→ `/vendre`** : chaque page locale publiait les honoraires « à la charge du
  vendeur » sans jamais dire ce que le vendeur **perçoit**. Le montant est
  désormais publié, calculé par la page elle-même depuis `lib/quartiers.ts` et
  `honorairesVente()` — **aucun chiffre en dur, donc aucune divergence possible
  avec `/vendre`** : commune **183 300 €**, Gratte-Ciel **224 145 €**,
  Charpennes **205 379 €**, Cusset **184 806 €**. Vérifié : ces quatre montants
  **égalent à l'euro** le tableau servi par `/vendre`.
- **→ `/acheter`** : les sections « Quelle surface peut-on acheter ? » traduisaient
  un budget en m² **en assimilant le budget au prix du bien**. C'est faux depuis
  le 02/10, qui a établi que les frais d'acquisition (**7,49 % à 7,72 %**) s'y
  ajoutent et ne sont généralement pas financés par le prêt. La clarification est
  publiée, et c'est elle qui porte le lien — **ce n'est donc pas un lien
  décoratif mais la correction d'une imprécision inter-pages**.

**Des pages commerciales vers les pages locales (2 liens)**

Sous le tableau par quartier de `/vendre` et celui de `/acheter`, les trois
quartiers qui ont leur propre page de marché sont désormais nommés et liés.

**Effet mesuré** : `/vendre` et `/acheter` passent de la profondeur éditoriale
**4 à 3**, et reçoivent des liens des pages **topiquement les plus proches** du
site au lieu des seuls articles de blog.

#### Au passage — 20 mots collés, visibles en production, une seule cause

Le contrôle du rendu (et non du code) a exposé une classe de défaut **jamais
cherchée en 20 runs** : du texte visible sans espace, sur **8 pages**.
« 1 875ventes, base DVF », « un appartement de 62m² vendu », « le prix, plus
14 712 €de taxes », « — soit +7,8 %par rapport à la médiane », « en 2025dans la
base DVF », « Métropole de Lyon.Médianes, jamais des moyennes ».

Une seule cause, désormais consignée en « Techniques apprises » : **un nœud de
texte JSX qui commence par une espace juste après une expression `{…}` et se
poursuit à la ligne suivante perd cette espace au rendu** (JSX découpe le nœud
par lignes, retire l'espace de tête de la première). Correctif : `{" "}`
explicite, l'idiome déjà employé partout ailleurs dans le projet.

**15 corrections en source → 20 occurrences corrigées** (une seule dans
`components/seo/quartier-prix.tsx` en couvre 4, la note de source étant partagée
par les 3 pages de quartier et `/estimation`). **Vérifié sur le HTML rendu après
rebuild : 0 occurrence restante** sur les 9 pages concernées — ne restent que les
deux `0M€` de la home et de `/recrutement`, qui sont l'état initial des compteurs
animés, pas un défaut.

#### Deux petits correctifs tirés de l'audit

- **Le `<title>` de la page 404 doublait la marque** : « Page introuvable —
  Markus Immobilier · Markus Immobilier ». Exactement le défaut corrigé le 01/10
  sur cinq pages ; **cette page-ci y avait échappé parce qu'elle n'est pas dans
  le sitemap**, donc absente de l'audit des 53 pages. → « Page introuvable ».
- **`llms.txt` ne listait pas `/blog`** alors qu'il liste les 26 articles. Index
  ajouté, dérivé de `ARTICLES.length`. Les 3 pages légales restent volontairement
  absentes (sans valeur pour une citation) ; `/recrutement` aussi.

#### Dates de fraîcheur — ce qui a bougé et ce qui n'a PAS bougé

La règle de `lib/seo/lastmod.ts` est explicite : « un lien ajouté ne la bouge
pas ». Appliquée à la lettre :

- **Avancées au 2026-10-04** : les **4 pages locales** — elles publient de
  nouveaux chiffres (le net vendeur) et une correction de fond (prix ≠ budget).
- **PAS avancées** : **`/vendre` (30/09) et `/acheter` (02/10)** — elles ne
  gagnent qu'une phrase de renvoi. Avancer leur date aurait été le « défaut
  coûteux » que le fichier décrit lui-même.

#### Contrôles avant push

`npx tsc --noEmit` et `eslint` propres ; `npm run build` à 0 ; serveur de
production local relancé et les 9 pages concernées relues **sur le HTML rendu** :
4 montants nets exacts à l'euro, 10 liens éditoriaux bien dans le `<main>`,
**FAQ visible strictement identique au `FAQPage`** sur les 6 pages touchées
(6+6+6+5+5+5 Q/R), 0 mot collé restant, sitemap limité aux 4 `lastmod` attendus.
⚠️ **Le sitemap local rend 51 URLs et non 53** : les deux annonces publiées
depuis le back-office vivent en base Supabase, inaccessible depuis ce conteneur.
Diff fait avec le sitemap de production — **les deux manquantes sont exactement
ces deux annonces, aucune autre différence**. Ce n'est donc pas une régression,
et il faut le savoir pour ne pas s'en alarmer au prochain run.

#### ✅ Vérifié SERVI EN PRODUCTION le 04/10 (déployé ~90 s après le push)

Contrairement à l'usage (la vérification tombait d'habitude au run suivant), le
chantier a été relu **sur les pages servies**, après déploiement :

- **4 montants nets exacts** : 183 300 € (commune), 224 145 € (Gratte-Ciel),
  205 379 € (Charpennes), 184 806 € (Cusset) — **égaux à l'euro** au tableau
  de `/vendre`.
- **10 liens éditoriaux bien dans le `<main>`** des 6 pages, dans les deux sens.
- **0 mot collé restant** sur les 9 pages concernées (ne subsistent que les deux
  `0M€`, état initial des compteurs animés de la home et de `/recrutement`).
- **FAQ visible strictement identique au `FAQPage`** sur les 6 pages touchées
  (6 + 6 + 6 + 5 + 5 + 5 Q/R).
- **404** : code 404, `noindex`, titre « Page introuvable · Markus Immobilier » —
  la marque n'est plus doublée.
- **`llms.txt`** : l'index `/blog` est publié ; 49 URLs (47 avant).
- **`sitemap.xml` : 53 URLs**, et **exactement 4 `lastmod` au 2026-10-04** — les
  4 pages locales. `/vendre` reste au 30/09 et `/acheter` au 02/10, comme voulu.

**Décidé de NE PAS faire, et pourquoi :**

- **Ajouter un lien vers `/blog`, `/vendre` ou `/acheter` dans le `<main>` de la
  home.** C'est **la** correction qui remettrait tout le site à la profondeur
  éditoriale 2, et c'est la plus tentante. Refusée : `CLAUDE.md` déclare l'ordre
  des sections de la home « EXACT, non négociable » et la maquette est validée
  par le client. Toucher au rendu de la home n'est pas une décision de run
  automatique. → **Inscrit en « Hypothèses à vérifier », à soumettre au client**,
  avec la mesure à l'appui : le `<main>` de la home dépense ses 11 liens
  éditoriaux sur 6 annonces individuelles, `/equipe` et `/recrutement`, et aucun
  sur `/vendre`, `/acheter` ou `/blog`.
- **Retirer `/espace-client` du `disallow` de `robots.txt` pour lui poser un
  `noindex`.** Revérifié aujourd'hui et le constat du 10/09 **tient** : la page
  rend **200**, **aucune balise `robots`**, elle est `disallow` et elle est liée
  depuis le header **des 53 pages** (icône 👤) — donc indexable « en URL seule »,
  et son `noindex` ne pourra jamais être lu. `/signin` porte le gabarit correct
  (`noindex` + pas de `disallow`) et son commentaire explique déjà pourquoi.
  **Toujours pas fait** : ce serait ouvrir au crawl une page que le client a
  fermée. 🆕 **Mais une troisième voie existe et n'avait jamais été notée** :
  poser `rel="nofollow"` sur les deux liens 👤 du header supprime le signal de
  découverte **sans rien ouvrir au crawl**. Toujours un changement de header,
  donc à soumettre, mais c'est l'option la moins intrusive des trois.
- **Corriger les deux `<meta robots>` de la page 404** (`noindex` et
  `noindex, follow`) : non contradictoires, donc sans effet. Pré-existant.
- **Corriger le saut `h1` → `h3` de `/equipe`** (relevé le 30/09) : toujours sans
  conséquence SEO connue.
- **Remesurer « agence immobilière Charpennes Villeurbanne »** : requête de
  marque, retirée des cibles le 01/10.
- **Remesurer l'angle « apport »** : clos dans ses deux formulations (01 et 02/10).
- **Reprendre le chiffre « 3,85 % de taux de négociation médian »** vu le 02/10 :
  toujours non attribuable. Reste en « Hypothèses à vérifier ».

### 2026-10-02 — `/acheter` servait 278 mots : la dernière page commerciale d'origine publie désormais le budget TOTAL d'un achat villeurbannais, prix signé plus frais

**Pourquoi ce chantier, et pourquoi cet angle-là.** L'alternance voulait un run
de **contenu** (01/10 audit, 30/09 contenu, 29/09 contenu, 28/09 technique) et
le backlog désignait `/acheter` en candidat n°1 — **sous condition expresse de
mesurer d'abord la reformulation de son angle**, celle du 30/09 ayant été
invalidée le 01/10. La mesure a été faite, et elle a **aussi** invalidé la
reformulation : la requête « combien d'apport pour un T2 à Gratte-Ciel » rend
**neuf portails d'annonces**, intention transactionnelle, zéro éditorial. Deux
formulations mesurées, deux refus : **l'angle « apport » est clos.**

Ce qui a décidé le chantier est **un critère GEO, pas un espoir de position** :
sur cette même requête, le résumé du moteur **admet lui-même qu'aucun résultat
ne donne le montant** et retombe sur des fourchettes nationales. Une question
dont le moteur n'a pas de source est une place vide pour la citation, même
quand la SERP est imprenable — et le site est, à notre connaissance, le seul à
pouvoir **additionner** un prix réellement signé à Villeurbanne et les frais
d'acquisition calculés à l'euro près. C'est cette addition, et rien d'autre,
que publie la page.

**L'état mesuré avant.** Page servie en production ce matin : **278 mots**,
5 H2 dont **aucun ne pose de question**, **aucune FAQ**, **aucun chiffre**,
**aucune date**, JSON-LD limité à `Service` + `BreadcrumbList`. C'était la
dernière page commerciale du site restée au niveau de rédaction d'origine —
`/vendre` avait été traitée le 30/09 (306 → 2 285 mots).

**Ce qui est publié.** 278 → **1 741 mots**, 5 H2 **tous formulés comme des
questions** et **tous ouverts par une réponse directe autonome** :

- *Combien faut-il prévoir en tout pour acheter un appartement à Villeurbanne ?*
  → **209 712 €** au prix médian de 195 000 €. Tableau du **budget total par
  typologie** : T1 115 000 + 8 876 = **123 876 €** ; T2 170 000 + 12 889 =
  **182 889 €** ; T3 226 250 + 16 992 = **243 242 €** ; T4 255 000 + 19 090 =
  **274 090 €**, avec la part des frais en %, **dégressive de 7,72 % à 7,49 %**.
  Puis l'amplitude par quartier à surface égale : **182 627 € à 261 457 €** pour
  un 62 m², **78 830 € d'écart**.
- *Le prix affiché est-il le prix auquel on signe à Villeurbanne ?* → non, de
  **16,1 % à 45,3 %** d'écart (mesure du 27/09), **4 380 €/m² annoncés contre
  3 567 €/m² signés** sur la commune.
- *Qu'est-ce que la banque ne finance pas dans un achat immobilier ?* → les
  frais d'acquisition, **12 871 € à 18 231 €** sur un 62 m². Avec l'économie du
  primo-accédant (**869 € à 1 245 €**).
- *Combien de temps entre l'offre acceptée et la remise des clés ?* → deux à
  trois mois, rétractation de 10 jours au seul bénéfice de l'acquéreur.
- *Qu'est-ce qu'une agence locale change pour un acheteur ?* → **pas une ligne
  du total : l'acheteur ne nous paie pas** (honoraires à la charge du vendeur).

**FAQ de 6 Q/R visible, balisée `FAQPage`, correspondance vérifiée sur le HTML
rendu** (6 questions et 6 réponses strictement identiques, espaces insécables
normalisés avant comparaison). JSON-LD passé de 2 à 4 blocs utiles :
`WebPage` (avec `dateModified` au 02/10), `Service`, `FAQPage`,
`BreadcrumbList`. « Dernière mise à jour : 2 octobre 2026 » visible en tête.

**Ce qui a été refusé, et c'est le point le plus important de ce chantier.**

1. **Aucun taux d'apport bancaire n'est publié, et la page le dit
   explicitement.** C'est une politique d'établissement, pas une règle ; nous
   ne l'avons pas mesurée. La page écrit : « Nous ne publions pas de taux
   d'apport, et c'est délibéré : il n'en existe pas de règle. » **C'est
   précisément la question que la SERP montre sans réponse** — y répondre par
   un chiffre inventé aurait été le plus court chemin vers la citation, et le
   plus malhonnête.
2. **Les frais ne sont PAS recalculés ici.** Les montants sont **repris tels
   quels** de `/blog/frais-de-notaire-lyon-2026` (calcul du 29/09). Deux calculs
   indépendants finiraient par diverger d'un euro et la page contredirait
   l'article. **Seule l'addition prix + frais est faite sur place** — elle ne
   peut pas diverger. Consigné en commentaire en tête de fichier.
3. **Le 3,85 % de « marge de négociation » vu dans un résumé de moteur n'est pas
   repris** : non attribuable aux résultats rendus.
4. **Aucun délai de vente « observé » n'est avancé**, même règle que `/vendre`.

**Partage du sujet, écrit en tête de fichier pour que le prochain run ne le
rouvre pas** : `/blog/frais-de-notaire-lyon-2026` = le calcul des frais ·
`/blog/investir-locatif-lyon` = la mesure affiché/signé ·
`/blog/prix-immobilier-villeurbanne-2026` = les médianes ·
`/blog/ou-acheter-villeurbanne-quartiers` = quel quartier pour quel budget ·
`/blog/capacite-emprunt-immobilier` = combien la banque prête ·
**`/acheter` = la somme à réunir en tout, et ce que le prêt ne couvre pas.**
Chaque voisine reçoit un lien depuis la section qui effleure son sujet
(9 liens internes sortants posés, contre 1 avant).

**`llms.txt` : la ligne `/acheter` passe du stub d'une ligne (« recherche et
achat de biens à Lyon et Villeurbanne ») à une entrée dense** sur le modèle de
`/vendre` : les 4 budgets par typologie, l'amplitude par quartier, et les cinq
points qu'aucune autre page ne porte (prix affiché ≠ prix signé ; frais non
finançables ; aucun taux d'apport publié et pourquoi ; économie primo-accédant ;
l'acheteur ne paie aucun honoraire).

**Contrôle avant push** : `tsc --noEmit` propre, `eslint` propre sur les trois
fichiers, `next build` complet, puis **page servie et relue sur un serveur de
production local** (`next start`) — mots, H2, JSON-LD, FAQ, date, séparateurs
décimaux français (le défaut du 30/09 sur `/vendre` : React rend « 7.49 » si on
interpole un flottant brut ; tous les nombres passent par un formateur).
Sitemap local : **seule la ligne `/acheter` bouge** (`lastmod` 2026-10-02), les
51 autres sont inchangées (51 et non 53 en local : les deux annonces publiées
via Supabase ne sont pas accessibles sans identifiants dans le conteneur —
différence d'environnement, pas régression).

**Fichiers touchés** : `app/acheter/page.tsx`, `app/llms.txt/route.ts`,
`lib/seo/lastmod.ts`. **Rien d'autre** — l'outil d'estimation n'est pas touché.

### 2026-10-01 — Le site ne disait pas quelle page répond à quoi : un `<h1>` servi sur deux pages, la collision de titre la plus forte du site, et cinq titres qui répétaient la marque

**Pourquoi ce chantier et pas un autre.** L'alternance voulait un run
**non-contenu** (30/09 contenu, 29/09 contenu, 28/09 technique), et la liste de
signaux du 20/09 était épuisée. Le 30/09 en avait proposé une nouvelle ; j'ai
ouvert ses deux premières pistes d'un coup, parce qu'elles se mesurent sur les
mêmes données : **(a) cohérence `<title>` ↔ `<h1>` ↔ intention** et
**(d) cannibalisation**. Mesure sur les **53 pages de production** téléchargées
ce matin : extraction du `<title>`, du ou des `<h1>`, de la
`<meta description>` et des H2 du `<main>`, puis comparaison des **1 378 paires**
de pages sur le recouvrement de vocabulaire significatif de `title`+`h1`
(indice de Jaccard, mots vides et marque retirés).

**Ce que la mesure a trouvé — et c'est la première fois qu'un audit de ce
journal trouve un défaut que les 53 pages portaient depuis l'origine.**

**1. `/acheter` et `/annonces` servaient le même `<h1>`, mot pour mot.**
« Trouvez votre prochain chez-vous. » sur les deux. Deux pages commerciales, le
même titre de page, donc aucun signal permettant de distinguer laquelle répond
à « acheter un appartement à Villeurbanne » et laquelle est le catalogue. Pour
un LLM c'est pire que pour Google : un passage extrait sous ce `<h1>` ne dit
même pas de quelle ville ni de quel type de page il vient.
→ `/acheter` : **« Acheter à Villeurbanne, sans surpayer. »**
→ `/annonces` : **« Nos biens à vendre et à louer à Villeurbanne et à Lyon. »**
Recouvrement de la paire : **0,67 → 0,30** (sous le seuil). Le composant et la
mise en forme (`grad-light` sur la fin de phrase) sont inchangés — seul le texte
bouge.

**2. La collision la plus forte du site : un article de 248 mots portait le
titre d'une page de service de 1 708 mots.**
`/blog/gestion-locative-villeurbanne-deleguer-ou-non` s'intitulait « Gestion
locative à Villeurbanne : déléguer ou gérer soi-même ? » — c'est-à-dire **la
question exacte** que `/gestion-locative` (« Déléguer sa gestion locative ou
gérer seul : le calcul à Villeurbanne », 6 H2 en questions, arbitrage chiffré
du 21/09) est construite pour répondre. Recouvrement **0,78, le maximum des
1 378 paires**. Le plus parlant : **l'article l'avouait lui-même** dans son
premier paragraphe (« pour l'arbitrage chiffré […] la page /gestion-locative le
détaille ») tout en gardant le titre de cette page.
→ L'article est **ré-angulé sur une question disjointe qu'il peut réellement
posséder** : **« Que fait une agence quand vous lui confiez la gestion
locative ? »** — le contenu du mandat, tâche par tâche. 248 → **923 mots**,
5 H2 tous formulés comme des questions parlées et tous ouverts par une réponse
directe autonome :
  - Que fait l'agence à votre place, précisément ? (les six familles de tâches)
  - Qu'est-ce qui reste au propriétaire, même en gestion déléguée ? (travaux,
    votes en AG, déclaration fiscale, assurance PNO)
  - Qui choisit le locataire, l'agence ou le propriétaire ?
  - La mise en location est-elle comprise dans les honoraires de gestion ?
    (non : **9 % du loyer annuel HC** côté propriétaire d'un côté, **6 % des
    encaissements** par lot, minimum 25 €, de l'autre — barème public)
  - Alors, faut-il déléguer ou gérer soi-même ? → **cette section renvoie
    explicitement la question à `/gestion-locative` et dit que c'est cette page
    qui la porte.** C'est ça, la résolution de la cannibalisation : une seule
    URL revendique la requête, l'autre la lui donne.
+ **FAQ de 3 Q/R, visible et balisée `FAQPage`** (vérifié : les trois questions
du JSON-LD sont exactement les trois affichées) : mise en location sans gestion,
qui choisit le locataire, état des lieux de sortie et restitution du dépôt de
garantie (délai légal 1 ou 2 mois, majoration de 10 % du loyer mensuel par mois
de retard entamé — article 22 de la loi du 6 juillet 1989, déjà cité sur
`/gestion-locative`).
+ **Un lien entrant depuis la page forte** : `/gestion-locative` pointe
désormais vers l'article depuis sa section « Peut-on déléguer une partie
seulement de la gestion ? », avec une ancre qui annonce la nouvelle promesse
(« ce que fait une agence quand vous lui confiez la gestion »). Hub → spoke,
avec des titres qui ne se concurrencent plus.
+ **Aucun chiffre de marché ajouté** — au contraire : la version précédente
affirmait « en général **6 à 8 %** des loyers encaissés » sans source. Cette
fourchette a **disparu**. L'article ne cite plus que le barème publié du client.
Recouvrement de la paire : **0,78 → 0,13**.

**3. Cinq `<title>` servaient « Markus Immobilier » deux fois.**
`app/layout.tsx` applique le gabarit `%s · Markus Immobilier`, et cinq pages
écrivaient déjà la marque dans leur propre `title` — d'où « Politique de
confidentialité — Markus Immobilier · Markus Immobilier » servi en production.
Corrigé sur les cinq, et pour deux d'entre elles la place libérée récupère une
**intention de requête** au lieu d'une marque répétée :
  - `/confidentialite` → « Politique de confidentialité »
  - `/cookies` → « Politique de cookies »
  - `/mentions-legales` → « Mentions légales »
  - `/equipe` → « Notre équipe — **agence immobilière à Villeurbanne** »
  - `/recrutement` → « Recrutement — **devenir agent immobilier à Villeurbanne** »
Les `og:title` / `twitter:title` de ces pages sont **volontairement laissés tels
quels** : ils ne passent pas par le gabarit (vérifié sur le HTML servi) et une
seule mention de marque y est correcte pour un partage social.

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**
- **Les 32 `<title>` de plus de 70 caractères** (jusqu'à 114 sur une fiche bien)
  sont mesurés mais **non touchés** : 32 pages qui fonctionnent, pour un gain
  non mesurable depuis ce conteneur, et plusieurs de ces titres longs portent
  justement la donnée différenciante publiée les jours précédents (« le calcul
  exact », « mesuré sur 1 875 ventes », « quartier par quartier »). Raccourcir,
  ce serait rendre les titres plus courts **et** plus banals.
- **`/blog/cout-gestion-locative`** (276 mots, « Gestion locative : combien ça
  coûte vraiment ? ») : recouvrement mesuré **sous le seuil** avec
  `/gestion-locative`, et son contenu est le seul endroit du site qui détaille
  les deux frais fixes (20 €/an, 45 €/lot/an). Il chevauche en revanche une H2
  de `/faire-gerer`. **Non touché aujourd'hui** — un seul chantier, et celui-là
  demande de décider qui porte « combien coûte la gestion locative », ce qui est
  un arbitrage, pas une correction. Inscrit au backlog.
- **Les trois pages estimation** (`/estimation`, `/estimation-immobiliere-lyon`,
  `/estimation-immobiliere-villeurbanne`) ont un recouvrement de **0,67** entre
  les deux pages de ville et **0,40** avec la page outil. Mesuré, **non touché** :
  ces pages ont été créées exprès le 08/09 pour deux villes différentes, leurs
  `<h1>` et leurs descriptions **sont** distincts (Lyon vs Villeurbanne, avec la
  médiane DVF villeurbannaise sur l'une), et le recouvrement vient des mots
  « estimation immobilière gratuite en 2 min » qui sont la promesse commune.
  Ce n'est pas la même situation que le cas n°2 : là, deux URLs visaient la même
  requête sur la même ville. Ici, deux villes, deux requêtes.

**Contrôles avant push.**
- `npx tsc --noEmit` : **aucune erreur**.
- `npx eslint` sur les 9 fichiers touchés : sortie **identique au `md5sum` près**
  à celle de `main` avant modification (5 erreurs `no-html-link-for-pages`
  préexistantes, sur des lignes que je n'ai pas touchées). **Rien d'ajouté.**
- `npm run build` : réussi, aucune route perdue.
- **Vérifié sur le HTML RENDU par `next start`** (règle du 18/09), pas sur le
  source : les 14 pages concernées rendent HTTP 200, les 5 `<title>` ne portent
  plus qu'une fois la marque, les deux `<h1>` sont distincts, l'article rend
  **923 mots**, **zéro markdown brut** (`**` ou `](/` visibles : aucun — règle
  du 22/09), `BlogPosting` avec `dateModified: 2026-10-01`, `FAQPage` dont les
  3 questions **correspondent exactement** aux 3 affichées, et `/gestion-locative`
  passe de 1 708 à 1 732 mots (la seule phrase ajoutée) avec ses 7 H2 intacts.
- `sitemap.xml` local = **51 URLs** au lieu de 53 : l'écart est **exactement** les
  deux annonces publiées via Supabase (`appartement-t3-bis-86m-grand-balcon`,
  `garage-ferme-en-sous-sol-cusset`), absentes faute d'accès à la base depuis le
  conteneur. **Ce n'est pas une régression** — vérifié par diff des deux listes.
  Le `lastmod` de l'article ré-angulé passe bien au **2026-10-01**.
- `llms.txt` : il dérive de `ARTICLES`, donc le nouveau titre et le nouvel
  `excerpt` y sont **automatiquement** à jour (vérifié sur la sortie servie).
  Aucune ancre codée en dur ne pointait vers l'ancien titre : les trois liens
  entrants étaient des cartes « articles liés » construites depuis `a.title`,
  elles affichent déjà le nouveau.

### 2026-09-30 — `/vendre` cesse de parler du prix d'affichage et publie ce qu'il reste au vendeur, quartier par quartier (306 → 2 285 mots)

**Pourquoi cette page et pas une autre.** L'étape 2 a mesuré deux choses le
même matin : la requête `vendre appartement Villeurbanne agence` rend **dix
résultats, aucun de nous**, et la page qui la vise sert **306 mots**. Sur les
53 pages du site, `/vendre` et `/acheter` sont les deux seules pages
commerciales restées au niveau de rédaction d'origine, alors que leurs
jumelles côté bailleur — `/faire-gerer` (1 913 mots) et `/gestion-locative`
(1 860) — ont été traitées les 18 et 21/09. **Le côté vendeur du site n'avait
jamais été travaillé.**

**Pourquoi c'est un run de contenu alors que le 29/09 en était un.** La règle
d'alternance désignait un run non-contenu, et son candidat était l'audit des
ancres de liens internes. **Cet audit a été fait en premier, et il est revenu
sain** (voir « État des lieux ») : un seul défaut, d'une ligne, corrigé en
passant. Il n'y avait donc pas de chantier technique à mener — en fabriquer un
aurait été cocher une case. Le chantier est allé là où la mesure du jour
désignait un trou.

**L'angle, et pourquoi il ne double aucune page existante.** Trois pages
parlent déjà d'argent au vendeur, et le partage est maintenant écrit en tête
du fichier `app/vendre/page.tsx` :

| Page | Traite |
|---|---|
| `/honoraires` | le barème lui-même (page canonique) |
| `/agence-immobiliere-villeurbanne` | « combien coûte une agence pour vendre » (H2 existant) |
| `/estimation-immobiliere-villeurbanne` | à quel prix vendre |
| **`/vendre` (ici)** | **ce qui se retranche du prix, et ce qu'il reste à l'arrivée** |

Les honoraires ne sont donc **ni réexpliqués ni rejustifiés** ici : ils sont
une ligne du décompte, chiffrée puis renvoyée à `/honoraires`. C'est la même
doctrine que le partage `/faire-gerer` ↔ `/gestion-locative` du 21/09.

**Ce qui est publié, et qui ne l'est nulle part ailleurs.**

1. **Le décompte au prix médian réellement signé.** 195 000 € (prix médian des
   ventes d'appartements DVF 2025 à Villeurbanne) → 11 700 € d'honoraires
   (6 %) → **183 300 € perçus** avant remboursement de crédit. Et la
   rectification de la confusion la plus fréquente : **les frais de notaire
   sont payés par l'acheteur**, pas par le vendeur.
2. **Le tableau des 7 quartiers** sur un appartement de 62 m² (surface médiane
   DVF 2025) vendu au prix médian de son secteur, avec prix, honoraires, **taux
   effectif** et net vendeur — de 243 226 € à Ferrandière – Maisons-Neuves à
   169 756 € à Cyprian – Les Brosses. **Trouvaille du calcul** :
   Cyprian – Les Brosses est **le seul quartier de Villeurbanne** où le prix
   médian à cette surface passe sous 170 000 €, la tranche où le barème est
   forfaitaire ; le taux effectif y tombe à **5,30 %** contre **6,00 %** dans
   les six autres. Publié tel quel, sans commentaire éditorial : c'est une
   lecture directe d'un barème déjà public.
3. **La plus-value ancrée localement.** Exonération totale de la résidence
   principale — donc la majorité des vendeurs ne paient rien. Et le fait que
   **personne ne publie** : le prix médian au m² villeurbannais étant
   **inférieur de 10,4 % à son niveau de 2022**, un propriétaire qui a acheté
   en 2022 et revend aujourd'hui au prix médian de son quartier **ne dégage
   aucune plus-value imposable**. Le recul va de 2,0 % (Ferrandière) à 13,2 %
   (Charpennes). Ce n'est pas une bonne nouvelle pour lui — il vend moins cher
   — mais c'est une ligne d'impôt en moins, et aucun concurrent ne le dit.
4. **L'indemnité de remboursement anticipé**, ses deux plafonds (6 mois
   d'intérêts sur le capital remboursé **et** 3 % du capital restant dû) et
   surtout **les trois situations qui l'annulent** quand la vente en est la
   cause : changement de lieu de travail, cessation forcée d'activité, décès —
   du vendeur ou de son conjoint. C'est exactement la situation d'un vendeur,
   et ce n'est presque jamais écrit sur une page d'agence.
5. **Le moment où le vendeur touche l'argent** : à l'acte authentique, pas au
   compromis ; et l'asymétrie du délai de rétractation, qui ne bénéficie
   **qu'à l'acheteur**.

**Sources, relues de première main le 30/09.** `service-public.fr` fiche
**F10864** (plus-value : 19 % d'IR, 17,2 % de prélèvements sociaux, exonération
totale de la résidence principale, exonération d'IR à plus de 22 ans et de
prélèvements sociaux à plus de 30 ans, forfaits de 7,5 % de frais
d'acquisition et 15 % de travaux après 5 ans, surtaxe de 2 à 6 % au-delà de
50 000 €) et fiche **F1669** (remboursement anticipé). Les chiffres DVF et le
barème viennent de `lib/quartiers.ts` et de `honorairesVente()`, qui lit les
mêmes tranches que le tableau visible de `/honoraires` : **aucun chiffre en dur
sur la page**, donc aucune divergence possible.

**Ce qui a été volontairement NON publié, et pourquoi.**
- **Aucun délai de vente « observé à Villeurbanne ».** Personne ne l'a mesuré
  ici, et le client a explicitement refusé l'invention. Un H2 « dans quel
  quartier ça se vend le plus vite » était prévu : il a été remplacé par le
  volet calendrier, qui ne repose que sur du droit.
- **Aucun prix de diagnostic.** Il dépend du diagnostiqueur ; la page le dit
  au lieu de donner une fourchette qu'elle n'aurait pas relevée.
- **Aucun effet de seuil présenté comme un reproche au barème.** Le passage
  sous 170 000 € est publié comme un fait de lecture, pas comme une critique.

**Contrôle qualité avant push.**
- `npx tsc --noEmit` et `eslint` propres, `npm run build` réussi (85 pages).
- Le HTML **rendu** relu (règle du 18/09) : **2 285 mots**, 6 H2 **tous** en
  questions réelles, **aucun markdown brut**, FAQ de 6 Q/R **identique au
  `FAQPage`** (comparaison programmatique `<summary>` ↔ JSON-LD, égalité
  stricte), 5 JSON-LD (`WebPage` daté, `Service`, `FAQPage`, `BreadcrumbList`,
  `RealEstateAgent`).
- **Non-régression mesurée page par page** : les 51 pages du build local
  comparées en nombre de mots à leur version de production. **44 identiques au
  mot près.** Les 7 écarts sont tous expliqués : `/vendre` (+1 979, le
  chantier), `rentabilite-locative-lyon` (+89, le petit chantier),
  `/blog` et `plus-value-immobiliere-calcul` (+2 chacun, l'ancre et l'excerpt
  modifiés), et `home`, `annonces`, `equipe` (−50, −48, −2), écart connu et
  documenté depuis le 18/09 — les annonces et l'équipe vivent en base Supabase,
  absente du conteneur. **Aucune page voisine touchée.**
- `lastmod` de `/vendre` avancé au 2026-09-30 dans `PAGE_LASTMOD` (source
  unique du 24/09) : le sitemap local le sert bien.

**Petit chantier du jour, celui que le 29/09 avait désigné : fait, et par
l'option sûre.** `rentabilite-locative-lyon` présentait 7,5 % de frais de
notaire comme le « milieu de la fourchette de l'ancien », alors que le calcul
sourcé du 29/09 montre que taxes et émoluments **seuls** pèsent déjà 7,49 % à
7,72 % aux prix villeurbannais, débours non compris. Des deux options que le
backlog laissait ouvertes, **la seconde a été prise** : 7,5 % est requalifié en
**hypothèse volontairement basse**, la phrase renvoie au calcul poste par poste
de l'article du 29/09, et l'annonce de tête passe de « retire 0,31 à 0,45
point » à « retire **au moins** 0,31 à 0,45 point ». **Tous les autres chiffres
sont inchangés** — l'article n'est pas laissé dans un état mi-recalculé, ce que
le backlog interdisait explicitement. `updated` avancé au 2026-09-30.

**Troisième correctif, issu de l'audit des ancres.**
`plus-value-immobiliere-calcul` proposait en bas de page « Estimer la valeur de
mon bien » tout en pointant `/vendre`, exactement la même ancre que
`loi-carrez-surface` qui pointe `/estimation`. Seule ancre contradictoire du
site sur 421 liens. Le libellé devient « Savoir ce qu'il reste après la
vente », qui décrit la page atteinte — et qui la décrit d'autant mieux depuis
aujourd'hui. Audit rejoué sur le build local : **zéro ancre contradictoire**
hors « Voir le bien » des cartes d'annonces, laissée telle quelle (voir
« Hypothèses à vérifier »).

**`llms.txt`** : l'entrée `/vendre` décrivait encore la page d'avant
(« accompagnement à la vente d'un bien à Villeurbanne et Lyon »). Réécrite avec
le décompte, le seuil de 170 000 €, les deux sources juridiques et le fait
local sur 2022. Contrôle de routine, pas de temps de chantier (règle du 28/09).

**Fichiers touchés** : `app/vendre/page.tsx` (réécriture), `lib/blog.ts`
(requalification 7,5 % + ancre), `lib/seo/lastmod.ts`, `app/llms.txt/route.ts`.

---

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

**Angle du dernier run : NON-CONTENU — justesse juridique des trois dernières
entrées de `/llms.txt`** (20/10, `/gestion-locative`, `/faire-gerer`,
`/honoraires` : **six défauts**, dont une **règle abrogée au 1ᵉʳ juin 2020**
publiée comme en vigueur — la mise en concurrence du syndic « tous les trois
ans » —, une consigne qui faisait **réviser illégalement** le loyer d'un F ou G,
trois **références de texte fausses** (art. 21 au lieu de 23, CGI 31 I-1°-a au
lieu de e, « arrêté du 20 novembre 2025 » qui n'existe pas) et un **terme
d'option** faux. Plus deux places GEO prises : le second plafond de l'art. 5 de
la loi de 1989 et la sanction chiffrée du refus de quittance. **Candidat n°1
entièrement consommé.**)

→ 🔴 **L'ANGLE DU PROCHAIN RUN (21/10) DOIT ÊTRE DU CONTENU** (alternance :
18/10 non-contenu → 19/10 contenu → 20/10 non-contenu). **Candidats, par ordre
d'impact :**
  1. 🔴 **`/faire-gerer` et `/vendre`, les deux dernières pages de droit jamais
     revérifiées côté CONTENU.** ⚠️ **Attention au périmètre : le run du 20/10 a
     traité le DROIT DU SYNDIC de `/faire-gerer` (art. 21, décret 2015-342,
     dispense art. 25) — il n'a PAS touché au reste de la page**, ni au
     formulaire syndic multi-étapes, ni au droit de la copropriété au-delà de la
     mise en concurrence. Et `/vendre` reste **effleurée** : sa FAQ plus-value
     est juste et sourcée depuis le 19/10, mais **l'indemnité de remboursement
     anticipé, le prorata de taxe foncière, le délai de rétractation et la
     mainlevée d'hypothèque n'ont jamais été revérifiés**. **Prendre `/vendre`
     en premier** : c'est la page la plus commerciale des deux.
  2. ⚠️ **`comment-estimer-son-bien-immobilier-lyon-villeurbanne`** — toujours au
     backlog **avec son périmètre imposé du 11/10** : réécriture **procédurale**
     (méthode pas à pas, zéro nouveau tableau de marché) **ou** fusion. **Ne pas
     rouvrir l'angle « chiffres du marché », il est fermé par la mesure.**
  3. 🟢 **La place GEO la plus vide mesurée à ce jour, à garder pour un run de
     contenu** : sur « budget total achat … frais de notaire compris » (18/10),
     le résumé du moteur **avoue n'avoir aucune source faisant autorité**.
     `/acheter` est écrite pour cette place.

→ ⚠️ **REQUÊTES CIBLES — ce qui est dû le 21/10 : RIEN.** « Vendre appartement
Villeurbanne » vient d'être mesurée le 20/10 (deux par mois → **vers le 27/10**).
« Prix m2 Villeurbanne » est hebdomadaire, **échéance le 26/10**. 🔴 **Les deux
SERP gelées restent INTERDITES jusqu'au 23/10** (« agence immobilière
Villeurbanne », « estimation immobilière Villeurbanne »). **Mesurer une SERP de
chantier à la place** — la méthode du 15/10 est à **5 tests positifs sur 5**.

🆕 ⚠️ **PETIT CHANTIER NEUF, IDENTIFIÉ ET VOLONTAIREMENT NON FAIT LE 20/10 :
`/honoraires` ne sert AUCUN « Dernière mise à jour » visible.** Les deux autres
pages de fond du même triptyque en ont un (`/gestion-locative` via
`components/layout/seo-landing.tsx`, `/faire-gerer` en inline à sa ligne ~325).
**Non ajouté parce que `/honoraires` n'utilise ni l'un ni l'autre** : l'ajout
touche au rendu d'une mise en page que je n'avais pas lue, et la règle « en cas
de doute sur le rendu, ne le fais pas » s'applique. **À faire un jour de
non-contenu, en lisant d'abord la structure de la page.** *(Son `dateModified`
JSON-LD, lui, est bien au 2026-10-20.)*

🆕 🟢 **FAIT NEUF SUR LES CONCURRENTS, ET IL VA DANS LES DEUX SENS.**
Sur « vendre appartement Villeurbanne » (20/10), **`laforet.com` tient DEUX
positions avec du contenu éditorial** — premier concurrent agence à y parvenir
sur une requête cible. 🟢 **Mais ses deux pages sont périmées et le moteur le
dit lui-même** (« Villeurbanne en 2024 », transactions de **2019**). 📌 **C'est
la confirmation de la thèse de ce journal : sur ces SERP, la fraîcheur datée et
sourcée est le différenciateur, et elle n'est pas prise.**
→ ⚠️ **Et un signal à SURVEILLER, pas à exploiter** : `pap.fr` publie
**3 623 €/m² (+1,6 %)** et `blog.qoridor.fr` **3 506 €/m² (−1,7 %)** le 19/10,
alors que tout ce qui a été relevé du 27/09 au 18/10 était **16 à 45 %**
au-dessus de notre médiane DVF signée. **Deux mesures ne font pas une tendance**
(règle du 14/10) : **ne RIEN réécrire sur la thèse « affiché ≠ signé » avant une
troisième mesure concordante.**

🆕 🔴 **FAIT NEUF À SURVEILLER, ET IL TOUCHE NOTRE AVANTAGE — `blog.qoridor.fr`.**
*(Inchangé depuis le 19/10, et toujours à faire.)* Relevé deux fois sur « prix m2
Villeurbanne », il publie du **DVF par quartier** (3 506 €/m² commune,
4 096 €/m² Charpennes). **C'est le premier concurrent mesuré qui publie des prix
SIGNÉS par quartier.** → ⚠️ **À faire un jour de non-contenu** : lire une de ses
pages de quartier et établir **ce que nous publions qu'il ne publie pas**
(surface médiane, nombre de ventes, seuils fiscaux dérivés, écarts 2022, droit
sourcé au paragraphe). **Ne RIEN réécrire sur la foi d'un seul relevé.**

🟢 **CANDIDAT NON-CONTENU ENCORE OUVERT POUR PLUS TARD — la parité des valeurs
RNIC entre pages** (`2 065`, `79 797`, `165 101`, `1 597`, `1 744`, `84,5 %`).
`1 744` et `84,5 %` vivent sur **deux** pages (`charges-copropriete` et
`dpe-2026-ce-qui-change`) : toute modification doit toucher les deux. **Aucun
défaut connu dessus** — prévention, pas correction en attente.

🆕 🔴 **CANDIDAT NON-CONTENU N°1 POUR LE PROCHAIN RUN NON-CONTENU (22/10) — LE
CONTRÔLE « RÈGLE ABROGÉE », PASSÉ SUR TOUT LE CORPUS.** Le 17/10 a trouvé une
loi réécrite (art. 121 de la LF 2026), le 20/10 une périodicité abrogée depuis
six ans. **Deux fois en quatre runs : ce n'est plus un accident, et aucun
contrôle de ce journal ne cherche ça systématiquement.** Le détecteur est en
« Techniques apprises » du 20/10. ⚠️ **Et il ne se confond pas avec le contrôle
du 19/10** : celui-ci demande « la source dit-elle ce que la page affirme ? »,
celui-là demande « **la source citée est-elle encore en vigueur, et dans la
version que la page décrit ?** ». **Les dates de « vérifié le » des fiches
service-public et les « Version en vigueur du … à aujourd'hui » du BOFiP sont
les deux marqueurs à lire en premier.**

**Angle du dernier run : CONTENU — justesse juridique de périmètre** (19/10,
`plus-value-immobiliere-calcul` : tous les taux justes et inchangés, mais une
affirmation franchement fausse — « le vendeur n'a pas de démarche séparée à
faire », quand la case 3VZ de la 2042-C est obligatoire —, l'exonération de
résidence principale refusée à qui a déménagé alors que le BOFiP prévoit six
assouplissements, les dépendances données exonérées sans leurs deux conditions,
et l'exonération de la première cession d'un logement autre que la RP
entièrement absente du `<h2>` qui pose sa question. Plus la place GEO
« 17,2 % ou 18,6 % » prise avec la brochure DGFiP. 2 414 → 4 364 mots, et la
parité traitée sur les 4 emplacements de l'affirmation).

→ 🔴 **L'ANGLE DU PROCHAIN RUN (20/10) DOIT ÊTRE NON-CONTENU** (alternance :
17/10 contenu → 18/10 non-contenu → 19/10 contenu). **Candidats, par ordre
d'impact :**
  1. 🔴 **LA JUSTESSE JURIDIQUE DE CE QUE `/llms.txt` RECOPIE — et il en reste
     TROIS entrées sur quatre.** C'était le candidat non-contenu n°1 désigné le
     18/10 ; **le run du 19/10 en a fait UNE au passage** (l'entrée `/vendre`,
     dont le droit sur la plus-value est maintenant juste, sourcé au § de BOFiP
     et aligné sur la page). ⚠️ **Restent `/gestion-locative`, `/faire-gerer` et
     `/honoraires`** : des dizaines d'articles de loi, seuils et références
     `F…`/`BOI-…`/`CGI art…` que **l'audit du 18/10 n'a PAS vérifiés** (il n'a
     vérifié que les nombres). **Le travail est cadré et la méthode est
     éprouvée** : pour chaque règle citée, ouvrir la source **en vigueur**,
     vérifier le PÉRIMÈTRE (« qui est soumis à », « à condition que ») autant
     que le chiffre, et vérifier que la page décrite dit la même chose.
  2. ⚠️ **Le contrôle « la source citée dit-elle ce que la page affirme ? »,
     passé sur tout le corpus.** 🆕 **C'est un candidat NEUF, né du défaut n°1
     du 19/10** : la fiche F10864 citée par la page disait le contraire de ce
     que la page affirmait. **Aucun contrôle de ce journal ne cherchait ça.** Le
     détecteur est en « Techniques apprises » du 19/10 ; il se cadre en une
     commande (lister toutes les lignes « Source : … » et, pour chacune, relire
     la source et confronter la phrase qu'elle est censée appuyer). **Peu de
     pages, fort rendement attendu.**
  3. 🟢 **La parité des valeurs RNIC entre pages** (`2 065`, `79 797`,
     `165 101`, `1 597`, `1 744`, `84,5 %`) — inchangé : `1 744` et `84,5 %`
     vivent sur **deux** pages. **Aucun défaut connu dessus** : prévention.

→ ⚠️ **REQUÊTES CIBLES — ce qui est dû le 20/10 :** « vendre appartement
Villeurbanne » (deux mesures par mois, dernière le 13/10) est **due**.
« Prix m2 Villeurbanne » vient d'être mesurée le 19/10, **prochaine échéance le
26/10**. 🔴 **Les deux SERP gelées restent INTERDITES jusqu'au 23/10**
(« agence immobilière Villeurbanne », « estimation immobilière Villeurbanne »).

🆕 🔴 **FAIT NEUF À SURVEILLER, ET IL TOUCHE NOTRE AVANTAGE — `blog.qoridor.fr`.**
Relevé pour la première fois le 19/10 sur « prix m2 Villeurbanne », **deux fois
dans la SERP** (page commune + **page de quartier Charpennes**). Il publie du
**DVF par quartier** : 3 506 €/m² pour la commune « juillet 2026, 1 678
transactions notariales », 4 096 €/m² pour Charpennes « au 1er juillet 2026 ».
📌 **C'est le premier concurrent mesuré qui publie des prix SIGNÉS par quartier,
et non des prix affichés** — son chiffre communal est à **−1,7 %** de notre
médiane DVF 2025 (3 567 €/m²), là où toutes les sources relevées depuis le 27/09
étaient 16 à 45 % au-dessus. **La thèse « affiché ≠ signé » reste vraie, mais
elle ne suffira plus à nous distinguer de CELUI-LÀ.**
→ ⚠️ **À faire un jour de non-contenu, et PAS aujourd'hui** : lire une de ses
pages de quartier et établir **ce que nous publions qu'il ne publie pas**
(surface médiane, nombre de ventes par quartier, seuils fiscaux dérivés, écarts
2022, droit sourcé au paragraphe). **Ne RIEN réécrire sur la foi de ce seul
relevé** — une mesure n'est pas une tendance, et la règle du 14/10 vaut aussi
pour les concurrents.

✅ **CANDIDAT CONTENU N°1 CONSOMMÉ POUR UN TIERS LE 19/10 — la liste des pages
de droit jamais revérifiées avance.** `plus-value-immobiliere-calcul` est faite
(4 défauts de périmètre, dont une affirmation fausse). **Restent `/faire-gerer`
et `/vendre`**, dans cet ordre : `/faire-gerer` porte le formulaire syndic et du
droit de la copropriété jamais relu ; `/vendre` a été **effleurée** aujourd'hui
(sa FAQ plus-value est juste et sourcée) mais **le reste de sa page de droit n'a
pas été revérifié** — indemnité de remboursement anticipé, prorata de taxe
foncière, délai de rétractation, mainlevée d'hypothèque. ⚠️ **Ne pas la
considérer comme faite.**

⚠️ **TOUJOURS AU BACKLOG, inchangé et avec son périmètre imposé du 11/10** :
`comment-estimer-son-bien-immobilier-lyon-villeurbanne` — réécriture
**procédurale** (méthode pas à pas, zéro nouveau tableau de marché) **ou**
fusion. **Ne pas rouvrir l'angle « chiffres du marché », il est fermé par la
mesure.**

🟢 **LA PISTE GEO DU 18/10 EST TOUJOURS OUVERTE ET ELLE VIENT D'ÊTRE VALIDÉE UNE
FOIS DE PLUS.** Le 18/10 notait que, sur « budget total achat … frais de notaire
compris », le moteur **avouait n'avoir aucune source faisant autorité**. Le 19/10
a trouvé la même configuration sur « 17,2 % ou 18,6 % » : **les seules sources
sont des blogs, et aucune ne cite le texte officiel.** 📌 **Le motif se répète
assez pour devenir une méthode de choix de sujet : chercher les questions 2026
où les sources se contredisent et où personne ne cite le texte de première
main.** C'est là que la justesse sourcée paye, et ce sont des SERP sans aucune
agence immobilière (corollaire confirmé 5 fois sur 5).

**Angle du dernier run : NON-CONTENU — audit des chiffres écrits à la main dans
`/llms.txt`** (18/10, les 157 montants des 10 entrées de pages confrontés un par
un à la page RENDUE qu'ils décrivent : 2 écarts, dont un défaut réel créé la
veille par la correction du 17/10 — `app/acheter/page.tsx` figeait
`FRAIS_62_MAX = 18 231` et servait 261 457 € / 78 830 € quand `/llms.txt` et
l'article servaient 18 230 / 261 456 / 78 829. Complément mené : la
reproductibilité des arrondis sur `investir-locatif-lyon`, 1 défaut de BASE
corrigé. **157/157 vérifiés en production après déploiement.**)

→ 🔴 **LE PROCHAIN RUN (19/10) EST UN LUNDI : LA VEILLE PASSE AVANT LE CHOIX DU
CHANTIER** (dernière veille le 12/10 — une semaine). ⚠️ **Et « prix m2
Villeurbanne » est DUE** (hebdomadaire, dernière mesure le 12/10) : c'est la
**seule** requête cible en échéance. **Les deux SERP gelées restent interdites
jusqu'au 23/10.**

→ 🔴 **ET L'ANGLE DU PROCHAIN RUN DOIT ÊTRE DU CONTENU** (alternance : 16/10
non-contenu → 17/10 contenu → 18/10 non-contenu). **Candidats, par ordre
d'impact :**
  1. 🔴 **`/faire-gerer`, `plus-value-immobiliere-calcul`, `/vendre`** — pages de
     droit **jamais revérifiées**, inchangé depuis le 16/10. ⚠️ **Prendre
     `plus-value-immobiliere-calcul` en premier** : c'est la seule des trois dont
     `/llms.txt` recopie le droit **en détail** (l'entrée `/vendre` publie les
     19 %, 17,2 %, la surtaxe de 2 à 6 %, les forfaits 7,5 % et 15 %, les seuils
     de 22 et 30 ans et la source `F10864`), **et l'audit du 18/10 n'a vérifié
     que les NOMBRES, pas la justesse juridique de ces règles.**
  2. ⚠️ **`comment-estimer-son-bien-immobilier-lyon-villeurbanne`** reste au
     backlog **avec son périmètre imposé du 11/10** : réécriture **procédurale**
     (méthode pas à pas, zéro nouveau tableau de marché) **ou** fusion. **Ne pas
     rouvrir l'angle « chiffres du marché », il est fermé par la mesure.**
  3. 🟢 **Piste GEO ouverte par la SERP du 18/10, à garder pour un run de
     contenu** : sur « budget total achat … frais de notaire compris », le résumé
     du moteur **avoue n'avoir aucune source faisant autorité** et renvoie à « un
     notaire ou un courtier ». `/acheter` est écrite pour cette place. **Ne RIEN
     réécrire sur la foi de ce seul constat** — mais si un run de contenu cherche
     où porter l'effort, c'est la place la plus vide mesurée à ce jour.

✅ **CANDIDAT NON-CONTENU N°1 CONSOMMÉ LE 18/10 — l'audit des chiffres manuels de
`/llms.txt` est passé sur les 157 montants des 10 entrées de pages. NE PAS LE
REPRENDRE À L'IDENTIQUE.** Le détecteur rejouable est en « Techniques apprises »
du 18/10 ; il se **rejoue en une commande** et il faut le rejouer **chaque fois
qu'un run corrige un montant publié** (c'est précisément ce qui a manqué le
17/10). ⚠️ **Ce qui n'est PAS couvert et reste ouvert** : la **justesse
juridique** des règles que `/llms.txt` recopie (les dizaines d'articles de loi,
seuils et références `F…`/`BOI-…` des entrées `/vendre`, `/gestion-locative`,
`/faire-gerer`, `/honoraires`) — l'audit du 18/10 n'a vérifié **que les
nombres**. **C'est le candidat non-contenu n°1 pour le prochain run non-contenu.**

✅ **CANDIDAT NON-CONTENU N°2 ENTIÈREMENT CONSOMMÉ LE 18/10 — la liste du 14/10
sur la reproductibilité des arrondis est ÉPUISÉE** (`plus-value-immobiliere-calcul`
et `rentabilite-locative-lyon` le 14/10, `frais-de-notaire-lyon-2026` le 17/10,
`investir-locatif-lyon` le 18/10). **NE PLUS LA ROUVRIR** — à rejouer seulement
sur du contenu neuf. 🆕 **Leçon à transporter : chercher la BASE autant que
l'arrondi.** Le défaut du 18/10 n'était pas un arrondi d'un euro mais une
**médiane communale écrite sous l'étiquette d'un quartier** — un écart de
~600 €, invisible à tout contrôle d'arrondi.

🟢 **CANDIDAT NON-CONTENU N°3, TOUJOURS OUVERT ET INCHANGÉ — la parité des
valeurs RNIC entre pages** (`2 065`, `79 797`, `165 101`, `1 597`, `1 744`,
`84,5 %`). `1 744` et `84,5 %` vivent sur **deux** pages (`charges-copropriete`
et `dpe-2026-ce-qui-change`) : toute modification doit toucher les deux. **Aucun
défaut connu dessus** — c'est de la prévention, pas une correction en attente.

🆕 🟢 **MÉTHODE CONFIRMÉE POUR LA 4ᵉ FOIS SUR 4 — mesurer la SERP du chantier.**
Les 15, 16, 17 et 18/10, elle a chaque fois produit de la matière : la décision
du Conseil d'État, la divergence des sources sur le seuil de 50 lots, l'article
121 de la LF 2026, et aujourd'hui **trois sources de prix affichés neuves (dont
`calcunet.fr` à +35,3 %) plus l'aveu du moteur qu'il n'a pas de source locale**.
📌 **Corollaire confirmé 4 fois sur 4 : ces SERP ne contiennent AUCUNE agence
immobilière.** C'est là qu'il y a une place, pas sur les requêtes-tête tenues par
les annuaires.

**Angle du dernier run : CONTENU — justesse juridique + arrondis** (17/10,
`frais-de-notaire-lyon-2026` : taux DGFiP revérifiés à la source et inchangés,
mais la loi citée avait été réécrite par l'article 121 de la LF 2026, deux
règles publiées étaient fausses — le taux rétabli au 01/04/2028 et la date qui
compte en cas de condition suspensive —, le périmètre primo-accédant était trop
étroit, la doctrine des co-acquéreurs manquait entièrement, et 4 totaux sur 7 ne
se recalculaient pas sur les colonnes affichées. 2 614 → 3 888 mots).

→ 🔴 **LE PROCHAIN RUN (19/10) EST UN LUNDI : LA VEILLE PASSE AVANT LE CHOIX DU
CHANTIER** (dernière veille le 12/10). Et ⚠️ **« prix m2 Villeurbanne » est DUE
le 19/10** (hebdomadaire, dernière mesure le 12/10) — c'est la seule requête
cible en échéance. Les deux SERP gelées restent interdites **jusqu'au 23/10**.
*(Pas de run attendu le dimanche 18/10 ; si un run a lieu, le 18 est du
non-contenu, voir ci-dessous.)*

→ 🔴 **ET L'ANGLE DU PROCHAIN RUN DOIT ÊTRE NON-CONTENU** (alternance : 15/10
contenu → 16/10 non-contenu → 17/10 contenu). **Candidats, par ordre d'impact :**
  1. 🔴 🆕 **LE BALAYAGE DE LA 6ᵉ FAMILLE — les chiffres écrits À LA MAIN dans
     `app/llms.txt/route.ts`.** C'est le candidat n°1 sans discussion : le
     défaut du jour a montré que **ce fichier n'est dérivé que pour la section
     des articles**, et que ses entrées de pages « argent » (`/acheter`,
     `/vendre`, `/honoraires`, `/gestion-locative`, `/faire-gerer`,
     `/estimation-immobiliere-villeurbanne`…) recopient et **additionnent** à la
     main des dizaines de montants publiés ailleurs. **Aucun de ces montants
     n'a jamais été vérifié contre sa page.** Le travail est cadré : extraire
     tous les nombres de `route.ts`, et pour chacun vérifier soit qu'il est
     publié tel quel sur la page décrite, soit qu'il se recalcule sur des valeurs
     qui le sont. ⚠️ **Et c'est le fichier que les IA lisent en priorité : un
     chiffre faux y pèse plus lourd qu'ailleurs.**
  2. ⚠️ **La reproductibilité des arrondis sur `investir-locatif-lyon`** — seule
     page restante de la liste du 14/10 (`plus-value-immobiliere-calcul` et
     `rentabilite-locative-lyon` closes le 14/10, `frais-de-notaire-lyon-2026`
     close le 17/10). **Petit chantier : à faire en complément, pas seul.**
  3. 🟢 **La parité des valeurs RNIC entre pages** (`2 065`, `79 797`, `165 101`,
     `1 597`, `1 744`, `84,5 %`) — inchangé depuis le 16/10 : `1 744` et
     `84,5 %` vivent désormais sur DEUX pages, toute modification doit toucher
     les deux.

**Candidats de CONTENU pour le run d'après** (ordre inchangé, le n°1 du 16/10
ayant été consommé aujourd'hui) :
  1. **`/faire-gerer`**, **`plus-value-immobiliere-calcul`**, **`/vendre`** —
     pages de droit jamais revérifiées.
  2. ⚠️ **`comment-estimer-son-bien-immobilier-lyon-villeurbanne`** reste au
     backlog **avec son périmètre imposé du 11/10** : réécriture **procédurale**
     (méthode pas à pas, zéro nouveau tableau de marché) **ou** fusion. **Ne pas
     rouvrir l'angle « chiffres du marché », il est fermé par la mesure.**

✅ **CANDIDAT NON-CONTENU N°2 CONSOMMÉ AUX DEUX TIERS LE 17/10 — la
reproductibilité des arrondis est close sur `frais-de-notaire-lyon-2026`**
(22 montants recalculés, 4 totaux faux d'un euro, corrigés ; la convention
d'arrondi du 13/10 y est désormais PUBLIÉE pour le lecteur, première page du
site dans ce cas). **Reste `investir-locatif-lyon`, et lui seul.**

🆕 🟢 **MÉTHODE CONFIRMÉE POUR LA 3ᵉ FOIS SUR 3 — mesurer la SERP du chantier
AVANT d'écrire.** Les 15, 16 et 17/10, elle a chaque fois fourni la matière :
la décision du Conseil d'État, la divergence des sources sur le seuil de
50 lots, et aujourd'hui **la piste de l'article 121 de la LF 2026, que personne
ne mentionnait**. 📌 **Ce n'est plus une hypothèse, c'est l'étape 1 de tout
chantier de contenu.** Corollaire vérifié aujourd'hui : **les SERP de chantier
juridique ne contiennent aucune agence immobilière** (3 fois sur 3) — c'est
là qu'il y a une place, pas sur les requêtes-tête tenues par les annuaires.

**Angle précédent : NON-CONTENU — contrôle de périmètre juridique** (16/10,
`dpe-2026-ce-qui-change` : chevauchement des bornes à 50 lots corrigé, condition
d'assujettissement manquante publiée — permis de construire déposé avant le
1er janvier 2013 —, 8ᵉ FAQ en parité, 2 sources datées ajoutées, puis balayage du
corpus entier avec un détecteur de bornes neuf : **aucun autre défaut réel**).
→ 🔴 **LE PROCHAIN RUN (17/10) DOIT ÊTRE DU CONTENU** (alternance : 14/10
non-contenu → 15/10 contenu → 16/10 non-contenu). **Candidats, par ordre
d'exposition, dans la liste des pages de droit jamais revérifiées :**
  1. 🔴 **`frais-de-notaire-lyon-2026`** — 2 614 mots, déjà solide **en volume**,
     mais **ses taux ont leur propre péremption notée dans l'en-tête de
     `lib/blog.ts`** : à prendre **côté justesse**, pas côté volume. ⚠️ **Et c'est
     aussi la page qui reste à passer au contrôle de reproductibilité des
     arrondis** (candidat non-contenu n°2 ci-dessous) : **les deux travaux
     tombent sur la même page, les faire ensemble.**
  2. **`/faire-gerer`**, **`plus-value-immobiliere-calcul`**, **`/vendre`**.
  3. ⚠️ **`comment-estimer-son-bien-immobilier-lyon-villeurbanne`** reste au
     backlog **avec son périmètre imposé du 11/10** : réécriture **procédurale**
     (méthode pas à pas, zéro nouveau tableau de marché) **ou** fusion. **Ne pas
     rouvrir l'angle « chiffres du marché », il est fermé par la mesure.**

✅ **CANDIDAT NON-CONTENU N°1 CONSOMMÉ LE 16/10 — le contrôle de périmètre
juridique est passé, et la piste « bornes d'intervalle » est CLOSE sur
l'existant** (27 articles de `lib/blog.ts` + toutes les pages de `app/`, quatre
unités : un seul défaut réel, celui qui était déjà repéré). **NE PAS LA
REPRENDRE** — à rejouer seulement sur du contenu neuf, avec le détecteur décrit
en « Techniques apprises » du 16/10. ⚠️ **Ce qui RESTE de cette famille, et qui
n'est pas clos** : les phrases de **périmètre** (« qui est soumis à »), dont le
run du jour a trouvé la 5ᵉ fausse depuis le 11/10. **Le `grep` est ci-dessous ;
il se rejoue sur toute page de droit qu'un run touche, systématiquement, avant de
publier.**

⚠️ **CANDIDAT NON-CONTENU N°2, TOUJOURS OUVERT — la reproductibilité des
arrondis sur `frais-de-notaire-lyon-2026` et `investir-locatif-lyon`** (le
contrôle du 14/10 ne les a pas couvertes). **À faire avec le chantier de contenu
sur `frais-de-notaire-lyon-2026`, voir ci-dessus.**

🟢 **CANDIDAT NON-CONTENU N°3, TOUJOURS OUVERT — la parité des valeurs RNIC entre
pages** (`2 065`, `79 797`, `165 101`, `1 597`, `1 744`, `84,5 %`). 🆕 **Le run du
16/10 en a fait migrer deux : `1 744` et `84,5 %` apparaissent désormais AUSSI
dans `dpe-2026-ce-qui-change`**, avec le même sens que dans
`charges-copropriete` (vérifié à l'écriture). **C'est le premier cas de reprise
d'une valeur RNIC sur une seconde page : à partir de maintenant, toute
modification de ces deux chiffres doit toucher les DEUX pages.**

**Angle précédent : CONTENU** (15/10, `charges-copropriete` : 164 → 3 725
mots, promesse d'architecture enfin tenue, 6 fiches de droit datées, décision du
Conseil d'État du 17/03/2026 sur le plafond de l'état daté, et une source locale
neuve — le RNIC — qui donne le calendrier du plan pluriannuel de travaux
copropriété par copropriété).
→ ✅ **PRESCRIPTION HONORÉE LE 16/10** (run non-contenu, candidat n°1 pris).
Énoncé d'origine : 🔴 **LE PROCHAIN RUN (16/10) DOIT ÊTRE NON-CONTENU**
(alternance : 13/10 contenu → 14/10 non-contenu → 15/10 contenu). **Trois
candidats, par ordre d'impact :**
  1. 🔴 **LE CONTRÔLE DE PÉRIMÈTRE JURIDIQUE sur les affirmations de droit
     NOUVELLEMENT publiées, et d'abord le défaut DÉJÀ REPÉRÉ aujourd'hui** :
     `dpe-2026-ce-qui-change` donne un calendrier de DPE collectif dont les bornes
     **se chevauchent à 50 lots** (voir « Hypothèses à vérifier »). C'est un
     défaut vu, localisé, non corrigé — **le prendre en premier**, il ne demande
     qu'une vérification de source.
     ⚠️ **Et profiter du passage pour vérifier que ce calendrier (DPE collectif :
     01/01/2024 / 2025 / 2026) n'a pas été contaminé par celui du PPT
     (01/01/2023 / 2024 / 2025) publié aujourd'hui, ni l'inverse.** Ce sont **deux
     obligations distinctes aux calendriers décalés d'un an** : c'est exactement
     la configuration qui produit une contradiction inter-pages (5ᵉ famille de
     défaut, 14/10).
  2. ⚠️ **La REPRODUCTIBILITÉ DES ARRONDIS sur les pages qui restent** :
     `frais-de-notaire-lyon-2026` et `investir-locatif-lyon` (voir plus bas, le
     contrôle du 14/10 ne les a pas couvertes).
  3. 🟢 **Le contrôle de PARITÉ DES VALEURS entre pages (5ᵉ famille, 14/10)
     étendu aux nouvelles valeurs RNIC** : `2 065`, `79 797`, `165 101`, `1 597`
     ne doivent apparaître qu'avec le même sens partout. Vérifié ce jour : elles
     n'existent **nulle part ailleurs** dans `app/` et `lib/`. À re-vérifier dès
     qu'une page les reprend.

**Angle précédent : NON-CONTENU — contrôle de contradiction interne +
reproductibilité des arrondis** (14/10, balayage des 27 articles de
`lib/blog.ts` ; 2 défauts trouvés, les deux sur `rentabilite-locative-lyon` :
une comparaison qui contredisait la FAQ de sa propre page, et une surface
médiane fausse qui contredisait deux pages voisines et faisait dériver
5 montants).
→ 🔴 **LE PROCHAIN RUN (15/10) DOIT ÊTRE CONTENU, et le candidat est désigné
depuis le 13/10 : `charges-copropriete`, 164 mots servis en production.** C'est
la page la plus maigre du site, elle porte du droit jamais revérifié, et c'est
elle qui portait le renvoi dont la promesse était fausse le 12/10 : à relire côté
promesses autant que côté droit. **Ne pas reprendre le contrôle de contradiction
interne : il est passé sur l'intégralité de `lib/blog.ts` et la piste (i) est
close.**

**Angle précédent : CONTENU** (13/10, `loi-carrez-surface` : 7 défauts de
droit corrigés dont une contradiction interne, 177 → 2 677 mots, seuil de 5 %
chiffré en euros par quartier à partir du champ Carrez de DVF, jamais exploité
jusqu'ici).
**Angles plus anciens : non-contenu — audit d'affirmations réglementaires** (12/10,
`diagnostics-obligatoires-vente`), **contenu** (11/10, `dpe-2026-ce-qui-change`),
**non-contenu — justesse des calculs** (08/10),
**contenu blog** (07/10, `vendre-sans-agence`),
**maillage interne + micro-chantier source** (06/10),
**contenu blog** (05/10), **audit non-contenu + maillage** (04/10).
*(La prescription « le prochain run doit être NON-CONTENU » du 13/10 est
honorée : voir l'angle du 14/10 ci-dessus.)*

✅ **CANDIDAT NON-CONTENU N°1 CONSOMMÉ LE 14/10 — le contrôle de contradiction
interne est passé sur les 27 articles de `lib/blog.ts`, pas seulement sur les
quatre pages signalées ici. 2 défauts trouvés et corrigés ; `frais-de-notaire-
lyon-2026`, `plus-value-immobiliere-calcul`, `dpe-2026-ce-qui-change` et
`charges-copropriete` sont propres sur ce contrôle. NE PAS LE REPRENDRE.** Le
détecteur rejouable est en « Techniques apprises » du 14/10. Énoncé d'origine :
🔴 **passer le CONTRÔLE DE CONTRADICTION INTERNE sur les pages de droit.** Le
défaut n°1 du 13/10 est d'un type neuf — deux phrases de la **même** page
disaient deux choses différentes sur le seuil de 1,80 m, et aucun test ne peut le
voir. Le contrôle est cheap et n'a jamais été passé ailleurs : **pour chaque
seuil numérique publié, grepper TOUTES ses occurrences sur la page et vérifier
qu'elles disent la même chose.**

```bash
# les formules de seuil qui peuvent se contredire d'un paragraphe à l'autre
grep -rn 'dépasse\|supérieur à\|au moins\|à partir de\|inférieur à\|moins de\|≥\|≤' \
  lib/blog.ts | grep -E '[0-9]'
```
Puis, seuil par seuil : **« > » et « ≥ » ne sont pas la même règle**, et c'est
toujours la source officielle qui tranche. Pages les plus exposées (elles
publient beaucoup de seuils) : `frais-de-notaire-lyon-2026`,
`plus-value-immobiliere-calcul`, `dpe-2026-ce-qui-change`, `charges-copropriete`.

✅ **SECOND CONTRÔLE NON-CONTENU ÉGALEMENT CONSOMMÉ LE 14/10 — la
reproductibilité des arrondis est vérifiée sur `plus-value-immobiliere-calcul`
et `rentabilite-locative-lyon` (22 montants dérivés, tous recalculables sur les
valeurs affichées). ⚠️ Restent à passer : `frais-de-notaire-lyon-2026`,
`investir-locatif-lyon` et `rentabilite-locative-lyon` côté tableau par
quartier — ce dernier a été vérifié au centième ce jour (16 valeurs).** Énoncé
d'origine : ⚠️ **la REPRODUCTIBILITÉ DES ARRONDIS.** Trois montants publiés ne se recalculaient pas sur les chiffres
affichés (détail en « Erreurs commises » du 13/10). Le contrôle : **pour chaque
tableau dérivé, refaire le calcul avec les valeurs AFFICHÉES et comparer.**
À passer sur `plus-value-immobiliere-calcul`, `frais-de-notaire-lyon-2026`,
`rentabilite-locative-lyon` et `investir-locatif-lyon`, qui dérivent tous des
médianes.

✅ **CANDIDAT CONTENU CONSOMMÉ LE 15/10 — `charges-copropriete` est fait**
(164 → 3 725 mots, 1 promesse d'architecture tenue, 1 affirmation corrigée sur
une page voisine, 1 source locale neuve). **NE PAS LE REPRENDRE.** La liste des
pages de droit jamais revérifiées **a tenu sa promesse trois fois de suite** :
6 défauts le 12/10, 7 le 13/10, et aujourd'hui une page qui ne disait presque
rien là où le site annonçait qu'elle disait tout. **Reste, dans l'ordre
d'exposition : `frais-de-notaire-lyon-2026`** (2 614 mots, déjà solide, mais ses
taux ont leur propre péremption notée dans l'en-tête de `lib/blog.ts` — à
vérifier côté justesse, pas côté volume), **`/faire-gerer`**,
**`plus-value-immobiliere-calcul`**, **`/vendre`**.

✅ **CANDIDAT CONTENU N°1 CONSOMMÉ LE 13/10 — `loi-carrez-surface` est fait**
(7 défauts, 177 → 2 677 mots). **La liste des pages de droit jamais revérifiées
continue, et elle a tenu sa promesse deux fois de suite** : 6 défauts le 12/10,
7 le 13/10, sur les deux premières pages ouvertes. **Reste, dans l'ordre
d'exposition : `charges-copropriete`** (🔴 **le plus urgent — elle ne sert que
164 mots en production, mesuré le 13/10**, et c'est elle qui portait le renvoi
dont la promesse était fausse le 12/10 : à relire côté promesses autant que côté
droit), **`frais-de-notaire-lyon-2026`** (2 614 mots, déjà solide, mais ses taux
ont leur propre péremption notée dans l'en-tête de `lib/blog.ts` — à vérifier
côté justesse, pas côté volume), **`/faire-gerer`**, **`plus-value-immobiliere-
calcul`**, **`/vendre`**. **La méthode est écrite** en
« Techniques apprises » du 12/10 : fiche carrefour → extraction des liens →
sondage des `<title>` en lot, puis lecture de chaque affirmation contre sa fiche
datée. Les identifiants déjà vérifiés y sont tabulés : **ne pas les redécouvrir.**
⚠️ **Et ajouter le contrôle des PROMESSES DE RENVOI** (grep donné dans « Erreurs
commises » du 12/10) : c'est lui qui a produit le meilleur défaut du jour.

🆕 🟢 **CE QUE LA VEILLE DU 12/10 CHANGE AU CHOIX DES CHANTIERS — à lire avant de
prendre un angle.** Source primaire Ahrefs : **37,9 % seulement des URLs citées
en AI Overviews rankent dans le top 10** de la requête (contre 76 % sept mois
plus tôt), et le mécanisme est le **`query fan-out`** (éclatement de la question
en sous-requêtes). **Conséquence : l'absence du site sur « agence immobilière
Villeurbanne » — 29 mesures sur 29, SERP tenue par des annuaires — ne ferme pas
la citation par une IA.** Le levier est **les sous-questions**, pas la
requête-tête. **Donc : privilégier les chantiers qui ajoutent des réponses
autonomes à des questions précises (H2 interrogatifs + FAQPage en parité +
chiffres datés et sourcés) plutôt que ceux qui visent une requête-tête
concurrentielle.** C'est une validation de la méthode en place, pas un virage.

🆕 📌 **DEMANDE CLIENT — LES ANNUAIRES : elle n'est plus une hypothèse, elle est
étayée par DEUX mesures concordantes (11/10 et 12/10).** Sur « agence immobilière
Villeurbanne », **5 des 9 résultats sont des annuaires** (`cylex-locale.fr`,
`zimo.fr`, `realadvisor.fr`, `lesiteimmo.com`, `fr.mappy.com`), composition
**rigoureusement identique** les deux jours, contre 10/10 en franchise les 07 et
08/10. **La règle du 08/10 (un seul delta ne conclut rien) est satisfaite.**
**Aucun contenu publié sur le site ne prendra ces 5 places : elles s'obtiennent
en créant ou en réclamant la fiche.** Ce n'est pas un chantier de repo — **c'est
une action client, à chiffrer et à proposer, et c'est probablement le levier le
plus rentable du mois sur cette requête.**
 Candidat désigné, et il est prêt :
**les comparaisons rédigées à la main de `lib/blog.ts`** (reste de la piste (i),
voir ci-dessous) — **auquel il faut maintenant ajouter un second point d'entrée,
établi le 11/10 : les phrases qui affirment QUI est soumis à une obligation
légale.** Le run du 11/10 en a trouvé une fausse en production (l'audit
énergétique annoncé à des propriétaires de lots de copropriété qui n'y sont pas
soumis, soit 96 % du lectorat de la page). **Le contrôle est le même que celui du
08/10, avec un `grep` de plus :**

```bash
# phrases de PÉRIMÈTRE JURIDIQUE — chacune se vérifie sur sa fiche officielle
grep -rn 'obligatoire pour\|est soumis\|sont soumis\|concerne les\|ne concerne que\|dispensé\|exigé pour' \
  app lib --include='*.tsx' --include='*.ts'
```

🆕 🔴 **NOUVEAU CANDIDAT NON-CONTENU, PRIORITÉ HAUTE — auditer les AUTRES
affirmations réglementaires du site.** Le défaut du 11/10 n'était pas isolé par
nature : le site publie beaucoup de droit (`diagnostics-obligatoires-vente`,
`loi-carrez-surface`, `charges-copropriete`, `dpe-2026-ce-qui-change`,
`plus-value-immobiliere-calcul`, `frais-de-notaire-lyon-2026`, `/vendre`,
`/faire-gerer`) et **rien ne garantit que ces fiches ont été revérifiées depuis
leur rédaction.** Le run du 11/10 montre que c'est faisable vite : les fiches
`service-public.gouv.fr` portent une mention **« Vérifié le … »** qui donne
l'état du droit à la date, et `ecologie.gouv.fr` couvre les trous.
**Cadrage pour le prochain run : prendre `diagnostics-obligatoires-vente` en
premier** (c'est une liste d'obligations entière, jamais vérifiée, et elle est
liée depuis l'article du 11/10 — donc elle reçoit désormais du trafic interne).

🆕 ⚠️ **CANDIDAT DE CONTENU RETIRÉ DU HAUT DE PILE, avec sa raison — l'ancien
candidat n°2 `comment-estimer-son-bien-immobilier-lyon-villeurbanne` NE DOIT PAS
être réécrit comme un article de marché.** Instruit le 11/10, `grep` de formule à
l'appui : **ses deux seuls angles chiffrables sont déjà publiés ailleurs** — la
correction par typologie (`prix-immobilier-villeurbanne-2026` en publie le
tableau complet, et 4 autres endroits en reprennent les chiffres) et la
dispersion / marge d'erreur (c'est le cœur de `estimation-en-ligne-ou-agence`).
**Il reste au backlog mais avec un périmètre imposé : soit une réécriture
PROCÉDURALE (la méthode pas à pas, zéro nouveau tableau de marché, liens sortants
vers les pages qui portent la donnée), soit une FUSION.** Ne pas rouvrir l'angle
« chiffres du marché » : il est fermé par la mesure.

✅ **PISTE (i) INTÉGRALEMENT CLOSE LE 14/10 — périmètre des 4 pages clos le
08/10, comparaisons du BLOG closes le 14/10.** 20 comparaisons relatives
recalculées dans `lib/blog.ts` + 2 dans `app/` : **une seule fausse** (le
« 24,6 % de moins » de `rentabilite-locative-lyon`), corrigée. **NE PAS ROUVRIR
CETTE PISTE.** Énoncé d'origine : ⚠️ **Ce qui reste : les comparaisons du
BLOG.** Le contrôle du 08/10 n'a été passé qu'en croisant les
formules de `app/` et `lib/` ; `lib/blog.ts` contient beaucoup de comparaisons
**rédigées à la main** (« 13,2 % en dessous », « 45,3 % d'écart », « 23 % de moins
que la médiane ») dont seules quelques-unes ont été recalculées — celles-là
étaient justes. **Candidat non-contenu toujours valide.**
🆕 ⚠️ **Et l'article du 11/10 en ajoute au stock** : il publie des rapports
(« 25 fois moins souvent », « 50 % de risques en plus », « plus du double »,
« 96 % des passoires ») **dont les bases ont été vérifiées à l'écriture**, mais
qui entrent désormais dans le périmètre à relire si un run les reprend ailleurs.
🟡 **Un piège de formulation attrapé le 11/10, à connaître** : un rapport de 1,50
se dit « **50 % de plus** », **pas** « une fois et demie de plus ». C'est la même
famille d'erreur que l'asymétrie des pourcentages du 08/10, mais sur le
**multiplicateur** au lieu de la base.

✅ **VEILLE FAITE LE LUNDI 12/10** (la précédente datait du 05/10 : une semaine de
retard, rattrapée). Résultats et réserves de méthode en « Techniques apprises »
du 12/10. **Prochaine échéance : lundi 19/10.**

🆕 📌 **DEMANDE À FORMULER AU CLIENT, nouvelle et probablement la plus rentable
du mois — les ANNUAIRES.** Mesure du 11/10 sur « agence immobilière
Villeurbanne » : **5 des 9 résultats sont des annuaires** (`cylex-locale.fr`,
`zimo.fr`, `realadvisor.fr`, `lesiteimmo.com`, `fr.mappy.com`), contre 10/10 en
franchise les 07 et 08/10. **Aucun contenu publié sur le site ne prendra ces 5
places : elles s'obtiennent en créant/réclamant la fiche.** Ce n'est pas un
chantier de repo — **c'est une action client, à chiffrer et à proposer.**
⚠️ **À confirmer sur une seconde mesure avant de le présenter comme une
tendance** (règle du 08/10 : un seul delta ne conclut rien).

✅ **CHANTIER DU 11/10 VÉRIFIÉ EN PRODUCTION LE JOUR MÊME — RIEN À REVÉRIFIER LE
12/10.** Déploiement constaté **entre 40 et 60 s après le push** (contre ~80 s le
08/10, <1 min le 07/10, ~10 min le 06/10 : le délai varie, ne rien conclure d'une
mesure). Contrôlé sur `https://www.markusimmobilier.fr/…` :
- `/blog/dpe-2026-ce-qui-change` sert **2 502 mots dans le `<main>`**, chiffre
  **identique au local** (et 280 avant déploiement : la bascule est nette) ;
- **parité FAQ visible ↔ `FAQPage` 7/7 sur les questions ET 7/7 sur les
  réponses**, mot pour mot ;
- **0 mot collé** sur les 5 motifs du 04/10 (seul `1er` remonte, faux positif) ;
- 4 blocs JSON-LD (`RealEstateAgent`, `BlogPosting`, `FAQPage`,
  `BreadcrumbList`), `datePublished` 2026-05-05 / **`dateModified` 2026-10-11** ;
- 🟢 **tous les chiffres de l'angle sont servis** : `49 717`, `2 454`, `4,94 %`,
  `7,05 %`, `6,72 %`, `12,37 %`, `7,60 %`, « 25 fois moins souvent », `1 287`,
  `1 077`, `7 853`, `15,8 %`, `18 134`, `6,26 %`, `4,16 %`, « 50 % de risques en
  plus », `17,9 %` / `17,2 %`, `96 %`, `51 951`, « 2,3 à 1,9 », « monopropriété »,
  « E, F ou G », et les deux bornes de la donnée (« 1er juillet 2021 »,
  « 5 octobre 2026 ») ;
- 🟢 **les trois formulations retirées ont bien DISPARU du document servi** :
  plus aucune occurrence de « 850 000 », de « chance et demie » ni de
  « obligatoire pour les biens classés F ou G » — **vérifié sur le HTML complet,
  payload RSC compris**, pas seulement sur le `<main>` ;
- **2 liens entrants servis** avec l'ancre attendue : `4,9 % des appartements
  diagnostiqués` sur `prix-immobilier-villeurbanne-2026` et `2 454 appartements
  diagnostiqués sont dans ce cas` sur `estimation-en-ligne-ou-agence` ;
- **`/llms.txt` sert le nouveau titre et le nouvel `excerpt`** (dérivé de
  `ARTICLES`, confirmé une fois de plus intenable à désynchroniser) ;
- 🟢 **sitemap de production : 53 URLs, et EXACTEMENT 1 `lastmod` au 2026-10-11**
  (`/blog/dpe-2026-ce-qui-change`), `prix-immobilier-villeurbanne-2026` resté au
  `2026-09-07` et `estimation-en-ligne-ou-agence` au `2026-09-11` **bien que les
  deux aient reçu un lien sortant**. **Aucune inflation de fraîcheur : la décision
  du 06/10 est appliquée de bout en bout pour le cinquième run d'affilée**, et
  pour la première fois sur des pages qui ont été *modifiées* sans *changer de
  contenu* — c'est exactement le cas que la règle visait.
- ⚠️ **Rappel après la mésaventure du run (voir « Erreurs commises ») : la
  vérification de production est la seule qui ne peut pas être trompée par un
  serveur local périmé.** Elle a été faite ici en grep**ant les phrases
  nouvelles**, pas seulement les chiffres.

✅ **CHANTIER DU 08/10 VÉRIFIÉ EN PRODUCTION LE JOUR MÊME — RIEN À REVÉRIFIER LE
09/10.** Déploiement constaté **~80 s après le push** (contre <1 min le 07/10,
~10 min le 06/10 : le délai varie, ne rien conclure d'une mesure). Contrôlé sur
`https://www.markusimmobilier.fr/…` :
- 🟢 **les deux affirmations fausses ont DISPARU du rendu** : plus aucune
  occurrence de « 21,3 % de moins » ni de « plus actif de la ville après
  Ferrandière », sur **aucune** des trois pages de quartier ;
- 🟢 **les deux corrections sont servies** : `/agence-immobiliere-cusset` rend
  « **17,6 % de moins qu'à Gratte-Ciel – Dedieu – Charmettes** » et
  `/agence-immobiliere-gratte-ciel` rend « **le deuxième quartier le plus cher de
  la ville, derrière Ferrandière – Maisons-Neuves, et de loin le plus actif** » ;
- 🟢 **le 17,6 % est servi aux trois endroits** : texte visible, JSON-LD échappé
  (`&#x27;`) et payload RSC — donc **la réponse de FAQ corrigée part bien aussi
  vers les moteurs d'IA**, qui était l'enjeu principal de cette correction ;
- **parité FAQ visible ↔ `FAQPage` 5/5 questions ET 5/5 réponses sur les trois
  pages** (Charpennes incluse, auditée mais non modifiée) ;
- **0 mot collé** sur les trois pages (motifs du 04/10) ;
- `dateModified` = **2026-10-08** sur Gratte-Ciel et Cusset, **2026-10-04** sur
  Charpennes : la distinction « modifiée » / « seulement auditée » est servie
  telle quelle ;
- 🟢 **sitemap de production : 53 URLs, et EXACTEMENT 2 `lastmod` au 2026-10-08**
  (`/agence-immobiliere-gratte-ciel` et `/agence-immobiliere-cusset`), Charpennes
  restée au `2026-10-04T00:00:00.000Z`. **Aucune inflation de fraîcheur** : la
  décision du 06/10 est appliquée de bout en bout pour le troisième run d'affilée.
- ⚠️ **Taille de `/agence-immobiliere-cusset` identique à l'octet avant et après
  déploiement (104 632 o), et ce n'est PAS un signe de non-déploiement** :
  « 21,3 » et « 17,6 » font le même nombre de caractères, comme `2026-10-04` et
  `2026-10-08`. **Ne jamais conclure d'une taille de page identique** — c'est le
  contenu qu'il faut grep (Charpennes, elle, est légitimement identique :
  108 588 o, page non touchée ; Gratte-Ciel passe de 106 510 à 106 594 o, la
  phrase réécrite étant plus longue).

✅ **CHANTIER DU 07/10 VÉRIFIÉ EN PRODUCTION LE JOUR MÊME — RIEN À REVÉRIFIER LE
08/10.** Déploiement constaté **en moins d'une minute** après le push (contre
~10 min le 06/10 et ~2 min les jours d'avant : le délai varie beaucoup, ne rien
conclure d'une première mesure). Contrôlé sur `https://www.markusimmobilier.fr/…` :
- `/blog/vendre-sans-agence` sert **2 583 mots dans le `<main>`**, chiffre
  **identique au local** (et la mesure d'avant déploiement donnait 334 mots : la
  bascule est nette, aucun doute sur la version servie) ;
- **parité FAQ visible ↔ `FAQPage` 6/6 sur les questions ET 6/6 sur les réponses**,
  mot pour mot ;
- **0 mot collé** sur les 5 motifs du 04/10 ;
- 4 blocs JSON-LD (`RealEstateAgent`, `BlogPosting`, `FAQPage`, `BreadcrumbList`),
  `datePublished` 2026-05-28 / **`dateModified` 2026-10-07**, et « Mis à jour le
  7 octobre 2026 » visible en eyebrow ;
- **tous les chiffres de l'angle servis** : `11 700 €`, `30 225 €`, `2,6 fois`,
  `19 500 €`, `15,5 %`, « quatorze pièces », `30 000 €`, et les deux dates de
  source (`21 août 2025`, `15 avril 2025`) ;
- **aucun tableau d'honoraires par quartier** sur la page (le doublon retiré n'est
  pas revenu par le build) ;
- **11 liens internes dans le `<main>`**, et les **deux liens entrants servis**
  avec l'ancre attendue sur `/vendre` et `/blog/mandat-simple-ou-exclusif` ;
- 🟢 **sitemap de production : 53 URLs**, ce qui **confirme l'explication de
  l'écart local** (51 en conteneur = annonces Supabase + pages de l'éditeur
  absentes). **Ce n'était pas une régression, l'hypothèse est close.**
- 🟢 **UN SEUL `lastmod` déplacé, et c'est exactement celui voulu** :
  `/blog/vendre-sans-agence` au 2026-10-07, **seule URL des 53 à cette date** ;
  `/vendre` reste au 30/09 et `/blog/mandat-simple-ou-exclusif` au 16/09. La
  décision du 06/10 (pas d'inflation de fraîcheur pour une phrase ajoutée) est
  appliquée de bout en bout, et pour la première fois **vérifiée sur une page qui,
  elle, méritait la date**.
- ⚠️ **Deux `exit 35` isolés** pendant ces contrôles (un sur le sitemap, un sur une
  page), **200 à la relance les deux fois** : confirmation de la note du 30/09, un
  `exit 35` au milieu d'une série qui passe n'est pas une page morte.

✅ **CHANTIER DU 06/10 VÉRIFIÉ EN PRODUCTION LE JOUR MÊME — RIEN À REVÉRIFIER LE
07/10.** Déploiement constaté ~10 min après le push (plus lent que les ~2 min des
runs précédents : prévoir l'attente, ne pas conclure à un échec de build trop
vite). Contrôlé sur `https://www.markusimmobilier.fr/…` :
- **les 7 liens servis dans le `<main>`**, avec l'ancre attendue : `/faire-gerer`
  → `rentabilite-locative-lyon` (« le détail quartier par quartier ») et →
  `gestion-locative-villeurbanne-deleguer-ou-non` ; `/gestion-locative` →
  `rentabilite-locative-lyon` ; `/honoraires` → `frais-de-notaire-lyon-2026` ;
  `/vendre` → `plus-value-immobiliere-calcul` ;
  `/estimation-immobiliere-villeurbanne` → `/acheter` ;
  `/blog/cout-gestion-locative` → `/faire-gerer` ;
- **rendements exacts** : `/faire-gerer` sert « 4,91 % […] 4,62 % […] 0,29 point
  d'écart », `/gestion-locative` sert « 4,47 % à 6,40 % […] 1,93 point » —
  **identiques au centième** à `rentabilite-locative-lyon` ;
- « **1,93 point** » bien **au singulier** (la faute d'accord corrigée avant le
  push ne s'est pas glissée en production) ;
- **0 mot collé** sur les 6 pages (5 motifs, 9 288 mots de texte rendu) ;
- **parité FAQ visible ↔ `FAQPage` 6/6** sur les 5 pages à FAQ ;
- **`service-public.gouv.fr` 12 fois sur `/vendre` et 2 fois dans `/llms.txt`, et
  plus aucun `service-public.fr`** ;
- 🟢 **sitemap RIGOUREUSEMENT INERTE : 53 URLs avant et après, ZÉRO `lastmod`
  déplacé.** La décision de ne pas avancer les dates est donc bien appliquée de
  bout en bout (et non pas « oubliée quelque part »).

✅ **CANDIDAT CONTENU N°1 — `vendre-sans-agence` : FAIT LE 07/10** (399 → 2 583
mots, 2 liens entrants, détail en « Chantiers faits »). **Ne pas le reprendre.**
🟢 **Et l'angle suggéré le 06/10 — « publier l'écart réel entre vendre seul et
vendre avec agence » — a tenu, mais pas par le chemin prévu.** Le 06/10 proposait
de retirer du net vendeur les frais que le particulier porte quand même
(diagnostics, mainlevée, diffusion). **Deux des trois postes ne sont pas
sourçables d'ici** : la mainlevée (tarif notarial, Legifrance fermé depuis le
29/09) et la diffusion d'annonce (`pap.fr/vendeur/tarifs` → 403 Cloudflare).
L'angle a donc été **déplacé** vers ce qui, lui, est chiffrable sur des données
publiées : **l'économie face au coût d'une erreur de prix** (6 % = point de
bascule, 15,5 % = erreur médiane mesurée). **Leçon à garder : un angle validé
peut survivre au fait que sa source tombe, à condition de chercher quel chiffre
déjà publié dit la même chose autrement.**

🆕 **NOUVEAU CANDIDAT CONTENU — l'état des risques réel de Villeurbanne, BLOQUÉ
PAR L'OUTILLAGE, à rouvrir si `georisques.gouv.fr` redevient joignable.**
L'article du 07/10 publie les conditions légales (mérule par arrêté préfectoral,
diagnostic bruit en zone de plan d'exposition, radon, sismicité) **sans pouvoir
dire lesquelles concernent Villeurbanne**, parce que Géorisques est fermé depuis
ce conteneur (voir « Techniques apprises », 07/10). **C'est une donnée locale que
personne ne publie côté agence** et qui nourrirait aussi `/vendre`,
`diagnostics-obligatoires-vente` et les pages de quartier. **À retester au
prochain run d'outillage** ; si le domaine reste fermé, chercher une autre
source primaire (arrêtés préfectoraux du Rhône, open data de la Métropole) —
**et ne rien publier de mémoire sur ces zonages.**

🔴 **CANDIDAT CONTENU N°2 — LES ORPHELINS ÉDITORIAUX SONT UN BACKLOG DE CONTENU,
ET IL EN RESTE 8.** Comptage du 06/10, tous à **0 lien entrant** et tous **sous
500 mots** — c'est pour ça que personne ne les lie. ✅ `vendre-sans-agence`
(399 mots) **est sorti de la liste le 07/10** : réécrit à 2 583 mots et lié
depuis `/vendre` et `mandat-simple-ou-exclusif`. ✅ `dpe-2026-ce-qui-change`
(337) **est sorti le 11/10** (2 502 mots). ✅ `loi-carrez-surface` (222) **est
sorti le 13/10** (2 677 mots). ✅ 🆕 **`charges-copropriete` (212) EST SORTI LE
15/10** : 3 725 mots, et lié depuis `diagnostics-obligatoires-vente` et
`vendre-sans-agence`. Restent :
`comment-estimer-son-bien-immobilier-lyon-villeurbanne` (500),
`lmnp-location-meublee` (495),
`cout-gestion-locative` (340, **désormais lié vers `/faire-gerer`, à ne pas vider**),
`mandat-simple-ou-exclusif` (277),
`achat-immobilier-lyon-checklist` (241), `vendre-vite-lyon` (233),
`vendre-appartement-lyon-etapes` (258), `home-staging-vendre-plus-cher` (207).
🟢 **Quatre sorties en neuf jours, et les trois dernières par le même geste :
prendre la page la plus maigre QUI PORTE DU DROIT, la vérifier fiche par fiche, y
publier une donnée locale que personne n'a. La recette est reproductible —
`frais-de-notaire-lyon-2026` et `/faire-gerer` sont les suivantes sur ce critère.**
→ **Ne pas les lier pour les lier** (décision motivée du 06/10) : le remède est de
réécrire ou fusionner. **Un par run de contenu, en mesurant l'angle à chaque fois.**
🟢 **Le 07/10 valide la séquence** : réécrire d'abord, lier ensuite. Les deux liens
entrants n'ont été ajoutés qu'une fois l'article devenu substantiel, et ils
tombaient alors dans des phrases qui existaient déjà — aucun bloc à inventer.
⚠️ **Prochain candidat suggéré :
`comment-estimer-son-bien-immobilier-lyon-villeurbanne` (500 mots, le plus gros
des 11), mais attention : il empiète frontalement sur `/estimation`,
`/estimation-immobiliere-villeurbanne` et `estimation-en-ligne-ou-agence`.
**Trancher qui porte la requête AVANT d'écrire une ligne** — c'est exactement le
piège dans lequel le run du 07/10 est tombé (voir « Erreurs commises »).
📌 **Et une décision de fond à prendre un jour, pas aujourd'hui** : 12 pages de
200-500 mots indexées et dans le sitemap diluent le signal de qualité du site.
**La fusion de certaines est à envisager** — mais c'est un changement destructif
(URLs qui disparaissent, redirections à poser), donc à instruire sérieusement avant
de toucher quoi que ce soit. Inscrit en « Hypothèses à vérifier ».

✅ **CANDIDAT N°3 — piste (i), la JUSTESSE des calculs publiés : TRAITÉ LE 08/10**
(périmètre des 4 pages clos ; reste les comparaisons rédigées à la main de
`lib/blog.ts`, voir en tête de section). Historique conservé ci-dessous.
~~Ouverte le 05/10, non traitée.~~ Les contrôles du journal vérifient que les nombres sont **là** et que
la FAQ est en **parité**, jamais qu'un calcul publié **tombe juste sur ses propres
chiffres affichés**. Le site publie beaucoup de montants dérivés (frais de notaire,
honoraires, rendements, nets vendeur). 🆕 **Le 06/10 montre que la piste est la
bonne** : c'est en refaisant un calcul que la divergence d'arrondi de 0,1 point
entre `/vendre` et l'article plus-value a été vue **avant** d'être publiée. Bon
candidat pour le prochain run non-contenu (**08/10 au plus tôt**).

🆕 **CANDIDAT N°4 — l'angle « type de page » sur « prix m2 Villeurbanne », et il
sort de la mesure du 06/10.** Les 9 résultats sont des **portails de données
nationaux**, zéro agence, zéro éditorial. Deux choses en découlent, et la seconde
est une mauvaise nouvelle :
- ce que la SERP récompense n'est pas un contenu mais un **format** : une page de
  données, à jour, maillée ville par ville ou quartier par quartier ;
- ⚠️ **`fonciris.fr` publie « 3 571 €/m² » en se disant basé sur la base DVF**,
  contre **3 567 €/m²** chez nous. **À 4 € près, notre donnée propre n'est plus
  propre sur cette requête.** L'avantage subsiste sur ce que les portails ne font
  pas (découpage par **contours de quartiers de la Métropole**, net vendeur, seuil
  de plus-value, rendement), pas sur la médiane communale.
→ **À instruire avant d'écrire** : vérifier si `fonciris` publie aussi du **par
quartier** et sur quels contours. Si oui, l'angle « médiane communale » est mort et
il faut se replier sur ce que seul le site croise.

📌 **CANDIDAT NON-CONTENU — pistes (g) et (h), priorité basse.**
- **(g) typographie française du rendu** — espaces insécables avant `%`, `€`, `:`,
  dans les milliers. ⚠️ **`lib/blog.ts` et les helpers des pages utilisent des
  espaces ASCII ordinaires** (vérifié à l'octet le 05/10, et les `pct2`/`points`
  ajoutés le 06/10 suivent la même convention **à dessein**). Un chantier (g) devra
  trancher **globalement**, jamais au cas par cas, sous peine d'incohérence pire
  que le défaut.
- **(h) H2 comme réponses autonomes** — priorité **abaissée** depuis la veille du
  05/10 (Google dit qu'il n'est pas nécessaire d'écrire pour l'IA ni de hacher le
  contenu). Garde son sens pour le lecteur, ne doit pas conduire à hacher.
- **(f) cohérence des chiffres d'une page à l'autre** — **avancée le 06/10 par
  construction** (les 3 pages de rendement lisent la même source), **pas épuisée**.
  L'en-tête de `lib/blog.ts` donne la liste des articles qui dérivent de
  `lib/quartiers.ts` : plan de contrôle tout prêt.

📌 **DEMANDE À FORMULER AU CLIENT (rien à coder) — l'accès Search Console.**
Inchangé et toujours la demande la plus rentable. Google a livré en juin 2026 un
**« Generative AI performance report »** qui isole impressions et clics venus des
AI Overviews / AI Mode. Ce journal ne mesure que des SERP à la main : un proxy
pauvre, qui dit « absent » sans dire combien d'impressions le site obtient.
🆕 **Le 06/10 en donne l'illustration la plus nette** : 25 runs disent « absent »
sur « agence immobilière Villeurbanne » sans qu'on sache si le site est 11ᵉ ou
80ᵉ, ni s'il gagne des impressions. **On pilote à l'aveugle sur la seule métrique
qui compte.**

✅ **Signaux mesurés SAINS, ne pas les réauditer** — 06/10 : `llms.txt` (dérivé de
`ARTICLES`, ne peut pas se désynchroniser) ; parité FAQ 6/6 sur `/honoraires`,
`/vendre`, `/faire-gerer`, `/gestion-locative`,
`/estimation-immobiliere-villeurbanne`. — 05/10 : `robots.txt` et l'accès des
crawlers d'IA (`OAI-SearchBot` autorisé par `User-Agent: *` / `Allow: /`). —
04/10 : chaîne de redirection et cohérence d'hôte, 404, slash final, 8 routes
`/api/`, `/admin` · `/admin/pages` · `/radar`, le `[slug]` attrape-tout,
profondeur tous-liens (2 clics max, 0 orpheline). — 01/10 : aucune
`<meta description>` manquante ni dupliquée, 53 `<h1>` distincts. — 30/09 :
53 canonicals, aucune image sans `alt` dans le `<main>`, aucun lien interne mort.

🔴 **CIBLES DU BRIEF RETIRÉES PAR LA MESURE — cinq, et ne plus les remesurer.**
« Agence immobilière Charpennes Villeurbanne » (01/10, requête de marque) · les
deux formulations de l'angle « apport » (01 et 02/10, intention transactionnelle) ·
« vendre appartement Villeurbanne » (04/10, 9 listings, zéro éditorial — deux
mesures par mois au plus) · « agence immobilière Gratte-Ciel Villeurbanne »
(05/10, requête de marque confirmée).
→ **Les requêtes qui restent jouables** sont les deux mesurées chaque run
(« agence immobilière Villeurbanne » — absente 25/25 — et « estimation immobilière
Villeurbanne »). ⚠️ 🆕 **« prix m2 Villeurbanne » n'est PLUS la cible privilégiée** :
mesurée le 06/10, elle sert **9 portails de données nationaux sur 9**, et un
concurrent y publie déjà une médiane DVF à 4 € de la nôtre. **À ne pas retirer
pour autant** (c'est la SERP la plus proche de nos données), mais à mesurer **une
fois par semaine, pas chaque run**, et sans en attendre de position à court terme.

⚠️ **Défauts mineurs relevés et TOUJOURS NON corrigés, volontairement** :
`/equipe` enchaîne `h1` sur `h3` (30/09) ; la page 404 sert deux
`<meta name="robots">` non contradictoires (04/10) ; 32 `<title>` sur 53 dépassent
70 caractères (01/10, dont celui du 05/10 à 81 caractères, assumé) ; 🆕 **6 `<a>`
bruts pour des liens internes** (06/10 : `estimation-immobiliere-lyon:94`,
`mentions-legales` ×2, `cookies`, `confidentialite`, `annonces`) — **impact SEO
nul**, défaut UX seulement, non corrigé par application de « ne corrige rien qui
fonctionne ».
📌 **Réflexe de contrôle à garder** : mesurer la longueur du `title` ET de la
`metaDescription` de toute page qu'on réécrit, c'est deux `len()` (au-delà de
~160 caractères Google tronque la description).

## Hypothèses à vérifier

### 2026-10-20

**1. 🔴 La thèse « affiché ≠ signé » est-elle en train de s'éroder, ou est-ce
du bruit ?** Du 27/09 au 18/10, **toutes** les sources de prix relevées étaient
**16 à 45 %** au-dessus de notre médiane DVF signée 2025 (3 567 €/m²) — c'est
sur cet écart que `/acheter`, `/vendre` et les pages de quartier sont écrites.
**Deux mesures consécutives le contredisent** : `blog.qoridor.fr` **−1,7 %** le
19/10 (et il publie du DVF, donc du signé, ce qui explique l'écart faible) et
`pap.fr` **+1,6 %** le 20/10 (prix **affiché**, et c'est lui qui surprend).
⚠️ **Deux mesures ne font pas une tendance** (règle du 14/10) : il faut une
**troisième mesure concordante sur un prix AFFICHÉ** avant d'y toucher.
📌 **Ce qu'il NE faut pas faire en attendant** : réécrire les fourchettes
publiées, ou retirer l'argument. **Ce qu'il faut faire** : à la prochaine mesure
de « prix m2 Villeurbanne » (26/10), **relever le chiffre de `pap.fr` et de
SeLoger/MeilleursAgents** et le comparer à leurs valeurs antérieures
(SeLoger 3 703 €/m² au 18/10). Si l'écart affiché/signé se resserre vraiment,
c'est un changement de marché, pas une erreur de nos pages — et il se traite par
une mise à jour de la fourchette, sourcée et datée, pas par une suppression.

**2. ⚠️ Combien de périodicités publiées ailleurs dans le corpus sont abrogées ?**
Le 20/10 a trouvé « tous les trois ans » (mise en concurrence du syndic) abrogé
depuis six ans. **Une seule occurrence trouvée, donc une hypothèse.** Mais le
corpus publie d'autres règles périodiques — révision IRL, régularisation
annuelle des charges, états des lieux, 3 ans d'option fiscale, échéances DPE
2028/2034, renouvellement de mandat — et **aucune n'a été vérifiée sous l'angle
« cette périodicité existe-t-elle encore ? »**. Le détecteur est en « Techniques
apprises » du 20/10 ; c'est le candidat non-contenu n°1 pour le 22/10.
⚠️ **Ne pas supposer qu'elles sont fausses** : le run du 20/10 a aussi vérifié
**six** règles de ce type qui se sont révélées **justes et inchangées**.

**3. 🟢 La fraîcheur datée est-elle vraiment le différenciateur sur ces SERP ?**
Trois indices convergents, mais aucun n'est une position gagnée :
`laforet.com` tient deux positions sur « vendre appartement Villeurbanne » avec
des pages dont le moteur **dit lui-même** qu'elles sont périmées (2024, données
2019) ; le 18/10, le moteur avouait n'avoir **aucune source faisant autorité**
sur le budget d'achat ; le 19/10, aucune source ne citait le texte officiel sur
les 17,2 %. 📌 **Hypothèse** : sur ces requêtes, un contenu **daté, sourcé au
paragraphe et à jour** se fait citer même sans backlinks. **Ce qui la
falsifierait** : rester absent de ces SERP après plusieurs semaines de pages
fraîches et sourcées. **La mesure qui tranche n'est pas la position** — elle
est de **chercher si un moteur nous cite** sur une de ces questions sans que la
marque soit nommée. **Jamais testé à ce jour.**

### 2026-10-19

**1. 🔴 Combien d'autres pages affirment quelque chose que leur propre source
contredit ?** Le défaut n°1 du jour est d'un type neuf : la page citait F10864
et affirmait l'inverse de ce que F10864 dit. **Une seule occurrence connue, donc
une hypothèse, pas un constat.** Le corpus compte des dizaines de lignes
« Source : … ». **À trancher par le balayage décrit en « Techniques apprises »
du 19/10** — et c'est le candidat non-contenu n°2.

**2. ⚠️ L'abattement exceptionnel de l'article 150 VE (zones tendues)
s'applique-t-il encore en 2026, et Villeurbanne est-elle dans son périmètre ?**
**Question ouverte, volontairement NON tranchée aujourd'hui et donc RIEN n'a été
publié dessus.** Cet abattement (60 / 75 / 85 % selon le projet) visait les
cessions de terrains à bâtir et d'immeubles destinés à être démolis en zone
tendue — Villeurbanne est en zone A. **Si le dispositif est en vigueur, il
manque à la page ; s'il est éteint, il ne faut surtout pas l'ajouter.** Je n'ai
pas pu l'établir dans le temps du run, et la règle « en cas de doute, ne pas le
faire » s'applique. **À vérifier sur le BOFiP (série RFPI-PVI-20-40) avant toute
publication.**

**3. ⚠️ `blog.qoridor.fr` est-il un concurrent durable ou un passage ?** Relevé
une seule fois (19/10). **Une mesure n'est pas une tendance** — c'est la règle
du 14/10. À reconfirmer sur la mesure du 26/10 avant d'en tirer quoi que ce soit
pour le contenu.

**4. 🟢 La page `/vendre` gagnerait-elle à publier elle-même le point
« 17,2 % ou 18,6 % » ?** Aujourd'hui, `/llms.txt` renvoie à l'article pour ce
fait, ce qui est correct et respecte la règle du 18/10. **Mais `/vendre` est la
page que le site désigne pour « ce qu'il reste au vendeur », et un vendeur en
meublé s'y pose la question.** ⚠️ **Non fait aujourd'hui, et pour une raison
assumée** : l'en-tête de `/vendre` pose que la page ne réexplique pas ce qui est
chiffré ailleurs, et dupliquer un explicatif de CSG y contredirait son
architecture. **À trancher, pas à trancher en passant.**

### 2026-10-18

**0. ✅ L'HYPOTHÈSE N°1 DU 17/10 EST TRANCHÉE — « combien d'autres chiffres
manuscrits de `app/llms.txt/route.ts` sont périmés ? » : DEUX sur 157**, et un
seul était un vrai défaut (`/acheter` figeait 18 231 €, voir « Chantiers faits »
du 18/10). **Ne pas reprendre la question sous cette forme.** Ce qui reste ouvert
du même fichier n'est pas numérique : voir le point 2 ci-dessous.

**1. 🔴 Faut-il DÉRIVER les montants de `/llms.txt` au lieu de les copier ?**
C'est le correctif de fond des 6ᵉ et 7ᵉ familles : tant que `/llms.txt` et
`/acheter` recopient à la main des valeurs publiées ailleurs, **chaque
correction future recréera le même défaut**. Le run du 18/10 l'a constaté deux
fois en deux jours. ⚠️ **NON FAIT, et volontairement** : c'est un refactor, la
consigne client l'interdit explicitement (« ne refactorise rien, ne corrige rien
qui fonctionne »). **À poser au client plutôt qu'à décider seul** — la question
est : accepte-t-il un petit module de constantes partagées (type
`lib/frais-acquisition.ts`) pour les 8 montants que `/acheter` et l'article
publient tous les deux ? Le filet posé en attendant est un **commentaire de
traçabilité** dans `app/acheter/page.tsx`, qui n'a aucune force contraignante.

**2. 🔴 Les RÈGLES DE DROIT que `/llms.txt` recopie sont-elles justes ?** L'audit
du 18/10 n'a vérifié **que les nombres**. Or les entrées `/vendre`,
`/gestion-locative`, `/faire-gerer` et `/honoraires` publient, **à la main et
sans lien avec leur page**, des dizaines de règles : taux de plus-value
(19 % + 17,2 %, surtaxe 2 à 6 %, forfaits 7,5 % et 15 %, exonérations à 22 et
30 ans, fiche `F10864`), plafonds d'IRA (`F1669`), seuil du micro-foncier,
`CGI art. 31 I-1°-a`, `BOI-RFPI-DECLA-10`, articles 21 et 22 de la loi du
6 juillet 1989, article 9-1 de celle du 10 juillet 1965, décret `2015-342`,
article 6 de la loi Hoguet, arrêté du 10 janvier 2017 modifié le 26 janvier 2022,
plafonds locataires au 1er janvier 2026 (10,09 et 3,03 €/m²).
⚠️ **Le run du 17/10 a montré qu'une loi citée peut avoir été réécrite sans
que rien ne le signale** (article 116 de la LF 2025 réécrit par l'article 121 de
la loi 2026-103). **Ces règles-là ont donc une péremption, et elles sont dans le
fichier que les IA lisent en premier.** → **Candidat non-contenu n°1 du prochain
run non-contenu.**

**3. ⚠️ Le `lastmod` de `/acheter` aurait-il dû bouger ?** La page a changé
(trois montants, un euro chacun), son `lastmod` n'a pas bougé — décision
anti-inflation du 06/10. **À trancher une fois pour de bon** : une correction
d'un euro sans contenu neuf mérite-t-elle un signal de fraîcheur ? Le 17/10 a
bougé celui de `frais-de-notaire-lyon-2026` dans un cas comparable, **mais ce
run ajoutait 1 274 mots**. 📌 **Si le client ou un run futur préfère la
cohérence stricte (toute modification servie ⇒ `lastmod` à jour), il faut
l'écrire comme règle et s'y tenir ; en l'état les deux runs ne se contredisent
pas, mais ils ne suivent pas une règle écrite.**

### 2026-10-17

**1. 🔴 Combien d'autres chiffres manuscrits de `app/llms.txt/route.ts` sont
périmés ?** Le défaut du jour en a révélé deux. Le fichier fait 102 lignes et
ses entrées de pages « argent » contiennent **des dizaines de montants recopiés
ou additionnés à la main**, dont aucun n'a jamais été confronté à la page qu'il
décrit. **Ce n'est pas une hypothèse théorique : c'est un défaut avéré dont on
ne connaît pas l'étendue.** → inscrit comme **candidat non-contenu n°1** du
prochain run.

**2. ⚠️ Les entrées manuscrites de `llms.txt` publient-elles des chiffres qui
n'existent sur AUCUNE page ?** Vérifié aujourd'hui sur un cas : `261 457 €`,
`182 627 €` et `78 830 €` **ne figurent nulle part** sur `/acheter` en
production — ce sont des sommes calculées pour `llms.txt` seul. Ce n'est pas
une invention (les composants sont publiés et la somme est juste), mais c'est
une **asymétrie entre ce que lisent les humains et ce que lisent les IA**, et
elle n'a jamais été décidée explicitement. **Deux lectures possibles** : (a)
c'est un plus — `llms.txt` fait le calcul que la page laisse au lecteur ; (b)
c'est un risque — un chiffre invérifiable sur la page qu'il prétend résumer.
📌 **À trancher au prochain run, avant le balayage** : si (a), le dire dans le
journal et garder ; si (b), soit publier ces totaux sur `/acheter`, soit les
retirer de `llms.txt`. **Ne pas trancher dans l'urgence au milieu d'un
balayage.**

**3. 🟢 Ajouter la date de mise à jour des articles dans `/llms.txt`** —
hypothèse du 16/10, **toujours ouverte et renforcée**. `app/llms.txt/route.ts`
ligne 43 ne sert que `title` + `excerpt`, aucune date, alors que
`dateModified` existe sur chaque article et que la fraîcheur datée est un
facteur de citation. ⚠️ **À faire en même temps que le balayage du point 1**,
c'est le même fichier — mais **après** lui, pas avant : corriger du faux passe
avant enrichir du juste.

**4. ⚠️ `moicombien.fr` publie 5,80 % de DMTO « dans le Rhône » et `calcunet.fr`
6,32 % « émoluments et débours inclus ».** Ces deux taux sont faux au regard du
tableau DGFiP (5,80 % n'existe dans aucune colonne ; 6,32 % est la part fiscale
seule, hors émoluments et hors débours). **Question ouverte : y a-t-il un angle
éditorial à "corriger publiquement" les simulateurs concurrents ?** 🔴 **Ne rien
écrire là-dessus sans y réfléchir à froid** : nommer des concurrents pour dire
qu'ils se trompent est une décision client, pas une décision SEO. **À soumettre
à Tony Pistilli avant toute rédaction.** La version sans risque — publier le
calcul juste et sa source, ce que la page fait déjà — est acquise.

**5. 🟡 La fenêtre de majoration se referme le 31/03/2028, et la page le dit
trois fois.** L'article 121 de la LF 2026 ne l'a pas déplacée, mais rien ne
garantit qu'une LF 2027 ou 2028 ne le fera pas. 📌 **Point de contrôle à
rejouer à chaque loi de finances** (décembre–février) : relire
BOI-ENR-DMTOI-10-20 § 105 et chercher une nouvelle réécriture de l'article 116.
**La recette de lecture du BOFiP est en « Techniques apprises » du 17/10.**

### 2026-10-16

✅ **RÉSOLUE — la borne du DPE collectif à 50 lots** (hypothèse du 15/10). Le
chevauchement est **réel et il est dans les sources officielles elles-mêmes**,
pas dans notre rédaction : `justice.fr` (mise à jour du 1er janvier 2026) écrit
« de 50 à 200 lots » pour 2025 et « d'au plus 50 lots » pour 2026. **La réserve
du 15/10 était justifiée** : les seuils du DPE collectif et ceux du plan
pluriannuel de travaux **ne se rédigent pas pareil** (le PPT dit « de 51 à 200 »,
sans recouvrement). Corrigé en décrivant le recouvrement, pas en l'arbitrant —
voir « Erreurs commises ». ✅ **Et la contamination inter-calendriers redoutée le
15/10 est VÉRIFIÉE NÉGATIVE** (voir « Chantiers faits », point 7).

🟡 **Le compteur de lots du DPE collectif est-il le même « compteur légal » que
celui du plan pluriannuel de travaux ? C'est la question ouverte la plus utile du
jour, et elle est désormais publiée comme telle.** Un cabinet d'avocats trouvé
en SERP affirme que ce sont les **lots principaux** (logement, bureau, commerce)
qui comptent, comme pour le PPT — **mais ni `justice.fr` ni l'ANIL ne le disent**,
et le run n'a donc **rien affirmé** : la page expose la question et renvoie au
syndic. **À instruire** : chercher une source institutionnelle qui tranche
(fiche `service-public.gouv.fr` dédiée au DPE collectif, doctrine ANIL plus
récente, ou une réponse ministérielle). **Enjeu local chiffré** : 1 744 des
2 065 copropriétés villeurbannaises (84,5 %) ont un compteur légal inférieur à
leur nombre total de lots, donc la réponse **déplace le palier** pour la majorité
du parc. 🔴 **Ne rien publier d'affirmatif sur ce point avant d'avoir la
source** — et si elle est trouvée, c'est un chantier de contenu à part entière
(croiser le RNIC avec les trois paliers du DPE collectif donnerait un tableau
que personne ne publie).

🟡 **Faut-il ajouter la date de mise à jour dans `/llms.txt` ?** Constat du jour :
le fichier ne sert que `title` + `excerpt` (`app/llms.txt/route.ts`, ligne 43),
**aucune date**. Les recommandations GEO de la veille du 12/10 insistent sur le
contenu **daté**. **Hypothèse** : exposer `updated` dans `/llms.txt` aiderait un
LLM à préférer la version fraîche. ⚠️ **Non appliqué volontairement** — c'est une
modification d'un fichier qui marche, hors périmètre d'un run de contrôle, et
l'effet est non mesurable depuis ce conteneur. **À proposer comme micro-chantier
d'un prochain run non-contenu, pas à improviser.**

🟡 **Reconduite — « prix m2 Villeurbanne » n'a pas été mesurée** (cadence
hebdomadaire, précédente le 12/10). **Échéance : lundi 19/10, avec la veille.**

🟡 **Reconduite du 13/10 — « vendre appartement Villeurbanne » s'ouvre-t-elle à
l'éditorial ?** Non remesurée (cadence : 2 mesures par mois, précédente le
13/10). **À remesurer avant le 04/11.**

🟡 **Reconduite du 13/10 et du 14/10 — l'écart d'une vente dans l'extraction DVF**
(1 876 contre 1 875 publiés ; 436 T2 contre 435). **Rien réécrit. À trancher
quand DVF 2026 sortira.**

🟡 **Reconduites du 15/10, inchangées** : les deux angles RNIC qui demandent une
vérification avant publication (copropriétés sans mandat de syndic en cours —
**ne rien publier sans croiser `date_derniere_maj`** ; ancienneté du parc —
champ `periode_construction` inexploitable en l'état), et la fragilité du palier
« plus de 200 lots » du RNIC (une seule copropriété par valeur autour de 200 :
**remesurer avant d'appuyer un argument sur les 36**).

### 2026-10-15

🔴 **DÉFAUT VU, LOCALISÉ, NON CORRIGÉ — les bornes du calendrier de DPE collectif
de `dpe-2026-ce-qui-change` se chevauchent à 50 lots exactement.** La page écrit
« **d'au maximum 50 lots** » pour l'échéance du 01/01/2026 **et** « celles
**comprises entre 50 et 200 lots** » pour celle du 01/01/2025 : **une copropriété
de 50 lots pile relève des deux phrases**, qui donnent deux dates différentes.
C'est la 4ᵉ famille de défaut (contradiction interne, 13/10), sur une page qui
avait pourtant été réécrite le 11/10 et déclarée propre au balayage du 14/10 —
**parce que ce balayage groupait les nombres RÉPÉTÉS, et que « 50 » n'apparaît ici
qu'une fois par phrase sous deux formulations différentes.** 📌 **Le détecteur du
14/10 a donc un angle mort : les bornes d'intervalle énoncées en mots
(« au maximum », « entre … et »), qui ne se répètent pas numériquement.**
→ **À corriger au prochain run NON-CONTENU, et c'est le candidat n°1** : vérifier
la borne sur une fiche datée (`service-public` ou `ecologie.gouv.fr`), puis
trancher « ≤ 50 » / « 51 à 200 » comme le fait désormais `charges-copropriete`
pour le PPT. ⚠️ **Ne pas présumer que la borne du DPE collectif est la même que
celle du PPT** : les deux calendriers sont décalés d'un an (PPT 2023/2024/2025,
DPE collectif 2024/2025/2026), donc rien ne garantit que les seuils de lots
coïncident.

🟡 **Le registre national (RNIC) permettrait de chiffrer DEUX angles de plus, et
les deux demandent une vérification avant publication.**
1. **Les copropriétés sans mandat de syndic en cours.** Le champ `mandat_en_cours`
   donne, pour Villeurbanne : « Mandat en cours » **1 479 (71,6 %)**, « Pas de
   mandat en cours » **525 (25,4 %)**, « Mandat expiré sans successeur déclaré »
   **58 (2,8 %)**, « expiré avec successeur » 3. 🔴 **RIEN n'a été publié de ce
   champ, volontairement**, et il ne faut pas le publier en l'état : écrire
   « 28 % des copropriétés villeurbannaises n'ont pas de syndic » serait
   **très probablement faux** — le registre est déclaratif et un mandat non
   renouvelé dans le registre n'est pas un immeuble sans syndic. **À instruire :
   croiser avec la date de dernière MAJ (`date_derniere_maj`) pour distinguer
   l'absence réelle du simple défaut d'actualisation.** Sans ce croisement, ne
   rien publier.
2. **L'ancienneté du parc.** `periode_construction` donne « avant 1949 » pour
   **520 copropriétés (25,2 %)** — mais voir « Erreurs commises » : le champ
   mélange deux encodages aux bornes incohérentes et 20,7 % de valeurs absentes.
   **Inexploitable en l'état.** À rouvrir seulement si l'Anah homogénéise le champ.

🟡 **Le compteur légal du RNIC est-il assez fiable pour le palier « plus de
200 lots » ?** Le contrôle de robustesse des bornes montre **une seule copropriété
par valeur autour de 200** (199, 200, 201, 202, 203 : une chacune), contre 13 à 14
par valeur autour de 50. **Donc le chiffre de 36 copropriétés au-delà de 200 lots
bouge d'une unité à chaque déclaration corrigée, alors que le partage 51-200 /
≤ 50 est, lui, robuste.** Les trois chiffres sont publiés tels quels avec la
mention « registre déclaratif », ce qui est honnête, **mais si un run veut
appuyer un argument sur les « 36 », il doit remesurer d'abord** — le fichier est
réactualisé chaque jour.

🟡 **La SERP du chantier est-elle une source sous-exploitée ?** Les deux SERP
mesurées aujourd'hui ont livré **du contenu**, pas seulement une position : la
décision du Conseil d'État du 17/03/2026 vient du 2ᵉ résultat de « état daté
copropriété prix plafond 2026 ». **Hypothèse à tester sur deux ou trois runs :
mesurer systématiquement la SERP du chantier AVANT d'écrire, et compter combien
de fois elle apporte un fait publiable.** Si le taux est bon, cela devient une
étape de méthode et non une mesure de suivi.

### 2026-10-14

🆕 🟡 **Les deux SERP du jour sont identiques lien pour lien à une mesure
antérieure — est-ce la SERP qui se fige, ou le moteur qui sert du cache ?**
« agence immobilière Villeurbanne » est **rigoureusement identique au 13/10**
(zéro rotation en 24 h, ce qui n'était jamais arrivé sur quatre runs de bascule
annuaire) et « estimation immobilière Villeurbanne » est **rigoureusement
identique au 11/10**. ⚠️ **Les deux lectures sont plausibles et elles ne se
distinguent pas sur une mesure** : une SERP stabilisée, ou une réponse servie
depuis un cache. **À départager sur les deux prochains runs** : si les deux
requêtes rebougent le 15 ou le 16/10, c'était de la stabilité ; si elles restent
figées au lien près plusieurs jours alors que les SERP précédentes tournaient
chaque jour, il faudra **cesser de compter ces relevés comme des mesures
indépendantes** — et donc cesser d'écrire « Nᵉ mesure concordante ». **Rien n'a
été conclu aujourd'hui au-delà de ce que les 3 mesures antérieures établissaient
déjà.**

🟡 **Reconduite du 13/10 — la SERP « vendre appartement Villeurbanne » s'ouvre-t-
elle à l'éditorial ?** Non remesurée aujourd'hui (cadence : 2 mesures par mois au
plus, précédente le 13/10). **À remesurer avant le 04/11.** La règle du 08/10
tient : un seul delta ne conclut rien.

🟡 **Reconduite du 13/10 — mon extraction DVF compte 1 876 ventes là où le site
publie 1 875.** 🆕 **Le run du jour ajoute un cas et il va dans le même sens** :
les T2 comptent **436** ventes dans mon extraction contre **435** publiés. Les
médianes dérivées sont identiques (170 000 €, 3 829,8 €/m², 45,0 m²), et la
médiane de surface a été testée robuste au retrait d'une vente. **La méthode
n'est donc toujours pas en cause ; l'hypothèse « le fichier DVF latest a gagné
une vente depuis l'extraction du 07/09 » se renforce.** ⚠️ **Rien n'a été
réécrit, et surtout pas les `n` publiés** : les corriger à 436 sans recalculer
toute la page créerait une incohérence pire que celle d'aujourd'hui. **À trancher
quand DVF 2026 sortira.**

### 2026-10-13

🆕 🟡 **La SERP « vendre appartement Villeurbanne » s'ouvre-t-elle à l'éditorial ?
C'est la lecture du 04/10 qui est en jeu.** Le 04/10 : « 9 résultats, tous des
pages de listings, **zéro contenu éditorial** » — constat qui avait servi à fermer
l'angle (« la réécriture de `/vendre` ne déplacera pas cette SERP »). Le 13/10 :
**3 des 9 résultats sont éditoriaux** (deux articles de blog Laforêt sur « vendre
rapidement votre appartement », une page « actualités » Orpi). ⚠️ **Un seul delta
ne conclut rien (règle du 08/10).** À remesurer **avant le 04/11** (cadence : 2
mesures par mois au plus). **Si le constat se reproduit, l'angle « contenu
vendeur » se rouvre et `/vendre` redevient un candidat** — mais pas avant une
seconde mesure concordante.

🆕 🟡 **Mon extraction DVF compte 1 876 ventes d'appartements 2025 là où le site
publie 1 875.** Les quatre statistiques dérivées sont **identiques** (médiane
3 566,8 €/m² → 3 567, surface bâtie médiane 62 m², prix médian 195 000 €), donc
**la méthode n'est pas en cause** : l'hypothèse de travail est que le fichier DVF
« latest » a gagné une vente depuis l'extraction du 07/09. ⚠️ **Rien n'a été
réécrit** : les tableaux Carrez portent leur propre `n` et leur date
d'extraction. **À trancher quand DVF 2026 sortira** — si le `n` du 07/09 n'est
pas reproductible, c'est le fichier qui bouge, et il faudra le dire dans la note
de méthode de `prix-immobilier-villeurbanne-2026`.

🆕 🟡 **Faut-il publier le taux de renseignement de 92,1 % dans le corps de la
page ?** Il est dans l'en-tête de `lib/blog.ts` et déductible du texte
(1 727 / 1 876), mais **pas écrit tel quel dans l'article** — choix fait pour ne
pas alourdir une légende déjà longue. **À reconsidérer si une page de fond sur le
dossier de vente est créée** : « 8 ventes sur 100 n'ont pas de surface Carrez
enregistrée dans DVF » est un fait intéressant, mais il mélange deux causes
(lot non concerné / donnée manquante) que je **ne sais pas départager** — donc
non publiable en l'état.

### 2026-10-12

🟡 **Le diagnostic termites est-il dû à Villeurbanne ?** Il dépend d'un **arrêté
préfectoral** déclarant la zone infestée ou susceptible de l'être (fiche F3150).
`www.rhone.gouv.fr` est **injoignable depuis le conteneur** (`exit 92`). La page
publie donc la condition officielle, sans trancher pour Villeurbanne.
→ **Si un run trouve une source joignable pour les arrêtés termites du Rhône, la
page peut devenir l'une des rares à répondre OUI ou NON pour la commune** —
réponse que ni les franchises ni les annuaires ne donnent. Valeur GEO élevée,
coût faible dès que la source existe. **Ne pas répondre de mémoire.**

🟡 **Villeurbanne est-elle en zone d'exposition au bruit des aéroports (PEB) ?**
Lyon-Bron est proche, et le **diagnostic Bruit** est dû dans ces zones (fiche
F10798). **Non sourcé** : le PEB ne figure pas dans l'API `gaspar/risques`, qui ne
rend pas le bruit. La ligne du tableau publie la condition, pas la réponse locale.
→ Même enjeu et même interdiction que les termites.

🟡 **Que signifie la classe de potentiel radon 1 ?** L'API Géorisques rend
`classe_potentiel: "1"` pour le code INSEE 69266, mais **l'échelle 1/2/3 n'a pas
pu être sourcée** : `/risques/radon` rend **500** via WebFetch et
`/consulter-les-dossiers-thematiques/radon` rend 200 **sans texte exploitable**
(coquille JS). Le zonage vient de l'arrêté du 27 juin 2018, **non vérifié**.
→ **Volontairement NON publié** : un numéro sans son échelle n'informe pas, et
l'interpréter de mémoire serait la faute du 11/10. Seule la *présence* du risque
radon est publiée. À reprendre si une source officielle de l'échelle devient
joignable.

🟡 **Quelle est la durée de validité de l'audit énergétique ?** Absente de la
fiche F37110 telle que consultée le 11/10. Le tableau du jour est donc **borné au
cas de l'appartement** (où l'audit n'est jamais dû) et l'audit est traité sans
durée dans le H2 « maison ».
→ À compléter si la fiche la porte ailleurs, ou via `ecologie.gouv.fr` quand il
répond (il a rendu `exit 35` aujourd'hui, 200 le 11/10).

🟢 **La SERP « prix m2 Villeurbanne » récompense-t-elle la RUE plutôt que la
commune ?** Trois des neuf résultats du 12/10 ciblent une rue ou un quartier
(`efficity` rue du Progrès, `realadvisor` rue des Mûriers, `qoridor` quartier
Charpennes). **Notre page est communale + 7 quartiers.**
→ ⚠️ **Une seule mesure ne conclut rien (règle du 08/10) : à confirmer sur une
seconde SERP avant d'en faire un chantier.** Si c'est confirmé, la question
suivante est **si la base DVF permet une maille infra-quartier défendable** —
elle ne le permettra pas partout (effectifs trop faibles par rue), et publier une
médiane de rue calculée sur 3 ventes serait pire que ne rien publier.

### 2026-10-08

🟡 **Sur les pages de quartier, la date VISIBLE et le `dateModified` ne sortent pas
de la même source — faut-il les unifier ?** Constaté aujourd'hui : `updated={MAJ}`
affiche **2026-09-15** (date de calcul des chiffres DVF, depuis `lib/quartiers.ts`)
tandis que `lastmodOf()` alimente le sitemap et le `dateModified` du JSON-LD
(**2026-10-08** après ce run). **Les deux lectures sont défendables** — « la donnée
date du 15/09 » pour le lecteur, « la page a changé le 08/10 » pour le crawler —
**mais l'en-tête de `lib/seo/lastmod.ts` annonce explicitement que les pages lisent
la table pour leur « Dernière mise à jour » visible**, ce qui n'est pas le cas de
ces trois pages. ⚠️ **Divergence ANTÉRIEURE à ce run** (visible 15/09 vs table
04/10) : elle n'a pas été créée aujourd'hui, seulement élargie de 19 à 23 jours.
**À trancher explicitement un jour, pas en passant** : soit les pages de quartier
affichent deux dates distinctes et nommées (« chiffres au 15/09 » / « page mise à
jour le 08/10 »), soit elles lisent la table comme les autres et `MAJ` ne sert plus
qu'aux chiffres. **Ne rien unifier sans cette décision** — c'est du rendu, et la
consigne client est « ne rien casser ».

### 2026-10-07

🔴 **Le coût de l'état daté est-il plafonné, et à combien ?** L'article du 07/10
dit que l'état daté est « établi par le syndic à votre demande » et que **son prix
dépend du contrat de syndic** — volontairement **sans aucun montant**. Un plafond
réglementaire existe en mémoire (de l'ordre de 380 € TTC), **mais il n'a PAS été
sourcé** : Legifrance est fermé depuis le 29/09 et la fiche F2604 de
service-public, pourtant complète, **n'en dit pas un mot** (vérifié au `grep` sur
« 380 » et « plafon »). **Ne jamais publier ce montant avant de l'avoir
téléchargé d'une source primaire** (BOFiP, ou un autre `.gouv`). Si la source est
trouvée, c'est une ligne de coût de plus pour `vendre-sans-agence` et un chiffre
que les articles concurrents n'ont pas.

🔴 **La lecture du 02/10 sur « estimation immobilière Villeurbanne » est-elle
seulement mesurable d'ici ?** Le 02/10 : « 6 des 10 résultats sont des pages prix
au m² », d'où l'idée de remonter la donnée de prix avant la promesse de service.
Le 07/10 : **0 page de prix, 9/9 pages de prestation d'agence.** Les deux mesures
sont incompatibles, à cinq jours d'intervalle, sur la même requête. **Hypothèse à
inscrire : l'outil de recherche disponible ici ne rend pas une SERP stable, et la
composition relevée ne peut pas fonder une décision de rendu.** Conséquence
immédiate : **ne pas réordonner `/estimation-immobiliere-villeurbanne`** sur cette
base (et la règle « en cas de doute sur le rendu, on n'y touche pas » suffisait
déjà).

✅ **CLOSE LE JOUR MÊME — le sitemap de production sert bien 53 URLs** (51 en
local). L'explication tirée de `app/sitemap.ts` était la bonne : les annonces
Supabase et les pages de l'éditeur manquent dans le conteneur. **Aucun défaut, et
règle à garder : un compte d'URLs mesuré en local n'est pas comparable à celui de
la production** — ne jamais ouvrir un chantier sur cet écart.

📌 **Un `lastmod` inchangé empêche-t-il Google de voir une phrase ajoutée ?**
Question du 06/10, **toujours ouverte et toujours non vérifiable d'ici** (il
faudrait Search Console). Le 07/10 applique la même décision : seul
`/blog/vendre-sans-agence` voit sa date avancer, `/vendre` et
`mandat-simple-ou-exclusif` gardent la leur bien qu'ils aient reçu une phrase.
**Trois runs appliquent maintenant cette règle sans pouvoir la valider** — c'est
le genre de dette de mesure que l'accès Search Console réglerait seul.

### 2026-10-06

🔴 **`fonciris.fr` publie une médiane DVF à 4 € de la nôtre — notre donnée propre
est-elle encore propre ?** Mesuré sur « prix m2 Villeurbanne » : le site titre
« Prix m2 Villeurbanne : 3 571 €/m² (69100) 2026 » et se dit basé sur la base DVF ;
notre médiane communale est **3 567 €/m²**. **À vérifier avant d'écrire quoi que ce
soit sur cette requête** : publie-t-il aussi du **par quartier**, et sur quels
contours ? Si oui, tout l'avantage « nous partons des prix signés » se réduit au
**découpage par contours de la Métropole de Lyon** et aux croisements que lui ne
fait pas (net vendeur, seuil de plus-value, rendement) — pas à la médiane.
Conséquence si l'hypothèse se confirme : **arrêter de présenter la médiane
communale comme une donnée exclusive.**

📌 **Les 12 articles de 200-500 mots doivent-ils être fusionnés ?** Ils sont
indexés, dans le sitemap, et ne reçoivent aucun lien éditorial parce qu'il n'y a
rien à lier. L'hypothèse est qu'ils **diluent le signal de qualité** du site.
⚠️ **Ne rien faire sans instruction sérieuse** : fusionner, c'est faire disparaître
des URLs et poser des redirections — changement destructif, à l'opposé de « rien
casser ». À instruire : combien reçoivent du trafic (→ **nécessite Search
Console**), lesquelles sont citées ailleurs. **Tant que la question n'est pas
tranchée, la réponse est : réécrire, pas fusionner.**

📌 **Les `lastmod` doivent-ils bouger quand on ajoute un lien ?** Décision du
06/10 : **non** (avancer la date serait de l'inflation de fraîcheur, que le brief
interdit). Hypothèse non vérifiée derrière cette décision : un `lastmod` inchangé
n'empêche pas Google de recrawler la page et de découvrir le nouveau lien.
**À confirmer au prochain run** en regardant si les pages touchées le 06/10
apparaissent recrawlées — ce qui, là encore, **demanderait Search Console**.


**Ouvertes au 2026-10-04**

- 🔴 **Faut-il un lien éditorial depuis le `<main>` de la home vers `/blog`,
  `/vendre` ou `/acheter` ? — À SOUMETTRE AU CLIENT.** C'est **la** correction qui
  remettrait tout le site à la profondeur éditoriale 2 au lieu de 4, et la mesure
  du 04/10 est sans ambiguïté : le `<main>` de la home dépense ses **11 liens
  éditoriaux** sur **6 annonces individuelles**, `/annonces`, `/equipe`,
  `/estimation`, `/faire-gerer` et `/recrutement` — **aucun** vers `/vendre`,
  `/acheter` ou `/blog`. Les 22 pages de profondeur 4 en découlent entièrement.
  **Non fait volontairement** : `CLAUDE.md` déclare l'ordre des sections de la
  home « EXACT, non négociable » et la maquette est validée. Ce n'est pas une
  décision de run automatique. ⚠️ **Préciser au client que la demande est
  minuscule** : il ne s'agit pas d'ajouter une section mais, au plus, **un lien
  dans une phrase existante** (la section « Qui sommes-nous » ou « Outil
  d'estimation » peut porter un lien vers `/vendre` ou `/acheter` sans changer ni
  l'ordre ni le rendu).
- 🔴 **`/espace-client` : les trois options, et la troisième est nouvelle.** État
  revérifié le 04/10 : la page rend **200**, **aucune balise `robots`**, elle est
  `disallow` dans `robots.txt` **et** liée depuis le header des **53 pages**
  (icône 👤). Donc indexable « en URL seule », et son `noindex` ne pourra jamais
  être lu puisque le crawl est interdit. (a) Retirer le `disallow` + poser un
  `noindex` — la manœuvre canonique, mais elle **ouvre au crawl une page que le
  client a fermée** ; refusée le 10/09 et encore le 04/10. (b) Ne rien faire —
  l'URL peut apparaître en SERP sans description. (c) 🆕 **Poser `rel="nofollow"`
  sur les deux liens 👤 du header** (`components/layout/site-header.tsx`, lignes
  65 et 154) : supprime le signal de découverte **sans rien ouvrir au crawl**.
  C'est l'option la moins intrusive des trois, mais elle touche le header :
  **à soumettre**. (`/radar` est dans le même cas mais **n'est lié depuis aucune
  page publique**, donc sans enjeu. `/signin` porte le gabarit correct.)
- 🟡 **Le `<h1>` de plusieurs pages de service est un slogan sans sujet**
  (`/faire-gerer` « Confiez la gestion à une agence locale. »,
  `/gestion-locative` « Déléguer, ou gérer soi-même ? », `/contact` « Une
  question ? Parlons-en. », `/honoraires` « Nos honoraires. »). Ce ne sont **pas**
  des doublons et ce n'est **pas** un défaut mesuré — c'est un choix de direction
  artistique, à arbitrer avec le client avant d'y toucher. (Ouverte le 01/10.)
- 🟡 **32 `<title>` sur 53 dépassent 70 caractères** (jusqu'à 114 sur une fiche
  bien) et se font donc tronquer en SERP. Non traité : ce serait toucher 32 pages
  qui fonctionnent pour un gain non mesurable d'ici, et plusieurs de ces titres
  longs portent justement la donnée différenciante. (Ouverte le 01/10.)


**Ouvertes au 2026-10-02**

- 🔴 **Le « taux de négociation médian de 3,85 % à Villeurbanne » est-il
  sourçable ?** Avancé par le résumé du moteur sur la requête « marge de
  négociation Villeurbanne » mesurée le 02/10, **sans qu'aucun des 9 résultats
  rendus ne permette de l'attribuer**. **Non publié, et à ne pas publier tant
  que la source primaire n'est pas téléchargée et datée** (règle du 23/09 sur
  les chiffres tiers). Si une source sérieuse existe — notaires, MeilleursAgents
  — ce serait une donnée acheteur forte, parce que la place éditoriale locale
  sur cette question est **vide** (1 seul éditorial national sur 9 résultats).
- 🟡 **`/estimation-immobiliere-villeurbanne` : faut-il mettre la donnée de prix
  AVANT la promesse de service ?** Mesure du 02/10 sur la requête nue
  « estimation immobilière Villeurbanne » : **6 des 10 résultats sont des pages
  « prix au m² »**, pas des pages de prestation. Le moteur lit cette requête
  comme une demande de **donnée**, pas de service. La page porte déjà des
  repères par quartier ; la question est celle de l'ordre, donc du rendu — **à
  ne pas trancher seul** (règle : en cas de doute sur le rendu, on n'y touche
  pas).
- 🟡 **La chaîne de redirection `markusimmobilier.fr` → `www.markusimmobilier.fr`
  est-elle propre de bout en bout ?** Le 308 est correct en soi ; ce qui n'a
  jamais été vérifié, c'est le nombre de sauts, la cohérence des canonicals, du
  sitemap et de `robots.txt` avec l'hôte `www`, et le comportement sur les URLs
  profondes. Inscrit au backlog comme piste (b).

**Ouvertes au 2026-10-01**

- 🟡 **32 `<title>` sur 53 dépassent 70 caractères : faut-il les raccourcir ?**
  Mesuré le 01/10 sur le HTML servi ; le plus long atteint **114 caractères**
  (fiche `appartement-t3-vendre-villeurbanne-grand-clement`). Google tronque
  autour de 580 pixels, donc une partie de ces titres n'est pas lue en SERP.
  **Mais** plusieurs de ces titres longs portent exactement la donnée
  différenciante publiée les jours précédents (« le calcul exact », « mesuré sur
  1 875 ventes », « les chiffres réels par quartier »), et le gabarit
  `· Markus Immobilier` consomme 20 caractères à lui seul. Deux sous-questions à
  trancher, dans cet ordre : **(1)** vaut-il mieux retirer le suffixe de marque
  du gabarit pour les pages de fond que raccourcir leur promesse ? **(2)** la
  troncature coûte-t-elle quelque chose quand la page n'apparaît dans aucune SERP
  mesurée ? Sans Search Console, le CTR n'est pas observable d'ici : **cette
  hypothèse n'est probablement pas tranchable depuis ce conteneur**, et c'est une
  raison de la laisser ouverte plutôt que d'agir au jugé sur 32 pages qui
  fonctionnent.
- 🟡 **Les `<h1>` « slogan » des pages de service : défaut SEO/GEO ou choix de
  direction artistique à respecter ?** Mesuré le 01/10 : `/faire-gerer` sert
  « Confiez la gestion à une agence locale. », `/gestion-locative` « Déléguer, ou
  gérer soi-même ? », `/contact` « Une question ? Parlons-en. », `/honoraires`
  « Nos honoraires. » — aucun ne nomme la ville, certains ne nomment pas le
  service. Pour un extracteur de passages, un `<h1>` qui ne dit pas de quoi parle
  la page affaiblit tout ce qui est en dessous. **Mais** `design-system.md` et la
  maquette validée posent un ton « premium, sobre, phrases courtes », et ces
  `<h1>` en sont l'expression : les réécrire, c'est toucher à la DA validée par
  le client, pas corriger un bug. Le 01/10 n'a corrigé que le cas **non
  discutable** (deux pages servant le même `<h1>`), et a trouvé une formulation
  qui dit le sujet **sans** casser le ton (« Acheter à Villeurbanne, sans
  surpayer. »). → **À proposer au client plutôt qu'à décider seul** ; preuve
  qu'un `<h1>` peut être élégant et explicite à la fois : les deux corrigés le
  01/10.
- 🟡 **« Agence immobilière Gratte-Ciel Villeurbanne » souffre-t-elle du même
  biais de marque que Charpennes ?** Mesuré le 01/10 : la requête Charpennes est
  monopolisée par un concurrent dont le nom contient « Charpennes ». Or Human
  Immobilier exploite une agence nommée « Villeurbanne Gratte Ciel », vue en page
  1 les 30/09 et 01/10. **À mesurer une fois** avant de compter sur cette requête
  (jamais mesurée à ce jour).

**Ouvertes au 2026-09-30**

- 🟡 **« Voir le bien » : six ancres identiques pour six cibles différentes —
  défaut ou pattern ?** L'audit du 30/09 a laissé exactement une ancre
  ambiguë : les six cartes d'annonces portent toutes « Voir le bien ». Dans le
  contexte de la carte, le titre du bien est lui-même un lien vers la même
  cible, donc l'ambiguïté est levée pour un lecteur ; pour un extracteur qui
  isole l'ancre, elle ne l'est pas. **Non corrigé aujourd'hui, volontairement** :
  la correction (un `aria-label` par carte) touche un composant partagé qui rend
  toutes les annonces, et la règle du client est « il faut juste rien casser ».
  À trancher un jour où le chantier porte déjà sur `/annonces`. **Ne pas le
  bricoler au passage.**
- 🟡 **L'effet de seuil à 170 000 € du barème de transaction est-il connu du
  client ?** `/vendre` publie depuis aujourd'hui que le taux effectif tombe à
  5,30 % sous 170 000 € (forfait de 9 000 €) contre 6,00 % au-dessus. C'est une
  lecture directe du barème déjà public de `/honoraires`, présentée comme un
  fait et sans jugement. **Rien à corriger tant que le barème ne change pas** ;
  noté ici parce que c'est la première fois que le site met en regard le forfait
  et le pourcentage, et que le client pourrait vouloir le formuler autrement.
- 🟡 **`/vendre` va-t-elle bouger sur `vendre appartement Villeurbanne agence` ?**
  Mesure de référence du 30/09 : **absente du top 10**, SERP faite de portails,
  de franchises et d'une fédération, **aucun résultat ne dit au vendeur ce qu'il
  touchera**. Le créneau « décompte du net vendeur » est vide. **Remesurer une
  fois vers le 07/10**, pas avant (une semaine, comme pour les chantiers
  précédents). ⚠️ Et se souvenir de la leçon du 29/09 : ce qui se fait citer,
  c'est ce que personne d'autre ne publie — ici le tableau par quartier et le
  fait sur 2022, pas les règles nationales de plus-value.
- 🟡 **Le faux positif « Aquila Immobilier » du résumé du moteur est-il
  terminé ?** Systématique sur les runs des 27, 28 et 29/09 (et une fois le
  23/09), **absent le 30/09**. Si le défaut de l'instrument est intermittent
  plutôt que constant, la règle du 23/09 (« ne jamais compter un nom qui
  n'apparaît pas dans les liens ») reste bonne de toute façon. À observer, pas
  à traiter.


- ~~🔴 **« CPIM : Charpennes 5 120 €/m² » est-il un chiffre vérifié ou un résumé
  de moteur ?**~~ *(ouvert le 23/09)* — **TRANCHÉ le 2026-09-24 : le chiffre
  est VRAI, la mention peut rester dans le code.** La page
  `cpim.fr/villeurbanne-prix-m2-quartiers/` a été **téléchargée directement**
  (jamais lue dans un résumé de moteur) et elle publie, en toutes lettres :
  « Charpennes est le quartier le plus cher de Villeurbanne, avec un prix moyen
  au m² de **5 120 €/m²** en 2026 dans l'ancien (jusqu'à 6 200 €/m² pour les
  programmes neufs rue Émile Zola) », et un récapitulatif « Charpennes
  5 120 €/m², Gratte-Ciel 4 520 €/m², Croix-Luizet et Tonkin Sud 3 920 €/m²,
  Cusset 3 680 €/m² ». Son JSON-LD porte `datePublished` au 2026-05-15 et
  `dateModified` au **2026-08-11**.
  **Conséquences :** (a) la mention de l'en-tête de
  `app/agence-immobiliere-charpennes/page.tsx` est exacte, elle **reste** ;
  (b) l'écart avec notre médiane DVF sur Charpennes – Tonkin (**3 524 €/m²**)
  est réel et vaut **+45 %** ; (c) **l'angle « écart entre prix affichés et prix
  réellement payés », posé le 12/09 et fragilisé le 23/09, est rétabli et
  désormais sourcé de première main**. Il redevient un candidat de contenu
  sérieux.
  ⚠️ **Nuance de méthode, à retenir** : la leçon du 23/09 n'est pas « le résumé
  du moteur ment toujours ». Le 23/09 il attribuait des chiffres à deux pages
  qui n'en publiaient aucun ; aujourd'hui, sur CPIM, il citait exactement ce que
  la page publie. **La règle reste la même — on ne cite que ce qu'on a
  téléchargé — mais elle sert à confirmer autant qu'à infirmer.**

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

### 2026-10-20 — J'ai failli publier l'exclusion exactement à l'envers, et c'est le § de la source qui m'a arrêté

**1. 🔴 J'AI ÉCRIT QUE LE « MALRAUX » EXCLUT LE MICRO-FONCIER. LE BOFiP DIT
L'INVERSE, NOIR SUR BLANC.**

En précisant le périmètre du micro-foncier sur `/gestion-locative`, j'ai rédigé
d'abord :

> « il faut qu'aucun des biens loués ne relève d'un régime spécial (monument
> historique, **Malraux**, certains dispositifs d'amortissement), qui exclut le
> micro-foncier »

**Faux.** `BOI-RFPI-DECLA-10 § 60`, *in fine* : « *la circonstance que le
contribuable bénéficie de la réduction d'impôt « Malraux » prévue à l'article
199 tervicies du CGI **ne fait pas obstacle** à l'application du régime
d'imposition micro-foncier* ». Le même paragraphe dit la même chose du
**Scellier**, du **Duflot**, du **Pinel** et du **Denormandie**.

📌 **Ce que j'ai fait de travers, précisément** : j'ai écrit la liste **de
mémoire**, avec le mot « certains » pour couvrir mon approximation, **puis** je
suis allé lire le § 60. L'ordre inverse aurait évité la faute. ⚠️ **Et « certains
dispositifs d'amortissement » est le vrai aveu** : une énumération vague dans un
texte de droit est le symptôme d'une liste non lue.

**Correction appliquée, et elle va plus loin que le défaut** : la page publie
maintenant **la liste exacte** des régimes qui excluent (monument historique,
*Périssol*, *Besson neuf*, *Robien*, conventionnement ANAH — *Borloo ancien*,
*Cosse* —, *Loc'Avantages*) **et, volontairement, l'erreur symétrique** : Pinel,
Denormandie et Malraux **ne** l'écartent **pas**. 🟢 **C'est le passage le plus
citable du run** : il répond à une question que les lecteurs se posent dans les
deux sens, et aucune des pages concurrentes rencontrées ne tranche le second.

**Règle à retenir, qui prolonge celle du 19/10** : la règle d'hier disait « une
ligne *Source : X* ne couvre que ce que X dit ». Celle d'aujourd'hui en est le
pendant à la rédaction : **ne jamais écrire une énumération juridique avant
d'avoir lu le paragraphe qui la porte** — et **si le brouillon contient
« certains », « notamment » ou « etc. » dans une liste de régimes ou de
conditions, c'est le signal que la source n'a pas été ouverte.**

**2. ⚠️ MON DÉTECTEUR DE « MOTS COLLÉS » A RENDU 180 FAUX POSITIFS, ET J'AI
FAILLI LES PRENDRE POUR DES DÉFAUTS.**

```bash
# FAUX — grep travaille en octets : [A-ZÉÈÀ] attrape les octets de
# continuation de é/è/à, donc « accès » et « année » matchent
grep -oE "[a-zéèêàçûô]{3,}[A-ZÉÈÀ][a-zéèêà]{2,}" page.txt
```

Résultat : `accès année après barème bénéficier …` — 180 « mots collés » dont
**aucun** n'en était un. **La version juste passe par Python**, qui travaille en
points de code :

```bash
python3 -I -c "
import re
t=open('page.txt',encoding='utf-8').read()
print(sorted(set(re.findall(r'[a-zà-öø-ÿ]{3,}[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]{2,}',t))) or 'aucun ✓')"
```

📌 **Portée générale** : **tout contrôle de casse ou d'accents sur ce corpus doit
passer par Python, jamais par une classe de caractères `grep`.** Le corpus est
intégralement en français accentué — un `grep -E` avec `[A-Z…]` y est inutilisable.

**3. ⚠️ ET UN PIÈGE DE MESURE QUI A RESSEMBLÉ À UN DÉPLOIEMENT PARTIEL.**

Après déploiement, production servait **2 099 mots** pour `/faire-gerer` quand le
local en annonçait **2 200** — à contenu rigoureusement identique. **Ce n'est pas
un déploiement partiel : `wc -w` et `len(t.split())` ne comptent pas pareil** les
espaces insécables du rendu. J'avais mesuré l'un en shell et l'autre en Python.

📌 **Règle** : comparer deux mesures faites avec **le même compteur**, et pour
vérifier un déploiement, **tester des CHAÎNES** (« cette référence est-elle
servie ? ») plutôt que des **totaux**. C'est la vérification par chaînes qui a
tranché en dix secondes.

### 2026-10-19 — Mes deux fautes du jour sont dans le texte que J'AI écrit, et l'une violait une règle posée la veille

**1. 🔴 J'AI INSÉRÉ UNE PHRASE AU MILIEU D'UNE ÉNUMÉRATION ET CASSÉ LA LIGNE LA
PLUS LUE DU SITE PAR LES IA.**

L'entrée `/vendre` de `/llms.txt` est une longue phrase à structure fixe :
« … *Répond aussi à : A, B, C, le fait local que …, l'indemnité …, et le moment
où …* ». J'ai glissé mes deux faits 2026 **à l'intérieur** de cette énumération,
après l'élément « impôt sur la plus-value ». Résultat rendu :

> … impots.gouv.fr, page modifiée le 13/07/2026)**, le fait local que** le prix
> médian au m² …

**Une phrase complète refermée par un point-virgule, puis l'énumération qui
reprend par une virgule.** Illisible, et dans le fichier que les IA lisent en
priorité.

📌 **Ce que j'en retiens, et c'est généralisable** : `/llms.txt` n'est pas une
liste de puces, **c'est une phrase par page**. Une addition ne s'y insère pas où
le sujet tombe, **elle s'ajoute à la fin**. ⚠️ **Et ça ne se voit pas dans le
diff** : le diff montrait un `+` propre sur une ligne de 3 000 caractères. **Seul
le rendu lu à l'œil l'a montré** — d'où la règle : *rendre `/llms.txt` et relire
la ligne entière, pas le diff.*

**2. 🔴 J'AI PUBLIÉ UN CHIFFRE DANS `/llms.txt` QUE LA PAGE DÉCRITE NE PUBLIE
PAS — exactement ce que la règle du 18/10 interdit, un jour après qu'elle a été
écrite.**

Ma première version mettait **18,6 %** dans l'entrée `/vendre`. Or `/vendre` ne
publie pas 18,6 % — ce taux vit sur `/blog/plus-value-immobiliere-calcul`. La
règle du 18/10 est sans ambiguïté : *« pour chaque nombre de `route.ts`,
vérifier soit qu'il est publié tel quel sur la page décrite, soit qu'il se
recalcule sur des valeurs qui le sont »*. **Mon ajout créait, de ma main, la
famille de défaut que le run de la veille avait passé la journée à éliminer sur
157 montants.**

✅ **Corrigé avant le push** : le bloc est reposé en fin d'entrée, et **la phrase
nomme explicitement la page qui publie ces chiffres** (« détaillés et sourcés sur
/blog/plus-value-immobiliere-calcul »). Le lecteur — humain ou machine — peut
aller vérifier, ce qui est le but de la règle.

📌 **La leçon qui compte : la règle du 18/10 a été écrite pour AUDITER
l'existant, et elle vaut aussi pour ÉCRIRE du neuf.** Elle n'était formulée que
comme un détecteur ; elle est désormais aussi une contrainte de rédaction.
**À appliquer à chaque ajout dans `app/llms.txt/route.ts` : avant d'écrire un
chiffre, nommer la page qui le publie. Si aucune ne le publie, ne pas l'écrire —
ou renvoyer à celle qui le fait.**

**3. ⚠️ ET UN FAUX POSITIF DE MON PROPRE DÉTECTEUR, à ne pas reproduire.**

Mon contrôle de production a signalé « **moins d'un kilomètre** » comme
**ABSENT** de la page — alarmant, puisque c'est une des règles publiées du jour.
**C'était faux.** J'avais écrit le motif de test avec une apostrophe
typographique (`U+2019`, `’`) et je le cherchais dans le **HTML brut**, où le
texte sort avec l'apostrophe droite de la source. La phrase était bien servie,
trois fois.

📌 **Règle** : tester les chaînes contenant une apostrophe **sur le texte
dé-balisé et `html.unescape`é**, jamais sur le HTML brut — ou normaliser les
apostrophes (`’` → `'`) des deux côtés avant comparaison. **Les 18 autres
valeurs du même contrôle étaient justes : un détecteur qui crie au loup sur une
valeur sur 19 fait perdre plus de temps qu'il n'en gagne.**

### 2026-10-18 — Une correction juste a laissé un défaut derrière elle (7ᵉ famille), et un push techniquement réussi n'a rien déployé pendant 4 minutes

**1. 🔴 LA 7ᵉ FAMILLE DE DÉFAUT INVISIBLE : LA COPIE QUE LA CORRECTION LAISSE
DERRIÈRE ELLE. Le défaut du jour a été CRÉÉ par le run du 17/10, et par la
partie JUSTE de son travail.**

Le 17/10 a corrigé un arrondi dans `/blog/frais-de-notaire-lyon-2026`
(18 231 → **18 230 €**), a vu que `/llms.txt` en dérivait un total à la main, et
l'a corrigé aussi. **Les deux gestes étaient bons.** Mais une **troisième** copie
de la même valeur existait, et personne ne la cherchait :
`app/acheter/page.tsx:95`, `const FRAIS_62_MAX = 18231`.

Résultat servi en production pendant 24 h : **18 231 / 261 457 / 78 830** sur
`/acheter` contre **18 230 / 261 456 / 78 829** dans `/llms.txt` et dans
l'article. **Le site se contredisait sur la même quantité.**

🔴 **Ce qui rend cette famille distincte des six précédentes :**
- Le défaut **n'existait pas avant la correction**. Aucun audit antérieur ne
  pouvait le trouver : la valeur était juste la veille.
- **Le seul lien entre la copie et sa source est un COMMENTAIRE** (« repris TELS
  QUELS des calculs publiés dans `/blog/frais-de-notaire-lyon-2026` »). Rien
  dans le code, aucun test, aucun type ne le fait respecter. Un commentaire
  exact **ne protège de rien**.
- La 6ᵉ famille (17/10) disait « `/llms.txt` additionne des montants publiés
  ailleurs ». **La 7ᵉ est plus large et plus dangereuse** : *n'importe quel*
  fichier peut détenir une copie manuelle d'un montant publié ailleurs, et
  `/llms.txt` n'est qu'un cas particulier.

📌 **RÈGLE À APPLIQUER DÉSORMAIS, SANS EXCEPTION — elle est cheap et elle est le
vrai enseignement du run :** *dès qu'un run corrige un montant publié, grepper
l'ANCIENNE valeur dans tout `app/` + `lib/` + `components/`, dans ses quatre
écritures (collée, espace normal, insécable ` `, fine insécable ` `),
AVANT de commiter.* La commande est en « Techniques apprises » du 18/10. Le
17/10 avait fait ce balayage **sur les sommes dérivées** mais **pas sur la valeur
corrigée elle-même** — c'est l'angle mort exact.

⚠️ **Et la correction ne suffit pas à fermer la famille** : la bonne réponse de
fond serait de **dériver** la valeur au lieu de la copier. C'est un refactor, la
consigne client l'interdit (« ne refactorise rien »). Le filet posé à la place
est un **commentaire de traçabilité** qui nomme la ligne exacte de l'article et
dit explicitement que la valeur **n'est pas dérivée**. **C'est un filet, pas une
garantie — noté en « Hypothèses à vérifier ».**

**2. 🔴 LE PUSH A RÉUSSI ET N'A RIEN DÉPLOYÉ. Vercel ne déploie que `main`, et
pousser la branche de session ne sert à rien.**

Le run a d'abord poussé **uniquement** sur la branche de session
(`claude/dazzling-feynman-k36jib`). Tous les contrôles étaient verts :
`git push` a réussi, `HEAD == origin/<branche>`, `2192467` des deux côtés. **Et
la production a servi l'ANCIENNE valeur pendant 4 minutes de sondage (12
relevés à 20 s d'intervalle, aucun changement).** Après
`git branch -f main HEAD && git push -u origin main` : **déploiement constaté à
t+60 s**.

⚠️ **Deux pièges se sont additionnés, et le second est le plus sournois :**
- `git branch -a` affichait `remotes/origin/claude/dazzling-feynman-k36jib`
  **au démarrage**, ce qui donnait à croire que la branche existait sur le
  remote. **Elle n'existait pas** : le push a répondu **`* [new branch]`**. Ce
  ref de suivi était **local**. 📌 **Un ref `remotes/origin/…` affiché par
  `git branch -a` ne prouve PAS que la branche existe sur le remote.**
- Le `git log origin/claude/dazzling-feynman-k36jib` du début de run répondait
  donc… **l'état de `main`**, sans erreur, ce qui a conforté la lecture fausse.

📌 **La recette du 17/10 est la seule qui déploie, et sa ligne `main` n'est pas
décorative.** Inscrit en tête de « Techniques apprises » du 18/10. **Le contrôle
qui tranche reste celui du 11/10 — `origin/main == HEAD` —, et il faut y ajouter
le seul contrôle qui compte vraiment : SONDER LA PRODUCTION.** Un push vert sur
la mauvaise branche est indétectable par git seul.

**3. ⚠️ UN DÉTECTEUR JETÉ APRÈS 43 FAUX POSITIFS SUR 43, et la cause est
structurelle.** Le premier contrôle écrit aujourd'hui greppait les nombres de
`app/llms.txt/route.ts` dans le **source** des pages : il a annoncé **43
montants « absents »** sur 157. **Les 43 étaient faux.** Les pages **ne
contiennent aucun chiffre en dur** — elles dérivent tout de `lib/quartiers.ts`
via `fmtEur()`, et les en-têtes des pages de quartier le disent noir sur blanc.
📌 **Leçon : avant d'écrire un détecteur sur un corpus, lire l'en-tête d'un de
ses fichiers.** Celui de `agence-immobiliere-gratte-ciel/page.tsx` annonçait
« aucun chiffre en dur dans ce fichier » — dix secondes de lecture auraient
économisé le détecteur. **Le contrôle juste se fait sur le RENDU**, jamais sur le
source, dès que le corpus utilise des helpers de formatage.

### 2026-10-17 — Une correction d'arrondi a cassé un total écrit à la main dans `llms.txt` (6ᵉ famille de défaut invisible), et deux défauts de rédaction attrapés dans mon propre brouillon

**1. 🔴 LA VRAIE ERREUR DU RUN, ET ELLE EST DE PORTÉE : `/llms.txt` CONTIENT DES
CHIFFRES ÉCRITS À LA MAIN QUI DÉRIVENT DE PAGES, ET RIEN NE LES RELIE.**
Le 16/10 notait, à juste titre, que `/llms.txt` « ne sert que `title` +
`excerpt` de chaque article, aucune date », et en concluait qu'une correction
qui ne touche ni l'un ni l'autre ne le fait pas dériver. **C'est vrai pour la
section des articles. C'est FAUX pour le reste du fichier.** Les entrées des
pages « argent » de `app/llms.txt/route.ts` sont **rédigées à la main**, et celle
de `/acheter` **additionne** le prix médian d'un quartier et le total « taxes +
émoluments » publié par `frais-de-notaire-lyon-2026` :

```
261 457 €  =  243 226 (prix Ferrandière)  +  18 231 (total publié ce matin-là)
 78 830 €  =  261 457  -  182 627
```

La correction d'arrondi du jour (18 231 → 18 230) a donc rendu ces deux montants
**faux d'un euro au regard de leurs propres composants**, et ce **dans le fichier
que les IA lisent en priorité**. Détecté en relisant `/llms.txt` en production
après déploiement, corrigé et redéployé dans un second commit (261 456 / 78 829).
Les six autres sommes de la même entrée ont été recalculées : justes
(209 712, 123 876, 182 889, 243 242, 274 090, 182 627).

📌 **C'est une SIXIÈME famille de défaut invisible, et elle est plus dangereuse
que les cinq autres parce qu'elle franchit la frontière entre deux fichiers que
rien ne relie** : aucun test, aucun type, aucun `grep` de la page modifiée ne
pouvait la voir — `18 231` n'apparaissait nulle part dans `llms.txt`, seulement
sa SOMME. **Règle posée : tout montant publié qui change doit être cherché
AUSSI sous la forme de ses sommes connues.** Le détecteur est en « Techniques
apprises ». ⚠️ **Et il faut cesser d'écrire que `llms.txt` est dérivé : il est
dérivé pour les articles, et manuscrit pour les pages « argent ».**

**2. 🟡 DEUX DÉFAUTS DE MON PROPRE BROUILLON, attrapés à la relecture
adversariale AVANT le push, et tous deux mécaniques.**
- La phrase d'introduction annonçait « **Trois** situations courantes » au-dessus
  d'une liste de **quatre** puces. Écrite à trois puces, enrichie d'une quatrième,
  le compte n'a pas suivi. **Un `grep` ne voit pas ça ; seule la relecture du
  rendu le voit.** 📌 **À ajouter au contrôle d'avant-push : toute phrase qui
  annonce un NOMBRE d'éléments doit être recomptée contre la liste qui suit.**
- La puce « **Vous résidez à l'étranger** » rendait mal le BOFiP, qui écrit
  « les **résidents étrangers** bénéficient des dispositions… ». Ce n'est pas le
  même ensemble de personnes. Reformulée en « Vous êtes un résident étranger »,
  avec la condition de destination à la résidence principale que la source pose
  et que j'avais omise. 📌 **Quand la source nomme une catégorie, reprendre SON
  mot, pas une paraphrase qui a l'air plus claire.**

**3. 🟡 UNE ERREUR DE LECTURE DE REFS, qui n'a rien cassé mais qui aurait pu
produire une alerte fausse.** Au démarrage, `main` local était à `1cc9814`
(12/10) et la branche de session à `b224f58`. Lu tel quel, cela se raconte
comme « quatre runs de travail ne sont jamais arrivés sur `main` ». **C'était
faux : `origin/main` portait tout, et seul `git fetch origin` l'a révélé.**
La tentation d'alerter avant de fetch est réelle — elle n'a pas été suivie.
📌 **Ne jamais tirer de conclusion d'un `main` local : il n'est rafraîchi par
AUCUNE commande automatique, pas même `git fetch`.**

### 2026-10-16 — Une page affirmait « toutes les copropriétés » là où la loi en exclut une partie, et le journal a failli publier une résolution qu'aucune source ne donne

**1. 🔴 L'AFFIRMATION FAUSSE, en production depuis le 11/10 et corrigée ce jour.**
`dpe-2026-ce-qui-change` écrivait : « Oui, depuis le 1er janvier 2026, **pour
toutes les copropriétés d'au maximum 50 lots** ». **Faux par excès de
périmètre** : l'obligation ne vise que les bâtiments d'habitation collective
**dont le permis de construire a été déposé avant le 1er janvier 2013**. Un
immeuble villeurbannais récent — et la page en compte le parc, **4 006
appartements diagnostiqués construits entre 2013 et 2021** — n'y est pas soumis,
alors que la page lui disait le contraire. 📌 **C'est la 5ᵉ phrase de périmètre
fausse trouvée depuis le 11/10, et la deuxième sur CETTE page** : une page
réécrite en profondeur n'est pas une page vérifiée.

**2. 🔴 LE CHEVAUCHEMENT DES BORNES, corrigé — et ce qu'il ne faut PAS en
faire.** La page disait « au maximum 50 lots » → 2026 **et** « entre 50 et
200 lots » → 2025. 🔴 **L'erreur que ce run a failli commettre : "trancher" en
écrivant « 51 à 200 / ≤ 50 », comme le fait `charges-copropriete` pour le plan
pluriannuel de travaux.** C'eût été **inventer une règle** : la prescription du
15/10 disait justement de ne pas présumer que les deux calendriers partagent
leurs seuils, et **la vérification montre que les sources officielles
elles-mêmes se recouvrent** à 50 lots (`justice.fr`, mise à jour du 1er janvier
2026 : « de 50 à 200 lots » / « d'au plus 50 lots »), **tandis que le PPT, lui,
est énoncé sans recouvrement** (« de 51 à 200 » / « 50 lots au plus »). **Les
deux textes ne se rédigent donc pas pareil, et copier la formulation du PPT
aurait publié une précision que personne ne garantit.**
→ ✅ **Ce qui a été publié à la place** : le recouvrement est **décrit**, et la
conséquence pratique est donnée (les deux dates étant échues, l'obligation
s'applique dans les deux lectures). 📌 **Règle générale, applicable à tout le
droit publié ici : quand deux sources officielles se recouvrent, on publie le
recouvrement, pas un arbitrage maison. Une page qui dit "les textes se
recouvrent à 50 lots, voici ce que ça change" est plus juste ET plus citable
qu'une page qui affirme un seuil que sa source n'affirme pas.**

**3. 🟡 Et une imprécision de rédaction attrapée avant le second push, qui
mérite d'être nommée.** La première version écrivait « les deux derniers paliers
se recouvrent dans **les textes officiels** eux-mêmes ». **Or les textes n'ont
pas été lus** (legifrance 403) : ce sont les **fiches** qui se recouvrent.
Corrigé en « dans les **sources officielles** elles-mêmes ». 📌 **Un mot de trop
transforme une observation vérifiée en affirmation non vérifiable : "texte",
"loi", "décret" ne s'écrivent que si on a lu le texte, la loi, le décret.**

### 2026-10-15 — Une note de méthode de CE JOURNAL était fausse et rendait un détecteur aveugle ; et une page taisait un plafond légal, laissant croire au vendeur qu'il n'avait aucun recours

**1. 🔴 ERREUR DU JOURNAL LUI-MÊME, et c'est la plus grave des trois parce qu'elle
se transmet d'un run à l'autre.** L'entrée « Techniques apprises » du **14/10**
affirme : « **Le séparateur de milliers du fichier est une espace fine insécable
(U+202F) ou une espace insécable (U+00A0), pas une espace simple.** Un `\d+` naïf
coupe « 1 876 » en « 1 » et « 876 » et le détecteur rate tout. »
**C'est FAUX pour `lib/blog.ts`.** Mesuré aujourd'hui sur le fichier entier :

```
U+202F (fine insécable) : 0 occurrence
U+00A0 (insécable)      : 0 occurrence
U+2009 (fine)           : 0 occurrence
séparateurs de milliers : 610, TOUS en espace simple U+0020
(idem avant « % » et « € » : 470 et 486 occurrences, toutes en U+0020)
```

🔴 **Pourquoi c'est dangereux, et pas seulement inexact : un run qui construit le
détecteur sur cette prémisse écrit un `NUM` qui ne matche RIEN, ne remonte aucun
couple, et conclut « aucune contradiction trouvée ».** L'erreur ne produit pas un
faux positif bruyant mais un **faux négatif silencieux** — le pire type pour un
contrôle de qualité. Le `NUM` correct pour ce fichier est
`\d+(?: \d{3})*(?:,\d+)?` avec une **espace simple**.
→ 📌 **Règle générale, et elle vaut pour tout ce journal : une note d'outillage se
REMESURE avant d'être réutilisée, parce qu'une note fausse est indétectable à la
lecture.** Le détecteur du 14/10 a tout de même trouvé deux défauts ce jour-là, ce
qui veut dire qu'il tournait sur une autre classe de caractères que celle décrite,
ou que les couples trouvés tenaient sur des nombres courts. **Dans les deux cas la
note publiée ne décrit pas ce qui a marché.** Note corrigée en « Techniques
apprises » de ce run.

**2. 🔴 UNE OMISSION QUI TROMPE, troisième du genre après le 12/10 et le 13/10 —
et celle-ci coûtait de l'argent au lecteur.** `vendre-sans-agence` écrivait, à
propos de l'état daté : « est établi par le syndic à votre demande : **son prix
dépend du contrat de syndic, pas de vous** ». Chaque mot est défendable
isolément — le montant figure bien au contrat de syndic — **et la phrase laisse
conclure exactement le contraire du droit** : elle dit au vendeur qu'il subit le
tarif, là où **le décret n° 2020-153 du 21 février 2020 le plafonne à 380 € TTC et
où toute facturation supérieure est contestable.** Le défaut n'est pas de ce run :
il est publié depuis la réécriture du **07/10**, et il a survécu au balayage des
périmètres juridiques du 11/10 **parce que ce balayage cherchait des phrases
d'obligation (« est soumis », « obligatoire pour »), pas des phrases qui NIENT un
droit.**
→ 📌 **Le contrôle à ajouter au grep de périmètre juridique : les formules qui
DÉNIENT une protection au lecteur.** Elles sont le miroir des phrases
d'obligation et aucun grep existant ne les attrape :

```bash
grep -rn "pas de vous\|ne dépend pas de\|vous ne pouvez pas\|aucun recours\|c'est au syndic de\|libre\b.*tarif\|dépend du contrat" \
  app lib --include='*.tsx' --include='*.ts'
```
Corrigé : la phrase publie désormais le plafond, le décret, le fait que la somme
est à la charge du vendeur et le caractère contestable d'un dépassement, avec un
lien vers `charges-copropriete`. **`updated` de la page déplacé au 15/10 — une
affirmation corrigée mérite la date, un simple lien ajouté non (règle du 06/10).**

**3. ⚠️ ERREUR ÉVITÉE DE JUSTESSE SUR LA SOURCE NEUVE, et c'est le dictionnaire de
données officiel qui l'a provoquée.** Le fichier
`rnic-dictionnaire-donnees.csv` publié par l'Anah a ses **deux colonnes décalées
d'une ligne** : la ligne 32 porte l'identifiant `nombre_d_unions_de_syndicats…` et
le libellé « **Nombre total de lots** », la 33 l'identifiant `nombre_total_de_lots`
et le libellé « Nombre total de lots à usage d'habitation, de bureaux ou de
commerces », etc. **Et par-dessus, les identifiants du dictionnaire ne sont plus
ceux de la ressource** (le dictionnaire dit
`nombre_total_de_lots_a_usage_d_habitation_de_bureaux_ou_de_comm`, la ressource
sert `nombre_lots_habitation_bureaux_commerces`). **Suivre le dictionnaire aurait
fait publier le nombre total de lots à la place du compteur légal — soit
165 101 au lieu de 79 797, et un tableau de paliers entièrement faux.**
→ 📌 **Règle : pour toute source tabulaire, lire l'EN-TÊTE RÉEL d'une ligne de
données, jamais le dictionnaire fourni.** Un `page_size=1` sur l'API tabulaire
rend une ligne complète clé par clé : c'est le contrôle, il coûte un appel.
(La fiche descriptive de la ressource prévient d'ailleurs que le passage à
l'actualisation quotidienne, en avril 2026, « a pu entraîner des modifications à
la marge dans les noms de colonnes » — elle est en dessous de la vérité.)

**4. 🟡 ET UNE TENTATION REFUSÉE, dans la famille du 13/10.** Le champ
`mandat_en_cours` permettait d'écrire « **28,2 % des copropriétés villeurbannaises
n'ont pas de syndic en cours de mandat** ». C'est spectaculaire, c'est local,
c'est calculé sur la donnée — **et ça ne mesure probablement pas ce que la phrase
dit** : un registre déclaratif enregistre l'absence de DÉCLARATION de mandat, pas
l'absence de syndic. **Rien n'a été publié de ce champ**, et la question est
inscrite en « Hypothèses à vérifier » avec le croisement qui permettrait de
trancher. **Même règle qu'au 13/10 : la question n'est pas « le calcul est-il
juste » mais « les deux colonnes mesurent-elles la même chose ».**

### 2026-10-14 — La même phrase cumulait les deux familles de défaut déjà identifiées, et une surface médiane fausse a traversé deux pages voisines qui, elles, publiaient la bonne

**Aucun des deux défauts n'est de ce run** : ils étaient en production depuis au
moins le 30/09 (dernière date de mise à jour de la page) et ont survécu à tous
les contrôles du journal, y compris au balayage des comparaisons du 08/10 — qui
n'avait couvert que `app/` et `lib/`, en laissant explicitement `lib/blog.ts` de
côté. **C'est ce trou-là qui a été comblé aujourd'hui.**

1. 🔴 **LA CONTRADICTION INTERNE SE LOGE ENTRE LE TEXTE ET LA FAQ DE LA MÊME
   PAGE, et c'est pire que le cas du 13/10.** Le 13/10, les deux phrases
   contradictoires étaient dans le corps. Ici, **l'une est dans le corps et
   l'autre dans la FAQ** — donc l'une alimente le texte visible et l'autre le
   JSON-LD `FAQPage`. **Un moteur d'IA qui extrait la page peut citer l'une ou
   l'autre, et les deux disent l'inverse l'une de l'autre.** Le contrôle de
   parité FAQ, passé sur cette page à chaque audit, **ne voit pas ce défaut** :
   il vérifie que la FAQ visible et le JSON-LD disent la même chose, pas que la
   FAQ et le corps de l'article soient d'accord.
   → 📌 **Le contrôle à ajouter : quand un même couple de nombres apparaît dans
   le corps ET dans la FAQ, lire les deux phrases l'une après l'autre.** Le grep
   est celui du 13/10, mais il faut le passer **FAQ comprise**, ce que l'index
   par article fait désormais automatiquement.

2. 🔴 **CINQUIÈME FAMILLE DE DÉFAUT INVISIBLE : LE CHIFFRE SOURCÉ QUI CONTREDIT
   UNE AUTRE PAGE DU SITE.** Les 44 m² n'étaient pas une coquille : ils étaient
   présentés sous une légende « médianes DVF 2025 des T2 villeurbannais », donc
   comme une mesure. **Et deux autres pages du site publiaient 45 m² pour la
   même mesure.** Aucun test ne peut voir ça : chaque page est cohérente avec
   elle-même, le JSON-LD est en parité, les mots ne sont pas collés, et le
   chiffre est plausible. **Seul un recalcul contre la source tranche.**
   → 📌 **Le contrôle, et il est cheap : toute valeur présentée comme une médiane
   ou un comptage doit apparaître IDENTIQUE partout où le site la publie.** Le
   grep est la valeur elle-même, pas le sujet :
   `grep -rn "44 m²\|45 m²" app lib --include='*.ts*'` aurait suffi.

3. 🟡 **ET LA CAUSE PROBABLE DU 44 m², qui est une faute de méthode, pas de
   saisie : avoir divisé deux médianes l'une par l'autre.** 170 000 / 3 830 =
   44,4 → 44 m². Le raccourci est tentant parce qu'il rend la page « cohérente »
   en apparence. **Il est faux : prix médian, prix médian au m² et surface
   médiane sont trois médianes indépendantes, calculées chacune sur l'ensemble
   des ventes, et le quotient de deux d'entre elles n'est pas la troisième.**
   C'est la même famille d'erreur que l'asymétrie des pourcentages (08/10) et que
   le multiplicateur (11/10) : **une opération arithmétiquement correcte appliquée
   à des grandeurs qui ne se composent pas.** La mise en garde est désormais
   publiée sur la page, ce qui protège aussi le prochain rédacteur.

### 2026-10-13 — Une page se contredisait elle-même sur un seuil de droit depuis neuf mois, et j'ai publié trois montants qu'un lecteur ne pouvait pas recalculer

**Les sept premiers défauts ne sont pas de ce run** : ils étaient publiés depuis
le 15/01/2026 et ont survécu à tous les contrôles du journal. Le détail est en
« Chantiers faits » ; ce qui suit est ce qu'ils apprennent.

1. 🔴 **QUATRIÈME FAMILLE DE DÉFAUT INVISIBLE : LA CONTRADICTION INTERNE.** Après
   les comparaisons fausses (08/10), les périmètres juridiques (11/10) et les
   promesses de renvoi (12/10), voici le cas où **deux phrases de la même page
   disent deux choses différentes**. L'intro de `loi-carrez-surface` écrivait
   « hauteur qui **dépasse** 1,80 m » (> 1,80), son corps « **≥ 1,80 m** ». Le
   décret exclut les hauteurs **inférieures** à 1,80 m : exactement 1,80 m compte,
   donc l'intro était fausse — et l'`excerpt` de l'article, qui alimente
   `/llms.txt`, répétait la version correcte, ce qui rendait la page incohérente
   **avec son propre résumé servi aux moteurs d'IA**.
   → 📌 **Le contrôle, et il est cheap : pour chaque seuil numérique publié,
   grepper TOUTES ses occurrences sur la page et vérifier qu'elles disent la même
   chose. « > » et « ≥ » ne sont pas la même règle.** Aucun test ne peut le voir :
   les deux phrases sont bien formées, la page compile, le chiffre « 1,80 » est
   bien présent — un contrôle de *présence* le valide. Grep en backlog.

2. 🔴 **La leçon du 12/10 sur les OMISSIONS QUI TROMPENT s'est reproduite, sur une
   autre page et une autre matière.** Le 12/10 : « le DPE est valable 10 ans »,
   vrai mais laissant conclure faux. Aujourd'hui : « l'acheteur peut demander une
   réduction du prix proportionnelle », **vrai** — et pourtant la page laissait
   croire deux choses fausses, parce qu'elle taisait le reste : (a) qu'il y a un
   **délai d'un an**, au-delà duquel le droit est perdu ; (b) que les 5 % sont une
   **condition d'ouverture** et non une franchise déductible.
   → **Règle consolidée : pour tout DROIT publié (pas seulement toute durée),
   vérifier que les trois éléments y sont — la condition, le délai, et l'assiette.
   Il manquait les deux derniers.**

3. 🟡 **ERREUR DE CE RUN, attrapée avant le push, et elle est mécanique : trois
   montants publiés ne se recalculaient pas sur les chiffres affichés.** Deux
   causes distinctes, toutes deux invisibles à la relecture :
   - **`round()` de Python arrondit au PAIR**, pas au supérieur. `3,1 × 3 375 =
     10 462,5` a donné **10 462 €** là où un lecteur qui refait le calcul trouve
     **10 463 €**. Une seule ligne du tableau sur huit était touchée — c'est
     exactement ce qui échappe à une relecture.
   - **la colonne des m² était arrondie au dixième, les euros calculés sur la
     valeur exacte.** « 3,2 m² » × 3 567 donne 11 414 €, j'avais publié 11 279 €
     (calculé sur 5,1 % × 62). Idem pour « 3,7 m² » et 13 269 €. **Les deux
     colonnes étaient justes séparément et fausses ensemble.**
   → **Règle : pour tout tableau dérivé, refaire le calcul avec les valeurs
   AFFICHÉES et comparer — jamais avec les valeurs intermédiaires.** Corrigé en
   passant la colonne au centième et en recalculant depuis l'affiché, avec
   `Decimal` + `ROUND_HALF_UP` (jamais `round()`). La convention est maintenant
   **écrite en légende du tableau ET dans l'en-tête de `lib/blog.ts`**, comme pour
   `plus-value-immobiliere-calcul` depuis le 05/10. Contrôle inscrit en backlog
   pour les quatre autres pages qui dérivent des médianes.

4. 🟢 **Une tentation refusée, et c'est le vrai enjeu du run.** Le champ Carrez de
   DVF permettait d'écrire « **7 % des ventes villeurbannaises dépassent le seuil
   Carrez des 5 %** ». C'est spectaculaire, c'est local, c'est chiffré — et **c'est
   faux** : `surface_reelle_bati` est la surface bâtie **cadastrale**, pas la
   surface annoncée dans l'acte, et un écart entre deux définitions n'est pas une
   erreur de mesurage. Le chiffre est publié **avec sa vraie signification** (« les
   deux surfaces diffèrent dans près de deux ventes sur trois »), et la réserve
   est **dans la légende du tableau**, pas en note de bas de page.
   → **Règle : quand une donnée neuve autorise une phrase spectaculaire, la
   question n'est pas « est-ce que le calcul est juste » mais « est-ce que les
   deux colonnes mesurent la même chose ».** Ici elles ne la mesuraient pas.

### 2026-10-12 — Six affirmations de droit fausses ou incomplètes vivaient en production depuis cinq mois sur une seule page ; et j'ai moi-même gonflé `<title>` et `metaDescription` en la réécrivant

**Les six premières ne sont pas des erreurs de ce run** : elles étaient publiées
depuis le 12/05/2026 et **ont survécu à tous les contrôles du journal**, pour la
même raison que le 08/10 et le 11/10 — les contrôles vérifient que les nombres
sont *présents* et que la FAQ est en *parité*, jamais qu'une phrase dit le droit
en vigueur. Le détail des six est en « Chantiers faits » ; ce qui suit est ce
qu'elles apprennent.

1. 🔴 **Le défaut le plus instructif n'est pas une phrase, c'est une PROMESSE
   D'ARCHITECTURE non tenue.** L'en-tête de `lib/blog.ts` attribue depuis le
   07/10 les durées de validité à `diagnostics-obligatoires-vente` et **interdit
   d'en publier ailleurs** ; `charges-copropriete` y renvoie en écrivant qu'elles
   « sont détaillées dans notre fiche ». **La page en publiait 2 sur 8.**
   → 📌 **Nouveau point d'entrée de contrôle, et il est cheap :** quand une note
   d'architecture ou un lien interne dit « le détail est sur telle page »,
   **ouvrir cette page et vérifier que le détail y est.** Aucun test ne peut le
   voir : les deux pages compilent, le lien n'est pas mort, la phrase est bien
   formée. **Le contrôle est un `grep` des formules de renvoi :**
   ```bash
   grep -rn 'sont détaillée\|est détaillé\|le détail est\|détaillées dans\|voir notre fiche\|notre fiche sur' \
     lib app --include='*.ts' --include='*.tsx'
   ```
   Puis, pour chaque renvoi : **la page cible porte-t-elle vraiment ce qui est
   promis ?** C'est la troisième famille de défauts invisibles trouvée en trois
   runs — après les **comparaisons** (08/10) et les **périmètres juridiques**
   (11/10). Celle-ci est une **promesse de contenu**.

2. 🔴 **La leçon du 11/10 s'est reproduite à l'identique sur la même matière, et
   elle se généralise : une liste d'obligations qui ne distingue pas les
   POPULATIONS est fausse pour tout le monde.** Le 11/10, l'audit énergétique
   était annoncé à des copropriétaires qui n'y sont pas soumis. Aujourd'hui, la
   même page-sœur servait **une liste unique pour les maisons et les
   appartements** alors que la fiche officielle en donne **deux**, et que les
   deux diffèrent sur le seuil de 50 m² du DPE et sur l'audit énergétique.
   → **Règle consolidée : toute liste d'obligations doit nommer la population à
   laquelle elle s'applique, et le périmètre se confronte au parc réel du
   client** (ici 49 717 appartements contre 1 159 maisons : la liste
   « appartement » passe en premier).

3. 🔴 **Une omission peut tromper plus sûrement qu'une affirmation fausse.** « Le
   DPE est valable 10 ans » est **vrai** — et pourtant un vendeur détenant un DPE
   de 2019 en concluait qu'il était bon jusqu'en 2029, alors qu'il est caduc
   depuis le 01/01/2025. **La phrase ne mentait pas, elle laissait conclure
   faux.**
   → **Règle : pour toute durée publiée, vérifier s'il existe une population
   exclue de la règle (régime antérieur, date de bascule de méthode). Si oui,
   elle doit être écrite à côté de la durée, pas ailleurs.**

4. 🟡 **Erreur de CE run, attrapée avant le push, et elle est mécanique :
   réécrire un article gonfle ses métadonnées sans qu'on y pense.** Le `<title>`
   rédigé faisait **86 caractères** une fois le suffixe « · Markus Immobilier »
   (20 caractères) ajouté par le gabarit, et la `metaDescription` **206** — alors
   que les runs précédents tenaient 65 et 155. **Les deux ont été mesurés, puis
   corrigés avant commit** (65 et 158), avec rebuild complet.
   → **Règle : mesurer `<title>` rendu (suffixe compris, pas la chaîne source) et
   `metaDescription` AVANT de committer, à chaque fois qu'un article est
   réécrit.** Le contrôle tient en une ligne sur le HTML servi, et il ne figurait
   nulle part dans la procédure du journal alors que les `<title>` longs sont
   notés comme défaut connu depuis le 01/10.
   ⚠️ **Et le piège dans le piège : le suffixe est ajouté par le gabarit.**
   Compter les caractères de la chaîne écrite dans `lib/blog.ts` donne 45 et fait
   croire que tout va bien.

5. 🟡 **Le faux positif de « mots collés » doit être documenté une fois pour
   toutes, sinon il fait perdre un contrôle.** Le motif
   *minuscule+Majuscule* a remonté **22 occurrences** sur la page du jour
   (`bLi`, `dAn`, `eMo`…). **Aucune n'est dans la prose : toutes sont dans le bloc
   `<script type="application/ld+json">`, qui est à l'intérieur du `<main>`.**
   → **Règle : extraire le texte en remplaçant CHAQUE balise par un séparateur,
   et exclure les `<script>` avant de compter.** Sinon le contrôle rend 22 faux
   positifs et on cesse de le lire. (C'est le cousin du faux positif `1er` noté
   le 11/10.)

### 2026-10-11 — Un chiffre national jamais sourçable vivait en production depuis cinq mois, l'audit énergétique était annoncé à des propriétaires qui n'y sont pas soumis, et j'ai validé un correctif sur un serveur qui servait l'ancien build

**Trois choses, dont deux publiées depuis des runs antérieurs et une entièrement
de ce run.**

1. 🔴 **« environ 850 000 logements chauffés à l'électricité sortent du statut de
   passoire thermique » — chiffre non sourçable, RETIRÉ.** Publié dans
   `dpe-2026-ce-qui-change` depuis le 05/05/2026. Cherché sur les deux sources
   primaires du sujet : **absent de la fiche service-public F16096** (vérifiée le
   01/01/2026) **et absent de la page DPE du ministère** (`ecologie.gouv.fr`, où
   « 850 », « 1,9 », « 2,3 » et « coefficient » ne figurent nulle part). Le client
   a explicitement refusé les chiffres de marché non sourcés : **il est retiré, pas
   réécrit.**
   🟡 **Et la tentation à laquelle je n'ai PAS cédé, qui est l'enseignement du
   point.** J'avais de quoi fabriquer un chiffre d'allure comparable : la base
   ADEME donne **480 336** logements F/G électriques avec un DPE antérieur à 2026.
   **Le publier « à la place » aurait été une faute**, parce que les deux nombres
   ne portent pas sur la même population — 850 000 parle du parc de logements
   (≈ 30 millions), 480 336 du stock de DPE réalisés depuis juillet 2021
   (15,7 millions). **Règle : remplacer un chiffre douteux par un chiffre juste
   qui ne mesure pas la même chose, c'est aggraver l'erreur en la rendant
   crédible.** Ce qui a été publié à la place est **local et de périmètre
   explicite** : 1 287 appartements villeurbannais F/G électriques, dont 1 077
   antérieurs au 01/01/2026.

2. 🔴 **« un audit énergétique est obligatoire pour les biens classés F ou G » —
   FAUX pour la quasi-totalité des lecteurs de ce site.** La fiche **F37110**
   (vérifiée le 14/09/2026) est explicite : l'obligation vise **les maisons
   individuelles et les immeubles de plusieurs logements dont le vendeur est
   l'unique propriétaire**, et porte sur les classes **E, F ou G**. **Un
   appartement vendu seul en copropriété n'y est PAS soumis, quelle que soit son
   étiquette.** La phrase publiée était donc fausse **deux fois** : elle omettait
   le E, et elle annonçait une obligation à des vendeurs qui ne l'ont pas.
   **Et l'enjeu local est massif** : sur les 51 951 diagnostics de Villeurbanne,
   **49 717 portent sur des appartements** contre 1 159 maisons et 1 075
   immeubles. La page annonçait une obligation inexistante à **96 % de son
   lectorat potentiel**.
   → 📌 **Ce que ça ajoute à la leçon du 08/10.** Le 08/10 avait établi que les
   contrôles de forme ne voient pas une phrase fausse, et que le point d'entrée
   efficace est **les comparaisons**. Celle-ci n'est pas une comparaison : c'est
   une **affirmation de périmètre juridique** (« obligatoire pour X »). **Nouveau
   point d'entrée à ajouter au contrôle de sens : toute phrase qui dit QUI est
   soumis à une obligation. Elle se vérifie sur la fiche officielle, et son
   périmètre se confronte au parc réel du client.** C'est exactement ce qui a
   rendu le défaut visible ici.

3. 🟡 **Erreur de ce run, et un piège d'outillage qu'il faut écrire parce qu'il
   invalide silencieusement toute vérification locale : j'ai contrôlé un correctif
   sur un serveur qui servait l'ANCIEN build.** Après avoir corrigé une
   formulation (« une chance et demie de plus » → « environ 50 % de risques en
   plus », parce que 6,26 / 4,16 = 1,50 : un rapport de 1,5 se dit « 50 % de
   plus », pas « une fois et demie de plus »), `tsc` était muet, `npm run build`
   vert — **et la page servie sur `127.0.0.1:3000` contenait toujours l'ancienne
   phrase.** Cause : un `next start` lancé **avant** la correction tenait encore le
   port 3000 ; les `npm run start` suivants échouaient en `EADDRINUSE` sans que
   rien ne le signale dans la sortie utile, et `curl` interrogeait donc le vieux
   processus. Le second symptôme, trompeur, est un `npm run build` qui **sort en
   144** quand sa sortie passe dans un `grep | head` (SIGPIPE) : on croit à un
   build cassé alors que c'est le tube qui se ferme.
   → **Règle désormais : avant toute vérification locale, tuer les serveurs
   (`pkill -f next-server; pkill -f "next start"`), vérifier que le port est
   libre, reconstruire, puis relancer — et ne jamais faire passer la sortie de
   `npm run build` dans `head`.** Le vrai danger n'est pas le serveur mort, c'est
   **le serveur vivant qui répond 200 avec du contenu périmé** : tous les
   contrôles passent au vert sur la version d'avant. Contrôle minimal qui l'aurait
   attrapé en une seconde : **grep la phrase NOUVELLE dans le rendu, et pas
   seulement les chiffres** — un chiffre inchangé entre deux versions ne prouve
   rien (c'est le cousin exact de l'avertissement du 08/10 sur la taille de page
   identique à l'octet).

4. 🟡 **Erreur de ce run, à la toute fin, et elle fait écho au trou de calendrier
   du jour : `git push origin main` a répondu « Everything up-to-date » alors que
   le travail n'était PAS sur `main`.** Le conteneur démarre sur
   `claude/dazzling-feynman-<id>`, et `git checkout main` **échoue** quand des
   modifications sont en cours (« Please commit your changes or stash them »). Le
   commit part donc sur la branche de session, et `git branch -f main HEAD`
   **n'avance `main` qu'au commit du moment où on le tape** : le commit suivant
   repart sur la branche de session, `main` reste en arrière, et le `push`
   annonce sereinement qu'il n'y a rien à envoyer. **Le push du chantier est
   passé, celui de la note de vérification a été silencieusement perdu** jusqu'à
   ce que `git rev-parse` les compare.
   → **Procédure à suivre désormais, à chaque commit et pas une fois par run :**
   ```bash
   git rev-parse --short HEAD main origin/main   # les trois AVANT de pousser
   git branch -f main HEAD && git push origin main
   git push origin HEAD:refs/heads/<branche-de-session>
   ```
   → **Et le contrôle qui tranche : « Everything up-to-date » n'est une bonne
   nouvelle que si `origin/main == HEAD`.** Sinon c'est l'inverse : la preuve
   qu'on vient de ne rien pousser. **C'est probablement ce genre de silence qui
   fabrique les runs manquants** (deux aujourd'hui) : rien n'échoue, rien ne
   prévient, et le journal du lendemain croit à un run sauté.

### 2026-10-08 — Deux erreurs de fait vivaient en production dans des phrases, pas dans des nombres ; et j'ai failli « corriger » un arrondi qui était déjà expliqué

**Les deux erreurs corrigées aujourd'hui ne sont pas des erreurs de ce run** :
elles étaient publiées depuis des runs antérieurs et **ont survécu à tous les
contrôles du journal**, parce que tous les contrôles existants vérifient que les
nombres sont **présents** et que la FAQ est en **parité**. Aucun ne vérifiait
qu'une phrase dit **la même chose que sa formule**.

1. 🔴 **`/agence-immobiliere-cusset` : « 21,3 % de moins qu'à Gratte-Ciel » au lieu
   de 17,6 %.** Formule `(GC.median / Q.median - 1)` sous une phrase « de moins ».
   **Asymétrie des pourcentages.** Erreur **aussi servie dans le JSON-LD
   `FAQPage`**.
2. 🔴 **`/agence-immobiliere-gratte-ciel` : « le plus actif de la ville après
   Ferrandière »** alors que Gratte-Ciel est **premier sur sept (655 ventes, 35 %)**
   et Ferrandière **sixième sur sept (187 ventes, 10,0 %)**. La page **contredisait
   sa propre FAQ** (« de loin le quartier le plus liquide »).

**Ce que ça apprend sur les contrôles du journal, et c'est le vrai enseignement du
run.** La liste « signaux mesurés sains » s'allonge depuis le 30/09 — canonicals,
`alt`, parité FAQ, mots collés, liens morts, `<h1>` distincts. **Aucun de ces
contrôles n'aurait jamais trouvé ces deux erreurs**, parce qu'ils vérifient tous la
**forme**. Une page peut passer dix contrôles verts et affirmer une contre-vérité.
→ **Règle à garder : un contrôle de forme ne remplace pas une relecture de sens.
Et la relecture de sens a un point d'entrée efficace, ce n'est pas la lecture
linéaire : ce sont les COMPARAISONS (« de moins », « de plus », « le plus », « après
X », « deuxième ») — c'est là que le code et la phrase se désalignent.**

🟡 **Et une erreur de ce run, rattrapée avant de coder : j'ai cru tenir un
troisième défaut qui n'existait pas.** Les 3 pages de quartier affichent le prix
arrondi au millier et les honoraires arrondis à la centaine, mais le **net vendeur
exact** — la soustraction des nombres affichés ne tombe donc pas sur le net publié
(445 €, 479 €, −394 €). J'allais le traiter comme un défaut d'arithmétique. **Les
trois pages l'écrivent noir sur blanc : « Sur le prix non arrondi, le vendeur
perçoit donc X € ».** Je ne l'ai vu qu'en lisant le **texte rendu en production**,
pas le code.
→ **Règle : avant de qualifier un calcul de faux, lire la PHRASE qui l'entoure dans
le rendu, pas seulement la formule dans le source.** Le code dit ce qu'il calcule ;
seule la phrase dit ce qui est **affirmé**. C'est le pendant exact de l'erreur n°1
(où, à l'inverse, c'est la phrase qui avait tort).

### 2026-10-07 — J'ai écrit un tableau entier avant de découvrir que le site le publiait déjà, et le journal m'avait prévenu

**Ce qui s'est passé.** Le chantier du jour devait réécrire `vendre-sans-agence`.
J'ai calculé, écrit, inséré dans `lib/blog.ts` puis **validé au typecheck** un
tableau « Honoraires de vente, quartier par quartier — appartement de 62 m² au
prix médian du quartier » : 8 lignes, prix dérivés des 7 médianes de
`lib/quartiers.ts`, honoraires par le barème, taux effectif, plus un paragraphe
entier sur l'effet de seuil de Cyprian – Les Brosses (169 756 €, 244 € sous les
170 000 €).

**`app/vendre/page.tsx` publie déjà exactement ce tableau.** Même formule
(`q.median * SURFACE` avec `SURFACE = COMMUNE.surfaceMediane`), même appel
`honorairesVente()`, mêmes colonnes **plus** le net vendeur, et **la même phrase**
sur Cyprian – Les Brosses comme « le seul quartier de Villeurbanne où un
appartement de 62 m² au prix médian passe sous la barre des 170 000 € ». J'allais
publier deux pages sur la même donnée — le défaut que le run du 06/10 avait
justement corrigé ailleurs.

**Comment je l'ai vu, et c'est de la chance, pas de la méthode** : je suis allé
lire `/vendre` **pour y placer un lien entrant**, pas pour vérifier un doublon. Le
tableau et son paragraphe ont été retirés et remplacés par un renvoi vers
`/vendre` (qui fait d'ailleurs un bien meilleur lien sortant que le tableau ne
faisait de contenu).

🔴 **Et l'aggravant : le journal du 06/10 écrivait, noir sur blanc, « vérifier
qu'il ne recopie ni `/vendre` ni `/honoraires`, dont il cite déjà le barème ».**
Je l'avais lu. **Lire l'avertissement ne suffit pas : il faut en faire un
contrôle exécutable avant d'écrire.**

**Règle à appliquer désormais, avant d'écrire tout tableau ou tout calcul :**

```bash
# ne pas grep le SUJET (« honoraires », « quartier ») — grep la FORMULE
grep -rn "honorairesVente\|surfaceMediane\|COMMUNE.prixMedian" app lib --include=*.tsx --include=*.ts
```

Chercher le sujet rend trop de bruit pour conclure ; **chercher la formule rend la
liste exacte des pages qui dérivent déjà la même donnée.** Le même grep aurait
économisé la moitié du run.

🟢 **Et il rend plus que ce que je cherchais — voilà le plan de contrôle tout prêt
pour la piste (i) de demain.** Les pages qui dérivent `honorairesVente()` **et**
le produit `médiane de quartier × COMMUNE.surfaceMediane` sont **exactement les
mêmes quatre** :

```
app/vendre/page.tsx
app/agence-immobiliere-gratte-ciel/page.tsx
app/agence-immobiliere-charpennes/page.tsx
app/agence-immobiliere-cusset/page.tsx
```

Donc **ce n'étaient pas une mais QUATRE pages** que mon tableau allait doubler, pas
seulement `/vendre` — les trois pages de quartier publient le même produit et les
mêmes honoraires sur leur propre quartier. **Ces quatre pages sont le périmètre
exact du chantier « justesse des calculs » (piste (i))** : elles lisent les mêmes
constantes et doivent rendre, au centième, les mêmes montants pour un même
quartier. **C'est le premier contrôle à faire le 08/10, et il est déjà cadré.**

**Et le même défaut s'est reproduit une seconde fois dans le run, sur un autre
sujet : le commit est parti sur la branche de session parce que je n'avais pas
fait `git checkout main`** — alors que le journal du 06/10 écrit « `git checkout
main` d'abord, comme toujours ». Deux avertissements du journal lus et non
exécutés dans la même journée. **Ce n'est pas un problème de mémoire, c'est un
problème de séquence : les consignes du journal doivent devenir les PREMIÈRES
commandes du run, pas des choses à se rappeler au bon moment.** Séquence de
démarrage à appliquer désormais, dans cet ordre et avant toute lecture de code :

```bash
git fetch origin && git checkout main && git log --oneline -1 origin/main
npm ci
```

**Deux ratés mineurs du même run, notés pour mémoire :**
- la `metaDescription` a d'abord été écrite **sans accents** (reste d'un brouillon
  ASCII) — corrigée avant tout build, mais elle serait partie en production telle
  quelle sans relecture ciblée. **Relire title et metaDescription séparément du
  corps** : ce sont les deux chaînes que le rendu ne montre pas.
- un remplacement de texte a laissé un **littéral de chaîne non terminé** dans
  `lib/blog.ts` (`TS1002`). `npx tsc --noEmit` l'a attrapé en deux secondes.
  **Confirmation de la discipline : tsc tourne après CHAQUE édition scriptée, pas
  seulement à la fin.**

### 2026-10-06 — « 1,93 points » : une faute d'accord qu'aucun contrôle structurel n'attrape

**L'erreur.** Pour afficher l'écart de rendement entre quartiers, la première
rédaction écrivait `{points(RENDEMENT_MAX - RENDEMENT_MIN)}s` afin d'obtenir
« 1,93 points ». **En français le pluriel ne commence qu'à partir de 2** :
la forme correcte est « **1,93 point** ». Le `s` ajouté à la main à la sortie d'un
formateur était à la fois faux et fragile.

**Comment elle a été vue.** Pas par `tsc`, pas par le lint, pas par le build —
tous les trois verts. Elle a été vue en **relisant le texte rendu** extrait du HTML
de production locale, le contrôle institué après le défaut des 20 mots collés du
04/10. **C'est la deuxième fois en trois runs que ce contrôle attrape ce que les
contrôles de structure laissent passer** : il est maintenant acquis.

**Corrigée avant le push** (le `s` retiré, rebuild, revérification sur le HTML
rendu : « soit un écart de 1,93 point »). **Rien n'a été publié de faux.**

**Règle à garder.** Ne jamais accoler une marque de pluriel à la sortie d'un
formateur de nombre : soit le formateur gère l'accord, soit la phrase est tournée
pour s'en passer. Et **relire le texte rendu, pas le code**, pour toute phrase
qui mélange une expression `{…}` et de la prose.


### 2026-10-05 — `llms.txt` : une consigne du brief que Google déclare sans effet (et ce qu'il faut en faire exactement)

**Le fait, sourcé.** La doctrine écrite de Google (page du 2026-07-10, citée en
« Techniques apprises ») dit **verbatim** : « You don't need to create new machine
readable files, **AI text files**, markup, or Markdown to appear in Google Search
(including its generative AI capabilities), **as Google Search itself doesn't use
them**. » C'est `llms.txt` qui est visé, nommément dans son genre.

**Ce que cela contredit.** L'étape 4 du brief demande : « LLMS.TXT : tiens-le à
jour quand tu ajoutes des pages, il dérive vite. » Cette consigne a été suivie
sans jamais être questionnée. **Aucune mesure de ce journal n'a jamais montré un
effet de `llms.txt`**, et aucun moteur ne documente l'utiliser — ni Google (qui
dit l'inverse explicitement), ni OpenAI, dont la documentation ne parle que de
`robots.txt` et de l'accès de `OAI-SearchBot`.

**Ce qui est corrigé — et ce qui ne l'est PAS.**
- ❌ **`llms.txt` n'est PAS supprimé.** Trois raisons : le brief client le demande
  explicitement ; il ne coûte rien ; et l'absence de preuve d'effet n'est pas une
  preuve d'absence d'effet pour les moteurs qui ne documentent pas leurs entrées.
  **Supprimer un fichier demandé par le client sur la foi d'une page de doc
  Google serait excessif.** À soumettre au client plutôt qu'à décider seul.
- ✅ **Ce qui change : `llms.txt` cesse de compter comme un levier GEO.** Il ne
  doit plus justifier un chantier, ni figurer dans un bilan comme un gain. Le
  temps qu'il prenait va aux données propres (§ point 2 de la veille).
- ✅ **Et un constat qui vide la consigne de sa charge** : `app/llms.txt/route.ts`
  **génère le fichier depuis `ARTICLES` et `LISTINGS`**. Il ne « dérive » donc
  pas quand on ajoute ou réécrit un article — il s'est mis à jour tout seul
  aujourd'hui. **La consigne « tiens-le à jour, il dérive vite » décrit un risque
  qui n'existe pas dans ce dépôt.** Vérifier la génération, pas le contenu.

**Leçon transférable.** Une consigne du brief peut être périmée ; la veille sert
aussi à ça. Mais la bonne réponse à une consigne périmée est de **cesser d'y
investir et de le documenter**, pas de défaire unilatéralement ce que le client a
demandé.

### 2026-10-05 — Un article qui publie ses entrées ET son résultat doit être calculable sur ses chiffres affichés (défaut introduit et corrigé avant le push)

**L'erreur.** La première rédaction de `plus-value-immobiliere-calcul` calculait
toute la chaîne sur les médianes 2022 **non arrondies** (3 980,9… €/m²) tout en
**affichant** les médianes arrondies (3 981 €/m²). Résultat : un lecteur refaisant
« 3 981 × 62 × 1,075 » sur les chiffres publiés obtenait **265 336 €** là où
l'article affichait **265 335 €**, et des écarts de 1 à 6 € sur sept quartiers.
Rien de faux au fond, mais un article dont **la démonstration ne se vérifie pas
sur ses propres chiffres** — ce qui est exactement ce qu'un lecteur méfiant, ou
un moteur qui cite, va contrôler en premier.

**Comment il a été attrapé.** En refaisant à la main l'arithmétique publiée
pendant le contrôle qualité, au lieu de se contenter de vérifier que les nombres
étaient *présents* dans le HTML. **Les contrôles automatiques du journal
vérifient la présence et la parité, jamais la justesse d'un calcul publié.**

**Corrigé avant le commit** : toute la chaîne est dérivée des **valeurs
affichées** (3 981 × 62 = 246 822 ; × 1,075 = 265 334 ; − 221 154 = −44 180), les
montants des sept quartiers recalculés en conséquence, et la convention écrite
dans l'en-tête de `lib/blog.ts` pour que personne ne « réarrondisse » depuis les
valeurs non arrondies.

**Règle à appliquer désormais à tout contenu chiffré** : si une page publie à la
fois des **entrées** et un **résultat**, le résultat doit être obtenu **en
partant des entrées telles qu'elles sont affichées**. Et le contrôle qualité doit
**refaire le calcul**, pas seulement vérifier que les nombres sont là.

### 2026-10-04 — L'audit des 53 pages du 01/10 ne pouvait pas voir la page 404, et le défaut qu'il corrigeait y était resté

**Ce qui a été corrigé le 01/10.** Cinq `<title>` servaient « Markus Immobilier »
deux fois, le gabarit `%s · Markus Immobilier` de `app/layout.tsx` s'ajoutant à
une marque déjà écrite dans le titre de la page : `/confidentialite`,
`/cookies`, `/mentions-legales`, `/equipe`, `/recrutement`.

**Ce qui restait.** La page 404 servait
« **Page introuvable — Markus Immobilier · Markus Immobilier** », le même défaut,
pendant trois jours de plus.

**Pourquoi l'audit ne pouvait pas la voir.** Il portait, comme tous les audits
depuis le 20/09, sur **les 53 URLs du `sitemap.xml`**. La page 404 n'y est pas —
et n'a aucune raison d'y être. Elle est **structurellement hors de portée** de
tout audit construit sur le sitemap.

**La leçon, et elle vaut au-delà de ce défaut.** « Les 53 pages de production »
n'est pas « le site ». Les URLs servies **hors sitemap** sont au moins :
la **page 404**, `/signin`, `/espace-client`, `/radar`, `/admin/*`, et les
**10 fiches de démonstration** de `lib/mock-properties.ts` (en `noindex`).
→ **Quand un audit porte sur un signal présent dans le `<head>`** (titre,
description, canonical, robots), **l'étendre à cette liste-là**, pas seulement au
sitemap. C'est fait aujourd'hui pour la 404 ; `/signin`, `/espace-client`,
`/radar` et `/admin/pages` ont été vérifiés au même passage (piste (b)).

### 2026-10-01 — J'ai écrit « 53 pages, 53 `<h1>` uniques » le 30/09, et deux pages servaient le même

**Ce que j'ai écrit le 30/09.** « **53 pages, 53 `<h1>` uniques** (aucune page à
zéro ni à deux) », rangé parmi les signaux sains avec la consigne « ne pas les
réauditer ». C'est cette phrase qui a failli coûter la trouvaille du 01/10.

**Ce qui était réellement mesuré.** Le script du 30/09 comptait, **pour chaque
page**, le nombre de balises `<h1>` et vérifiait qu'il valait 1. C'est un
contrôle d'unicité **intra-page**. Le mot « uniques » dans ma phrase laissait
entendre une unicité **inter-pages**, qui n'a jamais été testée. Et elle était
fausse : `/acheter` et `/annonces` servaient « Trouvez votre prochain
chez-vous. », mot pour mot, depuis l'origine du site.

**Pourquoi l'erreur est dangereuse et pas seulement imprécise.** Elle s'est
accompagnée d'une consigne de **ne pas réauditer**. Un journal qui est la seule
mémoire entre deux runs peut donc fermer définitivement un signal sur la foi
d'un résumé plus large que la mesure. Si le 01/10 n'avait pas ouvert la piste
(a) pour une autre raison (la cohérence `title`/`h1`), le doublon serait resté
indéfiniment, protégé par ma propre ligne « sain ».

**La règle que j'en tire, et qui s'applique à tout le journal.**
**Une ligne « signal sain » doit décrire l'opération exécutée, pas la propriété
qu'on croit en déduire.** « 53 pages, une balise `<h1>` par page » est vrai et
vérifiable ; « 53 `<h1>` uniques » est une extrapolation. Concrètement, pour
chaque signal, se demander : *est-ce que j'ai comparé les pages entre elles, ou
seulement regardé chaque page séparément ?* Les deux questions ont des réponses
différentes et l'agrégat est presque toujours le plus rentable des deux — c'est
déjà la leçon du 22/09 sur le maillage (« un défaut de maillage ne se voit que
dans l'agrégat, jamais page par page »). Le 01/10 montre que **la même chose
vaut pour les métadonnées** : titres, `<h1>` et descriptions ne se jugent pas
page par page, ils se jugent par comparaison.

**Correction apportée au journal.** La ligne du 30/09 reste telle quelle dans
son entrée (on ne réécrit pas l'histoire), mais l'« État des lieux » du 01/10
porte l'avertissement, et le backlog précise désormais que ce qui a été audité
le 30/09 est l'unicité **par page**. Les trois autres signaux de ce lot
(canonicals, `alt`, liens morts) sont bien des contrôles par page, et sont
corrects comme tels.

### 2026-09-28 — J'ai conclu « la home ne sert pas cette image » sur un `grep` qui ne pouvait pas la trouver, et j'ai failli réduire le défaut de moitié

**Ce qui s'est passé.** Après avoir trouvé le PNG de 1,29 Mo sur `/equipe`, la
question suivante était : la home le sert-elle aussi ? `TeamCard` est partagé
entre les deux, donc l'enjeu était réel. J'ai cherché dans le HTML de la home
avec `grep -o 'supabase\.co[^"\\]*'` et j'ai trouvé **47 occurrences, toutes
des photos d'annonces passant par `/_next/image`** — aucune photo d'équipe. J'en
ai déduit, et **écrit**, que la home n'était pas concernée.

**C'était faux.** Le balayage systématique des 53 URLs, fait ensuite avec un
motif différent — `grep -oE 'src="[^"]+\.(png|jpe?g|webp|gif)"'` puis filtre sur
`_next/image` — a rendu **deux** pages : `/equipe` **et `/`**. La home servait
bien le même fichier de 1,29 Mo.

**Pourquoi le premier `grep` ne pouvait pas le voir.** Dans une page Next, la
même URL apparaît sous deux formes : l'attribut `src` du HTML, et une copie
**échappée** dans la charge utile RSC inline (`\"https://…\"`, avec des
antislashs). Ma classe de caractères excluait `\` et `"` : elle coupait la
chaîne au premier antislash, et la forme qui restait lisible sur la home était
celle des annonces, déjà encodée en paramètre d'URL. **Le motif décidait du
résultat.**

**Conséquence évitée de justesse.** Publié tel quel, le journal aurait chiffré
le défaut à une page au lieu de deux, et l'aurait situé sur `/equipe` — une page
secondaire — au lieu de **la home**. Le gain réel (1,29 Mo sur la page la plus
visitée) aurait été sous-estimé de moitié, et la justification du chantier
affaiblie d'autant.

**Règle qui en sort, et qui prolonge celle du 22/09 sur le HTML rendu.**
*Chercher une ressource dans une page ne se fait jamais sur le nom de l'hôte ni
sur un fragment d'URL : ça se fait sur **l'attribut qui la charge** (`src=`,
`srcset=`, `href=`), parce que c'est le seul endroit dont la forme est garantie.*
Et le corollaire de méthode : **une réponse négative obtenue avec un motif n'est
pas une mesure** ; elle ne vaut que confirmée par un second motif construit
autrement. Ici les deux motifs se contredisaient, et c'est le désaccord qui a
révélé le vrai chiffre.

**Angle mort identique, trouvé dans le même run et à connaître** :
`grep -rn '<img ' app components` ne trouve **pas** la balise de `TeamCard`,
parce qu'elle est écrite sur plusieurs lignes (`<img` suivi d'un retour à la
ligne, pas d'un espace). Le premier inventaire du run l'a donc manquée et a
conclu « aucune `<img>` brute hors back-office » — conclusion juste par accident,
méthode fausse. Pour compter les balises d'un composant JSX, chercher `<img`
**sans espace final**.

### 2026-09-27 — Deux détecteurs mécaniques au vert, et le texte servi affichait encore des astérisques et des accents graves : le rendu des articles ne gère ni l'italique ni le code inline

**Ce que j'ai fait.** En rédigeant le chantier du jour, j'ai employé deux
notations qui me paraissaient évidemment supportées : `*en dessous*` pour une
italique d'insistance, et des accents graves autour de
`app.dvf.etalab.gouv.fr` pour présenter l'URL en code inline. Le fichier source
était impeccable, `tsc` passait, `eslint` passait, `npm run build` passait — et la
page servie affichait **les délimiteurs eux-mêmes**, en clair, dans deux passages
écrits précisément pour être cités par un moteur de réponse.

**Pourquoi les deux détecteurs ne l'ont pas vu.** Celui du 18/09 cherche un
chiffre, un `€`, un `%` ou un `m²` suivi d'une lettre ; celui du 21/09 cherche un
`<!-- -->` collé des deux côtés. **Ni l'un ni l'autre ne regarde les délimiteurs
de markdown non interprétés** : ce ne sont pas des espaces perdues, c'est un
balisage que le rendu ignore et recrache tel quel. Les deux étaient au vert, à
juste titre.

**La cause, écrite dans le code, et que je n'avais pas lue.** L'en-tête de
`components/blog/article-body.tsx` énumère exactement ce qu'il traduit :
`**gras**` → `<strong>` et `[texte](/chemin)` → lien. **Rien d'autre.** Ce n'est
pas un moteur markdown, ce sont deux transformations. Tout le reste passe en clair.

**La leçon, et elle prolonge celle du 20/09 à l'envers.** Le 20/09 avait retenu
qu'« un commentaire de code décrit une intention, jamais un état ». Aujourd'hui le
commentaire décrivait exactement l'état, de façon exhaustive, **et je ne l'ai pas
ouvert** — j'ai supposé un rendu markdown complet parce que le gras et les liens en
ont l'air. Formulation opérationnelle : *avant d'employer une notation dans un
champ de contenu, lire ce que le composant qui le rend sait traduire — la liste est
courte et elle est écrite.*

**Ce qui l'a trouvé, et c'est la troisième fois en dix runs.** La **relecture du
texte rendu en entier, comme un lecteur**. C'est elle qui a trouvé les deux
collages du 21/09 que la regex laissait passer, elle qui a trouvé ces deux-ci.
**Aucun détecteur ne la remplace, et aucun run de contenu ne doit être poussé sans
elle.** Corrigé avant push : `**en dessous**`, et l'URL mise en gras.

**Détecteur à ajouter à la procédure**, il coûte une ligne et il aurait suffi : sur
le **texte visible extrait du HTML servi** (jamais sur le source), chercher tout
délimiteur survivant — accent grave, double astérisque, `](`, ou un `_` suivi
d'une lettre. Un seul signalement = un balisage qui n'a pas été interprété.

---

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

### 2026-10-20 — Le contrôle « cette règle est-elle encore en vigueur ? », et l'ANIL comme substitut à Légifrance (403 dans ce conteneur)

**1. 🔴 LE CONTRÔLE LE PLUS RENTABLE DU RUN, ET IL EST NEUF : « LA RÈGLE CITÉE
EST-ELLE ENCORE EN VIGUEUR ? »**

Le 17/10, la loi citée par une page avait été **réécrite** (art. 121 de la LF
2026). Le 20/10, une périodicité citée avait été **abrogée six ans plus tôt**
(ordonnance n° 2019-1101, en vigueur au 1ᵉʳ juin 2020). **Deux fois en quatre
runs.** Aucun contrôle de ce journal ne cherchait ça : le 19/10 demande « *la
source dit-elle ce que la page affirme ?* », celui-ci demande « *la source est-elle
encore en vigueur, dans la version que la page décrit ?* ». **Ce sont deux
questions différentes, et la seconde attrape ce que la première laisse passer :
une page peut citer correctement un texte périmé.**

```bash
# cadrage : toutes les règles DATÉES ou NUMÉROTÉES du corpus
grep -rnoE "(tous les (trois|deux|cinq) ans|chaque année|depuis (le )?[0-9]{4}|\
(loi|décret|ordonnance|arrêté) n° [0-9-]+|article [0-9][0-9A-Za-z-]*)" \
  lib/blog.ts app/*/page.tsx app/llms.txt/route.ts | sort -u
```

**Les deux marqueurs à lire EN PREMIER, avant la règle elle-même :**
- fiche **service-public.fr** → la mention « **Vérifié le …** » en tête. *(Dans
  ce run : F2066 « vérifié le 1ᵉʳ octobre 2026 », F1310 « le 1ᵉʳ août 2026 » —
  des fiches plus fraîches que tout ce qu'un concurrent cite.)*
- page **BOFiP** → la liste « **Version en vigueur du … à aujourd'hui** »
  (recette du 19/10, toujours valable).

⚠️ **Et le symptôme à reconnaître dans NOTRE texte** : une **périodicité** (« tous
les trois ans ») est le type de règle le plus souvent abrogé sans que personne ne
s'en aperçoive, parce qu'elle **survit dans les habitudes de langage**. 📌 **Quand
une périodicité publiée coïncide avec une DURÉE DE CONTRAT voisine, c'est le
signal** : ici, « mise en concurrence tous les trois ans » n'était que la durée
du **mandat** du syndic, recyclée en obligation. **Chercher la confusion
périodicité ↔ durée.**

**2. 🟢 L'ANIL EST LE SUBSTITUT À LÉGIFRANCE DANS CE CONTENEUR, ET ELLE SERT DES
TABLEAUX QUE LÉGIFRANCE NE SERT PAS.**

**Légifrance reste inaccessible** (règle du 17/10), avec un symptôme à connaître :
`WebFetch` → **403**, et `curl` → **403 + `<title>Just a moment…</title>`**,
c'est-à-dire un mur **Cloudflare**. Inutile d'essayer `/download/pdf`, de changer
l'`User-Agent` ou de viser `jorf/article_jo/…` : tout est muré.

**L'ANIL (`anil.org`, agence publique) a tranché tout le run**, et mieux qu'un
texte brut :
- elle sert les **tableaux de plafonds par zone, avec la définition juridique de
  chaque zone et son texte de référence** (c'est ce qui a confirmé que
  Villeurbanne relève des 10,09 €/m² et non des 12,10 €/m²) ;
- elle sert **l'historique des règles** : « tous les trois ans **jusqu'au 31 mai
  2020** », avec l'ordonnance et son article. **C'est précisément ce qu'un texte
  consolidé ne dit PAS** — il montre l'état actuel, pas ce qui a été supprimé.

```bash
# 1. laisser une recherche restreinte au domaine donner l'URL exacte
#    (allowed_domains: anil.org) — les URL d'analyses juridiques sont longues
# 2. puis WebFetch sur cette URL, en demandant de REPRODUIRE le tableau
#    et les RÉFÉRENCES DE TEXTES, pas de résumer
```

⚠️ **Limite mesurée, à ne pas oublier** : l'ANIL publie aussi des pages anciennes
non datées en évidence (sa page « logement énergivore et loyer » est « à jour au
20 septembre 2022 » et **ne cite aucun article**). **Croiser avec une fiche
service-public dont le « Vérifié le » est récent** : c'est F1310 (01/08/2026),
pas l'ANIL, qui a donné la règle F/G exploitable.

**3. 🟢 LES « TEXTES DE RÉFÉRENCE » D'UNE FICHE SERVICE-PUBLIC DONNENT LE NUMÉRO
D'ARTICLE, ET C'EST LE SEUL ENDROIT OÙ ILS SONT FIABLES.**

Le corps d'une fiche service-public **ne cite presque jamais** le numéro
d'article : il paraphrase la règle. Le numéro vit dans le bloc « Textes de
référence » du bas de page, sous la forme « *article 23 — Logement vide :
paiement des charges — Loi n° 89-462 du 6 juillet 1989* ». C'est ce bloc qui a
démenti l'« article 21 » de notre page :

```bash
curl -sSL -A "Mozilla/5.0" -o f.html "https://www.service-public.fr/particuliers/vosdroits/F947"
python3 -I h2t.py f.html > f.txt            # html -> texte (cf. recette ci-dessous)
grep -oE "Vérifié le [^-]*" f.txt | head -1 # la FRAÎCHEUR d'abord
grep -oE "article[s]? [0-9][0-9A-Za-z-]*[^.]{0,80}" f.txt | sort -u
#   -> article 23 Logement vide : paiement des charges  |  article 25-10 (meublé)
```

📌 **Et le bloc donne le périmètre gratuitement** : ici, il a livré du même coup
le **25-10** pour le meublé — une distinction que notre page ne faisait pas.

**4. 🟢 LA RECETTE `html -> texte` RÉUTILISABLE, à garder dans le scratchpad du
run** (elle a servi 9 fois aujourd'hui : 3 pages locales, 3 en production, 3
fiches officielles) :

```python
# h2t.py — enlève script/style AVANT les balises, sinon le JS pollue le texte
import re,html,sys
h=open(sys.argv[1],encoding='utf-8',errors='replace').read()
h=re.sub(r'<(script|style)\b.*?</\1>',' ',h,flags=re.S|re.I)
t=html.unescape(re.sub(r'<[^>]+>',' ',h))
print(re.sub(r'[ \t\u00a0]+',' ',t))
```

⚠️ **L'ordre compte** : retirer les balises avant les blocs `<script>` laisse
passer tout le JSON-LD et tout le bundle Next dans le « texte », et fausse
n'importe quel comptage de mots.

**5. 🟢 LE CONTRÔLE DE PARITÉ FAQ ↔ `FAQPage` SE REJOUE EN UNE COMMANDE, et il
doit être rejoué sur la PAGE RENDUE, pas sur le source.**

Les trois pages du run génèrent leur `FAQPage` **depuis le même tableau** que la
FAQ visible, donc la parité est structurelle — **mais c'est précisément ce qui
rend un écart invisible** si un jour quelqu'un découple les deux. Le script
`parity.py` du run extrait les blocs `application/ld+json`, charge le JSON, et
vérifie que **chaque `name` ET chaque `acceptedAnswer.text`** se retrouve mot
pour mot dans le texte rendu. **Résultat du run : 6/6 et 6/6 sur les trois
pages, mesuré en production après déploiement.** 📌 **Vérifier les RÉPONSES
autant que les questions** : c'est côté réponse que le mismatch sanctionnable
apparaît.

### 2026-10-19 — Relire la source que la page cite, trouver la version EN VIGUEUR d'un BOI, et la brochure DGFiP comme source de première main sur les changements de l'année

**1. 🔴 LE CONTRÔLE LE PLUS RENTABLE DU RUN, ET IL COÛTE UNE RELECTURE :
« LA SOURCE CITÉE DIT-ELLE CE QUE LA PAGE AFFIRME ? »**

Le défaut n°1 du jour — « le vendeur n'a pas de démarche séparée à faire » —
était **démenti par la fiche F10864 que la page citait à la ligne suivante**.
Aucun contrôle de ce journal ne cherchait ça : on vérifiait que les **chiffres**
de la source étaient bien recopiés, jamais que les **affirmations** autour
d'eux étaient compatibles avec elle.

```bash
# lister tout ce que le corpus présente comme sourcé
grep -rnoE "Source[s]? : [^\"]{0,160}" lib/blog.ts app/*/page.tsx app/llms.txt/route.ts \
  | sed 's/\\n/ /g'
```

Puis, source par source : **l'ouvrir, et confronter la ou les phrases qu'elle est
censée appuyer.** ⚠️ **Le défaut ne se trouve pas dans la phrase citée, il se
trouve dans la phrase VOISINE** — celle que l'auteur a ajoutée « puisque c'est
évident », et qui n'est pas dans la source. Ici : le notaire paie l'impôt (vrai,
dans la source) **donc** le vendeur n'a rien à faire (faux, et la source le dit).

📌 **Formulé comme une règle de rédaction** : une ligne « Source : X » ne couvre
que ce que X dit. **Tout ce qui est déduit à côté doit être soit vérifié dans X,
soit annoncé comme une déduction.**

**2. 🟢 TROUVER LA VERSION *EN VIGUEUR* D'UN BOI, ET NE JAMAIS CITER UNE AUTRE.**

Le BOFiP sert **toutes** les versions historiques d'un document, avec des URL
quasi identiques — et une recherche web renvoie volontiers une version périmée
(ici, la version **2018** de `BOI-RFPI-PVI-10-40-10`, qui contient des règles
réécrites depuis). La page rendue porte la liste des versions ; **c'est elle qui
tranche** :

```bash
curl -sL -A "Mozilla/5.0" -o boi.html \
  "https://bofip.impots.gouv.fr/bofip/<PREFIXE>-PGP.html/identifiant=<BOI-...-AAAAMMJJ>"
grep -o "<title>[^<]*</title>" boi.html          # PAS "Document non trouvé"
python3 -I -c "import re,html;h=open('boi.html',encoding='utf-8',errors='replace').read();
h=re.sub(r'<(script|style).*?</\1>','',h,flags=re.S);
t=re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',h)));
print(re.findall(r'Version en vigueur du [0-9/]+ (?:au [0-9/]+|à aujourd.hui)',t)[:4])"
# attendu : la 1re entrée doit se terminer par « à aujourd'hui »
```

⚠️ 🆕 **ET LE PIÈGE DU PRÉFIXE NUMÉRIQUE** : le `<PREFIXE>-PGP.html` n'est **pas
le même pour deux BOI de la même série**. `BOI-RFPI-PVI-10-40-10` vit sous
**4307**, `BOI-RFPI-PVI-10-40-30` sous **7284**. Avec le mauvais préfixe, le
serveur répond **HTTP 200** et un `<title>` « **Document non trouvé** » — d'où la
règle du 09/10, toujours valable : **vérifier le `<title>` avant de lire.** Le
bon préfixe se récupère dans l'URL que donne une recherche restreinte à
`bofip.impots.gouv.fr`.

📌 **Bénéfice concret pour le contenu** : un BOI se cite **par son numéro de
paragraphe** (§ 190, § 330, § 360) **et par sa date de version**. C'est le
niveau de précision qu'aucun concurrent de nos SERP n'atteint, et c'est
exactement ce qu'un LLM reprend tel quel.

**3. 🟢 LA BROCHURE PRATIQUE « IMPÔT SUR LE REVENU » DE LA DGFiP : LA SOURCE DE
PREMIÈRE MAIN SUR CE QUI A CHANGÉ DANS L'ANNÉE, EN UNE PAGE.**

Pour trancher « 17,2 % ou 18,6 % », ni les blogs ni Légifrance (403 dans ce
conteneur, règle du 17/10) n'ont servi. **La fiche « Principales nouveautés » de
la brochure IR le dit en deux phrases, avec la référence légale entre
parenthèses.**

```bash
curl -sSL -A "Mozilla/5.0" -o nouv.pdf \
  "https://www.impots.gouv.fr/www2/fichiers/documentation/brochure/ir_2026/pdf_som/nouveautes.pdf"
pdftotext -layout nouv.pdf nouv.txt      # -layout OBLIGATOIRE (colonnes)
grep -n -B3 -A6 "10,6" nouv.txt
```

Ce qui en sort, citable tel quel : *« Le taux de la CSG est porté de 9,2 % à
10,6 % sur les revenus du patrimoine et les produits de placement. Les revenus
fonciers, **les plus-values immobilières**, l'assurance-vie, l'épargne logement
restent soumis au taux de 9,2 % »* — **(LFSS 2026, art. 12 ; CSS, art.
L136-8)**, p. 45.

📌 **Le gabarit d'URL est annuel** (`ir_2026`, `ir_2027`…) : il se sonde comme le
tableau DMTO du 17/10. **À rejouer chaque année, et pour toute règle fiscale que
le site publie** — c'est la façon la plus rapide de savoir si un taux publié a
bougé, et elle bat la recherche web sur ce terrain.

**4. 🟢 CE QUE LA VEILLE DU 19/10 A DONNÉ — et surtout ce qu'elle N'A PAS donné.**

- ✅ **Rien à appliquer côté données structurées.** La page officielle
  `developers.google.com/search/updates` ne porte, pour **septembre et octobre
  2026**, aucune entrée touchant `FAQPage`, `HowTo`, `Article` ou
  `LocalBusiness`. Les trois entrées d'octobre : quota de l'Indexing API (16/10),
  page « UGC Fresh Data Program » (08/10), mise à jour du guide
  « Updated guidance on using generative AI content » (01/10). **Les types que
  le site utilise ne sont pas concernés.** ⚠️ **Ne pas refaire cette recherche
  avant le 26/10.**
- ⚠️ **À lire au prochain lundi, pas aujourd'hui** : la mise à jour du 01/10 du
  guide Google sur le **contenu génératif** (elle y intègre des éléments des
  Search Quality Raters guidelines). **Je ne l'ai pas lue** — je l'ai seulement
  relevée dans le changelog. **C'est le seul élément officiel d'octobre qui peut
  concerner un site dont le contenu est rédigé avec une IA : à ouvrir en
  premier le 26/10.**
- ⚠️ **Chiffres de prestataires, à traiter comme indicatifs et NON comme des
  faits** (aucune source primaire trouvée) : ~97 % des citations d'AI Overviews
  viendraient de pages déjà dans le **top 20** organique (étude Semrush citée de
  seconde main) ; seulement **11 %** des domaines seraient cités **à la fois**
  par ChatGPT et Perplexity (analyse de 680 M de citations, éditeur GEO).
  📌 **Si le premier est vrai, il valide la stratégie de ce journal plutôt qu'il
  ne la contrarie** : le site étant absent des requêtes-tête, viser les SERP de
  niche où il peut réellement se classer est la seule voie vers une citation.
  **Mais ce n'est pas une source : ne pas la citer dans du contenu publié.**

**5. 🔴 UNE RÈGLE FISCALE QUI RENVOIE AU « MARCHÉ LOCAL » EST LA MEILLEURE
PASSERELLE ENTRE DROIT ET DONNÉE — les chercher activement.**

Le § 190 du BOFiP fait dépendre l'exonération de résidence principale, pour un
vendeur déjà déménagé, des **conditions locales du marché** et du **prix
demandé**. 📌 **Autrement dit, le droit lui-même rend notre tableau de médianes
DVF utile au lecteur** : un prix de mise en vente désaligné du marché local peut
coûter l'exonération, et nos médianes par quartier sont l'ordre de grandeur qui
l'évite.

**C'est le modèle de contenu le plus défendable de ce site** : ni du droit
recopié (tout le monde en publie), ni des chiffres secs (les portails en
publient), mais **une règle de droit dont l'application dépend d'une donnée
locale que nous sommes seuls à publier**. À chercher dans chaque page de droit :
les expressions « conditions locales », « marché local », « prix pratiqués »,
« usages locaux », « délai normal ».

### 2026-10-18 — Le push qui déploie vraiment, le balayage d'une valeur corrigée, et l'audit « llms.txt vs pages rendues »

**1. 🔴 LA RECETTE DE PUSH, CORRIGÉE DU PIÈGE DU JOUR. `main` N'EST PAS
OPTIONNEL : Vercel ne déploie que lui.**

```bash
git fetch origin                                   # TOUJOURS en premier
for r in HEAD main origin/main; do printf "%-12s " "$r"; git rev-parse --short "$r"; done
git merge-base --is-ancestor origin/main HEAD && echo "ff possible"   # contrôle avant de forcer
git branch -f main HEAD && git push -u origin main                    # ⬅️ CELUI QUI DÉPLOIE
git push -u origin claude/<branche-de-session>                        # trace, ne déploie rien
git fetch -q origin main
[ "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)" ] && echo "✅" || echo "🔴"
```

⚠️ **Et le contrôle git ne suffit pas** : le 18/10, un push **vert** sur la seule
branche de session a laissé la production inchangée **4 minutes durant**. **Le
seul contrôle qui tranche est de SONDER LA PRODUCTION sur une valeur qui doit
changer** (boucle ci-dessous, point 4). **Déploiement constaté à t+60 s** après
le push sur `main` (vs ~80 s le 17/10, ~2 min 30 le 16/10).

📌 **Rappel du piège du 17/10, toujours valable** :
`git rev-parse --short HEAD main origin/main` **échoue** dans ce conteneur
(`fatal: Needed a single revision`) alors que les trois refs se résolvent une par
une ; enchaînée en `&&`, elle annule le reste de la ligne. **Utiliser la boucle
`for`.**

📌 🆕 **Et un piège de lecture de refs** : `git branch -a` peut afficher
`remotes/origin/claude/<branche>` **alors que la branche n'existe pas sur le
remote** (ref de suivi local). `git log` sur ce ref répond alors **l'état de
`main`, sans erreur**. **Un ref `remotes/origin/…` ne prouve pas l'existence
distante** — seul le `* [new branch]` du push le révèle, après coup.

**2. 🔴 BALAYER UNE VALEUR QUE L'ON VIENT DE CORRIGER (la 7ᵉ famille). À FAIRE
AVANT CHAQUE COMMIT QUI CORRIGE UN MONTANT PUBLIÉ.**

Les nombres s'écrivent dans ce repo avec **quatre séparateurs de milliers
possibles** (collé, espace normal, insécable ` `, fine insécable ` ` —
celle que produit `toLocaleString("fr-FR")`). Un `grep "18 231"` avec un espace
normal **ne trouve rien** et rassure à tort.

```bash
# pour chaque ANCIENNE valeur (celle qu'on vient de remplacer) :
for v in 18231 261457 78830; do
  pat=$(python3 -I -c "
v='$v'; outs=[v]
for sp in [' ',' ',' ']:
    d=v; g=''
    while len(d)>3: g=sp+d[-3:]+g; d=d[:-3]
    outs.append(d+g)
print('|'.join(outs))")
  echo \"--- $v\"; grep -rnE \"$pat\" app lib components data 2>/dev/null
done
```

⚠️ **Lire les hits, ne pas les compter** : `cacheControl: "31536000"` contient
`5360`, les bornes de filtre DVF contiennent `12 000`. **Faux positifs normaux.**

**3. 🟢 AUDITER `/llms.txt` CONTRE LES PAGES — ET LE FAIRE SUR LE RENDU, JAMAIS
SUR LE SOURCE.**

🔴 **Pourquoi le source ne marche pas** : les pages **ne contiennent aucun
chiffre en dur**, elles dérivent tout de `lib/quartiers.ts` via `fmtEur()`. Un
grep du source donne **43 faux positifs sur 43**. Les en-têtes des pages de
quartier l'annoncent (« aucun chiffre en dur dans ce fichier ») — **lire l'en-tête
d'un fichier du corpus avant d'écrire un détecteur dessus.**

La recette, en trois temps :
1. récupérer les **pages rendues** — en local `.next/server/app/<slug>.html` après
   `npm run build`, en production par `curl -sS -L` ;
2. **dé-baliser** (retirer `<script>` et `<style>` d'abord, sinon le payload RSC
   fait passer n'importe quoi pour présent), `html.unescape`, puis **coller les
   chiffres** : `re.sub(r"(?<=\d)[    ]+(?=\d)", "", texte)` ;
3. extraire les tokens numériques de la ligne `llms.txt` **en bornant à gauche
   sur un non-chiffre** — sans ça, `T1 115 000 €` se lit `1 115 000` et crée un
   faux positif ; ignorer les chiffres isolés (trop bruyants).

Le script complet est à
`/tmp/.../scratchpad/audit2.py` (jetable) ; **l'essentiel est ci-dessus.**
Résultat du 18/10 : **157 montants, 2 écarts**, et **157/157 après correction**,
revérifiés en production.

📌 **Et ce qu'il NE couvre pas** : uniquement les **nombres**. Les dizaines de
règles de droit, références d'articles et fiches `F…`/`BOI-…` que `/llms.txt`
recopie dans ses entrées `/vendre`, `/gestion-locative`, `/faire-gerer` et
`/honoraires` **n'ont jamais été vérifiées** — c'est un chantier à part.

**4. 🟢 SONDER LA PRODUCTION SUR UNE VALEUR QUI DOIT CHANGER.** Le seul contrôle
qui prouve un déploiement :

```bash
for t in 20 40 60 80 100 120; do sleep 20
  curl -sS -L -o /tmp/p.html https://www.markusimmobilier.fr/<page>
  # comparer la NOUVELLE valeur ET l'ANCIENNE : la disparition compte autant
  python3 -I -c "...print('OK' if '18230' in t else 'ancien')"
done
```

**5. 🟢 UN CONTRÔLE D'ARRONDI NE VOIT PAS UNE ERREUR DE BASE — et c'est le défaut
du jour sur `investir-locatif-lyon`.** « 7 à 8 %, soit environ **12 000 €** sur
un T2 de 45 m² au prix médian de **Cusset** » : l'écart n'est pas d'un euro mais
de ~600 €, parce que 12 000 € est calculé sur la médiane **communale**
(3 567 €/m²) et non sur celle du **quartier nommé** (3 171 €/m²).
📌 **Recette : pour toute phrase « X % de Y, soit Z », recalculer Z avec la
valeur de Y que la page publie ELLE-MÊME, et vérifier que Z tombe DANS la
fourchette que la phrase annonce.** Ici 7–8 % de 142 695 € = 9 989–11 416 €, et
« environ 12 000 € » **sortait de sa propre fourchette** — le signal le plus net
possible, et aucun contrôle d'arrondi ne le donne.

### 2026-10-17 — Trouver la dernière version d'un PDF officiel sans page d'index, lire le BOFiP quand Légifrance bloque, et le détecteur de « sommes écrites ailleurs »

**1. 🟢 TESTER L'EXISTENCE D'UNE VERSION PLUS RÉCENTE D'UN PDF OFFICIEL PAR SON
URL, sans chercher de page d'index.** Le tableau DMTO de la DGFiP suit un gabarit
d'URL daté. Il suffit de sonder les mois suivants : un **404** prouve qu'il n'y a
rien de plus récent, un **200** qu'il faut relire.

```bash
for v in 2026-10 2026-09 2026-06 2026-02; do printf "%s -> " "$v"
  curl -sIL -o /dev/null -w "HTTP %{http_code}\n" \
    "https://www.impots.gouv.fr/sites/default/files/media/1_metier/3_partenaire/notaires/dmto/dmto_$v.pdf"
done
# 2026-10 -> 404 | 2026-09 -> 404 | 2026-06 -> 200 | 2026-02 -> 200
```

⚠️ **`-I` seul ne suffit pas pour TÉLÉCHARGER** (règle du 09/10 : `-L` obligatoire,
sinon 302 et un fichier de 138 octets). Puis `pdftotext -layout` — **le `-layout`
est indispensable** : sans lui les colonnes « taux art. 116 » et « taux art.
1594 D » fusionnent et on ne sait plus laquelle vaut 5,00 % et laquelle 4,50 %.
📌 **Ce test vaut pour toute source officielle datée que le site cite** (DVF,
barèmes, tableaux DGFiP) : il transforme « à revérifier un jour » en une commande
de trois secondes.

**2. 🔴 LÉGIFRANCE EST INACCESSIBLE DEPUIS CE CONTENEUR — LE BOFiP EST LA PORTE
D'ENTRÉE.** `legifrance.gouv.fr` répond **403** avec une page « Just a moment… »
(Cloudflare), aussi bien via `WebFetch` que via `curl -A "Mozilla/5.0"`. **Ne
pas y perdre de temps.** `bofip.impots.gouv.fr` répond **200** sans en-tête
particulier, et c'est mieux qu'un substitut : le BOFiP **cite le texte en vigueur
avec ses réécritures** (c'est lui qui a donné l'article 121 de la LF 2026), et il
porte une **date de mise à jour** utilisable comme source datée.

La difficulté est de trouver l'identifiant : les URL en `NNNN-PGP.html` devinées
répondent 200 avec un titre **« Document non trouvé »** — d'où la règle du 09/10,
**vérifier le `<title>` avant de lire**. La recette qui marche :

```bash
# 1. laisser une recherche web restreinte au domaine donner l'identifiant exact
#    (allowed_domains: bofip.impots.gouv.fr) -> BOI-ENR-DMTOI-10-20-20260617
# 2. puis fetch direct, et CONTRÔLER le <title>
curl -sL -A "Mozilla/5.0" -o p.html \
  "https://bofip.impots.gouv.fr/bofip/3311-PGP.html/identifiant=BOI-ENR-DMTOI-10-20-20260617"
grep -o "<title>[^<]*</title>" p.html     # doit décrire le sujet, PAS "Document non trouvé"
# 3. dégraisser en texte : le BOI complet fait 91 ko de HTML pour 23 ko de texte
python3 -I -c "import re,html;h=open('p.html',encoding='utf-8',errors='replace').read();
h=re.sub(r'<(script|style).*?</\1>','',h,flags=re.S);
print(html.unescape(re.sub(r'<[^>]+>',' ',h)))" > p.txt
```

📌 **Un BOI se lit par ses numéros de paragraphe** (§ 105, § 107…), et ces numéros
sont citables tels quels dans une source d'article — c'est bien plus précis que
« BOFiP, document mis à jour le 17/06/2026 », qui est ce que la page disait avant
aujourd'hui.

**3. 🔴 LE DÉTECTEUR DE LA 6ᵉ FAMILLE — chercher un montant corrigé SOUS FORME DE
SES SOMMES.** Quand un montant publié change, il ne suffit pas de grepper sa
valeur : un autre fichier peut n'en porter que **le résultat d'une addition**.
C'est ce qui s'est passé aujourd'hui avec `llms.txt`.

```bash
# pour chaque montant corrigé, calculer ses sommes plausibles avec les autres
# valeurs publiées de la même page, puis les grepper dans TOUT app/ et lib/
python3 -I - <<'PY'
import re,subprocess
corriges = {18231:18230, 17882:17883, 15752:15751, 15282:15281}
bases    = [243226,238452,218488,209250,202802,196602,169756,195000,115000,170000,226250,255000]
cibles=set()
for anc in corriges:
    for b in bases:
        cibles.add(anc+b); cibles.add(abs(anc-b))
for n in sorted(cibles):
    s=f"{n:,}".replace(","," ")        # format français : 261 457
    r=subprocess.run(["grep","-rln",s,"app","lib"],capture_output=True,text=True)
    if r.stdout: print(s, "->", r.stdout.split())
PY
```

✅ **Détecteur VALIDÉ, pas supposé** : rejoué sur `app/llms.txt/route.ts` dans
son état d'avant le correctif, il sort bien `261 457 = 18231 + 243226`. Rejoué
sur l'état corrigé, il ne sort plus qu'**un faux positif**, `152 118` dans
`app/opengraph-image.tsx` — ce sont deux coordonnées d'un `path` SVG
(`… -70 52 -152 118 -182 145 …`). **96 cibles testées, 1 faux positif : le
rapport signal/bruit est exploitable tel quel.**

⚠️ **Le format compte** : le site écrit `261 457` avec une **espace** comme
séparateur de milliers. Grepper `261457` ne trouve rien. 📌 **Et la leçon plus
large : `llms.txt` n'est PAS entièrement dérivé.** Sa section « articles » l'est
(`title` + `excerpt`), ses entrées de pages « argent » sont **manuscrites** dans
`app/llms.txt/route.ts` et contiennent des dizaines de montants recopiés. **Toute
correction chiffrée doit s'y terminer.**

**4. ⚠️ UN PIÈGE D'OUTIL QUI PEUT FAIRE SAUTER LE PUSH — `git rev-parse --short`
n'accepte pas plusieurs refs dans ce conteneur.** La recette inscrite ici le
11/10 commençait par :

```bash
git rev-parse --short HEAD main origin/main   # ⛔ fatal: Needed a single revision
```

Les trois refs se résolvent pourtant **une par une**. Enchaînée en `&&` devant le
`git push`, cette ligne **annule tout le reste de la commande** — et comme elle
est censée être un simple contrôle d'affichage, on cherche le problème du mauvais
côté. **Recette corrigée, à utiliser désormais :**

```bash
git fetch origin                                   # TOUJOURS en premier
for r in HEAD main origin/main; do printf "%-12s " "$r"; git rev-parse --short "$r"; done
git branch -f main HEAD && git push -u origin main
git push origin HEAD:refs/heads/<branche-de-session>
git fetch -q origin main
[ "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)" ] && echo "✅" || echo "🔴"
```

📌 La règle de fond du 11/10 reste entière : **« Everything up-to-date » ne vaut
que si `origin/main == HEAD`**, et c'est la dernière ligne qui le prouve, pas le
message de `git push`.

### 2026-10-16 — Pourquoi un détecteur de seuils rate la borne basse d'un intervalle écrit en mots, et la recette qui la rattrape

**1. 🔴 L'ANGLE MORT, DÉMONTRÉ ET PAS SEULEMENT SUPPOSÉ.** Le 15/10 avait écrit
que le détecteur du 14/10 manquait « les bornes d'intervalle énoncées en mots ».
**Mesuré aujourd'hui, la cause est plus précise que ça, et elle est générale** :
dans « **entre 50 et 200 lots** », le nombre **collé à l'unité** est **200** — la
borne haute. **La borne basse (50) n'est rattachée à aucune unité**, donc tout
détecteur bâti sur `nombre + unité` (c'est-à-dire tout `grep` naturel) la rate.
Vérifié en rejouant le détecteur du 14/10 sur la version pré-correction du
fichier : **il ne lève rien**, alors que le défaut y est.

**2. 🟢 LA RECETTE QUI MARCHE — rattacher explicitement la borne basse, puis
grouper par (nombre, unité) et comparer les SENS de borne.** Le détecteur
rejouable est écrit et conservé :
`/tmp/.../scratchpad/detect_bornes.py` *(à recréer, le scratchpad ne survit pas
au run — le code tient en 50 lignes et la logique est ici)* :
- lister les mots de borne **par sens** : BASSE (`au moins`, `à partir de`,
  `plus de`, `au-delà de`, `et plus`, `supérieur`, `au minimum`, `depuis`),
  HAUTE (`au maximum`, `au plus`, `moins de`, `ou moins`, `jusqu'à`,
  `inférieur`, `en deçà de`) ;
- capturer `(\d+)\s*(?:et\s+(\d+)\s*)?<unité>` : **le second groupe existe
  précisément pour « entre X et Y unité »**, et dans ce cas X est marquée
  BASSE(entre), Y HAUTE(entre) ;
- grouper par `(nombre normalisé, unité)` **à l'intérieur d'un même article**, et
  signaler tout nombre qui apparaît avec **plus d'un sens de borne** ;
- **afficher une fenêtre autour du nombre**, jamais le début de la phrase : dans
  un `lib/blog.ts` les « phrases » font parfois 600 caractères (les `1er janvier`
  cassent le découpage sur le point), et un extrait tronqué au début fait croire
  à un faux positif.
→ **Commande d'usage** : `python3 detect_bornes.py lib/blog.ts lots` (puis `m²`,
`ans`, `%`).

**3. ⚠️ LE DÉTECTEUR EST BRUYANT PAR CONSTRUCTION, et c'est voulu.** Sur
`lib/blog.ts` : 4 groupes en `m²`, 3 en `ans`, **17 en `%`** — tous faux positifs
après examen. **Le signal utile n'est pas "un groupe est signalé", c'est "un
nombre-SEUIL est signalé"** : un nombre de référence (62 m² de surface médiane,
45 m² d'un T2, une durée de validité) apparaît forcément avec des bornes
différentes sans que rien ne se contredise. 📌 **Règle d'exploitation : passer
l'unité `lots` d'abord (c'est là que vivent les seuils légaux), `%` en dernier
et sans attente.**

**4. 🟢 ET UNE SOURCE INSTITUTIONNELLE DE PLUS, utile bien au-delà de ce
chantier : `justice.fr/fiche/...`.** C'est le pendant « justice » des fiches
`service-public.gouv.fr` : même facture, **mention de mise à jour datée**, et
**la liste des textes de référence en bas de fiche** (ici CCH L126-23 à
L126-35-1, R126-15 à R126-20, loi de 1965 art. 24-4). Elle répond en `WebFetch`
là où `legifrance` (403) et `ecologie.gouv.fr` (**503 aujourd'hui**) ne
répondent pas. **À ajouter à la liste des domaines joignables** :
`service-public.gouv.fr` · **`justice.fr`** · **`anil.org`** ·
`conseil-etat.fr` (ArianeWeb) · `ademe.fr` · `data.gouv.fr` ·
`assemblee-nationale.fr` · `senat.fr` · `economie.gouv.fr` ·
`georisques.gouv.fr`. **Fermés** : `legifrance.gouv.fr` (403),
`actu-juridique.fr` (403), `ecologie.gouv.fr` (503 ce jour).

**5. 🟡 ET UN RÉSULTAT DE MÉTHODE SUR L'ANIL : elle donne le NUMÉRO D'ALINÉA du
texte, ce que les fiches grand public ne font pas.** « article 158 **VI** » pour
le calendrier, « 158 **IX** » pour l'outre-mer, « CCH **L126-31** » pour
l'obligation. **Quand legifrance est fermé, l'ANIL est ce qui permet de citer un
texte avec précision sans l'avoir lu** — et de dire honnêtement qu'on ne l'a pas
lu.

### 2026-10-15 — Le registre des copropriétés s'interroge sans télécharger 409 Mo, et la jurisprudence récente est la matière la plus citable qu'on puisse publier

**1. 🟢 LA SOURCE NEUVE : le Registre national d'immatriculation des copropriétés
(RNIC), publié par l'Anah sur data.gouv.fr.** 653 834 copropriétés en France,
**2 065 à Villeurbanne**. C'est la première source locale nouvelle depuis la base
DPE de l'ADEME (11/10), et elle couvre un sujet que DVF n'atteint pas : la
**structure** du parc, pas ses prix.

**2. 🟢 LA RECETTE QUI ÉVITE LES 409 Mo — l'API tabulaire de data.gouv.fr.** Le
fichier est trop gros pour ce conteneur (409 Mo pour la ressource quotidienne,
453 Mo pour le trimestriel). **Inutile de le télécharger : data.gouv.fr expose une
API tabulaire par ressource, qui filtre côté serveur.**

```bash
C="--cacert /root/.ccr/ca-bundle.crt"
# 1) l'id de ressource, depuis l'API dataset (⚠️ ne pas tronquer les URL en les
#    imprimant : une URL coupée donne un 404 qui ressemble à une URL morte)
curl -sL $C "https://www.data.gouv.fr/api/1/datasets/registre-national-dimmatriculation-des-coproprietes/"
# 2) UNE ligne complète -> les VRAIS noms de colonnes (cf. « Erreurs commises »)
curl -sL $C "https://tabular-api.data.gouv.fr/api/resources/<RID>/data/?page_size=1"
# 3) la commune, paginée
curl -sL $C "https://tabular-api.data.gouv.fr/api/resources/<RID>/data/?commune__exact=69266&page_size=200&page=1"
```

⚠️ **Trois pièges, tous rencontrés.**
- **L'API est AGRESSIVEMENT limitée en débit, et son échec ressemble à une panne :
  `HTTP 000`, corps vide, pas de 429.** Douze requêtes rapides ont fait tomber la
  13ᵉ ; la même requête est passée après 10 s de pause. **La boucle qui marche :
  `page_size=200`, `sleep 12` entre les pages, et 8 tentatives par page avec
  backoff progressif.** 11 pages → 2 065 lignes, sans perte.
- **Ne jamais conclure d'un `HTTP 000` que l'offset est plafonné.** J'ai d'abord
  cru à un plafond à 1 000 lignes ; c'était le débit. Le test qui tranche est de
  **rejouer la même page après une pause**.
- **La ressource utile est « RNIC - Actualisation quotidienne », pas le fichier
  trimestriel.** Elle était datée **du jour même** (15/10/2026, 06:06 UTC) : la
  donnée est fraîche à la journée, ce qui est un argument de citabilité — mais
  **implique de remesurer avant de réutiliser un chiffre**, et pas de le recopier
  depuis ce journal.

**3. 📌 LA RÈGLE DE FOND DU RUN, et elle est réutilisable hors RNIC : UN SEUIL
LÉGAL EXPRIMÉ EN « NOMBRE DE LOTS » NE SE LIT PAS SUR LE NOMBRE TOTAL DE LOTS.**
La loi de 1965 compte les lots **à usage de logements, de bureaux ou de
commerces** ; le registre sert les deux compteurs séparément.

```
Villeurbanne, RNIC du 15/10/2026 (n = 2 065)
  nombre_total_lots                        = 165 101   <- PAS le compteur légal
  nombre_lots_habitation_bureaux_commerces =  79 797   <- le compteur légal
  nombre_lots_habitation                   =  73 582
  nombre_lots_stationnement                =  52 232   (c'est l'essentiel de l'écart)
  1 744 copropriétés sur 2 065 (84,5 %) ont compteur légal < total
```
→ **Confondre les deux fait basculer des copropriétés de palier d'obligation.**
C'est la même famille d'erreur que « les médianes ne se composent pas » (14/10) :
**deux colonnes plausibles qui ne mesurent pas le même objet.**

**4. 📌 Le contrôle de substitution quand la règle du 13/10 ne s'applique pas.**
La règle « reproduire d'abord une statistique DÉJÀ publiée depuis la même
extraction » est inapplicable sur une source **neuve** : rien n'a jamais été
publié d'elle. Le contrôle employé à la place, et il est généralisable :
- **plateau et sensibilité au `n` sur chaque médiane publiée** (voisins du centre
  tous égaux ; médiane inchangée en retirant la première et la dernière valeur) —
  44 et 22 lots sont tous deux sur un plateau ;
- **ratio calculé PAR LIGNE, jamais en divisant deux médianes** (la médiane des
  ratios vaut 0,500 ; elle coïncide ici avec 22/44, mais **c'est une coïncidence
  et le calcul correct est le ratio par copropriété**) ;
- **plausibilité par le nom et l'adresse des plus grandes lignes** : « VILLEURBANNE
  II » (136 rue Dedieu), « LA PERRALIERE », « LE SAINT ANDRE » (115 r Jean Voillot),
  « 2ème AVENUE », « ATHENA I » — des ensembles villeurbannais réels, à des
  adresses réelles. **C'est ce contrôle-là qui dit qu'on a bien extrait la bonne
  commune**, et il coûte trois secondes ;
- **somme de contrôle sur chaque tableau** : les trois paliers additionnent
  exactement 2 065 lignes et 79 797 lots.

**5. 🟢 LA JURISPRUDENCE RÉCENTE EST LA MATIÈRE LA PLUS CITABLE QU'ON PUISSE
PUBLIER, et `conseil-etat.fr` est joignable depuis ce conteneur.** Rappel du
13/10 : `legifrance.gouv.fr` est fermé en `curl` **et** en WebFetch (403). Mais
**ArianeWeb, la base de jurisprudence du Conseil d'État, répond** :
`https://www.conseil-etat.fr/fr/arianeweb/CE/decision/<AAAA-MM-JJ>/<numero>`.
La décision n° 499299 du 17/03/2026 a été lue de première main : requérants,
objet, motifs, dispositif.
→ 📌 **Règle : un texte de loi ne se lit pas d'ici, mais une DÉCISION récente qui
l'interprète, si — et elle vaut mieux pour la citabilité.** Une page qui écrit
« le plafond est de 380 € » dit ce que mille pages disent ; une page qui écrit
« il a été attaqué par deux chambres FNAIM et le Conseil d'État a rejeté leur
requête le 17 mars 2026 par la décision n° 499299, en relevant un avis de
l'Autorité de la concurrence qui chiffre la prestation à une heure de travail »
dit quelque chose que **personne** d'autre n'écrit. **Chercher
systématiquement si un chiffre réglementaire publié a été contesté
récemment** : c'est du contenu frais, daté, sourcé et exclusif, sans rien
inventer.

**6. ⚠️ PIÈGE DE VÉRIFICATION EN PRODUCTION, nouveau et il m'a fait croire à un
défaut : React insère un commentaire HTML `<!-- -->` entre deux nœuds de texte.**
Le contrôle « la date de mise à jour est-elle visible ? » a répondu **False** à
tort, parce que le HTML servi est
`Mis à jour le <!-- -->15 octobre 2026`, et non `Mis à jour le 15 octobre 2026`.
→ 📌 **Tout grep d'une chaîne visible CONCATÉNÉE à partir de deux expressions JSX
doit tolérer `<!-- -->`** (ou mieux : dénuder les balises d'abord, puis chercher
dans le texte). C'est la même classe de faux positif que les mots collés du
04/10, dans l'autre sens : **ici le rendu est bon et c'est le contrôle qui
mentait.**

**7. ⚠️ Et une correction de procédure sur la lecture des SERP.** Les entrées des
13 et 14/10 écrivent « composition rigoureusement identique, **lien pour lien** ».
Vérification faite aujourd'hui : **l'enseigne est identique, l'URL non** — le
résultat Laforêt est aujourd'hui un billet de blog de recrutement, pas la page
d'agence. **Les runs précédents n'ont pas consigné les URL, donc « lien pour
lien » n'était pas vérifiable et n'aurait pas dû être écrit.**
→ **Consigner l'URL, pas seulement l'enseigne**, sinon la stabilité d'une SERP ne
se mesure pas.

### 2026-10-14 — Deux détecteurs de contradiction rejouables, et la règle « les médianes ne se multiplient pas »

**1. 🟢 L'index numérique par article — le détecteur de contradiction interne, en
30 lignes.** Le 13/10 prescrivait « grepper toutes les occurrences de chaque
seuil ». À l'échelle de 27 articles, le grep seul rend trop de bruit. Le script
qui marche découpe `lib/blog.ts` par `slug`, ne retient que les lignes portant
une formule de seuil ou de comparaison, et **groupe les nombres par valeur à
l'intérieur de chaque article** : ce qui remonte, ce sont les nombres répétés —
exactement les candidats à la contradiction.

```python
# découpe par slug, puis par article : {nombre -> [lignes]} sur les seules
# lignes portant une formule de seuil. Ne lire à la main que les nombres
# répétés : 27 articles -> 14 à ouvrir, ~100 couples.
THRESH = r"dépasse|supérieur|au moins|à partir de|inférieur|moins de|au-delà|≥|≤|>|<"
NUM    = r"\d+(?:[  ]\d{3})*(?:[,.]\d+)?"   # espace fine insécable comprise
```

⚠️ **Deux pièges rencontrés.**
- ~~**Le séparateur de milliers du fichier est une espace fine insécable
  (U+202F) ou une espace insécable (U+00A0), pas une espace simple.**~~
  🔴 **CETTE NOTE EST FAUSSE — corrigée le 15/10 après remesure :
  `lib/blog.ts` ne contient AUCUN U+202F, U+00A0 ni U+2009, et ses 610
  séparateurs de milliers sont tous des espaces simples (U+0020).** Le `NUM`
  correct est donc `\d+(?: \d{3})*(?:,\d+)?` avec une espace SIMPLE. Une note
  d'outillage fausse rend le détecteur silencieusement aveugle : voir « Erreurs
  commises et corrigées » du 15/10.
- **Il faut inclure la FAQ dans le périmètre de l'article**, sinon le défaut n°1
  du jour reste invisible : la contradiction était précisément entre le corps et
  la FAQ.

**2. 🟢 Le second détecteur, complémentaire et encore plus simple : le grep des
phrases de comparaison relative.** Il attrape ce que l'index rate (quand les deux
nombres ne sont pas répétés) et il est exhaustif en une commande :

```bash
grep -rno "[^\"]\{110\}\(% de moins\|% de plus\|% en dessous\|% au-dessus\|% d'écart\|fois moins\|fois plus\|% plus cher\)[^\"]\{0,70\}" \
  app lib --include='*.tsx' --include='*.ts'
# 20 occurrences dans lib/blog.ts, 2 dans app/ — toutes recalculables à la main
```
→ **Le `-o` avec une fenêtre de contexte fixe est ce qui rend le résultat
lisible** : sans lui, chaque match rend un bloc de texte de 2 000 caractères et
le contrôle devient illisible. **22 lignes à recalculer, une heure de travail,
un défaut trouvé.**

**3. 📌 LA RÈGLE DE FOND DU RUN, et c'est la plus réutilisable : LES MÉDIANES NE
SE COMPOSENT PAS.** Prix médian, surface médiane et prix médian au m² sont trois
statistiques indépendantes de la même population. **Le quotient de deux d'entre
elles n'est pas la troisième**, et l'écart n'est pas une erreur :

```
T2 villeurbannais 2025 (DVF, n = 436)
  prix médian          170 000 €
  surface médiane           45,0 m²
  prix médian au m²      3 829,8 €/m²
  170 000 / 45 = 3 778 €/m²  ≠  3 830 €/m²     <- NORMAL
  170 000 / 3 830 = 44,4 m²  ≠  45 m²          <- c'est ce calcul qui a
                                                  produit le défaut du jour
```
→ **Avant de publier un « cas de référence » construit sur plusieurs médianes :
prendre les médianes telles quelles, ne jamais en dériver une troisième, et dire
au lecteur qu'elles ne se multiplient pas.** Le dire est un avantage de
citabilité, pas un aveu : aucune page concurrente relevée ne l'explique.

**4. 📌 Le contrôle de robustesse d'une médiane, en deux lignes, à faire avant de
corriger un chiffre publié.** Corriger 44 → 45 n'a de sens que si 45 ne dépend
pas d'une vente :

```python
t2 = sorted(surfaces)          # n = 436
t2[n//2-3 : n//2+3]            # [45,45,45,45,45,45]  -> plateau, robuste
st.median(t2[1:]), st.median(t2[:-1])   # 45.0, 45.0  -> insensible au n
```
→ **C'est ce contrôle qui autorise à écrire 45 m² malgré l'écart de `n` connu
entre 435 publié et 436 mesuré.** Sans lui, la correction aurait été un pari.

**5. ⚠️ Rappel de procédure qui a resservi : `main` LOCAL peut être périmé APRÈS
un `git fetch` réussi.** Le 13/10 notait « `origin/main` était déjà à jour avant
le fetch » ; aujourd'hui `origin/main` l'était aussi, **mais `main` local
retardait de deux commits** et seul le `git merge --ff-only origin/main` l'a
rattrapé. **Le fetch met à jour `origin/main`, jamais `main`.** Les deux
vérifications sont distinctes et il faut les faire toutes les deux.

### 2026-10-13 — DVF publie la surface Carrez des ventes, et le site l'ignorait depuis cinq semaines

**1. 🟢 Le fait d'outillage du jour : le fichier commune de DVF porte
`lot1_surface_carrez` … `lot5_surface_carrez`.** Le site exploite DVF depuis le
07/09 — médianes communales, par quartier, par typologie, dispersion, seuil de
plus-value — **sans avoir jamais lu l'en-tête complet du fichier.** Il y a
**5 colonnes de surface Carrez** à côté de `surface_reelle_bati`, et elles
ouvrent un angle que **personne d'autre ne publie** : la surface qui engage
juridiquement le prix, telle qu'elle a réellement été déclarée dans les actes.

```bash
C="--cacert /root/.ccr/ca-bundle.crt"
# ⚠️ -L OBLIGATOIRE : sans lui, HTTP 302 et un fichier de 138 octets
curl -sL $C --retry 3 \
  "https://files.data.gouv.fr/geo-dvf/latest/csv/2025/communes/69/69266.csv" -o 69266.csv
head -1 69266.csv | tr ',' '\n' | nl | grep -i 'carrez\|surface'
#   20  lot1_surface_carrez   ...   28  lot5_surface_carrez   32  surface_reelle_bati
```

⚠️ **Deux pièges, tous deux rencontrés.**
- **`curl` sans `-L` rend un fichier de 138 octets** (une page nginx « 302
  Found ») **avec un code HTTP 302, pas une erreur.** Un script qui ne teste que
  `-o` et pas le contenu croit avoir téléchargé le fichier. Le journal notait
  l'URL depuis le 07/09 **sans mentionner la redirection**.
- **La surface Carrez n'est PAS `surface_reelle_bati`, et les comparer comme deux
  mesures du même objet est une faute de méthode** (voir « Erreurs commises »).
  L'une est cadastrale, l'autre est la surface privative au sens de la loi de
  1965. **Un écart entre elles n'est pas une erreur de mesurage.**

**2. 📌 La recette de calcul, à réutiliser telle quelle.** Elle part de la
population **exactement définie par la méthode du journal** (entrée du 07/09),
ce qui est ce qui rend les résultats comparables au reste du site :

```python
# Vente | une seule ligne bâtie par mutation | Appartement | surface >= 10 m²
# | 800 <= €/m² <= 12 000   -> 1 876 ventes, et les médianes publiées retombent
#   à l'identique (3 566,8 €/m², 62 m², 195 000 €) : c'est le CONTRÔLE à faire
#   AVANT d'écrire quoi que ce soit de neuf sur cette population.
def carrez(r):  # somme des lots renseignés
    return [float(r[f"lot{i}_surface_carrez"]) for i in range(1,6)
            if r.get(f"lot{i}_surface_carrez") and float(r[f"lot{i}_surface_carrez"])>0]
```

→ **Règle générale, et c'est la plus réutilisable du run : avant de publier une
statistique neuve tirée d'une source déjà utilisée, reproduire d'abord une
statistique DÉJÀ PUBLIÉE depuis la même extraction.** Si les médianes connues
retombent au centième, la population est la bonne et le chiffre neuf est
comparable au reste du site. Sinon, c'est la population qui a changé — et c'est
exactement ce qui a permis de voir le `n` passé de 1 875 à 1 876 sans rien casser.

**3. 🟢 Résultats obtenus pour Villeurbanne (2025), tous publiés.** 1 727 ventes
sur 1 876 (**92,1 %**) portent une surface Carrez ; médiane **61,5 m²** (Q1 43,0 /
Q3 74,3) ; **aucun des 1 738 lots mesurés sous 8 m²** — la règle d'exclusion
légale **se voit dans les données**, ce qui est une façon de la sourcer que les
concurrents n'ont pas ; et sur les 1 716 ventes à un seul lot, **38,2 %** de
coïncidence à 0,5 m² près avec le bâti cadastral (écart médian **− 0,31 %**).

**4. ⚠️ `legifrance.gouv.fr` est fermé en `curl` ET en WebFetch — re-testé
aujourd'hui, HTTP 403 sur les deux.** La nuance est utile : le domaine n'est pas
seulement bloqué pour `curl` par user-agent, il l'est aussi pour l'outil de fetch
du harness. **Donc un texte de loi ne se lit pas de première main depuis ce
conteneur.** Le contournement qui a marché, et qui est généralisable :
- **les fiches `service-public.gouv.fr` citent les textes en référence** sous un
  intitulé explicite (« Loi n° 65-557 du 10 juillet 1965 : article 46 —
  Information sur la superficie du lot ») : **l'existence et la portée du texte se
  sourcent ainsi, même sans son libellé** ;
- **les chambres de notaires et l'ANIL publient le contenu du texte** avec leurs
  propres dates. Deux sources institutionnelles indépendantes qui concordent, dont
  **une avec un exemple chiffré** (100 m² → 94 m², 6 % → 6 % du prix), valent
  mieux qu'une lecture approximative du texte brut : c'est l'exemple chiffré qui a
  **tranché l'assiette de la réduction**, point sur lequel aucune des deux ne se
  prononçait explicitement.
→ **Règle : pour un point de droit, chercher la source qui donne un EXEMPLE
CHIFFRÉ. Elle lève les ambiguïtés que le texte laisse, et elle est vérifiable.**

**5. ⚠️ Et un piège de `service-public` qui a failli faire publier une définition
fausse.** En cherchant « 1,80 m » dans la fiche **F10798**, on trouve bien une
occurrence — mais **c'est la définition de la SURFACE DE PLANCHER, pas de la
surface Carrez** (« … calculé à partir du nu intérieur des façades. Les surfaces
des vides et trémies, des garages et des combles non aménageables sont déduites
… et 10 % des surfaces destinées à l'habitation »). **Le seuil de 1,80 m est le
même, la définition ne l'est pas du tout.** Reprise telle quelle, elle aurait
remplacé une erreur par une autre.
→ **Règle : un chiffre trouvé par `grep` dans une fiche officielle n'est sourcé
que si on a lu CE QU'IL DÉFINIT.** Même seuil ≠ même règle. C'est le cousin du
piège du 30/09 (un identifiant de fiche qui rend 200 sur un tout autre sujet) :
**vérifier le contexte, pas la présence.**

### 2026-10-12 — VEILLE (lundi, elle avait une semaine de retard) : le découplage entre le classement Google et la citation par les IA est mesuré, et il valide la méthode suivie ici

**⚠️ Avertissement de méthode, à lire avant les chiffres.** La première recherche
(« AI Overviews ranking changes October 2026 study ») a rendu **presque
exclusivement des blogs de prestataires qui recyclent les mêmes études en les
déformant** : on y trouve 38 %, 17 %, 12 %, « CTR −61 % », « −58 % » attribués
pêle-mêle, parfois à la mauvaise source. **Aucune étude publiée en octobre 2026
n'a été trouvée.** La seconde recherche, restreinte aux domaines primaires
(`ahrefs.com`, `developers.google.com`, `blog.google`, `schema.org`,
`searchengineland.com`, `seroundtable.com`), a donné la source réelle.
→ **Règle : sur ce sujet, aller droit à la source primaire et ignorer les
récapitulatifs. Le `allowed_domains` de WebSearch est l'outil qui le permet.**

**1. 🟢 Le fait central, source primaire (Ahrefs, « Update: 38% of AI Overview
Citations Pull From The Top 10 »).** Sur **863 000 SERP de mots-clés** et
**4 millions d'URLs citées** en AI Overviews : **37,9 % des URLs citées
apparaissent aussi dans les 10 premiers blocs** de la SERP classique, contre
**76 %** dans l'étude précédente **sept mois plus tôt**. En ne comptant que les
liens bleus : **37,10 % dans le top 10**, et **36,70 % ne sont pas dans le
top 100 du tout**.
🟡 **Réserves que la source elle-même donne, à ne pas effacer** : c'est la
recherche d'Ahrefs sur ses propres données (Brand Radar), **et la comparaison
avec les 76 % n'est pas à méthode constante** — l'étude initiale ne regardait que
les 3 citations les plus visibles, et le parsing a été amélioré depuis. **Une
partie de la chute vient donc de la mesure, pas du comportement de Google.**
Un autre papier du même éditeur (« AI search overlap ») donne **12 %** de
recouvrement pour les URLs citées par les assistants sur le prompt d'origine.

**2. 📌 Le mécanisme, et c'est lui qui est actionnable : le `query fan-out`.**
L'AI Overview éclate la question de l'utilisateur en **sous-requêtes** et puise
dans les SERP de ces sous-requêtes, pas seulement dans celle de la requête
d'origine. **Conséquence directe pour ce site, et elle est importante :**
→ **Être absent de « agence immobilière Villeurbanne » (29 mesures sur 29) ne
ferme PAS la porte à la citation par une IA.** Cette SERP est tenue par des
annuaires (mesuré deux jours de suite), et c'est précisément le type de requête
dont le recouvrement avec les citations est le plus faible.
→ **Le levier n'est pas la requête-tête, ce sont les sous-questions.** Une page
qui répond proprement à « combien de temps un diagnostic électricité est-il
valable pour vendre » peut être citée sans jamais ranker sur « diagnostics
obligatoires ».
→ **Cela valide la méthode appliquée depuis le 05/10** (H2 en questions réelles,
réponse autonome en tête, FAQPage en parité, chiffres datés et sourcés) **au lieu
de la contredire : rien à corriger, et une raison mesurée de continuer.** C'est
exactement la forme donnée au chantier du jour.

**3. 🟢 Outillage — `georisques.gouv.fr` sort de la liste des domaines fermés, et
son API est utilisable sans clé.** Deux points d'entrée vérifiés aujourd'hui :
```bash
C="--cacert /root/.ccr/ca-bundle.crt"
# potentiel radon de la commune
curl -s $C "https://www.georisques.gouv.fr/api/v1/radon?code_insee=69266"
# familles de risques recensées pour la commune
curl -s $C "https://www.georisques.gouv.fr/api/v1/gaspar/risques?code_insee=69266&page=1&page_size=30"
```
Réponses JSON immédiates. Pour Villeurbanne : `classe_potentiel: "1"` et
**six familles de risques** (inondation — crue à débordement lent et remontées de
nappes —, séisme, phénomènes liés à l'atmosphère, radon, rupture de barrage,
transport de marchandises dangereuses).
⚠️ **Deux pièges** : (a) **les PAGES HTML de Géorisques sont une coquille JS** —
`/risques/radon` rend **500** via WebFetch et `/consulter-les-dossiers-thematiques/radon`
rend 200 mais **sans un mot de texte exploitable** : l'API oui, les pages non ;
(b) **l'API rend un numéro de classe radon sans son échelle** — la définition de
1/2/3 n'est pas sourçable là, donc **ne pas l'interpréter** (voir « Hypothèses »).

**4. 🟢 Méthode service-public réutilisable, et le lot d'identifiants qu'elle a
produit.** La technique du 07/10 (partir d'une fiche carrefour, extraire ses
liens, **sonder les `<title>` en lot**) a de nouveau été la plus rapide :
`F2604` « Vente d'un logement en copropriété » → 44 fiches liées → **23 titres
sondés en un seul appel** → toutes les fiches de diagnostics trouvées d'un coup.
**Identifiants vérifiés le 12/10/2026, à réutiliser sans les redécouvrir :**

| Fiche | Sujet | Vérifié le |
|---|---|---|
| `F10798` | **Liste des diagnostics à fournir en cas de vente** (sépare maison / appartement) | 07/03/2025 |
| `F2604` | Vente d'un logement en copropriété (fiche carrefour) | 21/08/2025 |
| `F16096` | DPE | 01/01/2026 |
| `F37110` | Audit énergétique (passoire thermique) | 14/09/2026 |
| `F1142` | Plomb (CREP) | 17/08/2026 |
| `F742` | Amiante | 06/12/2024 |
| `F18692` | Électricité | 17/09/2026 |
| `F17337` | Gaz | 17/09/2026 |
| `F31685` | Assainissement (collectif **et** non collectif) | 26/02/2025 |
| `F3150` | Termites et insectes xylophages | 26/02/2026 |
| `F12239` | État des risques | 28/09/2026 |
| `F37294` | État daté en copropriété | — |
| `F17376` | Où trouver un diagnostiqueur certifié | — |

⚠️ **`N320` n'existe pas** (404) : il n'y a pas de page d'index « Diagnostic
immobilier » atteignable par identifiant `N…`. Passer par les liens d'une fiche.
⚠️ **Rappel toujours valable** : les fiches ne répondent que sur
`service-public.gouv.fr` (`service-public.fr` rend 301).

**5. 📌 Les durées de validité diffèrent entre VENTE et LOCATION, et c'est un
piège de contenu générique.** Relevé aujourd'hui sur F18692 et F17337 :
électricité et gaz valent **3 ans pour vendre** mais **6 ans pour louer**. La
plupart des pages concurrentes publient une seule durée. **À vérifier
systématiquement quand une page du site parle de durée de diagnostic : sur une
page de vente, écrire la durée de location est une erreur de fait.**

**6. ⚠️ Et le piège d'outillage du conteneur, rencontré TROIS fois aujourd'hui —
il faut l'écrire parce qu'il simule un échec.** `npx tsc`, `npm run build`,
`pkill` et même un `nohup … &` suivi d'un `sleep` **sortent en 144** dès que la
commande composée se termine par un tube vers `tail`/`head`/`grep`, ou parfois
sans raison visible. **Ce n'est pas un build cassé** (c'est le cousin du SIGPIPE
noté le 11/10). **Procédure qui marche à coup sûr :**
```bash
npx tsc --noEmit > $S/tsc.log 2>&1; echo "exit=$?"; cat $S/tsc.log
npm run build    > $S/build.log 2>&1; echo "exit=$?"; grep -E "Compiled|Error" $S/build.log > $S/ok.txt; cat $S/ok.txt
```
→ **Rediriger vers un fichier, puis lire le fichier. Ne jamais mettre `npm run
build` ni `tsc` dans un tube.** Et pour le serveur local : **le lancer comme tâche
de fond suivie par le harness** (`run_in_background`), pas en `nohup … &` — celui
du harness se tue proprement (`exit 143`) et on sait qu'il est mort, ce qui est
exactement ce qui manquait le 11/10 pour éviter le serveur périmé.

### 2026-10-11 — Outillage : la base DPE de l'ADEME est la première source de données locales nouvelle depuis DVF, et elle s'interroge en comptages purs

**1. 🟢 `data.ademe.fr` est joignable, rapide et agrégeable.** Base **« DPE
Logements existants (depuis juillet 2021) »**, `slug` **`dpe03existant`**,
**15 756 542 diagnostics**, **Licence Ouverte 2.0**, origine ADEME. Interrogée
sous l'API `data-fair`, avec `--cacert /root/.ccr/ca-bundle.crt` comme partout
ici. **Trois points d'entrée suffisent, et aucun ne télécharge de données :**

```bash
B=https://data.ademe.fr/data-fair/api/v1/datasets/dpe03existant
# le schéma (noms de champs) — 75 ko
curl -s --cacert /root/.ccr/ca-bundle.crt "$B/schema"
# un COMPTAGE pur : size=0 ne rend que `total`
curl -s --cacert /root/.ccr/ca-bundle.crt "$B/lines?size=0&qs=code_insee_ban%3A69266"
# une RÉPARTITION : values_agg + size=0 (sans size=0, chaque bucket traîne une ligne entière)
curl -s --cacert /root/.ccr/ca-bundle.crt \
  "$B/values_agg?field=etiquette_dpe&qs=code_insee_ban%3A69266&size=0&agg_size=10"
```

⚠️ **Deux pièges, tous deux rencontrés :**
- **`q=` fait de la recherche floue, `qs=` fait de la requête structurée.**
  `?q=Villeurbanne` a rendu « 51 000 » avec un `totalMarginPct: 9` (un total
  *approché*) ; `?qs=code_insee_ban:69266` rend **51 951**, exact. **Ne jamais
  publier un chiffre issu de `q=`.**
- **`values_agg` sans `size=0` recopie une ligne complète par bucket** (des
  centaines de champs) : la réponse est illisible et coûteuse pour rien.

**Les champs utiles de cette base** (il y en a des centaines) :
`code_insee_ban` · `type_batiment` (`appartement` / `maison` / `immeuble`) ·
`etiquette_dpe` · `etiquette_ges` · `periode_construction` (10 tranches) ·
`type_energie_n1` · `surface_habitable_logement` · `date_etablissement_dpe`.
Les intervalles marchent : `date_etablissement_dpe:[2021-07-01 TO 2025-12-31]`,
`surface_habitable_logement:[0 TO 40]`.

**2. 📌 Méthode : fabriquer soi-même le point de comparaison, sur la même base et
le même filtre.** Publier « 4,94 % de passoires à Villeurbanne » ne dit rien sans
référence, et la référence nationale la plus citée (le parc de logements) **n'est
pas comparable** au stock des DPE réalisés. La solution est de **recalculer la
référence avec exactement la même requête** en retirant le filtre commune :
7,05 % pour la France, 6,72 % pour Lyon. **L'écart mesure alors une différence de
parc, pas une différence de méthode** — et c'est défendable ligne à ligne. C'est
le prolongement direct de la méthode du 27/09 (« contrôler ses chiffres en
trouvant qui les calcule autrement »), appliquée ici à soi-même.

**3. 🟢 Et la mesure sert aussi à ÉCARTER une explication, ce qui vaut autant que
d'en confirmer une.** L'hypothèse « Villeurbanne a peu de passoires grâce au
chauffage urbain » était séduisante et aurait été publiée de bonne foi. **Deux
requêtes l'ont tuée : 17,95 % de raccordés au réseau de chaleur à Villeurbanne
contre 17,24 % en France.** → **Règle : toute explication causale qu'on s'apprête
à écrire doit d'abord passer une requête. Si la base peut la tester, elle doit la
tester — et le résultat négatif se publie**, il crédibilise le reste du texte
bien plus qu'une causalité jolie et non vérifiée.

**4. 🟢 `ecologie.gouv.fr` rejoint les sources utilisables, et il couvre un trou
de service-public.** `https://www.ecologie.gouv.fr/politiques-publiques/diagnostic-performance-energetique-dpe`
répond 200 et porte **le calendrier du DPE collectif en copropriété**, que les
fiches service-public ne donnent pas : la recherche « DPE collectif copropriété »
sur service-public rend 50 résultats dont **aucun** ne le contient (F36760 « Plan
pluriannuel de travaux » parle de lots mais pour le PPT, pas pour le DPE).
→ **Liste à jour des sources de droit joignables** : `service-public.gouv.fr`
(le meilleur point d'entrée, fiches datées « Vérifié le … »), **`ecologie.gouv.fr`
(nouveau)**, `data.gouv.fr` (DVF), **`data.ademe.fr` (nouveau)**.
**Domaines fermés, inchangés — ne pas y reperdre de temps** :
`meilleursagents.com` · `seloger.com` · `searchengineland.com` ·
`legifrance.gouv.fr` · `economie.gouv.fr` · `georisques.gouv.fr`.
⚠️ **Et `www.data.gouv.fr` a rendu un `HTTP 000` aujourd'hui** (tunnel fermé
en cours d'échange), **sans que ce soit une fermeture** : `data.ademe.fr`
répondait dans la même seconde. C'est le `exit 35` transitoire du 30/09, encore
lui — **une seule mesure ne ferme pas un domaine.**

**5. ⚠️ Rappel de la convention de fiches service-public, qui a coûté trois
appels.** Les fiches ne répondent **que** sur `service-public.gouv.fr` : sur
`service-public.fr` elles rendent **301** (constat du 06/10, toujours vrai). Et
les identifiants ne se devinent pas : `F35671` n'existe pas, `F34669` est une
fiche de fonction publique. **La méthode du 07/10 reste la bonne et elle est
rapide** : partir d'une fiche carrefour, extraire ses liens
(`grep -oE '/particuliers/vosdroits/F[0-9]+'`), puis **sonder les `<title>` en
lot**. Vingt identifiants sondés en un appel chacun ont donné F37110 (audit
énergétique) et F33463 (diagnostics du bailleur), les deux fiches dont le run
avait besoin.
### 2026-10-08 — Méthode interne : auditer les COMPARAISONS, parce que l'asymétrie des pourcentages est invisible à tous les contrôles de forme

**Le défaut-type, et pourquoi il est indétectable autrement.** « A est X % de moins
que B » et « B est X % de plus que A » **ne sont pas la même grandeur** : la base
change. Sur Cusset (3 171 €/m²) et Gratte-Ciel (3 846 €/m²) :

```
(GC / CU - 1) * 100 = +21,3 %   → « Gratte-Ciel est 21,3 % PLUS cher que Cusset »
(1 - CU / GC) * 100 =  17,6 %   → « Cusset est 17,6 % MOINS cher que Gratte-Ciel »
```

**Les deux formules sont justes ; une seule répond à la phrase publiée.** Aucun
typecheck, aucun lint, aucune parité FAQ, aucun comptage de mots ne peut voir ça :
le nombre est présent, bien formaté, dérivé d'une source de vérité, et **faux par
rapport à ce qu'il prétend dire**.

**Le contrôle, réutilisable tel quel.** Deux `grep` à croiser, puis lire chaque
couple formule/phrase :

```bash
# 1. les formules de comparaison relative
grep -rn -- '- 1) \* 100\|- 1) \* 1000\|1 - ' app lib --include='*.tsx' --include='*.ts'

# 2. les phrases qui publient une comparaison
grep -rn 'de moins qu\|de plus qu\|moins cher\|plus cher\|au-dessus de\|en dessous de\|le plus\|la plus\|deuxième\|après ' app lib --include='*.tsx' --include='*.ts'
```

Puis, pour chaque résultat de (2) : **quelle est la BASE dans la phrase ?** et
**est-ce la même que le dénominateur de la formule ?** Si la phrase dit « X de
moins que B », le dénominateur doit être **B**.

**Rendement du contrôle sur ce site (08/10)** : 2 erreurs réelles sur ~12 couples
examinés. Les comparaisons **saines** le sont pour une raison repérable :
- `ecartCommune()` : base = commune dans la formule **et** dans la phrase (« par
  rapport à la médiane de Villeurbanne ») → **pas d'asymétrie possible** ;
- `ECART_INVEST` (Charpennes, 45 %) : la phrase dit « **au-dessus de** la médiane »,
  donc base = notre médiane = le dénominateur → juste ;
- Cyprian « 23 % sous la médiane communale » → base commune → juste ;
- les écarts en **m²** (14 m², 6 m²) et en **points** de rendement sont des
  **différences**, pas des rapports : **aucune asymétrie, rien à vérifier.**
→ 📌 **Heuristique qui ressort : le danger est concentré sur les comparaisons entre
DEUX ÉLÉMENTS DE MÊME NATURE (deux quartiers, deux prix au m²), parce que c'est là
que la base est ambiguë. Les comparaisons à un référentiel unique (la commune) et
les différences absolues sont structurellement sûres.**

**Deuxième enseignement, sur l'ordre des lectures.** Le même run a produit un
faux positif (les arrondis, voir « Erreurs commises ») parce que j'ai lu la formule
avant la phrase. **L'ordre qui marche :**
1. lire la **phrase rendue** (HTML de production, texte isolé du `<main>`) — elle
   dit ce qui est **affirmé** ;
2. puis la **formule** — elle dit ce qui est **calculé** ;
3. comparer les deux. Un désaccord est soit une erreur (cas Cusset), soit une
   précaution déjà rédigée (cas des arrondis, « sur le prix non arrondi »).

**Troisième point, outillage, confirmé une fois de plus** : le texte doit être
isolé du `<main>` (technique du 07/10). Le payload RSC en fin de document recopie
tout le texte échappé et fait remonter des faux positifs sur n'importe quel `grep`
de phrase.

### 2026-10-07 — Outillage : Géorisques est fermé (6ᵉ domaine), une fiche service-public se trouve par sondage de `<title>`, et un domaine joignable peut avoir des chemins fermés

**1. 🔴 `georisques.gouv.fr` est INJOIGNABLE depuis ce conteneur.**
`SSL_ERROR_SYSCALL` puis « Recv failure: Connection reset by peer » sur
**5 tentatives** (`--retry 4 --retry-all-errors`), sur trois points d'API
(`/api/v1/gaspar/risques`, `/zonage_sismique`, `/radon`), **avec et sans en-tête
de navigateur**, `--cacert` bien passé. Ce n'est donc pas le `exit 35` transitoire
du 30/09 (qui passe à la relance) : **c'est un blocage stable.**
**Sixième domaine fermé**, la liste à jour :
`meilleursagents.com` · `seloger.com` · `searchengineland.com` ·
`legifrance.gouv.fr` · `economie.gouv.fr` · **`georisques.gouv.fr`**.
⚠️ **Ne pas reperdre du temps dessus** : un run qui a besoin des zonages de risques
(termites, mérule, radon, bruit, sismicité) doit chercher ailleurs dès le départ.

**2. 🟢 Trouver une fiche `service-public` par SONDAGE DE `<title>` — la méthode du
30/09 marche, et ses pièges se sont reproduits à l'identique.**
Quatre identifiants téléchargés d'un coup, titre vérifié sur chacun :

```
N20074 → 200 → « Impôt sur la fortune immobilière (IFI) »        ✗
F10864 → 200 → « Impôt sur le revenu - Plus-value immobilière »  ✗ (connue)
F2604  → 200 → « Vente d'un logement en copropriété »            ✓
F1024  → 200 → « Allocation spécifique annuelle pour étudiant »  ✗
```

**Deux identifiants sur quatre rendent 200 sur un tout autre sujet** — exactement
l'avertissement du 30/09, et la preuve qu'on ne peut jamais lire une fiche sans
avoir vérifié son titre. **Le sondage groupé (une boucle, les titres imprimés) est
plus rapide que de chercher la bonne page carrefour**, parce que la recherche
interne du site est en JavaScript et que les libellés de liens n'apparaissent pas
dans le HTML (vérifié aujourd'hui : `grep` sur les `vosdroits/F…` de F2604 rend
39 identifiants et **presque aucun libellé**).

📌 **Fiche à retenir, elle vaut pour plusieurs chantiers à venir :
`service-public.gouv.fr/particuliers/vosdroits/F2604`, « Vente d'un logement en
copropriété », vérifiée le 21 août 2025.** C'est la source la plus dense trouvée
jusqu'ici sur la vente : dossier de diagnostic technique complet d'un lot
(14 pièces avec leurs conditions), les 7 documents de copropriété **et le fait que
le délai de rétractation ne démarre qu'à leur remise intégrale**, l'amende de
30 000 € sur l'acompte anticipé, les mentions obligatoires de l'annonce, l'état
daté, le certificat du syndic, le régime des frais d'acte. **Utile bien au-delà de
`vendre-sans-agence`** : `/vendre`, `diagnostics-obligatoires-vente`,
`compromis-de-vente-delais`, `charges-copropriete`, `vendre-appartement-lyon-etapes`.

**3. 🟡 Un domaine joignable n'est pas un domaine ouvert : tester l'URL exacte.**
Sur `pap.fr`, le même conteneur et le même en-tête de navigateur donnent deux
résultats opposés :

```
/vendeur/vendre-sans-agence/vendre-sans-agence-combien-ca-coute/a19842 → 200 (52 ko)
/vendeur/tarifs                                                        → 403 « Just a moment… »
```

Les **pages éditoriales passent**, les **pages tarifaires sont derrière
Cloudflare**. (Et `WebFetch` rend 403 là où `curl` + en-tête navigateur rend 200 :
**sur un 403 de `WebFetch`, retenter en `curl` avant de déclarer le domaine
fermé** — c'est comme ça que la page PAP du jour a été lue.) À l'inverse,
`notaires.fr` rend **403 partout**, en-tête navigateur compris : à ranger comme
fermé pour les points de droit, service-public le remplace mieux de toute façon.

**4. 🟢 Compter les mots du `<main>` et non de la page.** Le contrôle « combien de
mots sert vraiment cette page » n'a de sens qu'en isolant `<main>` : la page
complète embarque header, footer et, surtout, **le payload RSC de Next.js en fin de
document**, qui recopie tout le texte sous forme échappée. Mesuré sur `<main>` :
2 583 mots. Le même compte sur le document entier double le chiffre et fait croire
à un article deux fois plus long qu'il n'est. **Le même piège vaut pour le
`grep` des mots collés** : les motifs testés sur la page brute remontent du bruit
venu du JSON (`\",\"7 octobre 2026\"`), zéro sur le `<main>`.

### 2026-10-06 — Méthode interne (pas de la veille) : compter les liens ENTRANTS par page, pas la profondeur de clic

**Ce que ça remplace.** Le 04/10 mesurait la **profondeur de clic** par BFS et
concluait « la grappe blog est à la profondeur 3-4 ». C'est vrai mais peu
actionnable : la profondeur dit *où* est le problème, pas *quoi* corriger.

**La mesure qui, elle, désigne le correctif** — un seul `grep` par article :
pour chaque `slug` de `lib/blog.ts`, compter les fichiers de `app/` (hors
`app/blog/[slug]`) qui contiennent `blog/<slug>`. Le résultat se lit directement :
**14 articles sur 26 à zéro**, et la liste des pages qui n'émettent aucun lien.
C'est ce comptage, pas la profondeur, qui a montré que `/faire-gerer` (1 772 mots)
et `/honoraires` n'émettaient **aucun** lien vers le blog.

**Le croisement qui donne la priorité.** Le nombre de liens entrants seul ne
suffit pas : il faut le croiser avec le **poids de l'article**. Trié par mots, le
tableau fait apparaître les deux seules lignes qui comptaient —
`rentabilite-locative-lyon` (2 713 mots, 0 lien) et `plus-value-immobiliere-calcul`
(2 598 mots, 0 lien) — et montre que les 12 autres orphelins sont **tous sous
500 mots**, donc un problème de **contenu**, pas de maillage. Sans ce croisement,
on « corrige » le maillage en liant 14 pages faibles, ce qui aggrave le signal.

**Réutilisable tel quel** sur n'importe quelle grappe du site. ⚠️ Le `grep` compte
les **fichiers**, pas les occurrences : deux liens dans une même page comptent 1.
C'est voulu (une page = un vote), mais il faut le savoir en relisant les chiffres.


### 2026-10-05 — Veille hebdomadaire : Google documente enfin le GEO, et il démolit trois « techniques » au passage

**Source primaire, et elle est nouvelle pour ce journal.** Google publie
désormais une page dédiée : « Optimizing for Generative AI Features on Google
Search », `developers.google.com/search/docs/fundamentals/ai-optimization-guide`,
**page mise à jour le 2026-07-10**. C'est la première doctrine écrite de Google
sur le sujet ; jusqu'ici le journal travaillait sur des inférences. Les citations
ci-dessous sont **verbatim**.

**1. Ce qui est explicitement déclaré INUTILE.**
> « You don't need to create new machine readable files, AI text files, markup,
> or Markdown to appear in Google Search (including its generative AI
> capabilities), as Google Search itself doesn't use them. »

→ **`llms.txt` est nommément visé.** Conséquence traitée en « Erreurs commises
et corrigées ».

> « There's no requirement to break your content into tiny pieces for AI to
> better understand it. Google systems are able to understand the nuance of
> multiple topics on a page and show the relevant piece to users. »

> « You don't need to write in a specific way just for generative AI search.
> AI systems can understand synonyms and general meanings of what someone is
> seeking. »

> « Structured data isn't required for generative AI search, and there's no
> special schema.org markup you need to add. »

**Lecture honnête, à ne pas sur-interpréter.** Google dit « pas NÉCESSAIRE », il
ne dit pas « nuisible ». La consigne du brief — réponse autonome en tête de
chaque H2 — **reste bonne**, mais pour une autre raison que celle annoncée : elle
sert le lecteur humain et les extraits enrichis, pas un mécanisme d'extraction
propre aux LLM. **À conserver donc, mais sans jamais hacher le texte ni
sacrifier la lisibilité pour « faire du passage extractible »** — c'est
exactement ce que Google décrit comme inutile. De même, le `FAQPage` et
l'`Article` du site se justifient par les rich results, **pas** par le GEO : ne
plus compter une donnée structurée comme un chantier GEO.

**2. Ce que Google déclare déterminant — et c'est la thèse du journal, mot pour
mot.**
> « Providing a unique point of view […] a first-hand review provides a unique
> perspective based on personal experience, whereas a summary of existing
> content simply restates information already available elsewhere. »

→ **Convergence totale avec la règle que ce journal a tirée de ses propres
mesures** depuis le 29/09 : « règle de droit générique + nom de ville » ne marche
pas, ce qui marche est **publier ce que personne d'autre ne publie ». La doctrine
Google et la mesure locale disent la même chose. **C'est la règle de priorité des
chantiers : un chantier qui ne publie pas de donnée propre est un chantier
faible, quel que soit son volume.** Le run du jour s'y est tenu (le tableau
d'abattements saturé a été rejeté ; le seuil par quartier a été publié).

**3. Nouvelle surface de MESURE, et elle manque à ce journal.**
Google a livré en juin 2026 un **« Generative AI performance report »** dans
Search Console (`developers.google.com/search/blog/2026/06/gen-ai-performance-reports`),
qui isole les impressions et clics venus des features génératives.
⚠️ **Ce journal ne mesure que des SERP à la main, ce qui est un proxy pauvre** :
il dit « absent » sans dire combien d'impressions le site obtient. **Un accès
Search Console changerait la qualité de la mesure de l'étape 2.** → Inscrit en
« Chantiers en attente » comme demande à formuler au client (rien à coder).

**4. Côté ChatGPT — une condition technique vérifiable, et elle est remplie.**
`developers.openai.com/api/docs/bots` : pour être cité dans les réponses de
ChatGPT search, un site doit **laisser passer `OAI-SearchBot`** ; un site exclu
« will not be shown in ChatGPT search answers, though can still appear as
navigational links ». Le `robots.txt` de production ouvre tout sauf `/api/`,
`/espace-client`, `/radar` et `/admin` : **condition remplie, rien à faire.**
C'est le premier audit de ce signal en 24 runs. ✅ Ne pas réauditer sauf
changement de `robots.txt`.

**5. Deux sources fiscales mises à jour, utilisées le jour même.**
- `service-public.gouv.fr` fiche **F10864**, « mise à jour du 15 avril 2026 » :
  forfait frais d'acquisition **7,5 % sans condition de durée**, forfait travaux
  **15 % réservé aux détentions de plus de 5 ans**, abattements IR 6 %/an (6ᵉ→21ᵉ)
  puis 4 % (22ᵉ), PS 1,65 %/an (6ᵉ→21ᵉ), 1,60 % (22ᵉ), 9 %/an (23ᵉ→30ᵉ).
- **BOFiP BOI-RFPI-PVI-20-20** : la **moins-value immobilière n'est ni déductible
  ni imputable** — ni sur une plus-value de même nature, ni sur le revenu global.
  Exception étroite : bien acquis par **fractions successives constatées par le
  même acte**, entre les mêmes parties.
- ⚠️ **`service-public.fr` répond 301 vers `service-public.gouv.fr`** : c'est
  `service-public.gouv.fr` qu'il faut citer désormais. Le site cite encore
  l'ancien domaine à deux endroits (voir « Chantiers en attente »).

### 2026-10-04 — Un nœud de texte JSX qui commence par une espace et se poursuit à la ligne suivante perd cette espace au rendu

**Le défaut.** Vingt mots collés étaient servis en production sur 8 pages :
« 1 875ventes, base DVF », « un appartement de 62m² vendu », « le prix, plus
14 712 €de taxes », « — soit +7,8 %par rapport à la médiane », « en 2025dans la
base DVF », « Métropole de Lyon.Médianes, jamais des moyennes ». Du texte
visible, lisible par un humain et par un LLM, sur les pages commerciales les plus
travaillées du site.

**La règle exacte.** JSX ne traite pas un nœud de texte comme une chaîne : il le
**découpe par lignes**, retire les espaces de début et de fin **de chaque ligne**,
puis rejoint les lignes par une espace. Conséquence : quand un nœud de texte
**commence par une espace juste après une expression `{…}`** et **se poursuit à la
ligne suivante**, l'espace de tête appartient à la première ligne et se fait
retirer.

```jsx
// ❌ rend « 1 875ventes »  — le nœud commence par " ventes," et continue ligne suivante
{COMMUNE.n.toLocaleString("fr-FR")} ventes,
base DVF)

// ✅ rend « 1 875 ventes »
{COMMUNE.n.toLocaleString("fr-FR")}{" "}
ventes, base DVF)

// ✅ sans danger : le nœud de texte tient sur UNE seule ligne
{COMMUNE.n.toLocaleString("fr-FR")} ventes, base DVF)
```

Même piège après une balise fermante (`</strong> — texte…` sur plusieurs lignes)
et devant un tiret cadratin, où le résultat est particulièrement laid :
« 183 300 €— c'est ».

**Pourquoi ça passe inaperçu.** Le code est correct à la lecture : l'espace est
bien là dans le source. Il n'existe que dans le fichier, pas dans le rendu.
**Ni `tsc`, ni `eslint`, ni `npm run build` ne le voient** — les trois étaient
propres avec les 20 défauts en place. Et il est invisible à tout contrôle qui
porte sur la structure (titres, liens, JSON-LD, dates) : il faut regarder le
**texte rendu**.

**Le détecteur, à rejouer à chaque run** — React insère un séparateur
`<!-- -->` entre deux nœuds adjacents, ce qui rend le défaut repérable
mécaniquement sur le HTML servi :

```python
# un séparateur React entouré de deux caractères de texte, sans espace
pat = re.compile(r'([0-9A-Za-zÀ-ÿ%€»\)\.])<!-- -->([0-9A-Za-zÀ-ÿ«\(])')
```

À lancer sur le `<main>` des pages de production. ⚠️ **Deux faux positifs connus
et légitimes** : les compteurs animés de la home et de `/recrutement` rendent
`0M€` à l'état initial — c'est voulu, pas un défaut.

**Conséquence de méthode, et c'est la vraie leçon du jour.** Vingt runs
d'audits n'avaient jamais contrôlé le texte visible, seulement la structure. Le
premier contrôle du rendu a trouvé 20 défauts servis en production.
→ **Contrôler le HTML RENDU, pas le source**, et le faire après chaque rebuild :
c'est exactement comme cela que le défaut « React rend `10.4` au lieu de
`10,4` » avait été trouvé le 30/09. Deux défauts de rendu en cinq runs, tous
deux invisibles dans le code.

### 2026-10-02 — GEO : une SERP imprenable n'est pas une question fermée — lire ce que le résumé du moteur AVOUE ne pas savoir

**Le problème.** Depuis le 29/09, trois angles de contenu ont été écartés sur
le même raisonnement : la SERP est occupée par des acteurs nationaux ou des
portails, donc on n'y classera pas, donc on n'écrit pas. Ce raisonnement est
juste **pour Google**. Il est faux pour l'objectif GEO, et il a failli coûter
le chantier du jour.

**Ce que la mesure du 02/10 montre.** Sur « combien d'apport pour un T2 à
Gratte-Ciel », les 9 résultats sont des portails d'annonces : imprenable. Mais
le résumé généré au-dessus **écrit noir sur blanc que les résultats ne
fournissent pas l'information demandée**, puis répond avec des fourchettes
nationales faute de mieux. Autrement dit : **le moteur cherche une source, n'en
trouve aucune, et le dit.**

**La règle à retenir.** Les deux questions sont distinctes et il faut les poser
séparément :
1. « Puis-je classer sur cette requête ? » → lire **les 9 résultats** (qui les
   occupe, annuaires ou éditorial, national ou local).
2. « Puis-je être CITÉ sur cette question ? » → lire **le résumé du moteur**
   (répond-il avec des sources, ou admet-il ne pas en avoir ? cite-t-il la
   ville, ou retombe-t-il sur des fourchettes nationales ?).

Une réponse « non » à la première et « oui » à la seconde **justifie
d'écrire** — mais alors sur une page qui a déjà une raison d'exister, pas sur
une page créée pour l'occasion : c'est pour cela que le contenu est allé sur
`/acheter` (qui souffrait par ailleurs de 278 mots) et non dans un article neuf.

**Le garde-fou qui va avec, et il est non négociable.** Le motif « le moteur
n'a pas de source » est exactement la situation où inventer un chiffre paie le
plus. Sur `/acheter`, la question sans réponse était « quel apport ? » : la page
**refuse explicitement de publier un taux d'apport** et dit pourquoi (politique
d'établissement, pas règle, non mesurée ici). On publie la part du budget qu'on
sait calculer à l'euro près, et on nomme celle qu'on ne sait pas. Une place vide
dans les résultats n'est une occasion que si on la remplit avec du vérifiable.

### 2026-10-02 — Méthode : ne jamais republier un chiffre déjà publié en le recalculant — le reprendre tel quel, et n'ajouter que l'opération qui ne peut pas diverger

**Le problème.** `/acheter` avait besoin des frais d'acquisition, déjà calculés
le 29/09 et publiés dans `/blog/frais-de-notaire-lyon-2026`. Deux options :
recoder le calcul (taux DGFiP + barème des émoluments) dans la page, ou reprendre
les montants publiés. La première est tentante — elle donne un module partagé.

**Pourquoi la seconde a été choisie.** Les montants de l'article sont figés dans
son contenu ; un second calcul, même correct, finirait par en différer d'un euro
au premier arrondi modifié, et **deux pages du même site se contrediraient sur
un chiffre fiscal**. C'est précisément le défaut corrigé le 24/09 sur les dates
de fraîcheur (deux copies manuelles divergentes).

**La règle.** Quand une donnée est déjà publiée sur le site :
- la **reprendre telle quelle**, en constante commentée qui cite la page source
  et interdit explicitement le recalcul sur place ;
- n'exécuter localement que les opérations **qui ne peuvent pas diverger** — ici
  l'addition `prix + frais`, qui donne le budget total ;
- faire pointer un lien vers la page qui détient le calcul, pour que le lecteur
  et le LLM sachent laquelle fait autorité.

À l'inverse, ce qui **doit** être dérivé en code reste dérivé : les prix médians
viennent de `lib/quartiers.ts`, jamais recopiés.

### 2026-10-01 — Méthode : la cannibalisation ne se cherche pas page par page, elle se calcule sur toutes les paires — et le coupable s'avoue souvent lui-même

**Le problème.** « Deux pages visent-elles la même requête ? » est une question
qu'on ne peut pas poser en lisant les pages une par une : il faut comparer
chaque page à **toutes** les autres. Sur 53 pages, ça fait **1 378 paires**, et
aucun humain ne les relit. Jusqu'au 01/10, ce journal n'avait jamais mesuré ce
signal — il avait audité le maillage (22/09), les ancres (30/09), les og:image
(20/09), mais jamais la **concurrence interne** entre deux URLs.

**La méthode, et elle tient en vingt lignes de Python.**
1. Télécharger les 53 pages **servies** (pas le source : règle du 18/09).
2. Pour chaque page, extraire `<title>`, `<h1>`, `<meta description>` et les H2
   du `<main>`.
3. Pour `title`+`h1` : passer en minuscules, retirer les accents, découper en
   mots, **retirer les mots vides français ET le nom de la marque** (sinon
   « Markus Immobilier », présent dans 53 titres sur 53, rapproche tout de tout
   et le signal disparaît dans le bruit).
4. Pour chacune des 1 378 paires, calculer l'**indice de Jaccard** :
   `|mots communs| / |mots de l'union|`.
5. Trier par ordre décroissant et lire le haut du classement.

**Le seuil utile.** À **0,33** la liste reste courte (16 paires sur 1 378) et
lisible à l'œil. Au-dessus de **0,6**, chaque paire méritait un examen ; à
**0,78**, le défaut était flagrant. Les faux positifs sont faciles à écarter et
**ils sont instructifs** : trois paires de pages quartier (0,56–0,62) et deux
fiches de garage (0,50) sortent haut parce qu'elles partagent un **gabarit**
légitime — ce n'est pas de la cannibalisation, c'est une série. Le test qui
tranche : **deux URLs visent-elles la même requête sur le même lieu ?** Deux
villes ou deux quartiers différents, c'est une série ; la même ville et la même
question, c'est une collision.

**Le signe qui ne trompe pas, et il vaut d'être cherché en premier.** La paire à
0,78 (`/blog/gestion-locative-villeurbanne-deleguer-ou-non` ↔
`/gestion-locative`) **portait l'aveu dans son propre texte** : le premier
paragraphe de l'article renvoyait à la page de service « pour l'arbitrage
chiffré », tout en gardant le titre de cette page. Autrement dit, un run
précédent (16/09, quand les liens de corps ont été posés) avait **déjà senti**
que la page de service répondait mieux, et avait ajouté le lien **sans toucher
au titre**. → **Technique réutilisable : chercher les pages qui renvoient
ailleurs pour la question que leur propre titre annonce.** Un `grep` sur les
phrases du type « la page X le détaille », « voir X pour le calcul » suffit à
les trouver, et chacune est une collision probable.

**Comment on résout, sans rien supprimer.** Trois gestes, dans cet ordre :
1. **Ré-anguler la page faible** sur une question réellement disjointe (ici : le
   contenu du mandat, tâche par tâche, au lieu de l'arbitrage déléguer/gérer).
2. **Le dire explicitement** : la dernière section de la page faible pose la
   question concurrente, y répond en deux phrases, et **écrit que c'est l'autre
   page qui la porte**. Cela clarifie le signal pour Google et donne au LLM un
   passage qui s'auto-qualifie.
3. **Lier depuis la page forte** avec une ancre qui annonce la **nouvelle**
   promesse de la page faible — hub → spoke, titres disjoints.
Résultat mesuré : **0,78 → 0,13**, et l'article passe de 248 à 923 mots au lieu
d'être supprimé. Aucune redirection, aucun canonical croisé, aucun risque de
perdre les liens entrants existants.

**Ce que la méthode a trouvé en prime, pour un coût nul.** La même extraction
donne gratuitement trois autres contrôles **inter-pages** que ce journal n'avait
jamais faits : `<h1>` identiques d'une page à l'autre (**1 doublon trouvé**),
descriptions dupliquées (**zéro**), descriptions manquantes (**zéro**). Et un
contrôle intra-page qui a payé : **un titre qui contient deux fois la marque**
parce que le gabarit `title.template` de Next.js l'ajoute à un titre qui
l'écrivait déjà (**5 pages**). Ce dernier défaut est **invisible dans le code
source** de chaque page — il n'apparaît que dans le HTML servi, une fois le
gabarit appliqué. C'est la règle du 18/09 qui le fait apparaître.

### 2026-09-30 — Méthode : un audit qui revient sain est un résultat, et le refuser coûte plus cher que de l'accepter

Le backlog d'hier désignait pour aujourd'hui un chantier non-contenu précis :
auditer la cohérence des ancres de liens internes, dernier signal jamais regardé
de la liste du 20/09. Les quatre élargissements précédents de cette liste
avaient chacun produit une vraie trouvaille (og:image le 20/09, maillage le
22/09, fraîcheur le 24/09, page experience le 28/09), donc l'attente était
qu'il en produise une cinquième.

**Il n'en a pas produit.** 421 liens extraits du `<main>` des 53 pages servies
en production, inversés ancre → cibles : zéro ancre générique, zéro ancre vide,
**une** ancre contradictoire, corrigeable en une ligne. Quatre signaux audités
dans la foulée (h1, canonicals, `alt`, liens morts) : sains eux aussi.

**Ce qu'il fallait décider à ce moment-là**, et c'est là qu'est la technique :
un audit sain crée une tentation, celle de trouver *quand même* quelque chose à
refaire pour que le run ait « un chantier technique », puisque la règle
d'alternance en demandait un. Ajouter des `aria-label` partout, reformuler des
ancres correctes, ranger un composant qui marche. **Chacune de ces actions
aurait touché du rendu qui fonctionne, pour un gain SEO nul.** La consigne du
client — « il faut juste rien casser » — et la règle du 24/09 (« un candidat de
backlog se remesure avant de s'exécuter, même quand c'est soi-même qui l'a
inscrit la veille ») disent la même chose : **le bon geste est d'écrire que
c'est sain, de fermer le sujet pour de bon, et d'aller chercher le chantier là
où la mesure du jour désigne un trou.** Ce qui a été fait : l'étape 2 avait
mesuré `/vendre` à 306 mots sur une requête où le site est absent.

**Règle à retenir.** Un audit a deux sorties valables : une trouvaille, ou une
fermeture définitive du sujet. La troisième sortie — fabriquer un chantier pour
occuper le créneau — est la seule qui fasse reculer le site. Et **une liste de
signaux s'épuise** : celle du 20/09 l'est. Quand tous ses éléments sont audités,
la règle n'est pas morte, elle demande une liste neuve (quatre pistes proposées
en backlog).

**Corollaire sur l'alternance des angles.** La règle d'alternance existe pour
éviter cinq jours de blog d'affilée, pas pour imposer un chantier technique
quand il n'y en a pas. **Quand l'audit revient sain, l'alternance cède devant la
mesure.** Écrire pourquoi, dans le journal, le jour même.

### 2026-09-30 — Outillage : `service-public.fr` est la meilleure source de droit accessible depuis ce conteneur, et la liste des domaines fermés s'allonge

Le chantier du jour avait besoin de deux points de droit sourcés : l'imposition
de la plus-value immobilière et le plafond des indemnités de remboursement
anticipé. Le réflexe — Legifrance — est mort depuis le 29/09 (HTTP 403).
`economie.gouv.fr`, essayé aujourd'hui, rend **403** lui aussi, avec une page
« Just a moment… » caractéristique d'une protection anti-robot. **Cinquième
domaine fermé** : `meilleursagents.com`, `seloger.com`, `searchengineland.com`,
`legifrance.gouv.fr`, `economie.gouv.fr`.

**`service-public.fr` répond, et il répond bien** — à condition de savoir y
entrer. Deux pièges :

1. **La recherche interne est en JavaScript** : `…/recherche?keyword=…` rend une
   page sans aucun lien de fiche exploitable. Inutile de la parser.
2. **Les identifiants de fiche ne se devinent pas.** Trois numéros inventés sur
   quatre rendent 404, et l'un d'eux a rendu 200 **sur un tout autre sujet**
   (F2190 = refus d'entrée en France d'un étranger) — ce qui aurait pu passer
   inaperçu sans vérification du `<title>`.

**La méthode qui marche**, et qui a fourni les deux fiches du jour :

```
# 1. partir d'une page CARREFOUR du sujet, elle, trouvable par recherche web
curl -sSL --cacert /root/.ccr/ca-bundle.crt -A "<UA navigateur>" \
     https://www.service-public.fr/particuliers/vosdroits/F16123 -o hub.html
# 2. lister les fiches qu'elle cite, avec leur libellé
grep -o 'vosdroits/F[0-9]*[^<]*<[^>]*>[^<]*' hub.html | sed 's/<[^>]*>/ | /' | sort -u
# 3. télécharger la bonne, et VÉRIFIER SON <title> avant de la lire
grep -o '<title>[^<]*' sp_F1669.html
```

C'est par ce chemin que **F1669** (« Peut-on rembourser son crédit immobilier
par anticipation ? ») a été trouvée depuis F16123 (« Je veux obtenir un crédit
immobilier »). **F10864** (plus-value) a été trouvée directement, mais son
`<title>` a été vérifié de la même façon.

**Ordre à suivre désormais pour un point de droit depuis ce conteneur** :
BOFiP (`bofip.impots.gouv.fr`, qui commente le texte avec ses références) →
`service-public.fr` par la méthode ci-dessus → **jamais** Legifrance ni
`economie.gouv.fr`.

**Piège d'outillage voisin, à ne pas confondre avec celui du 24/09.** Sur 53
téléchargements d'affilée du sitemap, deux ont échoué en
`SSL_ERROR_SYSCALL` (curl exit 35) **alors que `--cacert` était bien passé**.
Ce n'est donc pas la panne du 24/09 (certificat manquant, qui rend `HTTP 000`
sur *toutes* les URLs) mais une coupure transitoire : les deux URLs ont rendu
HTTP 200 à la relance. **Un exit 35 isolé au milieu d'une série qui passe ne
veut pas dire « page morte » : relancer avant de conclure**, et passer
`--retry 3` sur les boucles longues.

### 2026-09-29 — Extraire un tableau d'un PDF officiel quand aucune bibliothèque PDF ne marche, et pourquoi c'est devenu la technique la plus rentable de ce journal

Pas de veille aujourd'hui (elle est hebdomadaire, le lundi), mais **deux
techniques de méthode** sont sorties du chantier et méritent d'être consignées.

#### 1. 🟢 Le contournement PDF — utilisable dès qu'une donnée officielle n'existe qu'en PDF

Le taux DMTO de la Métropole de Lyon n'est publié que dans un PDF de la DGFiP.
Or **rien ne marchait dans ce conteneur** : `pdftotext` absent, `pdftoppm`
absent, et `pypdf` **comme** `pdfminer.six` plantent à l'import sur un
`PanicException` de `cryptography` (le module Rust `_cffi_backend` est cassé).

**Ce qui a marché**, et qui est réutilisable tel quel :
1. découper le PDF sur `stream ... endstream` et `zlib.decompress` chaque flux ;
2. le texte sort **illisible** (`<01>-5<02>2<03>` …) parce que les polices sont
   sous-ensemblées avec un encodage propre ;
3. la clé est de **parser les `ToUnicode` CMaps** : repérer les objets
   `/ToUnicode n 0 R`, décompresser l'objet visé, lire ses blocs
   `beginbfchar`/`beginbfrange`, et construire `code → caractère` ;
4. mapper `/Fn` → objet police via les dictionnaires `/Resources`, puis rejouer
   les opérateurs `Tf` / `TJ` / `Tj` en appliquant la bonne table.

→ Le script complet est dans l'historique de ce run. **Leçon générale : ne pas
abandonner une source primaire parce qu'elle est en PDF.** C'est souvent la seule
forme sous laquelle une administration publie un chiffre local, et c'est
précisément pour ça que les concurrents ne le publient pas.

#### 2. 🟢 Chercher la donnée **locale** dans un document **national**

Le vrai gain du jour n'est pas le taux lui-même, c'est ce que le même document a
permis de **démontrer** au lieu de le supposer : la taxe communale de
Villeurbanne est à **1,20 %**, non pas parce qu'on l'a lu quelque part, mais
parce que l'annexe du PDF liste **les deux seules communes de France** ayant
voté une réduction en 2026 — et que leurs taux réduits (0,70 % après −0,50 ;
0,50 % après −0,70) **reconstituent le même taux de départ**. Villeurbanne n'y
figure pas, donc elle est au plein tarif.
→ **Règle à réutiliser : un document national contient souvent la preuve d'un
fait local, sous forme de liste d'exceptions.** Lire la liste des exceptions est
plus fiable que chercher une page qui parle de la commune.

#### 3. ⚠️ Legifrance est inaccessible — passer par le BOFiP

`legifrance.gouv.fr` rend **HTTP 403** depuis ce conteneur, même avec un
user-agent de navigateur (testé sur deux URLs d'articles). Quatrième domaine de
la liste, après `meilleursagents.com`, `seloger.com` et `searchengineland.com`.
**Contournement** : `bofip.impots.gouv.fr` répond et commente le texte **avec ses
références d'articles**, ce qui suffit à sourcer un point de droit. Et
`impots.gouv.fr` sert les tableaux de taux. **Pour du droit fiscal, le BOFiP
remplace Legifrance ; pour le reste, il faut trouver une source institutionnelle
qui cite le texte.**

#### 4. 🔴 Une thèse de ce journal tombe — et c'est utile

L'échéance du 15/09 (« on peut être cité sans classer ») a été mesurée
aujourd'hui et **invalidée** : sur une requête locale explicite, le moteur n'a
cité **aucune** source locale. Ce que ça change concrètement pour les prochains
chantiers : **ne plus viser les requêtes « règle de droit générique + nom de
ville »**. Elles ressemblent à de la longue traîne locale, mais le moteur les
traite comme des questions nationales. Ce qui reste citable, c'est ce dont il
n'existe **pas** de réponse nationale : un taux voté par une collectivité, un
prix signé par quartier, un délai observé. Le chantier du 29/09 est construit
entièrement sur ce principe — il servira de test.

### 2026-09-28 — Veille hebdomadaire (en retard de 7 jours) : Google publie noir sur blanc ce qui NE sert à rien pour ses réponses d'IA, et deux pratiques de ce journal sont dedans

Veille faite **avant** le choix du chantier, comme la consigne du 27/09
l'imposait. Contrairement aux veilles précédentes, celle-ci s'appuie sur une
**source primaire** : la documentation de Google elle-même, lue directement.

#### 1. 🟢 La source primaire — `developers.google.com/search/docs/appearance/ai-features`

Page lue de première main le 2026-09-28. Citations relevées :

> « There are no additional requirements to appear in AI Overviews or AI Mode,
> nor other special optimizations necessary. »
>
> « You don't need to create new machine readable files, AI text files, or
> markup to appear in these features. »
>
> il n'y a « no special schema.org structured data that you need to add ».

Et à l'inverse, ce que la même page **met** dans la liste de ce qui compte :

> « creating helpful, reliable, people-first content » · « Making sure your
> structured data matches the visible text on the page » · « Providing a great
> page experience for users » · s'assurer que « crawling is allowed in
> robots.txt ». Une page doit être « indexed and eligible to be shown in Google
> Search with a snippet », et « Indexing and serving isn't guaranteed ».

**Trois conséquences directes et immédiates pour ce site.**

1. 🔴 **« AI text files » = `llms.txt`. Google dit ne pas en avoir besoin.** Ce
   journal en tient un à jour à chaque run depuis le 12/09 et le compte comme un
   volet GEO. Ce n'est pas un lever. → traité au point 2 ci-dessous.
2. 🔴 **« no special schema.org structured data » enterre le candidat n°2 du
   backlog** (« ajouter `BreadcrumbList` + `ItemList` sur `/annonces` », «  baliser
   les 4 pages légales »). Ce candidat traînait depuis le 13/09 et la
   re-priorisation du 15/09 l'avait déjà descendu sur la foi de l'étude Seer ;
   **la documentation de l'éditeur dit maintenant la même chose**. Il sort du
   backlog en tant que levier GEO. *(Ce qui reste vrai : le schema qui
   **correspond au visible** est explicitement, lui, dans la liste de ce qui
   compte — donc la règle « JSON-LD == contenu visible » de ce journal est
   confirmée par la source, pas affaiblie.)*
3. 🟢 **« Providing a great page experience » est, lui, dans la liste.** C'est ce
   qui a désigné le chantier du jour parmi les quatre signaux jamais audités —
   et l'audit a trouvé 1,29 Mo de PNG brut sur la home en une heure.

#### 2. 🔴 `llms.txt` : la pratique est mesurée inutile, et je la maintenais comme un levier

Deux mesures convergentes, en plus de la position de Google ci-dessus.

- **Étude de logs sur 900 domaines, 2025-09-04 → 2026-04-13** : 1 227 requêtes
  au total sur les fichiers de la famille `llms.txt`, et **zéro requête vérifiée
  d'un laboratoire d'IA de premier plan** (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended). Les demandeurs réels : un agrégateur commercial de données
  (794 requêtes, 64,7 %), des navigateurs Chrome — donc des humains — (392,
  31,9 %), des scanners (33), des usurpateurs (8).
- **Étude de corrélation du 2025-11-20 sur ~300 000 domaines** : aucune
  corrélation mesurable entre publier un `llms.txt` et la fréquence de citation
  par les IA ; un modèle à gradient boosté **gagne en précision quand on retire
  la variable** — elle se comporte comme du bruit, pas comme un signal.

⚠️ **Limite de cette source, à écrire honnêtement** : ces deux chiffres viennent
d'une page d'agence (`digitalapplied.com`) **lue de première main**, qui les
attribue à des travaux tiers. Je n'ai pas atteint les travaux originaux. Ils sont
donc **cohérents avec la source primaire de Google** (qui, elle, est directe) mais
ne sont pas, seuls, une preuve. La décision ci-dessous ne repose que sur leur
convergence avec Google.

**Décision, et elle est prudente.** On **continue** de tenir `llms.txt` exact —
c'est une consigne de la mission, ça coûte quelques minutes, et un fichier faux
serait pire qu'un fichier inutile. Mais **on cesse de le compter comme un volet
GEO** et **on ne lui consacre plus de temps de chantier** : le contrôle du jour a
duré deux minutes (48 URLs citées, toutes vivantes) et c'est le bon format. Si un
run futur hésite entre « enrichir `llms.txt` » et n'importe quoi d'autre, c'est
n'importe quoi d'autre.

#### 3. ⚠️ Ce que je n'ai PAS pu vérifier, et qui n'est donc pas inscrit

La veille a fait remonter une étude très citée — « What 107,000 pages reveal
about Core Web Vitals and AI search » (Search Engine Land) — dont le résumé du
moteur tire des affirmations séduisantes et directement liées au chantier du
jour : les robots d'IA abandonneraient après 1 à 5 secondes, le seuil LCP de
2,5 s serait devenu « un délai d'expiration de crawler », le recouvrement entre
top 10 Google et sources citées par les IA serait passé de ~70 % à moins de 20 %.

**`searchengineland.com` rend HTTP 403 à ce conteneur**, y compris avec un
user-agent de navigateur. Ces chiffres **ne sont donc inscrits nulle part comme
acquis**, et ils n'ont servi à justifier aucune décision : le chantier du jour
tient sur la documentation de Google (« great page experience ») et sur une
mesure de 1,29 Mo faite ici, pas sur eux. À retenter depuis un autre run, ou à
chercher chez un tiers qui republie la méthode.

*(Règle du 23/09 appliquée : un chiffre attribué par un résumé de moteur à une
page que je n'ai pas lue est une rumeur, quelle que soit la réputation du
domaine.)*

#### 4. ✅ Ce que la veille a confirmé sans rien changer

- L'étude Seer (7–13 mai 2026, 7 225 gagnants d'AIO sur 8 500 requêtes, 30
  secteurs) a été **relue de première main** aujourd'hui, et elle dit bien ce que
  le journal du 15/09 en avait retenu : **les liens internes corrèlent**, les
  **citations sortantes `.gov`/`.edu` corrèlent** (les gagnants en citent « 2×
  plus »), et le **schema FAQ/HowTo est contre-corrélé** — « les sites qui ont le
  plus de schema FAQ et HowTo sous-performent d'environ 10× ». Nouveau détail
  utile : la longueur gagnante est **bimodale** (~25 % des gagnants font moins de
  250 mots, ~25 % font 1 000–2 000 mots), et le guide ultime de 5 000+ mots ne
  capte que **4,4 %** des créneaux définitionnels. → Rien à corriger : les pages
  réécrites ici font 1 800 à 2 500 mots, donc dans le mode haut, pas au-delà.
- **Aucune mise à jour d'algorithme Google confirmée en septembre 2026** au
  moment de la veille (la dernière confirmée est la *spam update* d'août 2026,
  déployée du 18 au 21/08). Une affirmation de « rafraîchissement des systèmes de
  contenu utile centré sur l'information locale » circule mais **n'a pas été
  vérifiée sur une source primaire** — non inscrite.

### 2026-09-27 — Méthode : la meilleure façon de contrôler ses propres chiffres n'est pas de les recalculer, c'est de trouver qui les calcule autrement

**Le contexte.** Ce journal traîne depuis le 07/09 une inquiétude qu'il n'a jamais
su lever : **nos médianes DVF sont-elles justes ?** La seule réponse tentée a été
un **recalcul indépendant** le 11/09 — coûteux (une heure de run) et, surtout,
circulaire : recalculer avec la même méthode sur la même source vérifie
l'arithmétique, pas la méthode. L'entrée du 12/09 en tire même une consigne
d'économie : « ne pas relancer ce calcul *pour vérifier* avant la publication d'un
nouveau millésime DVF ».

**Ce qui s'est passé aujourd'hui, et ce n'était pas le but.** Le chantier
cherchait des prix **affichés** par des concurrents, pour les mettre en regard des
nôtres. En téléchargeant cinq pages, il a trouvé **trois recalculs indépendants du
même marché** :

| Qui | Valeur | Méthode | Écart avec notre 3 567 €/m² |
|---|---|---|---|
| encadré DVF de `cpim.fr` | 3 548 €/m² | médiane, 3 550 ventes, 2024-2025 | **−0,5 %** |
| `moninvestimmo.com` | 3 548 €/m² | médiane DVF recalculée, 2024-2025 | **−0,5 %** |
| `trackstone.fr` | 3 520 €/m² | **moyenne** des ventes 2025 | **−1,3 %** |

Trois acteurs qui ne nous lisent pas, dont un qui emploie une **moyenne** là où
nous prenons une médiane, sur des périodes qui ne se recouvrent pas exactement,
tombent tous à **moins de 1,5 %** de notre chiffre. Par quartier, moninvestimmo est
à 0,7 % de nous sur Cusset, 2,4 % sur Gratte-Ciel, 2,5 % sur Grandclément.

**La règle qui en sort, et elle est réutilisable au-delà des prix.** *Quand on
publie une donnée calculée, le contrôle le moins coûteux et le plus probant n'est
pas de refaire son propre calcul : c'est de chercher qui publie la même grandeur
par un autre chemin, et de mesurer l'écart.* Un recalcul maison confirme qu'on sait
diviser. Une convergence externe confirme qu'on mesure la bonne chose. Le second
contrôle coûtait ici **cinq `curl`**.

**Corollaire qui change une consigne du backlog.** L'argument « nous seuls publions
du DVF recalculé » ne tient plus — le 10/09 l'avait déjà entamé (immovrai),
aujourd'hui le confirme (moninvestimmo publie des médianes DVF par quartier).
**Ce n'est pas une mauvaise nouvelle, c'est un déplacement du différenciateur**, et
il faut arrêter de plaider la source : ce que personne ne publie, c'est la **mise
en regard** des deux familles de chiffres, la **finesse du découpage** (contours
officiels contre découpage maison) et la **méthode écrite**. Le chantier du jour
est bâti sur ces trois-là, plus sur la source.

---

### 2026-09-27 — Méthode : télécharger la page d'un concurrent ne sert pas qu'à vérifier ce qu'il dit, ça sert à voir où il se contredit

**Ce qui a été trouvé.** La règle du 23/09 impose de télécharger une page avant
d'attribuer un chiffre à son auteur. Elle avait été écrite comme une règle
**défensive** — pour ne pas publier une rumeur de résumé de moteur. Appliquée
aujourd'hui, elle a produit autre chose : **le chantier lui-même**.

`cpim.fr/villeurbanne-prix-m2-quartiers/` ouvre sur « Villeurbanne s'échange autour
de **4 380 €/m²** dans l'ancien en avril 2026 » et publie, **plus bas sur la même
URL**, un encadré sourcé DVF à **3 548 €/m²** avec son intervalle interquartile
(2 930 – 4 137 €/m²) et son nombre de ventes (3 550). Deux chiffres à 23 % d'écart,
cohabitant sur une page de première page Google.

**Pourquoi un résumé de moteur ne peut pas trouver ça.** Il rend **un** chiffre par
page — celui de la « réponse rapide », en tête, qui est justement celui qu'aucune
source n'étaye. Le défaut n'existe que dans la **confrontation de deux endroits de
la même page**, et c'est exactement la forme de défaut que le 24/09 avait appris à
chercher **sur notre propre site** (« un défaut ne se voit que dans l'écart entre
deux canaux qui publient la même information »). **La même grille de lecture,
appliquée à un concurrent, donne un sujet éditorial.**

**Ce que ça change dans la façon d'ouvrir un chantier de contenu.** L'étape 2
téléchargeait les pages concurrentes pour répondre à « le créneau est-il vide ? ».
Désormais elle répond aussi à : **« ces pages se contredisent-elles ? »** — entre
leur réponse en tête et leurs données de bas de page, entre leur texte et leur
JSON-LD, entre deux de leurs pages. Quand la réponse est oui, le sujet est trouvé,
il est vérifiable par le lecteur, et personne d'autre ne l'écrit.

**La formulation qui rend ce constat publiable sans accuser personne.** Ne pas
écrire « ils annoncent un faux prix » (une intention qu'on ne connaît pas), mais une
arithmétique tirée de leurs propres chiffres : **« 4 380 €/m² se situe au-dessus du
prix payé pour les trois quarts des appartements réellement vendus à Villeurbanne,
puisque le quartile supérieur de l'encadré de cette même page s'arrête à
4 137 €/m² »**. Vérifiable en deux clics, indiscutable, et citable telle quelle par
un moteur de réponse.

**Et une réserve à publier soi-même, sans attendre qu'on la trouve.** L'écart le
plus spectaculaire du tableau (+45,3 % sur Charpennes) est **en partie un artefact
de périmètre** : notre contour officiel englobe le Tonkin, que la source traite à
part à 3 920 €/m². Ça a été écrit sur la page, en clair, à côté du chiffre. Un écart
de 45 % publié sans cette réserve aurait été un argument commercial ; publié avec,
c'est une mesure — et c'est ce qui la rend citable.

**Piège d'outillage relevé au passage.** `meilleursagents.com` et `seloger.com`
rendent **HTTP 403** à ce conteneur, même avec un user-agent de navigateur complet.
Leurs chiffres **ne sont donc pas vérifiables de première main ici** : un tiers
attribuait 3 743 €/m² à MeilleursAgents, ce chiffre n'a pas été publié. Une
attribution d'attribution reste une rumeur.

---

### 2026-09-24 — Outillage : sur ce conteneur, `curl` sans `--cacert` rend « HTTP 000 », ce qui ressemble à un site hors-ligne

**Le piège.** La première mesure du run,
`curl -s -o sitemap.xml https://www.markusimmobilier.fr/sitemap.xml`, a rendu
`exit 35` et **`HTTP 000 — 0 bytes`**. Lu vite, c'est « le site ne répond pas ».
C'est faux : le site répondait parfaitement. Le HTTPS sortant de ce conteneur
passe par un proxy d'agent dont le certificat n'est pas dans le magasin par
défaut, et `exit 35` est une **erreur de poignée de main TLS**, pas une erreur
du serveur distant.

**La parade, à appliquer à tout `curl` de ce journal :**

```
curl -s --cacert /root/.ccr/ca-bundle.crt https://www.markusimmobilier.fr/...
```

**Pourquoi c'est noté ici et pas traité comme un détail.** Ce journal mesure la
production à chaque run, et il a déjà consigné le 18/09 un piège de mesure très
proche (`curl` sans `-L` téléchargeait 15 octets de redirection 308 et faisait
croire à une page vide). Les deux se ressemblent : **une erreur d'outil qui se
lit comme un diagnostic sur le site.** La règle générale qui se dégage :
*quand une mesure dit « le site est cassé », suspecter l'outil avant le site,
et le prouver dans les deux sens.* Ici la preuve était immédiate — la même URL
avec `--cacert` rend `HTTP 200` et 9 952 octets.

**Deuxième effet, à connaître** : sur 53 téléchargements successifs, **6 ont
rendu `000` de façon intermittente** même avec le `--cacert`, et sont tous
passés en `200` au réessai. Le proxy lâche parfois une connexion. **Toujours
boucler avec `--retry 3` et vérifier que le nombre de fichiers non vides égale
le nombre d'URLs** avant de conclure quoi que ce soit d'un audit de masse — un
fichier vide compté comme « page sans balise » fabriquerait un faux défaut.

---

### 2026-09-24 — Méthode : une donnée recopiée à la main à trois endroits a déjà divergé, la seule question est laquelle est fausse

**Le constat.** La fraîcheur des pages était déclarée par trois copies
manuelles indépendantes (table du sitemap, constante dans chaque page, rien en
JSON-LD). Deux des trois avaient dérivé sans que personne s'en aperçoive,
pendant douze jours, sur une page stratégique.

**Ce qui rend ce défaut invisible aux audits page par page** — et c'est la
même leçon que le 22/09 sur le maillage, énoncée autrement : **il ne se voit
que dans la confrontation de deux sources.** Regarder
`/estimation-immobiliere-villeurbanne` seule ne montre rien d'anormal : elle
affiche une date plausible. Regarder le sitemap seul ne montre rien non plus.
**Le défaut n'existe que dans l'écart.** L'audit qui l'a trouvé mettait en
regard, pour les 53 pages, la date visible extraite du `<main>` rendu et le
`dateModified` du JSON-LD — un tableau à deux colonnes, rien de plus.

**La règle qui en sort, et qui vaut au-delà des dates :** quand une même
information est publiée par plusieurs canaux (écran, JSON-LD, sitemap,
`llms.txt`), **l'auditer canal par canal ne prouve rien ; il faut les croiser.**
Les canaux du site à croiser systématiquement, désormais : date visible ↔
`dateModified` ↔ `lastmod` du sitemap, et FAQ visible ↔ `FAQPage` (celui-là
était déjà une règle depuis le 08/09).

**Corollaire sur la correction.** Corriger les copies une par une n'aurait rien
réglé : elles auraient re-divergé au run suivant. La correction qui tient est
de **supprimer les copies**, pas de les resynchroniser — d'où `lastmodOf()`,
qui **lève au build** si une page réclame une date absente de la table. Un
défaut de recopie devient une erreur de compilation, pas une dérive silencieuse.

**Ce que ça dit sur l'arbitrage entre deux valeurs contradictoires.** Face à
« 8 septembre » contre « 12 septembre », la tentation est de prendre la plus
récente (elle « fait plus frais ») ou la plus ancienne (elle « fait plus
prudent »). Les deux sont des raisonnements de confort. **La bonne méthode est
d'aller lire l'historique git et de qualifier le changement** : ici, le commit
du 12/09 disait lui-même « date non bougée », mais il avait réécrit une réponse
de FAQ **visible** — un changement de contenu, donc la date du sitemap avait
raison et l'affichage avait tort. *La source de vérité n'est ni l'une ni l'autre
des deux déclarations : c'est ce qui s'est réellement passé dans le dépôt.*

---

### 2026-09-24 — Méthode : un candidat de backlog se remesure avant de s'exécuter, même quand c'est soi-même qui l'a inscrit la veille

Le backlog inscrivait pour aujourd'hui, en toutes lettres, « le maillage vers
`/blog/rentabilite-locative-lyon`, qui n'a pour l'instant **qu'un seul lien de
corps entrant** ». C'était exact **au sens strict** — un seul lien de *corps* —
mais trompeur comme justification de chantier : le graphe reconstruit ce matin
sur le HTML rendu montre **4 pages entrantes**, parce que l'algorithme
d'articles liés réparé le 22/09 lui en apporte trois de plus.

**La leçon n'est pas « le journal se trompe »**, c'est plus précis :
**une métrique notée pour décrire un défaut (« liens de corps ») ne reste pas
valide comme critère de décision une fois qu'un autre chantier a changé le
système autour d'elle.** Le chantier du 22/09 a rendu caduque la mesure du
23/09 sans que personne ne mette à jour la phrase.

**Règle : à l'étape 2, remesurer ce que le backlog affirme, pas seulement ce
que la production affiche.** Coût ce matin : une vingtaine de lignes de script
déjà écrites pour l'audit. Gain : un run de contenu déguisé en maillage, qui
aurait posé des liens dont le site n'avait pas besoin — et la
sur-optimisation par liens forcés est exactement ce que la règle du 16/09
interdit.

---

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
