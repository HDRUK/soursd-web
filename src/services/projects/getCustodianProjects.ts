import { Paged, ResponseJson, ResponseTranslations } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { ProjectsResponse } from "./types";

export default async (
  custodianId: number,
  page: number,
  messages: ResponseTranslations
): Promise<ResponseJson<Paged<ProjectsResponse>>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians/${custodianId}/projects?page=${page}`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
