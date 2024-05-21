import { IssuerSignupPayload } from "./types";

export default async (
  payload: IssuerSignupPayload,
  options?: { enabled: true }
) => {
  const resetResponse = await fetch(
    `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/admin/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/users`,
    {
      method: "POST",
      headers: {
        Accept: `application/json`,
      },
      body: JSON.stringify({
        ...options,
        username: payload.email,
        email: payload.email,
        firstName: payload.firstName || "",
        lastName: payload.lastName || "",
        credentials: [
          { type: "password", value: payload.password, temporary: false },
        ],
      }),
    }
  );

  return resetResponse.json();
};
