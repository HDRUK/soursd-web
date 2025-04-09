import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodiansUserProjectsResponse } from "./types";
import { SearchParams } from "@/types/query";
import { getSearchQuerystring } from "@/utils/query";

export default async function getCustodiansUserProjects(
  custodianId: number,
  userId: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodiansUserProjectsResponse>>> {
  const response = await getRequest(
    `/custodians/${custodianId}/users/${userId}/projects${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
}
