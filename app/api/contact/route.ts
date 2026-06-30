import { NextResponse } from "next/server";
import { z } from "zod";
import { notify } from "@/lib/notify";
import { sendEmail, leadEmailHtml } from "@/lib/email";

const NOTIFY_EMAIL =
  process.env.CONTACT_NOTIFY_EMAIL || "villeurbanne@markusimmobilier.fr";

const schema = z.object({
  nom: z.string().min(2),
  email: z.email(),
  telephone: z.string().optional(),
  objet: z.string(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }
  const d = parsed.data;
  await notify("contact", d);

  // Email à l'agence — reply_to = email du visiteur (réponse directe en 1 clic).
  const send = await sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: d.email,
    subject: `Nouveau message — ${d.objet} (${d.nom})`,
    html: leadEmailHtml({
      eyebrow: "Formulaire de contact",
      heading: d.nom,
      fields: [
        { label: "Email", value: `<a href="mailto:${d.email}" style="color:#383E42;font-weight:600;">${d.email}</a>` },
        { label: "Téléphone", value: d.telephone ? `<a href="tel:${d.telephone.replace(/\s/g, "")}" style="color:#383E42;font-weight:600;">${d.telephone}</a>` : "" },
        { label: "Objet", value: d.objet },
        { label: "Message", value: d.message.replace(/\n/g, "<br/>") },
      ],
    }),
  });
  if (!send.ok) {
    console.error(`[contact/email] échec → ${NOTIFY_EMAIL} : ${send.status} ${send.error}`);
  }

  return NextResponse.json({ ok: true });
}
