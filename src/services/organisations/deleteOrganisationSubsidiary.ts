import { ResponseJson, ResponseOptions } from "@/types/requests";
import { deleteRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  id: number,
  subsidaryId: number,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(
    `/organisations/${id}/subsidiaries/${subsidaryId}`
  );

  return handleJsonResponse(response, options);
};
