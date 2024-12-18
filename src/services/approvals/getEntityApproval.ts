import { EntityType } from "@/types/api";
import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleJsonResponse, getRequest } from "../requests";

export default async (
  entityType: EntityType,
  id: string | number,
  custodianId: string | number,
  messages: ResponseTranslations
): Promise<ResponseJson<boolean>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/approvals/${entityType}/${id}/custodian/${custodianId}`,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, messages);
};
