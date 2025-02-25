import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { Webhook } from "./types";

export default async (
  custodianId: number,
  options?: ResponseOptions
): Promise<ResponseJson<Webhook[]>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/webhooks/receivers/${custodianId}`
  );

  return handleJsonResponse(response, options);
};
