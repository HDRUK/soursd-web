import { EntityType } from "@/types/api";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { PostApprovalPayload } from "./types";

export default async (
  payload: PostApprovalPayload,
  entityType: EntityType,
  options: ResponseOptions
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

  return handleJsonResponse(response, options);
};
