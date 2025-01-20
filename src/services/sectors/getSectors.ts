import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { SectorsResponse } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<Paged<SectorsResponse>>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/sectors`
  );

  return handleJsonResponse(response, options);
};
