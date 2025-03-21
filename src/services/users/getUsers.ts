import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { UsersResponse } from "./types";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<Paged<UsersResponse>>> => {
  const response = await getRequest(`/users`);

  return handleJsonResponse(response, options);
};
