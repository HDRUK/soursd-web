import { ResponseJson, ResponseOptions } from "../../types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { putRequest } from "../requests";
import { PutProjectPayload, PutProjectResponse } from "./types";

export default async (
  id: number,
  payload: PutProjectPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PutProjectResponse>> => {
  const response = await putRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/${id}`,
    payload
  );

  return handleJsonResponse(response, options);
};
