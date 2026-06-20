/**
 * Helper de tracking Umami.
 * Garde `window.umami?.track` pour ne JAMAIS jeter si le script Umami n'est pas
 * (encore) chargé, bloqué par un adblock, ou absent en dev.
 *
 * Umami est cookieless / RGPD-friendly → aucun bandeau de consentement requis.
 */

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

export function track(event: string, data?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    window.umami?.track(event, data);
  } catch {
    /* no-op : le tracking ne doit jamais casser l'UX */
  }
}
