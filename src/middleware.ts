import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import middlewareRedirects from "./middlewareRedirects";

export async function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en"],
    defaultLocale: "en",
  });

  const response = handleI18nRouting(request);
  const nextUrl = await middlewareRedirects(request);

  request.nextUrl.pathname = nextUrl;

  response.headers.set("x-current-path", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
    "/en/:path*",
  ],
};
