import { ResponseJson, ResponseOptions } from "../../types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PutTrainingsPayload, PutTrainingsResponse } from "./types";

export default async (
  id: number,
  payload: PutTrainingsPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutTrainingsResponse>> => {
  const response = await putRequest(`/training/${id}`, payload);

  return handleJsonResponse(response, options);
};
