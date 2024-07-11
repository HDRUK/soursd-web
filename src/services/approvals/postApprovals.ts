import { EntityType } from "@/types/api";
import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleResponseError, postRequest } from "../requests";
import { PostApprovalsPayload } from "./types";

export default async (
  payload: PostApprovalsPayload,
  entityType: EntityType,
  messages: ResponseTranslations
): Promise<ResponseJson<any>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/approvals/${entityType}`,
    payload
  );

  const error = handleResponseError(response, messages);

  if (error) return Promise.reject(error);

  const data = await response.json();

  return data;
};
