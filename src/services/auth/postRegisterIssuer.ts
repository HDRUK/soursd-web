import { ResponseTranslations } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { RegisterPayload } from "./types";

export default async (
  payload: RegisterPayload,
  messages: ResponseTranslations
) => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register/issuer`,
    { ...payload, is_issuer: true },
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
