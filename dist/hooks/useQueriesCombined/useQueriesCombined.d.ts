import { UseQueryOptions } from "@tanstack/react-query";
interface CombinedResults<T = unknown> {
    isLoading: boolean;
    isError: boolean;
    isFetched: boolean;
    error: Record<string, Error | null>;
    data: T;
}
export default function useQueriesCombined<T>(queries: UseQueryOptions[]): CombinedResults<T>;
export {};
