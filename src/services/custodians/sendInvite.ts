import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
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
    payload
  );

  return handleJsonResponse(response, options);
};
