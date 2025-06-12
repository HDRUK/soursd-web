import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<any>> => {
  const response = await getRequest(`/project_users/${id}`);

  return handleJsonResponse(response, options);
};
