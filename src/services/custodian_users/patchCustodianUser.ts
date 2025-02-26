import { ResponseJson, ResponseOptions } from "@/types/requests";
import { patchRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PatchCustodianUserPayload, PatchCustodianUserResponse } from "./types";

export default async (
  userId: number,
  payload: PatchCustodianUserPayload,
  options: ResponseOptions
): Promise<ResponseJson<PatchCustodianUserResponse>> => {
  const response = await patchRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_users/${userId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
