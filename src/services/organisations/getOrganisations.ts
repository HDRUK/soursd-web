import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { OrganisationsResponse } from "./types";

export default async (
  messages: ResponseTranslations
): Promise<ResponseJson<OrganisationsResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
