import { RefreshTokenResponse } from "@/types/requests";
import { postRequest } from "../requests";

export async function getRefreshAccessToken(): Promise<
  RefreshTokenResponse | undefined
> {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_LOCAL_ENV}/api/auth/refresh`
  );

  if (!response.ok) {
    return undefined;
  }

  const data = await response.json();

  return data;
}
