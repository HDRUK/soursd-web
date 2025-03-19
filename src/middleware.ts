import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import middlewareRedirects from "./middlewareRedirects";

export async function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en"],
    defaultLocale: "en",
  });

  const response = handleI18nRouting(request);
  const pathname = request.nextUrl.pathname;
  const redirectUrl = await middlewareRedirects(pathname);

  response.headers.set("x-current-path", pathname);

  if (redirectUrl && !pathname.includes(redirectUrl)) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_LOCAL_ENV?.replace(/\/*$/g, "")}${redirectUrl}`
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
    "/en/:path*",
  ],
};
