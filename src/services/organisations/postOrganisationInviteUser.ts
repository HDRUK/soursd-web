import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import {
  PostOrganisationInviteUserPayload,
  PostOrganisationInviteUserResponse,
} from "./types";

export default async (
  id: number,
  payload: PostOrganisationInviteUserPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostOrganisationInviteUserResponse>> => {
  const response = await postRequest(
    `/organisatddions/${id}/invite_user`,
    payload
  );

  return handleJsonResponse(response, options);
};
