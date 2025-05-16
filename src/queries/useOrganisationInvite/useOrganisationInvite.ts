import { MutationState } from "@/types/form";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import {
  postOrganisationInviteQuery,
  PostOrganisationUnclaimedPayload,
  postOrganisationUnclaimedQuery,
} from "../../services/organisations";

interface UseOrganisationInviteProps {
  onSuccess: () => void;
  onError: () => void;
}

export default function useOrganisationInvite({
  onSuccess,
  onError,
}: UseOrganisationInviteProps) {
  const {
    mutateAsync: mutateOrganisationUnclaimed,
    ...postOrganisationUnclaimedQueryState
  } = useMutation(postOrganisationUnclaimedQuery());

  const {
    mutateAsync: mutateOrganisationInvite,
    ...postOrganisationInviteQueryState
  } = useMutation(postOrganisationInviteQuery());

  const handleSubmit = useCallback(
    async (organisation: PostOrganisationUnclaimedPayload) => {
      try {
        const { data: id } = await mutateOrganisationUnclaimed(organisation);

        await mutateOrganisationInvite(id);

        onSuccess();
      } catch (_) {
        onError();
      }
    },
    []
  );

  const queryState = getCombinedQueryState<MutationState>([
    postOrganisationUnclaimedQueryState,
    postOrganisationInviteQueryState,
  ]);

  return useMemo(
    () => ({
      queryState,
      handleSubmit,
    }),
    [queryState]
  );
}
