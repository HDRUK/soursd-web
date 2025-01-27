import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { PostUserUnclaimedPayload } from "./types";

export default async (
  payload: PostUserUnclaimedPayload,
  options: ResponseOptions
): Promise<ResponseJson<number>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/users/unclaimed`,
    payload
  );

  return handleJsonResponse(response, options);
};
