import { useState, useEffect, useCallback } from "react";
import {
  useQuery,
  keepPreviousData,
  UseQueryResult,
} from "@tanstack/react-query";
import { Paged, ResponseJson } from "@/types/requests";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const API_SORT_KEY = "sort";

type PaginatedQueryProps<T> = {
  queryKeyBase: unknown[];
  queryFn: (
    queryParams: Record<string, string | number | undefined>
  ) => Promise<ResponseJson<Paged<T>>>;
  initialPage?: number;
  enabled?: boolean;
  defaultQueryParams?: Record<string, string | number | undefined>;
};

export type PaginatedQueryReturn<T> = UseQueryResult<ResponseJson<Paged<T>>> &
  Paged<T> & {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    updateQueryParam: (key: string, value: string) => void;
    handleSortToggle: (field: string, direction: string) => void;
    handleFieldToggle: (field: string, options: [string, string]) => void;
    queryParams: Record<string, string | number | undefined>;
  };

const usePaginatedQuery = <T,>({
  queryKeyBase,
  queryFn,
  initialPage = 1,
  defaultQueryParams = {},
  enabled = true,
}: PaginatedQueryProps<T>): PaginatedQueryReturn<T> => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(initialPage);

  const [queryParams, setQueryParams] = useState<
    Record<string, string | number | undefined>
  >({
    page,
    ...defaultQueryParams,
  });

  useEffect(() => {
    setQueryParams(prev => ({
      ...prev,
      page,
    }));
  }, [page]);

  const queryResult = useQuery({
    queryKey: [...queryKeyBase, queryParams],
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

  const handleSortToggle = useCallback(
    (field: string, direction: string) => {
      const currentSort =
        typeof queryParams[API_SORT_KEY] === "string"
          ? queryParams[API_SORT_KEY]
          : "";

      const [currentField, currentDirection] = currentSort
        ? currentSort.split(":")
        : [null, null];

      const newDirection =
        currentField === field && currentDirection === direction
          ? ""
          : direction;

      const updatedQueryParams = { ...queryParams };

      if (newDirection) {
        updatedQueryParams[API_SORT_KEY] = `${field}:${newDirection}`;
      } else {
        delete updatedQueryParams[API_SORT_KEY];
      }

      setQueryParams(updatedQueryParams);
    },
    [queryParams]
  );

  const handleFieldToggle = useCallback(
    (field: string, options: [string, string]) => {
      const currentValue = queryParams[field];

      const newValue = currentValue === options[0] ? options[1] : options[0];

      setQueryParams({
        ...queryParams,
        [field]: newValue,
      });
    },
    [queryParams]
  );

  return {
    ...restQueryResult,
    ...pagedData,
    queryParams,
    page,
    setPage,
    updateQueryParam,
    handleSortToggle,
    handleFieldToggle,
  } as PaginatedQueryReturn<T>;
};

export default usePaginatedQuery;
