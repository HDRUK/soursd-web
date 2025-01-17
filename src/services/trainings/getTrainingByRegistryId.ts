import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { TrainingsResponse } from "./types";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<TrainingsResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/training/registry/${id}`
  );

  return handleJsonResponse(response, options);
};
