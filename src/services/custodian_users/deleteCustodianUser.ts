import { ResponseJson, ResponseOptions } from "@/types/requests";
import { deleteRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

import { GetCustodiansUsersResponse } from "./types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodiansUsersResponse>> => {
  const response = await deleteRequest(`/custodian_users/${id}`);

  return handleJsonResponse(response, options);
};
