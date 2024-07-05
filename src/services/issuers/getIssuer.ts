import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { getRequest, handleResponseError } from "../requests";
import { IssuerResponse } from "./types";

export default async (
  id: string | number,
  messages: ResponseTranslations
): Promise<ResponseJson<IssuerResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/issuers/${id}`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  const error = handleResponseError(response, messages);

  if (error) return Promise.reject(error);

  return response.json();
};
