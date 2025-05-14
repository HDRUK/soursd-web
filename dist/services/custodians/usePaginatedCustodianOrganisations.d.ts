import { PaginatedQueryProps } from "@/hooks/usePaginatedQuery";
import { GetCustodianOrganisationsResponse } from "./types";
type GetCustodianOrganisationsQuery = Partial<PaginatedQueryProps<GetCustodianOrganisationsResponse>>;
export default function usePaginatedCustodianOrganisations(custodianId: number, options?: GetCustodianOrganisationsQuery): any;
export {};
