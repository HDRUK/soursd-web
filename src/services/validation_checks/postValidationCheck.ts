import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ValidationCheck, PostValidationCheck } from "./types";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  custodianId: number,
  payload: PostValidationCheck,
  options?: ResponseOptions
): Promise<ResponseJson<ValidationCheck>> => {
  const response = await postRequest(
    `/custodians/${custodianId}/validation_checks`,
    payload
  );
  return handleJsonResponse(response, options);
};
