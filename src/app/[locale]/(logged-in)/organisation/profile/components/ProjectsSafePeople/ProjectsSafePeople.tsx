"use client";

import { useStore } from "@/data/store";
import PageBody from "@/modules/PageBody";
import ProjectUsersList from "@/organisms/ProjectUsersList";
import { EntityType } from "@/types/api";

export default function ProjectsSafePeople() {
  const { projectId, route } = useStore(state => ({
    projectId: state.getCurrentProject().id,
    route: state.getApplication().routes.profileCustodianUsersProjects,
  }));

  return (
    <PageBody>
      <ProjectUsersList
        variant={EntityType.ORGANISATION}
        custodianId={1}
        projectId={projectId}
        routes={{
          name: route,
        }}
      />
    </PageBody>
  );
}
