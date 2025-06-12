import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest, getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { ApprovalResponse } from "./types";

type RequestMethod = "PUT" | "GET";

interface PostApprovalPayload {
  status: string;
}

export default async (
  method: RequestMethod,
  custodianId: string | number,
  projectUserId: string | number,
  payload: PostApprovalPayload | undefined,
  options: ResponseOptions
): Promise<ResponseJson<ApprovalResponse>> => {
  const url = `/custodian_approvals/${custodianId}/projectUsers/${projectUserId}`;

  const requestFn = {
    PUT: putRequest,
    GET: getRequest,
  }[method];

  if (!requestFn) {
    throw new Error(`Unsupported method: ${method}`);
  }

  const response = await requestFn(url, payload);
  return handleJsonResponse(response, options);
};
