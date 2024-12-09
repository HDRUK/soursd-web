import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleResponseError, patchRequest } from "../requests";
import { PatchIssuerUserPayload, PatchIssuerUserResponse } from "./types";

export default async (
  userId: number,
  payload: PatchIssuerUserPayload,
  messages: ResponseTranslations
): Promise<ResponseJson<PatchIssuerUserResponse>> => {
  const response = await patchRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/issuer_users/${userId}`,
    payload,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  const error = handleResponseError(response, messages);

  if (error) {
    return Promise.reject(error);
  }

  return response.json();
};
