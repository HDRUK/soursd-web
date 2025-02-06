import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { ProjectsResponse } from "./types";

export type ProjectEntities = "organisation" | "custodian";

export default async (
  entity: ProjectEntities,
  id: string | number | undefined,
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<ProjectsResponse>>> => {
  const params = new URLSearchParams(
    Object.entries(searchParams)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  );

  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/${entity}s/${id}/projects?${params.toString()}`
  );

  return handleJsonResponse(response, options);
};
