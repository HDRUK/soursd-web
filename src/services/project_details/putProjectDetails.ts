import { ResponseJson, ResponseOptions } from "../../types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { putRequest } from "../requests";
import { PutProjectDetailsPayload, PutProjectDetailsResponse } from "./types";

export default async (
  id: number,
  payload: PutProjectDetailsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PutProjectDetailsResponse>> => {
  const response = await putRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/project_details/${id}`,
    payload
  );

  return handleJsonResponse(response, options);
};
