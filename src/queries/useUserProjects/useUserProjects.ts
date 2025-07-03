import { usePaginatedCustodiansUserProjects } from "@/services/custodians";
import { usePaginatedUserProjects } from "@/services/users";
import { EntityType } from "@/types/api";

interface UseUserProjectsProps {
  variant: EntityType;
  userId: number;
  custodianId?: number;
}

export default function useUserProjects({
  custodianId,
  userId,
  variant,
}: UseUserProjectsProps) {
  const custodianQuery = usePaginatedCustodiansUserProjects(
    custodianId,
    userId,
    {
      shouldUpdateQuerystring: true,
      enabled: variant === EntityType.CUSTODIAN,
    }
  );

  const userQuery = usePaginatedUserProjects(userId, {
    shouldUpdateQuerystring: true,
    enabled: variant === EntityType.ORGANISATION,
  });

  if (custodianId) {
    return custodianQuery;
  }

  return userQuery;
}
