"use client";

import { useStore } from "@/data/store";
import PageBody from "@/modules/PageBody";
import ProjectUsersList from "@/organisms/ProjectUsersList";
import { useGetProjectUsers } from "@/services/projects";
import { EntityType } from "@/types/api";

export default function ProjectsSafePeople() {
  const { registryId, projectId, route } = useStore(state => ({
    registryId: state.getUser()?.registry_id,
    projectId: state.getCurrentProject().id,
    route: state.getApplication().routes.profileCustodianUsersProjects,
  }));

  // filter to only display the current user via registry ID, if in this project
  // note - do we really want this?
  const { data, total, last_page, page, setPage } = useGetProjectUsers(
    projectId,
    {
      defaultQueryParams: { registry_id: registryId },
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
        variant={EntityType.USER}
        includeColumns={["name", "projectRole", "organisationName"]}
        routes={{
          name: route,
        }}
      />
    </PageBody>
  );
}
