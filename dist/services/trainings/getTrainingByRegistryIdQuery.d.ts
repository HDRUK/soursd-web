import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getTrainingByRegistryId from "./getTrainingByRegistryId";
export default function getTrainingQuery(registryId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getTrainingByRegistryId>>>;
