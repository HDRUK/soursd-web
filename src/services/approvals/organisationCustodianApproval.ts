import { ResponseJson, ResponseOptions } from "../../types/requests";
import { postRequest, getRequest, deleteRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { ApprovalResponse } from "./types";

type RequestMethod = "POST" | "GET" | "DELETE";

interface PostApprovalPayload {
  approved: number;
  comment: string;
}

export default async (
  method: RequestMethod,
  custodianId: string | number,
  organisationId: string | number,
  payload: PostApprovalPayload | undefined,
  options: ResponseOptions
): Promise<ResponseJson<ApprovalResponse>> => {
  const url = `/custodian_approvals/${custodianId}/organisations/${organisationId}`;

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
