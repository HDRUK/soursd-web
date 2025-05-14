import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getUser from "./getUser";
export default function getUserQuery(userId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getUser>>>;
