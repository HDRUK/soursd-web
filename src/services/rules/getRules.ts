import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { Rules } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<Rules[]>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/rules`
  );

  return handleJsonResponse(response, options);
};
