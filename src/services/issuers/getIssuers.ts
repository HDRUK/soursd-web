import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { getRequest, handleJsonResponse, handleResponseError } from "../requests";
import { GetIssuersResponse } from "./types";

export default async (
  messages: ResponseTranslations
): Promise<ResponseJson<GetIssuersResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/issuers`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
