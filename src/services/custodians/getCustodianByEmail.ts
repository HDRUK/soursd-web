import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { getRequest, handleResponseError } from "../requests";
import { GetCustodianResponse } from "./types";

export default async (
  email: string,
  messages: ResponseTranslations
): Promise<ResponseJson<GetCustodianResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians/email/${email}`,
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
