"use client";

import { ActionMenu } from "@/components/ActionMenu";
import ButtonToggle from "@/components/ButtonToggle";
import ProjectsAddUserModal from "@/components/ProjectsAddUserModal";
import PageSection from "@/modules/PageSection";
import ProjectUsersFilters, {
  ProjectUsersFilterKeys,
} from "@/modules/ProjectUsersFilters";
import ProjectUsersTable from "@/modules/ProjectUsersTable/ProjectUsersTable";
import ProjectUsersBoard from "@/organisms/ProjectUsersBoard";
import { usePaginatedCustodianProjectUsers } from "@/services/custodian_approvals";
import { EntityType } from "@/types/api";
import { CustodianProjectUser, WithRoutes } from "@/types/application";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import ViewColumnIconOutlined from "@mui/icons-material/ViewColumnOutlined";
import { Button } from "@mui/material";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ProjectUsersListActionMenuItems from "./ProjectUsersListActionMenuItems";

const NAMESPACE_TRANSLATIONS_PROJECT_USERS = "Projects.Users";

type ProjectUsersListProps = WithRoutes<{
  custodianId: number;
  projectId?: number;
  variant: EntityType;
}>;

export default function ProjectUsersList({
  projectId,
  custodianId,
  routes,
  variant,
}: ProjectUsersListProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_USERS);

  const [showListView, setShowListView] = useState(
    variant !== EntityType.CUSTODIAN
  );
  const [showAddModal, setShowAddModal] = useState(false);

  const {
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
  } = usePaginatedCustodianProjectUsers(custodianId, {
    defaultQueryParams: { project_id: projectId },
  });

  useEffect(() => {
    if (showListView) refetch();
  }, [showListView]);

  const actionMenuProps = {
    onDelete: () => refetch(),
    onPrimaryContactChange: () => refetch(),
    t,
  };

  const renderActionMenuCell = (
    info: CellContext<CustodianProjectUser, unknown>
  ) => {
    return (
      <ActionMenu>
        <ProjectUsersListActionMenuItems
          data={info.row.original.project_has_user}
          {...actionMenuProps}
        />
      </ActionMenu>
    );
  };

  const extraColumns: ColumnDef<CustodianProjectUser>[] =
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

          {projectId && (
            <>
              <ProjectsAddUserModal
                request={variant === EntityType.ORGANISATION}
                projectId={projectId}
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
              />{" "}
              <Button
                startIcon={<AddIcon />}
                onClick={() => {
                  setShowAddModal(true);
                }}>
                {" "}
                {variant === EntityType.ORGANISATION
                  ? t("requestAddNewMemberButton")
                  : t("addNewMemberButton")}
              </Button>
            </>
          )}
        </ProjectUsersFilters>
      </PageSection>
      <PageSection>
        {/* note this is using paginated data */}
        {!showListView ? (
          <ProjectUsersBoard
            custodianId={custodianId}
            custodianProjectUsers={custodianProjectUsers}
            routes={routes}
            {...actionMenuProps}
          />
        ) : (
          <ProjectUsersTable
            total={total}
            last_page={last_page}
            page={page}
            setPage={setPage}
            data={custodianProjectUsers}
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
