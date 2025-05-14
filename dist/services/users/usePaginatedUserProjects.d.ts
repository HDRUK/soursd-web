import { PaginatedQueryProps } from "@/hooks/usePaginatedQuery";
import { GetUserProjectsResponse } from "./types";
type GetUserProjectsQuery = Partial<PaginatedQueryProps<GetUserProjectsResponse>>;
export default function usePaginatedUserProjects(userId: number, options?: GetUserProjectsQuery): any;
export {};
