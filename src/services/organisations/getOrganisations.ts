import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

import { OrganisationsResponse } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<Paged<OrganisationsResponse>>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations`,
    undefined
  );

  return handleJsonResponse(response, options);
};
