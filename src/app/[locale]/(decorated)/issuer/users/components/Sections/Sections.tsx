"use client";

import ContactLink from "@/components/ContactLink";
import OverlayCenter from "@/components/OverlayCenter";
import PageSection from "@/modules/PageSection";
import { getOrganisations } from "@/services/organisations";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useQuery, useQueryClient } from "react-query";
import UsersList from "../UsersList";
import { useCallback } from "react";
import {
  PostApprovalsPayload,
  PostApprovalsPayloadWithEntity,
} from "@/services/approvals";
import postApprovals from "@/services/approvals/postApprovals";
import { useMutationApprovals } from "../../hooks";
import { EntityType } from "@/types/api";
import { useNotifications } from "@/context/Notifications";

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
  } = useQuery(["getOrganisations"], async () =>
    getOrganisations({
      error: {
        message: "getOrganisations",
      },
    })
  );

  const { mutateAsync, isLoading, isError, error } = useMutationApprovals();

  useNotifications(["postApprovals"], {
    immediate: true,
    tKey: NAMESPACE_TRANSLATIONS_USERS_LIST,
  });

  const handleUpdateApproval = useCallback(
    async (payload: PostApprovalsPayloadWithEntity) => {
      await mutateAsync(payload);

      queryClient.refetchQueries(["getOrganisations"]);
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
          <Alert color="error" sx={{ mb: 3 }}>
            {tUsers.rich(`${orgainsationsError}`, {
              contactLink: ContactLink,
            })}
          </Alert>
        )}
        {!isOrganisationsLoading && organisationsData?.data.data && (
          <UsersList
            onApprove={handleUpdateApproval}
            organisations={organisationsData?.data.data}
            mutateState={{
              isError,
              isLoading,
              error,
            }}
          />
        )}
      </PageSection>
    </>
  );
}
