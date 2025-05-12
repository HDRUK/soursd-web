import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { MutationState } from "@/types/form";
import { getOrganisationApprovalQuery } from "@/services/approvals";
import {
  useApproveOrganisation,
  useRejectOrganisation,
} from "../useCustodianMutations";

type CustodianParams = {
  custodianId: string | number;
  organisationId: string | number;
};

export const useOrganisationCustodianApproval = ({
  custodianId,
  organisationId,
}: CustodianParams) => {
  const [mutationState, setMutationState] = useState<MutationState>({
    isError: false,
    isSuccess: false,
    isPending: false,
  });

  const queryKey = useMemo(
    () => ["custodianOrganisationApproval", custodianId, organisationId],
    [custodianId, organisationId]
  );

  const {
    data,
    isLoading: isFetching,
    isError,
    refetch,
  } = useQuery(
    getOrganisationApprovalQuery({
      queryKey: queryKey[0] as string,
      custodianId,
      organisationId,
    })
  );

  const queryClient = useQueryClient();

  const updateMutationState = (state: Partial<MutationState>) =>
    setMutationState(prev => ({ ...prev, ...state }));

  useEffect(() => {
    updateMutationState({ isPending: isFetching, isSuccess: false });
  }, [isFetching]);

  const onSuccess = () => {
    updateMutationState({ isSuccess: true });
    queryClient.invalidateQueries({ queryKey });
  };

  const { mutateAsync: approve, isPending: isApproving } =
    useApproveOrganisation({
      custodianId,
      organisationId,
      onSuccess,
    });

  const { mutateAsync: reject, isPending: isRejecting } = useRejectOrganisation(
    {
      custodianId,
      organisationId,
      onSuccess,
    }
  );

  const isLoading = isFetching || isApproving || isRejecting;

  useQueryAlerts(mutationState);

  return {
    data: data?.data,
    isLoading,
    isError,
    approve,
    reject,
    refetch,
  };
};
