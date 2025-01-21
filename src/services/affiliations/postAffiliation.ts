import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { PostAffiliationPayload, PostAffiliationsResponse } from "./types";

export default async (
  registry_id: number,
  payload: PostAffiliationPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostAffiliationsResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/affiliations`,
    {
      ...payload,
      registry_id,
    }
  );

  return handleJsonResponse(response, options);
};
