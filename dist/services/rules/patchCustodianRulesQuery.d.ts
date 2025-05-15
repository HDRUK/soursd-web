import { PatchCustodianRulesPayload } from "./patchCustodianRules";
export default function patchCustodianRulesQuery(id?: number): {
    mutationKey: (string | number | undefined)[];
    mutationFn: (payload: PatchCustodianRulesPayload) => Promise<import("../../types/requests").ResponseJson<{
        data: boolean;
    }>>;
};
