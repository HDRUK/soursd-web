import { Paged, ResponseJson } from "@/types/requests";
import { UseQueryResult } from "@tanstack/react-query";
type QueryParams = Record<string, string | number | undefined>;
export interface PaginatedQueryHelpers {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    updateQueryParams: (newParams: QueryParams) => void;
    resetQueryParams: (overideParams?: QueryParams) => void;
    handleSortToggle: (field: string, direction: string) => void;
    handleFieldToggle: (field: string, options: [string, string]) => void;
    queryParams: QueryParams;
    setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>;
}
export type PaginatedQueryProps<T> = {
    queryKeyBase: unknown[];
    queryFn: (queryParams: QueryParams) => Promise<ResponseJson<Paged<T>>>;
    initialPage?: number;
    enabled?: boolean;
    refetchInterval?: number;
    defaultQueryParams?: QueryParams;
    shouldUpdateQuerystring?: boolean;
};
export type PaginatedQueryReturn<T> = UseQueryResult<ResponseJson<Paged<T>>> & Paged<T> & PaginatedQueryHelpers;
declare const usePaginatedQuery: <T>({ queryKeyBase, queryFn, initialPage, defaultQueryParams, enabled, refetchInterval, shouldUpdateQuerystring, }: PaginatedQueryProps<T>) => PaginatedQueryReturn<T>;
export default usePaginatedQuery;
