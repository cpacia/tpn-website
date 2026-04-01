import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "tpn_admin_session";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

async function isValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;

  const secret = getJwtSecret();
  if (!secret) return false;

  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  const isAdminSubdomain = hostname.startsWith("admin.");
  const isAdminPath = pathname.startsWith("/admin");

  // If on admin subdomain, rewrite paths to /admin/* (except /api/*)
  if (isAdminSubdomain && !pathname.startsWith("/api")) {
    const internalPath = pathname === "/" ? "/admin" : `/admin${pathname}`;

    // Allow login page without auth
    if (
      internalPath === "/admin/login" ||
      internalPath.startsWith("/admin/login/")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = internalPath;
      return NextResponse.rewrite(url);
    }

    // Check auth for all other admin pages
    const valid = await isValidSession(request);
    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.rewrite(url);
    }

    const url = request.nextUrl.clone();
    url.pathname = internalPath;
    return NextResponse.rewrite(url);
  }

  // If accessing /admin/* directly (localhost dev)
  if (isAdminPath) {
    // Allow login page
    if (
      pathname === "/admin/login" ||
      pathname.startsWith("/admin/login/")
    ) {
      return NextResponse.next();
    }

    // Allow API routes
    if (pathname.startsWith("/api/")) {
      return NextResponse.next();
    }

    // Check auth for all other admin pages
    const valid = await isValidSession(request);
    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Marketing site — pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
