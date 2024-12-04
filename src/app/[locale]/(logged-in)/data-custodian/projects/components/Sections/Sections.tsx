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
import { getIssuerProjects } from "@/services/projects";
import { CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/data/store";
import { ISSUER_ID } from "@/consts/application";
import { useMutationApproval, useMutationDeleteApproval } from "../../hooks";
import ProjectList from "../ProjectList";

const NAMESPACE_TRANSLATIONS_USERS_LIST = "UsersList";
const NAMESPACE_TRANSLATIONS_USERS = "Users";

export default function Sections() {
  const queryClient = useQueryClient();
  const tUsersList = useTranslations(NAMESPACE_TRANSLATIONS_USERS_LIST);
  const tUsers = useTranslations(NAMESPACE_TRANSLATIONS_USERS);

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectsError,
  } = useQuery({
    queryKey: ["getIssuerProjects"],
    queryFn: () =>
      getIssuerProjects(ISSUER_ID, {
        error: {
          message: "getIssuerProjects",
        },
      }),
  });

  /*
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
  */
  const handleApprove = () => {};
  const handleUnapprove = () => {};

  return (
    <>
      {isProjectsLoading && (
        <OverlayCenter variant="contained">
          <CircularProgress aria-label={tUsersList("loadingAriaLabel")} />
        </OverlayCenter>
      )}
      <PageSection sx={{ display: "flex" }}>
        <Typography variant="h4">{tUsersList("title")}</Typography>
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        {isProjectsError && (
          <Message severity="error" sx={{ mb: 3 }}>
            {tUsers.rich(`${projectsError}`, {
              contactLink: ContactLink,
            })}
          </Message>
        )}
        {!isProjectsLoading && projectsData?.data.data && (
          <ProjectList
            onApprove={handleApprove}
            onUnapprove={handleUnapprove}
            projects={projectsData?.data.data}
            mutateState={
              {
                // isError: isDeleteError || isUpdateError,
                // isLoading: isDeleteLoading || isUpdateLoading,
                // error: errorDelete || errorUpdate,
              }
            }
          />
        )}
      </PageSection>
    </>
  );

  {
    /* <OrganisationsList
            onApprove={handleApprove}
            onUnapprove={handleUnapprove}
            organisations={projectsData?.data.data}
            mutateState={{
              isError: isDeleteError || isUpdateError,
              isLoading: isDeleteLoading || isUpdateLoading,
              error: errorDelete || errorUpdate,
            }}
          /> */
  }
}
