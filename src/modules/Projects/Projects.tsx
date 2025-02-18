"use client";

import ContactLink from "@/components/ContactLink";
import Pagination from "@/components/Pagination";
import Results from "@/components/Results";
import { SearchDirections } from "@/consts/search";
import { StoreState, useStore } from "@/data/store";
import PageSection from "@/modules/PageSection";
import SearchBar from "@/modules/SearchBar";
import { ProjectEntities } from "@/services/projects/getEntityProjects";
import useEntityProjectsQuery from "@/services/projects/useEntityProjectsQuery";
import { getSearchSortOrder } from "@/utils/query";
import { useTranslations } from "next-intl";
import ProjectList from "../ProjectList";
import ProjectsLegend from "../ProjectsLegend";
import PageBody from "../PageBody";

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
    {
      label: t("sortActions.active"),
      onClick: () => handleFieldToggle("active", ["1", ""]),
      checked: queryParams.active === "1",
    },
    {
      label: t("sortActions.notActive"),
      onClick: () => handleFieldToggle("active", ["0", ""]),
      checked: queryParams.active === "0",
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
          actions={searchActions}
          updateQueryParam={(text: string) => updateQueryParam("title[]", text)}
          placeholder={t("searchPlaceholder")}
          legend={<ProjectsLegend />}
        />
      </PageSection>
      <PageSection>
        <Results
          queryState={queryState}
          noResultsMessage={t("noResultsProjects")}
          pagination={pagination}
          errorMessage={t.rich("errorResultsProjects", {
            contactLink: ContactLink,
          })}
          count={total}>
          <ProjectList projects={projectsData} />
        </Results>
      </PageSection>
    </PageBody>
  );
}
