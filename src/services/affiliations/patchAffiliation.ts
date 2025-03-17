import { ResponseJson, ResponseOptions } from "@/types/requests";
import { patchRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PatchAffiliationsPayload, PatchAffiliationsResponse } from "./types";

export default async (
  registryId: number,
  payload: PatchAffiliationsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PatchAffiliationsResponse>> => {
  const response = await patchRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/affiliations/${registryId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
