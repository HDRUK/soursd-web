import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PatchAffiliationsPayload, PatchAffiliationsResponse } from "./types";

export default async (
  affiliationId: number,
  payload: PatchAffiliationsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PatchAffiliationsResponse>> => {
  const response = await putRequest(`/affiliations/${affiliationId}`, payload);

  return handleJsonResponse(response, options);
};
