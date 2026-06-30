import { NextResponse } from "next/server";
import { z } from "zod";
import { notify } from "@/lib/notify";
import { sendEmail, leadEmailHtml } from "@/lib/email";

const NOTIFY_EMAIL =
  process.env.FAIRE_GERER_NOTIFY_EMAIL || "villeurbanne@markusimmobilier.fr";

const ROLE_LABEL: Record<string, string> = {
  president: "Président du conseil syndical",
  "membre-cs": "Membre du conseil syndical",
  coproprietaire: "Copropriétaire",
};

const schema = z.object({
  civilite: z.enum(["madame", "monsieur"]),
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.email(),
  telephone: z.string().min(10),
  role: z.enum(["president", "membre-cs", "coproprietaire"]),
  adresseImmeuble: z.string().min(5),
  codePostal: z.string().regex(/^\d{5}$/),
  ville: z.string().min(2),
  nbAppartements: z.number().min(0).max(200).optional(),
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
  const d = parsed.data;
  await notify("faire-gerer", d);

  const send = await sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: d.email,
    subject: `Demande de gestion / syndic — ${d.prenom} ${d.nom} (${d.ville})`,
    html: leadEmailHtml({
      eyebrow: "Formulaire faire gérer",
      heading: `${d.civilite === "madame" ? "Mme" : "M."} ${d.prenom} ${d.nom}`,
      fields: [
        { label: "Email", value: `<a href="mailto:${d.email}" style="color:#383E42;font-weight:600;">${d.email}</a>` },
        { label: "Téléphone", value: `<a href="tel:${d.telephone.replace(/\s/g, "")}" style="color:#383E42;font-weight:600;">${d.telephone}</a>` },
        { label: "Rôle", value: ROLE_LABEL[d.role] ?? d.role },
        { label: "Immeuble", value: `${d.adresseImmeuble}, ${d.codePostal} ${d.ville}` },
        { label: "Nb d'appartements", value: d.nbAppartements != null ? String(d.nbAppartements) : "" },
      ],
    }),
  });
  if (!send.ok) {
    console.error(`[faire-gerer/email] échec → ${NOTIFY_EMAIL} : ${send.status} ${send.error}`);
  }

  return NextResponse.json({ ok: true });
}
