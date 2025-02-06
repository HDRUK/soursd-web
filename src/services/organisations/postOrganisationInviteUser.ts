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
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/${id}/invite_user`,
    payload
  );

  return handleJsonResponse(response, options);
};
