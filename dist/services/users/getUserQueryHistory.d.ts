import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getUserHistory from "./getUserHistory";
export default function getUserHistoryQuery(userId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getUserHistory>>>;
