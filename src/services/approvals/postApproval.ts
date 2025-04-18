import { EntityType } from "@/types/api";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostApprovalPayload } from "./types";

export default async (
  payload: PostApprovalPayload,
  entityType: EntityType,
  options: ResponseOptions
): Promise<ResponseJson<boolean>> => {
  const response = await postRequest(`/approvals/${entityType}`, payload);

  return handleJsonResponse(response, options);
};
