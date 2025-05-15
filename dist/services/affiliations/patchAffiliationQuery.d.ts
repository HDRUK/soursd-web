import { PatchAffiliationsPayload } from "./types";
export default function patchAffiliationQuery(): {
    mutationKey: string[];
    mutationFn: ({ affiliationId, payload, }: {
        affiliationId: number;
        payload: PatchAffiliationsPayload;
    }) => Promise<import("../../types/requests").ResponseJson<import("../../types/application").ResearcherAffiliation>>;
};
