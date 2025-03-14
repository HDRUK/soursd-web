"use server";

import { cookies } from "next/headers";

async function getLocale(): Promise<string> {
  return cookies().get("NEXT_LOCALE")?.value || "en";
}

async function getLocalePath(path: string): Promise<string> {
  const locale = await getLocale();

  return `/${locale}${path}`;
}

export { getLocale, getLocalePath };
