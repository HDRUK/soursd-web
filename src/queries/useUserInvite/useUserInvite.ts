import {
  postUserInviteQuery,
  PostUserUnclaimedPayload,
  postUserUnclaimedQuery,
} from "@/services/users";
import { MutationState } from "@/types/form";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

interface UseUserInviteProps {
  onSuccess: () => void;
  onError: () => void;
}

export default function useUserInvite({
  onSuccess,
  onError,
}: UseUserInviteProps) {
  const { mutateAsync: mutateUser, ...postUserQueryState } = useMutation(
    postUserUnclaimedQuery()
  );

  const { mutateAsync: mutateUserInvite, ...postUserInviteQueryState } =
    useMutation(postUserInviteQuery());

  const handleSubmit = useCallback(
    async (payload: PostUserUnclaimedPayload) => {
      try {
        const { data } = await mutateUser(payload);

        await mutateUserInvite(data);

        onSuccess();
      } catch (_) {
        onError();
      }
    },
    []
  );

  const queryState = getCombinedQueryState<MutationState>([
    postUserQueryState,
    postUserInviteQueryState,
  ]);

  return useMemo(
    () => ({
      queryState,
      handleSubmit,
    }),
    [queryState]
  );
}
