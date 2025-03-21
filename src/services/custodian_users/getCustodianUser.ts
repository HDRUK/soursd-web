import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodianUserResponse } from "./types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodianUserResponse>> => {
  const response = await getRequest(`/custodian_users/${id}`);

  return handleJsonResponse(response, options);
};
