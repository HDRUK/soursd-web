import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PutProjectDetailsPayload, PutProjectDetailsResponse } from "./types";

export default async (
  payload: PutProjectDetailsPayload,
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<PutProjectDetailsResponse>> => {
  const response = await putRequest(`/project_details/${id}`, payload);

  return handleJsonResponse(response, options);
};
