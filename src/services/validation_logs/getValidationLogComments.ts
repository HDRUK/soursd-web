import { ResponseJson, ResponseOptions } from "../../types/requests";
import { Comment } from "../../types/logs";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  validationLogId: number,
  options: ResponseOptions
): Promise<ResponseJson<Comment[]>> => {
  const response = await getRequest(
    `/validation_logs/${validationLogId}/comments`
  );

  return handleJsonResponse(response, options);
};
