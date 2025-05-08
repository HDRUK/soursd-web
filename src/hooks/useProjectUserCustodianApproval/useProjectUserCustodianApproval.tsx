import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectUserCustodianApproval } from "@/services/approvals";
import { useEffect, useState } from "react";
import useQueryAlerts from "@/hooks/useQueryAlerts";

export const useProjectUserCustodianApproval = (
  custodianId: string | number,
  projectId: string | number,
  registryId: string | number
) => {
  const queryKey = ["custodianApproval", custodianId, projectId, registryId];
  const queryClient = useQueryClient();

  const [mutationState, setMutationState] = useState<{
    isError: boolean;
    isSuccess: boolean;
    isPending: boolean;
  }>({
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
    isFetching,
    isApproving,
    isRejecting,
    isError,
    approve,
    reject,
    refetch,
  };
};
