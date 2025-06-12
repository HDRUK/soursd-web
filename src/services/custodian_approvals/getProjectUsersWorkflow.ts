import { ResponseJson, ResponseOptions } from "../../types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { WorkflowResponse } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<WorkflowResponse>> => {
  const response = await getRequest(`/custodian_approvals/workflow`);

  return handleJsonResponse(response, options);
};
