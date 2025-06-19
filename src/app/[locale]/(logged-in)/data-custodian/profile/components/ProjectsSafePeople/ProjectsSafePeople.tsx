"use client";

import { useStore } from "@/data/store";
import PageBody from "@/modules/PageBody";
import ProjectUsersList from "@/organisms/ProjectUsersList";

export default function Users() {
  const { custodianId, projectId, route } = useStore(state => ({
    custodianId: state.getCustodian()?.id,
    projectId: state.getCurrentProject().id,
    route: state.getApplication().routes.profileCustodianUsersProjects,
  }));

  return (
    <PageBody>
      <ProjectUsersList
        custodianId={custodianId}
        projectId={projectId}
        routes={{
          name: route,
        }}
      />
    </PageBody>
  );
}
