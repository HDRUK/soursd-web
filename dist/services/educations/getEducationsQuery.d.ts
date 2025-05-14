import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getEducations from "./getEducations";
export default function getEducationsQuery(registryId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getEducations>>>;
