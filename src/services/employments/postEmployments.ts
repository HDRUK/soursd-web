import { ResponseJson, ResponseOptions } from "../../types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { postRequest } from "../requests";
import { PostEmploymentsPayload, PostEmploymentsResponse } from "./types";

export default async (
  registryId: number,
  payload: PostEmploymentsPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostEmploymentsResponse>> => {
  const response = await postRequest(`/employments/${registryId}`, payload);

  return handleJsonResponse(response, options);
};
