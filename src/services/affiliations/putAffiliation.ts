import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PutAffiliationsPayload, PutAffiliationsResponse } from "./types";

export default async (
  affiliationId: number,
  payload: PutAffiliationsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PutAffiliationsResponse>> => {
  const response = await putRequest(`/affiliations/${affiliationId}`, payload);

  return handleJsonResponse(response, options);
};
