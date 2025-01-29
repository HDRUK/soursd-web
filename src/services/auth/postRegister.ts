import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { PostRegisterPayload, PostRegisterResponse } from "./types";

export default async (
  payload?: PostRegisterPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostRegisterResponse>> => {
  console.log("PAYLOAD", payload);
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    payload
  );

  return handleJsonResponse(response, options);
};
