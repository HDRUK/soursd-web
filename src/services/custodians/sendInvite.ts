import { ResponseJson, ResponseOptions } from "../../types/requests";
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
  const response = await postRequest(`/trigger_email`, payload);

  return handleJsonResponse(response, options);
};
