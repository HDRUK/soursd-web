"use client";

import { Status } from "@/components/ChipStatus";
import { FilterIcon } from "@/consts/icons";
import { SearchDirections } from "@/consts/search";
import { PaginatedQueryReturn } from "@/hooks/usePaginatedQuery";
import SearchBar from "@/modules/SearchBar";
import { Organisation } from "@/types/application";
import { getSearchSortOrder } from "@/utils/query";
import SortIcon from "@mui/icons-material/Sort";
import { useTranslations } from "next-intl";
import SearchActionMenu from "../SearchActionMenu";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Organisations";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export enum OrganisationsFilterKeys {
  STATUS = "status",
}

export interface OrganisationsFilterProps
  extends Pick<
    PaginatedQueryReturn<Organisation>,
    | "updateQueryParams"
    | "resetQueryParams"
    | "handleSortToggle"
    | "handleFieldToggle"
    | "queryParams"
  > {
  includeFilters?: OrganisationsFilterKeys[];
}

export default function OrganisationsFilters({
  handleSortToggle,
  handleFieldToggle,
  resetQueryParams,
  updateQueryParams,
  queryParams,
  includeFilters = [OrganisationsFilterKeys.STATUS],
}: OrganisationsFilterProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);

  const hasFilter = (key: OrganisationsFilterKeys) => {
    return includeFilters.includes(key);
  };

  const sortDirection = getSearchSortOrder(queryParams);

  const sortActions = [
    {
      label: t("Search.sortActions_AZ"),
      onClick: () =>
        handleSortToggle("organisation_name", SearchDirections.ASC),
      checked: sortDirection === SearchDirections.ASC,
    },
    {
      label: t("Search.sortActions_ZA"),
      onClick: () =>
        handleSortToggle("organisation_name", SearchDirections.DESC),
      checked: sortDirection === SearchDirections.DESC,
    },
  ];

  const filterStatusActions = [
    {
      label: tApplication("status_approved"),
      onClick: () => handleFieldToggle("filter", [Status.PROJECT_APPROVED, ""]),
      checked: queryParams.filter === Status.PROJECT_APPROVED,
    },
    {
      label: tApplication("status_pending"),
      onClick: () => handleFieldToggle("filter", [Status.PROJECT_PENDING, ""]),
      checked: queryParams.filter === Status.PROJECT_PENDING,
    },
    {
      label: tApplication("status_completed"),
      onClick: () =>
        handleFieldToggle("filter", [Status.PROJECT_COMPLETED, ""]),
      checked: queryParams.filter === Status.PROJECT_COMPLETED,
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
      {hasFilter(OrganisationsFilterKeys.STATUS) && (
        <SearchActionMenu
          actions={filterStatusActions}
          multiple
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={t("Search.filterByProjectStatus")}
          aria-label={t("Search.filterByProjectStatus")}
        />
      )}
    </SearchBar>
  );
}
