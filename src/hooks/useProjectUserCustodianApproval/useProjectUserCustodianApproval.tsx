import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MutationState } from "@/types/form";
import { projectUserCustodianApproval } from "../../services/approvals";
import useQueryAlerts from "../useQueryAlerts";

type CustodianParams = {
  custodianId: string | number;
  projectId: string | number;
  registryId: string | number;
};

export const useProjectUserCustodianApproval = ({
  custodianId,
  projectId,
  registryId,
}: CustodianParams) => {
  const queryKey = ["custodianApproval", custodianId, projectId, registryId];
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
      projectUserCustodianApproval(
        "GET",
        custodianId,
        projectId,
        registryId,
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
      projectUserCustodianApproval(
        "POST",
        custodianId,
        projectId,
        registryId,
        { approved: 1, comment },
        {
          error: { message: "approvalError" },
        }
      ),
    onSuccess,
  });

  const { mutateAsync: reject, isPending: isRejecting } = useMutation({
    mutationFn: (comment: string) =>
      projectUserCustodianApproval(
        "POST",
        custodianId,
        projectId,
        registryId,
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
