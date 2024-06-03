"use server";

import { LoginResponse } from "@/services/auth/types";
import { cookies } from "next/headers";

async function setAuthData(authData: LoginResponse) {
  cookies().set("auth", JSON.stringify(authData));
}

async function getAuthData(): Promise<LoginResponse> {
  return JSON.parse(cookies().get("auth")?.value || "{}");
}

export { getAuthData, setAuthData };
