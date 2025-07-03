import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { SearchParams } from "@/types/query";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodianProjectUsersResponse } from "./types";

export default async (
  id: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodianProjectUsersResponse>>> => {
  const response = await getRequest(
    `/custodian_approvals/${id}/projectUsers${getSearchQuerystring(searchParams)}`
  );
  return handleJsonResponse(response, options);
};
