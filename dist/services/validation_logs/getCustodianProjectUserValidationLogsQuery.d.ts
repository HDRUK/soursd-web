import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianProjectUserValidationLogs from "./getCustodianProjectUserValidationLogs";
export default function getCustodianProjectUserValidationLogsQuery(custodianId: number, projectId: number, registryId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getCustodianProjectUserValidationLogs>>>;
