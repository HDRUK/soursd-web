import { EntityType } from "@/types/api";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse, getRequest } from "../requests";

export default async (
  entityType: EntityType,
  id: string | number,
  custodianId: string | number,
  options: ResponseOptions
): Promise<ResponseJson<boolean>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/approvals/${entityType}/${id}/custodian/${custodianId}`
  );

  return handleJsonResponse(response, options);
};
