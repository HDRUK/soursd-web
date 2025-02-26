"use server";

import { cookies } from "next/headers";

async function getLocale(): Promise<string> {
  return cookies().get("NEXT_LOCALE")?.value || "en";
}

export { getLocale };
