"use client";

import SortIcon from "@mui/icons-material/Sort";
import { useTranslations } from "next-intl";
import { PropsWithChildren, useMemo } from "react";
import useSort from "@/hooks/useSort/useSort";
import { FilterIcon } from "../../consts/icons";
import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import { CustodianProjectOrganisation } from "../../types/application";
import SearchActionMenu from "../SearchActionMenu";
import SearchBar from "../SearchBar";
import { Status } from "@/components/ChipStatus";
import useFilter from "@/hooks/useFilter";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export enum ProjectOrganisationsFilterKeys {
  STATUS = "status",
  SORT = "sort",
}

export interface ProjectOrganisationsFilterProps
  extends PropsWithChildren<
    Pick<
      PaginatedQueryReturn<CustodianProjectOrganisation>,
      | "updateQueryParams"
      | "resetQueryParams"
      | "handleSortToggle"
      | "handleFieldToggle"
      | "queryParams"
    >
  > {
  includeFilters?: ProjectOrganisationsFilterKeys[];
}

export default function ProjectOrganisationsFilters({
  children,
  handleSortToggle,
  handleFieldToggle,
  resetQueryParams,
  updateQueryParams,
  queryParams,
  includeFilters = [
    ProjectOrganisationsFilterKeys.STATUS,
    ProjectOrganisationsFilterKeys.SORT,
  ],
}: ProjectOrganisationsFilterProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);

  const hasFilter = (key: ProjectOrganisationsFilterKeys) => {
    return includeFilters.includes(key);
  };

  const { actions: sortActions } = useSort({
    queryParams,
    items: [
      {
        label: t("sortByOrganisationName"),
        key: "organisation_name",
      },
    ],
    onSort: (key: string, direction: string) =>
      handleSortToggle(key, direction),
  });

  const { actions: filterStatusActions } = useFilter({
    queryParams,
    items: [
      {
        label: tApplication("status_registered"),
        key: "filter",
        value: Status.REGISTERED,
      },
    ],
    onFilter: (key: string, value: string) =>
      handleFieldToggle(key, [value, ""]),
  });

  return (
    <SearchBar
      onClear={resetQueryParams}
      onSearch={(text: string) => {
        updateQueryParams({
          "organisation_name[]": text,
        });
      }}
      placeholder={t("searchPlaceholder")}>
      {hasFilter(ProjectOrganisationsFilterKeys.SORT) && (
        <SearchActionMenu
          actions={sortActions}
          startIcon={<SortIcon />}
          renderedSelectedLabel={tApplication("sortedBy")}
          renderedDefaultLabel={tApplication("sortBy")}
          aria-label={tApplication("sortBy")}
        />
      )}
      {hasFilter(ProjectOrganisationsFilterKeys.STATUS) && (
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
