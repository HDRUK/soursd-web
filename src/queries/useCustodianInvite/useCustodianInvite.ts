import {
  postCustodianInviteQuery,
  PostCustodianPayload,
  postCustodianQuery,
} from "../../services/custodians";
import { MutationState } from "@/types/form";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

interface UseCustodianInviteProps {
  onSuccess: () => void;
  onError: () => void;
}

export default function useCustodianInvite({
  onSuccess,
  onError,
}: UseCustodianInviteProps) {
  const { mutateAsync: mutateCustodian, ...postCustodianQueryState } =
    useMutation(postCustodianQuery());

  const {
    mutateAsync: mutateCustodianInvite,
    ...postCustodianInviteQueryState
  } = useMutation(postCustodianInviteQuery());

  const handleSubmit = useCallback(async (custodian: PostCustodianPayload) => {
    try {
      const { data } = await mutateCustodian({
        ...custodian,
        enabled: false,
      });

      await mutateCustodianInvite(data);

      onSuccess();
    } catch (_) {
      onError();
    }
  }, []);

  const queryState = getCombinedQueryState<MutationState>([
    postCustodianQueryState,
    postCustodianInviteQueryState,
  ]);

  return useMemo(
    () => ({
      queryState,
      handleSubmit,
    }),
    [queryState]
  );
}
