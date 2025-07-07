"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  getCustodianProjectOrganisationWorkflowTransitionsQuery,
  getCustodianProjectUserWorkflowTransitionsQuery,
  usePaginatedCustodianProjectOrganisations,
  usePaginatedCustodianProjectUsers,
} from "../../services/custodian_approvals";
import { EntityType } from "../../types/api";
import useProjectEntityBoard from "../useProjectEntityBoard";

type UseProjectEntityProps = {
  usePaginatedQuery: () => ReturnType<
    | typeof usePaginatedCustodianProjectUsers
    | typeof usePaginatedCustodianProjectOrganisations
  >;
  variant: EntityType;
};

export default function useProjectEntity({
  usePaginatedQuery,
  variant,
}: UseProjectEntityProps) {
  const queryReturn = usePaginatedQuery();

  const { data: stateWorkflow } = useQuery(
    variant === EntityType.ORGANISATION
      ? getCustodianProjectOrganisationWorkflowTransitionsQuery()
      : getCustodianProjectUserWorkflowTransitionsQuery()
  );

  const helpers = useProjectEntityBoard({
    data: queryReturn.data,
    stateWorkflow: stateWorkflow?.data,
  });

  return useMemo(
    () => ({
      helpers,
      query: queryReturn,
    }),
    [stateWorkflow?.data, queryReturn]
  );
}
