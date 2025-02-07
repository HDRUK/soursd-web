import { EntityType } from "@/types/api";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { deleteRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { DeleteApprovalPayload } from "./types";

export default async (
  payload: DeleteApprovalPayload,
  entityType: EntityType,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/approvals/${entityType}/${payload.user_id}/custodian/${payload.custodian_id}`
  );

  return handleJsonResponse(response, options);
};
