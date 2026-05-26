import { NextResponse } from "next/server";
import { z } from "zod";
import { notify } from "@/lib/notify";

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
  const result = await notify("contact", parsed.data);
  return NextResponse.json(result);
}
