import { useState, useCallback } from "react";
import {
  useQuery,
  keepPreviousData,
  UseQueryResult,
} from "@tanstack/react-query";
import { Paged, ResponseJson } from "@/types/requests";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type PaginatedQueryProps<T> = {
  queryKeyBase: string;
  queryFn: (
    queryParams: Record<string, string | number | undefined>
  ) => Promise<ResponseJson<Paged<T>>>;
  initialPage?: number;
  enabled?: boolean;
};

type PaginatedQueryReturn<T> = UseQueryResult<ResponseJson<Paged<T>>> &
  Paged<T> & {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    updateQueryParam: (key: string, value: string) => void;
  };

const usePaginatedQuery = <T,>({
  queryKeyBase,
  queryFn,
  initialPage = 1,
  enabled = true,
}: PaginatedQueryProps<T>): PaginatedQueryReturn<T> => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(initialPage);

  const [queryParams, setQueryParams] = useState<{}>({
    page,
  });

  const queryResult = useQuery({
    queryKey: [queryKeyBase, queryParams],
    queryFn: () => queryFn(queryParams),
    placeholderData: keepPreviousData,
    enabled,
  });

  const { data: queryData, ...restQueryResult } = queryResult;
  const pagedData = queryData?.data || {};

  const updateQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const updateQueryParam = useCallback(
    (key: string, value: string) => {
      router.push(`${pathname}?${updateQueryString(key, value)}`, {
        scroll: false,
      });
      setPage(1);
      setQueryParams({
        ...queryParams,
        [key]: value,
      });
    },
    [pathname, router, updateQueryString]
  );

  return {
    ...restQueryResult,
    ...pagedData,
    page,
    setPage,
    updateQueryParam,
  } as PaginatedQueryReturn<T>;
};

export default usePaginatedQuery;
