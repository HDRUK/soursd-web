"use server";

import { cookies } from "next/headers";
import { anyIncludes } from "./string";
import { PROTECTED_ROUTES } from "@/consts/router";

async function getAccessToken(): Promise<string | undefined> {
  return cookies().get("access_token")?.value;
}

function isLoggedInPath(pathname: string) {
  return anyIncludes(pathname, PROTECTED_ROUTES);
}

export { getAccessToken, isLoggedInPath };
