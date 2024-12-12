"use client";

import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import PageSection from "@/modules/PageSection";
import { getOrganisationProjects } from "@/services/projects";
import { CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useStore } from "@/data/store";
import StatusIndicator from "@/components/StatusIndicator";
import Pagination from "@/components/Pagination";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import SearchBar from "@/modules/SearchBar";
import SearchActionMenu from "@/modules/SearchActionMenu";
import ProjectList from "../ProjectList";
import ProjectsLegend from "../ProjectsLegend";

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
    handleSortToggle,
    handleFieldToggle,
    queryParams,
  } = usePaginatedQuery({
    queryKeyBase: "getOrganisationProjects",
    defaultQueryParams: {
      sort: "title:asc",
    },
    queryFn: queryParams =>
      getOrganisationProjects(organisationId, queryParams, {
        error: {
          message: "getOrganisationProjects",
        },
      }),
    enabled: !!organisationId,
  });

  const sortDirection =
    typeof queryParams?.sort === "string" && queryParams?.sort.split(":")[1];

  const searchActions = [
    {
      label: "Sort Alphabetical A-Z",
      onClick: () => handleSortToggle("title", "asc"),
      checked: sortDirection === "asc",
    },
    {
      label: "Sort Alphabetical Z-A",
      onClick: () => handleSortToggle("title", "desc"),
      checked: sortDirection === "desc",
    },
    {
      label: "Approved project",
      onClick: () => handleFieldToggle("approved", ["1", ""]),
      checked: queryParams.approved === "1",
    },
    {
      label: "Project pending approval",
      onClick: () => handleFieldToggle("approved", ["0", ""]),
      checked: queryParams.approved === "0",
    },
  ];

  return (
    <>
      {isProjectsLoading && (
        <OverlayCenter variant="contained">
          <CircularProgress aria-label={t("loadingAriaLabel")} />
        </OverlayCenter>
      )}
      <PageSection
        sx={{
          display: "flex",
          gap: 2,
        }}>
        <PageSection sx={{ display: "flex", flex: 1, maxHeight: 80 }}>
          <SearchBar
            onSearch={text => updateQueryParam("title[]", text)}
            placeholder={t("searchPlaceholder")}
          />
          <SearchActionMenu actions={searchActions} />
        </PageSection>
        <PageSection sx={{ display: "flex", flex: 1, gap: 2 }}>
          <ProjectsLegend />
          {/*<StatusIndicator
            variant="success"
            size="large"
            label={t("approvedKey")}
          />
          */}
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
