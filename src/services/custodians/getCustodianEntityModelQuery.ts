import { UseQueryOptions } from "@tanstack/react-query";
import { QueryOptions } from "../../types/requests";
import { EntityType } from "./types";
import getCustodianEntityModel from "./getCustodianEntityModel";

export default function getCustodianEntityModelQuery(
  custodianId: number | undefined,
  entity_type: EntityType,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianEntityModel",
      custodianId,
      entity_type,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getCustodianEntityModel(
        queryKey[1] as number,
        queryKey[2] as EntityType,
        {
          error: {
            message: "getCustodianEntityModelError",
          },
          ...options?.responseOptions,
        }
      ),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getCustodianEntityModel>>>;
}
