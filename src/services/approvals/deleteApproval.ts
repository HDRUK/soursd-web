import { EntityType } from "@/types/api";
import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleJsonResponse, deleteRequest } from "../requests";
import { DeleteApprovalPayload } from "./types";

export default async (
  payload: DeleteApprovalPayload,
  entityType: EntityType,
  messages: ResponseTranslations
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/approvals/${entityType}/${payload.user_id}/issuer/${payload.issuer_id}`
  );

  return handleJsonResponse(response, messages);
};
