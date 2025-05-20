import { PaginatedQueryReturn } from "@/hooks/usePaginatedQuery";

const mockedPaginationResults = (
  results?: Partial<PaginatedQueryReturn<unknown>>
) => ({
  total: 1,
  page: 1,
  ...results,
});

export { mockedPaginationResults };
