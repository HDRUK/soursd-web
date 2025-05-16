import { SearchDirections } from "../../consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "../../hooks/usePaginatedQuery";
import { omit } from "@/utils/json";
import getCustodianContacts from "./getCustodianContacts";
import { GetCustodianContactsResponse } from "./types";

type GetCustodianContactsQuery = Partial<
  PaginatedQueryProps<GetCustodianContactsResponse>
>;

export default function usePaginatedCustodianContacts(
  custodianId: number,
  options?: GetCustodianContactsQuery
) {
  const queryKey = [options?.queryKeyBase || "getCustodianContacts"];

  return usePaginatedQuery({
    queryKeyBase: [queryKey, custodianId],
    defaultQueryParams: {
      sort: `last_name:${SearchDirections.ASC}`,
      ...options?.defaultQueryParams,
    },
    queryFn: queryParams =>
      getCustodianContacts(custodianId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...omit(options, ["defaultQueryParams", "queryKeyBase"]),
  });
}
