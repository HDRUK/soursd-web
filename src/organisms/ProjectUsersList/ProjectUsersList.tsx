"use client";

import PageSection from "@/modules/PageSection";
import ProjectUsersFilters, {
  ProjectUsersFilterKeys,
} from "@/modules/ProjectUsersFilters";
import ProjectUsersTable from "@/modules/ProjectUsersTable/ProjectUsersTable";
import ProjectUsersBoard from "@/organisms/ProjectUsersBoard";
import { usePaginatedCustodianProjectUsers } from "@/services/custodian_approvals";
import ListIcon from "@mui/icons-material/List";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

const NAMESPACE_TRANSLATIONS_PROJECT_USERS = "Projects.Users";

interface ProjectUsersListProps {
  custodianId: number;
  projectId?: number;
}

export default function ProjectUsersList({
  projectId,
  custodianId,
}: ProjectUsersListProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_USERS);

  const [showListView, setShowListView] = useState(false);

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
    queryParams,
    ...queryState
  } = usePaginatedCustodianProjectUsers(custodianId, {
    defaultQueryParams: { project_id: projectId },
  });

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
          <Button
            variant="outlined"
            startIcon={<ListIcon />}
            onClick={() => {
              setShowListView(!showListView);
            }}>
            {!showListView ? "Switch to list view" : "Switch to board view"}
          </Button>
        </ProjectUsersFilters>
      </PageSection>
      <PageSection>
        {/* note this is using paginated data */}
        {!showListView ? (
          <ProjectUsersBoard
            custodianId={custodianId}
            custodianProjectUsers={custodianProjectUsers}
          />
        ) : (
          <ProjectUsersTable
            total={total}
            last_page={last_page}
            page={page}
            setPage={setPage}
            data={custodianProjectUsers}
            queryState={queryState}
            isPaginated
            t={t}
          />
        )}
      </PageSection>
    </>
  );
}
