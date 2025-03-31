import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { postRequest } from "../requests";
import { PostProjectUsersPayload, PostProjectUsersResponse } from "./types";

export default async (
  id: number,
  payload: PostProjectUsersPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostProjectUsersResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/${id}/all_users`,
    payload
  );

  return handleJsonResponse(response, options);
};
