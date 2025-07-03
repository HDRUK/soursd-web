import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ProjectOrganisation } from "@/types/application";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<ProjectOrganisation>> => {
  const response = await getRequest(`/project_organisations/${id}`);

  return handleJsonResponse(response, options);
};
