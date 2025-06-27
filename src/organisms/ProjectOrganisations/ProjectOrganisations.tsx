"use client";

import ButtonToggle from "@/components/ButtonToggle";
import useProjectEntity from "@/hooks/useProjectEntity";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { KanbanBoardHelperProps } from "@/modules/KanbanBoard";
import PageSection from "@/modules/PageSection";
import ProjectOrganisationsFilters, {
  ProjectOrganisationsFilterKeys,
} from "@/modules/ProjectOrganisationsFilters";
import ProjectOrganisationsBoard from "@/organisms/ProjectOrganisationsBoard";
import {
  putCustodianProjectOrganisationQuery,
  usePaginatedCustodianProjectOrganisations,
} from "@/services/custodian_approvals";
import { EntityType } from "@/types/api";
import { CustodianProjectOrganisation, WithRoutes } from "@/types/application";
import ListIcon from "@mui/icons-material/List";
import ViewColumnIconOutlined from "@mui/icons-material/ViewColumnOutlined";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import Results from "@/components/Results";
import ProjectOrganisationsList from "../ProjectOrganisationsList";
import ProjectOrganisationsActions from "./ProjectOrganisationsActions";

const NAMESPACE_TRANSLATIONS_PROJECT_USERS = "Projects.Organisations";

type ProjectOrganisationsListProps = WithRoutes<{
  custodianId: number;
  variant: EntityType;
}>;

export default function ProjectOrganisations({
  custodianId,
  routes,
  variant,
}: ProjectOrganisationsListProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_USERS);

  const [showListView, setShowListView] = useState(
    variant !== EntityType.CUSTODIAN
  );

  const {
    query: {
      data: custodianProjectOrganisations,
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
      usePaginatedCustodianProjectOrganisations(custodianId),
    variant: EntityType.ORGANISATION,
  });

  const {
    mutateAsync: changeValidationStatus,
    ...updateValidationMutationState
  } = useMutation(putCustodianProjectOrganisationQuery(custodianId));

  const { isError, isSuccess, reset } = updateValidationMutationState;

  useQueryAlerts(updateValidationMutationState, {
    showOnlyError: true,
  });

  const handleUpdateOrganisation = useCallback(
    async (id: number, status: string) => {
      await changeValidationStatus({
        params: {
          projectOrganisationId: id,
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
      data: custodianProjectOrganisations,
      routes,
      itemsByTransitions,
      onMove: handleUpdateOrganisation,
      onDragEnd: handleUpdateOrganisation,
      actions: (
        props: KanbanBoardHelperProps<CustodianProjectOrganisation>
      ) => (
        <ProjectOrganisationsActions
          t={t}
          onMoveClick={async (id, status) => {
            handleUpdateOrganisation(id, status);
          }}
          allowedTransitions={getAllowedTransitions(
            props.data.model_state.state.slug
          )}
          {...props}
        />
      ),
      getAllowedTransitions,
      updateQueryState,
    }),
    [
      showListView,
      custodianProjectOrganisations,
      itemsByTransitions,
      routes,
      t,
      getAllowedTransitions,
    ]
  );

  const listComponent = !showListView ? (
    <ProjectOrganisationsBoard
      options={{
        isTransitionAllowed,
      }}
      {...commonProps}
    />
  ) : (
    <ProjectOrganisationsList
      {...commonProps}
      total={total}
      last_page={last_page}
      page={page}
      setPage={setPage}
      queryState={queryState}
      isPaginated
      variant={variant}
      t={t}
    />
  );

  console.log("itemsByTransitions", itemsByTransitions);

  return (
    <>
      <PageSection>
        <ProjectOrganisationsFilters
          includeFilters={
            !showListView
              ? [ProjectOrganisationsFilterKeys.STATUS]
              : [
                  ProjectOrganisationsFilterKeys.SORT,
                  ProjectOrganisationsFilterKeys.STATUS,
                ]
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
        </ProjectOrganisationsFilters>
      </PageSection>
      <PageSection>
        <Results
          total={total}
          noResultsMessage={t("noResultsMessage")}
          errorMessage={t("errorMessage")}
          queryState={queryState}>
          {itemsByTransitions && listComponent}
        </Results>
      </PageSection>
    </>
  );
}
