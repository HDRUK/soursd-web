import {
  GetWorkflowTransitions,
  ResponseJson,
  ResponseOptions,
} from "../../types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<GetWorkflowTransitions>> => {
  const response = await getRequest(
    `/custodian_approvals/projectOrganisations/workflowTransitions`
  );

  return handleJsonResponse(response, options);
};
