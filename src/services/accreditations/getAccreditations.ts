import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { AccreditationsResponse } from "./types";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<Paged<AccreditationsResponse>>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/accreditations/${id}`
  );

  return handleJsonResponse(response, options);
};
