import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { MeResponse } from "./types";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<MeResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`
  );
  return handleJsonResponse(response, options);
};
