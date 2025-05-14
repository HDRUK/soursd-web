import { AffiliationStatus } from "./types";
export default function putRegistryHasAffiliationQuery(): {
    mutationKey: string[];
    mutationFn: ({ registryId, affiliationId, status, }: {
        registryId: number;
        affiliationId: number;
        status: AffiliationStatus;
    }) => Promise<ResponseJson<ResearcherAffiliation>>;
};
