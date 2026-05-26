import { NextResponse } from "next/server";

/**
 * Auth handler — vérifie le mot de passe contre `process.env.RADAR_PASSWORD`,
 * pose un cookie HTTP-only avec la valeur `RADAR_AUTH_TOKEN` (qui sert de
 * référence dans le middleware).
 *
 * Variables d'env attendues :
 *   - RADAR_PASSWORD       : mot de passe à saisir dans le formulaire
 *   - RADAR_AUTH_TOKEN     : valeur opaque écrite dans le cookie
 */

const COOKIE_NAME = "markus_admin";
const ONE_WEEK = 60 * 60 * 24 * 7;

export async function POST(req: Request) {
  let body: { password?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const expected = process.env.RADAR_PASSWORD;
  const token = process.env.RADAR_AUTH_TOKEN;

  if (!expected || !token) {
    return NextResponse.json(
      { ok: false, error: "server_misconfigured", hint: "Set RADAR_PASSWORD and RADAR_AUTH_TOKEN" },
      { status: 500 },
    );
  }
  if (!body.password || body.password !== expected) {
    return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_WEEK,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: COOKIE_NAME, value: "", maxAge: 0, path: "/" });
  return res;
}
