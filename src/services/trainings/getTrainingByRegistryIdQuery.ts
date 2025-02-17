import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getTrainingByRegistryId from "./getTrainingByRegistryId";

export default function getTrainingQuery(
  registryId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getTrainings", registryId],
    queryFn: ({ queryKey }) =>
      getTrainingByRegistryId(queryKey[1] as number, {
        error: { message: "getTrainingsError", ...options?.error },
      }),
    ...options,
  } as UseQueryOptions<ReturnType<typeof getTrainingByRegistryId>>;
}
