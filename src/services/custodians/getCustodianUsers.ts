import { SearchParams } from "@/types/query";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { GetCustodianUsersResponse } from "./types";

export default async (
  custodianId: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodianUsersResponse>>> => {
  const response = await getRequest(
    `/custodians/${custodianId}/custodian_users${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
