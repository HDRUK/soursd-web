"use client";

import ButtonToggle from "@/components/ButtonToggle";
import ProjectsAddUserModal from "@/components/ProjectsAddUserModal";
import useProjectEntity from "@/hooks/useProjectEntity";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { KanbanBoardHelperProps } from "@/modules/KanbanBoard";
import PageSection from "@/modules/PageSection";
import ProjectUsersFilters, {
  ProjectUsersFilterKeys,
} from "@/modules/ProjectUsersFilters";
import ProjectUsersBoard from "@/organisms/ProjectUsersBoard";
import {
  putCustodianProjectUserQuery,
  usePaginatedCustodianProjectUsers,
} from "@/services/custodian_approvals";
import { EntityType } from "@/types/api";
import { CustodianProjectUser, WithRoutes } from "@/types/application";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import ViewColumnIconOutlined from "@mui/icons-material/ViewColumnOutlined";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import Results from "@/components/Results";
import ProjectUsersActions from "./ProjectUsersActions";
import ProjectUsersList from "../ProjectUsersList";

const NAMESPACE_TRANSLATIONS_PROJECT_USERS = "Projects.Users";

type ProjectUsersListProps = WithRoutes<{
  custodianId: number;
  projectId?: number;
  variant: EntityType;
}>;

export default function ProjectUsers({
  custodianId,
  projectId,
  routes,
  variant,
}: ProjectUsersListProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_USERS);

  const [showListView, setShowListView] = useState(
    variant !== EntityType.CUSTODIAN
  );

  const [showAddModal, setShowAddModal] = useState(false);

  const {
    query: {
      data: custodianProjectUsers,
      page,
      last_page,
      total,
      setPage,
      updateQueryParams,
      resetQueryParams,
      handleSortToggle,
      handleFieldToggle,
      refetch,
      queryParams,
      ...queryState
    },
    helpers: { isTransitionAllowed, itemsByTransitions, getAllowedTransitions },
  } = useProjectEntity({
    usePaginatedQuery: () =>
      usePaginatedCustodianProjectUsers(custodianId, {
        defaultQueryParams: {
          project_id: projectId,
        },
      }),
    variant: EntityType.USER,
  });

  const {
    mutateAsync: changeValidationStatus,
    ...updateValidationMutationState
  } = useMutation(putCustodianProjectUserQuery(custodianId));

  const { isError, isSuccess, reset } = updateValidationMutationState;

  useQueryAlerts(updateValidationMutationState, {
    showOnlyError: true,
  });

  const handleUpdateSafePeople = useCallback(
    async (id: number, status: string) => {
      await changeValidationStatus({
        params: {
          projectUserId: id,
        },
        payload: {
          status,
          comment: "status change",
        },
      });

      if (showListView) {
        refetch();
      }
    },
    [showListView]
  );

  useEffect(() => {
    if (showListView) refetch();
  }, [showListView]);

  const filterProps = {
    resetQueryParams,
    updateQueryParams,
    handleSortToggle,
    handleFieldToggle,
    queryParams,
    isTransitionAllowed,
  };

  const updateQueryState = { isError, isSuccess, reset };

  const commonProps = useMemo(
    () => ({
      data: custodianProjectUsers,
      routes,
      itemsByTransitions,
      onMove: handleUpdateSafePeople,
      onDragEnd: handleUpdateSafePeople,
      actions: (props: KanbanBoardHelperProps<CustodianProjectUser>) => {
        return (
          <ProjectUsersActions
            onDelete={() => refetch()}
            onPrimaryContactChange={() => refetch()}
            t={t}
            onMoveClick={async (id, status) => {
              handleUpdateSafePeople(id, status);
            }}
            allowedTransitions={getAllowedTransitions(
              props.data.model_state.state.slug
            )}
            {...props}
          />
        );
      },
      getAllowedTransitions,
      updateQueryState,
    }),
    [showListView, custodianProjectUsers, itemsByTransitions, routes, t]
  );

  const listComponent = !showListView ? (
    <ProjectUsersBoard
      options={{
        isTransitionAllowed,
      }}
      {...commonProps}
    />
  ) : (
    <ProjectUsersList
      {...commonProps}
      total={total}
      last_page={last_page}
      page={page}
      setPage={setPage}
      isPaginated
      variant={variant}
      t={t}
    />
  );

  return (
    <>
      <PageSection>
        <ProjectUsersFilters
          includeFilters={
            !showListView
              ? [ProjectUsersFilterKeys.STATUS]
              : [ProjectUsersFilterKeys.SORT, ProjectUsersFilterKeys.STATUS]
          }
          {...filterProps}>
          {variant === EntityType.CUSTODIAN && (
            <ButtonToggle
              toggleOffButtonProps={{
                startIcon: <ListIcon />,
                label: "Switch to list view",
              }}
              toggleOnButtonProps={{
                startIcon: <ViewColumnIconOutlined />,
                label: "Switch to board view",
              }}
              onToggle={setShowListView}
            />
          )}
          {variant !== EntityType.USER && projectId && (
            <Button
              startIcon={<AddIcon />}
              onClick={() => {
                setShowAddModal(true);
              }}>
              {variant === EntityType.ORGANISATION
                ? t("requestAddNewMemberButton")
                : t("addNewMemberButton")}
            </Button>
          )}
        </ProjectUsersFilters>
      </PageSection>

      {projectId && (
        <ProjectsAddUserModal
          request={variant === EntityType.ORGANISATION}
          projectId={projectId}
          custodianId={custodianId}
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {itemsByTransitions && (
        <PageSection>
          <Results
            total={total}
            noResultsMessage={
              projectId ? t("noResultsMessageProject") : t("noResultsMessage")
            }
            errorMessage={t("errorMessage")}
            queryState={queryState}>
            {/* note this is using paginated data */}
            {itemsByTransitions && listComponent}
          </Results>
        </PageSection>
      )}
    </>
  );
}
