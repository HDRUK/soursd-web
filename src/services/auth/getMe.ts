import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { MeResponse } from "./types";

export default async (
  messages?: ResponseTranslations
): Promise<ResponseJson<MeResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
