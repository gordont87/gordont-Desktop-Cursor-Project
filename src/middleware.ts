import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  TENANT_SESSION_COOKIE,
  verifySessionToken,
  verifyTenantSessionToken,
} from "@/lib/auth-edge";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/owners/portal")) {
    const isLogin = pathname === "/owners/portal/login";
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = token ? await verifySessionToken(token) : null;

    if (!session && !isLogin) {
      const url = request.nextUrl.clone();
      url.pathname = "/owners/portal/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    if (session && isLogin) {
      const url = request.nextUrl.clone();
      url.pathname = "/owners/portal";
      url.search = "";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/tenants/portal")) {
    const isPublicAuthPage =
      pathname === "/tenants/portal/login" ||
      pathname === "/tenants/portal/forgot-password" ||
      pathname === "/tenants/portal/reset-password";
    const token = request.cookies.get(TENANT_SESSION_COOKIE)?.value;
    const session = token ? await verifyTenantSessionToken(token) : null;

    if (!session && !isPublicAuthPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/tenants/portal/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    if (session && pathname === "/tenants/portal/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/tenants/portal";
      url.search = "";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/owners/portal/:path*", "/tenants/portal/:path*"],
};
