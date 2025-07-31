import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PutSubsidiaryResponse, PutSubsidiaryPayload } from "./types";

export default async (
  subsidaryId: number,
  orgId: number,
  payload: PutSubsidiaryPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutSubsidiaryResponse>> => {
  const response = await putRequest(
    `/subsidiaries/${orgId}/organisations/${subsidaryId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
