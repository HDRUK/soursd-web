import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { getRequest, handleResponseError } from "../requests";
import { IssuerInviteResponse } from "./types";

export default async (
  inviteCode: string,
  messages: ResponseTranslations
): Promise<ResponseJson<IssuerInviteResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/issuers/identifier/${inviteCode}`,
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
