import { ResponseTranslations } from "@/types/requests";
import { handleResponseError, postRequest } from "../requests";
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

  const error = handleResponseError(response, messages);

  if (error) return Promise.reject(error);

  return response.json();
};
