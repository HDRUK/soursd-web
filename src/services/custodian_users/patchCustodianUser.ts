import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleResponseError, patchRequest } from "../requests";
import { PatchCustodianUserPayload, PatchCustodianUserResponse } from "./types";

export default async (
  userId: number,
  payload: PatchCustodianUserPayload,
  messages: ResponseTranslations
): Promise<ResponseJson<PatchCustodianUserResponse>> => {
  const response = await patchRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_users/${userId}`,
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
