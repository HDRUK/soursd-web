import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { UserHistory } from "./types";

export default async (
  id: string | number,
  options?: ResponseOptions
): Promise<ResponseJson<UserHistory[]>> => {
  const response = await getRequest(`/users/${id}/history`);

  return handleJsonResponse(response, options);
};
