import { ProjectsFilters } from "@/modules";
import { ProjectsFiltersKeys } from "@/modules/ProjectsFilters";
import UserProjectsTable from "@/modules/UserProjectsTable";
import useQueryUserProjects from "@/queries/useQueryUserProjects";
import { EntityType } from "@/types/api";
import { WithTranslations } from "@/types/application";
import { RouteConfig } from "@/types/router";

export type UserProjectsListProps = WithTranslations<{
  custodianId?: number;
  userId: number;
  variant: EntityType;
  routes: {
    name: RouteConfig;
  };
}>;

export default function UserProjectsList({
  custodianId,
  userId,
  variant,
  routes,
  t,
}: UserProjectsListProps) {
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
  } = useQueryUserProjects({
    custodianId,
    userId,
    variant,
  });

  return (
    <>
      <ProjectsFilters
        includeFilters={[ProjectsFiltersKeys.STATUS]}
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        resetQueryParams={resetQueryParams}
        handleSortToggle={handleSortToggle}
        handleFieldToggle={handleFieldToggle}
      />
      <UserProjectsTable
        total={total}
        last_page={last_page}
        page={page}
        setPage={setPage}
        data={data}
        queryState={{
          isLoading,
          isError,
          isSuccess,
        }}
        isPaginated
        t={t}
        routes={routes}
      />
    </>
  );
}
