import { ResponseJson, ResponseOptions } from "@/types/requests";
import { Comment } from "@/types/logs";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostValidationLogCommentPayload } from "./types";

export default async (
  payload: PostValidationLogCommentPayload,
  options?: ResponseOptions
): Promise<ResponseJson<Comment>> => {
  const response = await postRequest(`/validation_log_comments`, payload);
  return handleJsonResponse(response, options);
};
