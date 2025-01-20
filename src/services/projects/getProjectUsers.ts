import { ResponseJson, ResponseOptions, Paged } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { ProjectUsersResponse } from "./types";

export default async (
  projectId: number,
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<ProjectUsersResponse>>> => {
  const params = new URLSearchParams(
    Object.entries(searchParams)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  );

  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/${projectId}/users?${params.toString()}`
  );

  return handleJsonResponse(response, options);
};
