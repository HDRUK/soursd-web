import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { GetAffiliationsResponse } from "./types";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  registryId: number,
  options: ResponseOptions
): Promise<ResponseJson<Paged<GetAffiliationsResponse>>> => {
  const response = await getRequest(`/affiliations/${registryId}`);

  return handleJsonResponse(response, options);
};
