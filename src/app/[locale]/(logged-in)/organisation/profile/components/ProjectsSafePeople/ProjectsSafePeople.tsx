"use client";

import { useStore } from "@/data/store";
import PageBody from "@/modules/PageBody";
import ProjectUsersList from "@/organisms/ProjectUsersList";
import { useGetProjectUsers } from "@/services/projects";
import { EntityType } from "@/types/api";

export default function ProjectsSafePeople() {
  const { organisationName, projectId, route } = useStore(state => ({
    organisationName: state.getOrganisation()?.organisation_name,
    projectId: state.getCurrentProject().id,
    route: state.getApplication().routes.profileCustodianUsersProjects,
  }));

  const { data, total, last_page, page, setPage } = useGetProjectUsers(
    projectId,
    {
      defaultQueryParams: { organisation_name: organisationName },
    }
  );

  return (
    <PageBody>
      <ProjectUsersList
        data={data}
        total={total}
        last_page={last_page}
        page={page}
        setPage={setPage}
        isPaginated
        variant={EntityType.ORGANISATION}
        includeColumns={["name", "projectRole", "organisationName"]}
        routes={{
          name: route,
        }}
      />
    </PageBody>
  );
}
