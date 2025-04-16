import ChipStatus from "@/components/ChipStatus";
import Table from "@/components/Table";
import { useStore } from "@/data/store";
import { ProjectsFilters } from "@/modules";
import { ProjectFilterKeys } from "@/modules/ProjectsFilters";
import { usePaginatedUserProjects } from "@/services/users";
import { ResearcherProject } from "@/types/application";
import {
  renderOrganisationsNameCell,
  renderProjectNameCell,
} from "@/utils/cells";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "Projects";

export default function UserProjects() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  const { userId, routes } = useStore(state => ({
    userId: state.getCurrentUser().id,
    routes: state.getApplication().routes,
  }));

  const {
    data,
    total,
    last_page,
    page,
    setPage,
    updateQueryParams,
    resetQueryParams,
    handleSortToggle,
    handleFieldToggle,
    queryParams,
    isLoading,
    isError,
    isSuccess,
  } = usePaginatedUserProjects(userId, {
    shouldUpdateQuerystring: true,
  });

  const columns: ColumnDef<ResearcherProject>[] = [
    {
      accessorKey: "title",
      header: t("title"),
      cell: info =>
        renderProjectNameCell(
          info,
          routes.profileCustodianProjectsSafeProject.path
        ),
    },
    {
      accessorKey: "organisations",
      header: t("organisations"),
      cell: info => renderOrganisationsNameCell(info.getValue()),
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
    <>
      <ProjectsFilters
        includeFilters={[ProjectFilterKeys.STATUS]}
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        resetQueryParams={resetQueryParams}
        handleSortToggle={handleSortToggle}
        handleFieldToggle={handleFieldToggle}
      />
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
    </>
  );
}
