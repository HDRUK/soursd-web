import { PaginatedQueryProps } from "@/hooks/usePaginatedQuery";
import { GetCustodiansUserProjectsResponse } from "./types";
type GetCustodiansUserProjectsQuery = Partial<PaginatedQueryProps<GetCustodiansUserProjectsResponse>>;
export default function usePaginatedCustodiansUserProjects(custodianId: number, userId: number, options?: GetCustodiansUserProjectsQuery): any;
export {};
