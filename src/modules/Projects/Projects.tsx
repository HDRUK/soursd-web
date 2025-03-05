"use client";

import ContactLink from "@/components/ContactLink";
import Pagination from "@/components/Pagination";
import Results from "@/components/Results";
import { FilterIcon } from "@/consts/icons";
import { SearchDirections } from "@/consts/search";
import { StoreState, useStore } from "@/data/store";
import PageSection from "@/modules/PageSection";
import SearchBar from "@/modules/SearchBar";
import { ProjectEntities } from "@/services/projects/getEntityProjects";
import useEntityProjectsQuery from "@/services/projects/useEntityProjectsQuery";
import { getSearchSortOrder } from "@/utils/query";
import SortIcon from "@mui/icons-material/Sort";
import { useTranslations } from "next-intl";
import PageBody from "../PageBody";
import ProjectList from "../ProjectList";
import ProjectsLegend from "../ProjectsLegend";
import SearchActionMenu from "../SearchActionMenu";

const NAMESPACE_TRANSLATIONS_PROJECT_LIST = "ProjectList";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

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
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);

  const store = useStore();
  const { getId } = variantConfig[variant];
  const entityId = getId(store);

  const {
    data: projectsData,
    last_page,
    total,
    page,
    setPage,
    updateQueryParam,
    handleSortToggle,
    handleFieldToggle,
    queryParams,
    ...queryState
  } = useEntityProjectsQuery(entityId, {
    variant,
    queryKeyBase: ["getProjects"],
    enabled: !!entityId,
  });

  const sortDirection = getSearchSortOrder(queryParams);

  const sortActions = [
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
  ];

  const filterDateActions = [
    {
      label: t("filterActions.pastProjects"),
      onClick: () => handleFieldToggle("active", ["1", ""]),
      checked: queryParams.approved === "1",
    },
    {
      label: t("filterActions.activeProjects"),
      onClick: () => handleFieldToggle("active", ["0", ""]),
      checked: queryParams.approved === "0",
    },
  ];

  const filterStatusActions = [
    {
      label: t("filterActions.approved"),
      onClick: () => handleFieldToggle("approved", ["1", ""]),
      checked: queryParams.approved === "1",
    },
    {
      label: t("filterActions.pending"),
      onClick: () => handleFieldToggle("pending", ["1", ""]),
      checked: queryParams.pending === "1",
    },
    {
      label: t("filterActions.completed"),
      onClick: () => handleFieldToggle("completed", ["1", ""]),
      checked: queryParams.active === "1",
    },
  ];

  const pagination = (
    <Pagination
      page={page}
      count={last_page}
      onChange={(_, page: number) => setPage(page)}
    />
  );

  return (
    <PageBody>
      <PageSection>
        <SearchBar
          updateQueryParam={(text: string) => updateQueryParam("title[]", text)}
          placeholder={t("searchPlaceholder")}
          legend={<ProjectsLegend />}>
          <SearchActionMenu
            actions={sortActions}
            startIcon={<SortIcon />}
            renderedSelectedLabel={tApplication("sortedBy")}
            renderedDefaultLabel={tApplication("sortBy")}
            aria-label={tApplication("sortBy")}
          />
          <SearchActionMenu
            actions={filterDateActions}
            startIcon={<FilterIcon />}
            renderedSelectedLabel={tApplication("filteredByDate")}
            renderedDefaultLabel={tApplication("filterByDate")}
            aria-label={tApplication("filterByDate")}
          />
          <SearchActionMenu
            actions={filterStatusActions}
            multiple
            startIcon={<FilterIcon />}
            renderedSelectedLabel={tApplication("filteredBy")}
            renderedDefaultLabel={tApplication("filterByProjectStatus")}
            aria-label={tApplication("filterByProjectStatus")}
          />
        </SearchBar>
      </PageSection>
      <PageSection>
        <Results
          queryState={queryState}
          noResultsMessage={t("noResultsProjects")}
          pagination={pagination}
          errorMessage={t.rich("errorResultsProjects", {
            contactLink: ContactLink,
          })}
          total={total}>
          <ProjectList projects={projectsData} />
        </Results>
      </PageSection>
    </PageBody>
  );
}
