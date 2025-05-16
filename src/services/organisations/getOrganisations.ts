import { getSearchQuerystring } from "@/utils/query";
import { SearchParams } from "../../types/query";
import { Paged, ResponseJson, ResponseOptions } from "../../types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { OrganisationsResponse } from "./types";

export default async (
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<OrganisationsResponse>>> => {
  const response = await getRequest(
    `/organisations${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
