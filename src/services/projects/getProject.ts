import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { ProjectResponse } from "./types";

export default async (
  id: number | string,
  options: ResponseOptions
): Promise<ResponseJson<ProjectResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/${id}`
  );

  return handleJsonResponse(response, options);
};
