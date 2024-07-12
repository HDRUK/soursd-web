import { EntityType } from "@/types/api";
import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { PostApprovalsPayload } from "./types";

export default async (
  payload: PostApprovalsPayload,
  entityType: EntityType,
  messages: ResponseTranslations
): Promise<ResponseJson<boolean>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/approvals/${entityType}`,
    payload,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
