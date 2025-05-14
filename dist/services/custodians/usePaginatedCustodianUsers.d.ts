import { PaginatedQueryProps } from "@/hooks/usePaginatedQuery";
import { GetCustodianOrganisationUsersResponse } from "./types";
type GetCustodianOrganisationUsersQuery = Partial<PaginatedQueryProps<GetCustodianOrganisationUsersResponse>>;
export default function usePaginatedCustodianUsers(custodianId: number, options?: GetCustodianOrganisationUsersQuery): any;
export {};
