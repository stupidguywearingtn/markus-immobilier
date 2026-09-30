import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

/**
 * Appelée par l'éditeur juste après « Publier » : vide le cache de la page
 * pour que la modification soit visible en ligne IMMÉDIATEMENT (sinon il
 * faudrait attendre jusqu'à 60 s).
 *
 * Sécurité : le jeton de session Supabase de l'admin est vérifié, puis son
 * rôle `admin` (table user_roles). Un visiteur ne peut rien déclencher.
 */
export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!url || !key || !token) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const sb = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: userData, error: userErr } = await sb.auth.getUser(token);
  if (userErr || !userData.user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const { data: role } = await sb
    .from("user_roles")
    .select("role")
    .eq("user_id", userData.user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (!role) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  let slug = "";
  try {
    const body = (await req.json()) as { slug?: unknown };
    slug = typeof body.slug === "string" ? body.slug : "";
  } catch {
    /* corps vide = accueil */
  }
  if (!/^[a-z0-9-]*$/.test(slug)) {
    return NextResponse.json({ ok: false, error: "bad_slug" }, { status: 400 });
  }

  revalidatePath(slug ? `/${slug}` : "/");
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ ok: true });
}
