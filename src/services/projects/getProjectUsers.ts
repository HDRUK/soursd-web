import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { ProjectUsersResponse } from "./types";
import { getSearchQuerystring } from "@/utils/query";

export default async (
  projectId: number,
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<ProjectUsersResponse>>> => {
  console.log("PROJECT ID", projectId);
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/${projectId}/users${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
