import { ResponseJson, ResponseOptions } from "@/types/requests";
import { deleteRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  subsidaryId: number,
  orgId: number,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(
    `/subsidiaries/${subsidaryId}/organisations/${orgId}`
  );

  return handleJsonResponse(response, options);
};
