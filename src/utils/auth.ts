"use server";

import { LoginResponse, User } from "@/services/auth/types";
import dayjs from "dayjs";
import { cookies } from "next/headers";

async function setAuthData(authData: LoginResponse) {
  cookies().set("auth", JSON.stringify(authData), {
    expires: dayjs().add(authData.expires).toDate(),
  });
}

async function getAuthData(): Promise<LoginResponse> {
  return JSON.parse(cookies().get("auth")?.value || "{}");
}

async function updateAuthUser(userData: Partial<User>) {
  const cookieAuthData = await getAuthData();

  await setAuthData({
    ...cookieAuthData,
    user: {
      ...cookieAuthData.user,
      ...userData,
    },
  });
}

export { getAuthData, setAuthData, updateAuthUser };
