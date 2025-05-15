import { PaginatedQueryProps } from "@/hooks/usePaginatedQuery";
import { ProjectUsersResponse } from "./types";
interface GetPaginatedCustodianProjectUsersQuery<T = ProjectUsersResponse> extends Partial<PaginatedQueryProps<T>> {
}
export default function useGetProjectUsers(projectId: number, { queryKeyBase, defaultQueryParams, ...restParams }?: GetPaginatedCustodianProjectUsersQuery): (import("@tanstack/query-core").QueryObserverRefetchErrorResult<import("../../types/requests").ResponseJson<import("../../types/requests").Paged<ProjectUsersResponse>>, Error> & import("../../types/requests").Paged<ProjectUsersResponse> & import("@/hooks/usePaginatedQuery").PaginatedQueryHelpers) | (import("@tanstack/query-core").QueryObserverSuccessResult<import("../../types/requests").ResponseJson<import("../../types/requests").Paged<ProjectUsersResponse>>, Error> & import("../../types/requests").Paged<ProjectUsersResponse> & import("@/hooks/usePaginatedQuery").PaginatedQueryHelpers);
export {};
