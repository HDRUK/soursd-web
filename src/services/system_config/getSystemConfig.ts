import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest, handleJsonResponse } from "../requests";
import { GetSystemConfigResponse } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<GetSystemConfigResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/system_config`
  );

  return handleJsonResponse(response, options);
};
