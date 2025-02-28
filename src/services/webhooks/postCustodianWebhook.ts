import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostCustodianWebhookPayload, Webhook } from "./types";

export default async (
  payload: PostCustodianWebhookPayload,
  options: ResponseOptions
): Promise<ResponseJson<Webhook>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/webhooks/receivers`,
    payload
  );

  return handleJsonResponse(response, options);
};
