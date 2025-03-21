import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostCustodianUserPayload, PostCustodianUserResponse } from "./types";

export default async (
  payload: PostCustodianUserPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostCustodianUserResponse>> => {
  const response = await postRequest(`/custodian_users`, payload);

  return handleJsonResponse(response, options);
};
