import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest, getRequest, deleteRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

type RequestMethod = "POST" | "GET" | "DELETE";

interface PostApprovalPayload {
  approved: number;
  comment: string;
}

interface ApprovalResponse {
  project_id: number;
  user_id: number;
  custodian_id: number;
  approved: number;
  comment: string;
}

export default async (
  method: RequestMethod,
  custodianId: string | number,
  projectId: string | number,
  registryId: string | number,
  payload: PostApprovalPayload | undefined,
  options: ResponseOptions
): Promise<ResponseJson<ApprovalResponse>> => {
  const url = `/custodian_approvals/${custodianId}/projects/${projectId}/registry/${registryId}`;

  const requestFn = {
    POST: postRequest,
    GET: getRequest,
    DELETE: deleteRequest,
  }[method];

  if (!requestFn) {
    throw new Error(`Unsupported method: ${method}`);
  }

  const response = await requestFn(url, payload);
  return handleJsonResponse(response, options);
};
