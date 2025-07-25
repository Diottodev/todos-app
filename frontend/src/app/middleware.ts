import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedRoutes = ["/auth/login", "/auth/register", "/tasks"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }
  if (allowedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = "/not-found";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
