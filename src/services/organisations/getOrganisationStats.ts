import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  statType: string,
  orgId: number,
  options?: ResponseOptions
): Promise<ResponseJson<string>> => {
  const response = await getRequest(
    `/organisations/${orgId}/counts/${statType}`,
    undefined
  );

  return handleJsonResponse(response, options);
};
