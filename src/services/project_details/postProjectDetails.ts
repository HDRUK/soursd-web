import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostProjectDetailsPayload, PostProjectDetailsResponse } from "./types";

export default async (
  payload: PostProjectDetailsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostProjectDetailsResponse>> => {
  const response = await postRequest(`/project_details`, payload);

  return handleJsonResponse(response, options);
};
