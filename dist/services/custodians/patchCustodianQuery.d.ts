import { PatchCustodianPayload } from "./types";
export default function patchCustodianRulesQuery(id?: number): {
    mutationKey: (string | number | undefined)[];
    mutationFn: (payload: PatchCustodianPayload) => Promise<import("../../types/requests").ResponseJson<import("../../types/application").Custodian>>;
};
