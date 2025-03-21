import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { EmploymentsResponse } from "./types";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<EmploymentsResponse>> => {
  const response = await getRequest(`/employments/${id}`);

  return handleJsonResponse(response, options);
};
