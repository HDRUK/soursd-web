"use client";

import { ActionMenu } from "@/components/ActionMenu";
import ButtonToggle from "@/components/ButtonToggle";
import PageSection from "@/modules/PageSection";
import ProjectOrganisationsFilters, {
  ProjectOrganisationsFilterKeys,
} from "@/modules/ProjectOrganisationsFilters";
import ProjectOrganisationsTable from "@/modules/ProjectOrganisationsTable";
import ProjectOrganisationsBoard from "@/organisms/ProjectOrganisationsBoard";
import { usePaginatedCustodianProjectOrganisations } from "@/services/custodian_approvals";
import { EntityType } from "@/types/api";
import { CustodianProjectOrganisation, WithRoutes } from "@/types/application";
import ListIcon from "@mui/icons-material/List";
import ViewColumnIconOutlined from "@mui/icons-material/ViewColumnOutlined";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ProjectOrganisationsListActionMenuItems from "./ProjectOrganisationsListActionMenuItems";

const NAMESPACE_TRANSLATIONS_PROJECT_USERS = "Projects.Organisations";

type ProjectOrganisationsListProps = WithRoutes<{
  custodianId: number;
  projectId?: number;
  variant: EntityType;
}>;

export default function ProjectOrganisationsList({
  projectId,
  custodianId,
  routes,
  variant,
}: ProjectOrganisationsListProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_USERS);

  const [showListView, setShowListView] = useState(
    variant !== EntityType.CUSTODIAN
  );

  const {
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
  } = usePaginatedCustodianProjectOrganisations(custodianId, {
    defaultQueryParams: { project_id: projectId },
  });

  useEffect(() => {
    if (showListView) refetch();
  }, [showListView]);

  const actionMenuProps = {
    onDelete: () => refetch(),
    t,
  };

  const renderActionMenuCell = (
    info: CellContext<CustodianProjectOrganisation, unknown>
  ) => {
    return (
      <ActionMenu>
        <ProjectOrganisationsListActionMenuItems
          data={info.row.original.project_organisation}
          {...actionMenuProps}
        />
      </ActionMenu>
    );
  };

  const extraColumns: ColumnDef<CustodianProjectOrganisation>[] =
    variant === EntityType.CUSTODIAN
      ? [
          {
            header: t("actions"),
            cell: renderActionMenuCell,
          },
        ]
      : [];

  const filterProps = {
    resetQueryParams,
    updateQueryParams,
    handleSortToggle,
    handleFieldToggle,
    queryParams,
  };

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
        {/* note this is using paginated data */}
        {!showListView ? (
          <ProjectOrganisationsBoard
            custodianId={custodianId}
            custodianProjectOrganisations={custodianProjectOrganisations}
            routes={routes}
            {...actionMenuProps}
          />
        ) : (
          <ProjectOrganisationsTable
            total={total}
            last_page={last_page}
            page={page}
            setPage={setPage}
            data={custodianProjectOrganisations}
            queryState={queryState}
            extraColumns={extraColumns}
            isPaginated
            routes={routes}
            t={t}
          />
        )}
      </PageSection>
    </>
  );
}
