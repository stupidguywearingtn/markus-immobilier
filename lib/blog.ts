/**
 * Contenu du blog Markus Immobilier — 12 articles SEO (longue traîne locale).
 * Un article = une page /blog/[slug]. Chaque article pointe (lien interne) vers
 * une page « argent » (estimation, vendre, acheter, gestion locative).
 *
 * NB : les articles « prix-immobilier-villeurbanne-2026 » et
 * « ou-acheter-villeurbanne-quartiers » contiennent une section où le client
 * doit ajouter ses chiffres €/m² réels par quartier (jamais inventer un prix).
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  excerpt: string;
  date: string; // ISO
  internalHref: string;
  internalLabel: string;
  blocks: Block[];
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
    title: "Prix immobilier à Villeurbanne en 2026 : analyse du marché",
    metaDescription:
      "Quel est le prix au m² à Villeurbanne en 2026 ? Tendances par quartier, facteurs de prix et conseils pour bien estimer votre bien.",
    h1: "Prix immobilier à Villeurbanne en 2026 : ce qu'il faut savoir",
    excerpt:
      "Derrière un « prix moyen au m² », les écarts entre quartiers sont importants. Comment lire le marché villeurbannais en 2026.",
    date: "2026-04-14",
    internalHref: "/estimation",
    internalLabel: "Estimer gratuitement mon bien à Villeurbanne",
    blocks: [
      { type: "p", text: "Voisine directe de Lyon, Villeurbanne attire familles, cadres et investisseurs. Mais derrière un « prix moyen au m² », les écarts entre quartiers sont importants. Voici comment lire le marché en 2026." },
      { type: "h2", text: "Ce qui fait le prix à Villeurbanne" },
      { type: "ul", items: [
        "**La proximité de Lyon et des transports** : métro A, lignes de tram, accès rapide à la Part-Dieu.",
        "**Le quartier** : Gratte-Ciel (cœur historique et prisé), Charpennes (très demandé, étudiants et actifs), Cusset, Tonkin, Les Brosses… chacun a sa dynamique.",
        "**Le type de bien et son état** : un bien rénové avec extérieur se négocie bien au-dessus de la moyenne.",
        "**Le DPE** : les logements énergivores subissent une décote croissante.",
      ] },
      { type: "p", text: "Les prix au m² varient sensiblement d'un quartier à l'autre. Plutôt que de vous fier à une moyenne, demandez une estimation précise basée sur les ventes réelles de votre secteur." },
      { type: "h2", text: "Acheteur ou vendeur : comment s'en servir" },
      { type: "p", text: "Un prix moyen ne suffit jamais pour fixer le prix d'un bien précis. Deux appartements de même surface dans la même rue peuvent avoir 15 à 20 % d'écart selon l'étage, l'état et l'exposition." },
      { type: "h2", text: "Connaître la vraie valeur de votre bien" },
      { type: "p", text: "Estimez gratuitement votre bien à Villeurbanne : notre outil s'appuie sur les ventes réellement conclues près de chez vous." },
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
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Articles triés du plus récent au plus ancien (pour le hub). */
export function getArticlesSorted(): Article[] {
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
}
