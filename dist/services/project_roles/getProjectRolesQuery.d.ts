import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getProjectRoles from "./getProjectRoles";
export default function getProjectRolesQuery(options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getProjectRoles>>>;
