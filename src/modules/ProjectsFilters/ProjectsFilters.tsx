"use client";

import SortIcon from "@mui/icons-material/Sort";
import { useTranslations } from "next-intl";
import { ResearcherProject } from "../../types/application";
import { FilterIcon } from "../../consts/icons";
import { SearchDirections } from "../../consts/search";
import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import { getSearchSortOrder } from "../../utils/query";
import SearchBar from "../SearchBar";
import SearchActionMenu from "../SearchActionMenu";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export enum ProjectFilterKeys {
  DATE = "date",
  STATUS = "status",
}

export interface ProjectsProps
  extends Pick<
    PaginatedQueryReturn<ResearcherProject>,
    | "updateQueryParams"
    | "resetQueryParams"
    | "handleSortToggle"
    | "handleFieldToggle"
    | "queryParams"
  > {
  includeFilters?: ProjectFilterKeys[];
}

export default function ProjectsFilters({
  handleSortToggle,
  handleFieldToggle,
  resetQueryParams,
  updateQueryParams,
  queryParams,
  includeFilters = [ProjectFilterKeys.DATE, ProjectFilterKeys.STATUS],
}: ProjectsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);

  const hasFilter = (key: ProjectFilterKeys) => {
    return includeFilters.includes(key);
  };

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

  return (
    <SearchBar
      onClear={resetQueryParams}
      onSearch={(text: string) => {
        updateQueryParams({
          "title[]": text,
        });
      }}
      placeholder={t("searchPlaceholder")}>
      <SearchActionMenu
        actions={sortActions}
        startIcon={<SortIcon />}
        renderedSelectedLabel={tApplication("sortedBy")}
        renderedDefaultLabel={tApplication("sortBy")}
        aria-label={tApplication("sortBy")}
      />
      {hasFilter(ProjectFilterKeys.DATE) && (
        <SearchActionMenu
          actions={filterDateActions}
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={tApplication("filterByDate")}
          aria-label={tApplication("filterByDate")}
        />
      )}
      {hasFilter(ProjectFilterKeys.STATUS) && (
        <SearchActionMenu
          actions={filterStatusActions}
          multiple
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={tApplication("filterByProjectStatus")}
          aria-label={tApplication("filterByProjectStatus")}
        />
      )}
    </SearchBar>
  );
}
