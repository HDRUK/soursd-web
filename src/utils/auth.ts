"use server";

import { Auth, User } from "@/types/application";
import dayjs from "dayjs";
import { cookies } from "next/headers";

async function setAuthData(authData: Auth) {
  cookies().set("auth", JSON.stringify(authData), {
    expires: dayjs().add(authData.expires).toDate(),
  });
}

async function getAuthData(): Promise<Auth> {
  const authCookie = cookies().get("auth")?.value;

  return authCookie ? JSON.parse(decodeURI(authCookie)) : {};
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
