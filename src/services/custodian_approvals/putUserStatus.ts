import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { putRequest } from "../requests";
import { PutUserStatusPayload, PutUserStatusParams } from "./types";

export default async (
  params: PutUserStatusParams,
  payload: PutUserStatusPayload,
  options?: ResponseOptions
): Promise<ResponseJson<number>> => {
  const response = await putRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_approvals/${params.custodianId}/projectUsers/${params.id}`,
    payload
  );

  return handleJsonResponse(response, options);
};
