/**
 * Couche d'envoi des soumissions de formulaires.
 *
 * Pour l'instant : log structuré côté serveur (visible dans les logs Vercel/dev).
 * Quand le client choisit Resend / Formspree / SMTP, brancher l'API ici — toutes
 * les routes /api/* l'utilisent, donc une seule intégration suffira.
 *
 * Exemple Resend (à activer plus tard) :
 *   import { Resend } from 'resend';
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: 'Markus <hello@markusimmobilier.fr>',
 *     to: 'villeurbanne@markusimmobilier.fr',
 *     subject,
 *     html: renderHtml(payload),
 *   });
 */

export type NotifyKind =
  | "contact"
  | "faire-gerer"
  | "estimation"
  | "recrutement";

export async function notify(kind: NotifyKind, payload: Record<string, unknown>) {
  const now = new Date().toISOString();
  // eslint-disable-next-line no-console
  console.log(`[markus-form] ${now} kind=${kind}`, JSON.stringify(payload));

  // TODO Phase C v2 : brancher Resend ou Formspree ici quand le client a tranché.
  // L'envoi est volontairement simulé pour ne pas crasher si la clé API n'est pas
  // configurée — on garde une UX qui marche aujourd'hui.

  // Simule une légère latence réseau
  await new Promise((r) => setTimeout(r, 350));
  return { ok: true, id: `${kind}-${Date.now()}` } as const;
}
