import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getUsers from "./getUsers";
export default function getUsersQuery(options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getUsers>>>;
