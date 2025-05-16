import { PaginatedQueryProps } from "../../hooks/usePaginatedQuery";
import { GetUserProjectsResponse } from "./types";
type GetUserProjectsQuery = Partial<PaginatedQueryProps<GetUserProjectsResponse>>;
export default function usePaginatedUserProjects(userId: number, options?: GetUserProjectsQuery): (import("@tanstack/query-core").QueryObserverRefetchErrorResult<import("../../types/requests").ResponseJson<import("../../types/requests").Paged<GetUserProjectsResponse>>, Error> & import("../../types/requests").Paged<GetUserProjectsResponse> & import("../../hooks/usePaginatedQuery").PaginatedQueryHelpers) | (import("@tanstack/query-core").QueryObserverSuccessResult<import("../../types/requests").ResponseJson<import("../../types/requests").Paged<GetUserProjectsResponse>>, Error> & import("../../types/requests").Paged<GetUserProjectsResponse> & import("../../hooks/usePaginatedQuery").PaginatedQueryHelpers);
export {};
