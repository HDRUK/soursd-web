import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { GetProjectRolesResponse } from "./types";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<GetProjectRolesResponse>> => {
  const response = await getRequest(`/project_roles`);

  return handleJsonResponse(response, options);
};
