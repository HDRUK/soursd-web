import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse, handleResponseError } from "../requestHelpers";
import { PostEmploymentsResponse, PostEmploymentsPayload } from "./types";

export default async (
  registryId: number,
  payload: PostEmploymentsPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostEmploymentsResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/employments/${registryId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
