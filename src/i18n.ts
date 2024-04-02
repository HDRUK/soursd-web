import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./config";

export default getRequestConfig(async ({ locale = "en" }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales[locale]) notFound();

  return {
    messages: locales[locale],
    locale,
  };
});
