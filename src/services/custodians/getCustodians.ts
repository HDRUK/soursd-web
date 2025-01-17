import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { GetCustodiansResponse } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodiansResponse>>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians`,
    undefined
  );

  return handleJsonResponse(response, options);
};
