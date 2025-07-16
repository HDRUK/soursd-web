import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostSubsidiaryResponse, PostSubsidiaryPayload } from "./types";

export default async (
  orgId: number,
  payload: PostSubsidiaryPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostSubsidiaryResponse>> => {
  const response = await postRequest(
    `/subsidiaries/organisations/${orgId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
