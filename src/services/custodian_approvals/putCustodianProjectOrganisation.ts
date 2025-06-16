import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import {
  ChangeValidationStatusPayload,
  GetCustodianProjectUserResponse,
} from "./types";

export default async (
  custodianId: number,
  projectOrganisationId: number,
  payload: ChangeValidationStatusPayload,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodianProjectUserResponse>> => {
  const response = await putRequest(
    `/custodian_approvals/${custodianId}/projectOrganisations/${projectOrganisationId}`,
    payload
  );
  return handleJsonResponse(response, options);
};
