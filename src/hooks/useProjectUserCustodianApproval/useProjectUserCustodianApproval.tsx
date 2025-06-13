import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { MutationState } from "@/types/form";
import { useTranslations } from "next-intl";

import useQueryAlerts from "../useQueryAlerts";

import {
  getCustodianProjectUserQuery,
  getCustodianProjectUsersQuery,
} from "@/services/custodians";

type CustodianParams = {
  custodianId: number;
  projectUserId: number;
};

const NAMESPACE_TRANSLATION = "Application";

export const useProjectUserCustodianApproval = ({
  custodianId,
  projectUserId,
}: CustodianParams) => {
  const tApplication = useTranslations(NAMESPACE_TRANSLATION);
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
  } = useQuery(
    getCustodianProjectUserQuery(custodianId as number, projectUserId as number)
  );

  const { data: statusOptionsData } = useQuery({
    queryKey: ["custodianApprovalStates"],
    queryFn: () =>
      projectUserCustodianStates({
        error: { message: "fetchStatesError" },
      }),
  });

  const statusOptions = useMemo(
    () =>
      statusOptionsData?.data?.map(item => ({
        value: item,
        label: tApplication(`status_${item}`),
      })) || [],
    [statusOptionsData]
  );

  useEffect(() => {
    setMutationState(state => ({
      ...state,
      isPending: isFetching,
      isSuccess: false,
    }));
  }, [data]);

  const onSuccess = () => {
    setMutationState(state => ({ ...state, isSuccess: true }));
    queryClient.refetchQueries({
      queryKey: [
        "getCustodianProjectUser",
        Number(custodianId),
        Number(projectUserId),
      ],
    });
  };

  const { mutateAsync: changeValidationStatus, isPending: isUpdating } =
    useMutation({
      mutationFn: (payload: ChangeValidationStatusPayload) =>
        projectUserCustodianApproval(
          "PUT",
          custodianId,
          projectUserId,
          payload,
          {
            error: { message: "changeValidationStatusError" },
          }
        ),
      onSuccess,
    });

  const isLoading = isFetching || isUpdating;

  useQueryAlerts(mutationState);

  return {
    data: data?.data,
    isLoading,
    isError,
    statusOptions,
    changeValidationStatus,
    refetch,
  };
};
