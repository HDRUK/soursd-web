"use client";

import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import PageSection from "@/modules/PageSection";
import { getEntityProjects } from "@/services/projects";
import { Box, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useStore, StoreState } from "@/data/store";
import Pagination from "@/components/Pagination";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import SearchBar from "@/modules/SearchBar";
import SearchActionMenu from "@/modules/SearchActionMenu";
import { SearchDirections } from "@/consts/search";
import { ProjectEntities } from "@/services/projects/getEntityProjects";
import { capitaliseFirstLetter } from "@/utils/string";
import ProjectList from "../ProjectList";
import ProjectsLegend from "../ProjectsLegend";
import getEntityProjectsQuery from "@/services/projects/getEntityProjectsQuery";
import Results from "@/components/Results";
import ContactLink from "@/components/ContactLink";

const NAMESPACE_TRANSLATIONS_PROJECT_LIST = "ProjectList";

type VariantConfig = {
  getId: (store: StoreState) => string | number | undefined;
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

interface ProjectsProps {
  variant: ProjectEntities;
}

export default function Projects({ variant }: ProjectsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_LIST);

  const store = useStore();
  const { getId } = variantConfig[variant];
  const entityId = getId(store);

  const {
    data: projectsData,
    last_page,
    page,
    total,
    setPage,
    updateQueryParam,
    handleSortToggle,
    handleFieldToggle,
    queryParams,
    ...queryState
  } = getEntityProjectsQuery(entityId, {
    variant,
    queryKeyBase: ["getProjects"],
    enabled: !!entityId,
  });

  const pagination = (
    <Pagination
      page={page}
      count={last_page}
      onChange={(_, page: number) => setPage(page)}
    />
  );

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
      <PageSection>
        <SearchFilters
          actions={[]}
          updateQueryParam={(text: string) =>
            updateQueryParam("organisation_name[]", text)
          }
          placeholder={t("searchPlaceholder")}
          legend={<ProjectsLegend />}
        />
      </PageSection>
      <PageSection>
        <Results
          queryState={queryState}
          noResultsMessage={t("noResultsProjects")}
          pagination={pagination}
          errorMessage={t.rich("erroResultsProjects", {
            contactLink: ContactLink,
          })}
          count={total}>
          <ProjectList projects={projectsData} />
        </Results>
      </PageSection>
    </>
  );
}
