"use client";

import SortIcon from "@mui/icons-material/Sort";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import useSort from "@/hooks/useSort";
import { Status } from "../../components/ChipStatus";
import { FilterIcon } from "../../consts/icons";
import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import SearchBar from "../SearchBar";
import { ResearcherProject } from "../../types/application";
import SearchActionMenu from "../SearchActionMenu";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export enum ProjectFilterKeys {
  DATE = "date",
  STATUS = "status",
}

export interface ProjectsFiltersProps
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
}: ProjectsFiltersProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);

  const hasFilter = (key: ProjectFilterKeys) => {
    return includeFilters.includes(key);
  };

  const { actions: sortActions } = useSort({
    queryParams,
    items: [
      {
        label: t("sortByProjectTitle"),
        key: "title",
      },
    ],
    onSort: (key: string, direction: string) =>
      handleSortToggle(key, direction),
  });

  const filterDateActions = [
    {
      label: t("filterActions.pastProjects"),
      onClick: () => handleFieldToggle("active", ["1", undefined]),
    },
    {
      label: t("filterActions.activeProjects"),
      onClick: () => handleFieldToggle("active", ["0", undefined]),
    },
  ];

  const filterStatusActions = useMemo(
    () => [
      {
        label: t("filterActions.approved"),
        onClick: () =>
          handleFieldToggle(
            "filter",
            [Status.PROJECT_APPROVED, undefined],
            true
          ),
        checked: queryParams.filter === Status.PROJECT_APPROVED,
      },
      {
        label: t("filterActions.pending"),
        onClick: () =>
          handleFieldToggle(
            "filter",
            [Status.PROJECT_PENDING, undefined],
            true
          ),
        checked: queryParams.filter === Status.PROJECT_PENDING,
      },
      {
        label: t("filterActions.completed"),
        onClick: () =>
          handleFieldToggle(
            "filter",
            [Status.PROJECT_COMPLETED, undefined],
            true
          ),
        checked: queryParams.filter === Status.PROJECT_COMPLETED,
      },
    ],
    [queryParams, handleFieldToggle, t]
  );

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
          onClear={() => handleFieldToggle("active", [undefined, undefined])}
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
