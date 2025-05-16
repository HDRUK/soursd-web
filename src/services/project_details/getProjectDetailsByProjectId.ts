import { ResponseJson, ResponseOptions } from "../../types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { ProjectDetailsResponse } from "./types";

export default async (
  id: number | string,
  options: ResponseOptions
): Promise<ResponseJson<ProjectDetailsResponse>> => {
  const response = await getRequest(`/project_details/by-project/${id}`);

  return handleJsonResponse(response, options);
};
