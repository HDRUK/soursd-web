import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { EducationsResponse } from "./types";

export default async (
  id: number,
  messages: ResponseTranslations
): Promise<ResponseJson<EducationsResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/educations/${id}`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
