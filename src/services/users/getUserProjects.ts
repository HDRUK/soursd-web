import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { UserProjectsResponse } from "./types";

export default async (
  id: string | number,
  options?: ResponseOptions
): Promise<ResponseJson<UserProjectsResponse>> => {
  const response = await getRequest(`/users/${id}/projects`);

  return handleJsonResponse(response, options);
};
