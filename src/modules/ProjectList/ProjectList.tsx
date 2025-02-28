"use client";

import { ResearcherProject } from "@/types/application";
import ProjectAccordion from "../ProjectAccordion";

interface ProjectListProps {
  projects: ResearcherProject[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  if (!projects) return "Not found";

  return (
    <>
      {projects.map(project => (
        <ProjectAccordion
          key={`project_accordion_${project.id}`}
          project={project}
        />
      ))}
    </>
  );
}
