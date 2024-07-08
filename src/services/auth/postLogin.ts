import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { LoginPayload, LoginResponse } from "./types";

export default async (
  { email, password }: LoginPayload,
  messages: ResponseTranslations
): Promise<ResponseJson<LoginResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
