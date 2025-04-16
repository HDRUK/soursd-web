import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodiansUsersResponse } from "./types";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodiansUsersResponse>>> => {
  const response = await getRequest(`/custodian_users`);

  return handleJsonResponse(response, options);
};
