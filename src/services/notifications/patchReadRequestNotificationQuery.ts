import { ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { patchRequest } from "../requests";

export default async (
  requestId: number,
  status: number,
  options: ResponseOptions
) => {
  const response = await patchRequest(`/request_access/${requestId}`, {
    status,
  });

  return handleJsonResponse(response, options);
};
