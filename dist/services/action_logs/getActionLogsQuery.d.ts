import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import { ActionLogEntity } from "@/types/logs";
import getActionLogs from "./getActionLogs";
export default function getActionLogsQuery(id: number, entity: ActionLogEntity, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getActionLogs>>>;
