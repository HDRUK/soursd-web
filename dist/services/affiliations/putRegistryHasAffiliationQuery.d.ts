import { AffiliationStatus } from "./types";
export default function putRegistryHasAffiliationQuery(): {
    mutationKey: string[];
    mutationFn: ({ registryId, affiliationId, status, }: {
        registryId: number;
        affiliationId: number;
        status: AffiliationStatus;
    }) => Promise<import("../../types/requests").ResponseJson<import("../../types/application").ResearcherAffiliation>>;
};
