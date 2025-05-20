import { ResponseJson, ResponseOptions } from "@/types/requests";
import { SearchParams } from "@/types/query";
import { getSearchQuerystring } from "@/utils/query";
import { ValidationCheck } from "./types";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  custodianId: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<ValidationCheck[]>> => {
  const response = await getRequest(
    `/custodians/${custodianId}/validation_checks${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
