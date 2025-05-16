import { ResponseJson, ResponseOptions } from "../../types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { postRequest } from "../requests";
import { PostProjectDetailsPayload, PostProjectDetailsResponse } from "./types";

export default async (
  payload: PostProjectDetailsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostProjectDetailsResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/project_details`,
    payload
  );

  return handleJsonResponse(response, options);
};
