import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const fallbackLocale = "en";
  const resolvedLocale = locale ?? fallbackLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../config/locales/${resolvedLocale}.json`))
      .default,
  };
});
