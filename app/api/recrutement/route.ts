import { NextResponse } from "next/server";
import { z } from "zod";
import { notify } from "@/lib/notify";
import { sendEmail, leadEmailHtml } from "@/lib/email";

const NOTIFY_EMAIL =
  process.env.RECRUTEMENT_NOTIFY_EMAIL || "villeurbanne@markusimmobilier.fr";

const schema = z.object({
  prenom: z.string().min(2),
  nom: z.string().min(2),
  email: z.email(),
  telephone: z.string().min(10),
  message: z.string().optional(),
  cvName: z.string().optional(),
  cvSize: z.number().optional(),
  cv: z
    .object({
      name: z.string(),
      type: z.string().optional(),
      dataBase64: z.string(),
    })
    .optional(),
});

// Limite de sécurité côté serveur (backstop ; la vraie limite est le body Vercel ~4,5 Mo).
const MAX_CV_BASE64 = 5 * 1024 * 1024;

export const maxDuration = 30;

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation_failed" }, { status: 422 });
  }
  const d = parsed.data;
  // On ne logge pas le base64 du CV (lourd) — juste les métadonnées.
  const { cv: cvFile, ...logData } = d;
  await notify("recrutement", logData);

  // CV en pièce jointe si fourni et sous la limite de taille.
  const attachments: { filename: string; content: string }[] = [];
  let cvLine = "non fourni";
  if (cvFile?.dataBase64) {
    if (cvFile.dataBase64.length > MAX_CV_BASE64) {
      cvLine = `${cvFile.name} — trop volumineux, non joint (à demander au candidat)`;
    } else {
      attachments.push({ filename: cvFile.name, content: cvFile.dataBase64 });
      cvLine = `${cvFile.name} — joint à cet email ✓`;
    }
  } else if (d.cvName) {
    cvLine = `${d.cvName} — non transmis`;
  }

  const send = await sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: d.email,
    subject: `Nouvelle candidature — ${d.prenom} ${d.nom}`,
    html: leadEmailHtml({
      eyebrow: "Candidature — recrutement",
      heading: `${d.prenom} ${d.nom}`,
      fields: [
        { label: "Email", value: `<a href="mailto:${d.email}" style="color:#383E42;font-weight:600;">${d.email}</a>` },
        { label: "Téléphone", value: `<a href="tel:${d.telephone.replace(/\s/g, "")}" style="color:#383E42;font-weight:600;">${d.telephone}</a>` },
        { label: "Message", value: (d.message || "").replace(/\n/g, "<br/>") },
        { label: "CV", value: cvLine },
      ],
    }),
    attachments,
  });
  if (!send.ok) {
    console.error(`[recrutement/email] échec → ${NOTIFY_EMAIL} : ${send.status} ${send.error}`);
  }

  return NextResponse.json({ ok: true });
}
