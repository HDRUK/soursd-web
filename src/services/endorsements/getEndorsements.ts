import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { EndorsementsResponse } from "./types";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<EndorsementsResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/endorsements/${id}`,
    undefined
  );

  return handleJsonResponse(response, options);
};
