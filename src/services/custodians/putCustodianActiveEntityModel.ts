import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import {
  PutCustodianActiveEntityModelResponse,
  PutCustodianActiveEntityModelPayload,
} from "./types";

export default async (
  custodianId: number | undefined,
  payload: PutCustodianActiveEntityModelPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PutCustodianActiveEntityModelResponse>> => {
  const response = await putRequest(
    `/custodian_config/${custodianId}/entity_models`,
    payload
  );

  return handleJsonResponse(response, options);
};
