import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { CustodianProjectUsersResponse } from "./types";

export default async (
  custodianId: number,
  projectId: number,
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<CustodianProjectUsersResponse>>> => {
  const response = await getRequest(
    `/custodians/${custodianId}/projects/${projectId}/users${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
