import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { SearchParams } from "@/types/query";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodianProjectUserResponse } from "../custodian_approvals";

export type ProjectEntities = "organisation" | "custodian" | "user";

export default async (
  custodianId: number,
  organisationId: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodianProjectUserResponse>>> => {
  const response = await getRequest(
    `/custodians/${custodianId}/organisations/${organisationId}/users${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
