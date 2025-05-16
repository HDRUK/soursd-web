import { Paged, ResponseJson, ResponseOptions } from "../../types/requests";
import { SearchParams } from "../../types/query";
import { getSearchQuerystring } from "@/utils/query";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { UserProjectsResponse } from "./types";

export default async (
  id: string | number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<UserProjectsResponse>>> => {
  const response = await getRequest(
    `/users/${id}/projects${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
