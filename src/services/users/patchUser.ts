import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { updateAuthUser } from "@/utils/auth";
import { handleResponseError, patchRequest } from "../requests";
import { UpdateUserPayload, UpdateUserResponse } from "./types";

export default async (
  id: number,
  payload: UpdateUserPayload,
  messages: ResponseTranslations
): Promise<ResponseJson<UpdateUserResponse>> => {
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

  await updateAuthUser(payload);

  return response.json();
};
