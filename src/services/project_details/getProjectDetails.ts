import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { ProjectDetailsResponse } from "./types";

export default async (
  id: number | string,
  options: ResponseOptions
): Promise<ResponseJson<ProjectDetailsResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/project_details/${id}`
  );

  return handleJsonResponse(response, options);
};
