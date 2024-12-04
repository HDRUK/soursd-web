"use client";
import ProjectAccordion from "../ProjectAccordion";
import { ResearcherProject } from "@/types/application";
interface ProjectListProps {
  projects: ResearcherProject[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  if (!projects) return "Not found";

  return (
    <>
      {projects.map((project, i) => (
        <ProjectAccordion project={project} first={i === 0} />
      ))}
    </>
  );
}
