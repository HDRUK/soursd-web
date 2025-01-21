import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { ProjectsResponse } from "./types";

export default async (
  registryId: number | string,
  options: ResponseOptions
): Promise<ResponseJson<ProjectsResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/user/${registryId}/approved`
  );

  return handleJsonResponse(response, options);
};
