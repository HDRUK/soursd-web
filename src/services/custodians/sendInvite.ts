import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import {
  SendCustodianInvitePayload,
  SendCustodianInviteResponse,
} from "./types";

export default async (
  payload: SendCustodianInvitePayload,
  options: ResponseOptions
): Promise<ResponseJson<SendCustodianInviteResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/trigger_email`,
    payload,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, options);
};
