import { ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { putRequest } from "../requests";

export default async (
  requestId: number,
  status: number,
  options: ResponseOptions
) => {
  const response = await putRequest(`/request_access/${requestId}`, {
    status,
  });

  return handleJsonResponse(response, options);
};
