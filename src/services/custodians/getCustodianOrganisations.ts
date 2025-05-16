import { SearchParams } from "../../types/query";
import { Paged, ResponseJson, ResponseOptions } from "../../types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { GetCustodianOrganisationsResponse } from "./types";

export default async function getCustodianOrganisations(
  custodianId: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodianOrganisationsResponse>>> {
  const response = await getRequest(
    `/custodians/${custodianId}/organisations${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
}
