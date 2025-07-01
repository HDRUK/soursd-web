import putRegistryHasAffiliation from "./putRegistryHasAffiliation";
import { AffiliationStatus } from "./types";

export default function putRegistryHasAffiliationQuery() {
  return {
    mutationKey: ["putAffiliation"],
    mutationFn: ({
      registryId,
      affiliationId,
      status,
    }: {
      registryId: number;
      affiliationId: number;
      status: AffiliationStatus;
    }) => {
      return putRegistryHasAffiliation(registryId, affiliationId, status, {
        error: { message: "putRegistryAffiliationError" },
      });
    },
  };
}
