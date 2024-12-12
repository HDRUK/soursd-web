"use client";

import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import PageSection from "@/modules/PageSection";
import { getOrganisationProjects } from "@/services/projects";
import { CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import StatusIndicator from "@/components/StatusIndicator";
import Pagination from "@/components/Pagination";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import SearchBar from "@/components/SearchBar";
import { useStore } from "@/data/store";
import SortButton from "@/components/SortButton";
import ProjectList from "../ProjectList";

const NAMESPACE_TRANSLATIONS_PROJECT_LIST = "ProjectList";

export default function Sections() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_LIST);

  const organisation = useStore(store => store.getOrganisation());
  const { id: organisationId } = organisation || {};

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    last_page,
    page,
    setPage,
    updateQueryParam,
  } = usePaginatedQuery({
    queryKeyBase: "getOrganisationProjects",
    queryFn: queryParams =>
      getOrganisationProjects(organisationId, queryParams, {
        error: {
          message: "getOrganisationProjects",
        },
      }),
    enabled: !!organisationId,
  });

  const [sortTitleDirection, setSortTitleDirection] = useState<string | null>(
    "asc"
  );
  const [approvalStatus, setApprovalStatus] = useState<boolean | null>(null);

  const handleApprovalToggle = (status: boolean) => {
    const newStatus = approvalStatus === status ? null : status;
    setApprovalStatus(newStatus);
    updateQueryParam(
      "approved",
      newStatus === null ? "" : newStatus === true ? "1" : "0"
    );
  };

  const handleSortToggle = (field: string, direction: string) => {
    const newDirection = sortTitleDirection === direction ? null : direction;
    setSortTitleDirection(newDirection);
    updateQueryParam(
      "sort",
      newDirection === null ? "" : `${field}:${newDirection}`
    );
  };

  const searchActions = [
    {
      label: "Sort Alphabetical A-Z",
      onClick: () => handleSortToggle("title", "asc"),
      checked: sortTitleDirection === "asc",
    },
    {
      label: "Sort Alphabetical Z-A",
      onClick: () => handleSortToggle("title", "desc"),
      checked: sortTitleDirection === "desc",
    },
    {
      label: "Approved project",
      onClick: () => handleApprovalToggle(true),
      checked: approvalStatus === true,
    },
    {
      label: "Project pending approval",
      onClick: () => handleApprovalToggle(false),
      checked: approvalStatus === false,
    },
  ];

  return (
    <>
      {isProjectsLoading && (
        <OverlayCenter variant="contained">
          <CircularProgress aria-label={t("loadingAriaLabel")} />
        </OverlayCenter>
      )}
      <PageSection sx={{ display: "flex" }}>
        <Typography variant="h4">{t("title")}</Typography>
      </PageSection>
      <PageSection
        sx={{
          display: "flex",
          gap: 2,
        }}>
        <PageSection sx={{ display: "flex", flex: 1 }}>
          <SearchBar
            onSearch={text => updateQueryParam("title[]", text)}
            placeholder={t("searchPlaceholder")}
          />
          <SortButton actions={searchActions} />
        </PageSection>
        <PageSection sx={{ display: "flex", flex: 1, gap: 2 }}>
          <StatusIndicator
            variant="success"
            size="large"
            label={t("approvedKey")}
          />
          <StatusIndicator
            variant="error"
            size="large"
            label={t("unapprovedKey")}
          />
        </PageSection>
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        {isProjectsError && (
          <Message severity="error" sx={{ mb: 3 }}>
            {t("getOrganisationProjectsError")}
          </Message>
        )}
        {!isProjectsLoading && projectsData && (
          <ProjectList projects={projectsData} />
        )}
      </PageSection>
      <PageSection
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}>
        <Pagination
          isLoading={isProjectsLoading}
          page={page}
          count={last_page}
          onChange={(e: React.ChangeEvent<unknown>, page: number) =>
            setPage(page)
          }
        />
      </PageSection>
    </>
  );
}
