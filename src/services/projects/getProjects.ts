import { Paged, ResponseJson, ResponseOptions } from "../../types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { ProjectsResponse } from "./types";

export default async (
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<ProjectsResponse>>> => {
  const params = new URLSearchParams(
    Object.entries(searchParams)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  );

  const queryString = params.toString();

  const response = await getRequest(
    `/projects${queryString ? `?${queryString}` : ""}`
  );

  return handleJsonResponse(response, options);
};
