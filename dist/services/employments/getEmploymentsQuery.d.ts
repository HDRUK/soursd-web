import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getEmployments from "./getEmployments";
export default function getEmploymentsQuery(registryId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getEmployments>>>;
