import { SearchParams } from "@/types/query";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { GetCustodiansUserProjectsResponse } from "./types";

export default async function getCustodiansUserProjects(
  custodianId: number,
  userId: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodiansUserProjectsResponse>>> {
  console.log(
    "Log",
    `/custodians/${custodianId}/users/${userId}/projects${getSearchQuerystring(searchParams)}`
  );
  const response = await getRequest(
    `/custodians/${custodianId}/users/${userId}/projects${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
}
