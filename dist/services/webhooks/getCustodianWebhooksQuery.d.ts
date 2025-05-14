import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianWebhooks from "./getCustodianWebhooks";
export default function getCustodianWebhooksQuery(custodianId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getCustodianWebhooks>>>;
