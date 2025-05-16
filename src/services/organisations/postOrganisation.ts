import { ResponseJson, ResponseOptions } from "../../types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostOrganisationPayload, PostOrganisationResponse } from "./types";

export default async (
  payload: PostOrganisationPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostOrganisationResponse>> => {
  const response = await postRequest(`/organisations`, payload);

  return handleJsonResponse(response, options);
};
