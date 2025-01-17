import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleResponseError, postRequest } from "../requests";
import { PostEmploymentsResponse, PostEmploymentsPayload } from "./types";

export default async (
  registryId: number,
  payload: PostEmploymentsPayload,
  messages: ResponseTranslations
): Promise<ResponseJson<PostEmploymentsResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/employments/${registryId}`,
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
