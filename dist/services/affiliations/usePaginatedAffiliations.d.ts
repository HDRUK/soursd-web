import { PaginatedQueryProps } from "../../hooks/usePaginatedQuery";
import { GetAffiliationsResponse } from "./types";
type GetAffiliationsQuery = Partial<PaginatedQueryProps<GetAffiliationsResponse>>;
export default function usePaginatedAffiliations(registryId: number, options?: GetAffiliationsQuery): (import("@tanstack/query-core").QueryObserverRefetchErrorResult<import("../../types/requests").ResponseJson<import("../../types/requests").Paged<GetAffiliationsResponse>>, Error> & import("../../types/requests").Paged<GetAffiliationsResponse> & import("../../hooks/usePaginatedQuery").PaginatedQueryHelpers) | (import("@tanstack/query-core").QueryObserverSuccessResult<import("../../types/requests").ResponseJson<import("../../types/requests").Paged<GetAffiliationsResponse>>, Error> & import("../../types/requests").Paged<GetAffiliationsResponse> & import("../../hooks/usePaginatedQuery").PaginatedQueryHelpers);
export {};
