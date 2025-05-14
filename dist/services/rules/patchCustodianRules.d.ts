import { ResponseJson, ResponseOptions } from "@/types/requests";
export type PatchCustodianRulesPayload = {
    rule_ids: number[];
};
type PatchCustodianRulesResponse = {
    data: boolean;
};
declare const _default: (id: number, payload: PatchCustodianRulesPayload, options: ResponseOptions) => Promise<ResponseJson<PatchCustodianRulesResponse>>;
export default _default;
