import { ResponseTranslations } from "@/types/requests";
import { handleResponseError, postRequest } from "../requests";
import { LoginPayload } from "./types";

export default async (
  { email, password }: LoginPayload,
  messages: ResponseTranslations
) => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      email,
      password,
    }
  );

  const error = handleResponseError(response, messages);

  if (error) return Promise.reject(error);

  return response.data.response;
};
