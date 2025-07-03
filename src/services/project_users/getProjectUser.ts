import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ProjectUser } from "@/types/application";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<ProjectUser>> => {
  const response = await getRequest(`/project_users/${id}`);

  return handleJsonResponse(response, options);
};
