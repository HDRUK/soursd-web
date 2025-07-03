import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodianProjectOrganisationResponse } from "./types";

export default async (
  custodianId: number,
  projectOrganisationId: number,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodianProjectOrganisationResponse>> => {
  const response = await getRequest(
    `/custodian_approvals/${custodianId}/projectOrganisations/${projectOrganisationId}`
  );
  return handleJsonResponse(response, options);
};
