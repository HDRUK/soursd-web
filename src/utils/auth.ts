"use server";

import { Auth, User } from "@/types/application";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { getRequest } from "@/services/requests";

async function setAuthData(authData: Auth) {
  cookies().set("auth", JSON.stringify(authData), {
    expires: dayjs().add(authData.expires).toDate(),
  });
}

async function getMe(): Promise<User> {
  const accessToken = cookies().get("access_token")?.value;

  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_IP_URL}/auth/me`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (response.ok) {
    const responseData = await response.json();
    return responseData.data as User;
  }
  throw new Error("Failed to fetch user");
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

export { getMe, getAuthData, setAuthData, updateAuthUser };
