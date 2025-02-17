import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

import { OrganisationsResponse } from "./types";
import { SearchParams } from "@/types/query";
import { getSearchQuerystring } from "@/utils/query";

export default async (
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<OrganisationsResponse>>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
