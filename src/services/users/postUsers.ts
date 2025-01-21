import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { PostUserResponse, PostUserPayload } from "./types";

export default async (
  payload: PostUserPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostUserResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/users`,
    payload
  );

  return handleJsonResponse(response, options);
};
