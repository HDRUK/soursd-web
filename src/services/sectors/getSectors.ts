import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { SectorsResponse } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<Paged<SectorsResponse>>> => {
  const response = await getRequest(`/sectors`);

  return handleJsonResponse(response, options);
};
