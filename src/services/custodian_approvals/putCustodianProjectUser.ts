import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import {
  ChangeValidationStatusPayload,
  GetCustodianProjectUserResponse,
} from "./types";

export default async (
  custodianId: number,
  projectUserId: number,
  payload: ChangeValidationStatusPayload,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodianProjectUserResponse>> => {
  const response = await putRequest(
    `/custodian_approvals/${custodianId}/projectUsers/${projectUserId}`,
    payload
  );
  return handleJsonResponse(response, options);
};
