import { ResponseJson, ResponseOptions } from "../../types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostCustodianInviteResponse } from "./types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<PostCustodianInviteResponse>> => {
  const response = await postRequest(`/custodians/${id}/invite`);

  return handleJsonResponse(response, options);
};
