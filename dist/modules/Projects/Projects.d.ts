import { ProjectEntities } from "@/services/projects/getEntityProjects";
interface ProjectsProps {
    variant: ProjectEntities;
    entityId?: number;
}
export default function Projects({ variant, entityId }: ProjectsProps): import("react/jsx-runtime").JSX.Element;
export {};
