import { NextRequest, NextResponse } from "next/server";

/**
 * Auth gate — protège /radar et /api/radar/*.
 * Convention Next.js 16 : fichier "proxy.ts" (remplace l'ancien "middleware.ts").
 *
 * Cookie : `markus_admin` doit valoir process.env.RADAR_AUTH_TOKEN.
 * Si absent / incorrect : redirection vers /admin/login (UI) ou 401 (API).
 */

const PROTECTED_PREFIXES = ["/radar", "/api/radar"];

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p + "?"),
  );
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!isProtected(pathname)) return NextResponse.next();

  const expected = process.env.RADAR_AUTH_TOKEN;
  const cookie = req.cookies.get("markus_admin")?.value;
  const authorized = !!expected && cookie === expected;

  if (authorized) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/radar/:path*", "/api/radar/:path*"],
};
