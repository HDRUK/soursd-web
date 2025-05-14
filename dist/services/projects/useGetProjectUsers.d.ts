import { PaginatedQueryProps } from "@/hooks/usePaginatedQuery";
import { ProjectUsersResponse } from "./types";
interface GetPaginatedCustodianProjectUsersQuery<T = ProjectUsersResponse> extends Partial<PaginatedQueryProps<T>> {
}
export default function useGetProjectUsers(projectId: number, { queryKeyBase, defaultQueryParams, ...restParams }?: GetPaginatedCustodianProjectUsersQuery): any;
export {};
