import { ResponseJson, ResponseOptions } from "@/types/requests";
import { patchRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PatchAffiliationsPayload, PatchAffiliationsResponse } from "./types";

export default async (
  affiliationId: number,
  payload: PatchAffiliationsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PatchAffiliationsResponse>> => {
  const response = await patchRequest(
    `/affiliations/${affiliationId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
