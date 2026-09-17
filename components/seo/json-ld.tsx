/**
 * Injecteur de données structurées JSON-LD (schema.org).
 * Rend un <script type="application/ld+json"> — à placer dans une page serveur.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const BASE = "https://www.markusimmobilier.fr";

/**
 * Identifiant canonique de l'agence dans le graphe schema.org.
 *
 * Toutes les mentions de l'agence — le `RealEstateAgent` complet du layout, le
 * `provider` des `Service`, le `worksFor` des `Person`, le `publisher` du blog —
 * portent ce même `@id`. Sans lui, chaque page déclare une agence *distincte* et
 * le moteur voit des entités jumelles au lieu d'une seule, mieux décrite à
 * chaque page. Ne le changer qu'en le changeant PARTOUT (layout inclus).
 */
export const AGENCY_ID = `${BASE}/#agence`;

const PROVIDER = {
  "@type": "RealEstateAgent",
  "@id": AGENCY_ID,
  name: "Markus Immobilier",
  telephone: "+33478371367",
  url: BASE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "87 rue Édouard Vaillant",
    addressLocality: "Villeurbanne",
    postalCode: "69100",
    addressCountry: "FR",
  },
};

/** Fil d'Ariane structuré pour une page interne. */
export function breadcrumbLd(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${BASE}${it.path}`,
    })),
  };
}

/**
 * FAQ structurée. **Toujours construire ce JSON-LD à partir du MÊME tableau que
 * la FAQ affichée** (cf. `<FaqBlock>`) : une FAQPage qui ne correspond pas au
 * contenu visible est un mismatch sanctionnable par Google.
 * Objectif ici : citabilité par les LLM, pas un rich result (Google réserve
 * l'affichage FAQ aux sites gouvernementaux et de santé depuis août 2023).
 */
export function faqLd(items: { q: string; a: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Procédure structurée (contenus « comment faire »), reprise du contenu visible. */
export function howToLd(opts: {
  name: string;
  description: string;
  totalTime?: string;
  steps: { name: string; text: string }[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** Service immobilier structuré (pages /vendre, /acheter, /gestion-locative…). */
export function serviceLd(opts: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    areaServed: ["Villeurbanne", "Lyon", "Métropole de Lyon"],
    url: `${BASE}${opts.path}`,
    provider: PROVIDER,
  };
}

/**
 * Convertit une cellule de barème en montant numérique, **uniquement** quand
 * c'est un montant en euros ferme (« 9 000 € », « 120 € »). Tout le reste —
 * pourcentage, tarif à l'unité, formule composée (« 6 % », « 8 €/m² »,
 * « 70 € + 10 €/lot suppl. », « Vacation ») — renvoie `null` : le balisage ne
 * doit jamais affirmer un prix que la page n'affiche pas sous cette forme.
 */
function fermeEnEuros(tarif: string): number | null {
  // Espaces fines/insécables utilisées par la typo française des tableaux.
  const nettoye = tarif.replace(/[\s  ]/g, "");
  const m = /^(\d+)€$/.exec(nettoye);
  return m ? Number(m[1]) : null;
}

/**
 * Barème tarifaire structuré (`OfferCatalog`), pour la page /honoraires.
 *
 * **À construire depuis les MÊMES constantes que les tableaux affichés** — même
 * garantie que `faqLd()` : chaque ligne visible devient une `Offer` dont le
 * `name` est la prestation et la `description` le tarif **repris mot pour mot**.
 * Un mismatch est donc impossible par construction.
 *
 * Objectif : citabilité par les LLM (« combien coûte une agence immobilière à
 * Villeurbanne ? »), pas un rich result — Google n'affiche pas de barème.
 */
export function offerCatalogLd(opts: {
  name: string;
  description: string;
  path: string;
  sections: { name: string; note?: string; rows: string[][] }[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${BASE}${opts.path}#bareme`,
    name: opts.name,
    description: opts.description,
    url: `${BASE}${opts.path}`,
    inLanguage: "fr-FR",
    provider: { "@id": AGENCY_ID },
    itemListElement: opts.sections.map((s, i) => ({
      "@type": "OfferCatalog",
      position: i + 1,
      name: s.name,
      ...(s.note ? { description: s.note } : {}),
      itemListElement: s.rows.map(([prestation, tarif]) => {
        const euros = fermeEnEuros(tarif);
        return {
          "@type": "Offer",
          name: prestation,
          description: tarif,
          ...(euros !== null
            ? { price: euros, priceCurrency: "EUR" }
            : {}),
          valueAddedTaxIncluded: true,
          areaServed: ["Villeurbanne", "Lyon", "Métropole de Lyon"],
          seller: { "@id": AGENCY_ID },
        };
      }),
    })),
  };
}

/**
 * Membres de l'équipe (`Person`) + rattachement `employee` à l'agence.
 *
 * Ne structure que ce qui est **déjà affiché** sur /equipe (nom, poste, e-mail
 * et téléphone directs) : aucune affirmation nouvelle sur une personne réelle.
 * Le téléphone est passé en E.164, seul format que schema.org attend.
 */
export function teamLd(
  members: {
    prenom: string;
    nom: string;
    poste: string;
    bio?: string;
    email: string;
    telephone: string;
    photo?: string | null;
  }[],
  path: string,
): Record<string, unknown> {
  const personnes = members.map((m) => ({
    "@type": "Person",
    "@id": `${BASE}${path}#${m.prenom.toLowerCase()}-${m.nom.toLowerCase()}`,
    name: `${m.prenom} ${m.nom}`,
    givenName: m.prenom,
    familyName: m.nom,
    jobTitle: m.poste,
    ...(m.bio ? { description: m.bio } : {}),
    // Coordonnées optionnelles (back-office) : jamais de valeur vide balisée.
    ...(m.email ? { email: m.email } : {}),
    ...(m.telephone ? { telephone: `+33${m.telephone.replace(/[\s  .]/g, "").replace(/^0/, "")}` } : {}),
    ...(m.photo ? { image: /^https?:\/\//.test(m.photo) ? m.photo : `${BASE}${m.photo}` } : {}),
    url: `${BASE}${path}`,
    worksFor: { "@id": AGENCY_ID },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...personnes,
      {
        "@type": "RealEstateAgent",
        "@id": AGENCY_ID,
        employee: personnes.map((p) => ({ "@id": p["@id"] })),
      },
    ],
  };
}

/**
 * Le blog comme collection (`Blog`) + la liste ordonnée de ses articles
 * (`ItemList`), telle qu'elle est affichée sur /blog.
 *
 * L'`ItemList` ne fait que **pointer** vers chaque article (position, URL, titre
 * visible sur la carte) : le détail éditorial — `headline`, dates, FAQ — reste
 * déclaré par la page de l'article elle-même, qui en est la source. Deux nœuds
 * `BlogPosting` complets et concurrents seraient un risque de contradiction.
 */
export function blogLd(
  posts: { slug: string; title: string }[],
  opts: { name: string; description: string },
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${BASE}/blog#blog`,
        name: opts.name,
        description: opts.description,
        url: `${BASE}/blog`,
        inLanguage: "fr-FR",
        publisher: { "@id": AGENCY_ID },
      },
      {
        "@type": "ItemList",
        name: opts.name,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: posts.length,
        itemListElement: posts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${BASE}/blog/${p.slug}`,
          name: p.title,
        })),
      },
    ],
  };
}
