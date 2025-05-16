import { ResponseJson, ResponseOptions } from "../../types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PutAffiliationsResponse, AffiliationStatus } from "./types";

export default async (
  registryId: number,
  affiliationId: number,
  status: AffiliationStatus,
  options?: ResponseOptions
): Promise<ResponseJson<PutAffiliationsResponse>> => {
  const response = await putRequest(
    `/affiliations/${registryId}/affiliation/${affiliationId}?status=${status}`
  );

  return handleJsonResponse(response, options);
};
