import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleResponseError, postRequest } from "../requests";
import { PostIssuerUserPayload, PostIssuerUserResponse } from "./types";

export default async (
  payload: PostIssuerUserPayload,
  messages: ResponseTranslations
): Promise<ResponseJson<PostIssuerUserResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/issuer_users`,
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
