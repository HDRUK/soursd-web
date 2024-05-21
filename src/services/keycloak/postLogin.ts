import { ResponseTranslations } from "@/types/requests";
import { LoginPayload, LoginRequest } from "./types";

export default async (
  { email, password }: LoginPayload,
  messages: ResponseTranslations
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: email,
        password,
        client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
        grant_type: "password",
        client_secret: "ygiNa63IlLeGpDTGiPWZxcTWKMwMlEwd",
      } as LoginRequest),
    }
  );

  if (!response.ok) {
    return Promise.reject(
      new Error(
        response.status === 401
          ? messages["401"]?.message
          : messages.error?.message
      )
    );
  }

  return response.json();
};
