import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodian from "./getCustodian";
export default function getCustodianQuery(custodianId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getCustodian>>>;
