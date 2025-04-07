import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodianProjectUserResponse } from "./types";
import { getSearchQuerystring } from "@/utils/query";
import { SearchParams } from "@/types/query";

export type ProjectEntities = "organisation" | "custodian" | "user";

export default async (
  id: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodianProjectUserResponse>>> => {
  const response = await getRequest(`/custodians/${id}/projects_users${getSearchQuerystring(searchParams)}`);

  return handleJsonResponse(response, options);
};
