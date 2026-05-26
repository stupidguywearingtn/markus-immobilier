import { NextResponse } from "next/server";
import { z } from "zod";
import { notify } from "@/lib/notify";

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
  const result = await notify("faire-gerer", parsed.data);
  return NextResponse.json(result);
}
