import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleJsonResponse, patchRequest } from "../requests";
import { PatchCustodianPayload, PatchCustodianResponse } from "./types";

export default async (
  id: number,
  payload: PatchCustodianPayload,
  messages: ResponseTranslations
): Promise<ResponseJson<PatchCustodianResponse>> => {
  const response = await patchRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians/${id}`,
    payload,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
