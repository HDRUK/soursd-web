import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PutCustodianUserPayload, PutCustodianUserResponse } from "./types";

export default async (
  userId: number,
  payload: PutCustodianUserPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutCustodianUserResponse>> => {
  const response = await putRequest(`/custodian_users/${userId}`, payload);

  return handleJsonResponse(response, options);
};
