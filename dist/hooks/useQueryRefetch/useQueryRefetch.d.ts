import { RefetchQueryFilters } from "@tanstack/react-query";
interface UseQueryRefetchProps {
    delay?: number;
    options: RefetchQueryFilters;
}
export default function useQueryRefetch({ delay, options, }: UseQueryRefetchProps): {
    refetch: () => void;
    cancel: () => void;
    isLoading: boolean;
};
export type { UseQueryRefetchProps };
