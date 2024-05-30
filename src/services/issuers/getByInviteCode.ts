import { ResponseTranslations } from "@/types/requests";
import { getRequest, handleResponseError } from "../requests";
import { IssuerInviteResponse } from "./types";

export default async (
  inviteCode: string,
  messages: ResponseTranslations
): Promise<IssuerInviteResponse> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/issuers/identifier/${inviteCode}`
  );

  const error = handleResponseError(response, messages);

  if (error) return Promise.reject(error);

  return response.data;
};
