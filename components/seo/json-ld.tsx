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

const PROVIDER = {
  "@type": "RealEstateAgent",
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
