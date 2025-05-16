import { ResponseJson, ResponseOptions } from "../../types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodianResponse } from "./types";

export default async (
  id: string | number,
  options: ResponseOptions
): Promise<ResponseJson<GetCustodianResponse>> => {
  const response = await getRequest(`/custodians/${id}`);

  return handleJsonResponse(response, options);
};
