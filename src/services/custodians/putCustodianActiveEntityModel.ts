import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PutCustodianActiveEntityModelResponse, PutCustodianActiveEntityModelPayload } from "./types";

export default async (
  id: number | undefined,
  payload: PutCustodianActiveEntityModelPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PutCustodianActiveEntityModelResponse>> => {
  const response = await putRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodian_config/update-active/${id}`,
    payload
  );

  return handleJsonResponse(response, options);
};
