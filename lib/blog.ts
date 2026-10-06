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
 *   - « vendre-sans-agence »        → prix médian 195 000 € et les ≈ 11 700 €
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
 * Trois articles citent par ailleurs le BARÈME d'honoraires de
 * app/honoraires/page.tsx (gestion 6 %, GLI 2,5 %, frais fixes 20 €/45 €,
 * transaction 9 000 € / 6 % / 5 %) : « cout-gestion-locative »,
 * « gestion-locative-villeurbanne-deleguer-ou-non » et « vendre-sans-agence ».
 * Depuis le 01/10/2026, « gestion-locative-villeurbanne-deleguer-ou-non » cite
 * en plus la MISE EN LOCATION côté propriétaire (9 % du loyer annuel HC,
 * constante LOCATION_PROPRIETAIRE de app/honoraires/page.tsx).
 * Si le client change son barème, ces textes doivent bouger avec lui.
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
        "**La surface (loi Carrez)** : la base, mais pas tout.",
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
        "**Le DPE** : depuis l'interdiction de louer les logements classés G (janvier 2025) puis F (janvier 2028), les passoires thermiques se négocient nettement en dessous du marché.",
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
      "La Métropole de Lyon a voté 5,00 % de droits de mutation, 4,50 % pour un primo-accédant. Frais de notaire calculés quartier par quartier sur les prix signés à Villeurbanne.",
    h1: "Frais de notaire à Villeurbanne et à Lyon en 2026 : le calcul exact",
    excerpt:
      "Le taux voté par la Métropole de Lyon, le barème des émoluments, et la facture réelle calculée sur les prix d'appartements signés en 2025 dans les 7 quartiers de Villeurbanne.",
    date: "2026-04-28",
    updated: "2026-09-29",
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
          "Taux départemental : tableau « Droits d'enregistrement et taxe de publicité foncière — taux applicables au 1ᵉʳ juin 2026 », DGFiP (impots.gouv.fr), ligne « 69 Métropole de Lyon », téléchargé le 29/09/2026. Taxe communale : article 1584 du CGI ; le même document liste les deux seules communes de France ayant voté une réduction en 2026, et Villeurbanne n'en fait pas partie. Prélèvement de l'État : article 1647, V du CGI (2,37 % du droit départemental).",
        headers: ["Taxe", "Acheteur ordinaire", "Primo-accédant"],
        rows: [
          ["Droit de mutation, part Métropole de Lyon", "5,00 % du prix", "4,50 % du prix"],
          ["Taxe communale additionnelle (Villeurbanne)", "1,20 % du prix", "1,20 % du prix"],
          ["Prélèvement de l'État pour frais d'assiette", "2,37 % du droit ci-dessus", "2,37 % du droit ci-dessus"],
          ["**Total de la part fiscale**", "**6,32 % du prix**", "**5,81 % du prix**"],
        ],
      },
      { type: "p", text: "Ce 5,00 % n'est pas le taux historique. Jusqu'en 2025, le plafond légal était de 4,50 % : la loi de finances pour 2025 a autorisé les départements et métropoles à le relever jusqu'à 5 %, **pour les actes signés entre le 1ᵉʳ avril 2025 et le 31 mars 2028** (BOFiP, document mis à jour le 17/06/2026). La Métropole de Lyon a utilisé cette faculté. Autrement dit : ce demi-point est daté, il a une date de fin inscrite dans la loi, et il ne s'applique pas à tout le monde." },

      { type: "h2", text: "Combien coûtent vraiment les frais de notaire pour un appartement à Villeurbanne ?" },
      { type: "p", text: "**Entre 12 900 € et 18 200 € pour un appartement de 62 m² — la surface médiane des ventes villeurbannaises de 2025 — selon le quartier.** L'écart d'un bout à l'autre de la commune atteint 5 360 €, et il ne tient qu'au prix du bien : le taux, lui, est identique dans les 7 quartiers. Le tableau ci-dessous part des prix réellement signés, pas des prix affichés." },
      {
        type: "table",
        caption:
          "Taxes + émoluments du notaire pour un appartement de 62 m² au prix médian de chaque quartier (acheteur ordinaire)",
        source:
          "Prix : médianes DVF 2025 des ventes d'appartements à Villeurbanne (data.gouv.fr / Etalab), calcul Markus Immobilier — les mêmes que celles publiées dans nos autres articles. Taxes : taux DGFiP au 1ᵉʳ juin 2026. Émoluments : barème réglementé, tableau 5 n° 54 de l'article A. 444-91 du code de commerce, TVA 20 % comprise. Débours et contribution de sécurité immobilière non compris (voir plus bas).",
        headers: ["Quartier", "Prix pour 62 m²", "Taxes", "Émoluments TTC", "Total"],
        rows: [
          ["Ferrandière – Maisons-Neuves", "243 226 €", "15 368 €", "2 862 €", "18 231 €"],
          ["Gratte-Ciel – Dedieu – Charmettes", "238 452 €", "15 067 €", "2 816 €", "17 882 €"],
          ["Charpennes – Tonkin", "218 488 €", "13 805 €", "2 621 €", "16 426 €"],
          ["Perralière – Grandclément", "209 250 €", "13 221 €", "2 530 €", "15 752 €"],
          ["Buers – Croix-Luizet", "202 802 €", "12 814 €", "2 467 €", "15 282 €"],
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
      { type: "p", text: "Le critère de « première propriété » renvoie à la définition utilisée pour le prêt à taux zéro : **ne pas avoir été propriétaire de sa résidence principale au cours des deux années précédentes**. Un investisseur qui achète pour louer n'y a donc pas droit, puisque la condition de résidence principale n'est pas remplie — un point à intégrer au [calcul de rentabilité](/blog/rentabilite-locative-lyon). C'est le notaire qui vérifie les conditions et les fait déclarer dans l'acte : ne considérez jamais l'avantage comme acquis avant qu'il l'ait confirmé." },

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
      { type: "p", text: "**Parce que les deux postes qu'on sait calculer à l'euro près — taxes et émoluments — atteignent déjà 7,49 % à 7,72 % du prix aux niveaux villeurbannais, avant même d'ajouter les débours.** La règle de pouce « 7 à 8 % dans l'ancien » reste juste, mais à Villeurbanne en 2026 elle penche nettement vers 8 % plutôt que vers 7 %, du fait du demi-point de majoration voté par la Métropole." },
      { type: "p", text: "Restent deux postes que cet article ne chiffre volontairement pas, parce qu'ils dépendent du dossier et non d'un taux public : les **débours**, c'est-à-dire les sommes que le notaire avance pour votre compte (documents d'urbanisme, état hypothécaire, syndic, géomètre le cas échéant), et la **contribution de sécurité immobilière** perçue par l'État lors de la publication de l'acte. Ensemble, ils représentent en général quelques centaines d'euros — de quoi porter la facture réelle près du haut de la fourchette. Votre notaire est le seul à pouvoir les arrêter précisément, et il le fait sur devis avant la signature." },
      { type: "p", text: "Dans le neuf, la logique est différente : la vente est soumise à la TVA immobilière et le droit de mutation tombe à un taux réduit, ce qui ramène les frais d'acquisition autour de **2 à 3 %** du prix. Le barème des émoluments, lui, ne change pas." },

      { type: "h2", text: "Les frais de notaire comprennent-ils les honoraires d'agence ?" },
      { type: "p", text: "**Non : les frais de notaire ne comprennent pas les honoraires d'agence, et les deux ne vont pas dans la même poche.** Les premiers sont dus par l'acquéreur et reviennent pour l'essentiel à la Métropole, à la commune et à l'État ; les seconds rémunèrent l'agence et relèvent d'un barème propre à chaque enseigne, obligatoirement affiché." },
      { type: "p", text: "Dans notre barème, les honoraires de transaction sont [à la charge du vendeur](/honoraires) : le prix affiché sur nos annonces est donc celui que règle l'acheteur — sans honoraires à ajouter, mais avec les frais d'acquisition en plus. Cela a une conséquence directe sur la fiscalité de l'achat : quand les honoraires sont mis à la charge de l'acquéreur, ils s'ajoutent au prix mais **sortent de l'assiette** des droits de mutation ; quand ils sont à la charge du vendeur, l'assiette est le prix entier. Si vous voulez fixer le prix de départ avant de faire ces calculs, notre [estimation à Villeurbanne](/estimation-immobiliere-villeurbanne) donne une fourchette en moins de deux minutes." },

      { type: "h2", text: "Méthode et sources" },
      { type: "ul", items: [
        "**Taux de la Métropole de Lyon** : tableau « Droits d'enregistrement et taxe de publicité foncière — taux, abattements de base et réductions de taux applicables au 1ᵉʳ juin 2026 » publié par la DGFiP sur impots.gouv.fr, ligne « 69 Métropole de Lyon ». Document téléchargé et lu le 29/09/2026 ; c'est la version la plus récente publiée à cette date.",
        "**Dispositif temporaire de majoration** : article 116 de la loi n° 2025-127 du 14 février 2025 de finances pour 2025, commenté au BOFiP (document mis à jour le 17/06/2026). Fenêtre d'application : 1ᵉʳ avril 2025 – 31 mars 2028.",
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
        a: "Sur le prix médian d'un appartement villeurbannais signé en 2025, 195 000 €, comptez 12 321 € de taxes et 2 391 € d'émoluments TTC, soit 14 712 € — auxquels s'ajoutent les débours et la contribution de sécurité immobilière, quelques centaines d'euros. Pour un 62 m² au prix médian de son quartier, le total taxes + émoluments va de 12 871 € à Cyprian – Les Brosses à 18 231 € à Ferrandière – Maisons-Neuves.",
      },
      {
        q: "Un primo-accédant paie-t-il moins de frais de notaire à Villeurbanne ?",
        a: "Oui. La majoration d'un demi-point votée par la Métropole de Lyon ne s'applique pas lorsque le bien constitue une première propriété destinée à la résidence principale de l'acquéreur, au sens de l'article L. 31-10-3 du code de la construction et de l'habitation. L'économie est de 869 € à 1 245 € sur un 62 m² villeurbannais, et de 998 € au prix médian de la commune. C'est le notaire qui vérifie les conditions et les fait déclarer dans l'acte.",
      },
      {
        q: "Les frais de notaire sont-ils les mêmes à Lyon et à Villeurbanne ?",
        a: "Oui, car les deux communes relèvent de la même collectivité : la Métropole de Lyon, qui a voté 5,00 %. En revanche, une commune du département du Rhône située hors métropole relève d'un taux voté séparément — la DGFiP les liste comme deux collectivités distinctes. Les émoluments du notaire, eux, sont un tarif national et ne varient nulle part.",
      },
      {
        q: "Jusqu'à quand le taux de 5,00 % s'applique-t-il ?",
        a: "La loi de finances pour 2025 a ouvert la faculté de relever le taux au-delà de 4,50 % et dans la limite de 5 % pour une durée de trois ans, du 1ᵉʳ avril 2025 au 31 mars 2028. Au-delà de cette date, et sauf nouvelle disposition législative, le plafond redescend à 4,50 %. La date qui compte est celle de la signature de l'acte authentique, pas celle du compromis.",
      },
      {
        q: "Les honoraires d'agence sont-ils inclus dans les frais de notaire ?",
        a: "Non, ce sont deux choses distinctes. Les frais de notaire sont majoritairement composés de taxes revenant à la Métropole, à la commune et à l'État ; les honoraires d'agence rémunèrent l'agence selon un barème affiché propre à chaque enseigne. Chez Markus Immobilier, les honoraires de transaction sont à la charge du vendeur : le prix affiché est celui que règle l'acheteur, frais d'acquisition en plus.",
      },
    ],
  },
  {
    slug: "dpe-2026-ce-qui-change",
    title: "DPE 2026 : ce qui change pour vendre ou louer",
    metaDescription:
      "Réforme du DPE au 1er janvier 2026, calendrier d'interdiction de location, gel des loyers : tout ce que les propriétaires doivent savoir.",
    h1: "DPE 2026 : ce qui change pour vendre ou louer",
    excerpt:
      "Réforme du coefficient électrique, calendrier d'interdiction de location, gel des loyers : l'état des règles DPE en 2026.",
    date: "2026-05-05",
    internalHref: "/vendre",
    internalLabel: "Faire le point sur la valeur de mon bien",
    blocks: [
      { type: "p", text: "Le diagnostic de performance énergétique (DPE) est devenu un critère décisif. Voici l'état des règles en 2026." },
      { type: "h2", text: "La réforme du 1er janvier 2026" },
      { type: "p", text: "Le coefficient de conversion de l'électricité a été abaissé (de 2,3 à 1,9). Conséquence : environ 850 000 logements chauffés à l'électricité sortent du statut de passoire thermique sans aucun travaux. Si votre bien est électrique et classé F ou G, faites recalculer votre DPE — la mise à jour est gratuite via le simulateur de l'ADEME, sans nouvelle visite." },
      { type: "p", text: "À noter aussi : depuis 2026, le DPE devient obligatoire pour les copropriétés de moins de 50 lots." },
      { type: "h2", text: "Le calendrier d'interdiction de location" },
      { type: "ul", items: [
        "**Classe G** : interdite à la location depuis le 1er janvier 2025.",
        "**Classe F** : interdite au 1er janvier 2028.",
        "**Classe E** : interdite au 1er janvier 2034.",
      ] },
      { type: "p", text: "Les logements F et G subissent par ailleurs un gel des loyers (pas d'augmentation tant que le bien reste une passoire)." },
      { type: "h2", text: "Et pour vendre ?" },
      { type: "p", text: "La vente d'une passoire thermique reste autorisée, mais un audit énergétique est obligatoire pour les biens classés F ou G — il s'ajoute aux [diagnostics déjà exigés avant toute vente](/blog/diagnostics-obligatoires-vente). Dans tous les cas, un mauvais DPE entraîne une décote : les acheteurs anticipent les travaux." },
    ],
  },
  {
    slug: "diagnostics-obligatoires-vente",
    title: "Les diagnostics obligatoires pour vendre à Lyon et Villeurbanne",
    metaDescription:
      "Quels diagnostics immobiliers sont obligatoires pour vendre ? Liste complète, durées de validité et conseils pour les anticiper.",
    h1: "Les diagnostics obligatoires pour vendre",
    excerpt:
      "Avant toute vente, le vendeur doit fournir un dossier de diagnostics techniques. La liste complète et les durées de validité.",
    date: "2026-05-12",
    internalHref: "/vendre",
    internalLabel: "Être accompagné pour ma vente",
    blocks: [
      { type: "p", text: "Avant toute vente, le vendeur doit fournir un dossier de diagnostics techniques (DDT). Les anticiper évite de retarder la signature." },
      { type: "h2", text: "Les principaux diagnostics" },
      { type: "ul", items: [
        "**[DPE](/blog/dpe-2026-ce-qui-change)** : performance énergétique (valable 10 ans).",
        "**Amiante** : pour les biens dont le permis est antérieur à juillet 1997.",
        "**Plomb (CREP)** : logements construits avant 1949.",
        "**Électricité et gaz** : si l'installation a plus de 15 ans.",
        "**État des risques (ERP)** : risques naturels, miniers, technologiques (valable 6 mois).",
        "**Termites** : dans les zones concernées par arrêté préfectoral.",
        "**Assainissement** : pour les installations non collectives.",
        "**[Loi Carrez](/blog/loi-carrez-surface)** : mesurage de la surface en copropriété.",
      ] },
      { type: "h2", text: "Le bon réflexe" },
      { type: "p", text: "Faites réaliser les diagnostics avant de mettre en vente : un dossier complet rassure l'acheteur et accélère la transaction." },
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
        "**Le DPE** : une étiquette F ou G pèse sur le prix et restreint la location.",
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
    title: "Vendre sans agence : bonne ou mauvaise idée ?",
    metaDescription:
      "Vendre son bien seul (de particulier à particulier) : les vrais avantages, les risques et quand il vaut mieux passer par une agence.",
    h1: "Vendre sans agence : bonne ou mauvaise idée ?",
    excerpt:
      "Vendre seul économise la commission, mais vous gérez tout — et une erreur de prix coûte souvent plus que les honoraires.",
    date: "2026-05-28",
    updated: "2026-09-16",
    internalHref: "/vendre",
    internalLabel: "Être accompagné pour ma vente",
    blocks: [
      { type: "p", text: "**Vendre sans agence permet d'économiser la commission, mais vous prenez en charge tout le processus** — et une erreur de prix coûte souvent plus cher que les honoraires économisés." },
      { type: "h2", text: "L'avantage" },
      { type: "p", text: "Pas de commission d'agence. Sur le marché, elle représente souvent 4 à 6 % du prix, mais la plupart des agences ne publient pas de barème : il faut le demander. Le nôtre est en ligne — **9 000 € forfaitaires entre 50 001 et 170 000 €**, puis **6 % entre 170 001 et 300 000 €**, 5 % jusqu'à 500 000 €, et il est à la charge du vendeur." },
      { type: "p", text: "Un ordre de grandeur concret : le prix médian d'un appartement vendu à Villeurbanne était de [195 000 € sur les ventes de 2025](/blog/prix-immobilier-villeurbanne-2026). À ce niveau, nos honoraires représentent environ **11 700 €** — c'est la somme que vendre seul permet d'économiser, et celle à comparer au risque ci-dessous." },
      { type: "h2", text: "Ce que vous devez gérer seul" },
      { type: "p", text: "L'estimation juste, les diagnostics, la rédaction de l'annonce, les photos, la diffusion, les visites, le tri des acheteurs, la négociation et toute la partie juridique jusqu'au compromis." },
      { type: "h2", text: "Le vrai risque" },
      { type: "p", text: "Un bien **mal estimé** stagne ou se vend en dessous de sa valeur. Une agence apporte le prix juste, un réseau d'acheteurs qualifiés et la sécurité juridique — ce qui compense souvent largement sa commission, dont [le montant est publié tranche par tranche](/honoraires) avant même que vous ne signiez un mandat." },
      { type: "h2", text: "Pour qui ça marche ?" },
      { type: "p", text: "Si vous avez du temps, un bien facile à vendre et de bonnes notions juridiques. Sinon, l'accompagnement est vite rentable." },
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
      { type: "p", text: "**Le mandat simple vous laisse confier le bien à plusieurs agences (et le vendre vous-même) ; le mandat exclusif le confie à une seule agence.** Chacun a sa logique." },
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
    title: "Charges de copropriété : ce qui est compris (et ce qui ne l'est pas)",
    metaDescription:
      "Que couvrent les charges de copropriété ? Charges courantes, exceptionnelles, qui paie quoi et comment les vérifier avant d'acheter.",
    h1: "Charges de copropriété : ce qui est compris",
    excerpt:
      "Les charges couvrent l'entretien des parties communes. Courantes, exceptionnelles, et ce qu'il faut vérifier avant d'acheter.",
    date: "2026-03-05",
    internalHref: "/acheter",
    internalLabel: "Acheter en toute sérénité",
    blocks: [
      { type: "p", text: "**Les charges de copropriété couvrent l'entretien et le fonctionnement des parties communes ; leur montant varie fortement selon les équipements de l'immeuble.** Avant d'acheter, c'est un poste à examiner de près." },
      { type: "h2", text: "Les charges courantes" },
      { type: "p", text: "Entretien des parties communes, ascenseur, chauffage collectif éventuel, gardiennage, espaces verts, honoraires du syndic, assurance de l'immeuble." },
      { type: "h2", text: "Les charges exceptionnelles" },
      { type: "p", text: "Les **gros travaux** (ravalement, toiture…) votés en assemblée générale. Demandez les PV des 3 dernières AG pour connaître les travaux prévus." },
      { type: "h2", text: "Avant d'acheter" },
      { type: "p", text: "Vérifiez le montant annuel des charges et les travaux votés : un immeuble avec piscine ou gardien coûte bien plus qu'une petite copropriété." },
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
    updated: "2026-09-30",
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
      { type: "p", text: "C'est aussi pourquoi nous ne publions pas le même tableau par nombre de pièces : un T1 se loue nettement plus cher au mètre carré qu'un T4, et un loyer unique donnerait un classement faux. Ce que nos données disent sans ambiguïté, en revanche, c'est le prix — le T1 médian s'échange à 4 000 €/m² à Villeurbanne en 2025, le T4 à 3 211 €/m², soit 24,6 % de moins." },

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
      { type: "p", text: "**Le cas de référence.** Un T2 au prix médian villeurbannais de 2025 — 170 000 € pour 44 m², la médiane T2 étant de 3 830 €/m² — loué au loyer médian communal, soit 642 € par mois hors charges et 7 704 € par an. Rendement brut sur le prix : 4,53 %. Sur le coût total de l'opération, frais de notaire à 7,5 % compris (182 750 €) : 4,22 %." },
      {
        type: "table",
        caption:
          "Ce que chaque poste coûte en points de rendement — T2 de 44 m² acheté 170 000 € et loué 642 €/mois HC",
        headers: ["Poste", "Montant", "Effet sur le rendement"],
        rows: [
          ["Frais de notaire (7,5 %)", "12 750 € à l'achat", "−0,32 point"],
          ["Un mois de vacance locative", "642 €", "−0,35 point"],
          ["Gestion locative déléguée (6 % des encaissements + 20 € de débours)", "482 €/an", "−0,26 point"],
          ["Garantie loyers impayés (2,5 %)", "193 €/an", "−0,11 point"],
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
        a: "Le brut sert à comparer des biens entre eux, le net sert à décider. Le rendement brut — loyer annuel hors charges divisé par le prix d'achat — ne dépend que de deux chiffres, ce qui le rend comparable d'un bien à l'autre ; c'est sa seule vertu. Le rendement net retranche les charges réelles du logement (taxe foncière, charges non récupérables, assurance propriétaire non occupant, gestion, vacance) et c'est le seul qui corresponde à ce que vous encaisserez. Sur notre cas de référence villeurbannais, un T2 de 44 m² acheté 170 000 €, chaque tranche de 100 € de charge annuelle retire 0,055 point au brut.",
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
        a: "Oui, et son poids se chiffre simplement : sur notre cas de référence villeurbannais, un mois sans locataire coûte 642 € et retire 0,35 point de rendement. C'est davantage qu'une année entière de gestion déléguée, qui revient à 482 € et 0,26 point. Un rendement annoncé sans hypothèse de vacance suppose implicitement douze mois de loyer sur douze, chaque année, changements de locataire compris.",
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
    title: "Loi Carrez : comment se mesure la surface d'un bien",
    metaDescription:
      "La loi Carrez explique le calcul de la surface en copropriété : ce qui compte, ce qui est exclu et les sanctions en cas d'erreur.",
    h1: "Loi Carrez : comment se mesure la surface",
    excerpt:
      "La surface privative exacte en copropriété : ce qui compte (≥ 1,80 m), ce qui est exclu, et la sanction en cas d'erreur.",
    date: "2026-01-15",
    internalHref: "/estimation",
    internalLabel: "Estimer la valeur de mon bien",
    blocks: [
      { type: "p", text: "**La loi Carrez impose d'indiquer la surface privative exacte d'un bien en copropriété lors de la vente.** Elle ne compte que les surfaces dont la hauteur sous plafond dépasse 1,80 m." },
      { type: "h2", text: "Ce qui est compté" },
      { type: "p", text: "Les pièces avec une **hauteur sous plafond ≥ 1,80 m**, une fois déduits murs, cloisons, gaines et cages d'escalier." },
      { type: "h2", text: "Ce qui est exclu" },
      { type: "p", text: "Caves, garages, parkings, terrasses, balcons, et les surfaces sous 1,80 m." },
      { type: "h2", text: "En cas d'erreur" },
      { type: "p", text: "Si la surface réelle est **inférieure de plus de 5 %** à celle annoncée, l'acheteur peut demander une réduction du prix proportionnelle. D'où l'importance d'un mesurage fiable." },
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
