/**
 * Helpers de temps pour le Radar.
 *
 * `formatRelativeTime` rend une chaîne lisible côté agent — l'heure exacte tant
 * qu'on reste sur le jour courant ou la veille, puis bascule en "il y a Xj".
 *
 * Date d'entrée : ISO (champ `publishedAt` après normalize).
 */

const FR_MONTHS = [
  "janv.",
  "févr.",
  "mars",
  "avr.",
  "mai",
  "juin",
  "juil.",
  "août",
  "sept.",
  "oct.",
  "nov.",
  "déc.",
];

export function hoursSince(iso: string): number {
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return Number.POSITIVE_INFINITY;
  return Math.max(0, (Date.now() - t) / 3_600_000);
}

export function formatRelativeTime(iso: string): string {
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return "date inconnue";
  const now = new Date();
  const diffMs = now.getTime() - then.getTime();
  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 2) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;

  const hh = String(then.getHours()).padStart(2, "0");
  const mm = String(then.getMinutes()).padStart(2, "0");

  const sameDay = then.toDateString() === now.toDateString();
  if (sameDay) return `Aujourd'hui à ${hh}h${mm}`;

  const yest = new Date(now);
  yest.setDate(yest.getDate() - 1);
  if (then.toDateString() === yest.toDateString()) return `Hier à ${hh}h${mm}`;

  if (days < 7) return `il y a ${days} jour${days > 1 ? "s" : ""}`;
  if (days < 30) return `il y a ${days} jours`;

  const dd = String(then.getDate()).padStart(2, "0");
  return `${dd} ${FR_MONTHS[then.getMonth()]}`;
}

/**
 * Fraîcheur de l'annonce — utilisée pour les chips visuels et le tri "À appeler".
 *   hot   : ≤ 48h
 *   fresh : ≤ 7j
 *   warm  : ≤ 30j
 *   cold  : > 30j
 */
export function freshnessTier(iso: string): "hot" | "fresh" | "warm" | "cold" {
  const h = hoursSince(iso);
  if (h <= 48) return "hot";
  if (h <= 168) return "fresh";
  if (h <= 720) return "warm";
  return "cold";
}
