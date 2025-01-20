import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";

export default async (
  statType: string,
  orgId: number,
  options?: ResponseOptions
): Promise<ResponseJson<string>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/${orgId}/counts/${statType}`,
    undefined
  );

  return handleJsonResponse(response, options);
};
