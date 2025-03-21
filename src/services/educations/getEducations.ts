import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { EducationsResponse } from "./types";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<EducationsResponse>> => {
  const response = await getRequest(`/educations/${id}`);

  return handleJsonResponse(response, options);
};
