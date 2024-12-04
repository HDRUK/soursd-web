import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { ProjectUsersResponse } from "./types";

export default async (
  projectId: number,
  messages: ResponseTranslations
): Promise<ResponseJson<ProjectUsersResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/${projectId}/users`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
