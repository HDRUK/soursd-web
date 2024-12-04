"use client";

import { useApplicationData } from "@/context/ApplicationData";
import { PostApprovalPayloadWithEntity } from "@/services/approvals";
import { ResearcherProject, User } from "@/types/application";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjectUsers } from "@/services/projects";
import ProjectUserCard from "../ProjectUserCard";

interface ProjectUserListProps {
  project: ResearcherProject;
}

const NAMESPACE_TRANSLATIONS_USERS_LIST = "ProjectUsersList";

export default function ProjectUserList({ project }: ProjectUserListProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_USERS_LIST);

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
    <>
      {projectUsers?.data.map(user => (
        <ProjectUserCard projectUser={user} projectTitle={projectTitle} />
      ))}
    </>
  );
}
