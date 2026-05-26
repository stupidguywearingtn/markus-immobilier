import { NextResponse } from "next/server";
import { z } from "zod";
import { notify } from "@/lib/notify";

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
  // Pour l'instant on enregistre juste son nom + taille.
  const result = await notify("recrutement", parsed.data);
  return NextResponse.json(result);
}
