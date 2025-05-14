import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getUserApprovedProjects from "./getUserApprovedProjects";
export default function getUserApprovedProjectsQuery(registryId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getUserApprovedProjects>>>;
