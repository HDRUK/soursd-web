import { ResponseJson, ResponseOptions } from "@/types/requests";
import { patchRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PatchCustodianPayload, PatchCustodianResponse } from "./types";

export default async (
  id: number,
  payload: PatchCustodianPayload,
  options: ResponseOptions
): Promise<ResponseJson<PatchCustodianResponse>> => {
  const response = await patchRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians/${id}`,
    payload
  );

  return handleJsonResponse(response, options);
};
