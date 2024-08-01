import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en"],
    defaultLocale: "en",
  });

  const response = handleI18nRouting(request);

  response.headers.set("x-current-path", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ["/", "/en/:path*"],
};
