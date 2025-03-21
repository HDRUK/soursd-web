import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { WebhookEventTriggers } from "./types";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<WebhookEventTriggers[]>> => {
  const response = await getRequest(`/webhooks/event-triggers`);

  return handleJsonResponse(response, options);
};
