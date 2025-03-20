import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { ProjectUsersResponse } from "./types";

export default async (
  projectId: number,
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<ProjectUsersResponse>>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/${projectId}/users/filter${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
