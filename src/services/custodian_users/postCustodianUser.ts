import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostCustodianUserPayload, PostCustodianUserResponse } from "./types";

export default async (
  payload: PostCustodianUserPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostCustodianUserResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_users`,
    payload
  );

  return handleJsonResponse(response, options);
};
