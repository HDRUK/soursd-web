import { ResetPasswordPayload } from "./types";

export default async (payload: ResetPasswordPayload) => {
  const usersResponse = await fetch(
    `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/admin/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/users?username=${payload.email}`
  );

  const users = await usersResponse.json();

  if (!users?.length) {
    return Promise.reject(new Error("Could not find user"));
  }

  const { id } = users[0];

  const resetResponse = await fetch(
    `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/admin/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/users/${id}/reset-password`,
    {
      method: "PUT",
      body: JSON.stringify({
        type: "password",
        temporary: false,
        value: payload.password,
      }),
    }
  );

  return resetResponse.json();
};
