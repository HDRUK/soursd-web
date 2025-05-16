import { ResponseJson, ResponseOptions } from "../../types/requests";
import { ValidationLog } from "../../types/logs";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { ValidationLogAction } from "./types";

export default async (
  logId: number,
  action: ValidationLogAction,
  options?: ResponseOptions
): Promise<ResponseJson<ValidationLog>> => {
  const response = await putRequest(`/validation_logs/${logId}?${action}`);
  return handleJsonResponse(response, options);
};
