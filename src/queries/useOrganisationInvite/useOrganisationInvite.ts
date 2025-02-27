import {
  postOrganisationInviteQuery,
  PostOrganisationUnclaimedPayload,
  postOrganisationUnclaimedQuery,
} from "@/services/organisations";
import { MutationState } from "@/types/form";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

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
        console.log("*** ORGANISATION invite payload", organisation);
        const { data: id } = await mutateOrganisationUnclaimed(organisation);

        console.log("*** ORGANISATION id", id);
        const inviteResponse = await mutateOrganisationInvite(id);

        console.log("*** ORGANISATION response", inviteResponse);

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
