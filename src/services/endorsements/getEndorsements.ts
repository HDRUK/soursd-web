import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { EndorsementsResponse } from "./types";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<EndorsementsResponse>> => {
  const response = await getRequest(`/endorsements/${id}`, undefined);

  return handleJsonResponse(response, options);
};
