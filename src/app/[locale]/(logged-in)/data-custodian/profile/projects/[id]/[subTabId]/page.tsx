"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import getProjectQuery from "@/services/projects/getProjectQuery";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import SubPageProjects from "../../../components/SubPageProjects";
import { PageTabs, ProjectsSubTabs } from "../../../consts/tabs";

interface SubPageProjectsProps {
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
}

function ProjectsSubPage({ params: { subTabId, id } }: SubPageProjectsProps) {
  const { data: project, isPending, isFetched } = useQuery(getProjectQuery(id));

  if (!project?.data && isFetched) {
    notFound();
  }

  return (
    <LoadingWrapper variant="basic" loading={isPending}>
      <SubPageProjects
        params={{
          tabId: PageTabs.PROJECTS,
          subTabId,
          id,
        }}
      />
    </LoadingWrapper>
  );
}

export default ProjectsSubPage;
