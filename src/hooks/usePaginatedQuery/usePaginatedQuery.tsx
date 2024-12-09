import { useState } from "react";
import {
  useQuery,
  keepPreviousData,
  UseQueryResult,
} from "@tanstack/react-query";
import { Paged, ResponseJson } from "@/types/requests";

type PaginatedQueryProps<T> = {
  queryKeyBase: string;
  queryFn: (page: number) => Promise<ResponseJson<Paged<T>>>;
  initialPage?: number;
};

type PaginatedQueryReturn<T> = UseQueryResult<ResponseJson<Paged<T>>> &
  Paged<T> & {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
  };

const usePaginatedQuery = <T,>({
  queryKeyBase,
  queryFn,
  initialPage = 1,
}: PaginatedQueryProps<T>): PaginatedQueryReturn<T> => {
  const [page, setPage] = useState<number>(initialPage);

  const queryResult = useQuery({
    queryKey: [queryKeyBase, page],
    queryFn: () => queryFn(page),
    placeholderData: keepPreviousData,
  });

  const { data: queryData, ...restQueryResult } = queryResult;
  const pagedData = queryData?.data || {};

  return {
    ...restQueryResult,
    ...pagedData,
    page,
    setPage,
  } as PaginatedQueryReturn<T>;
};

export default usePaginatedQuery;
