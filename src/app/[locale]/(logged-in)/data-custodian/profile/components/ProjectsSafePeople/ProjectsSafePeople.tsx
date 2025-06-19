"use client";

import { useStore } from "@/data/store";
import PageBody from "@/modules/PageBody";
import ProjectUsersList from "@/organisms/ProjectUsersList";

export default function Users() {
  const { custodianId, projectId } = useStore(state => ({
    custodianId: state.getCustodian()?.id,
    projectId: state.getCurrentProject().id,
  }));

  return (
    <PageBody>
      <ProjectUsersList custodianId={custodianId} projectId={projectId} />
    </PageBody>
  );
}
