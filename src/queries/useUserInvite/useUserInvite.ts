import {
  PostOrganisationInviteUserPayload,
  postOrganisationInviteUserQuery,
} from "../../services/organisations";
import { postUserInviteQuery } from "../../services/users";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

interface UseUserInviteProps {
  organisationId?: number;
  onSuccess: () => void;
  onError: () => void;
}

export default function useUserInvite({
  organisationId,
  onSuccess,
  onError,
}: UseUserInviteProps) {
  const { mutateAsync: mutateUserInvite, ...postUserInviteQueryState } =
    useMutation(
      organisationId
        ? postOrganisationInviteUserQuery(organisationId)
        : postUserInviteQuery()
    );

  const handleSubmit = useCallback(
    async (payload: PostOrganisationInviteUserPayload) => {
      try {
        await mutateUserInvite(payload);

        onSuccess();
      } catch (_) {
        onError();
      }
    },
    []
  );

  return useMemo(
    () => ({
      queryState: postUserInviteQueryState,
      handleSubmit,
    }),
    [postUserInviteQueryState]
  );
}
