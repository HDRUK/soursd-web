import { ResponseJson, ResponseOptions } from "../../types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostOrganisationInviteResponse } from "./types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<PostOrganisationInviteResponse>> => {
  const response = await postRequest(`/organisations/${id}/invite`);

  return handleJsonResponse(response, options);
};
