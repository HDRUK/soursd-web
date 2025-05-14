import { PaginatedQueryProps } from "@/hooks/usePaginatedQuery";
import { OrganisationsResponse } from "./types";
interface GetEntityOrganisationsQuery<T = OrganisationsResponse> extends Partial<PaginatedQueryProps<T>> {
}
export default function useOrganisationsQuery({ queryKeyBase, defaultQueryParams, ...restParams }?: GetEntityOrganisationsQuery): any;
export {};
