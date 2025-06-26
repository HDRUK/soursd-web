import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { SearchParams } from "@/types/query";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodianProjectOrganisationsResponse } from "./types";

export default async (
  id: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodianProjectOrganisationsResponse>>> => {
  const response = await getRequest(
    `/custodian_approvals/${id}/projectOrganisations${getSearchQuerystring(searchParams)}`
  );
  return handleJsonResponse(response, options);
};
