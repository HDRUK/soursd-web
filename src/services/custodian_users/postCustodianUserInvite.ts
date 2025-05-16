import { ResponseJson, ResponseOptions } from "../../types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostCustodianUserResponse } from "./types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<PostCustodianUserResponse>> => {
  const response = await postRequest(`/custodian_users/invite/${id}`);

  return handleJsonResponse(response, options);
};
