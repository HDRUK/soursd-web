import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en"],
    defaultLocale: "en",
  });

  const response = handleI18nRouting(request);

  response.headers.set("x-url", request.url);

  return response;
}

export const config = {
  matcher: ["/", "/en/:path*"],
};
