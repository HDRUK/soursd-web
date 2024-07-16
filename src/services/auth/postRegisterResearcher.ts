import { ResponseTranslations } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { PostRegisterResearcherPayload } from "./types";

export default async (
  payload: PostRegisterResearcherPayload,
  messages: ResponseTranslations
) => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register/researcher`,
    { ...payload, is_researcher: true },
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
