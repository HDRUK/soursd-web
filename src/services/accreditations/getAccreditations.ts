import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { AccreditationsResponse } from "./types";

export default async (
  resgitryId: number,
  options: ResponseOptions
): Promise<ResponseJson<Paged<AccreditationsResponse>>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/accreditations/${resgitryId}`
  );

  return handleJsonResponse(response, options);
};
