import { ResponseJson, ResponseOptions } from "../../types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostUserResponse, PostUserPayload } from "./types";

export default async (
  payload: PostUserPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostUserResponse>> => {
  const response = await postRequest(`/users`, payload);

  return handleJsonResponse(response, options);
};
