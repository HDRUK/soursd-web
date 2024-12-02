import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleJsonResponse, patchRequest } from "../requests";
import { PatchIssuerPayload, PatchIssuerResponse } from "./types";

export default async (
  id: number,
  payload: PatchIssuerPayload,
  messages: ResponseTranslations
): Promise<ResponseJson<PatchIssuerResponse>> => {
  const response = await patchRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/issuers/${id}`,
    payload,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
