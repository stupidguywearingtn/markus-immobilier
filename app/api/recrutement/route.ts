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
});

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation_failed" }, { status: 422 });
  }
  // Note : l'upload binaire du CV viendra avec multipart/form-data + Resend attachments.
  // Pour l'instant on transmet son nom + taille (le candidat enverra le CV en réponse).
  const d = parsed.data;
  await notify("recrutement", d);

  const cv = d.cvName
    ? `${d.cvName}${d.cvSize ? ` (${Math.round(d.cvSize / 1024)} Ko)` : ""} — à demander en réponse au candidat`
    : "non fourni";

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
        { label: "CV", value: cv },
      ],
    }),
  });
  if (!send.ok) {
    console.error(`[recrutement/email] échec → ${NOTIFY_EMAIL} : ${send.status} ${send.error}`);
  }

  return NextResponse.json({ ok: true });
}
