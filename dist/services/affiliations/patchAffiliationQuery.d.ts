import { PatchAffiliationsPayload } from "./types";
export default function patchAffiliationQuery(): {
    mutationKey: string[];
    mutationFn: ({ affiliationId, payload, }: {
        affiliationId: number;
        payload: PatchAffiliationsPayload;
    }) => Promise<ResponseJson<ResearcherAffiliation>>;
};
