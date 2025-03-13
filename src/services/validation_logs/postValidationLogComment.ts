import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { Comment } from "@/types/logs";
import { PostValidationLogCommentPayload } from "./types";

export default async (
  payload: PostValidationLogCommentPayload,
  options?: ResponseOptions
): Promise<ResponseJson<Comment>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/validation_log_comments`,
    payload
  );
  return handleJsonResponse(response, options);
};
