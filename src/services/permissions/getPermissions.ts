import { Paged, ResponseJson, ResponseOptions } from "../../types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PermissionsResponse } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<Paged<PermissionsResponse>>> => {
  const response = await getRequest(`/permissions`);

  return handleJsonResponse(response, options);
};
