"use client";

import ContactLink from "@/components/ContactLink";
import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import { useNotifications } from "@/context/Notifications";
import PageSection from "@/modules/PageSection";
import {
  DeleteApprovalPayloadWithEntity,
  PostApprovalPayloadWithEntity,
} from "@/services/approvals";
import { getOrganisations } from "@/services/organisations";
import { CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutationApproval, useMutationDeleteApproval } from "../../hooks";
import OrganisationsList from "../OrganisationsList";

const NAMESPACE_TRANSLATIONS_USERS_LIST = "UsersList";
const NAMESPACE_TRANSLATIONS_USERS = "Users";

export default function Sections() {
  const queryClient = useQueryClient();
  const tUsersList = useTranslations(NAMESPACE_TRANSLATIONS_USERS_LIST);
  const tUsers = useTranslations(NAMESPACE_TRANSLATIONS_USERS);

  const {
    data: organisationsData,
    isLoading: isOrganisationsLoading,
    isError: isOrganisationsError,
    error: orgainsationsError,
  } = useQuery({
    queryKey: ["getOrganisations"],
    queryFn: () =>
      getOrganisations({
        error: {
          message: "getOrganisations",
        },
      }),
  });

  const {
    mutateAsync: mutateUpdateAsync,
    isPending: isUpdateLoading,
    isError: isUpdateError,
    error: errorUpdate,
  } = useMutationApproval();

  const {
    mutateAsync: mutateDeleteAsync,
    isPending: isDeleteLoading,
    isError: isDeleteError,
    error: errorDelete,
  } = useMutationDeleteApproval();

  useNotifications(["postApproval", "deleteApproval"], {
    immediate: true,
    tKey: NAMESPACE_TRANSLATIONS_USERS_LIST,
  });

  const handleApprove = useCallback(
    async (payload: PostApprovalPayloadWithEntity) => {
      await mutateUpdateAsync(payload);

      queryClient.refetchQueries({
        queryKey: ["getOrganisations"],
      });
    },
    []
  );

  const handleUnapprove = useCallback(
    async (payload: DeleteApprovalPayloadWithEntity) => {
      await mutateDeleteAsync(payload);

      queryClient.refetchQueries({
        queryKey: ["getOrganisations"],
      });
    },
    []
  );

  return (
    <>
      {isOrganisationsLoading && (
        <OverlayCenter variant="contained">
          <CircularProgress aria-label={tUsersList("loadingAriaLabel")} />
        </OverlayCenter>
      )}
      <PageSection sx={{ display: "flex" }}>
        <Typography variant="h4">{tUsersList("title")}</Typography>
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        {isOrganisationsError && (
          <Message severity="error" sx={{ mb: 3 }}>
            {tUsers.rich(`${orgainsationsError}`, {
              contactLink: ContactLink,
            })}
          </Message>
        )}
        {!isOrganisationsLoading && organisationsData?.data.data && (
          <OrganisationsList
            onApprove={handleApprove}
            onUnapprove={handleUnapprove}
            organisations={organisationsData?.data.data}
            mutateState={{
              isError: isDeleteError || isUpdateError,
              isLoading: isDeleteLoading || isUpdateLoading,
              error: errorDelete || errorUpdate,
            }}
          />
        )}
      </PageSection>
    </>
  );
}
