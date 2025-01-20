import { EMAIL_TEMPLATE } from "@/consts/application";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
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
    {
      ...payload,
      identifier: EMAIL_TEMPLATE.USER_INVITE,
    }
  );

  return handleJsonResponse(response, options);
};
