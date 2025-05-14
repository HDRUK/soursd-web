import { PaginatedQueryProps } from "@/hooks/usePaginatedQuery";
import { GetAffiliationsResponse } from "./types";
type GetAffiliationsQuery = Partial<PaginatedQueryProps<GetAffiliationsResponse>>;
export default function usePaginatedAffiliations(registryId: number, options?: GetAffiliationsQuery): any;
export {};
