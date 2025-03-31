import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { putRequest } from "../requests";
import { PutProjectUsersPayload, PostProjectUsersResponse } from "./types";

export default async (
  id: number,
  payload: PutProjectUsersPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostProjectUsersResponse>> => {
  const response = await putRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/${id}/all_users`,
    payload
  );

  return handleJsonResponse(response, options);
};
