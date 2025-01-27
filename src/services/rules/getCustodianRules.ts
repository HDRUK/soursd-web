import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { Rules } from "./types";

export default async (
  id: number | string,
  options: ResponseOptions
): Promise<ResponseJson<Rules[]>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians/${id}/rules`
  );

  return handleJsonResponse(response, options);
};
