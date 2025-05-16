import { ResponseJson, ResponseOptions } from "../../types/requests";
import { patchRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export type PatchCustodianRulesPayload = {
  rule_ids: number[];
};

type PatchCustodianRulesResponse = {
  data: boolean;
};

export default async (
  id: number,
  payload: PatchCustodianRulesPayload,
  options: ResponseOptions
): Promise<ResponseJson<PatchCustodianRulesResponse>> => {
  const response = await patchRequest(`/custodians/${id}/rules`, payload);

  return handleJsonResponse(response, options);
};
