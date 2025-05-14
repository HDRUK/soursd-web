import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getPermissions from "./getPermissions";
export default function getPermissionsQuery(options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getPermissions>>>;
