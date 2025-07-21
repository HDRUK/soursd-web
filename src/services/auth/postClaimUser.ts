import { ResponseJson, ResponseOptions } from "@/types/requests";
import { isServer, postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostClaimUserPayload, PostRegisterResponse } from "./types";

export default async (
  payload?: PostClaimUserPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostRegisterResponse>> => {
  const response = await postRequest(
    `${isServer() ? process.env.NEXT_PUBLIC_API_SERVER_URL : process.env.NEXT_PUBLIC_API_URL}/auth/claimUser`,
    payload
  );

  return handleJsonResponse(response, options);
};
