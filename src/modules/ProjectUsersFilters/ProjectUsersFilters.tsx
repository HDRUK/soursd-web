"use client";

import SortIcon from "@mui/icons-material/Sort";
import { useTranslations } from "next-intl";
import { PropsWithChildren, useMemo } from "react";
import { FilterIcon } from "../../consts/icons";
import { SearchDirections } from "../../consts/search";
import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import { CustodianProjectUser } from "../../types/application";
import { getSearchSortOrder } from "../../utils/query";
import SearchActionMenu from "../SearchActionMenu";
import SearchBar from "../SearchBar";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export enum ProjectUsersFilterKeys {
  STATUS = "status",
  SORT = "sort",
}

export interface ProjectUsersFilterProps
  extends PropsWithChildren<
    Pick<
      PaginatedQueryReturn<CustodianProjectUser>,
      | "updateQueryParams"
      | "resetQueryParams"
      | "handleSortToggle"
      | "handleFieldToggle"
      | "queryParams"
    >
  > {
  includeFilters?: ProjectUsersFilterKeys[];
}

export default function ProjectUsersFilters({
  children,
  handleSortToggle,
  handleFieldToggle,
  resetQueryParams,
  updateQueryParams,
  queryParams,
  includeFilters = [ProjectUsersFilterKeys.STATUS, ProjectUsersFilterKeys.SORT],
}: ProjectUsersFilterProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);

  const hasFilter = (key: ProjectUsersFilterKeys) => {
    return includeFilters.includes(key);
  };

  const sortDirection = getSearchSortOrder(queryParams);

  const sortActions = [
    {
      label: t("sortActions.AZ"),
      onClick: () => handleSortToggle("first_name", SearchDirections.ASC),
      checked: sortDirection === SearchDirections.ASC,
    },
    {
      label: t("sortActions.ZA"),
      onClick: () => handleSortToggle("first_name", SearchDirections.DESC),
      checked: sortDirection === SearchDirections.DESC,
    },
  ];

  const filterStatusActions = useMemo(
    () => [
      {
        label: tApplication("status_registered"),
        onClick: () => handleFieldToggle("status", ["registered", ""]),
        checked: queryParams.status === "registered",
      },
    ],
    [queryParams, handleFieldToggle, t]
  );

  return (
    <SearchBar
      onClear={resetQueryParams}
      onSearch={(text: string) => {
        updateQueryParams({
          "first_name[]": text,
          "last_name[]": text,
          "email[]": text,
        });
      }}
      placeholder={t("searchPlaceholder")}>
      {hasFilter(ProjectUsersFilterKeys.SORT) && (
        <SearchActionMenu
          actions={sortActions}
          startIcon={<SortIcon />}
          renderedSelectedLabel={tApplication("sortedBy")}
          renderedDefaultLabel={tApplication("sortBy")}
          aria-label={tApplication("sortBy")}
        />
      )}
      {hasFilter(ProjectUsersFilterKeys.STATUS) && (
        <SearchActionMenu
          actions={filterStatusActions}
          multiple
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={tApplication("filterByProjectStatus")}
          aria-label={tApplication("filterByProjectStatus")}
        />
      )}
      {children}
    </SearchBar>
  );
}
