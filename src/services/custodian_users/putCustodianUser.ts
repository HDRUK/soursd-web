import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PatchCustodianUserPayload, PatchCustodianUserResponse } from "./types";

export default async (
  userId: number,
  payload: PatchCustodianUserPayload,
  options: ResponseOptions
): Promise<ResponseJson<PatchCustodianUserResponse>> => {
  const response = await putRequest(`/custodian_users/${userId}`, payload);

  return handleJsonResponse(response, options);
};
