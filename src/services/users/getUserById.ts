import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { UserResponse } from "./types";

export default async (
  id: string,
  options?: ResponseOptions
): Promise<ResponseJson<Partial<UserResponse>>> => {
  const response = await getRequest(`/users/identifier?digi_ident=${id}`);

  return handleJsonResponse(response, options);
};
