/**
 * Slug FR : minuscules, sans accents, séparateurs `-`, sans caractères parasites.
 * "Appartement T3 — Villeurbanne (Grand Clément)" -> "appartement-t3-villeurbanne-grand-clement"
 */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // diacritiques combinatoires
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 80);
}

/**
 * Rend un slug unique vis-à-vis d'une liste de slugs déjà pris (statiques + base).
 * Ajoute un suffixe -2, -3… si nécessaire.
 */
export function uniqueSlug(base: string, taken: Iterable<string>): string {
  const set = new Set(taken);
  const root = slugify(base) || "annonce";
  if (!set.has(root)) return root;
  let n = 2;
  while (set.has(`${root}-${n}`)) n++;
  return `${root}-${n}`;
}
