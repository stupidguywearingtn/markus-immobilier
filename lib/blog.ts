/**
 * Contenu du blog Markus Immobilier — 12 articles SEO (longue traîne locale).
 * Un article = une page /blog/[slug]. Chaque article pointe (lien interne) vers
 * une page « argent » (estimation, vendre, acheter, gestion locative).
 *
 * NB chiffres : « prix-immobilier-villeurbanne-2026 » publie des prix €/m² par
 * quartier **calculés** à partir de la base DVF (data.gouv.fr / Etalab) croisée
 * avec les contours de quartiers de la Métropole de Lyon — méthode et date
 * d'extraction affichées dans l'article. Ne jamais y écrire un prix qui ne
 * vienne pas de ce calcul.
 *
 * « ou-acheter-villeurbanne-quartiers » réutilise EXACTEMENT les mêmes médianes
 * (angle acheteur : budget → surface, liquidité, résistance depuis 2022) et
 * « estimation-en-ligne-ou-agence » publie la DISPERSION autour de ces mêmes
 * médianes (quartiles, écart en euros, part des ventes estimées à moins de 10 %
 * près — extraction du 11/09/2026, médianes revérifiées identiques à celles du
 * 07/09). Si les médianes sont un jour recalculées, les trois articles — plus le
 * tableau REPERES de /estimation-immobiliere-villeurbanne — doivent être mis à
 * jour ensemble, sinon le site se contredit d'une page à l'autre.
 *
 * Depuis le 16/09/2026, trois articles de plus CITENT (sans les recalculer) des
 * chiffres issus de ces mêmes médianes, et doivent donc suivre le même sort :
 *   - « vendre-sans-agence »        → prix médian 195 000 € et les 11 700 €
 *                                     d'honoraires qui en découlent ;
 *   - « frais-de-notaire-lyon-2026 »→ prix médian 195 000 € ;
 *   - « capacite-emprunt-immobilier » → 250 000 € = 65 m² à Gratte-Ciel /
 *                                     91 m² à Cyprian – Les Brosses.
 *
 * Depuis le 29/09/2026, « frais-de-notaire-lyon-2026 » est celui qui dépend LE
 * PLUS de lib/quartiers.ts : il reprend les 7 médianes de quartier, la surface
 * médiane (62 m²), le prix médian communal et les 4 prix médians par typologie
 * (T1 115 000, T2 170 000, T3 226 250, T4 255 000), et en DÉRIVE des montants de
 * taxes et d'émoluments à l'euro près. Si les médianes bougent, ses trois
 * tableaux et les montants cités dans le texte et dans la FAQ doivent être
 * RECALCULÉS (script de calcul consigné dans SEO-JOURNAL.md, entrée du
 * 29/09/2026), jamais patchés à la main.
 * ⚠️ Ses taux fiscaux ont leur propre péremption, indépendante de DVF : le taux
 * de 5,00 % voté par la Métropole de Lyon vient du tableau DGFiP « au 1ᵉʳ juin
 * 2026 » (impots.gouv.fr publie une nouvelle version régulièrement), et la
 * fenêtre de majoration se referme le 31/03/2028. À revérifier à chaque
 * nouvelle version du tableau, et impérativement avant avril 2028.
 * ↳ Revérifié le 17/10/2026 : dmto_2026-06.pdf est TOUJOURS la dernière version
 *   publiée (dmto_2026-09 et dmto_2026-10 répondent 404), la ligne « 69 Métropole
 *   de Lyon » porte toujours 5,00 % / 4,50 % sans abattement ni taux réduit, et
 *   les deux seules communes à réduction restent Lamentin (971) et Tsingoni (976).
 *   L'article 116 de la LF 2025 a en revanche été RÉÉCRIT par l'article 121 de la
 *   loi n° 2026-103 du 19/02/2026 (LF 2026) : la date de fin du 31/03/2028 est
 *   inchangée, seule la prise d'effet des délibérations a été échelonnée. La
 *   doctrine de référence est désormais BOI-ENR-DMTOI-10-20 § 105 à 109 (17/06/2026).
 *   Le test d'URL à rejouer : curl -sIL .../notaires/dmto/dmto_AAAA-MM.pdf
 *
 * Depuis le 27/09/2026, « investir-locatif-lyon » met les médianes DVF EN REGARD
 * des prix affichés par trois sites tiers (cpim.fr, moninvestimmo.com,
 * trackstone.fr), relevés en téléchargeant chaque page le 27/09/2026 et datés
 * dans les légendes. Il cite la médiane communale (3 567 €/m²), quatre médianes
 * de quartier (Charpennes – Tonkin 3 524, Gratte-Ciel 3 846, Buers –
 * Croix-Luizet 3 271, Cusset – Bonnevay 3 171, Perralière – Grandclément 3 375)
 * et en dérive des écarts en % et en euros sur 45 m². Il suit donc le même sort
 * que les articles ci-dessus si les médianes bougent — et les écarts doivent
 * alors être RECALCULÉS, pas patchés. ⚠️ Les chiffres tiers ne doivent jamais
 * être rafraîchis « de mémoire » : ils portent la date du relevé, et les
 * reprendre suppose de retélécharger les pages (règle du 23/09, voir
 * SEO-JOURNAL.md § « Techniques apprises »).
 *
 * Depuis le 23/09/2026, « rentabilite-locative-lyon » publie un RENDEMENT BRUT
 * par quartier : il divise le loyer annuel tiré de `LOYER_MEDIAN_HC`
 * (14,6 €/m² HC, carte des loyers data.gouv.fr) par ces mêmes médianes DVF,
 * plus les médianes par typologie (T1 4 000 €/m², T4 3 211 €/m²) et la
 * médiane 2022 (3 981 €/m²). Il suit donc le même sort que les articles
 * ci-dessus si les médianes bougent. ⚠️ Le loyer appliqué est COMMUNAL, faute
 * de loyer de référence par quartier : cette limite doit rester écrite noir
 * sur blanc dans l'article et dans la FAQ de « ou-acheter-villeurbanne-
 * quartiers », comme elle l'est déjà sur /agence-immobiliere-charpennes.
 *
 * Depuis le 13/10/2026, « loi-carrez-surface » DÉRIVE lui aussi de lib/quartiers.ts :
 * il republie les 7 médianes de quartier et la médiane communale (3 567 €/m²) pour
 * chiffrer, sur la surface médiane de 62 m², ce que valent les 3,1 m² couverts par la
 * tolérance légale de 5 % (de 8 488 € à Cyprian – Les Brosses à 12 161 € à Ferrandière
 * – Maisons-Neuves), ainsi qu'un tableau d'effet de seuil (4 %, 5 %, 5,1 %, 6 %, 10 %).
 * Si les médianes bougent, ses DEUX tableaux et sa FAQ doivent être RECALCULÉS.
 * ⚠️ Convention d'arrondi à conserver : les euros se calculent en multipliant les m²
 * AFFICHÉS (arrondis au centième) par la médiane AFFICHÉE, arrondi au supérieur à la
 * demi-unité — de sorte qu'un lecteur qui refait le calcul retrouve exactement le
 * montant publié. C'est ce contrôle qui a rattrapé 3 montants faux le 13/10/2026.
 * ⚠️ Ses statistiques Carrez (92,1 % de ventes renseignées, médiane 61,5 m², 38,2 % de
 * coïncidence avec le bâti cadastral) viennent d'une extraction DVF du 13/10/2026 du
 * fichier commune 69266 — elles ont leur propre péremption, indépendante des médianes.
 *
 * Depuis le 05/10/2026, « plus-value-immobiliere-calcul » DÉRIVE de lib/quartiers.ts
 * le seuil d'imposition de la plus-value par quartier : il reconstitue la médiane
 * 2022 de chaque quartier à partir de la médiane 2025 et de `vs2022`
 * (med2022 = med2025 / (1 + vs2022/100) — contrôle : la médiane communale ainsi
 * reconstituée donne 3 981 €/m², valeur DÉJÀ publiée par
 * « rentabilite-locative-lyon »), puis la majore du forfait de 7,5 % de frais
 * d'acquisition pour obtenir le seuil. Il cite les 7 médianes de quartier, la
 * médiane communale, la surface médiane (62 m²) et en dérive des montants à
 * l'euro près. Si les médianes bougent, son tableau, son calcul en 6 étapes et
 * sa FAQ doivent être RECALCULÉS (script consigné dans SEO-JOURNAL.md, entrée du
 * 05/10/2026), jamais patchés à la main. ⚠️ Convention d'arrondi à conserver :
 * toute la chaîne est dérivée des médianes 2022 ARRONDIES à l'euro/m² telles
 * qu'elles sont AFFICHÉES dans le tableau (3 981 × 62 = 246 822, × 1,075 =
 * 265 334, etc.), afin qu'un lecteur qui refait le calcul sur les chiffres
 * publiés retrouve exactement les montants publiés. Ne pas « réarrondir »
 * depuis les valeurs non arrondies : cela réintroduit des écarts de 1 à 6 €.
 * ⚠️ Ses taux fiscaux ont leur propre péremption, indépendante de DVF : forfaits
 * 7,5 % / 15 %, seuil des 5 ans, barème 19 % + 17,2 %, abattements 22/30 ans
 * viennent de service-public.gouv.fr F10864 « mise à jour du 15 avril 2026 », et
 * la non-imputabilité de la moins-value de BOFiP BOI-RFPI-PVI-20-20. À revérifier
 * à chaque loi de finances. ⚠️ Noter aussi que service-public.fr REDIRIGE
 * désormais (301) vers service-public.gouv.fr : c'est le domaine à citer.
 *
 * Depuis le 07/10/2026, « vendre-sans-agence » est passé de 399 à ~2 450 mots.
 * ⚠️ Il ne publie VOLONTAIREMENT AUCUN tableau d'honoraires par quartier :
 * app/vendre/page.tsx en publie déjà un, calculé sur exactement la même base
 * (médiane de quartier × 62 m², puis `honorairesVente()`), effet de seuil de
 * Cyprian – Les Brosses compris. L'article s'y RENVOIE au lieu de le recopier —
 * ne pas réintroduire ce tableau ici, ce serait deux pages sur la même donnée.
 * Les seuls chiffres dérivés qu'il porte en propre sont les 11 700 € d'honoraires
 * au prix médian communal (`COMMUNE.prixMedian` = 195 000 €, tranche 6 %) et les
 * 30 225 € d'erreur médiane (15,5 % de ce même prix) : si les médianes bougent OU
 * si le client change son barème, ces deux montants, le ratio « 2,6 fois » et les
 * 19 500 € de la liste 18/36/62 % doivent être RECALCULÉS (détail du calcul dans
 * SEO-JOURNAL.md, entrée du 07/10/2026), jamais patchés à la main. ⚠️ Il cite en
 * plus l'étude de dispersion de « estimation-en-ligne-ou-agence » (erreur
 * médiane 15,5 %, 18/36/62 %, parts par quartier 42 %…25 %) : ces chiffres
 * doivent rester identiques dans les deux articles. ⚠️ La requête « diagnostics
 * obligatoires » reste attribuée à « diagnostics-obligatoires-vente » (durées de
 * validité), vers lequel l'article renvoie : ne pas y ajouter de durées. ⚠️ Ses points de droit
 * (dossier de diagnostic technique du lot de copropriété, 7 documents dont la
 * remise déclenche le délai de rétractation, amende de 30 000 € sur l'acompte
 * anticipé, mentions obligatoires de l'annonce) viennent de service-public.gouv.fr,
 * fiche F2604 « Vente d'un logement en copropriété », vérifiée le 21 août 2025 :
 * à revérifier à chaque nouvelle version de la fiche. La fourchette
 * « 200 à 700 € » de diagnostics est un chiffre TIERS (pap.fr, page du
 * 15 avril 2025, téléchargée le 07/10/2026) — ne jamais la rafraîchir de
 * mémoire.
 *
 * Trois articles citent par ailleurs le BARÈME d'honoraires de
 * app/honoraires/page.tsx (gestion 6 %, GLI 2,5 %, frais fixes 20 €/45 €,
 * transaction 9 000 € / 6 % / 5 %) : « cout-gestion-locative »,
 * « gestion-locative-villeurbanne-deleguer-ou-non » et « vendre-sans-agence ».
 * Depuis le 01/10/2026, « gestion-locative-villeurbanne-deleguer-ou-non » cite
 * en plus la MISE EN LOCATION côté propriétaire (9 % du loyer annuel HC,
 * constante LOCATION_PROPRIETAIRE de app/honoraires/page.tsx).
 * Si le client change son barème, ces textes doivent bouger avec lui.
 *
 * Depuis le 12/10/2026, « diagnostics-obligatoires-vente » est passé de 217 à
 * ~1 900 mots et PORTE ENFIN les durées de validité que l'architecture du site
 * lui réserve depuis le 07/10 (voir la note ci-dessus sur « vendre-sans-agence »,
 * et le renvoi de « charges-copropriete » : les deux pointent ici POUR les
 * durées — jusqu'à ce run, la page n'en publiait que 2 sur 8, la promesse était
 * fausse). ⚠️ Son tableau est ENTIÈREMENT dérivé de fiches service-public datées,
 * relevées le 12/10/2026 : F10798 (liste, vérifiée le 07/03/2025), F16096 (DPE,
 * 01/01/2026), F1142 (plomb, 17/08/2026), F742 (amiante, 06/12/2024), F18692
 * (électricité, 17/09/2026), F17337 (gaz, 17/09/2026), F31685 (assainissement,
 * 26/02/2025), F3150 (termites, 26/02/2026), F12239 (état des risques,
 * 28/09/2026). Chaque fiche porte une mention « Vérifié le … » : à REVÉRIFIER
 * fiche par fiche, jamais de mémoire, et la date du relevé affichée en légende
 * du tableau doit bouger avec.
 * ⚠️ Deux pièges de contenu que ce run a corrigés et qu'il ne faut pas
 * réintroduire : (1) l'électricité et le gaz valent 3 ans en VENTE mais 6 ans en
 * LOCATION — ne jamais publier la durée de location sur une page de vente ;
 * (2) la liste d'un APPARTEMENT n'est pas celle d'une MAISON (DPE dû seulement
 * à partir de 50 m² de surface de plancher pour une maison, et audit énergétique
 * E/F/G réservé aux maisons et aux immeubles en monopropriété — jamais à un
 * appartement vendu seul, règle établie le 11/10).
 * ⚠️ Ses comptages locaux viennent de la base DPE de l'ADEME (dpe03existant,
 * qs=code_insee_ban:69266 AND type_batiment:appartement, relevé du 12/10/2026) :
 * 49 717 appartements, dont 9 856 construits « avant 1948 » (plomb, MINIMUM car
 * 1948 est fondu dans la tranche 1948-1974) et 30 346 jusqu'en 1988 (amiante,
 * borne basse ; la tranche 1989-2000 de 8 134 enjambe le seuil du 01/07/1997,
 * d'où la fourchette 61,0 %-77,4 % publiée). Les deux bornes et la limite de
 * méthode (période de construction ≠ date du permis) doivent rester écrites.
 * ⚠️ La liste des risques de Villeurbanne vient de l'API Géorisques
 * (/api/v1/gaspar/risques?code_insee=69266, relevé du 12/10/2026) : six familles,
 * et AUCUN risque minier — l'ancienne version de la page écrivait « miniers ».
 *
 * Depuis le 15/10/2026, « charges-copropriete » est passé de 164 à ~2 500 mots et
 * PORTE ENFIN la composition du dossier de copropriété que l'architecture du site
 * lui réserve : le renvoi de « diagnostics-obligatoires-vente » (« règlement,
 * procès-verbaux, état daté — dont la composition est détaillée dans notre fiche
 * sur les charges de copropriété ») promettait un détail que la page ne publiait
 * pas. La promesse est désormais tenue ; ne pas la revider.
 * ⚠️ Partage des rôles à respecter : les DURÉES DE VALIDITÉ des diagnostics
 * restent la propriété de « diagnostics-obligatoires-vente » (règle du 07/10) et
 * la surface privative celle de « loi-carrez-surface » — cette page les LIE, elle
 * ne les republie pas.
 * ⚠️ Ses affirmations de droit sont dérivées de fiches datées, relevées le
 * 15/10/2026 : service-public F2590 (charges, vérifiée le 18/02/2026), F37294
 * (état daté, 18/02/2026), F32920 (charges l'année de la vente, 13/02/2026),
 * F2604 (vente d'un lot, 21/08/2025) ; INC-conso fonds de travaux (11/02/2026) et
 * plan pluriannuel de travaux (26/06/2026). Chaque fiche porte une mention
 * « Vérifié le … » : à REVÉRIFIER fiche par fiche, jamais de mémoire, et la date
 * affichée en fin d'article doit bouger avec.
 * ⚠️ Deux chiffres ont leur propre péremption, indépendante des fiches :
 * (1) le plafond de 380 € TTC de l'état daté (décret n° 2020-153 du 21/02/2020),
 * confirmé par la décision n° 499299 du Conseil d'État du 17/03/2026 qui rejette
 * le recours de deux chambres FNAIM — à revérifier si un nouveau décret paraît ;
 * (2) le calendrier du plan pluriannuel de travaux (01/01/2023 / 2024 / 2025),
 * dont la suppression a été PROPOSÉE par amendement sans être adoptée : ne jamais
 * écrire l'obligation comme abrogée sans un texte publié à l'appui.
 * ⚠️ Ses données locales viennent du Registre national d'immatriculation des
 * copropriétés (RNIC, Anah / data.gouv.fr), ressource « actualisation
 * quotidienne », extraction du 15/10/2026 sur commune=69266 : 2 065 copropriétés,
 * 165 101 lots au total, 79 797 lots à usage de logement/bureau/commerce (le
 * COMPTEUR LÉGAL des seuils), 73 582 lots d'habitation, médiane 44 lots.
 * Le registre est DÉCLARATIF — le dire reste obligatoire à chaque reprise.
 * ⚠️ Trois pièges de cette source, tous rencontrés : (1) le dictionnaire de
 * données publié a ses deux colonnes DÉCALÉES d'une ligne et emploie un ancien
 * jeu de noms — lire l'en-tête réel de la ressource, jamais le dictionnaire ;
 * (2) `periode_construction` mélange DEUX encodages (« Avant 1949 » et
 * « AVANT_1949 »), avec des bornes de tranches incohérentes entre les deux et
 * 20,7 % de valeurs absentes : ce champ N'EST PAS agrégeable, aucune répartition
 * par époque ne doit en être publiée ; (3) `syndicat_principal_ou_secondaire`
 * est rendu en booléen sans que la correspondance soit documentée — inexploitable.
 * ⚠️ Et le compteur légal n'est PAS le nombre total de lots : 1 744 copropriétés
 * sur 2 065 (84,5 %) ont un compteur légal inférieur à leur total. Ne jamais
 * substituer `nombre_total_lots` à `nombre_lots_habitation_bureaux_commerces`
 * pour classer une copropriété dans un palier d'obligation.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  /** Tableau de données. `source` = mention de provenance affichée en légende. */
  | {
      type: "table";
      caption?: string;
      source?: string;
      headers: string[];
      rows: string[][];
    };

export type Article = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  excerpt: string;
  date: string; // ISO — publication
  /** ISO — dernière vraie mise à jour du contenu (≠ date de publication). */
  updated?: string;
  internalHref: string;
  internalLabel: string;
  blocks: Block[];
  /**
   * FAQ affichée en bas d'article. Rendue visiblement ET en JSON-LD FAQPage :
   * les deux doivent toujours rester identiques (sinon mismatch sanctionnable).
   */
  faq?: { q: string; a: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "comment-estimer-son-bien-immobilier-lyon-villeurbanne",
    title:
      "Comment bien estimer son bien immobilier à Lyon et Villeurbanne (2026)",
    metaDescription:
      "Estimez la juste valeur de votre bien à Lyon ou Villeurbanne : les 8 critères clés, les méthodes fiables et l'estimation gratuite Markus Immobilier.",
    h1: "Comment bien estimer son bien immobilier à Lyon et Villeurbanne",
    excerpt:
      "Fixer le bon prix, c'est 80 % de la réussite d'une vente. Les 8 critères qui comptent et les méthodes fiables pour estimer votre bien.",
    date: "2026-04-07",
    internalHref: "/estimation",
    internalLabel: "Estimer mon bien gratuitement",
    blocks: [
      { type: "p", text: "Fixer le bon prix, c'est 80 % de la réussite d'une vente. Un bien surévalué stagne, accumule les visites sans offre et finit par se vendre en dessous de sa valeur réelle. Un bien sous-évalué part vite, mais vous laisse de l'argent sur la table. Voici comment estimer la juste valeur de votre appartement ou maison à Lyon et Villeurbanne." },
      { type: "h2", text: "Pourquoi une bonne estimation change tout" },
      { type: "p", text: "Le marché lyonnais est exigeant : les acheteurs comparent et repèrent immédiatement un prix « hors marché ». Une estimation juste attire les bons acheteurs dès la mise en ligne, là où l'attention est maximale (les deux premières semaines). À l'inverse, baisser son prix après plusieurs semaines envoie un mauvais signal." },
      { type: "h2", text: "Les 8 critères qui déterminent la valeur" },
      { type: "ol", items: [
        "**La localisation** : quartier, rue, proximité métro/tram, commerces, écoles.",
        "**[La surface (loi Carrez)](/blog/loi-carrez-surface)** : la base, mais pas tout.",
        "**L'étage et l'exposition** : lumière et ascenseur pèsent lourd.",
        "**L'état général** : rénové, à rafraîchir ou à refaire.",
        "**Le DPE** : une mauvaise note (F, G) fait baisser la valeur.",
        "**Les annexes** : balcon, terrasse, cave, parking, box.",
        "**Les charges de copropriété** : élevées, elles réduisent le budget des acheteurs.",
        "**L'état du marché local** au moment de la vente.",
      ] },
      { type: "h2", text: "Les méthodes (de la moins à la plus fiable)" },
      { type: "ul", items: [
        "**Le prix au m² « de quartier »** : utile pour une première idée, mais c'est une moyenne trompeuse. À Villeurbanne, nous publions [les médianes réelles par quartier](/blog/prix-immobilier-villeurbanne-2026), calculées sur les ventes signées.",
        "**La comparaison avec les ventes réelles** : la méthode des pros, basée sur les prix réellement signés (données officielles DVF), pas les prix affichés.",
        "**L'expertise terrain** : un conseiller ajuste avec ce qu'aucun algorithme ne voit (luminosité, calme, qualité de copropriété).",
      ] },
      { type: "p", text: "La meilleure estimation combine les trois." },
      { type: "h2", text: "Estimez votre bien gratuitement" },
      { type: "p", text: "Notre outil croise les ventes réelles près de chez vous, les caractéristiques précises de votre logement et une analyse du marché Lyon / Villeurbanne, pour une fourchette réaliste — sans engagement." },
      { type: "p", text: "Si votre bien se situe à Villeurbanne, la page [estimation immobilière à Villeurbanne](/estimation-immobiliere-villeurbanne) donne l'ordre de grandeur par quartier avant même de remplir le formulaire." },
    ],
  },
  {
    slug: "prix-immobilier-villeurbanne-2026",
    title:
      "Prix au m² à Villeurbanne : les chiffres réels par quartier (ventes 2025)",
    metaDescription:
      "Prix au m² à Villeurbanne calculés sur 1 875 ventes réelles de 2025 (données DVF) : médiane par quartier, évolution depuis 2022, prix par type de bien.",
    h1: "Prix au m² à Villeurbanne : les chiffres réels, quartier par quartier",
    excerpt:
      "Nous avons recalculé les prix de Villeurbanne à partir des 1 875 ventes d'appartements réellement signées en 2025 (données DVF) : 3 567 €/m² en médiane, et jusqu'à 43 % d'écart entre quartiers.",
    date: "2026-04-14",
    updated: "2026-09-07",
    internalHref: "/estimation",
    internalLabel: "Estimer gratuitement mon bien à Villeurbanne",
    blocks: [
      { type: "p", text: "Le prix médian d'un appartement à Villeurbanne est de **3 567 €/m²**, calculé sur les **1 875 ventes d'appartements réellement signées dans la commune en 2025**. Ce n'est pas une moyenne d'annonces : ce sont les prix inscrits chez le notaire, publiés par l'État dans la base DVF. Selon le quartier, la médiane va de 2 738 à 3 923 €/m², soit **43 % d'écart** entre le secteur le moins cher et le plus cher." },
      { type: "p", text: "Nous refaisons ce calcul nous-mêmes, quartier par quartier, parce que les « prix moyens » publiés par les portails mélangent souvent prix demandés et prix signés. Voici le détail, la méthode, et ce que ces chiffres permettent — ou pas — de conclure sur votre bien." },

      { type: "h2", text: "Quel est le prix au m² à Villeurbanne en 2026 ?" },
      { type: "p", text: "Le prix médian est de **3 567 €/m² pour un appartement** et **4 186 €/m² pour une maison**, sur les ventes de l'année 2025 (dernière année complète publiée). Le prix médian d'un appartement vendu à Villeurbanne s'établit à **195 000 €**, pour une surface médiane de 62 m²." },
      { type: "p", text: "Après trois années de baisse, le marché s'est stabilisé : la médiane appartement remonte de **+1,5 % entre 2024 et 2025**, mais reste **10,4 % en dessous de son niveau de 2022**. Autrement dit, le point bas semble passé, sans rattrapage du recul des années précédentes." },
      {
        type: "table",
        caption: "Villeurbanne — appartements anciens, prix de vente signés",
        headers: ["Année", "Médiane €/m²", "Prix médian", "Ventes analysées"],
        rows: [
          ["2022", "3 981 €", "221 760 €", "2 399"],
          ["2023", "3 851 €", "207 000 €", "1 847"],
          ["2024", "3 514 €", "194 000 €", "1 648"],
          ["**2025**", "**3 567 €**", "**195 000 €**", "**1 875**"],
        ],
        source:
          "Source : base DVF (demandes de valeurs foncières), data.gouv.fr / Etalab — extraction du 7 septembre 2026. Calcul Markus Immobilier.",
      },

      { type: "h2", text: "Quel est le prix au m² par quartier à Villeurbanne ?" },
      { type: "p", text: "Les trois quartiers les plus chers sont **Ferrandière – Maisons-Neuves (3 923 €/m²)**, **Gratte-Ciel – Dedieu – Charmettes (3 846 €/m²)** et **Charpennes – Tonkin (3 524 €/m²)**. Le plus abordable est **Cyprian – Les Brosses, à 2 738 €/m²**. Chaque valeur ci-dessous est la médiane des ventes d'appartements de 2025 dans le périmètre officiel du quartier." },
      {
        type: "table",
        caption:
          "Prix médian au m² des appartements vendus en 2025, par quartier de Villeurbanne",
        headers: ["Quartier", "2025", "vs 2024", "vs 2022", "Ventes 2025"],
        rows: [
          ["Ferrandière – Maisons-Neuves", "3 923 €", "+7,3 %", "−2,0 %", "187"],
          ["Gratte-Ciel – Dedieu – Charmettes", "3 846 €", "+1,2 %", "−10,6 %", "655"],
          ["Charpennes – Tonkin", "3 524 €", "−1,3 %", "−13,2 %", "200"],
          ["Perralière – Grandclément", "3 375 €", "+1,3 %", "−11,4 %", "330"],
          ["Buers – Croix-Luizet", "3 271 €", "+2,1 %", "−11,5 %", "223"],
          ["Cusset – Bonnevay", "3 171 €", "+3,1 %", "−5,8 %", "213"],
          ["Cyprian – Les Brosses", "2 738 €", "+3,4 %", "−10,0 %", "53"],
        ],
        source:
          "Sources : ventes DVF 2022-2025 (data.gouv.fr / Etalab) rattachées aux contours officiels des quartiers de la Métropole de Lyon (data.grandlyon.com). Extraction du 7 septembre 2026, calcul Markus Immobilier. Le quartier Saint-Jean n'est pas listé : trop peu de ventes pour une médiane fiable.",
      },
      { type: "p", text: "Un point mérite d'être souligné : **Ferrandière – Maisons-Neuves est le seul quartier revenu quasiment à son niveau de 2022** (−2,0 %), quand Charpennes – Tonkin reste 13,2 % en dessous. La reprise n'est pas homogène à l'échelle de la commune." },
      { type: "p", text: "Si vous achetez plutôt que vous ne vendez, nous avons traduit ces mêmes médianes en surfaces accessibles : [ce que 200 000, 250 000 et 300 000 € achètent, quartier par quartier](/blog/ou-acheter-villeurbanne-quartiers)." },

      { type: "h2", text: "Combien coûte un T2 ou un T3 à Villeurbanne ?" },
      { type: "p", text: "Un T2 s'est vendu **170 000 € en médiane en 2025** (45 m²), un T3 **226 250 €** (65 m²) et un T4 **255 000 €** (81 m²). Le prix au m² baisse mécaniquement avec la taille : 4 000 €/m² pour un studio contre 2 967 €/m² pour un T5. C'est la règle sur tout le marché lyonnais — les petites surfaces se paient plus cher au mètre carré, portées par la demande locative et étudiante (le campus de la Doua est à Villeurbanne)." },
      {
        type: "table",
        caption: "Appartements vendus à Villeurbanne en 2025, par nombre de pièces",
        headers: ["Type", "Prix médian", "€/m² médian", "Surface médiane", "Ventes"],
        rows: [
          ["Studio / T1", "115 000 €", "4 000 €", "30 m²", "309"],
          ["T2", "170 000 €", "3 830 €", "45 m²", "435"],
          ["T3", "226 250 €", "3 494 €", "65 m²", "578"],
          ["T4", "255 000 €", "3 211 €", "81 m²", "406"],
          ["T5 et +", "290 670 €", "2 967 €", "100 m²", "116"],
        ],
        source:
          "Source : base DVF 2025 (data.gouv.fr / Etalab), ventes d'appartements à Villeurbanne. Calcul Markus Immobilier, extraction du 7 septembre 2026.",
      },

      { type: "h2", text: "Comment ces prix ont-ils été calculés ?" },
      { type: "p", text: "Nous partons de la base **DVF (demandes de valeurs foncières)** publiée par l'État sur data.gouv.fr, qui recense chaque mutation immobilière enregistrée par les notaires, avec son prix réel et sa localisation. Nous ne retenons que les ventes exploitables, puis nous rattachons chaque vente à son quartier par ses coordonnées GPS." },
      { type: "p", text: "Les règles de filtrage appliquées, pour que vous puissiez juger de la fiabilité des chiffres :" },
      { type: "ul", items: [
        "**Ventes uniquement** (les échanges, adjudications et expropriations sont exclus).",
        "**Un seul logement par transaction** : les ventes d'immeubles entiers ou de lots multiples sont écartées, car leur prix au m² n'a pas de sens.",
        "**Surface bâtie ≥ 10 m²** et prix au m² compris entre 800 et 12 000 € — au-delà, il s'agit presque toujours d'une erreur de saisie ou d'une vente atypique.",
        "**Rattachement au quartier** par point-dans-polygone, à partir des contours officiels de quartiers publiés par la Métropole de Lyon.",
        "**Médiane et non moyenne** : la médiane n'est pas tirée vers le haut par quelques ventes exceptionnelles.",
      ] },
      { type: "p", text: "Deux limites à connaître. D'abord, **DVF est publiée avec du décalage** : 2025 est la dernière année complète disponible en septembre 2026. Ensuite, la base ne dit rien de l'état du bien, de l'étage, de l'exposition ni du DPE — trois facteurs qui expliquent l'essentiel des écarts à l'intérieur d'un même quartier." },

      { type: "h2", text: "Pourquoi un prix de quartier ne suffit pas à estimer votre bien" },
      { type: "p", text: "Parce que l'écart à l'intérieur d'un quartier est presque toujours plus grand que l'écart entre quartiers. Deux appartements de même surface dans la même rue peuvent afficher 15 à 20 % de différence selon l'étage, la présence d'un ascenseur, l'exposition, l'état et le DPE. Un prix médian de quartier vous donne un ordre de grandeur, pas une valeur." },
      { type: "p", text: "Pour resserrer ce cadrage, nos [repères d'estimation par quartier à Villeurbanne](/estimation-immobiliere-villeurbanne) déclinent ces médianes par typologie (T2, T3) plutôt qu'au mètre carré nu." },
      { type: "p", text: "Les critères qui font bouger le prix par rapport à la médiane de votre quartier :" },
      { type: "ul", items: [
        "**L'étage et l'ascenseur** : un dernier étage avec ascenseur se paie ; un 4ᵉ sans ascenseur se décote.",
        "**Le DPE** : depuis l'interdiction de louer les logements classés G (janvier 2025) puis F (janvier 2028), les passoires thermiques se négocient nettement en dessous du marché. Elles sont rares dans la commune — [4,9 % des appartements diagnostiqués](/blog/dpe-2026-ce-qui-change) — et concentrées sur le bâti d'avant 1975.",
        "**L'extérieur** : balcon, terrasse ou jardin — un différenciateur majeur depuis 2020.",
        "**Les charges de copropriété** : élevées, elles réduisent directement le budget de l'acheteur, donc le prix qu'il peut proposer.",
        "**Le stationnement** : un garage ou une place se valorise à part, en plus du prix au m² habitable.",
      ] },

      { type: "h2", text: "Ce que ces chiffres changent si vous vendez en 2026" },
      { type: "p", text: "La stabilisation observée en 2025 signifie qu'un bien correctement positionné se vend — mais que le marché ne rattrape plus les erreurs de prix. Un bien affiché 10 % au-dessus de sa valeur ne trouvera pas d'acheteur en attendant que le marché monte : il stagnera, puis se vendra en dessous de son prix réel après plusieurs baisses successives." },
      { type: "p", text: "Le nombre de ventes est reparti à la hausse en 2025 (1 875 contre 1 648 en 2024, soit **+14 %**) : il y a des acheteurs. Ils comparent simplement beaucoup mieux qu'en 2021." },
      { type: "p", text: "Notre estimation en ligne applique la même méthode que cet article, mais à l'échelle de votre rue : elle croise les ventes DVF réellement conclues autour de votre adresse avec les caractéristiques précises de votre logement. Comptez moins de deux minutes, et vous recevez le rapport détaillé." },
      { type: "p", text: "Une précision utile avant de vous lancer : une médiane de quartier ne suffit jamais à elle seule à fixer un prix. Nous avons mesuré [de combien un prix au m² peut se tromper à Villeurbanne](/blog/estimation-en-ligne-ou-agence) — l'écart est plus large qu'on ne le croit, et il varie fortement d'un quartier à l'autre." },
    ],
    faq: [
      {
        q: "Quel est le prix au m² à Villeurbanne en 2026 ?",
        a: "Le prix médian d'un appartement à Villeurbanne est de 3 567 €/m², calculé sur les 1 875 ventes signées en 2025 (base DVF, dernière année complète publiée). Pour une maison, la médiane est de 4 186 €/m².",
      },
      {
        q: "Quel est le quartier le plus cher de Villeurbanne ?",
        a: "Ferrandière – Maisons-Neuves, avec une médiane de 3 923 €/m² sur les ventes d'appartements de 2025, devant Gratte-Ciel – Dedieu – Charmettes (3 846 €/m²). Le quartier le plus abordable est Cyprian – Les Brosses, à 2 738 €/m².",
      },
      {
        q: "Les prix de l'immobilier baissent-ils encore à Villeurbanne ?",
        a: "Non, la baisse s'est arrêtée. Le prix médian au m² des appartements remonte de 1,5 % entre 2024 et 2025. Il reste toutefois 10,4 % en dessous du niveau de 2022, et la reprise est inégale : Ferrandière – Maisons-Neuves est presque revenu à son niveau de 2022, quand Charpennes – Tonkin reste 13,2 % en dessous.",
      },
      {
        q: "Combien coûte un T3 à Villeurbanne ?",
        a: "Un T3 s'est vendu 226 250 € en médiane à Villeurbanne en 2025, pour une surface médiane de 65 m², soit 3 494 €/m². 578 T3 ont été vendus dans la commune cette année-là.",
      },
      {
        q: "D'où viennent ces prix au m² ?",
        a: "De la base DVF (demandes de valeurs foncières) publiée par l'État sur data.gouv.fr, qui recense le prix réel de chaque vente enregistrée par les notaires. Markus Immobilier recalcule les médianes en écartant les ventes de lots multiples et les valeurs aberrantes, et rattache chaque vente à son quartier via les contours officiels de la Métropole de Lyon.",
      },
    ],
  },
  {
    slug: "vendre-appartement-lyon-etapes",
    title: "Vendre son appartement à Lyon : les 7 étapes clés (2026)",
    metaDescription:
      "Le guide complet pour vendre votre appartement à Lyon : estimation, diagnostics, annonce, visites, négociation et signature. Étape par étape.",
    h1: "Vendre son appartement à Lyon : les 7 étapes clés",
    excerpt:
      "Vendre vite et au bon prix ne s'improvise pas. Le parcours d'une vente réussie à Lyon, étape par étape.",
    date: "2026-04-21",
    internalHref: "/vendre",
    internalLabel: "Confier la vente de mon bien",
    blocks: [
      { type: "p", text: "Vendre vite et au bon prix ne s'improvise pas. Voici le parcours d'une vente réussie à Lyon." },
      { type: "ol", items: [
        "**Faire estimer son bien justement.** C'est le point de départ : un prix juste attire les acheteurs dès le premier jour. À Villeurbanne, partez [des prix réellement signés par quartier](/blog/prix-immobilier-villeurbanne-2026), pas des prix affichés.",
        "**Réunir les diagnostics obligatoires.** DPE, amiante, plomb, électricité… mieux vaut les anticiper.",
        "**Préparer le bien.** Désencombrer, réparer les petits défauts, soigner la lumière : un bien « prêt à vivre » se vend mieux.",
        "**Créer une annonce qui sort du lot.** Photos professionnelles, texte clair, mise en avant des atouts.",
        "**Gérer les visites.** Disponibilité, écoute, réponses aux objections.",
        "**Négocier.** Connaître la valeur réelle du bien permet de défendre le prix sans braquer l'acheteur.",
        "**Signer.** Compromis de vente, délai de rétractation, puis acte authentique chez le notaire.",
      ] },
      { type: "h2", text: "Gagnez du temps (et de l'argent)" },
      { type: "p", text: "Un accompagnement professionnel sécurise chaque étape et évite les erreurs coûteuses." },
    ],
  },
  {
    slug: "frais-de-notaire-lyon-2026",
    title: "Frais de notaire à Villeurbanne et à Lyon en 2026 : le calcul exact",
    metaDescription:
      "5,00 % de droits de mutation à Villeurbanne, 4,50 % pour un primo-accédant sans condition de ressources. Les frais de notaire calculés quartier par quartier.",
    h1: "Frais de notaire à Villeurbanne et à Lyon en 2026 : le calcul exact",
    excerpt:
      "Le taux voté par la Métropole de Lyon, le barème des émoluments, et la facture réelle calculée sur les prix d'appartements signés en 2025 dans les 7 quartiers de Villeurbanne.",
    date: "2026-04-28",
    updated: "2026-10-17",
    internalHref: "/acheter",
    internalLabel: "Être accompagné pour mon achat",
    blocks: [
      { type: "p", text: "Mal nommés, les « frais de notaire » ne vont pour l'essentiel pas au notaire : ce sont d'abord des taxes. Et ces taxes ne sont pas les mêmes partout en France — leur taux principal est voté collectivité par collectivité. Cet article publie le taux réellement applicable à Villeurbanne au 1ᵉʳ juin 2026, le barème national des émoluments, et la facture recalculée sur les prix d'appartements réellement signés dans chacun des 7 quartiers de la commune." },

      { type: "h2", text: "Quel est le taux des frais de notaire à Villeurbanne en 2026 ?" },
      { type: "p", text: "**La part principale des frais, le droit de mutation départemental, est de 5,00 % à Villeurbanne — et de 4,50 % si l'acheteur est primo-accédant.** Villeurbanne ne relève pas du département du Rhône mais de la **Métropole de Lyon**, qui vote son propre taux : les deux collectivités sont d'ailleurs listées séparément dans le tableau officiel de la DGFiP. Taxe communale et prélèvement de l'État compris, la part fiscale représente **6,32 % du prix** pour un acheteur ordinaire et **5,81 %** pour un primo-accédant." },
      { type: "p", text: "Le taux départemental n'est pas la seule taxe. Deux prélèvements s'y ajoutent automatiquement, dans des proportions beaucoup plus faibles :" },
      {
        type: "table",
        caption: "Les trois taxes dues sur une vente d'appartement ancien à Villeurbanne",
        source:
          "Taux départemental : tableau « Droits d'enregistrement et taxe de publicité foncière — taux applicables au 1ᵉʳ juin 2026 », DGFiP (impots.gouv.fr), ligne « 69 Métropole de Lyon », relu le 17/10/2026 — la version « au 1ᵉʳ juin 2026 » reste la plus récente publiée par la DGFiP à cette date. Taxe communale : article 1584 du CGI ; le même document liste les deux seules communes de France ayant voté une réduction en 2026 (Lamentin en Guadeloupe et Tsingoni à Mayotte), et Villeurbanne n'en fait pas partie. Prélèvement de l'État : article 1647, V du CGI (2,37 % du droit départemental).",
        headers: ["Taxe", "Acheteur ordinaire", "Primo-accédant"],
        rows: [
          ["Droit de mutation, part Métropole de Lyon", "5,00 % du prix", "4,50 % du prix"],
          ["Taxe communale additionnelle (Villeurbanne)", "1,20 % du prix", "1,20 % du prix"],
          ["Prélèvement de l'État pour frais d'assiette", "2,37 % du droit ci-dessus", "2,37 % du droit ci-dessus"],
          ["**Total de la part fiscale**", "**6,32 % du prix**", "**5,81 % du prix**"],
        ],
      },
      { type: "p", text: "Ce 5,00 % n'est pas le taux historique. Jusqu'en 2025, le plafond légal était de 4,50 % : la loi de finances pour 2025 a autorisé les départements et métropoles à le relever jusqu'à 5 %, **pour les actes passés et les conventions conclues entre le 1ᵉʳ avril 2025 et le 31 mars 2028**. Le texte a depuis été réécrit par l'article 121 de la loi n° 2026-103 du 19 février 2026 de finances pour 2026 : cette réécriture n'a pas déplacé la date de fin, elle a échelonné la prise d'effet des délibérations votées en cours de route. La Métropole de Lyon a utilisé la faculté, et l'administration précise que le dispositif prévu pour les conseils départementaux lui est **expressément applicable** (BOFiP, BOI-ENR-DMTOI-10-20 § 105, mis à jour le 17 juin 2026). Autrement dit : ce demi-point est daté, il a une date de fin inscrite dans la loi, et il ne s'applique pas à tout le monde." },

      { type: "h2", text: "Combien coûtent vraiment les frais de notaire pour un appartement à Villeurbanne ?" },
      { type: "p", text: "**Entre 12 900 € et 18 200 € pour un appartement de 62 m² — la surface médiane des ventes villeurbannaises de 2025 — selon le quartier.** L'écart d'un bout à l'autre de la commune atteint 5 359 €, et il ne tient qu'au prix du bien : le taux, lui, est identique dans les 7 quartiers. Le tableau ci-dessous part des prix réellement signés, pas des prix affichés." },
      {
        type: "table",
        caption:
          "Taxes + émoluments du notaire pour un appartement de 62 m² au prix médian de chaque quartier (acheteur ordinaire)",
        source:
          "Prix : médianes DVF 2025 des ventes d'appartements à Villeurbanne (data.gouv.fr / Etalab), calcul Markus Immobilier — les mêmes que celles publiées dans nos autres articles. Taxes : taux DGFiP au 1ᵉʳ juin 2026. Émoluments : barème réglementé, tableau 5 n° 54 de l'article A. 444-91 du code de commerce, TVA 20 % comprise. Débours et contribution de sécurité immobilière non compris (voir plus bas). Convention d'arrondi : chaque colonne est arrondie à l'euro, et le total est la somme des deux colonnes affichées — un lecteur qui additionne les deux cases retrouve exactement le total publié.",
        headers: ["Quartier", "Prix pour 62 m²", "Taxes", "Émoluments TTC", "Total"],
        rows: [
          ["Ferrandière – Maisons-Neuves", "243 226 €", "15 368 €", "2 862 €", "18 230 €"],
          ["Gratte-Ciel – Dedieu – Charmettes", "238 452 €", "15 067 €", "2 816 €", "17 883 €"],
          ["Charpennes – Tonkin", "218 488 €", "13 805 €", "2 621 €", "16 426 €"],
          ["Perralière – Grandclément", "209 250 €", "13 221 €", "2 530 €", "15 751 €"],
          ["Buers – Croix-Luizet", "202 802 €", "12 814 €", "2 467 €", "15 281 €"],
          ["Cusset – Bonnevay", "196 602 €", "12 422 €", "2 407 €", "14 829 €"],
          ["Cyprian – Les Brosses", "169 756 €", "10 726 €", "2 145 €", "12 871 €"],
        ],
      },
      { type: "p", text: "Sur le prix médian d'un appartement villeurbannais, [195 000 € toutes tailles confondues en 2025](/blog/prix-immobilier-villeurbanne-2026), le même calcul donne **12 321 € de taxes et 2 391 € d'émoluments TTC, soit 14 712 €**. Ces montants sont à provisionner en plus de l'apport : ils ne sont pas finançables par le prêt dans la plupart des montages, ce qui les rend structurants pour [votre capacité d'emprunt](/blog/capacite-emprunt-immobilier)." },
      { type: "p", text: "À titre de repère par typologie, toujours au prix médian villeurbannais de 2025 : **8 876 € pour un T1** (115 000 €), **12 889 € pour un T2** (170 000 €), **16 992 € pour un T3** (226 250 €), **19 090 € pour un T4** (255 000 €)." },

      { type: "h2", text: "Quelle est la différence de frais entre un primo-accédant et un autre acheteur ?" },
      { type: "p", text: "**Un primo-accédant échappe au demi-point de majoration voté en 2025 : il économise entre 869 € et 1 245 € sur un 62 m² villeurbannais, et 998 € au prix médian de la commune.** L'exception est inscrite dans la loi de finances pour 2025 elle-même : la majoration ne s'applique pas quand le bien « constitue pour l'acquéreur une première propriété » destinée « à l'usage de sa résidence principale », au sens de l'article L. 31-10-3 du code de la construction et de l'habitation." },
      {
        type: "table",
        caption: "Ce que la qualité de primo-accédant fait gagner, par quartier (62 m²)",
        source:
          "Calcul Markus Immobilier sur les médianes DVF 2025 et les deux taux votés par la Métropole de Lyon (5,00 % et 4,50 %), prélèvement de 2,37 % inclus. Le gain porte sur la seule part fiscale ; les émoluments sont identiques dans les deux cas.",
        headers: ["Quartier", "Taxes, acheteur ordinaire", "Taxes, primo-accédant", "Économie"],
        rows: [
          ["Ferrandière – Maisons-Neuves", "15 368 €", "14 123 €", "1 245 €"],
          ["Gratte-Ciel – Dedieu – Charmettes", "15 067 €", "13 846 €", "1 221 €"],
          ["Charpennes – Tonkin", "13 805 €", "12 687 €", "1 118 €"],
          ["Perralière – Grandclément", "13 221 €", "12 150 €", "1 071 €"],
          ["Buers – Croix-Luizet", "12 814 €", "11 776 €", "1 038 €"],
          ["Cusset – Bonnevay", "12 422 €", "11 416 €", "1 006 €"],
          ["Cyprian – Les Brosses", "10 726 €", "9 857 €", "869 €"],
        ],
      },
      { type: "h3", text: "Faut-il un prêt à taux zéro pour payer 4,50 % au lieu de 5,00 % ?" },
      { type: "p", text: "**Non. Il suffit de n'avoir pas été propriétaire de sa résidence principale au cours des deux années qui précèdent l'acquisition, et de destiner le bien acheté à sa résidence principale. Il n'y a ni condition de ressources, ni condition de financement.** L'administration l'écrit noir sur blanc : la non-application de la hausse « n'est pas conditionnée à un niveau de ressources ou à un moyen de financement de l'acquisition » (BOFiP, BOI-ENR-DMTOI-10-20 § 107, mis à jour le 17 juin 2026). Le renvoi à l'article L. 31-10-3 du code de la construction et de l'habitation est un renvoi de **définition** : il n'oblige pas à souscrire un prêt à taux zéro et ne ferme pas l'avantage à ceux qui n'y auraient pas droit." },
      { type: "p", text: "Quatre situations courantes tombent du bon côté de la règle, et aucune n'est intuitive :" },
      { type: "ul", items: [
        "**Vous n'étiez qu'usufruitier ou nu-propriétaire de votre résidence principale** : vous restez primo-accédant. La « première propriété » s'entend de la **pleine** propriété (BOFiP, § 107, remarque 2).",
        "**Vous avez vendu votre résidence principale il y a plus de deux ans** et vous êtes locataire depuis : le délai est écoulé, vous redevenez primo-accédant.",
        "**Vous êtes locataire de votre logement principal mais propriétaire d'une résidence secondaire** : la condition ne porte que sur la résidence principale, l'avantage reste ouvert.",
        "**Vous êtes un résident étranger** : la condition de première propriété s'apprécie sur le seul territoire national, dès lors que le bien acquis est destiné à votre résidence principale.",
      ] },

      { type: "h3", text: "Un couple dont un seul membre est primo-accédant paie-t-il 5,00 % ou 4,50 % ?" },
      { type: "p", text: "**Les deux, chacun sur sa part — sauf en communauté, où il faut que les deux soient primo-accédants.** En indivision, c'est-à-dire pour des concubins, des partenaires de PACS ou des époux mariés sous séparation de biens, la condition s'apprécie acquéreur par acquéreur : celui qui est primo-accédant garde le taux de 4,50 % **à hauteur de sa quote-part**, l'autre paie 5,00 % sur la sienne. Pour des époux mariés sous **communauté réduite aux acquêts ou communauté universelle**, l'exception ne joue que si les deux membres du couple remplissent la condition." },
      { type: "p", text: "Deux cas limites méritent d'être connus avant de signer. Si un époux marié sous un régime communautaire achète **seul et sur ses fonds propres**, la condition n'est exigée que de lui — à condition que la double déclaration de remploi figure dans l'acte (réponse ministérielle Berger n° 5129, JO AN du 16 septembre 2025, p. 8098). À l'inverse, l'époux en indivision avec son conjoint qui divorce **n'est pas** primo-accédant s'il rachète une résidence principale dans les deux ans suivant son départ du domicile commun." },

      { type: "h3", text: "Faut-il habiter le logement pour y avoir droit ?" },
      { type: "p", text: "**Oui, et l'administration chiffre l'occupation : le logement doit être occupé au moins huit mois par an** (article 265 de l'annexe III au CGI), la résidence principale relevant par ailleurs d'une appréciation de fait, sous le contrôle du juge de l'impôt. Un investisseur qui achète pour louer n'a donc pas droit à l'exception — un point à intégrer au [calcul de rentabilité](/blog/rentabilite-locative-lyon)." },
      { type: "p", text: "La condition de première propriété tombe en revanche entièrement lorsque l'acquéreur, ou l'un des occupants du logement à titre principal, est titulaire de la carte « mobilité inclusion » portant la mention « invalidité », perçoit une pension d'invalidité de 2ᵉ ou 3ᵉ catégorie, bénéficie de l'allocation d'éducation de l'enfant handicapé ou de l'allocation aux adultes handicapés, ou a vu sa résidence principale rendue définitivement inhabitable par une catastrophe. C'est le notaire qui vérifie tout cela et le fait déclarer dans l'acte : ne considérez jamais l'avantage comme acquis avant qu'il l'ait confirmé." },

      { type: "h2", text: "Comment sont calculés les émoluments du notaire ?" },
      { type: "p", text: "**Les émoluments sont un tarif national réglementé, dégressif, strictement identique à Villeurbanne, à Lyon et partout en France.** Ils ne se négocient pas au coup par coup et ne dépendent ni du notaire choisi ni de la commune. C'est la raison pour laquelle comparer deux études sur le prix de l'acte n'a pas de sens : ce qui change d'un achat à l'autre, c'est la taxe locale, pas la rémunération de l'officier public." },
      {
        type: "table",
        caption: "Barème des émoluments proportionnels sur une vente d'immeuble",
        source:
          "Tableau 5, n° 54 de l'article A. 444-91 du code de commerce (arrêté du 26 février 2016 fixant les tarifs réglementés des notaires). Taux hors TVA ; la TVA à 20 % s'ajoute.",
        headers: ["Tranche du prix", "Taux HT"],
        rows: [
          ["de 0 à 6 500 €", "3,945 %"],
          ["de 6 500 à 17 000 €", "1,627 %"],
          ["de 17 000 à 60 000 €", "1,085 %"],
          ["au-delà de 60 000 €", "0,814 %"],
        ],
      },
      { type: "p", text: "Le barème étant dégressif, les émoluments pèsent proportionnellement moins lourd à mesure que le prix monte : **1,40 % du prix pour un T1 à 115 000 €, 1,23 % au prix médian villeurbannais, 1,17 % pour un T4 à 255 000 €**. Au-delà d'un seuil fixé par le même arrêté, le notaire peut en outre accorder une remise ; elle reste à sa main, et il doit alors l'appliquer à tous ses clients dans les mêmes conditions." },

      { type: "h2", text: "Pourquoi la règle des « 7 à 8 % » tombe-t-elle dans le haut de la fourchette à Villeurbanne ?" },
      { type: "p", text: "**Parce que les deux postes qu'on sait calculer à l'euro près — taxes et émoluments — pèsent déjà de 7,49 % à 7,72 % du prix aux niveaux villeurbannais, avant même d'ajouter les débours.** La règle de pouce « 7 à 8 % dans l'ancien » reste juste, mais à Villeurbanne en 2026 elle penche nettement vers 8 % plutôt que vers 7 %, du fait du demi-point de majoration voté par la Métropole." },
      { type: "p", text: "Ces deux bornes sont celles des prix médians par typologie : **7,49 % pour un T4 à 255 000 €** (19 090 €) et **7,72 % pour un T1 à 115 000 €** (8 876 €). Le barème des émoluments étant dégressif, c'est le petit logement qui supporte le taux le plus élevé. À surface constante — les 62 m² du tableau par quartier — la fourchette est plus resserrée : **de 7,50 % à Ferrandière – Maisons-Neuves à 7,58 % à Cyprian – Les Brosses**." },
      { type: "p", text: "Restent deux postes que cet article ne chiffre volontairement pas, parce qu'ils dépendent du dossier et non d'un taux public : les **débours**, c'est-à-dire les sommes que le notaire avance pour votre compte (documents d'urbanisme, état hypothécaire, syndic, géomètre le cas échéant), et la **contribution de sécurité immobilière** perçue par l'État lors de la publication de l'acte. Ensemble, ils représentent en général quelques centaines d'euros — de quoi porter la facture réelle près du haut de la fourchette. Votre notaire est le seul à pouvoir les arrêter précisément, et il le fait sur devis avant la signature." },
      { type: "p", text: "Dans le neuf, la logique est différente : la vente est soumise à la TVA immobilière et le droit de mutation tombe à un taux réduit, ce qui ramène les frais d'acquisition autour de **2 à 3 %** du prix. Le barème des émoluments, lui, ne change pas." },

      { type: "h2", text: "Les frais de notaire comprennent-ils les honoraires d'agence ?" },
      { type: "p", text: "**Non : les frais de notaire ne comprennent pas les honoraires d'agence, et les deux ne vont pas dans la même poche.** Les premiers sont dus par l'acquéreur et reviennent pour l'essentiel à la Métropole, à la commune et à l'État ; les seconds rémunèrent l'agence et relèvent d'un barème propre à chaque enseigne, obligatoirement affiché." },
      { type: "p", text: "Dans notre barème, les honoraires de transaction sont [à la charge du vendeur](/honoraires) : le prix affiché sur nos annonces est donc celui que règle l'acheteur — sans honoraires à ajouter, mais avec les frais d'acquisition en plus. Cela a une conséquence directe sur la fiscalité de l'achat : quand les honoraires sont mis à la charge de l'acquéreur, ils s'ajoutent au prix mais **sortent de l'assiette** des droits de mutation ; quand ils sont à la charge du vendeur, l'assiette est le prix entier. Si vous voulez fixer le prix de départ avant de faire ces calculs, notre [estimation à Villeurbanne](/estimation-immobiliere-villeurbanne) donne une fourchette en moins de deux minutes." },

      { type: "h2", text: "Méthode et sources" },
      { type: "ul", items: [
        "**Taux de la Métropole de Lyon** : tableau « Droits d'enregistrement et taxe de publicité foncière — taux, abattements de base et réductions de taux applicables au 1ᵉʳ juin 2026 » publié par la DGFiP sur impots.gouv.fr, ligne « 69 Métropole de Lyon » — 5,00 % hors primo-accédant, 4,50 % au titre de l'article 1594 D du CGI, et aucun abattement ni taux réduit voté. Document téléchargé le 29/09/2026 et relu intégralement le 17/10/2026 : c'est toujours la version la plus récente publiée, et la ligne est inchangée.",
        "**Dispositif temporaire de majoration** : article 116 de la loi n° 2025-127 du 14 février 2025 de finances pour 2025, dans sa rédaction issue de l'article 121 de la loi n° 2026-103 du 19 février 2026 de finances pour 2026, commenté au BOFiP BOI-ENR-DMTOI-10-20 § 105 (document mis à jour le 17 juin 2026). Fenêtre d'application : 1ᵉʳ avril 2025 – 31 mars 2028 ; pour les actes passés à compter du 1ᵉʳ avril 2028, le taux en vigueur le 31 janvier 2025 est rétabli. Le même paragraphe précise que ces dispositions sont applicables aux délibérations de la métropole de Lyon.",
        "**Conditions du statut de primo-accédant** : I de l'article L. 31-10-3 du code de la construction et de l'habitation, et BOFiP BOI-ENR-DMTOI-10-20 § 106 à 109 (17 juin 2026) pour l'absence de condition de ressources et de financement, la notion de pleine propriété, les règles applicables aux co-acquéreurs et la condition d'occupation de huit mois par an (article 265 de l'annexe III au CGI). Achat par un seul époux marié sous un régime communautaire : réponse ministérielle Berger n° 5129, JO AN du 16 septembre 2025, p. 8098.",
        "**Prélèvement pour frais d'assiette et de recouvrement** : article 1647, V du CGI — 2,37 % du montant du droit départemental.",
        "**Émoluments** : tableau 5, n° 54 de l'article A. 444-91 du code de commerce (arrêté du 26 février 2016).",
        "**Prix** : médianes des ventes d'appartements enregistrées à Villeurbanne (commune 69266) en 2025 dans la base DVF publiée par Etalab sur data.gouv.fr, rattachées aux contours de quartiers officiels de la Métropole de Lyon — une seule ligne bâtie par mutation, surfaces d'au moins 10 m², médiane et jamais moyenne. Surface de référence : 62 m², médiane communale.",
        "**Non chiffrés ici** : débours et contribution de sécurité immobilière, qui dépendent du dossier. Tous les montants sont arrondis à l'euro et ne valent pas devis.",
      ] },
    ],
    faq: [
      {
        q: "Quel est le taux des droits de mutation à Villeurbanne en 2026 ?",
        a: "5,00 % du prix pour un acheteur ordinaire et 4,50 % pour un primo-accédant. Villeurbanne relève de la Métropole de Lyon, qui vote son propre taux — distinct de celui du département du Rhône. En ajoutant la taxe communale de 1,20 % et le prélèvement de l'État de 2,37 % du droit départemental, la part fiscale totale est de 6,32 % du prix, ou 5,81 % pour un primo-accédant.",
      },
      {
        q: "Combien faut-il prévoir de frais de notaire pour un appartement à Villeurbanne ?",
        a: "Sur le prix médian d'un appartement villeurbannais signé en 2025, 195 000 €, comptez 12 321 € de taxes et 2 391 € d'émoluments TTC, soit 14 712 € — auxquels s'ajoutent les débours et la contribution de sécurité immobilière, quelques centaines d'euros. Pour un 62 m² au prix médian de son quartier, le total taxes + émoluments va de 12 871 € à Cyprian – Les Brosses à 18 230 € à Ferrandière – Maisons-Neuves.",
      },
      {
        q: "Un primo-accédant paie-t-il moins de frais de notaire à Villeurbanne ?",
        a: "Oui. La majoration d'un demi-point votée par la Métropole de Lyon ne s'applique pas lorsque le bien constitue une première propriété destinée à la résidence principale de l'acquéreur, au sens de l'article L. 31-10-3 du code de la construction et de l'habitation. L'économie est de 869 € à 1 245 € sur un 62 m² villeurbannais, et de 998 € au prix médian de la commune. C'est le notaire qui vérifie les conditions et les fait déclarer dans l'acte.",
      },
      {
        q: "Les frais de notaire sont-ils les mêmes à Lyon et à Villeurbanne ?",
        a: "Oui, car les deux communes relèvent de la même collectivité : la Métropole de Lyon, qui a voté 5,00 %. Une commune du département du Rhône située hors métropole relève, elle, d'un taux voté séparément — la DGFiP les liste comme deux collectivités distinctes. Dans le tableau applicable au 1ᵉʳ juin 2026, les deux affichent le même taux de 5,00 %, mais rien ne garantit qu'elles resteront alignées : ce sont deux votes indépendants. Les émoluments du notaire, eux, sont un tarif national et ne varient nulle part.",
      },
      {
        q: "Jusqu'à quand le taux de 5,00 % s'applique-t-il ?",
        a: "La loi de finances pour 2025 a ouvert la faculté de relever le taux au-delà de 4,50 % et dans la limite de 5 % pour les actes passés et les conventions conclues du 1ᵉʳ avril 2025 au 31 mars 2028. Pour les actes passés à compter du 1ᵉʳ avril 2028, ce n'est pas un plafond théorique qui s'applique mais le taux qui était en vigueur le 31 janvier 2025, soit 4,50 % pour la Métropole de Lyon, sauf nouvelle disposition législative. La date qui compte est celle de l'acte authentique et non celle du compromis ; pour une promesse synallagmatique assortie d'une condition suspensive, c'est la date de réalisation de la condition qui est retenue.",
      },
      {
        q: "Faut-il un prêt à taux zéro pour payer 4,50 % au lieu de 5,00 % à Villeurbanne ?",
        a: "Non. L'exception de primo-accédant renvoie à la définition de l'article L. 31-10-3 du code de la construction et de l'habitation, mais l'administration précise que la non-application de la hausse n'est conditionnée ni à un niveau de ressources ni à un moyen de financement de l'acquisition. Il suffit de ne pas avoir été propriétaire de sa résidence principale au cours des deux années précédant l'acquisition et de destiner le bien acheté à sa résidence principale, occupée au moins huit mois par an.",
      },
      {
        q: "Un couple dont un seul membre est primo-accédant paie-t-il 5,00 % ou 4,50 % ?",
        a: "Cela dépend du régime. En indivision — concubins, partenaires de PACS, époux mariés sous séparation de biens — la condition s'apprécie acquéreur par acquéreur : celui qui est primo-accédant garde le taux de 4,50 % à hauteur de sa quote-part, l'autre paie 5,00 % sur la sienne. Pour des époux mariés sous communauté réduite aux acquêts ou communauté universelle, les deux doivent être primo-accédants pour échapper à la majoration. Si un époux marié sous un régime communautaire achète seul sur ses fonds propres, avec la double déclaration de remploi dans l'acte, la condition n'est exigée que de lui.",
      },
      {
        q: "Peut-on être primo-accédant en étant déjà propriétaire d'une résidence secondaire ?",
        a: "Oui. La condition ne porte que sur la résidence principale : un acquéreur locataire de son logement principal mais propriétaire d'une résidence secondaire est considéré comme primo-accédant. Il en va de même de celui qui n'était qu'usufruitier ou nu-propriétaire de sa résidence principale, car la première propriété s'entend de la pleine propriété.",
      },
      {
        q: "Les honoraires d'agence sont-ils inclus dans les frais de notaire ?",
        a: "Non, ce sont deux choses distinctes. Les frais de notaire sont majoritairement composés de taxes revenant à la Métropole, à la commune et à l'État ; les honoraires d'agence rémunèrent l'agence selon un barème affiché propre à chaque enseigne. Chez Markus Immobilier, les honoraires de transaction sont à la charge du vendeur : le prix affiché est celui que règle l'acheteur, frais d'acquisition en plus.",
      },
    ],
  },
  {
    slug: "dpe-2026-ce-qui-change",
    title: "DPE à Villeurbanne : 4,9 % de passoires, et ce qui change en 2026",
    metaDescription:
      "Sur 49 717 appartements diagnostiqués à Villeurbanne, 4,9 % sont classés F ou G, contre 7,1 % en France. Détail par période de construction et règles 2026.",
    h1: "DPE à Villeurbanne : combien de passoires énergétiques, et ce qui change en 2026",
    excerpt:
      "Nous avons compté les étiquettes DPE des 49 717 appartements diagnostiqués à Villeurbanne : 4,9 % sont classés F ou G, contre 7,1 % en France. Le risque dépend d'abord de l'année de construction.",
    date: "2026-05-05",
    updated: "2026-10-16",
    internalHref: "/vendre",
    internalLabel: "Faire le point sur la valeur de mon bien",
    blocks: [
      { type: "p", text: "**Sur les 49 717 appartements villeurbannais qui disposent d'un diagnostic de performance énergétique, 2 454 sont classés F ou G, soit 4,9 %.** C'est moins que la moyenne nationale (7,1 %) et moins qu'à Lyon (6,7 %). Nous avons compté ces étiquettes une par une dans la base publique de l'ADEME, parce que personne ne publie ce chiffre à l'échelle de Villeurbanne — et parce qu'il change ce qu'un propriétaire doit anticiper avant de vendre ou de louer." },

      { type: "h2", text: "Combien d'appartements sont des passoires énergétiques à Villeurbanne ?" },
      { type: "p", text: "**2 454 appartements sur 49 717, soit 4,9 % du parc diagnostiqué.** Villeurbanne compte donc proportionnellement moins de passoires énergétiques que la France (7,1 %) et que Lyon (6,7 %). L'étiquette la plus fréquente dans la commune est le C : il concerne un appartement diagnostiqué sur deux (51,5 %), contre 41,8 % au niveau national." },
      {
        type: "table",
        caption: "Villeurbanne — étiquettes DPE des appartements diagnostiqués",
        headers: ["Étiquette", "Appartements", "Part à Villeurbanne", "Part en France"],
        rows: [
          ["A", "176", "0,35 %", "0,85 %"],
          ["B", "1 777", "3,57 %", "4,88 %"],
          ["C", "25 614", "51,52 %", "41,77 %"],
          ["D", "14 297", "28,76 %", "30,75 %"],
          ["E", "5 399", "10,86 %", "14,70 %"],
          ["F", "1 643", "3,30 %", "4,71 %"],
          ["G", "811", "1,63 %", "2,34 %"],
          ["**F + G**", "**2 454**", "**4,94 %**", "**7,05 %**"],
        ],
        source:
          "Source : base « DPE Logements existants (depuis juillet 2021) », ADEME, Licence Ouverte 2.0 — extraction du 11 octobre 2026. Comptage Markus Immobilier sur les appartements de la commune de Villeurbanne (code INSEE 69266) ; référence nationale calculée sur les 10 646 482 appartements diagnostiqués en France.",
      },
      { type: "p", text: "Une explication tentante doit être écartée tout de suite : ce n'est pas le chauffage urbain. On pourrait le croire décisif à Villeurbanne, mais **17,9 % des appartements diagnostiqués y sont raccordés à un réseau de chaleur, contre 17,2 % en France** — un écart trop faible pour expliquer quoi que ce soit. La vraie raison est ailleurs, et elle est mesurable : l'âge du bâti." },

      { type: "h2", text: "Mon immeuble date des années 1960 : quel risque d'avoir une étiquette F ou G ?" },
      { type: "p", text: "**Pour un appartement villeurbannais construit entre 1948 et 1974, le risque mesuré est de 7,60 %. Il monte à 12,37 % avant 1948 et tombe sous 1 % pour tout ce qui a été construit à partir de 1978.** La rupture se situe en 1975, année de la première réglementation thermique : avant cette date, 9,49 % des appartements diagnostiqués sont classés F ou G (2 361 sur 24 881) ; à partir de 1975, 0,38 % (93 sur 24 649). Soit **25 fois moins souvent**." },
      {
        type: "table",
        caption: "Villeurbanne — part des appartements classés F ou G, par période de construction",
        headers: ["Période de construction", "Appartements diagnostiqués", "Classés F ou G", "Part F + G"],
        rows: [
          ["avant 1948", "9 856", "1 219", "**12,37 %**"],
          ["1948 – 1974", "15 025", "1 142", "**7,60 %**"],
          ["1975 – 1977", "1 303", "39", "2,99 %"],
          ["1978 – 1982", "2 221", "16", "0,72 %"],
          ["1983 – 1988", "1 941", "8", "0,41 %"],
          ["1989 – 2000", "8 134", "22", "0,27 %"],
          ["2001 – 2005", "2 034", "1", "0,05 %"],
          ["2006 – 2012", "5 010", "5", "0,10 %"],
          ["2013 – 2021", "4 006", "2", "0,05 %"],
        ],
        source:
          "Source : base DPE Logements existants, ADEME — extraction du 11 octobre 2026. Comptage Markus Immobilier. Les 187 appartements déclarés « après 2021 » ne figurent pas dans ce tableau ; 49 530 des 49 717 appartements ont une période de construction renseignée.",
      },
      { type: "p", text: "Pratiquement, cela veut dire qu'une étiquette F ou G n'est pas un risque diffus : elle se concentre sur la moitié la plus ancienne du parc villeurbannais. La moitié d'avant 1975 représente à elle seule **2 361 des 2 454 passoires de la commune, soit 96 % d'entre elles**. Si votre appartement a été construit après 1978, une mauvaise étiquette est statistiquement l'exception et mérite d'être vérifiée plutôt que subie." },

      { type: "h2", text: "Qu'est-ce qui change au 1er janvier 2026 pour un logement chauffé à l'électricité ?" },
      { type: "p", text: "**Depuis le 1er janvier 2026, le facteur de conversion de l'électricité en énergie primaire passe de 2,3 à 1,9.** Un logement chauffé à l'électricité obtient donc une meilleure étiquette qu'avec l'ancien calcul, sans aucun travaux. Les DPE réalisés en 2025 et avant restent valables, et ils peuvent être mis à jour gratuitement, sans nouvelle visite du diagnostiqueur, sur le site de l'ADEME." },
      { type: "p", text: "**À Villeurbanne, cela concerne un nombre précis de logements : 1 287 appartements classés F ou G y sont chauffés à l'électricité, et 1 077 d'entre eux ont un DPE établi avant le 1er janvier 2026.** Ce sont ces 1 077 là qui ont quelque chose à gagner à demander la mise à jour gratuite. L'électricité est d'ailleurs le premier mode de chauffage des passoires villeurbannaises : 52,4 % des appartements classés F ou G, contre 42,3 % au gaz naturel et 3,1 % raccordés à un réseau de chaleur." },

      { type: "h2", text: "À partir de quand ne peut-on plus louer un logement selon son DPE ?" },
      { type: "p", text: "**Un logement classé G ne peut plus être mis en location depuis le 1er janvier 2025, et l'interdiction vaut aussi pour le renouvellement du bail et sa reconduction tacite.** La classe F suit à partir de 2028 et la classe E à partir de 2034. Les logements F et G subissent par ailleurs un gel des loyers : pas d'augmentation tant que le bien reste une passoire." },
      { type: "ul", items: [
        "**Classe G** : interdite à la location depuis le 1er janvier 2025 — **811 appartements** à Villeurbanne.",
        "**Classe F** : interdite à partir de 2028 — **1 643 appartements** de plus.",
        "**Classe E** : interdite à partir de 2034 — **5 399 appartements** de plus.",
      ] },
      { type: "p", text: "Mis bout à bout, le calendrier concerne donc **7 853 appartements diagnostiqués à Villeurbanne, soit 15,8 % du parc, à l'horizon 2034**. L'échéance la plus lourde n'est pas 2025 ni 2028 : c'est 2034, qui à elle seule vise plus du double des classes F et G réunies." },

      { type: "h2", text: "Faut-il un audit énergétique pour vendre un appartement classé F ou G ?" },
      { type: "p", text: "**Non, pas s'il s'agit d'un lot de copropriété.** L'audit énergétique obligatoire en cas de vente ne concerne que les maisons individuelles et les immeubles composés de plusieurs logements dont le vendeur est l'unique propriétaire, classés E, F ou G. Un appartement vendu seul au sein d'une copropriété n'y est pas soumis, quelle que soit son étiquette." },
      { type: "p", text: "La distinction compte particulièrement ici : sur les 51 951 diagnostics enregistrés à Villeurbanne, **49 717 portent sur des appartements, contre 1 159 sur des maisons et 1 075 sur des immeubles entiers**. L'immense majorité des ventes villeurbannaises échappe donc à l'audit énergétique — mais pas au DPE, qui reste obligatoire dans tous les cas et s'ajoute aux [diagnostics déjà exigés avant toute vente](/blog/diagnostics-obligatoires-vente)." },
      { type: "p", text: "L'obligation vise les ventes dont la promesse ou l'acte de vente est signé depuis le 1er avril 2023, et sera étendue aux bâtiments classés D à partir du 1er janvier 2034. Dans tous les cas, une mauvaise étiquette entraîne une décote : les acheteurs anticipent les travaux, et le prix se négocie en conséquence." },

      { type: "h2", text: "Mon DPE est-il encore valable ?" },
      { type: "p", text: "**Un DPE réalisé depuis le 1er juillet 2021 est valable 10 ans.** En revanche, les DPE réalisés entre le 1er janvier 2018 et le 30 juin 2021 ne sont plus valables depuis le 1er janvier 2025 : ils doivent être refaits en cas de mise en location. Depuis le 1er juillet 2024, les seuils des étiquettes ont par ailleurs été adaptés pour les logements dont la surface de référence est inférieure ou égale à 40 m², et les propriétaires concernés peuvent télécharger sur le site de l'ADEME une attestation remplaçant l'étiquette initiale." },
      { type: "p", text: "**Ce dernier point touche beaucoup de monde à Villeurbanne, qui est une ville de petites surfaces : 18 134 appartements diagnostiqués font 40 m² ou moins, soit 36,5 % de ceux dont la surface est renseignée.** Et ce sont justement les plus exposés : **6,26 % d'entre eux sont classés F ou G, contre 4,16 % au-dessus de 40 m²**. Un studio ou un T1 a donc environ 50 % de risques en plus qu'un grand logement d'être une passoire — ce qui, dans une commune qui borde le campus de la Doua, concerne directement le parc locatif étudiant." },

      { type: "h2", text: "Le DPE collectif de ma copropriété est-il obligatoire en 2026 ?" },
      { type: "p", text: "**Oui, si le permis de construire de l'immeuble a été déposé avant le 1er janvier 2013 — et, en métropole, quelle que soit la taille de la copropriété, puisque les trois échéances du calendrier sont désormais passées.** L'obligation vise les bâtiments d'habitation collective, qu'ils soient en copropriété ou détenus par un propriétaire unique. Un immeuble dont le permis a été déposé le 1er janvier 2013 ou après n'y est pas soumis." },
      { type: "p", text: "Le calendrier s'est appliqué par paliers, selon le nombre de lots : **le 1er janvier 2024 pour les immeubles en monopropriété et les copropriétés de plus de 200 lots, le 1er janvier 2025 pour celles de 50 à 200 lots, et le 1er janvier 2026 pour les plus petites.** ⚠️ À 50 lots exactement, les deux derniers paliers se recouvrent dans les sources officielles elles-mêmes : les fiches publiques écrivent « de 50 à 200 lots » pour l'échéance de 2025 et « d'au plus 50 lots » pour celle de 2026. La lecture prudente, en 2025, était donc de se rattacher au palier le plus précoce ; aujourd'hui la question n'a plus d'enjeu pratique, les deux dates étant échues." },
      { type: "p", text: "Deux précisions qui comptent ici, et que les fiches officielles ne tranchent pas. D'abord, **elles ne disent pas si ce décompte retient tous les lots ou seulement les lots à usage de logement, de bureau ou de commerce**, comme le fait le plan pluriannuel de travaux. L'écart n'est pas théorique à Villeurbanne : **1 744 copropriétés sur 2 065, soit 84,5 %, ont un compteur légal inférieur à leur nombre total de lots**, donc la réponse déplace le palier applicable pour beaucoup d'immeubles — c'est au syndic de dire sur quel décompte il s'est appuyé (le détail du registre national figure dans notre page sur [les charges de copropriété et le dossier à fournir](/blog/charges-copropriete)). Ensuite, **ce DPE collectif porte sur le bâtiment entier et ne remplace pas le DPE individuel** exigé pour vendre ou louer un lot." },
      { type: "p", text: "Il est **valable dix ans**, et n'a pas à être renouvelé si un diagnostic réalisé après le 1er juillet 2021 a classé le bâtiment en A, B ou C. Outre-mer, l'obligation n'entrera en vigueur que le 1er janvier 2028." },

      { type: "h2", text: "Comment ces chiffres ont-ils été calculés ?" },
      { type: "p", text: "Ils proviennent de la base « DPE Logements existants (depuis juillet 2021) », publiée en open data par l'ADEME sous Licence Ouverte 2.0. Nous avons retenu les diagnostics rattachés à la commune de Villeurbanne (code INSEE 69266) portant sur un appartement, puis compté les étiquettes une par une. Extraction du 11 octobre 2026 : **49 717 diagnostics, établis entre le 1er juillet 2021 et le 5 octobre 2026**." },
      { type: "p", text: "Trois limites, à connaître pour lire ces chiffres correctement :" },
      { type: "ul", items: [
        "**Ce n'est pas un recensement du parc, c'est le stock des DPE réalisés.** Un logement jamais diagnostiqué depuis juillet 2021 n'y figure pas. Ces chiffres décrivent donc les logements qui sont passés sur le marché — vendus, mis en location ou diagnostiqués volontairement — ce qui est précisément la population utile à un vendeur ou à un bailleur.",
        "**Un même logement peut y figurer plusieurs fois**, s'il a été diagnostiqué deux fois depuis 2021. La base ne permet pas de dédoublonner de façon fiable, et nous ne l'avons pas fait.",
        "**Les parts sont arrondies au centième**, donc une colonne de pourcentages ne fait pas exactement 100 %. Les effectifs, eux, sont exacts et se somment.",
      ] },
      { type: "p", text: "Les comparaisons France et Lyon sont calculées sur la même base et avec le même filtre (appartements), pour que l'écart mesure une différence de parc et non une différence de méthode : **10 646 482 appartements diagnostiqués en France** et **209 444 dans les neuf arrondissements de Lyon**." },
      { type: "p", text: "Les règles citées, elles, proviennent de sources officielles :" },
      { type: "ul", items: [
        "[Diagnostic de performance énergétique (DPE)](https://www.service-public.gouv.fr/particuliers/vosdroits/F16096), Service-Public — fiche vérifiée le 1er janvier 2026 : facteur de conversion, durée de validité, seuils des logements de 40 m² ou moins.",
        "[Quels sont les diagnostics immobiliers qu'un bailleur doit fournir au locataire ?](https://www.service-public.gouv.fr/particuliers/vosdroits/F33463), Service-Public — fiche vérifiée le 20 février 2026 : calendrier d'interdiction de location.",
        "[Audit énergétique en cas de vente d'un bien immobilier dit « passoire thermique »](https://www.service-public.gouv.fr/particuliers/vosdroits/F37110), Service-Public — fiche vérifiée le 14 septembre 2026 : périmètre de l'audit.",
        "[Diagnostic de performance énergétique](https://www.ecologie.gouv.fr/politiques-publiques/diagnostic-performance-energetique-dpe), ministère chargé de la Transition écologique : calendrier du DPE collectif en copropriété.",
        "[Diagnostic de performance énergétique collectif (DPE collectif)](https://www.justice.fr/fiche/diagnostic-performance-energetique-collectif-dpe-collectif), ministère de la Justice — fiche mise à jour le 1er janvier 2026 : bâtiments assujettis, calendrier par nombre de lots, durée de validité et exception des classes A, B ou C.",
        "[Diagnostic de performance énergétique, analyse juridique n° 2021-09](https://www.anil.org/aj-dpe/), ANIL — à jour au 29 août 2025 : condition du permis de construire déposé avant le 1er janvier 2013, renvoi au calendrier de l'article 158 VI de la loi du 22 août 2021 et à l'article L126-31 du code de la construction et de l'habitation.",
      ] },
      { type: "p", text: "Si vous vous demandez ce que votre étiquette change sur le prix, nos [prix au m² réels par quartier](/blog/prix-immobilier-villeurbanne-2026) donnent le point de départ, et notre page [vendre son bien à Villeurbanne](/vendre) le net vendeur une fois les honoraires déduits." },
    ],
    faq: [
      {
        q: "Combien y a-t-il de passoires énergétiques à Villeurbanne ?",
        a: "2 454 appartements villeurbannais sont classés F ou G, sur 49 717 appartements disposant d'un DPE, soit 4,94 %. C'est moins que la moyenne française (7,05 %) et que Lyon (6,72 %), sur la même base et le même filtre. Comptage Markus Immobilier dans la base DPE Logements existants de l'ADEME, extraction du 11 octobre 2026.",
      },
      {
        q: "Quelle est l'étiquette DPE la plus fréquente à Villeurbanne ?",
        a: "C'est l'étiquette C, avec 25 614 appartements sur 49 717, soit 51,52 % du parc diagnostiqué — contre 41,77 % au niveau national. Viennent ensuite le D (28,76 %) et le E (10,86 %). Les étiquettes A et B restent rares : 1 953 appartements à elles deux, soit 3,92 %.",
      },
      {
        q: "Quel est le risque d'avoir un DPE F ou G selon l'année de construction de l'immeuble ?",
        a: "À Villeurbanne, 12,37 % des appartements construits avant 1948 sont classés F ou G, et 7,60 % de ceux construits entre 1948 et 1974. À partir de 1978, la part tombe sous 1 %. La rupture se situe en 1975, année de la première réglementation thermique : 9,49 % de passoires avant cette date, 0,38 % après, soit 25 fois moins souvent.",
      },
      {
        q: "Mon appartement est chauffé à l'électricité et classé F : que change le 1er janvier 2026 ?",
        a: "Depuis le 1er janvier 2026, le facteur de conversion de l'électricité en énergie primaire passe de 2,3 à 1,9, ce qui améliore l'étiquette d'un logement électrique sans aucun travaux. Un DPE réalisé en 2025 ou avant reste valable et peut être mis à jour gratuitement, sans nouvelle visite, sur le site de l'ADEME. À Villeurbanne, 1 287 appartements classés F ou G sont chauffés à l'électricité, dont 1 077 avec un DPE établi avant cette date.",
      },
      {
        q: "Faut-il un audit énergétique pour vendre un appartement classé F ou G ?",
        a: "Non, pas pour un lot de copropriété. L'audit énergétique obligatoire en cas de vente ne concerne que les maisons individuelles et les immeubles de plusieurs logements dont le vendeur est l'unique propriétaire, classés E, F ou G, pour les ventes signées depuis le 1er avril 2023. À Villeurbanne, 49 717 des 51 951 diagnostics enregistrés portent sur des appartements : l'immense majorité des ventes n'est donc pas concernée. Le DPE, lui, reste obligatoire dans tous les cas.",
      },
      {
        q: "À partir de quand un logement classé E ou F ne pourra-t-il plus être loué ?",
        a: "La classe F est interdite à la location à partir de 2028 et la classe E à partir de 2034 ; la classe G l'est déjà depuis le 1er janvier 2025, renouvellement et reconduction tacite du bail inclus. À Villeurbanne, cela représente 811 appartements classés G, 1 643 classés F et 5 399 classés E, soit 7 853 logements diagnostiqués et 15,8 % du parc à l'horizon 2034.",
      },
      {
        q: "Les petites surfaces sont-elles plus souvent des passoires énergétiques ?",
        a: "Oui, à Villeurbanne. 6,26 % des appartements de 40 m² ou moins sont classés F ou G, contre 4,16 % au-dessus de 40 m². Ces petits logements représentent 18 134 des appartements diagnostiqués, soit 36,5 % de ceux dont la surface est renseignée. Depuis le 1er juillet 2024, les seuils des étiquettes ont été adaptés pour les logements de 40 m² ou moins, et une attestation corrigée se télécharge gratuitement sur le site de l'ADEME.",
      },
      {
        q: "Le DPE collectif est-il obligatoire pour une petite copropriété ?",
        a: "Oui, en métropole, depuis le 1er janvier 2026 pour les copropriétés d'au plus 50 lots, dès lors que le permis de construire de l'immeuble a été déposé avant le 1er janvier 2013. Les deux paliers précédents sont échus eux aussi : le 1er janvier 2024 pour les immeubles en monopropriété et les copropriétés de plus de 200 lots, le 1er janvier 2025 pour celles de 50 à 200 lots. Les fiches officielles se recouvrent à 50 lots exactement, mais les deux dates étant passées, l'obligation s'applique dans les deux lectures. Ce DPE collectif porte sur le bâtiment entier, reste valable dix ans — sans renouvellement obligatoire si le bâtiment est classé A, B ou C — et ne remplace pas le DPE individuel exigé pour vendre ou louer un lot.",
      },
    ],
  },
  {
    slug: "diagnostics-obligatoires-vente",
    title: "Diagnostics obligatoires : durées de validité",
    metaDescription:
      "Quels diagnostics sont obligatoires pour vendre, et combien de temps chacun reste valable. Durées vérifiées sur les fiches officielles, appartement et maison.",
    h1: "Les diagnostics obligatoires pour vendre",
    excerpt:
      "La liste exacte des diagnostics à remettre à l'acquéreur, leur condition de déclenchement et la durée de validité de chacun en cas de vente — appartement et maison, qui n'ont pas la même liste.",
    date: "2026-05-12",
    updated: "2026-10-12",
    internalHref: "/vendre",
    internalLabel: "Être accompagné pour ma vente",
    blocks: [
      { type: "p", text: "**Pour vendre un logement, le vendeur doit remettre à l'acquéreur un dossier de diagnostic technique (DDT), et la liste des pièces qu'il contient n'est pas la même pour un appartement et pour une maison.** Aucune de ces pièces n'est exigée dans tous les cas : chacune a une condition de déclenchement (l'âge du bâtiment, l'âge de l'installation, la zone) et une durée de validité propre, qui va de 6 mois à illimitée. Cette page donne les deux, condition et durée, vérifiées une par une sur les fiches officielles en vigueur." },
      { type: "p", text: "Le DDT doit être joint à la promesse de vente ou à l'acte de vente. Un dossier incomplet ne bloque pas juridiquement la signature, mais il prive le vendeur de la clause qui l'exonère des vices cachés — c'est le vrai risque, et il est détaillé plus bas." },
      { type: "h2", text: "Quels diagnostics faut-il pour vendre un appartement ?" },
      { type: "p", text: "**Pour un appartement, la liste officielle comporte dix pièces possibles, dont une seule est due dans tous les cas : le DPE.** Les neuf autres ne sont exigées que si leur condition est remplie. S'y ajoutent deux mentions qui ne sont pas des diagnostics mais doivent figurer dans la promesse ou l'acte : [la surface privative (loi Carrez)](/blog/loi-carrez-surface) et, dans les zones concernées, le risque de mérule." },
      { type: "ul", items: [
        "**[DPE](/blog/dpe-2026-ce-qui-change)** — dû sans condition de surface pour un appartement.",
        "**Constat de risque d'exposition au plomb (CREP)** — si le logement a été construit avant le 1er janvier 1949.",
        "**État d'amiante** — si le permis de construire a été délivré avant le 1er juillet 1997.",
        "**État de l'installation intérieure d'électricité** — si l'installation a plus de 15 ans.",
        "**État de l'installation intérieure de gaz** — si l'installation a plus de 15 ans.",
        "**Diagnostic assainissement des eaux usées** — si le logement est équipé d'une installation autonome ; et, pour l'assainissement collectif, uniquement sur certains territoires ou s'il existe un arrêté municipal fixant cette obligation.",
        "**État relatif à la présence de termites** — si le logement est situé dans une zone déclarée infestée, ou susceptible de l'être à court terme, par arrêté préfectoral.",
        "**État des risques** — si le logement est situé dans une zone ou un périmètre à risques (notamment naturels, miniers, sismiques, radon).",
        "**Diagnostic Bruit** — si le logement est situé dans une zone d'exposition au bruit des aéroports.",
        "**Carnet d'information du logement (CIL)** — si le logement a fait l'objet d'un permis de construire ou d'une déclaration préalable déposé à partir du 1er janvier 2023, ou de travaux de rénovation depuis cette date.",
      ] },
      { type: "p", text: "Les **durées de validité** de chacune de ces pièces sont dans le tableau plus bas. Pour un lot de copropriété, le DDT s'insère dans un dossier plus large — règlement, procès-verbaux, état daté — dont la composition est détaillée dans notre fiche sur [les charges de copropriété](/blog/charges-copropriete)." },
      { type: "h2", text: "Et pour une maison, la liste est-elle la même ?" },
      { type: "p", text: "**Non, et elle diffère sur deux points qui comptent.** D'une part le DPE n'est dû que si la surface de plancher de la maison atteint 50 m². D'autre part s'ajoute une pièce qu'un appartement vendu seul ne connaît pas : **l'audit énergétique**, exigé lorsque l'étiquette énergétique de la maison est **E, F ou G**." },
      { type: "p", text: "Cette seconde différence est la source d'erreur la plus courante sur le sujet. L'audit énergétique ne vise que **les maisons individuelles et les immeubles de plusieurs logements dont le vendeur est l'unique propriétaire** : un appartement vendu seul en copropriété n'y est **pas** soumis, quelle que soit son étiquette. À Villeurbanne, l'écart de population est massif — sur les 51 951 diagnostics enregistrés dans la commune, **49 717 portent sur des appartements, contre 1 159 sur des maisons** et 1 075 sur des immeubles entiers. Le détail du calendrier énergétique et de ce qu'il change pour un vendeur villeurbannais est sur [ce qui change pour le DPE](/blog/dpe-2026-ce-qui-change)." },
      { type: "h2", text: "Combien de temps chaque diagnostic reste-t-il valable ?" },
      { type: "p", text: "**Les durées vont de 6 mois à illimitée, et deux d'entre elles sont plus courtes en vente qu'en location** : l'électricité et le gaz valent 3 ans pour vendre, contre 6 ans pour louer. C'est l'erreur classique du propriétaire qui réutilise un diagnostic fait pour un bail. Le tableau ci-dessous donne, pour le cas d'un appartement, la condition de déclenchement et la validité en cas de vente." },
      {
        type: "table",
        caption: "Conditions et durées de validité des diagnostics, en cas de vente d'un appartement",
        source:
          "Vérifié pièce par pièce sur service-public.gouv.fr le 12 octobre 2026 : fiche F10798 (liste des diagnostics, vérifiée le 7 mars 2025), F16096 (DPE, 1er janvier 2026), F1142 (plomb, 17 août 2026), F742 (amiante, 6 décembre 2024), F18692 (électricité, 17 septembre 2026), F17337 (gaz, 17 septembre 2026), F31685 (assainissement, 26 février 2025), F3150 (termites, 26 février 2026), F12239 (état des risques, 28 septembre 2026).",
        headers: ["Diagnostic", "Dû dans quel cas", "Validité en cas de vente"],
        rows: [
          ["DPE", "Tout appartement, sans condition de surface", "10 ans, s'il a été réalisé depuis le 1er juillet 2021"],
          ["Plomb (CREP)", "Construction avant le 1er janvier 1949", "Illimitée si absence de plomb ou concentration inférieure à 1 mg/cm² ; moins de 1 an si la concentration dépasse 1 mg/cm²"],
          ["Amiante", "Permis de construire délivré avant le 1er juillet 1997", "Illimitée s'il a été réalisé à partir du 1er avril 2013 ; à refaire avant la vente s'il est antérieur"],
          ["Électricité", "Installation de plus de 15 ans", "Moins de 3 ans à la promesse ou à l'acte (6 ans en location)"],
          ["Gaz", "Installation de plus de 15 ans", "Moins de 3 ans à la promesse ou à l'acte (6 ans en location)"],
          ["Assainissement non collectif", "Installation autonome", "Moins de 3 ans à l'acte authentique"],
          ["Assainissement collectif", "Certains territoires, ou arrêté municipal", "10 ans au maximum à l'acte authentique"],
          ["Termites", "Zone déclarée par arrêté préfectoral", "6 mois au maximum"],
          ["État des risques", "Zone ou périmètre à risques", "Moins de 6 mois, et à actualiser si les informations ne sont plus exactes à la signature"],
          ["Diagnostic Bruit", "Zone d'exposition au bruit des aéroports", "Aucune durée fixée par la fiche officielle"],
          ["Carnet d'information du logement", "Permis ou déclaration préalable déposé depuis le 1er janvier 2023, ou travaux de rénovation depuis cette date", "Document remis à l'acquéreur, sans durée de validité"],
        ],
      },
      { type: "h2", text: "Un DPE réalisé en 2019 est-il encore valable pour vendre ?" },
      { type: "p", text: "**Non.** Les DPE réalisés entre le 1er janvier 2018 et le 30 juin 2021 **ne sont plus valables depuis le 1er janvier 2025** et doivent être refaits avant une mise en vente. La règle des 10 ans ne s'applique qu'aux DPE réalisés **depuis le 1er juillet 2021** : c'est à cette date que la méthode de calcul a changé." },
      { type: "p", text: "La confusion est facile et coûteuse : un vendeur qui détient un DPE de 2019 le croit valable jusqu'en 2029, alors qu'il est caduc depuis plus d'un an. Un DPE sans numéro d'identification délivré par l'ADEME au diagnostiqueur n'est, lui, pas valable du tout." },
      { type: "h2", text: "Quels diagnostics concernent réellement un appartement à Villeurbanne ?" },
      { type: "p", text: "**Deux conditions de déclenchement se mesurent sur le parc local, et elles ne concernent pas une minorité de biens : l'âge du bâti rend le constat plomb dû pour au moins un appartement villeurbannais sur cinq, et l'état d'amiante pour au moins trois sur cinq.** Les comptages ci-dessous viennent de la base DPE de l'ADEME, filtrée sur le code INSEE de Villeurbanne (69266) et sur les appartements, soit 49 717 logements diagnostiqués." },
      { type: "ul", items: [
        "**Plomb : au moins 9 856 appartements concernés, soit 19,8 % du parc diagnostiqué.** C'est le nombre d'appartements dont la période de construction est antérieure à 1948. Le seuil légal étant le 1er janvier 1949, les logements construits en 1948 sont aussi concernés mais se trouvent fondus dans la tranche « 1948-1974 » de la base : **le compte réel est donc un peu supérieur**, jamais inférieur.",
        "**Amiante : au moins 30 346 appartements concernés, soit 61,0 % du parc diagnostiqué.** Ce sont les tranches de construction allant jusqu'à 1988. S'y ajoute une partie de la tranche « 1989-2000 » (8 134 logements, 16,4 %), qui enjambe le seuil du 1er juillet 1997 et ne peut pas être départagée : la part réellement concernée est donc comprise **entre 61,0 % et 77,4 %**.",
        "**Un seul appartement sur 266 relève du carnet d'information du logement** au titre de sa construction : 187 appartements diagnostiqués ont été construits après 2021. Les travaux de rénovation menés depuis le 1er janvier 2023 en ouvrent d'autres, que la base ne permet pas de compter.",
      ] },
      { type: "p", text: "⚠️ Une limite de méthode à garder en tête pour l'amiante : la base ADEME renseigne une **période de construction**, alors que le texte retient la date de délivrance du **permis de construire**, nécessairement antérieure. Les deux bornes ci-dessus encadrent la réalité, elles ne la mesurent pas au logement près." },
      { type: "p", text: "Quant à l'état des risques, les risques recensés pour Villeurbanne sont publics et tiennent en six familles : **inondation** (crue à débordement lent, remontées de nappes naturelles), **séisme**, **phénomènes liés à l'atmosphère** (tempête et vent, foudre, grêle, neige et pluies verglaçantes), **radon**, **rupture de barrage** et **transport de marchandises dangereuses**. Aucun risque minier n'y figure. Toute annonce de vente d'un bien devant faire l'objet d'un état des risques doit par ailleurs porter la mention renvoyant au site Géorisques." },
      { type: "p", text: "Pour savoir ce que ces diagnostics changent au prix que vous pouvez attendre, le détail par quartier est dans [les prix au m² à Villeurbanne](/blog/prix-immobilier-villeurbanne-2026)." },
      { type: "h2", text: "Que risque un vendeur qui oublie un diagnostic ?" },
      { type: "p", text: "**Le risque principal n'est pas une amende, c'est la perte de la protection contre les vices cachés.** Un vendeur qui ne transmet pas une pièce du DDT ne peut pas être exonéré de la garantie des vices cachés : l'acquéreur peut saisir le tribunal judiciaire du lieu du bien pour demander l'annulation de la vente ou des dommages et intérêts, parfois des années après la signature." },
      { type: "p", text: "S'y ajoute une amende distincte, qui vise le choix du professionnel : faire appel à un diagnostiqueur **non certifié** expose le vendeur à **1 500 €**, portés à **3 000 € en cas de récidive**. La certification du diagnostiqueur se vérifie gratuitement sur l'annuaire officiel des diagnostiqueurs certifiés." },
      { type: "h2", text: "À quel moment faire réaliser les diagnostics ?" },
      { type: "p", text: "**Avant la mise en vente pour la plupart, mais pas pour tous : l'état des risques et l'état relatif aux termites ne valent que 6 mois, et les commander trop tôt oblige à les refaire.** La bonne séquence est donc de lancer d'abord le DPE — obligatoire dès l'annonce — puis les diagnostics à validité longue ou illimitée, et de garder les deux pièces à 6 mois pour le moment où un acquéreur se présente." },
      { type: "p", text: "Le DPE a une raison de plus de passer en premier : son étiquette doit figurer dans l'annonce. Un dossier complet au moment du compromis évite de décaler la signature, et c'est aussi ce qui déclenche proprement le délai de rétractation de l'acquéreur. Si vous préférez déléguer la coordination des diagnostiqueurs, c'est une des choses que nous prenons en charge dans un [accompagnement de vente](/vendre)." },
    ],
    faq: [
      {
        q: "Combien de temps un diagnostic électricité est-il valable pour vendre ?",
        a: "Moins de 3 ans à la date de la promesse de vente ou de l'acte authentique. Attention à ne pas le confondre avec la durée applicable en location, qui est de 6 ans : un diagnostic réalisé pour un bail peut donc être périmé pour une vente. La même règle de 3 ans vaut pour le diagnostic gaz.",
      },
      {
        q: "Mon DPE de 2019 est-il encore valable pour mettre mon appartement en vente ?",
        a: "Non. Les DPE réalisés entre le 1er janvier 2018 et le 30 juin 2021 ne sont plus valables depuis le 1er janvier 2025 et doivent être refaits. Seuls les DPE réalisés depuis le 1er juillet 2021 sont valables 10 ans, parce que la méthode de calcul a changé à cette date.",
      },
      {
        q: "L'audit énergétique est-il obligatoire pour vendre un appartement classé F ou G ?",
        a: "Non. L'audit énergétique ne concerne que les maisons individuelles et les immeubles de plusieurs logements dont le vendeur est l'unique propriétaire, pour les étiquettes E, F ou G. Un appartement vendu seul en copropriété n'y est pas soumis, quelle que soit son étiquette. À Villeurbanne, 49 717 des 51 951 diagnostics enregistrés portent sur des appartements : l'immense majorité des ventes locales échappe donc à l'audit, mais pas au DPE.",
      },
      {
        q: "Le diagnostic plomb est-il obligatoire à Villeurbanne ?",
        a: "Il l'est pour les logements construits avant le 1er janvier 1949, ce qui représente au moins 9 856 des 49 717 appartements villeurbannais diagnostiqués, soit 19,8 % du parc. Le chiffre est un minimum : la base de l'ADEME regroupe les constructions de 1948 avec celles de la période 1948-1974, alors qu'elles sont elles aussi concernées.",
      },
      {
        q: "Combien de temps l'état des risques reste-t-il valable ?",
        a: "Moins de 6 mois, et il doit être actualisé si les informations qu'il contient ne sont plus exactes à la date de signature de la promesse ou de l'acte. C'est la durée la plus courte du dossier, avec le diagnostic termites : mieux vaut donc les commander une fois l'acquéreur trouvé plutôt qu'au moment de la mise en vente.",
      },
      {
        q: "Que risque le vendeur s'il manque un diagnostic au dossier ?",
        a: "Il perd le bénéfice de la clause qui l'exonère des vices cachés : l'acquéreur peut saisir le tribunal judiciaire pour demander l'annulation de la vente ou des dommages et intérêts. Une amende distincte de 1 500 € s'applique par ailleurs au vendeur qui fait appel à un diagnostiqueur non certifié, portée à 3 000 € en cas de récidive.",
      },
    ],
  },
  {
    slug: "gestion-locative-villeurbanne-deleguer-ou-non",
    title: "Que fait une agence de gestion locative, concrètement ?",
    metaDescription:
      "Un mandat de gestion couvre la recherche du locataire, le bail, les états des lieux, l'encaissement des loyers, les impayés et les sinistres. Ce qui reste au propriétaire, et ce qui est facturé à part.",
    h1: "Que fait une agence quand vous lui confiez la gestion locative ?",
    excerpt:
      "Un mandat de gestion couvre six familles de tâches : trouver le locataire, rédiger le bail, les états des lieux, encaisser les loyers, traiter impayés et sinistres, suivre les obligations légales. Trois choses restent au propriétaire.",
    date: "2026-05-19",
    updated: "2026-10-01",
    internalHref: "/gestion-locative",
    internalLabel: "Déléguer ou gérer seul : le calcul chiffré",
    blocks: [
      { type: "p", text: "**Un mandat de gestion locative couvre six familles de tâches : trouver et sélectionner le locataire, rédiger le bail, établir les états des lieux, encaisser les loyers et émettre les quittances, traiter les impayés et les sinistres, suivre les obligations légales du bailleur.** Trois décisions restent au propriétaire, quoi qu'il arrive : les travaux, les votes en assemblée de copropriété et la déclaration fiscale des revenus fonciers. Cet article décrit le partage des tâches ; si votre question est plutôt **faut-il déléguer ou gérer seul**, l'arbitrage chiffré au loyer médian villeurbannais est sur [déléguer ou gérer seul : le calcul](/gestion-locative)." },
      { type: "h2", text: "Que fait l'agence à votre place, précisément ?" },
      { type: "p", text: "Elle prend en charge la vie courante du logement loué, du candidat locataire à la quittance mensuelle. Concrètement, six blocs de tâches :" },
      { type: "ul", items: [
        "**Recherche et sélection du locataire** : diffusion, visites, constitution des dossiers et vérification des pièces justificatives.",
        "**Rédaction du bail** et de ses annexes (diagnostics, règlement de copropriété, notice d'information).",
        "**États des lieux** d'entrée et de sortie, et comparaison des deux.",
        "**Encaissement des loyers**, quittances, décompte annuel des charges, révision du loyer selon l'indice de référence.",
        "**Impayés et sinistres** : relances, mise en œuvre de la garantie si elle a été souscrite, déclaration et suivi du sinistre.",
        "**Obligations légales du bailleur** : renouvellement des diagnostics, décence du logement, calendrier énergétique du DPE.",
      ] },
      { type: "h2", text: "Qu'est-ce qui reste au propriétaire, même en gestion déléguée ?" },
      { type: "p", text: "Trois choses, et elles ne se délèguent pas. **Les travaux** : l'agence obtient les devis, suit le chantier et le réceptionne, mais c'est vous qui décidez de les engager. **Les votes en assemblée générale de copropriété** : la voix appartient au propriétaire du lot, pas au gestionnaire. **La déclaration fiscale** : les revenus fonciers se déclarent à votre nom, l'agence ne fournit qu'un état comptable et, en option, un document d'aide." },
      { type: "p", text: "À cela s'ajoute l'assurance propriétaire non occupant, obligatoire en copropriété : elle reste souscrite par vous, à votre nom." },
      { type: "h2", text: "Qui choisit le locataire, l'agence ou le propriétaire ?" },
      { type: "p", text: "**Le choix final appartient au propriétaire.** L'agence diffuse l'annonce, fait visiter, réunit les dossiers et vérifie les pièces — dans la limite de la liste fixée par décret, qui interdit de réclamer autre chose — puis vous présente les candidatures recevables. Un refus ne peut en aucun cas reposer sur un critère discriminatoire : c'est la raison pour laquelle le tri se fait sur des éléments vérifiables, essentiellement la stabilité et le niveau des ressources." },
      { type: "h2", text: "La mise en location est-elle comprise dans les honoraires de gestion ?" },
      { type: "p", text: "**Non : ce sont deux prestations distinctes, facturées séparément.** La mise en location — trouver le locataire et signer le bail — est facturée une fois, à l'entrée : chez Markus Immobilier, **9 % du loyer annuel hors charges** côté propriétaire. La gestion courante, elle, est un pourcentage mensuel des encaissements : **6 % du total des encaissements par lot**, minimum 25 €, auxquels s'ajoutent 20 € par an de frais et débours et 45 € par lot et par an si vous souhaitez recevoir les courriers par voie postale. [Le barème complet est public, ligne par ligne](/honoraires), y compris les interventions occasionnelles." },
      { type: "p", text: "La garantie loyers impayés est une option distincte, à **2,5 %**. Pour le détail de ce que le pourcentage couvre et de ce qui se facture à l'unité, voir [combien coûte vraiment une gestion locative](/blog/cout-gestion-locative)." },
      { type: "h2", text: "Alors, faut-il déléguer ou gérer soi-même ?" },
      { type: "p", text: "**Cette question ne se tranche pas sur le taux, mais sur la vacance et le risque d'impayé** : au loyer médian villeurbannais, une année de gestion déléguée coûte moins qu'un seul mois de logement vide. Le calcul complet — coût net après impôt selon votre régime fiscal, ce que le bailleur qui gère seul doit faire et ce qu'il risque en euros — est développé sur [déléguer sa gestion locative ou gérer seul : le calcul à Villeurbanne](/gestion-locative). C'est cette page qui porte la comparaison ; celle-ci se limite au contenu du mandat." },
    ],
    faq: [
      {
        q: "Peut-on confier la mise en location à une agence sans lui confier la gestion ?",
        a: "Oui. Ce sont deux mandats différents : la mise en location est facturée une fois, à l'entrée du locataire (9 % du loyer annuel hors charges côté propriétaire dans notre barème), et vous pouvez en rester là et gérer ensuite le bien vous-même. La gestion courante, facturée 6 % des encaissements mensuels par lot (minimum 25 €), est une prestation continue qui se souscrit à part.",
      },
      {
        q: "Le propriétaire choisit-il lui-même le locataire ?",
        a: "Oui, la décision finale lui revient. L'agence réunit les candidatures, vérifie les pièces justificatives dans la limite de la liste fixée par décret, puis présente les dossiers recevables. Le refus d'un candidat ne peut pas reposer sur un critère discriminatoire : la sélection se fonde sur des éléments vérifiables, essentiellement la stabilité et le niveau des ressources.",
      },
      {
        q: "Qui s'occupe de l'état des lieux de sortie et de la restitution du dépôt de garantie ?",
        a: "L'agence réalise l'état des lieux de sortie, le compare à celui d'entrée, chiffre les éventuelles retenues et restitue le dépôt de garantie dans le délai légal — un mois si l'état des lieux de sortie est conforme à celui d'entrée, deux mois sinon. Le retard de restitution est sanctionné par une majoration de 10 % du loyer mensuel hors charges par mois de retard entamé (article 22 de la loi du 6 juillet 1989).",
      },
    ],
  },
  {
    slug: "investir-locatif-lyon",
    title:
      "Investir en locatif à Villeurbanne : le prix affiché n'est pas le prix signé",
    metaDescription:
      "Les prix au m² publiés pour Villeurbanne dépassent de 16 à 45 % les prix d'appartements réellement signés en 2025 (base DVF). Écarts quartier par quartier, sources comparées une par une, et la méthode pour vérifier vous-même.",
    h1: "Investir en locatif à Villeurbanne : le prix affiché n'est pas le prix que vous paierez",
    excerpt:
      "Un site spécialisé annonce Villeurbanne à 4 380 €/m² ; les 1 875 ventes d'appartements signées en 2025 donnent 3 567 €/m². Sur un T2 de 45 m², l'écart vaut 36 585 € — et jusqu'à 71 820 € sur Charpennes. Quatre sources comparées ligne à ligne.",
    date: "2026-05-26",
    updated: "2026-09-27",
    internalHref: "/estimation",
    internalLabel: "Estimer un bien avant d'investir",
    blocks: [
      { type: "p", text: "**Les prix au m² publiés en ligne pour Villeurbanne dépassent de 16 à 45 % les prix des appartements réellement signés dans le même secteur.** Sur la commune entière, un site spécialisé dans l'investissement annonce 4 380 €/m² là où les 1 875 ventes d'appartements enregistrées en 2025 dans la base DVF donnent une médiane de 3 567 €/m². Sur un T2 de 45 m² — la cible la plus courante d'un premier investissement locatif — l'écart représente 36 585 €." },
      { type: "p", text: "Cet article ne compare pas des opinions, il compare des pages. Chaque chiffre attribué ci-dessous à un tiers a été relevé le 27 septembre 2026 directement sur la page qui le publie, jamais dans un résumé. Et il ne conclut pas que ces sites se trompent : il montre **quel prix ils mesurent**, pourquoi ce n'est pas celui que vous signerez chez le notaire, et comment vérifier le vôtre en cinq minutes." },

      { type: "h2", text: "Le prix au m² qu'on m'annonce à Villeurbanne est-il celui que je vais payer ?" },
      { type: "p", text: "**Non : sur les cinq prix au m² que quatre sources publient aujourd'hui pour les appartements de Villeurbanne, un seul dépasse 3 600 €/m².** Les quatre autres partent des ventes réellement enregistrées et se tiennent à moins de 1,5 % les uns des autres. Le cinquième, 4 380 €/m², mesure autre chose — et c'est le seul que sa page énonce sans dire d'où il vient." },
      {
        type: "table",
        caption:
          "Ce que publient quatre sources pour le prix au m² des appartements de Villeurbanne",
        headers: ["Source", "Prix au m²", "Nature du chiffre", "Période"],
        rows: [
          ["cpim.fr — réponse en tête d'article", "4 380 €/m²", "Prix moyen dans l'ancien, provenance non précisée", "Avril 2026"],
          ["cpim.fr — encadré DVF, bas de la même page", "3 548 €/m²", "Médiane des ventes enregistrées (3 550 ventes)", "2024-2025"],
          ["moninvestimmo.com", "3 548 €/m²", "Médiane DVF recalculée (3 550 ventes)", "2024-2025"],
          ["trackstone.fr", "3 520 €/m²", "Prix moyen des ventes", "2025"],
          ["Markus Immobilier", "3 567 €/m²", "Médiane des ventes d'appartements (1 875 ventes)", "2025"],
        ],
        source:
          "Relevés effectués le 27 septembre 2026 en téléchargeant chaque page : cpim.fr/villeurbanne-prix-m2-quartiers/ (page mise à jour le 11 août 2026), moninvestimmo.com/investir-villeurbanne-2026/ (20 août 2026), trackstone.fr/prix-immobilier/villeurbanne-69100. Notre médiane : ventes d'appartements DVF 2025 (data.gouv.fr / Etalab), calcul Markus Immobilier, extraction du 7 septembre 2026.",
      },
      { type: "p", text: "Quatre des cinq lignes tiennent dans un intervalle de **1,3 %** : 3 520, 3 548, 3 548 et 3 567 €/m². Trois acteurs indépendants qui partent des ventes enregistrées trouvent donc pratiquement le même prix que nous — c'est la meilleure vérification externe que [nos médianes par quartier](/blog/prix-immobilier-villeurbanne-2026) aient reçue à ce jour. Une seule ligne sort du lot." },

      { type: "h2", text: "Pourquoi la même page peut-elle afficher deux prix différents pour Villeurbanne ?" },
      { type: "p", text: "**Parce que les deux chiffres ne mesurent pas la même chose, et que le plus visible des deux n'est pas sourcé.** La page de cpim.fr consacrée aux prix par quartier de Villeurbanne, mise à jour le 11 août 2026, ouvre sur « Villeurbanne s'échange autour de 4 380 €/m² dans l'ancien en avril 2026 ». Plus bas, la même page publie un encadré explicitement sourcé sur les demandes de valeurs foncières : « Appartements 3 548 €/m², moitié des ventes entre 2 930 et 4 137 €/m², 3 550 ventes ». Les deux valeurs cohabitent sur la même URL, à 23 % d'écart. La page n'est pas avare de sources — elle renvoie à l'INSEE et aux Notaires de France, et source explicitement son encadré DVF ; c'est le 4 380 €/m² de la réponse en tête, celui qu'un lecteur pressé retiendra, qui n'en porte aucune." },
      { type: "p", text: "Le détail décisif est dans l'intervalle. **4 380 €/m² se situe au-dessus du prix payé pour les trois quarts des appartements réellement vendus à Villeurbanne**, puisque le quartile supérieur s'arrête à 4 137 €/m² d'après l'encadré de cette même page. Bâtir un plan de financement sur la réponse en tête d'article, c'est donc se préparer à payer plus cher que 75 % des acheteurs du secteur." },
      { type: "p", text: "L'explication qui vient spontanément est la différence entre moyenne et médiane : une moyenne est tirée vers le haut par les ventes exceptionnelles. **Elle ne suffit pas ici.** trackstone.fr publie précisément une moyenne — 3 520 €/m² sur les ventes de 2025 — et elle tombe 1,3 % **en dessous** de notre médiane, pas 23 % au-dessus. Ce qui creuse l'écart n'est donc pas le mode de calcul, c'est la nature du prix mesuré : un prix **demandé** dans une annonce, ou un prix **signé** chez un notaire." },

      { type: "h2", text: "De combien les prix affichés dépassent-ils les prix signés, quartier par quartier ?" },
      { type: "p", text: "**De 16,1 % sur Cusset à 45,3 % sur Charpennes.** Le tableau met en regard les prix moyens publiés par cpim.fr et les médianes des ventes d'appartements signées en 2025 dans les contours officiels correspondants, puis traduit l'écart en euros sur un T2 de 45 m²." },
      {
        type: "table",
        caption:
          "Prix affiché en ligne et prix médian réellement signé, par quartier de Villeurbanne",
        headers: [
          "Quartier (contour officiel)",
          "Prix affiché",
          "Médiane signée 2025",
          "Écart",
          "Sur un T2 de 45 m²",
        ],
        rows: [
          ["Charpennes – Tonkin", "5 120 €/m²", "3 524 €/m²", "+45,3 %", "71 820 €"],
          ["Buers – Croix-Luizet", "3 920 €/m²", "3 271 €/m²", "+19,8 %", "29 205 €"],
          ["Gratte-Ciel – Dedieu – Charmettes", "4 520 €/m²", "3 846 €/m²", "+17,5 %", "30 330 €"],
          ["Cusset – Bonnevay", "3 680 €/m²", "3 171 €/m²", "+16,1 %", "22 905 €"],
          ["Villeurbanne, commune entière", "4 380 €/m²", "3 567 €/m²", "+22,8 %", "36 585 €"],
        ],
        source:
          "Prix affichés relevés le 27 septembre 2026 sur cpim.fr/villeurbanne-prix-m2-quartiers/ (page mise à jour le 11 août 2026), qui les présente comme des prix moyens dans l'ancien. Médianes signées : ventes d'appartements DVF 2025 (data.gouv.fr / Etalab) rattachées aux contours officiels de quartiers de la Métropole de Lyon, calcul Markus Immobilier, extraction du 7 septembre 2026. Écart en euros = différence de prix au m² × 45 m².",
      },
      { type: "p", text: "**Un avertissement s'impose sur la ligne Charpennes, et il joue contre notre chiffre.** Les découpages ne coïncident pas : le contour officiel « Charpennes – Tonkin » englobe le Tonkin, que cpim.fr traite à part et situe à 3 920 €/m². Comparer « Charpennes » seul à « Charpennes – Tonkin » revient donc à comparer un sous-secteur cher à un ensemble plus large, ce qui gonfle mécaniquement l'écart. Les quatre autres lignes ne souffrent pas de ce biais dans les mêmes proportions. Nous publions quand même le +45,3 %, avec cette réserve écrite : un écart de périmètre n'est pas un mensonge, encore faut-il savoir de quoi on parle." },
      { type: "p", text: "Un contre-exemple montre d'ailleurs que le problème n'est pas « les autres sites ». moninvestimmo.com, dans un article du 20 août 2026, publie des médianes explicitement tirées du DVF 2024-2025 et **tombe à quelques points des nôtres** : Cusset à environ 3 150 €/m² quand nous donnons 3 171 sur Cusset – Bonnevay, Gratte-Ciel à environ 3 940 contre 3 846, Grandclément à environ 3 460 contre 3 375 sur Perralière – Grandclément. Qui part des ventes enregistrées arrive au même endroit. La ligne de partage ne sépare pas les sites entre eux, elle sépare **les prix demandés des prix signés**." },

      { type: "h2", text: "Quel prix retenir pour bâtir son plan de financement ?" },
      { type: "p", text: "**La médiane des ventes signées du quartier, jamais le prix moyen affiché en ligne.** C'est le seul des deux chiffres qui décrive des transactions abouties, et c'est celui sur lequel un notaire et une banque travailleront. Le prix affiché garde une utilité, mais elle est autre : il indique ce que les vendeurs espèrent aujourd'hui, donc le point de départ d'une négociation — pas son point d'arrivée." },
      { type: "p", text: "Deux conséquences pratiques. D'abord, **l'écart de prix d'achat se répercute presque intégralement sur le rendement** : un même loyer divisé par un prix 20 % plus élevé fait perdre environ un sixième du rendement brut. C'est pour cette raison que nous calculons le [rendement locatif brut des sept quartiers de Villeurbanne](/blog/rentabilite-locative-lyon) sur les prix signés, et non sur des prix d'annonce. Ensuite, **une médiane de quartier n'est pas le prix de votre bien** : à surface égale, l'étage, l'ascenseur, l'extérieur et le DPE font varier le prix réel à l'intérieur d'un même secteur — nous avons [mesuré cette dispersion quartile par quartile](/blog/estimation-en-ligne-ou-agence)." },
      { type: "p", text: "Et n'oubliez pas les frais d'acquisition, qui s'ajoutent au prix signé sans jamais figurer dans un prix au m² : comptez 7 à 8 % dans l'ancien, soit environ 12 000 € sur un T2 de 45 m² acheté au prix médian de Cusset – Bonnevay." },

      { type: "h2", text: "Comment vérifier soi-même le prix réellement payé pour un appartement à Villeurbanne ?" },
      { type: "p", text: "**En consultant gratuitement la base DVF de l'État, qui publie le prix réel de chaque vente enregistrée par les notaires, adresse par adresse.** Comptez cinq minutes, sans créer de compte. La procédure tient en cinq étapes." },
      { type: "ol", items: [
        "Ouvrez l'explorateur officiel des demandes de valeurs foncières, sur **app.dvf.etalab.gouv.fr**, et cherchez l'adresse ou la rue visée.",
        "Cliquez sur la parcelle : les ventes enregistrées s'affichent avec leur date, leur prix, leur surface bâtie et leur nature (appartement, maison, dépendance).",
        "Écartez ce qui n'est pas comparable — les mutations qui regroupent plusieurs lots, les surfaces inférieures à 10 m² et les valeurs manifestement aberrantes.",
        "Divisez le prix par la surface de chaque vente retenue, puis prenez la **médiane** de ces prix au m² : une seule vente atypique suffit à déformer une moyenne.",
        "Comparez le résultat au prix demandé dans l'annonce. L'écart constitue votre marge de discussion, à ajuster ensuite pour l'étage, l'état du bien et le DPE.",
      ] },
      { type: "p", text: "Deux limites à garder en tête. La base DVF est **révisée rétroactivement** à chaque publication : les chiffres d'une année donnée peuvent bouger de quelques euros après coup, ce qui est la raison pour laquelle nous datons chaque extraction. Et elle ne décrit que le prix, la surface et la date : ni l'étage, ni l'état, ni le DPE, ni la qualité de la copropriété n'y figurent. C'est précisément ce qu'une visite apporte en plus d'un tableau." },

      { type: "h2", text: "Que ne disent pas ces écarts ?" },
      { type: "p", text: "**Un prix affiché supérieur au prix signé n'est pas un prix mensonger** : c'est, le plus souvent, un prix d'annonce mesuré à un autre moment et sur un autre échantillon. Dans un marché tendu, certaines ventes se concluent d'ailleurs au-dessus du prix demandé. Trois limites doivent donc accompagner la lecture du tableau." },
      { type: "ul", items: [
        "**Les périmètres diffèrent.** Nous utilisons les contours officiels de quartiers de la Métropole de Lyon ; les sites nationaux emploient souvent un découpage maison, sous le même nom. C'est la réserve posée plus haut sur Charpennes.",
        "**Les périodes diffèrent.** Nos médianes portent sur l'année 2025 close ; les prix affichés sont datés d'avril ou d'août 2026. Un marché qui remonte creuse une partie de l'écart sans que personne ne se trompe.",
        "**Le DVF décrit le passé.** Il enregistre des ventes signées, donc négociées plusieurs mois plus tôt. C'est un point d'ancrage solide, pas une prévision.",
      ] },
      { type: "p", text: "Enfin, le prix d'entrée n'est pas le seul critère d'un investissement locatif. Le nombre de ventes d'un quartier conditionne la facilité de revente, et tous n'ont pas résisté de la même façon depuis 2022 : ces deux séries sont publiées quartier par quartier dans [notre guide des quartiers de Villeurbanne](/blog/ou-acheter-villeurbanne-quartiers)." },
      { type: "p", text: "Si vous étudiez un bien précis, nous partons de ces mêmes ventes signées pour vous dire ce qu'il vaut réellement — et ce qu'il peut se louer — avant que vous ne fassiez une offre." },
    ],
    faq: [
      {
        q: "Pourquoi les prix au m² annoncés pour Villeurbanne sont-ils plus élevés que les prix réellement payés ?",
        a: "Parce qu'ils ne mesurent pas la même chose. Les prix affichés par les sites d'investissement décrivent le plus souvent des prix demandés dans les annonces, à un moment donné ; les prix signés viennent de la base DVF, qui enregistre le montant réel de chaque vente passée devant notaire. Sur Villeurbanne, l'écart mesuré en septembre 2026 va de 16,1 % à 45,3 % selon le quartier, et atteint 22,8 % sur la commune entière (4 380 €/m² affichés contre 3 567 €/m² de médiane signée en 2025).",
      },
      {
        q: "Quel est le prix au m² réel d'un appartement à Villeurbanne ?",
        a: "3 567 €/m² en médiane, calculés sur les 1 875 ventes d'appartements enregistrées à Villeurbanne en 2025 dans la base DVF. Deux autres sources qui partent des ventes réelles convergent : 3 548 €/m² pour la période 2024-2025 (3 550 ventes) et 3 520 €/m² de prix moyen pour 2025. Par quartier, la médiane va de 2 738 €/m² à Cyprian – Les Brosses à 3 923 €/m² à Ferrandière – Maisons-Neuves.",
      },
      {
        q: "Quel quartier de Villeurbanne présente le plus grand écart entre prix affiché et prix signé ?",
        a: "Charpennes, avec 5 120 €/m² affichés contre 3 524 €/m² de médiane signée en 2025 sur le contour officiel Charpennes – Tonkin, soit 45,3 % d'écart. Ce chiffre doit être lu avec une réserve : le contour officiel englobe le Tonkin, que la source affichant 5 120 €/m² traite séparément à 3 920 €/m². L'écart est donc en partie un effet de périmètre. Viennent ensuite Buers – Croix-Luizet (+19,8 %), Gratte-Ciel – Dedieu – Charmettes (+17,5 %) et Cusset – Bonnevay (+16,1 %).",
      },
      {
        q: "Où consulter gratuitement le prix réellement payé pour un appartement à Villeurbanne ?",
        a: "Sur l'explorateur officiel des demandes de valeurs foncières, app.dvf.etalab.gouv.fr, qui publie le prix, la surface et la date de chaque vente enregistrée par les notaires, adresse par adresse, sans création de compte. Il faut écarter les mutations regroupant plusieurs lots et les valeurs aberrantes, puis prendre la médiane des prix au m² obtenus. La base est révisée rétroactivement à chaque publication et ne renseigne ni l'étage, ni l'état du bien, ni le DPE.",
      },
      {
        q: "Faut-il se fier à une moyenne ou à une médiane de prix au m² ?",
        a: "À la médiane : elle sépare le marché en deux moitiés égales et résiste aux ventes exceptionnelles, qu'une moyenne laisse tirer le résultat vers le haut. Sur Villeurbanne, la différence entre les deux modes de calcul reste pourtant marginale — une moyenne indépendante des ventes 2025 donne 3 520 €/m², soit 1,3 % sous notre médiane de 3 567 €/m². Ce n'est donc pas le mode de calcul qui explique les écarts de 20 % observés avec les prix affichés, mais la nature du prix mesuré.",
      },
      {
        q: "De combien l'écart de prix change-t-il le budget d'un investissement locatif à Villeurbanne ?",
        a: "Sur un T2 de 45 m², l'écart entre prix affiché et médiane signée représente 22 905 € à Cusset – Bonnevay, 29 205 € à Buers – Croix-Luizet, 30 330 € à Gratte-Ciel – Dedieu – Charmettes et 71 820 € sur Charpennes – Tonkin, soit 36 585 € au niveau de la commune entière. À ces montants s'ajoutent les frais d'acquisition, 7 à 8 % du prix dans l'ancien, jamais compris dans un prix au m².",
      },
    ],
  },
  {
    slug: "ou-acheter-villeurbanne-quartiers",
    title: "Où acheter à Villeurbanne : quel quartier pour quel budget",
    metaDescription:
      "Quel quartier de Villeurbanne choisir pour acheter en 2026 ? Ce que 200 000, 250 000 et 300 000 € achètent vraiment quartier par quartier (ventes 2025, DVF).",
    h1: "Où acheter à Villeurbanne ? Le bon quartier selon votre budget",
    excerpt:
      "Avec 250 000 €, vous achetez 65 m² à Gratte-Ciel et 91 m² à Cyprian – Les Brosses. Ce que chaque budget permet vraiment, quartier par quartier, d'après les 1 875 ventes signées en 2025.",
    date: "2026-06-02",
    updated: "2026-09-09",
    internalHref: "/acheter",
    internalLabel: "Trouver le bon bien avec notre équipe",
    blocks: [
      { type: "p", text: "Avec un budget de **250 000 €**, vous achetez environ **65 m² à Gratte-Ciel** et **91 m² à Cyprian – Les Brosses** : 27 m² d'écart, pour le même prix, dans la même commune. C'est le premier chiffre à avoir en tête avant d'acheter à Villeurbanne. Le prix médian des appartements y va de **2 738 à 3 923 €/m² selon le quartier**, soit **43 % d'écart**, d'après les [1 875 ventes réellement signées en 2025](/blog/prix-immobilier-villeurbanne-2026)." },
      { type: "p", text: "Cet article ne classe pas les quartiers du « meilleur » au « moins bon » : ça ne veut rien dire tant qu'on ne connaît pas votre projet. Il traduit les prix réels en décisions concrètes — combien de mètres carrés votre budget achète où, quels secteurs se revendent le plus facilement, et ce que ces chiffres ne peuvent pas vous dire." },

      { type: "h2", text: "Dans quel quartier de Villeurbanne acheter avec 200 000, 250 000 ou 300 000 € ?" },
      { type: "p", text: "Avec 250 000 € — soit un peu plus que le prix médian d'un T3 à Villeurbanne (226 250 € en 2025) — vous visez environ **64 à 65 m² dans les deux quartiers les plus chers**, Ferrandière – Maisons-Neuves et Gratte-Ciel, contre **91 m² à Cyprian – Les Brosses**. Le tableau ci-dessous convertit trois budgets courants en surface, quartier par quartier." },
      {
        type: "table",
        caption:
          "Surface accessible par budget, au prix médian au m² de chaque quartier (2025)",
        headers: ["Quartier", "Médiane €/m²", "200 000 €", "250 000 €", "300 000 €"],
        rows: [
          ["Ferrandière – Maisons-Neuves", "3 923 €", "51 m²", "64 m²", "76 m²"],
          ["Gratte-Ciel – Dedieu – Charmettes", "3 846 €", "52 m²", "65 m²", "78 m²"],
          ["Charpennes – Tonkin", "3 524 €", "57 m²", "71 m²", "85 m²"],
          ["Perralière – Grandclément", "3 375 €", "59 m²", "74 m²", "89 m²"],
          ["Buers – Croix-Luizet", "3 271 €", "61 m²", "76 m²", "92 m²"],
          ["Cusset – Bonnevay", "3 171 €", "63 m²", "79 m²", "95 m²"],
          ["Cyprian – Les Brosses", "2 738 €", "73 m²", "91 m²", "110 m²"],
        ],
        source:
          "Calcul Markus Immobilier : budget ÷ prix médian au m² du quartier. Médianes établies sur les ventes d'appartements DVF 2025 (data.gouv.fr / Etalab) rattachées aux contours officiels des quartiers de la Métropole de Lyon, extraction du 7 septembre 2026. Surfaces hors frais d'acquisition.",
      },
      { type: "p", text: "Deux précautions d'usage. D'abord, ces surfaces sont **hors frais d'acquisition** : dans l'ancien, comptez 7 à 8 % du prix en plus, soit 18 000 à 20 000 € sur un achat à 250 000 €. Ensuite, un prix médian de quartier reste un **point de départ** : à surface égale, l'étage, l'ascenseur, l'extérieur et le DPE font varier le prix réel de 15 à 20 % à l'intérieur d'un même secteur." },

      { type: "h2", text: "Quels sont les quartiers les moins chers de Villeurbanne ?" },
      { type: "p", text: "**Cyprian – Les Brosses est le quartier le plus abordable de Villeurbanne, à 2 738 €/m²**, soit 23 % sous le prix médian de la commune (3 567 €/m²). Viennent ensuite **Cusset – Bonnevay** (3 171 €/m², −11 %) et **Buers – Croix-Luizet** (3 271 €/m², −8 %). À l'autre bout, Ferrandière – Maisons-Neuves et Gratte-Ciel se paient 8 à 10 % au-dessus de la médiane communale." },
      {
        type: "table",
        caption:
          "Positionnement de chaque quartier par rapport au prix médian de Villeurbanne (3 567 €/m², appartements, 2025)",
        headers: ["Quartier", "Écart au prix médian", "Ventes d'appartements en 2025"],
        rows: [
          ["Ferrandière – Maisons-Neuves", "+10,0 %", "187"],
          ["Gratte-Ciel – Dedieu – Charmettes", "+7,8 %", "655"],
          ["Charpennes – Tonkin", "−1,2 %", "200"],
          ["Perralière – Grandclément", "−5,4 %", "330"],
          ["Buers – Croix-Luizet", "−8,3 %", "223"],
          ["Cusset – Bonnevay", "−11,1 %", "213"],
          ["Cyprian – Les Brosses", "−23,2 %", "53"],
        ],
        source:
          "Sources : ventes DVF 2025 (data.gouv.fr / Etalab) et contours de quartiers de la Métropole de Lyon (data.grandlyon.com). Calcul Markus Immobilier, extraction du 7 septembre 2026. Le quartier Saint-Jean n'est pas listé : trop peu de ventes pour une médiane fiable.",
      },
      { type: "p", text: "Ne lisez pas ce classement comme un classement de qualité de vie. La médiane d'un quartier reflète surtout **le type de biens qui s'y vendent** — âge du bâti, surfaces, part de copropriétés récentes ou à rénover. Un T4 rénové avec balcon à Cyprian – Les Brosses peut parfaitement se payer plus cher au m² qu'un T2 sans ascenseur à Gratte-Ciel." },

      { type: "h2", text: "Quel quartier de Villeurbanne choisir pour un investissement locatif ?" },
      { type: "p", text: "À l'échelle de la commune, le rendement brut d'un appartement à Villeurbanne tourne autour de **4,9 %** : un loyer médian de 14,6 €/m² hors charges rapporté à un prix médian de 3 567 €/m². Mécaniquement, plus le prix d'achat est bas, plus le rendement affiché monte — mais le rendement brut ne dit rien de la vacance locative, des charges, de la taxe foncière ni des travaux." },
      { type: "p", text: "**Nous ne publions volontairement pas de rendement par quartier.** Le seul loyer de référence public disponible est communal : l'appliquer tel quel à chaque quartier reviendrait à inventer des rendements. Ce qui est vérifiable, en revanche, c'est la demande étudiante : **Charpennes – Tonkin et Buers – Croix-Luizet bordent le campus de la Doua** (Université Lyon 1, INSA), ce qui soutient durablement la location de petites surfaces dans ces deux secteurs." },
      { type: "p", text: "Rappel utile pour calibrer un projet locatif : à Villeurbanne, en 2025, un **studio ou T1 s'est vendu 115 000 € en médiane** (30 m²) et un **T2 170 000 €** (45 m²). Ce sont les typologies les plus chères au mètre carré à l'achat — 4 000 €/m² pour un T1 contre 2 967 €/m² pour un T5 — précisément parce que la demande locative les tire." },

      { type: "h2", text: "Dans quel quartier un appartement se revend-il le plus facilement ?" },
      { type: "p", text: "**Gratte-Ciel – Dedieu – Charmettes concentre de loin le plus de transactions : 655 ventes d'appartements en 2025**, soit plus d'un tiers des ventes des sept quartiers analysés. À l'inverse, Cyprian – Les Brosses n'en compte que 53. Plus un quartier échange de biens, plus il est facile d'y trouver un acheteur le jour de la revente." },
      { type: "p", text: "Ce volume a une seconde conséquence, moins évidente : **il conditionne la fiabilité du prix lui-même**. Une médiane calculée sur 655 ventes est solide ; sur 53, elle bouge d'une année à l'autre pour des raisons de composition, pas de marché. C'est aussi pour cette raison que nous ne publions aucun chiffre pour le quartier Saint-Jean : moins de 40 ventes par an en moyenne, ce n'est pas un échantillon, c'est une anecdote." },
      { type: "p", text: "Si la revente à horizon 5 ans fait partie de votre projet, un quartier liquide est un vrai filet de sécurité — c'est un critère au moins aussi important que les 300 €/m² d'écart entre deux secteurs voisins." },

      { type: "h2", text: "Quels quartiers ont le mieux résisté à la baisse des prix depuis 2022 ?" },
      { type: "p", text: "**Ferrandière – Maisons-Neuves est le seul quartier de Villeurbanne quasiment revenu à son niveau de 2022 (−2,0 %)**, quand Charpennes – Tonkin reste **13,2 % en dessous**. Sur l'ensemble de la commune, la médiane a reculé de 10,4 % depuis 2022, avant de remonter de 1,5 % entre 2024 et 2025." },
      { type: "p", text: "Autrement dit, la correction de 2022-2024 n'a pas frappé partout de la même façon, et la reprise amorcée en 2025 non plus. Six des sept quartiers analysés remontent entre 2024 et 2025 ; seul Charpennes – Tonkin recule encore légèrement (−1,3 %)." },
      { type: "p", text: "Ces écarts disent d'où vient chaque quartier — **ils ne disent pas où il va**. Nous ne publions pas de prévision de prix : personne ne peut en produire une honnêtement à l'échelle d'un quartier." },

      { type: "h2", text: "Comment choisir son quartier à Villeurbanne, concrètement ?" },
      { type: "p", text: "La méthode tient en cinq étapes, dans cet ordre. L'erreur la plus fréquente est de commencer par le quartier : on se retrouve alors à arbitrer sur la surface ou sur l'état du bien, ce qui coûte bien plus cher qu'un changement de secteur." },
      { type: "ol", items: [
        "**Fixez d'abord la surface dont vous avez besoin**, pas le quartier : 65 m² pour un T3, 81 m² pour un T4 sont les surfaces médianes réellement vendues à Villeurbanne.",
        "**Calculez votre budget d'acquisition complet**, frais compris (7 à 8 % dans l'ancien), puis divisez-le par les médianes du tableau ci-dessus : vous obtenez la liste des quartiers réellement accessibles.",
        "**Éliminez les secteurs incompatibles avec votre quotidien** — trajet domicile-travail, école, desserte. Ce filtre-là ne se négocie pas, contrairement au prix.",
        "**Vérifiez la liquidité du quartier retenu** si vous envisagez de revendre à moyen terme : un secteur à 50 ventes par an se revend moins vite qu'un secteur à 650.",
        "**Faites estimer les biens visités au prix du quartier, pas au prix de la ville** : entre Cyprian – Les Brosses et Ferrandière, l'écart de référence atteint 43 %. Nos [repères par quartier et par typologie](/estimation-immobiliere-villeurbanne) donnent ce point de départ.",
      ] },

      { type: "h2", text: "Que ne disent pas ces chiffres ?" },
      { type: "p", text: "Ces médianes décrivent des ventes passées, pas votre futur achat. Trois limites doivent être posées clairement, parce qu'elles conditionnent l'usage que vous pouvez en faire." },
      { type: "ul", items: [
        "**Le décalage de publication.** La base DVF paraît avec du retard : 2025 est la dernière année complète disponible en septembre 2026. Les chiffres décrivent donc le marché tel qu'il s'est conclu, pas tel qu'il se négocie ce mois-ci.",
        "**L'absence de qualité du bien.** DVF enregistre un prix, une surface et une adresse — ni l'étage, ni l'exposition, ni l'état, ni le DPE. Or ces critères expliquent l'essentiel des écarts entre deux appartements d'un même immeuble.",
        "**L'écart intra-quartier.** Il est presque toujours supérieur à l'écart entre quartiers. Choisir le bon secteur vous fait gagner un cadrage ; choisir le bon bien dans ce secteur vous fait gagner beaucoup plus.",
      ] },
      { type: "p", text: "C'est exactement là qu'un conseiller qui visite le secteur toutes les semaines apporte ce qu'aucune base de données ne contient. Nos conseillers connaissent les immeubles, les copropriétés et les rues de chacun de ces quartiers — et savent quand un prix affiché est justifié ou non." },
      { type: "p", text: "Trois de ces secteurs ont leur propre page, avec le prix au m² du quartier, la surface qu'un budget y achète et ce que coûte une vente sur place : [Gratte-Ciel](/agence-immobiliere-gratte-ciel), [Charpennes – Tonkin](/agence-immobiliere-charpennes) et [Cusset – Bonnevay](/agence-immobiliere-cusset)." },
    ],
    faq: [
      {
        q: "Quel est le quartier le moins cher de Villeurbanne ?",
        a: "Cyprian – Les Brosses, avec un prix médian de 2 738 €/m² sur les ventes d'appartements de 2025, soit 23 % de moins que la médiane communale (3 567 €/m²). Suivent Cusset – Bonnevay (3 171 €/m²) et Buers – Croix-Luizet (3 271 €/m²).",
      },
      {
        q: "Quelle surface achète-t-on avec 250 000 € à Villeurbanne ?",
        a: "Environ 64 à 65 m² dans les quartiers les plus chers (Ferrandière – Maisons-Neuves, Gratte-Ciel – Dedieu – Charmettes), 71 m² à Charpennes – Tonkin et jusqu'à 91 m² à Cyprian – Les Brosses. Ces surfaces sont calculées au prix médian au m² de 2025 et s'entendent hors frais d'acquisition, qui représentent 7 à 8 % du prix dans l'ancien.",
      },
      {
        q: "Quel quartier de Villeurbanne choisir pour un investissement locatif ?",
        a: "Le rendement brut moyen d'un appartement à Villeurbanne est d'environ 4,9 % (loyer médian de 14,6 €/m² hors charges rapporté au prix médian de 3 567 €/m²). Par quartier, à loyer communal constant, il va de 4,47 % à Ferrandière – Maisons-Neuves à 6,40 % à Cyprian – Les Brosses : le détail et ses limites sont dans notre article sur la rentabilité locative à Villeurbanne. Il n'existe pas de loyer de référence public à la maille du quartier, donc ces écarts sont des écarts de prix, pas de loyer. Charpennes – Tonkin et Buers – Croix-Luizet bordent le campus de la Doua, ce qui soutient la demande locative sur les petites surfaces.",
      },
      {
        q: "Dans quel quartier de Villeurbanne se vend-il le plus d'appartements ?",
        a: "Gratte-Ciel – Dedieu – Charmettes, avec 655 ventes d'appartements en 2025, loin devant Perralière – Grandclément (330), Buers – Croix-Luizet (223), Cusset – Bonnevay (213), Charpennes – Tonkin (200), Ferrandière – Maisons-Neuves (187) et Cyprian – Les Brosses (53). Un quartier où il se vend beaucoup de biens est aussi un quartier où il est plus facile de revendre.",
      },
      {
        q: "D'où viennent ces prix par quartier de Villeurbanne ?",
        a: "De la base DVF (demandes de valeurs foncières) publiée par l'État sur data.gouv.fr, qui recense le prix réel de chaque vente enregistrée par les notaires. Markus Immobilier calcule les médianes 2025 en écartant les ventes de lots multiples et les valeurs aberrantes, puis rattache chaque vente à son quartier via les contours officiels de la Métropole de Lyon. Extraction du 7 septembre 2026.",
      },
    ],
  },
  {
    slug: "estimation-en-ligne-ou-agence",
    title:
      "Estimation en ligne ou agence : laquelle est fiable ? (mesuré sur 1 875 ventes)",
    metaDescription:
      "Une estimation en ligne suffit-elle ? Sur les 1 875 ventes d'appartements de 2025 à Villeurbanne, le prix au m² du quartier tombe à moins de 10 % du prix réel dans 36 % des cas.",
    h1: "Estimation en ligne ou par une agence : laquelle est vraiment fiable ?",
    excerpt:
      "Mesuré sur les 1 875 ventes d'appartements de 2025 à Villeurbanne : le prix médian du quartier appliqué à la surface tombe à moins de 10 % du prix réellement payé dans 36 % des cas seulement.",
    date: "2026-06-09",
    updated: "2026-09-11",
    internalHref: "/estimation",
    internalLabel: "Lancer mon estimation gratuite en ligne",
    blocks: [
      { type: "p", text: "Une estimation en ligne donne une base chiffrée en deux minutes, mais elle ne suffit pas à fixer un prix de mise en vente. Nous l'avons mesuré sur les 1 875 ventes d'appartements enregistrées à Villeurbanne en 2025 : appliquer le prix médian du quartier à la surface du bien tombe à moins de 10 % du prix réellement payé dans **36 % des cas seulement**, avec une erreur médiane de 15,5 %. Voici ce que cet écart représente en euros, quartier par quartier, et à quel moment la visite d'un professionnel devient indispensable." },

      { type: "h2", text: "Une estimation immobilière en ligne est-elle fiable ?" },
      { type: "p", text: "Une estimation en ligne est fiable pour donner un ordre de grandeur, pas pour fixer un prix de vente. À Villeurbanne, le prix médian du quartier multiplié par la surface s'écarte de plus de 10 % du prix réellement payé dans près de deux ventes sur trois. C'est un point de départ chiffré, que la visite vient ensuite corriger — pas un verdict." },
      { type: "p", text: "Le test est simple : pour chacune des 1 875 ventes d'appartements de 2025, nous avons calculé le prix qu'aurait donné la méthode de base de toute estimation automatique — prix médian du quartier × surface — puis comparé au prix réellement payé, celui enregistré chez le notaire." },
      { type: "ul", items: [
        "**18 % des ventes** tombent à moins de 5 % du prix réel ;",
        "**36 %** à moins de 10 % ;",
        "**62 %** à moins de 20 % ;",
        "l'erreur médiane est de **15,5 %**.",
      ] },
      { type: "p", text: "Point important : connaître le quartier n'apporte que peu. En remplaçant la médiane du quartier par celle de la commune entière, on passe de 36 % à 31 % de ventes estimées à moins de 10 % près. Autrement dit, **l'essentiel de l'écart ne vient pas de la localisation**, mais de tout ce qu'un fichier de ventes ne contient pas." },

      { type: "h2", text: "De combien le prix au m² varie-t-il à l'intérieur d'un même quartier ?" },
      { type: "p", text: "Beaucoup plus qu'on ne l'imagine. À Villeurbanne, la moitié centrale des ventes d'appartements de 2025 s'est conclue entre 2 954 et 4 173 €/m², autour d'une médiane de 3 567 €/m². Sur un appartement de 62 m² — la surface médiane vendue dans la commune — cet écart représente près de **76 000 €**." },
      { type: "p", text: "Il ne s'agit pas des extrêmes : un quart des ventes s'est fait sous 2 954 €/m², un quart au-dessus de 4 173 €/m². En élargissant à 80 % des ventes, le haut de la fourchette atteint presque le double du bas : 2 489 €/m² contre 4 770 €/m²." },
      {
        type: "table",
        caption: "Dispersion des prix au m² à l'intérieur de chaque quartier — ventes d'appartements 2025",
        source: "Calcul Markus Immobilier sur la base DVF (data.gouv.fr / Etalab), croisée avec les contours de quartiers de la Métropole de Lyon. Extraction du 11 septembre 2026. « Moitié centrale » = de 25 % à 75 % des ventes, la médiane du quartier étant inchangée par rapport à nos chiffres publiés le 7 septembre 2026.",
        headers: ["Quartier", "Médiane 2025", "Moitié centrale des ventes", "Écart, sur la surface médiane du quartier", "Ventes"],
        rows: [
          ["Ferrandière – Maisons-Neuves", "3 923 €/m²", "3 282 – 4 404 €/m²", "≈ 73 000 € (65 m²)", "187"],
          ["Gratte-Ciel – Dedieu – Charmettes", "3 846 €/m²", "3 333 – 4 329 €/m²", "≈ 63 000 € (63 m²)", "655"],
          ["Charpennes – Tonkin", "3 524 €/m²", "2 894 – 4 217 €/m²", "≈ 73 000 € (55 m²)", "200"],
          ["Perralière – Grandclément", "3 375 €/m²", "2 879 – 3 845 €/m²", "≈ 58 000 € (60 m²)", "330"],
          ["Buers – Croix-Luizet", "3 271 €/m²", "2 738 – 4 089 €/m²", "≈ 76 000 € (56 m²)", "223"],
          ["Cusset – Bonnevay", "3 171 €/m²", "2 671 – 3 839 €/m²", "≈ 75 000 € (64 m²)", "213"],
          ["Cyprian – Les Brosses", "2 738 €/m²", "2 214 – 3 333 €/m²", "≈ 78 000 € (70 m²)", "53"],
          ["Villeurbanne (ensemble)", "3 567 €/m²", "2 954 – 4 173 €/m²", "≈ 76 000 € (62 m²)", "1 875"],
        ],
      },
      { type: "p", text: "Le détail des médianes et leur évolution depuis 2022 sont dans notre article [prix au m² à Villeurbanne, quartier par quartier](/blog/prix-immobilier-villeurbanne-2026)." },

      { type: "h2", text: "Dans quels quartiers de Villeurbanne l'estimation en ligne est-elle la plus juste ?" },
      { type: "p", text: "À Gratte-Ciel – Dedieu – Charmettes, le prix médian du quartier appliqué à la surface tombe à moins de 10 % du prix réel dans 42 % des ventes de 2025. À Buers – Croix-Luizet et à Cyprian – Les Brosses, ce n'est le cas que dans 25 % des ventes. Un même outil est donc nettement plus précis dans un quartier au bâti homogène que dans un quartier disparate." },
      { type: "ul", items: [
        "**Gratte-Ciel – Dedieu – Charmettes** : fourchette la plus resserrée (26 % de la médiane), 42 % des ventes estimées à moins de 10 % près — c'est aussi le quartier le plus actif, avec 655 ventes en 2025 ;",
        "**Ferrandière – Maisons-Neuves** et **Perralière – Grandclément** : fourchette de 29 %, 35 à 37 % des ventes à moins de 10 % près ;",
        "**Cusset – Bonnevay** : fourchette de 37 %, 33 % des ventes ;",
        "**Charpennes – Tonkin** : fourchette de 38 %, 28 % des ventes ;",
        "**Buers – Croix-Luizet** et **Cyprian – Les Brosses** : les plus dispersés (41 %), 25 % des ventes seulement.",
      ] },
      { type: "p", text: "La lecture est mécanique : un quartier dont le parc mêle petites copropriétés anciennes, immeubles récents et biens à rénover produit des prix au m² plus dispersés, donc une estimation automatique moins sûre. Si votre bien se trouve à Buers ou à Cyprian – Les Brosses, la fourchette en ligne doit être considérée comme une simple mise en route." },

      { type: "h2", text: "Pourquoi deux appartements identiques sur le papier ne se vendent-ils pas au même prix ?" },
      { type: "p", text: "Un fichier de ventes voit l'adresse, la surface et le nombre de pièces. Il ne voit ni l'étage, ni l'ascenseur, ni l'exposition, ni l'état du bien, ni le DPE, ni le montant des charges. Ces éléments-là expliquent l'essentiel de l'écart de prix entre deux logements voisins de même taille." },
      { type: "ul", items: [
        "**L'étage et l'ascenseur** : un dernier étage avec ascenseur et un rez-de-chaussée sur rue n'ont pas la même valeur, à surface identique.",
        "**L'état réel** : rénové, à rafraîchir ou à refaire entièrement.",
        "**Le DPE** : une étiquette F ou G pèse sur le prix et restreint la location. À Villeurbanne, [2 454 appartements diagnostiqués sont dans ce cas](/blog/dpe-2026-ce-qui-change).",
        "**L'exposition et le calme** : lumière du jour, vis-à-vis, bruit de la rue.",
        "**La copropriété** : montant des charges, travaux votés, état des parties communes.",
        "**Les annexes** : balcon, terrasse, cave, parking ou box.",
      ] },
      { type: "p", text: "Aucune de ces informations ne figure dans les données publiques de vente. Le détail des critères qui font le prix est développé dans notre guide [comment estimer son bien à Lyon et Villeurbanne](/blog/comment-estimer-son-bien-immobilier-lyon-villeurbanne)." },

      { type: "h2", text: "L'estimation en ligne est-elle moins précise pour un grand logement ?" },
      { type: "p", text: "Oui, et l'écart se creuse avec la surface. À Villeurbanne en 2025, la moitié centrale des ventes de T2 tient dans une fourchette de 48 000 €, contre 92 000 € pour les T4. Plus le logement est grand, plus un même pourcentage d'écart pèse lourd en euros — et plus l'état du bien compte dans le prix final." },
      {
        type: "table",
        caption: "Dispersion des prix au m² par typologie — appartements vendus à Villeurbanne en 2025",
        source: "Calcul Markus Immobilier sur la base DVF (data.gouv.fr / Etalab). Extraction du 11 septembre 2026. L'écart en euros est calculé sur la surface médiane vendue pour chaque typologie.",
        headers: ["Type", "Médiane 2025", "Moitié centrale des ventes", "Écart, sur la surface médiane", "Ventes"],
        rows: [
          ["T1", "4 000 €/m²", "3 464 – 4 724 €/m²", "≈ 38 000 € (30 m²)", "309"],
          ["T2", "3 830 €/m²", "3 268 – 4 333 €/m²", "≈ 48 000 € (45 m²)", "436"],
          ["T3", "3 494 €/m²", "2 912 – 4 059 €/m²", "≈ 75 000 € (65 m²)", "578"],
          ["T4", "3 211 €/m²", "2 696 – 3 831 €/m²", "≈ 92 000 € (81 m²)", "406"],
        ],
      },

      { type: "h2", text: "Que voit un conseiller qu'un outil ne voit pas ?" },
      { type: "p", text: "Un conseiller qui se déplace constate ce qui ne figure dans aucun fichier : la lumière réelle à l'heure de la visite, le bruit de la rue, l'état des parties communes, les travaux votés en assemblée, la qualité d'une rénovation. Il connaît aussi les biens comparables réellement vendus dans le secteur, et pas seulement les prix affichés dans les annonces." },
      { type: "p", text: "C'est l'étape qui transforme une fourchette en prix de mise en vente. Chez Markus Immobilier, elle s'appuie sur 7 ans d'expérience sur ce marché et plus de 250 biens accompagnés depuis Villeurbanne." },

      { type: "h2", text: "Faut-il faire les deux, et dans quel ordre ?" },
      { type: "p", text: "Commencez par l'estimation en ligne, puis faites-la confirmer sur place. L'outil donne une fourchette chiffrée en moins de deux minutes et évite de partir d'une idée fausse ; la visite resserre cette fourchette en un prix. L'ordre inverse vous prive du repère qui permet de vérifier ce qu'on vous annonce." },
      { type: "ol", items: [
        "**Estimation en ligne** — deux minutes, gratuite, sans engagement : vous obtenez une fourchette fondée sur les ventes réellement conclues.",
        "**Visite d'estimation** — un conseiller mesure ce que les données ne contiennent pas et resserre la fourchette.",
        "**Prix de mise en vente** — arbitré avec vous, en fonction de votre délai et du niveau de demande du moment.",
      ] },
      { type: "p", text: "Pour un bien situé dans la commune, notre page [estimation immobilière à Villeurbanne](/estimation-immobiliere-villeurbanne) détaille les deux étapes et donne des repères de prix par quartier et par typologie." },

      { type: "h2", text: "Comment ces chiffres ont-ils été calculés ?" },
      { type: "p", text: "Ces chiffres proviennent de la base DVF (demandes de valeurs foncières) publiée par l'État sur data.gouv.fr, qui recense le prix réel de chaque vente enregistrée par les notaires. Nous avons retenu les ventes d'appartements de 2025 à Villeurbanne portant sur un seul logement, écarté les valeurs aberrantes, puis rattaché chaque vente à son quartier via les contours officiels de la Métropole de Lyon. Extraction du 11 septembre 2026." },
      { type: "p", text: "Trois limites, qu'il faut connaître pour lire ces chiffres correctement :" },
      { type: "ul", items: [
        "**Le test est favorable à la méthode.** La médiane du quartier est calculée sur les ventes-là mêmes qu'elle sert à estimer. Un outil appliqué à des ventes futures, qu'il ne connaît pas encore, ne fait pas mieux.",
        "**Il porte sur la méthode « prix au m² × surface »**, socle de toute estimation automatique, et non sur un outil commercial précis : les estimateurs qui croisent d'autres critères réduisent l'écart, sans le supprimer.",
        "**DVF ignore l'étage, l'état, le DPE et les charges.** C'est précisément ce que la dispersion mesurée ci-dessus met en évidence : la part du prix que la localisation et la surface n'expliquent pas.",
      ] },
      { type: "p", text: "Les médianes par quartier utilisées ici ont été recalculées le 11 septembre 2026 et sont identiques à celles publiées le 7 septembre : les deux articles ne se contredisent pas." },
    ],
    faq: [
      {
        q: "Une estimation immobilière en ligne est-elle fiable ?",
        a: "Elle est fiable pour obtenir un ordre de grandeur, pas pour fixer un prix de mise en vente. Sur les 1 875 ventes d'appartements enregistrées à Villeurbanne en 2025, le prix médian du quartier appliqué à la surface tombe à moins de 10 % du prix réellement payé dans 36 % des cas, avec une erreur médiane de 15,5 %. C'est une base de départ chiffrée, que la visite d'un professionnel vient corriger.",
      },
      {
        q: "Quel écart peut-il y avoir entre une estimation au prix au m² et le prix de vente réel ?",
        a: "À Villeurbanne, la moitié centrale des ventes d'appartements de 2025 s'est conclue entre 2 954 et 4 173 €/m², pour une médiane de 3 567 €/m². Sur un appartement de 62 m², la surface médiane vendue dans la commune, cet écart représente près de 76 000 €. L'écart grandit avec la surface : 48 000 € sur un T2, 92 000 € sur un T4.",
      },
      {
        q: "Dans quel quartier de Villeurbanne l'estimation automatique est-elle la moins fiable ?",
        a: "À Buers – Croix-Luizet et à Cyprian – Les Brosses. Dans ces deux quartiers, le prix médian appliqué à la surface tombe à moins de 10 % du prix réel dans 25 % des ventes de 2025 seulement, contre 42 % à Gratte-Ciel – Dedieu – Charmettes. Plus le parc de logements est hétérogène, moins une estimation automatique est précise.",
      },
      {
        q: "L'estimation en ligne de Markus Immobilier est-elle gratuite ?",
        a: "Oui, elle est gratuite, prend moins de deux minutes et n'engage à rien. Elle couvre la vente, la location et le rendement locatif, et vous recevez un rapport. La visite d'estimation se programme ensuite sur rendez-vous, du lundi au samedi de 9 h à 12 h et du lundi au vendredi de 14 h à 19 h, au 04 78 37 13 67.",
      },
      {
        q: "Faut-il faire estimer son bien par plusieurs agences ?",
        a: "Comparer plusieurs avis est utile, à condition de comparer ce qui est justifié. Demandez à chaque interlocuteur sur quelles ventes réellement conclues son prix s'appuie, et à quelle date. Un prix annoncé sans référence de vente comparable n'est pas une estimation, c'est une proposition commerciale.",
      },
    ],
  },
  {
    slug: "vendre-vite-lyon",
    title: "Vendre vite son bien à Lyon sans brader le prix",
    metaDescription:
      "Comment vendre rapidement votre bien à Lyon sans le brader : les leviers concrets pour une vente rapide au juste prix.",
    h1: "Vendre vite son bien à Lyon sans brader le prix",
    excerpt:
      "Vendre rapidement ne veut pas dire vendre moins cher. Tout se joue sur la préparation.",
    date: "2026-06-16",
    internalHref: "/vendre",
    internalLabel: "Vendre efficacement avec Markus Immobilier",
    blocks: [
      { type: "p", text: "Vendre rapidement ne veut pas dire vendre moins cher. Tout se joue sur la préparation." },
      { type: "h2", text: "Les leviers d'une vente rapide" },
      { type: "ul", items: [
        "**Le bon prix dès le départ.** Les deux premières semaines génèrent le plus de visites : un prix juste capte cette vague d'attention. À Villeurbanne, calez-le sur [les prix réellement signés dans votre quartier](/estimation-immobiliere-villeurbanne).",
        "**Une présentation impeccable.** Bien rangé, lumineux, neutre : l'acheteur doit pouvoir se projeter.",
        "**Des photos professionnelles.** La majorité des acheteurs trient sur la photo principale.",
        "**De la réactivité.** Répondre vite aux demandes et proposer des créneaux de visite flexibles.",
        "**Le bon canal de diffusion** et un accompagnement qui filtre les acheteurs sérieux.",
      ] },
      { type: "h2", text: "L'erreur classique" },
      { type: "p", text: "Surévaluer « pour avoir de la marge » : le bien stagne, puis se vend finalement moins cher après plusieurs baisses." },
    ],
  },
  {
    slug: "achat-immobilier-lyon-checklist",
    title: "Achat immobilier à Lyon : la check-list de l'acquéreur",
    metaDescription:
      "Acheter à Lyon en 2026 : la check-list complète de l'acquéreur, du financement à la signature, pour acheter sereinement.",
    h1: "Achat immobilier à Lyon : la check-list de l'acquéreur",
    excerpt:
      "Acheter est un parcours en plusieurs étapes. Cette check-list vous évite les mauvaises surprises.",
    date: "2026-06-23",
    internalHref: "/acheter",
    internalLabel: "Voir nos biens et être accompagné",
    blocks: [
      { type: "p", text: "Acheter est un parcours en plusieurs étapes. Cette check-list vous évite les mauvaises surprises." },
      { type: "h2", text: "Avant de chercher" },
      { type: "ul", items: [
        "**Définir son budget** : [capacité d'emprunt](/blog/capacite-emprunt-immobilier), apport, et [frais de notaire](/blog/frais-de-notaire-lyon-2026) (≈ 7-8 % dans l'ancien).",
        "**Lister ses critères** : secteur, surface, étage, extérieur, transports.",
      ] },
      { type: "h2", text: "Pendant les visites" },
      { type: "ul", items: [
        "Vérifier l'**état réel** (humidité, isolation, luminosité).",
        "Demander le **DPE**, le montant des **[charges](/blog/charges-copropriete)** et les **travaux votés** en copropriété.",
        "Se renseigner sur le **quartier** (nuisances, projets urbains).",
      ] },
      { type: "h2", text: "Au moment d'acheter" },
      { type: "ul", items: [
        "Faire une **[offre](/blog/faire-offre-achat)** au juste prix.",
        "Signer le **[compromis](/blog/compromis-de-vente-delais)** (délai de rétractation de 10 jours).",
        "Obtenir son **prêt**, puis signer l'**acte authentique** chez le notaire.",
      ] },
      { type: "h2", text: "Acheter accompagné" },
      { type: "p", text: "Un conseiller local vous aide à repérer les bonnes opportunités et à sécuriser chaque étape." },
    ],
  },
  {
    slug: "taxe-fonciere-vente-qui-paie",
    title: "Taxe foncière et vente : qui paie quoi en 2026 ?",
    metaDescription:
      "En cas de vente, qui paie la taxe foncière ? Règle légale, prorata dans le compromis et exemple de calcul.",
    h1: "Taxe foncière et vente : qui paie quoi ?",
    excerpt:
      "Le propriétaire au 1er janvier paie la taxe foncière de l'année entière. Comment se règle le prorata entre vendeur et acheteur.",
    date: "2026-06-25",
    internalHref: "/vendre",
    internalLabel: "Faire estimer mon bien avant de vendre",
    blocks: [
      { type: "p", text: "**Le propriétaire au 1er janvier paie la taxe foncière de toute l'année.** C'est la règle légale : même si vous vendez en mars, c'est vous (le vendeur) qui recevez l'avis et qui êtes redevable pour l'année entière auprès du fisc." },
      { type: "h2", text: "Le prorata, en pratique" },
      { type: "p", text: "Dans les faits, la plupart des [compromis de vente](/blog/compromis-de-vente-delais) prévoient un **partage au prorata** : l'acheteur rembourse au vendeur la part correspondant à la période où il sera propriétaire. Ce n'est pas une obligation légale, mais un accord privé inscrit dans l'acte — à négocier au moment de la vente." },
      { type: "h2", text: "Exemple" },
      { type: "p", text: "Taxe foncière annuelle de 1 200 €, vente signée le 1er juillet. Le vendeur a payé l'année entière ; l'acheteur lui rembourse 6 mois, soit 600 €." },
      { type: "h2", text: "À retenir" },
      { type: "p", text: "Vérifiez que ce prorata est bien prévu dans le compromis : c'est souvent oublié, et cela évite les mauvaises surprises." },
    ],
  },
  {
    slug: "plus-value-immobiliere-calcul",
    title: "Plus-value immobilière à Villeurbanne : le calcul et le seuil d'imposition (2026)",
    metaDescription:
      "À partir de quel prix de revente la plus-value devient-elle imposable à Villeurbanne ? Le seuil quartier par quartier, calculé sur les prix signés.",
    h1: "Plus-value immobilière : le calcul et le seuil d'imposition à Villeurbanne",
    excerpt:
      "Un appartement acheté au prix médian de son quartier en 2022 et revendu au prix médian en 2025 ne dégage aucune plus-value imposable : il faudrait revendre 9,7 % à 23,9 % au-dessus du marché actuel. Le calcul, quartier par quartier.",
    date: "2026-06-11",
    updated: "2026-10-05",
    internalHref: "/vendre",
    internalLabel: "Savoir ce qu'il reste après la vente",
    blocks: [
      { type: "p", text: "**Un appartement acheté au prix médian de son quartier villeurbannais en 2022 et revendu au prix médian en 2025 ne dégage aucune plus-value imposable.** Il en dégage même l'inverse : sur la médiane communale, le prix de revente ressort environ 44 200 € en dessous du prix d'acquisition majoré des frais. La raison n'est pas fiscale, elle est locale — le prix médian au m² d'un appartement villeurbannais a reculé de 10,4 % depuis 2022, alors que le prix d'achat retenu par le fisc est, lui, majoré forfaitairement. Cette page publie le seuil de revente à partir duquel l'impôt commence, quartier par quartier, et le calcul qui y conduit." },

      { type: "h2", text: "Ai-je une plus-value à déclarer si j'ai acheté à Villeurbanne en 2022 ?" },
      { type: "p", text: "**Si vous avez acheté au prix médian de votre quartier en 2022 et que vous revendez au prix médian de ce même quartier aujourd'hui, non : il n'y a pas de plus-value, donc rien à déclarer ni à payer.** Le calcul aboutit à une moins-value dans les sept quartiers de Villeurbanne pour lesquels nous disposons d'un échantillon de ventes suffisant. L'écart va de 23 574 € à Ferrandière – Maisons-Neuves à 52 111 € à Charpennes – Tonkin, sur la surface médiane de 62 m²." },
      { type: "p", text: "Deux mouvements se combinent, et ils vont dans le même sens. D'un côté, le marché villeurbannais a reculé : la médiane est passée de 3 981 €/m² en 2022 à 3 567 €/m² en 2025, soit −10,4 %, et [le recul touche tous les quartiers](/blog/prix-immobilier-villeurbanne-2026). De l'autre, le prix d'achat que le fisc retient n'est pas le prix payé : il est majoré de 7,5 % au titre des frais d'acquisition, sans justificatif à produire. Le prix de référence monte donc pendant que le marché descend." },
      { type: "p", text: "⚠️ Ce raisonnement porte sur des **médianes de marché**, pas sur votre bien. Votre plus-value se calcule sur votre prix d'achat réel et votre prix de vente réel, pas sur une médiane de quartier. Un bien acheté sous le marché en 2022, ou rénové depuis, peut très bien dégager une plus-value quand la médiane de son quartier a baissé. Les chiffres ci-dessous donnent l'ordre de grandeur et le seuil à surveiller — ils ne remplacent pas le calcul du notaire, qui est seul à faire foi le jour de l'acte." },

      { type: "h2", text: "À partir de quel prix de revente la plus-value devient-elle imposable ?" },
      { type: "p", text: "**Pour un achat réalisé en 2022 au prix médian du quartier, l'impôt sur la plus-value ne commence qu'au-delà du seuil de la dernière colonne — soit un prix de revente supérieur de 9,7 % à 23,9 % au prix médian constaté en 2025.** Tant que la revente se fait sous ce seuil, l'assiette imposable est nulle. Ce seuil est le prix d'achat 2022 majoré du forfait de 7,5 %, ramené au mètre carré." },
      {
        type: "table",
        caption: "Seuil d'imposition de la plus-value — appartement acheté en 2022 au prix médian du quartier, revendu en 2025 (durée de détention : 3 ans)",
        source: "Calcul Markus Immobilier. Médianes 2025 et variations depuis 2022 : base DVF (Etalab / data.gouv.fr), ventes d'appartements enregistrées en 2025 à Villeurbanne (69266), découpées selon les contours de quartiers de la Métropole de Lyon. Médiane 2022 reconstituée à partir de la médiane 2025 et de la variation. Forfait de 7,5 % pour frais d'acquisition : service-public.gouv.fr, fiche F10864, mise à jour du 15 avril 2026.",
        headers: ["Quartier", "Médiane 2022", "Médiane 2025", "Seuil d'imposition", "Hausse nécessaire"],
        rows: [
          ["Ferrandière – Maisons-Neuves", "4 003 €/m²", "3 923 €/m²", "4 303 €/m²", "+9,7 %"],
          ["Cusset – Bonnevay", "3 366 €/m²", "3 171 €/m²", "3 618 €/m²", "+14,1 %"],
          ["Cyprian – Les Brosses", "3 042 €/m²", "2 738 €/m²", "3 270 €/m²", "+19,4 %"],
          ["Gratte-Ciel – Dedieu – Charmettes", "4 302 €/m²", "3 846 €/m²", "4 625 €/m²", "+20,3 %"],
          ["Perralière – Grandclément", "3 809 €/m²", "3 375 €/m²", "4 095 €/m²", "+21,3 %"],
          ["Buers – Croix-Luizet", "3 696 €/m²", "3 271 €/m²", "3 973 €/m²", "+21,5 %"],
          ["Charpennes – Tonkin", "4 060 €/m²", "3 524 €/m²", "4 365 €/m²", "+23,9 %"],
          ["Villeurbanne (commune)", "3 981 €/m²", "3 567 €/m²", "4 280 €/m²", "+20,0 %"],
        ],
      },
      { type: "p", text: "Ferrandière – Maisons-Neuves est le quartier le plus proche du seuil, parce que c'est celui qui a le moins reculé depuis 2022 (−2,0 %). Charpennes – Tonkin en est le plus loin, parce que c'est celui qui a le plus reculé (−13,2 %). Autrement dit : **plus un quartier a baissé, plus l'impôt sur la plus-value y est hors de portée** — ce qui n'a rien de réjouissant pour le vendeur, mais change le calcul de ce qu'il encaisse." },

      { type: "h2", text: "Comment se calcule la plus-value immobilière, étape par étape ?" },
      { type: "p", text: "**La plus-value imposable est la différence entre le prix de cession et le prix d'acquisition majoré.** Trois étapes : on majore le prix d'achat, on soustrait, puis on applique les abattements de durée de détention s'il reste quelque chose à imposer. Voici le calcul déroulé sur le cas communal villeurbannais, en 62 m², la surface médiane des appartements vendus." },
      { type: "ol", items: [
        "**Prix d'achat 2022** — 3 981 €/m² × 62 m² = **246 822 €**.",
        "**Majoration des frais d'acquisition** — forfait de 7,5 % du prix d'achat, sans justificatif : 246 822 € × 1,075 = **265 334 €**. C'est le prix d'acquisition majoré.",
        "**Majoration des travaux** — forfait de 15 % du prix d'achat, mais **réservé aux biens détenus depuis plus de 5 ans**. Sur une détention de 3 ans, il ne s'applique pas. Les travaux réels restent déductibles sur facture.",
        "**Prix de cession 2025** — 3 567 €/m² × 62 m² = **221 154 €**.",
        "**Résultat** — 221 154 € − 265 334 € = **−44 180 €**. Le résultat est négatif : c'est une moins-value, l'assiette imposable est nulle.",
        "**Abattements de durée de détention** — sans objet ici, et pour deux raisons : il n'y a rien à abattre, et les abattements ne commencent de toute façon qu'à la 6ᵉ année.",
      ] },
      { type: "p", text: "Si le résultat de l'étape 5 avait été positif, le taux à appliquer aurait été de **19 % d'impôt sur le revenu et 17,2 % de prélèvements sociaux**, soit 36,2 %, plus une surtaxe de 2 % à 6 % au-delà de 50 000 € de plus-value imposable. Le [détail de ce que le vendeur encaisse réellement, honoraires et taxe foncière comprises, est publié sur notre page vendre](/vendre)." },
      { type: "p", text: "Un point de calendrier qui compte sur une détention courte : la durée se compte **de date à date**, du jour de l'acte d'achat au jour de l'acte de vente, pas en années civiles. Un achat de novembre 2022 revendu en octobre 2026 fait 3 ans et 11 mois, pas 4 ans — et reste donc en dessous des 5 ans qui ouvrent le forfait travaux de 15 %." },

      { type: "h2", text: "Peut-on déduire une moins-value immobilière de ses impôts ?" },
      { type: "p", text: "**Non. Une moins-value immobilière n'est ni déductible ni imputable : elle ne s'impute ni sur une plus-value de même nature, ni sur le revenu global.** Les 44 180 € de perte du calcul ci-dessus ne produisent donc aucune économie d'impôt, ni l'année de la vente, ni les suivantes. C'est une asymétrie que beaucoup de vendeurs découvrent après coup : le gain est taxé, la perte n'est pas reconnue." },
      { type: "p", text: "Une seule exception existe, et elle est étroite : la vente d'un bien **acquis par fractions successives constatées par le même acte**, entre les mêmes parties. Dans ce cas seulement, les moins-values peuvent s'imputer sur les plus-values de l'opération. Si le solde reste négatif, il n'est pas pris en compte." },
      { type: "p", text: "Source : BOFiP-Impôts, BOI-RFPI-PVI-20-20, « Plus-values immobilières — Détermination de la plus-value imposable », bofip.impots.gouv.fr." },

      { type: "h2", text: "Qui n'a aucune plus-value à déclarer, quel que soit le prix de vente ?" },
      { type: "p", text: "**Le vendeur de sa résidence principale : l'exonération est totale, impôt sur le revenu comme prélèvements sociaux, sans condition de durée de détention ni de montant.** Elle couvre le logement et ses dépendances immédiates — cave, garage, place de stationnement — à condition qu'il s'agisse de l'habitation habituelle et effective au moment de la vente. C'est le cas de la majorité des vendeurs, et il rend tout le calcul ci-dessus sans objet." },
      { type: "p", text: "L'impôt sur la plus-value ne concerne donc que les **résidences secondaires** et les **biens locatifs**. Si votre bien est locatif, l'ordre de grandeur de ce qu'il rapporte avant revente est détaillé dans notre analyse de [la rentabilité locative à Lyon et Villeurbanne](/blog/rentabilite-locative-lyon)." },
      { type: "p", text: "Source : service-public.gouv.fr, fiche F10864 « Impôt sur le revenu — Plus-value immobilière », mise à jour du 15 avril 2026. La plus-value est calculée et prélevée par le notaire le jour de l'acte : le vendeur n'a pas de démarche séparée à faire." },

      { type: "h2", text: "Combien d'années faut-il garder un bien pour ne plus payer d'impôt sur la plus-value ?" },
      { type: "p", text: "**Vingt-deux ans pour être exonéré d'impôt sur le revenu, trente ans pour être exonéré de prélèvements sociaux.** L'abattement démarre à la 6ᵉ année : avant cela, aucune réduction pour durée de détention, l'assiette est pleine. C'est 6 % par an de la 6ᵉ à la 21ᵉ année puis 4 % la 22ᵉ pour l'impôt sur le revenu, et 1,65 % par an de la 6ᵉ à la 21ᵉ, 1,60 % la 22ᵉ puis 9 % par an de la 23ᵉ à la 30ᵉ pour les prélèvements sociaux." },
      { type: "p", text: "Le franchissement de la **5ᵉ année** est celui qui change le plus le calcul à court terme, et il est peu connu : ce n'est pas un abattement, c'est l'ouverture du forfait travaux de 15 %. Sur l'exemple communal, ce forfait aurait ajouté 37 023 € au prix d'acquisition majoré — davantage que n'importe quel abattement des trois premières années suivantes." },
      { type: "p", text: "Au-delà du barème, ce qui détermine votre résultat reste le prix : les [frais d'acquisition payés à l'achat](/blog/frais-de-notaire-lyon-2026) viennent majorer le prix de revient, et une estimation juste au départ évite de découvrir l'écart le jour de l'acte." },
    ],
    faq: [
      {
        q: "Ai-je une plus-value imposable si j'ai acheté un appartement à Villeurbanne en 2022 et que je revends en 2026 ?",
        a: "Si vous avez acheté au prix médian de votre quartier et que vous revendez au prix médian actuel, non : le calcul aboutit à une moins-value dans les sept quartiers de Villeurbanne mesurés, de 23 574 € à Ferrandière – Maisons-Neuves à 52 111 € à Charpennes – Tonkin sur 62 m². La médiane communale est passée de 3 981 €/m² en 2022 à 3 567 €/m² en 2025, soit −10,4 %, tandis que le prix d'achat retenu par le fisc est majoré de 7,5 % au titre des frais d'acquisition. Attention : ce raisonnement porte sur des médianes de marché et non sur votre bien, dont la plus-value se calcule sur votre prix d'achat et votre prix de vente réels.",
      },
      {
        q: "À partir de quel prix de revente la plus-value devient-elle imposable à Villeurbanne ?",
        a: "Pour un achat réalisé en 2022 au prix médian du quartier, le seuil est le prix d'achat majoré du forfait de 7,5 %, soit 4 280 €/m² en médiane communale. Par quartier : 4 303 €/m² à Ferrandière – Maisons-Neuves, 4 625 €/m² à Gratte-Ciel – Dedieu – Charmettes, 4 365 €/m² à Charpennes – Tonkin, 4 095 €/m² à Perralière – Grandclément, 3 973 €/m² à Buers – Croix-Luizet, 3 618 €/m² à Cusset – Bonnevay et 3 270 €/m² à Cyprian – Les Brosses. Cela suppose de revendre 9,7 % à 23,9 % au-dessus du prix médian constaté en 2025.",
      },
      {
        q: "Peut-on déduire une moins-value immobilière de ses impôts ?",
        a: "Non. Une moins-value immobilière ne s'impute ni sur une plus-value de même nature, ni sur le revenu global : elle ne produit aucune économie d'impôt, ni l'année de la vente, ni les suivantes. La seule exception concerne la vente d'un bien acquis par fractions successives constatées par le même acte et entre les mêmes parties, où les moins-values peuvent s'imputer sur les plus-values de l'opération ; si le solde reste négatif, il n'est pas pris en compte. Source : BOFiP-Impôts, BOI-RFPI-PVI-20-20.",
      },
      {
        q: "Comment se calcule la plus-value immobilière, étape par étape ?",
        a: "On majore d'abord le prix d'achat des frais d'acquisition (forfait de 7,5 % du prix d'achat, sans justificatif) et, si le bien est détenu depuis plus de 5 ans, des travaux (forfait de 15 %). On soustrait ce prix d'acquisition majoré du prix de cession. Si le résultat est positif, on applique les abattements de durée de détention, qui ne commencent qu'à la 6ᵉ année, puis le taux de 19 % d'impôt sur le revenu et 17,2 % de prélèvements sociaux, soit 36,2 %, plus une surtaxe de 2 % à 6 % au-delà de 50 000 € de plus-value imposable. Sur le cas médian villeurbannais en 62 m² : 246 822 € d'achat en 2022, soit 265 334 € majorés, contre 221 154 € de revente en 2025, donc un résultat de −44 180 € et une assiette nulle.",
      },
      {
        q: "La vente de ma résidence principale est-elle imposée à la plus-value ?",
        a: "Non, l'exonération est totale — impôt sur le revenu comme prélèvements sociaux — sans condition de durée de détention ni de montant. Elle couvre le logement et ses dépendances immédiates, cave, garage et place de stationnement, à condition qu'il s'agisse de votre habitation habituelle et effective au moment de la vente. L'impôt sur la plus-value ne concerne que les résidences secondaires et les biens locatifs. Source : service-public.gouv.fr, fiche F10864, mise à jour du 15 avril 2026.",
      },
      {
        q: "Pourquoi la 5ᵉ année de détention compte-t-elle plus que les autres ?",
        a: "Parce qu'au-delà de 5 ans de détention, le prix d'achat peut être majoré d'un forfait de 15 % au titre des travaux, sans avoir à produire de facture. Ce n'est pas un abattement mais une majoration du prix de revient, et sur le cas médian villeurbannais elle ajouterait 37 023 € au prix d'acquisition majoré — davantage que les abattements des trois premières années qui suivent. La durée se compte de date à date, du jour de l'acte d'achat au jour de l'acte de vente, et non en années civiles.",
      },
    ],
  },
  {
    slug: "vendre-sans-agence",
    title: "Vendre sans agence à Villeurbanne : le calcul en euros",
    metaDescription:
      "Vendre seul à Villeurbanne économise 11 700 € d'honoraires au prix médian. Mais l'erreur médiane d'une estimation sur données publiques y vaut 30 225 €.",
    h1: "Vendre sans agence à Villeurbanne : ce que vous économisez, et ce que ça peut coûter",
    excerpt:
      "Au prix médian villeurbannais, vendre seul fait économiser 11 700 € d'honoraires. L'erreur médiane d'une estimation faite sur les seules données publiques y vaut 30 225 €. Le calcul complet, quartier par quartier.",
    date: "2026-05-28",
    updated: "2026-10-15",
    internalHref: "/vendre",
    internalLabel: "Être accompagné pour ma vente",
    blocks: [
      { type: "p", text: "**Vendre sans agence à Villeurbanne fait économiser 11 700 € d'honoraires au prix médian de la commune, et fait porter seul un risque de prix que nous chiffrons à 30 225 €.** Les deux montants sortent de données publiées, pas d'une estimation de principe : le premier est notre barème en ligne appliqué aux 195 000 € de prix médian des appartements vendus à Villeurbanne en 2025 ; le second est l'erreur médiane que produit une estimation faite sur les seules données publiques, mesurée sur les 1 875 ventes de cette même année." },
      { type: "p", text: "Cette page ne met pas en regard des avantages et des inconvénients. Elle met côte à côte quatre choses chiffrées ou sourcées : ce que vendre seul rapporte, ce qui reste à payer de toute façon, ce que la loi interdit précisément à un particulier de faire, et ce qu'une erreur de prix coûte en euros." },

      { type: "h2", text: "Combien économise-t-on vraiment en vendant sans agence à Villeurbanne ?" },
      { type: "p", text: "L'économie est égale aux honoraires de l'agence, et à rien d'autre. Au prix médian d'un appartement villeurbannais — **195 000 €** sur les ventes signées en 2025 — notre barème place la vente dans la tranche 170 001 à 300 000 €, soit 6 % : **11 700 €**, à la charge du vendeur. Ce prix médian vient de notre relevé des [prix au m² à Villeurbanne, quartier par quartier](/blog/prix-immobilier-villeurbanne-2026), calculé sur les ventes signées et non sur des annonces. C'est la somme exacte que vendre seul permet de garder." },
      { type: "p", text: "Sur le marché, la commission représente souvent 4 à 6 % du prix, mais la plupart des agences ne publient pas de barème : il faut le demander. Le nôtre est en ligne, tranche par tranche — 9 000 € forfaitaires de 50 001 à 170 000 €, 6 % de 170 001 à 300 000 €, 5 % jusqu'à 500 000 € — et [le barème complet est consultable avant tout mandat](/honoraires)." },
      { type: "p", text: "Le détail quartier par quartier existe déjà, et nous ne le redoublons pas ici : notre page [vendre un bien à Villeurbanne](/vendre) publie, pour chacun des sept quartiers, le prix d'un 62 m² au prix médian du secteur, les honoraires correspondants, le taux effectif et le **net vendeur** qui en résulte. Deux chiffres en ressortent pour qui envisage de vendre seul : les honoraires valent 6 % du prix dans six quartiers sur sept, et seul Cyprian – Les Brosses passe sous le seuil de 170 000 €, où le forfait de 9 000 € ramène le taux effectif à 5,30 %." },

      { type: "h2", text: "Quels frais restent à votre charge quand vous vendez seul ?" },
      { type: "p", text: "Les diagnostics obligatoires, dans tous les cas : ils relèvent de votre obligation d'information de vendeur et restent à votre charge, avec ou sans agence. PAP, premier site français de vente entre particuliers, chiffre ce poste entre **200 et 700 €** selon le type de bien, sa surface et le nombre de diagnostics nécessaires (page « Vendre seul et sans agence : combien ça coûte ? », mise à jour du 15 avril 2025). Les frais d'acte notarié, eux, sont payés par l'acquéreur sauf accord particulier." },
      { type: "p", text: "Pour un appartement en copropriété — la quasi-totalité du parc villeurbannais vendu —, le dossier de diagnostic technique à remettre comprend, selon le cas, les quatorze pièces ci-dessous. Les **durées de validité** de chacune, elles, sont détaillées dans notre fiche sur [les diagnostics obligatoires pour vendre](/blog/diagnostics-obligatoires-vente) :" },
      { type: "ul", items: [
        "le **diagnostic de performance énergétique (DPE)** ;",
        "le **constat de risque d'exposition au plomb** de la partie privative ;",
        "l'**état relatif à la présence ou l'absence d'amiante** ;",
        "l'**état de l'installation intérieure d'électricité**, si l'installation de la partie privative a plus de 15 ans ;",
        "l'**état de l'installation intérieure de gaz**, même condition de 15 ans ;",
        "l'**état relatif à la présence de termites** de la partie privative ;",
        "l'**état relatif au risque de mérule**, si le bâtiment est dans une zone fixée par arrêté préfectoral — à vérifier en mairie ;",
        "l'**état des risques et pollutions** (naturels, miniers, technologiques, sismiques, radon) ;",
        "le **diagnostic bruit**, si le bien est en zone d'un plan d'exposition au bruit des aérodromes ;",
        "le **certificat de conformité d'un appareil de chauffage au bois**, si le bien est dans le périmètre d'un plan de protection de l'atmosphère ;",
        "un éventuel **arrêté de mise en sécurité ou de traitement de l'insalubrité** portant sur la partie privative ;",
        "le **carnet d'information du logement** ;",
        "la **[surface privative du lot (loi Carrez)](/blog/loi-carrez-surface)** ;",
        "l'**état de l'installation d'assainissement non collectif**, si la copropriété n'est pas raccordée au réseau public.",
      ] },
      { type: "p", text: "Deux précisions utiles, et rarement écrites. L'**état des risques** ne se paie pas : il se remplit en ligne depuis le service public Géorisques — mais il doit être remis à l'acquéreur dès la **première visite** si le logement est en zone d'exposition, faute de quoi celui-ci pourra demander la résolution de la vente ou une diminution du prix. Et l'**état daté**, qui récapitule ce que vous devez à la copropriété et ce qu'elle vous doit, est établi par le syndic à votre demande et reste à votre charge : **son prix est plafonné à 380 € TTC** par le décret n° 2020-153 du 21 février 2020, et toute facturation supérieure peut être contestée. Nous détaillons [ce que le syndic peut facturer et ce qui se répartit entre vendeur et acquéreur](/blog/charges-copropriete)." },
      { type: "p", text: "Si un document du dossier de diagnostic technique manque le jour de l'acte, vous devez garantir le vice caché correspondant : la clause d'exclusion de garantie ne joue plus. Source : service-public.gouv.fr, fiche « Vente d'un logement en copropriété », vérifiée le 21 août 2025. Côté acheteur, le montant des frais d'acquisition est détaillé dans notre calcul des [frais de notaire à Villeurbanne et Lyon](/blog/frais-de-notaire-lyon-2026)." },

      { type: "h2", text: "Qu'est-ce qu'un particulier n'a pas le droit de faire lui-même dans une vente ?" },
      { type: "p", text: "Encaisser un acompte avant la fin du délai de rétractation de dix jours de l'acheteur. Exiger ou recevoir un versement — ou même un engagement de versement — avant ce terme est puni d'une **amende de 30 000 €**. Deux situations seulement y échappent : que la promesse soit conclue par l'intermédiaire d'un professionnel mandaté pour contribuer à la vente (notaire ou agent immobilier), ou que les fonds soient consignés chez un professionnel disposant d'une garantie financière dédiée au remboursement des sommes déposées." },
      { type: "p", text: "C'est la différence la plus nette entre vendre seul et vendre accompagné, et elle ne tient pas au confort : sans intermédiaire mandaté ni séquestre, un vendeur particulier ne peut sécuriser sa vente par un acompte qu'à partir du onzième jour. L'acompte se situe en général entre 5 et 10 % du prix. Source : service-public.gouv.fr, fiche « Vente d'un logement en copropriété », vérifiée le 21 août 2025." },

      { type: "h2", text: "Quels documents remettre pour que le délai de rétractation démarre ?" },
      { type: "p", text: "Sept documents de copropriété, et c'est le point que beaucoup de ventes entre particuliers découvrent trop tard : **le délai de rétractation de dix jours ne commence à courir que le lendemain du jour où l'acheteur les a tous reçus.** Un seul manquant, et l'acheteur reste libre de se retirer, sans que l'horloge ait démarré." },
      { type: "ul", items: [
        "la **fiche synthétique** des données financières et techniques de la copropriété ;",
        "le **règlement de copropriété et l'état descriptif de division**, ainsi que les actes modificatifs publiés ;",
        "les **procès-verbaux des assemblées générales des trois dernières années** ;",
        "le **montant des charges** hors budget prévisionnel et des charges courantes que vous avez payées sur les deux exercices précédant la vente ;",
        "s'il existe, le **montant de la part du fonds de travaux** rattachée au lot et la dernière cotisation versée ;",
        "les **sommes que l'acquéreur pourrait devoir** au syndicat des copropriétaires ;",
        "l'**état global des impayés de charges** du syndicat et de sa dette envers les fournisseurs.",
      ] },
      { type: "p", text: "L'annonce elle-même est encadrée, y compris entre particuliers : elle doit indiquer le prix, le nombre de lots de la copropriété, la situation géographique, la superficie, la composition et l'état du bien, le **montant annuel des charges du budget prévisionnel** que vous payez, les **dépenses prévisibles énumérées par le DPE**, l'existence éventuelle de procédures liées aux difficultés financières de la copropriété, et orienter l'acquéreur vers Géorisques. Si un professionnel est mandaté, elle précise en plus le montant de ses honoraires et qui les supporte." },

      { type: "h2", text: "Combien coûte une erreur de prix, comparée à la commission économisée ?" },
      { type: "p", text: "Dans la tranche 170 001 – 300 000 €, nos honoraires valent exactement 6 % du prix. **Une erreur de prix de 6 % annule donc, à l'euro près, l'économie réalisée en vendant seul.** Or l'erreur médiane d'une estimation faite sur les seules données publiques est, à Villeurbanne, de **15,5 %** — soit 30 225 € sur un bien à 195 000 €, c'est-à-dire 2,6 fois les honoraires économisés." },
      { type: "p", text: "Ce chiffre n'est pas un argument de vente : c'est le résultat d'un test que nous avons fait sur les 1 875 ventes d'appartements de 2025. Pour chacune, nous avons calculé le prix qu'aurait donné la méthode de base de toute estimation automatique — prix médian du quartier × surface — puis comparé au prix réellement signé chez le notaire." },
      { type: "ul", items: [
        "**18 % des ventes** tombent à moins de 5 % du prix réel ;",
        "**36 %** à moins de 10 % — soit moins de 19 500 € d'écart sur un bien à 195 000 € ;",
        "**62 %** à moins de 20 % ;",
        "l'erreur médiane est de **15,5 %**.",
      ] },
      { type: "p", text: "Deux ventes sur trois s'écartent donc de plus de 10 % — et 10 % du prix médian villeurbannais, 19 500 €, dépasse déjà largement les 11 700 € économisés. La méthode, les quartiles par quartier et l'écart en euros sont détaillés dans notre mesure de la [fiabilité d'une estimation en ligne](/blog/estimation-en-ligne-ou-agence)." },

      { type: "h2", text: "Dans quels quartiers de Villeurbanne vendre seul est-il le moins risqué ?" },
      { type: "p", text: "À Gratte-Ciel – Dedieu – Charmettes. C'est le quartier où une estimation faite au prix médian du secteur tombe le plus souvent juste : **42 % des ventes de 2025 à moins de 10 % du prix réel**, parce que le bâti y est homogène et le marché très actif (655 ventes sur l'année). À l'inverse, à Buers – Croix-Luizet et à Cyprian – Les Brosses, ce n'est le cas que dans **25 % des ventes** : une vente sur quatre." },
      { type: "ul", items: [
        "**Gratte-Ciel – Dedieu – Charmettes** : 42 % des ventes estimées à moins de 10 % près — le secteur le plus prévisible ;",
        "**Ferrandière – Maisons-Neuves** et **Perralière – Grandclément** : 35 à 37 % ;",
        "**Cusset – Bonnevay** : 33 % ;",
        "**Charpennes – Tonkin** : 28 % ;",
        "**Buers – Croix-Luizet** et **Cyprian – Les Brosses** : 25 %, les plus dispersés.",
      ] },
      { type: "p", text: "La lecture est mécanique : un quartier qui mêle petites copropriétés anciennes, immeubles récents et biens à rénover produit des prix au m² plus dispersés, donc une estimation de départ moins sûre. Si votre bien est à Buers ou à Cyprian – Les Brosses, une fourchette prise en ligne ne doit servir que de mise en route." },

      { type: "h2", text: "Faut-il vendre sans agence ? Notre réponse" },
      { type: "p", text: "Vendre seul est raisonnable quand trois conditions sont réunies en même temps : un bien situé dans un secteur au bâti homogène, du temps à consacrer aux visites et aux documents, et une référence de prix solide — pas une moyenne de portail. Si l'une des trois manque, vous jouez une économie de 11 700 € contre un risque de 30 225 €, et le calcul cesse d'être favorable." },
      { type: "p", text: "Rien n'oblige d'ailleurs à trancher tout de suite. Vous pouvez partir d'un repère gratuit par quartier sur notre page [estimation immobilière à Villeurbanne](/estimation-immobiliere-villeurbanne), puis décider. Et si vous préférez être accompagné, [notre façon de mener une vente](/vendre) est décrite étape par étape, honoraires publiés avant tout mandat." },
    ],
    faq: [
      {
        q: "Un acheteur paie-t-il moins cher un bien vendu de particulier à particulier ?",
        a: "Pas nécessairement. À Villeurbanne, nos honoraires de transaction sont à la charge du vendeur : le prix affiché par une agence n'est pas majoré d'une commission payée par l'acheteur. Ce qu'un acheteur peut espérer en achetant à un particulier, c'est un prix fixé sans référence professionnelle — ce qui joue dans les deux sens, puisque l'erreur médiane d'une estimation faite sur les seules données publiques est de 15,5 % dans la commune.",
      },
      {
        q: "Les diagnostics sont-ils à la charge du vendeur, même sans agence ?",
        a: "Oui. Les diagnostics obligatoires relèvent de l'obligation d'information du vendeur et restent à sa charge, qu'il passe ou non par une agence. PAP chiffre ce poste entre 200 et 700 € selon le type de bien, sa surface et le nombre de diagnostics nécessaires (page mise à jour le 15 avril 2025). L'état des risques, lui, est gratuit : il se remplit en ligne depuis le service public Géorisques.",
      },
      {
        q: "Peut-on demander un acompte à l'acheteur quand on vend sans agence ?",
        a: "Non, pas avant la fin du délai de rétractation de dix jours. Exiger ou recevoir un versement, ou même un engagement de versement, avant ce terme est puni d'une amende de 30 000 €. Deux exceptions seulement : une promesse conclue par l'intermédiaire d'un professionnel mandaté (notaire ou agent immobilier), ou des fonds consignés chez un professionnel disposant d'une garantie financière dédiée. Source : service-public.gouv.fr, fiche « Vente d'un logement en copropriété », vérifiée le 21 août 2025.",
      },
      {
        q: "Que risque-t-on si un document manque le jour de la signature ?",
        a: "Vous perdez la protection de la clause d'exclusion de garantie : si une pièce du dossier de diagnostic technique n'est pas remise, vous devez garantir le vice caché correspondant. Le cas de l'état des risques est plus lourd encore — s'il n'a pas été remis alors que le logement est en zone concernée, l'acquéreur peut demander l'annulation du contrat ou une diminution du prix. Et le délai de rétractation de dix jours ne démarre qu'une fois les sept documents de copropriété tous reçus. Source : service-public.gouv.fr, fiche « Vente d'un logement en copropriété », vérifiée le 21 août 2025.",
      },
      {
        q: "Combien coûtent les honoraires d'une agence pour vendre à Villeurbanne ?",
        a: "Chez nous, 9 000 € forfaitaires de 50 001 à 170 000 €, 6 % de 170 001 à 300 000 € et 5 % jusqu'à 500 000 €, à la charge du vendeur. Au prix médian d'un appartement villeurbannais — 195 000 € sur les ventes signées en 2025 — cela représente 11 700 €. Le barème complet est publié en ligne, tranche par tranche, et consultable avant tout mandat ; sur le marché, la commission se situe souvent entre 4 et 6 % du prix.",
      },
      {
        q: "Peut-on commencer à vendre seul, puis confier le bien à une agence ?",
        a: "Oui, c'est fréquent et ce n'est pas un échec : un bien mis en vente seul pendant quelques semaines donne une information utile, le nombre de contacts obtenus au prix affiché. Le point de vigilance est le prix de départ : un bien resté en ligne plusieurs semaines sans offre envoie un signal aux acheteurs, et le rattraper coûte souvent plus que les honoraires économisés. Mieux vaut donc vérifier le prix avant la mise en ligne qu'après.",
      },
    ],
  },
  {
    slug: "home-staging-vendre-plus-cher",
    title: "Home staging : 8 gestes qui font vendre plus cher",
    metaDescription:
      "Le home staging valorise votre bien pour vendre plus vite et plus cher. Découvrez 8 gestes simples et peu coûteux.",
    h1: "Home staging : 8 gestes qui font vendre plus cher",
    excerpt:
      "Mettre en valeur un bien pour que l'acheteur s'y projette, sans gros travaux. Les 8 gestes essentiels.",
    date: "2026-05-14",
    internalHref: "/vendre",
    internalLabel: "Préparer la vente de mon bien",
    blocks: [
      { type: "p", text: "**Le home staging consiste à mettre en valeur un bien pour que l'acheteur s'y projette** — sans gros travaux, juste de la présentation. Un bien « prêt à vivre » se vend plus vite et souvent plus cher." },
      { type: "h2", text: "Les 8 gestes essentiels" },
      { type: "ol", items: [
        "**Désencombrer** : retirer le superflu pour agrandir visuellement.",
        "**Dépersonnaliser** : enlever photos et objets trop personnels.",
        "**Réparer** les petits défauts (poignée, joint, peinture écaillée).",
        "**Neutraliser les couleurs** : des tons clairs et neutres.",
        "**Maximiser la lumière** : rideaux ouverts, ampoules puissantes.",
        "**Ranger et nettoyer** à fond, surtout cuisine et salle de bain.",
        "**Neutraliser les odeurs** (aération, pas de tabac).",
        "**Soigner les photos** : c'est la première impression en ligne.",
      ] },
    ],
  },
  {
    slug: "mandat-simple-ou-exclusif",
    title: "Mandat simple ou exclusif : lequel choisir pour vendre ?",
    metaDescription:
      "Mandat simple ou mandat exclusif : différences, avantages et inconvénients pour vendre votre bien au meilleur prix.",
    h1: "Mandat simple ou exclusif : lequel choisir ?",
    excerpt:
      "Le mandat simple ouvre à plusieurs agences ; l'exclusif en confie une seule. Lequel vend le mieux, et pourquoi.",
    date: "2026-04-30",
    updated: "2026-09-16",
    internalHref: "/vendre",
    internalLabel: "Discuter de la vente de mon bien",
    blocks: [
      { type: "p", text: "**Le mandat simple vous laisse confier le bien à plusieurs agences (et le vendre vous-même) ; le mandat exclusif le confie à une seule agence.** Chacun a sa logique — et si l'option qui vous tente est de vendre sans mandat du tout, le calcul chiffré est sur [vendre sans agence à Villeurbanne](/blog/vendre-sans-agence)." },
      { type: "h2", text: "Le mandat simple" },
      { type: "p", text: "Vous multipliez les canaux. Mais en pratique, un bien « partout » paraît moins exclusif, les agences s'y investissent moins, et le même bien à des prix différents brouille les acheteurs." },
      { type: "h2", text: "Le mandat exclusif" },
      { type: "p", text: "Une seule agence, donc un engagement fort : plus de moyens, un suivi dédié, une stratégie claire. Les biens en exclusivité se vendent souvent **plus vite et à un meilleur prix**, car l'agence concentre ses efforts." },
      { type: "h2", text: "Notre conseil" },
      { type: "p", text: "L'exclusif est généralement plus efficace, à condition de choisir une agence en qui vous avez confiance. Un point à vérifier avant de signer, quelle que soit l'agence : le type de mandat ne doit pas changer le tarif. [Notre barème de transaction](/honoraires) est le même dans les deux cas — il ne distingue pas mandat simple et mandat exclusif." },
    ],
  },
  {
    slug: "compromis-de-vente-delais",
    title: "Compromis de vente : délais, rétractation et points de vigilance",
    metaDescription:
      "Compromis de vente : ce que c'est, le délai de rétractation de 10 jours, les conditions suspensives et le délai jusqu'à l'acte.",
    h1: "Compromis de vente : délais et rétractation",
    excerpt:
      "L'avant-contrat qui engage vendeur et acheteur. Délai de rétractation, conditions suspensives et délai jusqu'à l'acte.",
    date: "2026-04-16",
    internalHref: "/acheter",
    internalLabel: "Acheter avec un accompagnement",
    blocks: [
      { type: "p", text: "**Le compromis de vente est l'avant-contrat qui engage vendeur et acheteur ; l'acheteur dispose ensuite d'un délai de rétractation de 10 jours.** C'est une étape clé, à comprendre avant de signer." },
      { type: "h2", text: "Le délai de rétractation" },
      { type: "p", text: "Après la signature, l'**acheteur a 10 jours** pour se rétracter sans justification ni pénalité. Le vendeur, lui, est engagé dès la signature." },
      { type: "h2", text: "Les conditions suspensives" },
      { type: "p", text: "Le compromis prévoit des conditions qui annulent la vente si elles ne se réalisent pas — la principale étant l'**obtention du prêt** par l'acheteur. Si la banque refuse, la vente est annulée et le dépôt restitué." },
      { type: "h2", text: "Le délai jusqu'à l'acte" },
      { type: "p", text: "Comptez généralement **2 à 3 mois** entre le compromis et la signature de l'acte authentique chez le notaire (le temps des vérifications et du financement)." },
    ],
  },
  {
    slug: "faire-offre-achat",
    title: "Faire une offre d'achat : montant, lettre et négociation",
    metaDescription:
      "Comment faire une offre d'achat immobilière : la formuler par écrit, fixer le montant, sa valeur d'engagement et bien négocier.",
    h1: "Faire une offre d'achat : le bon réflexe",
    excerpt:
      "Formuler une offre par écrit avec prix, durée et conditions. Sa valeur d'engagement et comment bien négocier.",
    date: "2026-04-02",
    internalHref: "/acheter",
    internalLabel: "Trouver le bon bien avec notre équipe",
    blocks: [
      { type: "p", text: "**Une offre d'achat se formule de préférence par écrit, avec un prix, une durée de validité et les conditions (notamment le financement).** Bien faite, elle vous positionne sérieusement sans vous piéger." },
      { type: "h2", text: "Le montant" },
      { type: "p", text: "Vous pouvez proposer au prix ou en dessous. Une offre trop basse peut vexer ; une offre au prix sécurise le bien si d'autres acheteurs sont intéressés." },
      { type: "h2", text: "Sa valeur d'engagement" },
      { type: "p", text: "Une offre **acceptée au prix** engage les deux parties. Mentionnez vos conditions ([obtention de prêt](/blog/capacite-emprunt-immobilier)) pour vous protéger." },
      { type: "h2", text: "Bien négocier" },
      { type: "p", text: "Appuyez-vous sur des éléments concrets : travaux à prévoir, DPE, durée de mise en vente, [prix du secteur](/blog/prix-immobilier-villeurbanne-2026). Une négociation argumentée passe mieux qu'un simple « c'est trop cher »." },
    ],
  },
  {
    slug: "capacite-emprunt-immobilier",
    title: "Capacité d'emprunt : combien pouvez-vous acheter ?",
    metaDescription:
      "Comment calculer sa capacité d'emprunt immobilier : taux d'endettement de 35 %, durée, apport et reste à vivre. Avec exemple.",
    h1: "Capacité d'emprunt : combien pouvez-vous acheter ?",
    excerpt:
      "Votre capacité dépend du taux d'endettement (35 % max), de la durée, de l'apport et du reste à vivre. Exemple chiffré.",
    date: "2026-03-19",
    updated: "2026-09-16",
    internalHref: "/acheter",
    internalLabel: "Définir mon projet d'achat",
    blocks: [
      { type: "p", text: "**Votre capacité d'emprunt dépend surtout de votre taux d'endettement, plafonné à 35 % de vos revenus (assurance comprise).** C'est la première chose à calculer avant de chercher un bien." },
      { type: "h2", text: "La règle des 35 %" },
      { type: "p", text: "Vos mensualités de crédit (assurance incluse) ne doivent pas dépasser **35 % de vos revenus nets**. La durée maximale est généralement de **25 ans**." },
      { type: "h2", text: "Ce qui compte aussi" },
      { type: "ul", items: [
        "**L'apport** : idéalement 10 % minimum pour couvrir les frais de notaire.",
        "**Le reste à vivre** : ce qu'il vous reste après le crédit.",
      ] },
      { type: "h2", text: "Exemple" },
      { type: "p", text: "Pour 3 500 € de revenus nets, la mensualité maximale est d'environ **1 225 €**, ce qui ouvre une capacité d'emprunt cohérente selon la durée et le taux." },
      { type: "h2", text: "Combien de mètres carrés votre capacité d'emprunt achète-t-elle à Villeurbanne ?" },
      { type: "p", text: "**Avec 250 000 €, vous achetez environ 65 m² à Gratte-Ciel et 91 m² à Cyprian – Les Brosses** : 27 m² d'écart pour le même budget, dans la même commune. Une capacité d'emprunt ne veut rien dire tant qu'on ne l'a pas traduite en surface. Nous avons converti trois budgets types en [surface accessible quartier par quartier](/blog/ou-acheter-villeurbanne-quartiers), à partir des ventes réellement signées à Villeurbanne en 2025." },
    ],
  },
  {
    slug: "charges-copropriete",
    title:
      "Charges de copropriété : la répartition, et qui paie l'année de la vente",
    metaDescription:
      "Comment se répartissent les charges de copropriété, qui les paie l'année de la vente, ce que coûte l'état daté (380 € TTC) et depuis quand votre copropriété doit tenir un plan pluriannuel de travaux.",
    h1: "Charges de copropriété : la répartition, et qui paie l'année de la vente",
    excerpt:
      "Les charges générales se répartissent à la quote-part du lot, celles d'équipement selon l'utilité objective. À la vente, le vendeur doit la provision du trimestre en cours et ne récupère pas son fonds de travaux. L'état daté reste plafonné à 380 € TTC.",
    date: "2026-03-05",
    updated: "2026-10-15",
    internalHref: "/acheter",
    internalLabel: "Acheter en toute sérénité",
    blocks: [
      { type: "p", text: "**Les charges de copropriété se répartissent selon deux règles, pas une : les charges générales à la quote-part de parties communes de votre lot, les charges de services collectifs et d'équipements communs selon l'utilité objective qu'ils présentent pour lui.** C'est le règlement de copropriété qui fixe ces clés. Le reste de cette page répond aux questions qui coûtent le plus cher quand on les découvre trop tard : qui paie quoi l'année de la vente, ce que devient le fonds de travaux, et ce que le syndic peut facturer." },
      { type: "p", text: "À Villeurbanne, **2 065 copropriétés sont immatriculées au registre national**, pour 165 101 lots. Nous avons extrait ce registre le 15 octobre 2026 pour établir ce que personne ne publie à cette échelle : la taille réelle de ces copropriétés et, surtout, **depuis quelle date chacune doit tenir un plan pluriannuel de travaux**. Pour les trois quarts d'entre elles, c'est seulement depuis le 1er janvier 2025." },

      { type: "h2", text: "Comment se répartissent les charges de copropriété ?" },
      { type: "p", text: "**Il existe deux catégories de charges et deux clés de répartition distinctes.** Les charges générales — administration, conservation et entretien des parties communes — sont dues par tous les copropriétaires, proportionnellement à la valeur relative de leur lot. Les charges de services collectifs et d'éléments d'équipement commun — chauffage, eau chaude, ascenseur, interphone, antenne — se répartissent, elles, selon l'utilité objective que ces services présentent pour chaque lot." },
      { type: "p", text: "La différence est très concrète. Un parking en sous-sol ne participe ni au chauffage ni à l'antenne collective, parce que ces équipements ne lui sont d'aucune utilité. Pour l'ascenseur, la charge varie selon l'étage desservi et la superficie du lot : un rez-de-chaussée paie moins qu'un cinquième étage. En revanche, un copropriétaire ne peut pas refuser de payer sa part d'ascenseur au motif qu'il ne s'en sert jamais — **le critère est l'utilité objective, pas l'usage réel.**" },
      { type: "p", text: "Trois dépenses échappent à toute répartition et restent imputables à un seul copropriétaire : les frais de recouvrement engagés contre lui, les prestations personnelles du syndic qu'il a demandées, et les travaux d'intérêt collectif réalisés sur ses parties privatives." },

      { type: "h3", text: "Qu'est-ce qu'un tantième, et où trouver le mien ?" },
      { type: "p", text: "**Le tantième est la fraction de la copropriété attachée à votre lot, exprimée en millièmes ou en dix-millièmes, et il figure dans l'état descriptif de division annexé au règlement de copropriété.** Il est fixé selon la consistance, la superficie et la situation du lot — jamais selon son usage ni le nombre d'occupants. Il sert à deux choses : votre part de charges générales, et votre poids de vote en assemblée générale." },

      { type: "h2", text: "Quand les charges sont-elles appelées, et que se passe-t-il en fin d'année ?" },
      { type: "p", text: "**Chaque année, l'assemblée générale vote un budget prévisionnel pour les dépenses courantes, et le syndic appelle des provisions exigibles le premier jour de chaque trimestre**, sauf si l'assemblée a fixé une autre période — mensuelle, par exemple. Ces appels ne sont pas le montant définitif de vos charges : ce sont des avances." },
      { type: "p", text: "À la clôture de l'exercice, le syndic compare les provisions encaissées aux dépenses réellement engagées. Un moins-perçu donne lieu à un appel complémentaire, qui n'est exigible qu'après l'approbation des comptes par l'assemblée. Un trop-perçu est reversé aux copropriétaires selon leur quote-part. **Cette date d'approbation des comptes compte beaucoup à la vente** : c'est elle, et non la date de l'acte, qui désigne qui encaisse ou qui règle la régularisation." },

      { type: "h2", text: "Qui paie les charges de copropriété l'année de la vente ?" },
      { type: "p", text: "**La règle légale ne proratise rien : le vendeur doit la provision du budget prévisionnel dès lors qu'elle était exigible avant la vente, et les dépenses hors budget prévisionnel incombent à celui qui est copropriétaire au jour où le paiement est demandé.** Un vendeur qui signe le 5 avril reste donc redevable de tout le trimestre entamé le 1er avril. Vendeur et acquéreur peuvent convenir d'une autre répartition dans l'acte — les notaires le prévoient presque systématiquement, au prorata du temps de détention — mais cet accord ne vaut qu'entre eux." },
      {
        type: "table",
        caption:
          "Qui doit quoi, l'année de la vente d'un lot de copropriété",
        headers: ["Somme en jeu", "Qui la doit, à défaut d'accord", "Ce qui déclenche l'obligation"],
        rows: [
          ["Provision du budget prévisionnel", "Le vendeur", "L'exigibilité au 1er jour du trimestre, ou de la période votée"],
          ["Dépense hors budget prévisionnel", "Le copropriétaire du jour de l'appel", "La date à laquelle le paiement est demandé"],
          ["Appel de fonds pour travaux votés", "Le vendeur si l'appel est émis avant la vente, l'acquéreur s'il est émis après", "Le calendrier d'appel voté, pas la date du vote ni le début du chantier"],
          ["Régularisation annuelle, en trop ou en moins", "Le copropriétaire en place à l'approbation des comptes", "La date d'approbation des comptes"],
          ["Cotisation déjà versée au fonds de travaux", "Acquise au syndicat : elle n'est pas remboursée au vendeur", "La vente ne rouvre pas le fonds"],
        ],
        source:
          "Décret n° 67-223 du 17 mars 1967, articles 6-2 (règle générale) et 6-3 (accord entre les parties). Fiche service-public.gouv.fr F32920, vérifiée le 13 février 2026.",
      },
      { type: "p", text: "**Ce que la répartition conventionnelle ne change pas : elle n'est pas opposable au syndic.** Le syndic continue d'appeler les charges auprès du propriétaire inscrit, à charge pour celui qui a payé de se retourner contre l'autre. Si l'acquéreur compte sur un remboursement du vendeur, mieux vaut que la somme soit séquestrée chez le notaire que promise dans une clause." },
      { type: "p", text: "⚠️ **Le cas qui surprend le plus souvent est celui des travaux votés avant la vente mais appelés après.** Ils sont dus par l'acquéreur, même si le vote a eu lieu des mois avant son arrivée dans l'immeuble et même si le chantier n'a pas commencé. C'est précisément pour cela que les procès-verbaux des trois dernières assemblées générales se lisent avant de signer, et non après." },

      { type: "h2", text: "Le fonds de travaux est-il perdu quand on vend ?" },
      { type: "p", text: "**Oui : les sommes versées au fonds de travaux sont définitivement acquises au syndicat et ne sont pas remboursées au vendeur.** Elles restent attachées au lot, dont elles augmentent la valeur — c'est la logique même du dispositif. Depuis 2023, le texte prévoit expressément que l'acquéreur peut consentir à verser au vendeur un montant équivalent à ces sommes, en sus du prix de vente. Ce n'est pas automatique : cela se négocie et s'écrit." },
      { type: "p", text: "Le montant en jeu n'est pas symbolique. La cotisation annuelle au fonds ne peut être inférieure à **5 % du budget prévisionnel** et, si l'assemblée a adopté un plan pluriannuel de travaux, elle ne peut non plus être inférieure à **2,5 % du montant des travaux que ce plan prévoit**. L'assemblée peut toujours voter davantage. La part du fonds rattachée au lot et le montant de la dernière cotisation versée font partie des informations financières que le vendeur doit remettre à l'acquéreur avant la signature : c'est là qu'on en lit le montant exact." },

      { type: "h2", text: "Combien coûte l'état daté, et qui le paie ?" },
      { type: "p", text: "**L'état daté est plafonné à 380 € TTC et il est à la charge du vendeur.** Seul le syndic peut l'établir ; il le transmet au notaire, qui le demande au moment de préparer l'acte. Le plafond est fixé par le décret n° 2020-153 du 21 février 2020, et toute facturation supérieure peut être contestée — y compris lorsque la vente porte sur plusieurs lots." },
      { type: "p", text: "Le document se lit en trois parties : ce que le vendeur doit au syndicat (provisions exigibles, charges impayées, avances de trésorerie, quote-part d'un emprunt collectif), ce que le syndicat doit au vendeur, et ce qui sera à la charge de l'acquéreur (provisions non encore exigibles, reconstitution des avances). Une annexe récapitule les charges et travaux des deux derniers exercices ainsi que les procédures judiciaires en cours." },
      { type: "p", text: "**Ce plafond a été attaqué, et il a tenu.** Deux chambres FNAIM — Grand Paris et Alpes-Maritimes — demandaient au Premier ministre de réexaminer les 380 €, qu'elles jugeaient déconnectés des coûts réels. **Le Conseil d'État a rejeté leur requête le 17 mars 2026, par sa décision n° 499299**, retenant notamment que la seule hausse générale des coûts et de l'inflation ne démontre pas que le plafond ne couvre plus la prestation, et relevant un avis de l'Autorité de la concurrence selon lequel l'établissement d'un état daté représente, dans la plupart des cas, environ une heure de travail. Le plafond de 380 € TTC reste donc en vigueur." },
      { type: "p", text: "⚠️ **Une vigilance subsiste, et elle porte un autre nom.** Le plafond ne couvre que l'état daté lui-même. Certains syndics facturent en plus un « pré-état daté », établi au stade du compromis, qui n'entre pas dans le champ du décret et n'est donc pas plafonné. Si cette ligne apparaît sur un devis, elle se discute — et elle ne remplace pas l'état daté, qui restera dû." },

      { type: "h2", text: "Quels documents de copropriété doit-on recevoir avant d'acheter ?" },
      { type: "p", text: "**Le vendeur doit remettre à l'acquéreur un dossier de copropriété au plus tard à la signature de la promesse de vente, et le délai de rétractation de dix jours ne commence pas à courir tant que ce dossier n'est pas reçu.** C'est la sanction la plus utile à connaître : un dossier incomplet ne bloque pas la vente, il repousse le point de départ du délai pendant lequel l'acquéreur peut encore renoncer." },
      { type: "p", text: "Les pièces d'organisation et de fonctionnement sont les suivantes :" },
      { type: "ul", items: [
        "**La fiche synthétique de la copropriété** : son organisation et ses données techniques et financières.",
        "**Le règlement de copropriété et l'état descriptif de division**, avec les actes qui les ont modifiés. C'est là que figurent vos tantièmes et les clés de répartition.",
        "**Les procès-verbaux des assemblées générales des trois dernières années**, où se lisent les travaux votés et les litiges en cours.",
        "**Le carnet d'entretien de l'immeuble.**",
        "**Les conclusions du diagnostic technique global (DTG)**, s'il en existe un.",
        "**Le plan pluriannuel de travaux**, ou son projet.",
        "**Une notice d'information** sur les droits et obligations des copropriétaires et le fonctionnement du syndicat.",
      ] },
      { type: "p", text: "S'y ajoutent quatre informations financières, et ce sont elles qui engagent votre budget :" },
      { type: "ul", items: [
        "**Le montant des charges courantes du budget prévisionnel et des charges hors budget prévisionnel** payées par le vendeur au titre des deux exercices comptables précédant la vente.",
        "**La part du fonds de travaux rattachée au lot** et le montant de la dernière cotisation versée.",
        "**Les sommes que l'acquéreur pourrait devoir au syndicat**, une avance de trésorerie par exemple.",
        "**L'état global des impayés de charges dans la copropriété et de la dette du syndicat envers ses fournisseurs.** C'est l'indicateur de santé le plus direct de l'immeuble, et le plus souvent survolé.",
      ] },
      { type: "p", text: "Deux pièces arrivent plus tard, par le notaire : **l'état daté**, et un **certificat du syndic de moins d'un mois** attestant que le vendeur est quitte de toute dette envers le syndicat. Le dossier de diagnostic technique du logement lui-même — DPE, amiante, plomb, électricité, gaz, termites, état des risques — suit une liste distincte, dont nous détaillons [le contenu et les durées de validité pièce par pièce](/blog/diagnostics-obligatoires-vente). La surface privative du lot, elle, relève de [la loi Carrez](/blog/loi-carrez-surface)." },

      { type: "h2", text: "Combien de copropriétés compte Villeurbanne, et de quelle taille sont-elles ?" },
      { type: "p", text: "**2 065 copropriétés sont immatriculées à Villeurbanne, pour 165 101 lots au total, dont 73 582 lots d'habitation.** La copropriété villeurbannaise médiane compte 44 lots. C'est une ville de copropriétés moyennes et petites : 429 d'entre elles, soit 20,8 %, comptent moins de dix lots à usage de logement, de bureau ou de commerce." },
      { type: "p", text: "⚠️ **Et voici la distinction qui décide de vos obligations : le « nombre de lots » qui compte juridiquement n'est pas le nombre total de lots.** La loi raisonne sur les seuls lots à usage de logements, de bureaux ou de commerces : elle ne compte ni les caves, ni les parkings, ni les celliers. À Villeurbanne, ce compteur légal totalise **79 797 lots contre 165 101 lots en tout**, et **1 744 copropriétés sur 2 065, soit 84,5 %, ont un compteur légal inférieur à leur nombre total de lots** — pour la copropriété médiane, il en représente la moitié. Une résidence de 60 lots sur le papier peut n'en compter que 25 au sens de la loi, et basculer ainsi dans une autre catégorie d'obligations." },
      {
        type: "table",
        caption:
          "Les 2 065 copropriétés de Villeurbanne par taille au sens de la loi, et la date depuis laquelle chacune doit tenir un plan pluriannuel de travaux",
        headers: ["Lots à usage de logement, bureau ou commerce", "Copropriétés", "Part", "Lots concernés", "Obligation depuis le"],
        rows: [
          ["Plus de 200", "36", "1,7 %", "11 317", "1er janvier 2023"],
          ["De 51 à 200", "432", "20,9 %", "37 597", "1er janvier 2024"],
          ["50 au plus", "1 597", "77,3 %", "30 883", "1er janvier 2025"],
          ["**Ensemble**", "**2 065**", "**100 %**", "**79 797**", "—"],
        ],
        source:
          "Registre national d'immatriculation des copropriétés (RNIC, Anah / data.gouv.fr), fichier à actualisation quotidienne extrait le 15 octobre 2026, copropriétés de code commune 69266. Le registre est déclaratif : il reflète ce que les syndics et les notaires y ont déclaré. Les parts sont arrondies au dixième et la somme des trois valeurs affichées vaut 99,9 %.",
      },
      { type: "p", text: "Ces trois dates ne sont pas un détail de calendrier : elles disent depuis quand votre assemblée générale aurait dû voter un plan pluriannuel de travaux et ajuster la cotisation au fonds. **Pour 1 597 copropriétés villeurbannaises sur 2 065, l'obligation n'est entrée en vigueur que le 1er janvier 2025.** C'est récent, et cela explique qu'autant de petites copropriétés n'aient encore ni plan voté ni cotisation réévaluée. Un acquéreur qui réclame le plan pluriannuel d'une résidence de trente lots à Villeurbanne pose donc une question parfaitement légitime, mais souvent sans réponse écrite à ce jour." },

      { type: "h2", text: "Qu'est-ce que le plan pluriannuel de travaux, et qui doit en avoir un ?" },
      { type: "p", text: "**Tout immeuble à destination partielle ou totale d'habitation soumis à la loi de 1965 doit faire établir un projet de plan pluriannuel de travaux à l'expiration d'un délai de quinze ans à compter de la réception des travaux de construction.** Le plan programme les travaux sur dix ans et s'actualise tous les dix ans. L'obligation est entrée en vigueur par paliers selon la taille de la copropriété : le 1er janvier 2023 au-delà de 200 lots, le 1er janvier 2024 de 51 à 200 lots, le 1er janvier 2025 pour 50 lots au plus." },
      { type: "p", text: "Le projet recense les travaux nécessaires à la sauvegarde de l'immeuble, à la santé et à la sécurité des occupants, aux économies d'énergie et à la réduction des émissions de gaz à effet de serre ; il estime le niveau de performance atteignable, chiffre sommairement les coûts, les hiérarchise et propose un échéancier sur dix ans. Les travaux retenus et leur échéancier sont ensuite intégrés au carnet d'entretien de l'immeuble." },
      { type: "p", text: "**Une dispense existe** : si un diagnostic technique global ne fait apparaître aucun besoin de travaux dans les dix années suivant son élaboration, le syndicat est dispensé d'établir le projet de plan. C'est l'une des raisons de demander le DTG, quand il existe, avant de s'inquiéter de l'absence de plan." },

      { type: "h2", text: "Que vérifier avant d'acheter en copropriété à Villeurbanne ?" },
      { type: "ol", items: [
        "**Le montant réel des charges sur deux exercices**, et non celui annoncé dans l'annonce. Le vendeur doit vous le remettre pour les deux exercices précédant la vente, en distinguant charges courantes et charges hors budget prévisionnel.",
        "**Les procès-verbaux des trois dernières assemblées**, en cherchant précisément les travaux votés dont les appels de fonds n'ont pas encore été émis : ceux-là seront à votre charge.",
        "**L'état global des impayés et la dette fournisseurs.** Dans une copropriété où les impayés sont élevés, les charges des copropriétaires à jour finissent par absorber la défaillance des autres.",
        "**Le plan pluriannuel de travaux et la part du fonds rattachée au lot** — et, à défaut de plan, depuis quand l'obligation s'applique à une résidence de cette taille (voir le tableau ci-dessus).",
        "**Les équipements qui pèsent durablement** : ascenseur, chauffage collectif, gardiennage, espaces verts. Ce sont eux, et non la surface du lot, qui expliquent l'essentiel des écarts de charges d'un immeuble à l'autre.",
      ] },
      { type: "p", text: "Un dernier repère villeurbannais, utile pour savoir à qui s'adresser : **parmi les 1 480 copropriétés de la commune qui déclarent au registre le type de leur syndic, 95,5 % ont un syndic professionnel et 4,5 % un syndic bénévole.** Les 585 autres n'ont pas renseigné ce champ, ce qui ne veut pas dire qu'elles sont sans syndic." },

      { type: "h2", text: "Où sont écrites ces règles ?" },
      { type: "p", text: "**La répartition des charges est à l'article 10 de la loi n° 65-557 du 10 juillet 1965, le fonds de travaux à son article 14-2-1, le plan pluriannuel de travaux à son article 14-2 et les frais d'état daté à son article 10-1.** La répartition entre vendeur et acquéreur relève des articles 6-2 et 6-3 du décret n° 67-223 du 17 mars 1967, et le contenu de l'état daté de son article 5. Le plafond de 380 € TTC est fixé par le décret n° 2020-153 du 21 février 2020. Les documents à remettre à l'acquéreur sont aux articles L721-1 à L721-3 du code de la construction et de l'habitation, les délais de rétractation et de réflexion aux articles L271-1 à L271-3 du même code." },
      { type: "p", text: "Les éléments de cette page ont été vérifiés le 15 octobre 2026 sur les sources suivantes : les fiches service-public.gouv.fr « Charges de copropriété » (F2590) et « Faut-il un état daté pour vendre un logement dans une copropriété ? » (F37294), toutes deux vérifiées le 18 février 2026 ; « Qui paie les charges de copropriété l'année de la vente du logement ? » (F32920), vérifiée le 13 février 2026 ; « Vente d'un logement en copropriété » (F2604), vérifiée le 21 août 2025 ; les fiches de l'Institut national de la consommation sur le fonds de travaux (vérifiée le 11 février 2026) et sur le plan pluriannuel de travaux (vérifiée le 26 juin 2026) ; et la décision n° 499299 du Conseil d'État du 17 mars 2026 sur le plafonnement de l'état daté. Les données locales proviennent du registre national d'immatriculation des copropriétés, extrait le 15 octobre 2026." },
    ],
    faq: [
      {
        q: "Qui paie les charges de copropriété l'année de la vente, le vendeur ou l'acheteur ?",
        a: "Selon la loi, le vendeur doit la provision du budget prévisionnel dès lors qu'elle était exigible avant la vente : un vendeur qui signe le 5 avril reste redevable de tout le trimestre entamé le 1er avril, sans prorata. Les dépenses hors budget prévisionnel incombent en revanche à celui qui est copropriétaire au jour où le paiement est demandé. Vendeur et acquéreur peuvent convenir d'un prorata dans l'acte, mais cet accord n'est pas opposable au syndic : celui-ci continue d'appeler les charges auprès du propriétaire inscrit.",
      },
      {
        q: "Récupère-t-on le fonds de travaux quand on vend son appartement ?",
        a: "Non. Les sommes versées au fonds de travaux sont définitivement acquises au syndicat et ne sont pas remboursées au vendeur : elles restent attachées au lot. Depuis 2023, l'acquéreur peut toutefois consentir à verser au vendeur un montant équivalent à ces sommes, en sus du prix de vente. Rien ne le rend automatique : cela se négocie et s'écrit dans l'acte.",
      },
      {
        q: "Combien un syndic peut-il facturer pour un état daté ?",
        a: "380 € TTC au maximum, plafond fixé par le décret n° 2020-153 du 21 février 2020, et la somme est à la charge du vendeur. Toute facturation supérieure peut être contestée, y compris si la vente porte sur plusieurs lots. Le Conseil d'État a rejeté le 17 mars 2026, par sa décision n° 499299, le recours de deux chambres FNAIM qui demandaient le relèvement de ce plafond : il reste en vigueur. Attention en revanche au « pré-état daté » parfois facturé au stade du compromis, qui n'entre pas dans le champ du décret et n'est donc pas plafonné.",
      },
      {
        q: "Les travaux votés avant la vente sont-ils à la charge du vendeur ?",
        a: "Pas nécessairement. Ce qui compte est la date d'émission de l'appel de fonds, et non la date du vote ni le début du chantier : le vendeur paie les appels émis avant la vente, l'acquéreur ceux émis après. Un acquéreur peut donc devoir financer des travaux votés plusieurs mois avant son arrivée dans l'immeuble, et même non commencés. C'est pourquoi les procès-verbaux des trois dernières assemblées générales se lisent avant de signer.",
      },
      {
        q: "Un copropriétaire du rez-de-chaussée peut-il refuser de payer l'ascenseur ?",
        a: "Non, mais sa part est plus faible. Les charges d'ascenseur se répartissent selon l'utilité objective de l'équipement pour chaque lot : elles varient avec l'étage desservi et la superficie du lot, de sorte qu'un rez-de-chaussée paie moins qu'un étage élevé. Le critère est l'utilité objective et non l'usage réel : ne jamais prendre l'ascenseur ne dispense pas d'y contribuer. En revanche, un lot qu'un équipement ne peut pas desservir n'en paie pas les charges — un parking en sous-sol ne participe ni au chauffage ni à l'antenne collective.",
      },
      {
        q: "Depuis quand une copropriété doit-elle avoir un plan pluriannuel de travaux ?",
        a: "Cela dépend de son nombre de lots à usage de logement, de bureau ou de commerce. L'obligation s'applique depuis le 1er janvier 2023 au-delà de 200 lots, depuis le 1er janvier 2024 de 51 à 200 lots, et depuis le 1er janvier 2025 pour 50 lots au plus. L'immeuble doit par ailleurs avoir plus de quinze ans depuis la réception des travaux de construction. À Villeurbanne, 1 597 des 2 065 copropriétés immatriculées relèvent du dernier palier, soit 77,3 % : pour la majorité des copropriétés de la commune, l'obligation est donc récente.",
      },
      {
        q: "Comment connaître ses tantièmes de charges de copropriété ?",
        a: "Ils figurent dans l'état descriptif de division annexé au règlement de copropriété, que le vendeur doit vous remettre au plus tard à la signature de la promesse de vente. Les tantièmes sont fixés selon la consistance, la superficie et la situation du lot, et non selon son usage ou le nombre d'occupants. Ils déterminent à la fois votre part de charges générales et votre poids de vote en assemblée générale.",
      },
    ],
  },
  {
    slug: "cout-gestion-locative",
    title: "Gestion locative : combien ça coûte vraiment ?",
    metaDescription:
      "Quel est le coût d'une gestion locative en agence ? Pourcentage des loyers, services inclus, garantie loyers impayés et déductibilité.",
    h1: "Gestion locative : combien ça coûte vraiment ?",
    excerpt:
      "En général 6 à 8 % TTC des loyers encaissés, en partie déductibles. Ce que ça inclut et la garantie loyers impayés.",
    date: "2026-02-19",
    updated: "2026-09-16",
    internalHref: "/gestion-locative",
    internalLabel: "Découvrir notre gestion locative",
    blocks: [
      { type: "p", text: "**Une agence facture généralement entre 6 et 8 % des loyers encaissés pour gérer votre bien.** Chez Markus Immobilier, la gestion courante est facturée **6 % du total des encaissements mensuels par lot** (minimum 25 €), soit le bas de cette fourchette — [notre barème de gestion locative](/honoraires) est public, ligne par ligne. Ces frais sont en partie déductibles de vos revenus fonciers." },
      { type: "h2", text: "Ce que ça inclut" },
      { type: "p", text: "Recherche et sélection du locataire, rédaction du bail, états des lieux, encaissement des loyers, quittances, gestion des sinistres et des impayés, suivi des obligations légales." },
      { type: "p", text: "Deux frais fixes s'ajoutent au pourcentage dans notre barème, et c'est précisément ce que les fourchettes publiées ailleurs ne disent pas : **20 € par an** de frais et débours (extranet), et **45 € par lot et par an** si vous souhaitez recevoir les courriers par voie postale." },
      { type: "h2", text: "Les options" },
      { type: "p", text: "La **garantie loyers impayés (GLI)** peut s'ajouter pour sécuriser vos revenus en cas de défaut du locataire : elle est facturée **2,5 %** chez Markus Immobilier. Les interventions ponctuelles (aide à la déclaration des revenus fonciers, envoi d'un congé en recommandé, clôture de gestion, suivi de travaux) sont tarifées à part, à l'unité." },
      { type: "h2", text: "Le bon calcul" },
      { type: "p", text: "Le coût se compare au temps et au risque que vous évitez. Pour un propriétaire occupé ou éloigné, déléguer est vite rentable." },
      { type: "p", text: "Cet article donne la fourchette du marché et nos deux frais fixes. Si votre question est **combien ça coûte en euros sur votre bien**, le calcul complet est fait sur un appartement villeurbannais réel — 62 m² loué au loyer médian communal, coût d'une année de gestion, seuil d'application du minimum, comparaison de deux taux HT et TTC — sur [ce que coûte la gestion locative à Villeurbanne](/faire-gerer)." },
    ],
  },
  {
    slug: "rentabilite-locative-lyon",
    title:
      "Rentabilité locative à Villeurbanne : le rendement réel, quartier par quartier",
    metaDescription:
      "Rendement locatif brut calculé sur les prix d'appartements réellement signés à Villeurbanne en 2025 : 4,47 % à Ferrandière, 6,40 % à Cyprian – Les Brosses, 4,91 % sur la commune. Frais de notaire, passage au net et loyer plafonné.",
    h1: "Rentabilité locative à Villeurbanne : le rendement réel, quartier par quartier",
    excerpt:
      "Le rendement brut calculé sur les prix d'appartements réellement signés à Villeurbanne en 2025 : de 4,47 % à Ferrandière – Maisons-Neuves à 6,40 % à Cyprian – Les Brosses, 4,91 % sur la commune entière. Frais de notaire compris, il faut retirer au moins 0,31 à 0,45 point.",
    date: "2026-02-05",
    updated: "2026-10-14",
    internalHref: "/estimation",
    internalLabel: "Estimer un bien avant d'investir",
    blocks: [
      { type: "p", text: "**À Villeurbanne, le rendement locatif brut d'un appartement va de 4,47 % à 6,40 % selon le quartier, et il s'établit à 4,91 % sur la commune entière.** Ces chiffres croisent les prix réellement signés en 2025 (base DVF) et le loyer médian communal, 14,60 €/m² hors charges. Ils sont plus bas que la plupart des rendements affichés en ligne, pour une raison simple : ils partent des prix payés, pas des prix demandés — un écart que nous avons [mesuré source par source](/blog/investir-locatif-lyon)." },

      { type: "h2", text: "Quelle rentabilité locative peut-on vraiment espérer à Villeurbanne ?" },
      { type: "p", text: "**Entre 4,5 % et 6,4 % brut selon le quartier, et 4,9 % au niveau de la commune.** Le calcul est toujours le même : loyer annuel hors charges divisé par le prix d'achat. Ce qui change d'un tableau à l'autre, c'est le prix placé au dénominateur — ici la médiane des ventes d'appartements enregistrées à Villeurbanne en 2025 dans la base DVF, et non un prix d'annonce." },
      {
        type: "table",
        caption:
          "Rendement locatif brut par quartier de Villeurbanne, au prix médian des ventes 2025 et au loyer médian communal",
        headers: [
          "Quartier",
          "Médiane 2025",
          "Rendement brut",
          "Frais de notaire inclus",
        ],
        rows: [
          ["Cyprian – Les Brosses", "2 738 €/m²", "6,40 %", "5,95 %"],
          ["Cusset – Bonnevay", "3 171 €/m²", "5,53 %", "5,14 %"],
          ["Buers – Croix-Luizet", "3 271 €/m²", "5,36 %", "4,98 %"],
          ["Perralière – Grandclément", "3 375 €/m²", "5,19 %", "4,83 %"],
          ["Charpennes – Tonkin", "3 524 €/m²", "4,97 %", "4,62 %"],
          ["Gratte-Ciel – Dedieu – Charmettes", "3 846 €/m²", "4,56 %", "4,24 %"],
          ["Ferrandière – Maisons-Neuves", "3 923 €/m²", "4,47 %", "4,15 %"],
          ["**Villeurbanne (commune)**", "**3 567 €/m²**", "**4,91 %**", "**4,57 %**"],
        ],
        source:
          "Prix : médianes DVF 2025 (data.gouv.fr / Etalab), calcul Markus Immobilier. Loyer : 14,60 €/m² hors charges, médiane communale de la carte des loyers publiée sur data.gouv.fr. Frais de notaire : 7,5 %.",
      },
      { type: "p", text: "**Ce que ce tableau ne dit pas.** Il applique le même loyer à tous les quartiers, parce qu'il n'existe pas de loyer de référence publié à la maille du quartier. Les écarts que vous lisez ci-dessus sont donc exactement des écarts de prix, à loyer constant : un secteur où les loyers réels dépassent la médiane communale rendra un peu plus, un secteur en dessous un peu moins. Nous préférons l'écrire plutôt que de fabriquer un loyer par quartier que personne ne mesure." },
      { type: "p", text: "C'est aussi pourquoi nous ne publions pas le même tableau par nombre de pièces : un T1 se loue nettement plus cher au mètre carré qu'un T4, et un loyer unique donnerait un classement faux. Ce que nos données disent sans ambiguïté, en revanche, c'est le prix — le T1 médian s'échange à 4 000 €/m² à Villeurbanne en 2025, le T4 à 3 211 €/m² — soit 19,7 % de moins au mètre carré pour le T4, ou 24,6 % de plus pour le T1. Les deux formulations décrivent le même écart : elles ne se rapportent simplement pas à la même base." },

      { type: "h2", text: "Pourquoi le rendement que je calcule est-il plus bas que celui qu'on m'annonce ?" },
      { type: "p", text: "**Parce que le calcul annoncé part presque toujours d'un prix trop bas et d'un loyer trop haut.** Trois erreurs reviennent, et toutes les trois poussent le résultat dans le même sens : vers le haut. Les corriger fait perdre entre un demi-point et un point et demi." },
      { type: "ol", items: [
        "**Le prix d'annonce n'est pas le prix signé.** Un rendement calculé sur un prix demandé est un rendement que personne n'obtient. Les [prix réellement payés par quartier à Villeurbanne](/blog/prix-immobilier-villeurbanne-2026) sont publics : ils viennent de la base DVF, qui enregistre les mutations effectives.",
        "**Le loyer de référence est pris trop haut.** Démonstration au prix médian de Gratte-Ciel – Dedieu – Charmettes, 3 846 €/m² en 2025 : pour afficher 6 % de rendement brut, il faudrait louer à 19,23 €/m² hors charges, soit près de 32 % au-dessus de la médiane communale. Ce n'est pas impossible, mais ce n'est plus un cas médian — et à Villeurbanne le loyer est plafonné (voir plus bas).",
        "**Les frais d'acquisition disparaissent du dénominateur.** Une opération ne coûte pas le prix affiché, mais ce prix plus les [frais de notaire, 7 à 8 % dans l'ancien](/blog/frais-de-notaire-lyon-2026).",
      ] },

      { type: "h2", text: "Faut-il inclure les frais de notaire dans le calcul de rentabilité ?" },
      { type: "p", text: "**Oui, et cela retire au moins 0,31 à 0,45 point de rendement brut selon le quartier.** Ce qui est immobilisé dans une opération, c'est le prix plus les frais : c'est donc ce total qui doit figurer au dénominateur. Les calculs ci-dessous appliquent 7,5 %, une hypothèse volontairement basse : le [calcul poste par poste des frais de notaire à Villeurbanne](/blog/frais-de-notaire-lyon-2026) montre que les deux seuls postes exactement calculables — taxes départementales et émoluments du notaire — atteignent déjà 7,49 % à 7,72 % du prix aux niveaux villeurbannais, débours non compris. À 7,5 %, le rendement communal passe de 4,91 % à 4,57 % ; avec les frais réellement dus, il descend légèrement en dessous." },
      { type: "p", text: "L'effet est mécaniquement plus fort là où le rendement de départ est élevé : Cyprian – Les Brosses perd 0,45 point (6,40 % → 5,95 %), Ferrandière – Maisons-Neuves 0,31 point (4,47 % → 4,15 %). Le classement des quartiers, lui, ne bouge pas : des frais proportionnels n'inversent aucun ordre." },

      { type: "h2", text: "Comment passer du rendement brut au rendement net ?" },
      { type: "p", text: "**En convertissant chaque charge annuelle en points de rendement, puis en les retranchant du brut.** C'est plus fiable que de chercher un « rendement net moyen » : les charges d'un logement sont propres à ce logement. Sur le cas de référence ci-dessous, chaque tranche de 100 € de charge annuelle retire 0,055 point." },
      { type: "p", text: "**Le cas de référence.** Un T2 au prix médian villeurbannais de 2025 — **170 000 € pour 45 m²**, les deux médianes des T2 d'appartements vendus en 2025 dans la base DVF — loué au loyer médian communal, soit 657 € par mois hors charges et 7 884 € par an. Rendement brut sur le prix : 4,64 %. Sur le coût total de l'opération, frais de notaire à 7,5 % compris (182 750 €) : 4,31 %. ⚠️ Prix médian et surface médiane sont deux médianes distinctes, calculées chacune sur l'ensemble des T2 : les diviser l'une par l'autre (3 778 €/m²) ne redonne pas le prix médian au m² des T2, qui vaut 3 830 €/m² et qui est lui aussi une médiane. L'écart est normal et il n'est pas une erreur de calcul." },
      {
        type: "table",
        caption:
          "Ce que chaque poste coûte en points de rendement — T2 de 45 m² acheté 170 000 € et loué 657 €/mois HC",
        headers: ["Poste", "Montant", "Effet sur le rendement"],
        rows: [
          ["Frais de notaire (7,5 %)", "12 750 € à l'achat", "−0,32 point"],
          ["Un mois de vacance locative", "657 €", "−0,36 point"],
          ["Gestion locative déléguée (6 % des encaissements + 20 € de débours)", "493 €/an", "−0,27 point"],
          ["Garantie loyers impayés (2,5 %)", "197 €/an", "−0,11 point"],
          ["**Toute autre charge : taxe foncière, charges non récupérables, assurance PNO, entretien**", "**par tranche de 100 €/an**", "**−0,055 point**"],
        ],
        source:
          "Prix et surface : médianes DVF 2025 des T2 villeurbannais. Loyer : médiane communale, carte des loyers data.gouv.fr. Taux de gestion et GLI : barème public Markus Immobilier. Calcul Markus Immobilier, rendements rapportés au coût total de l'opération.",
      },
      { type: "p", text: "**Nous ne publions pas de montant de taxe foncière, et c'est volontaire.** Elle dépend de la valeur locative cadastrale du lot : deux appartements du même immeuble peuvent être imposés différemment, et toute « moyenne villeurbannaise » serait une invention. La seule donnée fiable est l'avis de taxe foncière du vendeur — réclamez-le avant de signer, puis reportez le montant dans la dernière ligne du tableau. Mille euros de taxe foncière, ce sont 0,55 point de rendement en moins." },
      { type: "p", text: "La gestion déléguée est la seule de ces lignes dont le coût est connu à l'avance : [notre barème](/honoraires) est public et [ce qu'il couvre exactement](/blog/cout-gestion-locative) est détaillé ailleurs. L'arbitrage complet — déléguer ou gérer seul, fiscalité comprise — est traité sur [notre page gestion locative](/gestion-locative)." },

      { type: "h2", text: "Le loyer que je peux demander est-il plafonné à Villeurbanne ?" },
      { type: "p", text: "**Oui. Villeurbanne applique l'encadrement des loyers, au même titre que Lyon.** Le loyer hors charges d'un bail neuf ou renouvelé ne peut pas dépasser un plafond — le « loyer de référence majoré » — fixé par arrêté préfectoral, qui varie selon le secteur, le nombre de pièces, l'époque de construction et le caractère meublé ou vide du logement. Un rendement bâti sur un loyer supérieur à ce plafond n'est pas optimiste : il est inapplicable." },
      { type: "p", text: "Le dispositif a connu une secousse judiciaire qu'un investisseur doit connaître. Le [tribunal administratif de Lyon a annulé, le 14 octobre 2025, l'arrêté préfectoral du 29 septembre 2023](https://lyon.tribunal-administratif.fr/decisions-de-justice/dernieres-decisions/encadrement-des-loyers-a-lyon-et-villeurbanne-le-tribunal-annule-l-arrete-prefectoral-prevoyant-sa-mise-en-place) qui instaurait l'encadrement à Lyon et Villeurbanne, en jugeant que la carte annexée ne permettait pas de déterminer les contours exacts des secteurs (requête n° 2309987). L'annulation porte sur un arrêté, pas sur le principe : l'encadrement reste un dispositif légal et [Lyon et Villeurbanne figurent toujours parmi les communes concernées](https://www.service-public.gouv.fr/particuliers/vosdroits/F1314)." },
      { type: "p", text: "En pratique : avant de fixer un loyer ou d'en tirer un rendement, vérifiez le plafond applicable à la date de signature du bail dans [l'arrêté en vigueur publié par la préfecture du Rhône](https://www.rhone.gouv.fr/Actions-de-l-Etat/Amenagement-du-territoire-urbanisme-construction-logement/Logement/Encadrement-des-loyers). Nous ne reproduisons pas ces plafonds ici : ils sont révisés chaque année, et une valeur périmée coûterait plus cher qu'une absence de valeur." },

      { type: "h2", text: "Quel quartier de Villeurbanne offre le meilleur rendement locatif ?" },
      { type: "p", text: "**Cyprian – Les Brosses, avec 6,40 % brut, devant Cusset – Bonnevay (5,53 %) et Buers – Croix-Luizet (5,36 %).** Ce sont les trois quartiers où le prix au mètre carré est le plus bas, et à loyer constant le rendement brut n'est rien d'autre que l'inverse du prix. Le meilleur rendement n'est donc pas une performance : c'est un prix d'entrée bas." },
      { type: "p", text: "Deux réserves avant d'en faire une stratégie. D'abord l'échantillon : la médiane de Cyprian – Les Brosses repose sur 53 ventes en 2025, contre 655 à Gratte-Ciel — elle est plus sensible à quelques transactions atypiques. Ensuite la revente : un rendement élevé ne dit rien de la liquidité du secteur. Le détail quartier par quartier, budget par budget, est dans [notre comparatif des quartiers de Villeurbanne](/blog/ou-acheter-villeurbanne-quartiers)." },

      { type: "h2", text: "Le rendement locatif villeurbannais a-t-il monté ou baissé ?" },
      { type: "p", text: "**Il a monté, mais par le bas : ce sont les prix qui ont reculé.** La médiane communale est passée de 3 981 €/m² en 2022 à 3 567 €/m² en 2025, soit −10,4 %. À loyer inchangé, cette seule baisse a ajouté 0,51 point de rendement brut, de 4,40 % à 4,91 %." },
      { type: "p", text: "La nuance compte pour un acheteur : le rendement d'aujourd'hui est meilleur qu'en 2022 parce que le bien coûte moins cher, pas parce qu'il rapporte davantage. Elle compte tout autant pour un propriétaire qui veut savoir [ce que vaut réellement son bien aujourd'hui](/estimation-immobiliere-villeurbanne)." },

      { type: "p", text: "**Méthode.** Prix : médianes des ventes d'appartements enregistrées à Villeurbanne (commune 69266) en 2025 dans la base DVF publiée par Etalab sur data.gouv.fr, rattachées aux contours de quartiers officiels de la Métropole de Lyon — une seule ligne bâtie par mutation, surfaces d'au moins 10 m², médiane et jamais moyenne. Loyer : médiane communale hors charges de la carte des loyers publiée sur data.gouv.fr, 14,60 €/m² pour un appartement. Frais de notaire : 7,5 % du prix, hypothèse volontairement basse et non un milieu de fourchette — à Villeurbanne, taxes et émoluments seuls pèsent 7,49 % à 7,72 % du prix, débours non compris (calcul détaillé dans l'article consacré aux frais de notaire). Rendements calculés par Markus Immobilier et arrondis au centième de point." },
    ],
    faq: [
      {
        q: "Rendement brut ou rendement net : lequel faut-il regarder ?",
        a: "Le brut sert à comparer des biens entre eux, le net sert à décider. Le rendement brut — loyer annuel hors charges divisé par le prix d'achat — ne dépend que de deux chiffres, ce qui le rend comparable d'un bien à l'autre ; c'est sa seule vertu. Le rendement net retranche les charges réelles du logement (taxe foncière, charges non récupérables, assurance propriétaire non occupant, gestion, vacance) et c'est le seul qui corresponde à ce que vous encaisserez. Sur notre cas de référence villeurbannais, un T2 de 45 m² acheté 170 000 €, chaque tranche de 100 € de charge annuelle retire 0,055 point au brut.",
      },
      {
        q: "Où trouver les prix réellement signés à Villeurbanne ?",
        a: "Dans la base DVF (demandes de valeurs foncières), publiée en accès libre par Etalab sur data.gouv.fr. Elle recense les mutations enregistrées par l'administration fiscale, c'est-à-dire les prix effectivement portés dans les actes, et non les prix demandés dans les annonces. C'est la source des médianes publiées sur cette page : 3 567 €/m² pour la commune en 2025, sur 1 875 ventes d'appartements exploitables, et de 2 738 à 3 923 €/m² selon le quartier.",
      },
      {
        q: "Comment connaître la taxe foncière d'un logement avant de l'acheter ?",
        a: "En demandant au vendeur son dernier avis de taxe foncière, avant de signer le compromis. Le montant dépend de la valeur locative cadastrale du lot et des taux votés par les collectivités : deux appartements du même immeuble peuvent être imposés différemment, et aucune moyenne communale ne remplace l'avis réel. Réclamez dans le même mouvement les trois derniers procès-verbaux d'assemblée générale et le détail des charges de copropriété non récupérables : ce sont les deux autres lignes qui creusent l'écart entre rendement brut et rendement net.",
      },
      {
        q: "Faut-il déduire la vacance locative du rendement ?",
        a: "Oui, et son poids se chiffre simplement : sur notre cas de référence villeurbannais, un mois sans locataire coûte 657 € et retire 0,36 point de rendement. C'est davantage qu'une année entière de gestion déléguée, qui revient à 493 € et 0,27 point. Un rendement annoncé sans hypothèse de vacance suppose implicitement douze mois de loyer sur douze, chaque année, changements de locataire compris.",
      },
      {
        q: "Un rendement brut de 6 % est-il atteignable à Villeurbanne ?",
        a: "Oui, mais pas partout ni au loyer médian. Au prix médian 2025 de Cyprian – Les Brosses, 2 738 €/m², le rendement brut ressort à 6,40 % avec le seul loyer médian communal. En revanche, au prix médian de Gratte-Ciel – Dedieu – Charmettes, 3 846 €/m², atteindre 6 % exigerait un loyer de 19,23 €/m² hors charges, soit près de 32 % au-dessus de la médiane communale — sachant qu'à Villeurbanne le loyer d'un bail neuf ou renouvelé est plafonné par l'arrêté préfectoral d'encadrement des loyers.",
      },
      {
        q: "Les petites surfaces rapportent-elles vraiment plus ?",
        a: "Elles se louent plus cher au mètre carré, mais elles s'achètent aussi plus cher au mètre carré, et c'est ce second point qu'on oublie. À Villeurbanne, sur les ventes de 2025, le T1 médian s'échange à 4 000 €/m² contre 3 211 €/m² pour le T4, soit 24,6 % de plus. Markus Immobilier ne publie pas de rendement par nombre de pièces parce qu'il n'existe pas de loyer de référence public à cette maille : appliquer un loyer unique à toutes les typologies donnerait un classement faux, artificiellement favorable aux grandes surfaces.",
      },
    ],
  },
  {
    slug: "questions-a-poser-visite",
    title: "Visite d'un bien : les 15 questions à poser",
    metaDescription:
      "La check-list des 15 questions essentielles à poser lors de la visite d'un appartement ou d'une maison avant d'acheter.",
    h1: "Visite d'un bien : les 15 questions à poser",
    excerpt:
      "Les bonnes questions révèlent les vrais coûts et les problèmes éventuels. La check-list à garder en tête en visite.",
    date: "2026-01-22",
    internalHref: "/acheter",
    internalLabel: "Acheter avec notre accompagnement",
    blocks: [
      { type: "p", text: "**Avant de faire une offre, posez les bonnes questions : elles révèlent les vrais coûts et les éventuels problèmes.** Voici la check-list à garder en tête." },
      { type: "h2", text: "Sur le bien" },
      { type: "ol", items: [
        "Quelle est la raison de la vente ?",
        "Depuis quand est-il en vente ?",
        "Quel est le DPE ?",
        "Des travaux récents ont-ils été faits ?",
        "L'isolation et le chauffage ?",
        "Y a-t-il des traces d'humidité ?",
      ] },
      { type: "h2", text: "Sur les coûts" },
      { type: "ol", items: [
        "Montant de la taxe foncière ?",
        "Montant des charges de copropriété ?",
        "Des travaux sont-ils votés en AG ?",
        "Coût moyen de l'énergie ?",
      ] },
      { type: "h2", text: "Sur l'environnement" },
      { type: "ol", items: [
        "Le quartier est-il calme ?",
        "Quels commerces et transports à proximité ?",
        "Des projets de construction prévus ?",
        "Problèmes de voisinage ?",
        "Stationnement ?",
      ] },
    ],
  },
  {
    slug: "loi-carrez-surface",
    title: "Loi Carrez : la surface et le seuil de 5 %",
    metaDescription:
      "Ce que la surface Carrez compte et exclut, et le seuil de 5 % au-delà duquel l'acheteur obtient une réduction de prix. Chiffré sur les ventes de Villeurbanne.",
    h1: "Loi Carrez : la surface qui engage le prix de vente",
    excerpt:
      "La surface privative d'un lot de copropriété : ce qui se compte, ce qui est exclu, et le seuil de 5 % au-delà duquel l'acheteur peut faire baisser le prix — chiffré sur les ventes de Villeurbanne.",
    date: "2026-01-15",
    updated: "2026-10-13",
    internalHref: "/estimation",
    internalLabel: "Estimer la valeur de mon bien",
    blocks: [
      { type: "p", text: "**Vendre un lot de copropriété oblige à écrire sa surface privative — dite « surface Carrez » — dans la promesse de vente et dans l'acte. Si la surface réelle se révèle inférieure de plus de 5 % à celle annoncée, l'acquéreur peut obtenir une réduction du prix, à condition d'agir dans l'année qui suit l'acte authentique.** C'est l'article 46 de la loi du 10 juillet 1965 qui l'impose, et le décret du 17 mars 1967 qui dit comment mesurer." },
      { type: "p", text: "Ce seuil de 5 % est la seule chose que la plupart des vendeurs retiennent, et c'est précisément là que se joue l'argent : en dessous, l'acquéreur n'obtient rien ; au-delà, il récupère la valeur de **tous** les mètres carrés manquants, pas seulement ceux qui dépassent le seuil. Sur un appartement villeurbannais médian, le passage de 5,0 % à 5,1 % d'erreur fait basculer l'enjeu de 0 € à plus de 11 000 €. Cette page explique le mesurage, puis chiffre ce seuil sur les ventes réelles de la commune." },

      { type: "h2", text: "Qu'est-ce que la surface Carrez, exactement ?" },
      { type: "p", text: "**C'est la surface des planchers des locaux clos et couverts du lot, mesurée après déduction des murs, cloisons, marches et cages d'escalier, gaines, et embrasures de portes et de fenêtres.** Les planchers des parties dont la hauteur est inférieure à 1,80 m ne sont pas comptés. Cette définition est celle de l'article 4-1 du décret du 17 mars 1967 ; elle ne se négocie pas et ne dépend pas de l'agence." },
      { type: "p", text: "Deux conséquences pratiques en découlent. D'abord, un mètre carré « au sol » n'est pas un mètre carré Carrez : l'épaisseur des murs et des cloisons sort du compte, ce qui explique qu'une surface Carrez soit presque toujours inférieure à la surface qu'un plan de vente affiche. Ensuite, le seuil de 1,80 m se lit par exclusion — ce qui est **sous** 1,80 m ne compte pas, donc une hauteur d'exactement 1,80 m, elle, compte. Sous un comble aménagé, cette nuance déplace souvent plusieurs mètres carrés." },

      { type: "h2", text: "Quelles surfaces ne sont pas comptées ?" },
      { type: "p", text: "**Trois familles de surfaces sortent du mesurage, et pour trois raisons différentes — c'est ce qui rend la liste difficile à retenir.** Un balcon n'est pas exclu pour la même raison qu'une cave, et une partie commune dont vous avez l'usage exclusif n'est pas exclue pour la même raison qu'un débarras de 6 m²." },
      { type: "ul", items: [
        "**Ce qui n'est ni clos ni couvert** : balcons, loggias ouvertes, terrasses, jardins. Ces surfaces existent, elles ont de la valeur à la vente, mais elles ne relèvent pas du mesurage Carrez. Elles se mentionnent à part dans l'annonce et dans l'acte.",
        "**Les lots exclus par la loi** : caves, garages et emplacements de stationnement, ainsi que **tout lot ou fraction de lot d'une superficie inférieure à 8 m²**. Un débarras de 6 m² vendu comme lot distinct n'entre donc dans aucune surface Carrez.",
        "**Les parties communes, même à jouissance privative ou exclusive.** Un jardin ou une courette qui reste juridiquement une partie commune ne se mesure pas, quand bien même vous en avez l'usage réservé — la Cour de cassation l'a jugé explicitement.",
      ] },
      { type: "p", text: "Le seuil de 8 m² se vérifie dans les données de vente : sur les **1 738 surfaces Carrez** enregistrées pour les appartements vendus à Villeurbanne en 2025, **aucune n'est inférieure à 8 m²**. Ce n'est pas un hasard statistique, c'est la règle qui se voit : en dessous de ce seuil, il n'y a rien à déclarer." },

      { type: "h2", text: "Ma maison est-elle concernée par la loi Carrez ?" },
      { type: "p", text: "**Non, si c'est une maison individuelle qui ne fait pas partie d'une copropriété : l'obligation ne vise que les lots de copropriété.** Une maison en copropriété horizontale — un lotissement organisé en copropriété — y est en revanche soumise, comme n'importe quel lot. La distinction tient au statut juridique du bien, pas à sa forme." },
      { type: "p", text: "À Villeurbanne, la question se pose rarement : la quasi-totalité des ventes de logements de la commune porte sur des appartements en copropriété. C'est aussi pourquoi la mention de surface privative figure systématiquement dans les dossiers de vente locaux, aux côtés des [diagnostics obligatoires](/blog/diagnostics-obligatoires-vente) — dont elle ne fait d'ailleurs pas partie : ce n'est pas un diagnostic, c'est une mention obligatoire de l'acte." },

      { type: "h2", text: "Surface Carrez ou surface habitable : quelle différence ?" },
      { type: "p", text: "**Ce sont deux surfaces différentes, calculées selon deux textes différents, et elles ne donnent pas le même nombre pour le même appartement.** La surface Carrez sert à la vente d'un lot de copropriété ; la surface habitable, dite « loi Boutin », sert au bail d'habitation. La seconde exclut en plus les combles non aménagés, les caves, sous-sols, remises, garages, terrasses, loggias, vérandas et dépendances." },
      { type: "p", text: "Un vendeur qui compare sa surface Carrez à celle qui figure sur son DPE, sur sa taxe foncière ou sur son ancien bail trouvera donc presque toujours un écart — et cet écart n'est pas une erreur. Les ventes villeurbannaises de 2025 permettent de le quantifier : sur les **1 716 ventes d'appartements** où une seule surface Carrez est enregistrée, elle **ne coïncide avec la surface bâtie cadastrale à moins de 0,5 m² près que dans 38,2 % des cas**. Autrement dit, dans près de deux ventes sur trois, les deux chiffres diffèrent." },
      {
        type: "table",
        caption: "Écart entre surface bâtie cadastrale et surface Carrez — appartements vendus à Villeurbanne en 2025",
        source:
          "Calcul Markus Immobilier sur la base DVF (demandes de valeurs foncières), Etalab / data.gouv.fr, fichier de la commune 69266, extraction du 13 octobre 2026. Périmètre : 1 876 ventes d'appartements exploitables, dont 1 727 portent une surface Carrez renseignée et 1 716 une seule. ⚠️ Ces écarts ne sont PAS des erreurs de mesurage : la surface bâtie cadastrale et la surface privative Carrez ne répondent pas à la même définition.",
        headers: ["Observation", "Part des ventes"],
        rows: [
          ["Les deux surfaces coïncident à moins de 0,5 m² près", "38,2 %"],
          ["Surface Carrez inférieure à la surface bâtie de plus de 5 %", "7,0 %"],
          ["Surface Carrez supérieure à la surface bâtie de plus de 5 %", "5,8 %"],
          ["Écart médian (surface bâtie − surface Carrez)", "− 0,31 %"],
        ],
      },
      { type: "p", text: "La surface Carrez médiane de ces ventes ressort à **61,5 m²** (premier quartile 43,0 m², troisième quartile 74,3 m²), très proche de la surface bâtie médiane de 62 m² que nous publions dans [les prix au m² par quartier](/blog/prix-immobilier-villeurbanne-2026). À l'échelle de la commune les deux définitions donnent donc presque le même ordre de grandeur ; c'est appartement par appartement qu'elles s'écartent." },

      { type: "h2", text: "Que se passe-t-il si la surface annoncée est fausse ?" },
      { type: "p", text: "**Tout dépend du sens de l'erreur et de son ampleur. Si la surface réelle est inférieure de plus de 5 % à celle annoncée, l'acquéreur peut demander une diminution du prix proportionnelle à la surface manquante, dans un délai d'un an à compter de la signature de l'acte authentique.** Si la surface réelle est supérieure, le vendeur n'a droit à aucun supplément : l'erreur favorable à l'acquéreur reste acquise à l'acquéreur." },
      { type: "p", text: "Le point que presque aucune page n'explique est l'effet de seuil. Le seuil de 5 % n'est pas une franchise qu'on déduirait de l'indemnisation : c'est une condition d'ouverture. En dessous, l'acquéreur n'obtient rien du tout. Au-dessus, la réduction porte sur la **totalité** des mètres carrés manquants, dès le premier. Le passage du seuil ne coûte donc pas un peu d'argent, il en coûte beaucoup d'un coup." },
      {
        type: "table",
        caption: "L'effet de seuil sur un appartement villeurbannais médian de 62 m²",
        source:
          "Calcul Markus Immobilier : surface médiane de 62 m² et prix médian de 3 567 €/m² pour les appartements vendus à Villeurbanne en 2025 (base DVF, Etalab / data.gouv.fr). Règle de droit : article 46 de la loi n° 65-557 du 10 juillet 1965. Les montants sont obtenus en multipliant les mètres carrés manquants de la colonne précédente, arrondis au centième, par la médiane de 3 567 €/m² : le calcul se refait à l'identique sur les chiffres publiés.",
        headers: ["Erreur sur la surface annoncée", "Mètres carrés manquants", "Réduction de prix obtenable"],
        rows: [
          ["4,0 %", "2,48 m²", "0 € — sous le seuil, aucun recours"],
          ["5,0 %", "3,10 m²", "0 € — sous le seuil, aucun recours"],
          ["5,1 %", "3,16 m²", "11 272 €"],
          ["6,0 %", "3,72 m²", "13 269 €"],
          ["10,0 %", "6,20 m²", "22 115 €"],
        ],
      },
      { type: "p", text: "Un cas est plus sévère encore : si **aucune** surface privative n'est mentionnée dans l'acte, ce n'est plus une réduction de prix qui est en jeu mais la **nullité de l'acte**, que l'acquéreur peut demander dans le mois qui suit sa signature. C'est la raison pour laquelle le notaire remet, le jour de l'acte authentique, une copie de l'acte ou un certificat mentionnant la superficie de la partie privative, en informant l'acquéreur de ses voies de recours." },

      { type: "h2", text: "Combien coûte la tolérance de 5 % à Villeurbanne ?" },
      { type: "p", text: "**Sur l'appartement villeurbannais médian de 62 m², la tolérance de 5 % représente 3,1 m² — soit 11 058 € au prix médian communal de 3 567 €/m², que l'acquéreur ne pourra jamais réclamer.** C'est la mesure concrète de ce que le seuil laisse de côté, et elle varie fortement d'un quartier à l'autre : de 8 488 € à Cyprian – Les Brosses à 12 161 € à Ferrandière – Maisons-Neuves." },
      {
        type: "table",
        caption: "Ce que valent les 3,1 m² de tolérance, par quartier (base : 62 m², surface médiane communale)",
        source:
          "Calcul Markus Immobilier sur les médianes €/m² par quartier publiées dans notre analyse des prix 2026 (base DVF, Etalab / data.gouv.fr, ventes d'appartements enregistrées en 2025 sur la commune 69266, découpées selon les contours de quartiers de la Métropole de Lyon).",
        headers: ["Quartier", "Médiane €/m²", "Valeur des 3,1 m² tolérés"],
        rows: [
          ["Ferrandière – Maisons-Neuves", "3 923 €", "12 161 €"],
          ["Gratte-Ciel – Dedieu – Charmettes", "3 846 €", "11 923 €"],
          ["Charpennes – Tonkin", "3 524 €", "10 924 €"],
          ["Perralière – Grandclément", "3 375 €", "10 463 €"],
          ["Buers – Croix-Luizet", "3 271 €", "10 140 €"],
          ["Cusset – Bonnevay", "3 171 €", "9 830 €"],
          ["Cyprian – Les Brosses", "2 738 €", "8 488 €"],
          ["Commune entière (médiane)", "3 567 €", "11 058 €"],
        ],
      },
      { type: "p", text: "Ce tableau se lit dans les deux sens. Pour un acquéreur, c'est le montant qu'un écart de surface peut lui coûter sans aucun recours. Pour un vendeur, c'est l'ordre de grandeur de ce qu'un mesurage approximatif met en jeu — et la raison pour laquelle il vaut mieux le faire faire que l'estimer soi-même." },

      { type: "h2", text: "Qui réalise le mesurage, et qui paie en cas d'erreur ?" },
      { type: "p", text: "**La loi n'impose pas de faire appel à un professionnel : le vendeur peut mesurer lui-même. Mais c'est lui qui répond de l'erreur devant l'acquéreur, et la réduction de prix sort alors de sa poche.** Faire réaliser le mesurage par un professionnel ne supprime pas cette responsabilité à l'égard de l'acquéreur ; elle ouvre en revanche un recours contre le mesureur, dont l'assurance de responsabilité professionnelle prend le relais." },
      { type: "p", text: "C'est l'arbitrage réel du sujet : le mesurage par un diagnostiqueur coûte quelques dizaines d'euros, et il se compare aux montants du tableau ci-dessus. Dans un [accompagnement de vente](/vendre), la coordination du mesurage et des diagnostics fait partie de ce que nous prenons en charge ; et si vous voulez d'abord savoir ce que vaut votre bien, l'[estimation](/estimation) part des ventes réelles de votre quartier." },

      { type: "h2", text: "Où sont écrites ces règles ?" },
      { type: "p", text: "**L'obligation elle-même est à l'article 46 de la loi n° 65-557 du 10 juillet 1965 fixant le statut de la copropriété des immeubles bâtis ; la méthode de mesurage est à l'article 4-1 du décret n° 67-223 du 17 mars 1967.** Les fiches officielles de service-public.gouv.fr renvoient à ces deux textes sous l'intitulé « Information sur la superficie du lot »." },
      { type: "p", text: "Les éléments de cette page ont été vérifiés le 13 octobre 2026 sur les sources suivantes : fiches service-public.gouv.fr F10798 « Quels sont les diagnostics immobiliers à fournir en cas de vente d'un logement ? » (vérifiée le 7 mars 2025) et F37190 « Achat d'un logement en copropriété », pour l'obligation de mention et la remise du certificat par le notaire ; Chambre des notaires de Paris, « Vente d'un bien en copropriété et erreur de superficie » (publiée le 29 juin 2021), pour le détail du mesurage, le seuil du vingtième et les délais d'action ; Agence nationale pour l'information sur le logement (ANIL), pour l'exclusion des parties communes à jouissance privative, jugée par la Cour de cassation (3ᵉ chambre civile, 8 octobre 2008, pourvoi n° 07-16.540)." },
    ],
    faq: [
      {
        q: "La surface Carrez compte-t-elle les balcons et les terrasses ?",
        a: "Non. Le mesurage Carrez ne porte que sur les locaux clos et couverts : balcons, loggias ouvertes, terrasses et jardins en sont exclus. Ces surfaces gardent de la valeur à la vente et se mentionnent séparément dans l'annonce et dans l'acte, mais elles n'entrent pas dans la surface privative du lot.",
      },
      {
        q: "À partir de quel écart de surface l'acheteur peut-il faire baisser le prix ?",
        a: "Il faut que la surface réelle soit inférieure de plus de 5 % (plus d'un vingtième) à celle annoncée dans l'acte. En dessous de ce seuil, l'acquéreur n'obtient rien. Au-delà, la réduction porte sur la totalité des mètres carrés manquants, dès le premier, et non seulement sur la part qui dépasse les 5 %.",
      },
      {
        q: "Combien de temps l'acheteur a-t-il pour agir après une erreur de surface ?",
        a: "Un an à compter de la signature de l'acte authentique de vente pour demander la diminution du prix. Le délai est beaucoup plus court dans un autre cas : si aucune surface privative n'est mentionnée dans l'acte, l'acquéreur peut demander la nullité de la vente, mais seulement dans le mois qui suit la signature.",
      },
      {
        q: "Combien vaut la tolérance de 5 % sur un appartement à Villeurbanne ?",
        a: "Sur l'appartement villeurbannais médian de 62 m², 5 % représentent 3,1 m², soit 11 058 € au prix médian communal de 3 567 €/m² — un montant que l'acquéreur ne peut pas réclamer. Selon le quartier, cette tolérance vaut de 8 488 € à Cyprian – Les Brosses à 12 161 € à Ferrandière – Maisons-Neuves.",
      },
      {
        q: "Pourquoi la surface de mon DPE n'est-elle pas la même que ma surface Carrez ?",
        a: "Parce que ce sont deux définitions distinctes : la surface Carrez sert à la vente d'un lot de copropriété, la surface habitable dite « loi Boutin » sert au bail d'habitation et exclut en plus les combles non aménagés, caves, sous-sols, remises, garages, terrasses, loggias et vérandas. Sur les ventes d'appartements villeurbannaises de 2025, la surface Carrez ne coïncide avec la surface bâtie cadastrale à moins de 0,5 m² près que dans 38,2 % des cas.",
      },
      {
        q: "Un garage ou une cave entre-t-il dans la surface Carrez ?",
        a: "Non. Les caves, garages et emplacements de stationnement sont exclus du mesurage par la loi, de même que tout lot ou fraction de lot d'une superficie inférieure à 8 m². Sur les 1 738 surfaces Carrez enregistrées pour les appartements vendus à Villeurbanne en 2025, aucune n'est inférieure à 8 m².",
      },
      {
        q: "La loi Carrez s'applique-t-elle à une maison individuelle ?",
        a: "Non, sauf si la maison fait partie d'une copropriété — une copropriété horizontale, par exemple un lotissement organisé en copropriété. L'obligation de mentionner la surface privative ne vise que les lots de copropriété, quelle que soit la forme du bien.",
      },
      {
        q: "Qui paie si le mesurage est faux ?",
        a: "Le vendeur répond de l'erreur devant l'acquéreur : c'est lui qui supporte la réduction du prix. La loi ne l'oblige pas à faire appel à un professionnel, mais s'il en a mandaté un, il dispose d'un recours contre le mesureur, dont l'assurance de responsabilité professionnelle prend alors le relais.",
      },
    ],
  },
  {
    slug: "lmnp-location-meublee",
    title: "LMNP : le statut idéal pour louer en meublé ?",
    metaDescription:
      "Le statut LMNP (loueur meublé non professionnel) : conditions, régimes micro-BIC et réel, et avantages fiscaux pour louer en meublé.",
    h1: "LMNP : le statut idéal pour louer en meublé ?",
    excerpt:
      "Louer en meublé avec une fiscalité avantageuse. Conditions, régimes micro-BIC et réel, et l'intérêt fiscal.",
    date: "2026-01-08",
    internalHref: "/gestion-locative",
    internalLabel: "Faire gérer mon bien en location",
    blocks: [
      { type: "p", text: "**Le statut LMNP (loueur meublé non professionnel) permet de louer un logement meublé avec une fiscalité avantageuse sur les loyers.** C'est l'un des montages préférés des investisseurs." },
      { type: "h2", text: "Les conditions" },
      { type: "p", text: "Louer un logement **meublé** (équipement suffisant pour y vivre), avec des recettes locatives qui restent sous le seuil du professionnel." },
      { type: "h2", text: "Les deux régimes" },
      { type: "ul", items: [
        "**Micro-BIC** : un abattement forfaitaire de 50 % sur les loyers. Simple, sans comptabilité lourde.",
        "**Réel** : vous déduisez les charges réelles et **amortissez** le bien et le mobilier — souvent plus avantageux, mais avec une comptabilité.",
      ] },
      { type: "h2", text: "L'intérêt" },
      { type: "p", text: "Bien optimisé, le LMNP permet de réduire fortement (voire d'annuler) l'impôt sur les loyers pendant des années." },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/**
 * Articles liés : les `n` articles qui SUIVENT l'article courant dans son
 * groupe (même page « argent »), la liste étant triée du plus récent au plus
 * ancien et **parcourue en boucle**.
 *
 * Pourquoi une boucle, et pas « les n plus récents du groupe » (version
 * d'origine) — mesuré sur le HTML rendu en production le 22/09/2026 :
 * ce choix-là ne désignait jamais que les **deux articles les plus récents de
 * chaque groupe**, soit 8 articles sur 26. Les 18 autres ne recevaient de lien
 * d'aucun article frère, et **13 d'entre eux n'avaient, sur tout le site, que
 * la liste `/blog` comme unique page entrante**. Le blog était un entonnoir :
 * tout le monde pointait vers les mêmes 8 pages.
 *
 * Le parcours cyclique donne à chaque article d'un groupe d'au moins 3
 * articles exactement 2 liens entrants et 2 liens sortants — un cycle, pas un
 * entonnoir. Il reste déterministe (aucun aléa, aucune dépendance à la date du
 * jour) : le rendu statique est stable d'un build à l'autre.
 *
 * Groupes au 22/09/2026 : `/vendre` (9), `/acheter` (8), `/estimation` (5),
 * `/gestion-locative` (4) — tous ≥ 3, donc tous les articles sont couverts.
 */
export function getRelatedArticles(slug: string, n = 2): Article[] {
  const current = getArticle(slug);
  if (!current) return [];
  const groupe = getArticlesSorted().filter(
    (a) => a.internalHref === current.internalHref,
  );
  const i = groupe.findIndex((a) => a.slug === slug);
  if (i < 0) return [];
  const suivants: Article[] = [];
  for (let k = 1; k < groupe.length && suivants.length < n; k++) {
    suivants.push(groupe[(i + k) % groupe.length]);
  }
  return suivants;
}

/** Articles triés du plus récent au plus ancien (pour le hub). */
export function getArticlesSorted(): Article[] {
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
}
