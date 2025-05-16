import { ResponseJson, ResponseOptions } from "../../types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { OrganisationResponse } from "./types";

export default async (
  id: string | number,
  options: ResponseOptions
): Promise<ResponseJson<OrganisationResponse>> => {
  const response = await getRequest(`/organisations/${id}/idvt`, undefined);

  return handleJsonResponse(response, options);
};
