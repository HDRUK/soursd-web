import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ValidationCheck, PutValidationCheck } from "./types";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  id: number,
  payload: PutValidationCheck,
  options?: ResponseOptions
): Promise<ResponseJson<ValidationCheck>> => {
  const response = await putRequest(`/validation_checks/${id}`, payload);
  return handleJsonResponse(response, options);
};
