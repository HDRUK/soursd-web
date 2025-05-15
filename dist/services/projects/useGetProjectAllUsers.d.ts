import { PaginatedQueryProps } from "@/hooks/usePaginatedQuery";
import { ProjectAllUserResponse } from "./types";
interface GetPaginatedUsersQuery<T = ProjectAllUserResponse> extends Partial<PaginatedQueryProps<T>> {
}
export default function useGetProjectAllUsers(projectId: number, { queryKeyBase, defaultQueryParams, ...restParams }?: GetPaginatedUsersQuery): (import("@tanstack/query-core").QueryObserverRefetchErrorResult<import("../../types/requests").ResponseJson<import("../../types/requests").Paged<ProjectAllUserResponse>>, Error> & import("../../types/requests").Paged<ProjectAllUserResponse> & import("@/hooks/usePaginatedQuery").PaginatedQueryHelpers) | (import("@tanstack/query-core").QueryObserverSuccessResult<import("../../types/requests").ResponseJson<import("../../types/requests").Paged<ProjectAllUserResponse>>, Error> & import("../../types/requests").Paged<ProjectAllUserResponse> & import("@/hooks/usePaginatedQuery").PaginatedQueryHelpers);
export {};
