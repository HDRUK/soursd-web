import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse, patchRequest } from "../requests";

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
  const response = await patchRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians/${id}/rules`,
    payload
  );

  return handleJsonResponse(response, options);
};
