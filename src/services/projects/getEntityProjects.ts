import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { SearchParams } from "@/types/query";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { ProjectsResponse } from "./types";

export type ProjectEntities = "organisation" | "custodian" | "user";

export default async (
  entity: ProjectEntities,
  id: string | number | undefined,
  searchParams: SearchParams,
  options: ResponseOptions
): Promise<ResponseJson<Paged<ProjectsResponse>>> => {
  const response = await getRequest(
    `/${entity}s/${id}/projects${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
