import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ResearcherAffiliation } from "@/types/application";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  registryId: number,
  organisationId: number,
  options: ResponseOptions
): Promise<ResponseJson<ResearcherAffiliation>> => {
  const response = await getRequest(
    `/affiliations/${registryId}/organisation/${organisationId}`
  );

  return handleJsonResponse(response, options);
};
