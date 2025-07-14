import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import {
  PutSubsidiaryResponse,
  PutOrganisationSubsidiaryPayload,
} from "./types";

export default async (
  id: number,
  subsidaryId: number,
  payload: PutOrganisationSubsidiaryPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutSubsidiaryResponse>> => {
  const response = await putRequest(
    `/organisations/${id}/subsidiaries/${subsidaryId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
