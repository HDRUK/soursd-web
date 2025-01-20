import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { PostTrainingsPayload, PostTrainingsResponse } from "./types";

export default async (
  id: number,
  payload: PostTrainingsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostTrainingsResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/training`,
    {
      ...payload,
      registry_id: id,
    },
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, options);
};
