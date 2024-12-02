import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { PostRegisterPayload, LoginResponse } from "./types";

export default async (
  { account_type }: PostRegisterPayload,
  messages: ResponseTranslations
): Promise<ResponseJson<LoginResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      account_type,
    },
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
