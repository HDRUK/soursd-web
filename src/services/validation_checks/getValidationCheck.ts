import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ValidationCheck } from "./types";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  validationCheckId: number,
  options: ResponseOptions
): Promise<ResponseJson<ValidationCheck>> => {
  const response = await getRequest(`/validation_checks/${validationCheckId}`);

  return handleJsonResponse(response, options);
};
