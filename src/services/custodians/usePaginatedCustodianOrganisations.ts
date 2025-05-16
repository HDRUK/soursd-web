import { omit } from "@/utils/json";
import { SearchDirections } from "../../consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "../../hooks/usePaginatedQuery";
import getCustodianOrganisations from "./getCustodianOrganisations";
import { GetCustodianOrganisationsResponse } from "./types";

type GetCustodianOrganisationsQuery = Partial<
  PaginatedQueryProps<GetCustodianOrganisationsResponse>
>;

export default function usePaginatedCustodianOrganisations(
  custodianId: number,
  options?: GetCustodianOrganisationsQuery
) {
  const queryKey = [options?.queryKeyBase || "getCustodianOrganisations"];

  return usePaginatedQuery({
    queryKeyBase: [queryKey, custodianId],
    defaultQueryParams: {
      sort: `organisation_name:${SearchDirections.ASC}`,
      ...options?.defaultQueryParams,
    },
    queryFn: queryParams =>
      getCustodianOrganisations(custodianId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...omit(options, ["defaultQueryParams", "queryKeyBase"]),
  });
}
