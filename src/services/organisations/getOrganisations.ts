import { ResponseTranslations } from "@/types/requests";
import { getRequest, handleResponseError } from "../requests";
import { OrganisationsResponse } from "./types";

export default async (
  messages: ResponseTranslations
): Promise<OrganisationsResponse> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations`
  );

  const error = handleResponseError(response, messages);

  if (error) return Promise.reject(error);

  return response.data;
};
