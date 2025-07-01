import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { OrganisationResponse, PatchOrganisationPayload } from "./types";

export default async (
  id: number,
  payload: PatchOrganisationPayload,
  options: ResponseOptions
): Promise<ResponseJson<OrganisationResponse>> => {
  console.log("here2", payload);
  const response = await putRequest(`/organisations/${id}`, payload);

  return handleJsonResponse(response, options);
};
