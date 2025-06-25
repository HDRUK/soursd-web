"use client";

import useProjectEntityBoard from "@/hooks/useProjectEntityBoard";
import {
  getCustodianProjectOrganisationWorkflowTransitionsQuery,
  getCustodianProjectUserWorkflowTransitionsQuery,
  usePaginatedCustodianProjectOrganisations,
  usePaginatedCustodianProjectUsers,
} from "@/services/custodian_approvals";
import { EntityType } from "@/types/api";
import { WithRoutes } from "@/types/application";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

type UseProjectEntityProps = {
  query: () => ReturnType<
    | typeof usePaginatedCustodianProjectUsers
    | typeof usePaginatedCustodianProjectOrganisations
  >;
  variant: EntityType;
};

export default function useProjectEntity({
  query,
  variant,
}: UseProjectEntityProps) {
  const queryReturn = query();

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
    [stateWorkflow?.data, query]
  );
}
