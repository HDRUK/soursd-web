import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodianProjectUserResponse } from "./types";

export default async (
  custodianId: number,
  projectUserId: number,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodianProjectUserResponse>> => {
  const response = await getRequest(
    `/custodian_approvals/${custodianId}/projectUsers/${projectUserId}`
  );
  return handleJsonResponse(response, options);
};
