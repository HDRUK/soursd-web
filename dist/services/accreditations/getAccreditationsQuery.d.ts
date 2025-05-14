import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getAccreditations from "./getAccreditations";
export default function getAccreditationsQuery(registryId: number, options?: QueryOptions): UseQueryOptions<ReturnType<typeof getAccreditations>>;
