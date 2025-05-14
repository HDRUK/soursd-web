import { PaginatedQueryProps } from "@/hooks/usePaginatedQuery";
import { ProjectAllUserResponse } from "./types";
interface GetPaginatedUsersQuery<T = ProjectAllUserResponse> extends Partial<PaginatedQueryProps<T>> {
}
export default function useGetProjectAllUsers(projectId: number, { queryKeyBase, defaultQueryParams, ...restParams }?: GetPaginatedUsersQuery): any;
export {};
