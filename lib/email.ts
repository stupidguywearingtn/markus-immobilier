/**
 * Envoi d'emails via l'API REST Resend (https://resend.com).
 *
 * On utilise fetch directement (pas le SDK) → aucune dépendance ajoutée.
 *
 * Variables d'env :
 *   - RESEND_API_KEY          : clé API Resend (obligatoire pour envoyer)
 *   - ESTIMATION_NOTIFY_EMAIL : destinataire interne (agence). Défaut ci-dessous.
 *   - EMAIL_FROM              : expéditeur. Défaut = sandbox Resend
 *                               (onboarding@resend.dev) tant que le domaine
 *                               markusimmobilier.fr n'est pas vérifié côté Resend.
 *
 * ⚠️ LIMITE SANDBOX RESEND : avec l'expéditeur onboarding@resend.dev, Resend
 * n'autorise l'envoi QUE vers l'adresse email du propriétaire du compte Resend.
 * Tant que le domaine n'est pas vérifié, l'email "client" (adresse saisie dans
 * le formulaire) sera probablement refusé (403) — c'est attendu, et on le logge
 * clairement pour le voir.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// Destinataire interne par défaut (test). Surchargeable via ESTIMATION_NOTIFY_EMAIL.
// ⚠️ orthographe à confirmer côté client (voir note de livraison).
export const DEFAULT_NOTIFY_EMAIL = "yanisouammou063@gmail.com";

// Domaine markusimmobilier.fr vérifié dans Resend → on peut envoyer depuis une
// adresse @markusimmobilier.fr vers n'importe quel destinataire (plus de limite
// sandbox). Surchargeable via EMAIL_FROM.
const DEFAULT_FROM = "Markus Immobilier <estimation@markusimmobilier.fr>";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

export type SendEmailResult =
  | { ok: true; id: string }
  | { ok: false; status: number | null; error: string };

const SANDBOX_FROM = "Markus Immobilier <onboarding@resend.dev>";

/** Un seul POST vers l'API Resend. Renvoie le résultat brut + le status. */
async function postResend(
  apiKey: string,
  from: string,
  input: SendEmailInput,
): Promise<{ ok: boolean; status: number | null; id: string; message: string }> {
  const toList = Array.isArray(input.to) ? input.to : [input.to];
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: toList,
        subject: input.subject,
        html: input.html,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(15_000),
    });
    const raw = await res.text();
    if (!res.ok) {
      let message = raw.slice(0, 300);
      try {
        const j = JSON.parse(raw) as { message?: string; name?: string };
        if (j.message) message = `${j.name ? `${j.name}: ` : ""}${j.message}`;
      } catch {
        /* garde le texte brut */
      }
      return { ok: false, status: res.status, id: "", message };
    }
    let id = "";
    try {
      id = (JSON.parse(raw) as { id?: string }).id ?? "";
    } catch {
      /* ignore */
    }
    return { ok: true, status: res.status, id, message: "" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return { ok: false, status: null, id: "", message: msg };
  }
}

/**
 * Envoie un email via Resend. Ne JETTE jamais — renvoie un résultat structuré
 * pour que l'appelant puisse logger sans casser le flux (l'estimation doit
 * réussir même si l'email échoue).
 *
 * Stratégie :
 *   1. Tente l'envoi depuis l'adresse de marque (EMAIL_FROM / domaine vérifié).
 *   2. Si Resend répond "domaine non vérifié" (403), REPLI automatique vers
 *      l'expéditeur sandbox onboarding@resend.dev — qui ne livre qu'à l'email
 *      propriétaire du compte Resend, mais permet de tester aujourd'hui.
 *   Chaque étape est loggée (status + message).
 */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim().length < 10) {
    console.error("[resend] RESEND_API_KEY manquante — email non envoyé");
    return { ok: false, status: null, error: "missing_api_key" };
  }

  const toList = Array.isArray(input.to) ? input.to : [input.to];
  const primaryFrom = process.env.EMAIL_FROM || DEFAULT_FROM;

  // 1) Envoi principal (domaine de marque)
  const primary = await postResend(apiKey, primaryFrom, input);
  if (primary.ok) {
    console.log(`[resend] ✓ envoyé from="${primaryFrom}" to=${toList.join(",")} id=${primary.id}`);
    return { ok: true, id: primary.id };
  }

  const domainNotVerified =
    primary.status === 403 && /not verified|domain/i.test(primary.message);

  console.error(
    `[resend] ✗ envoi principal ÉCHOUÉ status=${primary.status} from="${primaryFrom}" to=${toList.join(",")} — ${primary.message}`,
  );

  // 2) Repli sandbox si le domaine n'est pas (encore) vérifié sous cette clé
  if (domainNotVerified && primaryFrom !== SANDBOX_FROM) {
    console.warn(
      `[resend] ↻ domaine non vérifié sous cette clé → repli via ${SANDBOX_FROM} (ne livre qu'à l'email propriétaire du compte Resend)`,
    );
    const fb = await postResend(apiKey, SANDBOX_FROM, input);
    if (fb.ok) {
      console.log(`[resend] ✓ envoyé (repli sandbox) to=${toList.join(",")} id=${fb.id}`);
      return { ok: true, id: fb.id };
    }
    console.error(
      `[resend] ✗ repli sandbox ÉCHOUÉ status=${fb.status} to=${toList.join(",")} — ${fb.message}`,
    );
    return { ok: false, status: fb.status, error: `sandbox_fallback: ${fb.message}` };
  }

  return { ok: false, status: primary.status, error: primary.message };
}
