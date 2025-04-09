"use client";

import ChipStatus from "@/components/ChipStatus";
import Table from "@/components/Table";
import { FilterIcon } from "@/consts/icons";
import { SearchDirections } from "@/consts/search";
import { StoreState, useStore } from "@/data/store";
import PageSection from "@/modules/PageSection";
import SearchBar from "@/modules/SearchBar";
import { ProjectEntities } from "@/services/projects/getEntityProjects";
import useEntityProjectsQuery from "@/services/projects/useEntityProjectsQuery";
import { ResearcherProject } from "@/types/application";
import { renderProjectNameCell } from "@/utils/cells";
import { formatDisplayLongDate } from "@/utils/date";
import { getSearchSortOrder } from "@/utils/query";
import SortIcon from "@mui/icons-material/Sort";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import PageBody from "../PageBody";
import SearchActionMenu from "../SearchActionMenu";
import PageBodyContainer from "../PageBodyContainer";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";
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
  user: {
    getId: store => {
      const user = store.getUser();
      return user?.id;
    },
  },
};

interface ProjectsProps {
  variant: ProjectEntities;
  entityId?: number;
}

export default function Projects({ variant, entityId }: ProjectsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);
  const routes = useStore(state => state.getApplication().routes);

  const store = useStore();
  const { getId } = variantConfig[variant];
  const defaultEntityId = entityId || getId(store);

  const {
    data: projectsData,
    last_page,
    total,
    setPage,
    updateQueryParams,
    resetQueryParams,
    handleSortToggle,
    handleFieldToggle,
    queryParams,
    ...queryState
  } = useEntityProjectsQuery(defaultEntityId, {
    variant,
    queryKeyBase: ["getProjects"],
    enabled: !!defaultEntityId,
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

  const columns: ColumnDef<ResearcherProject>[] = [
    {
      cell: info => {
        let route = null;

        switch (variant) {
          case "organisation":
            route = routes.profileOrganisationProjectsSafeProject;
            break;
          case "custodian":
            route = routes.profileCustodianProjectsSafeProject;
            break;
          case "user":
            route = routes.profileResearcherProjectsSafeProject;
            break;
          default:
            route = null;
        }
        return renderProjectNameCell(info, route.path);
      },
      accessorKey: "title",
      header: t("title"),
    },
    {
      accessorKey: "lay_summary",
      header: t("laySummary"),
    },
    {
      accessorKey: "start_date",
      header: t("startDate"),
      cell: info => formatDisplayLongDate(info.getValue() as string),
    },
    {
      accessorKey: "end_date",
      header: t("endDate"),
      cell: info => formatDisplayLongDate(info.getValue() as string),
    },
    {
      accessorKey: "project_users_count",
      header: t("users"),
    },
    {
      accessorKey: "organisations",
      header: t("organisations"),
      cell: info =>
        info.row.original.organisations
          .map(org => org.organisation_name)
          .join(),
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: info => (
        <ChipStatus status={info.row.original.model_state?.state.slug} />
      ),
    },
  ];

  return (
    <PageBodyContainer heading={t("projects")}>
      <PageBody>
        <PageSection>
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
          <Table
            total={total}
            last_page={last_page}
            setPage={setPage}
            data={projectsData}
            columns={columns}
            queryState={queryState}
            isPaginated
          />
        </PageSection>
      </PageBody>
    </PageBodyContainer>
  );
}
