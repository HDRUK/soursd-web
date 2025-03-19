import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PutTrainingsPayload, PutTrainingsResponse } from "./types";

export default async (
  id: number,
  payload: PutTrainingsPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutTrainingsResponse>> => {
  const response = await putRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/training/${id}`,
    payload
  );

  return handleJsonResponse(response, options);
};
