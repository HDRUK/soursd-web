"use client";

import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import { getProjectUsers } from "@/services/projects";
import { ResearcherProject } from "../../types/application";
import ProjectUserCard from "../ProjectUserCard";
import Pagination from "../../components/Pagination";

interface ProjectUserListProps {
  project: ResearcherProject;
}

export default function ProjectUserList({ project }: ProjectUserListProps) {
  const { id: projectId, title: projectTitle } = project;

  const {
    data: projectUsers,
    isLoading: isProjectsLoading,
    last_page,
    page,
    setPage,
  } = usePaginatedQuery({
    queryKeyBase: ["getProjectUsers", projectId],
    queryFn: queryParams => {
      return getProjectUsers(projectId as number, queryParams, {
        error: {
          message: "getProjectUsersError",
        },
      });
    },
    enabled: !!projectId,
  });

  return (
    <div>
      {projectUsers?.map(user => (
        <ProjectUserCard
          key={`project_user_${project.id}_${user.registry.id}_${user.project_role_id}`}
          projectUser={user}
          projectTitle={projectTitle}
        />
      ))}
      <Pagination
        isLoading={isProjectsLoading}
        page={page}
        count={last_page}
        onChange={(e: React.ChangeEvent<unknown>, page: number) =>
          setPage(page)
        }
      />
    </div>
  );
}
