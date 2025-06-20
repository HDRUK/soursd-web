import { ResponseJson, ResponseOptions } from "../../types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { WorkflowTransitionsResponse } from "./types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<WorkflowTransitionsResponse>> => {
  const response = await getRequest(
    `/custodian_approvals/projectUsers/workflowTransitions`
  );

  return handleJsonResponse(response, options);
};
