import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export type PutCustodianRulesPayload = {
  rule_ids: number[];
};

type PutCustodianRulesResponse = {
  data: boolean;
};

export default async (
  id: number,
  payload: PutCustodianRulesPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutCustodianRulesResponse>> => {
  const response = await putRequest(`/custodians/${id}/rules`, payload);

  return handleJsonResponse(response, options);
};
