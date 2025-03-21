"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import getProjectQuery from "@/services/projects/getProjectQuery";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import SubPageProjects from "../../../components/SubPageProjects";
import { ProjectsSubTabs } from "../../../consts/tabs";
import useQueriesCombined from "@/hooks/useQueriesCombined";
import {
  getProject,
  getProjectDetails,
  getProjectDetailsQuery,
} from "@/services/projects";

interface SubPageProjectsProps {
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
}

interface QueriesCombined {
  getProject: Awaited<ReturnType<typeof getProject>>;
  getProjectDetails: Awaited<ReturnType<typeof getProjectDetails>>;
}

function ProjectsSubPage({ params: { subTabId, id } }: SubPageProjectsProps) {
  const { data, isLoading, isFetched } = useQueriesCombined<QueriesCombined>([
    getProjectQuery(+id),
    getProjectDetailsQuery(+id),
  ]);

  const projectData = data?.getProject?.data;
  const projectDetailsData = data?.getProjectDetails?.data;

  if (!projectData && isFetched) {
    notFound();
  }

  return (
    <LoadingWrapper variant="basic" loading={isLoading}>
      {projectData && (
        <SubPageProjects
          projectData={projectData}
          projectDetailsData={projectDetailsData}
          params={{
            subTabId,
            id,
          }}
        />
      )}
    </LoadingWrapper>
  );
}

export default ProjectsSubPage;
