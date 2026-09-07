/**
 * Contenu du blog Markus Immobilier — 12 articles SEO (longue traîne locale).
 * Un article = une page /blog/[slug]. Chaque article pointe (lien interne) vers
 * une page « argent » (estimation, vendre, acheter, gestion locative).
 *
 * NB chiffres : « prix-immobilier-villeurbanne-2026 » publie des prix €/m² par
 * quartier **calculés** à partir de la base DVF (data.gouv.fr / Etalab) croisée
 * avec les contours de quartiers de la Métropole de Lyon — méthode et date
 * d'extraction affichées dans l'article. Ne jamais y écrire un prix qui ne
 * vienne pas de ce calcul. Reste à traiter de la même façon :
 * « ou-acheter-villeurbanne-quartiers » (formulé sans chiffres aujourd'hui).
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
        "**Le prix au m² « de quartier »** : utile pour une première idée, mais c'est une moyenne trompeuse.",
        "**La comparaison avec les ventes réelles** : la méthode des pros, basée sur les prix réellement signés (données officielles DVF), pas les prix affichés.",
        "**L'expertise terrain** : un conseiller ajuste avec ce qu'aucun algorithme ne voit (luminosité, calme, qualité de copropriété).",
      ] },
      { type: "p", text: "La meilleure estimation combine les trois." },
      { type: "h2", text: "Estimez votre bien gratuitement" },
      { type: "p", text: "Notre outil croise les ventes réelles près de chez vous, les caractéristiques précises de votre logement et une analyse du marché Lyon / Villeurbanne, pour une fourchette réaliste — sans engagement." },
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
        "**Faire estimer son bien justement.** C'est le point de départ : un prix juste attire les acheteurs dès le premier jour.",
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
    title: "Frais de notaire à Lyon en 2026 : comment les calculer",
    metaDescription:
      "Combien coûtent les frais de notaire à Lyon en 2026 ? Composition, taux dans l'ancien et le neuf, exemple de calcul et nouveautés 2026.",
    h1: "Frais de notaire à Lyon en 2026 : comment les calculer",
    excerpt:
      "Les « frais de notaire » sont surtout des taxes. Composition, taux dans l'ancien et le neuf, et un exemple de calcul concret.",
    date: "2026-04-28",
    internalHref: "/acheter",
    internalLabel: "Être accompagné pour mon achat",
    blocks: [
      { type: "p", text: "Mal nommés, les « frais de notaire » ne vont en réalité pas (ou peu) dans la poche du notaire : ce sont surtout des taxes pour l'État et les collectivités." },
      { type: "h2", text: "Combien ça représente" },
      { type: "ul", items: [
        "**Dans l'ancien** : comptez environ **7 à 8 %** du prix de vente.",
        "**Dans le neuf** : environ **2 à 3 %** (frais réduits).",
      ] },
      { type: "h2", text: "De quoi se composent-ils" },
      { type: "ol", items: [
        "**Les droits de mutation (taxes)** : la plus grosse part. Depuis 2025, les départements peuvent majorer leur part jusqu'à 0,5 point (sur 2025-2028), ce qui augmente légèrement la facture dans l'ancien — vérifiez le taux du Rhône au moment de l'achat. Certains primo-accédants peuvent en être exonérés.",
        "**Les émoluments du notaire** : tarif national réglementé et dégressif.",
        "**Les débours** : frais avancés par le notaire (documents, formalités).",
        "**La contribution de sécurité immobilière** : environ 0,10 %.",
      ] },
      { type: "h2", text: "Exemple" },
      { type: "p", text: "Pour un appartement ancien à **300 000 €**, comptez environ **22 000 à 24 000 €** de frais — à intégrer dès votre plan de financement." },
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
      { type: "p", text: "La vente d'une passoire thermique reste autorisée, mais un audit énergétique est obligatoire pour les biens classés F ou G. Dans tous les cas, un mauvais DPE entraîne une décote : les acheteurs anticipent les travaux." },
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
        "**DPE** : performance énergétique (valable 10 ans).",
        "**Amiante** : pour les biens dont le permis est antérieur à juillet 1997.",
        "**Plomb (CREP)** : logements construits avant 1949.",
        "**Électricité et gaz** : si l'installation a plus de 15 ans.",
        "**État des risques (ERP)** : risques naturels, miniers, technologiques (valable 6 mois).",
        "**Termites** : dans les zones concernées par arrêté préfectoral.",
        "**Assainissement** : pour les installations non collectives.",
        "**Loi Carrez** : mesurage de la surface en copropriété.",
      ] },
      { type: "h2", text: "Le bon réflexe" },
      { type: "p", text: "Faites réaliser les diagnostics avant de mettre en vente : un dossier complet rassure l'acheteur et accélère la transaction." },
    ],
  },
  {
    slug: "gestion-locative-villeurbanne-deleguer-ou-non",
    title: "Gestion locative à Villeurbanne : déléguer ou gérer soi-même ?",
    metaDescription:
      "Faut-il confier la gestion locative de votre bien à une agence à Villeurbanne ? Avantages, coûts et critères pour décider.",
    h1: "Gestion locative à Villeurbanne : déléguer ou gérer soi-même ?",
    excerpt:
      "Gérer un bien en location prend du temps et demande de la rigueur juridique. Comment trancher entre délégation et gestion directe.",
    date: "2026-05-19",
    internalHref: "/gestion-locative",
    internalLabel: "Découvrir notre gestion locative",
    blocks: [
      { type: "p", text: "Gérer un bien en location prend du temps et demande de la rigueur juridique. Voici comment trancher." },
      { type: "h2", text: "Ce que fait une agence à votre place" },
      { type: "ul", items: [
        "Recherche et sélection du locataire (solvabilité, dossier).",
        "Rédaction du bail et états des lieux.",
        "Encaissement des loyers, quittances, révisions.",
        "Gestion des impayés et des sinistres.",
        "Suivi des travaux et des obligations légales (DPE, décence…).",
      ] },
      { type: "h2", text: "Combien ça coûte" },
      { type: "p", text: "En général **6 à 8 % TTC** des loyers encaissés — souvent en partie déductible des revenus fonciers. Une garantie loyers impayés (GLI) peut s'ajouter." },
      { type: "h2", text: "Gérer soi-même : pour qui ?" },
      { type: "p", text: "Pertinent si vous avez du temps, un seul bien proche de chez vous, et que vous maîtrisez les obligations légales (qui se durcissent, notamment sur le DPE)." },
      { type: "h2", text: "Le bon choix" },
      { type: "p", text: "Déléguer devient vite rentable dès que vous valorisez votre temps et votre tranquillité." },
    ],
  },
  {
    slug: "investir-locatif-lyon",
    title: "Investir dans l'immobilier locatif à Lyon : le guide 2026",
    metaDescription:
      "Pourquoi et comment investir dans le locatif à Lyon et Villeurbanne en 2026 : quartiers, types de biens, rendement et fiscalité.",
    h1: "Investir dans l'immobilier locatif à Lyon",
    excerpt:
      "Deuxième métropole de France, Lyon offre une demande locative solide. Quartiers, types de biens, rendement et fiscalité.",
    date: "2026-05-26",
    internalHref: "/estimation",
    internalLabel: "Estimer un bien avant d'investir",
    blocks: [
      { type: "p", text: "Deuxième métropole de France, Lyon offre une demande locative solide, portée par les étudiants, les jeunes actifs et les cadres." },
      { type: "h2", text: "Pourquoi Lyon et Villeurbanne" },
      { type: "ul", items: [
        "Bassin d'emploi dynamique et population en croissance.",
        "Forte demande étudiante (campus, écoles).",
        "Réseau de transports dense qui valorise de nombreux quartiers.",
      ] },
      { type: "h2", text: "Quel bien viser" },
      { type: "p", text: "Les **studios et T2** bien situés se louent vite et offrent souvent le meilleur rendement. Près des campus et des transports, la vacance locative est faible." },
      { type: "h2", text: "Fiscalité et points d'attention" },
      { type: "ul", items: [
        "Statuts comme le **LMNP** (meublé) ou le **déficit foncier** peuvent optimiser la rentabilité.",
        "**Surveillez le DPE** : un bien F ou G est de plus en plus contraint à la location. Intégrez le coût d'éventuels travaux dès l'achat.",
      ] },
      { type: "h2", text: "Bien démarrer" },
      { type: "p", text: "Un bon investissement commence par une estimation juste du prix d'achat et du loyer réaliste." },
    ],
  },
  {
    slug: "ou-acheter-villeurbanne-quartiers",
    title: "Quartiers de Villeurbanne : où acheter en 2026 ?",
    metaDescription:
      "Gratte-Ciel, Charpennes, Cusset, Tonkin… Découvrez les quartiers de Villeurbanne où acheter en 2026 selon votre projet.",
    h1: "Quartiers de Villeurbanne : où acheter en 2026 ?",
    excerpt:
      "Villeurbanne n'est pas un marché uniforme. Chaque quartier a son ambiance, son public et son niveau de prix.",
    date: "2026-06-02",
    internalHref: "/acheter",
    internalLabel: "Trouver le bon bien avec notre équipe",
    blocks: [
      { type: "p", text: "Villeurbanne n'est pas un marché uniforme. Chaque quartier a son ambiance, son public et son niveau de prix." },
      { type: "h2", text: "Les quartiers à connaître" },
      { type: "ul", items: [
        "**Gratte-Ciel** : le cœur historique et commerçant, très recherché. Idéal pour habiter au centre.",
        "**Charpennes** : ultra-connecté (métro/tram), prisé des étudiants et jeunes actifs — un bon terrain d'investissement.",
        "**Le Tonkin** : résidentiel, proche de la Part-Dieu.",
        "**Cusset / République** : familial, bonne offre de commerces.",
        "**Les Brosses, Saint-Jean** : plus calmes, souvent plus accessibles.",
      ] },
      { type: "p", text: "Les fourchettes de prix varient nettement d'un quartier à l'autre. Pour connaître la valeur précise d'un bien dans le secteur qui vous intéresse, demandez une estimation basée sur les ventes réelles." },
      { type: "h2", text: "Choisir selon son projet" },
      { type: "p", text: "Habiter, investir ou viser une plus-value future : le « bon » quartier dépend de votre objectif et de votre budget." },
    ],
  },
  {
    slug: "estimation-en-ligne-ou-agence",
    title: "Estimation en ligne ou par une agence : que choisir ?",
    metaDescription:
      "Estimation immobilière en ligne ou par une agence : avantages, limites et la meilleure approche pour connaître la vraie valeur de votre bien.",
    h1: "Estimation en ligne ou par une agence : que choisir ?",
    excerpt:
      "Deux voies pour connaître la valeur de votre bien — et la bonne nouvelle : les meilleures combinent les deux.",
    date: "2026-06-09",
    internalHref: "/estimation",
    internalLabel: "Lancer mon estimation gratuite en ligne",
    blocks: [
      { type: "p", text: "Pour connaître la valeur de votre bien, deux voies s'offrent à vous. La bonne nouvelle : les meilleures combinent les deux." },
      { type: "h2", text: "L'estimation en ligne" },
      { type: "p", text: "Rapide, gratuite et sans engagement. Une bonne estimation en ligne s'appuie sur les ventes réellement conclues (données DVF) et les caractéristiques de votre bien pour donner une fourchette réaliste en quelques minutes. Idéale pour avoir une première base solide." },
      { type: "p", text: "Sa limite : un outil ne voit pas la luminosité réelle, le calme de la rue ou l'état précis du bien." },
      { type: "h2", text: "L'estimation par une agence" },
      { type: "p", text: "Un conseiller se déplace, voit ce qu'un algorithme ne peut pas voir et affine le prix avec sa connaissance fine du secteur. C'est l'étape qui transforme une fourchette en prix de mise en vente." },
      { type: "h2", text: "La meilleure approche" },
      { type: "p", text: "Commencez en ligne pour une base chiffrée et fiable, puis faites affiner par un professionnel local." },
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
        "**Le bon prix dès le départ.** Les deux premières semaines génèrent le plus de visites : un prix juste capte cette vague d'attention.",
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
        "**Définir son budget** : capacité d'emprunt, apport, et frais de notaire (≈ 7-8 % dans l'ancien).",
        "**Lister ses critères** : secteur, surface, étage, extérieur, transports.",
      ] },
      { type: "h2", text: "Pendant les visites" },
      { type: "ul", items: [
        "Vérifier l'**état réel** (humidité, isolation, luminosité).",
        "Demander le **DPE**, le montant des **charges** et les **travaux votés** en copropriété.",
        "Se renseigner sur le **quartier** (nuisances, projets urbains).",
      ] },
      { type: "h2", text: "Au moment d'acheter" },
      { type: "ul", items: [
        "Faire une **offre** au juste prix.",
        "Signer le **compromis** (délai de rétractation de 10 jours).",
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
      { type: "p", text: "Dans les faits, la plupart des compromis de vente prévoient un **partage au prorata** : l'acheteur rembourse au vendeur la part correspondant à la période où il sera propriétaire. Ce n'est pas une obligation légale, mais un accord privé inscrit dans l'acte — à négocier au moment de la vente." },
      { type: "h2", text: "Exemple" },
      { type: "p", text: "Taxe foncière annuelle de 1 200 €, vente signée le 1er juillet. Le vendeur a payé l'année entière ; l'acheteur lui rembourse 6 mois, soit 600 €." },
      { type: "h2", text: "À retenir" },
      { type: "p", text: "Vérifiez que ce prorata est bien prévu dans le compromis : c'est souvent oublié, et cela évite les mauvaises surprises." },
    ],
  },
  {
    slug: "plus-value-immobiliere-calcul",
    title: "Plus-value immobilière : calcul et exonérations (2026)",
    metaDescription:
      "Comment se calcule la plus-value immobilière, qui est exonéré et comment réduire l'impôt ? Le guide clair pour les vendeurs.",
    h1: "Plus-value immobilière : calcul et exonérations",
    excerpt:
      "La plus-value est la différence entre prix de vente et prix d'achat. Qui est exonéré, à quel taux, et les abattements pour durée de détention.",
    date: "2026-06-11",
    internalHref: "/vendre",
    internalLabel: "Estimer la valeur de mon bien",
    blocks: [
      { type: "p", text: "**La plus-value, c'est la différence entre votre prix de vente et votre prix d'achat** (majoré des frais et des travaux). Elle est imposée… sauf dans le cas le plus courant : la résidence principale." },
      { type: "h2", text: "Qui est exonéré ?" },
      { type: "p", text: "La vente de votre **résidence principale est totalement exonérée** de plus-value. L'impôt ne concerne que les **résidences secondaires** et les **biens locatifs**." },
      { type: "h2", text: "Le taux" },
      { type: "p", text: "Sur un bien imposable : **19 % d'impôt sur le revenu + 17,2 % de prélèvements sociaux**, soit 36,2 % de la plus-value." },
      { type: "h2", text: "Les abattements pour durée de détention" },
      { type: "p", text: "Plus vous gardez le bien longtemps, moins vous payez :" },
      { type: "ul", items: [
        "**Exonération totale d'impôt sur le revenu à partir de 22 ans** de détention.",
        "**Exonération des prélèvements sociaux à partir de 30 ans.**",
      ] },
      { type: "p", text: "Les travaux et les frais d'acquisition viennent réduire la plus-value imposable." },
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
    internalHref: "/vendre",
    internalLabel: "Être accompagné pour ma vente",
    blocks: [
      { type: "p", text: "**Vendre sans agence permet d'économiser la commission, mais vous prenez en charge tout le processus** — et une erreur de prix coûte souvent plus cher que les honoraires économisés." },
      { type: "h2", text: "L'avantage" },
      { type: "p", text: "Pas de commission d'agence (souvent 4 à 6 % du prix)." },
      { type: "h2", text: "Ce que vous devez gérer seul" },
      { type: "p", text: "L'estimation juste, les diagnostics, la rédaction de l'annonce, les photos, la diffusion, les visites, le tri des acheteurs, la négociation et toute la partie juridique jusqu'au compromis." },
      { type: "h2", text: "Le vrai risque" },
      { type: "p", text: "Un bien **mal estimé** stagne ou se vend en dessous de sa valeur. Une agence apporte le prix juste, un réseau d'acheteurs qualifiés et la sécurité juridique — ce qui compense souvent largement sa commission." },
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
    internalHref: "/vendre",
    internalLabel: "Discuter de la vente de mon bien",
    blocks: [
      { type: "p", text: "**Le mandat simple vous laisse confier le bien à plusieurs agences (et le vendre vous-même) ; le mandat exclusif le confie à une seule agence.** Chacun a sa logique." },
      { type: "h2", text: "Le mandat simple" },
      { type: "p", text: "Vous multipliez les canaux. Mais en pratique, un bien « partout » paraît moins exclusif, les agences s'y investissent moins, et le même bien à des prix différents brouille les acheteurs." },
      { type: "h2", text: "Le mandat exclusif" },
      { type: "p", text: "Une seule agence, donc un engagement fort : plus de moyens, un suivi dédié, une stratégie claire. Les biens en exclusivité se vendent souvent **plus vite et à un meilleur prix**, car l'agence concentre ses efforts." },
      { type: "h2", text: "Notre conseil" },
      { type: "p", text: "L'exclusif est généralement plus efficace, à condition de choisir une agence en qui vous avez confiance." },
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
      { type: "p", text: "Une offre **acceptée au prix** engage les deux parties. Mentionnez vos conditions (obtention de prêt) pour vous protéger." },
      { type: "h2", text: "Bien négocier" },
      { type: "p", text: "Appuyez-vous sur des éléments concrets : travaux à prévoir, DPE, durée de mise en vente, prix du secteur. Une négociation argumentée passe mieux qu'un simple « c'est trop cher »." },
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
    internalHref: "/gestion-locative",
    internalLabel: "Découvrir notre gestion locative",
    blocks: [
      { type: "p", text: "**Une agence facture généralement entre 6 et 8 % TTC des loyers encaissés pour gérer votre bien.** En échange, elle s'occupe de tout — et ces frais sont en partie déductibles de vos revenus fonciers." },
      { type: "h2", text: "Ce que ça inclut" },
      { type: "p", text: "Recherche et sélection du locataire, rédaction du bail, états des lieux, encaissement des loyers, quittances, gestion des sinistres et des impayés, suivi des obligations légales." },
      { type: "h2", text: "Les options" },
      { type: "p", text: "La **garantie loyers impayés (GLI)** peut s'ajouter pour sécuriser vos revenus en cas de défaut du locataire." },
      { type: "h2", text: "Le bon calcul" },
      { type: "p", text: "Le coût se compare au temps et au risque que vous évitez. Pour un propriétaire occupé ou éloigné, déléguer est vite rentable." },
    ],
  },
  {
    slug: "rentabilite-locative-lyon",
    title: "Rentabilité locative à Lyon : comment la calculer",
    metaDescription:
      "Calculer la rentabilité locative d'un bien à Lyon ou Villeurbanne : rendement brut, net, et exemple chiffré pour bien investir.",
    h1: "Rentabilité locative à Lyon : comment la calculer",
    excerpt:
      "Rendement brut = loyer annuel ÷ prix d'achat × 100. Mais c'est le net qui compte. Exemple chiffré à Lyon.",
    date: "2026-02-05",
    internalHref: "/gestion-locative",
    internalLabel: "Estimer un bien avant d'investir",
    blocks: [
      { type: "p", text: "**La rentabilité brute se calcule en divisant le loyer annuel par le prix d'achat, multiplié par 100.** Mais c'est la rentabilité nette qui compte vraiment." },
      { type: "h2", text: "Le rendement brut" },
      { type: "p", text: "(Loyer mensuel × 12) ÷ prix d'achat × 100. Exemple : un studio à 150 000 € loué 650 €/mois → (7 800 ÷ 150 000) × 100 = **5,2 %** brut." },
      { type: "h2", text: "Le rendement net" },
      { type: "p", text: "Déduisez les charges non récupérables, la taxe foncière, l'assurance, les éventuels frais de gestion et la vacance locative. Le net est souvent de 1 à 2 points en dessous du brut." },
      { type: "h2", text: "À Lyon et Villeurbanne" },
      { type: "p", text: "La forte demande locative (étudiants, actifs) limite la vacance, ce qui sécurise le rendement. Les petites surfaces bien placées offrent souvent la meilleure rentabilité." },
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
 * Articles liés : ceux qui partagent la même page « argent » (internalHref),
 * du plus récent au plus ancien, hors article courant. Maillage interne.
 */
export function getRelatedArticles(slug: string, n = 2): Article[] {
  const current = getArticle(slug);
  if (!current) return [];
  return getArticlesSorted()
    .filter((a) => a.slug !== slug && a.internalHref === current.internalHref)
    .slice(0, n);
}

/** Articles triés du plus récent au plus ancien (pour le hub). */
export function getArticlesSorted(): Article[] {
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
}
