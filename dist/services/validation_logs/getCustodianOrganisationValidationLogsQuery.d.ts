import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianOrganisationValidationLogs from "./getCustodianOrganisationValidationLogs";
export default function getCustodianOrganisationValidationLogsQuery(custodianId: number, organisationId: number, options?: QueryOptions): UseQueryOptions<Awaited<ReturnType<typeof getCustodianOrganisationValidationLogs>>>;
