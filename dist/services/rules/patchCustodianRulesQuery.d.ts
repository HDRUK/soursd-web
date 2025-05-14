import { PatchCustodianRulesPayload } from "./patchCustodianRules";
export default function patchCustodianRulesQuery(id?: number): {
    mutationKey: (string | number | undefined)[];
    mutationFn: (payload: PatchCustodianRulesPayload) => Promise<ResponseJson<{
        data: boolean;
    }>>;
};
