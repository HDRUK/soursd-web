import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PutCustodianPayload, PutCustodianResponse } from "./types";

export default async (
  id: number,
  payload: PutCustodianPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutCustodianResponse>> => {
  const response = await putRequest(`/custodians/${id}`, payload);

  return handleJsonResponse(response, options);
};
