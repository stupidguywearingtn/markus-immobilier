import { PROPERTIES, type PropertyExtended } from "./mock-properties";

export type PropertyFilters = {
  type?: "vente" | "location";
  q?: string; // localisation
  surfaceMin?: number;
  surfaceMax?: number;
  budgetMin?: number;
  budgetMax?: number;
  rooms?: number[]; // pièces ; 5 = "5 et plus"
  sort?: "recent" | "price-asc" | "price-desc" | "surface-desc";
};

// Convertit "425 000 €" ou "1 250 €" en number
function parsePrice(p: string): number {
  return Number(p.replace(/[^\d]/g, "")) || 0;
}

export function filterProperties(
  filters: PropertyFilters,
): PropertyExtended[] {
  let list = PROPERTIES.slice();

  if (filters.type) {
    list = list.filter((p) => p.kind === filters.type);
  }
  if (filters.q && filters.q.trim()) {
    const q = filters.q.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.location.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q),
    );
  }
  if (filters.surfaceMin !== undefined) {
    list = list.filter((p) => p.surface >= filters.surfaceMin!);
  }
  if (filters.surfaceMax !== undefined) {
    list = list.filter((p) => p.surface <= filters.surfaceMax!);
  }
  if (filters.budgetMin !== undefined) {
    list = list.filter((p) => parsePrice(p.price) >= filters.budgetMin!);
  }
  if (filters.budgetMax !== undefined) {
    list = list.filter((p) => parsePrice(p.price) <= filters.budgetMax!);
  }
  if (filters.rooms && filters.rooms.length > 0) {
    list = list.filter((p) =>
      filters.rooms!.some((r) => (r >= 5 ? p.rooms >= 5 : p.rooms === r)),
    );
  }

  switch (filters.sort) {
    case "price-asc":
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      break;
    case "price-desc":
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      break;
    case "surface-desc":
      list.sort((a, b) => b.surface - a.surface);
      break;
    case "recent":
    default:
      // ordre source (le plus récent au début)
      break;
  }

  return list;
}

/** Parse les searchParams Next.js en filtres typés. */
export function parseFilterParams(
  searchParams: Record<string, string | string[] | undefined>,
): PropertyFilters {
  const get = (k: string) => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const num = (k: string) => {
    const v = get(k);
    if (!v) return undefined;
    const n = Number(v);
    return isNaN(n) ? undefined : n;
  };
  const type = get("type");
  return {
    type: type === "vente" || type === "location" ? type : undefined,
    q: get("q") || undefined,
    surfaceMin: num("surfaceMin"),
    surfaceMax: num("surfaceMax"),
    budgetMin: num("budgetMin"),
    budgetMax: num("budgetMax"),
    rooms: (() => {
      const v = get("rooms");
      if (!v) return undefined;
      const arr = v
        .split(",")
        .map((x) => Number(x))
        .filter((n) => !isNaN(n));
      return arr.length ? arr : undefined;
    })(),
    sort: (get("sort") as PropertyFilters["sort"]) || undefined,
  };
}

/** Combien de filtres actifs (utile pour mobile badge). */
export function countActive(filters: PropertyFilters): number {
  let n = 0;
  if (filters.type) n++;
  if (filters.q) n++;
  if (filters.surfaceMin !== undefined || filters.surfaceMax !== undefined) n++;
  if (filters.budgetMin !== undefined || filters.budgetMax !== undefined) n++;
  if (filters.rooms && filters.rooms.length) n++;
  return n;
}
