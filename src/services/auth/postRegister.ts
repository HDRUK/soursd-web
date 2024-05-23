import { ResponseTranslations } from "@/types/requests";
import { handleResponseError, postRequest } from "../requests";
import { RegisterPayload } from "./types";

export default async (
  payload: RegisterPayload,
  messages: ResponseTranslations
) => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    payload
  );

  const error = handleResponseError(response, messages);

  if (error) return Promise.reject(error);

  return response.data;
};
