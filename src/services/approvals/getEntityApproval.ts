import { EntityType } from "@/types/api";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  entityType: EntityType,
  id: string | number,
  custodianId: string | number,
  options: ResponseOptions
): Promise<ResponseJson<boolean>> => {
  const response = await getRequest(
    `/approvals/${entityType}/${id}/custodian/${custodianId}`
  );

  return handleJsonResponse(response, options);
};
