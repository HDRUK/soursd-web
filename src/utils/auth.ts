"use server";

import { cookies } from "next/headers";

async function getAccessToken(): Promise<string | undefined> {
  return cookies().get("access_token")?.value;
}

export { getAccessToken };
