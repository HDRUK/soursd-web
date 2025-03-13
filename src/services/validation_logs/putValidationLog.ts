import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { ValidationLog } from "@/types/logs";
import { ValidationLogAction } from "./types";

export default async (
  logId: number,
  action: ValidationLogAction,
  options?: ResponseOptions
): Promise<ResponseJson<ValidationLog>> => {
  const response = await putRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/validation_logs/${logId}?${action}`
  );
  return handleJsonResponse(response, options);
};
