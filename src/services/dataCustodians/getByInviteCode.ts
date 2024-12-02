import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { GetIssuerInviteResponse } from "./types";

export default async (
  inviteCode: string,
  messages: ResponseTranslations
): Promise<ResponseJson<GetIssuerInviteResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/issuers/identifier/${inviteCode}`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
