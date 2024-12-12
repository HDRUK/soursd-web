"use client";

import { ResearcherProject } from "@/types/application";
import { useQuery } from "@tanstack/react-query";
import { getProjectUsers } from "@/services/projects";
import ProjectUserCard from "../ProjectUserCard";

interface ProjectUserListProps {
  project: ResearcherProject;
}

export default function ProjectUserList({ project }: ProjectUserListProps) {
  const { id: projectId, title: projectTitle } = project;

  const { data: projectUsers } = useQuery({
    queryKey: ["getProjectUsers", projectId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;

      return getProjectUsers(id as number, {
        error: {
          message: "getProjectUsersError",
        },
      });
    },
    enabled: !!projectId,
  });

  return (
    <div>
      {projectUsers?.data.map(user => (
        <ProjectUserCard
          key={`project_user_${user.project_id}_${user.project_role_id}`}
          projectUser={user}
          projectTitle={projectTitle}
        />
      ))}
    </div>
  );
}
