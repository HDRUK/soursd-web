import { ResponseJson, ResponseOptions } from "../../types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostOrganisationPayload } from "./types";

export default async (
  payload: PostOrganisationPayload,
  options: ResponseOptions
): Promise<ResponseJson<number>> => {
  const response = await postRequest(`/organisations/unclaimed`, payload);

  return handleJsonResponse(response, options);
};
