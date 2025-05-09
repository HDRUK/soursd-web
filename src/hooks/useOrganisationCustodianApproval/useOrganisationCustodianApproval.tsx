import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { organisationCustodianApproval } from "@/services/approvals";
import { useEffect, useState } from "react";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { MutationState } from "@/types/form";

type CustodianParams = {
  custodianId: string | number;
  organisationId: string | number;
};

export const useOrganisationCustodianApproval = ({
  custodianId,
  organisationId,
}: CustodianParams) => {
  const queryKey = [
    "custodianOrganisationApproval",
    custodianId,
    organisationId,
  ];
  const queryClient = useQueryClient();

  const [mutationState, setMutationState] = useState<MutationState>({
    isError: false,
    isSuccess: false,
    isPending: false,
  });

  const {
    data,
    isLoading: isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () =>
      organisationCustodianApproval(
        "GET",
        custodianId,
        organisationId,
        undefined,
        {
          error: { message: "fetchApprovalError" },
        }
      ),
  });
  useEffect(() => {
    setMutationState(state => ({
      ...state,
      isPending: isFetching,
      isSuccess: false,
    }));
  }, [data]);

  const onSuccess = () => {
    setMutationState(state => ({ ...state, isSuccess: true }));
    queryClient.invalidateQueries({ queryKey });
  };

  const { mutateAsync: approve, isPending: isApproving } = useMutation({
    mutationFn: (comment: string) =>
      organisationCustodianApproval(
        "POST",
        custodianId,
        organisationId,
        { approved: 1, comment },
        {
          error: { message: "approvalError" },
        }
      ),
    onSuccess,
  });

  const { mutateAsync: reject, isPending: isRejecting } = useMutation({
    mutationFn: (comment: string) =>
      organisationCustodianApproval(
        "POST",
        custodianId,
        organisationId,
        { approved: 0, comment },
        {
          error: { message: "rejectionError" },
        }
      ),
    onSuccess,
  });
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
