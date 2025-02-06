import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostAffiliationPayload, PostAffiliationsResponse } from "./types";

export default async (
  registryId: number,
  payload: PostAffiliationPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostAffiliationsResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/affiliations/${registryId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
