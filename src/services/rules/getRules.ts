import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { RulesResponse } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<RulesResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/rules`
  );

  return handleJsonResponse(response, options);
};
