import { ResponseJson, ResponseOptions } from "../../types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { TrainingsResponse } from "./types";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<TrainingsResponse>> => {
  const response = await getRequest(`/training/registry/${id}`);

  return handleJsonResponse(response, options);
};
