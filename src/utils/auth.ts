"use server";

import { cookies } from "next/headers";

async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
}

export { getAccessToken };
