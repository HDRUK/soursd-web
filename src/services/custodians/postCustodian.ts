import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostCustodianPayload, PostCustodianResponse } from "./types";

export default async (
  payload: PostCustodianPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostCustodianResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians`,
    payload
  );

  return handleJsonResponse(response, options);
};
