import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const langParam = searchParams.get("lang");
  const lang = langParam === "en" ? "en" : "es";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-lang", lang);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|opengraph-image|robots.txt|sitemap.xml|brand/|images/|.*\\.html$).*)",
  ],
};
