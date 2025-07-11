"use client";

import { useStore } from "@/data/store";
import useStorePaginatedQueryParams from "@/hooks/useStorePaginatedQueryParams";
import PageBody from "@/modules/PageBody";
import ProjectUsers from "@/organisms/ProjectUsers";
import { EntityType } from "@/types/api";

export default function ProjectsSafePeople() {
  const { custodianId, projectId, route } = useStore(state => ({
    custodianId: state.getCustodian()?.id,
    projectId: state.getCurrentProject().id,
    route: state.getApplication().routes.profileCustodianUsersProjects,
  }));

  const paginatedQueryParams = useStorePaginatedQueryParams();

  return (
    <PageBody>
      <ProjectUsers
        variant={EntityType.CUSTODIAN}
        custodianId={custodianId}
        projectId={projectId}
        routes={{
          name: route,
        }}
        paginatedQueryParams={paginatedQueryParams}
      />
    </PageBody>
  );
}
