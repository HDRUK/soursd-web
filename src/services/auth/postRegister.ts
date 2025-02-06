import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostRegisterPayload, PostRegisterResponse } from "./types";

export default async (
  payload?: PostRegisterPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostRegisterResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    payload
  );

  return handleJsonResponse(response, options);
};
