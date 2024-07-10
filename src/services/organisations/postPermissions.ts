import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import {
  UpdateOrganisationPermissionsResponse,
  UpdateOrganisationPermissonsPayload,
} from "./types";

export default async (
  payload: UpdateOrganisationPermissonsPayload,
  messages: ResponseTranslations
): Promise<ResponseJson<UpdateOrganisationPermissionsResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/permissions`,
    payload,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
