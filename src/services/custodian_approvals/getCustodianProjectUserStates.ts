import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { WorkflowStateResponse } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<WorkflowStateResponse>> => {
  const url = `/custodian_approvals/projectUsers/workflowStates`;
  const response = await getRequest(url);
  return handleJsonResponse(response, options);
};
