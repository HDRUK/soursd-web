import { ResponseJson, ResponseOptions } from "@/types/requests";
import { patchRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PatchCustodianPayload, PatchCustodianResponse } from "./types";

export default async (
  id: number,
  payload: PatchCustodianPayload,
  options: ResponseOptions
): Promise<ResponseJson<PatchCustodianResponse>> => {
  const response = await patchRequest(`/custodians/${id}`, payload);

  return handleJsonResponse(response, options);
};
