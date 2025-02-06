import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetCustodianResponse } from "./types";

export default async (
  id: string | number,
  options: ResponseOptions
): Promise<ResponseJson<GetCustodianResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians/${id}`
  );

  return handleJsonResponse(response, options);
};
