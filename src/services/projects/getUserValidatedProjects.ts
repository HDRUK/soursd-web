import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { ProjectsResponse } from "./types";

export default async (
  registryId: number | string,
  options: ResponseOptions
): Promise<ResponseJson<ProjectsResponse>> => {
  const response = await getRequest(`/projects/user/${registryId}/validated`);

  return handleJsonResponse(response, options);
};
