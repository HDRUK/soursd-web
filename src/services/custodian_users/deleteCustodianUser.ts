import { ResponseJson, ResponseOptions } from "@/types/requests";
import { deleteRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

import { GetCustodiansUsersResponse } from "./types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodiansUsersResponse>> => {
  const response = await deleteRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_users/${id}`
  );

  return handleJsonResponse(response, options);
};
