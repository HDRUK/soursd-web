import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianUser from "./getCustodianUser";
export default function getCustodianUserQuery(custodianUserId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getCustodianUser>>>;
