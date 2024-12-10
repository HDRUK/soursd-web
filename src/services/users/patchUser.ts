import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleResponseError, patchRequest } from "../requests";
import { PatchUserPayload, PatchUserResponse } from "./types";

export default async (
  id: number,
  payload: PatchUserPayload,
  messages: ResponseTranslations
): Promise<ResponseJson<PatchUserResponse>> => {
  const response = await patchRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/users/${id}`,
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
