import { PaginatedQueryProps } from "../../hooks/usePaginatedQuery";
import { OrganisationsResponse } from "./types";
interface GetEntityOrganisationsQuery<T = OrganisationsResponse> extends Partial<PaginatedQueryProps<T>> {
}
export default function useOrganisationsQuery({ queryKeyBase, defaultQueryParams, ...restParams }?: GetEntityOrganisationsQuery): (import("@tanstack/query-core").QueryObserverRefetchErrorResult<import("../../types/requests").ResponseJson<import("../../types/requests").Paged<OrganisationsResponse>>, Error> & import("../../types/requests").Paged<OrganisationsResponse> & import("../../hooks/usePaginatedQuery").PaginatedQueryHelpers) | (import("@tanstack/query-core").QueryObserverSuccessResult<import("../../types/requests").ResponseJson<import("../../types/requests").Paged<OrganisationsResponse>>, Error> & import("../../types/requests").Paged<OrganisationsResponse> & import("../../hooks/usePaginatedQuery").PaginatedQueryHelpers);
export {};
