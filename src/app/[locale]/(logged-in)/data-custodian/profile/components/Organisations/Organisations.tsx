"use client";

import ChipStatus, { Status } from "@/components/ChipStatus";
import Table from "@/components/Table";
import { FilterIcon } from "@/consts/icons";
import { SearchDirections } from "@/consts/search";
import { useStore } from "@/data/store";
import { PageBody, PageBodyContainer, PageSection } from "@/modules";
import SearchActionMenu from "@/modules/SearchActionMenu";
import SearchBar from "@/modules/SearchBar";
import { usePaginatedCustodianOrganisations } from "@/services/custodians";
import { Organisation } from "@/types/application";
import { renderLinkNameCell, renderUserNameCell } from "@/utils/cells";
import { getSearchSortOrder } from "@/utils/query";
import SortIcon from "@mui/icons-material/Sort";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_ORGANISATIONS = "Organisations";
const NAMESPACE_TRANSLATIONS_PROFILE = "CustodianProfile";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export default function Organisations() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATIONS);
  const tProfile = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);
  const { custodianId, routes } = useStore(state => ({
    custodianId: state.getCustodian().id,
    routes: state.getApplication().routes,
  }));

  const {
    data,
    page,
    total,
    last_page,
    setPage,
    updateQueryParams,
    resetQueryParams,
    handleSortToggle,
    handleFieldToggle,
    queryParams,
    isLoading,
    isError,
    isSuccess,
  } = usePaginatedCustodianOrganisations(custodianId, {
    shouldUpdateQuerystring: true,
  });

  const sortDirection = getSearchSortOrder(queryParams);

  const sortActions = [
    {
      label: t("sortActions.AZ"),
      onClick: () =>
        handleSortToggle("organisation_name", SearchDirections.ASC),
      checked: sortDirection === SearchDirections.ASC,
    },
    {
      label: t("sortActions.ZA"),
      onClick: () =>
        handleSortToggle("organisation_name", SearchDirections.DESC),
      checked: sortDirection === SearchDirections.DESC,
    },
  ];

  const filterActions = [
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

  const columns: ColumnDef<Organisation>[] = [
    {
      accessorKey: "organisation_name",
      header: t("name"),
      cell: info =>
        renderLinkNameCell(
          info.getValue(),
          info.row.original.id,
          routes.profileCustodianOrganisationsPeople.path
        ),
    },
    {
      accessorKey: "project.title",
      header: t("projects"),
    },
    {
      accessorKey: "sro_officer",
      header: t("sroOfficer"),
      cell: info => renderUserNameCell(info.getValue()),
    },
    {
      accessorKey: "project.model_state.state.slug",
      header: t("status"),
      cell: info => <ChipStatus status={info.getValue()} />,
    },
  ];

  return (
    <PageBodyContainer heading={tProfile("organisations")}>
      <PageBody>
        <PageSection>
          <SearchBar
            onClear={resetQueryParams}
            onSearch={(text: string) => {
              updateQueryParams({
                "organisation_name[]": text,
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
            <SearchActionMenu
              actions={filterActions}
              startIcon={<FilterIcon />}
              renderedSelectedLabel={tApplication("filteredBy")}
              renderedDefaultLabel={tApplication("filterBy")}
              aria-label={tApplication("filterBy")}
            />
          </SearchBar>
        </PageSection>
        <PageSection>
          <Table
            total={total}
            last_page={last_page}
            page={page}
            setPage={setPage}
            data={data}
            columns={columns}
            queryState={{
              isLoading,
              isError,
              isSuccess,
            }}
            isPaginated
          />
        </PageSection>
      </PageBody>
    </PageBodyContainer>
  );
}
