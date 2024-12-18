import { EMAIL_TEMPLATE } from "@/consts/application";
import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import {
  PostOrganisationInviteUserPayload,
  PostOrganisationInviteUserResponse,
} from "./types";

export default async (
  id: number,
  payload: PostOrganisationInviteUserPayload,
  messages?: ResponseTranslations
): Promise<ResponseJson<PostOrganisationInviteUserResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/${id}/invite_user`,
    {
      ...payload,
      identifier: EMAIL_TEMPLATE.USER_INVITE,
    },
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
