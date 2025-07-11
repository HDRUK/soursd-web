import { ResponseJson, ResponseOptions } from "@/types/requests";
import { WorkflowTransitions } from "../custodian_approvals";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<WorkflowTransitions>> => {
  const response = await getRequest(`/affiliations/workflowTransitions`);

  return handleJsonResponse(response, options);
};
