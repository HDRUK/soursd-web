import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getAffiliations from "./getAffiliations";
export default function getAffiliationsQuery(registryId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getAffiliations>>>;
