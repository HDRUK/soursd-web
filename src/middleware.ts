import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import middlewareRedirects from "./middlewareRedirects";
import { isInPath } from "./utils/redirects";
import { getLocalePath } from "./utils/language";

export async function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en"],
    defaultLocale: "en",
  });

  const response = handleI18nRouting(request);
  const { pathname } = request.nextUrl;
  const localePath = await getLocalePath("");
  const redirectUrl = pathname
    ? await middlewareRedirects(pathname)
    : undefined;

  response.headers.set("x-current-path", pathname);

  if (
    pathname === localePath ||
    (redirectUrl && !isInPath(redirectUrl, pathname))
  ) {
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
