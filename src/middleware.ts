import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import middlewareRedirects from "./middlewareRedirects";

export async function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en"],
    defaultLocale: "en",
  });

  const response = handleI18nRouting(request);

  response.headers.set("x-current-path", request.nextUrl.pathname);

  const redirectUrl = await middlewareRedirects(request.nextUrl.pathname);

  if (redirectUrl) {
    return NextResponse.redirect(`http://localhost:3000${redirectUrl}`);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
    "/en/:path*",
  ],
};
