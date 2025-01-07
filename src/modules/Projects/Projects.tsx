"use client";

import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import PageSection from "@/modules/PageSection";
import { getEntityProjects } from "@/services/projects";
import { CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useStore } from "@/data/store";
import Pagination from "@/components/Pagination";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import SearchBar from "@/modules/SearchBar";
import SearchActionMenu from "@/modules/SearchActionMenu";
import { SearchDirections } from "@/consts/search";
import ProjectList from "../ProjectList";
import ProjectsLegend from "../ProjectsLegend";
import { ProjectEntities } from "@/services/projects/getEntityProjects";

const NAMESPACE_TRANSLATIONS_PROJECT_LIST = "ProjectList";

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type QueryFn = (
  id: number | undefined,
  queryParams: Record<string, any>,
  options: { error: { message: string } }
) => Promise<any>;

interface ProjectsProps {
  variant: ProjectEntities;
}

type VariantConfig = {
  getId: (store: any) => string | undefined;
};

const variantConfig: Record<ProjectEntities, VariantConfig> = {
  organisation: {
    getId: store => {
      const organisation = store.getOrganisation();
      return organisation?.id;
    },
  },
  custodian: {
    getId: store => {
      const custodian = store.getCustodian();
      return custodian?.id;
    },
  },
};

export default function Projects({ variant }: ProjectsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_LIST);

  const store = useStore();
  const { getId } = variantConfig[variant];
  const entityId = getId(store);

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
    queryKeyBase: [`get${capitalizeFirstLetter(variant)}Projects`],
    defaultQueryParams: {
      sort: `title:${SearchDirections.ASC}`,
    },
    queryFn: queryParams =>
      getEntityProjects(variant, entityId as unknown as number, queryParams, {
        error: {
          message: `get${capitalizeFirstLetter(variant)}Projects`,
        },
      }),
    enabled: !!entityId,
  });

  const sortDirection =
    typeof queryParams?.sort === "string" && queryParams?.sort.split(":")[1];

  const searchActions = [
    {
      label: t("sortActions.AZ"),
      onClick: () => handleSortToggle("title", SearchDirections.ASC),
      checked: sortDirection === SearchDirections.ASC,
    },
    {
      label: t("sortActions.ZA"),
      onClick: () => handleSortToggle("title", SearchDirections.DESC),
      checked: sortDirection === SearchDirections.DESC,
    },
    {
      label: t("sortActions.approved"),
      onClick: () => handleFieldToggle("approved", ["1", ""]),
      checked: queryParams.approved === "1",
    },
    {
      label: t("sortActions.pending"),
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
          flexDirection: "column",
          gap: 2,
        }}>
        <PageSection
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            flex: 1,
            maxHeight: 80,
          }}>
          <SearchBar
            onSearch={text => updateQueryParam("title[]", text)}
            placeholder={t("searchPlaceholder")}
          />
          <SearchActionMenu
            actions={searchActions}
            sx={{ justifySelf: "start", my: "auto" }}
          />
        </PageSection>
        <PageSection sx={{ display: "flex", flex: 1, gap: 2 }}>
          <ProjectsLegend />
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
