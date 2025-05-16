import { ResponseJson, ResponseOptions } from "../../types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostTrainingsPayload, PostTrainingsResponse } from "./types";

export default async (
  id: number,
  payload: PostTrainingsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostTrainingsResponse>> => {
  const response = await postRequest(
    `/training`,
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
