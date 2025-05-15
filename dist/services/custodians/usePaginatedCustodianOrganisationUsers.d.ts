import { PaginatedQueryProps } from "@/hooks/usePaginatedQuery";
import { GetCustodianOrganisationUsersResponse } from "./types";
type GetCustodianOrganisationUsersQuery = Partial<PaginatedQueryProps<GetCustodianOrganisationUsersResponse>>;
export default function usePaginatedCustodianOrganisationUsers(custodianId: number, organisationId: number, options?: GetCustodianOrganisationUsersQuery): import("@/hooks/usePaginatedQuery").PaginatedQueryReturn<unknown>;
export {};
