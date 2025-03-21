import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { UserResponse } from "./types";

export default async (
  id: string | number,
  options?: ResponseOptions
): Promise<ResponseJson<UserResponse>> => {
  const response = await getRequest(`/users/${id}`);

  return handleJsonResponse(response, options);
};
